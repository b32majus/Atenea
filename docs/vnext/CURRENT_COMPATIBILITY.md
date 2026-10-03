# Atenea vNext — Current Compatibility Notes

Status: **CURRENT C-084 RUNTIME / PROVIDER NOTES**
Date: 2026-10-03

## Current baseline

```text
OpenCode package    @opencode/cli 2.0.22
canonical command   opencode
runtime             native OpenCode V2
operator surface    existing persistent Herdr workspace/pane
current decision    C-084
project config      opencode.json + .opencode/agents/
Matt skills         project-local, upstream-managed
```

Exact patch versions are compatibility evidence, not permanent architecture pins. Revalidate only when a real upgrade changes a seam we depend on.

The package also exposes `opencode2` as an alias to the same 2.0.22 binary. It is not a second runtime; Atenea's canonical command is `opencode`.

## Cutover evidence

The previous active `opencode-ai` V1 `1.18.34` package and wrapper were removed. Duplicate isolated V2 runtimes were also retired after the package-managed V2 passed provider/config checks.

The former global Gentle/OpenCode V1 configuration was preserved in a private local backup outside `~/.config/opencode`; it is provenance/rollback material, not active configuration.

The active global V2 config contains provider/MCP capability plus the Herdr v13 observability/session integration. It has no Gentle orchestrator/reviewer agents, no Gentle review transport, no SDD/Gentle execution plugins, and no global default model/agent. Herdr integration is not Atenea routing or correctness authority.

## Provider/model IDs used by C-084

```text
nan/deepseek-v4-flash
nan/glm5.3-flash
nan/mimo-v2.6-flash
nan/qwen3.8-flash
openai/gpt-6-luna
openai/gpt-6.1-sol
```

NaN resolves from `NAN_API_KEY` in the environment and OpenAI from stored OAuth on the qualified VPS. Do not commit credentials.

The NaN `deepseek-v4-flash` provider ID is intentionally retained even when the provider backend serves the newer V4.1 Flash implementation.

## Configuration boundary

C-084 routing is project-local and versioned. Do not rewrite shared global config as per-ticket/train routing state.

Native V2 agents use `permissions` with `shell`, `subagent` and `edit`, and model variants use `provider/model#variant`.

The project requires subagent nesting depth 2 so a V4 implementer can invoke the independent reviewer/corrector level without an Atenea lifecycle controller. Runtime behavior, not prose, is the final authority for this seam.

## TUI selection

A new full-screen TUI session starts with project `default_agent=atenea-volume`:

```bash
opencode .
```

For a complex work unit, switch the primary agent in the visible TUI to `atenea-complex` before submitting the handoff (`/agents`, `Ctrl+X` then `A`, or `Shift+Tab`).

`--pure` is not a V2 flag. `--agent` exists for `opencode run`/`mini`, not as the ordinary full-screen TUI launch flag.

## Historical runtime state

Gentle/Pi/OpenCode V1 assets may remain in Git, qualification fixtures or private backup. Their presence does not make them active runtime. Herdr remains supported for persistence, observation and process management; no hidden Herdr state owns correctness or product authority.
