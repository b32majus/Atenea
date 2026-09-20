# Atenea — NaN Provider Capabilities v1

Status: **CURRENT OPERATIONAL PROVIDER CONTRACT**
Date: 2026-09-20

This file records NaN-specific facts that materially affect the current Atenea Pi/Gentle runtime. It is operational configuration, not Atenea architecture.

Primary upstream authority:

- `https://nan.builders/docs/pi`
- `https://nan.builders/docs/opencode`
- `https://nan.builders/docs/models`
- `https://nan.builders/docs/agent-setup`

## 1. Current client budgets

```text
nan/deepseek-v4-flash
  contextWindow / context = 1048575
  Pi maxTokens            = 65536
  OpenCode limit.output   = 65536

nan/glm5.3-flash
  contextWindow / context = 1048576
  Pi maxTokens            = 65536
  OpenCode limit.output   = 65536
```

NaN currently publishes `32768` in its reference Pi/OpenCode blocks. Its OpenCode documentation describes `limit.output` as a **client-side budget rather than a server cap** and says to raise it when longer answers are required. Its Pi documentation likewise describes `maxTokens` as the per-answer budget visible to Pi and notes that reasoning and answer tokens share that budget.

Atenea therefore uses `65536` as the current client output budget for the two NaN models in active routing. This is **not** a claim that `65536` is a provider hard maximum.

Do not inflate `contextWindow` / `limit.context` to solve output exhaustion. Context window and per-answer output budget are different controls.

## 2. Why 65536 is current

On 2026-09-20 real Pi sessions produced `stopReason: length` on both `nan/deepseek-v4-flash` and `nan/glm5.3-flash` while the client declarations were still `32768`.

Pi and OpenCode machine-global configuration were reconciled to `65536` for both models. New sessions should load that budget. Existing live processes are not assumed to hot-reload it.

This budget increase is a mitigation, not proof that every `length` failure is solved. A later `review-reliability` capture on DeepSeek still exhausted the response budget before emitting review text; that field evidence is recorded in `docs/NAN_DEEPSEEK_RELIABILITY_LENGTH_EVIDENCE_20260920.md`.

## 3. DeepSeek V4 Flash reasoning semantics

NaN documents `reasoning_effort` for `deepseek-v4-flash` as accepted but non-operative: DeepSeek decides its own reasoning depth per request.

Therefore:

```text
DeepSeek medium/high profile labels = routing metadata
DeepSeek medium/high profile labels != effective reasoning-depth control
```

Pi's NaN model declaration must make this explicit:

```json
{
  "id": "deepseek-v4-flash",
  "reasoning": true,
  "maxTokens": 65536,
  "compat": {
    "supportsReasoningEffort": false
  }
}
```

This prevents Pi from sending an OpenAI-style `reasoning_effort` value as though it were a meaningful depth control.

## 4. GLM 5.3 Flash reasoning semantics

NaN documents effective reasoning control for `glm5.3-flash`:

```text
low
medium
high
max
```

The current Pi declaration must expose that mapping explicitly:

```json
{
  "id": "glm5.3-flash",
  "reasoning": true,
  "maxTokens": 65536,
  "compat": {
    "supportsReasoningEffort": true
  },
  "thinkingLevelMap": {
    "off": null,
    "minimal": null,
    "low": "low",
    "medium": "medium",
    "high": "high",
    "xhigh": null,
    "max": "max"
  }
}
```

The persistent parent and `gentle-ai-worker` remain GLM `high`.

## 5. Current routing consequence

The NaN DeepSeek budget/effort behavior is now a routing constraint, not just model metadata.

`review-reliability` no longer uses `nan/deepseek-v4-flash`. After a real current candidate produced `reviewer-empty-output` with `stopReason: length` at the reviewer stage and no mutation, the role moved to the already-qualified `openai-codex/gpt-5.6-luna` `high` route.

Current DeepSeek material-review roles retained on NaN pending contrary field evidence:

```text
review-resilience
review-risk
review-refuter
```

Do not move them pre-emptively without evidence. If the same `reviewer-empty-output` / `stopReason: length` pattern appears on one of those slots, STOP and reconcile that role rather than retry-looping.

## 6. Pi/OpenCode alignment

Machine-global configuration must keep these client budgets aligned:

```text
~/.pi/agent/models.json
~/.config/opencode/opencode.json
```

Run:

```bash
node tools/check-nan-runtime-config.mjs
```

The checker is a machine preflight guard. It verifies current NaN capability declarations plus the adopted role routing/profile. It does not own credentials, review lifecycle or execution.

## 7. Failure interpretation

```text
stopReason=length
→ inspect role + output budget; do not retry-loop

reviewer-empty-output + stopReason=length
→ STOP; no authority progress; preserve lineage/candidate and reconcile the role

401 / auth not ready
→ credential/provider readiness

402 / 429
→ quota/rate-limit/provider capacity

slow first token with auth ready
→ provider/cluster latency investigation

context-length rejection
→ inspect real context and compaction; do not inflate context blindly
```

No silent provider/model/budget fallback is allowed.

## 8. Revalidation triggers

Re-read NaN upstream docs and re-run machine checks when any of these change:

- NaN model ids, context windows or output contract;
- NaN reasoning-control contract;
- Pi/OpenCode model-schema semantics;
- current role routing;
- repeated `length` stops after the `65536` client budget;
- NaN publishes a new explicit server-side output maximum.
