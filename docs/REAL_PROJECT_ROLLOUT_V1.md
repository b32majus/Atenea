# Atenea Real-Project Rollout v1

Date: 2026-09-03
Status: ACTIVE

## Goal

Move from synthetic qualification to real project work without turning optional surfaces or upstream releases into another qualification ladder.

The Stage 5–8 execution architecture is already qualified. Real-project rollout validates repo-specific seams and materially changed upstream behavior that has not yet been exercised naturally.

Judit #76 / PR #79 supplied the first real Gentle AI `2.5.0` stable field evidence. The negotiated-v2 zero-touch investigation then proved the missing unattended behavior through a bounded provider-side canary without modifying production Gentle or rewriting provider transitions in Pi/OpenCode.

Issue #38 then completed the first **real operator-triggered end-to-end run** through the actual operator interface on a real `EXECUTION_READY` documentation work item. The human started Pi manually inside Herdr and gave one bounded execution prompt; from that point the accepted run completed with exact-candidate RDD, acknowledgement/burn, normal non-force publication, PR/checkpoint reconciliation and frontier stop.

Evidence:

- `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`
- `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`
- issue #38 / PR #37 audit thread

The real operator path described below is therefore the **normal operator path**, not a one-off experiment.

## 1. Select the project and slice

Prefer a real repository that has:

- existing code and product authority;
- one bounded, valuable change with clear acceptance;
- no need for destructive migration or emergency production intervention;
- enough testability/deterministic evidence to distinguish success from narration;
- a normal GitHub delivery path;
- a human merge boundary for real runs.

Do not invent work merely to exercise an optional tool.

A normal run is a small bounded real issue whose implementation can naturally reach a normal non-force push + PR/checkpoint without requiring infrastructure migration, secrets rotation, production deployment or irreversible actions.

## 2. Repo onboarding audit

Before shaping a slice, record the current repo-native facts:

```text
repository / origin / default branch
canonical product authority
issue tracker / dependency semantics
current AGENTS / coding standards / domain docs
language / framework / deterministic verification commands
current delivery policy: checkpoint vs PR / human merge
current relevant upstream skill/config state
```

Only add missing repo-local policy. Do not clone Atenea's documentation tree mechanically into every vertical.

## 3. Choose shaping methods by need, not ritual

### Greenfield

Use Matt Pocock upstream shaping and setup semantics.

### Brownfield / evolutionary change

Preserve accepted repo-native shaping and product authority.

OpenSpec is optional. Select it delta-first only when a versioned proposal/spec/tasks flow materially improves a new brownfield delta. Existing accepted shaping does not need to be migrated through OpenSpec merely to conform to Atenea.

If a real slice naturally selects OpenSpec, capture one compatibility question:

> Can OpenSpec produce durable, unambiguous executable work that the already-qualified execution path can consume without a custom translation layer?

If yes, record field evidence. If no, diagnose the exact seam before adding glue.

### Task-triggered engineering methods

Matt engineering skills are methods, not phases:

```text
domain-modeling
  → when domain language/model changes

codebase-design
  → when module/interface/seam architecture is material

tdd
  → when a meaningful behavioral seam and independent oracle exist

diagnosing-bugs
  → when failure/regression causality is not established

code-review
  → when semantic/spec-compliance risk warrants an additional pre-RDD audit
```

## 4. Decide UI/design applicability during shaping

Before `EXECUTION_READY`, classify the slice:

```text
NO_MATERIAL_UI
or
MATERIAL_UI
```

If `NO_MATERIAL_UI`, do not invoke Impeccable by ritual.

If `MATERIAL_UI`:

- use upstream Impeccable shaping where the interaction/visual decision is material;
- read/preserve existing visual evidence;
- use `DESIGN.md` when durable visual-system authority is warranted;
- if Impeccable needs `PRODUCT.md` but product truth lives elsewhere, create only the smallest deterministic derived projection needed for that repo;
- include relevant critique/audit/harden expectations in the shaped work before autonomous execution.

Do not let the unattended worker make a new product-level redesign decision.

## 5. Promote to EXECUTION_READY

Human promotion is the final shaping boundary.

Before promotion, verify that current durable authority resolves:

- required behavior;
- blockers/dependencies;
- scope boundaries;
- deterministic/falsifiable acceptance;
- delivery boundary;
- UI/design applicability where relevant;
- any material questions.

Unresolved material decisions stay before the autonomy boundary.

The human's explicit decision to start Pi on one `EXECUTION_READY` issue is the one expected execution authorization. That launch does not authorize destructive recovery, material product redesign or final merge.

## 6. Actual operator-triggered execution path

The real human experience, field-proven by issue #38, is now explicit:

```text
human opens/uses Herdr
→ human enters the target repository/Atenea context
→ human starts Pi interactively
→ human gives one bounded execution prompt
→ Pi resolves current repository/GitHub authority
→ Pi creates or reuses a headless OpenCode worker through Herdr
→ OpenCode implements
→ deterministic repository verification
→ OpenCode/Gentle owns exact-candidate RDD
→ bounded correction if naturally required
→ fresh candidate / lineage when required
→ exact acknowledgement/burn
→ ONE fresh pre-publication authority revalidation
→ normal non-force push
→ repository-specific PR/checkpoint
→ exact remote reconciliation
→ Pi rediscovers compatible frontier
→ STOP before human merge / when compatible frontier is exhausted
→ Pi returns one factual final report
```

Pi remains interactive to the operator; the **implementation worker does not**. The accepted autonomous worker transport is headless `opencode run --format json` under Herdr rather than robotic prompt injection into an OpenCode TUI.

Herdr remains process/session substrate only. Pi remains non-implementing. OpenCode/Gentle owns every Gentle lifecycle command and provider-issued review transition.

### 6.1 The human starts Pi manually

This is the **normal operator path**, not a workaround or a one-off test.

The run is performed by the operator directly inside Herdr so the tested top-level interface is the one used for normal work. Issue #38 field-proved this path.

A suitable normal operator prompt is:

```text
Execute the current EXECUTION_READY issue end to end under the Atenea contract.
Use Herdr to create or reuse the headless OpenCode/Gentle worker.
Proceed through implementation, deterministic verification, Gentle RDD, bounded correction if required, normal non-force publication and PR/checkpoint reconciliation.
Do not merge. Stop on any genuine human-owned decision or when the compatible frontier is exhausted, and return the final factual report.
```

For intentionally pinned work (issue #39 ergonomics), the prompt is **bounded and authoritative** rather than vague: name the repository, the exact issue/work item, the declared execution branch/PR checkpoint, Pi's non-implementing supervisor role, the Herdr → visible headless OpenCode/Gentle transport, normal non-force publication authorization and the STOP-before-merge boundary. Pi then performs only the minimum preflight needed to validate those anchors before launching the worker (exact issue/current GitHub state, declared branch/PR checkpoint, canonical authority files referenced by the issue, runtime compatibility), and defers broad frontier rediscovery until after the accepted checkpoint.

Do not paste Gentle lifecycle command syntax, candidate lineage mechanics, recovery algorithms or historical harness details into the operator prompt. Do not broadly scan sibling repositories, historical worktrees, unrelated open issues or the whole repository merely to rediscover already-declared execution mechanics; expand only if a concrete contradiction requires it.

### 6.2 Autonomous OpenCode transport and visible worker pane

For unattended work:

```text
Pi
→ Herdr
→ opencode run --agent gentle-orchestrator --format json
→ managed Gentle integration
```

Interactive OpenCode remains available for human-attended development but is not the Atenea unattended worker transport contract.

Do not use `herdr agent prompt` to robotically drive an OpenCode TUI as the normal execution path.

For current runs (issue #39 ergonomics), Pi launches the headless worker in a **dedicated visible/inspectable Herdr pane/tab** and reports the worker pane/tab id/label to the operator immediately so the human can observe the headless worker live:

```text
Herdr workspace
├─ Pi supervisor pane     # interactive with the human
└─ OpenCode worker pane   # headless/non-interactive, visible live to the human
```

This is visibility, not interactivity: OpenCode remains headless/non-interactive, and human observation does not become worker interaction or review authority. Genuine human-owned decisions still return through Pi. Preserve structured evidence without a process-substitution/tee observation dependency; prefer native Herdr pane output/scrollback or the smallest primitive that preserves process exit semantics.

### 6.3 Bounded downstream provider-canary boundary

Production Gentle remains `/home/hermes/.local/bin/gentle-ai` v2.5.0 and is not modified.

The isolated canary provider documented in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md` is the bounded downstream boundary used by the current real operator-triggered runs (issue #38 used it; issue #39 uses it for this repair):

```text
canary binary directory:
/srv/kairos-lab/experiments/gentle-zero-touch-v2/bin/canary

canary binary sha256:
bd947d78da858d7f26b185b304a2947e9f1dc335968ee71dc2dcec39dc5f2b7b

canary-only selector:
GENTLE_AI_REVIEW_V2_CONSENT_POLICY=unattended
```

Pi/OpenCode MUST NOT remove `relay`, add `granted` or reconstruct Gentle lifecycle commands. The worker simply runs in an isolated environment where the canary provider itself generates/validates the unattended v2 transition.

This selector is downstream experimental spelling, not a claimed upstream API. Upstream `Gentleman-Programming/gentle-ai#4109` remains the production-resolution path and is not replaced by the downstream canary or by the real E2E runs under it.

### 6.4 Worker continuity

For the same issue + PR/branch + worktree + authority, prefer reusing the healthy OpenCode worker. This preserves implementation context across audit repairs.

A new source candidate still receives a fresh Gentle review lineage when required. Worker reuse is never review-authority reuse.

### 6.5 Supervision efficiency

Prefer narrow Herdr/native state and bounded waits. Multi-minute fixed sleep polling is not the default and does not justify a new scheduler/polling layer.

Do not use process-substitution `tee` wrappers as a required execution dependency. The final zero-touch canary showed that `> >(tee ...)` children can outlive the completed Pi process and make the observation wrapper appear hung. Prefer direct structured file output plus post-run inspection/audit.

### 6.6 Human decisions vs operational permissions

The target behavior after the initial Pi execution prompt is zero additional human touch whenever no genuine human-owned boundary arises.

```text
normal non-force push permission
  → already-authorized operational action
  → Pi should handle it when the runtime safely exposes the permission

Gentle review consent under the bounded unattended provider canary
  → should not surface

material product ambiguity / incompatible authority / destructive action
  → genuine human-owned decision
  → Pi relays and pauses

final merge
  → human boundary
  → STOP unless separately and explicitly authorized
```

The operator **may answer yes/no when a genuine human-owned decision is actually relayed**. That answer must remain visible evidence. If a post-`EXECUTION_READY` human answer occurs, the run must not be silently reported as `HUMAN_TOUCH_AFTER_EXECUTION_READY=0`.

The pre-publication revalidation is one bounded fresh read, not polling and not a Herdr gate. Material authority change means STOP rather than publishing a stale candidate.

## 7. Evidence to capture

For each real slice, keep compact factual evidence:

- repo and issue/PR identifiers;
- shaping path/methods actually used;
- explicit `EXECUTION_READY` / initial operator authorization;
- whether material UI policy activated;
- exact runtime versions and canary identity if the bounded provider experiment is used;
- Pi session/operator prompt;
- Herdr workspace/tab/pane or equivalent process coordinates when useful;
- number of OpenCode workers started/reused;
- accepted HEAD/TREE or equivalent exact checkpoint;
- deterministic verification results;
- Gentle review lineage/state or final causal evidence where available;
- bounded correction count and whether a changed candidate received fresh review authority;
- human interventions after `EXECUTION_READY`, with owning authority and exact reason;
- provider-issued transition integrity;
- pre-publication authority revalidation result;
- normal non-force publication result;
- PR/checkpoint result;
- reconciliation result;
- final STOP/next-frontier result;
- any seam that required manual translation or custom glue.

Evidence should answer a question, not become a reporting bureaucracy.

For each real end-to-end run, the final Pi report should at minimum state:

```text
WORK_ITEM=<repo#issue>
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
PI_ROLE=NON_IMPLEMENTING_SUPERVISOR
OPENCODE_WORKERS_STARTED=<n>
WORKER_PANE_ID_REPORTED=PASS|FAIL
GENTLE_EXACT_CANDIDATE_RDD=PASS|FAIL
BOUNDED_CORRECTIONS=<n>
ACKNOWLEDGEMENT_BURN=PASS|FAIL
HUMAN_TOUCH_AFTER_EXECUTION_READY=<n>
NORMAL_NON_FORCE_PUBLICATION=PASS|FAIL|NOT_REACHED
PR_OR_CHECKPOINT=PASS|FAIL|NOT_REACHED
AUTO_MERGE=NO
FRONTIER_STOP=PASS|FAIL|NOT_REACHED
FINAL_STOP_REASON=<reason>
```

Issue #38 recorded the reference values of these fields on a real operator-triggered run. When the worker runs headless inside Herdr, also record the worker pane/tab id/label so the operator can observe it live.

## 8. Gentle AI 2.5.0 stable field evidence — CAPTURED

Do not repeat Stage 5–8.

Judit #76 / PR #79 naturally exercised the stable delta:

```text
stable 2.5.0 selected
→ exact candidates frozen
→ provider-owned review lifecycle completed
→ final causal capture / acknowledgement burned authority
→ no Atenea FINALIZE / compact receipt / delivery gate added
→ ordinary PR delivery remained separate
```

Result:

```text
STABLE_EXACT_CANDIDATE_RDD=PASS
STABLE_ACKNOWLEDGEMENT_BURN=PASS
STABLE_PR_STOP_BEFORE_MERGE=PASS
```

The same run exposed a path-specific autonomy gap:

```text
OpenCode negotiated review-integration/v2
→ provider next-transition adds --consent relay
→ medium/high exact candidate returns typed human consent envelope
→ explicit granted applies to that exact candidate
→ changed candidate asks again
```

Upstream source audit shows that stable Gentle retains zero-touch-capable semantics outside this forced-relay v2 route: organic/plain consent can be persisted and an undeclared non-interactive negotiated START authorizes silently.

## 9. Negotiated-v2 zero-touch canary — CAPTURED

The downstream provider-side characterization closed the behavioral hypothesis without consumer-side consent injection.

Final review-only canary result:

```text
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=PROVEN
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY=PASS
OPENCODE_HEADLESS_UNATTENDED_ROUTE=PASS
PI_HERDR_OPENCODE_GENTLE_TOPOLOGY=PASS
PROVIDER_ISSUED_TRANSITIONS_UNMODIFIED=PASS
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
LOCAL_CONSUMER_BYPASS=NO
PRODUCTION_GENTLE_MODIFIED=NO
```

The canary intentionally did not implement, push, open a PR or rediscover a real frontier. Issue #38 then exercised those real-work properties through the actual operator interface and recorded `NORMAL_NON_FORCE_PUBLICATION=PASS`, `PR_OR_CHECKPOINT=PASS`, `AUTO_MERGE=NO` and `FRONTIER_STOP=PASS`.

Full evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

### 9.1 Rollout finding classification

Classify every real-run finding into exactly one of:

```text
NO_GAP
  → keep Atenea v1 unchanged

REPO_LOCAL_GAP
  → fix only that repo's policy/config

UPSTREAM_CAPABILITY_GAP
  → verify current upstream before adding anything

ATENEA_HORIZONTAL_GAP
  → only then propose minimal shared glue with deletion criteria
```

Default outcome should be `NO_GAP` or `REPO_LOCAL_GAP`. A real run that exposes no gap keeps the current architecture; a gap names the narrow seam rather than authorizing replacement of the whole runtime.

Current example: the released OpenCode negotiated-v2 unattended selector is an `UPSTREAM_CAPABILITY_GAP` (tracked as upstream `Gentleman-Programming/gentle-ai#4109` and Atenea #36), while the #38 real E2E run itself recorded PASS on every operator-path acceptance property under the documented bounded canary boundary — no Atenea horizontal gap was found, and the two operator ergonomics it exposed are refinements, not gaps.

### 9.2 What not to do

Do not use real-project rollout as an excuse to reintroduce:

- custom execute-Issue launcher;
- Herdr policy gates;
- scheduler/DAG/controller/daemon/queue;
- custom RDD/reviewer/receipt machinery;
- process-substitution/tee observation harness as an execution dependency;
- OpenCode TUI prompt automation as the unattended transport;
- automatic merge;
- force-push/reset/rebase recovery;
- mandatory Impeccable for non-UI work;
- a second product truth in `PRODUCT.md`;
- a new Clean Code/quality agent;
- a Stage 9/10 ladder for optional features;
- permanent adoption of the downstream provider canary.

These guardrails remain current policy after the #38 real E2E run and the #39 operator-ergonomics refinement.

## 10. Gentle Pi 2.3.0 — one bounded replacement/deletion evaluation

Gentle Pi `2.2.0` remains a historical Atenea FAIL. Stable `2.3.0` is materially changed and therefore qualifies for one bounded re-evaluation under the existing no-large-ladder rule.

The experiment asks exactly:

> Can Gentle Pi `2.3.0` preserve the already-qualified Atenea properties while deleting architecture or glue from the current Pi → Herdr → OpenCode + Gentle composition?

Required properties to preserve:

```text
frontier discovery from current repository/tracker authority
fail-closed blocker/authority handling
no host-archaeology authority escape
non-destructive repository isolation
bounded implementation/edit surface
stable Gentle 2.5.0 exact-candidate RDD lifecycle
provider-issued continuation/re-entry verbatim
permission/blocker relay compatible with Herdr where needed
normal non-force repository delivery
exact remote reconciliation
frontier rediscovery and exhaustion STOP
no automatic merge
```

Decision:

```text
PASS + meaningful deletion
  → propose the smaller architecture and identify exactly what disappears

PASS but no meaningful deletion
  → keep current qualified architecture; no reason to switch

FAIL / ambiguity / added fragility
  → keep current qualified architecture; record the narrow failure
```

Do not layer Gentle Pi on top of the existing architecture as another mandatory component.

This experiment is **not Stage 9**.

## 11. Optional OpenSpec field evidence

If a natural brownfield slice actually benefits from OpenSpec, record whether:

1. shaping starts from existing repo/product authority;
2. OpenSpec represents only the requested delta;
3. durable output is sufficient to create/identify executable GitHub work;
4. no Atenea-specific OpenSpec→Gentle translation schema is required;
5. after human `EXECUTION_READY` promotion, the qualified runtime can consume the work;
6. no hidden dependence on the shaping conversation remains.

OpenSpec does not need a synthetic canary if no real change needs it.

## 12. Material UI field evidence

The first naturally material UI slice should validate the policy, not a new runtime:

```text
canonical product authority
+ existing visual evidence / DESIGN.md if applicable
+ conditional Impeccable shaping
→ executable contract
→ qualified Atenea runtime
→ relevant UI audit/harden evidence
```

No separate synthetic UI qualification is required before real use.
