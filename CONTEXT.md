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
→ Gentle native review through qualified OpenCode V1 transport
→ reviewer lenses / conditional refuter / correction / validator / burn
→ checkpoint / next-or-STOP
```

The supervisor owns train frontier and transport orchestration only. Product meaning remains repository/human-owned; review state remains Gentle-owned.

## Current runtime baseline

- Pi 0.87.1;
- Herdr 0.9.1;
- Gentle AI 3.7.0;
- OpenCode 1.18.32 as the qualified V1 review/fallback runtime;
- NaN + OpenAI model routes as documented in the current profiles.

Historical OpenCode-first writer and Gentle-Pi/ODD epochs remain provenance only. Current decision: `docs/CURRENT_EXECUTION_DECISION_C077.md`.
