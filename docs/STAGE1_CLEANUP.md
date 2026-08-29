# Atenea Stage 1 — Scoped Radical Reset

Status: `NEEDS_REVIEW`

Captured: 2026-08-29

Stage 1 removed old Matt Pocock and Gentle AI surfaces from the active global discovery paths without changing OpenCode provider/auth configuration, Context7, Codex configuration, Hermes/Engram data, or unrelated repositories. The cleanup used recoverable quarantine for filesystem trees because the requested radical purge would otherwise be irreversible.

## Cleanup result

| Area | Result | Method |
|---|---|---|
| Matt Pocock skills | 17 named skills removed from global agent links | Official `npx skills remove --global ... -y` |
| Matt lockfile | 13 stale `mattpocock/skills` entries removed; no other entries were present | Minimal mechanical lockfile cleanup after official CLI left stale entries |
| Gentle OpenCode skills | 11 Gentle-authored skill directories and `_shared` support files removed from the active OpenCode root | Manual proven-owned cleanup, moved to quarantine |
| Gentle OpenCode registry | `.atl` registry and cache removed from the active OpenCode root | Manual proven-owned cleanup, moved to quarantine |
| Gentle OpenCode integrations | `commands/skill-registry.md` and Gentle skill-registry integration removed; `opencode-sdd-engram-manage` removed from `tui.json` | Manual proven-owned cleanup |
| Gentle state | `~/.gentle-ai` state, cache and historical backups removed from the active home path | Manual proven-owned cleanup, moved to quarantine |
| Gentle binary | Standalone `gentle-ai` 2.2.4 removed from `~/.local/bin` | Manual proven-owned cleanup, moved to quarantine |

## Exact active paths changed

Matt targets were removed from both previously observed OpenCode-visible roots:

- `/home/hermes/.config/opencode/skills/`
- `/home/hermes/.agents/skills/`
- `/home/hermes/.agents/.skill-lock.json`

The named target set was `setup-matt-pocock-skills`, `grill-with-docs`, `grilling`, `domain-modeling`, `to-spec`, `to-tickets`, `implement`, `tdd`, `code-review`, `codebase-design`, `diagnosing-bugs`, `research`, `wayfinder`, `handoff`, `improve-codebase-architecture`, `writing-for-agents`, and `prototype`. `triage` was absent before cleanup and remains absent.

Gentle-owned OpenCode paths were removed from active discovery:

- `/home/hermes/.config/opencode/.atl/`
- `/home/hermes/.config/opencode/skills/_shared/`
- Gentle-authored skill directories under `/home/hermes/.config/opencode/skills/`: `branch-pr`, `chained-pr`, `cognitive-doc-design`, `comment-writer`, `go-testing`, `issue-creation`, `judgment-day`, `skill-creator`, `skill-improver`, `skill-registry`, and `work-unit-commits`
- `/home/hermes/.config/opencode/commands/skill-registry.md`
- `/home/hermes/.config/opencode/plugins/skill-registry.ts` when present
- `/home/hermes/.config/opencode/tui-plugins/gentle-logo.tsx` when present
- `/home/hermes/.config/opencode/node_modules/opencode-sdd-engram-manage` when present
- The `opencode-sdd-engram-manage` entry in `/home/hermes/.config/opencode/tui.json`

Gentle-owned home paths were moved out of active use:

- `/home/hermes/.gentle-ai/` (state, cache and five historical backup trees)
- `/home/hermes/.local/bin/gentle-ai`

## Ownership and method decisions

`gentle-ai uninstall --help` returned only the root description that the command removes “Gentle AI managed files”; it did not enumerate its deletion set. The backup manifests demonstrated that the old installation had managed or snapshotted user-owned paths including `/home/hermes/.config/opencode/opencode.json`, `/home/hermes/.hermes/config.yaml`, Codex files, auth-adjacent files and other agent configuration. Because that scope included assets explicitly protected by this work order, the official uninstall was not executed. This is why the proven-owned cleanup used the active-path quarantine method instead.

The Gentle binary was proven to be the standalone `/home/hermes/.local/bin/gentle-ai` ELF for version 2.2.4, owned by `hermes`, and absent from `dpkg` ownership; no package-manager removal was available. It is no longer at its executable path.

Matt ownership was proven by the official skills CLI and `/home/hermes/.agents/.skill-lock.json`, which identified `mattpocock/skills` and its GitHub source. The prior `.config/opencode/skills` copies were byte-for-byte identical to the `.agents/skills` copies. No name-only deletion was used for remaining skills.

## Preserved deliberately

- `/home/hermes/.config/opencode/opencode.json`, providers and auth configuration, including Context7; its SHA-256 remained `551025005873ac3e6b987d79af886b73cf8a0d2aec743ae37ab947da143ffad8`.
- `/home/hermes/.config/opencode/antigravity-accounts.json`, `.env.exa`, `.env.tavily`, `/home/hermes/AGENTS.md`, `/home/hermes/.codex/config.toml`, and `/home/hermes/.codex/hooks.json`; their recorded hashes were unchanged.
- Non-Gentle OpenCode skills, commands, plugins, TUI plugins, package metadata and package lock. `tui.json` changed only by removing the explicit Gentle SDD plugin.
- Hermes and Engram products/data, including `/home/hermes/.hermes/`; no database, memory store, repository, KairOS backup, credential, token, auth store or unrelated process was touched.
- OpenCode itself; version remained `1.18.25` and no update was run.

## Remaining Gentle surfaces

The following are deliberately retained only as recoverable quarantine, outside all active discovery paths:

- `/tmp/atenea-stage1-gentle-quarantine-20260829/.gentle-ai/` — old Gentle state/cache/backups.
- `/tmp/atenea-stage1-gentle-quarantine-20260829/gentle-bin/gentle-ai` — old standalone 2.2.4 binary.
- `/tmp/atenea-stage1-gentle-quarantine-20260829/opencode-skills/` — removed Gentle-authored OpenCode skills/support files.
- `/tmp/atenea-stage1-gentle-quarantine-20260829/opencode-integrations/` — removed ATL registry/cache and Gentle command remnants.

Hermes-native skills and references that mention Gentle or SDD were preserved because they are under Hermes' own product surface and were not proven to be active OpenCode-managed files. They are not in the active OpenCode roots above.

## Verification

- `npx skills list --global --json`: zero entries with `source == "mattpocock/skills"`.
- Matt lockfile source count: `0`; no target directory remains in `.config/opencode/skills`, `.agents/skills`, or `.codex/skills`. The only same-named non-Matt Hermes skill found was `/home/hermes/.hermes/skills/mlops/research`, preserved because it has no Matt provenance.
- No `triage` directory or Matt source reference remains in the active roots.
- No active `/home/hermes/.gentle-ai`, `gentle-ai` binary, `.atl`, Gentle registry, Gentle command, Gentle plugin, or SDD TUI plugin remains.
- `/home/hermes/.opencode/bin/opencode --version` returned `1.18.25`; `opencode --help` completed successfully.
- Critical configuration hashes/mtimes were compared before and after. `opencode.json`, package metadata, auth-adjacent files, `.env` files, global `AGENTS.md`, and Codex files were unchanged. The intentional `tui.json` plugin removal is the sole related configuration change.
- No Gentle/RFA process was running at verification time; no process was stopped.
- Git was on `main` at `640dd3501f44e40b6d92c7d5f036c3e3de735908` before documentation changes, with no unrelated worktree changes.

## Final state

The active VPS surface is clean for a future OpenCode + full Matt + full Gentle qualification: old Matt skills are no longer discoverable, the old Gentle registry/state/binary are out of active paths, and protected configuration/data remain intact. Status is `NEEDS_REVIEW` only because the old artifacts remain recoverably quarantined rather than irreversibly purged after the safety guard rejected the broad delete; purge the explicit quarantine before Stage 2 if a destructive final purge is required.
