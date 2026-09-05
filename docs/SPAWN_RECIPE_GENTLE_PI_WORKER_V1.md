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
- `WORKER_PROMPT_FILE`: exact prebuilt bounded worker prompt file.
- `REQUIRED_ORACLE_PATH` + `REQUIRED_ORACLE_SHA256`: mandatory when repository/work-item authority requires a frozen principal acceptance oracle.

Do not ask the supervisor to discover models, Pi flags, Herdr syntax, plugins or extensions for pinned work.

## Frozen-oracle gate when required

For clinical/semantic work whose repository authority requires a principal acceptance oracle, the planning/launch surface freezes that oracle in an independent context **before the implementation worker exists**. The supervisor receives the literal path + SHA256 and only verifies them:

```bash
test -f "$REQUIRED_ORACLE_PATH" || exit 31
ACTUAL_ORACLE_SHA256="$(sha256sum "$REQUIRED_ORACLE_PATH" | awk '{print $1}')"
test "$ACTUAL_ORACLE_SHA256" = "$REQUIRED_ORACLE_SHA256" || exit 32
```

Missing/mismatched oracle means FAIL CLOSED / STOP before product mutation. The supervisor MUST NOT author the oracle, ask the implementation worker to author it, launch OpenCode/another agent as a fallback, or weaken the gate.

## Worker pane

From the supervisor's current visible Herdr pane, create one separate worker pane in the same worktree:

```bash
WORKER_PANE_JSON="$(herdr pane split --current --direction right --cwd "$WORKTREE" \
  --env GENTLE_PI_AUTONOMOUS_MODE=1 \
  --env GENTLE_PI_NO_SKILL_REGISTRY=1 \
  --no-focus)" || exit 20
WORKER_PANE="$(printf '%s' "$WORKER_PANE_JSON" | python3 -c 'import json,sys
d=json.load(sys.stdin)
stack=[d]; ids=[]
while stack:
    x=stack.pop()
    if isinstance(x,dict):
        v=x.get("pane_id")
        if isinstance(v,str): ids.append(v)
        stack.extend(x.values())
    elif isinstance(x,list): stack.extend(x)
ids=list(dict.fromkeys(ids))
if len(ids)!=1: raise SystemExit("expected exactly one pane_id")
print(ids[0])')" || exit 20
test -n "$WORKER_PANE" || exit 20
```

Do **not** pass the raw JSON object returned by `herdr pane split` to `herdr agent start`. Start Pi in the extracted pane id:

```bash
herdr agent start "$WORKER_NAME" --kind pi --pane "$WORKER_PANE" -- \
  --model "$WORKER_MODEL" \
  --thinking "$WORKER_THINKING" \
  --no-skill-registry \
  --no-autoformat \
  --no-autofix
```

Normal extension discovery remains enabled for the worker so Gentle Pi loads normally. Pi-lens remains diagnostic-only because autoformat/autofix are disabled. The worker must read repository `AGENTS.md` and coding standards before product write; if Gentle delegates to a bounded writer, the handoff must carry the applicable project constraints.

## Prompt delivery

Use the supported Herdr prompt surface. For normal event-driven supervision, submit once and do not wait for lifecycle completion:

```bash
herdr agent prompt "$WORKER_NAME" "$(cat "$WORKER_PROMPT_FILE")"
```

`--timeout` is valid only together with `--wait`. Do not add `--wait` merely to monitor worker completion; worker lifecycle is event-driven through pi-intercom.

After accepted submission, the supervisor ends its turn. No fixed sleeps, polling loops, periodic pane reads, long `herdr agent wait`, or `agent_status` lifecycle inference.

## Mandatory bounded-RDD consent relay in the worker prompt

For already-authorized bounded RDD consent, the prebuilt worker prompt MUST state all of the following explicitly; the supervisor must not paraphrase these clauses away when materializing a ticket brief:

- `DO NOT call ask_user_choice` and do not ask the human directly for bounded RDD consent.
- Send the exact Gentle consent envelope to the named supervisor via **pi-intercom ASK**.
- Wait for the supervisor's bounded `GRANTED` / `DECLINED` decision.
- If granted, the **worker** executes the provider-issued answer-consent transition and remains owner of correction/review/acknowledgement/burn.
- The supervisor executes **zero `gentle-ai` commands**.
- Missing supervisor alias or unavailable pi-intercom route means FAIL CLOSED / STOP; do not fall back to direct human prompting or another runtime.

Before prompt delivery, the supervisor MUST run a deterministic presence check against `WORKER_PROMPT_FILE`:

```bash
grep -Fq 'DO NOT call ask_user_choice' "$WORKER_PROMPT_FILE" || exit 41
grep -Fq 'pi-intercom ASK' "$WORKER_PROMPT_FILE" || exit 42
grep -Fq 'worker executes the provider' "$WORKER_PROMPT_FILE" || exit 43
grep -Fq 'supervisor executes zero' "$WORKER_PROMPT_FILE" || exit 44
```

These checks validate that the fixed relay contract is present; they do not authorize the supervisor to reconstruct Gentle lifecycle syntax or answer a genuinely human-owned product/authority decision.
## Failure behavior

If Herdr or Pi rejects any pinned parameter — including `WORKER_MODEL` — the supervisor MUST fail closed before product mutation. It MUST NOT run model discovery, substitute another model, rewrite the spawn command, or infer a fallback route.

The planning/launch surface may correct a bad literal and start a fresh worker only under the existing execution authorization and without broadening the work item.

## Supervisor contract after launch

The supervisor is a normal Pi process with Gentle Pi disabled and pi-intercom loaded explicitly. It remains non-implementing. It MUST execute zero `gentle-ai` commands: no review-mode enable/disable, no inspect/start/consent/acknowledgement and no recovery commands.

Worker → supervisor pi-intercom is the inbound control plane for bounded consent/authority questions and FINAL. The worker owns implementation, deterministic checks, Gentle native RDD, provider transitions, acknowledgement/burn and authorized normal non-force publication.

After an accepted durable remote checkpoint, the supervisor performs one fresh authority read and either launches a fresh worker for the next compatible approved frontier using this same recipe or STOPs. Final merge remains a separate human boundary unless explicitly authorized.
