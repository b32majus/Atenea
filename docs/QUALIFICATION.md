# Atenea Qualification

Status: **CURRENT vNext QUALIFICATION**

Date: 2026-09-22

## Current qualified architecture

```text
Atenea policy / desired state / deterministic evidence
                    ↓
Pi 0.87.0
→ gentle-pi / Gentle Shell 3.3.0
→ Gentle AI 3.4.0
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
- **P7 — promotion:** current repository front door is being promoted to the qualified vNext architecture.

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
pi auth check --provider nan
```

Qualified expected results:

```text
ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
ATENEA_VNEXT_AUTHORITY_CHECK=PASS
doctor: 8 passed / 0 failed / 0 warnings
NaN auth: ready
```

## Reproduction evidence

A fresh clone of the P6 candidate independently passed:

- repo-local `.atl/` hygiene;
- both Atenea conformance oracles;
- Pi 0.87.0;
- Gentle AI 3.4.0;
- doctor 8/8;
- NaN auth;
- real Pi + Gentle + NaN smoke: `P6_FRESH_CLONE_OK`;
- clean Git status.

Canonical install/rebuild recipe:

`docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260922.md`

## Current compatibility debt

See:

`docs/vnext/CURRENT_COMPATIBILITY.md`

The remaining seams are fail-safe compatibility notes, not missing Atenea runtime features.

## Historical qualification

Pre-vNext qualification detail is preserved at:

`historical/qualification/QUALIFICATION_PRE_VNEXT.md`

and in other explicitly historical field-evidence documents.

Historical qualification does not define the current execution path.
