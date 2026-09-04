# Atenea — UI/UX Source Adjudication Result 2026-09-04

Status: **SOURCE_ADJUDICATION_COMPLETE / REAL_PROJECT_QUALIFICATION_PENDING**  
Tracking: **#41**  
Parent adjudication: `docs/UI_UX_UPSTREAM_ADJUDICATION_20260904.md`

This file records the source-level decision after reviewing the complete upstream workflows and their installation/runtime contracts. It does **not** authorize productive installation by itself. The selected candidate must still pass one bounded real-project qualification before Atenea treats it as qualified.

## Decision

```text
PRIMARY_UI_UX_OWNER_CANDIDATE=pbakaus/impeccable
SOURCE_ADJUDICATION=PASS
FIELD_QUALIFICATION=REQUIRED
ATENEA_CUSTOM_UI_FRAMEWORK=NO
STACKING_BY_DEFAULT=NO
FINAL_EXACT_CANDIDATE_AUTHORITY=GENTLE_RDD
```

The goal is not to assemble the best-looking fragments from several repositories. The goal is to adopt the smallest coherent upstream owner that covers the UI/UX problem without creating a second Atenea lifecycle.

## 1. `pbakaus/impeccable` — QUALIFY_IN_REAL_PROJECT

**Verdict:** primary candidate.

Qualification target:

```text
SKILL_RELEASE=skill-v4.1.3
SKILL_TAG_COMMIT=c0f495212236129c2e92aaf7714a3a9914569d13
UNIVERSAL_BUNDLE_SHA256=fdcb41a24ddfb613786e3141bc7bb8466a406ffbd437a2e302f4ca70181bed9f
CLI_VERSION=3.6.1
CLI_TAG=cli-v3.6.1
CLI_TAG_COMMIT=63b04e2530f5c7b41ea83c133daab24f34912456
```

Why it leads:

- one complete upstream workflow rather than a collection Atenea must compose;
- explicit generated distributions for **OpenCode and Pi**;
- `shape` explicitly plans UX/UI before code and stops with a confirmed design brief;
- new visual-world work is conditional rather than forced onto every UI change;
- existing visual authority is preserved when a coherent incumbent system exists;
- `document` follows the official Google `DESIGN.md` format;
- deterministic detector, technical `audit`, browser/live tooling and optional design `critique` live in the same upstream;
- source behavior degrades explicitly when optional facilities are unavailable rather than requiring Atenea adapters;
- no local fork or skill cherry-picking is required.

### Important boundaries

`PRODUCT.md` is a real Impeccable workflow dependency for new visual work. On established Atenea verticals it MUST remain a derived compatibility projection when canonical product truth lives elsewhere. `/impeccable init` must not silently replace established product authority.

The release's concept-selection flow may contact `impeccable.style` for catalog challengers and emits anonymous choice telemetry unless `DO_NOT_TRACK` or `IMPECCABLE_NO_TELEMETRY` is set. If the catalog/API is unavailable it degrades to assignment-only behavior. This is upstream-owned behavior, not a reason to build an Atenea service; qualification should explicitly record the chosen telemetry policy and offline/degraded behavior.

OpenCode/Pi currently do not receive Impeccable's edit-hook enforcement. That is **non-blocking by default**. Atenea will not create a local hook adapter merely for parity.

`critique` is **not** a mandatory second review lifecycle. It requires two isolated assessments when a usable subagent surface exists and must label degraded single-context runs otherwise. Use only when a material visual/UX judgment gap warrants it. Gentle remains final exact-candidate review authority.

### Reproducible install policy

The normal `npx impeccable install/update` path downloads the current universal bundle, so pinning the npm CLI alone is not enough for an Atenea qualification pin.

Upstream publishes a versioned `universal.zip` for `skill-v4.1.3` with a GitHub-provided SHA-256 digest. The real-project qualification must use that exact complete release bundle (or an equivalently exact upstream checkout/build) and the upstream install/link surface without reconstructing provider files.

The qualification is responsible for proving the exact mechanics before those mechanics are documented as Atenea installation authority.

## 2. `google-labs-code/design.md` — ACCEPT_FORMAT / QUALIFY_ORACLE_WHEN_USED

**Verdict:** accepted durable visual-system format when a project warrants `DESIGN.md`; the CLI is a deterministic oracle to pin when used.

Current audited source:

```text
REPO_COMMIT=9bf8eae67128b6cc55ad9bf86665767deb4c11cd
CLI_PACKAGE=@google/design.md
CLI_VERSION=0.4.0
FORMAT_STATUS=alpha
```

The format cleanly separates machine-readable tokens from human-readable rationale and provides deterministic `lint`, `diff` and export operations. Impeccable already writes this official format, so Atenea should consume it through the selected upstream rather than invent another token schema.

Because the format remains alpha, any deterministic CLI invocation used as a gate must be version-pinned and evidence must name that version. `DESIGN.md` remains visual-system authority only; it does not become product/domain authority.

## 3. `touchine-ojo/OJO-Design-Skills` — REFERENCE_ONLY

**Verdict:** strongest shaping challenger, not selected as Atenea's base owner.

Strengths:

- coherent small upstream package;
- explicit OpenCode installer;
- installer supports `--ref <tag-or-commit>` and `--dry-run`;
- strong Convention vs Innovation shaping model;
- mandatory human confirmation between distinct style directions before token/spec generation.

Reason not selected: the complete workflow does not stop cleanly at Atenea's shaping boundary. Its post-visual-DNA orchestration instructs the parent flow to continue directly into PRD persistence and initial code generation without another user confirmation. Removing that behavior locally would mean editing the upstream workflow we just decided not to reconstruct.

```text
OJO_UPSTREAM_INTEGRITY=PASS
OJO_DESIGN_SHAPING=STRONG
OJO_ATENEA_LIFECYCLE_COMPOSABILITY=FAIL_AS_DEFAULT
LOCAL_PATCH_TO_FIT_ATENEA=FORBIDDEN
```

Keep as a reference against which Impeccable's real-project shaping quality can be judged.

## 4. `google-labs-code/stitch-skills` — DEFER

**Verdict:** potentially valuable external visual lab; not an Atenea core dependency today.

OpenCode support currently requires manual copying of selected skills, renaming some skill names/directories, adapting tool names, and configuring the Stitch MCP. Upstream also warns that Stitch skills have interdependencies.

That is incompatible with the current Upstream Integrity Rule for core adoption:

```text
OPENCODE_COMPLETE_SUPPORTED_INSTALL=NO
LOCAL_NAME_TOOL_ADAPTATION_REQUIRED=YES
INTERDEPENDENCIES_EXIST=YES
```

Do not build an Atenea-maintained Stitch compatibility pack. Re-evaluate if upstream later provides a complete supported OpenCode/Pi surface. External/manual use for visual exploration can still be considered separately when it materially helps a project.

## 5. `carlsz/ux-agent-skills` — DEFER_AS_GAP_PROVIDER

**Verdict:** do not install by default.

It provides useful heuristic audits, Critical User Journeys, live replay, visual walkthrough reports and normalized severity reporting. However its primary install surface is a Claude plugin, it declares `web-quality-skills` as a dependency for parts of the roll-up, it creates its own `.ux/` report/CUJ authority, and its roll-up emits a separate go/no-go verdict.

That is too much parallel lifecycle surface to add speculatively. Qualify only if a real product demonstrates that Impeccable + normal product acceptance + existing browser/tests cannot protect an important multi-step journey.

## 6. `addyosmani/web-quality-skills` — DEFER_AS_MEASUREMENT_GAP_PROVIDER

**Verdict:** strong optional oracle, not part of the initial stack.

Its measurement-first Lighthouse/DevTools/Core Web Vitals/WCAG focus is complementary and narrower than a design workflow. If the real qualification shows Impeccable `audit` lacks sufficient measured performance/accessibility evidence, this is the first specialist provider to evaluate.

Do not install it merely to obtain another scorecard.

## 7. `anthropics/skills` `frontend-design` — REFERENCE_ONLY

**Verdict:** high-quality aesthetic reference, not selected as workflow owner.

The skill contains valuable subject-specific design, anti-template and typography guidance, but its own process is `plan → review → build → critique`. It is an implementation-oriented design skill rather than a complete Atenea-compatible pre-code/post-build ownership model, and it would overlap substantially with Impeccable's craft guidance.

Use it as a benchmark for distinctiveness, not as a second installed design authority.

## 8. `nextlevelbuilder/ui-ux-pro-max-skill` — REFERENCE_ONLY

**Verdict:** useful design-intelligence corpus, not selected as base workflow.

It has broad style/product/color/type datasets, a recommendation engine and explicit OpenCode support. Its strength is recommendation/search breadth, not human-present product/UX shaping or Atenea lifecycle ownership. Installing it beside Impeccable would mainly add a second taste/recommendation authority.

Keep as reference if Impeccable repeatedly produces weak domain-specific style choices; do not stack pre-emptively.

## 9. `Leonxlnx/taste-skill` — REFERENCE_ONLY / DEFER_V2

**Verdict:** anti-slop implementation reference, not base workflow.

The current default `design-taste-frontend` v2 is explicitly experimental and targets landing pages, portfolios and redesigns rather than dashboards/data tables/multi-step product UI. The repository is intentionally a collection of multiple implementation/image-generation skills rather than one UI/UX ownership workflow.

Its guidance is useful as a challenger for visual quality, but Atenea should not cherry-pick its attractive sub-skills into a custom bundle.

## 10. `osmontero/opencode-skills` — REJECT_AS_ATENEA_UI_DEPENDENCY / REFERENCE_ONLY

**Verdict:** do not adopt as the UI/UX upstream.

The repository is an OpenCode-native aggregation containing adapted material from Anthropic, Superpowers, OpenCode and local originals. Its design cluster is technically useful, but making this an Atenea dependency would reintroduce a repackaging layer between Atenea and the original upstream owners while also importing a much larger parallel development workflow.

Reference individual ideas when useful; prefer their original upstream owners for adoption.

## Selected ownership model for real qualification

```text
HUMAN + CORA
→ classify repo/stage
→ product/domain shaping first
   GREENFIELD: Matt upstream
   BROWNFIELD: repo-native + OpenSpec when useful
→ UI_UX_MATERIAL?
   NO  → continue normal shaping
   YES → Impeccable complete upstream, selectively invoke relevant capability
          usually `shape`; `document` when durable incumbent visual authority is needed
          return PRODUCT_SEMANTIC_GAP upward rather than inventing behavior
→ durable product/spec/design authority
→ human promotes EXECUTION_READY

POST EXECUTION_READY
→ normal Atenea runtime unchanged
→ deterministic UI/browser checks warranted by the work
→ Impeccable `audit` when it adds material technical UI evidence
→ Impeccable `critique` only when a real visual/UX judgment gap warrants it
→ Gentle exact-candidate RDD remains final review authority
→ normal publication / human merge boundary
```

## Real-project qualification exit criteria

The next phase must prove all of the following on one bounded meaningful user-facing feature:

```text
PINNED_COMPLETE_IMPECCABLE_INSTALL=PASS
OPENCODE_AND_OR_PI_DISCOVERY=PASS_FOR_THE_ACTUAL_SHAPING_ROUTE
PRODUCT_AUTHORITY_DUPLICATION=NO
UI_UX_SHAPE_REDUCED_BUILDER_AMBIGUITY=YES
UNNECESSARY_REPEAT_PRODUCT_DISCOVERY=NO_OR_ACCEPTABLE
DESIGN_MD_AUTHORITY_COHERENT=YES_WHEN_USED
NO_ATENEA_UI_GLUE=YES
NO_SECOND_DELIVERY_LIFECYCLE=YES
POST_BUILD_UI_EVIDENCE=USEFUL_AND_BOUNDED
CRITIQUE=OPTIONAL_AND_NONAUTHORITATIVE_IF_USED
GENTLE_FINAL_AUTHORITY=PRESERVED
HUMAN_VALUE_ADDED=YES
```

If those conditions fail, reject or narrow Impeccable rather than patching it locally.

## Current state

```text
SOURCE_ADJUDICATION=COMPLETE
PRIMARY_CANDIDATE=IMPECCABLE_SKILL_V4.1.3
REAL_PROJECT_QUALIFICATION=PENDING
PRODUCTIVE_INSTALLATION_AUTHORIZED=NO
ATENEA_RUNTIME_CHANGED=NO
STACKING_BY_DEFAULT=NO
```
