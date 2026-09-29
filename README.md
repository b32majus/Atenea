# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work. It is not a second implementation/review framework around Gentle.

## Current prepared-ticket runtime

Current authority: **C-079** (2026-09-29). C-079 preserves the C-077 Pi-first topology and C-078 field hardening, then normalizes required-lens zero-output failures and binds recovery to exact same-lineage provider state plus an explicitly qualified route.

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
3. `docs/CURRENT_EXECUTION_DECISION_C079.md`;
4. `docs/CURRENT_EXECUTION_DECISION_C078.md` for preserved field-hardening provenance;
5. `docs/CURRENT_EXECUTION_DECISION_C077.md` for the preserved base topology;
6. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
7. `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
8. `docs/PREPARED_TRAIN_HANDOFF_C079.md`;
9. `CODING_STANDARDS.md`;
10. current product/task/ADR authority.

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

Use `complex` only for material reasoning/semantic risk. File count, ticket length, ordinary UI, many tests, or business importance alone are not triggers.

## Adaptive native review

Atenea never chooses reviewer depth. Gentle owns risk and lens selection from the frozen candidate:

```text
passive / low        → 0 lenses
medium when due      → 1 focus lens
high                 → canonical 4R
```

`review_due=false` means no OpenCode review host should be started. Refuter and validator remain conditional provider-owned roles.

Default reviewer mappings remain in `config/native-gentle/opencode-production-volume.profile.json` and `opencode-complex.profile.json`; C-079 does not globally replace any default model.

## Required-lens zero-output hardening

C-079 normalizes a terminal required reviewer completion with zero capturable result into `atenea.review-zero-output/v1`. That record is failure evidence, not automatic fallback authority.

Recovery requires:

```text
typed zero-output
→ preserve candidate / lineage / revision / target
→ bound STATUS
→ exact same collect slot
→ deterministic recovery permit
→ ONE fresh-host qualified route
```

Only two zero-output routes are currently qualified:

```text
review-resilience  / DeepSeek V4 Flash → GPT-6 Luna high
review-reliability / DeepSeek V4 Flash → GPT-6 Luna high
```

Unknown routes or failed recovery stop for the human. No RESET/new START/ASSESS, model carousel or global config mutation is authorized.

## Review transport isolation

Concurrent trains must not rewrite `~/.config/opencode/opencode.json`. Render the selected profile as a per-process overlay:

```bash
OPENCODE_CONFIG_CONTENT="$(node tools/render-opencode-routing-overlay.mjs production-volume)" \
  opencode serve ...
```

A recovery host instead requires a C-079 permit:

```bash
OPENCODE_CONFIG_CONTENT="$(
  node tools/render-opencode-routing-overlay.mjs \
    production-volume --recovery-permit <permit.json>
)" opencode serve ...
```

## Efficiency evidence

Execution telemetry is observational and adds **zero LLM calls**. Capture runtime-native Pi usage, Gentle ASSESS/risk/lens facts, OpenCode review-session usage and failed transport attempts when available. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md` and `tools/extract-execution-usage.mjs`.

## Publication boundary

Native review approval is not publication authority. No automatic merge, force-push or destructive history recovery. Follow target-repository policy and explicit human authority.
