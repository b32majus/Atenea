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

---

## D-010 — RDD remains a Gentle-owned subsystem

**Status:** Accepted

Do not extract or recreate RDD internals in Atenea/KairOS.

**Evidence added 2026-08-29:** in the Gentleman Programming live stream, Alan described RDD as a difficult deterministic subsystem with runtime-specific adapters for Pi, Codex, Claude and OpenCode, and explained the maintenance burden created by architectural changes across those adapters.

**Why:** This directly reinforces D-002. Atenea should qualify the supported upstream adapter, not rebuild the deterministic machinery around review, candidate identity, receipts, recovery or lifecycle.

---

## D-011 — Qualify a pinned Gentle build, not floating `main`

**Status:** Accepted for first qualification

Current target candidate: **Gentle AI `v2.5.0-rc.1`**, subject to checking at Stage 2 whether a newer stable release supersedes the reason for selecting it.

**Why:** The 2026-08-29 live stream describes a substantial RDD architectural simplification and an analogous SDD simplification in the 2.5 line. A pinned RC gives us the relevant current architecture without letting `main` move underneath the experiment.

Record the exact version/commit actually used.

---

## D-012 — Matt project knowledge must survive the handoff to Gentle

**Status:** Qualification requirement

Compatibility is not proven merely because Gentle's registry can see Matt skill names.

At least one durable project rule used by Matt must influence Gentle unattended execution/review without being repeated in the execution prompt.

Initial canary:

`Tautological tests considered harmful.`

Prefer the normal Matt/project surface such as `CODING_STANDARDS.md` if that is what the upstream workflow uses.

**Why:** This tests semantic continuity between the ecosystems, not just file discovery.

---

## D-013 — Baseline before adding CodeGraph or other optimizations

**Status:** Accepted

The first compatibility run remains vanilla Matt + Gentle + OpenCode. Do not add CodeGraph merely to improve search/reviewer speed before the baseline exists.

**Why:** Gentleman maintainers currently report meaningful token/time savings from CodeGraph, but introducing it immediately would confound functional compatibility with performance optimization. Measure first; optimize second.

---

## D-014 — Treat session isolation as part of qualification

**Status:** Accepted

Authoring and unattended implementation should use separate sessions where practical.

**Why:** Besides proving durable handoff, this matches current Gentleman guidance to isolate unrelated features in separate sessions to reduce context contamination and compaction drift.
