# Atenea vNext — Pi 0.87.1 Maintenance Qualification

Status: **CURRENT MAINTENANCE QUALIFICATION / PASS**

Date: 2026-09-23

Scope: qualify the user-applied Pi patch update without changing the already-qualified Gentle 3.7 / Engram 2.1 architecture.

## Resulting baseline

```text
Pi                0.87.1
Gentle Shell      3.7.0
Gentle AI         3.7.0
Engram             2.1.0
GGA                2.10.1
provider           NaN
profile            native-nan
review mode        on
```

Atenea-owned runtime/review/routing controllers remain **0**.
## Upstream delta relevant to Atenea

Pi 0.87.1 is a patch release over 0.87.0. Its release includes model/provider catalogue updates and several correctness fixes, including non-zero failure for invalid `--mode` values and preservation of model-definition ordering.

No release item claims a fix for reasoning-only output exhaustion / empty `--print` output. Upstream Pi #9718 remains open, so the current reviewer `thinking=low` mitigation is not retired.

## Runtime qualification

Post-update checks on the productive VPS:

```text
gentle-ai doctor       → 8 passed / 0 failed / 0 warnings
gentle-ai update       → all managed tools current
PI_0871_PURE_OK
PI_0871_GENTLE_OK
PI_0871_ENGRAM_OK
```

The Engram smoke used an isolated temporary HTTP server and store; production memory was not used as canary storage.
## ASSESS compatibility recheck

The existing committed candidate used for the Gentle 3.7 qualification was re-run through Pi 0.87.1.

Observed facade result remained:

```text
risk         = unassessable
reason       = schema-incompatible
changedPaths = 0
changedLines = 0
candidate    = null
plan         = writer verification + independent verifier
```

Therefore Gentle AI #4791 remains an active compatibility seam on this baseline. The typed fail-closed plan remains current.
## pi-web-access observation

`pi-web-access` 0.31.0 emits a misleading warning on globally installed Pi:

```text
Dynamic tool activation requires Pi 0.86.1 or newer; web tools remain eagerly available.
```

Upstream issue nicobailon/pi-web-access#428 identifies this as a false negative in package resolution. PR #429 contains the upstream fix and was still open during qualification. The issue is also reproduced on Pi 0.87.0, so it is not a Pi 0.87.1 regression.

Operational impact is bounded: web tools remain eagerly available instead of using the new lazy `web_enable` activation. Atenea does not patch or symlink around this upstream issue.

## Decision

Pi 0.87.1 is accepted as the current productive Pi baseline. Existing reviewer/ASSESS compatibility policies remain unchanged.