# Atenea — Prepared-ticket Pi runtime v1

Status: **CURRENT PRODUCTIVE PATH FOR PREPARED WORK**
Date: 2026-09-28

This runbook starts only after product/task authority is already executable. It is not a shaping workflow.

## 1. Runtime topology

```text
accepted prepared ticket/train
→ Pi supervisor + Herdr
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation
→ deterministic checks/oracles
→ candidate commit
→ `gentle-ai review assess --agent codex ...`
→ exact native Gentle continuation when due
→ terminal review state / durable checkpoint
→ next authorized ticket or STOP
```

OpenCode Build remains the qualified fallback ticket worker. It is not the normal path while plain Pi remains healthy.

### Ownership

- **Supervisor:** Pi session with Herdr available. It observes one ticket worker, relays only procedural authority already granted, and escalates material scope/product decisions.
- **Ticket worker:** one plain Pi child launched through Herdr with `--no-extensions`. It owns the ticket from implementation through deterministic verification and review continuation.
- **Review transport:** Codex for native Gentle review continuation. `--agent=codex` identifies the review transport; it does not claim Codex authored the implementation.
- **Gentle AI:** owns candidate assessment, review transaction state, lenses, candidate-causality classification, refutation when applicable, bounded correction authority, targeted validation and acknowledgement/burn.

Do not introduce a second Atenea writer/review host merely because Gentle internally invokes reviewer roles.

## 2. Preflight

Before the first writer turn, establish only facts that can change the next action:

1. correct repository/worktree/base and no unrelated dirty state mixed into the candidate;
2. accepted ticket/work order/spec is current and executable;
3. outcome, acceptance and material constraints/non-goals are clear;
4. current Pi/Herdr/Gentle runtime is available;
5. publication boundary is known.

If durable authority already proves a fact, do not ask the human to repeat it.

## 3. Worker launch

The productive child is **plain Pi**, not Gentle Shell:

```text
kind: pi
agent args: --no-extensions
cwd: target worktree
```

The exact Herdr invocation may vary with pane/session layout; preserve the semantic requirement: exactly one Pi child for the ticket, launched with `--no-extensions` in the target worktree.

Pi protects project-local `.pi` resources and project `.agents/skills` behind project trust. When an unattended worker must consume trusted repository-owned project skills/settings and no durable trust decision already applies, add Pi's one-run trust override:

```text
agent args: --no-extensions --approve
```

Use `--approve` only for a repository whose project-local resources are intentionally trusted; it is not a sandbox and must not be used to make an untrusted checkout executable.

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

Every discovered `SKILL.md` should have valid YAML frontmatter including a non-empty `name` and `description`; Pi reports malformed project skills at startup rather than silently treating them as valid authority.

Do not duplicate Atenea lifecycle/model-routing policy inside project skills. Skills own domain/engineering/UI/QA guidance; Atenea owns execution transport.

## 4. Prepared-ticket worker contract

A normal prepared-ticket prompt is short:

```text
Execute <ticket/work unit> only.
Authority: <issue/spec/work-order>.
This work is already shaped; do not reopen product meaning, run ODD or use gentle-orchestrator.
Before writing, read and obey AGENTS.md, CODING_STANDARDS.md when present, and applicable project skills.
Preserve the principal acceptance oracle; do not weaken tests/checkers to make the implementation pass.
Implement the smallest coherent change, run the repository's required deterministic checks, and create the authorized local candidate commit.
Do not broaden scope or publish beyond current authority.
After the candidate commit, enter native Gentle review through the Codex transport and follow exact provider-issued continuations to terminal when review is due.
```

Omit lines already unambiguous from durable authority. Do not paste a second Gentle state machine into the prompt.

## 5. Review entry

For a committed candidate, use the actual last reviewed/base boundary:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent codex \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

When intended untracked files belong to the candidate, use the provider-supported untracked-scope/inventory arguments instead of hiding them.

Rules:

- if `review_due=false`, retain the assessment as the review-timing result and checkpoint;
- if `review_due=true`, execute `next_transition.command` exactly as returned;
- after START, retain the exact lineage/revision/target and route only through provider-issued transitions;
- standard candidate review consent may be relayed by the supervisor only when the ticket/train authority explicitly pre-authorized it;
- bounded correction is permitted only when Gentle grants that authority and only inside its stated boundary;
- with a committed-only review, a correction may need its own authorized local commit before the corrected candidate can be validated; follow the native stop/continuation contract rather than inventing a replacement lineage;
- after `acknowledge-approved` returns burned authority, the review is terminal; do not re-review the unchanged candidate merely to prove closure.

### Pi relay boundary

Plain Pi is **not** a Gentle Pi review host. Never make it pretend to be one by manually exporting:

```text
GENTLE_PI_REVIEW_RELAY_CONTRACT
```

That contract belongs to the Gentle Shell/Pi host relay. Prepared-ticket Atenea uses Codex as native Gentle review transport instead.

## 6. RDD and Judgment Day

Native RDD remains the normal negotiated review mechanism when Gentle says review is due. It may use risk/readability/reliability/resilience lenses, refutation for inferential findings, bounded correction and targeted validation as the provider contract requires.

Judgment Day is separate. Run it only when the user/ticket explicitly requests the standalone dual/adversarial review for a concrete target. It does not replace delivery authority and must not be added to every ticket by ritual.

## 7. Supervisor escalation

The supervisor may answer a worker without human interruption only when the answer is already contained in durable authority or is a procedural transport choice with no product/scope effect.

Escalate to the human for material changes such as:

- new or broadened scope;
- changed acceptance/product meaning;
- weakening a principal oracle/test;
- new publication/push/PR/merge authority;
- destructive/irreversible action not already authorized;
- a provider refusal with no exact safe continuation;
- any new decision that changes what the product should do.

## 8. Fallback

If the Pi child cannot execute the ticket because of a concrete runtime/tooling defect, preserve the worktree and durable checkpoint. Relaunch the **same prepared-ticket contract** with the qualified OpenCode Build fallback. Do not route through `gentle-orchestrator` merely because the worker runtime changed.

OpenCode fallback still enters native Gentle review with Codex transport after the candidate commit unless current provider authority says otherwise.

## 9. Train operation

For an authorized train, establish repo/base/publication/runtime facts once. At ticket boundaries re-check only:

- durable checkpoint/HEAD;
- clean candidate surface;
- dependency/frontier status;
- that the next ticket remains inside the authorized train.

Do not re-shape or replay full preflight at every boundary. Do not delete or recycle an active worktree merely because the runtime protocol changed.

## 10. Publication

Review approval is not delivery authority. Push, PR, merge, deploy and archival follow the target repository's explicit policy and human authorization.
