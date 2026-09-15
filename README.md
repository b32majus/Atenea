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
6. **`docs/INSTALLATION_AND_OPERATION_V1.md`** — provisioning, global/Atenea/target scopes and runtime verification.
7. **`docs/OPERATOR_RUNBOOK_V1.md`** — how the human starts an `EXECUTION_READY` run.
8. `docs/QUALIFICATION.md` and historical evidence only when provenance is needed.

If you only need the operational map first, read the newcomer quickstart before opening historical evidence.

Historical handoffs/stage files are evidence. They do not override current authority.

## The two Atenea surfaces

Atenea deliberately separates **preparation** from **execution**.

```text
HUMAN + CORA / PLANNING CHAT
  read Atenea + target project
  determine current stage / repo context
  understand what already exists
  choose the minimum shaping path
  resolve product ambiguity
  produce durable repository/tracker authority
            ↓
  HUMAN explicitly promotes EXECUTION_READY
            ↓
HUMAN AUTHORIZATION + HERDR + PI/GENTLE-PI 2.7
  explicit human execution authorization
  human or Cora/DC mechanically starts one visible persistent parent
  one bounded execution/train prompt
            ↓
PERSISTENT PARENT — train/frontier orchestrator
  retains bounded train context
  fresh package-owned implementation child per newly selected ticket
  exact diff reconciliation + deterministic verification
            ↓
HYBRID-NATIVE RDD
  package-local Gentle AI 2.9.1 START through non-TTY Bash subprocess
  exact returned lineage adopted by Gentle Pi STATUS
  provider review/correction → APPROVED → acknowledgement/burn
            ↓
authorized checkpoint / normal non-force publication where repository policy allows
            ↓
same parent re-discovers compatible frontier
  fresh child for next ticket OR STOP
            ↓
STOP before human merge / when exhausted
            ↓
factual final report
```

**Cora/human decides how work should be understood and shaped before `EXECUTION_READY`. Pi does not choose or invent the development methodology.**

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
  manual + interactive shaping
  human + Cora/planning surface
  repo-native authority

FROM EXECUTION_READY
  explicit human execution authorization
  → one persistent Pi + Gentle Pi 2.7 parent, visible in Herdr
  → parent resolves current repo/GitHub frontier and keeps train context
  → fresh package-owned gentle-ai-worker child for each newly selected ticket
  → parent reconciles exact diff + deterministic tests/QA
  → package-local Gentle AI 2.9.1 native review START via the parent's Bash tool
       (only this subprocess is non-TTY; no consent override flag)
  → Gentle Pi STATUS adopts the exact returned lineage
  → provider reviewer/correction transitions → APPROVED → acknowledgement/burn
  → authorized checkpoint/publication
  → fresh frontier rediscovery → next fresh child or STOP
  → human merge boundary
```

The parent itself stays interactive and visible in Herdr. This topology was field-qualified on 2026-09-15 with two sequential tickets, two fresh native children, two distinct medium-risk lineages, two APPROVED+burn closures and **zero review-consent dialogs / zero human touches after the initial train prompt**.

Atenea does **not** require a bespoke queue, scheduler, DAG, lifecycle controller, reviewer wrapper, execution launcher, Herdr policy gate or consent state machine. The pre-GP2.7 plain-supervisor + fresh outer worker + mechanical RDD relay topology remains historical/rollback evidence; it is no longer the normal unattended path.

Pinned normal execution follows `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md`. Model literals are resolved before launch and are never silently substituted. Current routing is deliberately role-diverse: GLM 5.3 Flash high persistent parent/coordinator + native writer, Luna high verifier + readability, and DeepSeek V4.1 Flash high reliability/resilience/risk. Refuter/validator inherit/provider-route. The former DeepSeek V4.1 outer-supervisor route is historical after the topology replacement. See `docs/ROUTING_EVIDENCE_LEDGER_V1.md`.

## Normative contract

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the normative horizontal contract.

High-frequency rules:

1. **Before `EXECUTION_READY`: human-present shaping.**
2. **From `EXECUTION_READY`: autonomous bounded execution after explicit human authorization.**
3. **One visible persistent Gentle-Pi parent owns the train/frontier context and exact-candidate review lifecycle.**
4. **Each newly selected ticket gets a fresh package-owned implementation child in the normal multi-ticket recipe.**
5. **Herdr is process/session/observability substrate, not policy or review authority.**
6. **Native RDD START uses package-local Gentle AI through the parent's non-TTY Bash subprocess; Gentle Pi then adopts the same lineage by STATUS.**
7. **Provider bindings/continuations remain opaque; APPROVED is incomplete until acknowledgement/burn succeeds.**
8. **Evidence outranks narration; host-human-touch claims are externally adjudicated.**
9. **Normal non-force push is allowed by repository policy; no force-push, hidden history rewrite or auto-merge.**
10. **Material ambiguity / contradictory authority / unsafe drift => STOP.**
11. **New Atenea glue requires evidence of a real missing upstream owner.**

## Field qualification

Core architecture is field-proven across historical and current epochs.

```text
STAGES_0_4                               PASS
STAGE5_MATT_GENTLE_COMPOSITION          PASS
STAGE6_NATIVE_GENTLE_RDD                PASS
STAGE7_PI_SELF_LAUNCH                   PASS
STAGE8_FRONTIER_DISCOVERY               PASS
OLD_SUPERVISOR_MULTI_TICKET_GOLDEN      PASS   # historical C-025/C-030 topology
GP27_PERSISTENT_PARENT_FRESH_CHILDREN   PASS
GP27_ONE_TOUCH_SESSION_GRANT            PASS   # historical fallback characterization
GP27_INITIAL_PROMPT_PREGRANT             FAIL   # no supported public grant surface
GP27_HERDR_TUI_RPA                       PASS_TECHNICALLY_NOT_ADOPTED
GP27_NATIVE_NO_TTY_START                PASS
GP27_SAME_LINEAGE_GENTLE_PI_ADOPTION    PASS
GP27_SINGLE_TICKET_HYBRID_ZERO_TOUCH    PASS
GP27_TWO_TICKET_HYBRID_ZERO_TOUCH       PASS   # adopted replacement evidence
```

The exact experiment ladder, failure boundaries, task IDs, lineages, commits and runtime hashes are preserved in `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`. Historical issue #38 and GP2.4/2.5 field evidence remain valid provenance for the properties they proved; they do not override the current GP2.7 topology.

## Gentle current boundary

Current truth for the adopted unattended path:

```text
Pi                                               0.85.1
Herdr                                            0.9.0
Gentle Pi                                        2.7.0 ADOPTED
Gentle AI                                        2.9.1 ADOPTED / package-paired
PERSISTENT_VISIBLE_GENTLE_PARENT                  REQUIRED_FOR_NORMAL_TRAIN
FRESH_NATIVE_CHILD_PER_NEW_TICKET                REQUIRED_FOR_NORMAL_MULTI_TICKET_RECIPE
NATIVE_NO_TTY_GAI_START                          REQUIRED
GENTLE_PI_SAME_LINEAGE_STATUS_ADOPTION           REQUIRED
NATIVE_GENTLE_EXACT_CANDIDATE_RDD                REQUIRED
ACKNOWLEDGEMENT_BURN                             REQUIRED
REVIEW_CONSENT_DIALOGS                           0 expected; appearance => fail closed
EXTERNAL_PI_SUPERVISOR                           NOT_NORMAL_PATH
ATENEA_MECHANICAL_RDD_CONSENT_RELAY              HISTORICAL_ROLLBACK_PATH
HERDR_TUI_RPA                                    DIAGNOSTIC_FALLBACK_NOT_ADOPTED
GENTLE_STANDING_SESSION_PERMISSION               ATTENDED_INTERACTIVE_ONLY
NORMAL_NON_FORCE_PUBLICATION                     REPOSITORY_POLICY
FINAL_MERGE                                      HUMAN_BOUNDARY
```

Do not manufacture zero-touch by injecting `granted`, rewriting provider consent, importing internal grant APIs, faking package-child FD3 identity or auto-clicking the host dialog. The qualified path uses the upstream no-terminal START behavior plus same-lineage Gentle Pi adoption.

Current replacement evidence: `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`. Worktree/sandbox lifecycle is governed by `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md`.

## Installation / making Atenea work

Atenea deliberately has **no bespoke installer or launcher**.

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
- `docs/ROUTING_EVIDENCE_LEDGER_V1.md` — current role/model evidence; separates supervisor, Gentle coordinator, builder and reviewers.
- `docs/START_HERE.md` — Cora/human project-entry and shaping decision procedure.
- `docs/ATENEA_HARNESS_CONTRACT_V1.md` — **normative execution contract**.
- `docs/CURRENT_DECISIONS.md` — current accepted decisions.
- `docs/INSTALLATION_AND_OPERATION_V1.md` — current environment/install/verification guide.
- `docs/OPERATOR_RUNBOOK_V1.md` — practical `EXECUTION_READY` operator path.
- `docs/QUALIFICATION.md` — field-qualified boundaries.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — real-project rollout evidence/policy.

### Current evidence / adoption boundaries

- `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md` — current GP2.5/GAI2.7 qualification, zero-touch relay, native Agents and promotion evidence.
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — historical zero-touch provider/OpenCode/Pi evidence and non-production boundary.
- `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md` — first real stable Gentle field run.

### Historical evidence

- `docs/ATENEA_HANDOFF_20260830.md` — historical post-Stage-8 handoff.
- Stage-specific files — frozen qualification evidence.
- `docs/DECISIONS.md` — historical decision log.
- `docs/REJECTED.md` — rejected/deferred architecture and supersession notes.

If a fresh Cora has to mine historical files to discover the current contract or normal operator path, treat that as a documentation regression.
