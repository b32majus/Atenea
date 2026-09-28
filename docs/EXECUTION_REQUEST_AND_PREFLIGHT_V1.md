# Atenea — Execution request and preflight v1

Status: **CURRENT EXECUTION ENTRY CONTRACT**
Date: 2026-09-28

## 1. Principle

The ordinary prepared-ticket path must be short. Atenea validates only facts that can change the outcome; it does not repeat repository policy or Gentle's review state machine in every prompt.

```text
accepted bounded work
→ minimal deterministic preflight
→ one plain Pi ticket worker (`--no-extensions`)
→ repository authority + applicable skills
→ implementation + deterministic checks
→ local candidate commit
→ native Gentle ASSESS through Codex transport
→ exact native review lifecycle when due
→ checkpoint / next-or-STOP
```

Extra ceremony is conditional. Composition planning, Promotion Review, recovery and shaping activate only when a concrete trigger exists.

## 2. Ordinary preflight

Before the first writer turn, confirm only:

1. **Repository** — correct repo/worktree/base; no unrelated dirty state mixed into the candidate.
2. **Authority** — the accepted ticket/work order/spec is identified and current.
3. **Executable meaning** — intended outcome, acceptance and material constraints/non-goals are clear enough to implement without inventing product semantics.
4. **Runtime** — the current qualified Atenea runtime is available; do not rerun runtime qualification or model experiments for an ordinary ticket.
5. **Publication boundary** — local implementation/checks/review are authorized; push/PR/merge remain whatever the human/repository explicitly authorized.

If these facts are already established by durable authority, do not ask the human to restate them.

## 3. Default execution request

Give the ticket worker the semantic contract, not an orchestration manual. A normal request should fit this shape:

```text
Execute <ticket/work unit> only.
Authority: <issue/spec/work-order reference>.
This work is already shaped; do not reopen product meaning, run ODD or use gentle-orchestrator.
Before writing, read and obey repository AGENTS.md, CODING_STANDARDS.md when present, and applicable project skills.
Outcome/acceptance/constraints: use the accepted authority; do not weaken the principal oracle/tests.
Verify with the repository's applicable deterministic checks and create the authorized local candidate commit.
After commit, enter native Gentle review via Codex transport and follow exact provider-issued continuations when review is due.
Do not expand scope or publish beyond current authority.
```

Omit lines whose content is already unambiguous from referenced authority. Do not paste full policy files, provider schemas or historical compatibility notes into each ticket prompt.

## 4. Train-level facts are stated once

For an authorized train, resolve once at launch:

- repository/base and ordered authorized frontier;
- publication boundary;
- current worker/runtime path;
- whether train authority explicitly covers relay of standard candidate-scoped Gentle review consent.

At a ticket boundary, re-check only facts that can have changed: durable checkpoint/HEAD, clean candidate surface, blockers/dependencies and whether the next ticket remains inside the authorized frontier. Do not replay the full preflight for every ticket.

## 5. Conditional escalation only

Open an additional gate only when its trigger exists:

- **Composition** — the accepted work clearly contains multiple independently useful delivery units, an existing forecast materially exceeds the native/default review budget, or prior/current evidence shows the candidate is too coarse to review reliably. Then use `WORK_UNIT_COMPOSITION_POLICY_V1.md`.
- **Promotion Review** — the human/planning surface identifies material promotion risk. It is never an automatic post-ticket ritual.
- **Recovery** — only after a typed runtime/provider failure, stale lineage, coarse unpublished history or another concrete recovery condition.
- **Shaping** — only when product meaning/acceptance is genuinely unresolved.
- **Worker fallback** — only after a concrete plain-Pi runtime/tooling failure; preserve the checkpoint and use qualified OpenCode Build under the same prepared-ticket contract.

A gate that cannot change the next action should not run.

## 6. STOP conditions

STOP for unresolved product/domain authority, contradictory current authority, destructive/irreversible action outside authorization, missing required credentials/secrets handling, material scope expansion, weakening of a principal acceptance oracle, or a typed provider/runtime refusal with no exact safe authorized continuation.

Do not STOP merely because a ticket boundary occurred, context is fresh, a known deterministic check can run, Codex is the review transport, or an exact already-authorized provider transition needs transport.

## 7. Anti-ceremony rules

- Do not ask for model/profile selection on every ticket.
- Do not require authored-line estimates for every substantial task.
- Do not make the human re-approve facts already durable in ticket/train authority.
- Do not route prepared work through ODD/gentle-orchestrator by ritual.
- Do not run Promotion Review, broad archaeology, external research or independent challenge by default.
- Do not generate task/spec artifacts solely to satisfy a process shape when executable authority already exists.
- Prefer one decisive check over several checks that prove the same fact.
- Do not make plain Pi impersonate Gentle Shell by setting `GENTLE_PI_REVIEW_RELAY_CONTRACT` manually.

The target is not minimum process at any cost. It is the **minimum process that preserves scope, implementation quality, native review authority and publication safety**.
