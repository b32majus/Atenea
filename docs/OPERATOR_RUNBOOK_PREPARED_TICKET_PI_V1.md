# Atenea — Prepared-ticket Pi runtime v1

Status: **CURRENT PRODUCTIVE PATH FOR PREPARED WORK — C-079 HARDENED**  
Date: 2026-09-29

This runbook begins only after product/task authority is executable.

## 1. Topology

```text
accepted prepared ticket/train
→ clean Pi supervisor + Herdr
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

## 2. Implementation profile

Default:

```bash
pi --no-extensions --model nan/deepseek-v4-flash
```

Complex:

```bash
pi --no-extensions --model nan/glm5.3-flash --thinking high
```

Use `complex` only on material triggers from `config/native-gentle/prepared-routing-policy.json`. Add `--approve` only for an intentionally trusted repository whose protected project resources require it.

The supervisor itself should also be clean (`pi --no-extensions`) when local extensions would otherwise load Gentle Shell or another conflicting runtime surface.

## 3. Implementation and evidence

The worker reads repository authority and applicable skills, implements only accepted scope, preserves the principal oracle/tests, runs repository-required deterministic checks and creates the authorized local candidate commit. It does not publish unless separately authorized.

## 4. Review entry

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

Before any normal OpenCode collection host, render the matching routing profile for that process:

```bash
OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs <profile>)" \
  opencode serve ...
```

Prefer setting the environment only on the child process rather than exporting it in a long-lived shared shell. Do not log the rendered config under shell tracing. Do not use `tools/apply-opencode-routing-profile.mjs` for train routing and do not modify `~/.config/opencode/opencode.json` while trains are active.

Preserve exact lineage/revision/target after START and follow provider-issued transitions literally.

## 6. Required-lens zero-output classification

A reviewer timeout while still running is not a terminal zero-output result.

If a **required** reviewer Task terminally completes and exposes either:

```text
provider_error = opencode_task_output_empty
```

or:

```text
completed = true
capturable_output = empty
output_tokens = 0
```

stop that failed host. Do not allow the parent to narrate, relaunch the same reviewer, or consume another same-route model turn.

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

A matching terminal observation becomes `atenea.review-zero-output/v1`. If `recovery_qualified=false`, HUMAN STOP.

## 7. Bound STATUS and recovery permit

For a qualified failure, query **bound STATUS** on the existing review lineage. Do not START again and do not ASSESS the unchanged candidate again.

Normalize only the provider facts needed for continuity:

```json
{
  "bound": true,
  "next_transition_kind": "collect",
  "reoffered_lens": "review-reliability",
  "candidate": "<same candidate>",
  "lineage": "<same lineage>",
  "revision": "<same revision>",
  "target": "<same target>"
}
```

Then authorize deterministically:

```bash
node <ATENEA>/tools/authorize-required-lens-recovery.mjs \
  <typed-failure.json> \
  <normalized-bound-status.json> > <recovery-permit.json>
```

Any candidate/lineage/revision/target/lens drift or non-collect STATUS fails closed.

## 8. One qualified fresh-host recovery

Current qualified zero-output routes:

```text
review-resilience  / nan/deepseek-v4-flash → openai/gpt-6-luna high
review-reliability / nan/deepseek-v4-flash → openai/gpt-6-luna high
```

Start one fresh isolated host:

```bash
OPENCODE_CONFIG_CONTENT="$(
  node <ATENEA>/tools/render-opencode-routing-overlay.mjs \
    <profile> --recovery-permit <recovery-permit.json>
)" \
  opencode serve ...
```

The renderer changes only the permitted reviewer agent. Execute only the reoffered provider-owned slot. If it is admitted, continue the same lineage. If it fails, HUMAN STOP.

The permit authorizes exactly one recovery attempt. Do not retry V4 first or again, RESET, new-START, new-ASSESS, skip the lens, use another fallback model, or change the implementation profile inside the active lineage.

## 9. Correction and validation

A correction is allowed only when Gentle grants bounded correction authority. Keep it inside that boundary, rerun required deterministic checks and follow provider-issued continuation. After `acknowledge-approved` returns burned authority, do not re-review an unchanged candidate merely to prove closure.

## 10. Efficiency capture

Telemetry is non-blocking and adds no model calls. At each ticket boundary, retain usage artifacts already produced by Pi/OpenCode plus ASSESS/STATUS facts when practical. Use `tools/extract-execution-usage.mjs` to normalize Pi/OpenCode session usage. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

Record failed/recovery attempts so reasoning-only zero-output cost remains visible instead of disappearing into aggregate review usage.

## 11. Supervisor escalation

The supervisor may answer procedural questions already resolved by durable authority. HUMAN STOP for new/broadened scope, changed acceptance/product meaning, weakened oracle, destructive action, publication authority, unqualified recovery route or provider/runtime refusal without a current safe continuation.

## 12. Fallback and publication

A concrete Pi runtime/tooling failure may switch implementation to qualified OpenCode Build V1 under the same prepared contract. Do not re-enter ODD.

Review approval is evidence, not push/PR/merge/deploy authority.
