# Atenea vNext — Current Compatibility Notes

Status: **CURRENT TRANSITIONAL EVIDENCE**

Date: 2026-09-23

This document contains version/provider-specific exceptions that are intentionally **not** part of stable `AGENTS.md` policy.

## Current maintenance-qualified stack

```text
Pi                0.87.0
gentle-pi         3.5.1
Gentle AI         3.6.0
Engram             2.0.0
GGA                2.10.1
provider           NaN
profile            native-nan
```

Evidence:

- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923.md`.

## 1. NaN reviewer reasoning-only truncation

The original exact-prompt qualification reproduced failures at default/medium reasoning and a pass with GLM low.

Current mitigation:

```text
review-* → nan/glm5.3-flash · thinking=low
```

This is native Gentle profile configuration, not an Atenea runtime bridge.

Upstream trackers rechecked 2026-09-23 and still open:

- Gentle Shell #1259;
- Gentle Shell #1167;
- Pi #9718.

Retirement condition:

- upstream/provider behavior is fixed;
- a representative reviewer canary passes at the intended higher effort;
- reviewer routing is requalified rather than assuming low forever.

## 2. Committed-range ASSESS

Tracker:

- Gentle AI #4791 — still open on 2026-09-23.

Pre-ASSESS hygiene:

```text
repo-local .atl/ ignore already present
→ intentional candidate only
→ no unrelated runtime artifacts
→ native gentle_review assess
```

Production rule:

```text
ASSESS returns native risk tier
→ follow native plan

ASSESS returns risk=unassessable + typed fail-closed plan
→ follow that plan
→ writer verification when requested
→ independent verifier when requested
→ never claim a lower tier

no typed safe continuation / ambiguous state
→ STOP
```

Never synthesize START or restore the historical Atenea ASSESS bridge.

## 3. Post-burn selectorless STATUS

Tracker:

- Gentle AI #4771 — still open on 2026-09-23.

Terminal rule:

```text
review.acknowledge-approved
→ status=closed
→ authority=burned
→ burn_evidence
```

That response is terminal evidence. Do not call selectorless STATUS merely to re-prove burn, and do not repeat review on the unchanged candidate because that redundant STATUS fails.

## 4. Custom NaN auth-check observation

After the 2026-09-23 stable update, NaN credentials were moved from the provider registry to Pi's supported local credential store.

Current:

```bash
pi auth check --provider nan --json
```

returns `invalid_state` for this custom provider even though:

- `pi auth print-api-key --provider nan` resolves the stored credential;
- Pi without extensions completes a real NaN model call;
- Pi with normal Gentle extensions completes a real NaN model call.

No matching upstream Pi issue was found during this pass.

Operational rule:

> Do not use `pi auth check` alone as the NaN health gate.

Use non-printing credential resolution plus the real bounded model smokes in `NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`.

## 5. Engram

Engram remains auxiliary and is currently 2.0.0.

After maintenance:

- Gentle doctor reaches Engram MCP successfully;
- a real Pi `mem_search` returned `ENGRAM_MEMORY_OK`;
- `engram doctor` reports one warning for multiple still-active P4 disposable-canary sessions under `/var/tmp/atenea-p4-20260922/*`;
- integrity/identity/SQLite/sync checks are otherwise healthy.

Do not delete historical/test sessions merely to make doctor cosmetically green.

Never treat Engram as product/spec/review authority.

## 6. Stable-update discipline

The 2026-09-23 maintenance pass established the current rule:

```text
official owner updater
→ sync/reconcile managed assets
→ doctor
→ deterministic conformance
→ real bounded smokes
→ update Atenea desired-state/evidence
```

Do not update a managed component by manually overwriting its binary/package when its owner exposes a supported updater.

## 7. Historical qualification evidence

P0–P7 documents that mention Gentle Shell 3.3.0 / Gentle AI 3.4.0 remain correct historical evidence for the versions actually tested then.

Do not rewrite them to newer versions.

The current baseline is defined by:

- `README.md`;
- `docs/START_HERE.md`;
- `docs/QUALIFICATION.md`;
- this document;
- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923.md`.
