# Atenea — Prepared-ticket Pi runtime v1

Status: **CURRENT PRODUCTIVE PATH FOR PREPARED WORK**
Date: 2026-09-28

This runbook begins only after product/task authority is executable.

## 1. Topology

```text
accepted prepared ticket/train
→ Pi supervisor + Herdr
→ select prepared profile
→ ONE plain Pi implementation worker
→ repo authority + project skills
→ implementation + deterministic verification
→ candidate commit
→ Gentle ASSESS
→ qualified OpenCode V1 review transport when due
→ native RDD / correction / validator / burn
→ checkpoint / next-or-STOP
```

OpenCode V1 review transport is not a second product writer. OpenCode Build V1 is fallback implementation only after a concrete Pi failure.

## 2. Profile selection

`production-volume` is default:

```text
Pi --no-extensions --model nan/deepseek-v4-flash
```

`complex`:

```text
Pi --no-extensions --model nan/glm5.3-flash --thinking high
```

Use `complex` only on material triggers defined in `config/native-gentle/prepared-routing-policy.json`.

If a trusted repository requires protected project resources, add `--approve` for that run. This is project trust, not a sandbox.

## 3. Worker launch

The supervisor launches exactly one Pi implementation child in the target worktree. The child reads repository authority and applicable skills before product writes.

Do not launch Gentle Shell, ODD or `gentle-orchestrator` for a prepared ticket.

## 4. Implementation and deterministic evidence

The Pi worker:

- implements only accepted scope;
- preserves the principal oracle/tests;
- runs repository-required deterministic checks;
- creates the authorized local candidate commit;
- does not push/PR/merge unless separately authorized.

## 5. Review entry

Use the actual candidate base:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent opencode \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

If `review_due=false`, checkpoint the timing result.

If `review_due=true`, execute the exact `next_transition.command` returned by Gentle.

When collection requires the OpenCode transport, use the already-qualified **fresh bounded OpenCode V1 review-host/session** path from `docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md`. The host exists only to carry native Gentle review work and must not reopen product scope or become another ticket parent.

Preserve exact lineage/revision/target after START. Never invent review transitions.

## 6. Native reviewer graph

Production-volume:

```text
risk        → GLM high
readability → Luna high
reliability → V4 Flash
resilience  → V4 Flash
refuter     → MiMo, conditional
validator   → Luna high, conditional
```

Complex:

```text
risk        → Luna xhigh
readability → Luna high
reliability → Luna xhigh
resilience  → V4 Flash
refuter     → Sol xhigh, conditional
validator   → Luna high, conditional
```

The authoritative snapshots are `config/native-gentle/opencode-production-volume.profile.json` and `config/native-gentle/opencode-complex.profile.json`.

Deterministic findings may bypass refuter; inferential findings use native refutation when required.

## 7. Correction and validation

A correction is allowed only when Gentle grants bounded correction authority. Keep it inside that boundary, rerun the required deterministic checks and follow the provider-issued continuation. For committed-only review, the corrected candidate may require its own local commit before validator can see it.

After `acknowledge-approved` returns burned authority, the review is terminal. Do not re-review an unchanged candidate merely to prove closure.

## 8. Supervisor escalation

The supervisor may answer procedural questions already resolved by durable authority. HUMAN STOP for new/broadened scope, changed acceptance/product meaning, weakened oracle, destructive action, publication authority or provider refusal without a safe continuation.

## 9. Train operation

Establish train-wide repo/base/publication facts once. At ticket boundaries re-check only checkpoint/HEAD, clean candidate surface, blockers/dependencies and whether the next ticket remains authorized.

Do not delete/recycle an active worktree merely because runtime protocol changed.

## 10. Fallback

A concrete Pi runtime/tooling failure may switch the same prepared contract to qualified OpenCode Build V1. Preserve checkpoint and scope; do not re-enter ODD.

## 11. Publication

Review approval is evidence, not push/PR/merge/deploy authority.
