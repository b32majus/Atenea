# Atenea — Prepared-ticket Pi runtime v1

Status: **CURRENT PRODUCTIVE PATH FOR PREPARED WORK — C-078 HARDENED**
Date: 2026-09-28

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

Before any OpenCode collection host, render the matching routing profile for that process:

```bash
export OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs <profile>)"
opencode serve ...
```

Prefer setting the environment only on the child process rather than exporting it in a long-lived shared shell. Do not log the rendered config under shell tracing. Do not use `tools/apply-opencode-routing-profile.mjs` for train routing and do not modify `~/.config/opencode/opencode.json` while trains are active.

Preserve exact lineage/revision/target after START and follow provider-issued transitions literally.

## 6. `review-resilience` empty-output recovery

If the required slot is `review-resilience`, default route is V4, and the host returns typed `opencode_task_output_empty`:

1. stop that host cleanly;
2. query bound STATUS with the existing lineage/target/revision;
3. verify it reoffers the exact same slot;
4. start one fresh host with:

```bash
OPENCODE_CONFIG_CONTENT="$(node <ATENEA>/tools/render-opencode-routing-overlay.mjs <profile> --resilience-recovery-luna)" \
  opencode serve ...
```

5. execute only the reoffered provider-owned slot;
6. if admitted, continue the same lineage;
7. otherwise HUMAN STOP.

Do not retry V4 again first. Do not RESET, new-START, skip the lens or try additional models.

## 7. Correction and validation

A correction is allowed only when Gentle grants bounded correction authority. Keep it inside that boundary, rerun required deterministic checks and follow provider-issued continuation. After `acknowledge-approved` returns burned authority, do not re-review an unchanged candidate merely to prove closure.

## 8. Efficiency capture

Telemetry is non-blocking and adds no model calls. At each ticket boundary, retain usage artifacts already produced by Pi/OpenCode plus ASSESS/STATUS facts when practical. Use `tools/extract-execution-usage.mjs` to normalize Pi/OpenCode session usage. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

## 9. Supervisor escalation

The supervisor may answer procedural questions already resolved by durable authority. HUMAN STOP for new/broadened scope, changed acceptance/product meaning, weakened oracle, destructive action, publication authority or provider/runtime refusal without a current safe continuation.

## 10. Fallback and publication

A concrete Pi runtime/tooling failure may switch implementation to qualified OpenCode Build V1 under the same prepared contract. Do not re-enter ODD.

Review approval is evidence, not push/PR/merge/deploy authority.
