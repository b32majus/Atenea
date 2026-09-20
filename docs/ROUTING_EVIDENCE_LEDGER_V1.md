# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-20

Model/provider choices are replaceable operational configuration. They do not redefine Atenea ownership.

## 1. Current role map

| Role / phase | Current route | Effort | Interpretation |
|---|---|---:|---|
| Pi ordinary default | `nan/deepseek-v4-flash` | `medium` | User default; DeepSeek V4.1 Flash is served by NaN under `deepseek-v4-flash`. |
| Persistent parent / train coordinator | `nan/glm5.3-flash` | `high` | Preserves the qualified GLM coordinator role; launch explicitly. |
| `gentle-ai-worker` | `nan/glm5.3-flash` | `high` | Prior adopted writer role, provider migrated to NaN. |
| `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` | Prior qualified verifier route retained. |
| `review-readability` | `openai-codex/gpt-5.6-luna` | `high` | Prior readability route retained. |
| `review-reliability` | `nan/deepseek-v4-flash` | `high` | Prior V4.1 material-behavior role, provider migrated to NaN. |
| `review-resilience` | `nan/deepseek-v4-flash` | `high` | Prior V4.1 failure/recovery role, provider migrated to NaN. |
| `review-risk` | `nan/deepseek-v4-flash` | `high` | Prior V4.1 security/authorization role, provider migrated to NaN. |
| `review-refuter` | `nan/deepseek-v4-flash` | `high` | GP3.3 compatibility/adoption mapping for the explicit v9 role slot. |
| `review-validator` | `openai-codex/gpt-5.6-luna` | `high` | GP3.3 compatibility/adoption mapping for the explicit v9 role slot. |

## 2. Provider/model literals

NaN exposes `nan/deepseek-v4-flash` and `nan/glm5.3-flash`. The first is the DeepSeek V4.1 Flash family under NaN's model id. Luna remains `openai-codex/gpt-5.6-luna`.

## 3. Machine-global authority

```text
~/.pi/gentle-ai/models.json
~/.pi/agent/subagents.json
~/.pi/gentle-ai/profiles.json
```

The active profile is `atenea-one-touch`. It intentionally contains no `orchestrator` entry, so it does not change Pi's ordinary V4-medium default. The train parent is launched explicitly on GLM high.

Atenea publishes `.pi/gentle-ai/profile.json` naming `atenea-one-touch`; each machine must have that profile installed. Project-local overrides outrank machine-global configuration and must be detected before pinned work.

## 4. GP3.3 role-routing change

Under GP2.7, refuter/validator were intentionally unpinned. Under the current v9 host-mediated role contract, Gentle Pi 3.3 requires configured routing and refuses typed when missing. The new refuter/validator pins are GP3.3 compatibility/adoption mappings, not retroactive Sep-12 evidence.

## 5. Preserved Sep-12 evidence

The role-diverse design remains grounded in Sep-12 evidence: GLM for coordinator/writer; Luna for fresh verification/readability; DeepSeek V4.1 for material reliability/resilience/risk. Full historical evidence: `docs/ROUTING_QUALIFICATION_EVIDENCE_20260912.md`.

## 6. No silent fallback

Every pinned role resolves the exact provider/model/effort or fails closed. Pi's ordinary default is not an implicit fallback for review roles.
