# Atenea Context

Status: **CURRENT DOMAIN CONTEXT**

## Purpose

Atenea makes autonomous engineering work safer, reproducible and operable without competing with project product authority or Gentle's native review lifecycle.

## Current architecture

For work whose product meaning and acceptance are already durable, Atenea uses one thin train supervisor and one ticket worker:

```text
Pi supervisor + Herdr
→ one plain Pi worker (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ Gentle ASSESS through Codex review transport
→ exact native review continuation when due
→ terminal / durable checkpoint
```

The supervisor owns only the already-authorized frontier, worker launch/observation, procedural relay already covered by authority, checkpoint reconciliation and next-or-STOP. It does not implement product code or invent review transitions.

OpenCode Build remains a qualified fallback implementation worker after a concrete Pi runtime/tooling failure.

## Current qualified runtime

```text
Pi        0.87.1
Herdr     0.9.1
Gentle AI 3.7.0
OpenCode  1.18.32 — fallback worker
review transport = Codex
```

Plain Pi is intentionally launched with `--no-extensions` so the prepared-ticket worker does not enter Gentle Shell/ODD. Repository context and skills remain discoverable. Plain Pi is not a Gentle Shell review relay; never self-assert `GENTLE_PI_REVIEW_RELAY_CONTRACT`.

## Current design principle

Use the cheapest reliable owner for each fact:

- product meaning → human/repository authority;
- cross-ticket frontier/checkpoint → thin Pi supervisor + Herdr;
- implementation of accepted work → one plain Pi ticket worker;
- candidate review/correction/burn → native Gentle through Codex transport;
- machine-decidable facts → deterministic tooling/oracles;
- publication → human/target repo policy.

## Current decision state

`docs/CURRENT_EXECUTION_DECISION_C077.md` is the current execution-topology authority. It supersedes C-076/C-075 for prepared-ticket entry/routing while preserving those decisions as qualification provenance. C-073 remains the lean-entry principle: heavy gates activate only on evidence that they can change the next action.

Prepared tickets do not re-enter ODD or `gentle-orchestrator`. Unresolved work is shaped before execution until durable authority is sufficient.

Current entry: `docs/START_HERE.md`.
Current runbook: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
Current runtime/provider seams: `docs/vnext/CURRENT_COMPATIBILITY.md`.
