# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

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
- reviewer `thinking=low` is a temporary NaN/Pi compatibility mitigation.

Details: `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 7. Publish

Review approval is not merge authority.

Validate the actual changed artifact types.

Follow target repository policy + explicit human authority.

No automatic merge. No force-push/destructive recovery by default.

## 8. Provision or reproduce the runtime

Use:

`docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260922.md`

Do not reconstruct installation from historical Stage/run-recipe documents.

## 9. Resume an old project

Durable Git/GitHub/product evidence determines the last legitimate checkpoint.

Create a clean worktree/session and continue from accepted authority through native Gentle.

Operational handoff:

`docs/vnext/PROJECT_EXECUTION_HANDOFF_NATIVE_GENTLE.md`
