# C-078 field evidence — 2026-09-28

Status: **CURRENT SUPPORTING EVIDENCE**

This document records the real-project evidence used to harden C-077 without reopening its Pi-first implementation topology.

## PROMueve Reuma/Farmacia

Repository: `b32majus/Hub-Clinico-Badajoz`.

Train parent #442 completed child tickets #443, #444 and #445 plus corrective #447. Promotion review found one semantic defect in the autocomplete catalogue: medication categories had been flattened. #447 restored the required `Sistémicos / FAMEs / Biológicos` grouping before publication.

Published candidate: `6b8582a158bdcd6f8e7e425e0e83bc6eb27ca952`.

PR #449 merged into `promueve/nexus-v4`; merge commit: `25e57b250ec3d7cc0fc80a501fa308a40620f902`. The PR records deterministic verification, browser QA, composed `verify:nexus`, clean diff, native Gentle terminal/burn evidence for #447 and successful CI.

Interpretation: the C-077 Pi implementation topology is field-viable end to end. The corrective ticket was a product/promotion semantic finding, not evidence to restore OpenCode-first implementation or ODD.

## PsO Valme

Repository: `b32majus/Hub-Clinico-PsO-Valme`.

Train #1 ran under C-077. Four early candidates were passive/under-budget and correctly produced `review_due=false`, demonstrating that native adaptive RDD remained intact after separating implementation from review.

PSO-02 candidate:

```text
candidate  8ba6420ab4cd36297066b3f8274f448f9807d3a9
lineage    review-0239b91760915b9a
risk       high
RDD        risk/readability/reliability admitted; resilience required
```

The required `review-resilience` slot, routed to `nan/deepseek-v4-flash`, repeatedly completed with reasoning but zero capturable text and typed `opencode_task_output_empty`. Candidate, lineage, revision and target remained stable; no RESET/RECOVER/ABANDON was used. Two fresh-host retries on the same V4 route reproduced the failure and the train stopped fail-closed.

The project operator subsequently completed the local train after bounded recovery. Because the train publication boundary was local-only, the local runtime ledger rather than GitHub issue state is the authority for its final unpublished checkpoints.

Interpretation: repeated same-route retries are wasted work. A typed unavailable result should not become a retry loop or a new lineage.

## Historical corroboration — Atenea #91

Atenea #91 had already reproduced the same `review-resilience` role/provider failure class under an earlier runtime epoch, including on a correctly composed 346-line candidate. Exact-prompt probes showed Luna could complete and pass provider admission while V4 exhausted; GLM produced output but failed provider admission for that exact slot.

That issue deliberately stopped short of global route promotion. The new C-077 PsO reproduction makes a narrow current recovery route justified, but PROMueve/PsO evidence still does not prove that every V4 resilience call fails.

## C-078 consequence

Therefore:

- keep C-077 Pi + Herdr implementation topology;
- preserve Gentle-native 0/1/4 adaptive lens selection;
- keep V4 as the default resilience route for model diversity;
- after typed V4 `opencode_task_output_empty`, do not hammer V4 again;
- require bound STATUS and exact same slot;
- allow one fresh-host recovery of only `review-resilience` on Luna high;
- if that recovery fails, HUMAN STOP;
- isolate OpenCode routing per process so parallel trains cannot race through global config;
- collect runtime-native usage so transport/retry overhead becomes measurable rather than anecdotal.
