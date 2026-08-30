# Atenea — Stage 7 Decision Delta

This file continues the durable decision log after Stage 6 D-045.

## D-046 — Pi self-launch through Herdr is qualified

**Status:** Accepted.

Pi successfully created a sibling pane, started/named an OpenCode worker through native Herdr primitives, dispatched the #14→#15 train, supervised lifecycle/RDD, and stopped after the final ticket without manual worker creation or binding by the operator.

The target property `PI_SELF_CREATES_WORKER` is therefore qualified.

## D-047 — The two-line operator interface is the baseline UX

**Status:** Accepted baseline.

The qualified operator intent is:

```text
Run Atenea issues #X and #Y unattended.
Create and manage your own OpenCode/Gentle worker through Herdr.
```

The operator should not normally discover pane IDs, launch OpenCode manually, rename the worker, arm a consent gate, or relay RDD answers.

## D-048 — Manual worker binding is retired from baseline

**Status:** Accepted.

Manual OpenCode creation, `herdr agent list`, pane-ID discovery, `agent rename`, and explicit supervisor/worker binding were qualification scaffolding. Pi now owns worker creation/start/naming through Herdr.

Keep manual operations available for debugging, not as the normal execution contract.

## D-049 — The deterministic consent gate remains optional hardening

**Status:** Deferred optional hardening.

Stage 7 again completed native RDD with Pi directly relaying trusted Gentle consent. No baseline property currently requires the supervisor to be cryptographically/deterministically prevented from granting consent itself.

Do not return the gate to the ordinary path absent a concrete failed property.

## D-050 — Native RDD escalation is accepted as a productive stop, not a train failure

**Status:** Accepted.

The first #15 candidate escalated because its candidate manifest/evidence did not establish the delegated precedence contract strongly enough. The worker added focused public-seam coverage, froze a new candidate, and the replacement lineage reached approval/acknowledgement.

A native RDD escalation that causes a new candidate and then resolves through the supported review lifecycle is expected bounded repair behavior, not a supervisor failure.

## D-051 — Upstream review transport fallback stays upstream-owned

**Status:** Accepted operational finding.

During the second #15 review, the normal transport returned raw reviewer JSON while the native review state remained in collect. The worker used Gentle's own `review capture-result --input` fallback with the exact collect binding and completed approval/acknowledgement.

Do not build Atenea-side capture/review transport machinery because of this observation. Preserve evidence and track upstream/runtime behavior separately if it recurs.

## D-052 — OpenCode push permission requires a narrow follow-up

**Status:** Follow-up required; Stage 7 self-launch remains PASS.

The worker attempted an argument-bearing push and encountered the existing OpenCode permission boundary. Pi added an agent-scoped `git push *` allow rule so the train could continue unattended.

The self-launch property is still qualified, but the resulting OpenCode permission order must be inspected and narrowed if necessary so ordinary delivery works without unintentionally authorizing force/rewrite push forms.

Track this as issue #16. This is permission-policy/environment hygiene, not a reason to add another supervisor layer.

## D-053 — Baseline architecture after Stage 7

**Status:** Accepted.

```text
Operator intent
  → Pi supervisor/worker-launcher
  → native Herdr control
  → OpenCode/Gentle-Orchestrator engineering worker
```

Matt owns ready-for-agent authoring before dispatch. Pi owns lifecycle/worker supervision and native RDD relay. Herdr owns process/agent control. Gentle/OpenCode own implementation, deterministic verification, native RDD, bounded repair, acknowledgement, checkpointing, reconciliation and issue closure.

No custom daemon, consent gate, event relay, external reviewer or manual worker-binding layer belongs in the baseline unless a future concrete property demonstrates the need.