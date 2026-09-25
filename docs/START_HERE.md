# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current runtime baseline — read this first

```text
CURRENT_AUTHORITY = main
RUNTIME_QUALIFIED = 2026-09-23
ROUTING_CHANGED   = 2026-09-24
PROFILE_CATALOG   = 2026-09-25
P0_TO_P7          = PASS
Pi                = 0.87.1
gentle-pi         = 3.7.0
Gentle AI         = 3.7.0
Engram            = 2.1.0
GGA               = 2.10.1
providers         = NaN + OpenAI Codex
global active profile = native-balanced
selectable profiles    = native-balanced | native-v4-heavy | native-economy (experimental)
rollback profile       = native-nan
routing status         = explicit per-ticket/train preflight choice
normal entry      = pi
Atenea runtime controllers = 0
```

The runtime versions above are the latest qualified Atenea baseline. `native-balanced` remains the global HOME baseline. Planned tickets/trains must explicitly select `native-balanced`, `native-v4-heavy` or eligibility-gated `native-economy` before writer authority under `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md`; a repository/local Gentle pin may override the **subagent routing** without affecting parallel repositories; it does not move the session orchestrator. `native-v4-heavy` is a positive-field-canary candidate after PROMueve Nexus F3.2/#403; it is still not the global default or globally quality-equivalent. `native-economy` is experimental after a positive but not globally quality-equivalent Symphonia canary. `native-nan` remains rollback only, not a normal route. Historical Stage files, old run recipes, old profiles and `historical/` remain provenance only and do not override this baseline.

If you need to rebuild the runtime, use `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`. If you need provider/runtime exceptions, use `docs/vnext/CURRENT_COMPATIBILITY.md`.

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
→ execution profile selected and resolved natively
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
- the ticket/train execution profile is explicitly selected under `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md`; the native store envelope and any material pin resolution are reconciled before writer authority, and candidate/changed/incident routing has a matching real read-only child probe when the policy requires it;
- `.atl/` is already in repo-local `.gitignore`;
- unrelated untracked runtime artifacts are absent;
- no push/PR/merge authority is assumed.

## 4. Execute

Normal qualified entry point:

```bash
pi
```

Native Gentle owns:

- ODD/exploration;
- decomposition;
- bounded workers;
- allowed-edit enforcement;
- verification;
- work-unit commits;
- RDD/risk/review timing;
- reviewers/refuter/validator;
- native consent;
- correction lifecycle;
- acknowledgement/burn.

Atenea adds policy and evidence, not a second controller.

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
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
```

## 6. Review

Follow native Gentle/provider transitions exactly.

Do not invent verdicts, START decisions, timing or authority.

Current compatibility seams:

- committed-range ASSESS (#4791): if native ASSESS returns a typed `risk=unassessable` fail-closed plan, follow its verifier path rather than synthesizing START;
- post-burn STATUS (#4771): `acknowledge-approved → authority=burned` is terminal; do not call selectorless STATUS merely to prove the burn again;
- reviewer model/reasoning selection comes from the explicitly selected native profile; `native-balanced`, `native-v4-heavy` and `native-economy` preserve Luna/Sol reviewer diversity, while the all-GLM/low mapping remains only in the `native-nan` rollback profile.
- Gentle skill ownership follows `config/native-gentle/pi-skill-policy.json`: Pi suppresses nine safe shared duplicates, while `issue-creation` and `work-unit-commits` remain intentionally dual-visible pending upstream reconciliation.
- Gentle Shell #962: run with `GENTLE_PI_NO_SKILL_REGISTRY=1` so skills stay available while the crash-prone recursive registry watcher is disabled.

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
- no active Pi/Gentle/Herdr/shell process or session still depends on that directory;
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

`docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`

Do not reconstruct installation from historical Stage/run-recipe documents.

## 10. Resume an old project

Durable Git/GitHub/product evidence determines the last legitimate checkpoint.

Create a clean worktree/session and continue from accepted authority through native Gentle.

Operational handoff:

`docs/vnext/PROJECT_EXECUTION_HANDOFF_NATIVE_GENTLE.md`
