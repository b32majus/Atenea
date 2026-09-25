# Atenea — Execution profile selection policy v1

Status: **CURRENT EXECUTION POLICY**
Date: 2026-09-25

## 1. Purpose

Atenea uses native Gentle model profiles. It does not implement a model router, quota scheduler or fallback controller.

For every planned ticket/train, execution-profile choice is an explicit pre-writer decision. The profile changes model/budget routing only; it does not change acceptance, deterministic verification, native `review_due`, reviewer authority, correction semantics, acknowledgement/burn, STOP behavior or publication authority.

```text
product scope accepted
→ composition forecast
→ delivery composition resolved
→ execution profile selected and resolved natively
→ writer authority
```

`docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` remains the single authority for numeric composition bands.

## 2. Normal profile catalog

| Profile | Status | Normal use |
|---|---|---|
| `native-balanced` | active global baseline | General-purpose route. GLM 5.3 Flash owns implementation-heavy roles; DeepSeek provides independent analysis/verification; Luna/Sol own review diversity. |
| `native-v4-heavy` | positive-field-canary candidate | Move high-volume implementation to DeepSeek V4 Flash while GLM remains the independent orchestration/verification/correction side. PROMueve Nexus F3.2/#403 is the first positive field canary; broader equivalence is not yet established. |
| `native-economy` | experimental, eligibility-gated | DeepSeek + Qwen execution route validated positively in one Symphonia field canary, but not yet established as globally quality-equivalent. |

`native-nan` is a qualified rollback profile. It is **not** a normal preflight choice and must not become an invisible fallback.

The global HOME active profile remains `native-balanced`. Parallel projects should use Gentle's native repository/local pin mechanism when they need another **subagent route** rather than changing unrelated repositories by global side effect. Orchestrator selection remains session-owned and is handled separately when it differs.

## 3. Selection boundary

Choose the route before the first writer edit for the selected ticket/train and record it in the execution contract/hardening surface when one exists.

A declared profile is not writer-ready merely because its JSON and pin look correct. Static conformance must validate the native `profiles.json` envelope (`kind`, `version`), complete desired-state snapshots and the effective pin resolution for the target repository when a pin is used.

For the **first field use of a candidate profile**, after a material routing/profile-store change, after a Gentle update that changes profile/pin semantics, or after any observed routing mismatch, writer authority additionally requires one real **read-only child probe** through Gentle's native subagent launch path. The probe must target the materially relevant native child role (for `native-v4-heavy`, `gentle-ai-worker`), report the effective `PI_PROVIDER`, `PI_MODEL`, `PI_REASONING_LEVEL`, working directory and `git status --porcelain`, then stop without mutation. The observed provider/model/reasoning must match the intended child route; mismatch is STOP and the attempt is not profile-quality evidence.

A successful static resolution does not replace this runtime probe when the gate above applies, and Atenea does not implement a custom child launcher to perform it.

The chosen profile is stable through every active work-unit/review lineage. Do not switch profiles because a reviewer found a defect, because a provider is slower than expected or because one quota bucket is temporarily inconvenient.

A new profile decision is allowed only at a clean boundary: the current lineage is terminal/abandoned through native authority, required evidence is preserved, and the next candidate has not started writing. Independently bounded tickets in a train may therefore choose again at ticket boundaries; a train intentionally launched under one route keeps that route until its declared boundary.

There is no automatic quota-based profile selection and no silent fallback.

## 4. `native-balanced`

Use `native-balanced` when no stronger reason selects another route. It remains the global baseline and the safest known general route.

It is particularly appropriate when the work has high architectural novelty, broad cross-cutting change, complex concurrency/temporal semantics, large-context reasoning or repeated semantic corrections. Unresolved product/domain/security authority is still STOP; selecting balanced does not manufacture authority.

## 5. `native-v4-heavy`

`native-v4-heavy` is a quality-preserving complementary routing experiment, not an economy tier.

Its key independence pattern is:

```text
DeepSeek V4 Flash writes the high-volume implementation
→ GLM 5.3 Flash verifies / judge-A / fixes independently
→ Luna / Sol retain native review roles
```

The orchestrator remains GLM 5.3 Flash initially. This changes one major variable at a time: implementation volume moves to V4 while planning and the independent counter-model remain familiar.

PROMueve Nexus F3.2 / issue #403 completed the first valid field canary with the probe and both implementation workers observed on DeepSeek V4 Flash high, WU-A and WU-B `APPROVED + BURNED`, composed deterministic gates green and no post-RDD F3.2 blocker. The profile therefore advances to **positive-field-canary candidate**, not to default or globally quality-equivalent. Evidence: `docs/vnext/NATIVE_V4_HEAVY_PROMUEVE_CANARY_20260925.md`.

Continue capturing deterministic first-pass result, native review findings/corrections, post-RDD findings when audited, wall time and role/model token evidence when available. A normal correction does not itself invalidate the profile. Prefer a second canary that exercises a different work class.

## 6. `native-economy` eligibility

Economy is selected only when **all** of the following are true before writer authority:

- product/domain authority is closed enough for execution; no open semantic decision is being delegated to the model;
- acceptance is independently falsifiable with strong deterministic tests/oracles appropriate to the risk;
- delivery composition is resolved and planned units stay in the normal target band of `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`;
- no unattended size exception is required; forecast soft-overage/exception pressure triggers a fresh route/composition decision rather than cheap-model persistence;
- implementation is bounded and has low design openness/novelty;
- native provider review remains available as an independent gate when `review_due=true`;
- the task is not relying on the profile to weaken security, privacy, tenancy, temporal, concurrency or other domain invariants.

A CRITICAL task is not economy-eligible by default. Using economy for one requires an explicit human/Cora decision plus an independent read-only challenge before implementation; it is never selected unattended.

Work with new architecture, broad cross-cutting refactors, novel security/privacy/tenancy boundaries, complex concurrency, delicate temporal semantics, unusually large context, or repeated semantic/architectural failures is economy-ineligible by default. Choose `native-balanced` or `native-v4-heavy` explicitly instead.

Unresolved product authority, contradictory canonical authority, governance decisions, UX doctrine or security/privacy boundaries are not routing problems. STOP and return to shaping/human authority.

## 7. Economy degradation / escalation

One ordinary finding/correction is not proof that economy failed. Follow the native correction lifecycle.

Repeated semantic/architectural failures plausibly attributable to the route are a degradation signal. STOP at the next valid lifecycle boundary, preserve evidence and make a new explicit profile decision. Do not switch to balanced or V4-heavy inside the active lineage.

Provider STOP is always binding regardless of profile.

## 8. Evidence before broader economy promotion

Do not infer global quality equivalence from one approved native review or one project canary. Compare several projects/work classes using at least:

- tokens/cost per accepted work unit when observable;
- wall time;
- deterministic first-pass pass rate;
- review findings and severity;
- correction rate / correction-budget consumption;
- escalations and context-budget failures;
- actual work-unit size/reslice frequency;
- post-RDD independent-audit defects per accepted work unit.

The last metric is especially important because Symphonia's first canary passed deterministic and native-review gates yet a later independent audit still found additional semantic corners.

## 9. Native ownership and orchestrator scope

Profile selection uses Gentle's supported profile/pin surfaces. Atenea versions secret-free desired state in `config/native-gentle/*.profile.json` and verifies conformance; it does not proxy subagents or rewrite provider lifecycle decisions.

Gentle Pi repository/local profile pins resolve **subagent routes only**. They do not move the parent/orchestrator model. When a selected profile's desired orchestrator differs from the current Pi session — notably `native-economy` versus a global `native-balanced` HOME — preflight must select and verify the orchestrator separately through Pi's native model surface. Never infer orchestrator routing from a repository pin.

A profile selection must never change:

- accepted task scope or product semantics;
- work-unit composition authority;
- `review_due` calculation;
- reviewer/refuter/validator independence;
- correction lifecycle;
- acknowledgement/burn requirements;
- STOP semantics;
- publication/merge authority.
