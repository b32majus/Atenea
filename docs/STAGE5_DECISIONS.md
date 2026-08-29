# Atenea — Stage 5 Decision Delta

This file continues the durable decision log after `docs/DECISIONS.md` D-030.
It exists so the Stage 5 closure can be committed atomically without rewriting
historical decision text. Future consolidation may fold these entries back into
`docs/DECISIONS.md` without changing their meaning or numbering.

## D-031 — Stage 5 direct/delegated Matt→Gentle composition is qualified

**Status:** Accepted for OpenCode 1.18.25 + Gentle AI v2.5.0-rc.1 + RDD OFF.

A complete four-ticket tracer train (#2→#5) crossed the Matt-authored durable
handoff into fresh Gentle sessions and reached exact remote checkpoints. T1
needed one bounded scope repair; T2/T3/T4 needed zero repairs.

This qualifies the direct/delegated handoff architecture. It does not qualify
native RDD, autonomous multi-ticket scheduling or final train integration.

## D-032 — The Handoff Contract Gate is a bounded semantic guardrail, not another harness

**Status:** Accepted.

The T1 defect showed that temporal slice ambiguity can make a reasonable
executor implement future behavior early. The retained pre-dispatch semantic
check therefore verifies coverage, dependencies, deterministic acceptance,
authority consistency and temporal slice exclusivity.

The gate must repair material ambiguity before dispatch, but must not recreate
planning, generate a second work-unit schema or add boilerplate to already-clear
tickets.

## D-033 — External reviewer loops are qualification scaffolding, not the target runtime

**Status:** Accepted target architecture; native review remains Stage 6.

T1/T2 used substantial external qualification audit scaffolding. T3/T4 removed
the Codex reviewer/repair loop from execution and checkpoint creation; Gentle
implemented, verified, reconciled, committed and pushed the work unit itself.

Exact-SHA audits remained laboratory observation before closure. Do not turn
those observations into a mandatory second reviewer harness. Stage 6 must
qualify Gentle-native RDD for the actual review/repair lifecycle.

## D-034 — Gentle may create the work-unit checkpoint; closure stays deterministic

**Status:** Accepted for the qualified direct/delegated path.

When deterministic checks pass and no same-branch drift exists, Gentle may
commit and push the exact candidate. Thin supervision then verifies exact
local/remote SHA, TREE, tests, diff cleanliness and tracker state before
closing the issue.

Narrative status never outranks deterministic git/test evidence.

## D-035 — Stage 5 supports a thin KairOS role but does not yet qualify autonomous progression

**Status:** Accepted boundary / deferred automation.

The evidence now supports KairOS remaining a thin scheduler/supervisor/delivery
layer rather than an engineering harness. However Stage 5 still used a human to
select/start each fresh session and to perform closure steps.

Do not claim autonomous multi-ticket progression until a later qualification
shows a thin dispatcher can discover the next unblocked ticket, start fresh
Gentle execution and advance the dependency frontier without recreating Matt or
Gentle internals.

## D-036 — GitHub auth override contamination is environment hygiene, not workflow architecture

**Status:** Accepted operational finding.

Stale `GH_TOKEN` and `GITHUB_TOKEN` environment variables inherited from the
Herdr parent process and tmux shadowed valid official `gh` stored credentials
and caused HTTP 401 failures during T2. Removing those overrides restored
normal official auth behavior.

The future supervisor should detect/sanitize this condition in preflight. Do
not add a custom authentication layer to Atenea/KairOS because of it.
