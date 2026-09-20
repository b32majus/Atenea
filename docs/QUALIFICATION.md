# Atenea — Qualification Status

Date of current status: 2026-09-20

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
GENTLE_PI_25_NATIVE_AGENTS             PASS   # historical promoted epoch
GENTLE_PI_25_UNATTENDED_RELAY          PASS   # historical rollback path
GENTLE_PI_25_FULL_RDD_LIFECYCLE        PASS   # historical
GENTLE_PI_27_PERSISTENT_PARENT         PASS
GENTLE_PI_27_FRESH_CHILD_PER_TICKET    PASS_2_OF_2
GAI_29_NATIVE_NO_TTY_START             PASS_2_OF_2
GP27_SAME_LINEAGE_ADOPTION             PASS_2_OF_2
GP27_REVIEW_CONSENT_DIALOGS            ZERO
GP27_HUMAN_TOUCH_AFTER_INITIAL_PROMPT  ZERO_OPERATOR_OBSERVED
GP27_TWO_TICKET_HYBRID_ZERO_TOUCH      PASS_HISTORICAL
GP33_GAI34_RUNTIME                       PASS
GP33_ONE_TOUCH_SESSION_PERMISSION        PASS
GP33_LATER_SAME_SESSION_NO_SECOND_TOUCH  PASS
```

The result is evidence for a thin supervisory contract, not a recommendation to build a larger Atenea runtime.

## Gentle Pi 3.3 / Gentle AI 3.4 one-touch qualification — CURRENT — 2026-09-20

```text
Pi Q10/Q11 baseline              0.86.0
Pi current runtime                0.86.1
Gentle Pi                         3.3.0
Gentle AI                         3.4.0 package-paired
DEFAULT_PI                        nan/deepseek-v4-flash medium
ALL_CONFIGURED_GENTLE_ROLES       nan/deepseek-v4-flash medium
MAX_CONCURRENCY                   1
FIRST_REVIEW_CONSENT            PASS
REVIEW_AND_ALLOW_THIS_SESSION   PASS
LATER_REVIEW_NO_SECOND_TOUCH    PASS in qualified same-session flow
ONE_TOUCH_SESSION_PERMISSION    PASS
Q10_ODD_INTERNAL_ORCHESTRATION  PASS
Q10_UNAUTHORIZED_FRONTIER_STOP  PASS
Q11_SINGLE_ACCEPTANCE_UNATTENDED PASS
```

The first native consent was resolved with the host action `Review and allow this session`. Q11b then demonstrated a later fresh candidate in the same live Pi session/canonical repository starting/executing review without a second consent interaction. Q10 independently demonstrated one persistent parent traversing multiple authorized external work units while ODD owned internal delegation and STOPping before an unauthorized next frontier.

A later qualification harness step incorrectly constrained remaining review work to a group-capture path even though GP3.3 exposes dedicated refuter/validator operations. That is harness/test debt, not a provider/runtime consent failure.

GP3.3's current v9 role contract requires explicit routing for host-mediated refuter/validator completions when requested. The final cutover maps all configured roles, including refuter/validator, to NaN V4 medium. The current installation also carries the qualified, version/hash-guarded GP3.3 host bridge documented in `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`.

The accepted claim is **single-acceptance unattended within one live session/repository**, not zero-touch from process start. A process restart/new/resume/fork/quit/revoke requires a new grant. The exact strong Q11 baseline was Pi 0.86.0; Pi 0.86.1 is current runtime pending ordinary-train parity evidence.

Current mechanics: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`. The Q2–Q11 deletion/authority ladder is consolidated in `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`.

## Historical predecessor replacement result — 2026-09-05

Atenea #35 completed with `PASS_DELETE`, and operator-authorized cutover #45 historically adopted the then-smaller unattended path:

```text
normal Pi supervisor → Herdr → separate Pi/Gentle-Pi worker → Gentle native RDD → Git/GitHub checkpoint → frontier rediscovery/STOP
```

PROMueve T4/T5 plus atomic repairs demonstrated zero-touch execution, independent product rejection/repair, native RDD acknowledgement/burn, normal non-force publication, composed continuity and supervisor-owned frontier rediscovery. This was the accepted predecessor topology for its epoch; the 2026-09-15 GP2.7/GAI2.9.1 replacement below supersedes it for normal operation while preserving the evidence as rollback/provenance.

## Historical Gentle Pi 2.7 / Gentle AI 2.9.1 hybrid-native replacement — PASS — 2026-09-15

A bounded replacement/deletion investigation proved that the separate plain Pi supervisor and Atenea mechanical RDD consent relay are no longer required for the normal unattended path.

Final accepted qualification:

```text
THEN_CURRENT_GENTLE_PI                 2.7.0
THEN_CURRENT_GENTLE_AI                 2.9.1_PACKAGE_PAIRED
PERSISTENT_VISIBLE_PARENT              PASS
FRESH_NATIVE_CHILD_PER_NEW_TICKET      PASS_2_OF_2
NATIVE_NO_TTY_START                    PASS_2_OF_2
GENTLE_PI_SAME_LINEAGE_ADOPTION        PASS_2_OF_2
MEDIUM_RDD                             PASS_2_OF_2
APPROVED                               PASS_2_OF_2
ACKNOWLEDGEMENT_BURN                   PASS_2_OF_2
REVIEW_CONSENT_DIALOGS                 0
HUMAN_TOUCH_AFTER_INITIAL_PROMPT       0_OPERATOR_OBSERVED
HERDR_RPA                              0
EXTERNAL_SUPERVISOR                    0
ATENEA_RDD_RELAY                       0
```

The final two-ticket train used one persistent visible Pi/Gentle-Pi parent, distinct fresh `gentle-ai-worker` children `mu1usir7-1-uugf` and `mu1uv82b-2-pxyy`, native lineages `review-13bd0da42bc3a722` and `review-488b6979f2f277c7`, local ticket commits `3368d35` and `dc68473`, and ended at `dc68473440512492033c7a9ce67f3a84da12536e` with 10/10 tests green and native review authority clean.

The qualification ladder also established the negative boundaries:

- explicit review authority in the initial human prompt does **not** create Gentle Pi standing permission;
- one manual host option-3 grant enables later same-session reviews but is `ONE_TOUCH`, not zero-touch;
- Herdr can mechanically operate the consent TUI, but that RPA path is not adopted;
- direct native Gentle AI START with fd0/fd1/fd2 non-TTY creates the lineage without asking;
- Gentle Pi can adopt that exact CLI-created lineage through STATUS and finish reviewer collection/APPROVED/ack-burn.

The current accepted bridge is therefore upstream-native composition: non-TTY native START + same-lineage Gentle Pi adoption. The parent itself remains visible in Herdr.

Evidence: `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`. Current mechanics: `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md`.

## Historical Gentle Pi 2.5 / Gentle AI 2.7 Golden promotion — PASS — 2026-09-08

Atenea #72/#73 qualified and promoted the current upstream pair without replacing the outer Golden topology.

```text
HISTORICAL_GENTLE_PI                   2.5.0
HISTORICAL_GENTLE_AI                   2.7.0
NATIVE_GENTLE_AGENTS                   PASS
REAL_BOUNDED_NATIVE_WRITER_REPLAY      PASS
UNATTENDED_CONSENT_V3_ATENEA_RELAY     PASS
ZERO_HUMAN_TOUCH_RDD_CONSENT           PASS
FULL_RDD_START_TO_APPROVED             PASS
REVIEWER_FORECAST_ACK                  PASS
OPAQUE_BINDING_EXACT_REUSE             PASS
ACKNOWLEDGE_APPROVED                   PASS
AUTHORITY_BURN                         PASS
STANDING_SESSION_PERMISSION            PASS_ATTENDED_ONLY
FRESH_OUTER_WORKER_PER_TICKET          PRESERVED
SUPERVISOR_GENTLE_COMMANDS             0
```

The qualification deliberately separated two consent modes. Gentle Pi 2.5 standing review permission requires a human to create the live-session/repository grant and is therefore an **attended interactive** convenience. At that GP2.5 epoch, normal unattended execution continued to use the versioned Atenea mechanical relay so a fresh Pi/Gentle-Pi worker could remain fresh per ticket while the plain supervisor returned only the already-authorized bounded decision. C-040/C-041 now supersede that transport.

Native Gentle Agents are qualified as the supported internal delegation seam. A package-owned `gentle-ai-worker` launched successfully and completed real bounded PROMueve replay implementation with the frozen/focused checks green. The fresh ticket parent remains the unit of responsibility; native children never become outer train workers.

The isolated qualification also caught a package-local binary installation defect before review and strengthened the promotion preflight: package version/manifest alone is not enough; the paired Gentle AI binary must exist, be executable, report the expected version and match its integrity manifest.

Current promotion evidence: `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md`.

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

At the 2026-09-06 newcomer checkpoint, the qualification deliberately did **not** activate `pi-subagents`, delegated `gentle-ai-worker`, Luna writer routing, a context-budget controller, supervisor-invariants duplication, a supervisor skill or a worker-template engine. That statement is historical for the pre-2.5 runtime: the 2026-09-08 promotion separately qualifies package-owned native Gentle Agents and Luna-high worker/verify profiles. Third-party `pi-subagents` remains excluded, delegation remains optional, and no new controller/template engine was added.

### Sep-12 role-specific routing qualification — #75

Controlled worker, real GP2.5 lens, persistent-coordinator and read-only verifier bake-offs produced the Sep-12 routing matrix for the then-current topology: DeepSeek V4.1 Flash medium outer supervisor; GLM 5.3 Flash high parent/coordinator and native writer; Luna high native verifier/readability; DeepSeek V4.1 Flash high reliability/resilience/risk. The 2026-09-15 GP2.7 topology replacement removed the outer supervisor role from normal operation while retaining the surviving GLM/Luna/V4.1 role assignments. Refuter/validator were unpinned in that Sep-12 evidence epoch. GP3.3 now requires explicit host-mediated routing for those slots when requested; current pins live in `docs/ROUTING_EVIDENCE_LEDGER_V1.md`. Full historical evidence: `docs/ROUTING_QUALIFICATION_EVIDENCE_20260912.md`.

### Entry/role/routing reconciliation — current evidence map

WO #67 added no runtime capability; it made repository-entry and role/evidence classification durable. The following sentence records the historical Sep-8 state only: V4 Flash medium was then the `FIELD_PROVEN` supervisor, GLM 5.3 Flash high the normal parent/coordinator baseline, Luna high the qualified native writer/verify profile, and native lens pins remained unqualified. C-038 / #75 supersedes those current defaults with the Sep-12 routing matrix; issue #66 remains `ABORTED_NON_AUTHORITY`.

## Qualification evidence vs current stable runtime

Do not rewrite historical qualification evidence when upstream advances.

```text
STAGE 5–8 QUALIFICATION EVIDENCE
  Gentle AI 2.5.0-rc.2
  historical and still valid for the properties actually exercised

CURRENT ADOPTED OPERATIONAL TARGET
  Pi 0.86.1 current runtime; Q10/Q11 exact baseline Pi 0.86.0
  Herdr 0.9.0
  Gentle Pi 3.3.0 persistent visible parent
  Gentle AI 3.4.0 package-paired
  one-touch host-session review permission / single-acceptance unattended within live session
  first review: explicit human session grant
  later same-session/canonical-repository reviews: no second consent touch
  Gentle Shell/ODD owns internal decomposition, bounded delegation, verification and work-unit commits
  no Atenea fresh-child-per-external-ticket invariant
  qualified GP3.3 host bridge for exact current reviewer-group transport + consent-resolved signal
  exact provider reviewer/refuter/validator operations
  no external supervisor / Atenea consent relay / RPA

HISTORICAL GP2.5 PROMOTION EPOCH
  Pi 0.85.1
  Herdr 0.9.0
  Gentle Pi 2.5.0
  Gentle AI 2.7.0 package-paired
  pi-intercom 0.13.0
  qualified under Atenea #72/#73; superseded for normal operation by GP2.7

EARLIER STABLE GENTLE FIELD EVIDENCE
  Gentle AI 2.5.0 stable
  Judit #76 / PR #79
  valid historical exact-candidate/ack-burn evidence

BOUNDED ZERO-TOUCH CHARACTERIZATION
  provider-side canary based exactly on Gentle AI 2.5.0
  OpenCode 1.18.27
  Pi 0.84.4
  Herdr 0.8.2
  PASS for historical review-only negotiated-v2 unattended behavior
  NOT current production adoption
```

The Judit field run confirmed that stable `2.5.0` preserves the exact-candidate RDD lifecycle, provider continuation/re-entry on the successful path, approval and exact acknowledgement/burn.

The same investigation corrected an initially over-broad consent diagnosis: stable Gentle still contains provider-owned zero-touch review semantics. The autonomy gap is specifically the released OpenCode negotiated `gentle-ai.review-integration/v2` route, whose provider-issued START transition includes `--consent relay` and therefore selects candidate-scoped human relay semantics.

A downstream provider-side canary then characterized the missing capability without teaching Pi/OpenCode to rewrite the transition. Under the canary policy, Gentle itself generated a no-relay v2 START, OpenCode executed it unchanged, RDD ran, exact acknowledgement burned authority and the full Pi → Herdr → headless OpenCode topology completed with zero human touch after execution authorization.

Historical canary status at that epoch:

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

This does **not** invalidate historical Stage 7/8 rc.2 evidence and does not claim the downstream canary selector as an upstream API. At that historical epoch, production Gentle remained `2.5.0` unchanged; this sentence is provenance, not current runtime authority. The released stable negotiated-v2 unattended selector was `NOT_AVAILABLE`; the real operator-triggered Atenea E2E under the bounded canary was PASS but did not replace the upstream resolution then owned by #4109/#36. That statement was current for the GP2.7 epoch; current runtime authority is the GP3.3 one-touch section and `## Current runtime target`.

Stable field evidence: `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

Zero-touch characterization evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

## Historical Stage 5–8 / OpenCode ownership split

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

This block records the ownership split qualified by the historical Stage 5–8 / OpenCode topology; it is not the current GP3.3 role map. Pi was not an implementation worker or security sandbox, and Herdr was not a policy engine.

The stable field run and final zero-touch canary strengthened that historical boundary: Pi supervised process/authority/frontier state; the OpenCode/Gentle worker owned all Gentle lifecycle operations and provider-issued review transitions. The canary recorded zero direct Pi Gentle lifecycle calls. Current ownership is the persistent-parent/fresh-child model in the GP2.7 section above.

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

Atenea #35 permitted one bounded replacement/deletion reevaluation after a materially changed upstream release. That 2.4 replacement field epoch was:

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

T4 demonstrated meaningful deletion potential because the worker path did not use OpenCode or the downstream negotiated-v2 OpenCode consent-policy canary. T5 then exercised the composed path; after two atomic product repairs, final qualification at `5ae810aee2ec1cf832aff74aed888ec04c3c6bee` passed the full deterministic suite, native high-risk four-lens RDD, acknowledgement/burn and exact remote reconciliation. The same non-implementing supervisor then performed a fresh read-only GitHub authority check of #292/#298, identified `NEXT_FRONTIER=#298`, launched no T6 worker and STOPped. The bounded #35 experiment therefore satisfies `PASS_DELETE`. Operator-authorized cutover #45 historically adopted the Pi supervisor → Herdr → separate Pi/Gentle-Pi worker path; C-040/C-041 now supersede it for normal operation.

Evidence: `docs/GENTLE_PI_24_REPLACEMENT_FIELD_EVIDENCE_20260905.md`.

Candidate-path field lessons after PROMueve T5 and atomic repairs:

- `UNATTENDED_PASS` and product acceptance are independent gates; T5 `13d759e` was unattended/RDD/published but rejected by independent semantic audit.
- supervisor coordination must be event-driven through pi-intercom; fixed sleeps/polling and Herdr `agent_status` as a lifecycle clock are not qualified behavior.
- integration tickets that compose sibling checkpoints should run a read-only predecessor composition/contract gate before builder work; this does not require merging predecessors to a protected branch.
- Historical field guidance attempted diagnostic-only pi-lens flags; C-039 supersedes that guidance. On Pi 0.85.1 / pi-lens 3.8.74 Lens is disabled globally, and stale `--no-autoformat` / `--no-autofix` launch flags must not be revived.
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

```text
Pi current         0.86.1
Pi Q10/Q11          0.86.0 exact qualification baseline
Herdr              0.9.0
Gentle Pi          3.3.0
Gentle AI          3.4.0 package-paired
Mode               ONE_TOUCH / SINGLE_ACCEPTANCE_UNATTENDED_WITHIN_LIVE_SESSION
Pi default         nan/deepseek-v4-flash medium
Train parent       nan/deepseek-v4-flash medium
All Gentle roles   nan/deepseek-v4-flash medium
Concurrency        1
Host bridge        QUALIFIED_GP3_3_PATCH
```

The GP2.7 hybrid-native zero-touch train remains historical proof of prior upstream composition. Current operation follows the GP3.3 one-touch recipe and current routing ledger.

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

Issue #38 historically proved that one explicit operator execution authorization can bound a real end-to-end run. Later runtime epochs changed the transport without invalidating that evidence.

Current operator path:

```text
human explicitly authorizes execution
→ start one visible persistent Pi + Gentle Pi 3.3 parent on nan/deepseek-v4-flash medium
→ one bounded authorized work item/train prompt
→ Gentle Shell/ODD owns internal classification, decomposition, bounded delegation, verification and work-unit commits
→ first eligible review consent: “Review and allow this session”
→ later same-session/repository review grants require no second consent touch
→ follow the exact provider-issued reviewer/refuter/validator operation
→ APPROVED + acknowledgement/burn
→ Atenea re-reads external authority → next already-authorized frontier or STOP
→ human merge boundary
```

### Optional alternate-OpenCode upstream parity

The downstream OpenCode canary proved the historical behavioral hypothesis but is not current production authority. Atenea #36 / upstream `Gentleman-Programming/gentle-ai#4109` matter only if supported parity for the alternate OpenCode path remains desirable; they do not block the adopted Pi/Gentle-Pi path. Atenea will not permanently fork Gentle, strip provider tokens or inject consent in the consumer.

### OpenSpec optional brownfield authoring

OpenSpec is an optional delta-first brownfield/evolutionary path when it materially adds value. It is not required for already-shaped brownfield work and is not installed merely for conformity.

If a suitable real delta naturally selects OpenSpec, capture whether its durable output reaches executable GitHub work without a custom OpenSpec→Gentle translation layer.

### Repository-specific delivery variants

Real repositories may end work at an exact remote checkpoint or open a PR awaiting human merge. The core runtime qualified normal push/reconciliation historically, and issue #38 historically exercised the then-current headless OpenCode path through a real repository-specific delivery boundary (PR/checkpoint, no auto-merge). Further real repositories may still exercise their own delivery variants.

### Naturally material UI slices

The policy is complete, but the first naturally material UI slice can provide field evidence that Impeccable/DESIGN/PRODUCT authority composes cleanly with the existing runtime. Do not create a synthetic UI ladder solely for this.

## 2026-09-20 post-cutover performance characterization

Controlled A/B evidence does **not** support Skill Registry or a "dirty Agent Home" as the root cause of the large startup swings. Registry ON/OFF runs crossed over, and warm GLOBAL-vs-CLEAN pre-provider medians were approximately `4.569 s` vs `4.479 s`. The first truly cold clean Agent Home start reached about `18.6 s` pre-provider, with about `16.6 s` concentrated before `session_start`; Fast File Finder can wait up to roughly `15 s` on its initial scan. Additional outliers showed host/Node/filesystem variability.

Current operational conclusion: keep Skill Registry available; do not disable it, remove Pretty or repeatedly clean Agent Home by ritual. Performance work requires measured attribution. Full current evidence: `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`.

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
3. `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md` for the current runtime promotion, then `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`, `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`, `docs/ATENEA_HANDOFF_20260830.md` and Stage-specific frozen evidence;
4. earlier decision files and forward-looking plans.