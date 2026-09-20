# Material in-process reviewer exhaustion incident — initially observed on NaN DeepSeek

Status: **OPEN RUNTIME / COMPOSITION INCIDENT**
Date: 2026-09-20

This document began as a NaN DeepSeek-specific incident record. Later same-day field evidence showed that the broader failure class is **not provider-specific**: an oversized/coarse high-risk resilience candidate produced the same `reviewer-empty-output / stopReason=length` signature on both DeepSeek High and Luna High. The role-specific `review-risk → GLM` mitigation remains valid, but the general root cause must not be simplified to "DeepSeek is broken".

This incident is separate from the ODD/native-assess boundary bypass documented in `docs/ODD_REVIEW_ASSESS_BYPASS_EVIDENCE_20260920.md`, and is now also governed by the pre-implementation composition policy in `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`.

## 1. Repeated field signature

Two independent review situations have produced the same NaN DeepSeek in-process reviewer failure signature:

```text
reviewer-empty-output
stopReason=length
text=""
mutation_performed=false
```

### Reliability observation

A Symphonia `review-reliability` slot showed the signature on a `medium` candidate that had incorrectly accumulated to 1,358 changed lines because the parent skipped native `assess`.

That observation is confounded by the confirmed assessment-boundary defect and must not be used alone to disqualify DeepSeek.

### Risk observation — independent of medium slicing

Lineage:

```text
review-c42518a7b4f979b9
risk tier: high
changed files: 6
original_changed_lines: 884
selected lenses: review-risk, review-resilience, review-readability, review-reliability
```

Because the candidate is `high`, native policy makes review due immediately; the ~400-line medium-slice threshold is not applicable.

The first slot, `review-risk`, failed seven times across four Pi sessions/runtime configurations with the same empty-output/length signature. The candidate and lineage remained intact; no reviewer result was admitted and no authority burn occurred.

## 2. The 65536 client declaration did not solve it

During diagnosis, Pi/OpenCode were temporarily configured with `65536` client output declarations. DeepSeek was also corrected to `supportsReasoningEffort=false`.

The real `review-risk` failure still reproduced.

NaN's current Pi, VS Code and other-tools documentation publishes `32768` as the answer ceiling for this model family. OpenCode's statement that `limit.output` is a client-side budget does not mean the provider/model grants a larger hard ceiling.

Therefore Atenea has reverted the local declaration to the documented `32768`. A larger local number is not a valid fix.

## 3. Isolated in-process diagnostics

Gentle Pi's reviewer core is:

```text
live Pi ModelRegistry
→ resolve model + auth
→ completeSimple(model, one frozen user prompt, options)
→ no system prompt
→ no tools
→ no session
→ no retries
```

### Trivial prompt

The exact runner was reproduced outside any review lineage using the live Pi registry/auth:

```text
nan/deepseek-v4-flash
  prompt: Return exactly the single word OK.
  result: text "OK"
  elapsed: 1.738 s

openai-codex/gpt-5.6-luna
  prompt: same
  result: text "OK"
  elapsed: 2.346 s
```

This excludes a general auth, registry, endpoint or in-process transport failure.

### Exact provider-materialized review-risk prompt

The exact current provider-owned `review-risk` binding was extracted from preserved Pi session evidence and materialized read-only with the provider-issued `review.capture-result --materialize=true` operation.

```text
lineage      review-c42518a7b4f979b9
lens         review-risk
prompt bytes 52374
prompt SHA   4de847942086c7ad02c8473bf52f05ca205abf65289aabc26269e7f011cdcdfb
materialize  exit 0
mutation     none
```

The same in-process runner then reproduced the failure outside any lineage:

```text
model                    nan/deepseek-v4-flash
Pi local maxTokens       65536 during the diagnostic
provider settlement      stopReason=length
rawStopReason            length
content types            ["thinking"]
answer text length       0
elapsed                  47.900 s
usage reported           0/0/0/0 by the provider response
result                   refused / empty-output
```

This is the same failure class seen in real review capture. It occurs without submission, review-state mutation or live-lineage effects.

The local `65536` declaration did not grant additional usable provider output. The machine has since been restored to NaN's documented `32768` response ceiling.

### Same frozen prompt on GLM 5.3 Flash High

The identical 52,374-byte provider-materialized prompt was then sent through the same in-process runner with `nan/glm5.3-flash` `high` and the documented `32768` ceiling:

```text
provider settlement      stopReason=stop
input tokens             13588
output tokens            559
reasoning tokens         129
total tokens             14147
content types            ["thinking", "text"]
answer text length       1914
elapsed                  9.384 s
subject hash             exact expected hash
inspection               completed for all 6 changed paths
result                   valid reviewer JSON
```

No result was submitted to the live review lineage. This demonstrates that the current risk prompt is operationally viable through GLM while reproducing DeepSeek reasoning exhaustion under the same host relay.

A separate Luna High diagnostic on the same prompt did not produce a final answer within an intentionally shorter 180-second probe timeout; because the production reviewer timeout is much larger, that probe is not classified as a provider failure and is not used to justify the risk route.

## 4. Later resilience evidence — same failure across providers on a coarse work unit

A later real-project lineage was correctly processed through native ASSESS and became immediately review-due because it was `high` risk. Its candidate was materially coarser than Gentle's default composition target:

```text
risk tier              high
changed paths          17
authored changed lines ~1105
materialized resilience prompt ~75 KiB
ASSESS                  correctly invoked
review_due              true / high_risk
```

The exact `review-resilience` slot failed twice on NaN DeepSeek High with `reviewer-empty-output / stopReason=length`.

A repo-local, single-role Luna High override was then applied only to that clone and the exact slot was reoffered by fresh STATUS. One authorized capture failed with the **same signature** after ~147 s:

```text
openai-codex/gpt-5.6-luna · high
→ reviewer-empty-output
→ stopReason=length
→ no admitted result
```

Read-only out-of-line probes on the exact materialized prompt showed:

```text
DeepSeek High  → thinking-only / length / no answer text
GLM High       → terminated/error / no answer text
Luna High      → length in the real slot
Luna Medium    → valid reviewer JSON in ~13.2 s
Luna Low       → valid reviewer JSON in ~16.5 s
```

This proves that lowering effort can mitigate this exact prompt, but **does not establish `high` as a bad global configuration**. Gentleman's own current NaN development routing uses `high` for review-resilience/reliability, and Gentle Shell treats reviewer thinking as user-owned routing forwarded verbatim. The composition of the work unit remains the stronger architectural correction.

The oversized unpublished T02 history was then reconstructed into five coherent work units without changing accepted product content. On WU2.5, the real `review-resilience` materialized prompt was only ~12 KiB and completed successfully on the ordinary current route; all four lenses were admitted and the review reached APPROVED + acknowledgement/burn.

```text
coarse candidate resilience material   ~75 KiB → DeepSeek length / DeepSeek length / Luna length
bounded WU2.5 resilience material       ~12 KiB → successful four-lens review
```

This strengthens the prompt-shape/size × completion/reasoning-budget hypothesis, but does not establish a universal 12/75 KiB threshold.

No global resilience route/effort change is adopted from this evidence. The accepted preventive response for future work is coherent work-unit composition under `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`; role routing remains evidence-specific. Runtime characterization debt is tracked in Atenea #91.

## 5. What is established and what is not

Established:

- the in-process runner itself works with DeepSeek on a trivial prompt;
- the realistic provider-materialized reviewer prompt triggers a DeepSeek completion that spends its response in `thinking` and terminates by `length` before answer text;
- NaN documents DeepSeek `reasoning_effort` as non-operative, so Atenea cannot reliably cap that reasoning phase through `medium/high`;
- the same signature occurs on a legitimate immediate `high` review and therefore is not explained by the medium-slice bug;
- the same coarse resilience slot failed on DeepSeek High and Luna High, while a later ~12 KiB bounded work-unit resilience prompt completed successfully in the real train.

Not established:

- that every DeepSeek reviewer role will fail;
- that prompt byte size alone is causal, or that 12/75 KiB defines a universal threshold;
- that changing the Gentle reviewer schema is warranted;
- that a larger client-side `maxTokens` declaration can bypass NaN's documented model ceiling.

## 6. Current operational mitigation

Current provisional routing:

```text
review-reliability  → openai-codex/gpt-5.6-luna · high   # provisional
review-risk         → nan/glm5.3-flash · high
review-resilience   → nan/deepseek-v4-flash · high
review-refuter      → nan/deepseek-v4-flash · high
```

Luna was already acceptable in the Sep-12 reliability qualification, so it remains the conservative provisional route there. For risk, a fresh exact-prompt diagnostic showed GLM 5.3 Flash High returning valid reviewer JSON in ~9.4 s while DeepSeek returned thinking-only `length`; Gentleman’s current NaN development routing also places `review-risk` on GLM. The historical Sep-12 calibration caveat for GLM risk remains evidence and is not erased by this operational route change.

The later resilience reproduction means that identical retries or blind provider swaps are not the default remedy for a coarse material candidate. STOP, preserve the lineage, and first reconcile whether the work-unit composition violated the current pre-implementation reviewability policy. A role/model/effort change still requires role-specific evidence.

OpenCode Go is not an operational subscription and is not a fallback.

## 7. Closure criteria

Close this incident only when one of these is demonstrated:

- NaN/DeepSeek changes its response/reasoning ceiling behavior and the materialized probe completes;
- upstream Gentle changes reviewer prompting/transport in a way that makes the same frozen prompt complete on DeepSeek;
- a new explicitly qualified route supersedes the affected reviewer roles.

Until then, do not treat DeepSeek NaN material reviewer health as proven merely because trivial prompts work.
