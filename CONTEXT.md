# Atenea Context

Status: **CURRENT DOMAIN CONTEXT**

## Purpose

Atenea makes autonomous engineering work safer, reproducible and operable without competing with Gentle's implementation/review lifecycle.

## Current architecture

Atenea is a thin policy/config/conformance layer **plus one thin deterministic train supervisor**. The supervisor owns only already-authorized frontier, fresh OpenCode process launch, exact bounded consent transport, durable checkpoint reconciliation and next-or-STOP.

Inside one bounded ticket, fresh OpenCode + Gentle own execution-facing lifecycle. Atenea does not own reviewer verdicts, correction semantics or burn state.

## Current productive stack

Qualified 2026-09-27:

```text
OpenCode 1.18.10 (V1 pinned)
Gentle AI 3.7.0
NaN baseline
20 Gentle-managed OpenCode skills
Context7 / Engram installed but OFF by default
Pi / Gentle Pi retained as rollback/alternate
```

OpenCode V2 2.0.18 is not productive until Gentle immutable-review transport parity passes.

## Current design principle

Use the cheapest reliable owner for each fact:

- product meaning → human/repository authority;
- cross-ticket frontier/process/checkpoint → thin deterministic supervisor;
- candidate review/correction/burn → Gentle;
- machine-decidable facts → deterministic tooling;
- publication → human/target repo policy.

## Current transition state

C-069–C-071 supersede the zero-controller Pi topology where they conflict. Two independent two-ticket OpenCode/Gentle trains proved zero human touches after launch. The global OpenCode runtime was rebuilt from fresh state and smoke-qualified. Nontrivial writer-model routing remains under focused field qualification after the T8 replay exposed nested-orchestrator and GLM-rumination anti-patterns.

Evidence: `docs/OPENCODE_V1_ZERO_TOUCH_RECOVERY_EVIDENCE_20260927.md`. Runtime/provider compatibility debt: `docs/vnext/CURRENT_COMPATIBILITY.md`.
