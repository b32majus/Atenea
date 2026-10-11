# Atenea — Pre-execution hardening v1

Status: **CURRENT CORA PREPARATION CONTRACT — C-087**
Date: 2026-10-06

## Purpose

This is a **Cora-side preparation contract**, not an OpenCode coordinator/worker instruction and not an `AGENTS.md` runtime rule.

Cora resolves **only material launch blockers and already-known decisions** before launch. Hardening is a compact handoff, **not advance implementation, test repair, or a repository-wide audit**. Ordinary local discovery and mechanics remain with the implementer.

## Cora launch sequence

For ordinary prepared work:

When the human already selects an accepted bounded task, **do not repeat frontier selection, backlog archaeology or a global product audit**; reconcile only changes that could invalidate that task's authority/base.

1. reconcile authority;
2. select frontier;
3. harden the selected work unit;
4. prepare worktree / fixed point;
5. produce the hardened durable handoff;
6. verify preflight;
7. deliver Silvia the exact bash + visible agent + prompt;
8. **STOP**.

Default execution owner is the human operator. Cora prepares; Silvia launches. Cora does not start OpenCode, press Enter, publish or merge merely because preparation is complete. A specific launch/action may be delegated explicitly by the human; absence of that delegation means STOP at step 8.

## Hardening test

Before `READY_TO_LAUNCH`, make the execution envelope explicit enough that a literal, lower-cost/Flash writer does not need to rediscover decisions Cora already knows.

### WHAT

State the observable result that must exist when the work is complete. Acceptance should be concrete enough to falsify.

### WHERE

Name the known relevant seams/authorities and, when useful, likely routes/files. This is a **seam map**, not an implementation script. Do not make the writer rediscover repository topology already known from shaping/audit.

### REUSE

Name accepted functions/models/state authorities/oracles that should be reused rather than re-created.

### CLOSED DECISIONS

State material product/architecture/data/interaction decisions already closed. Mark them as **do not rediscover**.

### DO NOT TOUCH / OUT OF SCOPE

Name protected boundaries and neighboring tickets/features that this work must not absorb.

### PROOF

State the smallest evidence that proves the writer phase is complete: focused tests, negative witnesses, browser journey, typecheck/lint or other relevant deterministic evidence. Do not request broad/full suites by ritual.

**Proportional evidence, conditional and reuse-first (C-087 field learning):**

- **Do not solve the ticket in preflight.** Identify existing focused **independent** acceptance witnesses and any material missing proof; check only required runtime/engine/dependencies; writer tests the changed seam, review challenges concrete gaps, correctors address supplied findings, integration/publication owns justified broader suites. Do not investigate or repair unrelated failing tests before launch; record known baseline limitations, and STOP only if they materially block this unit's valid proof.
- For material visible UI changes, name a real browser interaction; for a material UI/UX redesign, reference the approved whole-screen task/composition and the first representative populated rendering (see `PRODUCT_FIDELITY_GATES_V1.md`). No routine snapshots or viewport matrix.
- Only when the accepted change triggers them: identify **known** async ordering hazards (late results vs newer intent) or **known material** shared-semantic consumers; state the concrete preserved/changed boundary. Do not run hypothetical interleaving matrices or repository-wide consumer searches. Resolve a material acceptance/DO NOT TOUCH contradiction with the human.

These are Cora-side decisions, **not new writer/reviewer gates**. Stop preparing once the handoff is sufficient for a bounded, safe implementation; further investigation belongs to execution or a separately authorized recovery.

### STOP

State the concrete discovery that requires HUMAN STOP: missing semantics, authority conflict, new product choice, required out-of-envelope seam, destructive/publication action outside authority, or another material unresolved decision.

## Quality question

Before launch, ask:

> Is a **known, material decision or blocker** still missing that would cause the writer to guess, violate authority or repeat avoidable discovery?

If yes, add the **existing answer or reference**, not a new investigation. If no, STOP; do not pre-execute tests or hunt potential failures for speculative savings.

## Anti-bloat rules

Hardening is **precision, not payload growth**:

- do not copy `AGENTS.md`, coding standards, Matt methodology or product history into the handoff;
- do not paste every repository seam — only those relevant to this work;
- do not decide ordinary local implementation mechanics for the writer unless already fixed by accepted authority;
- do not create a new lifecycle status between shaped and `READY_TO_LAUNCH`;
- do not keep execution-only explanation as permanent product authority unless it is itself a durable product/architecture decision.

A good hardened handoff is usually shorter than the exploratory reasoning that produced it.
