# Atenea — Rejected / Deferred Approaches

This is not a graveyard of ideas. It records alternatives deliberately excluded so future agents do not rediscover and reintroduce them without understanding why.

## R-001 — Rebuild RDD inside KairOS

**Decision:** Rejected.

Gentle RDD is a complex lifecycle subsystem with deterministic/native machinery. Extracting the attractive review pieces while recreating identity, recovery, receipts, repair and lifecycle semantics ourselves defeats the purpose of adopting the upstream ecosystem.

**Additional evidence, 2026-08-29:** Alan described RDD publicly as difficult to implement because each supported agent requires its own adapter around deterministic machinery. This strengthens the rejection: Atenea should use the complete upstream implementation or not use RDD at all.

## R-002 — Install only selected Matt skills

**Decision:** Rejected for qualification.

A partial Matt installation previously encouraged us to miss connected workflow pieces such as triage and Agent Brief readiness. Atenea qualifies the complete upstream ecosystem first.

## R-003 — Remove overlapping Matt skills

**Decision:** Rejected.

`implement`, `tdd`, `code-review` and other Matt skills remain installed. We avoid duplicate execution by assigning workflow ownership, not by mutilating the upstream package.

## R-004 — Custom Matt-to-Gentle work-unit schema

**Decision:** Rejected unless qualification proves native handoff insufficient.

The preferred handoff is the existing tracker state plus durable repository context and the authoritative Agent Brief. No `kairos-work-unit.json` or equivalent translation layer is introduced in the baseline.

## R-005 — Recreate Matt planning through Gentle SDD on unattended handoff

**Decision:** Rejected for an already-ready Matt ticket.

If Matt has produced a sufficiently specified `ready-for-agent` contract, Gentle should implement from it through direct/delegated routing. If the contract is insufficient, the desired failure mode is escalation, not silent re-planning.

## R-006 — Add OpenSpec immediately

**Decision:** Deferred.

OpenSpec remains attractive for brownfield/evolutionary work, but adding it to the first experiment would introduce another source of truth before Matt + Gentle compatibility is understood.

## R-007 — Add Convoy immediately

**Decision:** Deferred.

Convoy remains the main alternative execution-kernel candidate if Gentle fails or proves impractically expensive. It is excluded from the baseline to keep attribution clean.

## R-008 — Start on Pi

**Decision:** Deferred.

Pi may be qualified later. OpenCode is the first runtime because it gives a simpler first surface for Gentle + external skill discovery.

## R-009 — Create a separate Linux user / elaborate clean-room infrastructure

**Decision:** Rejected for this experiment.

Atenea intentionally prioritizes a simple, realistic setup inside the existing VPS environment. We will inventory global influence first, clean only conflicting/partial installations where necessary, and document what remains.

## R-010 — Use floating Gentle `main` as the primary qualification target

**Decision:** Rejected.

A moving branch makes failures, performance and lifecycle behavior hard to reproduce. Use a pinned release/RC/commit selected for the architecture under test. `v2.5.0-rc.1` is the current intended target unless superseded by a suitable stable release before Stage 2.

## R-011 — Add CodeGraph before vanilla baseline

**Decision:** Deferred.

Current maintainers report that CodeGraph can materially reduce search and verification cost. That may be valuable later, but it must not obscure the initial measurement of vanilla Matt + Gentle interoperability.

## R-012 — Assume passing tests are sufficient evidence

**Decision:** Rejected.

A passing test can be tautological or self-fulfilling. Atenea will explicitly test whether a project-level anti-tautology rule established in the Matt side remains effective during Gentle unattended execution/review without being copied into the prompt.

## R-013 — Keep one long session from design through unattended execution

**Decision:** Rejected for qualification.

A fresh execution session is intentional: it verifies that the Agent Brief/project context is durable and limits cross-feature/context-compaction contamination.
