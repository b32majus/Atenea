# Atenea

Atenea is an **upstream-first autonomous engineering harness** for executing already-shaped software work safely with minimal custom glue.

The original laboratory question — whether complete upstream authoring/execution ecosystems could compose without rebuilding their internals — is answered positively through Stage 8. Atenea v1 is therefore a contract and policy layer over qualified upstream tools, not a new orchestration runtime.

## Current architecture

```text
MANUAL / INTERACTIVE SHAPING
  greenfield: Matt Pocock upstream workflow
  brownfield: OpenSpec delta-first (field qualification pending)
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

See `docs/QUALIFICATION.md` and the Stage-specific files for frozen evidence.

## Current runtime baseline

As of the canonical 2026-08-30 handoff:

- OpenCode `1.18.25`
- Gentle AI global `2.5.0-rc.2`
- Pi supervisor with project/global model routing intact
- Gentle Pi: **uninstalled / not qualified / do not repair with adapters**

The accepted execution pattern is **Pi → Herdr → OpenCode + Gentle AI**.

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

### Brownfield — OpenSpec

OpenSpec is the intended evolutionary/brownfield entry path.

Use it delta-first: specify the behavior being added/changed/removed instead of reverse-documenting the whole existing product before each change. OpenSpec remains a shaping/specification front end; it does not replace Pi supervision, Gentle execution/RDD or Git/GitHub authority.

Status: **architecturally accepted; end-to-end Atenea field qualification pending**.

The first qualification belongs on a real bounded brownfield code change, not Atenea's own maintenance.

### Material UI/UX — Impeccable

Impeccable is conditional. Material UI applicability is decided during human-present shaping, before `EXECUTION_READY`.

- `DESIGN.md` may own durable visual-system decisions where warranted.
- For existing verticals whose product truth lives elsewhere, `PRODUCT.md` is a deterministic derived compatibility projection, not a second source of truth.
- No universal Atenea UX framework or PRODUCT generator is required.

## Engineering quality

`CODING_STANDARDS.md` contains only the horizontal #268 delta not already owned by upstream engineering methods.

Composition:

```text
CODING_STANDARDS.md
+ Matt tdd
+ Matt codebase-design
+ Matt domain-modeling
+ Matt diagnosing-bugs
+ Matt code-review when useful
+ justified deterministic repo tooling
+ Gentle final exact-candidate RDD authority
```

Atenea deliberately does not create a Clean Code agent/framework or a second mandatory reviewer lifecycle.

## Working principles

1. **Upstream first.** Verify current upstream before adding glue.
2. **Evidence over narration.** Tests, exact candidate identity, git refs and tracker state outrank claims.
3. **Keep repo overlays small.** `AGENTS.md` is pointers/high-frequency invariants; detailed quality lives in `CODING_STANDARDS.md` and upstream methods.
4. **Scalable means changeable.** No speculative microservices/distribution/abstraction without evidence.
5. **Debt is explicit.** Intentional debt must be visible, bounded and owned.
6. **No duplicated authority.** Product/design/runtime facts each have one canonical owner.

## What remains

Atenea v1 does not need more harness construction or another large synthetic qualification ladder.

The next work is **real-project rollout**:

1. choose one bounded real slice;
2. onboard only missing repo-local policy/config;
3. shape with Matt (greenfield) or OpenSpec (brownfield);
4. conditionally use Impeccable for material UI;
5. promote explicitly to `EXECUTION_READY`;
6. run the qualified Pi → Herdr → OpenCode/Gentle path;
7. collect compact field evidence;
8. treat any discovered gap as repo-local/upstream/horizontal before building anything.

See `docs/REAL_PROJECT_ROLLOUT_V1.md`.

## Canonical documentation

- `docs/ATENEA_HARNESS_CONTRACT_V1.md` — normative Atenea v1 contract.
- `CODING_STANDARDS.md` — repo-local engineering-quality policy.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — next real-project adoption plan.
- `docs/CURRENT_DECISIONS.md` — current short decision index.
- `docs/ATENEA_HANDOFF_20260830.md` — canonical post-Stage-8 handoff/evidence map.
- `docs/QUALIFICATION.md` — qualification status and field-qualified boundaries.
- `docs/STAGE7_SELF_LAUNCH_CLOSURE.md` — Pi self-launch evidence.
- `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md` — autonomous frontier evidence.
- `docs/REJECTED.md` — rejected/deferred architecture and supersession notes.
- older decision/stage files — historical evidence; current authority above supersedes stale forward-looking labels.