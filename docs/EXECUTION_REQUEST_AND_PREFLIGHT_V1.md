# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT — C-087**
Date: 2026-10-06

## Principle

Prepared work enters at implementation. Atenea establishes only facts that can change the next action; it does not repeat shaping, product-design methodology or Matt methodology by ritual.

```text
accepted bounded work
→ reconcile authority + select frontier
→ Cora pre-execution hardening (`PRE_EXECUTION_HARDENING_V1.md`)
→ prepare worktree/fixed point + hardened durable handoff
→ minimal preflight + route confirmation
→ READY_TO_LAUNCH
→ human launches visible OpenCode coordinator
→ focused implementation/TDD
→ one canonical review
→ finding-scoped correction when needed
→ integration/publication closeout at the appropriate boundary
```

## Cora preparation boundary

Before ordinary preflight, Cora applies `docs/PRE_EXECUTION_HARDENING_V1.md`. Preparation ends after delivering Silvia the exact bash/agent/prompt; Cora does not launch OpenCode unless that specific launch is explicitly delegated.

## Ordinary preflight

Confirm only:

1. correct repository, worktree and intended base; no unrelated dirty state;
2. exact local HEAD is reconciled with the intended upstream and contains the accepted handoff/ticket;
3. current accepted executable outcome and material non-goals;
4. `Open material product questions: NONE`;
5. cost policy and risk class; required project-local role bindings resolve;
6. publication boundary;
7. `Conditional safeguards: NONE` or the explicitly triggered named safeguard(s).

For `free_only` or `go`, run the profile model-presence checker from canonical Atenea when required. For the explicitly human-selected experimental `openai_experimental` route, follow `docs/ATENEA_OPENAI_EXPERIMENTAL_PROFILE_V0.md` and verify the exact project-local agent/model bindings and OAuth/NaN access at a clean boundary. A missing binding is STOP, not permission to improvise a fallback.

Do not make the coordinator repair stale launch state. Do not ask the human to repeat facts already durable in repository authority.

## READY_TO_LAUNCH operator packet

Return only what the human needs:

```text
Bash:
cd <prepared-worktree>
opencode .

Agent: <default atenea-volume | atenea-complex | atenea-free | atenea-go | experimental atenea-openai-sprint | experimental atenea-openai-frontier>

Prompt:
Read @<durable-handoff-path> and execute it under current repository/Atenea authority.
```

The human verifies the path/TUI, selects the agent when needed, pastes the prompt and presses Enter unless that specific launch was explicitly delegated.

## Cost policy and risk class

```text
cost_policy = standard | free_only | go | openai_experimental (experimental, opt-in)
risk_class  = volume | complex
```

Default is `standard + volume`. Risk class changes assurance/model binding; cost policy is human/project authority. Route selection stays fixed for the active bounded unit. No quota-driven fallback.

## Execution handoff

Precision is not verbosity. The coordinator and Matt skills can read accepted repository authority directly. A useful hardened handoff references readable durable sources, includes a small seam map/closed decisions when they remove avoidable discovery, and states only the semantic delta:

```text
Work: <ticket/work unit + intended outcome>.
Authority refs: <issue/spec/work-order/product authority actually needed>.
Cost policy: <standard|free_only|go|openai_experimental [human opt-in only]>.
Risk class: <volume|complex>.
In scope: <surface/seam this unit may change>.
Preserve: <principal invariants already accepted>.
Non-goals: <nearby work excluded>.
Conditional safeguards: <NONE | named safeguards actually triggered>.
Evidence to close writer phase: <focused tests/oracles/observable acceptance>.
Publication: <current boundary>.
Open material product questions: NONE.
```

For material human-facing work, `Authority refs` may point to the accepted interaction/product authority. Do not paste the human-product method into the execution handoff.

The implementer owns ordinary local mechanics inside the envelope. If execution discovers a material decision or affected surface outside it, STOP and report the concrete issue; do not broaden the unit.

### Delegation to implementation worker

The coordinator should not rewrite the handoff into another long prompt. If the durable handoff is repo-local and readable by the child, the dispatch can remain pointer-first. If required authority is external or inaccessible, use the compact capsule in `docs/CHILD_AUTHORITY_CAPSULE_V1.md`. The child must never depend on `/outbox`, `/tmp`, another worktree or another denied external path. A normal repo-local implementation dispatch is:

```text
You own implementation/TDD for <work>.
Worktree/fixed point: <exact local identity>.
Read @<durable-handoff>.
Implement exactly that bounded unit under current repository/Atenea authority.
Do not review or publish.
Return candidate SHA + the evidence required by the handoff.
```

A small task-specific delta is allowed when needed. Duplicating policy prose is not. If required authority is unavailable, the child returns `INCOMPLETE_AUTHORITY` instead of guessing.

## Evidence layering

- **Writer:** focused TDD + smallest relevant deterministic checks.
- **Integration:** merge-sensitive/cross-slice checks when justified.
- **Review:** use the candidate and existing evidence; raise a concrete finding when additional proof is necessary.
- **Corrector:** finding-scoped mutation + focused regression evidence.
- **Publication:** artifact-specific/composed final closeout; broad/full suites here when justified.

A broad/full repository suite is not a default writer requirement merely because the ticket is material or `complex`. Run it earlier only when repository/ticket authority genuinely needs that suite to establish the writer candidate.

### Finding-scoped corrections

```text
Finding: <specific defect>.
Required correction: <observable target state>.
Allowed surface: <bounded files/components/seams when useful>.
Do not change: <nearby behavior to preserve>.
Conditional safeguard/evidence: <only if the finding explicitly requires it>.
Evidence to close: <focused deterministic proof>.
Stop: <condition requiring HUMAN STOP>.
```

Never send “fix the PR”, “improve everything” or “clean up what you see”. Correctors do not search for sibling defects by default. A reviewer/Cora finding may explicitly open a new bounded unit if a sibling problem is material.

## STOP conditions

STOP for unresolved/contradictory product authority, new material scope, acceptance changes, destructive action outside authority, missing required secret handling, publication beyond authority, unavailable required route/model, a newly discovered material affected surface outside the envelope, a new material issue during correction, or a blocker that remains after correction attempt #2.
