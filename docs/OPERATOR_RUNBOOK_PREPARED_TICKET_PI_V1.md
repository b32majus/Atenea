# Atenea — Prepared-ticket Pi runtime v1

Status: **HISTORICAL / SUPERSEDED BY C-083 — PRESERVED PROVENANCE**

Current execution authority is `docs/START_HERE.md` + `docs/CURRENT_EXECUTION_DECISION_C083.md`. Do not use this document as a current runbook or routing contract.
Date: 2026-09-30

This runbook begins only after product/task authority is executable.

## 1. Topology

```text
accepted prepared ticket/train
→ clean Pi supervisor + Herdr on nan/deepseek-v4-flash
→ select prepared implementation profile
→ ONE plain Pi implementation worker
→ repo authority + project skills
→ implementation + deterministic verification
→ candidate commit
→ Gentle ASSESS
→ no review host when review_due=false
→ native Gentle-selected lens collection when due
→ isolated OpenCode V1 transport
→ correction / validator / burn when provider-issued
→ checkpoint / next-or-STOP
```

Default supervisor launch:

```bash
pi --no-extensions --model nan/deepseek-v4-flash
```

The supervisor route is independent of the implementation profile. A `complex` child does not move the supervisor to GLM. There is no automatic supervisor fallback/model carousel; a concrete supervisor/runtime refusal or material procedural error preserves the checkpoint and becomes HUMAN STOP for explicit adjudication.

## 2. Implementation profile

Default:

```bash
pi --no-extensions --model nan/deepseek-v4-flash
```

Complex:

```bash
pi --no-extensions --model nan/glm5.3-flash --thinking high
```

Use `complex` only on material triggers from `config/native-gentle/prepared-routing-policy.json`. The profile selects the implementation worker only; review routing and supervisor routing never depend on it. Add `--approve` only for an intentionally trusted repository whose protected project resources require it.

The supervisor itself must remain clean (`pi --no-extensions`) so local extensions do not load Gentle Shell or another conflicting runtime surface.

## 3. Implementation and evidence

The worker reads repository authority and applicable skills, implements only accepted scope, preserves the principal oracle/tests, runs repository-required deterministic checks and creates the authorized local candidate commit. It does not publish unless separately authorized. Its FINAL reports the base/candidate identity, required check command(s) and result, and worktree state.

The supervisor consumes that evidence. Post-worker handoff is **mechanical only**: candidate exists, reported SHA matches HEAD, expected base relationship holds, worktree state is acceptable, evidence is present, and no new human-owned boundary appeared. Do not read implementation code/diff for assurance; do not rerun typecheck/test/build/E2E; do not launch an independent challenge or additional QA. Candidate-bound PASS evidence is reused until the candidate or controlling authority changes.

## 4. Review entry

Entering review does **not** trigger another preflight. The one ticket/work-unit preflight remains in force through ASSESS, review collection and provider-issued correction unless controlling authority/base/worktree is materially invalidated.

Use the real candidate base:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent opencode \
  --base-ref <last-reviewed-or-ticket-base> \
  --committed-only \
  --json
```

If `review_due=false`, record the assessment and checkpoint. **Do not launch OpenCode review transport.**

If `review_due=true`, execute the exact `next_transition.command`. Gentle owns risk and lens selection: medium review when due uses one focus lens; high uses canonical 4R. Atenea never expands or substitutes that set.

## 5. Isolated review-host launch

Before any OpenCode collection host, render the single assurance profile for that process. There is no review-time `production-volume | complex` choice:

```bash
OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs)" \
  opencode serve ...
```

An OpenCode Build V1 fallback implementation host additionally passes `--implementation <production-volume|complex>` to select the fallback writer model. Prefer setting the environment only on the child process rather than exporting it in a long-lived shared shell. Do not log the rendered config under shell tracing. Do not use `tools/apply-opencode-routing-profile.mjs` for train routing and do not modify `~/.config/opencode/opencode.json` while trains are active.

For review collection, `tools/launch-opencode-review-host.mjs` is the only qualified OpenCode V1 serve launcher. It is serve-only and fail-closed: it requires the rendered per-process config, requires `review-*` as subagents, and rejects one-shot `opencode run`, every host `--agent` selection, alternate config sources and implementation-profile flags. There is no primary review/lifecycle agent. Dispatch each exact Gentle `provider_task` once through `tools/dispatch-opencode-review-task.mjs`; a technical failure is HUMAN STOP, never a retry.

Reviewer routes (ONE assurance profile, independent of the implementation profile): readability/reliability/resilience/validator → GPT-6 Luna high; risk → GLM 5.3 Flash high; refuter → conditional provider-issued. DeepSeek V4 holds no reviewer role and no review role uses Luna xhigh.

Preserve exact lineage/revision/target after START and follow provider-issued transitions literally.

## 6. Required-lens zero-output classification

A reviewer timeout while still running is not a terminal zero-output result.

When the qualified review transport or supervisor first **observes** that a required reviewer Task has terminally completed and exposes either:

```text
provider_error = opencode_task_output_empty
```

or:

```text
completed = true
capturable_output = empty
output_tokens = 0
```

stop that failed host at that observable boundary. Do not queue another same-route reviewer turn or continue a recovery-by-narration loop.

C-080 does not add an in-process OpenCode Task interceptor. If the runtime does not surface a child's terminal state until the parent turn ends, record that delay as runtime observability debt; do not add polling/controller logic to Atenea.

Create a small normalized observation containing:

```json
{
  "required": true,
  "completed": true,
  "lens": "review-reliability",
  "model": "nan/deepseek-v4-flash",
  "reason": "length",
  "capturable_output": "",
  "output_tokens": 0,
  "candidate": "<candidate identity>",
  "lineage": "<lineage>",
  "revision": "<revision>",
  "target": "<target>"
}
```

For provider-typed empty-output, include `provider_error: "opencode_task_output_empty"`.

Classify without a model call:

```bash
node <ATENEA>/tools/classify-required-lens-zero-output.mjs \
  <normalized-observation.json> > <typed-failure.json>
```

A matching terminal observation becomes `atenea.review-zero-output/v1` with `next_action = human_stop`. That is the terminal outcome for every lens and model: there is no recovery route, no permit, no alternate model, no second attempt.

Preserve the typed failure with the frozen candidate/lineage/revision/target and STOP for the human.

## 7. Correction and validation

A correction is allowed only when Gentle grants bounded correction authority. Keep it inside that boundary, rerun required deterministic checks and follow provider-issued continuation. After `acknowledge-approved` returns burned authority, do not re-review an unchanged candidate merely to prove closure.

## 8. Efficiency capture

Telemetry is non-blocking and adds no model calls. At each ticket boundary, retain usage artifacts already produced by the supervisor Pi, implementation Pi/OpenCode plus ASSESS/STATUS facts when practical. Use `tools/extract-execution-usage.mjs` to normalize Pi/OpenCode session usage. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

Record the supervisor model separately from the implementation profile, and record failed transport attempts so reasoning-only zero-output cost remains visible instead of disappearing into aggregate review usage.

## 9. Supervisor escalation

The supervisor may answer procedural questions already resolved by durable authority. It is not a second engineer: after worker FINAL it may not recreate deterministic evidence, inspect semantics, or add assurance of its own. If Gentle grants bounded correction, launch the correction worker; that worker owns edits and required verification for the new candidate, followed by another mechanical handoff — **not another preflight**.

HUMAN STOP for new/broadened scope, changed acceptance/product meaning, weakened oracle, destructive action, publication authority, provider/runtime refusal without a current safe continuation, or a material supervisor procedural error. A typed technical reviewer failure is always such a STOP.

Do not automatically relaunch the supervisor on GLM merely because a child is `complex` or because GLM quota is available. Model escalation is a separate human decision after an observed supervisor failure.

## 10. Fallback and publication

A concrete Pi implementation-worker runtime/tooling failure may switch implementation to qualified OpenCode Build V1 under the same prepared contract. Do not re-enter ODD. This fallback does not change the supervisor route.

Review approval is evidence, not push/PR/merge/deploy authority.
