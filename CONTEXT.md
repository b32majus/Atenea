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

C-078 preserves C-077's Pi-first implementation topology and adds:

- adaptive `0 / 1 / 4` RDD semantics explicitly in Atenea authority;
- per-process OpenCode routing overlays so concurrent trains do not mutate shared global config;
- one bounded same-lineage `review-resilience` recovery from DeepSeek V4 empty-output to Luna high;
- no repeated V4 hammering after the typed failure;
- non-blocking token/usage telemetry with no extra model calls.

Current authority: `docs/CURRENT_EXECUTION_DECISION_C078.md`.
