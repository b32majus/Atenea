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
HUMAN AUTHORIZATION + HERDR + PI
  explicit human execution authorization
  human or Cora/DC performs the mechanical supervisor launch
  one bounded execution/train prompt
            ↓
PI — thin non-implementing supervisor
  Gentle Pi OFF; pi-intercom ON; event-driven
            ↓
HERDR — process/session substrate
            ↓
FRESH PI WORKER + GENTLE PI 2.4 / GENTLE AI
  implementation + deterministic verification
  native exact-candidate RDD / bounded correction
  acknowledgement/burn
            ↓
normal non-force publication / remote checkpoint reconciliation
            ↓
PI re-discovers compatible frontier
  fresh worker for next compatible ticket OR STOP
            ↓
STOP before human merge / when exhausted
            ↓
PI factual final report
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
  → Cora/DC or human mechanical launch
  → normal Pi supervisor (non-implementing; Gentle Pi OFF; pi-intercom ON)
  → Herdr separate visible worker pane
  → fresh Pi + Gentle Pi 2.4 worker session (Pi parent / Gentleman coordinator; no separate delegated writer is required by the adopted path)
  → implementation / deterministic checks / Gentle native RDD / acknowledgement-burn / normal non-force publication
  → supervisor fresh frontier rediscovery / next compatible ticket or STOP
  → human merge boundary
```

Atenea does **not** require a bespoke queue, scheduler, DAG, lifecycle controller, reviewer wrapper, execution launcher, Herdr policy gate or Atenea state machine.

This Gentle-Pi worker path is the **adopted unattended workflow** after issue #35 `PASS_DELETE` and operator-authorized cutover #45. OpenCode remains installed and valid for attended/alternate work and as historical qualification evidence, but is no longer required by the normal unattended path.

Pinned worker creation follows `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`; model literals are resolved before launch and are never silently substituted. For role names and evidence status, use `docs/ROUTING_EVIDENCE_LEDGER_V1.md`: **Atenea supervisor ≠ Gentle parent/coordinator ≠ optional builder ≠ native reviewer/refuter ≠ Promotion Review**.

## Normative contract

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the normative horizontal contract.

High-frequency rules:

1. **Before `EXECUTION_READY`: human-present shaping.**
2. **From `EXECUTION_READY`: autonomous bounded execution.**
3. **Human authorization is mandatory; human or Cora/DC may perform the mechanical Pi-supervisor launch, then one bounded prompt starts autonomous supervision.**
4. **Pi does not implement product code or operate Gentle lifecycle commands.**
5. **Herdr is substrate, not policy authority.**
6. **The separate Pi/Gentle-Pi worker implements; Gentle owns exact-candidate/RDD/reviewer/repair authority.**
7. **Evidence outranks narration.**
8. **Normal non-force push is allowed; no force-push, hidden history rewrite or auto-merge.**
9. **Material ambiguity / contradictory authority / unsafe drift => STOP.**
10. **New Atenea glue requires evidence of a real missing upstream owner.**

## Field qualification

Core architecture is field-proven.

```text
STAGES_0_4                          PASS
STAGE5_MATT_GENTLE_COMPOSITION     PASS
STAGE6_NATIVE_GENTLE_RDD           PASS
STAGE7_PI_SELF_LAUNCH              PASS
STAGE8_FRONTIER_DISCOVERY          PASS
UNATTENDED_EXECUTION_RC2           PASS
ZERO_HUMAN_TOUCH_RC2               PASS
REMOTE_RECONCILIATION              PASS
FRONTIER_EXHAUSTION_STOP           PASS
REAL_OPERATOR_TRIGGERED_ATENEA_E2E PASS   # issue #38
```

Issue #38 historically proved the top-level human authorization/operator boundary end to end using the then-qualified OpenCode worker topology. That proof remains valid evidence, but its worker transport is no longer the current contract. T4/T5 plus the adopted cutover #45/#47 qualified the smaller current path:

```text
explicit human execution authorization
→ human or Cora/DC mechanically starts the plain Pi supervisor
→ named/scoped Pi supervisor → Herdr → fresh named/scoped Pi + Gentle Pi worker
→ implementation + deterministic verification + exact-candidate native RDD
→ acknowledgement/burn
→ normal non-force publication
→ checkpoint reconciliation / fresh compatible frontier or STOP
→ human merge boundary
```

Issue #39's bounded-preflight/visible-pane findings remain useful historical ergonomics evidence; OpenCode-specific live-stream work is not a gate for the adopted Pi/Gentle-Pi path.

See `docs/QUALIFICATION.md`.

## Gentle current boundary

Current truth for the adopted unattended path:

```text
Pi                                               0.85.1 field epoch
Gentle Pi                                        2.4.0 ADOPTED
Gentle AI                                        2.6.0 field epoch
NATIVE_GENTLE_EXACT_CANDIDATE_RDD               REQUIRED
SUPERVISOR_GENTLE_COMMANDS                       0
NAMED_SCOPED_PI_INTERCOM_IDENTITY                REQUIRED_FOR_PINNED_RUNS
ATENEA_MECHANICAL_RDD_CONSENT_RELAY              REQUIRED_FOR_PINNED_RUNS
ATENEA_GENTLE_REVIEWER_CONTINUATION_V1            REQUIRED_FOR_PINNED_RUNS
NORMAL_NON_FORCE_PUBLICATION                     REPOSITORY_POLICY
FINAL_MERGE                                      HUMAN_BOUNDARY
```

The older negotiated-v2/OpenCode provider-selector gap remains tracked only for that alternate/historical OpenCode route. It does **not** block the adopted Pi/Gentle-Pi unattended workflow and is not a global Atenea replacement requirement.

Do not strip provider `relay`, inject `granted`, synthesize START/envelopes, create a consent DB/controller or turn historical canary behavior into a permanent fork. Pinned runs use the versioned spawn recipe, mechanical RDD relay and the T5-proven reviewer continuation contract instead. Opaque reviewer bindings are never reconstructed by the supervisor or ticket brief.

Evidence: `docs/GENTLE_PI_24_REPLACEMENT_FIELD_EVIDENCE_20260905.md`; historical OpenCode canary: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

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

- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — zero-touch provider/OpenCode/Pi evidence and non-production boundary.
- `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md` — first real stable Gentle field run.

### Historical evidence

- `docs/ATENEA_HANDOFF_20260830.md` — historical post-Stage-8 handoff.
- Stage-specific files — frozen qualification evidence.
- `docs/DECISIONS.md` — historical decision log.
- `docs/REJECTED.md` — rejected/deferred architecture and supersession notes.

If a fresh Cora has to mine historical files to discover the current contract or normal operator path, treat that as a documentation regression.
