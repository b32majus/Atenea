# Atenea

Atenea is an **upstream-first autonomous engineering harness** for taking already-shaped software work from durable repository/tracker authority to a reviewed, published checkpoint with minimal custom glue.

Atenea is a **contract and policy layer over qualified upstream tools**, not a custom orchestration runtime.

## Start here

If you are a fresh Cora / planning assistant, or a human returning to a project, do **not** reconstruct Atenea from historical Stage files.

Read in this order:

1. **`README.md`** — this current overview.
2. **`docs/START_HERE.md`** — project-entry decision procedure for start/continue work.
3. **`docs/ATENEA_HARNESS_CONTRACT_V1.md`** — **normative execution contract**.
4. **`docs/CURRENT_DECISIONS.md`** — current accepted decisions and field findings.
5. **`docs/OPERATOR_RUNBOOK_V1.md`** — how the human starts an `EXECUTION_READY` run.
6. **`docs/INSTALLATION_AND_OPERATION_V1.md`** — how to provision/verify the current environment.
7. `docs/QUALIFICATION.md` and historical evidence only when provenance is needed.

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
HUMAN + HERDR + PI
  human opens/uses Herdr
  human starts Pi interactively
  human gives one bounded execution prompt
            ↓
PI — thin non-implementing supervisor
            ↓
HERDR — process/session substrate
            ↓
HEADLESS OPENCODE (`opencode run`) + GENTLE AI
  implementation + deterministic verification
  native exact-candidate RDD / bounded correction
            ↓
acknowledgement/burn
            ↓
one fresh pre-publication authority revalidation
            ↓
normal non-force publication
PR/checkpoint reconciliation
            ↓
PI re-discovers compatible frontier
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
  human starts Pi in Herdr
  Pi supervises
  Herdr provides process/session substrate
  headless OpenCode implements
  Gentle owns exact candidate / RDD / reviewer authority / correction / ack-burn
  Git/GitHub owns publication/checkpoint/merge policy
```

Atenea does **not** require a bespoke queue, scheduler, DAG, lifecycle controller, reviewer wrapper, execution launcher, Herdr policy gate or Atenea state machine.

Interactive OpenCode remains valid for human-attended development. It is not the accepted unattended transport; field evidence selects headless `opencode run --format json`.

## Normative contract

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the normative horizontal contract.

High-frequency rules:

1. **Before `EXECUTION_READY`: human-present shaping.**
2. **From `EXECUTION_READY`: autonomous bounded execution.**
3. **Human starts Pi and gives one bounded prompt; Pi supervises thereafter.**
4. **Pi does not implement product code or operate Gentle lifecycle commands.**
5. **Herdr is substrate, not policy authority.**
6. **OpenCode implements; Gentle owns exact-candidate/RDD/reviewer/repair authority.**
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

Issue #38 proved the real top-level operator interface end to end:

```text
human opens Herdr
→ starts Pi interactively
→ one bounded execution prompt
→ Pi → Herdr → headless OpenCode → Gentle
→ implementation + verification + exact-candidate RDD
→ acknowledgement/burn
→ normal non-force publication
→ PR/checkpoint reconciliation
→ frontier STOP
→ final factual report
```

Issue #39 proved bounded pinned preflight plus a dedicated visible Herdr worker pane/id. A useful live OpenCode/Gentle stream in that pane remains **not yet proven and non-blocking**; Atenea prefers the functioning headless path over adding fragile observation machinery.

See `docs/QUALIFICATION.md`.

## Gentle current boundary

Current truth:

```text
Gentle AI production stable                  2.5.0
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY          PROVEN
RELEASED_V2_PROVIDER_UNATTENDED_SELECTOR     NOT_AVAILABLE
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY     PASS
REAL_OPERATOR_TRIGGERED_ATENEA_E2E           PASS
PRODUCTION_GENTLE_MODIFIED                   NO
UPSTREAM_REPLACEMENT_STILL_REQUIRED          YES
```

The bounded downstream canary proved the missing negotiated-v2 unattended behavior without Pi/OpenCode rewriting provider transitions. It remains canary-only; upstream `Gentleman-Programming/gentle-ai#4109` remains the production-resolution owner.

Do not strip provider `relay`, inject `granted`, synthesize START, create a consent DB/controller or turn the canary into a permanent fork.

Evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

## Installation / making Atenea work

Atenea deliberately has **no bespoke installer or launcher**.

For a fresh environment:

1. clone this repository;
2. read `docs/START_HERE.md`;
3. install the current upstream runtime stack through supported upstream surfaces;
4. verify Pi / Herdr / OpenCode / Gentle effective behavior;
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
