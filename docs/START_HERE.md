# Atenea — Start Here

Status: **CURRENT FRONT DOOR — C-084**

## Current path

```text
runtime             = native OpenCode V2 (`opencode`, currently 2.0.22)
operator surface    = existing persistent Herdr workspace/pane
method              = upstream Matt skills, not forked by Atenea
default profile     = volume
risk profile        = complex
writer both         = nan/deepseek-v4-flash
volume correction   = nan/deepseek-v4-flash
complex correction  = nan/glm5.3-flash · high
Standards review    = openai/gpt-6-luna · high
Spec review volume  = openai/gpt-6-luna · high
Spec review complex = openai/gpt-6.1-sol · high
feature/train audit = Cora when material
```

OpenCode project bindings are declared in `.opencode/agents/`; the policy snapshot is `docs/ATENEA_EXECUTION_ROUTING_V0.md`.

## Visible launch boundary

Herdr is already running. Do not launch a new Herdr instance per ticket/train.

From the project's visible Herdr pane:

```bash
cd <project-or-worktree>
opencode .
```

A new session starts on `atenea-volume` because the project declares it as `default_agent`.

For `complex`, select `atenea-complex` in the visible TUI **before** submitting the execution handoff. Use `/agents`, `Ctrl+X` then `A`, or `Shift+Tab`.

Do not add `--pure`: it is a V1 flag and is not part of native OpenCode V2. Do not use `opencode run` as the normal train surface; it is reserved for bounded automation/smokes.

## 1. Entry

Establish the correct repository/worktree/base, current accepted issue/spec/ticket, applicable repository authority and publication boundary. Refresh the intended remote ref and ensure the exact local HEAD that will execute already contains the prepared handoff and is reconciled with its intended upstream; do not make OpenCode repair stale launch state as part of the train. Do not repeat shaping or archaeology when executable authority already exists.

When legacy harness/tooling state is ambiguous, use `REPOSITORY_ENTRY_RECONCILIATION_V1.md` read-only first.

## 2. Select profile

Use `volume` by default.

Use `complex` only for material semantic/acceptance risk: cross-cutting architecture, difficult state/concurrency/temporal semantics, material security/privacy/auth/tenancy/clinical trust boundaries, delicate migration/back-compat invariants or repeated semantic failure.

File count, ticket length, ordinary UI, many tests or business importance alone are not complex triggers.

## 3. Execute through Matt

Single bounded issue/ticket: use `/implement` through the selected Atenea profile.

Whole accepted spec/task graph: use `/implement-spec` through the selected Atenea profile.

Matt owns TDD, task-graph/frontier behavior, implementation worktrees and its two-axis code-review method. Atenea supplies only named role/model bindings and repository guardrails.

Prefer a durable project handoff for material work, then reference it from the visible TUI (for example `@docs/handoffs/TRAIN_X.md`) rather than pasting a giant prompt repeatedly.

Before OpenCode receives that handoff, Cora must have reduced material interpretive freedom: exact outcome, in-scope surface, fixed decisions, preserved invariants, non-goals and closure evidence should be clear. Atenea execution models implement within that envelope; they do not discover product intent or reopen architecture by default. The same applies to every correction after review/audit.

## 4. Evidence and assurance

Run the repo-native deterministic gates justified by the changed behavior/artifacts. Prefer executable proof over another LLM opinion.

Semgrep is conditional. Deep Alibaba OCR is selective, normally for high-risk semantics such as auth/privacy/tenancy, concurrency/state, difficult cross-file interactions or a material feature/train.

Only one fresh correction pass is allowed. Volume corrections use V4; complex corrections use GLM high. A remaining blocker/new material issue after that pass is HUMAN STOP.

## 5. Feature/train boundary

For material composed work, run changed-artifact-aware and composed-state deterministic closeout. Cora then performs the integrated PR/feature/train audit when warranted.

## 6. Publication and cleanup

Review/audit does not grant merge authority. Follow explicit human/repository publication authority.

Matt implementer worktrees should be cleaned by its workflow after integration. The delivery/integration worktree remains through PR review and accepted merge. Post-merge operator closeout then verifies durable merge, clean tree, no active process and no unique local state before removing the worktree.

## Historical authority

C-077–C-083 and Gentle/Pi/OpenCode V1 runbooks are retained as provenance. C-083's role/model architecture survives through C-084, but its V1 `1.18.34` qualification and `--pure` launch boundary are explicitly superseded.
