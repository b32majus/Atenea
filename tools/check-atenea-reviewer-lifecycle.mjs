import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  acknowledgeForecast,
  beginAcknowledgedCapture,
  bindingDigest,
  captureSurfaceFor,
  completeAcknowledgedCapture,
  completeAcknowledgementBurn,
  createForecastGate,
  groupDigest,
  isPublishable,
  markReviewApproved,
  mayStopRun,
  validateCollectTransition,
} from "./atenea-reviewer-lifecycle-contract.mjs";

const fixture = JSON.parse(await readFile(new URL("./fixtures/t5-reviewer-lifecycle-golden.json", import.meta.url), "utf8"));
const contract = await readFile(new URL("../docs/GENTLE_REVIEWER_CONTINUATION_V1.md", import.meta.url), "utf8");
const recipe = await readFile(new URL("../docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md", import.meta.url), "utf8");

assert.equal(fixture.schema, "atenea.t5-reviewer-lifecycle-golden/v1");
assert.equal(fixture.lineage_id, "review-e8412b793c0d303a");
assert.equal(fixture.binding_group.count, 4);
assert.deepEqual(fixture.binding_group.ordered_lenses, [
  "review-risk", "review-resilience", "review-readability", "review-reliability",
]);
assert.equal(fixture.binding_group.group_sha256, "d5f9e657ac02be061df87673e0c8e869522e3f22e3de4b57d09bd521d7aff629");
assert.equal(fixture.forecast.transport, "pi_host_relay");
assert.equal(fixture.forecast.model_runs, 4);

assert.match(contract, /ATENEA_GENTLE_REVIEWER_CONTINUATION_V1/);
assert.match(contract, /MUST NOT reconstruct/);
assert.match(contract, /reviewer-model-run forecast is an authorization transition/i);
assert.match(contract, /same capture operation with the exact same ordered bindings/i);
assert.match(contract, /reviewerRunAcknowledged=true/);
assert.match(contract, /in flight until that tool call returns/i);
assert.match(contract, /acknowledgement must complete\/burn before normal publication/i);
const t5Collection = Object.freeze({
  surface: "gentle_review_capture_group",
  bindingDigests: [...fixture.binding_group.binding_sha256],
  groupDigest: fixture.binding_group.group_sha256,
});
const t5Forecast = {
  outcome: fixture.forecast.outcome,
  transport: fixture.forecast.transport,
  modelRuns: fixture.forecast.model_runs,
  lenses: [...fixture.forecast.ordered_lenses],
};
const gate = createForecastGate({
  lineageId: fixture.lineage_id,
  targetIdentity: fixture.target_identity,
  collection: t5Collection,
  forecast: t5Forecast,
});
const ack = {
  decision: "ACK",
  lineageId: gate.lineageId,
  targetIdentity: gate.targetIdentity,
  groupDigest: gate.groupDigest,
  transport: gate.transport,
  modelRuns: gate.modelRuns,
  lenses: [...gate.lenses],
};
assert.throws(() => acknowledgeForecast(gate, { ...ack, modelRuns: 3 }), /forecast ACK mismatch/);
const authorized = acknowledgeForecast(gate, ack);
assert.equal(authorized.phase, "capture_authorized");
assert.throws(() => beginAcknowledgedCapture(authorized, { ...t5Collection, groupDigest: "0".repeat(64) }), /exact binding group/);
const inFlight = beginAcknowledgedCapture(authorized, t5Collection);
assert.equal(inFlight.reviewerRunAcknowledged, true);
assert.equal(mayStopRun(inFlight), false);
const captured = completeAcknowledgedCapture(inFlight, {
  status: fixture.acknowledged_capture.terminal_status,
  outcome: fixture.acknowledged_capture.terminal_outcome,
});
assert.equal(mayStopRun(captured), true);
assert.throws(() => markReviewApproved(captured, {
  requiredLenses: fixture.binding_group.ordered_lenses,
  terminalLenses: fixture.binding_group.ordered_lenses.slice(0, 3),
  reviewState: "approved",
}), /not every required lens/);
const approved = markReviewApproved(captured, {
  requiredLenses: fixture.binding_group.ordered_lenses,
  terminalLenses: [...fixture.binding_group.ordered_lenses].reverse(),
  reviewState: fixture.review.state,
});
assert.equal(isPublishable(approved), false);
assert.throws(() => completeAcknowledgementBurn(approved, {
  status: "blocked", outcome: "native-approved-acknowledgement-input-invalid",
}), /acknowledgement did not close/);
const burned = completeAcknowledgementBurn(approved, {
  status: fixture.review.ack_terminal_status,
  outcome: fixture.review.ack_terminal_outcome,
});
assert.equal(isPublishable(burned), true);

const opaque = "provider-owned::not-json::binding";
assert.match(bindingDigest(opaque), /^[0-9a-f]{64}$/);
const singleStatus = {
  action: "stop",
  next_transition: { kind: "collect", reason_code: "reviewer_results_required" },
  collectBindings: [opaque],
};
const single = validateCollectTransition(singleStatus);
assert.equal(captureSurfaceFor(single.bindings), "gentle_review_capture");
assert.equal(single.surface, "gentle_review_capture");
assert.notEqual(groupDigest([opaque]), groupDigest([opaque + "-mutated"]));
const singleForecast = createForecastGate({
  lineageId: "review-single",
  targetIdentity: "sha256:" + "b".repeat(64),
  collection: single,
  forecast: {
    outcome: "reviewer-model-run-forecast",
    transport: "pi_host_relay",
    modelRuns: 1,
    lenses: ["review-reliability"],
  },
});
const singleAck = acknowledgeForecast(singleForecast, {
  decision: "ACK",
  lineageId: singleForecast.lineageId,
  targetIdentity: singleForecast.targetIdentity,
  groupDigest: singleForecast.groupDigest,
  transport: singleForecast.transport,
  modelRuns: 1,
  lenses: ["review-reliability"],
});
const singleInFlight = beginAcknowledgedCapture(singleAck, single);
assert.equal(mayStopRun(singleInFlight), false);
assert.throws(() => completeAcknowledgedCapture(singleInFlight, { status: "blocked", outcome: "still-running" }), /did not close/);

assert.match(recipe, /ATENEA_REVIEWER_LIFECYCLE_CONTRACT/);
assert.match(recipe, /--append-system-prompt "\$ATENEA_REVIEWER_LIFECYCLE_CONTRACT"/);
assert.match(recipe, /check-atenea-reviewer-lifecycle\.mjs/);
console.log("ATENEA_REVIEWER_LIFECYCLE_CHECK=PASS");
