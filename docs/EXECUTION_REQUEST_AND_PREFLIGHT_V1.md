# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT — C-084**
Date: 2026-10-03

## Principle

Prepared work enters at implementation. Atenea establishes only facts that can change the next action; it does not repeat shaping or Matt methodology by ritual.

```text
accepted bounded work
→ minimal preflight
→ select cost_policy + risk_class
→ OpenCode V2 coordinator
→ Matt /implement or /implement-spec
→ deterministic evidence + independent review
→ one bounded correction if needed
→ ticket DONE / HUMAN STOP
```

## Ordinary preflight

Confirm only:

1. correct repository, worktree and base; no unrelated dirty state;
2. refresh the relevant remote ref and verify the prepared branch/worktree is reconciled with the intended upstream/base **before OpenCode starts**; the accepted handoff/ticket must exist at the exact local HEAD that will execute;
3. current accepted ticket/work-order/spec;
4. executable outcome, acceptance and material constraints/non-goals;
5. C-084 native OpenCode V2 project config/required role agents resolve; for `free_only`, `node tools/check-free-models.mjs` passes before launch;
6. publication boundary is known.

If the prepared branch is merely behind its intended upstream and a clean fast-forward is already within the authorized preparation scope, reconcile it before launch. Divergence, unrelated dirt, unexpected commits or a missing handoff are STOP/reconcile conditions; do not let the coordinator discover and repair launch-state drift inside the train.

If durable authority already proves a fact, do not ask the human to repeat it. Reopen preflight only for a genuinely new authorized work unit, a base/worktree change that invalidates prior authority, or new human authority after HUMAN STOP.

## Cost policy and risk-class selection

Default to `cost_policy: standard` and `risk_class: volume`. Use `risk_class: complex` for the material semantic/risk triggers in `docs/ATENEA_EXECUTION_ROUTING_V0.md`.

Cost policy is independent. Explicit human/project `cost_policy: free_only` is authority even for complex work. Standard risk classes normally write with `nan/deepseek-v4-flash`; Free uses only the current bindings in `docs/ATENEA_FREE_MODEL_CATALOG_V0.md`. Selection stays fixed through the active bounded unit. No quota-driven fallback and no paid escalation from `free_only` without new human authority.

## Execution handoff

Cora shapes the execution envelope before OpenCode/Matt starts. The coordinator and Matt skills read accepted repository authority directly, so precision does **not** mean duplicating `AGENTS.md`, `CODING_STANDARDS.md`, Matt's TDD loop or code-review rubric. It means removing material interpretive freedom from the work itself.

Atenea execution roles are optimized for bounded execution, not for discovering product intent. Do not hand them an open product/architecture question and expect them to infer the intended answer. Before launch, resolve any ambiguity that could materially change product behavior, architecture, privacy/security posture, data semantics or acceptance.

A useful handoff carries the semantic delta with explicit closure:

```text
Work: <ticket/work unit and exact intended outcome>.
Authority: <issue/spec/work-order>.
Cost policy: <standard|free_only>.
Risk class: <volume|complex>.
In scope: <surfaces/seams this unit may change>.
Preserve: <principal invariants/oracles>.
Decisions already fixed: <material product/architecture choices OpenCode must not reopen>.
Non-goals: <nearby work explicitly excluded>.
Evidence to close: <tests/oracles/observable acceptance>.
Publication: <current boundary>.
```

The implementer may choose ordinary local mechanics inside that envelope. If execution discovers a material decision outside it, STOP rather than infer.

### Finding-scoped corrections

A correction request, whether produced by Matt review, deterministic closeout or Cora promotion audit, must be at least as bounded as the original handoff:

```text
Finding: <specific defect>.
Required correction: <observable target state>.
Allowed surface: <files/components/seams that may change, when useful>.
Do not change: <nearby behavior/scope to preserve>.
Evidence to close: <focused deterministic proof + affected gates>.
Stop: <condition requiring HUMAN STOP instead of broader repair>.
```

Never send “fix the PR”, “improve everything”, “clean up what you see” or equivalent open-ended correction prompts. A human-authorized continuation after HUMAN STOP is a new bounded unit and follows the same rule.

## STOP conditions

STOP for unresolved/contradictory product authority, new material scope, acceptance/oracle changes, destructive action outside authority, missing required secret handling, publication beyond authority, a required runtime/role binding that cannot be established, or a blocker/new material issue after the single correction pass.
