# Atenea vNext — Current Compatibility Notes

Status: **CURRENT TRANSITIONAL EVIDENCE**

Date: 2026-09-21

This document contains version/provider-specific exceptions that are intentionally **not** part of stable `AGENTS.md` policy.

## 1. NaN reviewer reasoning-only truncation

Qualified stack:

- Pi 0.86.1
- gentle-pi 3.3.0
- Gentle AI 3.4.0
- NaN OpenAI-compatible provider

Observed on a real PROMueve reviewer prompt:

- GLM default: failed
- DeepSeek default: failed
- GLM medium: failed
- GLM low: passed

Failure signature:

- provider reaches reasoning-only truncation;
- NaN emits a `nan_truncation: reasoning_only_stream` SSE frame;
- frame is serialized with single quotes rather than valid JSON;
- Pi's OpenAI-compatible stream parser fails before Gentle receives reviewer text.

Current mitigation:

```text
review-* → nan/glm5.3-flash · thinking=low
```

This lives in native Gentle profile configuration, not an Atenea runtime bridge.

Retirement condition:

- provider/Pi behavior is fixed;
- the frozen/representative reviewer canary passes at the intended higher effort;
- native profile is requalified.

Evidence:

- `docs/vnext/P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`
- Gentle Shell #1259 / #1167
- Pi #9718

## 2. Committed-range ASSESS projection/schema defect

Tracked by:

- Atenea #90
- Gentle Shell #1175

Some committed-range `gentle_review assess` paths can fail to decode/project otherwise-valid provider assessment/timing data.

Production rule:

```text
ASSESS succeeds
→ follow provider review_due / continuation

ASSESS fails / schema-incompatible / empty in this known seam
→ STOP
→ do not synthesize START
→ do not recreate review timing in Atenea
```

Historical Atenea ASSESS bridge remains **TEMP_COMPAT evidence**, not part of Minimal Core.

Retirement condition:

- stock supported Gentle handles the committed-range regression;
- bounded regression canary passes;
- patch is deleted.

## 3. VPS historical HOME state

The normal production HOME still contains historical Atenea-era state, including:

- active historical `atenea-one-touch` profile/routing;
- legacy Herdr RDD-consent plugin enabled in Herdr config;
- old global/project configuration from prior Atenea epochs.

No active relay process was observed during P1, but the state is not considered clean.

Current productive recovery/isolation path:

```text
gentle-native
```

This launcher uses the isolated qualified native HOME.

It is a migration tool, not target architecture.

Retirement condition:

- controlled Phase 6 cleanup/reinstall completes;
- ordinary HOME reproduces the qualified upstream-native stack;
- rollback evidence is preserved.

## 4. Engram

Engram is auxiliary only.

Current experiments have observed ownership/reachability failures while native ODD continued using local durable tracking.

Rule:

- never treat Engram as product/spec/review authority;
- an Engram outage must not silently destroy durable repository progress;
- product correctness must not depend on memory availability.

No Atenea Engram controller is planned.

## 5. Benchmark-only profile

P3 may use a temporary profile such as `benchmark-nan-low` to keep provider reasoning behavior constant across experiment arms.

Benchmark profiles:

- are not production defaults;
- must not silently replace `native-nan`;
- exist only to make A/B/C/D comparisons fair;
- are restored/removed after experiment completion.
