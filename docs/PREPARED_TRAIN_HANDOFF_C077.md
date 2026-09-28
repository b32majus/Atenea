# Atenea C-077 — Prepared-train handoff

Use this handoff when a project train is already shaped/executable and must be adapted from an older Gentle-Shell/ODD/orchestrator protocol without reopening valid product work.

```text
Atenea execution authority changed on 2026-09-28. Preserve all valid project scope, acceptance, dependency/frontier, worktree, commits and deterministic evidence. Do not repeat shaping or discard completed work.

Current prepared-ticket protocol:
- Pi supervisor + Herdr owns only train frontier, one-worker launch/observation, procedural relay already covered by authority, durable checkpoint reconciliation and next-or-STOP.
- Select the prepared profile once per clean candidate/work-unit boundary:
  - production-volume (default) → ONE plain Pi worker on nan/deepseek-v4-flash;
  - complex → ONE plain Pi worker on nan/glm5.3-flash with high thinking.
- Use complex only for material reasoning/semantic risk: novel or cross-cutting architecture; complex concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust-boundary risk; delicate migration/back-compat/distributed invariants; or repeated semantic/correction failure under production-volume. File count, ticket length, ordinary UI, many tests or business importance alone are not triggers.
- Launch exactly one plain Pi child with `--no-extensions` in the target worktree and explicitly select the profile model at launch. Add `--approve` only for an intentionally trusted repository whose required project resources (for example `.pi/skills`) need project trust.
- Before product writes, the child reads repository AGENTS.md, CODING_STANDARDS.md when present, the current accepted ticket/spec/work-order authority, and applicable project-local skills.
- The ticket is already shaped: do not run ODD or `gentle-orchestrator`, do not regenerate task/spec artifacts, and do not reopen accepted product meaning unless current authority is genuinely incomplete or contradictory.
- Implement the smallest coherent authorized change; preserve the principal acceptance oracle and run repository-required deterministic checks.
- Create the authorized local candidate commit.
- Enter native Gentle review from the real candidate boundary through the qualified OpenCode V1 review transport (`--agent opencode`); if review is due, execute only exact provider-issued continuations through terminal.
- Gentle still owns separate `review-risk`, `review-readability`, `review-reliability`, `review-resilience`, conditional `review-refuter`, conditional `review-validator`, and explicit-only Judgment Day roles.
- production-volume review map: risk=GLM 5.3 Flash high; readability=Luna high; reliability=Luna high; resilience=DeepSeek V4 Flash; refuter=MiMo 2.6 Flash; validator=Luna high; JD judge A=MiMo, judge B=Luna xhigh, fix=GLM high.
- complex review map: risk=Luna xhigh; readability=Luna high; reliability=Luna xhigh; resilience=DeepSeek V4 Flash; refuter=Sol xhigh; validator=Luna high; JD judge A=MiMo, judge B=Luna xhigh, fix=GLM high.
- Standard candidate review consent may be relayed by the supervisor only if the train/ticket authority already pre-authorizes it.
- Material scope/product/acceptance/oracle/publication changes are HUMAN STOP.
- Review approval never grants push/PR/merge/deploy authority.
- If plain Pi has a concrete runtime/tooling failure, preserve the checkpoint and use qualified OpenCode Build V1 as fallback under the same prepared-ticket contract; do not re-enter ODD.

At ticket boundaries, re-check only HEAD/checkpoint, clean candidate state, blockers/dependencies and whether the next ticket remains inside the authorized frontier.
```

Project-local authority always wins for domain/product/quality constraints. This handoff changes execution transport/lifecycle entry and prepared profile routing only.
