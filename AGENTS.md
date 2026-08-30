# Atenea — Agent instructions

Atenea is an upstream-first autonomous engineering harness. Do not invent a new controller, execution schema, review lifecycle or policy engine when an adopted upstream tool already owns the behavior.

## Current authority

- Harness/runtime boundaries: `docs/ATENEA_HARNESS_CONTRACT_V1.md`
- Engineering quality: `CODING_STANDARDS.md`
- Current qualification state: `docs/QUALIFICATION.md`
- Current decisions: `docs/CURRENT_DECISIONS.md`
- Canonical post-Stage-8 handoff: `docs/ATENEA_HANDOFF_20260830.md`

## High-frequency invariants

- Before `EXECUTION_READY`: shaping is manual, interactive and repo-native.
- From `EXECUTION_READY`: Pi supervises; Herdr is process substrate; OpenCode + Gentle implements.
- Pi does not implement product code. Herdr is not a policy/gating controller.
- Gentle owns final exact-candidate/RDD/reviewer/repair authority.
- Normal non-force push is allowed. No automatic merge or destructive history recovery.
- Material ambiguity, contradictory authority or unsafe drift => STOP rather than improvise.

## Agent skills / repo setup

### Issue tracker

Issues live as GitHub issues in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles use the default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.