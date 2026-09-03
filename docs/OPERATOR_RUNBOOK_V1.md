# Atenea Operator Runbook v1

Date: 2026-09-03
Status: ACTIVE — operator-facing runbook
Scope: how a human operator starts a normal Atenea run from inside Herdr

This runbook documents the **operator-facing path** only. It does not
reimplement the harness. Normative rules live in the current Atenea authority
listed under [References](#references); where this runbook and the normative
contract conflict, the contract wins.

## Purpose

Close the gap between the normative Atenea contract and the human interface
proven by the 2026-09-03 zero-touch canary: a small, practical operator
runbook usable to start a normal Atenea run from inside Herdr without
replaying investigation history or embedding Gentle lifecycle mechanics in the
operator prompt.

This runbook intentionally adds **no launcher, wrapper, daemon, queue,
controller, scheduler or consent state machine**. The human starts Pi
manually; there is no Atenea custom launcher.

## The operator path at a glance

```text
human opens/uses Herdr
→ enters target repository context
→ starts Pi interactively
→ gives one bounded Atenea execution prompt
→ Pi resolves repo/GitHub authority
→ Pi supervises Herdr → headless OpenCode (opencode run) → Gentle
→ implementation / deterministic verification
→ exact-candidate RDD / bounded correction if required
→ exact acknowledgement/burn
→ one pre-publication authority revalidation
→ normal non-force publication
→ PR/checkpoint reconciliation
→ frontier rediscovery
→ STOP before merge / when exhausted
→ Pi final factual report
```

Pi remains interactive to the operator; the implementation worker does not.
The accepted autonomous worker transport is headless `opencode run`, not
robotic prompt injection into an OpenCode TUI.

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

## 2. Starting Pi manually

At a shell **inside Herdr**, start Pi interactively in the target repository
context. This is the normal operator interface; there is no Atenea custom
launcher and Pi is not started by a daemon or scheduler.

```text
# inside Herdr, in the target repository context
pi
```

- The human starts Pi; the run's execution authorization is this manual
  launch plus the one bounded execution prompt in the next section.
- Routing/model flags may be added as an example/current field choice when a
  specific provider/model is desired (the 2026-09-03 canary ran Pi with
  `--provider commandcode --model deepseek/deepseek-v4-flash`). That is
  operational routing evidence, not architectural authority — record what you
  use for evidence but do not hard-code the harness around a specific model.

## 3. Thin operator prompt

Give one bounded execution prompt. It states **intent and bounded context**;
it does not reimplement the harness contract or teach Gentle mechanics in
prose.

Normal-run prompt template:

```text
Execute the current EXECUTION_READY issue end to end under the Atenea contract.
Use Herdr to create or reuse the headless OpenCode/Gentle worker.
Proceed through implementation, deterministic verification, Gentle RDD,
bounded correction if required, normal non-force publication and
PR/checkpoint reconciliation.
Do not merge. Stop on any genuine human-owned decision or when the compatible
frontier is exhausted, and return the final factual report.
```

When the frontier is intentionally pinned, name the issue explicitly (for
example, `Execute Atenea issue #N ...`). Do not paste Gentle command syntax,
lineage reconstruction, recovery algorithms or detailed historical exclusions
into the operator prompt; durable mechanics belong in current
repo/Atenea/upstream authority.

## 4. Autonomous worker transport

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

## 5. Bounded provider-canary note (current end-to-end experiment only)

- Production Gentle `2.5.0` remains untouched (`/home/hermes/.local/bin/gentle-ai`).
- For the explicitly bounded current end-to-end experiment only, reference the
  isolated canary/provider policy documented in
  `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` instead of duplicating
  its implementation details here.
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
OPENCODE_WORKERS_STARTED=
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
- **Provider/runtime mismatch** — incompatible runtime assumption or
  candidate/review state inconsistent with Gentle authority.
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
