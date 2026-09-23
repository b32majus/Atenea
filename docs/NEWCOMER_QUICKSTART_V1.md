# Atenea Newcomer Quickstart

Status: **CURRENT**

Atenea vNext is simple by design.

## Mental model

```text
product authority
→ repository policy
→ native Pi/Gentle execution
→ deterministic evidence
→ human publication boundary
```

Atenea is the policy/config/evidence layer. It is not the runtime controller.

## Read these first

1. `README.md`
2. `AGENTS.md`
3. `docs/START_HERE.md`
4. `CODING_STANDARDS.md`

Only then read task-specific specs/ADRs/issues.

## To execute accepted work

```bash
pi
```

Native Gentle owns workers, verify, RDD and burn.

## To shape genuinely open work

Use the smallest useful shaping path.

Matt skills: optional discovery/shaping.

OpenSpec: optional native SDD.

Do not rerun shaping when executable authority already exists.

## To verify the Atenea environment

```bash
gentle-ai doctor
gentle-ai update
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
# Then use the credential-resolution + real-smoke checks in the canonical recipe.
```

## Current versions

- Pi 0.87.1
- gentle-pi / Gentle Shell 3.7.0
- Gentle AI 3.7.0
- Engram 2.1.0
- GGA 2.10.1
- NaN + OpenAI Codex providers
- active profile: `native-balanced`
- rollback profile: `native-nan`

## Temporary exceptions

Read `docs/vnext/CURRENT_COMPATIBILITY.md`.

## Reinstall/reproduce

Read `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`.

## Historical material

`historical/runtime/`, Stage docs and old run recipes are provenance only.

They do not define the current execution path.
