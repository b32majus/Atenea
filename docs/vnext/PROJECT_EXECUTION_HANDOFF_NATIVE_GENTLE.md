# Project Execution Handoff — Native Gentle vNext

Status: **CURRENT / STABLE-RUNTIME-QUALIFIED**

Date: 2026-09-24

Audience: a fresh Cora / planning assistant / operator resuming an already-shaped Atenea project such as PROMueve, Symphonia or Laboratorio de Privacidad.

This handoff exists so a project does **not** need to reconstruct the Atenea migration from conversation history.

## 1. Current execution decision

For already-shaped work, use the **ordinary clean production Pi/Gentle runtime**:

```text
pi
```

Current qualified stack:

```text
Pi 0.87.1
→ Gentle Shell / gentle-pi 3.7.0
→ Gentle AI 3.7.0
→ native ODD
→ native workers / verify
→ native RDD / reviewers
→ native acknowledge-approved / burn
```

The isolated `gentle-native` launcher was a migration/qualification tool while the historical HOME was dirty. After the 2026-09-22 cutover it is no longer the normal execution entry point.

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

Herdr may still be used as an operator/session/observability surface, including persistent sessions, but it is not execution or review authority.

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
6. Atenea vNext qualification evidence only when runtime/protocol ambiguity exists:
   - `docs/vnext/P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`
   - `docs/vnext/ATENEA_CAPABILITY_RECONCILIATION.md`
   - `docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md`
   - `docs/vnext/P7_PROMOTION_20260922.md`
   - `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`

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

P3 is closed. Matt skills remain optional discovery/shaping capability and OpenSpec remains optional native SDD; neither is a mandatory execution prelude. Do not delete historical/adopted capabilities merely because they are not on the normal execution path, but do not invoke them by ritual either.

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
9. for every substantial Work Order, composition forecast completed and delivery composition resolved under `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` before writer authority
10. .atl/ is already ignored before candidate work begins
11. no unrelated untracked runtime artifacts are mixed into the candidate
12. no push/PR/merge authority assumed
```

Execution readiness has two independent questions for substantial work:

```text
product scope accepted?
delivery composition resolved?
```

The first does not imply the second. If material over-budget risk is visible and composition is unresolved, do not launch a writer merely because the Work Order is already accepted. Resolve one bounded unit, a semantic chain or the required size exception first.

P4 qualification proved that a user-level Git exclude is **not sufficient** to prevent Gentle from creating a repository-local `.gitignore` for `.atl/`. Therefore every target repository used with Gentle should already ignore `.atl/` in its own `.gitignore` before candidate work begins. Do not let this file appear halfway through a candidate.

Then start from the target worktree with:

```bash
pi
```

Ordinary production HOME is the qualified path after the 2026-09-22 clean reinstall.

Do not resurrect historical Atenea environment variables, old profile pins or relay/plugin machinery around it.

## 6. Native profile

Current active profile:

```text
native-balanced
```

Qualified rollback profile:

```text
native-nan
```

The active routing was changed on 2026-09-24 by explicit operator choice without a pre-activation canary.

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

### Execution-readiness quality gate

The shaping method is optional; the quality of executable authority is not. Execution readiness also does not collapse product acceptance and delivery composition into one state: an accepted substantial Work Order is writer-ready only after any material composition risk has been resolved under `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`.

For material behavior, safety, privacy, state, parser, dependency or CI work, resolve the applicable items before execution:

- the invariant that must remain true;
- concrete negative/adversarial cases capable of falsifying the intended behavior;
- integration seams the work crosses and any behavior deliberately deferred to later work;
- an independent deterministic oracle when the requirement is mechanically testable;
- for a new/materially changed checker or scanner, a known-good case plus a representative planted violation it must reject.

Use only the items that genuinely apply. Do not add document ceremony to trivial work. If a material requirement cannot yet be made sufficiently testable or bounded, repair the durable task/acceptance authority with the human/planning surface rather than letting Gentle invent product semantics during execution. Matt/OpenSpec may help produce this authority, but neither is required if another process already produced an equivalent executable contract.

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

For every substantial Work Order, composition forecast is a **pre-writer readiness gate**, not a recovery step after a coarse candidate already exists. Follow `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` before the first writer edit.

```text
accepted capability-sized Work Order
→ forecast expected delivery shape
→ resolve one bounded unit / semantic chain / required size exception
→ materialize only the current authorized work unit
→ verify / commit / native review
```

The Work Order may remain capability-sized in the issue tracker. Do not split mechanically by line count, files or architectural layers, and do not separate behavior from the tests/oracle that prove it. Numerical thresholds are not copied here; `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` is their single Atenea operational authority.

A delivery work-unit boundary is **not** Gentle internal decomposition. It constrains what may materialize in the current candidate. Within that boundary, native Gentle remains free to perform ODD/exploration, internal decomposition and worker delegation, and it retains full ownership of `review_due`, reviewers and review transitions.

If one honest forecast still leaves an indivisible oversized unit under current policy, STOP before writing that unit and obtain the required size-exception/human decision. Do not wait for `review.start` or a context-budget failure to discover a composition problem that was already foreseeable.

## 10. Review lifecycle

Use the **native Gentle facade/lifecycle**.

Rules:

- do not recreate review authority in prompts;
- do not invent reviewer verdicts;
- do not bypass a native facade with custom shell glue when the facade supports the operation;
- follow provider-issued transitions exactly;
- approval is incomplete until native acknowledgement/burn succeeds;
- reviewer failure is not permission to START/retry indefinitely.

On first eligible review in a fresh Pi session/repository, the human may need to choose a native host consent option such as:

```text
Review this change
```

or, when intentionally desired:

```text
Review and allow this session
```

### Terminal burn rule

When `review.acknowledge-approved` returns terminal evidence such as:

```text
status=closed
authority=burned
burn_evidence=gentle-ai.review-acknowledged/v1
```

the review lifecycle is complete.

Do **not** call selectorless negotiated STATUS merely as a second proof that the burn occurred. Current upstream issue Gentle AI #4771 can make that post-burn STATUS fail with `unrelated target status is inconsistent` even though the burn already succeeded.

The burn response plus persisted terminal-consumption evidence is sufficient. A post-burn STATUS defect must not cause a second review of the unchanged candidate or an Atenea repair shim.

## 11. Known TEMP_COMPAT exception — committed-range ASSESS

Current canonical upstream tracker:

- Gentle AI #4791.

Historical related tracking:

- Gentle Shell #1175;
- Atenea #90.

Some committed-range `gentle_review assess` calls can return `risk: unassessable` because the current controller cannot parse or obtain the native assessment envelope.

Before ASSESS:

```text
.atl/ already ignored
→ clean worktree or deliberate candidate only
→ no unrelated untracked runtime artifacts
→ native gentle_review assess
```

Then:

```text
ASSESS succeeds with a native tier
→ follow the returned native plan / review_due semantics

ASSESS returns risk=unassessable with a typed fail-closed plan
→ follow that plan
→ perform writer self-verification when requested
→ run the independent verifier when requested
→ do not claim a lower tier

ASSESS has no typed safe continuation / ambiguous state
→ STOP
→ preserve evidence
```

Do **not** synthesize START, reconstruct review timing, or restore the historical Atenea ASSESS bridge.

The qualified ordinary Pi path remains glue-free; this compatibility seam is handled by native fail-closed behavior while upstream #4791 remains open.

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

## 14. Post-merge worktree disposal

Execution worktrees are ephemeral delivery surfaces. Do not retain them indefinitely merely because they once contained reviewed work. Git/GitHub/product authority should preserve the durable checkpoint; the VPS should retain only work surfaces that are still live.

A merge is the normal disposal trigger, but remove an execution worktree only after all of the following are true:

1. the corresponding PR/train is actually merged into the intended target branch;
2. the final published/audited candidate and required CI/security/promotion evidence are durably represented outside the worktree;
3. `git status` is clean, or every remaining uncommitted/untracked artifact has been deliberately classified and any required evidence preserved elsewhere;
4. there is no required unpushed local-only commit or other local-only authority/evidence;
5. no active Pi/Gentle/Herdr/shell process or session still depends on the directory;
6. the path is a disposable execution worktree, not the repository's canonical checkout.

When eligible:

```bash
git worktree remove <worktree-path>
git worktree prune
```

Normal cleanup must not use `git worktree remove --force`. A refusal to remove is evidence to inspect, not an inconvenience to override. Preserve required evidence first, then remove the worktree.

Worktree disposal and branch deletion are separate decisions. Removing a merged execution worktree is normal hygiene; deleting local/remote branch refs requires its own Git-safety judgment and must not discard unique history/evidence by assumption.

For a train carried by one PR, keep its worktree until that train PR is merged. If each ticket has its own PR/worktree, each worktree may become disposal-eligible after its own merge gate passes. The next work should normally start from refreshed durable authority in a fresh clean worktree rather than reusing the merged surface.

## 15. PROMueve immediate operating rule

PROMueve is qualified to use ordinary production `pi` now.

When continuing PROMueve:

1. resolve the actual live product branch / accepted checkpoint;
2. create a fresh worktree for the selected real work unit;
3. read current product/debt authority;
4. preserve clinical/safety/no-inference rules from PROMueve `AGENTS.md`;
5. ignore its historical Atenea/Herdr execution topology;
6. do not re-run greenfield shaping for existing accepted work;
7. execute through `pi`;
8. let native Gentle own ODD/workers/verify/RDD;
9. if committed-range ASSESS returns a typed `unassessable` fail-closed plan, follow its independent-verifier path rather than inventing review timing;
10. treat successful `acknowledge-approved → authority=burned` as terminal; do not demand selectorless STATUS after burn;
11. do not publish without explicit human publication authority.

## 16. Symphonia / Laboratorio immediate operating rule

The old Pi sessions were intentionally stopped.

Do not resume them.

For each project:

```text
re-read remote Git/GitHub authority
→ identify last accepted/published checkpoint
→ inspect any open local-only candidate evidence
→ decide explicitly what work still exists
→ start fresh worktree/session from correct base
→ execute via pi
```

If an old branch contains legitimate unpublished product work, preserve it as Git evidence and reconcile it deliberately; do not copy hidden Pi/session state forward.

## 17. What NOT to do

Do not:

- resurrect the historical isolated `gentle-native` launcher as the normal path;
- activate `atenea-one-touch` because an old repo pin asks for it;
- start the old Atenea RDD relay;
- attach or depend on the legacy Herdr RDD-consent plugin;
- launch pi-intercom for review consent;
- rebuild custom reviewer continuation;
- replay Matt/OpenSpec shaping on already-executable tickets by ritual;
- treat Engram as product authority;
- use an old conversation/session as the only source of task truth;
- treat selectorless post-burn STATUS as required proof of a successful burn;
- turn ASSESS unavailability into a hand-built START/review decision;
- push/merge just because native RDD approved a candidate.

## 18. Short decision rule

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
