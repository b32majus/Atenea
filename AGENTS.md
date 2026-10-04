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

When Matt names a role such as explorer, implementer, merger, Standards reviewer or Spec reviewer, use the project-local Atenea role binding for the selected route. Do not silently choose another model because a quota is inconvenient.

Atenea separates **risk class** (`volume|complex`) from **cost policy** (`standard|free_only`). Cora may recommend the risk class, but explicit human/project `free_only` authority wins even for complex work. Under `free_only`, use only `atenea-free` and its current Free bindings; no paid model, standard profile or silent provider fallback is authorized. A project may persist `free_only` in durable project authority so the human does not need to repeat it per ticket. See `docs/ATENEA_FREE_PROFILE_V0.md`.

Do not rewrite `~/.config/opencode/opencode.json` as per-ticket/train routing state. C-084 role semantics live in versioned project-local OpenCode configuration; global config supplies user/provider capability, not hidden Atenea policy.

C-084 uses native OpenCode V2. The active global OpenCode config is deliberately clean of Gentle execution agents/plugins; the Herdr OpenCode integration is allowed as observability/session metadata and is not Atenea execution authority. Project-local coordinator permissions own lifecycle roles; implementer permissions are deliberately narrower and may delegate only exploratory work, not review/correction ownership. Do not add `--pure`: it is a V1 flag and is not part of the V2 CLI.

## 5. Deterministic-first

If a material property can be expressed deterministically, prove it deterministically. LLM review is for semantic, architectural, maintainability and unanticipated failure questions that are not better encoded as executable checks.

When a review claim is numerically or mechanically decidable, validate the **effective runtime/rendered state**, not a token name, visual guess or proxy. For example, accessibility contrast is measured against the effective background actually rendered. If the invariant will recur in that project, prefer a cheap project-local oracle/checker over repeated model judgement; it does not become a mandatory Atenea-core check for unrelated repos.

Do not create an oracle for every edit. Add one when an important invariant is worth pinning.

## 6. Cora-shaped execution envelope

OpenCode/Matt execute work that has already been shaped tightly enough that role-bound Atenea execution models do not need to invent product intent, architecture or acceptance semantics. Precision is not verbosity: reference durable repo authority and state only the semantic delta, but remove material interpretive freedom before execution.

A bounded execution handoff must make the outcome, in-scope surface, preserved invariants, material non-goals and closure evidence clear enough to implement without reopening product decisions. Local implementation mechanics may remain with the implementer when they do not change those semantics.

**Product shaping is attended work.** Material product decisions are made in a human-present Cora + human shaping loop before unattended execution. Cora may analyze options, challenge assumptions and prepare explicit questions; OpenCode/agents may gather bounded evidence when asked, but no unattended agent may answer its own material product/architecture questions or convert an unresolved choice into executable authority. If a material ambiguity would require choosing product behavior, architecture, security/privacy posture, data semantics, scope or acceptance meaning, STOP and return the question to Cora + human. The coordinator must not guess.

The same rule applies to corrections. A finding from Matt review or Cora promotion audit must become a finding-scoped correction: name the defect, allowed surface, explicit non-goals and evidence that closes it. Never issue an open-ended instruction such as “fix the PR”, “improve this” or “address anything else you notice”.

Coordinator roles are orchestration-only for repository mutation. They must not change product code, tests, docs, config or other repository artifacts directly, including through shell-side backdoors such as `sed -i`, redirection, generated rewrite scripts or Git patch/application commands. Exact human instructions do not waive this boundary: delegate every repository mutation to the bound implementer/corrector/merger role, then verify from the coordinator. Deterministic gates may create ignored/transient build output; if a gate unexpectedly changes tracked state, STOP and delegate/reconcile rather than absorbing the mutation.

Matt lifecycle ownership is single. The selected primary coordinator owns `/implement` or `/implement-spec`, the canonical `/code-review`, review aggregation and correction dispatch. Implementation workers own only the delegated implementation/TDD phase, implementation evidence and candidate commit; they return the fixed candidate to the coordinator and do **not** invoke `/implement`, `/implement-spec`, `/code-review`, Standards/Spec reviewers or correctors themselves. For a given candidate/fixed-point pair, run one canonical two-axis review with the complete Cora-shaped authority envelope. Re-run that review only when the prior review failed technically, was incomplete, or was anchored to the wrong fixed point—not because another role also reached the review stage.

External memory is convenience, never execution authority. Do not turn memory save/reconciliation/judgment into routine train critical-path work. Durable repository authority plus the live OpenCode session are sufficient for normal execution; use external memory only when an explicit cross-session need justifies it, preferably at closeout rather than between implementation/review steps.

## 7. Bounded correction

The coordinator starts the canonical Standards + Spec review only after the implementation candidate is fixed. Starting that review closes the originating implementer's write phase for that candidate. Once review has started, the implementer must not mutate tracked repository state in response to review findings, even when the fix is trivial or the bound corrector uses the same underlying model family. Every review-driven mutation goes through a **fresh bound corrector session** dispatched by the coordinator.

Allow at most two fresh, finding-scoped correction attempts before HUMAN STOP:

```text
IMPLEMENT
→ REVIEW
→ clean → DONE
→ findings → fresh corrector #1 → focused deterministic evidence
    → resolved → DONE
    → same authorized finding(s) remain → fresh corrector #2 → focused deterministic evidence
        → resolved → DONE
        → still blocker / new material issue → HUMAN STOP
```

The second correction is not a second broad review cycle and does not authorize scope expansion. A new material finding outside the authorized correction envelope is HUMAN STOP unless Cora/human explicitly opens a new bounded unit. No fix/review carousel.

## 8. Skills and repo setup

Project-local skills may provide domain, engineering, UI or QA guidance. Keep upstream-owned skill content upstream-owned; update it through its supported mechanism rather than hand-forking it.

### Agent skills

#### Issue tracker

Issues/specs are tracked in GitHub. See `docs/agents/issue-tracker.md`.

#### Triage labels

Use the Matt triage vocabulary mapped in `docs/agents/triage-labels.md`.

#### Domain docs

Matt's domain glossary lives in `GLOSSARY.md` (or `GLOSSARY-MAP.md` for multi-context repos); architectural/current-system context may live separately in `CONTEXT.md`. See `docs/agents/domain.md`.

## 9. Herdr and operator-controlled launch

Herdr is the already-running persistent operator surface for normal unattended work. Do not launch a new Herdr instance per ticket/train. Atenea correctness must not depend on an Atenea-specific Herdr plugin or hidden Herdr state.

For a real ticket/train, Cora owns preparation **through `READY_TO_LAUNCH` only**: reconcile repo/base, prepare the worktree, write the durable handoff, run preflight/checkers, choose cost policy/risk class and return the exact launch packet. The human operator owns the final visible launch.

The launch packet must contain:

1. the exact shell commands to enter the prepared worktree and start `opencode .` in the already-running visible Herdr pane;
2. any required visible agent selection (`atenea-complex` / `atenea-free` when not already the project default);
3. the exact first prompt, preferably a short reference to the durable handoff such as `Read @docs/handoffs/TRAIN_X.md and execute it under current repository/Atenea authority.`

Coras/workers do **not** start the real OpenCode session, submit the execution prompt or launch the train independently unless the human explicitly authorizes automated launch for that specific work unit. This preserves operator inspection and visible execution.

## 10. Repository entry and resumption

Use `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md` when prior harness/tooling state could be confused with current authority. Entry is read-only; finding stale state does not authorize deletion.

## 11. Worktrees and cleanup

Matt owns temporary implementer-worktree choreography while its skills are active. Repository-level cleanup policy lives in `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md`.

A delivery/integration worktree is not removed merely because a PR exists. Post-merge closeout is the normal cleanup point after the accepted merge is durable, the worktree is clean, no process uses it and no unique local state remains.

## 12. Publication

Before publication, validate the artifact types that actually changed; see `docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md`.

Review approval is not push/PR/merge/deploy authority. No automatic merge, force-push or destructive history recovery.
