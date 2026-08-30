# Atenea — Stage 6 RDD and Herdr supervision closure

## Executive result

Stage 6 qualifies native Gentle RDD on OpenCode and a thin Herdr-supervised two-ticket train without a permanent external reviewer or custom RDD implementation.

Final zero-touch train:

- repository: `b32majus/Atenea`
- branch: `stage6-zero-touch-final-20260830`
- base: `eb2bc74b13febcb444293828a4f2eaf6f7af199f`
- issue #12 checkpoint: `764b5f5cd4b36b6620923c6efc0087ce9532e6ff`
- final issue #13 checkpoint: `4ec0308ec542d55bcf9dfd36aac2afae791d55df`
- final tree: `4cf69966c7f8c5a4d2bb280d1c3e96367d3c92ee`
- no PR, merge, rebase, reset, force-push or branch switch
- #12 and #13 closed only after exact remote reconciliation

Final verdict:

```text
STAGE6_NATIVE_RDD=PASS
PI_DIRECT_SUPERVISION=PASS
HERDR_AGENT_CONTROL=PASS
AUTONOMOUS_TWO_TICKET_TRAIN=PASS
CONSENT_GATE_REQUIRED_FOR_BASELINE=NO
PI_SELF_CREATES_WORKER=NOT_YET_QUALIFIED
```

## Qualified runtime epoch

Stage 6 deliberately moved from the frozen Stage 5 epoch to Gentle AI `v2.5.0-rc.2` with native RDD enabled. Stage 5 evidence on rc.1/RDD OFF remains historical evidence and is not rewritten.

Native RDD properties observed across Stage 6 included candidate freeze, typed consent, multi-lens review where applicable, approved terminal state, explicit acknowledgement and candidate-bound lifecycle behavior.

## Qualification progression

### Native RDD baseline

A zero-lens candidate demonstrated that rc.2 review mode could be enabled, start a frozen candidate, recover bound state, reach approval and acknowledgement, and clean up without Atenea recreating RDD internals.

A first unattended attempt then showed an important boundary: a minimal execution prompt did not reliably cause the model to enter the native review lifecycle even though RDD was enabled. The defect boundary was model/orchestrator adherence to review entry, not RDD mechanics themselves.

A reinforced execution instruction subsequently produced native RDD successfully. Later two-ticket trains reproduced native RDD, exact acknowledgement and remote checkpointing without an external reviewer loop.

### Shell-permission boundary

The #10/#11 train demonstrated a separate OpenCode permission boundary: the worker stopped on a non-RDD `git commit` shell permission before reaching RDD consent. The run failed safe; no RDD authorization was fabricated.

The lasting fix was deliberately narrow and agent-scoped: Gentle-Orchestrator may perform ordinary `git commit` and plain `git push`, while argument-bearing push, force-push, rebase and destructive reset remain outside the ordinary unattended path. This separates OpenCode shell permission from Gentle candidate-scoped RDD consent.

### Herdr consent plugin experiment

A Herdr event plugin was explored as a deterministic RDD consent relay. It proved useful diagnostically but is not baseline architecture.

Two observations retired that direction:

1. Herdr 0.8.0 exposes dotted plugin event names while the serialized JSON event field used snake_case, causing the first handler to ignore the event until repaired.
2. More importantly, legitimate Gentle `consent/v3` may be rendered by OpenCode as ordinary assistant text ending in an idle state rather than as a Herdr `blocked` approval UI. An event-only blocked transport therefore cannot cover the supported native behavior without growing into a terminal parser.

The plugin remains a qualification artifact and should stay disarmed.

### Deterministic consent gate experiment

A synchronous candidate-scoped consent gate was then built and directly audited. It bound authorization to exact worker identity, branch, Gentle RDD mode, candidate SHA, lineage, Herdr `state_change_seq`, finite grant budget and durable candidate de-duplication. Its test suite reached 37/37 after repairing interactive choice binding and stale textual-consent rejection.

The gate proved that a stricter trust boundary is possible, but the final architectural decision is that it is not required for the baseline workflow. It added ceremony to solve a property that the operator does not currently require: preventing a trusted supervisor from directly relaying native Gentle RDD consent.

Keep the gate as optional future hardening, not a mandatory execution dependency.

## Final #12 → #13 train

The decisive run used Pi as a trusted supervisor and OpenCode/Gentle-Orchestrator as the engineering worker, connected through native Herdr agent primitives.

Pi did not implement code. It observed the worker, waited/read through Herdr and directly relayed native Gentle RDD consent. Gentle/OpenCode retained ownership of implementation, deterministic verification, native review/repair, acknowledgement, commit, plain push, fetch/reconciliation and issue closure.

### Issue #12

`effective-mode: extract single-candidate mode validation into a shared helper`

- accepted commit: `764b5f5cd4b36b6620923c6efc0087ce9532e6ff`
- native RDD lineage: `review-f6b5b3abbee40c48`
- review: approved + acknowledged
- suite: 108/108
- result: closed at exact remote checkpoint

### Issue #13

`effective-mode: centralize ordered validation of present resolver candidates`

- accepted/final commit: `4ec0308ec542d55bcf9dfd36aac2afae791d55df`
- native RDD lineage: `review-d308409b86229bab`
- review: approved + acknowledged
- suite: 114/114
- result: closed at exact remote checkpoint

The final supervisor verification reported local HEAD, configured upstream and remote branch all equal to `4ec0308ec542d55bcf9dfd36aac2afae791d55df`, with a clean worktree.

## Baseline architecture after Stage 6

```text
Operator intent
      │
      ▼
Pi — Atenea supervisor
      │
      │ native Herdr agent primitives
      ▼
OpenCode / Gentle-Orchestrator
      │
      ├─ implement
      ├─ deterministic verification
      ├─ native RDD
      ├─ review / bounded repair / acknowledgement
      ├─ commit
      ├─ plain push
      ├─ fetch / exact remote reconciliation
      └─ issue closure / next dependency frontier
```

Pi owns lifecycle supervision and native RDD consent relay. Gentle owns engineering and review. Herdr owns process/pane/agent control. Matt remains upstream authoring authority before the ready-for-agent handoff.

## Qualification-only scaffolding removed from baseline

The following are not required baseline components:

- Herdr RDD event plugin;
- deterministic consent gate;
- permanent Codex reviewer;
- manual post-Gentle review loop;
- custom daemon/poller;
- custom RDD implementation;
- manual pane discovery and rename as an intended operator UX.

Manual worker creation/renaming was used to make the decisive run observable. The next experiment exists specifically to remove that remaining operator ceremony.

## Next unqualified property

Only one new property should be added in the next experiment:

`PI_SELF_CREATES_WORKER`

The operator should start only Pi and provide work intent. Pi must create/name/start its own OpenCode/Gentle worker through Herdr, dispatch the train, supervise native RDD directly and verify terminal state.

Target operator interface:

```text
Run Atenea issues #14 and #15 unattended.
Create and manage your own OpenCode/Gentle worker through Herdr.
```

Do not add another orchestration layer unless this simple upstream-first path demonstrates a concrete missing property.
