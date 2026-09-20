# Atenea — Agent instructions

Atenea is an upstream-first autonomous engineering harness. Do not invent a new controller, execution schema, review lifecycle or policy engine when an adopted upstream tool already owns the behavior.

## Front door

If you are a fresh agent/Cora trying to understand how Atenea currently works, read:

1. `README.md`
2. `docs/NEWCOMER_QUICKSTART_V1.md`
3. `docs/START_HERE.md`
4. `docs/ATENEA_HARNESS_CONTRACT_V1.md`
5. `docs/CURRENT_DECISIONS.md`
6. `docs/INSTALLATION_AND_OPERATION_V1.md` for scopes/setup/verification
7. `docs/OPERATOR_RUNBOOK_V1.md` only when work is already `EXECUTION_READY`
8. `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md` for current pinned one-touch train mechanics

Do not recover current execution policy from historical Stage files or `docs/ATENEA_HANDOFF_20260830.md`. They are evidence, not current forward-looking authority.

## Current authority

- Fast newcomer map (non-normative): `docs/NEWCOMER_QUICKSTART_V1.md`
- Safe target-repository entry reconciliation: `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md`
- Current role/model evidence ledger: `docs/ROUTING_EVIDENCE_LEDGER_V1.md`
- Current work-unit composition / oversize-recovery policy: `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`
- Repo-owned pre-publication validation contract: `docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md`
- Deterministic publication/checkpoint recipe: `docs/PUBLISH_CHECKPOINT_V1.md`
- Real GP3.3/GAI3.4 Laboratorio field evidence: `docs/LABORATORIO_PRIVACIDAD_GP33_FIELD_QUALIFICATION_20260921.md`
- Normative harness/runtime boundaries: `docs/ATENEA_HARNESS_CONTRACT_V1.md`
- Project-entry / start-or-continue procedure: `docs/START_HERE.md`
- Current decisions: `docs/CURRENT_DECISIONS.md`
- Operator execution path: `docs/OPERATOR_RUNBOOK_V1.md`
- Current GP3.3 pinned train recipe: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`
- Historical GP2.7 replacement evidence: `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`
- Current installation/environment verification: `docs/INSTALLATION_AND_OPERATION_V1.md`
- Local worktree/qualification cleanup policy: `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md`
- Historical T5 reviewer continuation regression contract: `docs/GENTLE_REVIEWER_CONTINUATION_V1.md`
- Conditional independent human-boundary promotion audit: `docs/PROMOTION_REVIEW_V1.md`
- Engineering quality: `CODING_STANDARDS.md`
- Current qualification state: `docs/QUALIFICATION.md`

## High-frequency invariants

- Before `EXECUTION_READY`: shaping is human-present, interactive and repo-native.
- Human + Cora/planning surface decides whether the target is greenfield/brownfield and what shaping is actually needed.
- Greenfield defaults to complete Matt Pocock upstream shaping.
- Brownfield preserves repo-native authority; OpenSpec is delta-first when it materially adds value, not by ritual.
- Repository Intelligence is optional derived evidence for sufficiently complex brownfields. Cora may recommend it; Pi must not invent/install it as an execution-time methodology decision.
- From `EXECUTION_READY`: one persistent Pi + Gentle Pi 3.3 parent stays visible in Herdr; Gentle Shell/ODD owns internal classification, tasking, bounded delegation, verification, work-unit commits and risk/review routing inside the externally authorized work.
- Before launching substantial implementation, read the available Review Workload Forecast/task shape and resolve composition **before writing** when over-budget risk is material. Default upstream planning budget is 400 authored changed lines unless an explicit session `review_budget_lines` overrides it. Under Atenea's default heuristic, ~401–600 is a soft overage for a still-coherent unit (without waiving any upstream-required `size:exception`); ~601–800 requires an explicit durable `size:exception`/coherence rationale; >800 is not an ordinary work unit and defaults to STOP/reslice unless a human explicitly authorizes an indivisibility exception. These are planning heuristics, never native `review_due` rules.
- After every delegated/substantial work-unit commit, invoke `gentle_review` `assess` on that exact candidate and obey provider-owned `review_due`, `review_due_reason` and continuation. If review is due, follow `wrapper_continuation` to target-scoped STATUS before any START; if it is not due, do not manufacture START. External-ticket completion is never itself a review trigger, and Atenea must not recreate the provider's post-commit `review_due` decision with its own line-count heuristic.
- **Facade-first review transport:** when a corresponding Gentle Pi `gentle_review` operation exists, ordinary review lifecycle operations MUST traverse that facade. Do not execute `gentle-ai review ...` through shell as a bypass and do not recreate provider/host consent with `ask_user_choice`. `inspect` is not a substitute for `ASSESS → wrapper continuation → target-scoped STATUS`.
- Current review consent is **one-touch**: on the first eligible review the human selects `Review and allow this session`; later fresh validated grants in the same live session/canonical repository require no second consent touch.
- Process restart/new/resume/fork/quit/revoke ends the permission; reload preserves it. Never synthesize the grant through prompt prose, RPA or internal APIs.
- GP3.3 review lenses, refuter and targeted validator require explicit routing and their provider-issued operation shapes must be followed literally.
- Atenea does not require one fresh child per external ticket. The parent retains external authority/frontier context; ODD may use fresh bounded workers internally when its runtime rules require them. Internal workers never gain publication/merge authority.
- Gentle/provider owns final exact-candidate/RDD/reviewer/repair authority. The qualified GP3.3 host bridge may forward the exact current retained reviewer group without model reserialization, but it must not invent bindings or replace provider-issued refuter/validator routes.
- The pre-GP2.7 plain-supervisor + pi-intercom + Atenea relay topology and T5 reviewer-continuation prompt injection remain historical rollback/regression evidence, not the normal current transport.
- Before publication, the target repository's declared checkpoint-preflight command owns changed-file-aware deterministic QA and must return `checkpoint-preflight/v1` PASS for the exact base/head/changed-path candidate. Atenea does not choose repo-specific validators. Use `docs/PUBLISH_CHECKPOINT_V1.md` for the deterministic normal-push/PR/CI seam.
- Normal non-force push is allowed. No automatic merge or destructive history recovery.
- For a high-risk human promotion/merge boundary, planning may require `docs/PROMOTION_REVIEW_V1.md`: fresh read-only Pi, exact full diff + explicit high-risk subset, zero blocking findings. It is conditional and never a second Gentle RDD lifecycle.
- Material ambiguity, contradictory authority or unsafe drift => STOP rather than improvise.
- Prefer complete upstream tools and public interfaces. Do not copy fragments of third-party skills/tool internals into Atenea.

## Repository Intelligence boundary

CodeGraph/Graphify are current **candidate** upstream providers, not mandatory Atenea dependencies.

- Existing healthy indexes may be used as derived context.
- Do not auto-install/build an index merely because a repository is brownfield.
- A graph/index never outranks source, accepted specs, deterministic tests, Gentle RDD or Git/GitHub authority.
- Do not copy graph/index/watch/controller internals into Atenea.

## Agent skills / repo setup

### Issue tracker

Issues live as GitHub issues in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles use the default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.
