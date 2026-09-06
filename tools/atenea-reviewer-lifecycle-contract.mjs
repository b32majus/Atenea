// TEST-ONLY executable oracle model for Atenea reviewer lifecycle invariants.
// This file is not a runtime controller and MUST NOT be imported by worker/supervisor runtime code.
// Gentle remains the sole owner of the actual reviewer lifecycle and provider state.

import { createHash } from "node:crypto";

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

export function bindingDigest(binding) {
  invariant(typeof binding === "string" && binding.length > 0, "collectBinding must be an opaque non-empty string");
  return createHash("sha256").update(binding).digest("hex");
}

export function groupDigest(bindings) {
  invariant(Array.isArray(bindings) && bindings.length > 0, "collectBindings must be a non-empty array");
  for (const binding of bindings) bindingDigest(binding);
  return createHash("sha256").update(JSON.stringify(bindings)).digest("hex");
}

export function captureSurfaceFor(bindings) {
  invariant(Array.isArray(bindings) && bindings.length > 0, "reviewer collection requires at least one binding");
  return bindings.length === 1 ? "gentle_review_capture" : "gentle_review_capture_group";
}

export function validateCollectTransition(status) {
  invariant(status?.next_transition?.kind === "collect", "status must advertise collect as next transition");
  invariant(status?.next_transition?.reason_code === "reviewer_results_required", "collect transition reason mismatch");
  invariant(Array.isArray(status.collectBindings) && status.collectBindings.length > 0, "provider collectBindings missing");
  return {
    surface: captureSurfaceFor(status.collectBindings),
    bindings: [...status.collectBindings],
    bindingDigests: status.collectBindings.map(bindingDigest),
    groupDigest: groupDigest(status.collectBindings),
  };
}
export function createForecastGate({ lineageId, targetIdentity, collection, forecast }) {
  invariant(lineageId, "lineageId required");
  invariant(targetIdentity, "targetIdentity required");
  invariant(forecast?.outcome === "reviewer-model-run-forecast", "forecast outcome mismatch");
  invariant(forecast?.transport === "pi_host_relay", "unexpected reviewer transport");
  invariant(Number.isInteger(forecast?.modelRuns) && forecast.modelRuns > 0, "modelRuns must be positive");
  invariant(Array.isArray(forecast?.lenses), "forecast lenses missing");
  invariant(forecast.modelRuns === forecast.lenses.length, "forecast modelRuns/lenses mismatch");
  invariant(collection.bindingDigests.length === forecast.modelRuns, "binding count/forecast mismatch");
  return Object.freeze({
    phase: "forecast_pending",
    lineageId,
    targetIdentity,
    surface: collection.surface,
    bindingDigests: [...collection.bindingDigests],
    groupDigest: collection.groupDigest,
    transport: forecast.transport,
    modelRuns: forecast.modelRuns,
    lenses: [...forecast.lenses],
  });
}

export function acknowledgeForecast(gate, ack) {
  invariant(gate?.phase === "forecast_pending", "forecast is not pending");
  invariant(ack?.decision === "ACK", "reviewer forecast not authorized");
  for (const key of ["lineageId", "targetIdentity", "groupDigest", "transport", "modelRuns"]) {
    invariant(ack[key] === gate[key], `forecast ACK mismatch: ${key}`);
  }
  invariant(JSON.stringify(ack.lenses) === JSON.stringify(gate.lenses), "forecast ACK lens order mismatch");
  return Object.freeze({ ...gate, phase: "capture_authorized" });
}

export function beginAcknowledgedCapture(gate, collection) {
  invariant(gate?.phase === "capture_authorized", "capture not authorized");
  invariant(collection?.groupDigest === gate.groupDigest, "acknowledged capture must reuse the exact binding group");
  invariant(JSON.stringify(collection.bindingDigests) === JSON.stringify(gate.bindingDigests), "acknowledged capture binding sequence changed");
  invariant(collection.surface === gate.surface, "acknowledged capture surface changed");
  return Object.freeze({ ...gate, phase: "capture_in_flight", reviewerRunAcknowledged: true });
}

export function mayStopRun(state) {
  return state?.phase !== "capture_in_flight";
}
export function completeAcknowledgedCapture(state, result) {
  invariant(state?.phase === "capture_in_flight", "no acknowledged capture is in flight");
  invariant(result?.status === "closed", "acknowledged capture did not close");
  invariant(result?.outcome === "native-last-event-closure", "unexpected acknowledged capture terminal outcome");
  return Object.freeze({ ...state, phase: "awaiting_terminal_review_state" });
}

export function markReviewApproved(state, { requiredLenses, terminalLenses, reviewState }) {
  invariant(state?.phase === "awaiting_terminal_review_state", "review state checked before capture completion");
  invariant(reviewState === "approved", "review is not approved");
  invariant(Array.isArray(requiredLenses) && requiredLenses.length > 0, "required lenses missing");
  invariant(Array.isArray(terminalLenses), "terminal lenses missing");
  invariant(new Set(requiredLenses).size === requiredLenses.length, "required lenses must be unique");
  invariant(new Set(terminalLenses).size === terminalLenses.length, "terminal lenses must be unique");
  invariant(requiredLenses.length === terminalLenses.length, "not every required lens is terminal");
  const terminalSet = new Set(terminalLenses);
  invariant(requiredLenses.every((lens) => terminalSet.has(lens)), "not every required lens is terminal");
  return Object.freeze({ ...state, phase: "approved_unburned", requiredLenses: [...requiredLenses] });
}

export function completeAcknowledgementBurn(state, result) {
  invariant(state?.phase === "approved_unburned", "approval must exist before acknowledgement/burn");
  invariant(result?.status === "closed", "acknowledgement did not close");
  invariant(result?.outcome === "native-approved-acknowledgement-completed", "acknowledgement/burn outcome mismatch");
  return Object.freeze({ ...state, phase: "burned_publishable" });
}

export function isPublishable(state) {
  return state?.phase === "burned_publishable";
}
