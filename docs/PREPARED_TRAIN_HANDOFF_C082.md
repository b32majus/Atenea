# Prepared train handoff — C-082

Status: **CURRENT**
Decision: `docs/CURRENT_EXECUTION_DECISION_C082.md`

Use only for already-shaped, executable work. Supervisor = control plane; workers = engineering/data plane; evidence crosses the handoff, engineering work does not.

```text
accepted prepared ticket/work unit
→ ONE minimal preflight
→ select prepared implementation profile
→ ONE plain Pi implementation worker
→ worker implements + verifies + commits + reports evidence
→ supervisor mechanical handoff only
→ Gentle ASSESS (NO new preflight)
→ exact C-081 review lifecycle when due (NO new preflight)
→ provider-issued correction worker when required (NO new preflight)
→ mechanical handoff → Gentle continuation
→ checkpoint / next authorized ticket / STOP
```

Supervisor route remains clean `pi --no-extensions --model nan/deepseek-v4-flash` + Herdr. Supervisor owns frontier, routing, launch, mechanical handoff, exact Gentle/C-081 procedural transport and checkpoint. It does not inspect implementation semantics, rerun worker checks, add independent challenge/QA, broaden verification, or edit code.

Worker FINAL must report at minimum: `base_sha`, `candidate_sha`, required check command(s) + result, and worktree status. The supervisor may establish only candidate existence/identity, expected base relationship, acceptable worktree state, presence of required evidence and absence of a new human-owned boundary.

Preflight count is **one per authorized ticket/work-unit boundary**. Worker launch, ASSESS, reviewer collection, reviewer return and provider-issued correction are phases of the same boundary, not reasons to preflight again.

A new preflight requires a genuinely new authorized work unit, a controlling worktree/base change that invalidates prior authority, or new human authority after HUMAN STOP.

Implementation/reviewer routing and C-081 direct-subtask review transport are otherwise unchanged.
