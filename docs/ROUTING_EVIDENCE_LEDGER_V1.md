# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-08

This ledger prevents model-routing history from being mistaken for current architecture. Model/provider choices are replaceable operational configuration; the Atenea ownership model is defined elsewhere.

## 1. Evidence classes

- `FIELD_PROVEN` — observed in an accepted field/Golden runtime for that exact role.
- `A/B_VALIDATED` — two or more bounded same-problem comparisons with comparable correctness for that role, but not a full field qualification.
- `QUALIFIED` — bounded direct qualification proved the route for the exact role, but it has less natural field history than `FIELD_PROVEN`.
- `CANDIDATE` — promising route that requires qualification before becoming a default.
- `HISTORICAL_DISCONNECTED` — existed in an earlier configuration/architecture but does not govern the adopted current path.
- `UNQUALIFIED` — insufficient current evidence or insufficient routing control.
- `ABORTED_NON_AUTHORITY` — experiment design/run cannot support routing conclusions.

## 2. Roles — never collapse these names

| Role | Boundary |
|---|---|
| **Atenea Pi supervisor** | Outside Gentle-Pi. Non-implementing residual train control: bounded consent decision/relay, FINAL/checkpoint reconciliation, next frontier/STOP, fresh-worker launch. Executes zero Gentle lifecycle commands. |
| **Gentle-Pi Pi parent / Gentleman coordinator** | Inside each fresh Pi+Gentle-Pi worker session. Interprets the ticket and coordinates the internal Gentle execution path. |
| **Native Gentle Agent writer/verifier** | Optional package-owned inner delegation inside one fresh ticket worker. Does not own the outer ticket, RDD or publication boundary. |
| **Native Gentle lens / refuter / targeted validator** | Provider-owned exact-candidate lifecycle roles. Do not confuse old subagent model config with current Gentle-Pi host-relay model selection. |
| **Promotion Review** | Separate fresh read-only human-boundary audit. Creates no Gentle/RDD authority and never authorizes merge by itself. |

`SUPERVISOR != GENTLE_COORDINATOR != BUILDER != NATIVE_REVIEWER != PROMOTION_REVIEW`.

## 3. Current routing evidence

| Role | Route/model | Evidence | Current interpretation |
|---|---|---|---|
| Atenea Pi supervisor | `opencode-go/deepseek-v4-flash` `medium` | `FIELD_PROVEN` | Golden T8→T10. Adopted residual supervisor baseline; non-implementing and Gentle Pi OFF. |
| Gentle parent/coordinator | `opencode-go/glm-5.3-flash` `high` | `FIELD_PROVEN` | Earlier T8/T9 A/B evidence plus successful real PROMueve use on 2026-09-07. Adopted normal parent/coordinator baseline. |
| Gentle parent/coordinator | DeepSeek V4 Flash `high` | `FIELD_PROVEN` — collapsed Golden mode | Proven capable in Golden T8→T10. Retained as explicit fallback evidence, never a silent substitution. |
| Native Gentle Agent writer | `openai-codex/gpt-5.6-luna` `high` | `QUALIFIED` + adopted profile | Gentle Pi 2.5 package-owned child launch and real bounded C1 implementation replay passed frozen/focused checks. Keep high; do not downgrade for negligible cost savings. |
| Native Gentle Agent verifier | `openai-codex/gpt-5.6-luna` `high` | `QUALIFIED` profile | Package-owned native-agent seam qualified; verifier remains optional and fresh when used. |
| Native Gentle lenses | current host-relay model route | `UNQUALIFIED` per-lens pin | Gentle Pi 2.5 selects the provider-owned lifecycle role, then launches an isolated Pi reviewer without parent `--model`/`--provider` literals. Atenea has no adopted per-lens model pin; do not infer the parent model. |
| Old V4 Pro/V4 reviewer pins | old subagent config | `HISTORICAL_DISCONNECTED` | Do not treat as current native Gentle-Pi lens routing. |
| Native refuter | current host-relay model route | `UNQUALIFIED` per-lens pin | No current Atenea pin. Provider owns when a refuter is required. |
| Qwen 3.8 Flash refuter | old subagent config | `HISTORICAL_DISCONNECTED` | Earlier idea/config only; never qualified as current native Gentle-Pi refuter. |
| Targeted validator | current host-relay model route | `UNQUALIFIED` per-lens pin | No current Atenea pin. Provider owns when targeted validation is required. |
| Promotion Review | explicit model + thinking per run | current contract; several successful bounded runs | No fixed default and no silent fallback. Use stronger routes such as Sol when risk justifies it. |
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

GLM 5.3 Flash high is no longer the open coordinator question; it is the adopted parent/coordinator baseline. Gentle Pi 2.5 also closes the earlier “is there a supported delegated-writer seam?” question by shipping native Gentle Agents.

The useful remaining routing questions are narrower:

1. Can native Gentle lens/refuter/targeted-validator **model** routes be made explicit and observable through an upstream-supported per-run/per-role surface, without wrappers or internal patches?
2. Does real workload evidence justify any additional native-agent profiles beyond the adopted Luna-high writer/verify pair?
3. When a Promotion Review is required, which explicit strong route best matches the risk and current subscription budget?

Do not block normal work on these questions. Current unattended routing is sufficient and fail-closed; future changes need evidence and no silent fallback.
