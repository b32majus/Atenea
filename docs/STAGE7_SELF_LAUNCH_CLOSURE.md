# Atenea — Stage 7 Pi self-launch closure

## Executive result

Stage 7 qualifies the remaining operator-facing supervision property:

`PI_SELF_CREATES_WORKER=PASS`

The operator launched only Pi and supplied the intended two-line work intent. Pi then created, named, started, and managed its own OpenCode/Gentle-Orchestrator worker through native Herdr primitives, completed the #14→#15 dependency train, relayed native Gentle RDD consent, and stopped after #15.

Final qualification checkpoint:

- branch: `stage7-pi-self-launch-20260830`
- issue #14 checkpoint: `317a7f0e685d533cb6a646c0dd3143fef96c3560`
- issue #15 / final checkpoint: `79489688a6c6bd83ba8fd807cb87bdc0a59b94bf`
- final tree: `a26f95fbf2e7f390f6897575885cd00d65367903`
- #14: closed completed
- #15: closed completed
- final local/upstream/remote reported equal to the #15 checkpoint
- final worktree reported clean
- no merge, rebase/reset, force-push, PR, or branch switch
- no human intervention after the two-line operator prompt

## Operator interface qualified

```text
Run Atenea issues #14 and #15 unattended.
Create and manage your own OpenCode/Gentle worker through Herdr.
```

No worker pane ID, manual OpenCode launch, manual rename/binding, deterministic consent gate, or manual RDD answer was supplied by the operator.

## Worker creation evidence

Pi used Herdr directly:

1. `herdr pane split --current --direction right --cwd $PWD --no-focus` created pane `w1F:pJ`;
2. `herdr agent start atenea-worker --kind opencode --pane w1F:pJ` started the OpenCode worker, with Gentle-Orchestrator as the worker agent;
3. Pi waited for the worker to settle and then dispatched `Implement GitHub issue #14.`;
4. after #14 reached an accepted remote checkpoint and closed, Gentle advanced to #15 on the same branch;
5. Pi continued lifecycle supervision and RDD consent relay until terminal completion.

This removes manual pane discovery, manual rename, and manual supervisor/worker binding from the baseline operator path.

## Issue #14

`effective-mode: introduce a precedence-only selection helper`

Accepted commit:

`317a7f0e685d533cb6a646c0dd3143fef96c3560`

Implementation:

- added `tools/effective-mode/select-mode.js`;
- pure `selectMode({ envValue, configValue })` owns selection only;
- precedence remains `environment > config > default`;
- built-in default remains `full`;
- no resolver wiring in #14;
- focused helper tests added.

Reported evidence:

- native RDD lineage `review-91d4c65a43df5d6e`;
- approved + acknowledged;
- new helper tests 7/7 and complete suite green;
- exact push/reconciliation before issue closure.

## Issue #15

`effective-mode: delegate resolver selection to the shared precedence helper`

Accepted/final commit:

`79489688a6c6bd83ba8fd807cb87bdc0a59b94bf`

Implementation:

- `resolve.js` retains `validatePresentCandidates(...)` as the validation owner;
- after validation, resolver delegates selection/default attribution to `selectMode(...)`;
- focused public-seam resolver coverage was added;
- reported full suite: 122/122.

### RDD escalation was meaningful

The first #15 candidate, lineage `review-79785b2e927425dc`, escalated with a CRITICAL finding because the candidate manifest did not include enough evidence around the helper/contract to establish preserved precedence behavior.

The worker added a focused public-seam resolver test and froze a new candidate. The replacement lineage `review-a97be2b11006d2ff` completed review with no findings and was approved/acknowledged.

This is positive Stage 7 evidence: native RDD did not merely rubber-stamp the first candidate; it forced a new candidate/evidence boundary before acceptance.

### Review transport fallback observation

During the second #15 review, the normal transport returned raw reviewer JSON twice while STATUS remained in collect. The worker used the upstream `gentle-ai review capture-result --input ...` fallback with the exact collect binding, after which the review reached approved state and acknowledgement was burned.

This is an upstream/runtime transport observation, not a reason to add custom Atenea review machinery. Preserve it as diagnostic evidence.

## Baseline architecture after Stage 7

```text
Operator work intent
      │
      ▼
Pi — Atenea supervisor + worker launcher
      │
      │ native Herdr primitives
      ▼
OpenCode / Gentle-Orchestrator worker
      │
      ├─ implementation
      ├─ deterministic verification
      ├─ native RDD / bounded repair
      ├─ acknowledgement
      ├─ commit
      ├─ push / fetch / exact reconciliation
      ├─ issue closure
      └─ dependency progression
```

Matt remains the upstream authoring system before the ready-for-agent handoff. Pi owns worker lifecycle and supervision. Herdr owns agent/process control. Gentle/OpenCode own engineering and review.

## Permission-policy follow-up

Stage 7 exposed one separate OpenCode permission-policy issue. The worker used an argument-bearing `git push origin <branch>`, while the previously qualified Gentle-Orchestrator override allowed only plain `git push`. Pi responded by adding an agent-scoped `git push *` allow rule to the global OpenCode configuration.

This does not invalidate `PI_SELF_CREATES_WORKER`, but the resulting permission order must be audited before the baseline is frozen because an overly broad agent-specific `git push *` rule may also match undesirable push forms depending on later exceptions. Track this separately in issue #16.

Preferred baseline remains narrow: ordinary unattended delivery should work, while force-push/rewrite behavior remains ask/deny.

## Final verdict

```text
STAGE7_PI_SELF_LAUNCH=PASS
PI_SELF_CREATES_WORKER=PASS
PI_DIRECT_HERDR_SUPERVISION=PASS
TWO_LINE_OPERATOR_INTERFACE=PASS
ISSUE_14=CLOSED
ISSUE_15=CLOSED
FINAL_IMPLEMENTATION_HEAD=79489688a6c6bd83ba8fd807cb87bdc0a59b94bf
CONSENT_GATE_REQUIRED=NO
MANUAL_WORKER_BINDING_REQUIRED=NO
PERMISSION_POLICY_FOLLOWUP=OPEN (#16)
```

Stage 7 should not be rerun merely to obtain a cleaner narrative. The target property is qualified. Address the permission-policy follow-up independently, then move to the next genuinely unqualified product property.