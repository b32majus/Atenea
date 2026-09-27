# Atenea — current OpenCode serve runtime recipe

Status: **CURRENT QUALIFIED RECIPE**
Date: 2026-09-27

## Baseline

```text
OpenCode 1.18.32 (single real npm-global install)
Gentle AI 3.7.0
fresh `opencode serve` host per bounded writer/review role
one HTTP session per host
direct `build` writer
Context7 / Engram OFF by default
```

Install OpenCode from the current stable npm channel outside `~/.opencode`. Install/update Gentle AI through its official owner path, then reconcile managed OpenCode assets with `gentle-ai sync --agent opencode` before applying Atenea's bounded desired state.

Atenea's current OpenCode desired state requires:

- `default_agent = build`;
- NaN provider configuration from local secret-bearing configuration plus versioned secret-free model metadata;
- Context7 and Engram disabled by default;
- minimal global `AGENTS.md`, without unconditional Gentle persona/Engram protocol;
- Gentle-managed review transport and skills under `~/.config/opencode`;
- no active legacy `~/.agents/skills` global duplicate surface.

## Version-probe compatibility shim

Gentle 3.7 detects OpenCode major with a hard 3-second `opencode --version` probe. Keep one thin shim at `~/.local/bin/opencode`: exact single-argument `--version` / `-v` reads the real npm package version; every other invocation execs `~/.npm-global/bin/opencode` unchanged.
## Normal bounded ticket flow

1. Start a fresh `opencode serve --hostname 127.0.0.1 --port <ephemeral>` host in the authorized worktree.
2. Wait until the native HTTP API is ready.
3. `POST /session`, then `POST /session/:id/message` with `agent=build` and the explicitly resolved model route.
4. Stop the writer host after the bounded turn completes.
5. Run deterministic verification and native Gentle STATUS. Follow only provider-issued START/consent transitions.
6. When review collection is required, start a new fresh serve host and one bounded `build` session carrying the exact provider-issued review continuation. Reviewer Tasks flow through `opencode-review-transport.ts`.
7. Stop only after exact acknowledgement burns terminal authority or Gentle returns a typed STOP/refusal.
8. Tear down the review host, run final deterministic checks, create the authorized Git checkpoint, then launch the next ticket from durable authority or STOP.

## Hard exclusions

- Do not use one-shot `opencode run` for unattended trains while the clean pre-session `init` hang remains reproducible.
- Do not use `gentle-orchestrator` as a nested ticket parent beneath the Atenea supervisor.
- Do not keep a global/persistent OpenCode server to carry model context between tickets.
- Do not restore historical OpenCode DB/session/cache state.
- Do not enable Context7/Engram globally merely because they are installed.
- Do not remove or patch Gentle-managed review transport assets by hand.

## Qualification gate after material runtime changes

Require a bounded real-message smoke plus a synthetic two-ticket train proving: direct writer, deterministic checks, exact Gentle consent transport, reviewer capture, terminal acknowledge/burn, Git checkpoint, clean final tree and `HUMAN_TOUCH_AFTER_LAUNCH=0`.

Current evidence: `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md`.
