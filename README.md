# Atenea

Atenea is an **upstream-first autonomous engineering harness** for executing already-shaped software work safely with minimal custom glue.

The original laboratory question — whether complete upstream authoring/execution ecosystems could compose without rebuilding their internals — is answered positively through Stage 8. Atenea v1 is therefore a contract and policy layer over qualified upstream tools, not a new orchestration runtime.

## Current architecture

```text
MANUAL / INTERACTIVE SHAPING
  greenfield: Matt Pocock upstream workflow
  brownfield: preserve accepted repo-native shaping;
              OpenSpec delta-first when it materially adds value
  material UI/UX: conditional Impeccable
        ↓
explicit human promotion to EXECUTION_READY
        ↓
PI — autonomous supervisor
  frontier discovery / blocker + authority decisions
  worker supervision / allowed permission relay
        ↓
HERDR — process/session substrate
        ↓
OPENCODE + GENTLE AI — implementation worker
  implementation + deterministic verification
  native RDD exact-candidate review / bounded repair
        ↓
ONE fresh pre-publication authority revalidation
        ↓
normal non-force publication
  exact reconciliation
  checkpoint or PR according to repo policy
        ↓
PI re-discovers frontier
        ↓
STOP when exhausted
```

Atenea does **not** require a bespoke queue, scheduler, DAG, lifecycle controller, reviewer wrapper, RDD implementation, execution launcher, Herdr policy gate or state machine.

## Qualification status

```text
STAGES_0_4                         PASS
STAGE5_MATT_GENTLE_COMPOSITION    PASS
STAGE6_NATIVE_GENTLE_RDD          PASS
STAGE7_PI_SELF_LAUNCH             PASS
STAGE8_FRONTIER_DISCOVERY         PASS
UNATTENDED_EXECUTION              PASS
ZERO_HUMAN_TOUCH                  PASS
REMOTE_RECONCILIATION             PASS
FRONTIER_EXHAUSTION_STOP          PASS
```

Stage 8 accepted checkpoints:

- issue #18 — HEAD `1313b060ce8d22c3eac8bab5258c770af2dd08c0`
- issue #19 — HEAD `ad1bc950db3c03755ed1632bbf159b6c2f695a73`
- final Stage 8 tree `18687fcb7d9bfaac157c5ca33a0715ea5c996a6b`
- 131/131 tests

Stage 5–8 qualification remains **historical evidence from Gentle AI `2.5.0-rc.2`**. That evidence is not rewritten when the operational runtime advances.

See `docs/QUALIFICATION.md` and the Stage-specific files for frozen evidence.

## Current upstream/runtime state

As of 2026-09-01:

- Gentle AI `2.5.0` is the stable operational target.
- The stable RDD contract freezes one candidate, reviews those exact bytes, allows at most one bounded correction, and closes on the final causal capture/acknowledgement owned by Gentle.
- Atenea does not reconstruct provider-issued continuations, candidate identity, acknowledgement/burn, recovery, reviewer authority or mutation invalidation.
- Delivery remains ordinary repository policy; RDD does not create an Atenea delivery gate.
- Gentle Pi `2.3.0` is a materially changed stable upstream release and is therefore **eligible for one bounded re-evaluation**. It is not yet qualified or adopted by Atenea.

The currently qualified execution pattern remains **Pi → Herdr → OpenCode + Gentle AI** until field evidence proves a simpler upstream replacement preserves the same properties.

## Atenea v1 contract

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the normative horizontal contract.

Core rules:

1. **Before `EXECUTION_READY`: manual + interactive + repo-native shaping.**
2. **From `EXECUTION_READY`: autonomous bounded execution.**
3. **Pi supervises; it does not implement.**
4. **Herdr is substrate, not policy authority.**
5. **Gentle owns exact candidate/RDD/reviewer/repair authority.**
6. **Evidence outranks narration.**
7. **Normal push is allowed; no force-push, hidden history rewrite or auto-merge.**
8. **Material ambiguity or unsafe drift => STOP.**
9. **Any new Atenea glue must prove a real missing upstream owner.**

## Authoring entry points

### Greenfield — Matt Pocock

Use the complete Matt ecosystem and current repo setup/shaping semantics. Durable repository/tracker authority must be sufficient for a fresh executor; no Atenea Agent Brief/work-unit translation is required.

### Brownfield / evolutionary change

Preserve accepted repo-native shaping and product authority. **OpenSpec is optional**, not a mandatory migration or universal brownfield phase.

Use OpenSpec delta-first when a versioned proposal/spec/tasks flow materially improves clarity, auditability or handoff for a new brownfield delta. If existing accepted shaping already provides durable executable authority, do not route it through OpenSpec by ritual.

OpenSpec does not replace Pi supervision, Gentle execution/RDD or Git/GitHub authority. It remains unqualified in Atenea field use until a natural real-project run exercises it end-to-end.

### Material UI/UX — Impeccable

Impeccable is conditional. Material UI applicability is decided during human-present shaping, before `EXECUTION_READY`.

- `DESIGN.md` may own durable visual-system decisions where warranted.
- For existing verticals whose product truth lives elsewhere, `PRODUCT.md` is a deterministic derived compatibility projection, not a second source of truth.
- No universal Atenea UX framework or PRODUCT generator is required.

## Engineering quality

`CODING_STANDARDS.md` contains Atenea's stable horizontal engineering guardrails.

```text
ALWAYS-ON POLICY
  CODING_STANDARDS.md

TASK-TRIGGERED UPSTREAM METHODS
  Matt tdd
  Matt codebase-design
  Matt domain-modeling
  Matt diagnosing-bugs
  Matt code-review when semantic/spec-compliance risk warrants it

MACHINE ORACLES
  repo tests / lint / build / typecheck / structural checks

FINAL CANDIDATE LIFECYCLE
  Gentle native RDD
```

The Matt skills are **not a mandatory execution sequence**. Atenea deliberately does not create a Clean Code agent/framework or a second mandatory reviewer lifecycle.

## Working principles

1. **Upstream first.** Verify current upstream before adding glue.
2. **Evidence over narration.** Tests, exact candidate identity, git refs and tracker state outrank claims.
3. **Keep repo overlays small.** `AGENTS.md` is pointers/high-frequency invariants; engineering guardrails live in `CODING_STANDARDS.md`; task methods remain upstream skills.
4. **Scalable means changeable.** No speculative microservices/distribution/abstraction without evidence.
5. **Debt is explicit.** Intentional debt must be visible, bounded and owned.
6. **No duplicated authority.** Product/design/runtime facts each have one canonical owner.

## What remains

Atenea v1 does not need another large synthetic qualification ladder.

The next work is real-project use:

1. move the operational Gentle runtime to stable `2.5.0`;
2. capture natural stable-contract evidence on the next real slice without repeating Stage 5–8;
3. shape with existing repo-native authority, using Matt/OpenSpec/Impeccable only when their triggers or value justify them;
4. promote explicitly to `EXECUTION_READY`;
5. run the qualified Pi → Herdr → OpenCode/Gentle path;
6. separately run one bounded Gentle Pi `2.3.0` re-evaluation whose success criterion is **deleting architecture/glue**, not adding another layer;
7. treat any discovered gap as repo-local/upstream/horizontal before building anything.

See `docs/REAL_PROJECT_ROLLOUT_V1.md`.

## Canonical documentation

- `docs/ATENEA_HARNESS_CONTRACT_V1.md` — normative Atenea v1 contract.
- `CODING_STANDARDS.md` — repo-local engineering guardrails.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — real-project adoption and bounded re-evaluation plan.
- `docs/CURRENT_DECISIONS.md` — current short decision index.
- `docs/ATENEA_HANDOFF_20260830.md` — historical post-Stage-8 handoff/evidence map.
- `docs/QUALIFICATION.md` — qualification status and field-qualified boundaries.
- `docs/STAGE7_SELF_LAUNCH_CLOSURE.md` — Pi self-launch evidence.
- `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md` — autonomous frontier evidence.
- `docs/REJECTED.md` — rejected/deferred architecture and supersession notes.
- older decision/stage files — historical evidence; current authority above supersedes stale forward-looking labels.