# Atenea Context

Status: **CURRENT DOMAIN CONTEXT**

## Purpose

Atenea makes autonomous engineering work safer, reproducible and operable without competing with Gentle's native review lifecycle.

## Current architecture

```text
prepared product authority
→ Pi supervisor + Herdr
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

The supervisor owns train frontier and transport orchestration only. Product meaning remains repository/human-owned; review state, risk and lens selection remain Gentle-owned.

## Current field hardening

C-079 preserves C-078/C-077 and adds:

- one durable deterministic failure class for a completed required reviewer slot with zero capturable output;
- immediate stop of useless same-route parent narration/retry after that terminal observation;
- an independent bound-STATUS identity/slot check before any recovery permit exists;
- exactly one fresh-host recovery attempt only for qualified lens/model pairs;
- current qualified pairs: V4 `review-resilience` and V4 `review-reliability`, both recovering to Luna high;
- no global model-default change and no generic fallback carousel;
- per-process OpenCode routing and zero-call telemetry preserved from C-078.

Current authority: `docs/CURRENT_EXECUTION_DECISION_C079.md`.
