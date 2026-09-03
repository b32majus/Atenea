# Atenea Harness Contract v1

Date: 2026-09-03
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

The currently selected OpenCode negotiated `review-integration/v2` path may still emit explicit provider-owned human-decision envelopes after `EXECUTION_READY`, notably medium/high exact-candidate review consent. Those envelopes MUST be relayed losslessly while that path is selected. They are not permission for Pi to impersonate the human or rewrite the provider transition.

This is a path-specific current limitation, not a statement that stable Gentle globally lacks zero-touch review semantics. Issue #36 owns the upstream-first restoration of zero-touch on the negotiated OpenCode path.

Current completion state, explicitly distinguished:

```text
RELEASED_V2_PROVIDER_UNATTENDED_SELECTOR=NOT_AVAILABLE
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY=PASS
REAL_OPERATOR_TRIGGERED_ATENEA_E2E=PASS        # issue #38, under the bounded canary
UPSTREAM_REPLACEMENT_STILL_REQUIRED=YES        # Gentleman-Programming/gentle-ai#4109
```

The released stable negotiated v2 still lacks a supported unattended selector. The downstream provider canary proved the behavioral hypothesis, and the real operator-triggered Atenea E2E (issue #38) completed under that bounded canary. Neither closes the upstream requirement: `UPSTREAM_REPLACEMENT_STILL_REQUIRED=YES` until a supported provider-owned equivalent exists.

### 3.1 Operator/supervision ergonomics — no new authority

Bounded/pinned preflight guidance and visible worker observability are operator/supervision ergonomics only. They create no new authority, lifecycle ownership, daemon, scheduler or observation-harness dependency. Pi may launch the headless OpenCode worker in a dedicated visible Herdr pane and report its pane/tab id/label for human observation; OpenCode remains headless/non-interactive and Pi remains non-implementing. For intentionally pinned work, the operator prompt may state the repository/issue/branch-PR checkpoint/role/transport/publication/STOP boundary so Pi performs a bounded preflight instead of broad rediscovery.

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
5. create or reuse and supervise the implementation worker through Herdr;
6. remain non-implementing;
7. relay genuine provider-owned human-decision envelopes losslessly when the selected path requires them;
8. grant already-authorized operational runtime permissions when the runtime safely exposes them;
9. verify accepted closure/reconciliation evidence;
10. rediscover the frontier after each accepted checkpoint;
11. STOP when the compatible frontier is exhausted.

### 7.1 Gentle lifecycle ownership

Pi MUST NOT run, reconstruct or own Gentle review lifecycle commands on behalf of the implementation worker.

```text
Pi
  authority/frontier decisions
  worker lifecycle supervision
  lossless human-decision relay when provider path requires it
  already-authorized operational permission grant

OpenCode + Gentle worker
  implementation
  deterministic verification
  all Gentle lifecycle operations
  exact provider-issued continuation/re-entry
  bounded correction
  acknowledgement/burn
  publication allowed by repository policy
```

When Gentle returns provider-issued lifecycle transitions, the **OpenCode/Gentle worker** is the orchestrator that executes them. The phrase “orchestrator executes provider-issued transitions” in Gentle documentation MUST NOT be interpreted as permission for the outer Pi supervisor to take over that lifecycle.

### 7.2 Worker continuity policy

For a bounded continuation or repair, Pi SHOULD reuse an existing healthy OpenCode worker when all of these remain true:

```text
same work item
same PR / delivery branch
same worktree
same effective authority
compatible runtime/configuration
worker healthy and available
```

Create a fresh worker when the previous worker is unavailable/unhealthy, its context is materially contaminated, the worktree/branch/runtime changed, or explicit isolation is required.

Worker reuse preserves implementation context only. A changed candidate MUST still receive whatever fresh Gentle candidate/review lineage the provider requires. Never reuse prior review authority merely because the OpenCode process is reused.

### 7.3 Supervisor prompt surface

The operator prompt SHOULD state **intent and bounded context**, not reimplement the harness contract in prose.

Normal run:

```text
work item / goal
create-or-reuse and supervise OpenCode/Gentle through Herdr
repository delivery boundary / STOP before human merge
```

Resume/repair:

```text
exact current checkpoint
already-completed work that must not be repeated
one or two incident-specific bounds
same supervision/delivery boundary
```

Do not routinely place Gentle command syntax, lineage reconstruction, recovery algorithms, detailed Git procedure or historical harness exclusions into the operator prompt. Durable mechanics belong in current repository/Atenea/upstream authority. Field evidence shows that over-specified prompts can cause supervisor responsibility reinterpretation.

### 7.4 Supervision efficiency

Pi SHOULD prefer native/Herdr state reads and bounded waits over fixed long sleeps. Multi-minute `sleep` polling MUST NOT be the normal supervision strategy.

This does not authorize a new polling daemon, scheduler or event bus. Use the smallest existing upstream process/session primitive that exposes the required state.

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

The OpenCode/Gentle worker MUST execute provider-issued lifecycle continuations as returned rather than reconstructing them from prose or local state. Pi observes/supervises that lifecycle and MUST NOT substitute itself as the Gentle orchestrator.

A post-review candidate mutation invalidates or supersedes prior review evidence according to Gentle's native lifecycle and may require a new exact-candidate review lineage.

### 11.1 Stable 2.5 consent paths and current negotiated-v2 gap

Stable Gentle `2.5.0` retains multiple provider-owned consent behaviors.

**Organic/plain START** preserves one-time clone/work consent semantics: an accepted interactive consent can be latched so later candidates review silently.

**Undeclared non-interactive negotiated START** is also authorized silently by stable Gentle.

However, the current `gentle-ai.review-integration/v2` next-transition builder appends `--consent relay` to provider-issued START. That explicitly selects candidate-scoped negotiated semantics: relay returns the typed question; `granted` applies only to that frozen candidate; later changed medium/high candidates ask again.

Therefore:

```text
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=EXISTS
OPENCODE_NEGOTIATED_V2_ZERO_TOUCH=NOT_SATISFIED
CAUSE=V2_NEXT_TRANSITION_FORCES_CONSENT_RELAY
```

While this v2 route remains selected:

- Pi MUST relay the complete provider-issued consent envelope to the human;
- Pi MUST NOT inject `granted`, auto-click, remove `relay`, infer approval from `EXECUTION_READY`, or reconstruct START;
- a candidate-scoped decline remains distinct from disabling RDD;
- provider-issued lifecycle arguments remain exact/opaque.

Issue #36 owns the upstream-first resolution. Preferred order:

1. determine whether current v2 already exposes a supported unattended/no-relay consent policy;
2. determine whether an existing provider-owned organic path can preserve all required modern OpenCode/Gentle properties;
3. use v1 only for characterization if useful, never as a durable dependency because v1 is frozen/legacy;
4. if no supported current path exists, request the smallest upstream negotiated-v2 consent-policy parity feature.

Atenea MAY consume a future provider-owned v2 unattended policy after bounded evidence proves exact candidate identity, provider-issued transitions, acknowledgement/burn and human control remain intact. Atenea MUST NOT create its own parallel consent state machine.

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

When an interactive runtime permission asks only whether to perform an operation that current repository/Atenea authority already authorizes — such as the ordinary non-force push for the current branch — Pi SHOULD grant that operational permission without escalating it to the human.

This rule does **not** apply to genuine human decisions, destructive/high-risk operations, scope changes, final merge or provider-owned consent envelopes emitted by the selected Gentle route. Those remain subject to their owning authority.

Do not add a second Herdr/publication permission subsystem solely to mediate normal push.

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

The Judit #76 stable field run found DeepSeek V4 Flash operationally effective for Pi/OpenCode supervision/review routing compared with an earlier accidental high-cost routing. That is field evidence for configuration choice, not a normative Atenea model pin.

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

For zero-touch RDD, stable Gentle already owns the underlying silent/one-time consent behavior; the unresolved seam is negotiated-v2 policy selection. The downstream provider canary proved the behavioral parity and the real operator-triggered Atenea E2E (issue #38) completed under it, but the current action remains upstream integration verification / smallest upstream parity proposal (`Gentleman-Programming/gentle-ai#4109`), not an Atenea consent bypass and not permanent adoption of the downstream canary.

## 23. Current completion state

The Stage 5–8 runtime path remains qualified from historical `2.5.0-rc.2` evidence. Gentle AI `2.5.0` stable now has natural real-project field evidence from Judit #76 / PR #79; repeating Stage 5–8 is not justified.

Issue #38 completed the first real operator-triggered Atenea end-to-end run through the actual top-level interface under the bounded downstream canary. The real operator interface is field-proven, and the two operator ergonomics it exposed (visible Herdr worker pane; bounded authoritative pinned prompt) are accepted for current use as operator/supervision ergonomics, tracked by issue #39.

Current stable status:

```text
EXACT_CANDIDATE_RDD                    PASS
PROVIDER_CONTINUATION_REENTRY          PASS_ON_SUCCESSFUL_FIELD_PATH
ACKNOWLEDGEMENT_BURN                   PASS
PR_STOP_BEFORE_HUMAN_MERGE             PASS
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY    EXISTS
RELEASED_V2_PROVIDER_UNATTENDED_SELECTOR=NOT_AVAILABLE
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY=PASS
REAL_OPERATOR_TRIGGERED_ATENEA_E2E=PASS          # issue #38
UPSTREAM_REPLACEMENT_STILL_REQUIRED=YES          # Gentleman-Programming/gentle-ai#4109
OPENCODE_NEGOTIATED_V2_ZERO_TOUCH      NOT_SATISFIED
ZERO_TOUCH_BLOCKER                     V2_NEXT_TRANSITION_FORCES_CONSENT_RELAY
```

Remaining evidence/work should come primarily from real-project use:

- Issue #36 / upstream `Gentleman-Programming/gentle-ai#4109`: upstream-supported restoration of zero-touch on the negotiated OpenCode review path without rewriting provider transitions (still open);
- issue #39 operator-ergonomics refinement (visible worker pane + bounded pinned prompt) for current runs;
- optional OpenSpec use only when a real brownfield delta benefits from it;
- first naturally material UI slice using conditional Impeccable/DESIGN/PRODUCT policy;
- one bounded Gentle Pi `2.3.0` replacement/deletion evaluation because it materially changes the previously failed upstream runtime.

Do not create another large synthetic qualification ladder merely to exercise optional surfaces.
