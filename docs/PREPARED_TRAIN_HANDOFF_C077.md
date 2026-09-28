# Atenea C-077 — Prepared-train handoff

Use this handoff when a project train is already shaped/executable and must be adapted from an older Gentle-Shell/ODD/OpenCode-orchestrator protocol without reopening valid product work.

```text
Atenea execution authority changed on 2026-09-28. Preserve all valid project scope, acceptance, dependency/frontier, worktree, commits and deterministic evidence. Do not repeat shaping or discard completed work.

Current prepared-ticket protocol:
- Pi supervisor + Herdr owns only train frontier, one-worker launch/observation, procedural relay already covered by authority, durable checkpoint reconciliation and next-or-STOP.
- For each executable ticket/work unit, launch exactly one plain Pi child with `--no-extensions` in the target worktree.
- Before product writes, the child reads repository AGENTS.md, CODING_STANDARDS.md when present, the current accepted ticket/spec/work-order authority, and applicable project-local skills.
- The ticket is already shaped: do not run ODD or `gentle-orchestrator`, do not regenerate task/spec artifacts, and do not reopen accepted product meaning unless current authority is genuinely incomplete or contradictory.
- Implement the smallest coherent authorized change; preserve the principal acceptance oracle and run repository-required deterministic checks.
- Create the authorized local candidate commit.
- Enter native Gentle review from the real candidate boundary with `gentle-ai review assess --agent codex ...`; if review is due, execute only exact provider-issued continuations through terminal. Do not manually set `GENTLE_PI_REVIEW_RELAY_CONTRACT`.
- Standard candidate review consent may be relayed by the supervisor only if the train/ticket authority already pre-authorizes it.
- Material scope/product/acceptance/oracle/publication changes are HUMAN STOP.
- Review approval never grants push/PR/merge/deploy authority.
- If plain Pi has a concrete runtime/tooling failure, preserve the checkpoint and use qualified OpenCode Build as fallback under the same prepared-ticket contract; do not re-enter ODD.

At ticket boundaries, re-check only HEAD/checkpoint, clean candidate state, blockers/dependencies and whether the next ticket remains inside the authorized frontier.
```

Project-local authority always wins for domain/product/quality constraints. This handoff changes execution transport/lifecycle entry only.
