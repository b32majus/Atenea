# C-083 — OpenCode V2 + Matt becomes the Atenea execution path

Status: **CURRENT EXECUTION DECISION**
Date: 2026-10-03

## Decision

Atenea adopts OpenCode V2 as the execution runtime and the upstream Matt Pocock engineering skills as the implementation/task-graph/code-review method. Atenea remains a thin policy, model-binding and deterministic-conformance layer.

C-083 supersedes C-082 for execution. C-077–C-082 remain provenance for lessons learned; their Gentle/Pi/RDD/4R/lineage/burn machinery is not active authority.

## Qualified bases

Before this decision:

- plain OpenCode V2 completed bounded implementation unattended;
- OpenCode V2 completed a two-work-unit train unattended;
- Matt `implement-spec` completed a clean end-to-end task graph with fresh implementers/worktrees, mergers, full tests, final two-axis review and worktree cleanup;
- Matt `code-review` caught all planted defects in the synthetic reviewer benchmark;
- Semgrep was qualified as conditional deterministic/static evidence;
- Alibaba Open Code Review demonstrated strong recall but insufficient latency for routine per-ticket use, so it remains selective.

## Architectural rule

Atenea does not fork Matt skills merely to express routing. OpenCode project-local agents bind Matt role names to models. Matt continues to own method; Atenea owns the binding. C-083 launches OpenCode with `--pure` so externally installed plugins from prior runtime epochs are not active; named task allowlists prevent accidental delegation to legacy global agents.

## Profiles

`volume` and `complex` are assurance profiles, not two writer families. Both use DeepSeek V4 Flash as the normal implementer.

`volume`: V4 writer/corrector, Luna Standards + Spec review.

`complex`: V4 writer, Luna Standards review, GPT-6.1 Sol Spec review, GLM 5.3 Flash high correction. Deep OCR uses GLM high only when a risk trigger warrants it.

A human/Cora may exceptionally select GLM as first writer for unusually open reasoning-heavy implementation; that is not implied by the `complex` label.

## Anti-loop

One correction pass maximum. No model carousel, quota-driven mid-unit fallback or repeated review/fix loop.

## Herdr

Herdr remains supported operator infrastructure for persistent sessions, observation and process management. It is not execution/correctness/product authority.

## Worktree lifecycle

Matt owns ephemeral implementer worktrees during `implement-spec`. Delivery/integration worktrees survive PR creation and normal review. Their normal cleanup point is post-merge closeout after durable merge/reconciliation, clean status, no active process and no unique local state.

## Publication

No review result, OpenCode agent or upstream skill may auto-merge or broaden publication authority. Human/repository policy remains final.
