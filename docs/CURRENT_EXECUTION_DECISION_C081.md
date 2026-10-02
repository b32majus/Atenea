# C-081 — Prepared execution keeps C-080, review dispatch becomes deterministic

Status: **CURRENT**
Date: **2026-10-02**

C-081 is a narrow successor to C-080. It does **not** reopen the prepared-ticket front door, implementation routing, Gentle ownership, adaptive 0/1/4 review depth, reviewer models, publication boundary, or HUMAN STOP policy.

## Decision

Prepared work still enters implementation directly:

```text
EXECUTION_READY
→ clean Pi supervisor + Herdr
→ ONE plain Pi implementation worker (`pi --no-extensions`)
→ deterministic verification
→ candidate commit
→ Gentle ASSESS / exact provider-issued lifecycle transitions
```

When Gentle returns `collect.inputs[*].provider_task`, OpenCode V1 is now only a bounded reviewer runtime:

```text
provider_task
→ deterministic `tools/dispatch-opencode-review-task.mjs`
→ OpenCode V1 `SubtaskPartInput` / `prompt_async`
→ exact `review-*` subagent
→ managed Gentle V1 capture
→ abort parent immediately after the Task reaches `completed`
→ exact Gentle STATUS
```

There is **no review lifecycle LLM and no review relay LLM**. The dispatcher never interprets Gentle state, selects a lens, repairs a failure, retries a reviewer, reads repository code, or decides the next transition.

## Review routing

The single C-080 assurance table remains current:

- readability / reliability / resilience / validator → `openai/gpt-6-luna` · high;
- risk → `nan/glm5.3-flash` · high;
- refuter → `nan/mimo-v2.6-flash`, only when provider-issued;
- DeepSeek V4 has no reviewer role; no `review-*` role uses Luna xhigh.

Every `review-*` agent remains `subagent`. No `atenea-review-host`, `atenea-review-relay`, or other primary review agent is part of current authority.

## Fail-closed contract

`tools/launch-opencode-review-host.mjs` remains the serve-only launcher and `tools/opencode-review-transport-guard.mjs` rejects:

- one-shot `opencode run`;
- any review-host `--agent` selection;
- implementation-profile flags on a review host;
- alternate config sources;
- missing or misrouted `review-*` subagents.

`tools/dispatch-opencode-review-task.mjs` accepts exactly one provider-owned task on stdin, only for the six allowed `review-*` roles. It dispatches once. HTTP failure, plugin refusal, task error, unexpected multiplicity, agent mismatch or timeout returns typed `technical_failure → human_stop`. There is no automatic retry or alternate model.

## Qualification evidence

Gentle 4.0.0 was reconciled explicitly with OpenCode V1 1.18.34 using `gentle-ai sync --agent opencode`; `gentle-ai doctor` then passed 8/8 and the managed V1 plugin was refreshed.

A fresh historical PR #117 fixture (`f38af928… → 7892b9bc…`, 16 paths / 488 lines) completed full 4R on the refreshed Gentle 4 + OpenCode V1 seam and reached `approved`; exact `acknowledge-approved` returned `authority: burned` with the candidate unchanged.

The new direct dispatcher was then qualified separately:

- invalid synthetic binding → plugin refusal / HTTP 500 → typed `human_stop`, with no child and no retry;
- direct `SubtaskPartInput` created the exact reviewer child without a primary decision;
- `review-readability` capture reduced a fresh lineage from four pending lenses to three;
- final `prompt_async` + task-completion abort captured `review-reliability`, reducing pending lenses from `risk + reliability` to `risk`;
- after that success the default OpenCode parent was aborted with **0 input / 0 output tokens**, so no lifecycle/exploration turn executed.

OpenCode V2 remains non-current: the 2026-10-02 qualification reproduced an upstream concurrent-capture seam where reviewer children completed successfully but the managed V2 relay could observe the earlier `running` host state as `output_refused`. Do not build an Atenea workaround; re-qualify upstream V2 after a published fix.

## Preserved boundaries

- Gentle alone owns ASSESS, review timing/depth, bindings, findings, correction/refuter/validator routing, approval and acknowledge/burn.
- Prepared tickets still bypass Gentle Shell / ODD for implementation.
- Review approval never grants push, PR, merge or deploy authority.
- A technical review failure is HUMAN STOP, not permission to investigate, retry, switch models or start a new lineage.
