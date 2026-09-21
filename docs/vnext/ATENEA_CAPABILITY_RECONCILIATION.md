# Atenea vNext — Capability Reconciliation

Status: **P1 COMPLETE / WORKING DECISION MATRIX**

Date: 2026-09-21

Branch: `vnext/upstream-first-reconciliation`

Evidence baseline:

- current `main` authority as of 2026-09-21;
- current VPS production state;
- P0 clean/native qualification in `P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`;
- current Gentle Shell 3.3.0 / Gentle AI 3.4.0 behavior;
- open upstream defects explicitly named below.

This document is an **audit and classification**, not a deletion commit. No current production/VPS runtime surface is removed here.

## 1. Executive conclusion

The historical repository is large, but the Atenea-owned runtime surface is small.

Current `main` contains approximately:

- 37 vendored upstream Matt Pocock skills;
- 55 documentation files;
- 1 Atenea-specific Pi extension;
- 2 Gentle 3.3 compatibility patches;
- 31 tools, many of which are tests/fixtures rather than runtime;
- 1 repo-local Gentle profile pin.

P0 demonstrated that a real PROMueve work unit can complete:

```text
native Pi
→ native Gentle Shell / ODD
→ native worker delegation
→ deterministic verification
→ work-unit commit
→ native RDD
→ real reviewer completion
→ approved
→ acknowledge-approved
→ authority burned
```

without Atenea runtime glue.

The reconciliation therefore confirms the vNext direction:

> Atenea should retain policy, repository/domain guardrails, deterministic evidence and a small amount of reproducible configuration. Gentle should own engineering execution and review lifecycle.

## 2. Classification vocabulary

- **KEEP** — unique useful capability remains in Atenea.
- **MOVE_TO_POLICY** — retain intent, remove runtime machinery.
- **MOVE_TO_SKILL** — operational convention belongs in a concise reusable command/skill.
- **MOVE_TO_CI_OR_ORACLE** — deterministic evidence, not agent/runtime authority.
- **REPLACE_WITH_UPSTREAM** — Pi/Gentle now owns the lifecycle.
- **TEMP_COMPAT** — narrow removable compatibility seam while an upstream defect remains open.
- **DELETE_FROM_ACTIVE** — no longer belongs in the active vNext runtime/tree; provenance stays in Git/docs.
- **DEFER_PHASE_3** — shaping capability deliberately not adjudicated in P1.
- **EXPERIMENT** — value plausible, not yet earned as permanent vNext core.

## 3. Stable policy and authority

| Capability | Current surface | Decision | P1 finding |
| --- | --- | --- | --- |
| Horizontal engineering quality | `CODING_STANDARDS.md` | **KEEP** | This is already the right vNext shape: repo-local quality rules, no execution controller, no competing RDD. Do not substantially rewrite in P1/P2. |
| Agent/repository instructions | `AGENTS.md` | **MOVE_TO_POLICY** | Keep Atenea's real repo-specific delta and Matt-generated `## Agent skills` setup. Later remove duplicated Gentle lifecycle mechanics/routing tables that upstream already owns. |
| Issue tracker / triage / domain-doc setup | `AGENTS.md`, `docs/agents/*` | **KEEP** | Durable repository authority consumed by tools/skills; not runtime orchestration. |
| Human merge boundary / no destructive history | AGENTS + contract + runbooks | **KEEP** | Human-owned Git boundary remains distinct from Gentle review authority. |
| Fail-closed ambiguity / authority conflict | AGENTS + contract | **KEEP** | Stable safety policy; valuable above any particular runtime version. |
| Repository-entry reconciliation | `REPOSITORY_ENTRY_RECONCILIATION_V1.md` | **MOVE_TO_POLICY** | Useful planning/continuation policy; no runtime controller needed. |
| Work-unit reviewability policy | `WORK_UNIT_COMPOSITION_POLICY_V1.md` | **MOVE_TO_POLICY** | Preserve coherence/reviewability intent. 600/800 bands are Atenea operator heuristics, not upstream law; keep clearly labelled as such. |
| Changed-file-aware pre-publication validation | `PREPUBLICATION_ARTIFACT_VALIDATION_V1.md` | **MOVE_TO_CI_OR_ORACLE** | Strong retained capability. Product tests/RDD do not prove workflow YAML, credential capability or CI-runtime parity. Implement evidence through repo-native validators/CI, not repeated LLM reasoning. |
| Worktree / qualification hygiene | `WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` | **MOVE_TO_POLICY** | Keep non-destructive hygiene rules; automate only deterministic inventory where useful. |
| Conditional promotion audit | `PROMOTION_REVIEW_V1.md` | **EXPERIMENT** | It is not a second RDD and may still be useful at selected human promotion boundaries. Must prove incremental value before becoming Minimal Core. |
| Front-door / harness contract | README, START_HERE, Harness Contract | **MOVE_TO_POLICY** | Intent survives; current GP3.3-specific mechanics are too detailed for permanent authority and will be rewritten after Minimal Core is fixed. |

### 3.1 `AGENTS.md` target layering

The current file mixes three legitimate but different sources:

1. upstream Matt/setup-generated repository instructions;
2. Atenea repo/domain/safety policy;
3. fast-changing Gentle/Pi execution mechanics.

vNext should preserve 1 and 2 and minimize 3.

Target:

```text
AGENTS.md
├── stable repo/domain/authority boundaries
├── stable engineering/safety delta
├── Agent skills block generated/maintained by upstream setup
└── short pointer to supported Gentle execution
```

It should not become a second Gentle manual.

## 4. Shaping layer — deliberately not decided in P1

| Capability | Current surface | Decision |
| --- | --- | --- |
| Full Matt Pocock skill set (37 skills) | `.agents/skills/*`, `skills-lock.json` | **DEFER_PHASE_3** |
| Greenfield Matt shaping | START_HERE / skills | **DEFER_PHASE_3** |
| OpenSpec delta-first brownfield shaping | docs | **DEFER_PHASE_3** |
| Repository Intelligence policy/providers | docs | **DEFER_PHASE_3 / EXPERIMENT** |
| UI/UX upstream shaping policy | docs | **DEFER_PHASE_3** |

No Matt skill is deleted, edited or partially cherry-picked in P1.

The Phase 3 question is not whether those skills are individually good. It is whether pre-Gentle shaping adds measurable value over native ODD / a minimal execution contract / Gentle-native SDD for each project class.

## 5. Runtime ownership now demonstrably upstream

| Capability | Historical/current Atenea involvement | Decision | Evidence |
| --- | --- | --- | --- |
| Technical exploration/classification | policy around parent | **REPLACE_WITH_UPSTREAM** | Gentle Shell/ODD does it natively. |
| Internal task decomposition | historical supervisor/work-unit mechanics | **REPLACE_WITH_UPSTREAM** | P0 + current GP3.3 ODD. |
| Worker delegation | historical spawn/supervision logic | **REPLACE_WITH_UPSTREAM** | Native `gentle-ai-worker` qualified on real PROMueve. |
| Allowed-edit enforcement | prompt/worker contracts historically | **REPLACE_WITH_UPSTREAM** | Native Gentle rejected malformed handoff and enforced `## Allowed edit surfaces`. |
| Worker verification routing | custom role policy around workers | **REPLACE_WITH_UPSTREAM** for lifecycle; **KEEP CONFIG** for user-owned model routing | Native `gentle-ai-verify` owns execution. |
| Work-unit commits | historical outer train policy | **REPLACE_WITH_UPSTREAM** | Native Gentle work-unit behavior qualified. |
| Exact candidate identity | no custom owner allowed | **REPLACE_WITH_UPSTREAM** | Gentle AI sole authority. |
| Risk / review timing | Atenea policy + assess shim | **REPLACE_WITH_UPSTREAM** conceptually; see TEMP_COMPAT below | Provider/Gentle owns `review_due`. |
| Reviewer/refuter/validator lifecycle | historical lifecycle contract/relay | **REPLACE_WITH_UPSTREAM** | P0 native review completed approved/burned. |
| Review consent / one-touch session authority | historical relay / host bridge | **REPLACE_WITH_UPSTREAM** | GP3.3 host owns `Review and allow this session`. |
| Acknowledge-approved / burn | policy only | **REPLACE_WITH_UPSTREAM** | P0 real lineage produced terminal consumption record. |
| Review recovery/correction | historical detailed docs | **REPLACE_WITH_UPSTREAM** | Never rebuild in Atenea. |
| Merge | never upstream-autonomous | **KEEP HUMAN BOUNDARY** | Review approval is not merge authority. |

## 6. Compatibility seams

### 6.1 Historical RDD consent relay

Surfaces:

- `extensions/atenea-rdd-consent-relay.mjs`
- `tools/check-atenea-rdd-consent-relay.mjs`
- historical pi-intercom spawn/relay documents;
- VPS plugin `/srv/kairos-lab/herdr-plugins/atenea-rdd-consent`.

Decision:

**DELETE_FROM_ACTIVE**

Reason:

- current contract already says there is no normal external supervisor/pi-intercom consent relay;
- GP3.3 owns the first human session grant and subsequent same-session grants;
- P0 completed real review without this relay.

Important VPS finding:

`/home/hermes/.config/herdr/plugins.json` still has `atenea.rdd-consent` **enabled=true** even though no relay/intercom process was observed running during the P1 audit.

Do not delete it opportunistically during P1. Remove it as part of the controlled Phase 6 VPS cleanup after rollback evidence is preserved.

### 6.2 pi-intercom unattended configuration

Surfaces:

- `tools/check-pi-intercom-unattended-config.mjs`
- test;
- historical spawn recipe / docs.

Decision:

**DELETE_FROM_ACTIVE**

It belongs to the superseded supervisor/worker relay topology. Retain historical field evidence in Git/docs, not in the Minimal Core runtime.

### 6.3 GP3.3 host bridge

Surfaces:

- `patches/gentle-pi-3.3.0-atenea-host-bridge.patch`
- host half of `tools/apply-gentle-330-atenea-host-bridge.sh`.

Adds:

- `gentle_review_capture_current_group`;
- `host_consent_resolved` signal.

Decision:

**REPLACE_WITH_UPSTREAM CANDIDATE**, then **DELETE_FROM_ACTIVE** after one narrow final equivalence canary if desired.

Why not classify as permanent TEMP_COMPAT:

- P0 clean/native used stock gentle-pi 3.3.0 and completed the ordinary real review lifecycle;
- the host already owns consent;
- native capture tools already own reviewer execution.

Residual uncertainty:

P0's resumed PROMueve slot was one lens. Before deleting the patch from every rollback path, one stock multi-lens materialize group canary may be useful to prove that model-visible exact binding reuse is operationally acceptable without `current_group`.

This canary must not block productive PROMueve use through the qualified native path.

### 6.4 GP3.3 ASSESS bridge

Surfaces:

- `patches/gentle-pi-3.3.0-atenea-assess-bridge.patch`;
- assess half of `tools/apply-gentle-330-atenea-host-bridge.sh`;
- Atenea #90.

Decision:

**TEMP_COMPAT** — do **not** delete yet.

The upstream problem remains open:

- Gentle Shell #1175: assessment decoder requires optional `reason.detail`;
- Atenea #90: committed-range ASSESS can lose or fail to project provider assessment/timing.

The local patch also preserves Gentle AI 3.4 additive fields:

- `candidate.consumed`;
- `review_due`;
- `review_due_reason`;
- provider `next_transition`.

Deletion trigger:

```text
stock supported Gentle Pi
→ committed-range ASSESS decodes schema-valid optional reason fields
→ exposes provider review_due / review_due_reason / continuation
→ bounded regression canary passes
→ remove patch
```

No second review controller is justified.

## 7. Deterministic tools / oracles

| Surface | Decision | Rationale |
| --- | --- | --- |
| `tools/check-current-authority.mjs` | **MOVE_TO_CI_OR_ORACLE / REWRITE** | Useful consistency checker, but currently freezes historical GP3.3 routing/bridge assumptions. Keep the pattern, rewrite assertions for vNext authority. |
| `tools/atenea-reviewer-lifecycle-contract.mjs` | **MOVE_TO_CI_OR_ORACLE** | Explicitly test-only. Useful provider/upstream conformance oracle; never import into runtime. |
| `tools/check-atenea-reviewer-lifecycle.mjs` + fixture | **MOVE_TO_CI_OR_ORACLE / REWRITE** | Keep only invariants that remain meaningful against native Gentle; remove assumptions tied to historical Atenea transport. |
| `tools/check-nan-runtime-config.mjs` | **MOVE_TO_CI_OR_ORACLE / REWRITE** | Provider/model capability checks are useful. Current hard-coded OpenCode + `atenea-one-touch` role matrix is already stale against P0 and must not become new authority. |
| `tools/check-nan-runtime-config.test.mjs` | follows rewritten checker | Tests stay if checker survives. |
| `tools/effective-mode/*` | **DELETE_FROM_ACTIVE / ARCHIVE IN GIT HISTORY** | ADR explicitly says Stage 4 qualification fixture, not production infrastructure. It should not occupy Minimal Core runtime. |
| `CONTEXT.md` current effective-mode vocabulary | **REWRITE LATER** | Current file primarily documents a non-production Stage 4 fixture. vNext needs a project context describing the actual thin policy layer. |

## 8. Model routing and profiles

### 8.1 Native ownership

Model/effort routing is user-owned configuration supported directly by Gentle:

- `~/.pi/gentle-ai/models.json`;
- `~/.pi/gentle-ai/profiles.json`;
- `/gentle:models`;
- `/gentle:profiles`.

Atenea should not create a routing engine.

Decision:

**KEEP CONFIG INTENT / REPLACE IMPLEMENTATION WITH NATIVE GENTLE**

### 8.2 Current production global state

P1 observed on the VPS production HOME:

```text
Pi 0.86.1
gentle-pi 3.3.0
default = nan/deepseek-v4-flash · medium
active Gentle profile = atenea-one-touch
```

Current production profile still routes:

- worker GLM high;
- verify/readability/reliability/validator Luna high;
- resilience/refuter DeepSeek high;
- risk GLM high.

Profiles still present include historical qualification variants.

This is **hidden global state** and is intentionally not cleaned during P1.

### 8.3 P0 native profile

The isolated qualified profile is:

`native-nan`

with NaN-only role routing for the P0 environment and review roles set to GLM `thinking=low` after the real reviewer reproduction.

This profile is evidence that native routing is enough. It is not yet a declaration that every future vNext role must use one model.

### 8.4 Repo-local Atenea pin

Current repository file:

`.pi/gentle-ai/profile.json → atenea-one-touch`

Decision:

**REPLACE / REMOVE FROM vNext unless a repo-local pin demonstrates continuing value.**

A vNext profile must not silently resurrect historical routing merely because a clone is opened.

Preferred Phase 2 direction:

- version a small reproducible **profile specification/export** if necessary;
- let native Gentle apply it;
- avoid a second Atenea routing schema;
- minimize hidden global state.

## 9. Launcher and environment isolation

P0's local `gentle-native` launcher:

- points Pi/Gentle at an isolated HOME;
- removes inherited `ATENEA_*`, `PI_INTERCOM_*`, stale Gentle/Pi environment state;
- starts the supported native stack.

Decision:

**KEEP TEMPORARILY AS RECOVERY/ISOLATION TOOL**, not as permanent Atenea architecture.

Its purpose is to shield productive work from the still-dirty historical VPS HOME.

Phase 6 target:

```text
clean supported normal HOME
+ upstream Pi/Gentle install
+ native model profile
+ small versioned Atenea policy/config
```

If that normal environment becomes reproducible, the special launcher may disappear.

## 10. Herdr

Current accepted principle:

Herdr is process/session/observability substrate, not policy or review authority.

P0 itself did not require Atenea-specific Herdr control to execute the lifecycle.

Decision:

**EXPERIMENT / OPTIONAL OPERATOR SUBSTRATE**

Keep Herdr if it materially improves visible persistent operation. Do not make productive correctness depend on:

- Herdr policy plugins;
- Herdr RDD relay;
- RPA consent;
- Herdr-specific authority state.

The currently enabled legacy RDD-consent plugin is Phase 6 cleanup debt.

## 11. Engram

No Atenea-owned Engram runtime implementation exists in the current repository tree.

Native Gentle installation may install/use Gentle Engram as auxiliary memory.

Global `/home/hermes/AGENTS.md` already states that Engram is auxiliary and may be stale.

Decision:

**REPLACE_WITH_UPSTREAM / AUXILIARY ONLY**

No Atenea memory controller, authority or lifecycle should be built around Engram.

## 12. Historical evidence and documentation volume

Atenea's large document set contains valuable decision provenance across multiple runtime epochs.

Decision:

- **KEEP PROVENANCE**;
- **DELETE FROM CURRENT READ PATH** when vNext is promoted;
- do not preserve old runtime merely because its evidence is valuable.

Phase 7 should make the distinction explicit:

```text
current/
  minimal vNext authority

historical evidence/
  old topology, qualification, rollback provenance
```

Git history already preserves deleted source bytes; not every superseded fixture/bridge must remain in the active tree forever.

## 13. Publication / GitHub workflow

Retain:

- normal non-force push only where repository policy allows;
- no automatic merge;
- no hidden force/reset/rebase recovery;
- artifact-aware validation before publication;
- credential capability matched to changed artifact;
- human promotion/merge boundary.

Decision:

**MOVE_TO_POLICY + MOVE_TO_CI_OR_ORACLE**

Repeated publication ceremony should eventually become a concise skill/command plus deterministic CI evidence rather than a large execution prompt.

## 14. P1 deletion / retention map

### Strong KEEP

- `CODING_STANDARDS.md`;
- stable repo/domain/authority boundaries in `AGENTS.md`;
- human merge boundary;
- fail-closed ambiguity/authority rules;
- repository-entry continuation policy;
- work-unit composition intent;
- changed-file-aware publication validation;
- worktree hygiene;
- historical decision provenance.

### Keep but simplify / relocate

- harness contract → thin policy contract;
- AGENTS → stable Atenea delta + upstream Agent skills block;
- runbook → small operator path / skill;
- routing → native Gentle profile/config;
- current-authority checker → vNext conformance oracle;
- reviewer lifecycle test → upstream-conformance oracle;
- NaN checker → provider capability/profile conformance, not historical routing authority.

### Replace with upstream

- execution decomposition;
- worker spawning/delegation;
- allowed-edit enforcement;
- verification lifecycle;
- work-unit commit lifecycle;
- exact candidate/review state;
- risk/review timing;
- reviewer/refuter/validator execution;
- one-touch consent;
- acknowledgement/burn;
- recovery/correction lifecycle;
- Engram integration.

### Temporary compatibility only

- GP3.3 ASSESS bridge while #1175 / Atenea #90 remain unresolved.

### Delete from active vNext runtime

- Atenea RDD consent relay extension;
- Herdr Atenea RDD consent plugin;
- pi-intercom unattended checker/runtime assumptions;
- historical spawn/relay active mechanics;
- Stage 4 `effective-mode` fixture;
- historical profile variants;
- GP3.3 host bridge after optional stock multi-lens equivalence canary;
- obsolete routing pin/check assertions;
- old runtime recipes after vNext promotion.

### Deferred intact to Phase 3

- all 37 Matt Pocock skills;
- Matt shaping workflow;
- OpenSpec shaping role;
- Repository Intelligence provider choice;
- UI/UX shaping stack.

## 15. P1 immediate operational conclusion for PROMueve

The P1 audit does **not** require waiting for a full Atenea rewrite before returning to product work.

Use the isolated qualified native path:

`gentle-native`

Reason:

- stock native Pi/Gentle execution path is P0-qualified;
- it is isolated from the production HOME's stale `atenea-one-touch` routing and enabled legacy Herdr relay plugin;
- Atenea runtime glue is not needed for the qualified PROMueve lifecycle.

Known fail-closed exception:

If a future committed-range `gentle_review assess` hits the still-open schema/projection defect, STOP rather than synthesize START. That seam remains TEMP_COMPAT / upstream debt and is not permission to rebuild an Atenea controller.

## 16. Phase 1 completion

### P1.1 Inventory active surfaces

**COMPLETE**

Audited:

- `AGENTS.md`;
- `CODING_STANDARDS.md`;
- current contracts/policies;
- `.pi/`;
- `.agents/`;
- extensions;
- patches;
- launch/run recipes;
- Herdr and enabled legacy plugin state;
- relay/intercom machinery;
- reviewer continuation/lifecycle machinery;
- RDD seams;
- worker/delegation ownership;
- model routing/profiles;
- global vs repo-local state;
- Engram boundary;
- environment/mode fixture;
- deterministic oracles;
- pre-publication gates;
- work-unit composition;
- Git/publication boundaries;
- historical compatibility surfaces.

### P1.2 Capability reconciliation matrix

**COMPLETE**

Every material capability has an upstream owner and a vNext classification.

### P1.3 Obvious replacements/deletions identified

**COMPLETE — no destructive cleanup performed.**

The largest active-runtime deletion candidates are the old relay/intercom surfaces and historical fixtures. The one compatibility seam not yet safe to delete is committed-range ASSESS.

## 17. Next architectural step

P2 can now define the Minimal Core from the **positive set**, rather than slimming the historical harness in place.

The likely candidate is intentionally small:

```text
Atenea Minimal Core
├── stable AGENTS policy delta
├── CODING_STANDARDS.md
├── project-entry / authority policy
├── work-unit composition policy
├── publication / Git boundaries
├── deterministic conformance oracles
└── reproducible native Gentle provider/profile configuration
```

Everything else must re-earn inclusion.
