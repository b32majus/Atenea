# Atenea Harness Contract vNext

Status: **CURRENT NORMATIVE BOUNDARY — C-084**

Atenea is not a second engineering framework around OpenCode or Matt.

## 1. Product authority

Humans and durable repository artifacts own WHAT/WHY, acceptance, domain/safety constraints, non-goals and publication/merge authorization. A runtime may decompose accepted work; it may not expand product authority.

## 2. Atenea-owned value

Atenea owns only durable value above upstream:

- stable repository/engineering policy;
- secret-free project-local role/model bindings;
- profile-selection rules and bounded escalation;
- deterministic conformance/publication evidence;
- worktree/Git safety policy;
- qualification and architectural provenance.

Target Atenea-owned LLM lifecycle controllers: **0**.
Target Atenea-owned routing engines: **0**.

## 3. Upstream method ownership

OpenCode owns agent/subagent execution. Adopted Matt skills own their TDD, task-graph/frontier, worktree choreography and two-axis code-review methodology.

Atenea does not copy those procedures into prompts/policy. It binds Matt roles to named project-local OpenCode agents and supplies repository constraints.

## 4. Model-binding boundary

Current role bindings live in `.opencode/agents/` and `docs/ATENEA_EXECUTION_ROUTING_V0.md`. Project-local desired state must be inspectable from Git.

Do not mutate shared `~/.config/opencode/opencode.json` as per-ticket/train routing state. C-084 uses a clean native V2 global capability config and project-local role bindings; `subagent` permissions allow only named Atenea subagents. No automatic quota failover/model carousel inside an active bounded unit.

## 5. Herdr

Herdr may own persistent process/session surfaces, observation and operator convenience. It may not own product meaning, correctness, model-selection policy, review verdicts or publication authority.

## 6. Deterministic evidence

Machine-decidable facts should be proven mechanically. Product repositories use their own relevant tests, typechecks, builds, schema/parsing validators, linters, security/static checks and CI.

For Atenea authority/config conformance:

```bash
node tools/check-vnext-authority.mjs
```

Oracles produce evidence; they do not grant publication authority.

## 7. Review and correction

Matt's independent Standards and Spec axes are the normal semantic review surface. Conditional static/security/deep OCR assurance is risk-proportional.

Review start closes the originating implementer's write phase. Actionable review findings are handled by fresh bound correctors, never by the original implementer. At most two finding-scoped correction attempts are allowed: a second fresh corrector may run only when focused evidence shows the same authorized finding(s) remain after the first. A blocker after attempt #2, a new material issue or scope expansion becomes HUMAN STOP rather than a fix/review carousel.

## 8. Shaping and entry

Shaping is phase-scoped. Accepted executable authority is not reshaped by ritual.

When entering a brownfield repository, find current authority first, inspect prior harness/tooling read-only and reconcile genuine contradictions before mutation.

## 9. Worktrees

Matt owns ephemeral implementer worktrees while its workflow is active. Delivery/integration worktrees remain through PR review and accepted merge. Post-merge cleanup occurs only after durable reconciliation, clean state, no active process and no unique local work.

## 10. Publication

Review/audit evidence is not merge authority. Publication follows target-repository policy, changed-artifact validation and explicit human authority. No automatic merge, force-push or destructive history repair.

## 11. Historical artifacts

Gentle/Pi relay, ASSESS/RDD/4R, reviewer lineages/burn, review hosts and OpenCode V1 transport are historical provenance. They may remain in Git without remaining active runtime.
