# C-078 — Field-harden C-077: adaptive RDD, isolated review routing, bounded resilience recovery, usage telemetry

Status: **SUPERSEDED BY C-079 — PRESERVED FIELD BASE**
Accepted: 2026-09-28  
Superseded operationally: 2026-09-29 by `docs/CURRENT_EXECUTION_DECISION_C079.md`.

C-078 preserves C-077's prepared-ticket implementation topology. It changes no product semantics and does not restore ODD, `gentle-orchestrator` or OpenCode-first implementation.

## Field evidence that triggered this decision

Two real C-077 trains completed on 2026-09-28:

- PROMueve Reuma/Farmacia #442 executed #443/#444/#445 plus corrective #447 and published through PR #449 after composed verification and native Gentle terminal/burn evidence.
- PsO Valme reproduced a required high-risk `review-resilience` slot on DeepSeek V4 returning typed `opencode_task_output_empty` with reasoning-only / zero capturable text while candidate and lineage stayed stable. Repeating fresh hosts on the same V4 route did not help.

Atenea #91 already contained independent earlier evidence of the same role/provider failure class on correctly composed candidates; the exact resilience prompt completed and passed provider admission with Luna while V4 exhausted. The new C-077 field incident promotes that historical evidence into current operational hardening.

Detailed durable evidence: `docs/C078_FIELD_EVIDENCE_20260928.md`.

## 1. C-077 topology remains

```text
Pi supervisor + Herdr
→ ONE plain Pi implementation worker
→ deterministic evidence
→ candidate commit
→ Gentle ASSESS / native lifecycle
→ OpenCode V1 transport only when provider-issued collection is due
→ checkpoint / next-or-STOP
```

## 2. Adaptive RDD is provider-owned

Atenea does not choose review depth or lens names. Native Gentle decides from the frozen candidate.

Current behavior to preserve:

```text
passive / low              → zero lenses
medium + review_due=false  → zero lenses
medium + review_due=true   → one focus lens
high                       → canonical 4R
```

`review_due=false` MUST NOT start an OpenCode review host. Refuter and targeted validator are conditional and run only when Gentle requests them.

Any supervisor that always launches risk/readability/reliability/resilience is incorrect.

## 3. OpenCode review routing is process-local

Concurrent trains must not share mutable routing state. `~/.config/opencode/opencode.json` is a baseline config, not an active-train profile switch.

Normal review-host launch renders the selected profile through:

```bash
OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs <production-volume|complex>)" \
  opencode serve ...
```

The overlay changes only model/variant pins on the process. It relies on OpenCode's normal config merge for agent definitions and other baseline settings.

`tools/apply-opencode-routing-profile.mjs` is maintenance-only and now requires an explicit target file. It must not implicitly rewrite the global config.

## 4. Default reviewer mappings stay stable

C-078 does **not** globally replace the default V4 `review-resilience` pin. The second field train did not provide enough evidence to conclude that every V4 resilience call is defective, and global replacement would unnecessarily reduce model diversity in complex 4R review.

Current defaults remain the two `opencode-*` profile snapshots.

## 5. Bounded same-lineage resilience recovery

Trigger: a required `review-resilience` slot routed to `nan/deepseek-v4-flash` returns typed `opencode_task_output_empty` (completed Task, no capturable result).

Allowed recovery:

1. preserve exact candidate, lineage, revision, target and subject;
2. query **bound STATUS**;
3. require Gentle to reoffer the exact same `review-resilience` slot;
4. start one fresh isolated OpenCode V1 host with the same selected profile plus the then-current C-078 resilience override;
5. that C-078 override changed only `review-resilience` to `openai/gpt-6-luna` high for that host;
6. execute only the fresh provider-owned slot;
7. if the result is admitted, continue the same lineage normally;
8. if the recovery attempt fails or the slot/binding changes unexpectedly, HUMAN STOP.

Forbidden:

- repeated V4 retries after the typed failure;
- RESET/ABANDON/new START merely to change the reviewer route;
- global profile mutation;
- walking through multiple fallback models;
- weakening or skipping the required lens.

This is preserved C-078 provenance. Current recovery mechanics are defined by C-079.

## 6. Efficiency evidence is observational

Atenea now records enough runtime-native usage to answer whether cost moved from implementation into assurance. Telemetry must add no LLM calls and never block a valid product ticket.

For each ticket, when available record:

- implementation model + Pi input/output/cache usage/cost and wall time;
- Gentle risk, changed lines, review_due reason and selected lenses;
- OpenCode review-host/session input/output/reasoning/cache/cost;
- role, model and outcome for each executed lens/refuter/validator;
- typed failed attempts and recovery attempts;
- terminal/burn state.

Derived analysis belongs in `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`. Do not set arbitrary token budgets before enough real tickets exist.

## 7. STOP and publication boundaries are unchanged

Material product/scope/acceptance/oracle/destructive/publication decisions remain HUMAN STOP. Review approval does not grant push/PR/merge/deploy authority.
