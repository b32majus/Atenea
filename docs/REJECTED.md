# Atenea — Rejected / Deferred Approaches

This file prevents future agents from rediscovering rejected architecture without the evidence that led to rejection.

## Current supersession index — 2026-08-30

Several entries below originated before Stage 7/8 and are preserved as historical decisions. Current interpretation:

- OpenSpec is **no longer merely deferred in principle**: it is the intended brownfield/evolutionary authoring entry path, still awaiting a bounded real-project qualification.
- Pi is **qualified as Atenea's thin supervisor** through Stage 7/8.
- Herdr is the **process/session substrate**, not a policy/gating controller.
- OpenCode + Gentle remains the accepted implementation worker.
- Gentle Pi `2.2.0` is **not qualified** and remains uninstalled.
- no custom execute-Issue launcher/controller is to be rebuilt from KairOS #271.

Historical entries remain useful because they explain why the architecture converged.

## R-001 — Rebuild RDD inside Atenea/KairOS

**Decision:** Rejected.

Gentle owns deterministic/native RDD machinery: exact candidate identity, reviewer lineage, receipts, mutation invalidation, bounded repair and lifecycle semantics. Atenea must consume the supported upstream implementation, not reconstruct it.

## R-002 — Install only selected Matt skills

**Decision:** Rejected.

A partial Matt installation encourages accidental reimplementation of missing seams. Atenea keeps the complete upstream ecosystem and assigns ownership by workflow.

## R-003 — Remove overlapping Matt skills

**Decision:** Rejected.

`implement`, `tdd`, `code-review` and other Matt skills remain available. Avoid duplicate execution through ownership policy, not by mutilating the upstream package.

## R-004 — Custom Matt→Gentle work-unit schema / Agent Brief translation

**Decision:** Rejected for the qualified path.

A ready GitHub issue plus durable repository authority, dependency state and fresh execution context is sufficient. No Atenea-specific work-unit schema is required.

## R-005 — Recreate Matt planning through Gentle on an already-ready ticket

**Decision:** Rejected.

If shaping has produced an executable contract, execution should implement it. If authority is materially insufficient, fail closed rather than silently redesign the product.

## R-006 — Add OpenSpec to the original baseline qualification

**Historical decision:** Deferred during the original Matt + Gentle baseline.

**Current status:** Superseded.

OpenSpec is now the intended Atenea entry path for brownfield/evolutionary authoring, while Matt remains the qualified greenfield authoring path. OpenSpec itself has not yet been field-qualified end-to-end with the Stage 8 execution stack.

The first qualification should use a real brownfield code change, not Atenea's own documentation repair.

## R-007 — Add Convoy immediately

**Decision:** Deferred unless a required property fails in the accepted upstream stack.

Do not introduce another execution kernel without field evidence that OpenCode/Gentle cannot provide a required behavior.

## R-008 — Start the original baseline on Pi

**Historical decision:** Deferred during early qualification.

**Current status:** Superseded by Stage 7/8 PASS.

Pi is now the qualified thin supervisor for self-launch, autonomous frontier discovery, closure/reconciliation checks and frontier exhaustion stop.

## R-009 — Elaborate clean-room infrastructure as default

**Decision:** Rejected for the baseline.

Use the real VPS environment, inventory influencing state, fix demonstrated contamination at its root and add stronger isolation only when a concrete vertical requires it.

## R-010 — Use floating Gentle `main` for qualification

**Decision:** Rejected.

Qualification evidence belongs to explicit runtime epochs. The accepted current handoff records Gentle AI `2.5.0-rc.2`.

## R-011 — Add CodeGraph before proving functional value

**Decision:** Deferred.

Optimization should respond to measured search/cost bottlenecks, not obscure workflow correctness.

## R-012 — Treat passing tests alone as sufficient evidence

**Decision:** Rejected.

Tests can be tautological or use a self-fulfilling oracle. Durable coding standards, deterministic repository evidence and exact Gentle candidate/review authority remain relevant.

## R-013 — Depend on one long design→execution conversation

**Decision:** Rejected.

Execution must be recoverable from durable repository/tracker authority rather than hidden conversational context.

## R-014 — Build path-repair glue around Gentle/OpenCode installation defects

**Decision:** Rejected for the qualified baseline.

Use supported upstream installation surfaces and explicit runtime epochs. Diagnose upstream defects before writing Atenea adapters.

## R-015 — Require triage/Agent Brief translation for Matt-generated tickets

**Decision:** Rejected.

Matt `to-tickets` output already belongs to the authored path. Triage remains useful for raw incoming issues, not as a mandatory translation seam before Gentle.

## R-016 — Build a custom handoff dispatcher / put it in `.agents/skills`

**Historical decision:** Rejected/deferred.

**Current status:** Superseded by qualified Pi supervision.

Stage 7/8 demonstrated that Pi can supervise the Herdr → OpenCode/Gentle lifecycle and autonomously rediscover the executable frontier. Do not resurrect a separate dispatcher unless new field evidence proves a missing capability.

## R-017 — Permanent second LLM reviewer after every Gentle work unit

**Decision:** Rejected as default architecture.

Qualification audits were useful scaffolding. Gentle native RDD owns final exact-candidate review authority. Additional independent review may be risk-driven or diagnostic, not mandatory ritual.

## R-018 — Rebase/merge every ticket onto current `main` before issue closure

**Decision:** Rejected as universal policy.

Work-unit acceptance, PR publication and final integration/merge are distinct repository concerns. Use the target repository's real delivery policy.

## R-019 — Force-push through unexpected same-branch drift

**Decision:** Rejected.

Unexpected drift is a fail-closed condition. No force-push or hidden history rewrite as automatic recovery.

## R-020 — Silent runtime upgrades during qualification

**Decision:** Rejected.

Material runtime changes require explicit evidence boundaries; do not retroactively mix versions into older qualification claims.

## R-021 — Add a custom GitHub-auth shim after the 401 incident

**Decision:** Rejected; root cause resolved.

The incident was caused by stale `GH_TOKEN` / `GITHUB_TOKEN` values in tmux's global environment overriding valid `gh` credentials. The correct fix was removing the stale variables. Do not reintroduce `env -u ...` wrappers without new evidence.

## R-022 — Gentle Pi `2.2.0` as unattended Atenea worker

**Decision:** NOT QUALIFIED / rejected for current use.

Clean and isolated runs still failed the complete unattended ticket lifecycle reliably. Failure classes included child model-routing inheritance gaps, RDD integration gaps and package-private/global Gentle lifecycle incompatibilities.

Gentle Pi remains uninstalled. Do not build adapters around it. Revisit only after a materially changed upstream release.

## R-023 — Rebuild KairOS #271 custom execute-Issue seam

**Decision:** Rejected.

The custom launcher accumulated environment handling, logging, topology/authority validation, timeouts, gate handling and lifecycle responsibilities while still failing important safety properties.

Preserve useful product requirements from #271, but satisfy them through Pi/Herdr/OpenCode/Gentle/Git wherever upstream already owns them.

## R-024 — Use Herdr as Atenea's policy/gating controller

**Decision:** Rejected.

Attempts to make Herdr gates carry Atenea's supervisory policy were not the successful architecture. Stage 7/8 qualified Pi as the decision-making supervisor while Herdr remains the process/session substrate.

Do not move authority/blocker/publication reasoning back into a bespoke Herdr-gating layer.

## R-025 — Rebuild a custom Clean Code / engineering-quality lifecycle

**Decision:** Rejected.

Use concise repo-local `CODING_STANDARDS.md`, upstream Matt `tdd`, `codebase-design`, `domain-modeling`, `diagnosing-bugs`, `code-review`, plus deterministic tooling where justified.

Atenea should contain only the repo-specific quality delta not already owned upstream.

## R-026 — Build a custom Atenea UX framework

**Decision:** Rejected.

Use upstream Impeccable conditionally for material UI/UX work. `DESIGN.md` may own durable visual-system rules; `PRODUCT.md` should not become a second product truth when canonical product authority exists elsewhere.

## R-027 — Automatic merge or history-rewrite recovery

**Decision:** Rejected.

Normal non-force publication is acceptable. Automatic merge, force-push, hidden reset/rebase recovery and destructive history repair are outside the autonomous default boundary.
