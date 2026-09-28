# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work. It is not a second implementation/review framework around Gentle.

## Current prepared-ticket runtime

Qualified 2026-09-28:

```text
Pi supervisor + Herdr
→ select prepared profile at a clean candidate/work-unit boundary
   - production-volume (default) → DeepSeek V4 Flash
   - complex → GLM 5.3 Flash high
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ native Gentle ASSESS / RDD through qualified OpenCode V1 review transport
→ risk / readability / reliability / resilience
→ conditional refuter / bounded correction / validator
→ acknowledge-approved / burn
→ durable checkpoint
→ next authorized ticket or STOP
```

OpenCode V1 is **review transport and qualified fallback implementation runtime**, not the normal prepared-ticket writer. Prepared tickets do not enter ODD or `gentle-orchestrator`.

## Start here

For a fresh agent or human, read in this order:

1. `AGENTS.md` — stable repository policy.
2. `docs/START_HERE.md` — current front door.
3. `docs/CURRENT_EXECUTION_DECISION_C077.md` — current prepared-ticket topology/routing decision.
4. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md` — minimal execution entry contract.
5. `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md` — current operator path.
6. `docs/PREPARED_TRAIN_HANDOFF_C077.md` — reusable train-adaptation handoff.
7. `CODING_STANDARDS.md` — horizontal engineering quality.
8. current product/task/ADR authority for the work being executed.
9. `docs/vnext/CURRENT_COMPATIBILITY.md` only when runtime/provider exceptions matter.

Historical OpenCode-first, Gentle-Pi and ODD documents remain evidence for what they tested; they do not define the current prepared-ticket entry.

## Prepared profiles

`production-volume` is the default:

```text
Pi worker → nan/deepseek-v4-flash
```

`complex` is trigger-driven:

```text
Pi worker → nan/glm5.3-flash · high
```

Use `complex` only for material reasoning/semantic risk: novel or cross-cutting architecture; difficult concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust-boundary semantics; delicate migration/back-compat/distributed invariants; or repeated semantic/correction failure under `production-volume`.

File count, ticket length, ordinary UI, many tests, or business importance alone are not triggers.

Canonical prepared routing:

- `config/native-gentle/prepared-routing-policy.json`;
- `config/native-gentle/prepared-production-volume.profile.json`;
- `config/native-gentle/prepared-complex.profile.json`.

## Native review routing

Gentle keeps distinct review roles under the qualified OpenCode V1 transport.

`production-volume` review routing:

- risk → GLM 5.3 Flash high;
- readability → GPT-6 Luna high;
- reliability → DeepSeek V4 Flash;
- resilience → DeepSeek V4 Flash;
- refuter → MiMo 2.6 Flash when required;
- validator → GPT-6 Luna high when required.

`complex` review routing:

- risk → GPT-6 Luna xhigh;
- readability → GPT-6 Luna high;
- reliability → GPT-6 Luna xhigh;
- resilience → DeepSeek V4 Flash;
- refuter → GPT-6 Sol xhigh when required;
- validator → GPT-6 Luna high when required.

Explicit-only Judgment Day keeps Judge A=MiMo, Judge B=Luna xhigh, fix=GLM high.

These reviewer mappings are the already-qualified OpenCode V1 routing evidence from 2026-09-27. C-077 changes the prepared implementation runtime to Pi; it does not discard the qualified reviewer graph.

## Skills

Pi supports trusted project skills from both `.pi/skills/` and `.agents/skills/`. Keep runtime-specific project resources where they belong; prefer `.agents/skills/<name>/SKILL.md` for cross-runtime project authority. Discovered skills need valid frontmatter with non-empty `name` and `description`.

Do not duplicate Atenea lifecycle/model-routing policy into product skills.

## Publication boundary

Native review approval is not publication authority. No automatic merge, force-push or destructive history recovery. Follow target-repository policy and explicit human authority.
