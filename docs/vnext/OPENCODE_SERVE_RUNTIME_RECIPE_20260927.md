# Atenea — current OpenCode serve runtime recipe

Status: **CURRENT QUALIFIED RECIPE**
Date: 2026-09-28

## Baseline

```text
OpenCode 1.18.32 (single real npm-global install)
Gentle AI 3.7.0
fresh `opencode serve` host per bounded ticket
one primary `gentle-orchestrator` session per ticket
gentle-orchestrator = GLM 5.3 Flash high
Context7 / Engram OFF by default
Atenea semantic agents = 0
```

Install OpenCode from the current stable npm channel outside `~/.opencode`. Install/update Gentle AI through its official owner path, then reconcile managed OpenCode assets with `gentle-ai sync --agent opencode` before applying Atenea's secret-free routing desired state.

Atenea's current OpenCode desired state requires `default_agent = build` for the human interactive surface; `gentle-orchestrator` as the unattended ticket primary; NaN/OpenAI model pins from the active routing profile; Context7/Engram disabled by default; minimal global `AGENTS.md`; Gentle-managed review transport/skills under `~/.config/opencode`; and no active legacy `~/.agents/skills` duplicate surface.

## Version-probe compatibility shim

Gentle 3.7 detects OpenCode major with a hard 3-second `opencode --version` probe. Keep the qualified version-neutral shim at `~/.local/bin/opencode`: exact `--version` / `-v` reads the real npm package version; every other invocation execs the real npm-global binary unchanged.

## Normal bounded ticket flow

1. Start fresh `opencode serve --hostname 127.0.0.1 --port <ephemeral>` in the authorized worktree.
2. Wait for the HTTP API, create one session, and send the bounded ticket with `agent=gentle-orchestrator`.
3. Gentle owns ODD/exploration/delegation. Under `production-volume`, `explore` and `general` use DeepSeek V4 Flash; `complex` keeps `explore` on V4 and moves `general` to GLM high.
4. Follow native deterministic verification and Gentle ASSESS/STATUS. Follow only provider-issued START/consent/collect/correction transitions.
5. Reviewer Tasks run through Gentle-managed OpenCode review transport with the active profile pins. Production `review-reliability` is GPT-6 Luna high; the 2026-09-28 high-risk canary superseded V4 for that lens after four reproducible empty Task outputs.
6. Continue until exact acknowledgement creates terminal consumption/burn or Gentle returns a typed STOP/refusal.
7. Run final deterministic checks, create/preserve the authorized Git checkpoint, tear down the bounded host, then advance or STOP.

If the host dies after a lineage is bound, re-enter on a fresh host from the exact lineage and provider-issued `next_transition`. Do not reconstruct the lifecycle from prose or restart it from ASSESS.

## Hard exclusions

- no one-shot `opencode run` for unattended trains while the clean pre-session `init` hang remains reproducible;
- no Atenea-owned semantic writer/review-host agents on the ordinary path;
- no global/persistent OpenCode server to carry model context between tickets;
- no restoration of historical OpenCode DB/session/cache state;
- no global Context7/Engram merely because installed;
- no hand-patching Gentle-managed review transport assets.

## Qualification gate after material runtime changes

Require a bounded real-message canary proving the changed route. For a material orchestration/review change, prove upstream delegation where applicable, deterministic checks, native risk/START, exact consent transport, reviewer capture, terminal acknowledge/burn and clean durable state.

Current orchestration evidence: `docs/OPENCODE_GENTLE_ORCHESTRATOR_QUALIFICATION_20260928.md`. Serve/zero-touch transport evidence: `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md`. Historical context-budget evidence: `docs/OPENCODE_LEAN_CONTEXT_QUALIFICATION_20260927.md`.