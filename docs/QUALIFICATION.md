# Atenea Qualification

Status: **CURRENT vNext QUALIFICATION**

Date: 2026-09-25

## Current qualified architecture

```text
Atenea policy / desired state / deterministic evidence
                    ↓
Pi 0.87.1
→ gentle-pi / Gentle Shell 3.7.0
→ Gentle AI 3.7.0
→ Engram 2.1.0 / GGA 2.10.1
→ NaN + OpenAI Codex
→ native ODD / workers / verify / RDD
```

Atenea-owned runtime controllers: **0**.

Atenea-owned review controllers: **0**.

Atenea-owned worker supervisors: **0**.

Atenea-owned routing engines: **0**.

## Current routing override — NOT PRE-QUALIFIED

On 2026-09-24 the operator explicitly activated `native-balanced` without a pre-activation canary. Runtime versions and the vNext architecture remain qualified; this **routing change itself is not pre-qualified**.

```text
active   = native-balanced
rollback = native-nan
```

The exact baseline mapping is versioned in `config/native-gentle/native-balanced.profile.json`. On 2026-09-25 Atenea added `native-v4-heavy` and experimental `native-economy` to the selectable catalog without changing the globally active profile. PROMueve Nexus F3.2/#403 subsequently produced the first **positive field canary** for `native-v4-heavy`, advancing it to candidate status only; this is not global qualification equivalence. The additional routes remain governed by `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md`. `native-nan` remains known-good rollback only.

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

## Post-P7 Gentle 3.7 / Engram 2.1 maintenance — PASS

Later on 2026-09-23 the stable runtime advanced again through official owner update surfaces:

```text
Gentle Shell 3.5.1 → 3.7.0
Gentle AI    3.6.0 → 3.7.0
Engram       2.0.0 → 2.1.0
GGA          2.10.1 → 2.10.1
```

Qualification evidence:

- `gentle-ai update`: all managed tools current;
- `gentle-ai doctor`: 8/8 healthy;
- Engram doctor: 9/9 healthy after memory-store cleanup;
- Engram quick self-test: PASS, including concurrent writes;
- `PI_PURE_370_OK`;
- `PI_GENTLE_370_OK`;
- `ENGRAM_210_OK`;
- ASSESS #4791 reproduced on the 3.7 facade, so fail-closed compatibility remains active;
- isolated Engram canary: `ENGRAM_ISOLATION_OK`, with production memory unchanged.

Evidence: `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.

## Post-P7 Pi 0.87.1 maintenance — PASS

Pi was advanced from 0.87.0 to 0.87.1 while Gentle Shell 3.7.0, Gentle AI 3.7.0, Engram 2.1.0 and GGA 2.10.1 remained unchanged.

Qualification evidence:

- `gentle-ai doctor`: 8/8 healthy;
- `gentle-ai update`: all managed tools current;
- `PI_0871_PURE_OK`;
- `PI_0871_GENTLE_OK`;
- isolated Engram smoke: `PI_0871_ENGRAM_OK`;
- committed-range ASSESS #4791 still returns typed `unassessable / schema-incompatible`, so the existing fail-closed rule remains;
- Pi #9718 remains open; the previously qualified all-GLM reviewer `thinking=low` mapping remains preserved in `native-nan` rollback, while the active/selectable multi-provider profiles do not imply that upstream issue is fixed;
- `pi-web-access` #428 is an upstream lazy-activation false negative with functional eager fallback, not a Pi 0.87.1 regression.

Evidence: `docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md`.

## Gentle skill-registry watcher #962 — MITIGATED

A production Pi session reproduced the upstream Gentle Shell #962 crash class: a recursive skill-registry watcher received `ENOENT / scandir` while the Codex system-skill subtree was being replaced and the unhandled asynchronous watcher error terminated Pi. Pi crash history shows the same failure on 0.87.0 and 0.87.1, so this is not a Pi 0.87.1 regression.

Qualified compatibility action:

```bash
export GENTLE_PI_NO_SKILL_REGISTRY=1
```

Gentle 3.7 documents this as keeping skills available while skipping only automatic `.atl/skill-registry.md` refresh/watch. Post-change interactive-shell checks saw the environment override, Pi 0.87.1, Gentle Shell 3.7.0, the supported CLI flag, and `gentle-ai doctor` 8/8 healthy.

Evidence: `docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md`.

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

`docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md`

The Gentle 3.7 / Engram 2.1 qualification remains at `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.

The earlier 3.5.1/3.6.0 maintenance evidence remains preserved at `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923.md`.

## Current compatibility debt

See:

`docs/vnext/CURRENT_COMPATIBILITY.md`

The remaining seams are fail-safe compatibility notes, not missing Atenea runtime features.

## Historical qualification

Pre-vNext qualification detail is preserved at:

`historical/qualification/QUALIFICATION_PRE_VNEXT.md`

and in other explicitly historical field-evidence documents.

Historical qualification does not define the current execution path.
