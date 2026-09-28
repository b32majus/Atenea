# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work. It is not a second implementation/review framework around Gentle.

Atenea keeps the durable layer that remains useful above upstream tools:

- repository and engineering policy;
- phase-scoped shaping guidance;
- prepared-ticket execution contract;
- deterministic conformance/evidence;
- publication/Git guardrails;
- architectural and qualification provenance.

## Current prepared-ticket runtime

Qualified 2026-09-28:

```text
Pi supervisor + Herdr
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ native Gentle ASSESS via Codex transport
→ exact native review/correction/validation/burn when due
→ durable checkpoint
→ next authorized ticket or STOP
```

OpenCode `1.18.32` Build remains the qualified fallback implementation worker after a concrete Pi runtime/tooling failure. It does not restore ODD or `gentle-orchestrator` for already-shaped work.

Plain Pi is not a Gentle Shell review host. Do not manually set `GENTLE_PI_REVIEW_RELAY_CONTRACT`; native review uses Codex transport.

## Start here

For a fresh agent or human:

1. `AGENTS.md` — stable repository policy.
2. `docs/START_HERE.md` — current front door.
3. `docs/CURRENT_EXECUTION_DECISION_C077.md` — current prepared-ticket topology decision.
4. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md` — minimal ordinary preflight and prompt contract.
5. `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md` — current operator path.
6. `CODING_STANDARDS.md` — horizontal engineering quality.
7. current product/task/ADR authority for the work being executed.
8. `docs/vnext/CURRENT_COMPATIBILITY.md` only when runtime/provider exceptions matter.

Historical OpenCode/Gentle-orchestrator and Gentle-Pi documents remain evidence for what they tested. They are not current merely because they remain in the repository.

## Execution rule

If durable executable authority already exists, do not rerun shaping by ritual and do not route the ticket through ODD merely to rediscover accepted meaning.

```text
accepted bounded ticket/train
→ minimal preflight
→ one prepared-ticket worker
→ deterministic implementation evidence
→ native Gentle review when due
→ checkpoint
→ publication remains human/repository-owned
```

If product meaning or acceptance is genuinely unresolved, shape only enough to create durable executable authority before entering this path.

## Skills

Project-local skills intended as cross-runtime project authority should live under `.agents/skills/<name>/SKILL.md` with valid YAML frontmatter containing a non-empty `name` and `description`.

Do not duplicate Atenea lifecycle/model-routing policy into project skills. Runtime-owned/global skills stay with their owner.

## Engineering and review quality

Deterministic evidence should be able to disagree with the implementation. Use tests, typecheck/build, domain/security/privacy checks, independent oracles and measurable performance checks where the ticket has a real performance requirement.

Native Gentle owns review transaction state, lenses, candidate causality, refutation when applicable, bounded correction, targeted validation and acknowledgement/burn.

Judgment Day is explicit standalone dual/adversarial review for a concrete target, not an automatic post-RDD ritual.

## Compatibility and fallback

Current exact versions/seams live in `docs/vnext/CURRENT_COMPATIBILITY.md`.

Current baseline includes Pi `0.87.1`, Herdr `0.9.1`, Gentle AI `3.7.0`, and OpenCode `1.18.32` as fallback worker.

Older profile/routing/canary documents remain provenance; do not infer current routing from their filenames.

## Publication boundary

Native review approval is not publication authority.

No automatic merge, force-push or destructive history recovery. Follow the target repository policy and explicit human publication authority.
