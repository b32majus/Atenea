# Atenea — Work-unit composition policy v1

Status: **CURRENT EXECUTION POLICY**
Date: 2026-09-24

## 1. Purpose

Atenea is upstream-first. Gentle Shell / ODD owns internal task decomposition, work-unit commits, delivery strategy and native review timing. Atenea does **not** implement its own slicer or line-count scheduler.

This policy exists for one narrow reason: prevent the persistent parent from allowing a clearly oversized implementation unit to form and only discovering the composition problem after the candidate has already been committed and frozen for review.

The rule is:

```text
forecast composition before implementation
→ build coherent work units
→ verify + commit each work unit
→ native ASSESS after each substantial/delegated work-unit commit
→ provider owns review_due / next_transition
```

Planning size and native review timing are separate concerns.

## 2. Upstream provenance and operational authority

The original upstream evidence used to adopt this policy was pinned Gentle AI v3.4.0, which established all of the following at qualification time:

- `internal/assets/skills/work-unit-commits/SKILL.md`
  - work-unit commits represent coherent deliverable behavior/fixes/migrations/docs units;
  - if SDD forecasts a change above 400 authored changed lines, group work into chained/stacked slices **before implementation**;
  - the default review budget is 400, unless the session supplies `review_budget_lines`;
  - the budget is not code-golf: never delete tests/docs/comments or compress code merely to fit it;
  - if one honest slicing pass still cannot produce a cohesive unit under budget, report the smallest honest unit and recommend `size:exception`.

- `internal/assets/skills/sdd-apply/SKILL.md`
  - an over-budget forecast requires a resolved delivery decision before writing;
  - `auto-chain` / chosen chain modes implement only the assigned slice;
  - `single-pr` over budget requires explicit `size:exception`;
  - a cohesive unit that honestly cannot fit the budget may be implemented and reported as an exception rather than repeatedly shrunk.

- `internal/reviewtransaction/risk.go`
  - `LargeChangeLines = 400` is a **review-composition boundary, not a risk-tier input**.

- `internal/cli/review_assess.go`
  - `high` risk is immediately review-due regardless of size;
  - `medium` becomes review-due when the accumulated assessed range reaches the 400-line composition boundary;
  - therefore 400 is **not** a hard maximum size that the reviewer can never exceed.

Atenea MUST NOT reinterpret the planning budget as a model-capacity limit or as an Atenea-owned `review_due` rule.

This document is the **single Atenea operational authority for default numeric composition thresholds/bands**. Other Atenea docs and consuming repositories should reference this policy rather than copy its numbers. Historical decision records may preserve provenance, but they are not a second live numeric source. An explicit project/session `review_budget_lines` or stronger authority still supersedes the defaults as defined below.

## 3. Atenea default planning heuristic

When an explicit upstream/session `review_budget_lines` exists, that value is authoritative for planning and the default numeric heuristic below does not replace it.

When no explicit session budget exists, Gentle's default 400 authored changed lines is the planning baseline.

Atenea uses the following **operator heuristic**, informed by current upstream semantics plus observed Gentleman practice. It is deliberately not described as an upstream hard contract:

| Forecast / actual authored change | Atenea interpretation |
|---|---|
| `<= 400` | Normal target. Prefer one coherent work unit. |
| `401–600` | Soft overage. Atenea does not force another split solely for size when the unit remains clearly coherent/reviewable and splitting would make the story worse. Record the rationale and still obey the active upstream delivery strategy; if that strategy requires `size:exception`, it remains required. |
| `601–800` | Exception band. Before implementation, require an explicit durable composition decision / `size:exception` rationale explaining why semantic or functional coherence outweighs another split. |
| `> 800` | Not an ordinary work unit under the default budget. Default action is STOP before implementation and reslice. Proceed only with explicit human-authorized indivisibility/size exception and a reviewability rationale. |

These ranges are a conservative Atenea operating heuristic, not claims that Gentle or any model has a 600/800-line technical ceiling.

Generated files/goldens follow upstream counting semantics; do not manipulate authored line counts to game the budget.

## 4. Pre-implementation workload gate

Before launching a writer for every substantial Work Order, the parent must inspect the available workload forecast/task shape. **Product scope accepted is not equivalent to delivery composition resolved.** This gate applies whether the accepted authority came from SDD, ODD-directed planning, a GitHub Work Order or another valid shaping path.

```text
substantial implementation selected
→ read Review Workload Forecast / task decomposition when present
→ estimate authored change for the intended coherent unit
→ resolve composition before writing if over-budget risk is material
```

Required outcomes:

1. **Normal bounded unit** — implement it.
2. **Chained/sliced delivery** — define coherent work-unit boundaries first, then implement only the current unit.
3. **Size exception** — record the accepted semantic/functional reason before implementation.
4. **No resolved path for a clearly oversized forecast** — STOP before writing.

Atenea MUST NOT:
- split by arbitrary file count or line count alone;
- separate tests from the behavior they verify merely to lower the number;
- turn layers such as models/services/tests into unrelated commits when no unit works independently;
- require repeated slicing passes after one honest coherent decomposition;
- use these planning bands to synthesize native review timing.

## 5. Per-work-unit execution

For each coherent substantial/delegated work unit:

```text
materialize only that unit
→ deterministic verification for that unit
→ commit the unit
→ gentle_review ASSESS on the exact committed candidate
→ obey review_due / review_due_reason
→ if due: wrapper/provider continuation → STATUS → exact native transition
→ if not due: no START
→ continue to the next already-authorized unit
```

External-ticket completion is never itself a review trigger.

The native review candidate is the work-unit commit or the provider-owned accumulated PR slice against the prior reviewed boundary. It is never the whole feature branch merely because the external ticket is finished.

## 6. Unexpected overage discovered during implementation

If a unit honestly grows beyond forecast:

- do not code-golf;
- do not delete tests/docs/comments to fit;
- finish only the smallest coherent state necessary to preserve correctness;
- report the actual authored size;
- reconcile whether the unit should remain a documented size exception or whether unpublished delivery history should be recomposed;
- do not automatically subdivide again without operator review once one honest slicing pass has already been made.

If the candidate has already entered native review and repeatedly hits a deterministic material-review boundary, preserve its lineage/evidence and STOP rather than retry-looping.

When the evidence points to an oversized/coarse candidate, do **not** use any of these as the first repair:

- repeated identical reviewer retries;
- reviewer output-budget inflation;
- disabling review mode;
- serial routing experiments across models/efforts;
- RESET/RECOVER solely to escape the frozen candidate.

Those may diagnose a separate runtime defect, but they do not repair delivery composition. Reconcile the candidate/work-unit shape first.

## 7. Recovery of an oversized unpublished local candidate

When a **local, unpublished** implementation is accepted as product content but its delivery history is too coarse for reliable review, Atenea may repair the delivery shape without redesigning the product.

This is an exceptional recovery path, not the normal workflow.

Required sequence:

1. Freeze the accepted pre-rewrite product tree as an immutable oracle:
   - exact base commit;
   - current local commits;
   - final tree identity;
   - durable local backup ref and/or external patch/tree evidence.
2. Restore any temporary repo-local routing experiment unless the operator explicitly keeps it. Never mutate the shared routing profile by implication.
3. Re-enter fresh provider STATUS for the exact blocked lineage and verify:
   - same lineage;
   - still reviewing;
   - no candidate drift.
4. ABANDON only the exact frozen lineage when:
   - the operator explicitly authorizes it; and
   - the provider/facade permits that lifecycle transition.
   Do not substitute RESET or RECOVER.
5. Rewrite **only unpublished local history** from the preserved base.
6. Reconstruct the accepted bytes into coherent work units. No refactor, simplification, feature expansion or semantic rewrite is allowed merely to obtain smaller units.
7. For every reconstructed unit: verify → commit → ASSESS → follow provider-owned lifecycle exactly.
8. If a reconstructed unit reproduces the same deterministic material-review boundary, STOP and report its authored size plus materialized reviewer-prompt size. Do not recursively subdivide without operator review.
9. After the final reconstructed unit, prove the resulting product tree/files are byte-equivalent to the preserved oracle **at the reconstruction checkpoint**. This proves that reslicing did not redesign the accepted product content.
10. If a byte in that oracle is later proven defective by accepted specification, syntactic validation, deterministic tests, buildability or delivery validity, preserve the equivalence evidence and repair the defect as a separate bounded correction under current authority. The oracle does not outrank a proven defect.
11. Publication/merge remains governed by repository authority; history repair does not create publication authority.

Never use this recovery pattern on already-published shared history without separate destructive-history authorization.

### Oracle precedence

The preserved tree is an **intended-content/drift oracle**, not final product authority.

```text
accepted spec / acceptance
+ syntactic validity
+ deterministic tests
+ buildability
+ delivery validity
> preservation of a proven defective byte
```

Do not silently mutate suspected defects while reconstructing history. First establish faithful reconstruction evidence where practical; then repair proven defects in their own auditable unit. Conversely, never preserve a proven defect indefinitely merely to maintain byte equality.

## 8. Relationship to reviewer/model routing

Composition failures and routing failures are different layers.

A large/coarse work unit can amplify reviewer context and reasoning cost, but:

- `high` thinking is not itself prohibited by Gentle;
- 400 is not a hard reviewer-capacity ceiling;
- changing model or reasoning effort is not the first substitute for correct work-unit composition;
- a routing change still requires role-specific evidence.

Atenea should first keep work units reviewable by construction, then diagnose genuine provider/model failures on correctly bounded candidates.

## 9. Authority hierarchy

```text
explicit project/session review_budget_lines
  > current upstream Gentle delivery/composition semantics
  > accepted project/task size-exception decision
  > Atenea default 400 / soft-600 / exception-600–800 heuristic
```

The heuristic disappears whenever stronger authority supplies a different budget or delivery decision.
