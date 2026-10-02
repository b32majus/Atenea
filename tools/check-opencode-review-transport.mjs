#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateReviewHostInvocation } from "./opencode-review-transport-guard.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (rel) => JSON.parse(await readFile(path.join(root, rel), "utf8"));
const assurance = await readJson("config/native-gentle/opencode-assurance.profile.json");

const rendered = spawnSync(
  process.execPath,
  [path.join(root, "tools/render-opencode-routing-overlay.mjs")],
  { encoding: "utf8" },
);
assert.equal(rendered.status, 0, rendered.stderr);
const overlay = JSON.parse(rendered.stdout);

const dispatcher = await readFile(path.join(root, "tools/dispatch-opencode-review-task.mjs"), "utf8");
assert.equal(overlay.agent?.["atenea-review-host"], undefined, "C-081 forbids the old lifecycle primary");
assert.equal(overlay.agent?.["atenea-review-relay"], undefined, "C-081 forbids a relay primary");
assert.match(dispatcher, /prompt_async/, "dispatcher must use asynchronous native subtask dispatch");
assert.match(dispatcher, /type:'subtask'/, "dispatcher must submit a SubtaskPartInput");
assert.doesNotMatch(dispatcher, /gentle-ai review/, "dispatcher must not own Gentle lifecycle commands");

assert.deepEqual(
  validateReviewHostInvocation({
    command: ["serve", "--hostname", "127.0.0.1", "--port", "41234"],
    config: overlay,
    assurance,
  }),
  { transport: "opencode-serve", dispatch: "direct-subtask-part", reviewer_mode: "subagent" },
);assert.throws(
  () => validateReviewHostInvocation({
    command: ["run", "--agent", "review-reliability", "inspect"],
    config: overlay,
    assurance,
  }),
  /one-shot opencode run is forbidden/,
);

assert.throws(
  () => validateReviewHostInvocation({
    command: ["serve", "--agent=review-reliability"],
    config: overlay,
    assurance,
  }),
  /must not select a primary agent/,
);

assert.throws(
  () => validateReviewHostInvocation({
    command: ["serve", "--implementation", "complex"],
    config: overlay,
    assurance,
  }),
  /must not select a production-volume\/complex/,
);

assert.throws(
  () => validateReviewHostInvocation({
    command: ["serve", "--config", "/tmp/other.json"],
    config: overlay,
    assurance,
  }),
  /alternate config source/,
);const badReviewerMode = structuredClone(overlay);
badReviewerMode.agent["review-reliability"].mode = "primary";
assert.throws(
  () => validateReviewHostInvocation({ command: ["serve"], config: badReviewerMode, assurance }),
  /review-reliability mode must be subagent/,
);

const badReviewerModel = structuredClone(overlay);
badReviewerModel.agent["review-reliability"].model = "nan/deepseek-v4-flash";
assert.throws(
  () => validateReviewHostInvocation({ command: ["serve"], config: badReviewerModel, assurance }),
  /review-reliability model must be openai\/gpt-6-luna/,
);

const launcher = path.join(root, "tools/launch-opencode-review-host.mjs");
const fakeBin = path.join(root, "tools/fixtures/fake-opencode-review-host.mjs");
const pass = spawnSync(
  process.execPath,
  [launcher, "--hostname", "127.0.0.1", "--port", "41234"],
  {
    encoding: "utf8",
    env: {
      ...process.env,
      OPENCODE_CONFIG_CONTENT: rendered.stdout,
      ATENEA_OPENCODE_BIN: fakeBin,
    },
  },
);
assert.equal(pass.status, 0, `${pass.stdout}\n${pass.stderr}`);
assert.match(pass.stderr, /ATENEA_REVIEW_TRANSPORT_GUARD=PASS/);
assert.match(pass.stdout, /FAKE_OPENCODE_ARGS=serve --hostname 127\.0\.0\.1 --port 41234/);

const forbidden = spawnSync(
  process.execPath,
  [launcher, "run", "--agent", "review-reliability"],
  {
    encoding: "utf8",
    env: {
      ...process.env,
      OPENCODE_CONFIG_CONTENT: rendered.stdout,
      ATENEA_OPENCODE_BIN: fakeBin,
    },
  },
);assert.notEqual(forbidden.status, 0);
assert.match(forbidden.stderr, /one-shot opencode run is forbidden/);
assert.doesNotMatch(forbidden.stdout, /FAKE_OPENCODE_ARGS=/);

const missingConfig = spawnSync(
  process.execPath,
  [launcher, "--hostname", "127.0.0.1", "--port", "41234"],
  { encoding: "utf8", env: { ...process.env, ATENEA_OPENCODE_BIN: fakeBin } },
);
assert.notEqual(missingConfig.status, 0);
assert.match(missingConfig.stderr, /requires per-process OPENCODE_CONFIG_CONTENT/);

console.log("ATENEA_OPENCODE_REVIEW_TRANSPORT_CHECK=PASS");
