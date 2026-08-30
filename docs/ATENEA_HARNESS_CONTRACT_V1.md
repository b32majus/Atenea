# Atenea Harness Contract v1

Date: 2026-08-30
Status: NORMATIVE

## 1. Purpose

Atenea is a contract over upstream engineering tools, not an orchestration product.

Its purpose is to take already-shaped work from durable repository/tracker authority and execute it autonomously with the smallest possible repo-local policy layer.

Atenea MUST prefer supported upstream capabilities before adding glue.

## 2. Ownership map

```text
Matt Pocock upstream skills
  greenfield shaping and engineering methods

OpenSpec
  intended brownfield/evolutionary shaping entry path
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
  bounded repair, receipts and mutation invalidation

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

OpenSpec is Atenea's intended entry path for existing systems.

Use it delta-first: describe the behavior being added, modified or removed rather than reverse-documenting the whole existing product before every change.

OpenSpec remains a shaping/specification front end. It does not replace Pi supervision, OpenCode/Gentle execution, Gentle RDD, or Git/GitHub authority.

Status: architecturally accepted; end-to-end Atenea field qualification pending.

The first qualification MUST use a real bounded brownfield code change, not Atenea's own harness/documentation maintenance.

### 4.3 Raw incoming issues

Matt triage remains available for issues that were not created by a shaped greenfield/brownfield path and are not yet executable.

Do not route already-shaped tickets through triage by ritual.

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

## 6. Repository isolation

Do not appropriate, reset, clean or overwrite an unexpected dirty checkout in order to begin work.

Real work should use a clean dedicated branch/worktree when isolation is needed by repository policy, parallel work or safety. Prefer standard Git and native Herdr/Git worktree primitives over a custom topology layer.

An unexpected topology or dirty-state contradiction is a STOP condition, not authorization for destructive cleanup.

## 7. Frontier discovery and supervision

Pi is the trusted thin supervisor.

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

## 8. Process/session substrate

Herdr owns process/session primitives only.

Atenea MUST NOT move product authority, blocker reasoning, publication policy or lifecycle state into bespoke Herdr gates.

## 9. Implementation and engineering methods

OpenCode + Gentle AI is the accepted unattended implementation worker.

Repo engineering quality is composed from:

```text
CODING_STANDARDS.md
+ upstream Matt tdd
+ upstream codebase-design
+ upstream domain-modeling
+ upstream diagnosing-bugs
+ upstream code-review when useful
+ deterministic repo tooling where justified
```

`CODING_STANDARDS.md` contains the repo-local horizontal delta. It MUST NOT restate entire upstream methods or become a generic Clean Code framework.

Matt `code-review` is available as an engineering method, but Atenea does not mandate a second LLM reviewer lifecycle after every candidate. Gentle native RDD owns final exact-candidate review authority.

## 10. Deterministic evidence before claims

Where the repository provides deterministic checks, run the relevant ones before accepting semantic claims.

Examples include tests, linting, type checks, build checks, schema validation, dependency/security checks and project-specific invariant checks.

Only adopt checks that are machine-decidable and justified by the repository's stack/risk. Passing checks do not override contradictory product authority or an invalid review candidate.

## 11. Exact candidate and review authority

Gentle AI alone owns the final candidate/RDD lifecycle.

Atenea MUST NOT reconstruct:

- candidate freezing;
- reviewer lineage/authority;
- review receipts;
- mutation invalidation;
- repair-loop state;
- acknowledgement/recovery algorithms.

A post-review candidate mutation invalidates prior review evidence according to Gentle's native lifecycle.

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

If publication partially succeeds (for example push succeeds but PR creation fails), preserve the exact remote state and STOP for adjudication rather than silently inventing recovery semantics.

## 18. Reconciliation

Acceptance depends on exact repository evidence, not agent narration.

Where applicable, verify the accepted candidate against current local/upstream/remote state and record the exact checkpoint.

Unexpected same-branch drift or contradictory authoritative state is fail-closed.

Work-unit acceptance, PR publication and final merge are distinct repository boundaries.

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

The Stage 5–8 runtime path is qualified. Harness Contract v1 deliberately adds no new runtime.

Remaining evidence should come primarily from real-project use:

- first bounded OpenSpec brownfield change;
- repository-specific PR/human-merge flows where used;
- first naturally material UI slice using the conditional Impeccable/DESIGN/PRODUCT policy.

Do not create another large synthetic qualification ladder merely to exercise every optional surface.