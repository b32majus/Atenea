# Atenea — Decision Log

This file records architectural decisions that should survive individual chat or agent sessions.

## D-001 — Atenea is independent from KairOS

**Status:** Accepted

Atenea is a separate laboratory at `/srv/kairos-lab/Atenea` with its own GitHub repository. No KairOS harness code is modified during qualification.

**Why:** We need to distinguish upstream-tool behavior from KairOS-specific behavior and avoid another redesign while testing a new execution model.

---

## D-002 — Preserve complete upstream ecosystems

**Status:** Accepted

Install and evaluate the complete Matt Pocock skills ecosystem and the complete Gentle AI ecosystem. Do not extract only the attractive pieces and recreate their surrounding lifecycle ourselves.

**Why:** Both projects contain internal contracts between skills, project context, routing, verification and lifecycle state. Previous cherry-picking risks recreating missing seams manually.

---

## D-003 — OpenCode is the first runtime

**Status:** Accepted

Qualify Matt + Gentle first on OpenCode. Pi is a second-stage runtime only if the OpenCode path works.

**Why:** OpenCode gives us a simpler first test surface and Gentle has first-class OpenCode integration and skill-registry support.

---

## D-004 — Matt owns interactive greenfield authoring

**Status:** Accepted for first qualification

Target upstream flow:

`grill-with-docs → to-spec → to-tickets → triage → Agent Brief → ready-for-agent`

Matt remains fully installed, including `implement`, `tdd` and `code-review`.

**Why:** The ecosystem's discovery/interview style, domain modeling and ticket preparation are strong and already fit the intended interactive workflow.

---

## D-005 — Gentle owns unattended execution after readiness

**Status:** Hypothesis to qualify

For unattended work, Gentle should consume an already-authoritative `ready-for-agent` work unit and use its native direct/delegated implementation, verification and optional RDD lifecycle.

Gentle should not recreate the upstream Matt planning/specification through SDD unless the existing contract proves insufficient; in that case the safe result should be escalation rather than silent redesign.

---

## D-006 — No duplicated review workflow on unattended path

**Status:** Accepted for first qualification

Matt `code-review` stays installed but is not deliberately invoked by Atenea after Gentle owns an unattended candidate. Gentle's native verification/RDD owns that route's post-candidate review lifecycle.

**Why:** Two complete review systems in series would duplicate cost, potentially conflict on authority and make failures harder to interpret.

---

## D-007 — Fresh-session handoff is a requirement

**Status:** Accepted

The unattended executor must be able to start in a fresh session from durable artifacts: repository conventions, domain docs, ADRs, issue/spec references and Agent Brief.

**Why:** If execution only succeeds while the original design conversation remains in context, the work unit is not truly ready for autonomous dispatch.

---

## D-008 — Brownfield/OpenSpec is deferred, not rejected

**Status:** Deferred

OpenSpec is a strong candidate for brownfield/evolutionary authoring, especially once an application is already deployed and accumulating incremental changes. It is intentionally excluded from the first Matt + Gentle qualification so the baseline remains interpretable.

---

## D-009 — KairOS future role, if qualification succeeds

**Status:** Hypothesis

KairOS should become a thin scheduler/supervisor: discover ready work, respect dependency/blocker state, start execution, observe supported lifecycle state, apply deterministic repository delivery gates and move to the next work unit.

It should not own planning, implementation reasoning, reviewer internals or repair algorithms that upstream ecosystems already own.
