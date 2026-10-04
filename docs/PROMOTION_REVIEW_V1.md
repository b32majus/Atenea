# Atenea — Integrated promotion audit v1

Status: **CURRENT / CONDITIONAL WHEN INVOKED — C-084**

## Purpose

A material feature/train/PR may receive one independent read-only integrated audit after deterministic closeout and before a human promotion/merge decision. In the current workflow this is normally Cora's audit.

This is not part of every ticket and is not a second implementation lifecycle.

## Trigger

Use it when a composed change crosses material semantic, integration, clinical, security, privacy, state or harness-authority seams; when several tickets interact in ways per-ticket review could miss; or when the human explicitly requests a promotion audit.

Do not invoke it by ritual after ordinary low-risk tickets.

## Evidence

Bind the audit to exact repository/base/head plus the accepted authority and relevant deterministic closeout results. Exact Git identity normally provides enough binding; do not manufacture paperwork hashes/manifests without a concrete need.

## Axes

Check proportionately:

1. semantics/authority — accepted behavior, omissions, unsupported scope;
2. engineering/maintainability — material design/failure-mode debt not already mechanically caught;
3. adversarial/safety — fail-open, stale state, ordering, partial mutation, privacy/auth boundaries;
4. composition — interactions introduced only by the integrated feature/train;
5. product fidelity when material UI/product surface changed — whether the composed rendered product still preserves accepted user mental model, simplicity/complexity boundaries and intended surface rather than exposing internal domain structure merely because individual slices were locally faithful;
6. representation narrowing when accepted semantics are translated — compare representable meaning before/after and flag unauthorized loss of precision/granularity (including temporal precision/timezone), cardinality, range, states/vocabulary, combinations, ordering or optional/unknown distinctions. Internal-only richness is not itself a requirement;
7. affected-surface / invariant propagation — trace material supported consumers of changed shared seams and sibling branches of newly discovered invariants. Zero file diff does not prove no behavior change; verify that `NO TOCA` surfaces are behaviorally preserved or explicitly authorized/evidenced, and look for sister-path variants of material findings before recommending publication.

Report blocking findings first, then material nonblocking findings. Candidate mutation invalidates an audit bound to the old HEAD when the audit is still required.

If the audit finds a blocker, first distinguish repair from shaping. If closing it requires a new material product/architecture/scope/privacy/data-semantics/acceptance decision, return to the attended Cora + human shaping loop; do not ask OpenCode to decide the answer. Otherwise Cora does not hand OpenCode an open-ended “fix the PR” request: convert each authorized repair into one bounded correction envelope with exact finding, required target state, allowed surface, explicit non-goals and deterministic closure evidence. Do not authorize opportunistic cleanup or adjacent findings unless the human explicitly opens a new unit.

After the autonomous correction budget (at most two fresh finding-scoped correction attempts) is exhausted, a human may authorize a new focal continuation. That is a new bounded unit, not a hidden third autonomous correction pass.

The audit is evidence for the human boundary. It never grants merge authority.
