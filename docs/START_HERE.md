# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current runtime baseline — read this first

```text
CURRENT_AUTHORITY = main after this reconciliation is promoted
RUNTIME_STATE      = QUALIFIED
OpenCode           = 1.18.32 (qualified stable runtime)
Gentle AI          = 3.7.0
Engram              = installed capability; OFF by default in OpenCode
Context7            = installed capability; OFF by default in OpenCode
provider baseline   = NaN
default interactive/lifecycle host model = GLM 5.3 Flash
writer role        = atenea-writer (lean direct primary); model route = runtime default unless explicit override/experiment (C-073/C-074)
review host role    = atenea-review-host (Task limited to review-*)
one-shot `opencode run` = BLOCKED_FOR_UNATTENDED_PROMOTION (clean-state init hang)
normal transport    = fresh `opencode serve` host per bounded writer/review role + one HTTP session
transport qualification = TWO-TICKET ZERO-TOUCH PASS; 2/2 terminal burn; 2/2 checkpoints
Atenea train supervisors = 1 thin deterministic supervisor
Atenea review controllers = 0
Pi / Gentle Pi      = rollback/provenance surface, not normal productive train entry
```

The old OpenCode `1.18.10` two-ticket zero-touch result remains valid historical lifecycle evidence, but it no longer pins the runtime. Stable `AGENTS.md` policy is version-neutral. Exact candidate versions, upstream defects and temporary transport decisions live in `docs/vnext/CURRENT_COMPATIBILITY.md`.

The qualified runtime preserves fresh context without restoring a long-lived model parent: the supervisor launches a fresh OpenCode server for the bounded writer or review role, creates one bounded session through OpenCode's native HTTP interface, and terminates the host at that lifecycle boundary. Two-ticket zero-touch qualification proved writer, review capture, acknowledge/burn and checkpoint continuity end to end.

If you need to rebuild the current runtime, use `docs/vnext/OPENCODE_SERVE_RUNTIME_RECIPE_20260927.md`. Version/provider exceptions remain in `docs/vnext/CURRENT_COMPATIBILITY.md`. The prior `OPENCODE_ZERO_TOUCH_RUNTIME_RECIPE_20260927.md` is retained as historical V1 reproduction evidence.

## 1. Shape only when needed

If product meaning, acceptance or material constraints are genuinely unresolved, shape only enough to create durable executable authority. Do not regenerate specs/tickets by ritual when accepted authority already exists.

If executable authority exists, use `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`.

## 2. Ordinary preflight

The normal preflight has five facts only:

1. correct repo/worktree/base and no unrelated dirty state;
2. current accepted task/work-order/spec identified;
3. outcome, acceptance and material constraints are executable without inventing product meaning;
4. current qualified runtime is available;
5. publication boundary is known.

If durable authority already proves a fact, do not ask the human to repeat it.

## 3. Conditional escalations

Open extra policy only when its trigger exists:

- coarse/over-budget candidate evidence → `WORK_UNIT_COMPOSITION_POLICY_V1.md`;
- explicit routing override/experiment or concrete route failure → current routing decision/evidence;
- material human promotion risk → `PROMOTION_REVIEW_V1.md`;
- runtime/version incident → `vnext/CURRENT_COMPATIBILITY.md`;
- unresolved product meaning → shaping/human authority.

Ordinary tickets use `atenea-writer` and the runtime default model route. Gentle continuation uses `atenea-review-host`. There is no per-ticket profile-selection ceremony.

## 4. Execute

```text
accepted bounded ticket/train
→ minimal preflight once
→ fresh qualified OpenCode serve host
→ one bounded `atenea-writer` session
→ applicable deterministic checks
→ native Gentle lifecycle when due
→ terminal burn where review applies
→ durable checkpoint
→ next authorized ticket or STOP
```

Train-wide repo/base/publication/runtime facts are established once. At ticket boundaries re-check only checkpoint/HEAD, clean candidate state and whether the next ticket remains inside the authorized frontier.

The supervisor does not implement, review or invent transitions. Gentle owns internal decomposition, verification/review timing, reviewer execution, correction and acknowledgement/burn.

## 5. Verify

Use deterministic evidence whenever possible:

- tests;
- typecheck/build;
- schema/YAML validation;
- changed-path-specific checks;
- secrets scan;
- profile/runtime conformance.

For Atenea itself:

```bash
node tools/check-opencode-runtime-policy.mjs
node tools/check-vnext-authority.mjs
```

## 6. Review

Follow native Gentle/provider transitions exactly.

Do not invent verdicts, START decisions, timing or authority.

Current compatibility seams:

- post-burn STATUS (#4771): `acknowledge-approved → authority=burned` is terminal; do not call selectorless STATUS merely to prove the burn again;
- exact OpenCode/Gentle versions and transport status live in `docs/vnext/CURRENT_COMPATIBILITY.md`, not in stable policy;
- Gentle 3.7 runtime detection uses the qualified version-neutral fast `opencode --version` shim; all non-version invocations delegate unchanged to the single real OpenCode binary;
- one-shot `opencode run` is not unattended-eligible while its clean-state `init` hang remains reproducible; fresh bounded `serve` hosts are the qualified normal transport;
- Gentle-managed OpenCode skills live in `~/.config/opencode/skills`; legacy `~/.agents/skills` is not active globally; project skills stay project-local;
- Context7 and Engram are installed but disabled by default for ordinary execution and enabled only when the task needs them;
- ordinary tickets use the runtime default model route without a selection ceremony; alternate routes remain explicit overrides/experiments. Never use `gentle-orchestrator` as a nested ticket parent beneath the Atenea supervisor.
Details: `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 7. Publish

Review approval is not merge authority.

Validate the actual changed artifact types.

Follow target repository policy + explicit human authority.

No automatic merge. No force-push/destructive recovery by default.

## 8. Dispose merged execution worktrees

Execution worktrees are temporary delivery surfaces. A successful merge is the normal trigger to evaluate disposal; it is not permission to delete blindly.

Before removing the worktree that carried the merged ticket/train, confirm:

- the intended PR/train is actually merged into the intended target branch;
- the final published/audited candidate and required CI/security/promotion evidence are durably represented in Git/GitHub or another accepted authority surface;
- the worktree has no uncommitted/untracked material that must survive and no required unpushed local-only commit/evidence;
- no active OpenCode/Gentle/supervisor/shell process or session still depends on that directory;
- the path is an execution worktree, not the canonical repository checkout.

Then use normal Git worktree removal and prune stale metadata:

```bash
git worktree remove <worktree-path>
git worktree prune
```

Do not use `--force` as routine cleanup. If normal removal refuses, inspect and reconcile the remaining state first. Local/remote branch deletion is separate Git hygiene and is not implied by worktree disposal.

The next ticket/train should normally start from current durable repository authority in a fresh clean worktree rather than reusing the merged execution surface.

## 9. Provision or reproduce the runtime

Use:

`docs/vnext/OPENCODE_SERVE_RUNTIME_RECIPE_20260927.md`

Use `docs/vnext/CURRENT_COMPATIBILITY.md` for temporary runtime/provider seams. The older `OPENCODE_ZERO_TOUCH_RUNTIME_RECIPE_20260927.md` is historical V1 evidence, not current installation authority.

## 10. Resume an old project

Durable Git/GitHub/product evidence determines the last legitimate checkpoint.

Create a clean worktree and continue from accepted authority through a fresh OpenCode process + Gentle lifecycle under the thin supervisor.

Current operation: `docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md`.

Historical V1 operational evidence remains in `docs/OPERATOR_RUNBOOK_OPENCODE_ZERO_TOUCH_V1.md`.
