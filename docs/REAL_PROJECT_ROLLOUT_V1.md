# Atenea Real-Project Rollout v1

Date: 2026-09-01
Status: PLAN

## Goal

Move from synthetic qualification to real project work without turning optional surfaces or upstream releases into another qualification ladder.

The Stage 5–8 execution architecture is already qualified. Real-project rollout should validate only repo-specific seams and materially changed upstream replacements that have not yet been exercised naturally.

## 1. Select the project and slice

Prefer a real repository that has:

- existing code and product authority;
- one bounded, valuable change with clear acceptance;
- no need for destructive migration or emergency production intervention;
- enough testability/deterministic evidence to distinguish success from narration;
- a normal GitHub delivery path.

Do not invent work merely to exercise an optional tool.

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

## 6. Run the qualified autonomous path

After `EXECUTION_READY`:

```text
Pi discovers frontier
→ validates authority/blockers/runtime
→ supervises worker through Herdr
→ OpenCode + Gentle implements
→ repo deterministic verification
→ optional Matt code-review only if semantic/spec risk warrants it
→ Gentle native exact-candidate RDD / bounded correction
→ provider-owned final capture / acknowledgement lifecycle
→ ONE fresh pre-publication authority revalidation
→ normal push
→ repository-specific PR/checkpoint policy
→ exact reconciliation
→ Pi re-discovers frontier
→ STOP when exhausted
```

Gentle AI `2.5.0` stable is the operational target. Provider-issued lifecycle continuations are executed as returned; Atenea does not reconstruct them. RDD does not create a delivery gate after its authority closes.

The pre-publication revalidation is one bounded fresh read, not polling and not a Herdr gate. Material authority change means STOP rather than publishing a stale candidate.

Do not add a temporary dispatcher/controller merely for rollout.

## 7. Evidence to capture

For each real slice, keep compact factual evidence:

- repo and issue/PR identifiers;
- shaping path/methods actually used;
- whether material UI policy activated;
- exact runtime versions if relevant;
- accepted HEAD/TREE or equivalent exact checkpoint;
- deterministic verification results;
- Gentle review lineage/state or final causal evidence where available;
- bounded correction count;
- human interventions after `EXECUTION_READY`;
- pre-publication authority revalidation result;
- publication result;
- reconciliation result;
- final STOP/next-frontier result;
- any seam that required manual translation or custom glue.

Evidence should answer a question, not become a reporting bureaucracy.

## 8. Gentle AI 2.5.0 stable field evidence

Do not repeat Stage 5–8.

On the next real Atenea slice, capture only the natural delta from the historical `2.5.0-rc.2` qualification baseline:

```text
stable 2.5.0 selected
→ exact candidate frozen
→ provider-issued continuation/re-entry executed verbatim if emitted
→ bounded correction at most once under native authority
→ final causal capture / acknowledgement completes natively
→ no Atenea FINALIZE / compact receipt / delivery gate added
→ ordinary repo delivery proceeds separately
```

A successful real slice is sufficient evidence unless it exposes a new seam.

## 9. Gentle Pi 2.3.0 — one bounded replacement/deletion evaluation

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

## 10. Optional OpenSpec field evidence

If a natural brownfield slice actually benefits from OpenSpec, record whether:

1. shaping starts from existing repo/product authority;
2. OpenSpec represents only the requested delta;
3. durable output is sufficient to create/identify executable GitHub work;
4. no Atenea-specific OpenSpec→Gentle translation schema is required;
5. after human `EXECUTION_READY` promotion, the qualified runtime can consume the work;
6. no hidden dependence on the shaping conversation remains.

OpenSpec does not need a synthetic canary if no real change needs it.

## 11. Material UI field evidence

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

## 12. Rollout decision after each project

Classify findings:

```text
NO_GAP
  → keep Atenea unchanged

REPO_LOCAL_GAP
  → fix only that repo's policy/config

UPSTREAM_CAPABILITY_GAP
  → verify current upstream before adding anything

ATENEA_HORIZONTAL_GAP
  → only then propose minimal shared glue with deletion criteria
```

### Field finding — legacy authority escape

The first Judit real-project run exposed one horizontal policy gap: Pi correctly read current repository authority but then searched sibling/host archaeology, rediscovered superseded KairOS/Post-SAS execution machinery and entered the retired Ticket Driver / Builder topology.

Classification:

```text
ATENEA_HORIZONTAL_GAP — authority-resolution boundary
```

Resolution: normative fail-closed authority-resolution rule only. No new launcher, controller, dispatcher, scheduler or runtime layer.

Default outcome should be `NO_GAP` or `REPO_LOCAL_GAP`.

## 13. What not to do

Do not use rollout as an excuse to reintroduce:

- custom execute-Issue launcher;
- Herdr policy gates;
- scheduler/DAG/controller;
- custom RDD/reviewer/finalize/receipt machinery;
- automatic merge;
- force-push/reset/rebase recovery;
- mandatory OpenSpec for brownfield work;
- mandatory Impeccable for non-UI work;
- a second product truth in `PRODUCT.md`;
- a new Clean Code/quality agent;
- a Stage 9/10 ladder for optional features.

Real use is now the test harness.
