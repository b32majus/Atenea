# Atenea

Atenea is an **upstream-first autonomous engineering harness** for executing already-shaped software work safely with minimal custom glue.

The project began as a laboratory to test whether the complete Matt Pocock and Gentle AI ecosystems could compose cleanly. That question is now answered positively through Stage 8. The current task is no longer to invent an execution platform, but to preserve the qualified workflow, define the small remaining repo-local policy surface, and use it on real projects.

## Current qualified architecture

```text
AUTHORING / SHAPING
  greenfield: Matt Pocock upstream workflow
  brownfield: OpenSpec is the intended entry path, not yet qualified in Atenea
  material UI/UX: conditional Impeccable policy to be finalized from #267
        ↓
ready-for-agent GitHub work + durable repository authority
        ↓
PI — autonomous supervisor
  discovers executable frontier
  respects blockers / authority / runtime constraints
  creates and supervises the worker through Herdr
  remains non-implementing
        ↓
HERDR — process/session substrate
        ↓
OPENCODE + GENTLE AI — implementation worker
  implementation
  deterministic verification
  native RDD exact-candidate review / bounded repair
  exact candidate / receipt authority
        ↓
normal git push
  exact local/upstream/remote reconciliation
  issue closure or repository PR policy
        ↓
PI re-discovers frontier
        ↓
STOP when exhausted
```

Atenea does **not** require a bespoke queue, scheduler, DAG, lifecycle controller, reviewer wrapper, RDD implementation, execution launcher or state machine.

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

See `docs/STAGE7_SELF_LAUNCH_CLOSURE.md` and `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md` for the frozen qualification evidence.

## Current runtime baseline

As of the canonical 2026-08-30 handoff:

- OpenCode `1.18.25`
- Gentle AI global `2.5.0-rc.2`
- Pi supervisor with project/global model routing intact
- Gentle Pi: **uninstalled / not qualified / do not repair with adapters**

The accepted execution pattern is **Pi → Herdr → OpenCode + Gentle AI**.

## Authoring entry points

### Greenfield

Use the complete Matt Pocock ecosystem, keeping upstream methods intact and pinned where appropriate. The qualified path uses durable repository/tracker authority rather than a custom Agent Brief translation layer.

### Brownfield

**OpenSpec is the intended Atenea entry path for evolutionary/brownfield work.**

It should be used delta-first: shape/specify the behavior being changed rather than reverse-documenting the entire existing codebase. OpenSpec remains an authoring/shaping front end; it does not replace Pi supervision, OpenCode/Gentle execution, Gentle RDD or Git/GitHub authority.

Status: **architecturally accepted candidate, not yet field-qualified inside Atenea**.

The first OpenSpec qualification should happen on a real brownfield change, not on Atenea's own documentation repair, to avoid a self-referential test.

## Working principles

1. **Upstream first.** Prefer supported Matt, Pi, Herdr, OpenCode, Gentle, OpenSpec, Impeccable and Git/GitHub capabilities before proposing Atenea glue.
2. **Evidence over narration.** Tests, exact candidate identity, git state, remote refs and tracker state outrank agent claims.
3. **Pi supervises; it does not implement.** Herdr provides process/session primitives, not product-policy authority.
4. **Gentle owns final candidate authority.** Atenea never reconstructs RDD, candidate freezing, reviewer lineage, receipts or repair lifecycle.
5. **Normal publication only.** No force-push, hidden reset/rebase recovery or automatic merge.
6. **Fail closed on material ambiguity or drift.** Unexpected authority conflicts or unsafe repository state stop execution for adjudication.
7. **Keep repo overlays small.** `AGENTS.md` should remain pointers/high-frequency invariants; engineering quality belongs in concise `CODING_STANDARDS.md` plus upstream methods and deterministic tools.
8. **Scalable means changeable.** Do not introduce distributed or abstract architecture without requirement or evidence.

## What remains

The qualified runtime does not need another large qualification ladder.

Remaining work is primarily policy/documentation:

1. reconcile this repository with the Stage 8 qualified state;
2. consolidate `Atenea Harness Contract v1`;
3. incorporate only the still-useful delta from KairOS #268 into `CODING_STANDARDS.md`;
4. incorporate only the surviving #267 policy: conditional Impeccable, `DESIGN.md` visual authority, and derived-only `PRODUCT.md` where required;
5. design the first real-project rollout and gather field evidence for surfaces such as OpenSpec brownfield authoring and repository-specific PR/merge policy.

Do not create a custom execution controller merely to complete this list.

## Canonical documentation

- `docs/ATENEA_HANDOFF_20260830.md` — current post-Stage-8 handoff and ownership map.
- `docs/QUALIFICATION.md` — current qualification status and what is/not yet field-qualified.
- `docs/STAGE5_TRACER_TRAIN.md` — Stage 5 frozen evidence.
- `docs/STAGE7_SELF_LAUNCH_CLOSURE.md` — Pi self-launch evidence.
- `docs/STAGE8_FRONTIER_DISCOVERY_EXPERIMENT.md` — autonomous frontier-discovery evidence.
- `docs/HANDOFF_CONTRACT.md` — historical Matt→Gentle handoff contract from the qualification ladder.
- `docs/DECISIONS.md` and stage decision files — durable historical decisions; later documents may supersede earlier forward-looking status.
- `docs/REJECTED.md` — rejected/deferred approaches and current supersession notes.
