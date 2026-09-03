# Atenea — Agent instructions

Atenea is an upstream-first autonomous engineering harness. Do not invent a new controller, execution schema, review lifecycle or policy engine when an adopted upstream tool already owns the behavior.

## Front door

If you are a fresh agent/Cora trying to understand how Atenea currently works, read:

1. `README.md`
2. `docs/START_HERE.md`
3. `docs/ATENEA_HARNESS_CONTRACT_V1.md`
4. `docs/CURRENT_DECISIONS.md`
5. `docs/OPERATOR_RUNBOOK_V1.md` only when work is already `EXECUTION_READY`
6. `docs/INSTALLATION_AND_OPERATION_V1.md` for environment setup/verification

Do not recover current execution policy from historical Stage files or `docs/ATENEA_HANDOFF_20260830.md`. They are evidence, not current forward-looking authority.

## Current authority

- Normative harness/runtime boundaries: `docs/ATENEA_HARNESS_CONTRACT_V1.md`
- Project-entry / start-or-continue procedure: `docs/START_HERE.md`
- Current decisions: `docs/CURRENT_DECISIONS.md`
- Operator execution path: `docs/OPERATOR_RUNBOOK_V1.md`
- Current installation/environment verification: `docs/INSTALLATION_AND_OPERATION_V1.md`
- Engineering quality: `CODING_STANDARDS.md`
- Current qualification state: `docs/QUALIFICATION.md`

## High-frequency invariants

- Before `EXECUTION_READY`: shaping is human-present, interactive and repo-native.
- Human + Cora/planning surface decides whether the target is greenfield/brownfield and what shaping is actually needed.
- Greenfield defaults to complete Matt Pocock upstream shaping.
- Brownfield preserves repo-native authority; OpenSpec is delta-first when it materially adds value, not by ritual.
- Repository Intelligence is optional derived evidence for sufficiently complex brownfields. Cora may recommend it; Pi must not invent/install it as an execution-time methodology decision.
- From `EXECUTION_READY`: Pi supervises; Herdr is process substrate; headless OpenCode + Gentle implements/reviews.
- Pi does not implement product code or operate Gentle lifecycle commands.
- Gentle owns final exact-candidate/RDD/reviewer/repair authority.
- Normal non-force push is allowed. No automatic merge or destructive history recovery.
- Material ambiguity, contradictory authority or unsafe drift => STOP rather than improvise.
- Prefer complete upstream tools and public interfaces. Do not copy fragments of third-party skills/tool internals into Atenea.

## Repository Intelligence boundary

CodeGraph/Graphify are current **candidate** upstream providers, not mandatory Atenea dependencies.

- Existing healthy indexes may be used as derived context.
- Do not auto-install/build an index merely because a repository is brownfield.
- A graph/index never outranks source, accepted specs, deterministic tests, Gentle RDD or Git/GitHub authority.
- Do not copy graph/index/watch/controller internals into Atenea.

## Agent skills / repo setup

### Issue tracker

Issues live as GitHub issues in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles use the default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.
