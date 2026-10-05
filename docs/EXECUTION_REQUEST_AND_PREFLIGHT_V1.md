# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT — C-085**
Date: 2026-10-03

## Principle

Prepared work enters at implementation. **Material product shaping is an attended Cora + human phase, never an unattended OpenCode phase.** Atenea establishes only facts that can change the next action; it does not repeat shaping or Matt methodology by ritual.

```text
attended Cora + human product shaping complete
→ accepted bounded work with no open material product questions
→ prepare/reconcile repo + worktree + durable handoff
→ minimal preflight
→ select cost_policy + risk_class
→ READY_TO_LAUNCH packet to human
→ human opens visible OpenCode V2 coordinator + submits exact prompt
→ Matt /implement or /implement-spec
→ deterministic evidence + independent review
→ up to two fresh finding-scoped corrections if needed
→ ticket DONE / HUMAN STOP
```

## Ordinary preflight

Confirm only:

1. correct repository, worktree and base; no unrelated dirty state;
2. refresh the relevant remote ref and verify the prepared branch/worktree is reconciled with the intended upstream/base **before OpenCode starts**; the accepted handoff/ticket must exist at the exact local HEAD that will execute;
3. current accepted ticket/work-order/spec;
4. executable outcome, acceptance and material constraints/non-goals;
5. C-085 native OpenCode V2 project config/required role agents resolve; for `free_only`, `node tools/check-free-models.mjs` passes before launch;
6. publication boundary is known;
7. **open material product questions = NONE**. Any unresolved choice about product behavior, scope, architecture, privacy/security posture, data semantics or acceptance stays in attended shaping and blocks `READY_TO_LAUNCH`;
8. for material UI/product trains, ticket decomposition has passed `PRODUCT_FIDELITY_GATES_V1.md`: internal aggregate/module boundaries are not being treated as user-facing surfaces by default, and the composed ticket set still describes the intended product.

If the prepared branch is merely behind its intended upstream and a clean fast-forward is already within the authorized preparation scope, reconcile it before launch. Divergence, unrelated dirt, unexpected commits or a missing handoff are STOP/reconcile conditions; do not let the coordinator discover and repair launch-state drift inside the train.

If durable authority already proves a fact, do not ask the human to repeat it. Reopen preflight only for a genuinely new authorized work unit, a base/worktree change that invalidates prior authority, or new human authority after HUMAN STOP.

## READY_TO_LAUNCH operator packet

Cora may prepare the repository/worktree, reconcile remote/base state, write or update the durable execution handoff and run deterministic preflight. For real work, preparation stops at `READY_TO_LAUNCH`. The human operator owns the final visible launch.

Return exactly what the human needs:

```text
Bash:
cd <prepared-worktree>
opencode .

Agent: <atenea-volume default | select atenea-complex | select atenea-free>

Prompt:
Read @<durable-handoff-path> and execute it under current repository/Atenea authority.
```

The human verifies the path and visible TUI, performs any required agent selection, pastes the prompt and presses Enter. Do not independently launch the real OpenCode session or submit the execution prompt unless the human explicitly authorizes automated launch for that specific bounded unit.

## Cost policy and risk-class selection

Default to `cost_policy: standard` and `risk_class: volume`. Use `risk_class: complex` for the material semantic/risk triggers in `docs/ATENEA_EXECUTION_ROUTING_V0.md`.

Cost policy is independent. Explicit human/project `cost_policy: free_only` is authority even for complex work. Standard risk classes normally write with `nan/deepseek-v4-flash`; Free uses only the current bindings in `docs/ATENEA_FREE_MODEL_CATALOG_V0.md`. Selection stays fixed through the active bounded unit. No quota-driven fallback and no paid escalation from `free_only` without new human authority.

## Execution handoff

Cora shapes the execution envelope before OpenCode/Matt starts. The coordinator and Matt skills read accepted repository authority directly, so precision does **not** mean duplicating `AGENTS.md`, `CODING_STANDARDS.md`, Matt's TDD loop or code-review rubric. It means removing material interpretive freedom from the work itself.

Atenea execution roles are optimized for bounded execution, not for discovering product intent. Do not hand them an open product/architecture question and expect them to infer the intended answer. Material shaping questions are handled interactively by Cora + human: Cora may present alternatives/recommendations and the human remains present to answer or confirm choices. An agent may research evidence for that conversation, but it must not become the decision-maker by asking and answering its own product questions. For material human-facing work, `HUMAN_PRODUCT_DESIGN_AUTHORITY_V1.md` requires the human task and interaction hypothesis to be shaped before technical/spec grilling and rechecked after synthesis; the handoff points to that accepted interaction authority rather than asking execution agents to invent it. When the shaping method is materially expansive, use `ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md`: freeze non-negotiable product boundaries before the exploration, then reconcile grill → spec → ticket composition so answering a possible question does not silently create product scope. For material UI/product work, `PRODUCT_FIDELITY_GATES_V1.md` carries those constraints through decomposition and composition: internal model completeness is not UI authority, technical hardening does not validate an over-complex surface, and representation translation must not silently narrow accepted semantics. Before launch, resolve any ambiguity that could materially change product behavior, scope, architecture, privacy/security posture, data semantics or acceptance, including any proposed loss of precision, cardinality, range, states or other representable distinctions. When the unit changes a shared authority/seam, identify the material supported consumers/journeys known at shaping time; discovery of another materially affected supported path during execution is not silently out-of-scope merely because its file is unchanged.

A useful handoff carries the semantic delta with explicit closure:

```text
Work: <ticket/work unit and exact intended outcome>.
Authority: <issue/spec/work-order>.
Cost policy: <standard|free_only|go>.
Risk class: <volume|complex>.
In scope: <surfaces/seams this unit may change>.
Preserve: <principal invariants/oracles>.
Representation narrowing: <NONE | explicitly authorized narrowing + authority ref, when this work translates accepted semantics>.
Affected supported surfaces: <NONE | material consumers/journeys of changed shared seams + required evidence; `NO TOCA` is behavioral>.
Human interaction authority: <N/A | durable ref to accepted interaction hypothesis + completed human-product recheck, for material human-facing work>.
Decisions already fixed: <material product/architecture choices OpenCode must not reopen>.
Open material product questions: NONE.
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

Never send “fix the PR”, “improve everything”, “clean up what you see” or equivalent open-ended correction prompts. Starting review closes the originating implementer's write phase. Review findings must be delegated to a fresh bound corrector. If focused evidence after correction #1 shows the same authorized finding(s) remain, one second fresh corrector attempt is allowed against the same bounded envelope. A human-authorized continuation after HUMAN STOP is a new bounded unit and follows the same rule.

## STOP conditions

STOP for any material product/shaping question discovered during execution, unresolved/contradictory product authority, new material scope, acceptance/oracle changes, destructive action outside authority, missing required secret handling, publication beyond authority, a required runtime/role binding that cannot be established, a new material issue during correction, or a blocker that remains after the second fresh correction attempt. A STOP caused by product shaping returns to the attended Cora + human loop; OpenCode does not self-answer it.
