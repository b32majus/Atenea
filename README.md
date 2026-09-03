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
HUMAN OPERATOR
  opens/uses Herdr
  starts Pi interactively
  gives one bounded execution prompt
        ↓
PI — autonomous thin supervisor
  frontier discovery / blocker + authority decisions
  worker supervision / genuine human-boundary relay
        ↓
HERDR — process/session substrate
        ↓
HEADLESS OPENCODE (`opencode run`) + GENTLE AI
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
STOP before human merge / when exhausted
        ↓
PI factual final report
```

Atenea does **not** require a bespoke queue, scheduler, DAG, lifecycle controller, reviewer wrapper, RDD implementation, execution launcher, Herdr policy gate or state machine.

Interactive OpenCode remains valid for human-attended development. It is not the normal unattended transport between Pi/Herdr and the implementation worker; current field evidence selects headless `opencode run --format json` for that path.

## Qualification status

```text
STAGES_0_4                         PASS
STAGE5_MATT_GENTLE_COMPOSITION    PASS
STAGE6_NATIVE_GENTLE_RDD          PASS
STAGE7_PI_SELF_LAUNCH             PASS
STAGE8_FRONTIER_DISCOVERY         PASS
UNATTENDED_EXECUTION_RC2          PASS
ZERO_HUMAN_TOUCH_RC2              PASS
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

As of 2026-09-03:

- Gentle AI `2.5.0` is the production stable operational target.
- Judit #76 / PR #79 proved the stable exact-candidate RDD path, provider continuation/re-entry, approval and exact acknowledgement/burn on real work.
- Stable Gentle still contains unattended-capable consent semantics; the released OpenCode negotiated `review-integration/v2` path currently forces `--consent relay`, which selects candidate-scoped human consent.
- A bounded **provider-side canary based exactly on v2.5.0** has now proved negotiated-v2 unattended behavior without Pi/OpenCode rewriting provider transitions.
- The canary culminated in a real `Pi 0.84.4 → Herdr 0.8.2 → headless OpenCode 1.18.27 → Gentle` review path with `HUMAN_TOUCH_AFTER_EXECUTION_READY=0`, exact RDD and acknowledgement/burn.
- Production Gentle remained untouched. The canary selector is downstream experimental evidence only; upstream `Gentleman-Programming/gentle-ai#4109` remains the production-resolution path.
- Atenea does not reconstruct provider-issued continuations, candidate identity, acknowledgement/burn, recovery, reviewer authority or mutation invalidation.
- Delivery remains ordinary repository policy; RDD does not create an Atenea delivery gate.
- Gentle Pi `2.3.0` remains eligible for one bounded replacement/deletion re-evaluation and is not adopted.

The accepted architecture remains **Pi → Herdr → headless OpenCode + Gentle AI** until field evidence proves a simpler upstream replacement preserves the same properties.

Zero-touch canary evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

## Atenea v1 contract

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the normative horizontal contract.

Core rules:

1. **Before `EXECUTION_READY`: manual + interactive + repo-native shaping.**
2. **From `EXECUTION_READY`: autonomous bounded execution.**
3. **The human starts Pi and gives one bounded execution prompt; Pi supervises thereafter.**
4. **Pi supervises; it does not implement or run Gentle lifecycle commands.**
5. **Herdr is substrate, not policy authority.**
6. **Headless OpenCode owns implementation; Gentle owns exact candidate/RDD/reviewer/repair authority.**
7. **Evidence outranks narration.**
8. **Normal non-force push is allowed; no force-push, hidden history rewrite or auto-merge.**
9. **Material ambiguity or unsafe drift => STOP.**
10. **Any new Atenea glue must prove a real missing upstream owner.**

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

The next work is one small real operator-triggered `EXECUTION_READY` slice through the actual top-level interface:

```text
human opens Herdr
→ starts Pi interactively
→ one bounded execution prompt
→ Pi → Herdr → headless OpenCode → Gentle
→ implementation + verification + exact-candidate RDD
→ acknowledgement/burn
→ pre-publication authority revalidation
→ normal non-force push
→ PR/checkpoint
→ exact reconciliation
→ frontier rediscovery
→ STOP before human merge / when exhausted
→ final Pi report
```

That run should capture:

```text
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
HUMAN_TOUCH_AFTER_EXECUTION_READY=0              desired; any real human turn must be recorded
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
NORMAL_NON_FORCE_PUBLICATION=PASS
PR_OR_CHECKPOINT=PASS
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

For this bounded experiment only, the isolated negotiated-v2 provider canary may be used exactly as documented in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`; production Gentle remains untouched and upstream #4109 remains open.

The operator may answer a genuine human-owned decision if one actually appears, but that intervention must be recorded and the run must not then be silently reported as zero-touch. Already-authorized operational permissions such as normal non-force push should be handled by Pi. Final merge remains a human boundary.

Separately, Gentle Pi `2.3.0` remains eligible for one bounded replacement/deletion experiment whose success criterion is **removing architecture/glue**, not adding another layer.

See `docs/REAL_PROJECT_ROLLOUT_V1.md`.

## Canonical documentation

- `docs/ATENEA_HARNESS_CONTRACT_V1.md` — normative Atenea v1 contract.
- `CODING_STANDARDS.md` — repo-local engineering guardrails.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — real-project operator path and bounded experiments.
- `docs/OPERATOR_RUNBOOK_V1.md` — practical operator runbook for starting a normal Atenea run.
- `docs/CURRENT_DECISIONS.md` — current short decision index.
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — bounded zero-touch provider/OpenCode/Pi evidence and adoption boundary.
- `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md` — first real stable Gentle field run.
- `docs/ATENEA_HANDOFF_20260830.md` — historical post-Stage-8 handoff/evidence map.
- `docs/QUALIFICATION.md` — qualification status and field-qualified boundaries.
- `docs/STAGE7_SELF_LAUNCH_CLOSURE.md` — Pi self-launch evidence.
- `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md` — autonomous frontier evidence.
- `docs/REJECTED.md` — rejected/deferred architecture and supersession notes.
- older decision/stage files — historical evidence; current authority above supersedes stale forward-looking labels.