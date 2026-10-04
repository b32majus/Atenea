# C-084 — Native OpenCode V2 cutover and visible Herdr operation

Status: **CURRENT EXECUTION DECISION**
Date: 2026-10-03

## Why C-084 exists

C-083 got the target architecture right but qualified the wrong executable boundary. The command `opencode` resolved to OpenCode V1 `1.18.34`; `--pure`, V1 permission names and the sampled agent-resolution checks therefore proved V1 compatibility, not native OpenCode V2 execution.

C-084 corrects that qualification error explicitly. C-083 remains architectural provenance for the routing/model decision, but it is superseded as runtime authority.

## Canonical runtime

The VPS has one active package-managed OpenCode runtime:

```text
package   = @opencode/cli 2.0.22
command   = opencode
runtime   = OpenCode V2
V1        = uninstalled from the active global path
```

Historical V1/Gentle configuration and qualification fixtures remain preserved as provenance/backups outside the active OpenCode configuration. They are not executable authority.

The npm V2 package may expose `opencode2` as an alias to the same binary; Atenea's canonical command is `opencode`.

## Global / project boundary

Global OpenCode V2 configuration owns only user/runtime capabilities such as provider definitions, credentials and shared MCP connections. The active global config contains no Gentle orchestrator, Gentle review agents or legacy Gentle execution plugins. The Herdr OpenCode integration plugin is explicitly allowed as observability/session metadata; it is not routing or correctness authority.

Atenea role semantics remain project-local and versioned:

```text
opencode.json
.opencode/agents/
```

No per-ticket routing state is written into global configuration. No global default model or default agent is configured; project-local Atenea bindings own those choices.

## Native V2 configuration

Atenea agents use native V2 fields:

- `permissions`, not V1 `permission`;
- `shell`, not V1 `bash`;
- `subagent`, not V1 `task`;
- `edit` covers edit/write/patch;
- model variants use `provider/model#variant`;
- project `experimental.subagent_depth=2` permits bounded nested implementation support such as coordinator → implementer → explorer; review/correction lifecycle ownership remains coordinator-level.

## Visible operating path

Herdr is user-owned, already-running persistent operator infrastructure. The user starts/keeps Herdr running. Coras and Atenea workers do **not** launch, restart, replace or stop Herdr per ticket/train. For real work, Cora prepares through `READY_TO_LAUNCH` (repo/worktree/handoff/preflight plus exact bash and prompt); the human operator starts the visible `opencode .` session and submits the first prompt unless that specific launch is explicitly delegated.

The ordinary visible path is:

```text
existing Herdr workspace/pane
→ cd to the project/worktree
→ opencode .
→ full-screen OpenCode V2 TUI
→ selected Atenea primary profile
→ Matt workflow + role-bound subagents
```

`atenea-volume` is the project default for a new session. For `standard + complex`, select `atenea-complex` in the visible TUI before submitting the execution handoff (`/agents`, Ctrl+X then A, or Shift+Tab).

C-084 also carries the optional `free_only` cost-policy extension in `docs/ATENEA_FREE_PROFILE_V0.md`. Cost policy is independent from the `volume|complex` risk class: when human/project authority fixes `free_only`, select `atenea-free` for either risk class and use only the current zero-cost catalog. No paid fallback is implied by complexity.

`opencode run` is for bounded automation/smokes, not the normal visible train surface.

## Standard routing retained from C-083

The standard-cost model matrix from C-083 is retained. Field control semantics are refined by C-084 evidence: the primary coordinator owns the single canonical Matt review for a fixed candidate, review closes the original implementer write phase, and the correction budget is at most two fresh finding-scoped attempts:

- MiMo coordinator;
- Qwen explorer;
- DeepSeek V4 Flash normal writer in both standard profiles;
- Luna High Standards review;
- Luna High Spec review in `volume`;
- Sol 6.1 High Spec review in `complex`;
- V4 fresh correction sessions in `volume`, with at most two finding-scoped attempts;
- GLM 5.3 Flash High fresh correction sessions in `complex`, with at most two finding-scoped attempts;
- conditional Semgrep/OCR by risk;
- Cora integrated audit at material feature/train/PR boundaries.

No quota router or silent mid-unit fallback is introduced. Product shaping is also outside the unattended execution boundary: material product/architecture/scope/acceptance choices require an attended Cora + human decision before launch, and a newly discovered material shaping question produces HUMAN STOP rather than agent self-resolution.

## Qualification boundary

C-084 requires only bounded migration proof:

1. canonical `opencode` resolves to V2 2.0.x;
2. V1 active package/entrypoint is absent;
3. the providers/models required by the selected route resolve (NaN/OpenAI for standard routing; current OpenCode Zen/NaN Free bindings for `free_only`);
4. global config contains no legacy Gentle runtime authority;
5. all project-local Atenea agents parse in native V2;
6. the required nested subagent seam is smoke-tested or, if the synthetic smoke is inconclusive, verified in the first real bounded pilot;
7. repository authority/conformance checks pass.

This is not a new synthetic qualification program. The first real project train remains the decisive field pilot.

## Publication and cleanup

Review remains evidence, not merge authority. Human/repository policy owns publication. Worktree cleanup remains post-merge and fail-closed on unique local state.
