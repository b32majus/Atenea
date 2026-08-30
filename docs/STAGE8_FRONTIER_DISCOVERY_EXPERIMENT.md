# Atenea — Stage 8 autonomous frontier discovery

## Purpose

Qualify exactly one new property after Stage 7:

`PI_DISCOVERS_READY_FRONTIER`

Stage 7 already qualified the two-line operator interface when issue numbers were supplied and proved that Pi can create/name/start its own OpenCode/Gentle worker through Herdr, supervise native RDD, and complete a two-ticket train.

Stage 8 removes only the issue-number input. The operator gives work intent at train level; Pi must inspect durable GitHub/repository state and identify the correct executable unblocked frontier.

## Prepared state

- branch: `stage8-frontier-discovery-20260830`
- branch base: Stage 7 implementation + closure documentation
- executable train:
  - #18 — position 1/2, unblocked, `ready-for-agent`
  - #19 — position 2/2, blocked by #18, `ready-for-agent`
- qualification tracker: #20

Important: historical parent/specification issue #1 remains open and also carries `ready-for-agent`. It is not the current executable Stage 8 frontier. This deliberately proves that discovery cannot be `pick the first/lowest labeled issue`; Pi must inspect durable issue contracts, train/dependency state, and repository authority.

## Operator prompt

Exactly:

```text
Run the next ready Atenea train unattended.
Create and manage your own OpenCode/Gentle worker through Herdr.
```

The operator supplies no issue numbers, worker pane, worker name, branch command, RDD instructions, or implementation detail.

## Required Pi behavior

Pi must:

1. inspect current repository/branch and GitHub issue state read-only;
2. identify #18 as the executable unblocked Stage 8 frontier;
3. reject #1 as historical parent/specification authority rather than executable current train work;
4. recognize #19 as dependent on #18;
5. create/name/start its own OpenCode/Gentle worker through native Herdr primitives;
6. dispatch the discovered frontier;
7. supervise lifecycle and relay native Gentle RDD consent directly;
8. allow Gentle/OpenCode to own implementation, verification, RDD/repair, commit, plain configured-upstream push, fetch/reconcile, closure, and dependency progression;
9. continue to #19 only after #18 reaches an accepted remote checkpoint and is closed;
10. stop after #19 and report final deterministic state.

Pi must not implement code itself, mutate Atenea on behalf of the worker, run Gentle review lifecycle commands itself, create implementation subagents, or add a scheduler/gate/metadata schema during the run.

## Permission policy

Gentle-Orchestrator baseline after Stage 7 follow-up:

- agent-scoped `git commit`: allow
- agent-scoped `git commit *`: allow
- agent-scoped plain `git push`: allow
- no agent-scoped `git push *`
- no agent-scoped `git push origin *`
- argument-bearing push therefore falls back to global ASK
- force-push, rebase, and destructive reset remain protected

If the worker chooses an argument-bearing push and blocks, Pi must not broaden global/agent permissions during this qualification. STOP and report; the delivery contract is plain configured-upstream `git push`.

## PASS criteria

PASS requires all of:

- no issue numbers supplied by the operator;
- Pi discovers #18 as the correct initial executable frontier;
- Pi does not execute parent/specification issue #1;
- Pi creates and manages its own OpenCode/Gentle worker;
- #18 reaches accepted remote checkpoint and closes before #19 begins;
- #19 reaches accepted remote checkpoint and closes;
- native RDD completes as required;
- final local HEAD, configured upstream, and remote branch agree;
- worktree clean;
- no human intervention after the two-line prompt;
- no merge, rebase/reset, force-push, PR, branch switch, or permission-policy widening.

Any other result is STOP with evidence. Do not patch the architecture during the run.

## Not qualified by this stage

Even on PASS, Stage 8 does not prove:

- automatic creation/switching of an arbitrary work branch from a natural-language goal;
- automatic authoring of new tickets/specifications;
- scheduling multiple independent trains concurrently;
- crash/restart recovery of the Pi supervisor itself;
- final integration/merge/release policy.
