# Atenea — Start Here

Status: **CURRENT FRONT DOOR — C-087**

## Current path

```text
runtime              = native OpenCode V2 (`opencode`, 2.0.22 known-good)
operator surface     = existing persistent Herdr workspace/pane
method               = upstream Matt skills, not forked by Atenea
default cost policy  = standard
default risk class   = volume
optional cost policy = free_only | go
writer volume        = nan/deepseek-v4-flash
writer complex       = nan/glm5.3-flash · high
writer context guard = 220k effective → auto-compact ~198k → keep ~15k
Standards review     = openai/gpt-6-luna · high
Spec review volume   = openai/gpt-6-luna · high
Spec review complex  = openai/gpt-6.1-sol · high
feature/train audit  = Cora when material
```

Bindings live in `.opencode/agents/`; routing is `docs/ATENEA_EXECUTION_ROUTING_V0.md`. C-087 retains the C-086 thin execution shape and adds hardened Cora preparation, child-readable authority transport and read-only post-run telemetry.

## Visible launch

Cora follows `docs/PRE_EXECUTION_HARDENING_V1.md` and prepares through `READY_TO_LAUNCH`; the human launches in the existing Herdr pane unless that specific launch was explicitly delegated:

```bash
cd <prepared-project-or-worktree>
opencode .
```

Select `atenea-complex`, `atenea-free` or `atenea-go` only when the accepted route requires it. The preferred first prompt references a repo-local durable handoff:

`Read @docs/handoffs/TRAIN_X.md and execute it under current repository/Atenea authority.`

Do not add `--pure`. Do not use `opencode run` as the normal real-work surface.

## 1. Entry

Establish only the facts that change the next action: correct repo/worktree/base, accepted work, clean/reconciled launch state, cost policy, risk class and publication boundary. Do not repeat shaping or archaeology when durable authority already exists.

When legacy harness/tooling state is ambiguous, use `REPOSITORY_ENTRY_RECONCILIATION_V1.md` read-only.

## 2. Select route

Default: `cost_policy: standard`, `risk_class: volume`.

Use `complex` for material semantic/acceptance risk such as cross-cutting architecture, difficult concurrency/temporal/state semantics, material security/privacy/trust boundaries, delicate migration/back-compat invariants or repeated semantic failure. File count, many tests, ordinary UI or business importance alone are not complex triggers.

`free_only` and `go` are human/project cost-policy choices. See `ATENEA_FREE_PROFILE_V0.md` and `ATENEA_GO_PROFILE_V0.md`. No cost profile silently falls back to another provider/model.

## 3. Shape upstream, execute downstream

Material product/human interaction decisions are closed before execution. Matt `/to-tickets` is upstream ticketization and is not wrapped in `atenea-*` execution profiles.

Once work is accepted/executable:

- one bounded issue → `/implement` through the selected Atenea coordinator;
- accepted multi-unit spec/task graph → `/implement-spec` when appropriate;
- implementation workers implement/TDD only;
- coordinator owns one canonical Standards + Spec review and any fresh correction dispatch.

Prefer durable authority by reference. Do not copy a handoff, `AGENTS.md`, coding standards or specialized policy prose into child prompts.

## 4. Conditional safeguards

Specialized safeguards are not always-on execution ceremony:

- `HUMAN_PRODUCT_DESIGN_AUTHORITY_V1.md` — attended upstream product design when material;
- `ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md` — expansive shaping only;
- `PRODUCT_FIDELITY_GATES_V1.md` — only the named fidelity/representation/shared-seam condition that is actually triggered;
- adversarial evidence — only for a concrete material claim/finding whose current evidence cannot falsify it;
- `PREPUBLICATION_ARTIFACT_VALIDATION_V1.md` — final changed-artifact/composed-candidate boundary.

The handoff says `Conditional safeguards: NONE` or names the relevant safeguard(s). Execution agents do not discover extra gates by keyword or ritual.

## 5. Evidence by phase

Writer: focused TDD and smallest relevant deterministic checks.

Integration: merge-sensitive/cross-slice checks when justified.

Review: inspect the fixed candidate and current evidence; create a concrete finding only when proof or semantics are insufficient.

Corrector: fix only supplied findings and run focused regression evidence.

Publication: run the broad/full or artifact-specific closeout justified by the final composed candidate.

Broad/full suites are not a per-slice default.

## 6. Current runtime economy

Standard Volume uses V4; Standard Complex uses GLM 5.3 Flash high. The OpenCode 2.0.22 user/runtime guard keeps an effective 220k context budget for these long-running NaN writers, auto-compacting around ~198k with ~15k recent verbatim retention. This is an airbag, not a target work-unit size and not permission to weaken evidence.

No quota router, percentage balancing, model carousel or mid-unit writer switch exists.

## 7. Publication

Review/audit never grants merge authority. Follow target-repository policy and explicit human authority. Clean up delivery worktrees only after durable accepted closeout.

## Historical authority

C-084 remains the native OpenCode V2 lifecycle baseline; C-085 the writer/context-economy amendment; C-086 the thin-execution restoration; C-087 is current. Earlier C-077–C-083 and Gentle/Pi/OpenCode V1 material is provenance.
