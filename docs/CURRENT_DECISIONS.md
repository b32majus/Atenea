# Atenea — Current decisions after Stage 8

Date: 2026-08-30

This file is the short current decision index. Historical `docs/DECISIONS.md` and stage decision files remain evidence of how Atenea evolved, but any forward-looking status in those older files is superseded where it conflicts with this index, `README.md`, `docs/QUALIFICATION.md` or `docs/ATENEA_HANDOFF_20260830.md`.

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

The first qualification should be a bounded real brownfield change outside Atenea's own documentation repair.

## C-009 — Material UI/UX uses upstream Impeccable conditionally

**Accepted direction; #267 consolidation pending.**

Do not make Impeccable a mandatory phase for backend/non-UI work. `DESIGN.md` may own durable visual-system rules. If tooling needs `PRODUCT.md` while product truth lives elsewhere, use a deterministic derived projection rather than duplicate authority.

## C-010 — Engineering quality is upstream methods + concise repo policy

**Accepted direction; #268 consolidation pending.**

Use upstream `tdd`, `codebase-design`, `domain-modeling`, `diagnosing-bugs`, `code-review` and justified deterministic tooling. `CODING_STANDARDS.md` should contain only the horizontal repo-specific delta that upstream does not already own.

Do not build a custom Clean Code framework, quality agent or new quality lifecycle.

## C-011 — No second mandatory LLM review lifecycle

**Accepted.**

Gentle native RDD owns final exact-candidate review authority. Matt `code-review` remains available as an upstream engineering method and may be used where the workflow/risk warrants it, but Atenea does not mandate a second reviewer chain after every candidate by ritual.

## C-012 — Repository delivery policy remains repository-specific

**Accepted.**

A work unit may end at an accepted remote checkpoint or PR according to repository policy. Human merge boundaries remain valid. Atenea does not auto-merge.

## C-013 — Next work is policy consolidation and real-project rollout

**Accepted.**

Do not start another large synthetic qualification ladder.

Next sequence:

1. finish documentation reconciliation;
2. cross-walk #267 and #268 against complete current upstream ecosystems;
3. write compact Atenea Harness Contract v1;
4. complete `CODING_STANDARDS.md` with only the surviving #268 delta;
5. finalize Impeccable / `DESIGN.md` / derived `PRODUCT.md` policy;
6. design real-project rollout;
7. qualify OpenSpec on the first suitable real brownfield change.
