# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-06

This ledger prevents model-routing history from being mistaken for current architecture. Model/provider choices are replaceable operational configuration; the Atenea ownership model is defined elsewhere.

## 1. Evidence classes

- `FIELD_PROVEN` — observed in an accepted field/Golden runtime for that exact role.
- `A/B_VALIDATED` — two or more bounded same-problem comparisons with comparable correctness for that role, but not a full field qualification.
- `CANDIDATE` — promising route that requires qualification before becoming a default.
- `HISTORICAL_DISCONNECTED` — existed in an earlier configuration/architecture but does not govern the adopted current path.
- `UNQUALIFIED` — insufficient current evidence or insufficient routing control.
- `ABORTED_NON_AUTHORITY` — experiment design/run cannot support routing conclusions.

## 2. Roles — never collapse these names

| Role | Boundary |
|---|---|
| **Atenea Pi supervisor** | Outside Gentle-Pi. Non-implementing residual train control: bounded consent decision/relay, FINAL/checkpoint reconciliation, next frontier/STOP, fresh-worker launch. Executes zero Gentle lifecycle commands. |
| **Gentle-Pi Pi parent / Gentleman coordinator** | Inside each fresh Pi+Gentle-Pi worker session. Interprets the ticket and coordinates the internal Gentle execution path. |
| **Builder/writer** | Concrete implementation role only if a supported internal delegation seam is actually available and separately qualified. |
| **Native Gentle lens / refuter / targeted validator** | Provider-owned exact-candidate lifecycle roles. Do not confuse old subagent model config with current native Gentle-Pi routing. |
| **Promotion Review** | Separate fresh read-only human-boundary audit. Creates no Gentle/RDD authority and never authorizes merge by itself. |

`SUPERVISOR != GENTLE_COORDINATOR != BUILDER != NATIVE_REVIEWER != PROMOTION_REVIEW`.

## 3. Current routing evidence

| Role | Route/model | Evidence | Current interpretation |
|---|---|---|---|
| Atenea Pi supervisor | DeepSeek V4 Flash `medium` | `FIELD_PROVEN` | Golden T8→T10. This is the adopted residual supervisor baseline. |
| Gentle parent/coordinator | DeepSeek V4 Flash `high` | `FIELD_PROVEN` — **collapsed Golden mode** | In Golden T8→T10 no delegated writer was active; the Pi/Gentle worker performed coordinator + implementation. This proves capability, not that V4 is the best coordinator. |
| Gentle parent/coordinator | GLM 5.3 Flash `high` | `A/B_VALIDATED` + `CANDIDATE` | Preferred coordinator candidate from two bounded real PROMueve T8/T9 comparisons: comparable correct diagnosis/design, markedly fewer turns/context, mixed wall-clock. Not yet Golden field-qualified in this exact role. |
| Separate builder/writer | none | `UNQUALIFIED` / not required | Current Golden path does not require internal writer delegation. Do not activate `pi-subagents` merely to create this layer. |
| Luna as delegated writer | historical attempts | `HISTORICAL_DISCONNECTED` / inconclusive | Earlier `pi-subagents`/Luna attempts did not establish a productive current writer seam. No current requirement. |
| Native Gentle lenses | current model route | `UNQUALIFIED` | Gentle-Pi 2.4 host relay launches opaque Pi without an Atenea per-run model pin. Overnight reconstruction strongly points to the then machine-global Muse Spark default, but receipts did not preserve model id; treat that historical attribution as likely, not certain. |
| Old V4 Pro/V4 reviewer pins | old subagent config | `HISTORICAL_DISCONNECTED` | Do not treat as current native Gentle-Pi lens routing. |
| Native refuter | current model route | `UNQUALIFIED` | No current qualified pin. |
| Qwen 3.8 Flash refuter | old subagent config | `HISTORICAL_DISCONNECTED` | Earlier idea/config only; never qualified as current native Gentle-Pi refuter. |
| Targeted validator | current model route | `UNQUALIFIED` | No current qualified pin. |
| Promotion Review | explicit model + thinking per run | current contract; several successful bounded runs | No fixed default. V4 and GLM have completed bounded reviews; Luna may be selectively evaluated. No silent fallback. |
| Qualification issue #66 | GLM/V4 whole-worker replay | `ABORTED_NON_AUTHORITY` | Wrong role under test after supervisor/coordinator conflation. No routing conclusion. |

## 4. Coordinator A/B evidence captured 2026-09-06

These were bounded **Gentle parent/coordinator planning** comparisons on two real PROMueve problems. They were not supervisor tests and not full unattended trains. Session-time telemetry was captured during the qualification conversation; the original raw A/B Pi session paths were not retained as a durable Atenea artefact, so the values below are evidence snapshots, not field qualification.

### T8 — known authorization-freshness defect

| Metric | V4 Flash high | GLM 5.3 Flash high |
|---|---:|---:|
| Correct root cause/minimal design | PASS | PASS |
| Turns | 12 | 10 |
| Input | 94,134 | 29,018 |
| Output | 7,808 | 1,906 |
| Cache read | 342,656 | 194,880 |
| Wall-clock | ~110 s | ~97 s |

GLM also showed tighter scope discipline by refusing to broaden the accepted Repair C into unrelated cancellation semantics.

### T9 — SES atomic fail-closed design

| Metric | V4 Flash high | GLM 5.3 Flash high |
|---|---:|---:|
| Correct diagnosis/design | PASS | PASS |
| Turns | 13 | 6 |
| Input | 96,808 | 30,089 |
| Output | 10,962 | 4,123 |
| Cache read | 344,192 | 94,272 |
| Wall-clock | ~84 s | ~174 s |

Interpretation: GLM was dramatically more context/turn efficient in both cases; latency was mixed. Economic cents are not the promotion criterion.

## 5. What remains genuinely open

The next routing qualification, if a real train makes it useful, is **not** “GLM as supervisor”. The supervisor baseline is already V4 Flash medium.

The useful questions are:

1. Can GLM 5.3 Flash run as the actual Gentle parent/coordinator in the supported current topology without degrading field outcomes?
2. Can native Gentle lens/refuter/validator model routes be made explicit and observable through an upstream-supported per-run surface, without wrapper/internals changes?
3. If current upstream later exposes a reliable delegated-writer seam, does separating coordinator from builder materially improve context/quality enough to justify the extra layer?

Do not block normal PROMueve work waiting for these experiments. Use a future real train as evidence when convenient.
