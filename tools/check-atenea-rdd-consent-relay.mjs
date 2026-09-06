import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { readFile } from "node:fs/promises";
import relayExtension, {
  ATENEA_RDD_OUTBOX_REQUEST,
  ATENEA_RDD_OUTBOX_RESULT,
  buildRelayMessage,
  parseGentleConsentText,
} from "../extensions/atenea-rdd-consent-relay.mjs";

const target = "sha256:" + "a".repeat(64);
const binding = "5e791a84-25b6-4db8-b18f-158fc278443e";
function payload(declinedTarget = target) {
  return JSON.stringify({
    operation: "start", status: "blocked", outcome: "native-review-consent-required",
    consent: {
      schema: "gentle-ai.review-integration.consent/v3", operation: "review.start", action: "consent_required",
      target_identity: target, changed_files: 2, changed_lines: 13,
      choices: [
        { answer: "granted", invocation: `gentle-ai review start --target ${target} --consent granted` },
        { answer: "declined", invocation: `gentle-ai review start --target ${declinedTarget} --consent declined` },
      ],
    },
    consent_binding: binding,
  });
}

const exact = payload();
const record = parseGentleConsentText(exact);
assert.equal(record.rawText, exact);
assert.equal(record.targetIdentity, target);
assert.match(record.payloadSha256, /^[0-9a-f]{64}$/);
assert.ok(buildRelayMessage(record, "worker-x").includes(`\n${exact}\nEND_GENTLE_PROVIDER_PAYLOAD`));
assert.throws(() => parseGentleConsentText(payload("sha256:" + "b".repeat(64))), /target differs/);

const handlers = new Map();
const bus = new EventEmitter();
const oldEnv = { ...process.env };
process.env.ATENEA_RDD_RELAY_REQUIRED = "1";
process.env.ATENEA_WORKER_NAME = "worker-x";
process.env.ATENEA_SUPERVISOR_NAME = "supervisor-x";
process.env.ATENEA_INTERCOM_SCOPE_ID = "scope-x";
process.env.PI_INTERCOM_SCOPE_ID = "scope-x";
const pi = {
  events: bus,
  getSessionName: () => "worker-x",
  on(name, fn) { handlers.set(name, fn); },
};
let sent;
bus.on(ATENEA_RDD_OUTBOX_REQUEST, (request) => {
  sent = request;
  queueMicrotask(() => bus.emit(ATENEA_RDD_OUTBOX_RESULT, { requestId: request.requestId, status: "sent", messageId: "m1" }));
});
relayExtension(pi);
const result = await handlers.get("tool_result")({ toolName: "gentle_review", content: [{ type: "text", text: exact }] });
assert.equal(sent.to, "supervisor-x");
assert.ok(sent.message.includes(`\n${exact}\nEND_GENTLE_PROVIDER_PAYLOAD`));
assert.match(result.content.at(-1).text, /relayed mechanically/);
assert.deepEqual(handlers.get("tool_call")({ toolName: "ask_user_choice" }), {
  block: true,
  reason: "Atenea RDD consent is pending with the supervisor; direct human prompting is forbidden.",
});
process.env.ATENEA_WORKER_NAME = "different-worker";
const mismatch = await handlers.get("tool_result")({ toolName: "gentle_review", content: [{ type: "text", text: exact }] });
assert.equal(mismatch.isError, true);
assert.match(mismatch.content.at(-1).text, /session name mismatch/);
process.env = oldEnv;
const recipe = await readFile(new URL("../docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md", import.meta.url), "utf8");
assert.ok(recipe.includes('Pi --name $SUPERVISOR_NAME'));
assert.ok(recipe.includes('--name "$WORKER_NAME"'));
assert.ok(recipe.includes('PI_INTERCOM_SCOPE_ID="$INTERCOM_SCOPE_ID"'));
assert.ok(recipe.includes('-e "$ATENEA_RDD_RELAY_EXTENSION"'));
assert.ok(recipe.includes('The model is not the transport serializer.'));
console.log("ATENEA_RDD_RELAY_CHECK=PASS");
