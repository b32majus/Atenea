# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

Use this file when a human says something like:

> “Read Atenea; we are going to start this project.”

or:

> “Read Atenea and continue this project from where we left it.”

This is a navigation and decision guide, not a second runtime contract. If anything here conflicts with the normative harness contract, `docs/ATENEA_HARNESS_CONTRACT_V1.md` wins.

## 1. Read order for a fresh Cora / planning assistant

Do not reconstruct Atenea from historical stage files. Read in this order:

1. `README.md` — current architecture and front-door summary.
2. `docs/START_HERE.md` — this project-entry procedure.
3. `docs/ATENEA_HARNESS_CONTRACT_V1.md` — **normative execution contract**.
4. `docs/CURRENT_DECISIONS.md` — current accepted decisions and field findings.
5. `docs/OPERATOR_RUNBOOK_V1.md` — only when a work item is already `EXECUTION_READY` or the human is about to run it.
6. `docs/QUALIFICATION.md` — what has actually been field-proven.
7. Historical stage/evidence documents only when a current claim needs provenance.

`docs/ATENEA_HANDOFF_20260830.md`, stage files and older decision files are historical evidence. They are not the place to recover current forward-looking authority when current documents exist.

## 2. Two surfaces, two responsibilities

Atenea deliberately separates project preparation from autonomous execution.

```text
HUMAN + CORA / PLANNING CHAT
  read Atenea + target project
  understand current state
  choose the minimum shaping path
  resolve product ambiguity
  produce durable repository/tracker authority
            ↓
  HUMAN explicitly promotes EXECUTION_READY
            ↓
HUMAN + HERDR + PI
  human opens Herdr
  human starts Pi interactively
  human gives one bounded execution prompt
            ↓
PI → Herdr → headless OpenCode → Gentle/RDD
            ↓
normal publication → PR/checkpoint → frontier STOP
            ↓
Pi factual final report
```

**Cora/human owns the pre-`EXECUTION_READY` interpretation. Pi does not decide which software-development methodology should be invented or installed.** Pi receives already-shaped work and supervises bounded execution.

## 3. Project-entry classification

When starting or resuming a target project, classify the **current situation**, not just the repository age.

Recommended working fields:

```text
REPO_CONTEXT=
  GREENFIELD
  SMALL_BROWNFIELD
  LARGE_CODE_BROWNFIELD
  MIXED_CORPUS_BROWNFIELD

CURRENT_STAGE=
  DISCOVERY
  SHAPING_IN_PROGRESS
  SPEC_READY
  EXECUTION_READY
  EXECUTION_IN_PROGRESS
  DELIVERY_CHECKPOINT
  MAINTENANCE

REPOSITORY_INTELLIGENCE=
  NOT_NEEDED
  EXISTING_AND_USABLE
  EXISTING_BUT_STALE
  RECOMMENDED
```

These labels are planning aids, not a new state machine and not fields Pi must persist.

### GREENFIELD

Primary shaping path: **Matt Pocock upstream**.

Use the complete upstream method that fits the problem (domain modeling, codebase design, PRD/spec/tickets, TDD, etc.). Do not copy fragments of third-party skills into Atenea and do not build an Atenea-specific authoring framework.

Normal direction:

```text
idea
→ Matt upstream shaping
→ durable repo/tracker authority
→ human acceptance
→ EXECUTION_READY
→ Atenea execution
```

### SMALL_BROWNFIELD

Understand the repository directly. Preserve accepted repo-native authority.

Use **OpenSpec delta-first only when it materially improves clarity, auditability or handoff**. Do not create a knowledge graph or reverse-document the whole product by ritual.

### LARGE_CODE_BROWNFIELD

Before broad file-by-file archaeology, ask whether durable repository intelligence already exists and is healthy enough to improve understanding.

If it exists, it may be used as **derived, non-authoritative evidence**. If it does not exist, Cora may recommend a qualified repository-intelligence provider before OpenSpec/shaping when the expected reduction in rediscovery is material.

Then shape the actual change, normally using accepted repo-native authority and/or OpenSpec delta-first when useful.

### MIXED_CORPUS_BROWNFIELD

Use this when understanding depends materially on more than source code: documentation, schemas, ADRs, PDFs, images or other first-party knowledge.

Cora may recommend a repository-intelligence provider capable of mapping the relevant mixed corpus before shaping the delta. The graph/index is still derived evidence; canonical source files and accepted specs remain authority.

## 4. Repository Intelligence policy

Repository Intelligence is an **optional pre-shaping aid**, not a new Atenea runtime layer.

Current policy:

```text
CORA_MAY_RECOMMEND_REPOSITORY_INTELLIGENCE=YES
PI_MAY_INVENT_REPOSITORY_INTELLIGENCE=NO
REPOSITORY_INTELLIGENCE_IS_AUTHORITATIVE=NO
AUTO_INSTALL_OR_AUTO_INDEX_BY_ATENEA=NO
PROVIDER_LOCK_IN=NO
```

Before recommending creation of an index/graph, Cora should determine:

- whether the repository is large/complex enough to justify it;
- whether an existing index already exists;
- whether that index is healthy/current enough for the task;
- whether code-only intelligence is sufficient or the project is a mixed corpus;
- whether the tool stays isolated/removable and does not become another controller/source of truth.

Candidate providers currently under evaluation include **CodeGraph** for code-heavy repositories and **Graphify** for mixed code/document corpora. They are candidates, not mandatory Atenea dependencies. Do not copy pieces of their skills or internals into Atenea. Prefer complete upstream tools through their public CLI/MCP surfaces if qualification later selects them.

A graph may answer “what is connected to what?” or “what is the likely blast radius?”. It does not approve a change, replace source/spec authority, replace tests, replace Gentle RDD or authorize merge.

## 5. Start vs continue

When the human says **start**, determine what authority does not yet exist and choose the smallest shaping path that can create it.

When the human says **continue**, first discover what is already valid:

- current repo/head and active work;
- accepted specs/ADRs/product authority;
- open issue/PR/checkpoint state;
- existing OpenSpec delta if any;
- existing repository-intelligence index if any;
- whether the work is already `EXECUTION_READY`.

Do not restart discovery, regenerate specs or rebuild an index merely because Atenea supports those tools.

## 6. Readiness test

Do not move to the terminal just because a plan sounds plausible.

Before `EXECUTION_READY`, current durable authority must make the bounded work falsifiable and executable: required behavior, canonical authority, dependencies/blockers, acceptance evidence, scope/ownership boundaries and delivery boundary must be resolvable without recovering the original chat.

Human promotion to `EXECUTION_READY` is explicit.

## 7. Handoff to execution

Once the work item is `EXECUTION_READY`, stop expanding the shaping stack. Use `docs/OPERATOR_RUNBOOK_V1.md`.

The normal top-level interface is:

```text
human opens Herdr
→ starts Pi interactively
→ gives one bounded authoritative execution prompt
→ Pi performs bounded preflight
→ Pi supervises Herdr → headless OpenCode + Gentle
→ RDD / bounded correction
→ acknowledgement/burn
→ normal non-force publication
→ PR/checkpoint reconciliation
→ frontier rediscovery
→ STOP before merge / when exhausted
→ factual report
```

Pi remains non-implementing and does not operate the Gentle lifecycle directly.

## 8. Installation / environment

For a fresh environment, read `docs/INSTALLATION_AND_OPERATION_V1.md`.

Atenea deliberately has no bespoke installer/launcher. The installation guide identifies the current qualified upstream stack, verification gates and the normal operator start path while keeping fast-changing upstream installation mechanics owned upstream.

## 9. Historical evidence

Only consult historical files when needed to validate provenance or understand why a current decision exists. Do not let an older stage document override current authority because it contains more implementation detail.

Useful evidence anchors include:

- `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md` — first real stable Gentle field evidence;
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — negotiated-v2 unattended canary evidence/boundary;
- `docs/QUALIFICATION.md` — consolidated qualification state;
- Stage 7/8 files — frozen autonomous supervision/frontier evidence.
