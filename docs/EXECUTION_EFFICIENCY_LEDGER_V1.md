# Atenea — Execution Efficiency Ledger v1

Status: **CURRENT OBSERVATIONAL EVIDENCE CONTRACT**
Date: 2026-09-30

## Purpose

Measure whether prepared-ticket execution is spending tokens on supervision, implementation, useful assurance, transport overhead or failed retries **without adding any LLM call**.

Telemetry is not product authority, review authority or a pre-writer gate. Missing telemetry does not block a valid ticket.

## Per-ticket record

Capture when available:

```text
ticket / candidate SHA / profile
runtime versions

SUPERVISOR (Pi)
  model
  input / output / cacheRead / cacheWrite / runtime-native total / cost
  wall time
  tickets/children launched
  human touches attributable to supervisor routing/procedure

IMPLEMENTATION (Pi)
  model
  profile = production-volume | complex
  material complex trigger / profile reason when already recorded
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

TECHNICAL FAILURE (when one occurs)
  slot
  model
  failure class
  typed failure code
  outcome = human_stop

TERMINAL
  approved/burned | stopped
```

Do not infer missing numbers. Supervisor and implementation usage must remain separate even when both use `nan/deepseek-v4-flash`.

## Structural efficiency checks

These are more important than an arbitrary token ceiling:

- `review_due=false` + OpenCode reviewer execution => harness defect;
- medium due + more than the single provider-selected focus lens => harness defect;
- high + anything other than the provider-issued 4R set => investigate;
- refuter/validator without provider request => harness defect;
- any second reviewer attempt after a typed terminal technical failure => C-080 violation;
- global OpenCode config mutation during concurrent trains => C-080 violation;
- implementation profile changing the supervisor model => C-080 supervisor-routing violation;
- automatic supervisor fallback/escalation to GLM without human adjudication => C-080 supervisor-routing violation.

## Derived metrics

After enough real tickets exist, compare:

```text
supervisor_tax  = supervisor usage / total execution usage
assurance_ratio = review usage / implementation usage
transport_tax   = review-host overhead / total review usage
retry_waste     = failed-attempt usage / total ticket usage
useful_review   = admitted reviewer usage / all reviewer-attempt usage
```

Keep input/output/reasoning/cache fields separate. Provider/runtime token accounting is not guaranteed to normalize cache identically; do not manufacture one cross-provider total by summing fields with different semantics.

## Field baseline — C-080

The first complete multi-ticket PROMueve C-080 train (#461) exercised the lean assurance happy path with 3 required review lifecycles, 3 APPROVED+BURNED outcomes, zero reviewer technical failures, zero recoveries, zero implementation-profile leakage into review routing and exact-candidate publication. PROMueve used a GLM supervisor and therefore remains C-080 baseline evidence, not V4-supervisor qualification.

Operator-confirmed V4 Flash supervisor launches subsequently coordinated completed C-080 field work across materially different repositories, including:

- Laboratorio de Privacidad: prepared train T22→T24→T25 and later HARDEN-01;
- PsO-Valme: Train-B and Train-C technical completion;
- Symphonia: Planning Foundation train.

These runs included production-volume work, complex GLM implementation children, native Gentle review, correction cycles and a real HUMAN STOP. No supervisor-attributable frontier error, candidate/lineage corruption, implementation-profile leakage into supervisor routing, publication-boundary violation or invalid Gentle transition was observed in those completed cases. This is field qualification for the **thin supervisor role only**, not evidence that V4 replaces GLM for complex implementation or reviewer-risk work.

Do not infer that future supervisor failures are impossible. A concrete supervisor/runtime refusal or material procedural error remains HUMAN STOP and should be recorded as field evidence before any routing change.

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
