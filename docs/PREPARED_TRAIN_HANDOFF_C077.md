# Atenea C-077 — Prepared-train handoff

Use this handoff when a project train is already shaped/executable and must be adapted from an older Gentle-Shell/ODD/OpenCode-orchestrator protocol without reopening valid product work.

```text
Atenea execution authority changed on 2026-09-28. Preserve all valid project scope, acceptance, dependency/frontier, worktree, commits and deterministic evidence. Do not repeat shaping or discard completed work.

Current prepared-ticket protocol:
- Pi supervisor + Herdr owns only train frontier, one-worker launch/observation, procedural relay already covered by authority, durable checkpoint reconciliation and next-or-STOP.
- Select the prepared implementation profile once per clean candidate/work-unit boundary:
  - production-volume (default) → Pi worker on nan/deepseek-v4-flash;
  - complex → Pi worker on nan/glm5.3-flash · high.
- Use complex only for material reasoning/semantic risk: novel or cross-cutting architecture; complex concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust-boundary risk; delicate migration/back-compat/distributed invariants; or repeated semantic/correction failure under production-volume. File count, ticket length, ordinary UI, many tests or business importance alone are not triggers.
- For each executable ticket/work unit, launch exactly one plain Pi child with `--no-extensions` in the target worktree. Add the one-run `--approve` trust override only for an intentionally trusted repository whose required project resources (for example `.pi/skills`) need project trust.
- Before product writes, the child reads repository AGENTS.md, CODING_STANDARDS.md when present, the current accepted ticket/spec/work-order authority, and applicable project-local skills.
- The ticket is already shaped: do not run ODD or `gentle-orchestrator`, do not regenerate task/spec artifacts, and do not reopen accepted product meaning unless current authority is genuinely incomplete or contradictory.
- Implement the smallest coherent authorized change; preserve the principal acceptance oracle and run repository-required deterministic checks.
- Create the authorized local candidate commit.
- Enter native Gentle review from the real candidate boundary with `gentle-ai review assess --agent codex ...`; if review is due, execute only exact provider-issued continuations through terminal. Do not manually set `GENTLE_PI_REVIEW_RELAY_CONTRACT`.
- Codex is review transport, not one reviewer: Gentle still owns the four RDD reviewer roles (`review-risk`, `review-readability`, `review-reliability`, `review-resilience`), conditional `review-refuter`, conditional `review-validator`, and explicit-only Judgment Day roles when requested.
- Both implementation profiles use the same shared Codex RDD quality routing so parallel trains cannot race on global reviewer assignment state. Current desired routing lives in `config/native-gentle/prepared-codex-rdd-quality.profile.json`.
- Standard candidate review consent may be relayed by the supervisor only if the train/ticket authority already pre-authorizes it.
- Material scope/product/acceptance/oracle/publication changes are HUMAN STOP.
- Review approval never grants push/PR/merge/deploy authority.
- If plain Pi has a concrete runtime/tooling failure, preserve the checkpoint and use qualified OpenCode Build as fallback under the same prepared-ticket contract; do not re-enter ODD.

At ticket boundaries, re-check only HEAD/checkpoint, clean candidate state, blockers/dependencies and whether the next ticket remains inside the authorized frontier.
```

Project-local authority always wins for domain/product/quality constraints. This handoff changes execution transport/lifecycle entry and prepared implementation routing only.
