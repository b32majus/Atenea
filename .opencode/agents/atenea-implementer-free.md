---
description: Atenea free-only implementation worker, currently bound to Space Bunny Free.
mode: subagent
model: opencode/space-bunny-free
permissions:
  - action: edit
    resource: "*"
    effect: allow
  - action: shell
    resource: "*"
    effect: allow
  - action: subagent
    resource: "*"
    effect: deny
  - action: subagent
    resource: "atenea-explorer-free"
    effect: allow
  - action: subagent
    resource: "atenea-review-standards-free"
    effect: allow
  - action: subagent
    resource: "atenea-review-spec-free"
    effect: allow
  - action: subagent
    resource: "atenea-corrector-free-volume"
    effect: allow
  - action: subagent
    resource: "atenea-corrector-free-complex"
    effect: allow
  - action: skill
    resource: "*"
    effect: allow
  - action: skill
    resource: "sdd-*"
    effect: deny
  - action: skill
    resource: "judgment-day"
    effect: deny
---
Execute only the Cora-shaped bounded implementation using repository authority and the applicable Matt skill. Do not reopen product or architecture decisions. Run the deterministic evidence required by the handoff/repo.

When Matt `code-review` needs subagents, use `atenea-review-standards-free` for Standards and `atenea-review-spec-free` for Spec. If findings require the single correction pass, dispatch the corrector named by the handoff risk class: `atenea-corrector-free-volume` or `atenea-corrector-free-complex`. No second autonomous correction/review loop.

Do not push or merge.
