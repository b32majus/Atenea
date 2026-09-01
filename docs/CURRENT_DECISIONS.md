# Atenea — Current decisions after Stage 8

Date: 2026-09-01

This file is the short current decision index. Historical `docs/DECISIONS.md`, stage files and `docs/ATENEA_HANDOFF_20260830.md` remain evidence of how Atenea evolved, but their forward-looking status is superseded where it conflicts with this index, `README.md`, `docs/QUALIFICATION.md` or `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

## C-001 — Atenea is a contract over upstream tools, not an orchestration product

**Accepted.**

Do not build a custom lifecycle/controller/state-machine architecture absent field evidence that a required property has no upstream owner.

## C-002 — Pi is the currently qualified thin autonomous supervisor

**Accepted and qualified.**

Pi owns frontier discovery, dependency/blocker/authority decisions, worker supervision, permission relay when required, closure/reconciliation checks and frontier rediscovery. Pi does not implement product code.

A future upstream replacement may be adopted only after bounded evidence proves it preserves these properties while deleting architecture or glue.

## C-003 — Herdr is process/session substrate only

**Accepted and qualified.**

Herdr provides the process/session surface used by the qualified architecture. Do not reintroduce Herdr-specific policy gates or make Herdr an independent authority controller.

## C-004 — OpenCode + Gentle is the accepted implementation worker

**Accepted and qualified.**

Gentle owns the exact candidate, native RDD, reviewer lineage/authority, bounded correction, provider-issued continuation/re-entry, final acknowledgement/burn, recovery and mutation invalidation. Atenea must not duplicate those mechanisms.

Gentle AI `2.5.0` stable is the current operational target. Stage 5–8 evidence remains historical evidence from `2.5.0-rc.2`.

## C-005 — Gentle Pi 2.2.0 failed; 2.3.0 is eligible for one bounded re-evaluation

**Historical `2.2.0`: rejected / not qualified.**

The `2.2.0` failure remains valid evidence.

**Current `2.3.0`: `REEVALUATION_ELIGIBLE`, not qualified or adopted.**

`2.3.0` is materially changed upstream: stable Gentle `2.5.0`, provider-issued continuations executed verbatim, final acknowledgement lifecycle, native Herdr bridge/guarded-command permissions and parent-owned edit surfaces.

Run at most one bounded replacement/deletion evaluation. Success means preserving Atenea's qualified properties while removing components/glue. Do not layer Gentle Pi on top of the current path merely because it is available.

Until PASS, the accepted architecture remains Pi → Herdr → OpenCode + Gentle.

## C-006 — Normal git push is allowed; no publication-permission subsystem

**Accepted.**

Normal non-force publication follows repository policy. If an interactive permission is raised during autonomous execution, the current supervisor may grant an allowed operation.

Dangerous/destructive recovery remains outside the autonomous default: no force-push, hidden reset/rebase history rewrite or automatic merge.

## C-007 — Greenfield authoring uses Matt upstream

**Accepted and qualified.**

Use the complete Matt Pocock ecosystem and durable repository/tracker authority. Do not create a custom Agent Brief/work-unit translation layer.

## C-008 — Brownfield preserves repo-native shaping; OpenSpec is optional

**Accepted.**

Do not force existing systems through OpenSpec or migrate accepted shaping authority by ritual.

OpenSpec may be selected delta-first for a new brownfield/evolutionary change when a versioned proposal/spec/tasks flow materially improves clarity, auditability or handoff. It remains a shaping front end, not a replacement for Pi supervision, Gentle execution/review or Git/GitHub authority.

Natural field evidence is pending because Atenea has not yet needed OpenSpec on a real selected delta.

## C-009 — Material UI/UX uses upstream Impeccable conditionally

**Accepted and consolidated.**

Material UI/UX applicability is decided during human-present shaping before `EXECUTION_READY`.

Do not make Impeccable mandatory for backend/non-UI work. `DESIGN.md` may own durable visual-system rules where warranted. If tooling needs `PRODUCT.md` while product truth lives elsewhere, use the smallest deterministic derived projection rather than duplicate authority.

## C-010 — Engineering quality = stable repo guardrails + task-triggered upstream methods

**Accepted and consolidated.**

```text
ALWAYS-ON POLICY
  CODING_STANDARDS.md

TASK-TRIGGERED UPSTREAM METHODS
  tdd
  codebase-design
  domain-modeling
  diagnosing-bugs
  code-review when semantic/spec-compliance risk warrants it

MACHINE ORACLES
  justified deterministic tooling

FINAL CANDIDATE LIFECYCLE
  Gentle native RDD
```

The Matt skills are not a mandatory execution sequence. Do not build a custom Clean Code framework, quality agent or new quality lifecycle.

## C-011 — No second mandatory LLM review lifecycle

**Accepted.**

Gentle native RDD owns final exact-candidate review authority. Matt `code-review` is an optional upstream method; when semantic/spec-compliance risk warrants it, use it before Gentle RDD. A post-Gentle mutation requires a new Gentle candidate lifecycle.

## C-012 — Repository delivery policy remains repository-specific

**Accepted.**

RDD evidence/approval is separate from delivery. A work unit may end at an accepted remote checkpoint or PR according to repository policy. Human merge boundaries remain valid. Atenea does not auto-merge.

## C-013 — No further large synthetic qualification ladder

**Accepted.**

Stage 5–8 already qualify the core architecture. New surfaces should be validated through bounded real-project evidence.

Gentle Pi `2.3.0` qualifies for one bounded re-evaluation because it is a materially changed replacement candidate for a previously failed runtime. This is not Stage 9.

## C-014 — Harness Contract v1 is the normative horizontal boundary

**Accepted.**

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the compact normative contract for readiness, ownership, supervision, candidate/review authority, engineering-quality placement, material UI activation, publication/reconciliation and STOP behavior.

It adds no custom runtime.

## C-015 — PRODUCT.md is compatibility, not duplicate product truth

**Accepted.**

For established verticals whose canonical product authority lives elsewhere, any `PRODUCT.md` required by design tooling is generated/derived, names canonical sources, is marked `DO NOT EDIT AS AUTHORITY`, and must be idempotent/diffable. `DESIGN.md` remains separate visual-system authority.

No universal Atenea PRODUCT generator is required.

## C-016 — Real-project rollout remains the primary test harness

**Accepted.**

Use `docs/REAL_PROJECT_ROLLOUT_V1.md`.

Current sequence:

1. preserve current repo/product authority and shape only unresolved work;
2. use Matt/OpenSpec/Impeccable only when their task trigger or value warrants it;
3. explicitly promote to `EXECUTION_READY`;
4. run the qualified Pi → Herdr → OpenCode/Gentle path with Gentle AI `2.5.0` stable as operational target;
5. capture compact stable-contract field evidence rather than repeating Stage 5–8;
6. separately run one bounded Gentle Pi `2.3.0` replacement/deletion evaluation;
7. build new Atenea glue only after a real horizontal gap survives the upstream-first change test.
