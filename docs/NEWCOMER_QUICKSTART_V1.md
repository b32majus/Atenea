# Atenea — Newcomer Quickstart v1

Status: **CURRENT FRONT-DOOR SUMMARY**
Date: 2026-09-08

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
→ plain Pi supervisor (non-implementing, Gentle Pi OFF, pi-intercom ON)
→ Herdr process/session substrate
→ fresh Pi + Gentle Pi 2.5 ticket worker
→ direct implementation OR optional native Gentle Agents
→ deterministic QA + Gentle AI 2.7 native RDD + ack/burn
→ authorized normal non-force publication
→ FINAL via pi-intercom
→ fresh repository/tracker reconciliation
→ next compatible fresh worker or STOP
→ final merge remains human unless separately authorized
```

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
10. `docs/QUALIFICATION.md` — field evidence/proven boundaries when needed

## 3. Three scopes — do not mix them

| Scope | Owns | Does not own |
|---|---|---|
| **Machine/global** | Pi, Herdr, Gentle Pi, Gentle AI, pi-intercom and their supported runtime configuration/authentication | product authority, target specs, target coding rules |
| **Atenea clone/checkpoint** | harness contract, runbook, spawn recipe, RDD relay, reviewer-continuation contract, Promotion Review contract, deterministic Atenea checkers | target-product truth or target-repo configuration |
| **Target repo/worktree** | `AGENTS.md`/repo instructions, `CODING_STANDARDS.md` or equivalent, product/spec/issues, target tests/oracles, branch/worktree and repo-local shaping skills/config when selected | Atenea runtime internals or global provider policy |

A pinned run uses components from one exact Atenea checkpoint. Do not mix the relay from one Atenea SHA with reviewer/runbook assets from another.

## 4. Fresh-machine setup

1. Clone Atenea.
2. Install Pi, Herdr, Gentle Pi, Gentle AI and pi-intercom through their **current upstream-supported** installation surfaces.
3. Verify the effective runtime using `docs/INSTALLATION_AND_OPERATION_V1.md`.
4. Do not auto-install optional shaping/repository-intelligence tools until the target work warrants them.

Current adopted machine epoch: Pi `0.85.1`, Herdr `0.9.0`, Gentle Pi `2.5.0`, Gentle AI `2.7.0`, pi-intercom `0.13.0`. These versions are current qualification evidence, not permanent architectural pins.

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

Model/provider/reasoning choices are operational routing, **not Atenea architecture**. Planning resolves literal routes before launch; the supervisor consumes them unchanged. A rejected literal is STOP, never a reason for silent model fallback.

Do not collapse runtime roles when discussing routing:

```text
Atenea Pi supervisor
  != Gentle-Pi Pi parent / Gentleman coordinator
  != optional delegated builder/writer
  != native Gentle lens/refuter/targeted-validator
  != Promotion Review
```

The normal supervisor baseline is `opencode-go/deepseek-v4-flash` at `medium`. The normal fresh Gentle-Pi parent/coordinator baseline is now `opencode-go/glm-5.3-flash` at `high`, field-proven in PROMueve after the earlier bounded A/B work. DeepSeek V4 Flash `high` remains proven parent/coordinator fallback evidence but is never selected silently.

Gentle Pi 2.5 provides the supported native delegation seam. `gentle-ai-worker` and `gentle-ai-verify` use `openai-codex/gpt-5.6-luna` at `high` in the current profile. Delegation is optional: the fresh ticket worker remains the unit of responsibility and may implement a small ticket directly.

Native RDD lens/refuter/targeted-validator **role selection** remains provider-owned. The 2.5 host relay launches isolated Pi reviewer processes without a parent `--model`/`--provider` literal; Atenea has not adopted a new per-lens model pin. Do not infer reviewer routing from the parent model or revive historical Qwen/V4 subagent pins.

See `docs/ROUTING_EVIDENCE_LEDGER_V1.md` for the current evidence class of every role. A rejected pinned route is STOP; never silently substitute another provider/model.

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

When the work is truly `EXECUTION_READY`, stop adding shaping machinery and use `docs/OPERATOR_RUNBOOK_V1.md` plus `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`.

High-frequency invariants:

- supervisor is non-implementing;
- supervisor executes zero Gentle lifecycle commands;
- successful `herdr agent start` is the readiness barrier — no startup sleep/poll;
- worker owns implementation/Gentle/provider transitions/ack-burn/publication;
- unattended bounded RDD consent uses the versioned mechanical relay, never direct human prompting or model-reconstructed envelopes;
- Gentle Pi 2.5 standing session permission is an attended interactive convenience only and is not the unattended-train authority mechanism;
- native Gentle Agents may be used inside the fresh ticket worker, but never replace the outer fresh-worker-per-ticket boundary;
- `FINAL` through pi-intercom is the normal completion wake signal;
- fresh frontier rediscovery only after accepted durable checkpoint;
- no force push, destructive recovery or automatic merge.

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
