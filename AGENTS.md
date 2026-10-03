# Atenea — Repository Policy

Status: **CURRENT AUTHORITY — C-084**

Atenea is a thin upstream-first policy, routing and conformance layer over OpenCode V2 and adopted upstream engineering skills. It does not duplicate those skills or implement a second execution/review lifecycle.

## 1. Ownership

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ target repository AGENTS.md + CODING_STANDARDS.md

shaping / implementation / code review method
→ adopted Matt Pocock skills when invoked

role → model binding and assurance profile
→ Atenea project-local OpenCode agents + routing policy

machine-decidable facts
→ tests / typecheck / lint / validators / oracles / CI

process persistence / observation
→ Herdr when useful; never correctness authority

publish / merge
→ target repository policy + explicit human authority
```

## 2. Authority precedence

1. accepted current product/domain authority;
2. accepted spec/ticket/work order for the current change;
3. target-repository policy and coding standards;
4. current Atenea execution/routing authority;
5. adopted upstream skill instructions;
6. upstream runtime defaults;
7. historical docs, stale config and remembered session state.

Material conflict between current authorities => STOP and reconcile. Runtime convenience never invents product semantics.

## 3. Read before work

Read only what the work needs:

1. this file;
2. `CODING_STANDARDS.md`;
3. `CONTEXT.md` and relevant ADRs;
4. `GLOSSARY.md` when domain vocabulary matters;
5. the accepted issue/spec/ticket;
6. `docs/ATENEA_EXECUTION_ROUTING_V0.md` when executing through Atenea.

Historical C-077–C-083 and Gentle/Pi/OpenCode V1 runbooks are provenance, not current execution authority.

## 4. Do not duplicate Matt

Matt skills own their methodology. Do not copy their TDD loop, task-graph procedure, code-review rubric or worktree choreography into Atenea policy.

Atenea adds only stable repository constraints, explicit role/model bindings, deterministic evidence requirements and human publication boundaries.

When Matt names a role such as explorer, implementer, merger, Standards reviewer or Spec reviewer, use the project-local Atenea role binding for the selected profile. Do not silently choose another model because a quota is inconvenient.

Do not rewrite `~/.config/opencode/opencode.json` as per-ticket/train routing state. C-084 role semantics live in versioned project-local OpenCode configuration; global config supplies user/provider capability, not hidden Atenea policy.

C-084 uses native OpenCode V2. The active global OpenCode config is deliberately clean of Gentle execution agents/plugins; the Herdr OpenCode integration is allowed as observability/session metadata and is not Atenea execution authority; project-local coordinator/implementer `subagent` permissions allow only the named `atenea-*` roles for the selected profile. Do not add `--pure`: it is a V1 flag and is not part of the V2 CLI.

## 5. Deterministic-first

If a material property can be expressed deterministically, prove it deterministically. LLM review is for semantic, architectural, maintainability and unanticipated failure questions that are not better encoded as executable checks.

Do not create an oracle for every edit. Add one when an important invariant is worth pinning.

## 6. Cora-shaped execution envelope

OpenCode/Matt execute work that has already been shaped tightly enough that role-bound Atenea execution models do not need to invent product intent, architecture or acceptance semantics. Precision is not verbosity: reference durable repo authority and state only the semantic delta, but remove material interpretive freedom before execution.

A bounded execution handoff must make the outcome, in-scope surface, preserved invariants, material non-goals and closure evidence clear enough to implement without reopening product decisions. Local implementation mechanics may remain with the implementer when they do not change those semantics.

If a material ambiguity would require choosing product behavior, architecture, security/privacy posture or acceptance meaning, Cora/human resolves it before OpenCode starts; the coordinator must not guess.

The same rule applies to corrections. A finding from Matt review or Cora promotion audit must become a finding-scoped correction: name the defect, allowed surface, explicit non-goals and evidence that closes it. Never issue an open-ended instruction such as “fix the PR”, “improve this” or “address anything else you notice”.

## 7. Bounded correction

Use at most one fresh correction pass after review findings:

```text
IMPLEMENT
→ REVIEW
→ clean → DONE
→ findings → ONE fresh correction worker → focused regression evidence → DONE
→ still blocker / new material issue → HUMAN STOP
```

No fix/review carousel.

## 8. Skills and repo setup

Project-local skills may provide domain, engineering, UI or QA guidance. Keep upstream-owned skill content upstream-owned; update it through its supported mechanism rather than hand-forking it.

### Agent skills

#### Issue tracker

Issues/specs are tracked in GitHub. See `docs/agents/issue-tracker.md`.

#### Triage labels

Use the Matt triage vocabulary mapped in `docs/agents/triage-labels.md`.

#### Domain docs

Matt's domain glossary lives in `GLOSSARY.md` (or `GLOSSARY-MAP.md` for multi-context repos); architectural/current-system context may live separately in `CONTEXT.md`. See `docs/agents/domain.md`.

## 9. Herdr

Herdr is the already-running persistent operator surface for normal unattended work. Do not launch a new Herdr instance per ticket/train. Open the visible OpenCode V2 TUI inside the project workspace/pane; Atenea correctness must not depend on an Atenea-specific Herdr plugin or hidden Herdr state.

## 10. Repository entry and resumption

Use `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md` when prior harness/tooling state could be confused with current authority. Entry is read-only; finding stale state does not authorize deletion.

## 11. Worktrees and cleanup

Matt owns temporary implementer-worktree choreography while its skills are active. Repository-level cleanup policy lives in `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md`.

A delivery/integration worktree is not removed merely because a PR exists. Post-merge closeout is the normal cleanup point after the accepted merge is durable, the worktree is clean, no process uses it and no unique local state remains.

## 12. Publication

Before publication, validate the artifact types that actually changed; see `docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md`.

Review approval is not push/PR/merge/deploy authority. No automatic merge, force-push or destructive history recovery.
