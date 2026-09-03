# Atenea — Qualification Status

Date of current status: 2026-09-03

This document is the current qualification index. Stage-specific files remain frozen evidence. Earlier `NEXT`, `DEFERRED` or `NOT_YET_QUALIFIED` labels are historical when they conflict with this file, `README.md`, `docs/CURRENT_DECISIONS.md` or `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

## Overall result

Atenea qualified the upstream-first execution architecture through autonomous frontier exhaustion on the frozen Stage 5–8 baseline.

```text
STAGES_0_4                         PASS
STAGE5_MATT_GENTLE_COMPOSITION    PASS
STAGE6_NATIVE_GENTLE_RDD          PASS
STAGE7_PI_SELF_LAUNCH             PASS
STAGE8_FRONTIER_DISCOVERY         PASS
UNATTENDED_EXECUTION_RC2          PASS
ZERO_HUMAN_TOUCH_RC2              PASS
REMOTE_RECONCILIATION             PASS
FRONTIER_EXHAUSTION_STOP          PASS
```

The result is evidence for a thin supervisory contract, not a recommendation to build a larger Atenea runtime.

## Qualification evidence vs current stable runtime

Do not rewrite historical qualification evidence when upstream advances.

```text
STAGE 5–8 QUALIFICATION EVIDENCE
  Gentle AI 2.5.0-rc.2
  historical and still valid for the properties actually exercised

CURRENT OPERATIONAL TARGET
  Gentle AI 2.5.0 stable
  real-project field evidence captured on Judit #76 / PR #79
```

The Judit field run confirmed that stable `2.5.0` preserves the exact-candidate RDD lifecycle, provider continuation/re-entry on the successful path, approval and exact acknowledgement/burn.

The same investigation corrected an initially over-broad consent diagnosis: stable Gentle still contains provider-owned zero-touch review semantics. The current autonomy gap is specifically the **OpenCode negotiated `gentle-ai.review-integration/v2` route**, whose provider-issued START transition currently includes `--consent relay` and therefore selects candidate-scoped human relay semantics.

Current status:

```text
GENTLE_2_5_STABLE_EXACT_CANDIDATE_RDD    PASS
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY      EXISTS
OPENCODE_NEGOTIATED_V2_ZERO_TOUCH        NOT_SATISFIED
CAUSE                                     V2_NEXT_TRANSITION_FORCES_CONSENT_RELAY
CLASSIFICATION                            UPSTREAM_INTEGRATION_CAPABILITY_GAP
TRACKING                                  issue #36
```

This does **not** invalidate the historical Stage 7/8 rc.2 evidence and does not mean stable Gentle globally lost zero-touch semantics. It means the currently selected negotiated-v2 OpenCode transport does not expose a supported way to select Gentle's unattended consent behavior while preserving provider-issued transitions exactly.

Field evidence: `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

## Qualified ownership split

```text
Matt Pocock upstream skills
  qualified greenfield shaping / task-triggered engineering methods

Pi
  qualified thin autonomous supervisor

Herdr
  qualified process/session substrate

OpenCode
  qualified implementation runtime

Gentle AI
  qualified native RDD / exact-candidate / reviewer / bounded-repair authority

Git / GitHub
  repository/tracker/publication authority

Atenea repo-local policy
  Harness Contract v1 + CODING_STANDARDS.md + repo-specific config only
```

Pi is not an implementation worker or security sandbox. Herdr is not a policy engine.

The stable field run strengthens this boundary: Pi supervises and relays genuine decision envelopes emitted by the selected provider path; the OpenCode/Gentle worker owns all Gentle lifecycle operations and provider-issued review transitions.

## Stage 5 — Matt → Gentle/OpenCode composition — PASS

Complete Matt project skills and complete Gentle/OpenCode compose through durable repository/tracker authority without a custom work-unit schema or Agent Brief translation.

The execution instruction remained effectively:

`Implement GitHub issue #N.`

Frozen evidence: `docs/STAGE5_TRACER_TRAIN.md`.

## Stage 6 — native Gentle RDD — PASS

Gentle AI `2.5.0-rc.2` native RDD was the exact runtime used for the qualified final candidate/review evidence.

Qualified properties include exact-candidate lifecycle, reviewer authority/lineage, bounded repair and invalidation when the candidate changes.

Atenea must not recreate them.

Stable `2.5.0` has now supplied natural field evidence for its provider-owned continuation/re-entry and final acknowledgement/burn lifecycle. Atenea consumes those semantics; it does not retrofit them into historical Stage 6 evidence.

## Stage 7 — Pi self-launch — PASS

Pi remained non-implementing while creating/managing the OpenCode + Gentle worker through Herdr and completing accepted work without a human manually running the worker lifecycle.

Canonical accepted Stage 7 checkpoint:

`79489688a6c6bd83ba8fd807cb87bdc0a59b94bf`

Frozen evidence: `docs/STAGE7_SELF_LAUNCH_CLOSURE.md`.

The frozen Stage 7 result includes `ZERO_HUMAN_TOUCH` under the `2.5.0-rc.2` path. The exact lower-level consent route used by that frozen run is not recorded strongly enough to claim whether it was negotiated-v2 or the organic/plain path, so current reconciliation does not invent that fact.

## Stage 8 — autonomous frontier discovery — PASS

The operator supplied no issue numbers. Pi discovered the GitHub frontier, selected #18, respected #19 while blocked, completed #18, rediscovered #19 as executable, completed it and stopped when the compatible frontier was exhausted.

### Issue #18

```text
HEAD   1313b060ce8d22c3eac8bab5258c770af2dd08c0
TREE   8a79548c43d0acdaf426dcd7c8acfc801c9fe1f8
RDD    review-0d11fc95166af074
STATE  CLOSED
TESTS  131/131
```

### Issue #19

```text
HEAD   ad1bc950db3c03755ed1632bbf159b6c2f695a73
TREE   18687fcb7d9bfaac157c5ca33a0715ea5c996a6b
RDD    review-3248f7d4dbb7f3d4
STATE  CLOSED
TESTS  131/131
```

Final Stage 8 state:

```text
local HEAD == upstream == origin/stage8-frontier-discovery-20260830
HEAD = ad1bc950db3c03755ed1632bbf159b6c2f695a73
worktree clean
```

Frozen evidence: `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md`.

## Stable Gentle 2.5.0 real-project field evidence — PASS with negotiated-v2 autonomy gap

Judit #76 / PR #79 provided the first natural stable run.

Final accepted PR candidate:

```text
BASE       b56d749421b08431250e9199772af3b3b46d4e3d
HEAD       3967e2cfec37e6c8861be2435cf8b53cf67c438e
FULL TESTS 400/400
PR         OPEN / MERGEABLE / HUMAN MERGE BOUNDARY
CORA AUDIT PASS
```

Stable review lineages reached approved → exact acknowledgement → burned authority, including the final candidate lineage `review-79b5f46c34da40af`.

The field run also produced these horizontal findings:

- Pi MUST NOT execute Gentle review lifecycle commands; worker ownership is explicit.
- supervisor prompts should express goal/checkpoint/boundaries, not restate lifecycle internals;
- healthy OpenCode workers should be reused by default for bounded repair on the same issue/PR/worktree;
- a new source candidate still requires a fresh Gentle review lineage;
- fixed multi-minute polling is not the normal supervision strategy;
- already-authorized normal non-force push permissions should not be escalated to the human;
- the currently selected OpenCode negotiated-v2 path emits candidate consent relay, but stable Gentle itself still has upstream-owned unattended review semantics.

Full evidence: `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

## GitHub authentication incident — resolved

Intermittent 401 failures were traced to stale `GH_TOKEN` / `GITHUB_TOKEN` values in tmux's global environment overriding valid `gh` credentials.

The root fix was removing those stale variables. New panes were verified clean and `gh auth status` succeeded.

Do not reintroduce `env -u GH_TOKEN -u GITHUB_TOKEN ...` wrappers or an authentication shim without new evidence.

## Gentle Pi — historical FAIL; 2.3.0 REEVALUATION_ELIGIBLE

Gentle Pi `2.2.0` did not complete the full unattended lifecycle reliably even after isolated-home bootstrapping.

```text
GENTLE_PI_2_2_0_FOR_ATENEA_UNATTENDED_EXECUTION = NOT_QUALIFIED / FAIL
```

That failure remains historical evidence and MUST NOT be erased.

Gentle Pi `2.3.0` is a materially changed stable upstream release: it carries Gentle AI `2.5.0`, speaks the stable review contract, executes provider-issued continuations verbatim, includes the acknowledgement lifecycle, exposes a native Herdr bridge/guarded-command permission lifecycle and adds parent-owned edit surfaces.

Therefore:

```text
GENTLE_PI_2_3_0_FOR_ATENEA = REEVALUATION_ELIGIBLE
GENTLE_PI_2_3_0_QUALIFIED  = NO
GENTLE_PI_2_3_0_ADOPTED    = NO
```

The only justified evaluation remains one bounded replacement/deletion experiment asking whether `2.3.0` can preserve Atenea's qualified properties while removing components or glue. Do not add Gentle Pi as another layer on top of the qualified path.

The `review-consent-asked` latch present in Gentle Pi `2.3.0` is **not** current evidence of negotiated-v2 zero-touch parity: current integration records it after a grant but does not use it to authorize later provider-issued v2 candidate consent. Issue #36 owns the separate negotiated-v2 capability investigation.

Until a replacement experiment passes, keep **Pi → Herdr → OpenCode + Gentle** as the accepted architecture.

## Current runtime target

As of 2026-09-03:

- OpenCode remains the qualified implementation runtime;
- Gentle AI `2.5.0` stable has natural real-project field evidence and remains the operational target;
- stable Gentle contains upstream-owned zero-touch review behavior outside the forced-relay negotiated-v2 route;
- Pi routing remains an operational concern, not architecture;
- DeepSeek V4 Flash is successful field routing evidence, not an architectural pin;
- Gentle Pi `2.3.0` is eligible for bounded re-evaluation but is not adopted by qualification policy;
- zero-touch on the current OpenCode negotiated-v2 path remains an upstream integration capability gap (#36).

## Policy consolidation — COMPLETE

KairOS #267/#268 were reconciled against the current upstream stack.

### Engineering quality

`CODING_STANDARDS.md` owns Atenea's stable horizontal engineering guardrails.

```text
ALWAYS-ON POLICY
  CODING_STANDARDS.md

TASK-TRIGGERED METHODS
  upstream tdd
  upstream codebase-design
  upstream domain-modeling
  upstream diagnosing-bugs
  upstream code-review when semantic/spec-compliance risk warrants it

MACHINE ORACLES
  justified deterministic tooling

FINAL CANDIDATE LIFECYCLE
  Gentle native RDD
```

The Matt methods are not a mandatory execution sequence. No custom Clean Code framework, quality agent or new lifecycle phase is required.

### Material UI/UX

Harness Contract v1 defines the surviving #267 policy:

- Impeccable only for material UI/UX;
- applicability decided during human-present shaping before `EXECUTION_READY`;
- `DESIGN.md` may own durable visual-system decisions where warranted;
- `PRODUCT.md` is a derived compatibility projection when canonical product authority lives elsewhere;
- no universal Atenea UX framework or PRODUCT generator.

These are policy decisions. Natural field use may still provide evidence, but no runtime qualification is blocked on them.

## What remains open

### Restore zero-human-touch RDD on the current negotiated OpenCode path

Historical rc.2 qualification proved the desired operator property. Stable `2.5.0` still contains provider-owned zero-touch review semantics, including an organic/plain one-time consent path and silent non-interactive negotiated authorization when no explicit consent declaration is supplied.

However, `review-integration/v2` currently emits START with `--consent relay`, selecting candidate-scoped human relay. Atenea will not remove or rewrite that provider-issued argument.

Issue #36 asks whether current v2 already exposes a supported unattended policy, whether the organic provider-owned route can preserve all required OpenCode/Gentle properties, or—if neither is true—whether upstream should add the smallest v2 consent-policy parity surface. `review-integration/v1` is frozen/legacy and is not a durable production answer.

### OpenSpec optional brownfield authoring

OpenSpec is an optional delta-first brownfield/evolutionary path when it materially adds value. It is not required for already-shaped brownfield work and is not installed merely for conformity.

If a suitable real delta naturally selects OpenSpec, capture whether its durable output reaches executable GitHub work without a custom OpenSpec→Gentle translation layer.

### Repository-specific delivery variants

Real repositories may end work at an exact remote checkpoint or open a PR awaiting human merge. The core runtime qualifies normal push/reconciliation; each repository's actual PR/merge policy should be exercised in normal field use.

### Naturally material UI slices

The policy is complete, but the first naturally material UI slice can provide field evidence that Impeccable/DESIGN/PRODUCT authority composes cleanly with the existing runtime. Do not create a synthetic UI ladder solely for this.

## No further large qualification ladder

Do not create Stage 9/10/... for ceremonial completeness.

New bounded qualification is justified only when:

1. a required property has no current upstream owner;
2. a real field run exposes an unresolved seam;
3. a materially different upstream runtime replaces a failed/qualified lifecycle; or
4. an optional new entry path needs a compatibility test because a real project actually selects it.

Gentle Pi `2.3.0` meets condition 3 for **one bounded re-evaluation only**. Issue #36 meets condition 2 as an upstream integration investigation, not a new stage.

Otherwise use real projects and capture compact evidence.

## Evidence precedence

When documentation conflicts:

1. exact repository / GitHub / runtime evidence;
2. `docs/ATENEA_HARNESS_CONTRACT_V1.md`, current `README.md`, this file and `docs/CURRENT_DECISIONS.md`;
3. `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`, `docs/ATENEA_HANDOFF_20260830.md` and Stage-specific frozen evidence;
4. earlier decision files and forward-looking plans.
