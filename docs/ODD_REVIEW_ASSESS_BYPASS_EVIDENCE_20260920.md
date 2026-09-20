# ODD / native review-assess boundary bypass — field evidence

Status: **CURRENT EXECUTION-INTEGRATION EVIDENCE**
Date: 2026-09-20
Observed project: Symphonia

## 1. Confirmed defect

A substantial work unit reached native review as an accumulated committed candidate without the parent first invoking the qualified read-only native assessment path.

Observed sequence:

```text
implementation / work-unit commit
→ gentle_review inspect
→ native START over the accumulated committed base diff
→ reviewer collection
```

No `gentle_review {"operation":"assess"}` call occurred before START.

The resulting candidate was:

```text
risk tier             medium
changed files         28
changed lines         1358
```

This is an orchestration integration defect. Atenea converted an external-ticket/work-unit completion into a review START instead of allowing Gentle Shell/ODD + native Gentle AI to decide whether review was due and what transition to follow.

## 2. Why this contradicts already-qualified upstream behavior

Atenea had already qualified the GP3.3/GAI3.4 proportional review behavior:

```text
passive → no material review
medium  → accumulate/slice
high    → immediate native review
typed provider next_transition is authoritative
```

See `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`.

Gentle AI 3.4.0 also exposes the provider-owned timing decision through:

```bash
gentle-ai review assess --cwd <repo> [--base-ref <ref> --committed-only] --json
```

The current response includes:

```text
risk
changed_paths
changed_lines
review_due
review_due_reason
next_transition
```

A read-only live assessment on the Atenea reconciliation branch confirmed those fields are present and that `next_transition` is provider-owned. The active GP3.3 compatibility bridge also decodes them into `review_due`, `review_due_reason`, `provider_next_transition` and a host-safe `wrapper_continuation`; the missing step in the observed train was invocation/obedience, not an absent upstream capability.

Atenea therefore has no authority to replace the assessment with a ritual rule such as:

```text
external ticket finished
→ START the whole accumulated ticket
```

## 3. Correct ownership and execution rule

```text
external authority / frontier       → Atenea persistent parent
internal decomposition + work units → Gentle Shell / ODD
review timing / slicing             → native Gentle assessment / ODD
exact candidate lifecycle           → Gentle AI provider authority
publication / merge                 → repository + human policy
```

After a delegated/substantial writer work unit returns and its work-unit identity is durable, the parent must invoke the qualified assessment surface and follow the returned plan/transition. It must not infer review due-ness from ticket completion, candidate size, prose, or an Atenea-owned line-count rule.

For a committed range, the Pi facade form is:

```json
{
  "operation": "assess",
  "input": "{"baseRef":"<work-unit base ref>","committedOnly":true,"writerModelId":"glm5.3-flash","writerEffort":"high"}"
}
```

The exact input must match the actual writer/candidate. This example is explanatory, not a hard-coded command template.

When native/provider authority says review is due, continue through its exact native transition. When it says review is not due, do not manufacture START.

## 4. Scope of this finding

This defect explains why the Symphonia `medium` candidate incorrectly reached review as a 1,358-line accumulated unit.

It does **not** explain every observed DeepSeek reviewer failure. Independent field evidence shows the same `reviewer-empty-output / stopReason=length` signature on a correctly immediate `high` `review-risk` candidate. That is tracked separately in `docs/NAN_DEEPSEEK_INPROCESS_REVIEWER_INCIDENT_20260920.md`.

Do not use this assessment-bypass finding to claim that the DeepSeek reviewer incident is solved.

## 5. GP3.3 / GAI3.4 compatibility bridge

The installed Gentle AI 3.4 native assessment emits `review_due`, `review_due_reason`, `candidate.consumed`, and an exact `next_transition`.

Gentle Pi 3.3.0's published `ReviewAssessmentV1` decoder consumed only risk/size/candidate fields and did not surface those additive timing fields to the parent. That integration gap made it possible for the model-visible workflow to know the risk tier while losing the provider-owned due/transition signal.

Atenea carries a narrow, version/hash-guarded compatibility patch:

```text
patches/gentle-pi-3.3.0-atenea-assess-bridge.patch
```

It does only three things:

1. preserves GAI3.4's additive assessment timing fields;
2. exposes them in the read-only `gentle_review assess` result;
3. when `review_due=true`, provides a host-safe `wrapper_continuation` into `gentle_review STATUS` for the same selector, where the normal negotiated lifecycle returns the exact provider-owned transition.

It does **not** encode the medium-slice threshold, choose a lens, create a lineage, execute START automatically, or manufacture a provider CLI command.

Retirement condition: remove this patch when upstream Gentle Pi natively exposes equivalent GAI3.4 assessment timing/continuation semantics.
