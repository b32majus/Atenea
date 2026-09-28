# Atenea — Repository Policy

Status: **CURRENT AUTHORITY**

Atenea is a thin upstream-first policy, configuration and conformance layer over native engineering tools.

This file defines stable repository policy. It is **not** a product specification, task tracker, runtime state store or duplicate Gentle manual.

Do not rebuild Gentle review lifecycle, provider routing semantics or correction state inside Atenea. One thin outer supervisor is current and may own only cross-ticket frontier, worker launch, exact transport of already-authorized procedural choices, durable checkpoint reconciliation and terminal STOP; it must not become a second engineering/review harness.

## 1. Ownership

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ target repository AGENTS.md + CODING_STANDARDS.md

shaping, only while genuinely active
→ adopted shaping workflow

HOW to implement one already-shaped bounded ticket
→ one plain Pi worker (`pi --no-extensions`)

native candidate review when due
→ Gentle AI through Codex review transport

cross-ticket launch / checkpoint / next-or-STOP
→ Pi supervisor + Herdr

deterministic facts
→ tests / validators / oracles / CI

publish / merge
→ target repository policy + explicit human authority
```

OpenCode Build is the qualified fallback ticket worker. It does not become authority to reopen product shaping.

No methodology or runtime tool may silently invent product semantics, acceptance criteria, domain rules or publication authority merely because it needs them to proceed.

## 2. Authority precedence

When compatible sources overlap:

1. accepted current product/domain authority — live specs, ADRs, accepted issues/work orders and canonical product docs;
2. the currently authorized task/change artifacts derived from that authority;
3. stable repository policy — target `AGENTS.md`, `CODING_STANDARDS.md`, contribution/security rules;
4. active phase-specific methodology guidance;
5. upstream tool defaults;
6. historical docs, stale config, chat/session memory and remembered setups.

A current human instruction may explicitly reopen or change higher-level authority.

Material conflict between current authorities => **STOP and reconcile** rather than silently choosing one.

## 3. Read before changing Atenea

Read:

1. `README.md`;
2. `docs/START_HERE.md`;
3. `docs/CURRENT_EXECUTION_DECISION_C077.md`;
4. `CODING_STANDARDS.md`;
5. `docs/CURRENT_DECISIONS.md` / relevant ADRs for provenance;
6. the specific accepted issue/work order/spec being executed.

For current operation read `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
For runtime/version exceptions read `docs/vnext/CURRENT_COMPATIBILITY.md`.
Historical stage documents and `historical/` are evidence, not forward-looking authority.

## 4. Stable invariants

- Upstream-first is operational, not rhetorical.
- Prefer supported upstream behavior and public interfaces.
- Do not copy or rebuild upstream review-state machinery inside Atenea without a demonstrated unsupported seam.
- Keep changes scoped to accepted authority.
- Preserve one durable authority for each fact.
- Machine-decidable invariants belong in deterministic tooling.
- Review approval is not publication or merge authority.
- No automatic merge, force-push or destructive history recovery.
- Secrets never belong in repository config, prompts, logs or committed desired-state files.
- Historical evidence may remain without remaining active runtime.
- Hidden global state must not be the only place where behavior-affecting configuration is defined.
- Disposable canaries must not write production memory/session state.
- Execution worktrees are ephemeral delivery surfaces, not historical authority stores; dispose only after publication evidence is durable and no required local state/process depends on them.

## 5. Shaping and execution entry

Shaping is phase-scoped. If work is genuinely unshaped, use the smallest adopted workflow that produces durable executable authority. Matt skills and OpenSpec remain optional; neither is a mandatory execution prelude.

For already-shaped work, use `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md` and `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.

Do **not** send prepared tickets through ODD or `gentle-orchestrator` merely to rediscover product meaning, decomposition or tracking already made durable by the project.

Do **not** require a composition forecast, model/profile-selection ceremony, broad archaeology or Promotion Review for every substantial ticket merely because those controls exist. Open `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` only when concrete evidence shows a coarse/over-budget or genuinely multi-unit delivery shape.

For material work, executable authority must still be sufficiently falsifiable for its risk: applicable invariants, negative/adversarial cases, integration seams, performance criteria when material, and deterministic acceptance belong in durable task authority when they change correctness. This is a quality requirement, not paperwork.

## 6. Prepared-ticket execution ownership

The thin outer supervisor owns only:

- already-authorized train frontier;
- launch/observation of exactly one ticket worker;
- procedural answers already contained in durable authority;
- exact relay of already-authorized candidate-scoped review consent;
- durable Git/checkpoint reconciliation;
- next compatible ticket or terminal STOP.

The normal ticket worker is one plain Pi child launched through Herdr with `--no-extensions` in the target worktree.

Before product writes the worker reads the target repository's current authority, normally including:

- `AGENTS.md`;
- `CODING_STANDARDS.md` when present/required;
- accepted ticket/work-order/spec and cited live authority;
- applicable project-local skills.

The worker owns implementation, deterministic checks/oracles, the authorized local candidate commit and entry into native Gentle review.

Atenea does **not** own or reconstruct:

- Gentle review transaction state;
- lens selection;
- candidate-causality classification;
- refuter/validator semantics;
- bounded correction authority;
- acknowledgement/burn.

Use supported native surfaces and follow provider/runtime-issued transitions exactly.

Runtime mechanics may decide **how** accepted work is performed. They may not expand **what** accepted authority authorized.

## 7. Review transport

Prepared-ticket review enters native Gentle through Codex transport after the candidate commit:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent codex \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

If `review_due=true`, execute the returned `next_transition.command` literally. After START, preserve the exact lineage/revision/target and route only through provider-issued transitions.

Plain Pi is **not** a Gentle Pi review host. Never manually export `GENTLE_PI_REVIEW_RELAY_CONTRACT` to make `pi --no-extensions` impersonate the Gentle Shell relay.

Native Gentle owns lenses, refutation when applicable, bounded correction, targeted validation and acknowledgement/burn. A deterministic finding need not pass through refuter; inferential findings use the provider's refutation path when required.

Judgment Day is a separate explicit dual/adversarial review tool. Invoke it only when the user/ticket explicitly requests it for a concrete target; it is not an automatic post-RDD ritual and does not grant delivery authority.

## 8. Skills and repository setup

Pi natively supports trusted project skills from both:

```text
.pi/skills/
.agents/skills/
```

Keep intentional Pi-specific/project resources under `.pi/skills`. Prefer `.agents/skills/<skill>/SKILL.md` when the skill is intended to be shared across runtimes. Do not copy or migrate valid skills merely to normalize directory layout.

Project skill resources are subject to Pi project trust. An unattended worker that must consume intentionally trusted project-local skills/settings may use Pi's one-run `--approve` trust override. Project trust controls resource loading; it is not a sandbox or permission to trust arbitrary code.

Discovered `SKILL.md` files should contain valid YAML frontmatter with non-empty:

```yaml
name: <skill-name>
description: <when/why to use it>
```

Do not duplicate Atenea lifecycle/model-routing/provider policy into product skills. Project skills own domain, engineering, UI, QA and documentation guidance.

Legacy/runtime-owned global skill roots remain owned by their runtimes; do not mass-migrate or duplicate them without a concrete compatibility reason.

Matt Pocock skills remain optional discovery/shaping tools, not a mandatory runtime prelude.

## 9. Fallback

If plain Pi has a concrete runtime/tooling failure, preserve the current worktree and durable checkpoint and relaunch the **same prepared-ticket contract** with qualified OpenCode Build.

Do not use `gentle-orchestrator` as the fallback merely because OpenCode is the host. OpenCode implementation and Codex review transport remain separate responsibilities.

Exact fallback/runtime compatibility lives in `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 10. Verification and engineering quality

`CODING_STANDARDS.md` is the stable horizontal engineering-quality authority for Atenea itself. Target repositories own their corresponding product engineering standards.

Prefer deterministic evidence that can independently disagree with implementation: tests, typecheck/build, schema validation, repository cleanliness, changed-path checks, security/privacy checks, performance benchmarks when material, and independent acceptance oracles where required.

A new/materially changed checker or scanner for security, privacy, state, parsing or trust-boundary behavior should prove it can fail on a representative planted violation, not merely pass on the intended implementation.

## 11. Publication

For a material multi-work-unit/train that crosses accepted seams, validate the composed exact HEAD with repository-owned deterministic integration evidence before publication. Per-unit RDD does not substitute for cross-unit integration evidence, and a composed branch does not become a synthetic Gentle candidate merely for closeout.

Review approval is not push/PR/merge/deploy authority. Follow target repository policy and explicit human authorization. No automatic merge.

## 12. Repository entry and resumption

When entering or resuming a repository:

- find current Git/GitHub/product authority first;
- inventory old harness/tooling read-only when relevant;
- classify signals as current / compatibility-required / historical / stale-or-unknown;
- do not delete or reactivate old tooling by assumption;
- do not resume stale hidden session state merely because it exists;
- preserve existing worktree/commit progress when adapting a train to the current protocol.

Durable Git/GitHub/product evidence outranks remembered agent/session state.
