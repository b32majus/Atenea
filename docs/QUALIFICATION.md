# Atenea — Qualification Status

Date of current status: 2026-09-06

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
GOLDEN_E2E_MULTI_TICKET_FIELD       PASS
ZERO_HUMAN_TOUCH_MULTI_TICKET       PASS
HERDR_START_READINESS_NO_SLEEP       PASS
```

The result is evidence for a thin supervisory contract, not a recommendation to build a larger Atenea runtime.

## Adopted replacement result — 2026-09-05

Atenea #35 completed with `PASS_DELETE`, and operator-authorized cutover #45 adopts the smaller normal unattended path:

```text
normal Pi supervisor → Herdr → separate Pi/Gentle-Pi worker → Gentle native RDD → Git/GitHub checkpoint → frontier rediscovery/STOP
```

PROMueve T4/T5 plus atomic repairs demonstrated zero-touch execution, independent product rejection/repair, native RDD acknowledgement/burn, normal non-force publication, composed continuity and supervisor-owned frontier rediscovery. OpenCode qualification below remains valid historical/alternate evidence but no longer defines the current unattended runtime.

## Golden E2E multi-ticket field qualification — PASS — 2026-09-06

PROMueve Unified Clinical Intake T8→T9→T10 supplied the first complete real-project multi-ticket field run after the C-025 cutover and #49 hardening. After one explicit operator execution authorization, a persistent non-implementing Pi supervisor advanced three frontier tickets with one fresh Pi/Gentle-Pi worker per ticket, zero human intervention between tickets, native worker-owned RDD on mutating candidates, normal non-force publication, exact remote reconciliation, a final verification-only gate and STOP after T10.

```text
PROMUEVE_T8_ACCEPTED                    08703a6329beeb53b60fe767bf0d6a3351ac3d42
PROMUEVE_T9_ACCEPTED                    fbaaef098e96979ecce39361eacbda18b8d3e199
PROMUEVE_T10_FINAL_GATE                 PASS_14_OF_14
SUPERVISOR_DIRECT_GENTLE_CALLS          0
FRESH_WORKER_PER_FRONTIER_TICKET        PASS
WORKER_FINAL_VIA_INTERCOM               PASS
NORMAL_NON_FORCE_PUBLICATION            PASS
ZERO_HUMAN_TOUCH_AFTER_TRAIN_LAUNCH     PASS
TRAIN_STOP_AFTER_T10                     PASS
GOLDEN_E2E_MULTI_TICKET_FIELD           PASS
```

The run exercised the C-029 reviewer continuation contract on live T8/T9 candidates. T8 had one reviewer-result admission refusal with zero authority progress; Gentle reoffered the exact slot and one bounded retry completed APPROVED → acknowledgement/burn without human intervention. T9 completed one forecast/ACK/reviewer run → APPROVED → burn. T10 correctly created no review/no-op commit because the final gate required no mutation.

The PROMueve run originally exposed two non-blocking harness debts: one startup `sleep 6`, and one T8 reviewer-result admission refusal recovered by bounded retry. WO #59 subsequently resolved the startup-readiness debt without new runtime code: on Herdr `0.8.2`, `herdr agent start` returned `interactive_ready=true`; the first prompt was submitted 17 ms later with **zero sleep**, and the fresh Pi worker produced `READINESS_CANARY_PASS`. The initial literal output wait matched the echoed prompt and was therefore not used as proof; the subsequent pane read confirmed the actual model response. The reviewer-admission reliability debt remains separate/open-nonblocking.

```text
HERDR_AGENT_START_READINESS_BARRIER    PASS
ZERO_SLEEP_BEFORE_FIRST_PROMPT         PASS
WORKER_FINAL_VIA_INTERCOM              NORMATIVE
POST_FINAL_HOST_ARCHAEOLOGY            NORMAL_PATH_PROHIBITED
REVIEWER_ADMISSION_RETRY_DEBT          OPEN_NON_BLOCKING
```

Canonical field evidence: `docs/PROMUEVE_UNIFIED_INTAKE_GOLDEN_E2E_FIELD_EVIDENCE_20260906.md`.

This qualification proves the adopted harness behavior. It does **not** merge PR #49, merge PROMueve product branches, or claim PROMueve pilot/production readiness.

## Newcomer front-door qualification — PASS — 2026-09-06

WO #63 tested the current documentation as a product surface rather than assuming that information existing somewhere in the repository was sufficient. A fresh Pi reviewer with no prior conversation/memory, `--no-extensions`, `--no-skills`, `--no-prompt-templates` and read-only tools followed only the current README-prescribed front door and was forbidden from using historical Stage/Handoff archaeology for normal operation.

It independently reconstructed:

```text
PROTOCOL_AND_HUMAN_BOUNDARIES        PASS
THREE_CONFIGURATION_SCOPES           PASS
FRESH_MACHINE_SETUP_AND_VERIFY        PASS
MATT_PI_PROJECT_LOCAL_SETUP           PASS
GREENFIELD_SPEC_TICKET_DIRECTION      PASS
TASK_TRIGGERED_ENGINEERING_METHODS    PASS
CURRENT_OPERATIONAL_ROUTING           PASS
NO_SILENT_MODEL_FALLBACK              PASS
RDD_RELAY_REVIEWER_ACK_BURN_FINAL     PASS
PROMOTION_REVIEW_AND_HUMAN_MERGE      PASS
PI_SUBAGENTS_REQUIRED                 NO
DELEGATED_WRITER_REQUIRED             NO
STARTUP_SLEEP_DEBT                    RESOLVED_BY_59
ATENEA_NEWCOMER_READY                 PASS
```

The onboarding authority is now explicit without adding a runtime layer: `docs/NEWCOMER_QUICKSTART_V1.md` is a non-normative fast map; `docs/INSTALLATION_AND_OPERATION_V1.md` owns provisioning/scopes and the current replaceable operational routing profile; `docs/START_HERE.md` owns shaping choice; the harness contract remains normative for execution. Current Pi-target Matt installation was separately canaried with upstream `skills` 1.5.23 and produced the full 37-skill project-local `.pi/skills/` set plus `skills-lock.json`.

The qualification deliberately does **not** activate `pi-subagents`, delegated `gentle-ai-worker`, Luna writer routing, a context-budget controller, supervisor-invariants duplication, a supervisor skill or a worker-template engine. The Golden E2E path does not require them; future adoption requires separate real-gap evidence/qualification.

### Entry/role/routing reconciliation — current evidence map

WO #67 adds no runtime capability. It makes two planning facts durable: repository entry is read-only reconciliation before shaping, and routing claims are bound to exact roles/evidence classes. `docs/ROUTING_EVIDENCE_LEDGER_V1.md` records V4 Flash medium as `FIELD_PROVEN` supervisor, V4 Flash high as the collapsed Golden Pi/Gentle worker, GLM 5.3 Flash high as `A/B_VALIDATED` coordinator candidate, native reviewer/refuter/validator routing as `UNQUALIFIED`, historical subagent pins as `HISTORICAL_DISCONNECTED`, and issue #66 as `ABORTED_NON_AUTHORITY`.

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
REAL_OPERATOR_TRIGGERED_ATENEA_E2E          PASS   # issue #38
OPENCODE_HEADLESS_UNATTENDED_ROUTE          PASS
PI_HERDR_OPENCODE_GENTLE_TOPOLOGY           PASS
HUMAN_TOUCH_AFTER_EXECUTION_READY           0      # issue #38 real operator-triggered run
PRODUCTION_GENTLE_MODIFIED                  NO
LOCAL_CONSUMER_BYPASS                       NO
UPSTREAM_TRACKING                           Gentleman-Programming/gentle-ai#4109
ATENEA_TRACKING                             issue #36
```

This does **not** invalidate historical Stage 7/8 rc.2 evidence and does not claim the downstream canary selector as an upstream API. Production Gentle remains `2.5.0` unchanged; the experimental provider-side selector must disappear when upstream ships an equivalent supported capability. The released stable negotiated-v2 unattended selector remains `NOT_AVAILABLE`; the real operator-triggered Atenea E2E under the bounded canary is PASS but does not replace the upstream resolution still owned by #4109/#36.

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

The final canary was deliberately **review-only**. It did not exercise implementation, push, PR/checkpoint or frontier exhaustion on a real work item. Issue #38 then exercised those real-work acceptance properties through the actual operator interface (see the operator-triggered real end-to-end result below).

For that historical OpenCode qualification epoch, the canary established headless `opencode run` through Herdr as the correct OpenCode transport. TUI prompt injection was rejected. This does not override the later adopted Pi/Gentle-Pi worker path.

## Real operator-triggered Atenea end-to-end — PASS (issue #38)

Issue #38 completed the first real operator-triggered `EXECUTION_READY` run through the actual top-level interface. The human started Pi manually inside Herdr and gave one bounded execution prompt; from that point the accepted run completed without another human answer.

```text
REAL_OPERATOR_TRIGGERED_ATENEA_E2E=PASS
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
NORMAL_NON_FORCE_PUBLICATION=PASS
PR_OR_CHECKPOINT=PASS
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

The operator authorization/interface boundary was therefore field-proven, not merely the next E2E target. Implementation, deterministic verification, exact-candidate RDD, acknowledgement/burn, pre-publication revalidation, normal non-force publication, PR/checkpoint reconciliation and frontier stop all completed on a real work item under the then-qualified Pi → Herdr → OpenCode → Gentle path. The worker transport was later superseded by the adopted Pi/Gentle-Pi path.

The run exposed two useful ergonomics principles: a dedicated visible worker pane/id and a bounded authoritative prompt for pinned work. Those principles remain current; the OpenCode-specific worker mechanics used to prove them are historical/alternate.

Issue #39 then executed that bounded operator-ergonomics refinement through the same operator-facing path and is complete:

```text
ISSUE39_PINNED_BOUNDED_PREFLIGHT=PASS
ISSUE39_VISIBLE_WORKER_PANE=PASS
ISSUE39_WORKER_PANE_ID_REPORTED=PASS
ISSUE39_USEFUL_LIVE_WORKER_STREAM=NOT_YET_PROVEN
ISSUE39_FIXED_SLEEP_SUPERVISION=OBSERVED_NON_BLOCKING
```

Issue #39 proved the bounded pinned preflight (no broad archaeology before the worker), the dedicated visible Herdr worker pane and immediate pane/tab id reporting, the post-#38 documentation reconciliation, exact-candidate RDD, acknowledgement/burn, normal non-force publication and PR #37 frontier stop. The visible pane and its reported id are proven; rendering useful live OpenCode/Gentle activity into that pane is `USEFUL_LIVE_WORKER_STREAM=NOT_YET_PROVEN`, the single remaining operator-ergonomics follow-up and non-blocking for PR #37. Repeated fixed `sleep` waits were again observed during #39 supervision and are recorded as non-blocking; issue #39 does not claim a supervision-efficiency property and current policy continues to prefer native/Herdr bounded waits.

Issue #38 evidence comment: PR #37 audit thread and issue #38 comments. The upstream-supported negotiated-v2 unattended API remains unresolved/non-production; upstream `Gentleman-Programming/gentle-ai#4109` and Atenea #36 remain open.

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

## Gentle Pi — historical 2.2.0 FAIL; 2.4.0 PASS_DELETE and adopted via cutover #45/#47

Gentle Pi `2.2.0` did not complete the full unattended lifecycle reliably. That historical failure remains valid evidence.

Atenea #35 permits one bounded replacement/deletion reevaluation after a materially changed upstream release. The current field epoch is:

```text
Pi          0.85.1
Herdr       0.8.2
Gentle Pi   2.4.0
Gentle AI   2.6.0
pi-intercom 0.13.0
```

PROMueve T3 was diagnostic: exact-candidate RDD delegation from the Gentle Pi worker to the Pi supervisor worked, but the supervisor also loaded Gentle Pi and generated self-RDD prompts from the shared worktree; the worker also lacked explicit autonomous-mode env propagation.

PROMueve T4 corrected those two seams and completed a real bounded repair with zero external touch after Cora/DC launch. T5 then supplied composed integration evidence: initial SHA `13d759e…` was unattended/RDD/published but failed independent product acceptance; atomic Repairs A/B closed the defects; final SHA `5ae810a…` passed T2 `422/422`, T3 `71/71` + oracle `22/22`, T4 `169/169`, T5 `157/157`, syntax/diff checks, exact predecessor blob identity and native 4-lens RDD with acknowledgement/burn. Final qualification made no product mutation and required zero external touch.

```text
GENTLE_PI_2_2_0_FOR_ATENEA_UNATTENDED_EXECUTION = NOT_QUALIFIED / FAIL
GENTLE_PI_2_4_EXECUTION_PATH_CANDIDATE           = PASS
GENTLE_PI_2_4_ZERO_TOUCH_REAL_REPAIR             = PASS
GENTLE_PI_2_4_NORMAL_PUBLICATION                  = PASS
GENTLE_PI_2_4_COMPOSED_T5_QUALIFICATION           = PASS
GENTLE_PI_2_4_FRONTIER_REDISCOVERY_STOP            = PASS
GENTLE_PI_2_4_ADOPTED                             = YES
GENTLE_PI_2_4_FULL_REPLACEMENT_QUALIFICATION      = PASS_DELETE
GENTLE_PI_2_4_ADOPTION_DECISION                    = ADOPTED_CUTOVER_45_PR47
```

T4 demonstrated meaningful deletion potential because the worker path did not use OpenCode or the downstream negotiated-v2 OpenCode consent-policy canary. T5 then exercised the composed path; after two atomic product repairs, final qualification at `5ae810aee2ec1cf832aff74aed888ec04c3c6bee` passed the full deterministic suite, native high-risk four-lens RDD, acknowledgement/burn and exact remote reconciliation. The same non-implementing supervisor then performed a fresh read-only GitHub authority check of #292/#298, identified `NEXT_FRONTIER=#298`, launched no T6 worker and STOPped. The bounded #35 experiment therefore satisfies `PASS_DELETE`. Operator-authorized cutover #45 adopts the Pi supervisor → Herdr → separate Pi/Gentle-Pi worker path as the normal unattended workflow.

Evidence: `docs/GENTLE_PI_24_REPLACEMENT_FIELD_EVIDENCE_20260905.md`.

Candidate-path field lessons after PROMueve T5 and atomic repairs:

- `UNATTENDED_PASS` and product acceptance are independent gates; T5 `13d759e` was unattended/RDD/published but rejected by independent semantic audit.
- supervisor coordination must be event-driven through pi-intercom; fixed sleeps/polling and Herdr `agent_status` as a lifecycle clock are not qualified behavior.
- integration tickets that compose sibling checkpoints should run a read-only predecessor composition/contract gate before builder work; this does not require merging predecessors to a protected branch.
- pi-lens should run diagnostic-only with `--no-autoformat --no-autofix` unless mutation is explicitly in scope.
- repeated 429s on `opencode-go/muse-spark-1.3-contributor` make that worker route degraded in this field epoch; cause is unresolved and provider separation is not an architectural requirement.
- pinned supervisor work should use an exact versioned spawn recipe rather than CLI/model rediscovery; prose prohibition alone did not prevent rediscovery in field use.
- T5 reviewer continuation is now a golden regression under Atenea #56: provider `collectBindings` remain opaque; multi-lens work uses the native group capture; `reviewer-model-run-forecast` requires bounded ACK; the exact same capture is resumed with `reviewerRunAcknowledged=true`; acknowledged capture remains in flight until its tool call returns; all required lenses and native acknowledgement/burn precede publication. This restores behavior T5 had already demonstrated rather than adding a second review lifecycle.

Deterministic restoration evidence for #56:

```text
ATENEA_REVIEWER_LIFECYCLE_CHECK=PASS
T5_GOLDEN_BINDING_GROUP=4_LENSES
T5_GROUP_DIGEST=d5f9e657ac02be061df87673e0c8e869522e3f22e3de4b57d09bd521d7aff629
T5_REVIEW_TRANSPORT=pi_host_relay
T5_REVIEWER_MODEL_RUNS=4
SINGLE_LENS_CONTINUATION=PASS
IN_FLIGHT_STOP_NEGATIVE=PASS
MISSING_REQUIRED_LENS_NEGATIVE=PASS
ACK_MISMATCH_NEGATIVE=PASS
ACK_BURN_REQUIRED=PASS
```

## Current runtime target

Adopted field epoch after cutover #45 / PR #47:

- Pi `0.85.1` is the current qualified thin supervisor/worker host in this field epoch;
- Herdr `0.8.2` remains the process/session substrate;
- Gentle Pi `2.4.0` is the adopted normal unattended implementation/orchestration worker runtime;
- Gentle AI `2.6.0` is the current field epoch behind that Gentle-Pi path;
- pi-intercom `0.13.0` is the event-driven supervisor/worker control plane;
- pinned runs require explicit Pi names, one shared run-scoped intercom identity, the versioned Atenea mechanical RDD relay extension and the T5-proven reviewer continuation contract loaded from the same Atenea checkpoint root;
- OpenCode `1.18.x` + Gentle `2.5.x` and the negotiated-v2 canary remain characterized historical/alternate evidence, not the normal unattended runtime;
- model/provider routes are operational parameters selected by current health/cost/capability, not architecture pins;
- upstream `Gentleman-Programming/gentle-ai#4109` remains relevant only for optional parity of the alternate OpenCode route and does not block the adopted path.

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

### Real operator authorization/end-to-end boundary — field-proven; current worker transport adopted later

Issue #38 historically proved that one explicit operator execution authorization can bound a real end-to-end unattended run. Its OpenCode worker topology is preserved as historical evidence. T4/T5 plus cutover #45/#47 subsequently replaced the normal worker transport. The current operator path is:

```text
human explicitly authorizes execution
→ human or Cora/DC mechanically starts the plain named/scoped Pi supervisor
→ one bounded execution/train prompt
→ supervisor validates current authority + pinned prerequisites
→ Herdr launches a fresh named/scoped Pi + Gentle Pi worker
→ worker implements, verifies and owns native Gentle RDD/provider transitions
→ mechanical Atenea relay carries any already-authorized bounded consent payload
→ acknowledgement/burn
→ normal non-force push/checkpoint
→ exact remote reconciliation / fresh compatible frontier or STOP
→ human merge boundary
```

Result recorded:

```text
REAL_OPERATOR_TRIGGERED_ATENEA_E2E=PASS
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
NORMAL_NON_FORCE_PUBLICATION=PASS
PR_OR_CHECKPOINT=PASS
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

The issue #39 visible-pane/id evidence remains historical ergonomics evidence for the older OpenCode transport; its unproven live OpenCode/Gentle stream is not a gate for current Pi/Gentle-Pi execution. Repeated fixed `sleep` waits observed there reinforce the current event-driven supervision rule. Already-authorized normal non-force push permissions should be handled without human escalation. Genuine human-owned boundaries or final merge must be relayed and paused; answering them is allowed, but that run must no longer be described as zero-touch.

### Optional alternate-OpenCode upstream parity

The downstream OpenCode canary proved the historical behavioral hypothesis but is not current production authority. Atenea #36 / upstream `Gentleman-Programming/gentle-ai#4109` matter only if supported parity for the alternate OpenCode path remains desirable; they do not block the adopted Pi/Gentle-Pi path. Atenea will not permanently fork Gentle, strip provider tokens or inject consent in the consumer.

### OpenSpec optional brownfield authoring

OpenSpec is an optional delta-first brownfield/evolutionary path when it materially adds value. It is not required for already-shaped brownfield work and is not installed merely for conformity.

If a suitable real delta naturally selects OpenSpec, capture whether its durable output reaches executable GitHub work without a custom OpenSpec→Gentle translation layer.

### Repository-specific delivery variants

Real repositories may end work at an exact remote checkpoint or open a PR awaiting human merge. The core runtime qualified normal push/reconciliation historically, and issue #38 historically exercised the then-current headless OpenCode path through a real repository-specific delivery boundary (PR/checkpoint, no auto-merge). Further real repositories may still exercise their own delivery variants.

### Naturally material UI slices

The policy is complete, but the first naturally material UI slice can provide field evidence that Impeccable/DESIGN/PRODUCT authority composes cleanly with the existing runtime. Do not create a synthetic UI ladder solely for this.

## No further large qualification ladder

Do not create Stage 9/10/... for ceremonial completeness.

New bounded qualification is justified only when:

1. a required property has no current upstream owner;
2. a real field run exposes an unresolved seam;
3. a materially different upstream runtime replaces a failed/qualified lifecycle; or
4. an optional new entry path needs a compatibility test because a real project actually selects it.

The Gentle Pi replacement line met condition 3 for **one bounded re-evaluation only**. The `2.4.0` epoch completed that experiment with `PASS_DELETE`; #35 evidence is complete and the human adoption/cutover boundary was subsequently closed by #45 / PR #47. Issue #36 remains optional OpenCode negotiated-v2 upstream parity work, not a new stage or a blocker for the adopted path.

Otherwise use real projects and capture compact evidence.

## Evidence precedence

When documentation conflicts:

1. exact repository / GitHub / runtime evidence;
2. `docs/ATENEA_HARNESS_CONTRACT_V1.md`, current `README.md`, this file and `docs/CURRENT_DECISIONS.md`;
3. `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`, `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`, `docs/ATENEA_HANDOFF_20260830.md` and Stage-specific frozen evidence;
4. earlier decision files and forward-looking plans.