# Atenea — Stage 3 skill registry qualification

**Status:** `PASS`
**Captured:** 2026-08-29
**Branch:** `stage3-skill-registry-20260829`
**Parent:** `stage2-matt-setup-20260829` at `f5497d6e0f786384ccbde60afc68a47a3983b4dd`
**Matt setup commit:** `f5497d6e0f786384ccbde60afc68a47a3983b4dd`

## Contract and versions

- Gentle: `2.5.0-rc.1`.
- OpenCode: `1.18.25`.
- Source: complete Matt project-local installation, 37 skills.
- `gentle-ai skill-registry list` is supported and read-only.
- `gentle-ai skill-registry refresh` is supported.
- The binary has no `--help` form for `skill-registry`, `list`, or `refresh`;
  its usage reports only `refresh|list [flags]`. No unsupported flags were used.

## Pre-refresh compatibility audit

The first supported list operation returned 75 rows: 37 `project` rows and 38
`user` rows. All 37 project rows resolved to the exact root
`/srv/kairos-lab/Atenea/.agents/skills/<name>/SKILL.md`.

There were no missing Matt names, no duplicate resolved names, and no same-name
global skill shadowing a project Matt skill. `PRE_REFRESH_DISCOVERY=PASS`.

The named core skills all resolved as project-local, including
`setup-matt-pocock-skills`, `grill-with-docs`, `grilling`, `domain-modeling`,
`to-spec`, `to-tickets`, `triage`, `implement`, `tdd`, `code-review`,
`codebase-design`, `diagnosing-bugs`, `research`, and `wayfinder`. The live
list gave each its exact `<name>/SKILL.md` path under the root above.

## Existing `.atl` registry

`ATL_PREEXISTED=YES`. Session evidence recorded `.atl/` as already untracked
before the interactive Matt setup and explicitly left it untouched.

It contained `skill-registry.md` and `.skill-registry.cache.json`. The former
is a generated Markdown registry; the latter is a runtime/cache fingerprint.
Both are runtime state, not versioned project artifacts. The existing registry
contained all 37 Matt names and all 37 exact project-local paths. Its project
name/path map matched the live pre-refresh list exactly (`37/37`).

The pre-refresh files had timestamps `2026-08-29 12:46:55 +0200` and hashes
`076ab14fc340d2d958f7b892f5fa0d9f58c32b854bde50158c6a6e680bd568e2` and
`dabf89c150c15ccfc627c04484dfb393a213b005348523cc968810c2d01c29d9`. Available
evidence indicates they were generated/cache state before setup; it does not
prove the original trigger. No setup-time modification was observed.

## Authorized refresh

After the list audit, the first authorized refresh ran in Atenea with the
supported command:

`gentle-ai skill-registry refresh`

It returned `Skill registry up to date (cache-hit)` for
`/srv/kairos-lab/Atenea/.atl/skill-registry.md`. The registry and cache
fingerprints, contents, and timestamps remained unchanged. No `.atl` file was
hand-edited, copied, or committed. The refresh also generated an untracked
`.gitignore` containing only `.atl/`; it was removed from the checkpoint scope
because the work order requires `.atl` to remain the sole pre-existing
untracked state.

## Post-refresh qualification

- `MATT_SOURCE_COUNT=37`.
- `MATT_RESOLVED_COUNT=37`.
- `MATT_MISSING=0`.
- `MATT_DUPLICATES=0`.
- `MATT_SHADOWED=0`.
- `MATT_PATH_ROOT=/srv/kairos-lab/Atenea/.agents/skills`.
- Original upstream names and project-local `SKILL.md` paths were preserved.

The required names remain present: `setup-matt-pocock-skills`,
`grill-with-docs`, `grilling`, `domain-modeling`, `to-spec`, `to-tickets`,
`triage`, `implement`, `tdd`, `code-review`, `codebase-design`,
`diagnosing-bugs`, `research`, and `wayfinder`.

Gentle global surfaces remain installed under
`/home/hermes/.config/opencode/skills`, including `skill-registry`,
`issue-creation`, `rdd-defect-workflow`, and the SDD skills. The upstream
`skill-registry` contract intentionally skips `sdd-*`, `_shared`, and
`skill-registry` from its registry index, and deduplicates by preferring
project-level skills over user-level skills. OpenCode still discovers the
global surfaces; this filtering is not a missing-installation result.
