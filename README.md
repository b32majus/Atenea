# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work. It is not a second implementation/review framework around Gentle.

## Current prepared-ticket runtime

Current authority: **C-080** (2026-09-29). C-080 preserves the C-077 Pi-first topology, collapses review routing to ONE assurance profile independent of the implementation profile, and removes automatic reviewer recovery: every technical reviewer failure resolves to a typed deterministic failure and HUMAN STOP.

```text
Pi supervisor + Herdr
→ select prepared implementation profile at a clean boundary
   - production-volume (default) → DeepSeek V4 Flash
   - complex → GLM 5.3 Flash high
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ native Gentle ASSESS
→ if review_due=false: checkpoint; do not start a review host
→ if review_due=true: follow Gentle-selected 1 or 4 lens route exactly
→ qualified OpenCode V1 transport only when Gentle requests collection
→ conditional refuter / bounded correction / validator
→ acknowledge-approved / burn
→ durable checkpoint
→ next authorized ticket or STOP
```

OpenCode V1 is **review transport and qualified fallback implementation runtime**, not the normal prepared-ticket writer. Prepared tickets do not enter ODD or `gentle-orchestrator`.

## Start here

For a fresh agent or human, read in this order:

1. `AGENTS.md`;
2. `docs/START_HERE.md`;
3. `docs/CURRENT_EXECUTION_DECISION_C080.md`;
4. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
5. `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
6. `docs/PREPARED_TRAIN_HANDOFF_C080.md`;
7. `CODING_STANDARDS.md`;
8. current product/task/ADR authority.

Historical OpenCode-first, Gentle-Pi and ODD documents remain evidence for what they tested; they do not define current prepared-ticket execution.

## Prepared implementation profiles

`production-volume` is the default:

```text
Pi worker → nan/deepseek-v4-flash
```

`complex` is trigger-driven:

```text
Pi worker → nan/glm5.3-flash · high
```

Use `complex` only for material reasoning/semantic risk. File count, ticket length, ordinary UI, many tests, or business importance alone are not triggers. The profile selects the implementation worker only; it never routes review.

## Adaptive native review

Atenea never chooses reviewer depth. Gentle owns risk and lens selection from the frozen candidate:

```text
passive / low        → 0 lenses
medium when due      → 1 focus lens
high                 → canonical 4R
```

`review_due=false` means no OpenCode review host should be started. Refuter and validator remain conditional provider-owned roles.

Reviewer mappings live in the single `config/native-gentle/opencode-assurance.profile.json`: readability/reliability/resilience/validator → GPT-6 Luna high; risk → GLM 5.3 Flash high; refuter → conditional provider-issued. DeepSeek V4 holds no reviewer role and no review role uses Luna xhigh.

## Technical reviewer failure → HUMAN STOP

A terminal required reviewer completion with zero capturable result is normalized by `tools/classify-required-lens-zero-output.mjs` into `atenea.review-zero-output/v1` with `next_action = human_stop`. That record is failure evidence for the human; the candidate, lineage, revision and target stay preserved.

There is no recovery route, no permit, no alternate model, no same-route retry, no model carousel, no RESET/new START/ASSESS, no skipped lens and no profile switch inside an active lineage.

## Review transport isolation

Concurrent trains must not rewrite `~/.config/opencode/opencode.json`. Render the single assurance profile as a per-process overlay:

```bash
OPENCODE_CONFIG_CONTENT="$(node tools/render-opencode-routing-overlay.mjs)" \
  opencode serve ...
```

An OpenCode Build V1 fallback implementation host additionally passes `--implementation <production-volume|complex>` to select the fallback writer model.

## Efficiency evidence

Execution telemetry is observational and adds **zero LLM calls**. Capture runtime-native Pi usage, Gentle ASSESS/risk/lens facts, OpenCode review-session usage and failed transport attempts when available. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md` and `tools/extract-execution-usage.mjs`.

## Publication boundary

Native review approval is not publication authority. No automatic merge, force-push or destructive history recovery. Follow target-repository policy and explicit human authority.
