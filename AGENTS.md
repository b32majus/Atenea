# Atenea — Repository Policy

Status: **CURRENT AUTHORITY**

Atenea is a thin upstream-first policy, configuration and conformance layer over native engineering tools.

This file defines stable repository policy. It is **not** a product specification, task tracker, runtime state store or duplicate Gentle manual.

Do not build or reintroduce an Atenea execution controller, worker supervisor, review lifecycle, routing engine or consent relay when the adopted upstream runtime already owns that behavior.

## 1. Ownership

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ AGENTS.md + CODING_STANDARDS.md

shaping, only while genuinely active
→ adopted shaping workflow

HOW to explore / decompose / delegate / verify / review
→ native execution runtime (currently Pi + Gentle)

deterministic facts
→ tests / validators / oracles / CI

publish / merge
→ target repository policy + explicit human authority
```

No methodology or runtime tool may silently invent product semantics, acceptance criteria, domain rules or publication authority merely because it needs them to proceed.

## 2. Authority precedence

When compatible sources overlap:

1. accepted current product/domain authority — live specs, ADRs, accepted issues/work orders and canonical product docs;
2. the currently authorized task/change artifacts derived from that authority;
3. stable repository policy — this file, `CODING_STANDARDS.md`, contribution/security rules;
4. active phase-specific methodology guidance;
5. upstream tool defaults;
6. historical docs, stale config, chat/session memory and remembered setups.

A current human instruction may explicitly reopen or change higher-level authority.

Material conflict between current authorities => **STOP and reconcile** rather than silently choosing one.

## 3. Read before changing Atenea

Read:

1. `README.md`;
2. `docs/START_HERE.md`;
3. `CODING_STANDARDS.md`;
4. `docs/CURRENT_DECISIONS.md` / relevant ADRs;
5. the specific accepted issue/work order/spec being executed.

For runtime/version exceptions read:

- `docs/vnext/CURRENT_COMPATIBILITY.md`.

For provisioning/reproduction read:

- `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260922.md`.

Historical stage documents and `historical/` are evidence, not forward-looking authority.

## 4. Stable invariants

- Upstream-first is operational, not rhetorical.
- Prefer supported upstream behavior and public interfaces.
- Do not copy or rebuild upstream lifecycle logic inside Atenea without a demonstrated unsupported seam.
- Keep changes scoped to accepted authority.
- Preserve one durable authority for each fact.
- Machine-decidable invariants belong in deterministic tooling.
- Review approval is not publication or merge authority.
- No automatic merge, force-push or destructive history recovery.
- Secrets never belong in repository config, prompts, logs or committed desired-state files.
- Historical evidence may remain without remaining active runtime.
- Hidden global state must not be the only place where behavior-affecting configuration is defined.
- `.atl/` must be ignored repo-locally before Gentle candidate work begins.

## 5. Shaping lifecycle

Shaping is phase-scoped.

If work is genuinely unshaped, use the smallest adopted workflow that produces durable executable authority.

For already-shaped work:

- do not regenerate specs/tickets by ritual;
- do not rerun greenfield shaping merely because historical instructions describe it;
- execute accepted authority through native Gentle.

Current P3 decision:

- minimal semantic execution contract → native Gentle is the normal execution-ready seam;
- native ODD direct is valid when the task is already unambiguous;
- Matt skills are optional discovery/shaping;
- OpenSpec is optional native SDD when durable specs/change history add real value.

## 6. Native execution ownership

Atenea does **not** own:

- ODD/exploration classification;
- internal task decomposition;
- worker delegation;
- allowed-edit enforcement;
- verification lifecycle;
- work-unit commits;
- RDD/risk/review timing;
- reviewer/refuter/validator execution;
- native review consent;
- correction lifecycle;
- acknowledgement/burn.

Use supported native surfaces and follow provider/runtime-issued transitions.

Do not reconstruct review state or transitions in prompt prose, shell glue or Atenea shadow state.

Runtime decomposition may decide **how** accepted work is performed. It may not expand **what** the accepted authority authorized.

## 7. Configuration

Use the upstream runtime's native provider/model/profile configuration.

Atenea versions secret-free desired state:

- `config/native-gentle/nan-provider.models.json`;
- `config/native-gentle/native-nan.profile.json`.

Atenea does not implement model routing.

Before a run where routing materially matters, validate with:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
```

Temporary version/provider exceptions live only in `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 8. Verification and engineering quality

`CODING_STANDARDS.md` is the stable horizontal engineering-quality authority.

Prefer deterministic evidence that can independently disagree with the implementation:

- tests;
- typecheck/build;
- schema/YAML validation;
- repository cleanliness;
- changed-path checks;
- secrets scanning;
- runtime/profile conformance.

Deterministic oracles produce evidence. They do not grant product, review, publication or merge authority.

## 9. Review compatibility seams

Current temporary seams are documented in `docs/vnext/CURRENT_COMPATIBILITY.md`.

In particular:

- a typed `risk=unassessable` ASSESS fail-closed plan is followed natively; Atenea does not synthesize START;
- successful `acknowledge-approved → authority=burned` is terminal; selectorless STATUS is not required to re-prove burn;
- reviewer `thinking=low` is temporary NaN/Pi compatibility, not the desired permanent reviewer architecture.

## 10. Publication

Before publication, validate the actual changed artifact types.

Normal non-force push may be allowed by target repository policy.

No automatic merge.

A high-risk human promotion boundary may request an independent read-only audit, but that audit is evidence at the human boundary, not a second Gentle RDD lifecycle.

## 11. Repository entry and resumption

When entering or resuming a repository:

- find current Git/GitHub/product authority first;
- inventory old harness/tooling read-only;
- classify signals as current / compatibility-required / historical / stale-or-unknown;
- do not delete or reactivate old tooling by assumption;
- do not resume stale hidden session state merely because it exists;
- create a clean isolated execution surface when old sessions/worktrees are stale.

Durable Git/GitHub/product evidence outranks remembered agent/session state.

## 12. Agent skills / repo setup

Matt Pocock skills remain optional discovery/shaping tools, not a mandatory runtime prelude.

Generated metadata owned by an upstream skill should remain separable from Atenea stable policy.

Repository setup references:

- issue tracker: `docs/agents/issue-tracker.md`;
- triage labels: `docs/agents/triage-labels.md`;
- domain-doc layout: `docs/agents/domain.md`.

Do not fork third-party skills into Atenea merely to freeze their internals.
