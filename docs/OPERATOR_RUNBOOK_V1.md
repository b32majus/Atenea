# Atenea Operator Runbook v1

Date: 2026-09-03
Status: ACTIVE — operator-facing runbook
Scope: how a human operator starts a normal Atenea run from inside Herdr

This runbook documents the **operator-facing path** only. It does not
reimplement the harness. Normative rules live in the current Atenea authority
listed under [References](#references); where this runbook and the normative
contract conflict, the contract wins.

## Purpose

Record the practical operator-facing path for starting a normal Atenea run from
inside Herdr. The human interface was first proven by the 2026-09-03 zero-touch
canary and then **field-proven end to end by the real operator-triggered run,
issue #38**, which started Pi manually, gave one bounded execution prompt and
completed with zero additional human touch. This runbook is the normal operator
path, not a one-off experiment, and does not replay investigation history or
embed Gentle lifecycle mechanics in the operator prompt.

This runbook intentionally adds **no launcher, wrapper, daemon, queue,
controller, scheduler or consent state machine**. Explicit human execution authorization is mandatory; the mechanical Pi-supervisor launch may be performed by the human or by Cora/DC under that authorization. There is no Atenea custom launcher.

## The operator path at a glance

```text
explicit human execution authorization
→ human or Cora/DC enters the target Herdr/repository context
→ mechanically starts the normal Pi supervisor
→ submits one bounded Atenea execution/train prompt
→ Pi resolves repo/GitHub authority
→ Pi supervisor creates one separate Pi/Gentle-Pi worker using the pinned spawn recipe
→ worker implementation / deterministic verification
→ native exact-candidate RDD / bounded correction if required
→ exact acknowledgement/burn
→ one pre-publication authority revalidation
→ normal non-force publication
→ PR/checkpoint reconciliation
→ frontier rediscovery
→ STOP before merge / when exhausted
→ Pi final factual report
```

Pi remains interactive to the operator; the worker runs in a separate visible Herdr pane. The adopted unattended worker is Pi + Gentle Pi; OpenCode is optional/alternate, not required.

Pinned runs MUST use `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`. The planning/launch surface resolves literal model parameters before launch. The supervisor does not rediscover models/CLI mechanics, does not implement product code, and after worker creation ends its turn until pi-intercom wakes it for a bounded decision or FINAL.

## Current adopted worker transport

```text
normal Pi supervisor (Gentle Pi OFF; pi-intercom ON)
→ Herdr separate pane with explicit autonomous env
→ fresh Pi worker (normal extensions, Gentle Pi 2.4)
→ implementation / delegated bounded writer as Gentle routes it
→ deterministic checks / native Gentle RDD / acknowledgement-burn
→ authorized normal non-force publication
→ supervisor remote reconciliation / fresh frontier read / next worker or STOP
```

No fixed sleeps, polling loops, long waits or `agent_status` lifecycle inference. A rejected pinned model/flag fails closed before product mutation. Final merge remains human unless separately authorized.

Bounded RDD consent is also event-driven, but the model is not the serializer. The versioned Atenea worker relay extension forwards the exact `gentle_review` consent payload through pi-intercom outbox to the named/scoped supervisor and blocks direct `ask_user_choice` while that consent is pending. The supervisor returns only the bounded decision; the worker performs the provider transition and owns the remaining Gentle lifecycle. Missing/mismatched name, scope, relay extension or intercom route is STOP, not a reason to ask the human directly, manually reconstruct the envelope or switch runtime.

## 1. Preflight

Confirm before starting a run:

- **Repository / worktree.** You are in the intended repository and on the
  intended branch/worktree: `git status`, `git branch --show-current`,
  `git log -1`. Record the current local/remote head so reconciliation has an
  exact base.
- **Current durable authority.** The authority the run must satisfy is the
  current `README.md`, `docs/ATENEA_HARNESS_CONTRACT_V1.md`,
  `docs/CURRENT_DECISIONS.md`, `docs/QUALIFICATION.md`,
  `docs/REAL_PROJECT_ROLLOUT_V1.md` and, for the bounded canary boundary,
  `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`. Cross-check every path,
  name and field the run references against that authority.
- **Herdr is the active process substrate.** The run starts inside Herdr; Herdr
  is process/session substrate only, never a policy gate.
- **Work item is explicitly `EXECUTION_READY`.** The issue status block must
  declare `EXECUTION_READY=YES` and the delivery boundary (typically
  `PR_STOP_BEFORE_MERGE`). Shaping and unresolved product decisions belong
  before `EXECUTION_READY`.
- **No destructive cleanup to manufacture readiness.** An unexpected
  dirty/topology contradiction is a STOP condition, not authorization for
  reset, clean, rebase, force-push or other destructive recovery.
- **Session identity + worker pane expectation.** Supervisor and worker use pre-resolved Pi `--name` values plus one shared `PI_INTERCOM_SCOPE_ID`; Herdr labels alone are not routing identity. Pi launches a separate visible Pi/Gentle-Pi worker pane using `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`, extracts the actual `pane_id` from Herdr JSON before `agent start`, loads the versioned Atenea RDD relay extension, and reports pane/name immediately. Observation never becomes review authority.
- **Frozen oracle when required.** For semantic/clinical work whose repository authority requires a principal oracle, launch authority must supply a frozen oracle path + SHA256 before the implementation worker exists. Missing/mismatched oracle is STOP; no alternate-runtime/oracle-author fallback inside the implementation run.

## 2. Starting the Pi supervisor after explicit authorization

After explicit human authorization, start the normal Pi supervisor in the target repository context through the existing Herdr surface. The human may do this directly, or Cora/DC may perform the same mechanical launch. No daemon, scheduler or custom Atenea launcher is introduced.

The supervisor process MUST be normal Pi with Gentle Pi disabled and pi-intercom explicitly loaded. Any model route used for the supervisor is a pre-resolved operational parameter, not architectural authority.

- The human authorization plus the one bounded execution/train prompt defines the execution boundary. Mechanical launch by Cora/DC does not create authority by itself.
- Routing/model flags may be added as an example/current field choice when a
  specific provider/model is desired (the 2026-09-03 canary ran Pi with
  `--provider commandcode --model deepseek/deepseek-v4-flash`). That is
  operational routing evidence, not architectural authority — record what you
  use for evidence but do not hard-code the harness around a specific model.

## 3. Operator prompt (thin normal run; bounded authoritative when pinned)

Give one bounded execution prompt. It states **intent and bounded context**;
it does not reimplement the harness contract or teach Gentle mechanics in
prose.

Normal-run prompt template:

```text
Execute the current EXECUTION_READY issue end to end under the Atenea contract.
Use the pinned spawn recipe to create the separate Pi/Gentle-Pi worker after verifying any required frozen oracle path/hash.
Remain non-implementing and execute zero Gentle lifecycle commands in the supervisor.
Proceed event-driven through implementation, deterministic verification, native Gentle RDD, bounded correction if required, normal non-force publication and checkpoint reconciliation.
Do not merge. After an accepted checkpoint, freshly rediscover the compatible frontier, create a fresh worker for the next ticket, or STOP when exhausted. Return the final factual report.
```

When the frontier is intentionally pinned, name the work item explicitly and
use the **bounded authoritative pinned-prompt template** below. Bounded and
authoritative beats vague: the prompt may state already-declared mechanics so
Pi validates rather than broadly rediscovers them.

```text
Execute <repository>#<issue> end to end under current repository and Atenea
authority. Treat Issue #<issue> and its explicitly referenced current
authority as the primary execution contract.
Use branch <declared execution branch> and existing PR <checkpoint PR> if their
current GitHub state remains compatible with the declared handoff HEAD; revalidate
them but do not redesign the topology when they are compatible.
Remain a non-implementing Pi supervisor.
Consume the pre-resolved pinned spawn parameters unchanged. Verify the required frozen oracle path/hash when the work item requires one.
Launch exactly one separate Pi/Gentle-Pi worker through a dedicated visible Herdr pane, parse the returned Herdr JSON to the actual pane id before `agent start`, and report pane/name immediately.
Execute zero `gentle-ai` commands in the supervisor; the worker owns every Gentle lifecycle transition. Never use OpenCode or another runtime as a fallback for missing oracle/spawn prerequisites.
Normal non-force publication to the current delivery branch is authorized.
Do not merge.
Before launching the worker, perform only the bounded authority/runtime checks
required for this work item; do not do broad repo/host archaeology unless a
concrete contradiction requires it.
After the accepted checkpoint, rediscover only the compatible frontier and stop
when exhausted.
Return the final factual acceptance report.
```

The template names: work item, declared branch/PR checkpoint, Pi supervisor
role, visible Herdr headless worker, normal non-force publication
authorization and STOP-before-merge boundary. Pi's bounded preflight validates
exactly those anchors — exact issue/current GitHub state, declared
branch/PR checkpoint, canonical authority files referenced by the issue, and
runtime compatibility — before launching the worker.

Do not paste Gentle command syntax, lineage reconstruction, recovery
algorithms or detailed historical exclusions into the operator prompt; durable
mechanics belong in current repo/Atenea/upstream authority.

> **Historical/alternate OpenCode transport below.** After cutover #45, this section is retained only for reproducing earlier OpenCode field evidence or explicitly selected alternate/attended workflows. It does not define the current normal unattended path.

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

## 5. Bounded provider-canary note

- Production Gentle `2.5.0` remains untouched (`/home/hermes/.local/bin/gentle-ai`).
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
initial manual Pi start + one execution prompt
  = expected execution authorization

ordinary normal non-force push permission
  = already-authorized operational action
  Pi handles it when the runtime safely exposes it; do not escalate to the human

Gentle review consent under the bounded unattended provider canary
  = should not surface

material product ambiguity / destructive action / genuine external authority
  = genuine human-owned decision
  Pi relays and pauses; the human may answer explicitly

final merge
  = human boundary
  STOP before merge unless separately and explicitly authorized
```

Any real post-`EXECUTION_READY` human answer must be counted honestly in the
final report — it is recorded as a real intervention, never silently reported
as zero-touch.

## 7. Evidence / final report

The final factual report states at minimum these fields:

```text
WORK_ITEM=
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
PI_ROLE=NON_IMPLEMENTING_SUPERVISOR
PI_GENTLE_PI_WORKERS_STARTED=
FROZEN_ORACLE_SHA256=
SUPERVISOR_GENTLE_COMMANDS=0
WORKER_PANE_ID_REPORTED=
GENTLE_EXACT_CANDIDATE_RDD=
BOUNDED_CORRECTIONS=
ACKNOWLEDGEMENT_BURN=
HUMAN_TOUCH_AFTER_EXECUTION_READY=
NORMAL_NON_FORCE_PUBLICATION=
PR_OR_CHECKPOINT=
AUTO_MERGE=NO
FRONTIER_STOP=
FINAL_STOP_REASON=
```

When the worker runs headless inside Herdr, record the worker pane/tab
id/label in the report so the operator can observe the visible pane and its
completion markers; do not claim a useful live OpenCode/Gentle activity stream
(`USEFUL_LIVE_WORKER_STREAM=NOT_YET_PROVEN`).

Evidence answers a question; it does not become a reporting bureaucracy.
Where useful, record exact runtime versions, the issue/PR identifiers, the
accepted remote checkpoint/head, deterministic verification results and any
provider-issued transition integrity facts.

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
- **Pinned spawn/oracle mismatch** — required oracle missing/hash mismatch, invalid pinned model/flag, or Herdr pane id cannot be extracted deterministically. STOP before product mutation; do not rediscover/substitute/fallback.
- **Supervisor ownership violation** — any need for the supervisor to execute `gentle-ai` or author implementation/oracle content is a STOP; those belong outside or inside the worker as explicitly governed.
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
- `docs/REAL_PROJECT_ROLLOUT_V1.md` — real-project operator path and bounded
  experiments.
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` — bounded zero-touch
  provider/OpenCode/Pi evidence and adoption boundary.
- Upstream `Gentleman-Programming/gentle-ai#4109` — production-resolution path
  for the negotiated-v2 unattended capability.
