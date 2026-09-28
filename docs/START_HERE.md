# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current runtime baseline — read this first

```text
CURRENT_AUTHORITY = main after C-077 promotion
RUNTIME_STATE      = QUALIFIED FOR PREPARED TICKETS
Pi                 = 0.87.1
Herdr              = 0.9.1
Gentle AI          = 3.7.0
OpenCode           = 1.18.32 / qualified V1 review + fallback runtime
prepared supervisor = Pi + Herdr
prepared worker     = ONE plain Pi child (`pi --no-extensions`)
default profile     = production-volume → DeepSeek V4 Flash
complex profile     = complex → GLM 5.3 Flash high
review transport    = qualified OpenCode V1 native Gentle transport
review graph        = risk + readability + reliability + resilience + conditional refuter + validator
Gentle Shell / ODD  = NOT the prepared-ticket implementation entry
```

If a ticket/train is already shaped and executable, **do not route it through ODD or `gentle-orchestrator`**.

Canonical current documents:

- `docs/CURRENT_EXECUTION_DECISION_C077.md`;
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- `docs/PREPARED_TRAIN_HANDOFF_C077.md`;
- `config/native-gentle/prepared-routing-policy.json`.

## 1. Minimal preflight

Establish only facts that can change the next action:

1. correct repo/worktree/base and no unrelated dirty state;
2. current accepted ticket/work-order/spec;
3. executable outcome, acceptance and material constraints;
4. qualified runtime available;
5. publication boundary known.

Do not ask the human to restate durable authority.

## 2. Select the prepared profile

Default:

```text
production-volume → Pi worker on nan/deepseek-v4-flash
```

Use `complex` only on a material trigger:

```text
complex → Pi worker on nan/glm5.3-flash · high
```

Triggers: novel/cross-cutting architecture; difficult concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust-boundary semantics; delicate migration/back-compat/distributed invariants; or repeated semantic/correction failure under production-volume.

Non-triggers: file count, ticket length, ordinary UI, many tests, business importance by itself.

## 3. Execute prepared work

```text
accepted ticket/train
→ Pi supervisor + Herdr
→ ONE Pi child with selected model
→ read repo authority + applicable skills
→ implement smallest coherent authorized change
→ deterministic checks/oracles
→ local candidate commit
→ `gentle-ai review assess --agent opencode`
→ exact provider-issued native continuation when due
→ terminal burn/checkpoint
→ next authorized ticket or STOP
```

For trusted repositories that require protected project resources (for example Symphonia `.pi/skills`), the Pi child may add `--approve` as the one-run project-trust override.

## 4. Review routing

OpenCode V1 is the **review transport**, not the prepared implementation primary.

When native collection requires a live host, use a fresh bounded OpenCode V1 review-host/session as already qualified by the 2026-09-27 zero-touch evidence. Do not turn that transport into another product writer.

Production-volume reviewers:

- risk → GLM 5.3 Flash high;
- readability → Luna high;
- reliability → DeepSeek V4 Flash;
- resilience → DeepSeek V4 Flash;
- refuter → MiMo 2.6 Flash when required;
- validator → Luna high when required.

Complex reviewers:

- risk → Luna xhigh;
- readability → Luna high;
- reliability → Luna xhigh;
- resilience → DeepSeek V4 Flash;
- refuter → Sol xhigh when required;
- validator → Luna high when required.

Judgment Day is explicit-only: Judge A=MiMo, Judge B=Luna xhigh, fix=GLM high.

Gentle owns review timing, lenses, causality, refutation, bounded correction, validation and burn. Do not invent transitions.

## 5. Skills

Before product writes, read target repository authority in its own declared order. Normally this includes `AGENTS.md`, `CODING_STANDARDS.md`, accepted ticket/work-order/spec and applicable project-local skills.

Pi supports `.pi/skills/` and `.agents/skills/`; discovered skills need valid `name` + `description` frontmatter. Do not bulk-migrate valid project skills.

## 6. Fallback

A concrete Pi runtime/tooling failure may switch the same prepared ticket to qualified OpenCode Build V1. Preserve the worktree/checkpoint; do not reopen shaping or ODD.

## 7. Train operation

Train-wide repo/base/publication facts are established once. At ticket boundaries re-check only HEAD/checkpoint, clean candidate state, blockers/dependencies and whether the next ticket remains inside the authorized frontier.

Material product/scope/acceptance/oracle/publication changes are HUMAN STOP.

## 8. Historical material

OpenCode-first writer runbooks, Gentle-Pi/ODD qualification and older profile documents remain valid evidence for the seams they tested. They are not current merely because they remain in the repository.

`docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md` remains review/fallback provenance, not the normal prepared implementation entry.
