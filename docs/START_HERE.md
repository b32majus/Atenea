# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current runtime baseline — read this first

```text
CURRENT_AUTHORITY = this reconciliation after promotion
RUNTIME_STATE      = QUALIFIED FOR PREPARED TICKETS
Pi                 = 0.87.1
Herdr              = 0.9.1
Gentle AI          = 3.7.0
OpenCode           = 1.18.32 qualified fallback worker
prepared-ticket supervisor = Pi + Herdr
prepared-ticket worker     = ONE plain Pi child (`pi --no-extensions`)
review transport           = Codex through native Gentle review integration
Gentle Shell / ODD         = not the prepared-ticket implementation entry
OpenCode Build             = qualified fallback worker
```

The current productive path is optimized for work whose product meaning, acceptance and material constraints are already durable. Atenea does not send that work back through ODD merely to rediscover or re-track decisions that are already made.

Canonical operator path: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
Version/provider/runtime exceptions: `docs/vnext/CURRENT_COMPATIBILITY.md`.

Historical OpenCode/Gentle-orchestrator and Gentle-Pi qualification documents remain valid evidence for what they tested, but they do not define the current prepared-ticket entry.

## 1. Shape only when needed

If product meaning, acceptance or material constraints are genuinely unresolved, shape only enough to create durable executable authority. Do not generate specs/tickets by ritual when accepted authority already exists.

If executable authority exists, use `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md` and the prepared-ticket runbook.

## 2. Ordinary preflight

The normal preflight has five facts only:

1. correct repo/worktree/base and no unrelated dirty state mixed into the candidate;
2. current accepted task/work-order/spec identified;
3. outcome, acceptance and material constraints are executable without inventing product meaning;
4. current qualified runtime is available;
5. publication boundary is known.

If durable authority already proves a fact, do not ask the human to repeat it.

## 3. Execute prepared work

```text
accepted bounded ticket/train
→ minimal preflight once
→ Pi supervisor + Herdr
→ one plain Pi child (`--no-extensions`) in the target worktree
→ read repository authority + applicable project skills
→ implement smallest coherent change
→ deterministic checks/oracles
→ local candidate commit
→ `gentle-ai review assess --agent codex`
→ exact native Gentle continuation when due
→ terminal review state / durable checkpoint
→ next authorized ticket or STOP
```

The supervisor does not implement. The ticket worker owns the complete ticket. Gentle owns review authority internally. Codex is review transport; it is not a second Atenea ticket worker and does not imply Codex authored the candidate.

Do **not** use `gentle-orchestrator` or ODD for a prepared ticket. Do **not** launch Gentle Shell as the ticket worker. Do **not** manually export `GENTLE_PI_REVIEW_RELAY_CONTRACT` to make plain Pi impersonate the Gentle Shell host relay.

If plain Pi has a concrete runtime/tooling failure, preserve the checkpoint and use qualified OpenCode Build as the fallback worker under the same prepared-ticket contract. Changing worker runtime is not authority to reopen shaping.

## 4. Repository authority and skills

Before product writes, the worker reads the target repository's current authority in the order that repository defines. Normally this includes:

- `AGENTS.md`;
- `CODING_STANDARDS.md` when present/required;
- accepted ticket/work-order/spec and cited live authority;
- applicable project-local skills.

Project-local skills intended for Pi discovery should use `.agents/skills/<name>/SKILL.md` with valid YAML frontmatter containing non-empty `name` and `description` fields.

Project skills own domain/engineering/UI/QA guidance. They must not copy Atenea lifecycle, model-routing or provider-state machinery into product repositories.

## 5. Conditional escalations

Open extra policy only when its trigger exists:

- coarse/over-budget candidate evidence or a clear multi-unit implementation shape → `WORK_UNIT_COMPOSITION_POLICY_V1.md`;
- material human promotion risk → `PROMOTION_REVIEW_V1.md`;
- runtime/version incident → `vnext/CURRENT_COMPATIBILITY.md`;
- unresolved product meaning → shaping/human authority.

A gate that cannot change the next action should not run.

## 6. Verify

Use deterministic evidence whenever possible: tests, typecheck/build, schemas, changed-path-specific checks, security/privacy checks, performance benchmarks where the ticket has a real performance requirement, and independent oracles where repository policy requires them.

A reviewer's opinion does not replace a measurable performance or safety acceptance criterion.

## 7. Review

Follow native Gentle/provider transitions exactly.

For committed prepared-ticket candidates, normal review entry is:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent codex \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

If `review_due=true`, execute the returned `next_transition.command` literally. After START, retain the exact lineage/revision/target and execute only provider-issued continuations.

Native Gentle owns lens selection, candidate causality, refutation when applicable, bounded correction, targeted validation and acknowledgement/burn. A deterministic finding may not need a refuter; inferential findings use the native refutation path when the provider requires it.

Judgment Day is separate and explicit: use it only when the user/ticket requests standalone dual/adversarial review for a concrete target. Do not run both Judgment Day and ordinary 4R on the same target by ritual.

Review approval never grants push/PR/merge/deploy authority.

## 8. Train operation

Train-wide repo/base/publication/runtime facts are established once. At ticket boundaries re-check only durable checkpoint/HEAD, clean candidate state, dependencies/frontier, and whether the next ticket remains inside the authorized train.

Procedural questions already answered by durable authority may be handled by the supervisor. Material product/scope/acceptance forks go to the human.

Do not delete, reset or recycle active worktrees merely because the runtime protocol changes.

## 9. Publish

Validate the actual changed artifact types. Follow target repository policy + explicit human authority.

No automatic merge. No force-push/destructive recovery by default.

## 10. Dispose merged execution worktrees

A successful merge is the normal trigger to evaluate disposal; it is not permission to delete blindly.

Before removal, confirm the intended work is durably published, no required local-only material remains, no active process/session depends on the directory, and the path is an execution worktree rather than the canonical checkout.

Then use normal Git worktree removal and prune metadata. Do not use `--force` as routine cleanup.

## 11. Historical and fallback paths

- `docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md` — qualified OpenCode fallback/provenance.
- `docs/OPERATOR_RUNBOOK_OPENCODE_ZERO_TOUCH_V1.md` — historical V1 evidence.
- `docs/OPERATOR_RUNBOOK_V1.md` — points to the current prepared-ticket path after this reconciliation.
- older Gentle-Pi/ODD evidence remains historical evidence, not current prepared-ticket authority.
