# Atenea Real-Project Rollout v1

Date: 2026-08-30
Status: PLAN

## Goal

Move from synthetic qualification to real project work without turning optional surfaces into another qualification ladder.

The Stage 5–8 execution runtime is already qualified. Real-project rollout should validate only repo-specific seams that have not yet been exercised naturally.

## 1. Select the first project and slice

Prefer a real repository that has:

- existing code and product authority;
- one bounded, valuable change with clear acceptance;
- no need for destructive migration or emergency production intervention;
- enough testability/deterministic evidence to distinguish success from narration;
- a normal GitHub delivery path.

For the first OpenSpec field qualification, prefer a brownfield change that is meaningful but not mission-critical.

Do not choose Atenea itself as the OpenSpec canary.

## 2. Repo onboarding audit

Before shaping the first slice, record the current repo-native facts:

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

## 3. Choose the authoring on-ramp

### Greenfield

Use Matt Pocock upstream shaping and setup semantics.

### Brownfield

Use the current supported OpenSpec workflow delta-first: specify the change to existing behavior rather than reverse-specifying the whole application.

The first brownfield field run should answer only one compatibility question:

> Can OpenSpec produce durable, unambiguous executable work that the already-qualified Pi → Herdr → OpenCode/Gentle path can consume without a custom translation layer?

If yes, OpenSpec becomes field-qualified as Atenea's brownfield on-ramp.

If no, diagnose the exact seam before adding glue.

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
→ Gentle native exact-candidate RDD / bounded repair
→ normal push
→ repository-specific PR/checkpoint policy
→ exact reconciliation
→ Pi re-discovers frontier
→ STOP when exhausted
```

Do not add a temporary dispatcher/controller merely for the rollout.

## 7. Evidence to capture

For each first-use surface, keep compact factual evidence:

- repo and issue/PR identifiers;
- entry path used: Matt or OpenSpec;
- whether material UI policy activated;
- exact runtime versions if relevant;
- accepted HEAD/TREE or equivalent exact checkpoint;
- deterministic verification results;
- Gentle RDD review identifier/state where available;
- repair cycles;
- human interventions after `EXECUTION_READY`;
- publication result;
- reconciliation result;
- final STOP/next-frontier result;
- any seam that required manual translation or custom glue.

Evidence should answer a question, not become a new reporting bureaucracy.

## 8. OpenSpec field-qualification PASS criteria

The first real brownfield run is a PASS when all are true:

1. shaping starts from existing repo/product authority;
2. OpenSpec represents the requested change delta without requiring a full-system rewrite of truth;
3. durable output is sufficient to create/identify executable GitHub work;
4. no Atenea-specific OpenSpec→Gentle translation schema is required;
5. after human `EXECUTION_READY` promotion, Pi can consume the work through the already-qualified runtime;
6. implementation/review/publication complete under normal repository policy;
7. exact evidence reconciles;
8. no hidden dependence on the shaping conversation is required.

A failure should identify the narrow failed seam. It is not authorization to replace the whole runtime.

## 9. Material UI field evidence

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

## 10. Rollout decision after first project

After the first real project, classify findings:

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

Default outcome should be `NO_GAP` or `REPO_LOCAL_GAP`.

## 11. What not to do

Do not use rollout as an excuse to reintroduce:

- custom execute-Issue launcher;
- Herdr policy gates;
- scheduler/DAG/controller;
- custom RDD/reviewer/receipt machinery;
- automatic merge;
- force-push/reset/rebase recovery;
- mandatory Impeccable for non-UI work;
- a second product truth in `PRODUCT.md`;
- a new Clean Code/quality agent;
- a Stage 9/10 ladder for optional features.

Real use is now the test harness.