# Atenea

Atenea is an **upstream-first autonomous engineering harness** for taking already-shaped software work from durable repository/tracker authority to a reviewed, published checkpoint with minimal custom glue.

Atenea is a **contract and policy layer over qualified upstream tools**, not a custom orchestration runtime.

## Start here

If you are a fresh Cora / planning assistant, or a human returning to a project, do **not** reconstruct Atenea from historical Stage files.

Read in this order:

1. **`README.md`** — this current overview.
2. **`docs/NEWCOMER_QUICKSTART_V1.md`** — one-page map of scopes, Matt setup, current routing and execution boundaries.
3. **`docs/START_HERE.md`** — project-entry decision procedure for start/continue work.
4. **`docs/ATENEA_HARNESS_CONTRACT_V1.md`** — **normative execution contract**.
5. **`docs/CURRENT_DECISIONS.md`** — current accepted decisions and field findings.
6. **`docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`** — pre-implementation reviewability budget, coherent slicing and oversized unpublished-history recovery.
7. **`docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md`** — repo-owned changed-file-aware deterministic checkpoint validation contract.
8. **`docs/PUBLISH_CHECKPOINT_V1.md`** — thin deterministic Atenea publication/PR/CI recipe.
9. **`docs/INSTALLATION_AND_OPERATION_V1.md`** — provisioning, global/Atenea/target scopes and runtime verification.
10. **`docs/OPERATOR_RUNBOOK_V1.md`** — how the human starts an `EXECUTION_READY` run.
11. `docs/QUALIFICATION.md` and `docs/LABORATORIO_PRIVACIDAD_GP33_FIELD_QUALIFICATION_20260921.md` when provenance/field evidence is needed.

If you only need the operational map first, read the newcomer quickstart before opening historical evidence.

Historical handoffs/stage files are evidence. They do not override current authority.

## The two Atenea surfaces

Atenea deliberately separates **preparation** from **execution**.

```text
HUMAN + CORA / PLANNING
  understand target repo
  choose the minimum shaping path
  resolve material ambiguity
  create durable repo/tracker authority
            ↓
  HUMAN promotes EXECUTION_READY
            ↓
HUMAN AUTHORIZATION + HERDR + PI/GENTLE-PI 3.3
  start one visible persistent parent on nan/glm5.3-flash high
  one bounded authorized work item/train prompt
            ↓
PERSISTENT PARENT + GENTLE SHELL / ODD
  technical explore/classify/track as needed
  internal decomposition + bounded delegation + verification
  work-unit commits + provider-owned risk/review routing
            ↓
ONE-TOUCH REVIEW
  first eligible review: human selects “Review and allow this session”
  later same-session/canonical-repository reviews: no second consent touch
  exact provider-issued reviewer/refuter/validator operations
  APPROVED → acknowledgement/burn
            ↓
Atenea re-reads external authority → next authorized unit/frontier or STOP
            ↓
human merge boundary
```

**Cora/human decides how work is understood and shaped before `EXECUTION_READY`. Pi does not invent the development methodology.**

## Project-entry routing before `EXECUTION_READY`

The current front-door classification is a planning aid, not a new persisted state machine:

```text
REPO_CONTEXT=
  GREENFIELD
  SMALL_BROWNFIELD
  LARGE_CODE_BROWNFIELD
  MIXED_CORPUS_BROWNFIELD
```

### Greenfield

Primary authoring path: **Matt Pocock upstream**.

Use the complete upstream method that fits the work. Do not copy fragments of third-party skills into Atenea and do not create a parallel Atenea authoring framework.

### Small brownfield

Understand the repository directly and preserve accepted repo-native authority.

Use **OpenSpec delta-first when it materially improves the change contract**. Do not route every existing project through OpenSpec by ritual.

### Large code brownfield

Before broad file-by-file archaeology, Cora may check whether a healthy repository-intelligence index already exists and whether it materially improves understanding.

If none exists, Cora may recommend a qualified upstream provider before shaping the delta. Repository Intelligence is derived evidence, never source/spec/review authority.

### Mixed-corpus brownfield

If understanding depends materially on code + docs/schemas/ADRs/PDFs/images or other first-party knowledge, Cora may recommend a mixed-corpus repository-intelligence provider before shaping.

Current candidates under evaluation include **CodeGraph** for code-heavy repositories and **Graphify** for mixed corpora. Neither is currently a mandatory Atenea dependency or auto-installed runtime component.

Canonical policy and detailed start/continue procedure: `docs/START_HERE.md`.

## Repository Intelligence boundary

```text
CORA_MAY_RECOMMEND_REPOSITORY_INTELLIGENCE=YES
PI_MAY_INVENT_REPOSITORY_INTELLIGENCE=NO
REPOSITORY_INTELLIGENCE_IS_AUTHORITATIVE=NO
AUTO_INSTALL_OR_AUTO_INDEX_BY_ATENEA=NO
```

Atenea consumes complete upstream tools through public surfaces when justified. It does not copy pieces of their skills, parsers, graph logic, watchers or control loops into Atenea.

A graph/index may improve understanding and reduce repeated archaeology. It does **not** approve a change, replace tests, replace accepted specs, replace Gentle RDD or authorize merge.

## Current execution architecture

```text
BEFORE EXECUTION_READY
  human-present shaping + durable repo/tracker authority
            ↓
ONE-TOUCH EXECUTION
  → one visible persistent Pi + Gentle Pi 3.3 parent on NaN GLM 5.3 Flash high
  → one bounded authorized work item/train prompt
  → Gentle Shell/ODD owns internal tasking, delegation, verification and work-unit commits
  → provider-owned Gentle AI 3.4 risk/review routing
  → FIRST eligible review only: human selects “Review and allow this session”
  → later same-session/repository reviews need no second consent touch
  → exact reviewer/refuter/validator operation returned by the provider
  → APPROVED → acknowledgement/burn
  → Atenea re-reads external authority → next authorized frontier or STOP
  → human merge boundary
```

The current property is **ONE-TOUCH**, not zero-touch. Reload preserves session permission; new/resume/fork/quit/process restart/revoke ends it.

There is no normal external Pi supervisor, pi-intercom consent relay, Herdr RPA or Atenea review controller.

Current recipe: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

Current operational routing is deliberately role-diverse: NaN GLM 5.3 Flash high for the persistent parent, gentle-ai-worker, and **review-risk**; OpenAI-Codex Luna high for gentle-ai-verify, review-readability, **review-reliability**, and review-validator; NaN DeepSeek V4 Flash high for review-resilience and review-refuter. Pi's ordinary default remains nan/deepseek-v4-flash medium and max_concurrency=1. The all-V4 profile was temporary Q11 qualification, not production policy.

NaN's documented per-answer ceiling is `32768` for both active NaN models; a temporary `65536` client declaration did not enlarge the usable DeepSeek reviewer ceiling and has been reverted. DeepSeek `medium/high` is profile metadata, not effective reasoning-depth control; GLM `low/medium/high/max` is effective. Reliability remains provisionally on Luna; risk is GLM high after the exact frozen risk prompt reproduced DeepSeek `thinking`-only / `stopReason:length` while GLM completed valid reviewer JSON. See `docs/NAN_PROVIDER_CAPABILITIES_V1.md` and `docs/NAN_DEEPSEEK_INPROCESS_REVIEWER_INCIDENT_20260920.md`.

## Normative contract

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the normative horizontal contract.

High-frequency rules:

1. **Before `EXECUTION_READY`: human-present shaping.**
2. **From `EXECUTION_READY`: autonomous bounded execution after explicit human authorization.**
3. **One visible persistent Gentle-Pi parent owns the external train/frontier context; Gentle Shell/ODD owns internal engineering micro-orchestration.**
4. **Work-unit composition is resolved before substantial implementation, not after a giant candidate already exists.** Default upstream planning budget is 400 authored changed lines unless `review_budget_lines` says otherwise; Atenea treats ~401–600 as soft overage without waiving any upstream-required delivery/`size:exception` decision, ~601–800 as an explicit exception band, and >800 as STOP/reslice by default. These are planning heuristics, not hard reviewer limits.
5. **Atenea does not require one fresh child per external ticket; ODD selects bounded internal delegation according to the work.**
6. **Herdr is process/session/observability substrate, not policy or review authority.**
7. **The current GP3.3 path is one-touch: the first eligible review gets one real host session grant; later same-session/repository candidates use fresh validated provider grants without a second consent touch.**
8. **Review lifecycle transport is facade-first:** when `gentle_review` exposes the operation, use it; shell `gentle-ai review ...` and `ask_user_choice` must not bypass/recreate host one-touch semantics. `inspect` never substitutes for `ASSESS → STATUS`.
9. **Provider bindings/continuations remain opaque; the qualified host bridge may forward the current retained reviewer group without LLM reserialization, but role-specific provider operations remain authoritative; APPROVED is incomplete until acknowledgement/burn succeeds.**
10. **Evidence outranks narration; host-human-touch claims are externally adjudicated.**
11. **Pre-publication validation is repo-owned:** the target repo maps changed paths to its validators and emits `checkpoint-preflight/v1` for the exact candidate; Atenea does not maintain an extension/check catalog.
12. **Mechanical publication is deterministic:** `publish-checkpoint` verifies exact base/head/paths, repo PASS, declared credential requirements, normal non-force push, remote/PR identity and CI, then STOPs at human merge.
13. **Normal non-force push is allowed by repository policy; no force-push, hidden history rewrite or auto-merge.**
14. **Material ambiguity / contradictory authority / unsafe drift => STOP.**
15. **New Atenea glue requires evidence of a real missing upstream owner.**

## Field qualification

```text
GP33_GAI34_RUNTIME_START                     PASS
GP33_FIRST_REVIEW_CONSENT_UI                 PASS
GP33_REVIEW_AND_ALLOW_THIS_SESSION           PASS
GP33_LATER_SAME_SESSION_REVIEW_NO_2ND_TOUCH  PASS
GP33_ONE_TOUCH_SESSION_PERMISSION            PASS
Q10_ODD_INTERNAL_MICRO_ORCHESTRATION          PASS
Q10_UNAUTHORIZED_FRONTIER_STOP                PASS
Q11_SINGLE_ACCEPTANCE_UNATTENDED              PASS
```

A later qualification harness assertion incorrectly forced remaining refuter/validator work through one capture shape. That is harness/test debt, not a session-permission failure. Historical GP2.7 zero-touch evidence remains provenance only.

Laboratorio_Privacidad_Clinica V4 then supplied the first real-product train on Pi 0.86.1 / GP3.3 / GAI3.4. T01/T02 completed APPROVED + acknowledgement/burn and exposed four independent system boundaries now reflected in current policy: facade-first one-touch transport, coherent work-unit composition/material reviewer size, committed-range ASSESS debt (#90), and changed-file-aware publication validation. See `docs/LABORATORIO_PRIVACIDAD_GP33_FIELD_QUALIFICATION_20260921.md`.

## Gentle current boundary

```text
Pi                                               0.86.1
Herdr                                            0.9.0
Gentle Pi                                        3.3.0
Gentle AI                                        3.4.0 package-paired
DEFAULT_PI_MODEL                                 nan/deepseek-v4-flash medium
NAN_DEEPSEEK_OUTPUT_CEILING                     32768
NAN_GLM_OUTPUT_CEILING                          32768
DEEPSEEK_REASONING_EFFORT_EFFECTIVE             NO
REVIEW_RELIABILITY_ROUTE                        openai-codex/gpt-5.6-luna high
REVIEW_RISK_ROUTE                               nan/glm5.3-flash high
PERSISTENT_TRAIN_PARENT                         nan/glm5.3-flash high
INTERNAL_MICRO_ORCHESTRATION                    GENTLE_SHELL_ODD
FRESH_CHILD_PER_EXTERNAL_TICKET                 NOT_AN_ATENEA_INVARIANT
DEFAULT_REVIEW_BUDGET_LINES                     400 when no explicit session override
WORK_UNIT_SOFT_OVERAGE_DEFAULT                  401-600 coherent only
WORK_UNIT_SIZE_EXCEPTION_DEFAULT                601-800 explicit durable rationale
WORK_UNIT_ABOVE_800_DEFAULT                     STOP_RESLICE_OR_HUMAN_INDIVISIBILITY_EXCEPTION
QUALIFIED_HOST_BRIDGE                           REQUIRED_FOR_GP3_3_CURRENT_GROUP_AND_CONSENT_SIGNAL
FIRST_REVIEW_SESSION_GRANT                      HUMAN_ONE_TOUCH
LATER_SAME_SESSION_REVIEW_CONSENT_TOUCHES       0 expected
EXPLICIT_REVIEW_ROLE_ROUTING                    REQUIRED
REVIEW_LIFECYCLE_TRANSPORT                      GENTLE_PI_FACADE_WHEN_AVAILABLE
PREPUBLICATION_ARTIFACT_VALIDATION               REPO_OWNED_CHECKPOINT_PREFLIGHT
PUBLISH_CHECKPOINT                               THIN_DETERMINISTIC_COMMAND
ORACLE_SEMANTICS                                 DRIFT_EVIDENCE_NOT_DEFECT_AUTHORITY
ACKNOWLEDGEMENT_BURN                            REQUIRED
FINAL_MERGE                                     HUMAN_BOUNDARY
```

Do not manufacture the one-touch grant from prompt prose, environment booleans, internal APIs or automation.

Current recipe: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

## Installation / making Atenea work

Atenea has no bespoke orchestration installer or launcher. The only current repo-owned runtime adaptations are the narrow, version/hash-guarded GP3.3 host bridge and Gentle-AI-3.4 assess-timing bridge, installed explicitly after the upstream Gentle package and retired when upstream owns the same behavior.

For a fresh environment:

1. clone this repository;
2. read `docs/START_HERE.md`;
3. install the current upstream runtime stack through supported upstream surfaces;
4. verify Pi / Herdr / Gentle Pi / Gentle AI / pi-intercom effective behavior; treat OpenCode verification as optional for explicitly selected alternate/historical use;
5. shape the target work before `EXECUTION_READY`;
6. start executable work using `docs/OPERATOR_RUNBOOK_V1.md`.

Current reference stack and verification gates: **`docs/INSTALLATION_AND_OPERATION_V1.md`**.

## Engineering quality

`CODING_STANDARDS.md` contains stable horizontal engineering guardrails.

```text
ALWAYS-ON POLICY
  CODING_STANDARDS.md

TASK-TRIGGERED UPSTREAM METHODS
  Matt tdd
  Matt codebase-design
  Matt domain-modeling
  Matt diagnosing-bugs
  Matt code-review when semantic/spec-compliance risk warrants it

MACHINE ORACLES
  repo tests / lint / build / typecheck / structural checks

FINAL CANDIDATE LIFECYCLE
  Gentle native RDD
```

The Matt skills are not a mandatory execution sequence.

## Canonical documentation map

### Current / read first

- `README.md` — current overview and navigation.
- `docs/NEWCOMER_QUICKSTART_V1.md` — fast scope/setup/skills/routing/execution map for a fresh operator or agent.
- `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md` — safe read-only greenfield/brownfield/legacy entry reconciliation before shaping.
- `docs/ROUTING_EVIDENCE_LEDGER_V1.md` — current role/model evidence for the persistent parent, native children and reviewers.
- `docs/START_HERE.md` — Cora/human project-entry and shaping decision procedure.
- `docs/ATENEA_HARNESS_CONTRACT_V1.md` — **normative execution contract**.
- `docs/CURRENT_DECISIONS.md` — current accepted decisions and supersession state.
- `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` — current pre-implementation work-unit budget/composition and oversized unpublished-history recovery policy.
- `docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md` — repo-owned changed-file-aware deterministic checkpoint validation contract.
- `docs/PUBLISH_CHECKPOINT_V1.md` — thin deterministic publication/PR/CI seam.
- `docs/INSTALLATION_AND_OPERATION_V1.md` — current environment/install/verification guide.
- `docs/OPERATOR_RUNBOOK_V1.md` — practical `EXECUTION_READY` operator path.
- `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md` — current pinned GP3.3 one-touch train mechanics.
- `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md` — Q10/Q11 adoption, host-bridge and performance evidence.
- `docs/LABORATORIO_PRIVACIDAD_GP33_FIELD_QUALIFICATION_20260921.md` — first real Pi 0.86.1 / GP3.3 / GAI3.4 product-train evidence.
- `docs/QUALIFICATION.md` — current qualification index and proven boundaries.
- `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` — local worktree/qualification lifecycle and cleanup policy.

### Migration / qualification evidence

- `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` — historical GP2.7/GAI2.9.1 topology-replacement evidence.
- `docs/ROUTING_QUALIFICATION_EVIDENCE_20260912.md` — historical A/B evidence underlying the current GLM/Luna/V4 role-diverse policy.

### Historical / rollback evidence

- `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md` — historical GP2.5/GAI2.7 promotion and relay-era evidence; superseded for normal operation by C-040/C-041.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — historical pre-GP2.7 real-project rollout policy/evidence.
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — historical provider/OpenCode/Pi zero-touch characterization and non-production boundary.
- `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md` — historical first real stable Gentle field run.
- `docs/GENTLE_REVIEWER_CONTINUATION_V1.md` — historical pre-GP2.7 rollback/regression contract for reviewer continuation.
- `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md` — historical separate-supervisor spawn recipe retained for rollback/reproduction.
- `docs/ATENEA_HANDOFF_20260830.md` — historical post-Stage-8 handoff.
- Stage-specific files — frozen qualification evidence.
- `docs/DECISIONS.md` — historical decision log; use `docs/CURRENT_DECISIONS.md` for current authority.
- `docs/REJECTED.md` — rejected/deferred architecture and supersession notes.

If a fresh Cora has to mine historical files to discover the current contract or normal operator path, treat that as a documentation regression.
