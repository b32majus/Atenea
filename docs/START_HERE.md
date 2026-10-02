# Atenea — Start Here

Status: **CURRENT FRONT DOOR**

## Current authority — read this first

```text
CURRENT_DECISION      = C-082
FIELD_BASE            = C-078/C-079 preserved as provenance
ASSURANCE_BASE         = C-080 preserved; C-081 review dispatch preserved under C-082
BASE_TOPOLOGY         = C-077 preserved
prepared supervisor   = Pi + Herdr → DeepSeek V4 Flash (`nan/deepseek-v4-flash`) · control-plane only
prepared worker       = ONE plain Pi child (`pi --no-extensions`)
default profile       = production-volume → DeepSeek V4 Flash (implementation worker only)
complex profile       = complex → GLM 5.3 Flash high (implementation worker only)
review owner          = Gentle AI
review transport      = OpenCode V1 serve + deterministic direct-subtask dispatch only when collection is due
review primary        = NONE; provider tasks dispatch directly to review-* subagents
review profiles       = ONE assurance profile, independent of implementation profile
lens depth            = native Gentle: 0 / 1 / 4, never Atenea-selected
reviewer failure      = typed technical failure → HUMAN STOP (no automatic recovery)
review config         = per-process; no shared global mutation during trains
Gentle Shell / ODD    = NOT the prepared-ticket implementation entry
```

If a ticket/train is already shaped and executable, **do not route it through ODD or `gentle-orchestrator`**.

Canonical current documents:

- `docs/CURRENT_EXECUTION_DECISION_C082.md`;
- `docs/CURRENT_EXECUTION_DECISION_C081.md` (review-dispatch provenance/current seam);
- `docs/CURRENT_EXECUTION_DECISION_C080.md` (assurance/base provenance);
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- `docs/PREPARED_TRAIN_HANDOFF_C082.md`;
- `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

C-077/C-078/C-079 remain preserved provenance. C-080 remains assurance/base provenance; C-081 remains the current deterministic review-dispatch seam; C-082 narrows supervisor ownership and handoff.

## 1. Minimal preflight

Establish only facts that can change the next action: correct repo/worktree/base, current accepted task authority, executable outcome/acceptance/constraints, compatible runtime, and publication boundary. Do not ask the human to restate durable authority. **Run this preflight once per authorized ticket/work-unit boundary. Do not repeat it at worker launch, worker handoff, Gentle ASSESS, review collection, reviewer return or provider-issued correction.**

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

The profile selects the implementation worker only. Review routing never depends on it, and the supervisor remains DeepSeek V4 Flash for both profiles.

## 3. Execute prepared work

```text
accepted ticket/train
→ clean Pi supervisor + Herdr on nan/deepseek-v4-flash
→ ONE Pi child with selected implementation model
→ repo authority + applicable skills
→ implement
→ worker-owned deterministic checks/oracles
→ local candidate commit + structured evidence
→ supervisor mechanical handoff only (no duplicate QA)
→ `gentle-ai review assess --agent opencode`
→ obey Gentle's review_due + exact next_transition
→ checkpoint/burn as applicable
→ next authorized ticket or STOP
```

There is no automatic supervisor escalation to GLM. A concrete supervisor/runtime refusal or material procedural error preserves the checkpoint and becomes HUMAN STOP for explicit adjudication.

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

Every review host uses the single assurance profile rendered as a per-process overlay. There is no review-time `production-volume | complex` choice:

```bash
OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs)" \
  opencode serve ...
```

An OpenCode Build V1 fallback implementation host additionally passes `--implementation <profile>` to select the fallback writer model. Do **not** rewrite `~/.config/opencode/opencode.json` to switch active train routing.

Reviewer routes (ONE assurance profile): readability/reliability/resilience/validator → GPT-6 Luna high; risk → GLM 5.3 Flash high; refuter → conditional provider-issued. DeepSeek V4 holds no reviewer role and no review role uses Luna xhigh.

Launch the bounded OpenCode V1 serve process only through `tools/launch-opencode-review-host.mjs`. The guard requires the rendered per-process config, requires every `review-*` role to remain a subagent, and rejects `opencode run`, any host `--agent` selection, alternate config sources and implementation-profile selection. For each provider-issued collection slot, pipe the exact `provider_task` JSON to `tools/dispatch-opencode-review-task.mjs`; it uses OpenCode `prompt_async` + `SubtaskPartInput`, waits for the single Task to reach `completed`, then aborts the default parent before it can perform lifecycle/exploration work.

## 6. Technical reviewer failure → HUMAN STOP

When a **required** reviewer Task terminally completes with no capturable result (empty output with `output_tokens=0`, or typed `opencode_task_output_empty`):

1. stop the failed host; do not continue parent narration or repeat the same route;
2. normalize the observation with `tools/classify-required-lens-zero-output.mjs`;
3. the typed technical failure preserves candidate, lineage, revision and target;
4. **HUMAN STOP** — no recovery route, no permit, no alternate model, no second attempt, no RESET/new START/new ASSESS, no skipped lens, no profile switch.

A timeout that kills a still-running reviewer is not a terminal zero-output result.

## 7. Efficiency telemetry

Capture runtime-native usage when available without adding model calls. Telemetry failure does not block the ticket. Record supervisor Pi usage, implementation Pi usage, Gentle risk/review_due/selected lenses and OpenCode review usage including failed transport attempts. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

## 8. Fallback and publication

A concrete Pi implementation-worker runtime/tooling failure may switch implementation to qualified OpenCode Build V1 under the same shaped contract; do not reopen ODD. This fallback does not change the supervisor model.

Material product/scope/acceptance/oracle/publication changes are HUMAN STOP. Review approval never grants push/PR/merge/deploy authority.
