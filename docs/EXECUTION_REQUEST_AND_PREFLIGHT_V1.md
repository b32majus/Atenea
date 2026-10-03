# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT — C-083**
Date: 2026-10-03

## Principle

Prepared work enters at implementation. Atenea establishes only facts that can change the next action; it does not repeat shaping or Matt methodology by ritual.

```text
accepted bounded work
→ minimal preflight
→ select volume | complex
→ OpenCode V2 coordinator
→ Matt /implement or /implement-spec
→ deterministic evidence + independent review
→ one bounded correction if needed
→ ticket DONE / HUMAN STOP
```

## Ordinary preflight

Confirm only:

1. correct repository, worktree and base; no unrelated dirty state;
2. current accepted ticket/work-order/spec;
3. executable outcome, acceptance and material constraints/non-goals;
4. C-083 OpenCode project config/required role agents resolve;
5. publication boundary is known.

If durable authority already proves a fact, do not ask the human to repeat it. Reopen preflight only for a genuinely new authorized work unit, a base/worktree change that invalidates prior authority, or new human authority after HUMAN STOP.

## Profile selection

Default to `volume`. Use `complex` only for the material semantic/risk triggers in `docs/ATENEA_EXECUTION_ROUTING_V0.md`.

Both profiles normally write with `nan/deepseek-v4-flash`. `complex` strengthens independent assurance and uses GLM high for the one correction pass. Profile/model selection stays fixed through the active bounded unit; no quota-driven mid-unit fallback.

## Execution handoff

The coordinator and Matt skills read the accepted authority directly. Do not restate `AGENTS.md`, `CODING_STANDARDS.md`, Matt's TDD loop or code-review rubric inside every ticket prompt.

A useful handoff carries only the semantic delta:

```text
Work: <ticket/work unit>.
Authority: <issue/spec/work-order>.
Profile: <volume|complex>.
Preserve: <principal invariant/oracle if material>.
Constraints/non-goals: <only task-specific constraints>.
Publication: <current boundary>.
```

## STOP conditions

STOP for unresolved/contradictory product authority, new material scope, acceptance/oracle changes, destructive action outside authority, missing required secret handling, publication beyond authority, a required runtime/role binding that cannot be established, or a blocker/new material issue after the single correction pass.
