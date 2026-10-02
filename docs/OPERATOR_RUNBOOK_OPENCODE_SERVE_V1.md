# Atenea — OpenCode serve zero-touch operator runbook v1

Status: **CURRENT QUALIFIED RUNBOOK**
Date: 2026-09-27

## 1. Entry

Use `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`. For an ordinary ticket, establish the five preflight facts and stop there. Do not add composition/routing/promotion ceremony unless its trigger is present.

The normal runtime is the qualified stack in `docs/vnext/OPENCODE_SERVE_RUNTIME_RECIPE_20260927.md`.

## 2. Train launch

The human/planning surface authorizes the train frontier and publication boundary once. The thin supervisor owns only:

```text
authorized frontier
fresh host launch/teardown
exact already-authorized consent transport
checkpoint reconciliation
next ticket / STOP
```

Train-wide facts are not re-prompted at each ticket boundary.

## 3. Writer turn

For each ticket:

1. start a fresh bounded `opencode serve` host in the authorized worktree;
2. create one `atenea-writer` session;
3. send the short semantic execution request for that ticket;
4. let OpenCode/Gentle own internal exploration/decomposition/delegation;
5. stop the writer host after the bounded turn;
6. run the repository's applicable deterministic checks.

Do not insert `gentle-orchestrator` beneath the Atenea supervisor.
## 4. Native review lifecycle

After a Gentle AI upgrade, reconcile the managed OpenCode V1 assets explicitly with `gentle-ai sync --agent opencode` before qualification. Do not assume a generic `gentle-ai sync` includes OpenCode: the registered-agent inventory may contain only Pi. This is upgrade/maintenance work, not a per-train step.

After deterministic checks, follow Gentle's current native STATUS/START/consent/capture/correction/acknowledge transitions exactly.

If explicit train authority covers exact candidate-scoped consent, the supervisor may relay that exact provider choice. Otherwise stop for the human choice. The supervisor never broadens target/scope, chooses reviewer verdicts or manufactures review timing.

When collection is required, start a fresh bounded OpenCode V1 serve process for the provider-issued review continuation. Launch it only through `tools/launch-opencode-review-host.mjs`; raw `opencode run --agent review-*` and any primary `--agent` selection are invalid transports.

For each exact `provider_task`, invoke `tools/dispatch-opencode-review-task.mjs --server <loopback-url> --cwd <repo>` with that JSON on stdin. The dispatcher creates one ephemeral session, submits one native `SubtaskPartInput` through `prompt_async`, waits only for that Task to complete, and aborts the default OpenCode parent before it can continue. Then re-enter through Gentle's exact STATUS. Any dispatcher/plugin/task failure is HUMAN STOP with no retry. Successful `acknowledge-approved` with burned authority is terminal; do not add a redundant post-burn STATUS ceremony.

## 5. Checkpoint and next ticket

After terminal review where applicable and final deterministic checks:

- reconcile the exact candidate/allowed paths;
- create/preserve the authorized Git checkpoint;
- verify the worktree state expected by the target repository;
- confirm the next ticket remains in the already-authorized frontier;
- launch the next fresh host or STOP.

Do not replay the whole train preflight between compatible tickets.

## 6. Escalations

Use additional policy only when triggered:

- obviously coarse/over-budget delivery shape → `WORK_UNIT_COMPOSITION_POLICY_V1.md`;
- explicit routing experiment/override → current routing evidence/decision;
- material human promotion risk → `PROMOTION_REVIEW_V1.md`;
- runtime/version incident → `vnext/CURRENT_COMPATIBILITY.md`;
- unresolved product meaning → return to shaping/human authority.

## 7. Publication

Review approval is evidence, not merge authority. Run any required composed-state checks for a multi-unit train, then stop at the explicit repository/human publication boundary. No automatic merge, force-push or destructive history rewrite.