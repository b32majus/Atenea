# Atenea — UI/UX Real-Project Qualification Plan 2026-09-04

Status: **READY_TO_SELECT_TARGET / NONEXECUTABLE UNTIL HUMAN SELECTS PROJECT+FEATURE**  
Tracking: **#41**  
Source decision: `docs/UI_UX_SOURCE_ADJUDICATION_RESULT_20260904.md`

This plan turns the completed source adjudication into one bounded field qualification. It is deliberately not a synthetic ladder and it does not authorize installation in any productive project until the human chooses the target feature.

## 1. What is being qualified

Primary candidate:

```text
UPSTREAM=pbakaus/impeccable
SKILL_RELEASE=skill-v4.1.3
SKILL_COMMIT=c0f495212236129c2e92aaf7714a3a9914569d13
UNIVERSAL_BUNDLE_SHA256=fdcb41a24ddfb613786e3141bc7bb8466a406ffbd437a2e302f4ca70181bed9f
CLI_VERSION=3.6.1
```

Google `DESIGN.md` is not a competing workflow. It is the accepted visual-system format that Impeccable may write when durable design authority is warranted. If its CLI is used as a deterministic oracle, pin `@google/design.md@0.4.0` and record the version in evidence.

No Stitch, OJO, Taste, UI UX Pro Max, ux-agent-skills or web-quality-skills is installed in the first qualification. A second provider may be evaluated only after the run demonstrates a concrete uncovered gap.

## 2. Target-selection requirements

The target must be a **real, meaningful user-facing feature** rather than an Atenea/KairOS documentation surface or a synthetic demo.

Required:

```text
UI_UX_MATERIAL=YES
REAL_USER_OR_OPERATOR=YES
MEANINGFUL_INTERACTION_OR_INFORMATION_ARCHITECTURE=YES
PRODUCT_SEMANTICS_CAN_BE_SHAPED_WITH_HUMAN_PRESENT=YES
BOUNDED_FEATURE=YES
IMPLEMENTATION_CAN_REACH_REAL_PR_CHECKPOINT=YES
```

Prefer a feature where at least several of these are materially open: navigation/hierarchy, flow sequence, state design, primary actions, responsive behavior, accessibility-affecting interaction, data density, information architecture or durable visual-system decisions.

Do not choose a cosmetic-only change merely because it is easy to test. The qualification must exercise the reason UI/UX shaping exists.

## 3. Repository path remains context-dependent

### Greenfield

```text
human + Cora
→ Matt upstream product/domain shaping
→ grill-with-docs or current equivalent
→ feature semantics sufficiently closed
→ UI_UX_MATERIAL=YES
→ Impeccable `shape`
→ resolve any PRODUCT_SEMANTIC_GAP upward
→ durable design/spec authority
→ tickets
→ human EXECUTION_READY
→ normal Atenea runtime
```

### Brownfield

```text
human + Cora
→ understand incumbent repo + canonical product authority
→ Repository Intelligence only when already justified by repo complexity
→ repo-native/OpenSpec delta shaping as appropriate
→ intended delta semantics sufficiently closed
→ UI_UX_MATERIAL=YES
→ Impeccable `shape` against incumbent visual/product truth
→ resolve any PRODUCT_SEMANTIC_GAP upward
→ finalize durable delta/design/spec authority
→ human EXECUTION_READY
→ normal Atenea runtime
```

Impeccable does not replace Matt on greenfield or OpenSpec/repo-native shaping on brownfield.

## 4. Installation qualification — no productive global cutover

The qualification must begin in an isolated project/worktree or equivalent bounded target. Do not replace global productive OpenCode/Pi skills first.

The exact release artifact must be verified against the recorded SHA-256 before use. Consume the **complete upstream release distribution** for the actual target runtime; do not copy selected references/scripts by hand and do not edit provider-generated files to make them fit Atenea.

Before the first invocation, record:

```text
UPSTREAM_RELEASE_IDENTITY=PASS
BUNDLE_HASH=PASS
COMPLETE_PROVIDER_TREE_PRESENT=PASS
OPENCODE_OR_PI_DISCOVERY=PASS
LOCAL_PATCHES_TO_IMPECCABLE=0
ATENEA_GLUE_FOR_IMPECCABLE=0
```

If the official upstream install/link path cannot consume the exact release bundle cleanly, STOP and classify an installation gap. Do not solve it by inventing an Atenea installer during the qualification.

Telemetry/network policy for the qualification:

```text
DO_NOT_TRACK=1
```

This disables Impeccable's anonymous choice ping during the field test. The upstream concept catalog may still be fetched when required by its normal workflow; record whether the path was online or degraded. Do not create an Atenea mirror/service.

## 5. Product-authority gate

Before `shape`, identify canonical product truth.

For established verticals:

```text
CANONICAL_PRODUCT_AUTHORITY=<existing sources>
PRODUCT.md=DERIVED_COMPATIBILITY_ONLY
PRODUCT_MD_DO_NOT_EDIT_AS_AUTHORITY=YES
```

The derived projection must be deterministic, minimal, name its canonical sources and contain only the product context Impeccable actually needs. If no `PRODUCT.md` is needed for the selected invocation, do not create one by ritual.

For true greenfield work, `PRODUCT.md` may be accepted as product context only if the human explicitly chooses that authority model during shaping.

Failure condition:

```text
IMPECCABLE_CREATED_COMPETING_PRODUCT_TRUTH=YES
→ QUALIFICATION_FAIL_OR_REDESIGN_INTEGRATION_BOUNDARY
```

No intelligent bidirectional sync is authorized.

## 6. Pre-code qualification

Invoke the smallest relevant Impeccable capability, normally `shape`.

Success means:

- it consumes already settled product/domain context instead of restarting the whole product discovery;
- its additional questions are UI/UX-specific or expose a real product-semantic gap;
- it closes decisions a Builder would otherwise have improvised;
- it produces a bounded confirmed design brief without code;
- new visual-world machinery runs only when the feature actually warrants it;
- human choices remain real human choices;
- the result can be captured in durable repo/spec/design authority without keeping the original chat alive.

Record at least:

```text
SHAPE_WITHOUT_CODE=PASS|FAIL
DUPLICATED_PRODUCT_DISCOVERY=NONE|ACCEPTABLE|EXCESSIVE
PRODUCT_SEMANTIC_GAPS_FOUND=<n>
BUILDER_AMBIGUITIES_CLOSED=<evidence>
HUMAN_UI_UX_DECISIONS=<evidence>
EXCESS_CEREMONY=NO|YES
```

Do not run every Impeccable command to prove it exists.

## 7. DESIGN.md gate

Use `DESIGN.md` only if the selected feature/project has durable visual-system decisions worth preserving.

When used:

```text
FORMAT=google-labs-code/design.md
TOKENS_NORMATIVE=YES
PRODUCT_SEMANTICS_IN_DESIGN_MD=NO
```

For brownfield, prefer Impeccable `document` scan mode when capturing an incumbent coherent system. Do not invent a new visual world merely because `DESIGN.md` was missing.

If deterministic lint/diff is used, pin `@google/design.md@0.4.0` and preserve its output as evidence. The format is currently alpha, so future upgrades require an explicit compatibility check rather than silent drift.

`.impeccable/design.json` is upstream extension state, not independent Atenea authority. Qualification must record what it contains and whether it remains understandable/removable.

## 8. Execution handoff

After human promotion to `EXECUTION_READY`, the UI experiment stops owning orchestration.

```text
Pi
→ Herdr
→ headless OpenCode
→ implementation + deterministic verification
→ Gentle lifecycle
→ normal non-force publication
→ PR/checkpoint
→ frontier STOP / human merge boundary
```

Pi remains non-implementing. Impeccable is not a supervisor. Do not substitute an Impeccable build/ship loop for Atenea.

## 9. Post-build UI evidence

Use the minimum evidence appropriate to the feature.

Baseline:

- repository tests/build/type checks already justified by the project;
- rendered desktop/mobile or relevant device evidence for the affected surface;
- accessibility/responsive/state checks proportional to the feature;
- Impeccable deterministic detector and/or `audit` only when they add material signal.

`critique` is **conditional**. Run it only if the feature contains a meaningful visual/UX judgment that deterministic checks cannot answer. If the actual runtime cannot satisfy its intended dual-assessment isolation, do not build an adapter: either run it with its explicit upstream degraded semantics when still useful, or omit it and record why.

```text
IMPECCABLE_CRITIQUE_MANDATORY=NO
IMPECCABLE_AUDIT_MANDATORY=NO
DETERMINISTIC_UI_EVIDENCE_MANDATORY_WHEN_RELEVANT=YES
GENTLE_FINAL_EXACT_CANDIDATE_AUTHORITY=YES
```

A specialist gap-provider is considered only if this evidence leaves a concrete named gap.

## 10. Failure signals

The qualification should reject or narrow the integration rather than patch upstream if any of these occur:

```text
REQUIRES_SKILL_CHERRY_PICKING=YES
REQUIRES_LOCAL_IMPECCABLE_PATCH=YES
REQUIRES_ATENEA_ADAPTER_OR_CONTROLLER=YES
RESTARTS_PRODUCT_SHAPING_EXCESSIVELY=YES
CREATES_COMPETING_PRODUCT_AUTHORITY=YES
CREATES_SECOND_DELIVERY_LIFECYCLE=YES
BUILDER_AMBIGUITY_NOT_REDUCED=YES
HUMAN_DESIGN_DECISIONS_BECOME_FAKE_OR_AUTOMATED=YES
POST_BUILD_REVIEW_DUPLICATES_GENTLE_WITHOUT_SIGNAL=YES
STACK_COUNT_INCREASES_WITHOUT_PROVEN_GAP=YES
```

## 11. PASS criteria

```text
PINNED_COMPLETE_IMPECCABLE_INSTALL=PASS
UPSTREAM_INTEGRITY=PASS
PRODUCT_DOMAIN_FIRST=PASS
PRODUCT_AUTHORITY_DUPLICATION=NO
UI_UX_SHAPE=USEFUL
BUILDER_AMBIGUITY_REDUCED=YES
HUMAN_DESIGN_GATE=PRESERVED
DESIGN_AUTHORITY=COHERENT
POST_BUILD_UI_EVIDENCE=BOUNDED_AND_USEFUL
ATENEA_RUNTIME_OWNERSHIP=UNCHANGED
GENTLE_FINAL_AUTHORITY=PRESERVED
ATENEA_UI_GLUE_ADDED=0
UNJUSTIFIED_SECOND_PROVIDER=0
REAL_PR_CHECKPOINT=PASS
HUMAN_VALUE_ADDED=YES
```

Only after a PASS should Atenea's current decisions and installation guide describe Impeccable as qualified rather than merely selected for qualification.

## 12. Current STOP

```text
SOURCE_ADJUDICATION=COMPLETE
QUALIFICATION_PLAN=READY
TARGET_PROJECT=UNSELECTED
TARGET_FEATURE=UNSELECTED
PRODUCTIVE_INSTALLATION=NOT_AUTHORIZED
EXECUTION_READY=NO
```

The next human-present planning action is to select one real project + bounded feature and run its normal product/domain shaping before any UI/UX tool installation or terminal execution.
