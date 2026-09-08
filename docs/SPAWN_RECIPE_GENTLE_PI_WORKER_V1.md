# Atenea — Gentle Pi Worker Spawn Recipe v1

Status: **CURRENT / NORMATIVE FOR PINNED UNATTENDED WORK**
Date: 2026-09-08

Purpose: remove spawn ambiguity from the supervisor. The planning/launch surface resolves the literal model routes and repository/worktree parameters before the supervisor starts. The supervisor consumes them unchanged and fails closed if the runtime rejects them.

## Inputs resolved before supervisor launch

- `WORKTREE`: absolute isolated target worktree path.
- `SUPERVISOR_NAME`: unique supervisor identity; this exact value is used as Pi `--name` and the worker relay target.
- `WORKER_NAME`: unique worker identity; this exact value is used as both Herdr agent name and Pi `--name`.
- `INTERCOM_SCOPE_ID`: unique opaque scope for this unattended run; supervisor, worker and relay use the same value.
- `ATENEA_RDD_RELAY_EXTENSION`: absolute path to the versioned `extensions/atenea-rdd-consent-relay.mjs` from the approved Atenea checkpoint.
- `WORKER_MODEL`: exact Pi-supported parent/coordinator model literal, verified before launch. Current baseline is `opencode-go/glm-5.3-flash`.
- `WORKER_THINKING`: exact Pi thinking level. Current parent/coordinator baseline is `high`.
- Native Gentle Agent profile authority: when delegation is used, `gentle-ai-worker` and `gentle-ai-verify` must resolve to the accepted current profile (`openai-codex/gpt-5.6-luna`, `high`) unless the work item explicitly authorizes another qualified route. Project-local overrides outrank global config and must therefore be detected rather than silently accepted.
- `WORK_ITEM`: exact approved issue/work item.
- `START_HEAD`: expected clean starting checkpoint.
- `WORKER_PROMPT_FILE`: exact prebuilt bounded worker prompt file.
- `REQUIRED_ORACLE_PATH` + `REQUIRED_ORACLE_SHA256`: mandatory when repository/work-item authority requires a frozen principal acceptance oracle.

The reviewer continuation contract and its checker are derived from the same Atenea checkpoint root as `ATENEA_RDD_RELAY_EXTENSION`; mixing harness components from different Atenea checkpoints is not supported.

Do not ask the supervisor to discover models, Pi flags, Herdr syntax, plugins or extensions for pinned work.

Identity inputs are fail-closed:

```bash
test -n "$SUPERVISOR_NAME" || exit 11
test -n "$WORKER_NAME" || exit 12
test -n "$INTERCOM_SCOPE_ID" || exit 13
test -f "$ATENEA_RDD_RELAY_EXTENSION" || exit 14
ATENEA_CHECKPOINT_ROOT="$(cd "$(dirname "$ATENEA_RDD_RELAY_EXTENSION")/.." && pwd)"
ATENEA_REVIEWER_LIFECYCLE_CONTRACT="$ATENEA_CHECKPOINT_ROOT/docs/GENTLE_REVIEWER_CONTINUATION_V1.md"
test -f "$ATENEA_REVIEWER_LIFECYCLE_CONTRACT" || exit 19
grep -Fq "ATENEA_GENTLE_REVIEWER_CONTINUATION_V1" "$ATENEA_REVIEWER_LIFECYCLE_CONTRACT" || exit 19
test "${#SUPERVISOR_NAME}" -le 32 || exit 15
test "${#WORKER_NAME}" -le 32 || exit 16
ATENEA_INTERCOM_CONFIG_CHECK="$(cd "$(dirname "$ATENEA_RDD_RELAY_EXTENSION")/.." && pwd)/tools/check-pi-intercom-unattended-config.mjs"
test -f "$ATENEA_INTERCOM_CONFIG_CHECK" || exit 17
node "$ATENEA_INTERCOM_CONFIG_CHECK" || exit 18
ATENEA_REVIEWER_LIFECYCLE_CHECK="$ATENEA_CHECKPOINT_ROOT/tools/check-atenea-reviewer-lifecycle.mjs"
test -f "$ATENEA_REVIEWER_LIFECYCLE_CHECK" || exit 19
node "$ATENEA_REVIEWER_LIFECYCLE_CHECK" || exit 19
```

The config check is read-only and requires pi-intercom `enabled=true`, `confirmSend=false` and `inboundTrigger=always`; incompatible machine-global config is STOP before worker launch and is never mutated by Atenea.

The Herdr label is not an intercom identity. A supervisor or worker started without the matching Pi `--name` is invalid even if Herdr displays the expected agent label.

## Supervisor identity before worker launch

The mechanically launched plain Pi supervisor MUST use the pre-resolved name and scope:

```text
PI_INTERCOM_SCOPE_ID=$INTERCOM_SCOPE_ID
Pi --name $SUPERVISOR_NAME
Gentle Pi OFF
pi-intercom ON
```

Before worker creation, the supervisor verifies through pi-intercom that its current session is connected under exactly `SUPERVISOR_NAME`. A runtime fallback alias such as `subagent-chat-*`, a duplicate/ambiguous name, or a different scope is STOP before worker launch.

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
  --env PI_INTERCOM_SCOPE_ID="$INTERCOM_SCOPE_ID" \
  --env ATENEA_INTERCOM_SCOPE_ID="$INTERCOM_SCOPE_ID" \
  --env ATENEA_SUPERVISOR_NAME="$SUPERVISOR_NAME" \
  --env ATENEA_WORKER_NAME="$WORKER_NAME" \
  --env ATENEA_RDD_RELAY_REQUIRED=1 \
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
  --name "$WORKER_NAME" \
  -e "$ATENEA_RDD_RELAY_EXTENSION" \
  --append-system-prompt "$ATENEA_REVIEWER_LIFECYCLE_CONTRACT" \
  --no-skill-registry \
  --no-autoformat \
  --no-autofix
```

`herdr agent start` is the readiness barrier for the normal pinned path. Under the current Herdr `0.9.0` machine epoch (with the earlier `0.8.2` no-sleep canary preserved as field evidence), success means the expected agent was detected in the same terminal and is ready for input. After successful return, submit the worker prompt immediately. Do **not** add a startup `sleep`, pane read, roster probe or `agent_status` readiness check. A start timeout/rejection is FAIL CLOSED before prompt delivery; it is not a reason to invent a second readiness mechanism.

Normal extension discovery remains enabled for the worker so Gentle Pi 2.5 loads normally. Pi-lens remains diagnostic-only because autoformat/autofix are disabled. The reviewer continuation contract is loaded by Pi through the supported `--append-system-prompt` file surface, so the proven lifecycle is present from the worker's first token and is not reconstructed by the supervisor or ticket brief. The worker must read repository `AGENTS.md` and coding standards before product write. If it uses a native Gentle Agent, the child handoff must carry the applicable project constraints and bounded task/verification headings; the parent remains ticket/RDD/integration owner.

## Native Gentle Agents inside the ticket worker

Gentle Pi 2.5 makes package-owned `subagent_*` tools available inside the fresh ticket worker. They are an optional inner execution seam, not an outer Atenea topology change.

Current accepted defaults:

```text
gentle-ai-worker  openai-codex/gpt-5.6-luna  high
gentle-ai-verify  openai-codex/gpt-5.6-luna  high
```

Before the first delegated mutation, the ticket parent should use the supported native agent-discovery surface and fail closed if the intended child/profile is unavailable or silently resolves to a different route. Do not reinstall third-party `pi-subagents` to obtain delegation. A small/local ticket may be implemented directly by the parent; delegation is not mandatory.

Each native child has its own Pi RPC session/history. Child freshness does not weaken the outer rule: every newly selected frontier ticket still receives a fresh Pi/Gentle-Pi parent worker.

## Prompt delivery

Use the supported Herdr prompt surface. For normal event-driven supervision, submit once and do not wait for lifecycle completion:

```bash
herdr agent prompt "$WORKER_NAME" "$(cat "$WORKER_PROMPT_FILE")"
```

`--timeout` is valid only together with `--wait`. Do not add `--wait` merely to monitor worker completion; worker lifecycle is event-driven through pi-intercom.

After accepted submission, the supervisor ends its turn. No fixed sleeps, polling loops, periodic pane reads, long `herdr agent wait`, or `agent_status` lifecycle inference.

## Mandatory bounded-RDD consent relay in the worker prompt

For already-authorized bounded RDD consent, the prebuilt worker prompt MUST state all of the following explicitly; the supervisor must not paraphrase these clauses away when materializing a ticket brief:

- `DO NOT call ask_user_choice` and do not ask the human directly for bounded RDD consent. Do not use Gentle Pi's attended standing-session permission as an unattended substitute.
- The versioned Atenea RDD relay extension owns worker→supervisor transport. The worker MUST NOT reconstruct, reserialize, summarize or manually resend the Gentle consent envelope.
- When the extension reports that the exact provider payload was relayed mechanically, the worker ends its turn and waits for the supervisor's `GRANTED` / `DECLINED` intercom reply.
- If granted, the **worker** executes the provider-issued answer-consent transition with the original opaque `consentBinding` and remains owner of correction/review/acknowledgement/burn.
- The supervisor executes **zero `gentle-ai` commands**.
- Missing/mismatched session name, scope, relay extension or intercom route means FAIL CLOSED / STOP; do not fall back to direct human prompting, manual envelope copying or another runtime.

`extensions/atenea-rdd-consent-relay.mjs` listens to the actual `gentle_review` tool result. For a typed `gentle-ai.review-integration.consent/v3` result it validates that every choice remains bound to the provider target, computes a SHA256 over the exact provider text, and emits that text through pi-intercom's public extension outbox from the worker session. It also blocks `ask_user_choice` while that consent is pending. The model is not the transport serializer.

Before prompt delivery, the supervisor MUST run deterministic checks against `WORKER_PROMPT_FILE` and the relay extension:

```bash
grep -Fq 'DO NOT call ask_user_choice' "$WORKER_PROMPT_FILE" || exit 41
grep -Fq 'MUST NOT reconstruct' "$WORKER_PROMPT_FILE" || exit 42
grep -Fq 'worker executes the provider' "$WORKER_PROMPT_FILE" || exit 43
grep -Fq 'supervisor executes zero' "$WORKER_PROMPT_FILE" || exit 44
node --check "$ATENEA_RDD_RELAY_EXTENSION" || exit 45
```

These checks validate that the fixed relay contract is present; they do not authorize the supervisor to reconstruct Gentle lifecycle syntax or answer a genuinely human-owned product/authority decision.
## Failure behavior

If Herdr or Pi rejects any pinned parameter — including `WORKER_MODEL` — the supervisor MUST fail closed before product mutation. It MUST NOT run model discovery, substitute another model, rewrite the spawn command, or infer a fallback route.

The planning/launch surface may correct a bad literal and start a fresh worker only under the existing execution authorization and without broadening the work item.

## Supervisor contract after launch

The supervisor is a normal Pi process with Gentle Pi disabled and pi-intercom loaded explicitly. It remains non-implementing. Gentle Pi 2.5 standing review permission belongs only to attended Gentle-enabled sessions and is irrelevant to this unattended supervisor path. It MUST execute zero `gentle-ai` commands: no review-mode enable/disable, no inspect/start/consent/acknowledgement and no recovery commands.

Worker → supervisor pi-intercom is the inbound control plane for bounded consent/authority questions and FINAL. The worker owns implementation, deterministic checks, Gentle native RDD, provider transitions, acknowledgement/burn and authorized normal non-force publication. `FINAL` is the normal completion wake signal; the supervisor does not infer completion from pane/process state.

After FINAL reports an accepted durable remote checkpoint, the supervisor performs one fresh repository/tracker authority read and either launches a fresh worker for the next compatible approved frontier using this same recipe or STOPs. Normal post-FINAL reconciliation MUST NOT reopen the worker pane, inspect `agent_status`, or search host/session history for extra completion authority. A one-shot diagnostic read is allowed only after an explicit transport/runtime failure and is never the normal epilogue. Final merge remains a separate human boundary unless explicitly authorized.
