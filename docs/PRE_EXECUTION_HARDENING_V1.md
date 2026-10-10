# Atenea — Pre-execution hardening v1

Status: **CURRENT CORA PREPARATION CONTRACT — C-087**
Date: 2026-10-06

## Purpose

This is a **Cora-side preparation contract**, not an OpenCode coordinator/worker instruction and not an `AGENTS.md` runtime rule.

Cora does the expensive thinking before launch so the selected execution model can work from a precise, already-decided envelope. Hardening removes avoidable discovery and ambiguity; it does **not** prescribe implementation mechanics that are still properly owned by the engineer/model.

## Cora launch sequence

For ordinary prepared work:

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

**Proportional-evidence refinement (Nexus Train 20 field learning, 2026-10-10):**

- **Reuse-first:** before commissioning new browser oracles, identify which existing harnesses/fixtures already prove the accepted behavior, and name only the remaining material gaps. Keep required acceptance oracles independent of the implementer; reuse must not become self-certification.
- **Distinct evidence by phase:** writer tests focus on the changed seam; the canonical review can expose new concrete gaps; a fresh corrector proves its findings with focused RED→GREEN evidence; justified cross-consumer and full-repository checks belong at integration/publication. Repeating a broad suite is warranted by affected behavior or a changed candidate, not as standing ceremony.
- **Rendered interaction when relevant:** if accepted work adds/changes visible controls, identify a small, real browser interaction at representative supported widths, including visibility and click reachability when responsive layout is material. Passing logic assertions does not prove that controls are usable.
- **Existing preflight:** check the repository-declared runtime/engine and the local dependencies needed for the selected proofs before launch where applicable. Report/resolve a material mismatch in the existing preflight, rather than allowing avoidable environment failures to consume a writer/corrector cycle.

These are **Cora-side planning considerations** for triggered risks, not new always-on worker duties, mandatory test counts, lifecycle gates or model/routing changes.

### STOP

State the concrete discovery that requires HUMAN STOP: missing semantics, authority conflict, new product choice, required out-of-envelope seam, destructive/publication action outside authority, or another material unresolved decision.

## Quality question

Before launch, ask:

> Is there a question the writer is likely to spend its first ~10 minutes investigating whose answer Cora already knows?

If yes, the work is not hardened yet. Add the answer or seam reference to the handoff.

## Anti-bloat rules

Hardening is **precision, not payload growth**:

- do not copy `AGENTS.md`, coding standards, Matt methodology or product history into the handoff;
- do not paste every repository seam — only those relevant to this work;
- do not decide ordinary local implementation mechanics for the writer unless already fixed by accepted authority;
- do not create a new lifecycle status between shaped and `READY_TO_LAUNCH`;
- do not keep execution-only explanation as permanent product authority unless it is itself a durable product/architecture decision.

A good hardened handoff is usually shorter than the exploratory reasoning that produced it.
