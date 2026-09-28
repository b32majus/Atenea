# Atenea — upstream Gentle orchestrator qualification

Status: **QUALIFIED CURRENT EVIDENCE**
Date: 2026-09-28

## Question

Can OpenCode 1.18.32 + Gentle AI 3.7.0 use upstream `gentle-orchestrator` as the bounded ticket parent, preserve child/reviewer model routing, make review proportional, and complete a high-risk RDD lineage through terminal acknowledgement/burn?

## Runtime under test

- primary: `gentle-orchestrator` → `nan/glm5.3-flash` · high;
- production `explore` / `general` → `nan/deepseek-v4-flash`;
- fresh `opencode serve` host; one bounded primary session;
- Gentle RDD effective mode = `on`;
- no SDD selection and no publication action.

## Canary A — proportional review

A small authorization helper + test completed functionally. The orchestrator treated the second file as mechanical, then ran native `review assess`. Gentle returned `medium`, `under_budget`, `review_due=false`; no START was manufactured. Hidden oracle and tests passed.

This proves that upstream orchestration restores Gentle's proportional decision about whether RDD is due.

## Canary B — delegation + high-risk RDD

A bounded auth/security fixture required nontrivial changes in two source modules plus tests. Server evidence showed `gentle-orchestrator → GLM`, `explore → V4`, and `general → V4`.
`general` produced durable work-unit commit `25136fd`. Hidden oracle PASS; `node --test` = 8/8 pass. Native ASSESS classified the auth candidate high-risk and `review_due=true`; STATUS/START created lineage `review-2d9afa4d54027af4` with four review lenses.

## Reliability routing incident

Three lenses completed. `review-reliability` on DeepSeek V4 Flash returned `opencode_task_output_empty` four consecutive times. `review-resilience` used the same V4 route successfully in that lineage, so this is not evidence of a general V4/provider outage. Gentle preserved the transaction as bound and unacknowledged and did not burn authority.

The only routing change was:

```text
review-reliability: nan/deepseek-v4-flash
                 → openai/gpt-6-luna · high
```

After `gentle-ai sync`, the pin remained. A fresh host selected the exact existing lineage and provider-issued `next_transition`. The reliability Task streamed as `agent=review-reliability modelID=gpt-6-luna`, returned a usable result, and Gentle continued to `acknowledge-approved`.

Terminal consumption was written. Final STATUS for the same target returned `action: stop` with `reason_code: target_already_acknowledged`. No replacement lineage was created.

## Qualification result

PASS for the current ordinary topology: thin Atenea supervisor → fresh ticket host → `gentle-orchestrator` GLM high → upstream `explore/general` → native proportional RDD → terminal burn → checkpoint/next-or-STOP.
Atenea owns zero semantic writer/reviewer agents. C-074 remains context-budget evidence only; its custom primaries are not ordinary runtime authority.

Production correction: `review-reliability = GPT-6 Luna high`; complex remains Luna xhigh. V4 remains qualified for production `explore`, `general`, and `review-resilience`.

## Recovery rule proven

Fresh host context does not erase durable Gentle authority. After START is bound, re-enter using the exact lineage and execute only its provider-issued `next_transition`. Do not rerun ASSESS/START, synthesize review authority, or create a replacement lineage because a process died.

## Evidence roots

- `/srv/kairos-lab/outbox/gentle-orchestrator-fullpath-canary-20260928/`
- `/srv/kairos-lab/outbox/gentle-orchestrator-rdd-resume-canary-20260928/`

These are operational evidence on the qualification host; durable conclusions are captured in C-076 and the versioned runtime/routing policy.