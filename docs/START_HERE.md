# Atenea — Start Here

Status: **CURRENT FRONT DOOR — C-085**

## Current path

```text
runtime             = native OpenCode V2 (`opencode`, currently 2.0.22)
operator surface    = existing persistent Herdr workspace/pane
method              = upstream Matt skills, not forked by Atenea
default cost policy = standard
default risk class  = volume
risk class          = complex when triggered
optional cost policy = free_only → `atenea-free`
writer volume       = nan/deepseek-v4-flash
writer complex      = nan/glm5.3-flash · high
writer context guard= 220k effective → auto-compact ~198k → keep ~15k
volume correction   = nan/deepseek-v4-flash
complex correction  = nan/glm5.3-flash · high
Standards review    = openai/gpt-6-luna · high
Spec review volume  = openai/gpt-6-luna · high
Spec review complex = openai/gpt-6.1-sol · high
feature/train audit = Cora when material
```

OpenCode project bindings are declared in `.opencode/agents/`; the policy snapshot is `docs/ATENEA_EXECUTION_ROUTING_V0.md`.

## Visible launch boundary

Herdr is already running. Do not launch a new Herdr instance per ticket/train. For real work, Cora prepares everything through `READY_TO_LAUNCH`; the human operator performs the final visible launch.

Cora returns an exact launch packet. The ordinary shell part is:

```bash
cd <prepared-project-or-worktree>
opencode .
```

The human runs those commands in the project's visible Herdr pane, verifies the path/TUI, selects the required agent when needed, pastes the exact prompt supplied by Cora and presses Enter. Cora does not independently start the real OpenCode session or submit the train prompt unless the human explicitly authorizes automated launch for that specific unit.

A new standard session starts on `atenea-volume` when the project declares it as `default_agent`. For `standard + complex`, select `atenea-complex` in the visible TUI **before** submitting the execution handoff. For human/project `free_only`, select `atenea-free` regardless of risk class and state `Risk class: volume|complex` in the handoff. Use `/agents`, `Ctrl+X` then `A`, or `Shift+Tab`.

The preferred first prompt is short and references the durable prepared handoff, for example: `Read @docs/handoffs/TRAIN_X.md and execute it under current repository/Atenea authority.`

Do not add `--pure`: it is a V1 flag and is not part of native OpenCode V2. Do not use `opencode run` as the normal train surface; it is reserved for bounded automation/smokes, not for bypassing the human launch boundary on real work.

## 1. Entry

Establish the correct repository/worktree/base, current accepted issue/spec/ticket, applicable repository authority and publication boundary. Refresh the intended remote ref and ensure the exact local HEAD that will execute already contains the prepared handoff and is reconciled with its intended upstream; do not make OpenCode repair stale launch state as part of the train. Do not repeat shaping or archaeology when executable authority already exists.

When legacy harness/tooling state is ambiguous, use `REPOSITORY_ENTRY_RECONCILIATION_V1.md` read-only first.

## 2. Select cost policy and risk class

Default to `cost_policy: standard` and `risk_class: volume`. Use `risk_class: complex` for material semantic/acceptance risk: cross-cutting architecture, difficult state/concurrency/temporal semantics, material security/privacy/auth/tenancy/clinical trust boundaries, delicate migration/back-compat invariants or repeated semantic failure. File count, ticket length, ordinary UI, many tests or business importance alone are not complex triggers.

The human/project may set `cost_policy: free_only` for any work, including complex work. Cora may recommend a paid route, but cannot override that cost decision. `free_only` routes through `atenea-free`; check current zero-cost bindings with `node tools/check-free-models.mjs`. Missing/unavailable Free bindings are STOP, not permission to spend. See `ATENEA_FREE_PROFILE_V0.md`.

## 3. Execute through Matt

Single bounded issue/ticket: use `/implement` through the selected Atenea profile.

Whole accepted spec/task graph: use `/implement-spec` through the selected Atenea profile.

Matt owns TDD, task-graph/frontier behavior, implementation worktrees and its two-axis code-review method. Atenea supplies only named role/model bindings and repository guardrails. The selected primary Atenea coordinator owns that Matt lifecycle: implementation workers implement/TDD and return a fixed candidate; the coordinator then runs the **single canonical** Standards + Spec review and dispatches any fresh corrector. Do not nest `/implement` inside the implementer or review the same candidate/fixed point twice unless the earlier review failed technically, was incomplete or used the wrong anchor.

Prefer a durable project handoff for material work, then reference it from the visible TUI (for example `@docs/handoffs/TRAIN_X.md`) rather than pasting a giant prompt repeatedly.

Before OpenCode receives that handoff, Cora + human must have completed any **material product shaping interactively**. Cora reduces material interpretive freedom: exact outcome, in-scope surface, fixed decisions, preserved invariants, non-goals and closure evidence should be clear, with no open material product question. For material human-facing work, apply `HUMAN_PRODUCT_DESIGN_AUTHORITY_V1.md` **before technical/spec grilling**: shape the real-world task, interaction hypothesis, default path, representation and friction budget first; Matt/spec grilling is the second filter, followed by an attended human-product recheck before freeze. For expansive shaping (for example `grilling → to-spec → to-tickets`), follow `ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md`: preserve non-negotiable product rails and reconcile product fidelity before synthesis/ticketization. For material UI/product decomposition and accumulation, also apply `PRODUCT_FIDELITY_GATES_V1.md`: internal aggregate/module boundaries do not become UI surfaces by default, locally correct slices do not prove the composed product, and any translation of accepted semantics must pass the representation-narrowing check. A new UI/input/adapter/schema/export representation may simplify presentation but may not silently reduce accepted precision, cardinality, range, states, combinations or other representable distinctions. Atenea execution models implement within that envelope; they do not discover product intent, answer their own shaping questions or reopen architecture. If execution exposes such a question, an unauthorized material narrowing, a materially affected supported consumer/sibling path outside the current evidence envelope, or composed UI drift from accepted product authority, HUMAN STOP back to Cora + human. Shared-seam blast radius is behavioral: zero diff in a downstream surface does not prove `NO TOCA`, and a discovered invariant must be checked across material sibling branches before closure. The same applies to every correction after review/audit.

## 4. Evidence and assurance

Run the repo-native deterministic gates justified by the changed behavior/artifacts. Prefer executable proof over another LLM opinion.

Semgrep is conditional. Deep Alibaba OCR is selective, normally for high-risk semantics such as auth/privacy/tenancy, concurrency/state, difficult cross-file interactions or a material feature/train.

After review starts, the originating implementer does not edit the candidate again. Review-driven mutations use fresh bound corrector sessions. Allow at most two finding-scoped correction attempts: correction #1, focused deterministic evidence, and—only if the same authorized finding(s) remain—fresh correction #2. Standard Volume uses V4 correctors; standard Complex uses GLM high; Free uses the current Free correction bindings. A remaining blocker, a new material issue, or scope expansion after the second attempt is HUMAN STOP.

## 5. Feature/train boundary

For material composed work, run changed-artifact-aware and composed-state deterministic closeout. Cora then performs the integrated PR/feature/train audit when warranted.

## 6. Publication and cleanup

Review/audit does not grant merge authority. Follow explicit human/repository publication authority.

Matt implementer worktrees should be cleaned by its workflow after integration. The delivery/integration worktree remains through PR review and accepted merge. Post-merge operator closeout then verifies durable merge, clean tree, no active process and no unique local state before removing the worktree.

## Historical authority

C-077–C-084 and Gentle/Pi/OpenCode V1 runbooks are retained as provenance. C-084 remains the native OpenCode V2 runtime/lifecycle baseline; C-085 is the current narrow routing/context-economy amendment. C-083's V1 `1.18.34` qualification and `--pure` launch boundary remain superseded.
