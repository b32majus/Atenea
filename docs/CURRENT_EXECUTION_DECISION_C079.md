# C-079 — Normalize required-lens zero-output and bound recovery to qualified routes

Status: **CURRENT EXECUTION DECISION**  
Accepted: 2026-09-29

C-079 preserves C-077's Pi-first prepared-ticket topology and all C-078 hardening: adaptive Gentle-owned RDD, per-process OpenCode review routing, bounded same-lineage recovery and zero-call efficiency telemetry. It does not restore ODD, `gentle-orchestrator`, OpenCode-first implementation or any Atenea-owned review controller.

## Field evidence that triggered this decision

C-078 qualified one narrow failure/recovery path after PsO Valme repeatedly produced a required `review-resilience` Task on `nan/deepseek-v4-flash` that completed reasoning-only with no capturable result and surfaced typed `opencode_task_output_empty`.

PROMueve Reuma Foundation train #454 then exposed the same mechanical class on a different required lens:

```text
candidate  a5d6295
lineage    review-848de2928389af29
lens       review-reliability
model      nan/deepseek-v4-flash
result     reason=length / output=0 / no reviewer JSON
```

The candidate passed deterministic and browser QA; no product repair was consumed. The current C-078 route could not legally recover because it was scoped only to `review-resilience` plus the provider-typed empty-output error.

Historical Atenea reviewer evidence already records the same `review-reliability` DeepSeek empty-output/length class and an accepted Luna-high reliability route. C-079 combines that role-specific evidence with the new real C-078 field incident. It does **not** generalize model fallback to other lenses.

Detailed current evidence: `docs/C079_FIELD_EVIDENCE_20260929.md`.

## 1. Topology and review ownership do not change

```text
Pi supervisor + Herdr
→ ONE plain Pi implementation worker
→ deterministic evidence
→ candidate commit
→ Gentle ASSESS / native lifecycle
→ OpenCode V1 transport only when provider-issued collection is due
→ checkpoint / next-or-STOP
```

Gentle alone owns candidate risk, review timing, required lens selection, correction authority, verdicts and burn. Atenea may classify a transport observation and render an already-qualified recovery route; it does not create a review transition.

## 2. One durable zero-output failure class

A completed **required** reviewer slot with no capturable result is normalized locally as:

```text
schema   atenea.review-zero-output/v1
code     required_lens_zero_output
mutation_outcome = not_started
```

The classifier is deterministic and adds no model call:

```bash
node tools/classify-required-lens-zero-output.mjs <normalized-observation.json>
```

It classifies either:

- provider-typed `opencode_task_output_empty`; or
- a terminal/completed reviewer observation with explicit empty capturable output and `output_tokens=0`.

The typed record preserves at least:

```text
lens
model
reason
candidate
lineage
revision
target
mutation_outcome
```

A zero-output record is **failure evidence, not fallback authority**. If the exact lens/model pair has no qualified route, the next action is `human_stop`.

## 3. Stop useless parent/retry loops early

Once a required reviewer Task has terminal zero-output evidence, the review host must not continue narrating, retry the same model, or spin through another parent loop merely hoping for JSON.

```text
terminal required-lens zero-output
→ classify once
→ stop the failed host
→ bound STATUS
→ exact-same-slot recovery permit OR HUMAN STOP
```

A timeout that kills a still-running reviewer is not automatically classified as terminal zero-output.

## 4. Bound STATUS is a separate authorization barrier

Recovery requires a fresh bound STATUS proving the exact candidate and slot are still live. Normalize that provider result and authorize it with:

```bash
node tools/authorize-required-lens-recovery.mjs \
  <typed-failure.json> \
  <normalized-bound-status.json>
```

The authorizer fails closed unless all of these are unchanged:

```text
candidate
lineage
revision
target
required lens
```

and STATUS is explicitly bound and reoffers `collect` for the same lens.

The resulting permit is:

```text
schema atenea.review-zero-output-recovery-permit/v1
attempt = 1
max_attempts = 1
new_start = false
mutate_global_profile = false
```

No permit means no model-route recovery.

## 5. Exactly two qualified recovery routes

Current qualified zero-output routes are:

| Required lens | Trigger model | Recovery | Evidence status |
|---|---|---|---|
| `review-resilience` | `nan/deepseek-v4-flash` | GPT-6 Luna high | preserved from C-078 |
| `review-reliability` | `nan/deepseek-v4-flash` | GPT-6 Luna high | C-079 role-specific qualification |

The default profile snapshots do **not** change.

In `production-volume`, reliability is normally V4, so the new reliability recovery can apply after a matching typed failure and permit.

In `complex`, reliability is already Luna xhigh. A V4 reliability permit is therefore invalid for that profile and the renderer must reject it.

## 6. Recovery rendering is evidence-bound and single-lens

Start a fresh isolated review host only after the permit exists:

```bash
OPENCODE_CONFIG_CONTENT="$(
  node tools/render-opencode-routing-overlay.mjs \
    <production-volume|complex> \
    --recovery-permit <permit.json>
)" \
  opencode serve ...
```

The renderer verifies the permit against current policy and the selected profile, then changes **only the one permitted reviewer agent**. It rejects:

- an unknown/unqualified route;
- a second/multi recovery;
- profile/trigger-model mismatch;
- malformed permit invariants;
- the old free-form `--resilience-recovery-luna` switch.

## 7. Forbidden continuations

C-079 does not authorize:

- repeated same-model retries after terminal zero-output;
- RESET, ABANDON or new START merely to change reviewer route;
- a new ASSESS for an unchanged preserved candidate;
- model carousel or generic Luna fallback;
- lens substitution or skipping;
- global `~/.config/opencode/opencode.json` mutation;
- changing implementation profile inside an active candidate/review lineage.

If the one qualified recovery does not produce an admitted result, **HUMAN STOP**.

## 8. Publication and product boundaries remain unchanged

Material product/scope/acceptance/oracle/destructive/publication decisions remain HUMAN STOP. Reviewer recovery changes transport availability, not product meaning. Review approval still does not grant push/PR/merge/deploy authority.
