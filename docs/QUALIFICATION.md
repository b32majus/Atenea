# Atenea — Qualification Status

Date of current status: 2026-08-30

This document is the current qualification index. Stage-specific files remain frozen evidence. Earlier `NEXT`, `DEFERRED` or `NOT_YET_QUALIFIED` labels are historical when they conflict with this file, `README.md`, `docs/CURRENT_DECISIONS.md` or `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

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

The result is evidence for a thin supervisory contract, not a recommendation to build a larger Atenea runtime.

## Qualified ownership split

```text
Matt Pocock upstream skills
  qualified greenfield shaping / engineering methods

Pi
  qualified thin autonomous supervisor

Herdr
  qualified process/session substrate

OpenCode
  qualified implementation runtime

Gentle AI
  qualified native RDD / exact-candidate / reviewer / bounded-repair authority

Git / GitHub
  repository/tracker/publication authority

Atenea repo-local policy
  Harness Contract v1 + CODING_STANDARDS.md + repo-specific config only
```

Pi is not an implementation worker or security sandbox. Herdr is not a policy engine.

## Stage 5 — Matt → Gentle/OpenCode composition — PASS

Complete Matt project skills and complete Gentle/OpenCode compose through durable repository/tracker authority without a custom work-unit schema or Agent Brief translation.

The execution instruction remained effectively:

`Implement GitHub issue #N.`

Frozen evidence: `docs/STAGE5_TRACER_TRAIN.md`.

## Stage 6 — native Gentle RDD — PASS

Gentle AI `2.5.0-rc.2` native RDD is the qualified final candidate/review authority.

Qualified properties include exact-candidate lifecycle, reviewer authority/lineage, bounded repair and invalidation when the candidate changes.

Atenea must not recreate them.

## Stage 7 — Pi self-launch — PASS

Pi remained non-implementing while creating/managing the OpenCode + Gentle worker through Herdr and completing accepted work without a human manually running the worker lifecycle.

Canonical accepted Stage 7 checkpoint:

`79489688a6c6bd83ba8fd807cb87bdc0a59b94bf`

Frozen evidence: `docs/STAGE7_SELF_LAUNCH_CLOSURE.md`.

## Stage 8 — autonomous frontier discovery — PASS

The operator supplied no issue numbers. Pi discovered the GitHub frontier, selected #18, respected #19 while blocked, completed #18, rediscovered #19 as executable, completed it and stopped when the compatible frontier was exhausted.

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

Final Stage 8 state:

```text
local HEAD == upstream == origin/stage8-frontier-discovery-20260830
HEAD = ad1bc950db3c03755ed1632bbf159b6c2f695a73
worktree clean
```

Frozen evidence: `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md`.

## GitHub authentication incident — resolved

Intermittent 401 failures were traced to stale `GH_TOKEN` / `GITHUB_TOKEN` values in tmux's global environment overriding valid `gh` credentials.

The root fix was removing those stale variables. New panes were verified clean and `gh auth status` succeeded.

Do not reintroduce `env -u GH_TOKEN -u GITHUB_TOKEN ...` wrappers or an authentication shim without new evidence.

## Gentle Pi — NOT QUALIFIED / rejected for current use

Gentle Pi `2.2.0` did not complete the full unattended lifecycle reliably even after isolated-home bootstrapping.

```text
GENTLE_PI_2_2_0_FOR_ATENEA_UNATTENDED_EXECUTION = NOT_QUALIFIED / FAIL
```

Policy:

- remain uninstalled;
- no adapters around it;
- re-evaluate only after a materially changed upstream release;
- keep Pi → Herdr → OpenCode + Gentle as the accepted baseline.

## Current runtime baseline

At the 2026-08-30 canonical handoff:

- OpenCode `1.18.25`
- Gentle AI global `2.5.0-rc.2`
- Pi routing intact
- Gentle Pi absent

Model/provider/effort values are operational routing facts, not Atenea architecture.

## Policy consolidation — COMPLETE

KairOS #267/#268 were reconciled against the complete current upstream stack.

### Engineering quality

`CODING_STANDARDS.md` now owns only the horizontal repo-specific delta that upstream methods do not already own.

Composition:

```text
CODING_STANDARDS.md
+ upstream tdd
+ upstream codebase-design
+ upstream domain-modeling
+ upstream diagnosing-bugs
+ upstream code-review when useful
+ justified deterministic tooling
+ Gentle final exact-candidate RDD authority
```

No custom Clean Code framework, quality agent or new lifecycle phase is required.

### Material UI/UX

Harness Contract v1 now defines the surviving #267 policy:

- Impeccable only for material UI/UX;
- applicability decided during human-present shaping before `EXECUTION_READY`;
- `DESIGN.md` may own durable visual-system decisions where warranted;
- `PRODUCT.md` is a derived compatibility projection when canonical product authority lives elsewhere;
- no universal Atenea UX framework or PRODUCT generator.

These are policy decisions. Natural field use may still provide evidence, but no runtime qualification is blocked on them.

## What is not yet field-qualified

### OpenSpec brownfield authoring

OpenSpec is the intended brownfield/evolutionary on-ramp, but has not yet completed an end-to-end Atenea field run.

The bounded test is:

```text
existing repo/product authority
→ OpenSpec delta-first shaping
→ executable GitHub work
→ human EXECUTION_READY promotion
→ qualified Pi / Herdr / OpenCode / Gentle path
```

PASS requires no custom OpenSpec→Gentle translation layer.

Use a real bounded brownfield code change, not Atenea's own maintenance.

### Repository-specific delivery variants

Real repositories may end work at an exact remote checkpoint or open a PR awaiting human merge. The core runtime already qualifies normal push/reconciliation; each repository's actual PR/merge policy should be exercised in normal field use.

### Naturally material UI slices

The policy is complete, but the first naturally material UI slice can provide field evidence that Impeccable/DESIGN/PRODUCT authority composes cleanly with the existing runtime. Do not create a synthetic UI ladder solely for this.

## No further large qualification ladder

Do not create Stage 9/10/... for ceremonial completeness.

New bounded qualification is justified only when:

1. a required property has no upstream owner;
2. a real field run exposes an unresolved seam;
3. a materially different upstream runtime replaces a failed/qualified lifecycle; or
4. a new entry path such as OpenSpec needs a compatibility test.

Otherwise use real projects and capture compact evidence.

## Evidence precedence

When documentation conflicts:

1. exact repository / GitHub / runtime evidence;
2. `docs/ATENEA_HARNESS_CONTRACT_V1.md`, current `README.md`, this file and `docs/CURRENT_DECISIONS.md`;
3. `docs/ATENEA_HANDOFF_20260830.md` and Stage-specific frozen evidence;
4. earlier decision files and forward-looking plans.
