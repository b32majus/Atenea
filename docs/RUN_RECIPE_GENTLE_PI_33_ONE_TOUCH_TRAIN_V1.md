# Atenea — Gentle Pi 3.3 One-Touch Train Recipe v1

Date: 2026-09-20
Status: **CURRENT PINNED EXECUTION RECIPE**

Purpose: make the current Pi/Gentle train reproducible without re-teaching review consent or model routing in every operator prompt.

## 1. Current runtime

```text
Pi current            0.86.1
Pi Q11 baseline       0.86.0
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
| `review-reliability` | `openai-codex/gpt-5.6-luna` | `high` |
| `review-resilience` | `nan/deepseek-v4-flash` | `high` |
| `review-risk` | `nan/glm5.3-flash` | `high` |
| `review-refuter` | `nan/deepseek-v4-flash` | `high` |
| `review-validator` | `openai-codex/gpt-5.6-luna` | `high` |

The parent route is explicit at launch; it is not inferred from Pi's ordinary V4 default. NaN DeepSeek/GLM per-answer ceilings are `32768`. DeepSeek effort is not an effective reasoning-depth control; GLM effort is. `review-reliability` is provisionally Luna high; `review-risk` is GLM high after exact frozen-prompt reproduction. See `docs/NAN_PROVIDER_CAPABILITIES_V1.md`.

## 3. Preflight

Before product mutation verify current Pi `0.86.1`, Gentle Pi `3.3.0`, package-local Gentle AI `3.4.0`; V4/GLM NaN and Luna OpenAI-Codex auth ready; active profile `atenea-one-touch`; `node tools/check-nan-runtime-config.mjs` PASS; `./tools/apply-gentle-330-atenea-host-bridge.sh --check` PASS; no unexpected higher-priority project override; and exact repo/worktree/HEAD/delivery state. Q11 single-acceptance evidence was captured on Pi `0.86.0`.

Unexpected drift is STOP, not silent fallback.

## 4. Launch the persistent parent

```bash
pi --model nan/glm5.3-flash --thinking high
```

Herdr is visibility/session substrate only. There is no normal external Pi supervisor, pi-intercom consent relay, Herdr RPA consent driver or Atenea review controller.

## 5. Authorized work execution

For each externally authorized work item/train: resolve durable external authority, then let Gentle Shell/ODD own internal classification, task decomposition, bounded delegation, verification and work-unit commits. Atenea does not require one child per external ticket.

### 5.1 Compose reviewable work before writing

Before launching substantial implementation, consume the available Review Workload Forecast/task shape. If an explicit session/project `review_budget_lines` exists, it owns the planning budget. Otherwise use Gentle's default 400 authored changed lines as the baseline.

Under the default budget, Atenea's operator heuristic is: `<=400` normal target; `401–600` soft overage where Atenea does not force another split solely for size when one coherent unit is better, while any upstream-required `size:exception` still applies; `601–800` requires an explicit durable `size:exception`/semantic-coherence rationale before implementation; `>800` defaults to STOP/reslice unless the human explicitly authorizes an indivisibility exception. These bands are planning heuristics, not reviewer limits and not native `review_due` logic.

Do not code-golf, split tests away from behavior, or create arbitrary file-layer commits to hit a number. If a unit is honestly indivisible after one coherent slicing pass, report the real size and follow upstream size-exception semantics.

### 5.2 Commit, then let native ASSESS own review timing

**After every delegated/substantial work-unit commit, invoke `gentle_review` `assess` over that exact candidate and obey its provider-owned `review_due`, `review_due_reason` and continuation.** If review is due, follow `wrapper_continuation` to target-scoped STATUS and only then follow the exact provider lifecycle transition; if review is not due, do not manufacture START. External-ticket completion is never itself a review trigger, and Atenea must not reimplement the provider's post-commit medium-slice `review_due` decision with a line-count heuristic. At each external unit/frontier boundary, reconcile repository evidence, complete any provider-required exact-candidate review through APPROVED + acknowledgement/burn, re-read external authority and continue only with work already covered by the authorization; otherwise STOP.

Full composition / unpublished-history recovery policy: `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`.

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

## 9. Current GP3.3 compatibility bridges and ODD SHA guardrail

The current `3.3.0` installation requires the versioned patches `patches/gentle-pi-3.3.0-atenea-host-bridge.patch` and `patches/gentle-pi-3.3.0-atenea-assess-bridge.patch`, applied/checked together by `tools/apply-gentle-330-atenea-host-bridge.sh`. The assess bridge transports GAI3.4 provider-owned review timing; it does not implement an Atenea scheduler.

- `gentle_review_capture_current_group` forwards only the exact current reviewer group retained after fresh STATUS; it is not a universal refuter/validator transport.
- `host_consent_resolved` tells the model that native consent is already complete; it does not manufacture permission.
- Refuter/validator follow their exact provider-issued operations.
- Never amend a work-unit commit after ODD evidence has recorded its SHA; put final SHA bookkeeping in a subsequent evidence commit until upstream fixes the reproduced self-referential hash defect.

## 10. Closure

APPROVED is incomplete until acknowledgement/burn succeeds. Session permission is not reusable verdict authority.

## 11. Operator prompt

```text
Execute the current EXECUTION_READY ticket/train end to end under the current Atenea contract and Gentle Pi 3.3 one-touch recipe.
Remain the persistent visible parent and retain external authority/frontier context. Let Gentle Shell/ODD own internal classification, decomposition, bounded delegation, verification and work-unit commits; do not impose one child per external ticket.
Before substantial implementation, inspect the Review Workload Forecast/task shape and resolve work-unit composition before writing. Honor explicit `review_budget_lines`; otherwise target 400 authored lines by default. Treat ~401–600 as a soft coherent overage, ~601–800 as requiring an explicit durable size-exception rationale, and >800 as STOP/reslice by default unless the human explicitly authorizes an indivisibility exception. Never code-golf or split tests/docs from their behavior just to hit a number.
After every delegated/substantial work-unit commit, call `gentle_review` `assess` on that exact candidate and obey `review_due` / `review_due_reason`. When review is due, follow `wrapper_continuation` to target-scoped STATUS before any START; when it is not due, do not START. Never infer review timing from external-ticket completion or recreate the provider's post-commit `review_due` threshold.
For every provider-selected review boundary, follow the exact native transition through APPROVED + acknowledgement/burn. At each external work-unit/frontier boundary, re-read durable authority and continue only with already-authorized work.
Use the current mixed Atenea routing and qualified GP3.3 host + assess bridges. Do not merge. Return a factual final report and STOP when the compatible frontier is exhausted or a genuine human-owned boundary appears.
```

## 12. Final report minimum

```text
RUNTIME_VERSIONS=
PARENT_SESSION=
PARENT_VISIBLE_IN_HERDR=YES
PARENT_MODEL=nan/glm5.3-flash high
TICKETS_ATTEMPTED=
ODD_INTERNAL_TASKS_OR_WORKERS=
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

## 13. Historical boundary

`docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md` and `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` remain historical evidence. Their zero-touch topology is not the normal GP3.3 recipe.
