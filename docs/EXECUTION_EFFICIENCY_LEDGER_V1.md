# Atenea — Execution Efficiency Ledger v1

Status: **CURRENT OBSERVATIONAL EVIDENCE CONTRACT**
Date: 2026-09-28

## Purpose

Measure whether prepared-ticket execution is spending tokens on implementation, useful assurance, transport overhead or failed retries **without adding any LLM call**.

Telemetry is not product authority, review authority or a pre-writer gate. Missing telemetry does not block a valid ticket.

## Per-ticket record

Capture when available:

```text
ticket / candidate SHA / profile
runtime versions

IMPLEMENTATION (Pi)
  model
  input / output / cacheRead / cacheWrite / runtime-native total / cost
  wall time

GENTLE
  risk
  changed_lines
  review_due + reason
  selected lenses
  refuter requested? validator requested?

REVIEW TRANSPORT / ROLES (OpenCode)
  session id
  model per executed role
  input / output / reasoning / cache read/write / cost
  admitted | failed + typed failure code
  wall time

RECOVERY
  slot
  original model
  failure class
  recovery model
  attempts
  outcome

TERMINAL
  approved/burned | stopped
```

Do not infer missing numbers.

## Structural efficiency checks

These are more important than an arbitrary token ceiling:

- `review_due=false` + OpenCode reviewer execution => harness defect;
- medium due + more than the single provider-selected focus lens => harness defect;
- high + anything other than the provider-issued 4R set => investigate;
- refuter/validator without provider request => harness defect;
- repeated V4 `review-resilience` attempts after typed empty-output => C-078 violation;
- global OpenCode config mutation during concurrent trains => C-078 violation.

## Derived metrics

After enough real tickets exist, compare:

```text
assurance_ratio = review usage / implementation usage
transport_tax   = review-host overhead / total review usage
retry_waste     = failed-attempt usage / total ticket usage
useful_review   = admitted reviewer usage / all reviewer-attempt usage
```

Keep input/output/reasoning/cache fields separate. Provider/runtime token accounting is not guaranteed to normalize cache identically; do not manufacture one cross-provider total by summing fields with different semantics.

## Baseline context evidence

The 2026-09-27 lean OpenCode qualification observed approximately:

- lean writer context floor ~5.1k tokens;
- lean review-host context floor ~6.0k;
- two zero-touch review-host totals ~14.4k and ~15.1k.

These are comparison evidence, not budgets or SLAs.

## Extraction helper

```bash
node tools/extract-execution-usage.mjs pi <pi-session.jsonl>
node tools/extract-execution-usage.mjs opencode <opencode-export.json>
node tools/extract-execution-usage.mjs gentle-assess <assess.json>
```

Store normalized outputs with the train evidence. The helper performs local parsing only.
