# Atenea — UI/UX Upstream Adjudication 2026-09-04

Status: **CURRENT / IN_PROGRESS / NONEXECUTABLE**  
Tracking issue: **#41**  
Owners: **human + Cora**  
Scope: frontend design, UX/UI shaping, durable visual authority and post-build UI verification.

This document records the accepted decisions that constrain the adjudication and the current hypotheses still requiring source review and one real-project qualification. It refines `CURRENT_DECISIONS.md` C-009/C-015; it does not replace `docs/ATENEA_HARNESS_CONTRACT_V1.md` and does not change the qualified post-`EXECUTION_READY` runtime.

## 1. Why this adjudication exists

Atenea's software-engineering path is field-proven. The frontend/UI/UX path is not.

KairOS #267 / PR #269 correctly identified that UX/UI is part of product shaping rather than Builder improvisation, but the KairOS harness itself was not a meaningful user-facing qualification surface. The UI-specific questions could legitimately resolve there as `NOT_APPLICABLE_TO_THIS_SURFACE`, so the horizontal policy survived without a real visual field test.

Since then, the relevant upstreams have materially evolved. The objective now is not to invent an Atenea design framework. It is to determine whether one complete upstream workflow can own most of the UI/UX problem while preserving Atenea's existing authority boundaries.

## 2. Accepted — product/domain meaning precedes UI/UX shaping

Do not start UI/UX shaping before the feature/product intent is sufficiently understood.

For greenfield work, the normal order is:

```text
human + Cora
→ Matt Pocock product/domain shaping
→ grill-with-docs or current upstream equivalent
→ understand feature intent / users / rules / data / success / boundaries
→ determine UI_UX_MATERIAL
→ if YES: UI/UX shaping
→ return any newly exposed PRODUCT_SEMANTIC_GAP upward
→ complete spec
→ tickets
→ human acceptance
→ EXECUTION_READY
→ Atenea execution
```

The ownership distinction is:

```text
PRODUCT / DOMAIN SHAPING
= WHAT / WHY / product semantics

UI / UX SHAPING
= HOW THE HUMAN EXPERIENCES IT
```

UI/UX may expose a product-semantic gap. It must not silently resolve that gap by inventing product behavior. Return upward, settle the product decision, then continue UI/UX shaping.

### Brownfield equivalent

Brownfield work does not become a Matt workflow merely because it has UI.

```text
human + Cora
→ understand current repository + accepted authority
→ Repository Intelligence only if justified
→ OpenSpec delta-first when useful
→ understand the intended delta sufficiently
→ determine UI_UX_MATERIAL
→ if YES: UI/UX shaping against the incumbent product/design system
→ finalize change contract/spec/tasks
→ human acceptance
→ EXECUTION_READY
→ Atenea execution
```

The exact brownfield shaping surface remains repository-specific. UI/UX is inserted only when the selected change has material user-facing decisions.

## 3. Accepted — UI/UX materiality is conditional

Do not run a design workflow for backend/non-UI work by ritual.

Material decisions include, proportionally:

```text
navigation topology
screen hierarchy
sidebar / tabs / top navigation
workflow sequence
wizard vs long form
table vs cards
density
primary / secondary actions
first-run / empty / loading / error / success states
interaction feedback
responsive behavior
accessibility-affecting interaction choices
information architecture
visual hierarchy
copy that changes comprehension or action
```

If none are materially open, UI/UX shaping may be `NOT_NEEDED`.

## 4. Accepted — Upstream Integrity Rule

Atenea MUST NOT repeat the KairOS failure mode of cherry-picking apparently useful files/skills from an upstream workflow and later discovering that their internal dependencies, references or semantics were lost.

The rule is:

```text
INSTALL_UNIT
= smallest COMPLETE upstream-supported distribution

INVOCATION_UNIT
= only the capability/entrypoint required by the current work
```

Selective invocation is good. Selective reconstruction is not.

For an adopted upstream:

```text
COMPLETE_UPSTREAM_INSTALL=YES
INTERNAL_DEPENDENCIES_PRESERVED=YES
REFERENCES_SCRIPTS_ASSETS_PRESERVED=YES
SUPPORTED_RUNTIME_OR_CLEAN_NEUTRAL_SURFACE=YES
NO_LOCAL_FORK=YES
NO_SKILL_CHERRY_PICKING=YES
NO_ATENEA_REIMPLEMENTATION=YES
SELECTIVE_INVOCATION_SUPPORTED=YES
PINNABLE_OR_REPRODUCIBLE=YES
REMOVABLE_CLEANLY=YES
```

Atenea may decide to invoke `shape` but not `craft`, or `audit` but not `live`, while still installing the complete supported upstream package.

Do not infer the upstream dependency graph and rebuild it inside Atenea.

## 5. Accepted — no second delivery lifecycle

A design upstream may expose many commands. That does not make its full lifecycle Atenea's lifecycle.

Existing owners remain:

```text
human + Cora
→ product intent / shaping selection / acceptance

Matt / OpenSpec / repo-native authority
→ product/change shaping as applicable

UI/UX upstream
→ user-facing experience/design capability when selected

Pi
→ post-EXECUTION_READY non-implementing supervision

OpenCode
→ implementation + deterministic verification

Gentle
→ exact candidate / RDD / bounded correction / acknowledgement-burn

Git/GitHub
→ publication / PR / merge authority
```

Do not adopt a UI toolkit's `build`, `craft`, `ship`, autonomous loop or equivalent as a competing Atenea lifecycle merely because the upstream provides it.

## 6. Accepted — authority boundaries

### Product authority

For established verticals, existing canonical product/domain sources remain authoritative.

If a design upstream requires `PRODUCT.md` while truth lives elsewhere:

```text
canonical product authority
        ↓
deterministic derived projection
        ↓
PRODUCT.md
        ↓
design tooling
```

The derived file must identify canonical sources and be marked conceptually:

```text
DERIVED / DO NOT EDIT AS PRODUCT AUTHORITY
```

No intelligent bidirectional product sync is authorized.

For a true greenfield product, whether `PRODUCT.md` itself becomes accepted product context is a project-level shaping decision, not a universal Atenea rule.

### Visual-system authority

`DESIGN.md` may become durable visual-system authority when the product has stable visual decisions worth preserving across screens, agents and future work.

It does not replace product semantics or UX flow decisions.

### Visual exploration

Mockups, generated variants, external design canvases and prototypes are exploration artifacts until the human chooses a direction and that decision is captured in durable repo authority.

### Verification authority

Deterministic UI detectors, browser checks, accessibility checks and design critiques are evidence. They do not replace functional tests or Gentle's final exact-candidate review authority.

## 7. Current source inventory

The adjudication must inspect complete upstream workflows, not isolated snippets.

### `pbakaus/impeccable`

Current primary candidate.

Current upstream exposes a complete package with dedicated OpenCode and Pi distributions and capabilities including `init`, `shape`, `document`, `audit`, `critique`, browser/live iteration, deterministic detectors, `harden`, `adapt`, `polish` and other design operations.

Important current observations to verify end-to-end:

- `shape` explicitly plans UX/UI before code and returns a confirmed design brief;
- `document` uses the official Google `DESIGN.md` format;
- `audit` separates measurable technical UI quality from design critique;
- `critique` has deeper orchestration requirements (isolated assessments, detector/browser evidence, persistence), so it must be evaluated as part of the complete package rather than copied as a prompt;
- current distribution advertises OpenCode/Pi support, which is materially better than adapting Claude-specific fragments.

Working state:

```text
PRIMARY_CANDIDATE
NOT_YET_FIELD_QUALIFIED_BY_ATENEA
```

### `google-labs-code/design.md`

Current preferred durable visual-system format candidate.

It defines machine-readable tokens plus human-readable rationale and provides deterministic lint/diff tooling, including structural/token checks and contrast findings.

Working state:

```text
FORMAT_CANDIDATE=STRONG
PREFER_CONSUMPTION_THROUGH_SELECTED_UPSTREAM_WHERE_SUPPORTED
```

Do not invent an Atenea token schema if the selected UI upstream already interoperates with the official format.

### `google-labs-code/stitch-skills`

Potentially valuable for visual exploration, variants, code-to-design and design-system workflows.

Current OpenCode documentation requires manual installation steps and some skills may require naming/tool adaptation. Under the Upstream Integrity Rule, Atenea must not normalize those differences by maintaining its own rewritten Stitch skill pack.

Working state:

```text
VISUAL_LAB_VALUE=HIGH
ATENEA_CORE_INTEGRATION=NOT_YET_ACCEPTABLE
OPTIONAL_EXTERNAL_USE=POSSIBLE
```

Re-evaluate if upstream later exposes a clean complete supported surface for our runtime.

### `carlsz/ux-agent-skills`

Candidate for Critical User Journeys, usability audits, accessibility/web-quality rollups, browser replay and visual walkthrough evidence.

Potentially useful where a business-critical journey can be broken despite component/unit green.

Working state:

```text
OPTIONAL_GAP_CANDIDATE
NOT_UNIVERSAL
QUALIFY_ONLY_IF_PRIMARY_UPSTREAM_LEAVES_A_REAL_GAP
```

### `anthropics/skills` — `frontend-design`

Useful design-quality/distinctiveness reference and challenger. Do not adopt solely because it is influential if another complete upstream already incorporates equivalent guidance and is better integrated with our runtime.

Working state:

```text
REFERENCE_CHALLENGER
```

### `addyosmani/agent-skills`

Relevant challenger/reference for frontend engineering, web quality, accessibility, testing and source-driven engineering. Evaluate overlap with the primary UI/UX candidate and existing Matt/Gentle responsibilities before adopting any additional workflow.

Working state:

```text
REFERENCE_OR_GAP_PROVIDER
NO_STACKING_BY_DEFAULT
```

### `nextlevelbuilder/ui-ux-pro-max-skill`

Broad design-system recommendation and pattern/reference corpus. Useful challenger for design intelligence and domain-specific pattern guidance.

Working state:

```text
REFERENCE_CHALLENGER
NO_BASE_WORKFLOW_AUTHORITY_YET
```

### Other alternatives

The adjudication is not limited to the names already known. Search for materially stronger current alternatives, especially complete workflows with clean OpenCode/Pi or neutral Agent Skills support. Do not add a candidate merely because it has a large catalogue.

## 8. Current working hypothesis — not yet adoption authority

```text
FRONTEND_DESIGN_BASE_UPSTREAM
= IMPECCABLE

VISUAL_SYSTEM_FORMAT
= GOOGLE DESIGN.md
  preferably through Impeccable's own supported integration

VISUAL_EXPLORATION
= OPTIONAL
  no core provider selected yet

CRITICAL_USER_JOURNEY_VERIFICATION
= OPTIONAL
  no core provider selected yet

FINAL_EXACT_CANDIDATE_AUTHORITY
= GENTLE RDD

ATENEA_CUSTOM_UI_FRAMEWORK
= DO_NOT_BUILD
```

This hypothesis may be changed by source adjudication or field evidence.

## 9. Candidate evaluation criteria

For every serious candidate answer, with current upstream evidence:

1. What exact problem does it own?
2. What is the complete supported installation unit?
3. Does OpenCode/Pi consume it without Atenea rewrites?
4. What internal skills/references/scripts/assets/hooks/subagents are dependencies?
5. Can only the needed entrypoint be invoked while the full package remains intact?
6. What files/state does it write?
7. Which outputs are canonical, derived or ephemeral?
8. Does it create competing product/design authority?
9. Does it add daemons/controllers/background state to the critical path?
10. Can it be pinned, upgraded and removed cleanly?
11. What overlaps with Matt, OpenSpec, browser tooling, deterministic tests or Gentle?
12. What unique gap remains after the strongest single upstream is installed?
13. What user-visible quality gain is expected relative to added ceremony/context/tooling?

Decision labels:

```text
ACCEPT
QUALIFY_IN_REAL_PROJECT
REFERENCE_ONLY
DEFER
REJECT
```

## 10. No-install boundary during source adjudication

Do not mutate the productive Atenea/OpenCode/Pi environment merely to inspect candidates.

Source review comes first.

Any installation qualification must be explicit, isolated/bounded and use the upstream-supported complete distribution. No production cutover occurs because a source audit looks promising.

## 11. Real-project qualification

Atenea does not need another synthetic multi-stage ladder.

Once the source adjudication selects the smallest coherent candidate stack, use one real user-facing feature with material design ambiguity.

Expected shape:

```text
human + Cora
→ product/domain shaping first
→ UI_UX_MATERIAL=YES
→ complete selected UI/UX upstream already installed intact
→ invoke only relevant UI/UX entrypoint(s)
→ human accepts durable design direction
→ finish spec/tickets
→ EXECUTION_READY
→ normal Atenea execution
→ deterministic/browser/UI checks
→ UI-specific audit/critique only when warranted
→ bounded repair
→ Gentle exact-candidate RDD
→ normal publication / PR
→ Cora + human final boundary
```

Qualification must answer:

```text
DID_UI_UX_SHAPING_REDUCE_BUILDER_IMPROVISATION?
DID_IT_IMPROVE_THE_USER_EXPERIENCE_MATERIALLY?
DID_IT_DUPLICATE_PRODUCT_DISCOVERY?
DID_IT_PRESERVE_PRODUCT_AUTHORITY?
DID_COMPLETE_UPSTREAM_INSTALL_AVOID_DEPENDENCY_BREAKAGE?
DID_POST_BUILD_UI_CHECKS_ADD_SIGNAL_WITHOUT_SECOND_REVIEW_LIFECYCLE?
DID_CEREMONY_CONTEXT_OR_TOOLING_GROW_DISPROPORTIONATELY?
```

## 12. Success condition

Issue #41 may close only when:

```text
SOURCE_ADJUDICATION=COMPLETE
UPSTREAM_INTEGRITY=PROVEN_FOR_SELECTED_INSTALL
PRIMARY_UI_UX_OWNER=SELECTED_OR_EXPLICITLY_NONE
OPTIONAL_GAP_PROVIDERS=BOUNDED
REAL_PROJECT_QUALIFICATION=PASS_OR_CLEAR_REJECT
ATENEA_DOCS_RECONCILED=YES
ATENEA_RUNTIME_GLUE_ADDED=NO_UNLESS_GAP_PROVEN
```

Until then:

```text
DESIGN_POLICY=ACTIVE
DESIGN_STACK_ADOPTION=NOT_FINAL
ATENEA_EXECUTION_PATH=UNCHANGED
```