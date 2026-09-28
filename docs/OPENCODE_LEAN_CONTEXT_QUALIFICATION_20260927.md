# OpenCode lean role/context qualification — 2026-09-27

Status: **HISTORICAL QUALIFICATION EVIDENCE — ordinary-role recommendation superseded by C-076**

## Question

Can Atenea reduce OpenCode prompt/tool context without weakening direct implementation, Gentle immutable reviewer transport, terminal burn, checkpoint continuity or zero-touch operation?

## Controlled context A/B

Same OpenCode `1.18.32`, Gentle AI `3.7.0`, NaN/GLM 5.3 Flash and trivial `Reply with exactly OK` prompt:

| Variant | Approx. context tokens | Result |
|---|---:|---|
| full current config / `build` | 9,558 | PASS |
| remove `gentle-orchestrator` only | 9,618 | no meaningful saving |
| keep only review agents | 9,469 | no meaningful saving |
| review agents, skills absent | 7,795 | skills account for ~1.7k |
| minimal config | 7,627 | OpenCode base/tool floor remains large |
| lean writer permissions | 5,141 | PASS |
| `atenea-writer` custom primary | 5,138 | PASS |
| `atenea-review-host` custom primary | 6,023 | PASS |

A message-level `tools` override alone measured ~6,930 tokens: functional tool disabling worked, but agent-level permission narrowing was required to remove associated skill/agent metadata from model context.

## Qualified roles

`atenea-writer` denies Task, skill, webfetch/websearch/codesearch, todo and question. It retains the native code/repository tools required to inspect, edit and verify. A real smoke edited a scoped JS file and passed `node --check`.

`atenea-review-host` applies the same nonessential denials but permits Task only for `review-*`, preserving `opencode-review-transport.ts` reviewer capture. Neither role adds a custom orchestration prompt. The interactive default remains `build`.

## Two-ticket zero-touch qualification

Evidence directory: `/srv/kairos-lab/outbox/opencode-lean-context-zero-touch-20260927/`.

| Ticket | Writer tokens | Review-host tokens | Gentle | Checkpoint |
|---|---:|---:|---|---|
| T1 | 5,963 | 14,370 | APPROVED + burned | `10435891fdfe119796e0147e2cce7bd62f10416f` |
| T2 | 6,091 | 15,108 | APPROVED + burned | `117524311d04926354603cfcfd8b7af3713edf29` |

Final properties:

```text
HUMAN_TOUCH_AFTER_LAUNCH = 0
terminal Gentle reviews   = 2/2
Git checkpoints           = 2/2
final tests               = PASS
final worktree            = clean
wall time                  = 416.52 s (~6m57s)
```

The immediately prior serve qualification used the full `build` surface and observed writer totals ~10.4k and review-host totals ~18.9k, with 595.61 s wall time. The lean result therefore materially reduces context while preserving the qualified lifecycle. Timing is environment/provider dependent and is not a service-level promise.

## Current interpretation

These custom primaries proved that tool-surface narrowing can reduce context, but C-076 supersedes them as the ordinary execution topology because they bypass upstream Gentle orchestration semantics. Keep this document as performance/optimization evidence; do not use it to recreate Atenea-owned semantic workers. The current ordinary ticket parent is upstream `gentle-orchestrator`; `build` remains the human interactive default.
