# Atenea Operator Runbook v1

Date: 2026-09-15
Status: ACTIVE — operator-facing runbook
Scope: how a human operator starts a normal Atenea run from inside Herdr

This runbook documents the **operator-facing path** only. It does not
reimplement the harness. Normative rules live in the current Atenea authority
listed under [References](#references); where this runbook and the normative
contract conflict, the contract wins.

## Purpose

Record the practical operator-facing path for starting the current GP2.7 hybrid-native unattended run inside Herdr. The human gives explicit execution authorization and one bounded train prompt; one Pi/Gentle-Pi parent stays visible for the bounded train while fresh native implementation children are used per newly selected ticket.

This runbook intentionally adds **no launcher daemon, queue, scheduler, external supervisor or consent state machine**. A human or Cora/DC may perform the mechanical Herdr/Pi launch under explicit authorization, but the autonomous execution path remains upstream-native.

## The operator path at a glance

```text
explicit human execution authorization
→ human or Cora/DC enters intended repository/worktree in Herdr
→ mechanically starts one Pi + Gentle Pi 2.7 parent, visible in Herdr
→ submits one bounded Atenea execution/train prompt
→ parent resolves current repo/GitHub frontier
→ fresh package-owned gentle-ai-worker child for ticket 1
→ parent reconciles diff + deterministic verification
→ native package-local Gentle AI 2.9.1 START through non-TTY Bash subprocess
→ Gentle Pi STATUS adopts the exact returned lineage
→ provider review/correction → APPROVED → acknowledge/burn
→ authorized checkpoint
→ fresh frontier read → fresh child for ticket 2 or STOP
→ final factual report
→ STOP before merge unless separately authorized
```

The parent remains visible and inspectable in Herdr. The START subprocess alone is non-TTY.

Pinned current runs use `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md`. The former `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md` describes the historical separate-supervisor topology and is retained only for rollback/reproduction.

## Current adopted worker transport

```text
visible persistent Pi/Gentle-Pi 2.7 parent
→ package-owned fresh native implementation child
→ child returns bounded ticket diff/evidence
→ parent deterministic integration checks
→ parent Bash: package-local GAI2.9.1 native review START, non-TTY
→ exact lineage returned
→ Gentle Pi STATUS adopts same lineage
→ provider reviewer/correction lifecycle
→ APPROVED → acknowledgement/burn
→ checkpoint → fresh frontier
```

There is no normal external supervisor, pi-intercom completion protocol or Atenea mechanical consent relay in this path. A visible host `Review consent` dialog is a fail-closed condition, not something the operator should answer during an unattended qualification/run.

## 1. Preflight

Confirm before starting:

- **Repository/worktree:** intended path, branch, exact start HEAD and expected dirty/untracked state.
- **Current durable authority:** current repo instructions/issues/specs plus current Atenea `README.md`, harness contract, decisions, qualification, operation guide and GP2.7 train recipe.
- **Work is `EXECUTION_READY`:** shaping/product ambiguity is already resolved and delivery boundary is explicit.
- **Runtime:** Pi 0.85.1, Herdr 0.9.0, Gentle Pi 2.7.0, package-local Gentle AI 2.9.1/integrity healthy, RDD on, current routing effective.
- **No destructive cleanup:** unexpected topology/dirty state means STOP.
- **Frozen oracle when required:** path/hash exists before ticket mutation; no implementation-run authoring fallback.
- **Herdr visibility:** parent launches in a dedicated visible Herdr workspace/pane and reports its name/pane immediately.

## 2. Starting the persistent parent after explicit authorization

After explicit human authorization, start one normal Pi process with Gentle Pi 2.7 enabled in the target repository/worktree through Herdr. The parent route is `opencode-go/glm-5.3-flash` `high` unless current routing authority explicitly changes it.

The current role routes are:

- persistent parent/coordinator: GLM 5.3 Flash high;
- native `gentle-ai-worker`: GLM 5.3 Flash high;
- native `gentle-ai-verify`: GPT-5.6 Luna high;
- readability: Luna high;
- reliability/resilience/risk: DeepSeek V4.1 Flash high;
- refuter/validator: inherit/provider-route.

These are replaceable routing decisions. A rejected literal or unexpected local override is STOP, not a silent fallback.

## 3. Operator prompt

Give one bounded execution/train prompt. The mechanics live in the current contract/recipe and should not be reconstructed in prose.

Normal template:

```text
Execute the current EXECUTION_READY ticket/train end to end under the current Atenea contract and GP2.7 hybrid-native train recipe.
Remain the persistent visible Gentle-Pi parent in Herdr. Use one fresh package-owned implementation child per newly selected ticket, sequentially unless authority explicitly proves parallel safety.
For every mutating candidate, complete deterministic verification, the hybrid-native exact-candidate RDD lifecycle, APPROVED + acknowledgement/burn, and the authorized checkpoint before rediscovering the frontier.
Do not use the historical external supervisor/consent relay path unless this current path fails and the run explicitly enters the documented rollback boundary. Do not merge. Return a factual final report and STOP when the compatible frontier is exhausted.
```

Pinned work may add exact issue(s), branch/worktree, expected start HEAD, frozen oracle hash and publication boundary. Do not paste provider bindings, lineage reconstruction, consent flags or historical experiment details into the prompt.

## 4. Historical OpenCode autonomous worker transport

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

## 5. Historical bounded provider-canary note

- This section is historical OpenCode/provider-canary evidence. Current operational Gentle AI is 2.9.1; do not use these canary selectors for the normal GP2.7 path.
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

## 6. Human interaction policy

```text
initial explicit authorization + one train prompt
  = expected human execution boundary

normal GP2.7 unattended RDD
  = native GAI START runs non-TTY with no consent override
  = Gentle Pi adopts exact returned lineage through STATUS
  = zero host review-consent dialogs expected

visible Review consent dialog
  = FAIL CLOSED for unattended execution
  = do not click option 3, do not use RPA, do not synthesize consent

Gentle Pi standing session permission
  = attended interactive convenience only
  = not required by the current unattended path

material product ambiguity / destructive action / genuine external authority
  = genuine human-owned decision; pause/relay explicitly

final merge
  = human boundary unless separately authorized
```

Any real post-launch human action is counted honestly. The parent transcript cannot prove absence of host TUI interaction; operator/external observation is authoritative.

## 7. Evidence / final report

The final factual report states at minimum:

```text
WORK_ITEM_OR_TRAIN=
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
PARENT_VISIBLE_IN_HERDR=YES
PARENT_MODEL=
GENTLE_PI_VERSION=2.7.0
GENTLE_AI_VERSION=2.9.1
FRESH_CHILD_TASK_IDS=
NATIVE_NO_TTY_START_COUNT=
LINEAGES=
SAME_LINEAGE_STATUS_ADOPTION=
RISK_LENSES=
REVIEW_OUTCOMES=
BOUNDED_CORRECTIONS=
ACKNOWLEDGEMENT_BURN=
REVIEW_CONSENT_DIALOGS=
HUMAN_TOUCH_AFTER_INITIAL_PROMPT=
DETERMINISTIC_TESTS_QA=
CHECKPOINTS_OR_PUBLICATION=
HERDR_RPA=0
EXTERNAL_SUPERVISOR=0
ATENEA_RDD_RELAY=0
AUTO_MERGE=NO
FINAL_STOP_REASON=
```

Evidence answers a question; it does not become reporting bureaucracy. Record exact versions/heads/lineages when they materially establish the claimed boundary.

## 8. Failure / STOP guidance

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
- **Pinned runtime/oracle mismatch** — required oracle missing/hash mismatch, invalid pinned model/flag, unhealthy GP2.7/GAI2.9.1 runtime, or Herdr parent pane cannot be established deterministically. STOP before product mutation; do not silently substitute.
- **Hybrid review boundary failure** — native START unexpectedly has a TTY/asks for consent, a second START would be required for the same candidate, STATUS cannot adopt the exact lineage, or provider binding/target identity is inconsistent. STOP rather than synthesize authority.
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
- `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md` — current pinned execution mechanics.
- `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md` — topology replacement evidence.
- `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` — local cleanup policy.
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — historical real-project rollout evidence from the pre-GP2.7 topology.
- `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md` — historical GP2.5 native-Agents, unattended-relay and full-RDD promotion evidence.
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — historical bounded
  provider/OpenCode/Pi evidence for the alternate path.
- Upstream `Gentleman-Programming/gentle-ai#4109` — optional alternate-OpenCode
  parity tracking; it does not block the adopted Pi/Gentle-Pi path.
