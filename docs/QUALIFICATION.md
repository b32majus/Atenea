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

CURRENT PRODUCTION OPERATIONAL TARGET
  Gentle AI 2.5.0 stable
  real-project field evidence captured on Judit #76 / PR #79

BOUNDED ZERO-TOUCH CHARACTERIZATION
  provider-side canary based exactly on Gentle AI 2.5.0
  OpenCode 1.18.27
  Pi 0.84.4
  Herdr 0.8.2
  PASS for review-only negotiated-v2 unattended behavior
  NOT production adoption
```

The Judit field run confirmed that stable `2.5.0` preserves the exact-candidate RDD lifecycle, provider continuation/re-entry on the successful path, approval and exact acknowledgement/burn.

The same investigation corrected an initially over-broad consent diagnosis: stable Gentle still contains provider-owned zero-touch review semantics. The autonomy gap is specifically the released OpenCode negotiated `gentle-ai.review-integration/v2` route, whose provider-issued START transition includes `--consent relay` and therefore selects candidate-scoped human relay semantics.

A downstream provider-side canary then characterized the missing capability without teaching Pi/OpenCode to rewrite the transition. Under the canary policy, Gentle itself generated a no-relay v2 START, OpenCode executed it unchanged, RDD ran, exact acknowledgement burned authority and the full Pi → Herdr → headless OpenCode topology completed with zero human touch after execution authorization.

Current status:

```text
GENTLE_2_5_STABLE_EXACT_CANDIDATE_RDD       PASS
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY         PROVEN
RELEASED_V2_PROVIDER_UNATTENDED_SELECTOR    NOT_AVAILABLE
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY    PASS
OPENCODE_HEADLESS_UNATTENDED_ROUTE          PASS
PI_HERDR_OPENCODE_GENTLE_TOPOLOGY           PASS
HUMAN_TOUCH_AFTER_EXECUTION_READY           0   # bounded review-only canary
PRODUCTION_GENTLE_MODIFIED                  NO
LOCAL_CONSUMER_BYPASS                       NO
UPSTREAM_TRACKING                           Gentleman-Programming/gentle-ai#4109
ATENEA_TRACKING                             issue #36
```

This does **not** invalidate historical Stage 7/8 rc.2 evidence and does not claim the downstream canary selector as an upstream API. Production Gentle remains `2.5.0` unchanged; the experimental provider-side selector must disappear when upstream ships an equivalent supported capability.

Stable field evidence: `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

Zero-touch characterization evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

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
  autonomous transport uses headless opencode run

Gentle AI
  qualified native RDD / exact-candidate / reviewer / bounded-repair authority

Git / GitHub
  repository/tracker/publication authority

Atenea repo-local policy
  Harness Contract v1 + CODING_STANDARDS.md + repo-specific config only
```

Pi is not an implementation worker or security sandbox. Herdr is not a policy engine.

The stable field run and final zero-touch canary strengthen this boundary: Pi supervises process/authority/frontier state; the OpenCode/Gentle worker owns all Gentle lifecycle operations and provider-issued review transitions. The canary recorded zero direct Pi Gentle lifecycle calls.

## Stage 5 — Matt → Gentle/OpenCode composition — PASS

Complete Matt project skills and complete Gentle/OpenCode compose through durable repository/tracker authority without a custom work-unit schema or Agent Brief translation.

The execution instruction remained effectively:

`Implement GitHub issue #N.`

Frozen evidence: `docs/STAGE5_TRACER_TRAIN.md`.

## Stage 6 — native Gentle RDD — PASS

Gentle AI `2.5.0-rc.2` native RDD was the exact runtime used for the qualified final candidate/review evidence.

Qualified properties include exact-candidate lifecycle, reviewer authority/lineage, bounded repair and invalidation when the candidate changes.

Atenea must not recreate them.

Stable `2.5.0` has now supplied natural field evidence for provider-owned continuation/re-entry and final acknowledgement/burn. The negotiated-v2 canary additionally proved provider-generated unattended START behavior can preserve those semantics without a consumer shim.

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

## Stable Gentle 2.5.0 real-project field evidence — PASS with released negotiated-v2 autonomy gap

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
- the released OpenCode negotiated-v2 path emits candidate consent relay, while stable Gentle itself retains provider-owned unattended review semantics.

Full evidence: `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

## Negotiated-v2 zero-touch provider characterization — PASS, bounded / non-production

The canary implementation was based exactly on Gentle `v2.5.0` and changed only the provider's v2 START argument policy under an explicit canary-only environment selector:

```text
GENTLE_AI_REVIEW_V2_CONSENT_POLICY=unattended
```

Exact canary identity:

```text
implementation commit  e326ea77f6d2c77509fe5147841b0f622e38a75e
binary sha256          bd947d78da858d7f26b185b304a2947e9f1dc335968ee71dc2dcec39dc5f2b7b
production binary      untouched
```

Evidence progressed through deterministic provider tests, stock-vs-canary differential cross-lane comparison, low-risk compiled binary review, medium-risk non-zero-lens review, real OpenCode headless review and finally a real Pi → Herdr → OpenCode → Gentle canary.

Final structural result:

```text
PI_ROLE=NON_IMPLEMENTING_SUPERVISOR
HERDR_REAL_WORKSPACES_CREATED=1
HERDR_REAL_PANE_RUNS=1
HERDR_NATIVE_WAITS=1
OPENCODE_WORKERS_STARTED=1
RUNNER_OPENCODE_RUN_COUNT=1
PI_DIRECT_GENTLE_LIFECYCLE_CALLS=0
PI_DELIVERY_CALLS=0

GENTLE_STATUS_EXECUTIONS=2
GENTLE_START_EXECUTIONS=1
GENTLE_START_CONSENT_ARGUMENT=ABSENT
GENTLE_RDD=PASS
GENTLE_ACK_EXECUTIONS=1
GENTLE_ACK_EXACTLY_ONCE=PASS
GENTLE_AUTHORITY_BURNED=PASS

OPENCODE_QUESTION_TOOL_CALLS=0
CONSENT_V3_ENVELOPES=0
CONSENT_REQUIRED_REASONS=0
INTENDED_UNTRACKED_SELECTION_REQUIRED=0
PROVIDER_HUMAN_INPUT_REQUIRED=0
HUMAN_INTERVENTION_PROVIDED=0
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
CANDIDATE_MUTATION=0
SUPERVISOR_STOPPED=PASS
ATENEA_ZERO_TOUCH_CANARY_FINAL=PASS
```

Evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` and host report `/srv/kairos-lab/outbox/reports/gentle-zero-touch-v2-canary/atenea-pi-full-20260903-192900`.

The final canary was deliberately **review-only**. It did not exercise implementation, push, PR/checkpoint or frontier exhaustion on a real work item. Those remain the next real end-to-end acceptance target.

The canary also established the autonomous worker transport choice: use headless `opencode run` through Herdr. TUI prompt injection is not the Atenea unattended transport contract.

## Observation harness defects — classified and excluded from runtime result

The final canary exposed observation defects that generated false stalls/false negatives but did not change the actual worker result:

- process-substitution `tee` children outlived completed Pi and held the outer wrapper open;
- CLI `--help` discovery probes were initially counted as real workspace/run/wait executions;
- textual grep matched `No human input was required` as a positive human-input request.

Corrected audits use structural events, provider schemas/reasons, exact commands and authority state. Observation wrappers are not allowed to become execution dependencies or justify a new controller.

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

The `review-consent-asked` latch present in Gentle Pi `2.3.0` is **not** current evidence of negotiated-v2 zero-touch parity: current integration records it after a grant but does not use it as authority for later provider-issued v2 candidate consent. Issue #36 owns the separate negotiated-v2 capability investigation.

Until a replacement experiment passes, keep **Pi → Herdr → OpenCode + Gentle** as the accepted architecture.

## Current runtime target

As of 2026-09-03:

- Pi `0.84.4` remains the qualified thin supervisor in current field evidence;
- Herdr `0.8.2` remains the process/session substrate;
- OpenCode `1.18.27` is the current successfully characterized headless implementation runtime;
- Gentle AI `2.5.0` stable remains the production operational target;
- the isolated canary Gentle binary proves negotiated-v2 unattended parity behavior but is not a production release/adoption;
- stable Gentle contains upstream-owned zero-touch review behavior outside the released forced-relay v2 route;
- DeepSeek V4 Flash is successful field routing evidence, not an architectural pin;
- Gentle Pi `2.3.0` is eligible for bounded re-evaluation but is not adopted by qualification policy;
- upstream `Gentleman-Programming/gentle-ai#4109` remains the provider-owned production-resolution path.

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

### Operator-triggered real end-to-end acceptance

The next test is a **real small `EXECUTION_READY` work item**, not another plumbing canary.

The operator interface under test is:

```text
human opens/uses Herdr
→ human starts Pi interactively
→ human gives one bounded execution prompt
→ Pi resolves current GitHub/repository authority
→ Pi creates/reuses headless OpenCode worker through Herdr
→ OpenCode implements and owns Gentle lifecycle
→ exact-candidate RDD / bounded correction if needed
→ acknowledgement/burn
→ one pre-publication authority revalidation
→ normal non-force push
→ PR/checkpoint
→ exact reconciliation
→ frontier rediscovery
→ STOP before human merge / when exhausted
→ final factual Pi report
```

This run should close the still-unexercised real-work acceptance properties:

```text
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
HUMAN_TOUCH_AFTER_EXECUTION_READY=0              desired; any real human turn must be recorded
NORMAL_NON_FORCE_PUBLICATION=PASS
PR_OR_CHECKPOINT=PASS
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

Gentle review consent should not surface when the isolated provider canary policy is deliberately selected for this bounded experiment. Already-authorized normal non-force push permissions should be handled by Pi. Genuine human-owned boundaries or final merge must be relayed and paused; answering them is allowed, but that run must no longer be described as zero-touch.

### Upstream negotiated-v2 provider support

The downstream canary proves the behavioral hypothesis but is not production authority.

Atenea #36 and upstream `Gentleman-Programming/gentle-ai#4109` remain open until a supported upstream provider-owned equivalent is available and characterized. Atenea will not permanently fork Gentle, strip provider tokens or inject consent in the consumer.

### OpenSpec optional brownfield authoring

OpenSpec is an optional delta-first brownfield/evolutionary path when it materially adds value. It is not required for already-shaped brownfield work and is not installed merely for conformity.

If a suitable real delta naturally selects OpenSpec, capture whether its durable output reaches executable GitHub work without a custom OpenSpec→Gentle translation layer.

### Repository-specific delivery variants

Real repositories may end work at an exact remote checkpoint or open a PR awaiting human merge. The core runtime qualifies normal push/reconciliation historically; the next operator-triggered real run should exercise the current headless path through a real repository-specific delivery boundary.

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
3. `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`, `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`, `docs/ATENEA_HANDOFF_20260830.md` and Stage-specific frozen evidence;
4. earlier decision files and forward-looking plans.