# Atenea — Repository Policy

Status: **CURRENT AUTHORITY**

Atenea is a thin upstream-first policy, configuration and conformance layer over native engineering tools. This file defines stable repository policy; it is not a product specification, task tracker or duplicate Gentle manual.

## 1. Current ownership

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ target repository AGENTS.md + CODING_STANDARDS.md

shaping, only while genuinely active
→ adopted shaping workflow

prepared implementation
→ Pi supervisor + Herdr
→ ONE plain Pi child (`pi --no-extensions`)
→ production-volume by default; complex only on material trigger

native candidate review when due
→ Gentle AI through qualified OpenCode V1 review transport
→ distinct review-risk/readability/reliability/resilience
→ conditional refuter / bounded correction / validator / burn

machine-decidable facts
→ tests / validators / oracles / CI

publish / merge
→ target repository policy + explicit human authority
```

OpenCode V1 is not the ordinary prepared-ticket writer. It remains the qualified review transport and fallback implementation runtime.

## 2. Authority precedence

When compatible sources overlap:

1. current accepted product/domain authority;
2. current authorized task/change artifacts;
3. target repository policy (`AGENTS.md`, `CODING_STANDARDS.md`, contribution/security rules);
4. current Atenea execution authority;
5. upstream tool defaults;
6. historical docs, stale config and remembered session state.

Material conflict between current authorities => **STOP and reconcile**.

## 3. Read before changing Atenea

Read:

1. `README.md`;
2. `docs/START_HERE.md`;
3. `docs/CURRENT_EXECUTION_DECISION_C077.md`;
4. `CODING_STANDARDS.md`;
5. relevant decision provenance only when needed;
6. the specific accepted issue/work-order/spec being executed.

Current operation: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
Prepared routing: `config/native-gentle/prepared-routing-policy.json`.
Runtime exceptions: `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 4. Prepared-ticket entry

If executable authority already exists, do **not** rerun ODD, `gentle-orchestrator`, broad archaeology or shaping by ritual.

Before product writes the Pi ticket worker reads the target repository's current authority, normally including:

- `AGENTS.md`;
- `CODING_STANDARDS.md` when present/required;
- accepted ticket/work-order/spec and cited live authority;
- applicable project-local skills.

The worker implements the smallest coherent authorized change, preserves the principal acceptance oracle, runs deterministic checks and creates the authorized local candidate commit.

## 5. Prepared profiles

Default:

```text
production-volume → Pi + nan/deepseek-v4-flash
```

Triggered:

```text
complex → Pi + nan/glm5.3-flash · high
```

Use `complex` only for material reasoning/semantic risk: novel/cross-cutting architecture; complex concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust boundaries; delicate migration/back-compat/distributed invariants; or repeated semantic/correction failure under `production-volume`.

Do not escalate from file count, ticket length, ordinary UI, many tests or business importance alone. Do not switch profile in the middle of an active candidate/review lineage.

## 6. Native review

After the candidate commit, enter Gentle with the actual candidate base:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent opencode \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

The `opencode` identity is the qualified **OpenCode V1 review transport**. When provider-issued collection requires a live host, use the existing fresh bounded OpenCode V1 review-host path; that host is transport, not a second Atenea implementation worker.

Follow `next_transition.command` literally. Gentle owns review timing, lens selection, candidate causality, refutation, correction authority, targeted validation and acknowledgement/burn.

Current qualified review mappings remain in:

- `config/native-gentle/opencode-production-volume.profile.json`;
- `config/native-gentle/opencode-complex.profile.json`.

Judgment Day is explicit-only for a concrete target; it is not an automatic post-RDD phase.

Plain Pi is not a Gentle-Pi review host. Never manually assert `GENTLE_PI_REVIEW_RELAY_CONTRACT` from `pi --no-extensions`.

## 7. Skills and trust

Pi supports trusted project skills from both `.pi/skills/` and `.agents/skills/`.

- keep intentional Pi-project resources under `.pi/skills`;
- prefer `.agents/skills/<name>/SKILL.md` for cross-runtime project authority;
- do not duplicate skills solely to normalize layout;
- discovered skills require non-empty `name` and `description` frontmatter;
- use `--approve` only as a one-run project-trust override for an intentionally trusted repository that needs protected project resources.

Project skills own domain/engineering/UI/QA guidance. Atenea owns execution routing.

## 8. Supervisor boundary

The thin Pi supervisor owns only:

- authorized train frontier;
- profile selection at clean boundaries;
- launch/observation of one Pi implementation worker;
- already-authorized procedural relay/consent;
- durable Git/checkpoint reconciliation;
- next compatible ticket or terminal STOP.

Material product/scope/acceptance/oracle/publication changes are HUMAN STOP.

## 9. Fallback

If plain Pi has a concrete runtime/tooling failure, preserve the worktree/checkpoint and use qualified OpenCode Build V1 under the same prepared-ticket contract. Do not re-enter ODD.

## 10. Publication

Review approval is not push/PR/merge/deploy authority. No automatic merge, force-push or destructive history recovery.
