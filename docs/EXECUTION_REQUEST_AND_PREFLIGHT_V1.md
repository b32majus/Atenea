# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT**
Date: 2026-09-28

## Principle

Prepared work enters at implementation. Atenea validates only facts that can change the next action; it does not repeat shaping or Gentle's lifecycle by ritual.

```text
accepted bounded work
→ minimal preflight
→ select production-volume|complex
→ ONE Pi implementation worker
→ deterministic checks/oracles
→ candidate commit
→ native Gentle ASSESS
→ no review host when review_due=false
→ exact provider-issued review route when due
→ checkpoint / next-or-STOP
```

## Ordinary preflight

Confirm only:

1. correct repository/worktree/base and no unrelated dirty state;
2. current accepted ticket/work-order/spec;
3. executable outcome, acceptance and material constraints/non-goals;
4. compatible Pi/Herdr/Gentle/OpenCode V1 review runtime available;
5. publication boundary known.

If durable authority already proves a fact, do not ask the human to repeat it.

**Preflight is single-entry.** Run it once when entering the authorized ticket/work unit. Do not repeat it when launching the worker, accepting the worker handoff, entering Gentle ASSESS, starting reviewer collection, returning from review, or launching a provider-issued correction. Reopen preflight only for a genuinely new authorized work unit, a controlling base/worktree change that invalidates prior authority, or new human authority after HUMAN STOP.

## Profile selection

Default to `production-volume` → Pi on `nan/deepseek-v4-flash`.

Use `complex` → Pi on `nan/glm5.3-flash` high only for material reasoning/semantic-risk triggers defined in `config/native-gentle/prepared-routing-policy.json`.

Profile selection occurs at a clean candidate/work-unit boundary and remains stable through the active lineage. The profile selects the implementation worker only; reviewer routing uses the single assurance profile and never depends on it.

## Default worker request

```text
Execute <ticket/work unit> only.
Authority: <issue/spec/work-order>.
Profile: <production-volume|complex>.
This work is already shaped; do not reopen product meaning, run ODD or use gentle-orchestrator.
Before writing, read and obey repository AGENTS.md, CODING_STANDARDS.md when present, and applicable project skills.
Preserve the principal acceptance oracle; do not weaken tests/checkers to make implementation pass.
Implement the smallest coherent authorized change, run required deterministic checks, and create the authorized local candidate commit.
Do not broaden scope or publish beyond current authority.
```

Do not teach the implementation worker reviewer ordering or transport mechanics. The worker FINAL reports `base_sha`, `candidate_sha`, required deterministic check command(s) + PASS/FAIL, and worktree status. After its candidate commit, the supervisor consumes that candidate-bound evidence and verifies only mechanical handoff facts; it does **not** inspect implementation semantics or rerun the worker's checks. Native Gentle then decides `review_due` and lens depth; OpenCode starts only for provider-issued collection with process-local routing config.

## STOP conditions

STOP for unresolved/contradictory product authority, new material scope, acceptance/oracle changes, destructive action outside authority, missing required secrets handling, publication beyond authority, a typed provider refusal with no exact safe continuation, or a typed technical reviewer failure (next_action = human_stop). A technical reviewer failure has no automatic recovery: preserve candidate/lineage/revision/target and STOP.
