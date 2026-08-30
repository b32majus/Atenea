# Atenea — Matt-to-Gentle Handoff Contract

This is the normative boundary between Matt Pocock greenfield authoring and Gentle unattended execution in Atenea.

Stage 5 qualified the direct/delegated version of this contract on OpenCode 1.18.25 with Gentle AI v2.5.0-rc.1 and RDD OFF. Native Gentle RDD remains Stage 6.

## Ownership boundary

Matt owns interactive greenfield discovery, domain/spec authoring and ticket authoring:

`grill-with-docs → CONTEXT / ADR → to-spec → clean-context SPEC audit → to-tickets → clean-context TICKET/HANDOFF audit → ready-for-agent`

Matt triage remains installed for raw incoming issues that Matt did not create. Generated `to-tickets` issues do not go through triage and do not require an Agent Brief.

Gentle owns unattended execution after the contract is ready. It selects direct/delegated routing, implements, verifies deterministically, reconciles remote state and may create the exact remote work-unit checkpoint when safe.

KairOS is a future thin scheduler, supervisor and delivery coordinator only.

## Handoff inputs

A handoff consists of:

- an unblocked `ready-for-agent` GitHub ticket;
- its parent/spec reference where applicable;
- durable repository authority, including `CONTEXT.md`, ADRs and coding standards;
- dependency state;
- a genuinely fresh execution session.

No Agent Brief translation, KairOS work-unit schema, OpenSpec conversion, copied authoring summary or hand-written executor prompt is required.

The normal dispatch prompt is:

`Implement GitHub issue #N.`

The Matt authoring conversation must not be carried into the Gentle session.

## Pre-handoff Handoff Contract Gate

After `to-tickets` and before dispatch, run a bounded clean-context semantic gate. It must pass:

- coverage;
- dependencies;
- vertical-slice executability;
- deterministic acceptance;
- authority consistency;
- temporal slice exclusivity.

Temporal slice exclusivity means:

- every observable parent behavior has one first-introducing ticket;
- an earlier ticket may establish a seam/interface used later without making later-ticket behavior observable;
- acceptance criteria do not accidentally require behavior owned by a later ticket;
- if adjacent slices share a seam and ambiguity is material, repair the ticket before dispatch with explicit deferred ownership.

Do not add verbose deferral boilerplate when ownership is already unambiguous. The gate is a semantic guardrail, not a second planning/specification system.

## Fresh-session dispatch

Only after deterministic preflight and the semantic gate pass:

1. identify the unblocked ready ticket;
2. create/select the execution branch from the exact accepted predecessor checkpoint;
3. start a genuinely fresh Gentle-Orchestrator session;
4. send only `Implement GitHub issue #N.`;
5. observe routing, bounded writes, deterministic verification and execution state.

RDD is not implied by this contract. Native Gentle RDD is a separate later qualification.

## Execution and deterministic verification

For a clean Stage 5 work unit, Gentle is expected to:

- read the current tracker/repository authority;
- avoid recreating already-complete Matt planning through SDD;
- use direct/delegated routing as appropriate;
- implement only the current ticket's observable behavior;
- preserve later-slice ownership;
- use behavioral/deterministic tests where possible;
- respect durable coding/testing rules without having them copied into the dispatch prompt.

Passing tests alone are not sufficient if they are tautological or fail to exercise observable behavior.

## External review policy

A permanent second LLM reviewer after every Gentle unit is **not** part of the target architecture.

During qualification, external audits may be used to learn the boundary, sample exact checkpoints or investigate a defect signal. T1/T2 used more external scaffolding; T3/T4 intentionally removed the Codex reviewer/repair loop from execution and checkpoint creation.

When Stage 6 enables native Gentle RDD, RDD owns the review/repair lifecycle. Atenea/KairOS must not recreate that lifecycle in parallel.

## Post-execution remote reconciliation

After implementation and before candidate acceptance, perform a fresh remote fetch and reconcile authoritative remote state.

### Working-branch remote drift

Verify that the execution branch's remote ref has not advanced unexpectedly or diverged due to another actor.

- `REMOTE_BRANCH_DRIFT=YES` means STOP / NEEDS_DECISION.
- Never silently force-push or overwrite competing remote history.

### Integration-target drift

Record whether the designated integration target, normally `origin/main`, has advanced since the work unit's starting point.

Target-branch drift may be recorded and deferred to the train's integration/delivery gate. Per-ticket closure does not require rebasing or merging every tracer-bullet ticket onto current `main`.

Before final integration/merge, the train must reconcile with the current target branch and rerun required verification.

## Candidate checkpoint

A safe work-unit checkpoint binds the accepted implementation to exact repository identity:

- branch;
- implementation HEAD;
- implementation TREE;
- predecessor/parent HEAD;
- test evidence;
- diff containment;
- tracked-clean state after commit;
- remote branch HEAD exactly equal to the implementation HEAD.

Gentle may create this commit/push checkpoint itself when deterministic checks pass. T3 and T4 qualified that shape.

A narrative field never overrides deterministic git state. If a status summary conflicts with `git status`, exact refs or tests, the deterministic evidence is authoritative.

## Review order when RDD is enabled

Review authority must bind to the reconciled candidate:

`implementation → fetch/reconcile authoritative remote state → deterministic verification → freeze review candidate → Gentle native RDD → acknowledgement / terminal state → exact durable checkpoint → delivery/closure`

Do not approve SHA/tree A and then mutate or rebase into SHA/tree B without a new candidate and review cycle.

## Post-implementation Closure Gate

Before closing a dependency ticket, require:

- current acceptance criteria PASS;
- temporal/scope discipline PASS;
- behavioral test evidence PASS;
- coding-standard/canary evidence where applicable;
- diff containment PASS;
- exact implementation HEAD and TREE known;
- `REMOTE_RECONCILIATION=PASS`;
- no unexpected same-branch remote drift;
- remote branch HEAD exactly equal to the accepted implementation HEAD;
- tracked working tree clean except explicitly known untracked runtime artifacts.

The closure record must distinguish `REMOTE_BRANCH_DRIFT=` from `INTEGRATION_TARGET_DRIFT=` and retain the exact accepted implementation HEAD/TREE even when later documentation commits exist on the same branch.

Issue closure means that the work unit has an accepted durable remote checkpoint. Merge/release remains a separate repository delivery concern, so GitHub-native blockers can unblock the next work unit without each tracer bullet merging independently to main.

## Automation shape

A future automation should be a thin dispatcher/supervisor that:

1. discovers an unblocked `ready-for-agent` ticket;
2. checks deterministic predecessor/branch/repository state;
3. runs the semantic Handoff Contract Gate in clean context;
4. starts a genuinely fresh Gentle session on PASS;
5. sends only the minimal dispatch prompt;
6. observes deterministic execution/checkpoint state;
7. runs deterministic closure;
8. advances to the next dependency frontier.

It must not carry Matt context into Gentle and must not own planning, implementation, reviewer or repair internals.

Prefer a project command outside the skill registry or, ultimately, a thin KairOS dispatcher. Do not implement the boundary as another project-local `.agents/skills` skill because Gentle's registry can discover and inject project skills.

## Known integration findings

- Gentle's registry can resolve Matt's project-local `implement` skill.
- Matt's `disable-model-invocation: true` frontmatter is not a Gentle registry isolation boundary.
- This is handled by workflow ownership and observation, not by deleting or patching Matt skills.
- Engram availability means a fresh session is not strict persistent-memory isolation; durable authority must still win over stale memory.
- Gentle OpenCode workspace scope remains avoided for the baseline because of upstream issue #3128; Gentle is global and Matt remains project-local.

## Non-goals

This contract does not:

- implement Matt skills, Gentle RDD, TDD or code review;
- remove or modify Matt `implement`, `tdd` or `code-review`;
- translate tickets into Agent Briefs or a KairOS schema;
- recreate SDD/OpenSpec authoring during execution;
- require a permanent Codex/external reviewer after every clean work unit;
- merge/rebase every ticket onto `main` before closure;
- merge, release or otherwise replace repository delivery policy.

See `docs/STAGE5_TRACER_TRAIN.md` for the evidence behind this contract.
