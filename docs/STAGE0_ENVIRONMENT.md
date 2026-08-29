# Atenea — Stage 0 Environment Inventory

**Status:** `NEEDS_REVIEW`

**Captured:** 2026-08-29

This document records the read-only VPS inventory completed before any Atenea cleanup or installation work.

## Canonical workdir / repository

- Intended workdir: `/srv/kairos-lab/Atenea`
- At Stage 0 the directory existed but was empty and was **not a Git checkout**.
- Canonical remote: `b32majus/Atenea`
- Repository authority documents were read remotely.

## Runtime baseline

- OpenCode: `1.18.25`
- Codex CLI: `0.149.0`
- Gentle AI: `2.2.4`
- Node: `v24.15.0`
- npm / npx: `11.12.1`
- pnpm: `11.8.0`
- GitHub CLI: `2.93.0`

## OpenCode surfaces that may influence Atenea

Active/global surfaces include:

- `~/.config/opencode/opencode.json`
- `~/.config/opencode/AGENTS.md`
- `~/.config/opencode/skills/`
- `~/.agents/skills/`
- global agents, commands and plugins
- global Context7 MCP

A user-level `/home/hermes/AGENTS.md` is also inherited and was judged compatible with the experiment.

No Atenea-local OpenCode skills or instructions existed at Stage 0.

## Matt Pocock state

The current installation is **not suitable as the qualification baseline**.

Observed:

- Matt skills are duplicated across two OpenCode-visible roots:
  - `~/.config/opencode/skills`
  - `~/.agents/skills`
- The duplicated files that overlap are byte-for-byte identical and originate from `mattpocock/skills` commit `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`.
- Important Matt skills exist, including `grill-with-docs`, `grilling`, `to-spec`, `to-tickets`, `tdd`, `code-review`, `domain-modeling`, `setup-matt-pocock-skills`, `implement` and others.
- **`triage` is absent**, so the full target workflow is not installed.
- `~/.agents/.skill-lock.json` contains historical mixed namespaces and confirms prior installation churn.
- There is no project-local Matt installation in Atenea.

**Classification:** `CONFLICTING_PARTIAL`.

## Gentle AI state

The current installation is also **not suitable as the qualification baseline**.

Observed:

- Gentle AI `2.2.4` is installed.
- `gentle-ai doctor` reports healthy for its existing configuration.
- Existing managed agent state is centered on Hermes, not the intended full OpenCode qualification.
- CodeGraph is configured in the existing Gentle environment.
- Engram is available and responding.
- RDD/review mode is currently off/unset.
- Existing Gentle registry under the OpenCode config is stale (2026-07-04) and does not contain the Matt skills required for Atenea.
- Historical Gentle backups exist.

**Classification:** `CONFLICTING_PARTIAL` for the Atenea baseline, even though the existing installation may be internally healthy for its previous purpose.

## Existing configuration that is not automatically considered a conflict

The following should not be removed merely because they are global:

- OpenCode providers/authentication
- Context7 MCP
- unrelated OpenCode plugins/commands/agents
- `/home/hermes/AGENTS.md`
- Codex configuration
- Hermes / Engram data belonging to other workflows
- auth stores, `.env` files, tokens and credentials

Any later removal must be justified by direct interference with Atenea.

## Stage 0 conclusion

The VPS is usable, but the Matt/Gentle surfaces are contaminated by old, duplicated and partial installations. Trying to layer current full upstream installations on top would make the qualification difficult to interpret.

The preferred Stage 1 direction is therefore a **scoped radical reset of Matt + Gentle assets**, while preserving unrelated OpenCode/runtime configuration.

No cleanup was performed during Stage 0.
