# Atenea vNext — Phase 3 Shaping Decision

Status: **P3 COMPLETE — OPERATIONAL DECISION**

Date: 2026-09-21

## Decision

Default execution-ready handoff for Atenea vNext:

> **Minimal semantic execution contract → native Gentle**

The default pre-Gentle artifact should externalize only the durable product semantics that must survive the session:

- outcome;
- observable behavior;
- acceptance criteria;
- constraints;
- non-goals;
- important examples/scenarios;
- explicit testing/TDD policy when it materially matters.

It should **not** pre-decide:

- file layout;
- worker assignments;
- implementation decomposition;
- work-unit boundaries;
- review lifecycle;
- reviewer routing;
- internal Gentle tasking.

Native Gentle owns those execution mechanics.

## Why

G1 produced the following evidence.

### A — Common brief → native ODD

- hidden external evaluator: **24/24 PASS**
- own tests: 15/15
- native RDD approved/burned
- no shaping artifact beyond the original brief
- substantial ODD procedural work still occurred

Conclusion:

Native Gentle can produce a correct implementation from a sufficiently explicit brief without Matt/OpenSpec.

### B — Minimal semantic contract → native ODD

- contract: ~3 KB
- hidden external evaluator: **24/24 PASS**
- own tests: 12/12
- native RDD approved/burned
- primary session was more direct than A
- total subagent token cost was not lower in the single stochastic run

Conclusion:

Externalizing WHAT/acceptance makes the execution authority clearer without creating a second implementation plan.

This is the default vNext seam.

### C — Current Matt shaping → native Gentle

Matt shaping produced:

- spec: ~8.6 KB
- five tickets: ~7.5 KB additional
- ~16 KB durable shaping total
- 24 user stories
- two required human confirmation gates
- no product code during shaping

When those artifacts were handed to a fresh Gentle session, Gentle still created:

- its own ODD feature tracking;
- its own todo/decomposition layer;
- ticket → work-unit mapping;
- native worker lifecycle.

The first shaped ticket alone consumed ~204k worker tokens before the experiment was stopped for cost control.

Conclusion:

Current Matt shaping and current Gentle ODD materially **stack** rather than replace one another.

Matt may still be valuable for genuine product discovery, but it is too duplicative to remain the mandatory execution prelude.

### D — Current OpenSpec 1.13.1 planning only

Native OpenSpec/Pi generated and validated:

- proposal: 2,175 bytes
- behavior spec: 5,780 bytes
- design: 6,228 bytes
- tasks: 3,477 bytes
- total planning artifacts: ~17.7 KB

No implementation was run.

Current upstream OpenSpec already owns its own artifact/config/skill surfaces and does not need an Atenea AGENTS marker block.

Conclusion:

OpenSpec is a valid upstream-native SDD option when durable capability specifications, deltas/design or change history are themselves valuable.

It is not required for routine execution-ready work.

## Resulting shaping policy

### Default: Minimal Contract

Use for:

- already understood greenfield work;
- normal feature work;
- most brownfield changes with clear product authority;
- work where acceptance can be written compactly.

Flow:

```text
human/product intent
→ minimal semantic contract
→ native Gentle
→ deterministic evidence
→ native RDD
```

### Native ODD directly

Allowed when:

- the task is already unambiguous and small;
- durable product semantics already exist elsewhere;
- writing another contract would only duplicate current authority.

### Matt shaping — optional discovery tool

Retain current skills through migration, but invoke only when they materially help:

- ambiguous greenfield/product discovery;
- domain-model exploration;
- turning fuzzy intent into an accepted product contract;
- explicit human shaping sessions where externalizing the reasoning is valuable.

Once executable authority exists:

- stop Matt shaping;
- do not carry shaping ceremony into runtime;
- do not regenerate tickets by ritual.

Phase 3 evidence does **not** justify deleting all Matt skills immediately. It removes their status as mandatory execution prelude.

### OpenSpec — optional native SDD

Use when:

- capability behavior should live as long-lived specs;
- brownfield changes need explicit behavioral deltas;
- design/tasks/change archive are valuable review/audit artifacts;
- the project/team wants an SDD workflow as a product practice.

Use OpenSpec natively.

Do not build an Atenea translation/bridge layer around it.

## AGENTS consequence

Project `AGENTS.md` should not permanently contain the full shaping methodology.

It should contain:

- stable project/domain/safety/Git policy;
- phase-scoped shaping pointer if shaping is active;
- Matt's small generated metadata block only while surviving skills need it;
- no OpenSpec marker block;
- no Gentle runtime manual.

## Experiment stop rationale

Further A/B/C/D implementation repetitions were intentionally cancelled.

The architectural decision did not require a statistically precise ranking of token cost.

The evidence needed was:

1. native ODD can reach external correctness;
2. minimal semantic authority can reach the same external correctness;
3. full Matt artifacts are re-decomposed by Gentle and therefore duplicate execution planning;
4. OpenSpec similarly produces a full SDD artifact stack and should be used only when that artifact stack is itself desired.

Continuing to implement the same toy CLI would have optimized the benchmark rather than Atenea.

## Current vNext lifecycle

```text
UNSHAPED / AMBIGUOUS
→ optional Matt discovery OR native OpenSpec SDD when justified
→ accepted durable product semantics

EXECUTION_READY
→ minimal semantic contract when needed
→ native Gentle
→ deterministic verification
→ native RDD
→ human publication/merge boundary
```

This is the P3 operational decision.
