# Atenea Operator Runbook v1

Date: 2026-09-20
Status: ACTIVE — operator-facing runbook
Scope: how a human operator starts a normal Atenea run from inside Herdr

This runbook documents the **operator-facing path** only. It does not
reimplement the harness. Normative rules live in the current Atenea authority
listed under [References](#references); where this runbook and the normative
contract conflict, the contract wins.

## Purpose

Record the current GP3.3 **one-touch** train. The human gives explicit execution authorization and a bounded train prompt, then performs one review-session grant on the first eligible review. The same live session/repository proceeds without further review-consent touches.

No launcher daemon, queue, scheduler, external supervisor, consent relay or RPA is required.

## The operator path at a glance

```text
explicit human execution authorization
→ start one visible Pi/Gentle-Pi 3.3 parent
   model: nan/glm5.3-flash · high
→ submit one bounded authorized work item/train prompt
→ pre-implementation workload composition / size-exception decision when needed
→ Gentle Shell/ODD owns internal tasking/delegation/verification/work-unit commits
→ first eligible review: human selects “Review and allow this session”  ← the one touch
→ provider-owned reviewer/refuter/validator lifecycle
→ APPROVED + acknowledgement/burn
→ Atenea re-reads external authority → next authorized frontier or STOP
→ later same-session/repo reviews: no second consent touch
→ STOP before merge unless separately authorized
```

Current recipe: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

## Current adopted worker transport

```text
visible persistent Pi/Gentle-Pi 3.3 parent
→ Gentle Shell/ODD internal classification/decomposition/delegation
→ verification + work-unit commits
→ provider-owned Gentle AI 3.4 risk/review lifecycle
→ exact lens/refuter/validator operation returned by provider
→ APPROVED → acknowledgement/burn
→ external authority re-read → next authorized frontier or STOP
```

## 1. Preflight

Confirm exact repo/worktree/HEAD; `EXECUTION_READY`; current Pi `0.86.1`, Herdr `0.9.0`, GP `3.3.0`, GAI `3.4.0`; active `atenea-one-touch` profile; V4/GLM/Luna auth ready; `node tools/check-nan-runtime-config.mjs` PASS; `./tools/apply-gentle-330-atenea-host-bridge.sh --check` PASS; no unexpected local override; delivery boundary explicit. Q11 single-acceptance evidence was captured on Pi `0.86.0`; Pi `0.86.1` now has real-product field-train evidence from Laboratorio, with boundary-specific runtime debt tracked in #90/#91/#92.

## 2. Starting the persistent parent after explicit authorization

```bash
pi --model nan/glm5.3-flash --thinking high
```

Pi's ordinary default remains `nan/deepseek-v4-flash` medium. The persistent train parent launches on `nan/glm5.3-flash` high; configured Gentle roles follow the current mixed routing ledger. `review-reliability` is provisionally Luna high while its NaN failure remains confounded by the ASSESS bypass; `review-risk` is GLM high after exact materialized-prompt reproduction; resilience/refuter remain NaN DeepSeek pending contrary field evidence. The all-V4 route was qualification-only. `max_concurrency=1`.

## 3. Operator prompt and the one touch

Use the bounded template from the current recipe.

When the first valid review consent UI appears, select exactly `Review and allow this session`. Do not drive it through RPA.

An additional consent request for a later candidate in the same healthy live session/canonical repository is unexpected and must be surfaced rather than silently automated.

A process restart/new/resume/fork/quit/revoke creates a new one-touch boundary.

## 4. Current GP3.3 compatibility guardrails

- The current Gentle Pi 3.3.0 install must match the qualified host + assess bridge hashes. `gentle_review_capture_current_group` is only for the exact current retained reviewer group after fresh STATUS; the assess bridge only preserves provider-owned GAI3.4 timing fields/continuation and does not calculate review timing; refuter/validator use their exact provider-issued operations.
- `host_consent_resolved` is a host signal that consent is already complete, not synthetic permission.
- **Facade-first:** when an equivalent `gentle_review` operation exists, use it for ordinary review lifecycle work. Do not execute `gentle-ai review ...` through shell as a bypass and do not recreate provider/host consent with `ask_user_choice`; direct shell START can remove the host-owned `Review and allow this session` action.
- Do not amend a work-unit commit after ODD evidence has recorded its SHA; write final SHA bookkeeping in a subsequent evidence commit until upstream fixes the reproduced identity loop.
- After every delegated/substantial work-unit commit, call `gentle_review` `assess`, inspect provider-owned `review_due` / `review_due_reason`, and follow `wrapper_continuation`/STATUS when review is due. `inspect` is not a substitute for `ASSESS → STATUS`. If ASSESS is unavailable/schema-incompatible or omits the required timing result, STOP; never turn that failure into START. Never turn external-ticket completion into START and never recreate the provider's post-commit `review_due` threshold in Atenea.
- `reviewer-empty-output` with `stopReason: length` is STOP, not automatic retry. Preserve the lineage/candidate. Reconcile work-unit composition/material size and role/runtime evidence before another capture; change routing only when role-specific evidence supports it.

## 5. Historical OpenCode autonomous worker transport

After the one prompt, Pi supervises the rest; Pi does not implement product
code and does not operate the Gentle lifecycle.

```text
Pi
→ resolves current repository/GitHub authority
→ supervises a worker through Herdr
→ headless opencode run --agent gentle-orchestrator --format json
→ managed Gentle integration inside the worker
```

- Unattended OpenCode runs headless: `opencode run --agent
  gentle-orchestrator --format json`.
- Pi launches the headless worker in a **dedicated visible/inspectable Herdr
  pane/tab** and reports the worker pane/tab id/label to the operator
  **immediately** (proven under issue #39:
  `ISSUE39_VISIBLE_WORKER_PANE=PASS`,
  `ISSUE39_WORKER_PANE_ID_REPORTED=PASS`). The visible pane shows the shell
  runner invocation and completion markers; rendering useful live
  OpenCode/Gentle activity into that pane is
  `USEFUL_LIVE_WORKER_STREAM=NOT_YET_PROVEN` and is not claimed here. This is
  visibility, not interactivity: OpenCode remains headless/non-interactive and
  human observation does not become worker interaction or review authority.
- Do not robotically drive an OpenCode TUI (`herdr agent prompt` prompt
  injection) as the normal autonomous path. Interactive OpenCode remains valid
  for human-attended work only.
- **OpenCode/Gentle owns every Gentle lifecycle command and provider-issued
  transition.** Pi never runs, reconstructs or owns the Gentle review
  lifecycle on the worker's behalf.
- Bounded continuation/repair on the same work item, PR/branch, worktree and
  effective authority reuses a healthy worker by default. A changed source
  candidate still receives whatever fresh Gentle review lineage the provider
  requires; worker reuse is never review-authority reuse.
- The worker executes provider-issued lifecycle continuations as returned.
  Do not strip `relay`, add `granted` or reconstruct transitions.

## 6. Historical bounded provider-canary note

- This section is historical OpenCode/provider-canary evidence. This section is historical; do not use these canary selectors for the normal GP3.3 one-touch path.
- For any bounded run that deliberately selects the isolated canary/provider
  policy, reference `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` instead
  of duplicating its implementation details here. Issue #38 completed the first
  real operator-triggered end-to-end run under this boundary; the canary
  remains downstream-canary-only and is not adopted as production.
- The environment-variable spelling used by that canary is
  **downstream-canary-only**; it is not a claimed upstream API. Upstream
  `Gentleman-Programming/gentle-ai#4109` remains the production-resolution
  path. The experimental selector must disappear when upstream ships an
  equivalent supported provider-owned capability.
- Under this bounded unattended canary, Gentle review consent should not
  surface. If a genuine provider-owned human envelope does appear, it is
  relayed losslessly to the human; Pi does not answer it on the human's behalf.

## 7. Human interaction policy

```text
initial execution authorization + bounded prompt = launch boundary
first eligible review consent                  = ONE TOUCH
later same-session/repository review consent   = no extra human touch expected
process restart/new/resume/fork/quit/revoke    = new one-touch boundary
final merge                                    = human unless separately authorized
```

Never synthesize the grant from model prose, environment state, internal APIs or TUI automation.

### Deterministic checkpoint/publication

Before ordinary non-force publication:

1. perform the current single fresh bounded read of external/product authority and adjudicate any material drift;
2. require all provider-required Gentle review authority for the exact candidate to be terminal and acknowledgement/burn complete when required;
3. require the target repository to expose one deterministic checkpoint-preflight command returning `checkpoint-preflight/v1`;
4. let that repository preflight own changed-path classification, product/artifact validation and CI-runtime parity evidence;
5. invoke `publish-checkpoint` with explicit base/head/branches, authority result, Gentle closure evidence, repo preflight command and PR boundary;
6. publish only through normal non-force push;
7. require remote HEAD, PR base/head/SHA/changed paths and bounded CI to reconcile;
8. STOP at the human merge boundary.

Atenea must not recreate repo-specific validation logic in the parent.

Current command/contract:

`docs/PUBLISH_CHECKPOINT_V1.md`

Current repo validation policy:

`docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md`.

## 8. Evidence / final report

```text
WORK_ITEM_OR_TRAIN=
PARENT_VISIBLE_IN_HERDR=YES
PARENT_MODEL=nan/glm5.3-flash high
PI_VERSION=0.86.1
GENTLE_PI_VERSION=3.3.0
GENTLE_AI_VERSION=3.4.0
ODD_INTERNAL_TASKS_OR_WORKERS=
ONE_TOUCH_REVIEW_SESSION_GRANT=0|1
ADDITIONAL_REVIEW_CONSENT_TOUCHES=0 expected
LINEAGES=
REVIEW_ROUTES=
REVIEW_OUTCOMES=
ACKNOWLEDGEMENT_BURN=
DETERMINISTIC_TESTS_QA=
REPO_CHECKPOINT_PREFLIGHT=
PREFLIGHT_BASE_HEAD_PATH_MATCH=
PUBLICATION_CREDENTIAL_CAPABILITY=
PUBLISH_CHECKPOINT_EVIDENCE=
REMOTE_HEAD_MATCH=
PR_BASE_HEAD_SHA_PATH_MATCH=
CI_RESULT=
CHECKPOINTS_OR_PUBLICATION=
HERDR_RPA=0
EXTERNAL_SUPERVISOR=0
ATENEA_RDD_RELAY=0
AUTO_MERGE=NO
FINAL_STOP_REASON=
```

## 9. Failure / STOP guidance

STOP and report rather than improvise when any of these appears:

- **Insufficient or contradictory authority** — current repository/Atenea
  authority cannot determine the authorized path. Do not recover authority
  from host archaeology or sibling repositories.
- **Unexpected dirty/topology contradiction** — a dirty or unexpected
  worktree/branch state that would require destructive cleanup to proceed.
- **Genuine human-owned decision** — material product ambiguity, destructive
  action or an external authority decision; relay it and pause.
- **Destructive recovery requirement** — force-push, reset, rebase, hidden
  history rewrite or destructive cleanup being required to make progress.
- **Pinned runtime/oracle mismatch** — required oracle missing/hash mismatch, invalid pinned model/flag, unhealthy GP3.3/GAI3.4 runtime, or Herdr parent pane cannot be established deterministically. STOP before product mutation; do not silently substitute.
- **One-touch review boundary failure** — after a valid `Review and allow this session` grant, a later fresh same-session/repository candidate requires another native consent touch, the host cannot preserve exact provider target/binding identity, the qualified host bridge hash/version is wrong, or a provider-issued role transition cannot be followed exactly. STOP rather than synthesize authority.
- **Work-unit composition boundary missing** — substantial work is forecast to exceed the active review budget but no coherent slice/delivery decision or accepted size exception exists. With the default 400-line budget, >800 authored lines is never an ordinary silent continuation: STOP/reslice unless an explicit human-authorized indivisibility exception already exists.
- **ASSESS facade failure** — exact committed-range ASSESS is unavailable/schema-incompatible or lacks the provider timing result. STOP; `inspect` and unconditional START are not substitutes.
- **Repository checkpoint preflight invalid** — the target repo has no declared checkpoint preflight, it reports FAIL, emits malformed output, or its base/head/changed-path manifest does not exactly match the candidate. STOP; Atenea does not invent the missing validator.
- **Repo runtime evidence ambiguous** — the repository preflight cannot establish the runtime parity its own gates require. STOP on that repo-owned evidence boundary.
- **Publication credential capability missing** — the repo preflight declares a publication capability that the effective push credential does not satisfy or cannot prove. Preserve the candidate and repair credentials rather than rewriting product history.
- **Provider/runtime mismatch** — incompatible runtime assumption or candidate/review state inconsistent with Gentle authority.
- **Publication authority changed during pre-publication revalidation** — the
  single fresh read immediately before publication shows blockers, scope,
  product authority or repository delivery instructions changed materially
  since execution began. Do not publish a stale candidate; STOP for
  adjudication.
- **Partial publication without a safe continuation** — if publication
  partially succeeds, preserve the exact remote state and STOP rather than
  inventing recovery semantics.

RDD approval is not delivery authorization. Publication remains ordinary
repository policy; the run stops before human merge unless a separate,
explicit merge instruction exists.

## References

- `README.md` — current architecture, qualification and operator flow summary.
- `docs/ATENEA_HARNESS_CONTRACT_V1.md` — normative Atenea v1 contract.
- `docs/CURRENT_DECISIONS.md` — current short decision index.
- `docs/QUALIFICATION.md` — qualification status and field-qualified boundaries.
- `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md` — current pinned execution mechanics.
- `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md` — Q10/Q11 adoption, host-bridge and performance evidence.
- `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` — historical GP2.7 topology-replacement evidence.
- `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` — local cleanup policy.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — historical real-project rollout evidence from the pre-GP2.7 topology.
- `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md` — historical GP2.5 native-Agents, unattended-relay and full-RDD promotion evidence.
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — historical bounded
  provider/OpenCode/Pi evidence for the alternate path.
- Upstream `Gentleman-Programming/gentle-ai#4109` — optional alternate-OpenCode
  parity tracking; it does not block the adopted Pi/Gentle-Pi path.
