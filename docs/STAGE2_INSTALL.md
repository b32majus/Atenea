# Atenea — Stage 2 Installation (2A + 2B reconciliation)

**Status:** `PASS`
**Captured:** 2026-08-29
**Branch:** `stage2-install-20260829`

Stage 2A installed pinned upstream Gentle AI and the complete current Matt
Pocock skills inventory for OpenCode. Stage 3, Matt setup, RDD enablement,
SDD execution, code implementation, and KairOS changes were not performed.

## Repository preparation

- Workdir: `/srv/kairos-lab/Atenea`
- Starting branch: `stage1-cleanup-20260829`
- Starting HEAD and `origin/main`: `a91c6f8c33f2f1887b9dd2be0b553e54c01f3732`
- Target branch was absent locally and remotely, then created from that HEAD.
- Initial worktree was clean.

## Gentle AI

| Field | Result |
|---|---|
| Version | `2.5.0-rc.1` |
| Release | `v2.5.0-rc.1`; tag object `1875f3366572d753d8855ed46551afc2459d2e6e` |
| Method | Official GitHub asset; Go unavailable |
| Asset | `gentle-ai_2.5.0-rc.1_linux_amd64` |
| SHA-256 | `a82cfd9edbba39b3ebc970ca42df1ce691c3ee7503ac53a24a856b3965ff0991` |
| Install path | `/home/hermes/.local/bin/gentle-ai` |
| Architecture | `x86_64` |
| Preset/scope | `full-gentleman` / `workspace` |
| Agent | `opencode` |

The audited dry-run components were `claude-theme`, `context7`, `persona`,
`engram`, `gga`, `opencode-gentle-logo`, `permissions`, `sdd`, and
`skills`. It contained no CodeGraph and no provider/auth/model replacement.
The real install reported 60 checks passed, 0 failed, 0 warnings, 0 skipped.

### Gentle verification

- `gentle-ai version`: `2.5.0-rc.1`.
- `gentle-ai doctor`: exit successful, 7 passed, 0 failed, 1 warning,
  semantic status `degraded`.
- Warning: `engram:reachable` found no persisted Engram MCP configuration for
  installed agents. The project `engram` MCP entry and global OpenCode plugin
  exist. `gentle-ai sync --dry-run` was inspected; real sync was not run.
- Review mode help confirmed global enable plus clone disable-only semantics.
  Read-only status: `global=""`, `clone_local=""`, `effective="off"`,
  `source="default"`.
- Final RDD mode: `off`.
- `/home/hermes/.gentle-ai` contains state, lock, and the install backup.

## Gentle surfaces

Workspace-local files created:

- `.config/opencode/opencode.json`, `AGENTS.md`,
  `.gentle-ai-default-agent.json`
- `.config/opencode/commands/`: 13 SDD/skill commands
- `.config/opencode/plugins/`: four Gentle plugins
- `.config/opencode/skills/`: shared references and Gentle SDD, review,
  RDD, testing, registry, and lifecycle skills; 25 `SKILL.md` files
- `.agents/skills/`: all 37 Matt skills
- `skills-lock.json`

Global Gentle-managed files created or modified:

- `/home/hermes/.local/bin/gentle-ai`, `gga`, and `engram`
- `/home/hermes/.config/opencode/opencode.json`
- `/home/hermes/.config/opencode/plugins/engram.ts`
- Gentleman themes, logo TUI plugin, and `tui.json` statusline wiring
- `/home/hermes/.config/gga/config` and `AGENTS.md`
- `/home/hermes/.gentle-ai/state.json`, lock, and install backup

Context7 was preserved globally and is also wired project-local. Engram is
wired project-local and through the global plugin. GGA is installed globally;
`gga init` and `gga install` were not run.

## CodeGraph

`CODEGRAPH_INSTALLED_BY_STAGE2=NO`.

No CodeGraph component appeared in dry-run/install output, and no CodeGraph
artifact appeared in the Gentle pre-install snapshot or final managed-artifact
search. Gentle generated the optional boolean key
`agent.explore.tools.codegraph_codegraph_explore=true` in project config. It
is recorded as an upstream-generated optional reference, not an installed
CodeGraph package; it was not manually changed.

## Matt Pocock

- Source: `mattpocock/skills`
- Source HEAD: `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`
- Method: `npx skills add mattpocock/skills --skill '*' --agent opencode --yes --full-depth`
- Scope/path: project-local copies under `/srv/kairos-lab/Atenea/.agents/skills`
- Count: 37; global Matt count: 0
- Duplicate check: no Matt name exists in either global OpenCode discovery root.
- Required present: `triage`, `setup-matt-pocock-skills`, `implement`,
  `tdd`, `code-review`.
- Lock metadata records `source: mattpocock/skills` and
  `sourceType: github` for all entries.
- No Matt skill was executed.

The upstream inventory included: `ask-matt`, `code-review`,
`codebase-design`, `diagnosing-bugs`, `domain-modeling`,
`grill-with-docs`, `implement`, `improve-codebase-architecture`,
`prototype`, `research`, `resolving-merge-conflicts`,
`setup-matt-pocock-skills`, `tdd`, `to-spec`, `to-tickets`, `triage`,
`wayfinder`, `wizard`, `grill-me`, `grilling`, `handoff`, `teach`,
`to-questionnaire`, `wait-what`, `writing-for-agents`,
`claude-handoff`, `implement-spec`, `loop-me`, `retro`,
`setup-ts-deep-modules`, `writing-beats`, `writing-fragments`,
`writing-shape`, `git-guardrails-claude-code`, `migrate-to-shoehorn`,
`scaffold-exercises`, and `setup-pre-commit`.

## Protected configuration

Unchanged exact hashes: `antigravity-accounts.json`, `/home/hermes/AGENTS.md`,
`~/.codex/config.toml`, `~/.codex/hooks.json`, and the protected `.env`
paths (absent before and after).

The exact global `opencode.json` hash changed because Gentle added managed
agent/permission surfaces. Exact subsection hashes for `provider`, `mcp`,
and `agent.build` matched the pre-install Gentle snapshot, preserving
provider/auth/model configuration and Context7. Current full hash:
`071be90b13ddc97268dccbe091f4bfb5c8e2b933808703750dd468557ff1b57e`.

## Stage 2A historical result

The upstream installation completed, but the workspace-scope result was not
qualified because OpenCode did not discover the workspace Gentle surface.

`ATENEA_STAGE2A_STATUS=NEEDS_REVIEW`

## Stage 2B reconciliation — upstream issue #3128

**Issue:** `Gentleman-Programming/gentle-ai#3128`, “fix(opencode): workspace
scope installs config in an undiscoverable directory”. The issue remains open.
The exact reproduction used OpenCode `1.18.25` and Gentle `2.5.0-rc.1`.

Stage 2A had created 64 tracked files under `/srv/kairos-lab/Atenea/.config/opencode`.
Read-only OpenCode checks showed workspace-only Gentle SDD commands and agents
absent from the effective runtime: `WORKSPACE_GENTLE_DISCOVERED=NO`.

No workaround or glue was introduced: no assets were moved to `.opencode`, no
`OPENCODE_CONFIG` wrapper or launch script was added, and no Gentle prompt was
edited. The exact Stage 2A-created `.config/opencode` directory was removed.
`.agents/skills` and `skills-lock.json` were preserved.

## Stage 2B global Gentle installation
| Field | Result |
|---|---|
| Version | `2.5.0-rc.1` |
| Agent | `opencode` |
| Preset | `full-gentleman` |
| Scope | `global` |
| Method | `gentle-ai install --agent opencode --preset full-gentleman --scope=global` |
| Dry-run | Safe; 59 passed, 0 failed, 0 warnings |
| Real install | 59 passed, 0 failed, 0 warnings/skipped |
| Upstream tag | `refs/tags/v2.5.0-rc.1` |
| Binary | `/home/hermes/.local/bin/gentle-ai` |

Components were `claude-theme`, `context7`, `persona`, `engram`, `gga`,
`opencode-gentle-logo`, `permissions`, `sdd`, and `skills`. No CodeGraph
package/component was included. The optional upstream
`codegraph_codegraph_explore` tool-grant key was not manually changed and is
not an installation of CodeGraph.

Global Gentle-managed surfaces include:

- `/home/hermes/.config/opencode/opencode.json`;
- 23 command files under `/home/hermes/.config/opencode/commands`;
- 5 managed agent files under `/home/hermes/.config/opencode/agents` plus
  managed agent entries in the effective config;
- 6 plugin files under `/home/hermes/.config/opencode/plugins`, including
  Engram;
- 38 skill directories under `/home/hermes/.config/opencode/skills`;
- theme/logo/TUI statusline wiring and `/home/hermes/.config/opencode/tui.json`;
- state, lock, and backup under `/home/hermes/.gentle-ai`.

Engram is wired through the global OpenCode MCP configuration and plugin.
Context7 remains present in the protected MCP configuration. RDD/review mode
read-only status reports `effective=off`, `source=default`; no enable command
was run.

## Stage 2B effective runtime evidence

The required supported read-only runtime commands all returned exit code 0:

- `opencode debug config --pure` found effective `engram`,
  `gentle-orchestrator`, SDD, and `implement` surfaces;
- `opencode debug agent gentle-orchestrator --pure` found the agent;
- `opencode agent list` listed `gentle-orchestrator`;
- `opencode mcp list` listed `engram`;
- `opencode debug skill --pure` found `sdd-init`, `rdd-defect-workflow`,
  `gentle-ai-bench`, and `systemic-issue-triage`.

Therefore:

`GENTLE_ORCHESTRATOR_EFFECTIVE=YES`

`ENGRAM_EFFECTIVE=YES`

`gentle-ai doctor` returned healthy: 8 passed, 0 failed, 0 warnings. Its
Engram check independently reports that the persisted stdio MCP answered the
initialize handshake. No sync was run.

`CODEGRAPH_INSTALLED=NO` and `RDD_MODE=off`.

## Stage 2B Matt Pocock after reconciliation

Matt remains entirely project-local under `/srv/kairos-lab/Atenea/.agents/skills`:
37 skills, with `skills-lock.json` retained. `npx skills list --json` reports
37 entries from `mattpocock/skills`; `npx skills list --global --json` reports 0.
Required `triage`, `setup-matt-pocock-skills`, `implement`, `tdd`, and
`code-review` are present. No matching Matt names were found in the global
discovery roots. Source SHA: `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`.
No Matt skill was executed.

## Stage 2B protected configuration verification

The pre-global-install baseline was captured without displaying values. The
provider subsection remained `9d2b0a1f2f88698961730665b6cfdfd977df7be7afb9213c049f88e2a3057cf2`;
`agent.build` remained `9c03229d0e3b1a62eaae0df3900da90259c53df86134f2824a27777ed3b9c52b`.
The pre-existing MCP structure excluding the newly managed Engram entry
remained `4adb8689bb1759366c00de9953af01bb658e121384a1146f329cc0fac8a985c`;
Context7 is present. Expected Gentle additions changed the full OpenCode
config hash from `071be90b13ddc97268dccbe091f4bfb5c8e2b933808703750dd468557ff1b57e`
to `10a2bda68339496780a14179f71ba49f4dea532fec4aa1929fff8c77e84e0fd7`.

Exact hashes for `antigravity-accounts.json`, `tui.json`, `/home/hermes/AGENTS.md`,
`~/.codex/config.toml`, and `~/.codex/hooks.json` were unchanged. Protected
`.env` paths remained absent. No KairOS files changed. Only the Stage 2A
workspace Gentle directory was removed; valid Matt project-local files remain.
`ATENEA_STAGE2_STATUS=PASS`
