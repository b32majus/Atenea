# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT**
Date: 2026-09-27

## 1. Principle

The ordinary path must be short. Atenea validates the facts that can change the outcome; it does not repeat repository policy, Gentle's lifecycle or every possible exception in every prompt.

```text
accepted bounded work
→ minimal deterministic preflight
→ short semantic execution request
→ direct build
→ applicable deterministic checks
→ native Gentle lifecycle when due
→ checkpoint / next-or-STOP
```

Extra ceremony is conditional. Composition planning, routing experiments, Promotion Review and recovery activate only when a concrete trigger exists.

## 2. Ordinary preflight

Before the first writer turn, confirm only:

1. **Repository** — correct repo/worktree/base; no unrelated dirty state mixed into the candidate.
2. **Authority** — the accepted ticket/work order/spec is identified and current.
3. **Executable meaning** — intended outcome, acceptance and material constraints/non-goals are clear enough to implement without inventing product semantics.
4. **Runtime** — the current qualified Atenea runtime is available; do not rerun runtime qualification or model experiments for an ordinary ticket.
5. **Publication boundary** — local implementation/checks/review are authorized; push/PR/merge remain whatever the human/repository explicitly authorized.

If these five facts are already established by durable authority, do not ask the human to restate them.
## 3. Default execution request

Give the writer the semantic contract, not an orchestration manual. A normal ticket request should fit this shape:

```text
Execute <ticket/work unit> only.
Authority: <issue/spec/work-order reference>.
Outcome: <what must be true when finished>.
Acceptance: <decided acceptance criteria>.
Constraints/non-goals: <only material task-specific limits>.
Verify: run the repository's applicable deterministic checks.
Do not expand scope or publish beyond current authority; follow native Gentle lifecycle.
```

Omit lines whose content is already unambiguous from the referenced authority. Do not paste `AGENTS.md`, `CODING_STANDARDS.md`, Gentle review rules, tool ownership diagrams or historical compatibility notes into each ticket prompt.

The prompt should not prescribe workers, reviewers, internal decomposition, review ordering or transport. Those belong to the runtime unless the accepted product contract genuinely requires a specific implementation boundary.

## 4. Train-level facts are stated once

For an authorized train, resolve once at launch:

- repository/base and ordered authorized frontier;
- publication boundary;
- current runtime/default model route;
- whether the train authority explicitly covers relay of exact candidate-scoped Gentle consent.

At a ticket boundary, re-check only facts that can have changed: durable checkpoint/HEAD, clean candidate surface and whether the next ticket remains inside the authorized frontier. Do not replay the full preflight or global prompt for every ticket.
## 5. Conditional escalation only

Open an additional gate only when its trigger exists:

- **Composition** — the accepted work clearly contains multiple independently useful delivery units, an existing forecast materially exceeds the native/default review budget, or prior evidence shows the candidate is too coarse to review reliably. Then use `WORK_UNIT_COMPOSITION_POLICY_V1.md`.
- **Routing/model override** — the user explicitly selects another route, the current route has a concrete failure, or the run is a declared routing experiment. Ordinary tickets use the current runtime default without a selection ceremony.
- **Promotion Review** — the human/planning surface identifies material promotion risk. It is never an automatic post-ticket ritual.
- **Recovery** — only after a typed runtime/provider failure, stale lineage, coarse unpublished history or another concrete recovery condition.
- **Shaping** — only when product meaning/acceptance is genuinely unresolved.

A gate that cannot change the next action should not run.

## 6. STOP conditions

STOP for unresolved product/domain authority, contradictory current authority, destructive/irreversible action outside authorization, missing required credentials/secrets handling, scope expansion, or a typed provider/runtime refusal that has no safe authorized continuation.

Do not STOP merely because a ticket boundary occurred, the context is fresh, a known deterministic check can run, or an exact already-authorized provider transition needs transport.

## 7. Anti-ceremony rules

- Do not ask for profile/model selection on every ticket.
- Do not require authored-line estimates for every substantial task.
- Do not make the human re-approve facts already durable in the ticket/train authority.
- Do not duplicate Gentle ODD/RDD instructions in the execution prompt.
- Do not run Promotion Review, broad archaeology, external research or independent challenge by default.
- Do not generate task/spec artifacts solely to satisfy a process shape when executable authority already exists.
- Prefer one decisive check over several checks that prove the same fact.

The target is not minimum process at any cost. It is the **minimum process that preserves scope, correctness, native review authority and publication safety**.