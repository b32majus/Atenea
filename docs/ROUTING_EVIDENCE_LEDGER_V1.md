# Atenea — Routing Evidence Ledger v1

Status: **CURRENT OPERATIONAL EVIDENCE**
Date: 2026-09-20

Model/provider choices are replaceable operational configuration. They do not redefine Atenea ownership.

## 1. Current role map

| Role / phase | Current route | Effort | Interpretation |
|---|---|---:|---|
| Pi ordinary default | `nan/deepseek-v4-flash` | `medium` | Current user/default route. |
| Persistent parent / train coordinator | `nan/deepseek-v4-flash` | `medium` | Q11b/final cutover route. |
| All configured Gentle/ODD/SDD worker, verifier and review roles | `nan/deepseek-v4-flash` | `medium` | Final VPS cutover uses one NaN/V4 route; `max_concurrency=1`. |

## 2. Provider/model literal

NaN exposes `nan/deepseek-v4-flash`; this is the DeepSeek V4.1 Flash family under NaN's model id.

## 3. Machine-global authority

```text
~/.pi/gentle-ai/models.json
~/.pi/agent/subagents.json
~/.pi/gentle-ai/profiles.json
```

The active profile is `atenea-one-touch`. The current final cutover maps every configured role to V4 medium and keeps `max_concurrency=1`. Atenea publishes `.pi/gentle-ai/profile.json` naming the profile; project-local overrides outrank machine-global configuration and must be detected before pinned work.

## 4. GP3.3 role-routing change

Under GP2.7, refuter/validator were intentionally unpinned. GP3.3 requires configured routing and refuses typed when a requested host-mediated role lacks a mapping. The current all-V4 profile satisfies those slots explicitly; this is a GP3.3 compatibility/adoption mapping, not retroactive Sep-12 evidence.

## 5. Preserved Sep-12 evidence

The Sep-12 role-diverse GLM/Luna/V4 matrix remains historical qualification evidence. Q11b and the final VPS cutover later selected an all-V4 profile for operational simplicity and NaN-only routing. Full historical evidence: `docs/ROUTING_QUALIFICATION_EVIDENCE_20260912.md`; current adoption evidence: `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`.

## 6. No silent fallback

Every pinned role resolves the exact provider/model/effort or fails closed. Pi's ordinary default is not an implicit fallback for review roles.
