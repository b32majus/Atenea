# Atenea — Agent instructions

Atenea is an upstream-first autonomous engineering harness. Do not invent a new controller, execution schema, review lifecycle or policy engine when an adopted upstream tool already owns the behavior.

## Front door

If you are a fresh agent/Cora trying to understand how Atenea currently works, read:

1. `README.md`
2. `docs/NEWCOMER_QUICKSTART_V1.md`
3. `docs/START_HERE.md`
4. `docs/ATENEA_HARNESS_CONTRACT_V1.md`
5. `docs/CURRENT_DECISIONS.md`
6. `docs/INSTALLATION_AND_OPERATION_V1.md` for scopes/setup/verification
7. `docs/OPERATOR_RUNBOOK_V1.md` only when work is already `EXECUTION_READY`

Do not recover current execution policy from historical Stage files or `docs/ATENEA_HANDOFF_20260830.md`. They are evidence, not current forward-looking authority.

## Current authority

- Fast newcomer map (non-normative): `docs/NEWCOMER_QUICKSTART_V1.md`
- Normative harness/runtime boundaries: `docs/ATENEA_HARNESS_CONTRACT_V1.md`
- Project-entry / start-or-continue procedure: `docs/START_HERE.md`
- Current decisions: `docs/CURRENT_DECISIONS.md`
- Operator execution path: `docs/OPERATOR_RUNBOOK_V1.md`
- Current installation/environment verification: `docs/INSTALLATION_AND_OPERATION_V1.md`
- Native reviewer continuation for pinned Pi/Gentle-Pi workers: `docs/GENTLE_REVIEWER_CONTINUATION_V1.md`
- Conditional independent human-boundary promotion audit: `docs/PROMOTION_REVIEW_V1.md`
- Engineering quality: `CODING_STANDARDS.md`
- Current qualification state: `docs/QUALIFICATION.md`

## High-frequency invariants

- Before `EXECUTION_READY`: shaping is human-present, interactive and repo-native.
- Human + Cora/planning surface decides whether the target is greenfield/brownfield and what shaping is actually needed.
- Greenfield defaults to complete Matt Pocock upstream shaping.
- Brownfield preserves repo-native authority; OpenSpec is delta-first when it materially adds value, not by ritual.
- Repository Intelligence is optional derived evidence for sufficiently complex brownfields. Cora may recommend it; Pi must not invent/install it as an execution-time methodology decision.
- From `EXECUTION_READY`: explicit human authority remains the boundary; a plain non-implementing Pi supervisor uses Herdr to launch a separate named/scoped Pi + Gentle Pi worker, which owns implementation, deterministic checks, native exact-candidate RDD, acknowledgement/burn and authorized normal non-force delivery. Final merge remains human unless separately authorized. OpenCode remains available as an alternate/historical path, not the normal unattended dependency.
- Pi does not implement product code or operate Gentle lifecycle commands.
- Gentle owns final exact-candidate/RDD/reviewer/repair authority.
- Pinned Pi/Gentle-Pi workers load the T5-proven reviewer continuation contract from the same Atenea checkpoint as the RDD relay; opaque reviewer bindings are never reconstructed, and an acknowledged reviewer capture in flight is not a STOP condition.
- Normal non-force push is allowed. No automatic merge or destructive history recovery.
- For a high-risk human promotion/merge boundary, planning may require `docs/PROMOTION_REVIEW_V1.md`: fresh read-only Pi, exact full diff + explicit high-risk subset, zero blocking findings. It is conditional and never a second Gentle RDD lifecycle.
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
