# Atenea vNext — AGENTS candidate

Status: **P2 CANDIDATE — NOT CURRENT MAIN AUTHORITY**

Atenea is a thin upstream-first policy and conformance layer over native Pi / Gentle.

Do not build or reintroduce a second execution controller, worker supervisor, review lifecycle, routing engine or consent relay when native Gentle already owns the behavior.

## 1. Current operating model

Ownership is intentionally separated:

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ CODING_STANDARDS.md + repository policy

shaping, when genuinely needed
→ adopted Matt/OpenSpec workflow for that phase

HOW to explore/decompose/delegate/verify/review
→ native Gentle

deterministic facts
→ tests / validators / oracles / CI

publish / merge
→ target repository policy + human authority
```

## 2. Read before changing this repository

Read:

1. `README.md`
2. promoted vNext `START_HERE.md`
3. `CODING_STANDARDS.md`
4. current decisions / ADRs relevant to the task
5. the specific issue/work order/spec being executed

Historical stage documents are evidence, not forward-looking authority.

## 3. Stable invariants

- Upstream-first is operational, not rhetorical.
- Prefer supported upstream behavior and public interfaces.
- Do not copy or rebuild upstream lifecycle logic inside Atenea without a demonstrated unsupported seam.
- Keep changes scoped to the accepted task.
- Preserve one durable authority for each fact.
- Material ambiguity or contradictory authority => STOP rather than improvise.
- Machine-decidable invariants belong in deterministic tooling.
- Review approval is not merge authority.
- No automatic force-push, destructive history recovery or merge.
- Secrets/credentials never belong in repository config or logs.
- Historical evidence may remain without remaining active runtime.

## 4. Shaping lifecycle

Shaping is **phase-scoped**.

### When shaping is active

For genuinely unshaped greenfield/product work, adopted Matt Pocock skills may be used to produce accepted durable specs/tickets/work orders.

For brownfield work, preserve repository-native authority first. OpenSpec or repository-intelligence tooling is used only when it materially helps; never by ritual.

### When shaping is complete

Once accepted durable executable authority exists:

- do not regenerate specs/tickets by default;
- do not re-run Matt/OpenSpec merely because older instructions describe the original shaping method;
- execute the accepted authority through native Gentle.

Reopening product shaping requires a real product/authority reason, not runtime convenience.

The exact long-term Matt/OpenSpec policy remains a Phase 3 vNext decision.

## 5. Native Gentle execution

Atenea does not own:

- ODD classification;
- internal task decomposition;
- worker delegation;
- allowed-edit enforcement;
- verification lifecycle;
- work-unit commits;
- RDD;
- reviewer/refuter/validator execution;
- native review consent;
- correction lifecycle;
- acknowledgement/burn.

Use the supported native Gentle surfaces and follow provider-issued transitions.

Do not reconstruct Gentle review state or transitions in prompt prose or shell glue.

## 6. Model and effort routing

Use Gentle's native model/profile configuration.

Atenea may version a secret-free desired-state profile for reproducibility, but does not implement routing.

Current qualified compatibility profile:

`config/native-gentle/native-nan.profile.json`

Reviewer `thinking=low` is a temporary compatibility mitigation for the documented NaN reasoning-only stream truncation issue. It is not a generic statement that low reasoning is always preferable.

## 7. Known temporary compatibility seam

Committed-range `gentle_review assess` remains affected by the open upstream schema/projection defect tracked by Gentle Shell #1175 / Atenea #90.

If that specific defect is encountered:

- fail closed;
- do not synthesize START;
- do not recreate `review_due` in Atenea;
- use only the smallest accepted reversible compatibility seam where explicitly authorized.

Delete the compatibility seam once stock upstream passes its bounded regression.

## 8. Deterministic evidence

Prefer deterministic evidence whenever the question can be proven mechanically.

Examples:

- repository clean state;
- changed-path classification;
- tests;
- typecheck/build;
- schema/YAML validation;
- secrets scan;
- runtime/version/profile conformance;
- publication credential capability.

Deterministic oracles produce evidence. They do not replace Gentle review authority.

## 9. Work-unit composition

Prefer small coherent reviewable work units.

Do not code-golf or delete useful tests/docs/comments to fit a numeric budget.

When a change is clearly oversized, compose coherent slices before implementation when practical.

Planning size is not review timing: native Gentle/provider owns `review_due`.

## 10. Publication

Before publication, validate the actual changed artifact types.

Normal non-force push may be allowed by target repository policy.

No automatic merge.

High-risk promotion may request an independent read-only promotion audit, but that audit is not a second RDD lifecycle.

## 11. Repository entry

When entering/resuming a repository:

- find current Git/GitHub/product authority first;
- inventory old harness/tooling read-only;
- classify signals as current / compatibility-required / historical / stale-or-unknown;
- do not delete or reactivate old tooling by assumption;
- create a clean isolated execution surface when old sessions/worktrees are stale.

## 12. Operator recovery path during vNext migration

While the VPS production HOME still carries historical Atenea state, use the qualified isolated launcher:

```text
gentle-native
```

This is a migration/recovery isolation mechanism, not the intended permanent Atenea architecture.

Long-term target: ordinary clean supported Pi/Gentle HOME + native profile + versioned Atenea policy/conformance.

## 13. Agent skills / repo setup

The currently adopted Matt Pocock skills remain unchanged pending Phase 3.

Do not delete, fork or partially rewrite them during P2.

Any generated skill index/setup block should remain clearly separable from Atenea's stable policy so that upstream setup can update it without rewriting repository authority.
