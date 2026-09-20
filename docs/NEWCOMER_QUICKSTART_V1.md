# Atenea — Newcomer Quickstart v1

Status: **CURRENT FRONT-DOOR SUMMARY**
Date: 2026-09-20

This page is a fast navigation and operating map for a fresh human, Cora/planning assistant or agent. It is **not** a second runtime contract. If anything here conflicts with `docs/ATENEA_HARNESS_CONTRACT_V1.md`, the harness contract wins.

## 1. Atenea in one minute

Atenea is an upstream-first engineering harness. It does not implement its own queue, scheduler or review lifecycle.

```text
BEFORE EXECUTION_READY
human + Cora/planning → durable repo/tracker authority

AFTER EXECUTION_READY
explicit execution authorization
→ one visible Pi + Gentle Pi 3.3 parent on NaN GLM 5.3 Flash high
→ Gentle Shell/ODD owns internal tasking + bounded delegation
→ exact diff + deterministic QA
→ first eligible review: human selects “Review and allow this session”
→ later same-session/repository reviews: no second consent touch
→ explicit routed reviewer/refuter/validator work
→ APPROVED + acknowledgement/burn
→ checkpoint → frontier → next child or STOP
→ final merge human unless separately authorized
```

Current mode is **ONE-TOUCH**, not zero-touch. Pi's ordinary default is NaN DeepSeek V4 Flash medium; the train parent is explicitly GLM high.

## 2. Read order

For a new project or a resumed project:

1. `README.md`
2. `docs/NEWCOMER_QUICKSTART_V1.md` — this page
3. `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md` — when entering/resuming a repo with any prior tooling/authority ambiguity
4. `docs/START_HERE.md` — start/continue and shaping decision procedure
5. `docs/ATENEA_HARNESS_CONTRACT_V1.md` — normative execution contract
6. `docs/CURRENT_DECISIONS.md` — current accepted decisions
7. `docs/INSTALLATION_AND_OPERATION_V1.md` — provisioning, scopes and runtime verification
8. `docs/ROUTING_EVIDENCE_LEDGER_V1.md` — current routing evidence classes and unresolved model-routing gaps
9. `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` — pre-implementation reviewability budget, coherent slicing and oversized unpublished-history recovery
10. `docs/OPERATOR_RUNBOOK_V1.md` — only once work is `EXECUTION_READY`
11. `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md` — current pinned train mechanics
12. `docs/QUALIFICATION.md` — field evidence/proven boundaries when needed
13. `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` — current replacement evidence
14. `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` — local-state lifecycle/cleanup policy

## 3. Three scopes — do not mix them

| Scope | Owns | Does not own |
|---|---|---|
| **Machine/global** | Pi, Herdr, Gentle Pi, Gentle AI and their supported runtime configuration/authentication/model routing | product authority, target specs, target coding rules |
| **Atenea clone/checkpoint** | harness contract, current GP3.3 one-touch train recipe, qualification evidence, Promotion Review contract, hygiene policy and deterministic Atenea checks | target-product truth or target-repo configuration |
| **Target repo/worktree** | `AGENTS.md`/repo instructions, coding standards, product/spec/issues, target tests/oracles, branch/worktree and repo-local shaping skills/config when selected | Atenea runtime internals or global provider policy |

A pinned run uses one coherent current Atenea checkpoint. Historical relay/spawn assets remain in the repository as rollback/provenance evidence but are not mixed into the normal GP3.3 one-touch path.

## 4. Fresh-machine setup

1. Clone Atenea.
2. Install Pi, Herdr and `gentle-pi@3.3.0` through upstream-supported surfaces.
3. Install/reconcile the machine profile `atenea-one-touch` from the current routing ledger.
4. Verify V4/GLM NaN and Luna OpenAI-Codex authentication.
5. Verify effective runtime using `docs/INSTALLATION_AND_OPERATION_V1.md`.
6. Do not auto-install optional shaping/repository-intelligence tools until target work warrants them.

```text
Pi          0.86.1
Herdr       0.9.0
Gentle Pi   3.3.0
Gentle AI   3.4.0 package-paired
```

Historical pi-intercom/GP2.7 relay mechanics are not dependencies of the current one-touch path.

## 5. Matt Pocock skills — shaping surface, not unattended runtime dependency

Matt skills belong primarily to **pre-`EXECUTION_READY` shaping** and task-triggered engineering work. They are not required inside the adopted Pi/Gentle-Pi unattended worker path.

When a target repo will use the Matt engineering ecosystem with Pi, install the **complete upstream set project-locally** rather than cherry-picking individual skill files. Current verified CLI shape (`skills` 1.5.23):

```bash
cd <target-repo>
npx --yes skills add mattpocock/skills --skill '*' --agent pi --yes --full-depth
```

Expected current result: 37 skills under `.pi/skills/` plus project `skills-lock.json`. Verify with the current upstream CLI. If upstream syntax/discovery changes, use the new supported surface and re-verify; do not preserve an obsolete flag through Atenea glue.

Run `setup-matt-pocock-skills` **once per target repo before first use of the other Matt engineering skills** when that repo is adopting this ecosystem. It establishes the repo's issue-tracker, triage-label and domain-doc conventions. Do not rerun it by ritual on an already-configured repo.

### Normal greenfield shaping direction

```text
idea / problem
→ setup-matt-pocock-skills once if the target repo is not configured
→ product/domain shaping (often grill-with-docs; domain-modeling when triggered)
→ close material product semantics
→ material UI/UX shaping when applicable
→ to-spec
→ independent spec/readiness challenge in a fresh context when risk/ambiguity warrants it
→ to-tickets
→ verify each ticket is bounded, falsifiable and ready-for-agent
→ human promotes the selected frontier to EXECUTION_READY
```

Do not treat that list as a mandatory ceremony for every tiny change. Brownfield work preserves existing repo-native authority and uses only the upstream methods that materially improve the delta.

### Task-triggered engineering skills

- `domain-modeling` — terminology/domain model/`CONTEXT.md`/ADR work.
- `codebase-design` — module/interface/seam architecture is materially in question.
- `tdd` — meaningful behavior can be driven by an independent test/oracle and the task calls for test-first work.
- `diagnosing-bugs` — causality of a defect/regression/performance problem is not yet established.
- `code-review` — an additional Standards + Spec audit is useful before final candidate authority/promotion.

The upstream skill's own trigger and procedure remain authoritative; Atenea does not copy their internals.

## 6. Current operational routing profile

```text
Pi ordinary default              nan/deepseek-v4-flash · medium
Persistent parent/coordinator    nan/glm5.3-flash · high
gentle-ai-worker                 nan/glm5.3-flash · high
gentle-ai-verify                 openai-codex/gpt-5.6-luna · high
review-readability               openai-codex/gpt-5.6-luna · high
review-reliability               openai-codex/gpt-5.6-luna · high
review-resilience                nan/deepseek-v4-flash · high
review-risk                      nan/glm5.3-flash · high
review-refuter                   nan/deepseek-v4-flash · high
review-validator                 openai-codex/gpt-5.6-luna · high
```

NaN's `deepseek-v4-flash` id is the DeepSeek V4.1 Flash family. The active machine profile is `atenea-one-touch` and deliberately does not override Pi's orchestrator default; train parents launch GLM high explicitly. Current NaN per-answer ceilings are `32768`; DeepSeek effort labels do not control reasoning depth. `review-reliability` is provisionally Luna high; `review-risk` is GLM high after exact frozen-prompt reproduction. See `docs/NAN_PROVIDER_CAPABILITIES_V1.md`.

Missing/rejected pinned routes fail closed; no silent fallback. See `docs/ROUTING_EVIDENCE_LEDGER_V1.md`.

## 7. Reviews and extra gates

Keep the responsibilities separate:

```text
repo tests / lint / build / browser QA / frozen oracle when required
        ↓
Gentle native exact-candidate RDD
        ↓
provider acknowledgement/burn
        ↓
authorized normal non-force publication
        ↓
conditional Promotion Review at a high-risk human promotion boundary
        ↓
exact-head check
        ↓
explicit human merge/promotion authorization
```

Matt `code-review` is a task-triggered engineering method. Promotion Review is a separate read-only human-boundary audit. Neither replaces Gentle exact-candidate RDD.

## 8. Starting execution

When work is truly `EXECUTION_READY`, use `docs/OPERATOR_RUNBOOK_V1.md` plus `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

High-frequency invariants:

- one persistent visible Gentle-Pi 3.3 parent per bounded train;
- pre-implementation work-unit composition: honor explicit `review_budget_lines`; otherwise 400 is the default target, ~401–600 soft coherent overage without waiving upstream delivery/`size:exception` rules, ~601–800 explicit exception band, and >800 STOP/reslice by default; these are planning heuristics, not reviewer caps;
- ODD-owned internal decomposition/delegation; no Atenea fresh-child-per-external-ticket invariant;
- sequential concurrency by default;
- first eligible review consent is the single human one touch;
- later fresh validated grants in the same live session/canonical repository need no second consent touch;
- reviewer/refuter/validator use explicit routes and exact provider-issued operation shapes;
- APPROVED is incomplete until acknowledgement/burn;
- no external supervisor, Atenea consent relay or RPA;
- final merge remains human unless separately authorized.

## 9. What is deliberately NOT part of Atenea

Do not add these merely to make the diagram look more sophisticated:

- custom scheduler/queue/DAG/controller;
- Atenea-owned replacement for Gentle reviewer/RDD lifecycle;
- `ATENEA_SUPERVISOR_INVARIANTS.md` duplicated into every system prompt;
- an `atenea-supervisor` skill duplicating the harness contract;
- a generic worker-template engine when the current pinned prompt + deterministic relay checks are sufficient;
- third-party `pi-subagents` or mandatory delegation on every ticket;
- mandatory context-budget controller;
- globally hard-coded LLM provider/model policy.

New glue requires a demonstrated missing upstream owner and a deletion/retirement condition.

## 10. Newcomer self-check

A fresh agent is ready to operate only if it can answer, without historical archaeology:

1. What happens before vs after `EXECUTION_READY`?
2. What belongs machine-global, in the Atenea clone and in the target repo?
3. How are Matt skills installed for Pi today, and when is `setup-matt-pocock-skills` used?
4. Which shaping methods are normal greenfield vs task-triggered?
5. Which model literals are current field-proven defaults, and who is allowed to change them?
6. Who owns implementation, Gentle RDD, bounded consent, reviewer continuation, publication and merge?
7. When is Promotion Review used?
8. Which tempting extra components are explicitly *not* required?

If any answer requires Stage-file archaeology, treat that as a front-door regression.
