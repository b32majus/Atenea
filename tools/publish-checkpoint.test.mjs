import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  classifyChecks,
  executeCheckpoint,
  parseOAuthScopes,
  validatePreflightManifest,
  validateRequest,
} from "./publish-checkpoint.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const fakeGhFixture = path.join(here, "fixtures", "fake-gh.cjs");

function cmd(bin, args, options = {}) {
  const result = spawnSync(bin, args, {
    cwd: options.cwd,
    env: options.env ?? process.env,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function setupRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "atenea-publish-checkpoint-"));
  const bare = path.join(root, "remote.git");
  const work = path.join(root, "work");
  fs.mkdirSync(work);

  cmd("git", ["init", "--bare", bare]);
  cmd("git", ["init", "-b", "main"], { cwd: work });
  cmd("git", ["config", "user.name", "Atenea Test"], { cwd: work });
  cmd("git", ["config", "user.email", "atenea@example.invalid"], { cwd: work });

  fs.writeFileSync(path.join(work, "base.txt"), "base\n");
  cmd("git", ["add", "base.txt"], { cwd: work });
  cmd("git", ["commit", "-m", "base"], { cwd: work });
  const baseSha = cmd("git", ["rev-parse", "HEAD"], { cwd: work });

  cmd("git", ["remote", "add", "origin", bare], { cwd: work });
  cmd("git", ["push", "-u", "origin", "main"], { cwd: work });

  cmd("git", ["switch", "-c", "feat/test"], { cwd: work });
  fs.writeFileSync(path.join(work, "feature.txt"), "feature\n");
  cmd("git", ["add", "feature.txt"], { cwd: work });
  cmd("git", ["commit", "-m", "feature"], { cwd: work });
  const headSha = cmd("git", ["rev-parse", "HEAD"], { cwd: work });

  const preflight = path.join(root, "preflight.mjs");
  fs.writeFileSync(preflight, [
    "const changed=JSON.parse(process.env.ATENEA_CHECKPOINT_CHANGED_PATHS_JSON);",
    "const scopes=(process.env.TEST_REQUIRED_SCOPES||'').split(',').filter(Boolean);",
    "process.stdout.write(JSON.stringify({",
    "schema:'checkpoint-preflight/v1',",
    "base_sha:process.env.ATENEA_CHECKPOINT_BASE_SHA,",
    "head_sha:process.env.ATENEA_CHECKPOINT_HEAD_SHA,",
    "changed_paths:changed,",
    "checks:{unit:'PASS'},",
    "runtime:{local:'test',declared_ci:'test',parity:'MATCH'},",
    "publication_requirements:{github:{oauth_scopes:scopes}},",
    "result:'PASS'",
    "}));",
  ].join("\n"));

  const body = path.join(root, "pr-body.md");
  fs.writeFileSync(body, "test PR\n");

  return { root, bare, work, baseSha, headSha, preflight, body };
}

function makeRequest(repo, overrides = {}) {
  const request = {
    schema: "atenea.publish-checkpoint-request/v1",
    repository: "example/repo",
    worktree: repo.work,
    remote: "origin",
    base: { branch: "main", sha: repo.baseSha },
    head: { branch: "feat/test", sha: repo.headSha },
    issues: ["#1"],
    authorityRevalidation: {
      status: "UNCHANGED",
      checkedAt: "2026-09-21T00:00:00+02:00",
      sources: ["example/repo#1"],
      headSha: repo.headSha,
    },
    gentleClosure: {
      status: "SATISFIED",
      candidateHeadSha: repo.headSha,
      acknowledgementBurn: "NOT_REQUIRED",
      references: ["test-fixture:no-review-required"],
    },
    promotionReview: { required: false },
    repoPreflight: {
      command: "node " + JSON.stringify(repo.preflight),
      schema: "checkpoint-preflight/v1",
      timeoutSeconds: 30,
    },
    pr: { title: "Test PR", bodyFile: repo.body },
    publication: { transport: "git+gh", host: "github.com" },
    ci: { wait: true, requireChecks: true, timeoutSeconds: 5, pollSeconds: 1 },
    expectedChangedPaths: ["feature.txt"],
    allowedLocalDirtyPaths: [],
    delivery: "PR",
    merge: "HUMAN",
  };
  return { ...request, ...overrides };
}

function installFakeGh(repo, scopes = ["repo", "workflow"]) {
  const bin = path.join(repo.root, "bin");
  fs.mkdirSync(bin, { recursive: true });
  const fakeGh = path.join(bin, "gh");
  fs.copyFileSync(fakeGhFixture, fakeGh);
  fs.chmodSync(fakeGh, 0o755);

  const state = path.join(repo.root, "gh-state.json");
  const log = path.join(repo.root, "gh.log");
  fs.writeFileSync(state, JSON.stringify({ created: false }));
  fs.writeFileSync(log, "");

  return {
    PATH: bin + path.delimiter + process.env.PATH,
    FAKE_GH_STATE: state,
    FAKE_GH_LOG: log,
    FAKE_GH_SCOPES: scopes.join(", "),
    FAKE_BASE_BRANCH: "main",
    FAKE_BASE_SHA: repo.baseSha,
    FAKE_HEAD_BRANCH: "feat/test",
    FAKE_HEAD_SHA: repo.headSha,
    FAKE_CHANGED_PATHS: "feature.txt",
  };
}

function withEnv(env, fn) {
  const previous = {};
  for (const [key, value] of Object.entries(env)) {
    previous[key] = process.env[key];
    process.env[key] = value;
  }
  try {
    return fn();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("request rejects unknown fields instead of silently ignoring typos", () => {
  const repo = setupRepo();
  const request = makeRequest(repo);
  request.expectedChangedPath = ["feature.txt"];
  assert.throws(() => validateRequest(request), (error) =>
    error.code === "INVALID_REQUEST" && /unknown field/.test(error.message));
});

test("request requires an absolute worktree path", () => {
  const repo = setupRepo();
  const request = makeRequest(repo);
  request.worktree = "relative/worktree";
  assert.throws(() => validateRequest(request), (error) =>
    error.code === "INVALID_REQUEST" && /absolute path/.test(error.message));
});

test("request fails closed on authority drift", () => {
  const repo = setupRepo();
  const request = makeRequest(repo);
  request.authorityRevalidation.status = "CHANGED";
  assert.throws(() => validateRequest(request), (error) => error.code === "AUTHORITY_DRIFT");
});

test("required Promotion Review must already be PASS", () => {
  const repo = setupRepo();
  const request = makeRequest(repo, {
    promotionReview: {
      required: true,
      status: "FAIL",
      candidateHeadSha: repo.headSha,
      references: ["promotion:test"],
    },
  });
  assert.throws(() => validateRequest(request), (error) => error.code === "PROMOTION_REVIEW_REQUIRED");
});

test("preflight PASS from another HEAD is rejected", () => {
  const repo = setupRepo();
  const request = makeRequest(repo);
  const manifest = {
    schema: "checkpoint-preflight/v1",
    base_sha: repo.baseSha,
    head_sha: repo.baseSha,
    changed_paths: ["feature.txt"],
    checks: {},
    runtime: {},
    publication_requirements: {},
    result: "PASS",
  };
  assert.throws(
    () => validatePreflightManifest(manifest, request, ["feature.txt"]),
    (error) => error.code === "PREFLIGHT_HEAD_MISMATCH",
  );
});

test("OAuth scopes parse case-insensitively", () => {
  assert.deepEqual(
    parseOAuthScopes("HTTP/2 200\nX-OAuth-Scopes: repo, workflow\n\n{}"),
    ["repo", "workflow"],
  );
  assert.equal(parseOAuthScopes("HTTP/2 200\n\n{}"), null);
});

test("CI classification is bounded and fail-closed", () => {
  assert.deepEqual(
    classifyChecks([], false),
    { terminal: true, result: "GREEN", reason: "NO_CHECKS_REQUIRED" },
  );
  assert.deepEqual(
    classifyChecks([], true),
    { terminal: true, result: "FAIL", reason: "NO_CHECKS" },
  );
  assert.equal(classifyChecks([{ bucket: "pending" }], true).result, "PENDING");
  assert.equal(classifyChecks([{ bucket: "fail" }], true).result, "FAIL");
  assert.equal(
    classifyChecks([{ bucket: "pass" }, { bucket: "skipping" }], true).result,
    "GREEN",
  );
});

test("check-only validates exact candidate and repo-owned preflight without publishing", () => {
  const repo = setupRepo();
  const evidence = executeCheckpoint(makeRequest(repo), { publish: false });
  assert.equal(evidence.result, "CHECKPOINT_PREFLIGHT_PASS");
  assert.equal(evidence.expected.headSha, repo.headSha);
  assert.deepEqual(evidence.local.changedPaths, ["feature.txt"]);
  assert.equal(evidence.preflight.manifest.result, "PASS");

  const remoteHead = spawnSync(
    "git",
    ["--git-dir", repo.bare, "show-ref", "--verify", "--hash", "refs/heads/feat/test"],
    { encoding: "utf8" },
  );
  assert.notEqual(remoteHead.status, 0);
});

test("unexpected local dirt stops before publication", () => {
  const repo = setupRepo();
  fs.writeFileSync(path.join(repo.work, "runtime.tmp"), "debris\n");
  assert.throws(
    () => executeCheckpoint(makeRequest(repo), { publish: false }),
    (error) => error.code === "UNEXPECTED_DIRTY_STATE",
  );
});

test("repo-declared missing OAuth scope stops before push", () => {
  const repo = setupRepo();
  const fakeEnv = installFakeGh(repo, ["repo"]);
  withEnv({ ...fakeEnv, TEST_REQUIRED_SCOPES: "workflow" }, () => {
    assert.throws(
      () => executeCheckpoint(makeRequest(repo), { publish: false }),
      (error) => error.code === "PUBLICATION_SCOPE_MISSING",
    );
    const remoteHead = spawnSync(
      "git",
      ["--git-dir", repo.bare, "show-ref", "--verify", "--hash", "refs/heads/feat/test"],
      { encoding: "utf8" },
    );
    assert.notEqual(remoteHead.status, 0);
  });
});

test("healthy publish uses non-force push, reconciles PR paths, reads green CI, and stops at human merge", () => {
  const repo = setupRepo();
  const fakeEnv = installFakeGh(repo);
  withEnv(fakeEnv, () => {
    const evidence = executeCheckpoint(makeRequest(repo), { publish: true });
    assert.equal(evidence.result, "READY_FOR_HUMAN_MERGE");
    assert.equal(evidence.mergePerformed, false);
    assert.equal(evidence.push.mode, "NON_FORCE");
    assert.equal(evidence.push.remoteHeadSha, repo.headSha);
    assert.equal(evidence.pr.headRefOid, repo.headSha);
    assert.deepEqual(evidence.pr.changedPaths, ["feature.txt"]);
    assert.equal(evidence.ci.result, "GREEN");

    const remoteHead = cmd(
      "git",
      ["--git-dir", repo.bare, "show-ref", "--verify", "--hash", "refs/heads/feat/test"],
    );
    assert.equal(remoteHead, repo.headSha);

    const calls = fs.readFileSync(fakeEnv.FAKE_GH_LOG, "utf8");
    assert.doesNotMatch(calls, /"pr","merge"/);
  });
});

test("non-fast-forward push failure stops without alternate GitHub publication path", () => {
  const repo = setupRepo();
  cmd("git", ["switch", "main"], { cwd: repo.work });
  cmd("git", ["switch", "-c", "remote-divergent"], { cwd: repo.work });
  fs.writeFileSync(path.join(repo.work, "remote-only.txt"), "remote\n");
  cmd("git", ["add", "remote-only.txt"], { cwd: repo.work });
  cmd("git", ["commit", "-m", "remote divergent"], { cwd: repo.work });
  cmd("git", ["push", "origin", "HEAD:refs/heads/feat/test"], { cwd: repo.work });
  cmd("git", ["switch", "feat/test"], { cwd: repo.work });

  const fakeEnv = installFakeGh(repo);
  withEnv(fakeEnv, () => {
    assert.throws(
      () => executeCheckpoint(makeRequest(repo), { publish: true }),
      (error) => error.code === "COMMAND_FAILED",
    );
    assert.equal(fs.readFileSync(fakeEnv.FAKE_GH_LOG, "utf8"), "");
  });
});

test("red CI stops with evidence and never merges", () => {
  const repo = setupRepo();
  const fakeEnv = installFakeGh(repo);
  withEnv({ ...fakeEnv, FAKE_CI_BUCKET: "fail" }, () => {
    assert.throws(
      () => executeCheckpoint(makeRequest(repo), { publish: true }),
      (error) => error.code === "CI_RED" && error.evidence.mergePerformed === false,
    );
  });
});

test("CLI request failures are machine-readable and persist evidence when requested", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "atenea-publish-invalid-"));
  const requestPath = path.join(root, "request.json");
  const evidencePath = path.join(root, "evidence.json");
  fs.writeFileSync(requestPath, JSON.stringify({ schema: "wrong" }));

  const result = spawnSync(
    process.execPath,
    [path.join(here, "publish-checkpoint.mjs"), "--request", requestPath, "--evidence-out", evidencePath],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 1);
  const stderrEvidence = JSON.parse(result.stderr);
  assert.equal(stderrEvidence.result, "STOP");
  assert.equal(stderrEvidence.error.code, "INVALID_REQUEST");
  const fileEvidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
  assert.deepEqual(fileEvidence, stderrEvidence);
});

test("source contains no force-push, merge, or Gentle START implementation", () => {
  const source = fs.readFileSync(path.join(here, "publish-checkpoint.mjs"), "utf8");
  assert.doesNotMatch(source, /push[^\n]*--force/);
  assert.doesNotMatch(source, /"pr",\s*"merge"/);
  assert.doesNotMatch(source, /gentle-ai review start/);
});
