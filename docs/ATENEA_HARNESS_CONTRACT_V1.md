# Atenea Harness Contract v1

Date: 2026-09-16
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
  optional delta-first brownfield/evolutionary shaping

Pi + Gentle Pi 3.3 persistent parent
  train/frontier orchestration, fresh-child delegation, integration,
  deterministic verification and exact-candidate lifecycle host

Package-owned Gentle Agents
  fresh bounded implementation child per newly selected ticket

Herdr
  process/session/observability substrate for the visible parent

Gentle AI 3.4
  exact candidate integrity, RDD/reviewer/refuter/validator authority,
  bounded correction, provider continuation/re-entry and acknowledgement/burn

Git / GitHub
  repository history, worktrees, issues, checkpoints, PRs and merge policy
```

The parent is not a security boundary or the normal ticket implementation child. Herdr is not review authority. Atenea MUST NOT duplicate Gentle candidate/review semantics.

## 3. The autonomy boundary

```text
BEFORE EXECUTION_READY
= human-present, interactive, repo-native shaping

FROM EXECUTION_READY
= bounded one-touch execution after explicit human authorization
```

The current path uses one persistent Pi + Gentle Pi 3.3 parent and one fresh package-owned implementation child per newly selected ticket.

The first eligible consent-required review requires one explicit human host action: `Review and allow this session`. Later fresh validated review grants may be applied without another consent touch only while the exact live Pi session and canonical Git repository permission remains valid. Reload preserves the permission; new/resume/fork/quit/process restart/revoke ends it.

That session permission grants no verdict, acknowledgement, delivery, merge, maintenance or cross-repository authority. Every candidate still follows provider-owned exact-candidate review semantics and acknowledgement/burn.

There is no normal external supervisor, pi-intercom consent relay, Herdr RPA or Atenea review controller.

```text
CURRENT_PARENT=PI_0_86_1_PLUS_GENTLE_PI_3_3
CURRENT_GENTLE_AI=3_4_0_PACKAGE_PAIRED
CURRENT_EXECUTION_MODE=ONE_TOUCH
FIRST_REVIEW_SESSION_GRANT=HUMAN_EXPLICIT
LATER_SAME_SESSION_REVIEW_CONSENT_TOUCHES=ZERO_EXPECTED
EXPLICIT_REVIEW_ROLE_ROUTING=REQUIRED
ACKNOWLEDGEMENT_BURN=REQUIRED
FINAL_MERGE=HUMAN_BOUNDARY
```

### 3.1 Operator/supervision ergonomics — no new authority

The human or Cora/DC may mechanically start/focus the one visible parent and submit the bounded prompt. Human selection of the first session review grant is an authority action, not automation.

## 4. Authoring entry paths

### 4.1 Greenfield

Use the complete Matt Pocock upstream workflow and repo setup semantics.

The durable output must be executable from repository/tracker authority without requiring the original shaping conversation.

Matt-generated work does not require an Atenea-specific Agent Brief or custom work-unit translation.

### 4.2 Brownfield / evolutionary change

Preserve accepted repo-native shaping and product authority.

OpenSpec is an **optional** delta-first shaping/specification path when it materially improves a new brownfield change. It is not a mandatory migration and Atenea MUST NOT reverse-document an established repository merely to satisfy a universal workflow.

If OpenSpec is selected, use it delta-first: describe the behavior being added, modified or removed rather than reverse-documenting the whole existing product before every change.

OpenSpec does not replace Pi supervision, Pi/Gentle-Pi execution, Gentle RDD or Git/GitHub authority.

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

## 7. Frontier discovery and persistent parent supervision

The current train uses one persistent visible Pi/Gentle-Pi 3.3 parent. For each iteration it reads current authority, selects one compatible executable item, launches one fresh implementation child, reconciles exact diff/evidence, completes provider-owned exact-candidate review, requires APPROVED plus acknowledgement/burn, creates only the authorized checkpoint, and freshly rediscovers frontier.

Normal concurrency is `max_concurrency=1` unless current authority explicitly proves parallel safety.

### 7.1 Gentle lifecycle ownership

The persistent parent owns host-side lifecycle coordination. Gentle AI owns candidate/review authority.

On the first eligible review, the human may select `Review and allow this session`. Gentle Pi runs the exact current provider grant and records the live session/repository permission. Later candidates receive fresh provider grants; the prior human action does not become reusable candidate approval.

Atenea MUST NOT synthesize permission through prompt prose, environment flags, internal grant APIs, fake child identity or TUI automation.

### 7.1.1 One-touch consent lifetime

```text
reload                PRESERVES
new                    REVOKES
resume                 REVOKES
fork                   REVOKES
quit                   REVOKES
process restart        REVOKES
explicit revoke        REVOKES
different repository   NEW HUMAN GRANT REQUIRED
```

A package-owned child may use the parent's permission only through Gentle Pi's supported bounded permission channel and exact target/repository binding.

### 7.1.2 Native reviewer continuation is provider-owned

Reviewer lens, refuter and targeted-validator prompts/tokens are provider-owned. Preserve materialization/submission/binding values exactly.

Do not collapse different provider operations into one capture shape. Ordinary lenses, refuter and targeted validator follow the exact operation returned by the provider. Missing configured model routing for a requested GP3.3 host-mediated role is a typed STOP, not permission to fall back to Pi's ambient/default model.

Approval is not publishable until provider-required work is terminal and acknowledgement/burn succeeds.

### 7.2 Parent and child continuity policy

The parent may stay alive across a compatible bounded train. Every newly selected ticket gets a fresh implementation child. A process restart/new session starts a new one-touch permission boundary.

### 7.3 Operator prompt surface

The operator prompt states intent and bounded context, not provider tokens or a rewritten review protocol. Current mechanics live in `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

### 7.4 Supervision efficiency and observability

Herdr keeps the parent visible. Use native lifecycle events and bounded waits rather than fixed sleeps, pane-polling loops or a second supervisor.

## 8. Process/session substrate

Herdr owns process/session primitives only in the currently qualified architecture.

Atenea MUST NOT move product authority, blocker reasoning, publication policy or independent lifecycle state into bespoke Herdr gates.

## 9. Implementation and engineering methods

A persistent Pi parent with Gentle Pi 3.3 + package-paired Gentle AI 3.4 is the current one-touch train owner. In the normal multi-ticket recipe it delegates each newly selected ticket to a fresh package-owned implementation child, then owns integration, deterministic verification, host-side review coordination, acknowledgement/burn and checkpoint/frontier progression. OpenCode is an attended/alternate runtime, not a required component of the normal path.

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

The current Gentle AI `3.4.0` provider contract, consumed with Gentle Pi `3.3.0`, is treated as provider authority. Atenea MUST NOT reconstruct:

- candidate freezing or exact candidate identity;
- reviewer lineage/authority;
- provider-issued continuation or re-entry commands;
- bounded correction state;
- final causal capture or acknowledgement/burn semantics;
- recovery/reconciliation algorithms;
- mutation invalidation.

The persistent Pi/Gentle-Pi parent MUST execute provider-issued lifecycle continuations as returned rather than reconstructing them from prose or local state. Native implementation children do not substitute themselves as the final Gentle/RDD authority.

A post-review candidate mutation invalidates or supersedes prior review evidence according to Gentle's native lifecycle and may require a new exact-candidate review lineage.

### 11.1 Historical/alternate OpenCode negotiated-v2 consent characterization

Stable Gentle `2.5.0` retains multiple provider-owned consent behaviors.

**Organic/plain START** preserves one-time clone/work consent semantics: an accepted interactive consent can be latched so later candidates review silently.

**Undeclared non-interactive negotiated START** is also authorized silently by stable Gentle.

In the characterized OpenCode/Gentle 2.5 negotiated-v2 route, the next-transition builder appended `--consent relay` to provider-issued START. That selected candidate-scoped negotiated semantics: relay returned the typed question; `granted` applied only to that frozen candidate; later changed medium/high candidates asked again. This subsection preserves that alternate-path evidence; it does not define the adopted Pi/Gentle-Pi consent transport.

Therefore:

```text
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=EXISTS
OPENCODE_NEGOTIATED_V2_ZERO_TOUCH=NOT_SATISFIED
CAUSE=V2_NEXT_TRANSITION_FORCES_CONSENT_RELAY
```

If that historical/alternate OpenCode v2 route is explicitly selected:

- its consumer MUST preserve the complete provider-issued consent semantics and MUST NOT inject `granted`, auto-click, remove `relay`, infer approval from `EXECUTION_READY`, or reconstruct START;
- a candidate-scoped decline remains distinct from disabling RDD;
- provider-issued lifecycle arguments remain exact/opaque.

The current GP3.3 path follows §7.1: one explicit human host-session grant on the first eligible review, then fresh validated provider grants in the same live session/repository without another consent touch. It does not reuse this historical direct-human relay prescription or the later Atenea mechanical relay.

Issue #36 owns any optional upstream-first parity work for the alternate OpenCode route. Preferred order if that parity work is pursued:

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

### 17.1 Conditional independent Promotion Review

At a high-risk human promotion/merge boundary, the human/Cora planning surface MAY require `docs/PROMOTION_REVIEW_V1.md`. This is a fresh read-only audit of the exact integrated diff across Spec/clinical semantics, Standards/Clean Code and Adversarial/Safety & failure ordering. It requires the complete diff plus an explicit high-risk focus subset and zero blocking findings.

Promotion Review is not part of the worker's Gentle lifecycle, creates no reviewer/candidate authority, and MUST NOT become a second mandatory LLM review after every ticket. Gentle native RDD remains the sole exact-candidate review authority; a Promotion Review PASS never authorizes merge by itself.

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

Routing is operational configuration, not Atenea architecture.

```text
Pi default                    nan/deepseek-v4-flash · medium
persistent parent             nan/glm5.3-flash · high
gentle-ai-worker              nan/glm5.3-flash · high
gentle-ai-verify              openai-codex/gpt-5.6-luna · high
review-readability            openai-codex/gpt-5.6-luna · high
review-reliability            nan/deepseek-v4-flash · high
review-resilience             nan/deepseek-v4-flash · high
review-risk                   nan/deepseek-v4-flash · high
review-refuter                nan/deepseek-v4-flash · high
review-validator              openai-codex/gpt-5.6-luna · high
```

NaN's `deepseek-v4-flash` is the provider id for the DeepSeek V4.1 Flash family. The parent route is explicit at launch; Pi's ordinary default remains V4 medium.

No silent provider/model/effort fallback is allowed. See `docs/ROUTING_EVIDENCE_LEDGER_V1.md`.

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

For the current one-touch path, Gentle Pi + Gentle AI own the review lifecycle. The first eligible review-session grant is a real human host action; later same-session/repository grants are fresh provider grants validated by the host permission. The former GP2.7 no-TTY zero-touch bridge, Atenea worker-side relay and negotiated-v2/OpenCode policy-selection seam remain historical/alternate evidence, not current execution dependencies or consent bypasses.

## 23. Current completion state

Historical Stage 5–8, GP2.4/2.5 and GP2.7 evidence remains valid for the properties it proved.

On 2026-09-20 the operational target moved to Pi 0.86.1 + Gentle Pi 3.3.0 + package-paired Gentle AI 3.4.0. Current qualification established the first `Review and allow this session` grant and a subsequent review start/execution without a second consent touch. A later harness assertion forcing remaining refuter/validator work through one capture shape is qualification-harness debt; current GP3.3 provider operations and explicit role routing remain authoritative.

```text
CURRENT_RUNTIME                         PI_0_86_1_GP_3_3_0_GAI_3_4_0
CURRENT_EXECUTION_MODE                  ONE_TOUCH
FIRST_REVIEW_SESSION_GRANT              PASS
LATER_SAME_SESSION_SECOND_TOUCH         NOT_REQUIRED_IN_QUALIFIED_FLOW
DEFAULT_PI_MODEL                        nan/deepseek-v4-flash medium
PARENT_MODEL                            nan/glm5.3-flash high
EXPLICIT_REVIEW_ROLE_ROUTING            REQUIRED
ACKNOWLEDGEMENT_BURN                    REQUIRED
FINAL_MERGE                             HUMAN_BOUNDARY
```

Current mechanics: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.
