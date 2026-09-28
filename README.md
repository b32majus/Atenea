# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work. It is not a second implementation/review framework around Gentle.

## Current prepared-ticket runtime

Current authority: **C-078** (2026-09-28), which hardens the C-077 Pi-first topology with field evidence from PsO Valme and PROMueve Reuma/Farmacia.

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
3. `docs/CURRENT_EXECUTION_DECISION_C078.md`;
4. `docs/CURRENT_EXECUTION_DECISION_C077.md` for the preserved base topology;
5. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
6. `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
7. `docs/PREPARED_TRAIN_HANDOFF_C078.md`;
8. `CODING_STANDARDS.md`;
9. current product/task/ADR authority.

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

`review_due=false` means no OpenCode review host should be started for that candidate. Refuter and validator remain conditional provider-owned roles.

Default reviewer mappings remain in `config/native-gentle/opencode-production-volume.profile.json` and `opencode-complex.profile.json`. C-078 does **not** globally replace DeepSeek for `review-resilience`; it adds one evidence-backed same-lineage recovery route to Luna high after a typed V4 empty-output failure.

## Review transport isolation

Concurrent trains must not rewrite `~/.config/opencode/opencode.json`. Render the selected profile as a per-process overlay:

```bash
OPENCODE_CONFIG_CONTENT="$(node tools/render-opencode-routing-overlay.mjs production-volume)" \
  opencode serve ...
```

Use `complex` when that is the selected prepared profile. The legacy apply helper now requires an explicit target file and is maintenance-only.

## Efficiency evidence

Execution telemetry is observational and must add **zero LLM calls**. Capture runtime-native Pi usage, Gentle ASSESS/risk/lens facts, OpenCode review-session usage and failed transport attempts when available. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md` and `tools/extract-execution-usage.mjs`.

## Publication boundary

Native review approval is not publication authority. No automatic merge, force-push or destructive history recovery. Follow target-repository policy and explicit human authority.
