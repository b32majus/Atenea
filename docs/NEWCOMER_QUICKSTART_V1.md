# Atenea — Newcomer Quickstart v1

Status: **CURRENT FRONT-DOOR SUMMARY**
Date: 2026-09-15

This page is a fast navigation and operating map for a fresh human, Cora/planning assistant or agent. It is **not** a second runtime contract. If anything here conflicts with `docs/ATENEA_HARNESS_CONTRACT_V1.md`, the harness contract wins.

## 1. Atenea in one minute

Atenea is an upstream-first engineering harness. It does not implement its own queue, DAG, scheduler, reviewer lifecycle or coding methodology.

```text
BEFORE EXECUTION_READY
human + Cora/planning
→ understand target repo
→ use the smallest suitable upstream shaping method
→ create durable repo/tracker authority
→ human explicitly declares EXECUTION_READY

AFTER EXECUTION_READY
explicit human execution authorization
→ one persistent Pi + Gentle Pi 2.7 parent visible in Herdr
→ fresh package-owned native child for each newly selected ticket
→ parent reconciles exact diff + deterministic QA
→ package-local Gentle AI 2.9.1 native START through the parent's non-TTY Bash subprocess
→ Gentle Pi STATUS adopts the exact returned lineage
→ provider review/correction → APPROVED → acknowledge/burn
→ authorized checkpoint/publication
→ fresh frontier reconciliation → next fresh child or STOP
→ final merge remains human unless separately authorized
```

The parent remains visible and inspectable in Herdr throughout the train; only the native review START subprocess is non-TTY. This is the current zero-touch path proven on a two-ticket train on 2026-09-15.

For normal work, never recover the current protocol from historical Stage files.

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
9. `docs/OPERATOR_RUNBOOK_V1.md` — only once work is `EXECUTION_READY`
10. `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md` — current pinned train mechanics
11. `docs/QUALIFICATION.md` — field evidence/proven boundaries when needed
12. `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` — current replacement evidence
13. `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` — local-state lifecycle/cleanup policy

## 3. Three scopes — do not mix them

| Scope | Owns | Does not own |
|---|---|---|
| **Machine/global** | Pi, Herdr, Gentle Pi, Gentle AI and their supported runtime configuration/authentication/model routing | product authority, target specs, target coding rules |
| **Atenea clone/checkpoint** | harness contract, current GP2.7 train recipe, qualification evidence, Promotion Review contract, hygiene policy and deterministic Atenea checks | target-product truth or target-repo configuration |
| **Target repo/worktree** | `AGENTS.md`/repo instructions, coding standards, product/spec/issues, target tests/oracles, branch/worktree and repo-local shaping skills/config when selected | Atenea runtime internals or global provider policy |

A pinned run uses one coherent current Atenea checkpoint. Historical relay/spawn assets remain in the repository as rollback/provenance evidence but are not mixed into the normal GP2.7 path.

## 4. Fresh-machine setup

1. Clone Atenea.
2. Install Pi, Herdr, Gentle Pi and Gentle AI through their **current upstream-supported** installation surfaces.
3. Verify the effective runtime using `docs/INSTALLATION_AND_OPERATION_V1.md`.
4. Synchronize current managed Pi assets when the installed Gentle AI runtime requires it.
5. Do not auto-install optional shaping/repository-intelligence tools until the target work warrants them.

Current adopted machine epoch:

```text
Pi          0.85.1
Herdr       0.9.0
Gentle Pi   2.7.0
Gentle AI   2.9.1 package-paired
```

`pi-intercom` may remain installed for historical/alternate flows, but it is no longer a dependency of the normal hybrid-native unattended path. These versions are current qualification evidence, not permanent architectural pins.

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

Model/provider/reasoning choices are operational routing, **not Atenea architecture**. Resolve literals before launch and never silently substitute a rejected route.

Current roles after the GP2.7 topology cutover:

```text
persistent Gentle-Pi parent / train orchestrator
  != fresh package-owned implementation child
  != native Gentle verifier
  != native Gentle lens/refuter/targeted-validator
  != Promotion Review
```

The historical outer `Atenea Pi supervisor` role is no longer present in the normal path; its DeepSeek V4.1 medium route remains historical/rollback evidence.

| Phase / role | Route | Effort |
|---|---|---|
| Persistent Gentle-Pi parent/coordinator | `opencode-go/glm-5.3-flash` | `high` |
| Native `gentle-ai-worker` | `opencode-go/glm-5.3-flash` | `high` |
| Native `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` |
| `review-readability` | `openai-codex/gpt-5.6-luna` | `high` |
| `review-reliability` | `opencode-go/deepseek-v4.1-flash` | `high` |
| `review-resilience` | `opencode-go/deepseek-v4.1-flash` | `high` |
| `review-risk` | `opencode-go/deepseek-v4.1-flash` | `high` |

`review-refuter` and `review-validator` have no Atenea pin and inherit/provider-route. Sol remains escalation-only. DeepSeek V4 Flash high remains historical parent/coordinator evidence but is never a silent fallback.

Gentle Pi 2.7 provides the supported package-owned native Agents seam. In the normal multi-ticket train, each newly selected ticket gets a fresh native implementation child while one visible parent retains train/frontier context and owns integration/RDD/checkpoint progression.

See `docs/ROUTING_EVIDENCE_LEDGER_V1.md` and `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`.

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

When the work is truly `EXECUTION_READY`, stop adding shaping machinery and use `docs/OPERATOR_RUNBOOK_V1.md` plus `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md`.

High-frequency invariants:

- one persistent Gentle-Pi 2.7 parent remains visible in Herdr for the bounded train;
- each newly selected ticket gets a fresh package-owned implementation child in the normal multi-ticket recipe;
- normal train concurrency is sequential (`max_concurrency=1`) unless parallel safety is explicitly established;
- the parent owns exact diff reconciliation, deterministic QA, RDD, acknowledgement/burn, checkpoint reconciliation and frontier progression;
- native RDD START is invoked through the parent's ordinary Bash tool using package-local Gentle AI 2.9.1, with only that subprocess non-TTY and with no consent override flag;
- Gentle Pi STATUS must adopt the same lineage returned by native START before capture;
- a visible `Review consent` dialog is fail-closed evidence, not something to auto-answer;
- provider bindings/continuations remain opaque and exact;
- fresh frontier rediscovery occurs only after an accepted durable checkpoint;
- no force push, destructive recovery or automatic merge;
- after merged/published work or reconciled qualification, apply `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` instead of accumulating local state indefinitely.

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
