# Atenea vNext — Shaping Experiment Protocol

Status: **P3 EXPERIMENT DESIGN**

Date: 2026-09-21

## 1. Question

Does Atenea still need a substantial pre-Gentle shaping layer, or can native Gentle ODD / Gentle-native SDD achieve equal or better engineering outcomes from a smaller semantic contract?

This phase evaluates **shaping contribution**, not model/provider quality.

## 2. Current upstream baseline

Current Gentle Shell 3.3 behavior relevant to the experiment:

- ODD is the mandatory default protocol;
- ODD owns authorization, exploration, uncertainty resolution, classification, tracking-before-write, task-by-task implementation and close;
- SDD/OpenSpec remains available only when explicitly selected;
- TDD mode is resolved from configuration or explicit user choice rather than inferred from the existence of tests.

Current OpenSpec default `spec-driven` flow:

```text
proposal
→ specs + design
→ tasks
→ apply
```

Its specs are behavior contracts; implementation details belong in design/tasks.

## 3. Experiment arms

Only the **input shaping method** changes.

### A — Native ODD

Input:

- the same original human/product brief;
- stable repository policy;
- no Matt/OpenSpec artifacts;
- no Atenea workcards.

Gentle receives the brief and owns exploration/decomposition through native ODD.

Purpose:

> establish the true current upstream baseline.

### B — Minimal semantic execution contract

Before execution, produce only:

- outcome;
- user-visible / externally observable behavior;
- acceptance criteria;
- constraints;
- non-goals;
- important examples/scenarios;
- explicit TDD policy when relevant.

No implementation decomposition.

No worker assignment.

No file-level execution plan.

Gentle owns the how.

Purpose:

> test whether a small amount of human/product shaping captures most of the value.

### C — Current/full Matt-Atenea shaping

Use the currently adopted Matt Pocock greenfield shaping stack as it exists today.

Produce the durable artifacts/tickets that the current Atenea methodology would normally hand into execution.

Then start a **fresh native Gentle execution session** from those artifacts.

Do not reintroduce historical Atenea runtime glue.

Purpose:

> measure the actual incremental value/cost of the fuller shaping practice we designed earlier.

### D — Gentle-native SDD / OpenSpec

Explicitly select Gentle's supported SDD/OpenSpec path.

Use OpenSpec's native artifact flow rather than an Atenea translation layer.

Then execute through Gentle using those artifacts.

Purpose:

> determine whether OpenSpec remains valuable while its integration layer disappears.

## 4. Fairness controls

For every matched run:

- exact same repository base SHA;
- exact same product brief;
- exact same provider/model family unless an upstream workflow itself requires otherwise;
- exact same native Gentle version;
- exact same reviewer routing profile;
- fresh isolated worktree;
- fresh Pi session;
- no reused Engram/session memory;
- no access to outputs from another arm;
- no human rescue unless the protocol explicitly records an intervention;
- same publication boundary;
- same deterministic external evaluator.

Do not compare a warmed/familiar run against a fresh run.

## 5. Evaluation must be external to the shaping method

The evaluator must not merely check whether each arm satisfied its own generated artifacts.

Use a **frozen external acceptance contract** derived once from the common original brief.

Where possible, implement hidden deterministic tests outside the agent-visible working tree.

Score factual outcomes, not prose quality.

## 6. Workloads

Use controlled benchmark repositories rather than live production repositories for the primary comparison.

### G1 — Greenfield behavior-rich backend/CLI

Characteristics:

- several externally observable behaviors;
- persistence/state;
- error cases;
- enough code for multi-file work;
- no specialist visual judgment.

Why:

- tests product shaping;
- tests whether Matt/OpenSpec find missing behavior;
- easy hidden deterministic acceptance.

### G2 — Greenfield UI/product flow

Characteristics:

- user flow with state and edge cases;
- some visual/interaction acceptance;
- enough ambiguity for discovery to matter.

Why:

- Matt's UI/product shaping may add value not visible in a pure CLI benchmark.

Evaluation requires deterministic behavior checks plus a bounded human/visual review axis.

### B1 — Existing brownfield behavior change

Characteristics:

- established architecture;
- existing tests;
- non-obvious local convention;
- one behavior extension plus negative/error paths;
- no need for a platform rewrite.

Why:

- tests whether full shaping is redundant when strong repository authority already exists;
- tests OpenSpec delta-first value.

### Optional B2 — Complex brownfield cross-cut

Only if G1/G2/B1 fail to separate the arms.

Use a larger repository change with real architectural pressure.

Do not start with B2 merely to make the benchmark impressive.

## 7. Measurement

Capture per run:

### Outcome quality

- hidden acceptance tests passed;
- visible repository tests passed;
- regression failures;
- unresolved acceptance gaps;
- correctness of error/negative behavior;
- architecture/local-convention fit;
- security/safety boundary violations where applicable.

### Execution efficiency

- wall time;
- total model tokens;
- tokens by role where available;
- number of model calls;
- number of worker runs;
- retries;
- failed tool calls;
- review corrections;
- human interventions / clarification questions;
- reviewer/refuter/validator cost.

### Artifact burden

- number of planning artifacts created;
- planning bytes/lines;
- artifacts that became stale or duplicated upstream state;
- artifacts never consulted during execution;
- task/spec churn;
- duplicated decomposition between shaping and ODD.

### Code/change quality

- authored changed lines;
- unnecessary churn;
- unrelated edits;
- abstraction debt;
- review findings;
- deterministic oracle quality;
- ability to delete/modify the implementation cleanly.

## 8. Primary decision metric

Do not choose the arm with the most artifacts or the fewest tokens in isolation.

Primary question:

> Did the additional shaping produce materially better product/engineering decisions that native Gentle would otherwise miss?

Classify incremental shaping artifacts as:

- **decision-producing** — changed what should be built or prevented a real mistake;
- **evidence-producing** — made acceptance clearer/testable;
- **execution-duplicating** — restated decomposition Gentle performed anyway;
- **ceremonial** — consumed effort without affecting outcome.

## 9. Expected decision rules

### Retain full Matt shaping only if

It repeatedly produces material decisions/acceptance coverage that A/B miss and the improvement justifies its cost.

### Prefer Minimal Contract if

B matches C/D on correctness and architecture while reducing planning/token/artifact burden.

### Prefer Native ODD if

A matches B/C/D consistently and pre-shaping adds no material product decisions.

### Retain OpenSpec if

D materially helps brownfield delta authority, long-lived behavioral specs or human reviewability **without** requiring an Atenea translation/runtime layer.

### Split by project phase/type if

For example:

```text
greenfield product discovery → Matt
execution-ready greenfield → Minimal Contract / native ODD
small brownfield → native ODD
complex behavior-changing brownfield → OpenSpec SDD
```

A conditional result is acceptable and likely more useful than one universal methodology.

## 10. TDD interpretation

Do not equate shaping with TDD.

The experiment separately records:

- whether acceptance behavior was defined before code;
- whether a frozen independent oracle existed before writer authority;
- whether implementation used strict test-first iteration;
- whether TDD added value for the work type.

A valuable acceptance oracle may survive even if the full shaping method does not.

## 11. AGENTS.md implications

During benchmark shaping arms C/D, phase-specific shaping instructions may be active.

At execution start:

- accepted durable artifacts become authority;
- phase-specific shaping ceremony stops;
- the execution-facing AGENTS policy is stable repo/domain/quality policy + native Gentle pointer.

This intentionally tests the vNext lifecycle rule rather than carrying shaping instructions indefinitely.

## 12. Repetition

Minimum:

- at least 2 independent runs per arm/workload if cost allows;
- if outcomes are unstable, increase repetitions before architectural conclusions.

Do not interpret one lucky/unlucky stochastic run as a methodology result.

## 13. Stop conditions

Stop an arm/run if:

- it violates benchmark isolation;
- hidden evaluator leaks into the working repo;
- another arm's artifacts become visible;
- runtime/provider failure dominates the run;
- current Gentle/OpenSpec defects make the methodology itself impossible to exercise fairly.

Runtime failures are recorded separately from shaping quality.

## 14. Phase 3 deliverables

- benchmark brief(s);
- frozen external acceptance evaluator(s);
- raw run ledger;
- per-arm artifact bundle;
- quantitative comparison;
- qualitative decision log;
- final shaping policy decision;
- resulting AGENTS lifecycle rule;
- list of Matt/OpenSpec skills/config retained or removed.

## 15. No production impact

Phase 3 does not block PROMueve.

Production/project work continues through the P0-qualified `gentle-native` path.

The benchmark is isolated from live product branches and does not change the 37 Matt skills until the evidence is reviewed.
