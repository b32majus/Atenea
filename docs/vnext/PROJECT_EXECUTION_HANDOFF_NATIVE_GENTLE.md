# Project Execution Handoff — Native Gentle vNext

Status: **OPERATIONAL / P0-QUALIFIED**

Date: 2026-09-21

Audience: a fresh Cora / planning assistant / operator resuming an already-shaped Atenea project such as PROMueve, Symphonia or Laboratorio de Privacidad.

This handoff exists so a project does **not** need to reconstruct the Atenea migration from conversation history.

## 1. Current execution decision

For already-shaped work, use the qualified native runtime:

```text
gentle-native
```

Current qualified stack:

```text
Pi 0.86.1
→ Gentle Shell / gentle-pi 3.3.0
→ Gentle AI 3.4.0
→ native ODD
→ native workers / verify
→ native RDD / reviewers
→ native acknowledge-approved / burn
```

Do **not** use the historical Atenea execution topology as the normal path.

For this transition, the following historical mechanisms are superseded for normal execution:

- external Atenea Pi supervisor;
- Herdr as policy/review controller;
- pi-intercom unattended relay;
- Atenea RDD consent relay;
- custom reviewer lifecycle controller;
- historical worker spawn recipes;
- historical model-routing wrappers;
- manual recreation of Gentle review transitions.

Herdr may still be used as an operator/session/observability surface where useful, but it is not execution or review authority.

## 2. What a fresh project Cora must read

Before writing code:

1. the target repository's **current durable product authority**:
   - accepted spec;
   - current issue/ticket/work order;
   - ADRs / domain docs / accepted decisions that materially constrain the task;
2. target repo `AGENTS.md`;
3. target repo `CODING_STANDARDS.md` if present;
4. target repo's relevant test / CI / contribution instructions;
5. this handoff;
6. Atenea vNext P0/P1 evidence only when runtime/protocol ambiguity exists:
   - `docs/vnext/P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`
   - `docs/vnext/ATENEA_CAPABILITY_RECONCILIATION.md`

Do **not** mine old Atenea stage/handoff files unless historical evidence is specifically needed.

## 3. How to interpret an old project AGENTS.md

Many existing projects were created during older Atenea/Gentle epochs and may contain three different kinds of instructions mixed together.

Classify them before execution.

### A. Stable project instructions — BINDING

Keep and obey:

- domain/clinical/business invariants;
- safety / privacy rules;
- no-inference rules;
- data constraints;
- architectural boundaries genuinely specific to that repository;
- coding standards / testing expectations;
- Git safety;
- publication / merge boundaries;
- scope limits;
- repository-specific commands and authoritative docs.

### B. Shaping instructions — ONLY WHEN SHAPING IS ACTIVE

Examples:

- Matt Pocock greenfield workflow;
- spec authoring;
- ticket generation;
- OpenSpec proposal/spec/task generation;
- repository-intelligence discovery used to understand the problem.

If the project already has accepted durable specs/tickets/work orders and is execution-ready:

> **do not re-run shaping by ritual.**

Do not regenerate specs/tickets merely because the old `AGENTS.md` describes how they were originally created.

For greenfield work that has **not** yet completed shaping, the relevant Matt/OpenSpec instructions remain in force until durable executable authority exists.

Phase 3 of Atenea vNext will separately decide how much of this shaping layer survives long term. Until then, do not delete the 37 Matt skills or redesign their workflow.

### C. Historical execution mechanics — SUPERSEDED

Examples:

- “start Atenea supervisor”;
- supervisor → Herdr → worker topology;
- pi-intercom relay;
- Atenea consent relay;
- custom review bridge/controller;
- old reviewer routing tables;
- fresh outer worker per ticket;
- direct shell reconstruction of Gentle transitions;
- obsolete Gentle/Pi version-specific startup recipes.

These are not current execution authority for the native vNext path.

If an old project `AGENTS.md` conflicts with this handoff **only on those historical runtime mechanics**, preserve the project's stable rules and execute through native Gentle.

If the conflict touches product/domain/safety authority rather than runtime mechanics, STOP and resolve it with the human.

## 4. Start every real execution from clean repository authority

Never resume a stale historical Pi session simply because it exists.

For a paused project such as Symphonia or Laboratorio:

```text
current remote/repository authority
→ inspect current branch / PR / open work
→ determine accepted checkpoint
→ create or reuse a CLEAN isolated worktree
→ start a fresh native Gentle session
```

Do not carry forward:

- old Pi session memory;
- stale RDD lineages unless the task is specifically to complete that exact valid lineage;
- transient worker state;
- historical environment variables;
- stale model profile pins;
- accidental dirty workspace state.

Preserve durable Git/GitHub evidence. Reconstruct execution state from authority.

## 5. Preflight before launching Gentle

Confirm:

```text
1. correct repository
2. correct authoritative base branch / SHA
3. isolated worktree
4. git status clean, unless the explicitly accepted candidate requires otherwise
5. no accidental unrelated branch/worktree reuse
6. task/spec authority identified
7. project AGENTS stable rules understood
8. no shaping rerun required
9. no push/PR/merge authority assumed
```

Then start from the target worktree with:

```bash
gentle-native
```

The qualified launcher uses an isolated HOME and removes inherited historical Atenea / pi-intercom / stale Gentle-Pi environment variables.

Do not replace it with ordinary production `pi` while the historical VPS HOME remains dirty.

## 6. Native profile

Qualified current profile:

```text
native-nan
```

Reviewer roles are currently pinned through **native Gentle model routing** to:

```text
nan/glm5.3-flash
thinking = low
```

for:

- review-risk;
- review-readability;
- review-reliability;
- review-resilience;
- review-refuter;
- review-validator.

Reason: current NaN OpenAI-compatible streaming can terminate long reviewer reasoning with a `reasoning_only_stream` truncation frame that is malformed JSON. The exact real PROMueve reviewer prompt passed at `low` and failed at default/medium.

This is native user-owned Gentle configuration, not Atenea glue.

Do not silently change reviewer effort/routing during a live review lineage.

## 7. What to give Gentle

Give Gentle the **semantic execution contract**, not a second orchestration script.

A good execution request contains:

- authoritative task/work order;
- intended outcome;
- acceptance criteria already decided by product authority;
- constraints / non-goals;
- relevant repository/domain safety rules;
- permission boundaries for publication;
- any explicit deterministic evidence requirement.

Do **not** prescribe:

- which worker must edit each file;
- a custom reviewer;
- custom RDD ordering;
- a second task state machine;
- exact internal decomposition unless product semantics require it;
- reviewer/refuter/validator transport.

Let native Gentle decide ODD classification, decomposition and required delegation.

## 8. TDD / oracle rule

If accepted authority makes behavior testable, prefer independent deterministic acceptance evidence.

The qualified PROMueve P0 pattern was:

```text
read authority
→ derive acceptance oracle
→ freeze RED oracle before writer authority
→ native worker implementation
→ independent native verify
→ commit
→ native review
```

The oracle must be derived from accepted authority, not from the implementation under test.

Do not invent a frozen oracle when the task does not justify one.

## 9. Work-unit composition

Do not hand Gentle an unnecessarily gigantic candidate if the work can be decomposed coherently.

Current planning intent survives:

- small coherent work units are preferred;
- do not code-golf merely to reduce line count;
- do not split one semantic change into artificial fragments that cannot be reviewed independently;
- very large work should be composed before implementation when practical.

The exact review lifecycle and `review_due` decision belong to Gentle, not to Atenea line-count logic.

## 10. Review lifecycle

Use the **native Gentle facade/lifecycle**.

Rules:

- do not recreate review authority in prompts;
- do not invent reviewer verdicts;
- do not bypass a native facade with custom shell glue when the facade supports the operation;
- follow provider-issued transitions exactly;
- approval is incomplete until native acknowledgement/burn succeeds;
- reviewer failure is not permission to START/retry indefinitely.

On first eligible review in a fresh Pi session/repository, the human may need to choose:

```text
Review and allow this session
```

That is native host consent.

## 11. Known TEMP_COMPAT exception — committed-range ASSESS

One historical seam is **not yet fully retired**.

Open defects:

- Gentle Shell #1175;
- Atenea #90.

Some committed-range `gentle_review assess` calls can still lose/fail to project schema-valid assessment data / timing.

Therefore:

```text
ASSESS succeeds
→ follow native review_due / continuation

ASSESS fails / schema incompatible
→ STOP
→ do NOT synthesize START
→ do NOT rebuild review timing in Atenea
```

The old assess compatibility patch remains temporary evidence/debt until upstream resolves this seam. The isolated `gentle-native` productive path should otherwise remain glue-free.

## 12. Verification

Before considering a work unit complete:

- run the repository's relevant deterministic tests;
- use native Gentle verification when required;
- validate changed artifact types, not just product tests;
- examples:
  - workflow YAML → YAML/action validator;
  - schema → schema validator;
  - TypeScript → typecheck/build as applicable;
  - runtime-sensitive change → declared CI runtime when material;
- treat tests/review as evidence, not merge authority.

## 13. Publication boundary

Default for project Coras:

```text
local implementation / tests / review = allowed when task is authorized
push / PR / issue mutation / merge = NOT assumed
force-push / destructive history = never automatic
merge = human boundary
```

If the human explicitly authorizes publication, follow the target repository's real policy.

## 14. PROMueve immediate operating rule

PROMueve is qualified to use `gentle-native` now.

When continuing PROMueve:

1. resolve the actual live product branch / accepted checkpoint;
2. create a fresh worktree for the selected real work unit;
3. read current product/debt authority;
4. preserve clinical/safety/no-inference rules from PROMueve `AGENTS.md`;
5. ignore its historical Atenea/Herdr execution topology;
6. do not re-run greenfield shaping for existing accepted work;
7. execute through `gentle-native`;
8. let native Gentle own ODD/workers/verify/RDD;
9. STOP on committed-range ASSESS defect rather than inventing a review transition;
10. do not publish without explicit human publication authority.

## 15. Symphonia / Laboratorio immediate operating rule

The old Pi sessions were intentionally stopped.

Do not resume them.

For each project:

```text
re-read remote Git/GitHub authority
→ identify last accepted/published checkpoint
→ inspect any open local-only candidate evidence
→ decide explicitly what work still exists
→ start fresh worktree/session from correct base
→ execute via gentle-native
```

If an old branch contains legitimate unpublished product work, preserve it as Git evidence and reconcile it deliberately; do not copy hidden Pi/session state forward.

## 16. What NOT to do

Do not:

- use ordinary historical production Pi as though it were clean;
- activate `atenea-one-touch` because an old repo pin asks for it;
- start the old Atenea RDD relay;
- depend on the enabled legacy Herdr RDD-consent plugin;
- launch pi-intercom for review consent;
- rebuild custom reviewer continuation;
- replay Matt/OpenSpec shaping on already-executable tickets by ritual;
- treat Engram as product authority;
- use an old conversation/session as the only source of task truth;
- push/merge just because native RDD approved a candidate.

## 17. Short decision rule

When a project Cora is unsure who owns something:

```text
WHAT / WHY / ACCEPTANCE / DOMAIN RULES
→ durable project authority + human

ENGINEERING QUALITY DELTA
→ CODING_STANDARDS / stable AGENTS policy

HOW TO DECOMPOSE / DELEGATE / VERIFY / REVIEW
→ native Gentle

DETERMINISTIC FACT
→ tests / validator / oracle / CI

PUBLISH / MERGE
→ target repo policy + human authority
```

That is the current vNext operating model.
