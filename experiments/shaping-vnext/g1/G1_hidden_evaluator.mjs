#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const candidate = path.resolve(process.argv[2] || "");
if (!process.argv[2]) {
  console.error("usage: node G1_hidden_evaluator.mjs <candidate-repo>");
  process.exit(2);
}

const pkg = JSON.parse(await readFile(path.join(candidate, "package.json"), "utf8"));
const binValue = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.["handoff-board"];
assert.equal(typeof binValue, "string", "package.json must expose bin 'handoff-board'");
const cli = path.resolve(candidate, binValue);

function run(cwd, file, args) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd,
    env: { ...process.env, HANDOFF_BOARD_FILE: file },
    encoding: "utf8",
    timeout: 15000,
  });
}
function okJson(result, label) {
  assert.equal(result.status, 0, label + " should exit 0; stderr=" + result.stderr);
  assert.equal(result.stderr.trim(), "", label + " should not write stderr on success");
  return JSON.parse(result.stdout);
}
function fail(result, label) {
  assert.notEqual(result.status, 0, label + " should exit non-zero");
}

const root = await mkdtemp(path.join(tmpdir(), "atenea-g1-eval-"));
const state = path.join(root, "board.json");

const a1 = okJson(run(root, state, ["add", "  Write handoff  "]), "add normal");
assert.equal(a1.id, 1);
assert.equal(a1.priority, "normal");
assert.equal(a1.completed ?? a1.done ?? false, false);

const a2 = okJson(run(root, state, ["add", "Urgent review", "--priority", "high"]), "add high");
assert.equal(a2.id, 2);
assert.equal(a2.priority, "high");

const a3 = okJson(run(root, state, ["add", "Later cleanup", "--priority", "low"]), "add low");
assert.equal(a3.id, 3);

const a4 = okJson(run(root, state, ["add", "Second normal"]), "add second normal");
assert.equal(a4.id, 4);

let list = okJson(run(root, state, ["list"]), "list");
assert.deepEqual(list.map(x => x.id), [2, 1, 4, 3], "priority then creation order");

const beforeUnknown = await readFile(state, "utf8");
fail(run(root, state, ["done", "999"]), "done unknown");
assert.equal(await readFile(state, "utf8"), beforeUnknown, "unknown done must not mutate state");

const done = okJson(run(root, state, ["done", "2"]), "done existing");
assert.equal(done.id, 2);
list = okJson(run(root, state, ["list"]), "list after done");
assert.deepEqual(list.map(x => x.id), [1, 4, 3]);

const a5 = okJson(run(root, state, ["add", "New high", "--priority", "high"]), "add after completion");
assert.equal(a5.id, 5, "IDs must be monotonic and never reused");

const beforeBlank = await readFile(state, "utf8");
fail(run(root, state, ["add", "   "]), "blank title");
assert.equal(await readFile(state, "utf8"), beforeBlank, "blank title must not mutate state");

const beforePriority = await readFile(state, "utf8");
fail(run(root, state, ["add", "Bad priority", "--priority", "urgent"]), "invalid priority");
assert.equal(await readFile(state, "utf8"), beforePriority, "invalid priority must not mutate state");

const persisted = okJson(run(root, state, ["list"]), "separate-process persistence");
assert.deepEqual(persisted.map(x => x.id), [5, 1, 4, 3]);

const corrupt = path.join(root, "corrupt.json");
await writeFile(corrupt, "{ definitely not json", "utf8");
const corruptBefore = await readFile(corrupt, "utf8");
fail(run(root, corrupt, ["list"]), "corrupt state");
assert.equal(await readFile(corrupt, "utf8"), corruptBefore, "corrupt state must not be overwritten");

const defaultRoot = await mkdtemp(path.join(tmpdir(), "atenea-g1-default-"));
const defaultRun = spawnSync(process.execPath, [cli, "add", "Default location"], {
  cwd: defaultRoot,
  env: Object.fromEntries(Object.entries(process.env).filter(([k]) => k !== "HANDOFF_BOARD_FILE")),
  encoding: "utf8",
  timeout: 15000,
});
okJson(defaultRun, "default storage add");
const defaultState = JSON.parse(await readFile(path.join(defaultRoot, ".handoff-board.json"), "utf8"));
assert.ok(defaultState, "default storage file must exist and contain JSON");

console.log(JSON.stringify({
  benchmark: "G1",
  result: "PASS",
  checks: 24
}));
