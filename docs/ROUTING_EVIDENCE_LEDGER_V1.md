# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-20

Model/provider choices are replaceable operational configuration. They do not redefine Atenea ownership.

## 1. Current role map

| Role / phase | Current route | Effort | Interpretation |
|---|---|---:|---|
| Pi ordinary default | `nan/deepseek-v4-flash` | `medium` | User default; DeepSeek V4.1 Flash is served by NaN under `deepseek-v4-flash`. |
| Persistent parent / train coordinator | `nan/glm5.3-flash` | `high` | Qualified coordinator route; launch explicitly. |
| `gentle-ai-worker` | `nan/glm5.3-flash` | `high` | Qualified writer route, provider migrated to NaN. |
| `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` | Qualified independent verifier route. |
| `review-readability` | `openai-codex/gpt-5.6-luna` | `high` | Better severity calibration / lower review inflation in Sep-12 evidence. |
| `review-reliability` | `openai-codex/gpt-5.6-luna` | `high` | Provisional current route: Luna was acceptable in Sep-12; the only current NaN DeepSeek reliability failure is ASSESS-bypass-confounded, so DeepSeek remains historical evidence rather than current routing. |
| `review-resilience` | `nan/deepseek-v4-flash` | `high` | Current global route retained. A coarse ~1,100-line high-risk work unit later produced the same empty-output/length failure on DeepSeek High and Luna High, so that evidence is treated as a composition/material-review boundary, not a DeepSeek-only disqualification. |
| `review-risk` | `nan/glm5.3-flash` | `high` | Sep-20 NaN runtime override: exact materialized risk prompt exhausted DeepSeek reasoning but completed on GLM. |
| `review-refuter` | `nan/deepseek-v4-flash` | `high` | GP3.3 explicit role mapping; no contrary current field evidence. |
| `review-validator` | `openai-codex/gpt-5.6-luna` | `high` | GP3.3 explicit role mapping. |

## 2. Provider/model literals

NaN exposes `nan/deepseek-v4-flash` and `nan/glm5.3-flash`. Luna remains `openai-codex/gpt-5.6-luna`.

Current NaN output ceilings:

```text
DeepSeek = 32768
GLM      = 32768
```

DeepSeek `reasoning_effort` is non-operative under NaN. GLM supports effective `low/medium/high/max`.

See `docs/NAN_PROVIDER_CAPABILITIES_V1.md`.

## 3. Machine-global authority

```text
~/.pi/gentle-ai/models.json
~/.pi/agent/subagents.json
~/.pi/gentle-ai/profiles.json
```

The active profile is `atenea-one-touch`. It intentionally contains no `orchestrator` entry, so it does not change Pi's ordinary DeepSeek-medium default. The train parent is launched explicitly on GLM high.

Atenea publishes `.pi/gentle-ai/profile.json` naming `atenea-one-touch`; each machine must have that profile installed. Project-local overrides outrank machine-global configuration and must be detected before pinned work.

## 4. Why risk differs from the Sep-12 route

Sep-12 role qualification preferred DeepSeek V4.1 for reliability, resilience and risk, while Luna won readability. That result remains historical evidence for the tested provider/candidates.

Sep-20 NaN field evidence added a new operational constraint:

```text
same provider-materialized review-risk prompt
DeepSeek → thinking-only → stopReason=length → no final text
GLM high → valid reviewer JSON in ~8.5 s
```

Therefore only `review-risk` moves to GLM. This does not erase the known Sep-12 quality trade-off: GLM previously over-fragmented one authorization root cause into multiple blockers. Current field operability outweighs that earlier calibration advantage for this role, and the trade-off remains visible.

Later same-day resilience evidence must not be misread as another route-only failure: the same correctly ASSESSed coarse candidate (~75 KiB resilience material) failed on DeepSeek High and Luna High. After coherent unpublished-history reconstruction, a real ~12 KiB resilience material completed successfully and all four lenses were admitted. The global resilience route therefore remains unchanged while `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` becomes the composition guard for future substantial work; runtime prompt-budget characterization is tracked in #91.

Evidence: `docs/NAN_DEEPSEEK_INPROCESS_REVIEWER_INCIDENT_20260920.md`.

## 5. Review timing is not routing

Model routing does not decide **when** review runs.

The timing/slicing boundary is owned by Gentle Shell/ODD + native Gentle assessment:

```text
work-unit commit
→ gentle_review assess
→ provider review_due / review_due_reason
→ provider-owned continuation
```

Do not use candidate size or external-ticket completion as an Atenea-owned review trigger.

Evidence: `docs/ODD_REVIEW_ASSESS_BYPASS_EVIDENCE_20260920.md`.

## 6. GP3.3 explicit-role change

Under GP2.7, refuter/validator were intentionally unpinned. Under the current v9 host-mediated role contract, GP3.3 requires configured routing and fails typed when missing. Current refuter/validator pins are GP3.3 adoption mappings, not retroactive Sep-12 claims.

## 7. No silent fallback

Every pinned role resolves the exact provider/model/effort or fails closed. Pi's ordinary default is not an implicit fallback for review roles.

OpenCode Go is not an operational subscription and is not a current Atenea route/fallback.
