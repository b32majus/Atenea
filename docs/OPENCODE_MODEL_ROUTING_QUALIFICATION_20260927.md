# Atenea — OpenCode model routing qualification

Status: **CURRENT ROUTING EVIDENCE — amended 2026-09-28 by upstream-orchestrator canary**
Date: 2026-09-27

## Decision supported

Atenea uses two current OpenCode routing profiles:

- `production-volume` — default route for ordinary bounded tickets/trains;
- `complex` — triggered only by concrete material complexity.

SDD is not part of the ordinary Atenea train. Historical Pi profiles remain provenance only.

The routing goal is not quota balancing by itself. A model receives a role only when its observed behavior fits that role; quota and provider diversity break ties between routes that are already good enough.

## Available families used

Current usable routes are DeepSeek V4 Flash, GLM 5.3 Flash and MiMo 2.6 Flash through NaN plus GPT-6 Luna through OpenAI OAuth. GLM 5.3 full is not included in the operator's NaN membership and is not a route or fallback. GPT-6 Sol is reserved for bounded severe-finding escalation in `complex`, not normal-path work.
## Writer microbenchmark

Same repository, same bounded implementation prompt and a hidden oracle unknown to the model:

| Model | Wall | Approx tokens | Model tests | Hidden oracle | Scope |
|---|---:|---:|---|---|---|
| DeepSeek V4 Flash | 22.0 s | 6.6k | PASS | PASS | clean |
| GPT-6 Luna high | 49.7 s | 4.4k | PASS | PASS | clean |
| GLM 5.3 Flash high | 61.5 s | 6.4k | PASS | PASS | clean |
| MiMo 2.6 Flash | 67.5 s | 7.0k | PASS | PASS | clean |

V4 therefore remains the volume writer. GLM remains the complex writer because of its established coding/agentic route and controllable reasoning. MiMo is competent but has no writer advantage over those two.

## Frozen-candidate review microbenchmark

All four models reviewed the same inclusive-boundary defect. All detected the defect with no substantive false positive. V4 and Luna were fastest; MiMo was more exhaustive but slower. This establishes MiMo as review-capable, not as a replacement for the evidence-backed readability/reliability/risk assignments.
## MiMo 2.6 lifecycle-host qualification

A fresh two-ticket zero-touch train used GLM 5.3 Flash writers and MiMo 2.6 Flash as the primary Gentle lifecycle host.

Result:

- 2/2 writer deterministic test gates PASS;
- 2/2 native Gentle START/consent paths PASS;
- 2/2 reviewer Task/capture paths PASS;
- 2/2 terminal acknowledge/burn PASS;
- 2/2 Git checkpoints PASS;
- final worktree clean;
- `HUMAN_TOUCH_AFTER_LAUNCH=0`.

MiMo host turns were about 67.3 s / 15.7k tokens and 76.5 s / 16.0k tokens. Timing is supporting evidence, not a contract. The important result is repeated protocol correctness across consecutive lineages.

Evidence root: `/srv/kairos-lab/outbox/mimo26-lifecycle-2ticket-20260927`.
## Refuter comparison

One inferential batch contained a corroborated claim, a refuted claim and a claim with insufficient evidence. All four routes returned the exact three expected dispositions.

| Model | Result | Wall |
|---|---|---:|
| MiMo 2.6 Flash | 3/3 correct | 37.7 s |
| DeepSeek V4 Flash | 3/3 correct | 18.6 s |
| GLM 5.3 Flash high | 3/3 correct | 28.8 s |
| GPT-6 Luna xhigh | 3/3 correct | 18.7 s |

MiMo is slower but fully correct and provides a fourth independent family. That independence is useful for `production-volume` refutation, where the severe candidate may have originated from V4, GLM or Luna.

## Judgment-day Judge A comparison

All four routes found the planted strict-validation defect. MiMo, V4 and Luna consolidated the shared validation root into one finding. GLM split it into two findings and escalated one to BLOCKER. Luna was the best severity calibrator (WARNING); MiMo and V4 returned CRITICAL.

MiMo therefore qualifies as Judge A when paired with Luna Judge B: it supplies independent adversarial reasoning without reproducing GLM's observed finding fragmentation. Severity calibration remains a reason to retain Luna as Judge B.

Evidence root: `/srv/kairos-lab/outbox/mimo-refuter-judge-bench-20260927`.
## Final role interpretation — current after 2026-09-28 canary

`production-volume` uses GLM 5.3 Flash high for upstream `gentle-orchestrator`; V4 for `explore`, `general`, and resilience; Luna high for readability, reliability and validation; GLM high for risk/correction; and MiMo for refutation/Judge A.

`complex` keeps the orchestrator on GLM high, keeps `explore` + independent resilience on V4, moves `general` and correction to GLM high, uses Luna xhigh for reliability/risk, retains MiMo as Judge A, and uses Sol only for `review-refuter`. Refuter is not a happy-path role: Sol therefore consumes nothing unless a severe finding actually requires adversarial adjudication.

No automatic fallback to Sol is authorized. Additional Sol use requires an explicit bounded escalation such as unresolved material cross-model disagreement or repeated failure to resolve the same critical defect.

The current profile snapshots are:

- `config/native-gentle/opencode-production-volume.profile.json`;
- `config/native-gentle/opencode-complex.profile.json`;
- selection/escalation policy: `config/native-gentle/opencode-routing-policy.json`.
## Cross-model Task routing proof

A final isolated canary pinned `review-reliability` to `nan/deepseek-v4-flash` while the primary lifecycle host remained `nan/mimo-v2.6-flash`. The lineage completed collect → Task → capture → approve → acknowledge/burn.

OpenCode server evidence showed the parent session streaming as `agent=atenea-review-host modelID=mimo-v2.6-flash` and the child Task session streaming as `agent=review-reliability modelID=deepseek-v4-flash`. Agent-level model pins therefore override parent-host routing as required by the profile design.

Evidence root: `/srv/kairos-lab/outbox/mimo26-host-v4-reviewer-canary-20260927`.

## 2026-09-28 upstream-orchestrator correction

The MiMo 2.6 lifecycle-host train remains valid evidence for a thin protocol host, but that role is not equivalent to Gentle's full `gentle-orchestrator`, which owns ODD proportionality, exploration/delegation and native lifecycle decisions. C-076 therefore keeps the full orchestrator on GLM 5.3 Flash high in both current profiles.

The high-risk re-entry canary also superseded production `review-reliability = V4`. V4 produced four consecutive empty Task outputs for the exact reliability slot while a V4 resilience slot in the same lineage completed. After changing only reliability to GPT-6 Luna high, the exact bound slot returned a valid artifact and the same lineage reached terminal acknowledgement/consumption. This is role-specific routing evidence, not a claim that V4 is generally unhealthy.

The earlier MiMo-host/V4-reviewer cross-model proof remains useful evidence that child agent pins override a primary host. Its `atenea-review-host` parent is historical after C-076, not the current ordinary topology.

Evidence: `docs/OPENCODE_GENTLE_ORCHESTRATOR_QUALIFICATION_20260928.md`.