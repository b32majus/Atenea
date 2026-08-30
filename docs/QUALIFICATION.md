# Atenea — Qualification Status

Date of current status: 2026-08-30

This document is the current status index for Atenea qualification. The Stage-specific files remain the frozen evidence for each experiment. Earlier forward-looking statements in older decision/history files must be interpreted against this current status.

## Overall result

Atenea has qualified the upstream-first execution architecture through autonomous frontier exhaustion.

```text
STAGES_0_4                         PASS
STAGE5_MATT_GENTLE_COMPOSITION    PASS
STAGE6_NATIVE_GENTLE_RDD          PASS
STAGE7_PI_SELF_LAUNCH             PASS
STAGE8_FRONTIER_DISCOVERY         PASS
UNATTENDED_EXECUTION              PASS
ZERO_HUMAN_TOUCH                  PASS
REMOTE_RECONCILIATION             PASS
FRONTIER_EXHAUSTION_STOP          PASS
```

The result is not a recommendation to build a larger Atenea runtime. It is evidence that the required behavior can be composed from upstream systems with a thin supervisory contract.

## Qualified ownership split

```text
Matt Pocock upstream skills
  interactive shaping / engineering methods

Pi
  trusted thin supervisor
  GitHub frontier discovery
  blocker / authority / runtime decisions
  worker supervision
  permission relay when required
  closure / reconciliation checks
  frontier rediscovery

Herdr
  process / session substrate

OpenCode
  implementation runtime

Gentle AI
  implementation lifecycle integration
  native RDD
  exact-candidate integrity
  reviewer lineage / authority
  bounded repair
  receipts / candidate mutation invalidation

Git / GitHub
  repository history
  branches / worktrees
  issues / dependencies
  remote checkpoints
  PR / merge policy

Atenea repo-local policy
  only the horizontal rules that upstream systems do not own
```

Pi is a supervisor, not a security boundary and not an implementation worker. Herdr is process infrastructure, not a policy engine.

## Stage 5 — Matt → Gentle/OpenCode composition — PASS

The qualified handoff showed that complete Matt project skills and complete Gentle/OpenCode can compose through durable repository/tracker authority without a custom work-unit schema or Agent Brief translation.

The minimal execution instruction remained effectively:

`Implement GitHub issue #N.`

Frozen evidence: `docs/STAGE5_TRACER_TRAIN.md`.

## Stage 6 — native Gentle RDD — PASS

Gentle AI `2.5.0-rc.2` native RDD was qualified as the review/candidate authority rather than reconstructed inside Atenea.

Qualified properties include the exact-candidate lifecycle, reviewer authority/lineage, bounded repair and invalidation of review evidence when the candidate changes.

Atenea must not duplicate those mechanisms.

## Stage 7 — Pi self-launch — PASS

Pi proved it can remain non-implementing while creating/managing the OpenCode + Gentle worker through Herdr and completing accepted work with no human running the worker lifecycle manually.

Canonical accepted Stage 7 checkpoint:

`79489688a6c6bd83ba8fd807cb87bdc0a59b94bf`

Frozen evidence: `docs/STAGE7_SELF_LAUNCH_CLOSURE.md`.

## Stage 8 — autonomous frontier discovery — PASS

The operator did not provide issue numbers. Pi scanned GitHub, classified the executable frontier, selected #18, respected #19 while blocked, completed #18, re-scanned, discovered #19 had become executable, completed #19, and stopped when no compatible frontier remained.

### Issue #18

```text
HEAD   1313b060ce8d22c3eac8bab5258c770af2dd08c0
TREE   8a79548c43d0acdaf426dcd7c8acfc801c9fe1f8
RDD    review-0d11fc95166af074
STATE  CLOSED
TESTS  131/131
```

### Issue #19

```text
HEAD   ad1bc950db3c03755ed1632bbf159b6c2f695a73
TREE   18687fcb7d9bfaac157c5ca33a0715ea5c996a6b
RDD    review-3248f7d4dbb7f3d4
STATE  CLOSED
TESTS  131/131
```

Final Stage 8 repository state:

```text
local HEAD == upstream == origin/stage8-frontier-discovery-20260830
HEAD = ad1bc950db3c03755ed1632bbf159b6c2f695a73
worktree clean
```

Frozen evidence: `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md`.

## GitHub authentication incident — resolved

The intermittent 401 failures were traced to stale `GH_TOKEN` / `GITHUB_TOKEN` values in the tmux global environment, which overrode the valid `gh` credential store.

The root fix was removal of those stale tmux-global variables. New panes were then verified clean and `gh auth status` succeeded.

Do not reintroduce `env -u GH_TOKEN -u GITHUB_TOKEN ...` wrappers or build an authentication shim unless new evidence demonstrates a new problem.

## Gentle Pi experiment — NOT QUALIFIED / rejected for current use

Gentle Pi `2.2.0` was tested as a possible Pi → Pi/Gentle-Pi execution replacement.

It did not complete the full unattended lifecycle reliably even after isolated-home bootstrapping. Observed failure classes included model-routing inheritance gaps, native RDD selection/integration gaps and package-private/global Gentle lifecycle incompatibilities.

Decision:

```text
GENTLE_PI_2_2_0_FOR_ATENEA_UNATTENDED_EXECUTION = NOT_QUALIFIED / FAIL
```

Current policy:

- Gentle Pi remains uninstalled;
- do not write adapters around it;
- do not reopen qualification until an upstream release materially changes the failed lifecycle surfaces;
- keep Pi → Herdr → OpenCode + Gentle as the accepted baseline.

## Current runtime baseline

At the 2026-08-30 canonical handoff:

- OpenCode `1.18.25`
- Gentle AI global `2.5.0-rc.2`
- Pi routing intact
- Gentle Pi absent

Model/provider/effort values are operational routing facts, not Atenea architecture.

## What is not yet field-qualified

These are not reasons to build new infrastructure. They are surfaces to exercise naturally on real projects when relevant:

### OpenSpec brownfield authoring

OpenSpec is the intended brownfield/evolutionary entry path, but it has not yet been qualified end-to-end inside Atenea.

Qualification should happen on a real existing-code change and should test the seam:

```text
existing repo authority
→ OpenSpec delta-first shaping
→ ready executable GitHub work
→ qualified Pi / Herdr / OpenCode / Gentle path
```

Do not use Atenea's own documentation reconciliation as the OpenSpec canary because that would make the test self-referential.

### Material UI/UX policy

The surviving #267 design policy still needs to be consolidated:

- Impeccable only for material UI/UX work;
- `DESIGN.md` as durable visual-system authority where warranted;
- `PRODUCT.md` derived from canonical product authority when a compatibility projection is required.

This is policy/configuration work, not a new execution lifecycle.

### Engineering-quality horizontal policy

The surviving #268 delta still needs to be incorporated into concise `CODING_STANDARDS.md`, relying on upstream `tdd`, `codebase-design`, `domain-modeling`, `diagnosing-bugs` and `code-review` rather than duplicating them.

### Repository-specific delivery policy

Real repositories may use PRs and human merge boundaries. The qualified runtime already supports normal push/reconciliation; PR creation and merge policy should be exercised according to each repository's actual workflow rather than through another synthetic qualification ladder.

## No further large qualification ladder

Do not create Stage 9/10/... simply to obtain ceremonial completeness.

New qualification is justified only when one of these is true:

1. a required property has no upstream owner;
2. a real field run exposes an unresolved seam;
3. a materially different upstream runtime replaces a previously failed/qualified lifecycle;
4. a new entry path such as OpenSpec needs a bounded compatibility test.

Otherwise proceed by real-project use and collect evidence there.

## Evidence precedence

When documentation conflicts:

1. exact repository / GitHub / runtime evidence;
2. current `README.md`, this file and `docs/ATENEA_HANDOFF_20260830.md`;
3. Stage-specific frozen evidence;
4. earlier decision files and forward-looking plans.

Historical documents are preserved because they explain how the architecture was reached; their old `NEXT`, `DEFERRED` or `NOT_YET_QUALIFIED` labels are not current status unless repeated here.
