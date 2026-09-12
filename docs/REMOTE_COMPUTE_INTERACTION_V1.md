# Remote Compute Interaction v1

Date: 2026-09-13
Status: ACTIVE — Cora/human remote-compute operating policy
Scope: how Cora interacts with authorized VPS and M7 compute outside or around Atenea execution

## Purpose

Keep remote-compute work fast, bounded and auditable without turning ChatGPT ↔ Remote MCP interaction into a slow command-by-command conversation.

This policy governs Cora's use of remote filesystem/terminal access on the VPS and M7. It does **not** replace the Atenea execution contract. When product work is already `EXECUTION_READY`, normal Atenea supervisor/worker ownership still applies.

## Core rule

> **Batch before agent; agent before ping-pong.**

The default is to think through the evidence or mutation first, then send one self-contained remote batch. Repeated `command → inspect → command → inspect` choreography is a fallback, not the normal operating mode.

## Fast path — default

For deterministic remote work, Cora SHOULD use this sequence:

```text
objective
→ reason locally about the complete evidence needed
→ 1 self-contained discovery batch
→ interpret the result
→ at most 1 focused deepening batch when materially necessary
→ if mutation is already authorized: 1 preflight + mutation + verification batch
→ factual report
```

Preferred direct primitives:

- known file → direct remote file read;
- known broad search → remote search primitive;
- repo/system inspection → one shell batch containing all relevant reads/checks;
- durable GitHub authority → GitHub connector, not shell archaeology;
- long-running deterministic process → launch once, then read its result rather than poll repeatedly.

A batch SHOULD use fail-closed shell practices when mutation is authorized (`set -euo pipefail`, exact paths/SHAs, explicit postconditions) and SHOULD return compact labeled evidence rather than raw host noise.

## Mutation boundary

Remote access does not create authority.

- Read-only inspection may proceed under the normal planning/reconciliation boundary.
- A mutation batch runs only after the mutation is already authorized by the human/current repository authority.
- The batch must not broaden scope, invent recovery semantics, force-push, merge, rewrite history or cross a human-owned product/authority decision.
- Preflight contradiction means STOP before mutation.

Where practical, combine backup/preflight, the authorized change, and verification in one fail-closed batch so partial state is minimized and evidence is returned together.

## Persistent shell

A persistent interactive shell is **not** the default speed optimization.

Field testing showed the host executes shell/filesystem/git work very quickly, while prompt-detection and repeated remote interaction can add avoidable round-trip delay. Prefer fresh self-contained commands unless continuity of process state is itself required.

## Delegated local-agent slow path

A local Pi/OpenCode/Codex-style agent on the VPS/M7 is optional and is used only when the task is genuinely adaptive enough that autonomy is worth model latency.

Use it when the mission requires many semantic decisions while exploring and cannot be specified efficiently as one or two deterministic batches. Do **not** insert a model between Cora and the host merely to run known commands.

A delegated local-agent session is:

- mission-scoped, not a weeks-long shared brain;
- bounded by the same authority as Cora's current task;
- read-only unless mutation was already authorized;
- unable to merge, broaden product scope or create new authority;
- evidence-producing: it returns concrete paths, SHAs, commands/results and unresolved uncertainty.

For current qualified model use, Pi/GLM may be selected for adaptive local delegation, but this policy does not pin a permanent model. Model routing is operational and replaceable.

## Manual operator fast fallback

If Cora recognizes that one operator-run batch would be materially faster or safer than many remote round trips, Cora SHOULD ask the human to run that exact batch and paste the output rather than spend time on remote choreography.

Before asking, Cora SHOULD first ask whether the same batch can be executed directly through the remote tool. Human terminal work is a fallback for speed/access constraints, not the normal first choice.

## Evidence behind this policy

Sep-12/13 field measurements separated host speed from orchestration overhead:

- trivial remote shell execution reached first output in tens of milliseconds;
- a synthetic 20-operation shell/filesystem/git batch completed in roughly 0.15 s of remote execution;
- a real multi-source routing inspection completed in about 0.25 s end-to-end for the first batch and about 2.8 s for a focused second batch;
- persistent-shell interaction added prompt/round-trip overhead without improving deterministic work;
- local-model delegation on the same investigation introduced minute-scale latency/timeouts, including trivial no-tool inference controls.

Conclusion: Desktop Commander/remote shell execution itself is not the dominant bottleneck for deterministic work. The avoidable cost is repeated ChatGPT ↔ Remote MCP ↔ host choreography and unnecessary model delegation.

## Decision table

| Situation | Preferred path |
|---|---|
| Exact checks/actions known | self-contained remote batch |
| Known file | direct file read |
| Known broad search | remote search primitive |
| GitHub issue/PR/repo authority | GitHub connector |
| Deterministic long-running command | launch once → read result |
| Adaptive exploration requiring semantic branching | mission-scoped local agent |
| Many remote round trips but one human batch would be faster | ask human to run exact batch |
| `EXECUTION_READY` product engineering | Atenea supervisor/worker path, not this generic operator shortcut |

## Anti-patterns

Avoid by default:

```text
DC command → Cora reads → DC command → Cora reads → ...
persistent shell kept alive only for convenience
local LLM used as a wrapper around deterministic shell commands
polling a process that can be launched once and read at completion
using shell to rediscover GitHub authority available through the GitHub connector
keeping one local-agent session across unrelated missions
```

## Relationship to Atenea

This is an operator-efficiency policy, not a new Atenea runtime layer. It authorizes no daemon, controller, scheduler, custom MCP, queue or orchestration service.

A future remote transport may replace Desktop Commander if it materially improves latency/reliability, but the invariant remains: minimize cross-boundary round trips, preserve authority boundaries, and use local model autonomy only where semantic adaptivity justifies it.
