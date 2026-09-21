# P5 Operational Simplification — 2026-09-22

Status: **PASS / P5 CLOSED**

Purpose: move settled behavior to the cheapest reliable mechanism and remove superseded Atenea runtime machinery from the active tree without losing provenance.

## 1. Principle

P5 applies the rule:

> An LLM should not repeatedly reason about something that can be proved cheaply and reproducibly.

It also applies the vNext ownership boundary:

> Atenea policy/oracles may produce evidence; native Pi/Gentle owns execution, delegation, review and burn.

## 2. Historical runtime archive

The following superseded active surfaces were moved under:

`historical/runtime/`

rather than deleted outright.

Archived categories:

- Atenea RDD consent relay;
- pi-intercom unattended runtime checks;
- historical Gentle 3.3 host/ASSESS bridge patches and application script;
- historical effective-mode fixture and tests;
- historical current-authority checker;
- historical NaN runtime/profile checker and tests.

Approximate archived implementation/check volume:

`~3,150 lines`

These files remain available for provenance and regression archaeology, but are explicitly non-operative.

`historical/runtime/README.md` defines that boundary.
## 3. Active replacements

Historical behavior is replaced by:

- native Pi/Gentle for ODD, delegation, verify, RDD, consent and burn;
- `config/native-gentle/native-nan.profile.json` for secret-free desired state;
- `tools/check-native-gentle-profile.mjs` for runtime/profile conformance;
- `tools/check-vnext-authority.mjs` for vNext authority conformance;
- repository tests/CI for product correctness;
- human authority for publication/merge.

No replacement runtime controller was added.

## 4. Qualification after archive

After moving the historical surfaces out of the active tree:

- `gentle-ai doctor`: 8 passed / 0 failed / 0 warnings;
- `ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS`;
- `ATENEA_VNEXT_AUTHORITY_CHECK=PASS`;
- active-path absence check for the archived runtime surfaces: PASS;
- ordinary Pi + Gentle + NaN smoke: `P5_NATIVE_SMOKE_OK`;
- `git diff --check`: PASS.

This proves the archived machinery is not required for the qualified vNext path.

## 5. Decision

P5 passes.

Keep active:

- stable policy;
- phase-scoped shaping guidance;
- secret-free native profile specification;
- deterministic conformance tools;
- publication/Git guardrails;
- durable decision provenance.

Keep historical only:

- prior relays/controllers;
- prior runtime patches;
- prior effective-mode fixture;
- superseded runtime-specific checks.

Next phase:

**P6 remaining reproducibility closure** — exact installation recipe plus fresh-clone reproduction.
