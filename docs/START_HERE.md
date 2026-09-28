# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current authority — read this first

```text
CURRENT_DECISION      = C-078
BASE_TOPOLOGY         = C-077 preserved
prepared supervisor   = Pi + Herdr
prepared worker       = ONE plain Pi child (`pi --no-extensions`)
default profile       = production-volume → DeepSeek V4 Flash
complex profile       = complex → GLM 5.3 Flash high
review owner          = Gentle AI
review transport      = OpenCode V1 only when collection is due
lens depth            = native Gentle: 0 / 1 / 4, never Atenea-selected
review config         = per-process; no shared global mutation during trains
resilience recovery   = V4 empty-output → one same-lineage Luna-high attempt
Gentle Shell / ODD    = NOT the prepared-ticket implementation entry
```

If a ticket/train is already shaped and executable, **do not route it through ODD or `gentle-orchestrator`**.

Canonical current documents:

- `docs/CURRENT_EXECUTION_DECISION_C078.md`;
- `docs/CURRENT_EXECUTION_DECISION_C077.md` — preserved base topology;
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- `docs/PREPARED_TRAIN_HANDOFF_C078.md`;
- `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

## 1. Minimal preflight

Establish only facts that can change the next action: correct repo/worktree/base, current accepted task authority, executable outcome/acceptance/constraints, compatible runtime, and publication boundary. Do not ask the human to restate durable authority.

## 2. Select the implementation profile

Default:

```text
production-volume → Pi worker on nan/deepseek-v4-flash
```

Use `complex` only on a material trigger:

```text
complex → Pi worker on nan/glm5.3-flash · high
```

Material triggers include novel/cross-cutting architecture; difficult concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust-boundary semantics; delicate migration/back-compat/distributed invariants; or repeated semantic/correction failure under production-volume.

## 3. Execute prepared work

```text
accepted ticket/train
→ clean Pi supervisor + Herdr
→ ONE Pi child with selected model
→ repo authority + applicable skills
→ implement
→ deterministic checks/oracles
→ local candidate commit
→ `gentle-ai review assess --agent opencode`
→ obey Gentle's review_due + exact next_transition
→ checkpoint/burn as applicable
→ next authorized ticket or STOP
```

## 4. Adaptive RDD — do not flatten this

Gentle owns risk and lens selection from the frozen candidate:

```text
passive / low              → 0 lenses
medium + review_due=false  → 0 lenses
medium + review_due=true   → 1 focus lens
high                       → canonical 4R
```

Atenea must never expand a one-lens review into four, and must never launch OpenCode collection when `review_due=false`.

Refuter and targeted validator remain conditional provider-owned roles.

## 5. Isolated OpenCode review transport

OpenCode V1 is transport, not implementation parent. Every review host uses a profile overlay scoped to that process:

```bash
OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs production-volume)" \
  opencode serve ...
```

Use `complex` when selected. Do **not** rewrite `~/.config/opencode/opencode.json` to switch active train routing.

## 6. Resilience empty-output recovery

If a required `review-resilience` slot on `nan/deepseek-v4-flash` returns typed `opencode_task_output_empty`:

1. preserve candidate, lineage, revision and target;
2. query bound STATUS;
3. continue only if Gentle reoffers the exact same slot;
4. launch one fresh isolated review host using `--resilience-recovery-luna` on the overlay renderer;
5. execute only that fresh provider-owned slot;
6. if the Luna-high recovery is not admitted, HUMAN STOP.

Do not retry V4 repeatedly, RESET, create a new START, or walk model fallbacks.

## 7. Efficiency telemetry

Capture runtime-native usage when available without adding model calls. Telemetry failure does not block the ticket. Record Pi usage, Gentle risk/review_due/selected lenses, OpenCode review usage and retry/recovery waste. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

## 8. Fallback and publication

A concrete Pi runtime/tooling failure may switch implementation to qualified OpenCode Build V1 under the same shaped contract; do not reopen ODD.

Material product/scope/acceptance/oracle/publication changes are HUMAN STOP. Review approval never grants push/PR/merge/deploy authority.
