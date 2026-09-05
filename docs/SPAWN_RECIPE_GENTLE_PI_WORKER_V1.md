# Atenea — Gentle Pi Worker Spawn Recipe v1

Status: **CURRENT / NORMATIVE FOR PINNED UNATTENDED WORK**
Date: 2026-09-05

Purpose: remove spawn ambiguity from the supervisor. The planning/launch surface resolves the literal model routes and repository/worktree parameters before the supervisor starts. The supervisor consumes them unchanged and fails closed if the runtime rejects them.

## Inputs resolved before supervisor launch

- `WORKTREE`: absolute isolated target worktree path.
- `WORKER_NAME`: unique Herdr/Pi agent name.
- `WORKER_MODEL`: exact Pi-supported literal model id, verified before launch.
- `WORKER_THINKING`: exact Pi thinking level.
- `WORK_ITEM`: exact approved issue/work item.
- `START_HEAD`: expected clean starting checkpoint.

Do not ask the supervisor to discover models, Pi flags, Herdr syntax, plugins or extensions for pinned work.

## Worker pane

From the supervisor's current visible Herdr pane, create one separate worker pane in the same worktree:

```bash
herdr pane split --current --direction right --cwd "$WORKTREE" \
  --env GENTLE_PI_AUTONOMOUS_MODE=1 \
  --env GENTLE_PI_NO_SKILL_REGISTRY=1 \
  --no-focus
```
Capture the returned pane id. Start Pi in that exact pane:

```bash
herdr agent start "$WORKER_NAME" --kind pi --pane "$WORKER_PANE" -- \
  --model "$WORKER_MODEL" \
  --thinking "$WORKER_THINKING" \
  --no-skill-registry \
  --no-autoformat \
  --no-autofix
```

Normal extension discovery remains enabled for the worker so Gentle Pi loads normally. Pi-lens remains diagnostic-only because autoformat/autofix are disabled.

## Prompt delivery

Use the supported Herdr prompt surface. For normal event-driven supervision, submit once and do not wait for lifecycle completion:

```bash
herdr agent prompt "$WORKER_NAME" "$(cat "$WORKER_PROMPT_FILE")"
```

`--timeout` is valid only together with `--wait`. Do not add `--wait` merely to monitor worker completion; worker lifecycle is event-driven through pi-intercom.

After accepted submission, the supervisor ends its turn. No fixed sleeps, polling loops, periodic pane reads, long `herdr agent wait`, or `agent_status` lifecycle inference.
## Failure behavior

If Herdr or Pi rejects any pinned parameter — including `WORKER_MODEL` — the supervisor MUST fail closed before product mutation. It MUST NOT run model discovery, substitute another model, rewrite the spawn command, or infer a fallback route.

The planning/launch surface may correct a bad literal and start a fresh worker only under the existing execution authorization and without broadening the work item.

## Supervisor contract after launch

The supervisor is a normal Pi process with Gentle Pi disabled and pi-intercom loaded explicitly. It remains non-implementing.

Worker → supervisor pi-intercom is the inbound control plane for bounded consent/authority questions and FINAL. The worker owns implementation, deterministic checks, Gentle native RDD, provider transitions, acknowledgement/burn and authorized normal non-force publication.

After an accepted durable remote checkpoint, the supervisor performs one fresh authority read and either launches a fresh worker for the next compatible approved frontier using this same recipe or STOPs. Final merge remains a separate human boundary unless explicitly authorized.
