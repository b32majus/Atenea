# Atenea — Rejected / Deferred Approaches

This is not a graveyard of ideas. It records alternatives deliberately excluded so future agents do not rediscover and reintroduce them without understanding why.

## R-001 — Rebuild RDD inside KairOS

**Decision:** Rejected.

Gentle RDD is a complex lifecycle subsystem with deterministic/native machinery. Extracting the attractive review pieces while recreating identity, recovery, receipts, repair and lifecycle semantics ourselves defeats the purpose of adopting the upstream ecosystem.

**Additional evidence, 2026-08-29:** Alan described RDD publicly as difficult to implement because each supported agent requires its own adapter around deterministic machinery. This strengthens the rejection: Atenea should use the complete upstream implementation or not use RDD at all.

## R-002 — Install only selected Matt skills

**Decision:** Rejected for qualification.

A partial Matt installation makes workflow boundaries harder to understand and encourages accidental reimplementation of missing seams. Atenea qualifies the complete upstream ecosystem first, including triage, implement, TDD and code-review, then assigns ownership by workflow rather than by deleting skills.

## R-003 — Remove overlapping Matt skills

**Decision:** Rejected.

`implement`, `tdd`, `code-review` and other Matt skills remain installed. We avoid duplicate execution by assigning workflow ownership, not by mutilating the upstream package.

Stage 5 additionally showed that Gentle's registry may resolve Matt `implement`; this is an integration behavior to understand, not a reason to fork or filter Matt.

## R-004 — Custom Matt-to-Gentle work-unit schema

**Decision:** Rejected for the qualified greenfield path.

The qualified handoff is the existing `ready-for-agent` GitHub ticket plus durable repository authority, dependency state and a fresh Gentle session. No `kairos-work-unit.json`, Agent Brief translation or equivalent conversion layer is required.

## R-005 — Recreate Matt planning through Gentle SDD on unattended handoff

**Decision:** Rejected for an already-ready Matt ticket.

If Matt has produced a sufficiently specified `ready-for-agent` contract, Gentle should implement from it through direct/delegated routing. If the contract is insufficient, the desired failure mode is escalation or pre-dispatch contract repair, not silent re-planning.

## R-006 — Add OpenSpec immediately

**Decision:** Deferred.

OpenSpec remains attractive for brownfield/evolutionary work, but adding it to the first experiment would introduce another source of truth before Matt + Gentle compatibility is understood.

## R-007 — Add Convoy immediately

**Decision:** Deferred.

Convoy remains an alternative execution-kernel candidate if Gentle later fails a required property. It is excluded from the baseline to keep attribution clean.

## R-008 — Start on Pi

**Decision:** Deferred.

Pi may be qualified later. OpenCode is the first runtime because it gives a simpler first surface for Gentle + external skill discovery.

## R-009 — Create a separate Linux user / elaborate clean-room infrastructure

**Decision:** Rejected for this experiment.

Atenea intentionally prioritizes a simple, realistic setup inside the existing VPS environment. Inventory global influence first, clean only conflicting/partial installations where necessary, and document what remains.

## R-010 — Use floating Gentle `main` as the primary qualification target

**Decision:** Rejected.

A moving branch makes failures, performance and lifecycle behavior hard to reproduce. Qualification uses explicit version epochs. Stage 5 is pinned to `v2.5.0-rc.1`; Stage 6 deliberately moves to `v2.5.0-rc.2`.

## R-011 — Add CodeGraph before vanilla baseline

**Decision:** Deferred.

Current maintainers report that CodeGraph can materially reduce search and verification cost. That may be valuable later, but it must not obscure the vanilla Matt + Gentle interoperability baseline.

## R-012 — Assume passing tests are sufficient evidence

**Decision:** Rejected.

A passing test can be tautological or self-fulfilling. Atenea explicitly checks whether a project-level anti-tautology rule established on the Matt side remains effective during Gentle execution without being copied into the prompt.

## R-013 — Keep one long session from design through unattended execution

**Decision:** Rejected for qualification and target handoff.

A fresh execution session verifies that the `ready-for-agent` ticket and repository authority are durable and limits cross-feature/context-compaction contamination.

## R-014 — Work around Gentle OpenCode workspace issue #3128

**Decision:** Rejected for baseline qualification.

Do not manually move Gentle assets, add wrappers or `OPENCODE_CONFIG` overrides, or create custom adapter glue to work around #3128. Use the supported global OpenCode installation while the workspace-scope defect remains open.

## R-015 — Require Agent Brief translation for Matt-generated tickets

**Decision:** Rejected.

Matt `to-tickets` output already belongs to the authored greenfield path and reaches `ready-for-agent`. Triage/Agent Brief remains relevant to raw incoming issues Matt did not author, not as a mandatory translation layer between Matt and Gentle.

## R-016 — Put the future handoff dispatcher in `.agents/skills`

**Decision:** Rejected.

Gentle's registry can discover and inject project-local skills. Making the Matt→Gentle dispatcher another project skill risks turning the boundary mechanism into an implementation skill selected by the executor itself.

Prefer a command/dispatcher outside the skill registry, ultimately a thin KairOS supervisor.

## R-017 — Permanent Codex/external LLM reviewer after every Gentle work unit

**Decision:** Rejected as target runtime architecture.

External audits were useful qualification scaffolding in T1/T2 and exact-SHA audits remained useful laboratory observation in T3/T4. They should not become a second permanent reviewer/repair harness around Gentle.

For the target system, use deterministic verification/closure around the executor and qualify Gentle-native RDD for review/repair in Stage 6. External review may remain signal-driven, sampled or diagnostic, not mandatory by ritual.

## R-018 — Rebase/merge every ticket onto current `main` before issue closure

**Decision:** Rejected.

Ticket acceptance and train integration are different gates. A ticket may close at an accepted exact remote checkpoint even if `origin/main` advanced. Reconciliation with current `main` belongs to the final train integration/delivery gate.

## R-019 — Force-push through unexpected same-branch drift

**Decision:** Rejected.

Unexpected working-branch remote drift is a STOP/NEEDS_DECISION condition. Silent overwrite would destroy the exact candidate authority Stage 5 is designed to preserve.

## R-020 — Silent runtime upgrades during a qualification train

**Decision:** Rejected.

Gentle runtime changes use explicit qualification epochs. rc.2 and its materially different RDD lifecycle must not be mixed retroactively into the rc.1/RDD-OFF Stage 5 evidence.

## R-021 — Add a custom GitHub-auth shim because T2 saw HTTP 401

**Decision:** Rejected.

The T2 auth incident was caused by stale `GH_TOKEN` / `GITHUB_TOKEN` environment overrides inherited from Herdr/tmux, which shadowed valid official `gh` stored credentials. The correct fix is environment hygiene/preflight, not another authentication subsystem inside Atenea/KairOS.
