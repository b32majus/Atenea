# Atenea vNext — Current Compatibility Notes

Status: **CURRENT RUNTIME / PROVIDER EVIDENCE**
Date: 2026-09-28

## Current baseline

```text
Pi                 0.87.1
Herdr              0.9.1
Gentle AI          3.7.0
OpenCode transport V1 / 1.18.x line
prepared supervisor Pi + Herdr
prepared worker     one plain Pi child (`pi --no-extensions`)
default profile     production-volume → nan/deepseek-v4-flash
complex profile     complex → nan/glm5.3-flash high
current decision    C-078
```

OpenCode `1.18.32` is the exact synthetic qualification baseline. The 2026-09-28 field trains exercised the same V1 transport family; patch-level drift must be recorded in evidence, but ordinary prepared work should fail closed on actual transport incompatibility rather than re-running qualification by ritual.

Prepared tickets do not enter Gentle Shell/ODD/`gentle-orchestrator`.

## Adaptive review boundary

`review assess` derives risk from the actual Git candidate. Preserve exact base/lineage/target and follow only provider-issued transitions.

- `review_due=false` → no OpenCode collection host.
- medium review when due → one Gentle-selected focus lens.
- high → canonical 4R.
- refuter/validator are conditional.

## OpenCode configuration isolation

The global `~/.config/opencode/opencode.json` is baseline configuration, not per-train routing state. Concurrent trains use `OPENCODE_CONFIG_CONTENT` per review-host process, rendered by `tools/render-opencode-routing-overlay.mjs`.

The legacy profile-apply helper requires an explicit target file and is maintenance-only.

## `review-resilience` empty-output seam

Current default remains `nan/deepseek-v4-flash` for `review-resilience`.

Known field class: Task completes with typed `opencode_task_output_empty` / reasoning-only and no capturable text. Historical Atenea #91 proved the same role/provider class on normal-sized work and exact-prompt Luna admission. PsO C-077 reproduced it again on 2026-09-28.

Current recovery is narrow: same frozen candidate/lineage/revision/target, bound STATUS, exact same slot reoffered, then one fresh-host route override of only `review-resilience` to `openai/gpt-6-luna` high. Failure after that recovery is HUMAN STOP. Do not hammer V4, mutate global routing or build a review controller.

## Plain Pi boundary

`pi --no-extensions` disables extensions but keeps repository context and skill discovery. Plain Pi is not the Gentle-Pi host relay; never self-attest `GENTLE_PI_REVIEW_RELAY_CONTRACT` manually.

## Efficiency evidence

Token/cost telemetry is observational. Runtime-native Pi/OpenCode usage and Gentle assessment facts may be normalized with `tools/extract-execution-usage.mjs`. Missing telemetry does not invalidate otherwise valid product evidence.

## Historical evidence

Keep older OpenCode-first writer and Gentle-Pi/ODD qualification as provenance only. Current operation is C-078 + `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
