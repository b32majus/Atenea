# Atenea — Matt-to-Gentle Handoff Contract

This is the normative boundary between Matt Pocock greenfield authoring and
Gentle unattended execution in Atenea.

## Ownership boundary

Matt owns interactive greenfield discovery, domain/spec authoring and ticket
authoring:

`grill-with-docs → CONTEXT / ADR → to-spec → clean-context SPEC audit →
to-tickets → clean-context TICKET/HANDOFF audit → ready-for-agent`

Matt triage remains installed for raw incoming issues that Matt did not create.
Generated `to-tickets` issues do not go through triage and do not require an
Agent Brief.

Gentle owns unattended execution after the contract is ready. It selects
direct/delegated routing, performs deterministic verification and reports the
execution/closure state. KairOS is a future thin scheduler, supervisor and
delivery coordinator only.

## Handoff inputs

A handoff consists of:

- an unblocked `ready-for-agent` GitHub ticket;
- its parent/spec reference where applicable;
- durable repository authority, including `CONTEXT.md`, ADRs and coding
  standards;
- dependency state;
- a genuinely fresh execution session.

No Agent Brief translation, KairOS work-unit schema, OpenSpec conversion or
hand-written executor prompt is required. The normal dispatch prompt is:

`Implement GitHub issue #N.`

The Matt authoring conversation must not be carried into the Gentle session.

## Pre-handoff gate

After `to-tickets` and before dispatch, run a clean-context Handoff Contract
Gate. It must pass:

- coverage;
- dependencies;
- vertical-slice executability;
- deterministic acceptance;
- authority consistency;
- temporal slice exclusivity.

Temporal slice exclusivity means:

- every observable parent behavior has one first-introducing ticket;
- an earlier ticket may establish a seam/interface used later without making
  later-ticket behavior observable;
- acceptance criteria do not accidentally require behavior owned by a later
  ticket;
- if adjacent slices share a seam and ambiguity is material, repair the ticket
  before dispatch with explicit deferred ownership.

Do not require verbose deferral boilerplate when ownership is already
unambiguous.

## Fresh-session dispatch

Only after deterministic preflight and the semantic gate pass:

1. identify the unblocked ready ticket;
2. start a genuinely fresh Gentle-Orchestrator session;
3. send only `Implement GitHub issue #N.`;
4. observe routing, bounded writes, deterministic verification and execution
   state.

RDD is not implied by this contract; native Gentle RDD is a separate later
qualification.

## Post-execution remote reconciliation

After Gentle implementation and before candidate closure, perform a fresh remote
fetch and reconcile authoritative remote state. Acceptance is blocked until
this gate passes.

The gate distinguishes:

### Working-branch remote drift

Verify that the execution branch's remote ref has not advanced unexpectedly or
diverged due to another actor.

- `REMOTE_BRANCH_DRIFT=YES` means STOP / NEEDS_DECISION.
- Never silently force-push or overwrite competing remote history.

### Integration-target drift

Record whether the designated integration target, normally `origin/main`,
has advanced since the work unit's starting point.

Target-branch drift may be recorded and deferred to the train's
integration/delivery gate. Per-ticket closure does not require rebasing or
merging every tracer-bullet ticket onto current `main`. Before final
integration/merge, the train must reconcile with the current target branch and
rerun required verification.

## Review order when RDD is enabled

Review authority must bind to the reconciled candidate:

`implementation → fetch/reconcile authoritative remote state →
deterministic verification → freeze review candidate → Gentle native RDD →
acknowledgement / terminal state → exact durable checkpoint → delivery/closure`

Do not approve SHA/tree A and then mutate or rebase into SHA/tree B without a
new candidate and review cycle.

## Post-implementation Closure Gate

Before closing a dependency ticket, require:

- current acceptance criteria PASS;
- temporal/scope discipline PASS;
- behavioral test evidence PASS;
- coding-standard/canary evidence where applicable;
- diff containment PASS;
- exact HEAD and TREE known;
- remote reconciliation PASS (`REMOTE_RECONCILIATION=PASS`);
- exact HEAD and TREE of the accepted implementation known;
- a remote checkpoint exists.

The closure record must distinguish `REMOTE_BRANCH_DRIFT=` from
`INTEGRATION_TARGET_DRIFT=` and retain the exact accepted implementation
HEAD/TREE even when later documentation commits exist on the same branch.
Issue closure means that the work unit has an accepted durable remote
checkpoint. Merge/release remains a separate repository delivery concern, so
GitHub-native blockers can unblock the next work unit without each tracer
bullet merging independently to main.

## Automation shape

A future automation should be a thin gate/dispatcher that identifies an
unblocked ready ticket, runs deterministic preflight and the clean-context
Handoff Contract Gate, starts a fresh Gentle session on PASS, sends only the
minimal prompt, and observes execution and closure state.

It must not carry Matt context into Gentle. Prefer a project command outside the
skill registry or, ultimately, a thin KairOS dispatcher. Do not implement the
boundary as another project-local `.agents/skills` skill because Gentle's
registry can discover and inject project skills.

## Non-goals

This contract does not:

- implement Matt skills, Gentle RDD, TDD or code review;
- remove or modify Matt `implement`, `tdd` or `code-review`;
- translate tickets into Agent Briefs or a KairOS schema;
- recreate SDD/OpenSpec authoring during execution;
- merge, release or otherwise replace repository delivery policy.
