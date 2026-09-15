# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-15

This ledger prevents model-routing history from being mistaken for current architecture. Model/provider choices are replaceable operational configuration; the Atenea ownership model is defined elsewhere.

## 1. Evidence classes

- `FIELD_PROVEN` — observed in an accepted field/Golden runtime for that exact role.
- `A/B_VALIDATED` — two or more bounded same-problem comparisons with comparable correctness for that role, but not a full field qualification.
- `QUALIFIED` — bounded direct qualification proved the route for the exact role, but it has less natural field history than `FIELD_PROVEN`.
- `ADOPTED_QUALIFIED` — controlled real-work qualification is sufficient to make the route the current default, while field history remains smaller than `FIELD_PROVEN`.
- `CANDIDATE` — promising route that requires qualification before becoming a default.
- `HISTORICAL_DISCONNECTED` — existed in an earlier configuration/architecture but does not govern the adopted current path.
- `UNQUALIFIED` — insufficient current evidence or insufficient routing control.
- `ABORTED_NON_AUTHORITY` — experiment design/run cannot support routing conclusions.

## 2. Roles — never collapse these names

| Role | Boundary |
|---|---|
| **Persistent Gentle-Pi parent / train orchestrator** | Visible Pi + Gentle Pi 2.7 process that retains train/frontier context; owns ticket selection, fresh-child launch, integration, deterministic verification, exact-candidate RDD, checkpoint and frontier progression. |
| **Native Gentle Agent writer/verifier** | Package-owned fresh child inside the persistent parent. Writer is fresh per newly selected ticket in the normal multi-ticket train; verifier is optional/current route below. |
| **Native Gentle lens / refuter / targeted validator** | Provider-owned exact-candidate lifecycle roles. Atenea may pin discoverable lenses through Gentle Pi supported routing authority, but lifecycle ownership remains provider-owned. |
| **Historical Atenea Pi supervisor** | Pre-GP2.7 outer non-Gentle supervisor. No longer present in the normal path; route retained only for rollback/provenance. |
| **Promotion Review** | Separate fresh read-only human-boundary audit. Creates no Gentle/RDD authority and never authorizes merge by itself. |

`PERSISTENT_PARENT != NATIVE_CHILD != NATIVE_REVIEWER != HISTORICAL_OUTER_SUPERVISOR != PROMOTION_REVIEW`.

## 3. Current adopted routing

| Role / phase | Route/model | Evidence | Current interpretation |
|---|---|---|---|
| Persistent Gentle-Pi parent / train orchestrator | `opencode-go/glm-5.3-flash` `high` | `FIELD_PROVEN` + final GP2.7 two-ticket train | Current visible parent/coordinator baseline; retained train authority across two tickets without dropping gates. |
| Native `gentle-ai-worker` | `opencode-go/glm-5.3-flash` `high` | `ADOPTED_QUALIFIED` + GP2.7 final train | Current fresh implementation child route; distinct children completed both tickets in the accepted train. |
| Native `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` `high` | `QUALIFIED` + direct Sep-12 verifier replay | Retained optional verifier route. |
| `review-readability` | `openai-codex/gpt-5.6-luna` `high` | `A/B_VALIDATED` / adopted | Better severity calibration and causal grouping. |
| `review-reliability` | `opencode-go/deepseek-v4.1-flash` `high` | `A/B_VALIDATED` / adopted + final GP2.7 train use | Material behavior/contract lens; both accepted final-train medium candidates used reliability. |
| `review-resilience` | `opencode-go/deepseek-v4.1-flash` `high` | `A/B_VALIDATED` / adopted | Failure/recovery review. |
| `review-risk` | `opencode-go/deepseek-v4.1-flash` `high` | `A/B_VALIDATED` / adopted | Security/authorization/data-risk review. |
| Native refuter | inherit/provider route | `UNQUALIFIED` Atenea pin | No new Atenea pin. |
| Targeted validator | inherit/provider route | `UNQUALIFIED` Atenea pin | No new Atenea pin. |
| Historical outer Atenea Pi supervisor | `opencode-go/deepseek-v4.1-flash` `medium` | `ADOPTED_QUALIFIED` in prior topology | `HISTORICAL_DISCONNECTED` from the normal GP2.7 path; retained only for rollback/reproduction. |
| Gentle parent/coordinator — DeepSeek V4 Flash high | historical Golden evidence | `FIELD_PROVEN` prior epoch | Explicit historical fallback evidence, never silent substitution. |
| Qwen 3.8 Flash refuter / old V4 Pro reviewer pins | historical | `HISTORICAL_DISCONNECTED` | Not current routing policy. |
| Promotion Review | explicit model + thinking per run | current contract | No fixed default; Sol remains escalation-only. |

## 4. Earlier coordinator A/B evidence — 2026-09-06

These bounded **Gentle parent/coordinator planning** comparisons on real PROMueve T8/T9 problems preceded the Sep-12 qualification and remain useful provenance.

### T8 — authorization-freshness defect

| Metric | V4 Flash high | GLM 5.3 Flash high |
|---|---:|---:|
| Correct root cause/minimal design | PASS | PASS |
| Turns | 12 | 10 |
| Input | 94,134 | 29,018 |
| Output | 7,808 | 1,906 |
| Cache read | 342,656 | 194,880 |
| Wall-clock | ~110 s | ~97 s |

### T9 — SES atomic fail-closed design

| Metric | V4 Flash high | GLM 5.3 Flash high |
|---|---:|---:|
| Correct diagnosis/design | PASS | PASS |
| Turns | 13 | 6 |
| Input | 96,808 | 30,089 |
| Output | 10,962 | 4,123 |
| Cache read | 344,192 | 94,272 |
| Wall-clock | ~84 s | ~174 s |

Interpretation: GLM was more context/turn efficient in both cases; latency was mixed. The Sep-12 persistent-coordinator replay adds the stronger longitudinal-state reason for retaining GLM.

## 5. Sep-12 qualification summary

The dated evidence record `docs/ROUTING_QUALIFICATION_EVIDENCE_20260912.md` is the authority for the new role-specific comparisons. Important conclusions:

1. Worker competence alone did not justify a single-model stack: GLM won the discriminating #334 safety boundary, while Luna/V4.1 remained strong elsewhere.
2. RDD lens behavior is role-specific. Readability benefits from Luna's lower review inflation; reliability/resilience/risk benefit from V4.1's causal/mechanism coverage.
3. Persistent coordination values authority-state continuity more than local bug-hunting power; GLM retained its gates while V4.1 dropped an independently open correction gate after RDD closure.
4. Verification and RDD are deliberately diverse. On historical #340, Luna and V4.1 found different real defects; the union was materially stronger than either alone.
5. Refuter/validator were not newly qualified for an Atenea pin. Their historical machine profiles must be cleared rather than accidentally treated as policy.

## 6. Machine/global cutover obligation

Gentle Pi 2.7 uses `~/.pi/gentle-ai/models.json` as supported global routing authority for discoverable Gentle roles. Repository policy is operationally complete only when the effective machine/global config and installed `~/.pi/agent/subagents.json` agree with the adopted table above, unless a detected/accepted project-local override intentionally supersedes them.

The persistent parent is launched directly with the GLM high route and therefore is not merely inferred from a machine default. There is no normal outer supervisor launch literal after the GP2.7 topology cutover.

Explicit `{}` entries for `review-refuter` and `review-validator` clear stale historical pins. Detect any target-repo project-local override before pinned work; never silently accept route drift.

The 2026-09-15 operational promotion preserved the existing `models.json` and `subagents.json` hashes while upgrading Gentle Pi 2.6.0 → 2.7.0 and global Gentle AI main@... → stable 2.9.1. A scan found no non-evidence project-local `.pi/settings.json` pinning Gentle Pi at that time.

The current Pi 0.85.1 / pi-lens 3.8.74 combination remains a separate operational exception: Lens is disabled globally because it caused severe slowdown. Package retention is allowed; re-enable only after separate qualification.

## 7. What remains genuinely open

1. Native refuter/validator model pinning remains open; no new Atenea pin is adopted.
2. GLM native-writer route should continue accumulating natural field history.
3. Future pi-lens versions may be requalified against the then-current Pi release; no Atenea adapter is planned.
4. Promotion Review stays explicit per run; no routine Sol pin is introduced.
5. Future GP/Gentle version changes require bounded compatibility/replacement evidence before changing the current parent/START/adoption contract.

Do not block normal work on these questions. Current routing is explicit, diverse and fail-closed; future changes need role-specific evidence and no silent fallback.
