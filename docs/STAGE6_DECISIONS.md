# Atenea — Stage 6 Decision Delta

This file continues the durable decision log after `docs/STAGE5_DECISIONS.md` D-036.

## D-037 — Gentle native RDD is qualified on the OpenCode rc.2 epoch

**Status:** Accepted.

Gentle AI `v2.5.0-rc.2` with RDD enabled successfully froze candidates, ran native review, reached approved terminal state and completed exact acknowledgement on repeated executable changes. Atenea does not recreate RDD algorithms, receipts, candidate freezing or runtime adapters.

## D-038 — RDD consent and OpenCode shell permission are separate authorities

**Status:** Accepted.

A #10/#11 train stopped on OpenCode shell permission for `git commit` before reaching candidate-scoped RDD consent. The narrow lasting configuration permits Gentle-Orchestrator ordinary `git commit` and plain `git push` while retaining protection around argument-bearing push, force-push, rebase and destructive reset.

Do not treat generic shell permission as RDD consent and do not auto-answer unrelated blocked prompts.

## D-039 — The Herdr RDD event plugin is not baseline architecture

**Status:** Deferred / qualification artifact.

The event plugin helped expose event-name and transport details but native Gentle consent may be rendered as textual assistant output ending idle rather than as a Herdr `blocked` approval UI. Extending the plugin to parse multiple transports would move Atenea toward custom runtime reconstruction.

Keep it disarmed unless a future concrete property justifies revisiting it.

## D-040 — The deterministic consent gate is optional hardening, not baseline

**Status:** Deferred optional hardening.

A synchronous candidate-scoped gate was implemented, directly audited and reached a 37/37 mocked test suite. It proved that candidate/lineage/worker/branch/state-sequence/budget binding can be made deterministic.

The final Stage 6 train showed that this stronger authority separation is not required for the current operator goal. A trusted supervisor may directly relay native Gentle RDD consent through Herdr. Do not keep the gate in the ordinary execution path merely because it exists.

## D-041 — Pi is the Atenea supervisor

**Status:** Accepted baseline.

Pi owns lifecycle supervision around the engineering worker. It may inspect, wait for and communicate with the worker through native Herdr agent primitives and may relay native Gentle RDD consent.

Pi does not become the implementation/review engine. Gentle/OpenCode retain engineering ownership.

## D-042 — Pi direct Herdr supervision is qualified

**Status:** Accepted for the #12→#13 two-ticket train.

Pi supervised an already-created OpenCode/Gentle-Orchestrator worker through Herdr without the deterministic consent gate. Both tickets completed native RDD, acknowledgement, exact remote checkpointing and closure. No human response was needed after the simplified supervisor contract took over.

Final implementation checkpoint: `4ec0308ec542d55bcf9dfd36aac2afae791d55df`.

## D-043 — Baseline supervision is upstream-first and intentionally thin

**Status:** Accepted target architecture.

Baseline topology:

`Operator → Pi supervisor → Herdr → OpenCode/Gentle-Orchestrator worker`

Matt owns interactive authoring before the ready-for-agent boundary. Pi owns worker lifecycle and supervision. Herdr owns agent/process control. Gentle owns implementation, deterministic verification, native RDD, bounded repair, checkpointing, reconciliation and issue closure.

Do not add a daemon, custom reviewer, custom RDD implementation or extra orchestration layer without a demonstrated missing property.

## D-044 — Manual pane discovery and rename are qualification scaffolding

**Status:** Accepted target simplification; self-launch not yet qualified.

The operator should not normally create OpenCode, discover its pane ID, rename it and manually bind it to Pi. The target is for Pi to create/name/start its own OpenCode/Gentle worker through Herdr.

Target operator interaction:

```text
Run Atenea issues #X and #Y unattended.
Create and manage your own OpenCode/Gentle worker through Herdr.
```

The next experiment qualifies only this remaining property.

## D-045 — The next experiment adds one property only: PI_SELF_CREATES_WORKER

**Status:** Qualification target.

The repository/branch/work-unit contract is prepared deterministically before the run. The operator launches only Pi and supplies the two-line work intent. Pi must create and manage its own worker through Herdr, complete the two-ticket train and report final deterministic state.

Do not mix branch-preparation automation, scheduler discovery or a new launcher into this experiment. Those can be evaluated after self-launch succeeds.
