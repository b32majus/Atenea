# Atenea — Current decisions after Stage 8

Date: 2026-08-30

This file is the short current decision index. Historical `docs/DECISIONS.md` and stage decision files remain evidence of how Atenea evolved, but any forward-looking status in those older files is superseded where it conflicts with this index, `README.md`, `docs/QUALIFICATION.md`, `docs/ATENEA_HANDOFF_20260830.md` or `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

## C-001 — Atenea is a contract over upstream tools, not an orchestration product

**Accepted.**

Do not build a custom lifecycle/controller/state-machine architecture absent new field evidence that an upstream owner is missing.

## C-002 — Pi is the thin autonomous supervisor

**Accepted and qualified.**

Pi owns frontier discovery, dependency/blocker/authority decisions, worker supervision, permission relay when required, closure/reconciliation checks and frontier rediscovery. Pi does not implement product code.

## C-003 — Herdr is process/session substrate only

**Accepted and qualified.**

Herdr provides the process/session surface used by Pi. Do not reintroduce Herdr-specific policy gates or make Herdr the authority controller.

## C-004 — OpenCode + Gentle is the accepted implementation worker

**Accepted and qualified.**

Gentle owns the exact candidate, native RDD, reviewer lineage/authority, bounded repair and mutation invalidation. Atenea must not duplicate those mechanisms.

## C-005 — Gentle Pi is not part of the current architecture

**Rejected / not qualified.**

Gentle Pi `2.2.0` remains uninstalled. Do not build adapters around it. Re-evaluate only after a materially changed upstream release.

## C-006 — Normal git push is allowed; no new publication-permission subsystem

**Accepted.**

The current OpenCode/Gentle autonomous path permits normal push. If an interactive permission is raised during autonomous execution, Pi supervisor may grant the allowed operation. Do not create an additional Herdr/publication gate solely to mediate normal push.

Dangerous or destructive publication/recovery remains outside the autonomous default: no force-push, hidden reset/rebase history rewrite or automatic merge.

## C-007 — Greenfield authoring uses Matt upstream

**Accepted and qualified.**

Use the complete Matt Pocock ecosystem and durable repository/tracker authority. Do not create a custom Agent Brief/work-unit translation layer.

## C-008 — Brownfield authoring uses OpenSpec as the intended entry path

**Accepted direction; field qualification pending.**

OpenSpec should be used delta-first for existing systems. It is an authoring/shaping entry path, not a replacement for Pi supervision or Gentle execution/review authority.

The first qualification should be one bounded real brownfield code change outside Atenea's own harness/documentation maintenance.

## C-009 — Material UI/UX uses upstream Impeccable conditionally

**Accepted and consolidated in Harness Contract v1.**

Material UI/UX applicability is decided during human-present shaping before `EXECUTION_READY`.

Do not make Impeccable a mandatory phase for backend/non-UI work. `DESIGN.md` may own durable visual-system rules where warranted. If tooling needs `PRODUCT.md` while product truth lives elsewhere, use the smallest deterministic derived projection rather than duplicate authority.

## C-010 — Engineering quality is upstream methods + concise repo policy

**Accepted and consolidated.**

Use `CODING_STANDARDS.md` plus upstream `tdd`, `codebase-design`, `domain-modeling`, `diagnosing-bugs`, `code-review` and justified deterministic tooling.

The repo-local standards own only the horizontal delta: changeability, bounded debt, contract cleanup/evolution, TDD applicability and risk-driven negative testing, dependency hygiene, operability, security/data boundaries, evidence-driven performance/scale and durable decision placement.

Do not build a custom Clean Code framework, quality agent or new quality lifecycle.

## C-011 — No second mandatory LLM review lifecycle

**Accepted.**

Gentle native RDD owns final exact-candidate review authority. Matt `code-review` remains available as an upstream engineering method and may be used where workflow/risk warrants it, but Atenea does not mandate a second reviewer chain after every candidate by ritual.

## C-012 — Repository delivery policy remains repository-specific

**Accepted.**

A work unit may end at an accepted remote checkpoint or PR according to repository policy. Human merge boundaries remain valid. Atenea does not auto-merge.

## C-013 — No further large synthetic qualification ladder

**Accepted.**

Stage 5–8 already qualify the core runtime. Optional/new surfaces should be validated through bounded real-project field evidence rather than ceremonial Stage 9/10 sequences.

## C-014 — Harness Contract v1 is the normative horizontal runtime/policy boundary

**Accepted.**

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the compact normative contract for readiness, ownership, supervision, candidate/review authority, engineering-quality placement, material UI activation, publication/reconciliation and STOP behavior.

It adds no new runtime.

## C-015 — PRODUCT.md is compatibility, not duplicate product truth

**Accepted.**

For established verticals whose canonical product authority lives elsewhere, any `PRODUCT.md` required by design tooling is generated/derived, names canonical sources, is marked `DO NOT EDIT AS AUTHORITY`, and must be idempotent/diffable. `DESIGN.md` remains separate visual-system authority.

No universal Atenea PRODUCT generator is required.

## C-016 — Real-project rollout is now the next boundary

**Accepted.**

Use `docs/REAL_PROJECT_ROLLOUT_V1.md`.

Next sequence:

1. choose one bounded real project/slice;
2. onboard only missing repo-local policy/config;
3. use Matt for greenfield or OpenSpec for brownfield;
4. decide material UI applicability during shaping;
5. explicitly promote to `EXECUTION_READY`;
6. run the already-qualified Pi → Herdr → OpenCode/Gentle path;
7. capture compact evidence;
8. qualify OpenSpec when the first suitable brownfield change completes end-to-end.
