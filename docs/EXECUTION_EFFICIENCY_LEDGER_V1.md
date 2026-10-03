# Atenea — Execution Efficiency Ledger v1

Status: **CURRENT OBSERVATIONAL EVIDENCE CONTRACT — C-083**
Date: 2026-10-03

## Purpose

Measure whether the C-083 model split gives enough quality while letting DeepSeek V4 absorb most writing volume. Collection must add **zero LLM calls** and must never become a pre-writer gate.

Telemetry is observational, not product/review/publication authority. Missing telemetry does not invalidate otherwise valid engineering evidence.

## Per-ticket record

Capture when the runtime exposes it:

```text
ticket / base / candidate HEAD / profile = volume | complex
runtime versions

COORDINATOR
  model
  input / output / reasoning / cache / cost fields as reported
  wall time

EXPLORATION (if used)
  model / usage / wall time

IMPLEMENTATION
  model per writer
  usage / wall time

REVIEW
  Standards model + usage + findings count
  Spec model + usage + findings count

CORRECTION (only if needed)
  model / usage / findings addressed / focused-regression result

CONDITIONAL ASSURANCE
  Semgrep invoked? result
  OCR invoked? model / usage / result

TERMINAL
  done | human_stop
  Cora integrated audit invoked? result when applicable
  human touches after launch
```

Do not infer missing token/cache numbers and do not manufacture one normalized cross-provider total from accounting fields with different semantics.

## Structural checks

Treat these as routing defects, not optimization opportunities:

- coordinator authors product code instead of delegating to the bound implementer;
- normal `complex` implementation silently switches from V4 to GLM without explicit first-writer escalation;
- volume correction uses a different model from V4 without a new boundary decision;
- complex correction does not use GLM high;
- Standards/Spec review is performed by the writer instead of the independent bound reviewer;
- a second autonomous correction/review cycle starts after the bounded correction pass;
- per-ticket routing rewrites shared global OpenCode config;
- quota pressure silently changes an active unit's model route.

## Useful field metrics

After enough real tickets exist, compare by profile and work class:

```text
v4_writer_share        = V4 writer usage / all writer usage
correction_rate        = tickets needing correction / tickets completed
complex_correction_rate
findings_per_ticket by review axis
human_stop_rate
wall_time by profile
specialist_glm_share   = GLM correction + OCR usage / all model usage
```

The goal is not equal provider consumption. The goal is to avoid spending scarce specialist capacity where a cheaper writer plus independent assurance performs well.

## Extraction helper

OpenCode exports can be parsed locally when useful:

```bash
node tools/extract-execution-usage.mjs opencode <opencode-export.json>
```

Legacy Pi/Gentle parser modes in the helper are historical compatibility, not C-083 runtime requirements.
