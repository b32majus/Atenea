# C-077 — Prepared tickets enter at implementation through plain Pi; native Gentle review uses qualified OpenCode V1 transport

Status: **ACCEPTED BASE TOPOLOGY — FIELD-HARDENING DETAILS SUPERSEDED BY C-078**
Accepted: 2026-09-28

C-077 established the current prepared-ticket topology. C-078 preserves that topology and supersedes C-077 only for adaptive lens wording, OpenCode config isolation, `review-resilience` empty-output recovery and usage telemetry.

## Preserved decision

```text
authorized train frontier
→ Pi supervisor + Herdr
→ select production-volume|complex at a clean boundary
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repo authority / standards / applicable skills
→ implementation + deterministic checks/oracles
→ authorized local candidate commit
→ `gentle-ai review assess --agent opencode`
→ native Gentle decides review_due and exact lens set
→ qualified OpenCode V1 transport only when collection is due
→ conditional refuter / bounded correction / validator
→ acknowledge-approved / burn
→ durable checkpoint
→ next authorized ticket or STOP
```

OpenCode V1 remains qualified fallback implementation after a concrete Pi runtime/tooling failure.

## Prepared implementation profiles

- `production-volume` default → Pi + `nan/deepseek-v4-flash`.
- `complex` triggered → Pi + `nan/glm5.3-flash` high.

Use `complex` only for material reasoning/semantic risk. Do not trigger from file count, ticket length, ordinary UI, many tests or business importance alone. Do not switch implementation profile inside an active candidate/review lineage.

## Review ownership

C-077 never intended Atenea to force four lenses. Native Gentle owns candidate risk, review timing and lens selection. The precise current rule is documented in C-078:

```text
passive/low → 0 lenses
medium when review is due → 1 focus lens
high → canonical 4R
```

Refuter and validator are conditional.

Default model mappings remain the OpenCode routing profiles. C-078 adds one narrow same-lineage recovery for the known DeepSeek `review-resilience` empty-output class; it is not a new review controller.

## Pi relay boundary

Plain Pi is not Gentle Shell / Gentle-Pi review relay. Never self-attest by manually exporting `GENTLE_PI_REVIEW_RELAY_CONTRACT`.

## Safety / STOP

The supervisor may relay only procedural choices already granted by durable authority. Material changes to product meaning, acceptance, scope, principal oracles, publication authority or destructive actions are HUMAN STOP. Review approval is separate from publication authority.

Current field-hardening authority: `docs/CURRENT_EXECUTION_DECISION_C078.md`.
