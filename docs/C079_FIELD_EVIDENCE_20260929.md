# C-079 field evidence — required-lens zero-output

Status: **HISTORICAL / SUPERSEDED BY C-083 — PRESERVED PROVENANCE**

Current execution authority is `docs/START_HERE.md` + `docs/CURRENT_EXECUTION_DECISION_C083.md`. Do not use this document as a current runbook or routing contract.
Date: 2026-09-29

## 1. Preserved C-078 evidence

C-078 was promoted after PsO Valme reproduced a required `review-resilience` slot on `nan/deepseek-v4-flash` that completed with reasoning but no capturable reviewer result, surfacing `opencode_task_output_empty`. Candidate and lineage remained stable across fresh hosts. Atenea #91 contained independent earlier role/provider evidence, and Luna could complete the role-specific recovery route.

C-078 therefore authorized exactly one same-lineage fresh-host Luna-high attempt for that `review-resilience` failure class.

## 2. PROMueve #454 adds a second required lens

PROMueve Reuma Foundation train #454 ran on C-078 authority.

Preserved state at STOP:

```text
canonical base  cb748091e19e39ef3db347398a75db13b36f8afc
candidate       a5d6295
lineage         review-848de2928389af29
risk            medium / review_due=true
focus lens      review-reliability
model           nan/deepseek-v4-flash
product repair  none
```

The candidate had already passed its deterministic evidence and independent browser QA.

Review collection failed at transport/model completion rather than product mutation:

- one host timed out while still mid-turn and was inconclusive;
- one host produced analysis but no required reviewer JSON and drifted into empty parent narration;
- a fresh host reproduced two terminal `reason=length` reviewer completions with reasoning usage and `output=0`.

No reviewer result was admitted, no candidate mutation occurred and the existing lineage remained unconsumed in `collect`.

## 3. Why C-078 correctly STOPped

C-078 permitted recovery only for:

```text
review-resilience
+ nan/deepseek-v4-flash
+ typed opencode_task_output_empty
```

PROMueve instead had:

```text
review-reliability
+ nan/deepseek-v4-flash
+ terminal reason=length / output=0
```

The supervisor therefore had no current authority to substitute Luna. STOP preserved the candidate and lineage correctly.

## 4. Reliability-specific historical evidence

Atenea's existing reviewer incident record already documents a `review-reliability` DeepSeek empty-output/length observation and records Luna high as an acceptable reliability route from the Sep-12 qualification. Current routing evidence also keeps Luna as the normal `complex` reliability family while production-volume intentionally retains V4 for diversity and volume.

That prior role evidence plus the new real C-078 field reproduction supports one narrow recovery route:

```text
production-volume review-reliability
V4 terminal zero-output
→ same candidate/lineage/revision/target
→ bound STATUS reoffers exact slot
→ one fresh Luna-high attempt
```

It does not establish that V4 reliability is globally defective. V4 remains the production-volume default.

## 5. New deterministic hardening

C-079 adds three local, zero-LLM surfaces:

```text
classify-required-lens-zero-output.mjs
authorize-required-lens-recovery.mjs
render-opencode-routing-overlay.mjs --recovery-permit ...
```

The first normalizes terminal zero-output once that terminal observation is exposed by the qualified transport/supervisor. The second checks exact bound-STATUS identity and slot continuity. The third can change only the qualified reviewer agent encoded by the permit.

C-079 does not add an in-process OpenCode Task-event interceptor. Therefore its fail-fast guarantee begins at the **first observable terminal transport event**, not at a hidden internal child event. If OpenCode delays exposing child termination until the parent turn closes, that latency remains runtime observability debt rather than a reason to add a second controller.

Conformance proves:

- reliability `length + output=0` classifies to a qualified failure once observed;
- C-078 resilience typed empty-output remains qualified;
- an unqualified lens/model classifies but can only HUMAN STOP;
- candidate/lineage/revision/target or slot drift rejects authorization;
- a slot with a prior recovery attempt rejects a second permit;
- production reliability recovery changes only `review-reliability` to Luna high;
- complex rejects the V4 reliability permit because its current default reliability route is already Luna;
- the legacy free-form recovery flag is rejected;
- normal profile defaults remain unchanged.

## 6. PROMueve resumption boundary

C-079 does not mutate PROMueve.

After C-079 is promoted, the preserved PROMueve state may resume only by reconciling the exact existing lineage and candidate, obtaining bound STATUS for the existing `review-reliability` slot and using the C-079 permit path. No new ASSESS, START or candidate reconstruction is implied by this document.
