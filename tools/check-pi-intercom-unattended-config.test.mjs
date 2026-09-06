import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertUnattendedCompatible,
  checkConfigFile,
  resolveAgentDir,
  resolveIntercomConfig,
} from "./check-pi-intercom-unattended-config.mjs";

assert.deepEqual(resolveIntercomConfig(), { enabled: true, confirmSend: false, inboundTrigger: "always", replyHint: true });
assert.deepEqual(assertUnattendedCompatible(resolveIntercomConfig({ enabled: true, confirmSend: false, inboundTrigger: "always" })).inboundTrigger, "always");
assert.throws(() => assertUnattendedCompatible(resolveIntercomConfig({ confirmSend: true })), /confirmSend/);
assert.throws(() => assertUnattendedCompatible(resolveIntercomConfig({ inboundTrigger: "replies" })), /inboundTrigger/);
assert.throws(() => assertUnattendedCompatible(resolveIntercomConfig({ inboundTrigger: "never" })), /inboundTrigger/);
assert.throws(() => assertUnattendedCompatible(resolveIntercomConfig({ enabled: false })), /enabled/);
assert.throws(() => resolveIntercomConfig({ confirmSend: "false" }), /boolean/);
assert.equal(resolveAgentDir({}, "/tmp/home", "/tmp/cwd"), "/tmp/home/.pi/agent");
assert.equal(resolveAgentDir({ PI_CODING_AGENT_DIR: "relative-agent" }, "/tmp/home", "/tmp/cwd"), "/tmp/cwd/relative-agent");

const dir = await mkdtemp(join(tmpdir(), "atenea-intercom-config-"));
try {
  const missing = await checkConfigFile(join(dir, "missing.json"));
  assert.equal(missing.source, "documented-defaults");
  const okPath = join(dir, "ok.json");
  await writeFile(okPath, JSON.stringify({ confirmSend: false, inboundTrigger: "always", enabled: true }), "utf8");
  assert.equal((await checkConfigFile(okPath)).source, okPath);
  const badPath = join(dir, "bad.json");
  await writeFile(badPath, JSON.stringify({ confirmSend: true }), "utf8");
  await assert.rejects(() => checkConfigFile(badPath), /confirmSend/);
} finally {
  await rm(dir, { recursive: true, force: true });
}
console.log("PI_INTERCOM_UNATTENDED_CONFIG_TEST=PASS");
