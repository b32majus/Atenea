# Atenea — Gentle reviewer continuation contract v1

Status: **CURRENT / NORMATIVE FOR THE ADOPTED PI + GENTLE-PI WORKER PATH**
Date: 2026-09-06
Tracking: Atenea #56
Marker: `ATENEA_GENTLE_REVIEWER_CONTINUATION_V1`

## Purpose

Preserve the native reviewer continuation that completed PROMueve T5 final qualification with all required lenses, acknowledgement/burn and zero external touch.

This file does not replace Gentle review authority or implement a parallel reviewer controller. It tells the Pi/Gentle-Pi worker how to follow provider-owned `gentle_review` transitions without reconstructing opaque state.

## Ownership

- Gentle owns candidate identity, lineage, reviewer selection, bindings, forecasts, reviewer execution, terminal review state and acknowledgement/burn.
- The Pi/Gentle-Pi worker executes the provider-owned lifecycle.
- The outer Pi supervisor executes zero Gentle lifecycle commands.
- The supervisor may authorize only a bounded reviewer-cost forecast already inside the human-authorized run.
- Atenea must never synthesize a reviewer result, binding, lineage, target, subject hash or acknowledgement token.

## Opaque-state rule

Every `collectBinding`, continuation binding, target identity, lineage id, revision, repository-context handle, subject hash and provider acknowledgement input is opaque.

The worker MUST NOT reconstruct, summarize, normalize, edit or manually repair those values. It must reuse the exact provider-returned values.

## Reviewer collection protocol

1. After review consent is granted and the provider requests `review.status`, call the supported `gentle_review` status facade for the current lineage.
2. When status returns `next_transition.kind=collect` / `reason_code=reviewer_results_required`, treat `collectBindings` as the complete provider-owned collection request for that revision.
3. `action=stop` inside that status means stop replaying status and perform the advertised collect transition. It is **not** an Atenea run STOP.
4. If more than one binding is returned, use the native group-capture surface with the exact ordered binding array. If exactly one binding is returned, use the native single-capture surface with that exact binding.
5. Do not explode a provider group into independent hand-authored captures merely to simplify the call.
6. The first capture may return `status=blocked`, `outcome=reviewer-model-run-forecast` and a `cost_forecast` such as `transport=pi_host_relay`, `model_runs=N`, ordered lenses.
7. A reviewer-model-run forecast is an authorization transition, not a review failure and not a terminal state.
8. Relay only the bounded forecast facts needed for authorization: lineage/current candidate identity, transport, model-run count and ordered lenses. Never send or rewrite the opaque bindings for supervisor interpretation.
9. If the bounded forecast is authorized, re-run the **same capture operation with the exact same ordered bindings** and set only `reviewerRunAcknowledged=true` as required by the native facade.
10. If the forecast is declined, stop the review path and report the exact provider state; do not execute reviewers.

## In-flight rule

Once an acknowledged native reviewer capture has been submitted, it is in flight until that tool call returns.

- Do not infer failure from elapsed wall-clock time, pane silence, model latency or an external observation timeout.
- Do not issue another capture for the same slot while the acknowledged call remains in flight.
- Do not send FINAL/STOP based on earlier malformed attempts while a later valid acknowledged capture is still running.
- A supervisor or external observer must not terminate the run merely because an in-flight capture has not yet produced an event.

## Terminal review and acknowledgement

After the acknowledged capture returns, follow the provider-issued next transition. Do not infer approval solely from a successful tool invocation.

A review is publishable only when Gentle reports the candidate approved with every required lens terminal for the current revision. `UNATTENDED_PASS` remains separate from product acceptance.

If Gentle requires `acknowledge-approved`, invoke the native facade using the provider-supported current-lineage operation. Do not synthesize acknowledgement JSON or tokens from prose. The acknowledgement must complete/burn before normal publication.

A candidate mutation after review invalidates whatever authority Gentle says it invalidates; Atenea never carries review approval forward by assumption.

## Failure behavior

- Malformed locally reconstructed binding => harness defect; do not freehand-repair the provider object.
- Binding/target/lineage/revision mismatch => fail closed.
- Forecast mismatch on acknowledgement => fail closed.
- Missing required reviewer lens => not approved.
- Reviewer transport failure after the provider reports no authority progress => preserve exact state and STOP according to current Gentle authority; do not fabricate a lens result.
- Known upstream reviewer transport defects remain upstream defects; Atenea must not bypass required lenses to make a run green.

## Proven T5 reference behavior

PROMueve T5 final qualification (`review-e8412b793c0d303a`) returned four ordered bindings: risk, resilience, readability, reliability. The first native group capture returned a four-run `pi_host_relay` forecast. After bounded supervisor ACK, the worker submitted the exact same group with `reviewerRunAcknowledged=true`; the call completed `native-last-event-closure`, the native RDD finished APPROVED 4/4, and exact acknowledgement/burn completed.

The executable regression fixture is `tools/fixtures/t5-reviewer-lifecycle-golden.json`; `tools/check-atenea-reviewer-lifecycle.mjs` validates this contract and negative transitions without executing or replacing Gentle.