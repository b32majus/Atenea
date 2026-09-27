# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current runtime baseline — read this first

```text
CURRENT_AUTHORITY = main
RUNTIME_QUALIFIED = 2026-09-27
OpenCode          = 1.18.10 (V1 pinned)
Gentle AI         = 3.7.0
Engram            = 2.1.0 installed capability; OFF by default in OpenCode
Context7          = installed capability; OFF by default in OpenCode
provider baseline = NaN
default interactive/lifecycle host model = GLM 5.3 Flash
nontrivial writer route = FIELD_QUALIFICATION_REQUIRED (C-071)
normal topology   = thin deterministic supervisor → fresh OpenCode per ticket → Gentle lifecycle
Atenea train supervisors = 1 thin deterministic supervisor
Atenea review controllers = 0
Pi / Gentle Pi    = installed rollback/alternate surface, not normal productive train entry
OpenCode V2 2.0.18 = BLOCKED pending Gentle immutable-review transport parity
```

The topology above is the latest qualified Atenea baseline. The Pi-era profile catalog remains provenance/rollback evidence and does not silently become OpenCode routing authority. C-071 deliberately leaves the nontrivial writer route open after the real T8 replay exposed excessive GLM design rumination; resolve that route with focused evidence rather than rebuilding long-lived parent sessions. Each ticket starts with fresh model context, while Git/GitHub/product authority and Gentle's durable review transaction provide continuity. Historical Stage files, old run recipes, old profiles and `historical/` remain provenance only.

If you need to rebuild the runtime, use `docs/vnext/OPENCODE_ZERO_TOUCH_RUNTIME_RECIPE_20260927.md`. If you need provider/runtime exceptions, use `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 1. Is the work already shaped?

### No — product/shaping work is open

Read existing repository authority first.

Classify the situation only as much as needed:

- greenfield;
- small brownfield;
- large brownfield;
- mixed-corpus brownfield.

Use the smallest adopted shaping workflow that materially improves the work.

Current P3 policy:

- Matt skills are optional discovery/shaping;
- OpenSpec is optional native SDD;
- neither is a mandatory prelude.

Produce durable executable authority:

- accepted spec/proposal when needed;
- tickets/work orders;
- acceptance criteria;
- constraints and non-goals;
- required architectural/domain decisions.

Once that authority is accepted, stop shaping and execute it.

### Yes — executable authority exists

Do **not** rerun shaping by ritual.

Accepted product scope is not, by itself, writer-ready. For every substantial Work Order, resolve delivery composition **before any writer edits code** under `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`.

```text
product scope accepted
→ composition forecast
→ delivery composition resolved
→ OpenCode runtime/model route explicitly resolved
→ writer authority
```

If material over-budget risk is forecast, define the semantic work-unit chain or the required size-exception decision before writing. If no honest path is resolved, STOP before implementation. A capability-sized Work Order may remain one issue; work units are delivery/review units, not necessarily issue-tracker units.

This is an execution-readiness gate, not another shaping phase and not an Atenea scheduler. Native Gentle still owns ODD, internal decomposition, workers and `review_due`. Numerical planning thresholds live only in `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`; consumers reference that policy rather than copying its numbers.

Reconcile current Git/GitHub/product state and start from the accepted task.

## 2. Reconcile repository entry

Before changing tools or code:

1. identify the live branch/PR/checkpoint;
2. read `AGENTS.md`, `CODING_STANDARDS.md`, relevant ADR/spec/ticket authority;
3. inventory old Atenea/Pi/Gentle/Herdr signals read-only;
4. classify them as current / compatibility-required / historical / stale-or-unknown;
5. STOP on unresolved material authority conflict.

Do not clean a brownfield repository merely because old tooling exists.

Do not resume stale Pi/session state merely because it exists.

## 3. Prepare the execution surface

Use a clean isolated worktree/session when prior worktrees or sessions are stale.

Before candidate work:

- repository state is understood;
- task authority is explicit;
- for substantial work, delivery composition is resolved under `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` before writer authority;
- the OpenCode runtime/model route is explicitly resolved before writer authority; nontrivial writer routes not yet promoted by C-071 require a focused real-work canary rather than inherited Pi-profile assumptions;
- `.atl/` is already in repo-local `.gitignore`;
- unrelated untracked runtime artifacts are absent;
- no push/PR/merge authority is assumed.

## 4. Execute

Normal qualified topology:

```text
thin deterministic supervisor
→ fresh OpenCode 1.18.10 process for the bounded ticket/phase
→ deterministic project verification
→ Gentle AI 3.7 review / correction / acknowledgement-burn
→ durable checkpoint
→ fresh OpenCode for the next compatible ticket or STOP
```

The supervisor does not implement, review or invent transitions. It owns only train frontier, process lifecycle, exact already-authorized consent transport, checkpoint reconciliation and next/STOP. Gentle owns risk/review timing, reviewer execution, correction and acknowledgement/burn. No long-lived model parent, manual `/compact`, `/reload` or standing review-session permission belongs in the normal path.

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
- OpenCode is pinned to V1 `1.18.10`; V2 `2.0.18` remains fail-closed until Gentle immutable-review transport parity is demonstrated;
- Gentle 3.7's OpenCode runtime probe has a 3-second version bound; the qualified wrapper answers only exact `--version`/`-v` immediately and delegates every other invocation to the real pinned binary;
- Gentle-managed OpenCode skills live in `~/.config/opencode/skills`; legacy `~/.agents/skills` is not active globally; project skills stay project-local;
- Context7 and Engram are installed but disabled by default for ordinary execution and enabled only when the task needs them;
- nontrivial writer-model routing remains under C-071 field qualification; do not use `gentle-orchestrator` as a nested ticket parent beneath the Atenea supervisor.
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

`docs/vnext/OPENCODE_ZERO_TOUCH_RUNTIME_RECIPE_20260927.md`

Do not reconstruct installation from historical Stage/run-recipe documents.

## 10. Resume an old project

Durable Git/GitHub/product evidence determines the last legitimate checkpoint.

Create a clean worktree and continue from accepted authority through a fresh OpenCode process + Gentle lifecycle under the thin supervisor.

Operational handoff:

`docs/OPERATOR_RUNBOOK_OPENCODE_ZERO_TOUCH_V1.md`
