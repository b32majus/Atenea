# Atenea — NaN Provider Capabilities v1

Status: **CURRENT OPERATIONAL PROVIDER CONTRACT**
Date: 2026-09-20

This file records NaN-specific facts that materially affect the current Atenea Pi/Gentle runtime. It is operational configuration, not Atenea architecture.

Primary upstream authority:

- `https://nan.builders/docs/pi`
- `https://nan.builders/docs/opencode`
- `https://nan.builders/docs/models`
- `https://nan.builders/docs/vscode`
- `https://nan.builders/docs/other-tools`

## 1. Current model ceilings

```text
nan/deepseek-v4-flash
  contextWindow / context = 1048575
  Pi maxTokens            = 32768
  OpenCode limit.output   = 32768

nan/glm5.3-flash
  contextWindow / context = 1048576
  Pi maxTokens            = 32768
  OpenCode limit.output   = 32768
```

NaN's Pi, VS Code and other-tools documentation publishes `32768` as the maximum/ceiling for one answer for these routes. The OpenCode page describes `limit.output` as a client-side budget and notes that a client may raise it; that does not establish a larger provider/model ceiling. Atenea therefore declares the documented `32768` ceiling rather than advertising unsupported headroom.

Do not inflate `contextWindow` / `limit.context` to solve output exhaustion. Context window and per-answer output ceiling are different controls.

## 2. Why the temporary 65536 declaration was reverted

On 2026-09-20 Atenea temporarily raised the client declaration from `32768` to `65536` while investigating real `stopReason: length` failures.

That experiment did **not** establish a larger usable NaN output ceiling:

- the official NaN Pi/VS Code/other-tools surfaces still publish `32768`;
- a real provider-materialized `review-risk` prompt reproduced the DeepSeek failure even while Pi's local model object advertised `maxTokens=65536`;
- the provider settled the completion with `stopReason=length`, only `thinking` content and zero answer text.

The machine-global Pi and OpenCode declarations are therefore reconciled back to `32768`. The mitigation for reviewer exhaustion is routing/slicing, not a fictitious local ceiling.

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
  "maxTokens": 32768,
  "compat": {
    "supportsReasoningEffort": false
  }
}
```

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
  "maxTokens": 32768,
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

The current material-review routing is evidence-driven:

```text
review-reliability  openai-codex/gpt-5.6-luna · high   # provisional; current failure is ASSESS-bypass-confounded
review-risk         nan/glm5.3-flash · high             # exact materialized-prompt mitigation
review-resilience   nan/deepseek-v4-flash · high       # no equivalent failure established yet
review-refuter      nan/deepseek-v4-flash · high       # no equivalent failure established yet
```

Luna was already acceptable in the Sep-12 reliability comparison. For risk, GLM was historically less well calibrated than DeepSeek in the Sep-12 synthetic role comparison, but the exact current provider-materialized risk prompt completes successfully on GLM while DeepSeek exhausts reasoning before answer text. The current split is therefore an operational mitigation, not a rewrite of historical quality evidence.

OpenCode Go is not an operational subscription and is not an Atenea fallback route merely because residual auth may report ready.

The independent DeepSeek in-process reviewer incident is documented in `docs/NAN_DEEPSEEK_INPROCESS_REVIEWER_INCIDENT_20260920.md`.

## 6. ODD/native assessment is a separate boundary

The Symphonia medium-candidate incident also exposed an independent orchestration defect: the parent skipped native `assess` and opened START over an accumulated candidate.

That defect is tracked separately in `docs/ODD_REVIEW_ASSESS_BYPASS_EVIDENCE_20260920.md`.

Do not use review slicing as an explanation for every DeepSeek failure: a correctly immediate `high` `review-risk` candidate reproduced the same empty-output/length signature.

## 7. Machine alignment

Machine-global configuration must keep the provider ceilings and adopted routes aligned:

```text
~/.pi/agent/models.json
~/.config/opencode/opencode.json
~/.pi/agent/subagents.json
~/.pi/gentle-ai/models.json
~/.pi/gentle-ai/profiles.json
```

Run:

```bash
node tools/check-nan-runtime-config.mjs
```

The checker is a machine preflight guard. It verifies current NaN capability declarations plus the adopted role routing/profile. It does not own credentials, review lifecycle or execution.

## 8. Failure interpretation

```text
reviewer-empty-output + stopReason=length
→ STOP; no authority progress; preserve lineage/candidate; do not retry-loop

medium candidate without prior ASSESS
→ orchestration defect; restore native assess/next-transition ownership

high candidate + repeated DeepSeek length/empty-output
→ independent reviewer/provider incident; route only by explicit evidence

context-length rejection
→ inspect real context and compaction; do not inflate context blindly
```

No silent provider/model/effort fallback is allowed.

## 9. Revalidation triggers

Re-read NaN upstream docs and re-run machine checks when any of these change:

- NaN model ids, context windows or output ceilings;
- NaN reasoning-control contract;
- Pi/OpenCode model-schema semantics;
- current role routing;
- the open DeepSeek in-process reviewer incident is closed;
- NaN publishes a larger explicit server-side output maximum.
