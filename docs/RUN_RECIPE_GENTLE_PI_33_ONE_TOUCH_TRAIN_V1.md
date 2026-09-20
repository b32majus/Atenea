# Atenea — Gentle Pi 3.3 One-Touch Train Recipe v1

Date: 2026-09-20
Status: **CURRENT PINNED EXECUTION RECIPE**

Purpose: make the current Pi/Gentle train reproducible without re-teaching review consent or model routing in every operator prompt.

## 1. Current runtime

```text
Pi                    0.86.1
Herdr                 0.9.0
Gentle Pi             3.3.0
Gentle AI             3.4.0 package-paired
Provider contract     1.2.0
Persona               gentleman
Normal concurrency    1
```

The current path is **ONE-TOUCH**, not zero-touch. One explicit human review-session grant is expected on the first eligible consent-required review in a live Pi session/repository. Later fresh validated review grants in that same live session and canonical Git repository do not require a second review-consent interaction.

## 2. Routing

Pi's ordinary default remains `nan/deepseek-v4-flash` at `medium`. NaN serves the DeepSeek V4.1 Flash family under provider model id `deepseek-v4-flash`.

| Role / phase | Route | Effort |
|---|---|---|
| Persistent parent / train coordinator | `nan/glm5.3-flash` | `high` |
| `gentle-ai-worker` | `nan/glm5.3-flash` | `high` |
| `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` |
| `review-readability` | `openai-codex/gpt-5.6-luna` | `high` |
| `review-reliability` | `nan/deepseek-v4-flash` | `high` |
| `review-resilience` | `nan/deepseek-v4-flash` | `high` |
| `review-risk` | `nan/deepseek-v4-flash` | `high` |
| `review-refuter` | `nan/deepseek-v4-flash` | `high` |
| `review-validator` | `openai-codex/gpt-5.6-luna` | `high` |

The parent route is explicit at launch; it is not inferred from Pi's ordinary V4 default.

## 3. Preflight

Before product mutation verify Pi `0.86.1`, Gentle Pi `3.3.0`, package-local Gentle AI `3.4.0`; auth ready for V4/GLM on NaN and Luna on OpenAI-Codex; active profile `atenea-one-touch`; no unexpected higher-priority project override; and exact repo/worktree/HEAD/delivery state.

Unexpected drift is STOP, not silent fallback.

## 4. Launch the persistent parent

```bash
pi --model nan/glm5.3-flash --thinking high
```

Herdr is visibility/session substrate only. There is no normal external Pi supervisor, pi-intercom consent relay, Herdr RPA consent driver or Atenea review controller.

## 5. Ticket execution

For every newly selected ticket: resolve durable frontier; launch one fresh package-owned `gentle-ai-worker`; reconcile its exact diff and deterministic evidence; complete provider-owned exact-candidate review; complete requested reviewer/refuter/validator operations; require APPROVED plus acknowledgement/burn; create only the authorized checkpoint; then freshly rediscover frontier.

## 6. The one touch

On the first valid consent-required review in the live parent session, select exactly:

```text
Review and allow this session
```

That host action executes the current provider grant for the frozen candidate and allows later **fresh validated provider grants** for the same live Pi SessionManager/session id and canonical Git repository identity, including sibling worktrees. It grants no verdict, acknowledgement, maintenance, delivery, merge or cross-repository authority.

```text
reload                    preserves
new session               ends
resume                    ends
fork                      ends
quit                      ends
process restart           ends
explicit revoke           ends
unrelated repository      requires a new explicit grant
```

A package-owned child may use the parent's permission only through Gentle Pi's bounded parent permission channel and exact pending-target digest.

## 7. Never manufacture the grant

Do not inject `granted`, rewrite provider consent, call internal permission APIs, fake package-child FD3 identity, drive the dialog with RPA, infer permission from `EXECUTION_READY`, or accept model prose as permission.

## 8. Reviewer/refuter/validator routing

Gentle Pi 3.3/Gentle AI 3.4 uses caller-owned explicit routing for in-process review roles. Missing routing fails typed; there is no ambient fallback.

Use the provider-returned operation literally. Ordinary lenses use the requested lens capture form; refuter uses the provider-issued refuter materialize/submission path; targeted validator uses the provider-issued validation path. Do not force every role through one group-capture shape. Preserve opaque bindings/materialization/submission tokens exactly.

## 9. Closure

APPROVED is incomplete until acknowledgement/burn succeeds. Session permission is not reusable verdict authority.

## 10. Operator prompt

```text
Execute the current EXECUTION_READY ticket/train end to end under the current Atenea contract and Gentle Pi 3.3 one-touch recipe.
Remain the persistent visible parent. Use one fresh package-owned implementation child per newly selected ticket, sequentially unless current authority explicitly proves parallel safety.
For every mutating candidate, reconcile the exact diff, run deterministic verification, complete provider-owned review through APPROVED + acknowledgement/burn, then create only the authorized checkpoint before rediscovering the frontier.
Use the current Atenea role routing. Do not merge. Return a factual final report and STOP when the compatible frontier is exhausted or a genuine human-owned boundary appears.
```

## 11. Final report minimum

```text
RUNTIME_VERSIONS=
PARENT_SESSION=
PARENT_VISIBLE_IN_HERDR=YES
PARENT_MODEL=nan/glm5.3-flash high
TICKETS_ATTEMPTED=
FRESH_CHILD_TASK_IDS=
ONE_TOUCH_REVIEW_SESSION_GRANT=0|1
ADDITIONAL_REVIEW_CONSENT_TOUCHES=0 expected
LINEAGES=
REVIEW_ROUTES=
REVIEW_OUTCOMES=
ACK_BURN=
DETERMINISTIC_TESTS_QA=
CHECKPOINTS=
HERDR_RPA=0
EXTERNAL_SUPERVISOR=0
ATENEA_RDD_RELAY=0
PUBLICATION=
MERGE=NO unless separately authorized
FINAL_STOP_REASON=
```

## 12. Historical boundary

`docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md` and `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` remain historical evidence. Their zero-touch topology is not the normal GP3.3 recipe.
