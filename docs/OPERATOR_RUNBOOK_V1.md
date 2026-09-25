# Atenea Operator Runbook

Status: **CURRENT / EXECUTION-READY WORK**

This runbook starts after product/task authority is already accepted.

## 1. Enter safely

From a clean target worktree:

```bash
git status --short
grep -Fx '.atl/' .gitignore
```

If repository/task authority is unclear, stop and return to `docs/START_HERE.md`.

## 2. Select the execution profile, then give Pi the accepted work

Before writer authority, resolve composition and explicitly choose `native-balanced`, `native-v4-heavy` or eligibility-gated `native-economy` under `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md`. `native-nan` is rollback only. Keep the chosen profile stable through every active work-unit/review lineage; no quota-based auto-routing or silent fallback.

Use Gentle's native profile/pin surface so parallel repositories remain independent. A repository/local pin selects subagent routing only; if the intended orchestrator differs from the current session, select/verify it separately through Pi's native model surface. Then launch:

```bash
pi
```

Run `node tools/check-native-gentle-profile.mjs` for static store/snapshot conformance. When a pin is material, run it with `ATENEA_PROFILE_PIN_CWD=<worktree>` and `ATENEA_EXPECT_PROFILE=<profile>` to prove the native pin winner. For candidate first-use, material routing changes, profile-semantics runtime upgrades or routing incidents, launch one **read-only native child probe** and require matching `PI_PROVIDER`, `PI_MODEL`, `PI_REASONING_LEVEL`, correct `pwd` and zero probe mutation before the first writer edit. Then provide the bounded task/spec/work order and material constraints.

Do not paste a second Gentle state machine into the prompt.

Native Gentle owns ODD, delegation, verify and review lifecycle.

## 3. Let native workflow run

Expected shape when required:

```text
accepted work
→ ODD/classification
→ bounded worker(s)
→ verify/tests
→ work-unit commit
→ ASSESS / provider review decision
→ native reviewer lifecycle
→ acknowledge-approved
→ authority burned
```

Not every small task must exercise every stage. Follow native/provider output rather than manufacturing ceremony.

## 4. Known compatibility behavior

See `docs/vnext/CURRENT_COMPATIBILITY.md`.

Operationally:

- if ASSESS yields a typed `risk=unassessable` fail-closed plan, follow its requested verification path;
- do not synthesize START because ASSESS is unavailable;
- when `acknowledge-approved` reports `authority=burned`, review is terminal;
- do not require selectorless STATUS after burn;
- reviewer routing comes from the selected profile; the all-GLM `thinking=low` mitigation belongs only to `native-nan` rollback compatibility.

## 5. Deterministic verification

Run the target repository's real checks.

For Atenea itself:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-native-gentle-skills.mjs
node tools/check-vnext-authority.mjs
```

Before publication, validate the artifact types actually changed.

## 6. Persistent sessions

Herdr is allowed for session persistence and observability.

It does not grant:

- product authority;
- review consent;
- reviewer verdicts;
- merge authority.

A normal `herdr server` process is not legacy Atenea contamination.

## 7. Finish

A correct technical completion reports:

- what changed;
- deterministic verification;
- native review outcome when applicable;
- remaining findings/debt;
- whether publication happened.

Review approval does not imply push/PR/merge.

## 8. Dispose the merged execution worktree

After the corresponding PR/train is merged, evaluate the execution worktree for disposal. It is eligible only when the merged/promotion evidence is durable elsewhere, no required local-only commit or uncommitted/untracked artifact remains, no active process/session depends on the directory, and the path is not the canonical repository checkout.

Then remove it normally and prune metadata:

```bash
git worktree remove <worktree-path>
git worktree prune
```

Do not use `--force` for routine cleanup. If Git refuses normal removal, reconcile the remaining state first. Branch deletion is separate from worktree disposal.

Start subsequent work from refreshed durable authority in a fresh clean worktree rather than accumulating/reusing merged execution surfaces.

## 9. Do not do

Do not:

- start pi-intercom for review consent;
- load Atenea RDD relay;
- apply historical Gentle bridge patches;
- resurrect effective-mode;
- infer current authority from old sessions;
- rerun shaping on accepted work by ritual;
- create a second review lifecycle;
- auto-merge.
