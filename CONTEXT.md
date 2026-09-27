# Atenea Context

Status: **CURRENT DOMAIN CONTEXT**

## Purpose

Atenea makes autonomous engineering work safer, reproducible and operable without competing with Gentle's implementation/review lifecycle.

## Current architecture

Atenea is a thin policy/config/conformance layer **plus one thin deterministic train supervisor**. The supervisor owns only already-authorized frontier, fresh OpenCode process launch, exact bounded consent transport, durable checkpoint reconciliation and next-or-STOP.

Inside one bounded ticket, fresh OpenCode + Gentle own execution-facing lifecycle. Atenea does not own reviewer verdicts, correction semantics or burn state.

## Current qualified runtime

Clean runtime qualified 2026-09-27:

```text
OpenCode 1.18.32 (latest stable candidate observed 2026-09-27)
Gentle AI 3.7.0
NaN baseline
Gentle-managed OpenCode skills under the runtime-owned root
Context7 / Engram installed but OFF by default
Pi / Gentle Pi retained as rollback/provenance only
```

The historical OpenCode `1.18.10` two-ticket zero-touch qualification remains evidence for the lifecycle topology, not authority to reinstall that version. Clean `1.18.32` reproduces an intermittent one-shot `opencode run` hang at `init` before session creation, so unattended one-shot use remains blocked. Fresh `opencode serve` hosts for bounded writer/review roles passed the full two-ticket Gentle lifecycle with terminal burn and Git checkpoint continuity.

## Current design principle

Use the cheapest reliable owner for each fact:

- product meaning → human/repository authority;
- cross-ticket frontier/process/checkpoint → thin deterministic supervisor;
- candidate review/correction/burn → Gentle;
- machine-decidable facts → deterministic tooling;
- publication → human/target repo policy.

## Current transition state

C-072 supersedes the C-070 exact-version pin; C-073 supersedes Pi-era universal pre-writer ceremony; C-074 qualifies role-specific lean OpenCode tool surfaces for train execution. The clean rebuild removed split OpenCode installations and historical runtime state instead of migrating them. Stable policy remains version-neutral; compatibility owns exact runtime seams. Ordinary tickets use minimal preflight, `atenea-writer` and the runtime default route; heavier composition/routing/promotion gates activate only on concrete triggers.

Current evidence: `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md`. Current execution entry: `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`. Historical V1 lifecycle evidence: `docs/OPENCODE_V1_ZERO_TOUCH_RECOVERY_EVIDENCE_20260927.md`. Runtime/provider compatibility debt: `docs/vnext/CURRENT_COMPATIBILITY.md`.
