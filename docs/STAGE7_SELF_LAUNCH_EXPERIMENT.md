# Atenea — Stage 7 Pi self-launch experiment

## Purpose

Qualify exactly one property not yet proven by Stage 6:

`PI_SELF_CREATES_WORKER`

Stage 6 already proved that Pi can directly supervise an existing OpenCode/Gentle-Orchestrator worker through Herdr, relay native Gentle RDD consent and complete a dependency-ordered two-ticket train without the deterministic consent gate.

Stage 7 must not re-test or redesign those proven layers. It removes the remaining manual operator ceremony around worker creation, pane discovery, rename and binding.

## Prepared train

- branch: `stage7-pi-self-launch-20260830`
- issue #14: introduce a precedence-only selection helper
- issue #15: delegate resolver selection to that helper
- dependency: #15 is blocked by #14
- both tickets are `ready-for-agent`
- no PR or merge is part of this experiment

## Operator preparation

Before starting Pi, deterministically prepare the repository only:

1. fetch origin;
2. switch to `stage7-pi-self-launch-20260830`;
3. confirm local HEAD equals the configured upstream;
4. confirm worktree clean;
5. confirm Gentle native RDD is enabled.

Do not start OpenCode manually. Do not create or rename a worker pane. Do not arm the deterministic consent gate. Keep the old Herdr consent plugin disarmed.

## Operator prompt

The intended user-facing interaction is exactly:

```text
Run Atenea issues #14 and #15 unattended.
Create and manage your own OpenCode/Gentle worker through Herdr.
```

No worker pane ID, agent name, implementation instructions, review instructions or ticket details are supplied by the operator.

## Pi responsibilities

Pi is the Atenea supervisor and worker launcher. It must use native Herdr primitives to create a sibling pane/session for the engineering worker, start OpenCode, establish a stable worker identity/name, and manage that worker for the full train.

Pi owns:

- worker creation/start/naming through Herdr;
- dispatch of the two-ticket train;
- lifecycle wait/read;
- direct relay of native Gentle RDD consent;
- recognition of terminal completion;
- final read-only verification.

Pi must not implement the tickets itself, edit Atenea directly, run Gentle review lifecycle commands itself, repair the worker, create implementation subagents, or perform Git/GitHub delivery writes on behalf of Gentle.

## Worker responsibilities

OpenCode/Gentle-Orchestrator owns:

- consuming the ready-for-agent issue contracts;
- implementation;
- deterministic verification;
- native RDD;
- bounded repair if review requires it;
- exact acknowledgement;
- commit;
- plain push;
- fetch/reconcile exact remote checkpoint;
- issue closure;
- advancing from #14 to #15 only after #14 is accepted and closed;
- stopping after #15.

## Consent policy

Pi is trusted to relay native Gentle RDD consent directly through Herdr.

- native numbered RDD UI with option 1 = `Run the review now` → choose option 1;
- native textual Gentle RDD request for `granted|declined` → answer exactly `granted`;
- unrelated shell/edit/git/merge/PR/release permission or ambiguous blocked state → STOP and report without answering.

No deterministic consent gate is used in the baseline.

## Required final report

Pi should report at least:

```text
SELF_LAUNCH_OUTCOME=PASS|STOP
WORKER_CREATED_BY_PI=true|false
WORKER_RUNTIME=opencode|other|unknown
ISSUE_14=CLOSED|OPEN|UNKNOWN
ISSUE_15=CLOSED|OPEN|UNKNOWN
BRANCH=<value>
HEAD=<value>
UPSTREAM=<value>
REMOTE=<value>
WORKTREE_CLEAN=true|false
RDD_14=APPROVED_ACKED|OTHER|UNKNOWN
RDD_15=APPROVED_ACKED|OTHER|UNKNOWN
STOP_REASON=<none or exact reason>
```

## PASS criteria

PASS requires all of:

- the operator started no OpenCode worker manually;
- Pi created and managed its own OpenCode/Gentle worker through Herdr;
- #14 reached an accepted exact remote checkpoint and closed before #15 began;
- #15 reached an accepted exact remote checkpoint and closed;
- native RDD completed for both executable candidates when required;
- final local HEAD, configured upstream and remote branch agree;
- final worktree clean;
- no merge, rebase/reset, force-push, PR or branch switch;
- no human intervention after the two-line operator prompt.

Any other result is STOP with evidence. Do not patch the architecture during the run.

## What this experiment does not qualify

Even on PASS, Stage 7 does not yet prove:

- automatic branch creation/switching from arbitrary operator intent;
- automatic discovery of arbitrary ready work without issue numbers;
- final integration/merge/release policy;
- restart/crash recovery of the Pi supervisor itself;
- unattended handling of unexpected generic OpenCode permissions.

Those remain later properties and must not be mixed into this run.
