# Atenea — Qualification Protocol and Status

## Goal

Determine whether **vanilla full Matt Pocock skills + vanilla full Gentle AI on OpenCode** can form a clean interactive-to-unattended engineering workflow without custom Matt→Gentle integration code.

The experiment is intentionally staged so failures can be attributed to a specific layer instead of immediately patched with new glue.

## Current qualification status

```text
STAGES_0_4=PASS
STAGE5_DIRECT_DELEGATED_COMPOSITION=PASS
STAGE6_NATIVE_RDD=NOT_YET_QUALIFIED
AUTONOMOUS_MULTI_TICKET_DISPATCH=NOT_YET_QUALIFIED
FINAL_TRAIN_INTEGRATION=NOT_YET_QUALIFIED
```

Stage 5 evidence is frozen on:

- OpenCode `1.18.25`;
- Gentle AI `v2.5.0-rc.1`;
- RDD OFF;
- full Matt project-local ecosystem;
- full Gentle OpenCode installation, global because of upstream workspace issue #3128.

See `docs/STAGE5_TRACER_TRAIN.md` for the factual closure record.

## Stage 0 — Environment inventory — PASS

Read-only inventory established which global assets could influence the Atenea session:

- OpenCode version/config sources;
- existing Gentle binary/state;
- Matt/Gentle/other skill roots;
- global/project agents, commands and plugins;
- relevant environment variables.

See `docs/STAGE0_ENVIRONMENT.md`.

## Stage 1 — Controlled cleanup — PASS

Conflicting/partial Matt and Gentle state was removed while unrelated VPS/OpenCode infrastructure was preserved.

See `docs/STAGE1_CLEANUP.md`.

## Stage 2 — Full upstream installation — PASS

The baseline installed complete upstream ecosystems rather than selected fragments.

Important result:

- Gentle workspace scope was rejected for the OpenCode baseline because upstream issue #3128 writes to a path OpenCode does not use as project-local discovery;
- Gentle therefore remained global;
- Matt remained project-local;
- RDD stayed OFF during installation/direct execution qualification.

See `docs/STAGE2_INSTALL.md` and `docs/STAGE2_MATT_SETUP.md`.

## Stage 3 — Skill discovery compatibility — PASS

Gentle's registry discovered the Matt project skill set from the original project `SKILL.md` paths without a translation layer.

Important integration finding: Matt `disable-model-invocation: true` is not a Gentle registry isolation boundary; Gentle may resolve Matt `implement`. Do not delete/rename/filter Matt skills to hide that behavior.

See `docs/STAGE3_SKILL_REGISTRY.md`.

## Stage 4 — Matt authoring qualification — PASS

Qualified greenfield authoring path:

`grill-with-docs → CONTEXT / ADR → to-spec → clean SPEC audit → to-tickets → clean TICKET/HANDOFF audit → ready-for-agent`

Generated Matt `to-tickets` issues do not require triage or an Agent Brief. Triage remains valid for raw incoming issues Matt did not create.

The fixture used a durable project testing rule:

`Tautological tests considered harmful.`

The authored tracer train became:

- #2 T1 — built-in default;
- #3 T2 — convention config;
- #4 T3 — environment precedence/validation;
- #5 T4 — argv, explicit config and help.

## Handoff Contract Gate

Before unattended dispatch, run a bounded clean-context semantic gate over the current frontier ticket.

It checks:

- coverage;
- blockers/dependencies;
- vertical-slice executability;
- deterministic acceptance;
- authority consistency;
- temporal slice exclusivity.

Temporal slice exclusivity means every observable parent behavior has one first-introducing ticket. Earlier slices may establish seams for later work without making later behavior observable.

T1 demonstrated why this matters: its initial contract was materially ambiguous and Gentle implemented T3 environment behavior early. After one focused ticket repair, T1 was repaired correctly and T2/T3/T4 required zero repair cycles.

The gate is therefore retained as a semantic guardrail, not expanded into a second planning framework.

See `docs/HANDOFF_CONTRACT.md`.

## Stage 5 — Fresh-session direct/delegated handoff — PASS

Every execution session starts fresh and receives the intentionally minimal prompt:

`Implement GitHub issue #N.`

The executor is not told which repository files to read, which Matt skills to invoke, how to route models, how to perform TDD, or how to recreate the authoring conversation.

### Cross-ecosystem continuity

PASS: Gentle consumed durable issue/repository authority and the Matt-side anti-tautology rule without that rule being copied into the execution prompt.

Engram remained available, so this proves fresh conversational/session context rather than strict persistent-memory isolation. Changed durable authority nevertheless overrode stale prior implementation during the T1 repair.

### Stage 5 tracer ledger

| Slice | Issue | Accepted HEAD | TREE | Tests | Repairs |
|---|---:|---|---|---:|---:|
| T1 | #2 | `5d070ac095503f1a4348a77a5d023801943074b5` | `0cda7154567723e44089929cc1417eec43109ccf` | 4/4 | 1 |
| T2 | #3 | `fcbbd224183d8af37ab561b8ecce911f33ad93cc` | `b31e22cdf837670750e15c23646f768f652e6037` | 15/15 | 0 |
| T3 | #4 | `ad5c19db57cdc7efe78bb0010635172c1f50bdf2` | `fa547db8c6e2bb2577b0fb11408d21b65aaee01b` | 32/32 | 0 |
| T4 | #5 | `c06a88620a15d9e8ff5570892d84a551ac1a8e95` | `2ee5d8d37dbdb6c83effbd20c11106006e5b1a76` | 49/49 | 0 |

All four dependency tickets are closed at accepted remote checkpoints.

### Reviewer scaffolding progression

Qualification deliberately reduced external scaffolding as confidence grew:

- T1: external audit found scope drift; one bounded repair;
- T2: pre-handoff gate PASS + independent audit PASS; zero repairs;
- T3/T4: Gentle performed implementation, deterministic verification, remote reconciliation, commit and push without a Codex reviewer/repair loop; exact-SHA audits remained laboratory observation before deterministic closure.

Do not convert the qualification audits into a permanent second reviewer harness. Stage 6 exists to qualify native Gentle RDD.

## Post-execution remote reconciliation

Every work unit performs a fresh fetch before acceptance.

### Working-branch drift

Unexpected same-branch drift:

`REMOTE_BRANCH_DRIFT=YES → STOP / NEEDS_DECISION`

Never silently force-push competing remote history.

### Integration-target drift

Record whether `origin/main` advanced, but do not automatically rebase/merge each dependency ticket before closure.

Ticket closure and train integration are separate gates. Before final integration/merge, reconcile with current target state and rerun required verification.

## Candidate checkpoint

An accepted direct/delegated candidate records:

- branch;
- implementation HEAD;
- implementation TREE;
- predecessor HEAD;
- deterministic tests;
- diff containment;
- tracked-clean state;
- remote branch HEAD equal to implementation HEAD.

T3/T4 qualified Gentle creating this checkpoint itself after deterministic checks.

## Closure Gate

Before closing a dependency ticket, require:

- current acceptance PASS;
- temporal/scope discipline PASS;
- behavioral test evidence PASS;
- coding-standard/canary evidence where applicable;
- diff containment PASS;
- exact implementation HEAD/TREE;
- `REMOTE_RECONCILIATION=PASS`;
- no unexpected same-branch drift;
- exact remote checkpoint;
- tracked tree clean except explicitly known untracked runtime artifacts.

Issue closure records an accepted work-unit checkpoint. It is not a merge/release event.

## Stage 6 — RDD/runtime behavior — NEXT

Stage 6 is an explicit runtime qualification epoch:

- Stage 5: Gentle `v2.5.0-rc.1` / RDD OFF — frozen PASS evidence;
- Stage 6: upgrade deliberately to Gentle `v2.5.0-rc.2` / RDD ON.

Do not silently upgrade inside Stage 5 or retroactively mix rc.2 behavior into the rc.1 evidence.

Before enabling RDD:

1. record exact installed binary/version;
2. run Gentle `doctor`;
3. verify managed OpenCode assets;
4. verify the skill registry remains healthy;
5. verify Matt project skills still resolve as expected;
6. record the configuration diff caused by the upgrade;
7. only then enable RDD.

### rc.2 OpenCode targets

Field-test, where applicable:

- negotiated review to approval;
- exact-token `review.acknowledge-approved` execution;
- STATUS restart before acknowledgement replaying the same pending transition;
- wrong/stale/replayed acknowledgement refusing without side effects;
- zero-lens approval path;
- correction with an untracked artifact;
- opaque `repository_context` digest and wrong-repository refusal;
- bounded fail-closed refusal behavior.

Review authority must bind to the reconciled candidate:

`implementation → fetch/reconcile → deterministic verification → freeze candidate → native RDD → acknowledgement/terminal state → exact durable checkpoint → closure/delivery`

A SHA/TREE change after approval requires a new candidate/review cycle.

Atenea must not recreate RDD algorithms, receipts, candidate freezing, lifecycle state or runtime adapters in custom code.

## Later qualification — thin autonomous progression

Stage 5 used a human to select the next frontier, create/start the next fresh execution context and perform closure actions.

A later stage must prove that a deliberately thin dispatcher can:

1. discover the next unblocked `ready-for-agent` ticket;
2. verify predecessor/branch/repository state;
3. run the Handoff Contract Gate;
4. start a genuinely fresh Gentle session;
5. dispatch the minimal prompt;
6. observe deterministic checkpoint/RDD state;
7. close the accepted work unit;
8. advance to the next dependency frontier.

This dispatcher must not become another skill-based planning/implementation/review harness.

## Evidence and cost

Record for later runs:

- exact Gentle version/commit;
- models used;
- observable agent/model calls;
- token/cost information if available;
- human interventions;
- implementation result and tests;
- review findings and repairs;
- whether candidate identity changed after review;
- lifecycle/recovery behavior;
- final repository state.

Do not add CodeGraph merely to improve baseline numbers. Establish the vanilla baseline first, then measure optimization separately.

## Deferred surfaces

Not part of the current qualified baseline:

- Pi runtime;
- OpenSpec brownfield/evolutionary authoring;
- Convoy unless Gentle fails a required property;
- CodeGraph optimization;
- final PR/merge/release policy;
- strict memory-isolation qualification with Engram disabled.

## Decision semantics

### PASS

The tested layer works through supported interfaces without meaningful custom glue.

### CONDITIONAL PASS

The architecture works but requires a bounded explicit ownership/configuration policy. Document the exact requirement.

### FAIL

The ecosystems conflict structurally or require substantial custom orchestration. Diagnose and compare alternatives before patching.

## Non-goals

- rebuilding production KairOS during qualification;
- reconstructing Gentle RDD;
- translating Matt tickets into a custom schema;
- benchmarking every model/provider before workflow correctness;
- adding optimizations that obscure the vanilla baseline.
