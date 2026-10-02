# Atenea Context

Status: **CURRENT DOMAIN CONTEXT**

## Purpose

Atenea makes autonomous engineering work safer, reproducible and operable without competing with Gentle's native review lifecycle.

## Current architecture

```text
prepared product authority
→ Pi supervisor + Herdr on DeepSeek V4 Flash
→ ONE plain Pi implementation worker
   - production-volume: DeepSeek V4 Flash
   - complex: GLM 5.3 Flash high
→ deterministic checks/oracles
→ candidate commit
→ Gentle ASSESS
   - review_due=false → checkpoint
   - medium review_due=true → 1 focus lens
   - high → canonical 4R
→ OpenCode V1 only as provider transport when collection is due
→ conditional refuter / correction / validator / burn
→ checkpoint / next-or-STOP
```

The supervisor owns train frontier and transport orchestration only. Its model is independent of the implementation profile: `complex` changes the implementation child, not the supervisor. Product meaning remains repository/human-owned; review state, risk and lens selection remain Gentle-owned.

## Current field hardening

C-082 is the current control-plane boundary. It preserves C-081 deterministic review dispatch and C-080's C-077 topology / durable C-078/C-079 routing lessons while removing duplicate supervisor engineering:

- DeepSeek V4 Flash is the default thin supervisor model; one ticket boundary gets one minimal preflight;
- workers own deterministic verification and candidate-bound PASS evidence crosses the mechanical handoff without supervisor reruns;
- production-volume / complex select the implementation worker only;
- ONE assurance profile for reviewer routing, independent of the implementation profile;
- DeepSeek V4 holds no reviewer role; no review role uses Luna xhigh;
- the review host never asks for `production-volume | complex`;
- a completed required reviewer slot with zero capturable output is one typed technical failure whose next action is always HUMAN STOP;
- no automatic recovery: no qualified routes, no permits, no bound-STATUS authorization, no attempt ledger, no alternate-model fallback;
- no automatic supervisor escalation to GLM;
- per-process OpenCode routing and zero-call telemetry preserved.

Current authority: `docs/CURRENT_EXECUTION_DECISION_C082.md`; C-081 review dispatch and C-080 assurance remain preserved bases.
