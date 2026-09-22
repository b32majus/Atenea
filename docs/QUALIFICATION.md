# Atenea Qualification

Status: **CURRENT vNext QUALIFICATION**

Date: 2026-09-23

## Current qualified architecture

```text
Atenea policy / desired state / deterministic evidence
                    ↓
Pi 0.87.0
→ gentle-pi / Gentle Shell 3.5.1
→ Gentle AI 3.6.0
→ NaN
→ native ODD / workers / verify / RDD
```

Atenea-owned runtime controllers: **0**.

Atenea-owned review controllers: **0**.

Atenea-owned worker supervisors: **0**.

Atenea-owned routing engines: **0**.

## Qualification phases

- **P0 — PASS:** native Gentle path qualified without historical Atenea runtime glue.
- **P1 — PASS:** capability reconciliation separated durable Atenea value from duplicated upstream lifecycle.
- **P2 — PASS:** Minimal Core defined.
- **P3 — PASS:** shaping decision closed; minimal semantic execution contract → native Gentle is the default execution-ready seam.
- **P4 — PASS:** positive rebuild; stable policy, secret-free profile desired state and deterministic oracles survived against Golden Control.
- **P5 — PASS:** superseded runtime machinery archived from active path; native smoke/oracles remained green.
- **P6 — PASS:** clean VPS cutover + exact install recipe + secret-free provider desired state + independent fresh-clone reproduction.
- **P7 — PASS:** vNext is promoted as current repository authority; historical runtime/qualification surfaces are explicitly non-operative, and the final fresh clone passed both conformance oracles, doctor/auth checks and `P7_FINAL_CLONE_OK`.

## Post-P7 stable runtime maintenance — PASS

On 2026-09-23 the supported stable runtime was advanced using official owner update surfaces:

```text
Gentle Shell 3.3.0 → 3.5.1
Gentle AI    3.4.0 → 3.6.0
Engram       2.0.0 → 2.0.0 (already current)
GGA          2.10.1 → 2.10.1 (already current)
```

Post-update evidence:

- `gentle-ai update`: all managed tools current;
- `gentle-ai doctor`: 8/8 healthy;
- active profile: `native-nan`;
- review mode: on;
- NaN credential resolves from Pi's supported credential store;
- `PI_PURE_OK`;
- `PI_GENTLE_OK`;
- `ENGRAM_MEMORY_OK`;
- both Atenea conformance oracles PASS.

Evidence: `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923.md`.

## Final native lifecycle evidence

The final native canary proved:

```text
primary work
→ native delegation boundary
→ worker
→ deterministic tests
→ independent verify
→ native review consent
→ review-reliability
→ APPROVED
→ acknowledge-approved
→ status=closed
→ authority=burned
```

No Atenea relay/controller was required.

## Current deterministic qualification

Run:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
gentle-ai doctor
gentle-ai update
# NaN: verify credential resolution without printing it, then run the real bounded smokes.
```

Qualified expected results:

```text
ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
ATENEA_VNEXT_AUTHORITY_CHECK=PASS
doctor: 8 passed / 0 failed / 0 warnings
gentle-ai update: all managed tools current
NaN credential: resolves from Pi credential store
Pi pure smoke: PASS
Pi + Gentle smoke: PASS
Engram memory smoke: PASS
```

## Historical P6 reproduction evidence

The 2026-09-22 P6 fresh clone independently passed on the then-qualified 3.3.0/3.4.0 runtime:

- repo-local `.atl/` hygiene;
- both Atenea conformance oracles;
- Pi 0.87.0;
- Gentle AI 3.4.0;
- doctor 8/8;
- NaN auth;
- real Pi + Gentle + NaN smoke: `P6_FRESH_CLONE_OK`;
- clean Git status.

Canonical install/rebuild/update recipe:

`docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`

Latest stable-runtime maintenance evidence:

`docs/vnext/STABLE_RUNTIME_UPGRADE_20260923.md`

## Current compatibility debt

See:

`docs/vnext/CURRENT_COMPATIBILITY.md`

The remaining seams are fail-safe compatibility notes, not missing Atenea runtime features.

## Historical qualification

Pre-vNext qualification detail is preserved at:

`historical/qualification/QUALIFICATION_PRE_VNEXT.md`

and in other explicitly historical field-evidence documents.

Historical qualification does not define the current execution path.
