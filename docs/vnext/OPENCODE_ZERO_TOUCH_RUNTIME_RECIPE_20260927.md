# Atenea — OpenCode V1 zero-touch runtime recipe

Status: **CURRENT REPRODUCTION RECIPE**
Date: 2026-09-27

## Qualified baseline

```text
OpenCode 1.18.10
Gentle AI 3.7.0
NaN provider baseline
thin deterministic supervisor
fresh OpenCode process per bounded ticket/phase
```

Pi/Gentle Pi remain rollback/alternate surfaces. OpenCode V2 is not promoted until Gentle immutable-review transport parity passes.

## 1. Preserve, then start clean

Before replacement, verify no active OpenCode process depends on the current HOME. Preserve the old config/runtime/state by same-filesystem rename or another reversible mechanism. Do not copy old session DB/snapshots into the new state.

Preserve supported credential material without printing it. Secrets never enter Git, prompts or evidence logs.

## 2. Install OpenCode outside `~/.opencode`

OpenCode treats `~/.opencode` as a discovery/configuration root. Do not install the runtime there.

Example stable prefix:

```bash
mkdir -p "$HOME/.local/lib/opencode-1.18.10"
npm install --no-audit --no-fund \
  --prefix "$HOME/.local/lib/opencode-1.18.10" \
  opencode-ai@1.18.10
```

Expose `opencode` through `~/.local/bin`. The qualified wrapper returns `1.18.10` immediately only for the exact `--version` / `-v` probe and delegates every other invocation to the real pinned binary. This protects Gentle 3.7's 3-second runtime-version probe without replacing OpenCode behavior.

## 3. Gentle assets and global config

Use Gentle AI 3.7.0 owner-managed OpenCode assets. `gentle-ai sync --agent opencode` may restore managed assets but can also re-enable MCP definitions; reconcile against `config/native-gentle/opencode-runtime-policy.json` afterward.

Current desired state:

- `~/.config/opencode/skills` is the ordinary global runtime skill root;
- legacy shared `~/.agents/skills` is not active globally;
- project-specific skills stay project-local;
- Context7 and Engram are installed but `enabled=false` by default;
- default interactive/lifecycle-host model is `nan/glm5.3-flash`;
- nontrivial writer routing is not promoted until C-071 field qualification closes.

## 4. Fresh operational state

Start with a new `~/.local/share/opencode` rather than restoring historical DB/session/snapshot state. Preserve credentials separately through supported local storage. Do not import old `opencode.db`, logs or snapshots merely for continuity.

## 5. Smoke

A fresh disposable repo must prove:

```text
OpenCode version = 1.18.10
session created
primary model stream begins
one bounded turn reaches exiting loop
Gentle-managed skill count is the expected deduplicated surface
```

Then run the two-ticket zero-touch canary after material runtime/transport changes. Required properties: fresh OpenCode per ticket, exact candidate-scoped consent transport, terminal Gentle burn, durable checkpoint and `HUMAN_TOUCH_AFTER_LAUNCH=0`.

## 6. Update discipline

Do not auto-upgrade OpenCode across major integration generations. A candidate upgrade must reproduce review/correction/burn before promotion. As of 2026-09-27, V2 2.0.18 is blocked because Gentle 3.7 OpenCode review plugins do not load successfully on that runtime.

Evidence: `docs/OPENCODE_V1_ZERO_TOUCH_RECOVERY_EVIDENCE_20260927.md`.
