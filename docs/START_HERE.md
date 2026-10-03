# Atenea — Start Here

Status: **CURRENT FRONT DOOR — C-083**

## Current path

```text
runtime             = OpenCode V2
operator surface    = Herdr when useful
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

## 1. Entry

Establish the correct repository/worktree/base, current accepted issue/spec/ticket, applicable repository authority and publication boundary. Do not repeat shaping or archaeology when executable authority already exists.

When legacy harness/tooling state is ambiguous, use `REPOSITORY_ENTRY_RECONCILIATION_V1.md` read-only first.

## 2. Select profile

Use `volume` by default.

Use `complex` only for material semantic/acceptance risk: cross-cutting architecture, difficult state/concurrency/temporal semantics, material security/privacy/auth/tenancy/clinical trust boundaries, delicate migration/back-compat invariants or repeated semantic failure.

File count, ticket length, ordinary UI, many tests or business importance alone are not complex triggers.

## 3. Execute through Matt

Single bounded issue/ticket: use `/implement` through the selected Atenea profile.

Whole accepted spec/task graph: use `/implement-spec` through the selected Atenea profile.

Matt owns TDD, task-graph/frontier behavior, implementation worktrees and its two-axis code-review method. Atenea supplies only named role/model bindings and repository guardrails.

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

C-077–C-082, Gentle/Pi runbooks, RDD/4R, ASSESS, lineages, burn and OpenCode V1 review transport are retained as provenance only and must not be followed as current execution instructions.
