# Atenea — Prepared-ticket Pi runtime v1

Status: **CURRENT PRODUCTIVE PATH FOR PREPARED WORK**
Date: 2026-09-28

This runbook starts only after product/task authority is already executable. It is not a shaping workflow.

## 1. Runtime topology

```text
accepted prepared ticket/train
→ Pi supervisor + Herdr
→ select prepared profile at clean candidate/work-unit boundary
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation
→ deterministic checks/oracles
→ candidate commit
→ `gentle-ai review assess --agent opencode ...`
→ exact native Gentle continuation when due through qualified OpenCode V1 review transport
→ terminal review state / durable checkpoint
→ next authorized ticket or STOP
```

OpenCode Build V1 remains the qualified fallback implementation worker. It is not the normal implementation path while plain Pi remains healthy.

### Ownership

- **Supervisor:** Pi session with Herdr available. It observes one ticket worker, selects the prepared profile from durable task risk/complexity, relays only procedural authority already granted, and escalates material scope/product decisions.
- **Ticket worker:** one plain Pi child launched through Herdr with `--no-extensions`. It owns implementation, deterministic verification, candidate commit and invocation of native Gentle review.
- **Review transport:** qualified OpenCode V1. `--agent=opencode` identifies native Gentle review transport; it does not claim OpenCode authored the implementation.
- **Gentle AI:** owns candidate assessment, review transaction state, the four RDD lenses, candidate-causality classification, refutation when applicable, bounded correction authority, targeted validation and acknowledgement/burn.

Do not introduce a second Atenea writer/review controller merely because Gentle internally invokes reviewer roles.

## 2. Preflight

Before the first writer turn, establish only facts that can change the next action:

1. correct repository/worktree/base and no unrelated dirty state mixed into the candidate;
2. accepted ticket/work order/spec is current and executable;
3. outcome, acceptance and material constraints/non-goals are clear;
4. current Pi/Herdr/Gentle + OpenCode V1 review runtime is available;
5. publication boundary is known.

If durable authority already proves a fact, do not ask the human to repeat it.

## 3. Prepared profiles

The default is `production-volume`.

### production-volume

```text
Pi implementation worker → nan/deepseek-v4-flash
```

Use for normal bounded implementation when complexity is mostly execution volume/mechanical engineering rather than novel or materially risky reasoning.

Review routing:

```text
review-risk        → GLM 5.3 Flash high
review-readability → Luna high
review-reliability → Luna high
review-resilience  → DeepSeek V4 Flash
review-refuter     → MiMo 2.6 Flash, conditional
review-validator   → Luna high, conditional
JD judge A         → MiMo 2.6 Flash
JD judge B         → Luna xhigh
JD fix             → GLM 5.3 Flash high
```

### complex

```text
Pi implementation worker → nan/glm5.3-flash · high
```

Trigger only for concrete material evidence already present in current authority:

- novel or cross-cutting architecture spanning coupled modules;
- complex concurrency, temporal, scheduling, state-machine, solver or optimization semantics;
- material security, privacy, authorization, tenancy, clinical-meaning or trust-boundary risk;
- delicate migration/backwards compatibility/distributed invariants;
- repeated semantic or bounded-correction failure under `production-volume`.

Do not trigger `complex` from file count, ticket length, ordinary UI work, many tests, or business importance alone.

Review routing:

```text
review-risk        → Luna xhigh
review-readability → Luna high
review-reliability → Luna xhigh
review-resilience  → DeepSeek V4 Flash
review-refuter     → Sol xhigh, conditional
review-validator   → Luna high, conditional
JD judge A         → MiMo 2.6 Flash
JD judge B         → Luna xhigh
JD fix             → GLM 5.3 Flash high
```

If complexity is discovered after writing starts, preserve the current candidate/evidence and change route only at the next clean work-unit/candidate boundary. Never silently switch an active review lineage.

Canonical desired state:

- `config/native-gentle/prepared-routing-policy.json`;
- `config/native-gentle/prepared-production-volume.profile.json`;
- `config/native-gentle/prepared-complex.profile.json`.

## 4. Worker launch

The productive child is **plain Pi**, not Gentle Shell:

```text
kind: pi
cwd: target worktree
agent args: --no-extensions --model <profile model> [--thinking high for complex]
```

Pi protects project-local `.pi` resources and project `.agents/skills` behind project trust. When an unattended worker must consume trusted repository-owned project skills/settings and no durable trust decision already applies, add Pi's one-run trust override:

```text
--approve
```

Use `--approve` only for a repository whose project-local resources are intentionally trusted; it is not a sandbox and must not be used to make an untrusted checkout executable.

The exact Herdr invocation may vary with pane/session layout; preserve the semantic requirement: exactly one Pi child for the ticket, launched in the target worktree with the selected implementation model.

The worker must read before product writes:

- repository `AGENTS.md`;
- repository `CODING_STANDARDS.md` when present/required by project authority;
- the accepted ticket/work-order/spec and its cited current authority;
- every applicable project-local skill.

Pi natively supports both project skill roots after project trust:

```text
.pi/skills/
.agents/skills/
```

Keep existing valid `.pi/skills` when they are intentionally Pi-project resources. Prefer `.agents/skills/<skill>/SKILL.md` when the skill is intended as cross-runtime project authority. Do not duplicate or migrate a skill merely to normalize directory layout.

Every discovered `SKILL.md` should have valid YAML frontmatter including a non-empty `name` and `description`.

Do not duplicate Atenea lifecycle/model-routing policy inside project skills. Skills own domain/engineering/UI/QA guidance; Atenea owns execution transport.

## 5. Prepared-ticket worker contract

A normal prepared-ticket prompt is short:

```text
Execute <ticket/work unit> only.
Authority: <issue/spec/work-order>.
Profile: <production-volume|complex>.
This work is already shaped; do not reopen product meaning, run ODD or use gentle-orchestrator.
Before writing, read and obey AGENTS.md, CODING_STANDARDS.md when present, and applicable project skills.
Preserve the principal acceptance oracle; do not weaken tests/checkers to make the implementation pass.
Implement the smallest coherent change, run the repository's required deterministic checks, and create the authorized local candidate commit.
Do not broaden scope or publish beyond current authority.
After the candidate commit, enter native Gentle review through qualified OpenCode V1 transport and follow exact provider-issued continuations to terminal when review is due.
```

Omit lines already unambiguous from durable authority. Do not paste a second Gentle state machine into the prompt.

## 6. Review entry

For a committed candidate, use the actual last reviewed/base boundary:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent opencode \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

When intended untracked files belong to the candidate, use the provider-supported untracked-scope/inventory arguments instead of hiding them.

Rules:

- if `review_due=false`, retain the assessment as the review-timing result and checkpoint;
- if `review_due=true`, execute `next_transition.command` exactly as returned;
- after START, retain exact lineage/revision/target and route only through provider-issued transitions;
- standard candidate review consent may be relayed by the supervisor only when ticket/train authority explicitly pre-authorized it;
- bounded correction is permitted only when Gentle grants that authority and only inside its stated boundary;
- with committed-only review, an authorized correction may need its own local commit before the corrected candidate can be validated;
- after `acknowledge-approved` returns burned authority, review is terminal; do not re-review the unchanged candidate merely to prove closure.

### Pi relay boundary

Plain Pi is **not** a Gentle Pi review host. Never make it pretend to be one by manually exporting `GENTLE_PI_REVIEW_RELAY_CONTRACT`. Prepared-ticket Atenea uses the already-qualified OpenCode V1 native review transport instead.

## 7. RDD and Judgment Day

Native RDD remains the normal negotiated review mechanism when Gentle says review is due. It may use risk/readability/reliability/resilience lenses, refutation for inferential findings, bounded correction and targeted validation as the provider contract requires.

Judgment Day is separate. Run it only when the user/ticket explicitly requests the standalone dual/adversarial review for a concrete target. It does not replace delivery authority and must not be added to every ticket by ritual.

## 8. Supervisor escalation

The supervisor may answer a worker without human interruption only when the answer is already contained in durable authority or is a procedural transport choice with no product/scope effect.

Escalate to the human for material changes such as new/broadened scope, changed acceptance/product meaning, weakening a principal oracle/test, new publication authority, destructive action not already authorized, or a provider refusal with no exact safe continuation.

## 9. Fallback

If the Pi child cannot execute the ticket because of a concrete runtime/tooling defect, preserve the worktree and durable checkpoint. Relaunch the **same prepared-ticket contract** with qualified OpenCode Build V1. Do not route through `gentle-orchestrator` merely because the implementation runtime changed.

## 10. Train operation

For an authorized train, establish repo/base/publication/runtime facts once. Select the profile at each new clean candidate/work-unit boundary from current durable task evidence; default to `production-volume` when no complex trigger exists.

At ticket boundaries re-check only durable checkpoint/HEAD, clean candidate surface, dependency/frontier status, and that the next ticket remains inside the authorized train.

Do not re-shape or replay full preflight at every boundary. Do not delete or recycle an active worktree merely because the runtime protocol changed.

## 11. Publication

Review approval is not delivery authority. Push, PR, merge, deploy and archival follow the target repository's explicit policy and human authorization.
