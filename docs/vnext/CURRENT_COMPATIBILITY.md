# Atenea vNext — Current Compatibility Notes

Status: **CURRENT RUNTIME / PROVIDER EVIDENCE**
Date: 2026-09-30

## Current baseline

```text
Pi                 0.87.1
Herdr              0.9.1
Gentle AI          3.7.0
OpenCode transport V1 / 1.18.x line
prepared supervisor Pi + Herdr → nan/deepseek-v4-flash
prepared worker     one plain Pi child (`pi --no-extensions`)
default profile     production-volume → nan/deepseek-v4-flash
complex profile     complex → nan/glm5.3-flash high
current decision    C-080 (including 2026-09-30 supervisor-routing addendum)
```

OpenCode `1.18.32` is the exact synthetic qualification baseline. The 2026-09-28+ field trains exercised the same V1 transport family; patch-level drift must be recorded in evidence, but ordinary prepared work should fail closed on actual transport incompatibility rather than re-running qualification by ritual.

Prepared tickets do not enter Gentle Shell/ODD/`gentle-orchestrator`.

## Supervisor routing boundary

The prepared supervisor is a thin procedural Pi + Herdr role and defaults to `nan/deepseek-v4-flash`. Its model is independent of the implementation profile: a `complex` child still runs GLM 5.3 Flash high while the supervisor remains V4 Flash.

There is no automatic supervisor escalation/fallback to GLM. A concrete supervisor/runtime refusal or material procedural error preserves the durable checkpoint and becomes HUMAN STOP for explicit adjudication.

## Adaptive review boundary

`review assess` derives risk from the actual Git candidate. Preserve exact base/lineage/target and follow only provider-issued transitions.

- `review_due=false` → no OpenCode collection host.
- medium review when due → one Gentle-selected focus lens.
- high → canonical 4R.
- refuter/validator are conditional.

## OpenCode configuration isolation

The global `~/.config/opencode/opencode.json` is baseline configuration, not per-train routing state. Concurrent trains use `OPENCODE_CONFIG_CONTENT` per review-host process, rendered by `tools/render-opencode-routing-overlay.mjs`.

The legacy profile-apply helper requires an explicit target file and is maintenance-only.

## Reviewer routing and technical failure seam

ONE assurance profile (`config/native-gentle/opencode-assurance.profile.json`) routes every reviewer role, independent of the prepared implementation profile: readability/reliability/resilience/validator → GPT-6 Luna high, risk → GLM 5.3 Flash high, refuter → conditional provider-issued MiMo. DeepSeek V4 holds no reviewer role and no review role uses Luna xhigh. The review host never selects `production-volume | complex`.

Known field class: a required reviewer Task may terminate reasoning-only with typed `opencode_task_output_empty` / no capturable text. Current handling is fail-closed: stop the host, normalize with `tools/classify-required-lens-zero-output.mjs` into `atenea.review-zero-output/v1`, and HUMAN STOP. There is no recovery route, no permit and no alternate-model fallback; candidate/lineage/revision/target stay preserved. Do not hammer the route, mutate global routing or build a review controller.

## Plain Pi boundary

`pi --no-extensions` disables extensions but keeps repository context and skill discovery. Plain Pi is not the Gentle-Pi host relay; never self-attest `GENTLE_PI_REVIEW_RELAY_CONTRACT` manually.

## Efficiency evidence

Token/cost telemetry is observational. Runtime-native supervisor Pi, implementation Pi/OpenCode usage and Gentle assessment facts may be normalized with `tools/extract-execution-usage.mjs`. Missing telemetry does not invalidate otherwise valid product evidence.

## Historical evidence

Keep older OpenCode-first writer and Gentle-Pi/ODD qualification as provenance only. Current operation is C-080 + `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
