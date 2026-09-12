# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-12

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
| **Atenea Pi supervisor** | Outside Gentle-Pi. Non-implementing residual train control: bounded consent decision/relay, FINAL/checkpoint reconciliation, next frontier/STOP, fresh-worker launch. Executes zero Gentle lifecycle commands. |
| **Gentle-Pi Pi parent / Gentleman coordinator** | Inside each fresh Pi+Gentle-Pi worker session. Interprets the ticket and coordinates the internal Gentle execution path. |
| **Native Gentle Agent writer/verifier** | Optional package-owned inner delegation inside one fresh ticket worker. Does not own the outer ticket, RDD or publication boundary. |
| **Native Gentle lens / refuter / targeted validator** | Provider-owned exact-candidate lifecycle roles. Atenea may pin a model to a discoverable lens through Gentle Pi's supported global model-routing authority, but that does not transfer lifecycle ownership. |
| **Promotion Review** | Separate fresh read-only human-boundary audit. Creates no Gentle/RDD authority and never authorizes merge by itself. |

`SUPERVISOR != GENTLE_COORDINATOR != BUILDER != NATIVE_REVIEWER != PROMOTION_REVIEW`.

## 3. Current adopted routing

| Role / phase | Route/model | Evidence | Current interpretation |
|---|---|---|---|
| Atenea Pi supervisor | `opencode-go/deepseek-v4.1-flash` `medium` | `ADOPTED_QUALIFIED` | Current residual supervisor baseline; non-implementing, Gentle Pi OFF. Supersedes the historical V4 Flash supervisor route. V4.1 is strongly qualified in Sep-12 review/audit work; exact supervisor-route field history begins at the #75 machine cutover/canary. |
| Gentle parent/coordinator | `opencode-go/glm-5.3-flash` `high` | `FIELD_PROVEN` + Sep-12 controlled comparison | Current parent/coordinator baseline. V4.1 showed stronger local audit in #340 but lost its own open correction gate across phases; GLM preserved longitudinal authority state. |
| Gentle parent/coordinator | DeepSeek V4 Flash `high` | `FIELD_PROVEN` — collapsed Golden mode | Proven capable in Golden T8→T10. Retained as explicit historical fallback evidence, never a silent substitution. |
| Native `gentle-ai-worker` | `opencode-go/glm-5.3-flash` `high` | `ADOPTED_QUALIFIED` | Two real PROMueve worker replays. #317 tied; #334 discriminated in GLM's favor on explicit title↔SES/pathology coherence missed by Luna/V4.1. |
| Native `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` `high` | `QUALIFIED` + direct Sep-12 verifier replay | Retained. On historical #340 Luna found the shared-surface regression plus two independent contract defects that V4.1 missed. |
| `review-readability` | `openai-codex/gpt-5.6-luna` `high` | `A/B_VALIDATED` / adopted | Better severity calibration and causal grouping; V4.1 over-elevated a maintainability-only regression. |
| `review-reliability` | `opencode-go/deepseek-v4.1-flash` `high` | `A/B_VALIDATED` / adopted | Stronger mandate coverage and before/after causal evidence in the installed GP2.5 lens contract. |
| `review-resilience` | `opencode-go/deepseek-v4.1-flash` `high` | `A/B_VALIDATED` / adopted | Exact planted-defect recall with strong mechanism evidence; diversity from Luna verifier is valuable. |
| `review-risk` | `opencode-go/deepseek-v4.1-flash` `high` | `A/B_VALIDATED` / adopted | Best causal grouping + blocker calibration. GLM Flash over-split one OR root cause into three blockers. |
| Native refuter | inherit/provider route | `UNQUALIFIED` Atenea pin | No new Atenea pin. Clear stale historical machine profile during cutover; provider still owns when refutation is required. |
| Targeted validator | inherit/provider route | `UNQUALIFIED` Atenea pin | No new Atenea pin. Clear stale historical machine profile during cutover. |
| Qwen 3.8 Flash refuter | old subagent config / benchmark evidence | `HISTORICAL_DISCONNECTED` | High recall but review inflation in Sep-12 benchmark; not a current route. |
| Old V4 Pro/V4 reviewer pins | old subagent config | `HISTORICAL_DISCONNECTED` | Superseded. Do not let stale machine profiles silently survive the #75 cutover. |
| Promotion Review | explicit model + thinking per run | current contract | No fixed default and no silent fallback. Sol remains escalation-only when risk justifies it. |

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

Gentle Pi 2.5 uses `~/.pi/gentle-ai/models.json` as supported global routing authority and applies it to discoverable agent profiles. The outer supervisor is not a Gentle agent, so its `opencode-go/deepseek-v4.1-flash` / `medium` route is a pre-resolved Pi launch literal rather than a `models.json` entry. Repository policy is not operationally complete until both the outer launch literal and the Gentle effective profiles match the adopted table above.

After repository acceptance, reconcile the global model config and the effective `~/.pi/agent/subagents.json` / installed frontmatter. Explicit `{}` entries for `review-refuter` and `review-validator` clear stale historical pins. Detect any target-repo project-local override before pinned work; never silently accept route drift.

The current Pi 0.85.1 / pi-lens 3.8.74 combination is a separate operational exception: Lens is disabled globally because it caused severe slowdown even without Gentle Pi and remained slow with exposed Lens features disabled. Package retention is allowed; re-enable only after a separate upstream-version qualification.

## 7. What remains genuinely open

1. Native refuter/validator model pinning remains open; no new Atenea pin is adopted here.
2. The newly adopted V4.1 supervisor route and GLM native-writer route should accumulate normal field history before being upgraded from `ADOPTED_QUALIFIED` to `FIELD_PROVEN` for their exact roles.
3. Future pi-lens versions may be requalified against the then-current Pi release; no Atenea adapter is planned.
4. Promotion Review stays explicit per run; no routine Sol pin is introduced.

Do not block normal work on these questions. Current routing is explicit, diverse and fail-closed; future changes need role-specific evidence and no silent fallback.
