# Atenea Harness Contract v1

Date: 2026-09-01
Status: NORMATIVE

## 1. Purpose

Atenea is a contract over upstream engineering tools, not an orchestration product.

Its purpose is to take already-shaped work from durable repository/tracker authority and execute it autonomously with the smallest possible repo-local policy layer.

Atenea MUST prefer supported upstream capabilities before adding glue.

## 2. Ownership map

```text
Matt Pocock upstream skills
  greenfield shaping and task-triggered engineering methods

OpenSpec
  optional delta-first brownfield/evolutionary shaping path
  field qualification pending

Impeccable
  conditional material UI/UX shaping and design-quality methods

Pi
  autonomous supervision and GitHub frontier discovery

Herdr
  process/session substrate

OpenCode
  implementation runtime

Gentle AI
  exact candidate integrity, native RDD, reviewer authority/lineage,
  bounded correction, provider-issued continuation/re-entry,
  acknowledgement/burn, recovery and mutation invalidation

Git / GitHub
  repository history, branches/worktrees, issues/dependencies,
  remote checkpoints, PRs and merge policy

Atenea repo-local policy
  only horizontal authority, readiness, quality, design-activation,
  publication and STOP rules that upstream systems do not own
```

Pi is not an implementation worker or security boundary. Herdr is not a policy engine. Atenea MUST NOT duplicate Gentle candidate/RDD machinery.

## 3. The autonomy boundary

```text
BEFORE EXECUTION_READY
= manual + interactive + repo-native shaping

FROM EXECUTION_READY
= autonomous bounded execution
```

Product decisions, unresolved material ambiguity and shaping questions belong before `EXECUTION_READY`.

Promotion to `EXECUTION_READY` is an explicit human authority transition. Atenea MUST NOT automate the design conversation merely to make a ticket executable.

## 4. Authoring entry paths

### 4.1 Greenfield

Use the complete Matt Pocock upstream workflow and repo setup semantics.

The durable output must be executable from repository/tracker authority without requiring the original shaping conversation.

Matt-generated work does not require an Atenea-specific Agent Brief or custom work-unit translation.

### 4.2 Brownfield / evolutionary change

Preserve accepted repo-native shaping and product authority.

OpenSpec is an **optional** delta-first shaping/specification path when it materially improves a new brownfield change. It is not a mandatory migration and Atenea MUST NOT reverse-document an established repository merely to satisfy a universal workflow.

If OpenSpec is selected, use it delta-first: describe the behavior being added, modified or removed rather than reverse-documenting the whole existing product before every change.

OpenSpec does not replace Pi supervision, OpenCode/Gentle execution, Gentle RDD or Git/GitHub authority.

Status: architecturally compatible; natural end-to-end Atenea field evidence pending.

### 4.3 Raw incoming issues

Matt triage remains available for issues that were not created by an accepted shaping path and are not yet executable.

Do not route already-shaped tickets through triage, OpenSpec or any other authoring method by ritual.

## 5. Readiness and authority

A work item may enter autonomous execution only when current repository/tracker authority is sufficient to determine:

- required behavior/change;
- canonical authority;
- relevant dependencies/blockers;
- falsifiable acceptance/evidence;
- scope and ownership boundaries with adjacent work;
- repository-specific delivery boundary.

Material ambiguity, contradictory authority, unresolved human product decisions or incompatible runtime assumptions mean NOT READY.

Atenea MUST fail closed rather than silently redesign product semantics during execution.

### 5.1 Authority-resolution boundary

During autonomous execution, Pi MUST resolve execution authority only from:

1. the target repository's current declared repository/tracker authority;
2. current Atenea authority explicitly referenced by that repository; and
3. upstream tools explicitly owned by the current Atenea contract.

Pi MUST NOT search sibling repositories, historical worktrees, session or mission history, archived harness documentation, or superseded KairOS/Post-SAS surfaces for alternative execution machinery.

Historical KairOS Ticket Driver, Builder/Primary/Repair role flows, `POST_SAS_*` workflows, `kairos_run_issue`, KairOS Front Door and equivalent custom execute-Issue launchers are non-authoritative for Atenea execution and MUST NOT be invoked.

If current declared authority is insufficient to determine the authorized execution path, Pi MUST STOP. It MUST NOT recover execution authority from host archaeology.

## 6. Repository isolation

Do not appropriate, reset, clean or overwrite an unexpected dirty checkout in order to begin work.

Real work should use a clean dedicated branch/worktree when isolation is needed by repository policy, parallel work or safety. Prefer standard Git and native Herdr/Git worktree primitives over a custom topology layer.

An unexpected topology or dirty-state contradiction is a STOP condition, not authorization for destructive cleanup.

## 7. Frontier discovery and supervision

Pi is the trusted thin supervisor in the currently qualified architecture.

For each autonomous iteration Pi should:

1. inspect current GitHub/repository authority;
2. discover the executable frontier rather than depend on a hand-maintained queue;
3. reject blocked, contradictory or incompatible work;
4. select one eligible work item;
5. create/supervise the implementation worker through Herdr;
6. remain non-implementing;
7. relay allowed runtime permission prompts when required;
8. verify accepted closure/reconciliation evidence;
9. rediscover the frontier after each accepted checkpoint;
10. STOP when the compatible frontier is exhausted.

Do not reintroduce a separate queue, DAG, scheduler, controller or dispatcher unless field evidence proves Pi plus standard repository/tracker primitives cannot provide a required property.

A materially changed upstream runtime MAY be evaluated only as a bounded **replacement/deletion experiment**. Adoption requires evidence that it preserves the already-qualified properties while removing architecture or glue; it MUST NOT be layered on top merely because it exists.

## 8. Process/session substrate

Herdr owns process/session primitives only in the currently qualified architecture.

Atenea MUST NOT move product authority, blocker reasoning, publication policy or independent lifecycle state into bespoke Herdr gates.

## 9. Implementation and engineering methods

OpenCode + Gentle AI is the accepted unattended implementation worker.

Engineering quality is separated into:

```text
ALWAYS-ON POLICY
  CODING_STANDARDS.md

TASK-TRIGGERED UPSTREAM METHODS
  Matt tdd
  Matt codebase-design
  Matt domain-modeling
  Matt diagnosing-bugs
  Matt code-review when semantic/spec-compliance risk warrants it

MACHINE ORACLES
  deterministic repo tooling where justified

FINAL CANDIDATE LIFECYCLE
  Gentle native RDD
```

The Matt skills are not a mandatory execution sequence. `CODING_STANDARDS.md` MUST NOT restate entire upstream methods or become a generic Clean Code framework.

Matt `code-review` may add value before RDD when semantic/spec-compliance risk warrants it. Atenea does not mandate a second LLM reviewer lifecycle after every candidate. Gentle native RDD owns final exact-candidate review authority.

## 10. Deterministic evidence before claims

Where the repository provides deterministic checks, run the relevant ones before accepting semantic claims.

Examples include tests, linting, type checks, build checks, schema validation, dependency/security checks and project-specific invariant checks.

Only adopt checks that are machine-decidable and justified by the repository's stack/risk. Passing checks do not override contradictory product authority or an invalid review candidate.

## 11. Exact candidate and review authority

Gentle AI alone owns the final candidate/RDD lifecycle.

The stable `2.5.0` contract is treated as provider authority. Atenea MUST NOT reconstruct:

- candidate freezing or exact candidate identity;
- reviewer lineage/authority;
- provider-issued continuation or re-entry commands;
- bounded correction state;
- final causal capture or acknowledgement/burn semantics;
- recovery/reconciliation algorithms;
- mutation invalidation.

The orchestrator MUST execute provider-issued lifecycle continuations as returned rather than reconstructing them from prose or local state.

A post-review candidate mutation invalidates prior review evidence according to Gentle's native lifecycle.

RDD closes where Gentle's proof/lifecycle closes. Atenea MUST NOT add a synthetic `FINALIZE`, compact terminal receipt, or delivery gate after Gentle has completed its authority transition.

Delivery remains ordinary repository policy and is separate from RDD approval/evidence.

## 12. Engineering-quality policy

Atenea's horizontal engineering standard is `CODING_STANDARDS.md`.

The intended interpretation of scalability is:

> software can be understood, modified, tested, operated and extended without each change multiplying fragility.

Scalability does not imply premature microservices, distributed architecture, generic indirection or speculative abstractions.

Technical debt may exist only as intentional, visible, bounded and owned debt.

## 13. Material UI/UX activation

Impeccable is conditional, not universal.

Material UI/UX applicability MUST be decided during human-present shaping and become part of the executable contract before `EXECUTION_READY`. The unattended worker should not invent a new product-level decision about whether a slice is a redesign or material UX intervention.

Typical activation:

```text
backend / API / data / CLI with no material UI
  → no Impeccable requirement

trivial copy or mechanical styling change
  → normally no separate shape step
  → audit only if actual risk warrants it

new surface / flow / navigation / material layout
  → Impeccable shape before final spec/tickets
  → critique/audit/harden as relevant before final candidate

forms / permissions / errors / loading / edge states with material UX
  → shape if product interaction is material
  → audit/harden as relevant

visual-system / tokens / component-system change
  → Impeccable + DESIGN.md authority where warranted
```

Do not create an Atenea UX framework around these methods.

## 14. DESIGN.md authority

Where a product has durable visual-system decisions worth preserving, `DESIGN.md` may be the visual-system authority.

It owns visual identity/tokens/rationale, not product semantics.

A missing `DESIGN.md` alone does not imply greenfield or authorize a redesign. Existing visual evidence and product authority still matter.

## 15. PRODUCT.md compatibility rule

Existing canonical product authority MUST NOT be duplicated merely because a design tool expects `PRODUCT.md`.

Default for established Atenea verticals:

```text
canonical product authority
→ deterministic compatibility projection
→ PRODUCT.md
→ Impeccable/design tooling
```

A derived `PRODUCT.md` must:

- state that it is GENERATED / DERIVED;
- name its canonical source(s);
- state `DO NOT EDIT AS AUTHORITY` and that canonical sources win on conflict;
- avoid manually duplicated product facts;
- regenerate idempotently and produce reviewable diffs;
- report/fail on material divergence rather than silently merge conflicting truth.

Atenea does NOT mandate a universal PRODUCT generator. Implement the smallest repo-specific projection only when an adopted tool actually requires it.

If a simple repo legitimately uses `PRODUCT.md` itself as canonical product authority without creating competing truth, shaping may explicitly choose that design.

`DESIGN.md` remains a separate visual-system authority and is not generated from `PRODUCT.md`.

## 16. Pre-publication authority revalidation

Immediately before publication, perform one fresh read of current GitHub/product authority relevant to the work item.

This is a single bounded revalidation, not a polling subsystem or Herdr gate.

If blockers, scope, product authority or repository delivery instructions changed materially since execution began, do not publish the stale candidate: STOP for adjudication.

If authority is unchanged, continue to normal publication without adding another lifecycle layer.

## 17. Publication boundary

Normal non-force `git push` is allowed in the accepted autonomous path.

If the runtime asks permission for an allowed operation, Pi supervisor may grant it. Do not add a second Herdr/publication permission subsystem solely to mediate normal push.

Repository delivery policy decides whether an accepted work unit ends at:

- an exact remote checkpoint; or
- a pull request awaiting human merge.

Atenea does not auto-merge.

The autonomous default MUST NOT use force-push, hidden reset/rebase/history rewrite or destructive recovery to make publication succeed.

If publication partially succeeds, preserve the exact remote state and STOP for adjudication rather than silently inventing recovery semantics.

## 18. Reconciliation

Acceptance depends on exact repository evidence, not agent narration.

Where applicable, verify the accepted candidate against current local/upstream/remote state and record the exact checkpoint.

Unexpected same-branch drift or contradictory authoritative state is fail-closed.

Work-unit acceptance, RDD closure, PR publication and final merge are distinct boundaries.

## 19. STOP conditions

STOP rather than improvise when any material condition is unresolved, including:

- missing or contradictory authority;
- blocked dependency or incompatible runtime;
- unexpected dirty/topology state that would require destructive cleanup;
- unexpected same-branch remote drift;
- unresolved product decision;
- inability to establish falsifiable acceptance for a requirement that needs it;
- candidate/review state inconsistent with Gentle authority;
- material pre-publication authority change;
- destructive publication/recovery being required;
- publication partially succeeding without an explicit safe continuation.

## 20. Model/provider routing

Model, provider and reasoning-effort selections are operational routing facts, not Atenea architecture.

Record them when useful for evidence/cost/reproducibility, but do not hard-code the harness around a specific model unless a repository has a demonstrated requirement.

## 21. Security boundary

Pi and Herdr run with the privileges of their environment and are not security sandboxes.

If a vertical requires stronger isolation, use an appropriate container/sandbox boundary. Do not build a bespoke Atenea security sandbox without a concrete requirement.

## 22. Upstream-first change test

Before adding any Atenea glue, answer all of these:

1. Which required behavior has no current upstream owner?
2. What field evidence proves the gap?
3. Why can repo-local policy/configuration not close it?
4. What is the smallest falsifiable addition?
5. What is its deletion/retirement condition if upstream later owns the behavior?

If those questions do not have concrete answers, DO NOT BUILD.

## 23. Current completion state

The Stage 5–8 runtime path remains qualified from historical `2.5.0-rc.2` field evidence. Gentle AI `2.5.0` stable is the current operational target and should obtain natural evidence on the next real slice; this does not justify repeating Stage 5–8.

Remaining evidence should come primarily from real-project use:

- natural stable-`2.5.0` RDD evidence;
- optional OpenSpec use only when a real brownfield delta benefits from it;
- repository-specific PR/human-merge flows where used;
- first naturally material UI slice using the conditional Impeccable/DESIGN/PRODUCT policy;
- one bounded Gentle Pi `2.3.0` replacement/deletion evaluation because it materially changes the previously failed upstream runtime.

Do not create another large synthetic qualification ladder merely to exercise optional surfaces.