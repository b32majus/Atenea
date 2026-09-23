# Atenea vNext — Current Compatibility Notes

Status: **CURRENT TRANSITIONAL EVIDENCE**

Date: 2026-09-23

This document contains version/provider-specific exceptions that are intentionally **not** part of stable `AGENTS.md` policy.

## Current maintenance-qualified stack

```text
Pi                0.87.0
gentle-pi         3.7.0
Gentle AI         3.7.0
Engram             2.1.0
GGA                2.10.1
provider           NaN
profile            native-nan
```

Evidence:

- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.

## 1. NaN reviewer reasoning-only truncation

The original exact-prompt qualification reproduced failures at default/medium reasoning and a pass with GLM low.

Current mitigation:

```text
review-* → nan/glm5.3-flash · thinking=low
```

This is native Gentle profile configuration, not an Atenea runtime bridge. Gentle AI 3.7 adds native per-reviewer model selection, which means future reviewer diversity can remain entirely upstream. Atenea does not change the qualified all-GLM/low mapping until a representative higher-effort canary passes.

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

The defect was reproduced again on Gentle Shell 3.7.0 / Gentle AI 3.7.0: native Gentle AI returned `medium / executable_change` for a committed executable candidate, while the Pi/Gentle facade returned typed `risk=unassessable`, `schema-incompatible`, zero changed paths and `candidate=null`.

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

Engram remains auxiliary and is currently 2.1.0. The 2.1 release is core-only; Pi `gentle-engram` remains 0.1.14.

Post-maintenance evidence:

- `gentle-ai doctor`: Engram MCP reachable;
- `engram doctor`: 9/9 OK, 0 warnings after cleanup;
- `engram test --quick`: PASS, including concurrent local writes;
- real Pi `mem_search` memory canary: `ENGRAM_AFTER_CLEANUP_OK`;
- production store reduced to `hermes-agent`, `symphonia` and canonical `atenea` session history;
- no similar-name project groups remain.

Disposable projects removed from the production store: `baseline`, `atenea-assess-370-20260923`, `dist`, `gentle-final-canary-20260921` and `tmp`.

### Canary isolation

Do not let disposable canaries write to the production Engram store.

`ENGRAM_DATA_DIR` alone is **not sufficient** when a production `engram serve` already owns the default HTTP endpoint, because `gentle-engram` native `mem_*` tools use the HTTP server path.

Qualified pattern:

```text
temporary ENGRAM_DATA_DIR
→ separate engram serve on a non-production port
→ ENGRAM_URL points Pi at that temporary server
→ normal repo/project identity inside the isolated store
```

This pattern passed `ENGRAM_ISOLATION_OK`: the temporary store received its own observation/session data and the production store remained unchanged.

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
- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.
