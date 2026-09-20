#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const REQUEST_SCHEMA = "atenea.publish-checkpoint-request/v1";
export const PREFLIGHT_SCHEMA = "checkpoint-preflight/v1";
export const EVIDENCE_SCHEMA = "atenea.publish-checkpoint-evidence/v1";

const thisFile = fileURLToPath(import.meta.url);

function fail(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  throw error;
}

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail("INVALID_REQUEST", label + " must be an object");
  }
  return value;
}

function asString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail("INVALID_REQUEST", label + " must be a non-empty string");
  }
  return value;
}

function asStringArray(value, label, options = {}) {
  const allowEmpty = options.allowEmpty !== false;
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string" || v === "")) {
    fail("INVALID_REQUEST", label + " must be an array of non-empty strings");
  }
  if (!allowEmpty && value.length === 0) {
    fail("INVALID_REQUEST", label + " must not be empty");
  }
  return value;
}

function onlyKeys(object, allowed, label) {
  const unexpected = Object.keys(object).filter((key) => !allowed.includes(key));
  if (unexpected.length) {
    fail("INVALID_REQUEST", label + " contains unknown field(s): " + unexpected.join(", "));
  }
}

function sameStrings(a, b) {
  const aa = [...a].sort();
  const bb = [...b].sort();
  return aa.length === bb.length && aa.every((v, i) => v === bb[i]);
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function sha256(text) {
  return "sha256:" + crypto.createHash("sha256").update(text).digest("hex");
}

function parseArgs(argv) {
  const args = { publish: false, request: null, evidenceOut: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--publish") args.publish = true;
    else if (arg === "--request") args.request = argv[++i];
    else if (arg === "--evidence-out") args.evidenceOut = argv[++i];
    else if (arg === "--help" || arg === "-h") {
      process.stdout.write([
        "Usage:",
        "  node tools/publish-checkpoint.mjs --request <request.json> [--publish] [--evidence-out <path>]",
        "",
        "Without --publish, all local deterministic gates run but no push/PR/CI action occurs.",
        "With --publish, the CLI may perform only normal non-force push, PR create/update/verify, and bounded CI read/wait.",
        "It never merges, force-pushes, starts Gentle review, or changes auth transport.",
        "",
      ].join("\n"));
      process.exit(0);
    } else {
      fail("INVALID_ARGUMENT", "unknown argument: " + arg);
    }
  }
  if (!args.request) fail("INVALID_ARGUMENT", "--request is required");
  return args;
}

function run(cmd, args, options = {}) {
  const cwd = options.cwd;
  const env = options.env;
  const timeoutMs = options.timeoutMs ?? 120000;
  const allowExitCodes = options.allowExitCodes ?? [0];
  const result = spawnSync(cmd, args, {
    cwd,
    env: env ? { ...process.env, ...env } : process.env,
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer: 16 * 1024 * 1024,
    input: options.input,
  });
  if (result.error) {
    fail("COMMAND_ERROR", cmd + " failed to start: " + result.error.message, {
      command: [cmd, ...args],
    });
  }
  if (!allowExitCodes.includes(result.status)) {
    fail("COMMAND_FAILED", cmd + " exited " + result.status, {
      command: [cmd, ...args],
      exitCode: result.status,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
    });
  }
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function git(worktree, args, options = {}) {
  return run("git", ["-C", worktree, ...args], options);
}

function gh(args, options = {}) {
  return run("gh", args, options);
}

export function validateRequest(input) {
  const r = asObject(input, "request");
  onlyKeys(r, [
    "schema", "repository", "worktree", "remote", "base", "head", "issues",
    "authorityRevalidation", "gentleClosure", "promotionReview", "repoPreflight",
    "pr", "publication", "ci", "expectedChangedPaths", "allowedLocalDirtyPaths",
    "delivery", "merge",
  ], "request");
  if (r.schema !== REQUEST_SCHEMA) {
    fail("INVALID_REQUEST", "request.schema must be " + REQUEST_SCHEMA);
  }

  asString(r.repository, "repository");
  asString(r.worktree, "worktree");
  if (!path.isAbsolute(r.worktree)) fail("INVALID_REQUEST", "worktree must be an absolute path");
  asString(r.remote, "remote");
  if (r.delivery !== "PR") fail("INVALID_REQUEST", "delivery must be PR");
  if (r.merge !== "HUMAN") fail("INVALID_REQUEST", "merge must be HUMAN");

  const base = asObject(r.base, "base");
  onlyKeys(base, ["branch", "sha"], "base");
  asString(base.branch, "base.branch");
  asString(base.sha, "base.sha");
  const head = asObject(r.head, "head");
  onlyKeys(head, ["branch", "sha"], "head");
  asString(head.branch, "head.branch");
  asString(head.sha, "head.sha");

  asStringArray(r.issues ?? [], "issues");
  const authority = asObject(r.authorityRevalidation, "authorityRevalidation");
  onlyKeys(authority, ["status", "checkedAt", "sources", "headSha"], "authorityRevalidation");
  if (authority.status !== "UNCHANGED") {
    fail("AUTHORITY_DRIFT", "authorityRevalidation.status must be UNCHANGED", {
      status: authority.status,
    });
  }
  asString(authority.checkedAt, "authorityRevalidation.checkedAt");
  if (Number.isNaN(Date.parse(authority.checkedAt))) {
    fail("INVALID_REQUEST", "authorityRevalidation.checkedAt must be a parseable timestamp");
  }
  asStringArray(authority.sources, "authorityRevalidation.sources", { allowEmpty: false });
  if (authority.headSha !== head.sha) {
    fail("AUTHORITY_CANDIDATE_MISMATCH", "authorityRevalidation.headSha must match head.sha");
  }

  const gentle = asObject(r.gentleClosure, "gentleClosure");
  onlyKeys(gentle, ["status", "candidateHeadSha", "acknowledgementBurn", "references"], "gentleClosure");
  if (gentle.status !== "SATISFIED") {
    fail("GENTLE_NOT_CLOSED", "gentleClosure.status must be SATISFIED");
  }
  if (!["COMPLETE", "NOT_REQUIRED"].includes(gentle.acknowledgementBurn)) {
    fail("INVALID_REQUEST", "gentleClosure.acknowledgementBurn must be COMPLETE or NOT_REQUIRED");
  }
  if (gentle.candidateHeadSha !== head.sha) {
    fail("GENTLE_CANDIDATE_MISMATCH", "gentleClosure.candidateHeadSha must match head.sha");
  }
  asStringArray(gentle.references ?? [], "gentleClosure.references");

  const promo = r.promotionReview ?? { required: false };
  asObject(promo, "promotionReview");
  onlyKeys(promo, ["required", "status", "candidateHeadSha", "references"], "promotionReview");
  if (typeof promo.required !== "boolean") {
    fail("INVALID_REQUEST", "promotionReview.required must be boolean");
  }
  if (promo.required) {
    if (promo.status !== "PASS") {
      fail("PROMOTION_REVIEW_REQUIRED", "required Promotion Review must be PASS");
    }
    if (promo.candidateHeadSha !== head.sha) {
      fail("PROMOTION_REVIEW_CANDIDATE_MISMATCH", "Promotion Review candidate must match head.sha");
    }
    asStringArray(promo.references ?? [], "promotionReview.references", { allowEmpty: false });
  }

  const preflight = asObject(r.repoPreflight, "repoPreflight");
  onlyKeys(preflight, ["command", "schema", "timeoutSeconds"], "repoPreflight");
  asString(preflight.command, "repoPreflight.command");
  if (preflight.schema !== PREFLIGHT_SCHEMA) {
    fail("INVALID_REQUEST", "repoPreflight.schema must be " + PREFLIGHT_SCHEMA);
  }
  if (preflight.timeoutSeconds !== undefined &&
      (!Number.isInteger(preflight.timeoutSeconds) || preflight.timeoutSeconds < 1)) {
    fail("INVALID_REQUEST", "repoPreflight.timeoutSeconds must be a positive integer");
  }

  const pr = asObject(r.pr, "pr");
  onlyKeys(pr, ["title", "bodyFile"], "pr");
  asString(pr.title, "pr.title");
  asString(pr.bodyFile, "pr.bodyFile");

  const publication = asObject(r.publication, "publication");
  onlyKeys(publication, ["transport", "host"], "publication");
  if (publication.transport !== "git+gh") {
    fail("INVALID_REQUEST", "publication.transport must be git+gh");
  }
  asString(publication.host, "publication.host");

  const ci = asObject(r.ci, "ci");
  onlyKeys(ci, ["wait", "requireChecks", "timeoutSeconds", "pollSeconds"], "ci");
  if (typeof ci.wait !== "boolean" || typeof ci.requireChecks !== "boolean") {
    fail("INVALID_REQUEST", "ci.wait and ci.requireChecks must be boolean");
  }
  if (!Number.isInteger(ci.timeoutSeconds) || ci.timeoutSeconds < 1) {
    fail("INVALID_REQUEST", "ci.timeoutSeconds must be a positive integer");
  }
  if (!Number.isInteger(ci.pollSeconds) || ci.pollSeconds < 1) {
    fail("INVALID_REQUEST", "ci.pollSeconds must be a positive integer");
  }

  if (r.expectedChangedPaths !== undefined) {
    asStringArray(r.expectedChangedPaths, "expectedChangedPaths");
  }
  if (r.allowedLocalDirtyPaths !== undefined) {
    asStringArray(r.allowedLocalDirtyPaths, "allowedLocalDirtyPaths");
  }

  return r;
}

function readRequest(file) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail("REQUEST_READ_FAILED", "cannot read request JSON: " + error.message, { file });
  }
  return validateRequest(parsed);
}

function parseDirtyPaths(statusText) {
  return statusText.split(/\r?\n/).filter(Boolean).map((line) => {
    const raw = line.slice(3);
    const arrow = raw.lastIndexOf(" -> ");
    return arrow >= 0 ? raw.slice(arrow + 4) : raw;
  });
}

function resolveBodyFile(request) {
  return path.isAbsolute(request.pr.bodyFile)
    ? request.pr.bodyFile
    : path.resolve(request.worktree, request.pr.bodyFile);
}

function validateLocalIdentity(request, evidence) {
  if (!fs.existsSync(request.worktree)) {
    fail("WORKTREE_MISSING", "worktree not found: " + request.worktree);
  }

  const branch = git(request.worktree, ["branch", "--show-current"]).stdout.trim();
  const headSha = git(request.worktree, ["rev-parse", "HEAD"]).stdout.trim();
  if (branch !== request.head.branch) {
    fail("HEAD_BRANCH_MISMATCH", "current branch does not match request", {
      expected: request.head.branch,
      actual: branch,
    });
  }
  if (headSha !== request.head.sha) {
    fail("HEAD_SHA_MISMATCH", "current HEAD does not match request", {
      expected: request.head.sha,
      actual: headSha,
    });
  }

  git(request.worktree, ["cat-file", "-e", request.base.sha + "^{commit}"]);
  const mergeBase = git(request.worktree, ["merge-base", request.base.sha, request.head.sha]).stdout.trim();
  if (mergeBase !== request.base.sha) {
    fail("BASE_NOT_ANCESTOR", "base.sha must be an ancestor of head.sha", {
      baseSha: request.base.sha,
      mergeBase,
    });
  }

  const dirty = parseDirtyPaths(
    git(request.worktree, ["status", "--porcelain=v1", "--untracked-files=all"]).stdout,
  );
  const allowed = uniqueSorted(request.allowedLocalDirtyPaths ?? []);
  const unexpected = dirty.filter((p) => !allowed.includes(p));
  if (unexpected.length) {
    fail("UNEXPECTED_DIRTY_STATE", "worktree contains unexpected local dirt", {
      dirty,
      allowedLocalDirtyPaths: allowed,
      unexpected,
    });
  }

  const changedPaths = uniqueSorted(
    git(request.worktree, ["diff", "--name-only", request.base.sha + "..." + request.head.sha])
      .stdout.split(/\r?\n/).filter(Boolean),
  );
  if (request.expectedChangedPaths &&
      !sameStrings(changedPaths, request.expectedChangedPaths)) {
    fail("EXPECTED_CHANGED_PATHS_MISMATCH", "computed changed paths differ from request", {
      expected: uniqueSorted(request.expectedChangedPaths),
      actual: changedPaths,
    });
  }

  evidence.local = { branch, headSha, mergeBase, dirtyPaths: dirty, changedPaths };
  return changedPaths;
}

function refreshAndValidateRemoteBase(request, evidence) {
  git(request.worktree, [
    "fetch", "--quiet", request.remote,
    "refs/heads/" + request.base.branch + ":refs/remotes/" + request.remote + "/" + request.base.branch,
  ]);
  const remoteBaseSha = git(request.worktree, [
    "rev-parse", "refs/remotes/" + request.remote + "/" + request.base.branch,
  ]).stdout.trim();
  if (remoteBaseSha !== request.base.sha) {
    fail("REMOTE_BASE_DRIFT", "remote base branch no longer matches request.base.sha", {
      expected: request.base.sha,
      actual: remoteBaseSha,
      branch: request.base.branch,
    });
  }
  evidence.remoteBase = { branch: request.base.branch, sha: remoteBaseSha };
}

function executeRepoPreflight(request, changedPaths, evidence) {
  const env = {
    ATENEA_CHECKPOINT_REPOSITORY: request.repository,
    ATENEA_CHECKPOINT_BASE_BRANCH: request.base.branch,
    ATENEA_CHECKPOINT_BASE_SHA: request.base.sha,
    ATENEA_CHECKPOINT_HEAD_BRANCH: request.head.branch,
    ATENEA_CHECKPOINT_HEAD_SHA: request.head.sha,
    ATENEA_CHECKPOINT_CHANGED_PATHS_JSON: JSON.stringify(changedPaths),
  };
  const result = run("bash", ["-lc", request.repoPreflight.command], {
    cwd: request.worktree,
    env,
    timeoutMs: (request.repoPreflight.timeoutSeconds ?? 900) * 1000,
  });
  let manifest;
  try {
    manifest = JSON.parse(result.stdout);
  } catch (error) {
    fail("PREFLIGHT_INVALID_JSON", "repo preflight stdout must be one JSON document", {
      error: error.message,
      stdout: result.stdout,
      stderr: result.stderr,
    });
  }
  validatePreflightManifest(manifest, request, changedPaths);
  evidence.preflight = {
    command: request.repoPreflight.command,
    manifest,
    stdoutSha256: sha256(result.stdout),
  };
  return manifest;
}

export function validatePreflightManifest(manifest, request, changedPaths) {
  asObject(manifest, "preflight manifest");
  if (manifest.schema !== PREFLIGHT_SCHEMA) {
    fail("PREFLIGHT_SCHEMA_MISMATCH", "manifest.schema must be " + PREFLIGHT_SCHEMA);
  }
  if (manifest.result !== "PASS") {
    fail("PREFLIGHT_FAILED", "repo preflight did not report PASS", { manifest });
  }
  if (manifest.base_sha !== request.base.sha) {
    fail("PREFLIGHT_BASE_MISMATCH", "repo preflight base_sha does not match request", {
      expected: request.base.sha,
      actual: manifest.base_sha,
    });
  }
  if (manifest.head_sha !== request.head.sha) {
    fail("PREFLIGHT_HEAD_MISMATCH", "repo preflight head_sha does not match request", {
      expected: request.head.sha,
      actual: manifest.head_sha,
    });
  }
  if (!Array.isArray(manifest.changed_paths) ||
      manifest.changed_paths.some((p) => typeof p !== "string") ||
      !sameStrings(manifest.changed_paths, changedPaths)) {
    fail("PREFLIGHT_PATHS_MISMATCH", "repo preflight changed_paths do not match candidate", {
      expected: changedPaths,
      actual: manifest.changed_paths,
    });
  }
  if (manifest.publication_requirements !== undefined &&
      (!manifest.publication_requirements ||
       typeof manifest.publication_requirements !== "object" ||
       Array.isArray(manifest.publication_requirements))) {
    fail("PREFLIGHT_PUBLICATION_REQUIREMENTS_INVALID",
      "publication_requirements must be an object when present");
  }
  return manifest;
}

export function parseOAuthScopes(headersAndBody) {
  const match = headersAndBody.match(/^x-oauth-scopes:\s*(.*)$/im);
  if (!match) return null;
  const value = match[1].trim();
  if (!value) return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean).sort();
}

function validatePublicationCredential(request, manifest, evidence) {
  const rawRequired = manifest?.publication_requirements?.github?.oauth_scopes ?? [];
  if (!Array.isArray(rawRequired) ||
      rawRequired.some((s) => typeof s !== "string" || s === "")) {
    fail("PREFLIGHT_PUBLICATION_REQUIREMENTS_INVALID",
      "publication_requirements.github.oauth_scopes must be an array of strings");
  }
  const required = uniqueSorted(rawRequired);
  if (!required.length) {
    evidence.credential = { requiredScopes: [], status: "NOT_REQUIRED_BY_MANIFEST" };
    return;
  }

  const result = gh([
    "api", "-i", "--hostname", request.publication.host, "/user",
  ]);
  const scopes = parseOAuthScopes(result.stdout + "\n" + result.stderr);
  if (scopes === null) {
    fail("PUBLICATION_SCOPE_UNINSPECTABLE",
      "repo requires GitHub OAuth scopes but active credential scopes are not inspectable", {
        requiredScopes: required,
        remediation: "verify/refresh the active " + request.publication.host + " credential before push",
      });
  }
  const missing = required.filter((s) => !scopes.includes(s));
  if (missing.length) {
    fail("PUBLICATION_SCOPE_MISSING", "active GitHub credential lacks required scope(s)", {
      requiredScopes: required,
      actualScopes: scopes,
      missingScopes: missing,
      remediation: "gh auth refresh -h " + request.publication.host + " -s " + missing.join(","),
    });
  }
  evidence.credential = { requiredScopes: required, actualScopes: scopes, status: "PASS" };
}

function pushAndVerifyRemote(request, evidence) {
  git(request.worktree, [
    "push", request.remote,
    request.head.sha + ":refs/heads/" + request.head.branch,
  ], { timeoutMs: 180000 });

  const remote = git(request.worktree, [
    "ls-remote", request.remote, "refs/heads/" + request.head.branch,
  ]).stdout.trim();
  const remoteHeadSha = remote ? remote.split(/\s+/)[0] : "";
  if (remoteHeadSha !== request.head.sha) {
    fail("REMOTE_HEAD_MISMATCH", "remote head does not equal local candidate after push", {
      expected: request.head.sha,
      actual: remoteHeadSha || null,
    });
  }
  evidence.push = {
    mode: "NON_FORCE",
    remote: request.remote,
    branch: request.head.branch,
    remoteHeadSha,
  };
}

function findOpenPr(request) {
  const result = gh([
    "pr", "list",
    "--repo", request.repository,
    "--head", request.head.branch,
    "--state", "open",
    "--limit", "10",
    "--json", "number,url,baseRefName,baseRefOid,headRefName,headRefOid,title",
  ]);
  let prs;
  try {
    prs = JSON.parse(result.stdout);
  } catch (error) {
    fail("PR_LIST_INVALID_JSON", "cannot parse gh pr list output: " + error.message, {
      stdout: result.stdout,
    });
  }
  if (prs.length > 1) {
    fail("MULTIPLE_OPEN_PRS", "multiple open PRs found for head branch", {
      branch: request.head.branch,
      prs,
    });
  }
  return prs[0] ?? null;
}

function createOrUpdatePr(request) {
  const bodyFile = resolveBodyFile(request);
  if (!fs.existsSync(bodyFile)) {
    fail("PR_BODY_MISSING", "PR body file not found: " + bodyFile);
  }

  let pr = findOpenPr(request);
  if (!pr) {
    const created = gh([
      "pr", "create",
      "--repo", request.repository,
      "--base", request.base.branch,
      "--head", request.head.branch,
      "--title", request.pr.title,
      "--body-file", bodyFile,
    ], { timeoutMs: 120000 });
    if (!created.stdout.trim()) {
      fail("PR_CREATE_NO_OUTPUT", "gh pr create returned no PR URL/output");
    }
    pr = findOpenPr(request);
    if (!pr) fail("PR_CREATE_NOT_FOUND", "PR was created but could not be rediscovered");
  } else {
    gh([
      "pr", "edit", String(pr.number),
      "--repo", request.repository,
      "--base", request.base.branch,
      "--title", request.pr.title,
      "--body-file", bodyFile,
    ], { timeoutMs: 120000 });
  }

  const view = gh([
    "pr", "view", String(pr.number),
    "--repo", request.repository,
    "--json", "number,url,baseRefName,baseRefOid,headRefName,headRefOid,title,state",
  ]);
  try {
    return JSON.parse(view.stdout);
  } catch (error) {
    fail("PR_VIEW_INVALID_JSON", "cannot parse gh pr view output: " + error.message, {
      stdout: view.stdout,
    });
  }
}

function reconcilePr(request, pr, changedPaths, evidence) {
  if (pr.baseRefName !== request.base.branch) {
    fail("PR_BASE_MISMATCH", "PR base branch mismatch", {
      expected: request.base.branch,
      actual: pr.baseRefName,
    });
  }
  if (pr.baseRefOid !== request.base.sha) {
    fail("PR_BASE_SHA_MISMATCH", "PR base SHA mismatch", {
      expected: request.base.sha,
      actual: pr.baseRefOid,
    });
  }
  if (pr.headRefName !== request.head.branch) {
    fail("PR_HEAD_BRANCH_MISMATCH", "PR head branch mismatch", {
      expected: request.head.branch,
      actual: pr.headRefName,
    });
  }
  if (pr.headRefOid !== request.head.sha) {
    fail("PR_HEAD_SHA_MISMATCH", "PR head SHA mismatch", {
      expected: request.head.sha,
      actual: pr.headRefOid,
    });
  }
  const filesResult = gh([
    "api", "--paginate",
    "repos/" + request.repository + "/pulls/" + pr.number + "/files",
    "--jq", ".[].filename",
  ]);
  const prPaths = uniqueSorted(filesResult.stdout.split(/\r?\n/).filter(Boolean));
  if (!sameStrings(prPaths, changedPaths)) {
    fail("PR_CHANGED_PATHS_MISMATCH", "PR changed paths differ from local candidate", {
      expected: changedPaths,
      actual: prPaths,
    });
  }
  evidence.pr = { ...pr, changedPaths: prPaths };
}

export function classifyChecks(checks, requireChecks) {
  if (!Array.isArray(checks)) fail("CI_INVALID_JSON", "CI checks output must be an array");
  if (checks.length === 0) {
    return requireChecks
      ? { terminal: true, result: "FAIL", reason: "NO_CHECKS" }
      : { terminal: true, result: "GREEN", reason: "NO_CHECKS_REQUIRED" };
  }
  const buckets = checks.map((c) => c.bucket);
  if (buckets.some((b) => b === "fail" || b === "cancel")) {
    return { terminal: true, result: "FAIL", reason: "CHECK_FAILED" };
  }
  if (buckets.some((b) => b === "pending" || !["pass", "skipping"].includes(b))) {
    return { terminal: false, result: "PENDING", reason: "CHECKS_PENDING" };
  }
  return { terminal: true, result: "GREEN", reason: "ALL_CHECKS_GREEN_OR_SKIPPED" };
}

function readChecks(request, prNumber) {
  const result = gh([
    "pr", "checks", String(prNumber),
    "--repo", request.repository,
    "--json", "bucket,name,state,link,workflow",
  ], { allowExitCodes: [0, 1, 8] });
  try {
    return JSON.parse(result.stdout || "[]");
  } catch (error) {
    fail("CI_INVALID_JSON", "cannot parse gh pr checks output: " + error.message, {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.status,
    });
  }
}

function sleepMs(ms) {
  const sab = new SharedArrayBuffer(4);
  Atomics.wait(new Int32Array(sab), 0, 0, ms);
}

function waitForCi(request, prNumber, evidence) {
  const started = Date.now();
  let checks = [];
  while (true) {
    checks = readChecks(request, prNumber);
    const classification = classifyChecks(checks, request.ci.requireChecks);
    if (classification.terminal) {
      evidence.ci = { ...classification, checks };
      if (classification.result !== "GREEN") {
        fail("CI_RED", "repository CI is not green", evidence.ci);
      }
      return;
    }
    if (!request.ci.wait) {
      evidence.ci = { ...classification, checks };
      fail("CI_PENDING", "CI checks are pending and ci.wait=false", evidence.ci);
    }
    if (Date.now() - started >= request.ci.timeoutSeconds * 1000) {
      evidence.ci = { result: "PENDING", reason: "TIMEOUT", checks };
      fail("CI_TIMEOUT", "timed out waiting for CI", evidence.ci);
    }
    sleepMs(request.ci.pollSeconds * 1000);
  }
}

function writeEvidence(file, evidence) {
  if (!file) return;
  const resolved = path.resolve(file);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  const temp = resolved + ".tmp-" + process.pid;
  fs.writeFileSync(temp, JSON.stringify(evidence, null, 2) + "\n", { mode: 0o600 });
  fs.renameSync(temp, resolved);
}

export function executeCheckpoint(requestInput, options = {}) {
  const publish = options.publish === true;
  const evidenceOut = options.evidenceOut ?? null;
  const request = validateRequest(requestInput);
  const evidence = {
    schema: EVIDENCE_SCHEMA,
    repository: request.repository,
    issues: request.issues,
    operation: publish ? "PUBLISH" : "CHECK_ONLY",
    expected: {
      baseBranch: request.base.branch,
      baseSha: request.base.sha,
      headBranch: request.head.branch,
      headSha: request.head.sha,
      delivery: request.delivery,
      merge: request.merge,
    },
    authorityRevalidation: request.authorityRevalidation,
    gentleClosure: request.gentleClosure,
    promotionReview: request.promotionReview ?? { required: false },
    result: "RUNNING",
    mergePerformed: false,
  };

  try {
    const changedPaths = validateLocalIdentity(request, evidence);
    refreshAndValidateRemoteBase(request, evidence);
    const manifest = executeRepoPreflight(request, changedPaths, evidence);
    validatePublicationCredential(request, manifest, evidence);

    const postPreflightLocal = {};
    const postPreflightPaths = validateLocalIdentity(request, postPreflightLocal);
    if (!sameStrings(postPreflightPaths, changedPaths)) {
      fail("CANDIDATE_DRIFT_AFTER_PREFLIGHT", "candidate changed while repo preflight was running", {
        expected: changedPaths,
        actual: postPreflightPaths,
      });
    }
    evidence.postPreflightLocal = postPreflightLocal.local;

    if (!publish) {
      evidence.result = "CHECKPOINT_PREFLIGHT_PASS";
      evidence.nextBoundary = "EXPLICIT_PUBLISH_INVOCATION";
      writeEvidence(evidenceOut, evidence);
      return evidence;
    }

    pushAndVerifyRemote(request, evidence);
    const pr = createOrUpdatePr(request);
    reconcilePr(request, pr, changedPaths, evidence);
    waitForCi(request, pr.number, evidence);

    evidence.result = "READY_FOR_HUMAN_MERGE";
    evidence.nextBoundary = "HUMAN_MERGE";
    writeEvidence(evidenceOut, evidence);
    return evidence;
  } catch (error) {
    evidence.result = "STOP";
    evidence.nextBoundary = "ADJUDICATION";
    evidence.error = {
      code: error.code ?? "UNEXPECTED_ERROR",
      message: error.message,
      details: error.details ?? {},
    };
    writeEvidence(evidenceOut, evidence);
    throw Object.assign(error, { evidence });
  }
}

function cli() {
  let args = { publish: false, request: null, evidenceOut: null };
  try {
    args = parseArgs(process.argv.slice(2));
    const request = readRequest(path.resolve(args.request));
    const evidence = executeCheckpoint(request, {
      publish: args.publish,
      evidenceOut: args.evidenceOut,
    });
    process.stdout.write(JSON.stringify(evidence, null, 2) + "\n");
  } catch (error) {
    const evidence = error.evidence ?? {
      schema: EVIDENCE_SCHEMA,
      operation: args.publish ? "PUBLISH" : "CHECK_ONLY",
      result: "STOP",
      nextBoundary: "ADJUDICATION",
      error: {
        code: error.code ?? "UNEXPECTED_ERROR",
        message: error.message,
        details: error.details ?? {},
      },
      mergePerformed: false,
    };
    writeEvidence(args.evidenceOut, evidence);
    process.stderr.write(JSON.stringify(evidence, null, 2) + "\n");
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(thisFile)) {
  cli();
}
