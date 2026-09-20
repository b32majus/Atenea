# NaN DeepSeek `review-reliability` length failure — field evidence

Status: **CURRENT ROUTING EVIDENCE**
Date: 2026-09-20
Project observed: Symphonia

## Observed failure

A real current `review-reliability` capture failed without mutation:

| Field | Observed value |
|---|---|
| `outcome` | `pi-host-relay-transport-failure` |
| `failure.kind` | `reviewer-empty-output` |
| `failure.stage` | `pi` |
| `reviewer.stopReason` | `length` |
| `exit_code` | `null` |
| `timed_out` | `false` |
| elapsed | ~57 s |
| `mutation_performed` | `false` |

Provider message:

```text
Reviewer produced no text for review-reliability (stopReason: length).
```

The candidate/review state remained intact and reoffered the same `collect` slot. No authority burn occurred.

## Candidate integrity at STOP

```text
working tree                 clean
HEAD                         3417ac0… unchanged
lineage                      review-3adb901820bcc92a
state                        reviewing
generation                   1
revision                     sha256:f89c4b25…
target                       sha256:e3487990…
candidate tree               41b71710…
mutation                     none
authority burn               none
next transition              collect / review-reliability reoffered
```

## Interpretation

This was not a product mutation failure and not a reviewer timeout. The reviewer terminated by `length` before producing review text.

Earlier the same day, the machine-level NaN client budget had been raised from `32768` to `65536`. The recurrence means `65536` is useful client-budget headroom but is **not a sufficient routing fix for `review-reliability` on NaN DeepSeek**.

NaN documents that `reasoning_effort` does not control DeepSeek V4 Flash reasoning depth. Therefore Atenea cannot reliably reduce this failure mode by selecting `medium` instead of `high`.

## Routing decision

Do not retry-loop the same role/model merely because the lineage remains reoffered.

Current remediation:

```text
review-reliability
FROM  nan/deepseek-v4-flash · high
TO    openai-codex/gpt-5.6-luna · high
```

Rationale:

- Luna High was already acceptable in the Sep-12 role-specific reliability comparison and found the core reliability defect.
- It preserves reviewer independence from the GLM implementation worker.
- It avoids introducing an unqualified GLM reviewer route.
- OpenCode Go is not an operational subscription and is not an allowed Atenea route merely because a residual credential may report ready.
- Historical Sep-12 DeepSeek evidence remains valid for the provider/model tested then; this current field failure changes the present operational route.

`review-resilience`, `review-risk`, and `review-refuter` remain on NaN DeepSeek until role-specific field evidence requires a change.
