# Atenea vNext — AGENTS candidate

Status: **PROMOTED SOURCE CANDIDATE / SUPERSEDED BY ROOT `AGENTS.md` ON 2026-09-22**

Atenea is a thin upstream-first policy and conformance layer over native engineering tools.

This file is **repository policy**, not a product specification, task tracker, tool-state store or duplicate runtime manual.

Do not build or reintroduce a second execution controller, worker supervisor, review lifecycle, routing engine or consent relay when the adopted upstream runtime already owns the behavior.

## 1. Ownership model

Keep the ownership split explicit:

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ CODING_STANDARDS.md + stable repository policy

shaping, only while genuinely active
→ adopted shaping workflow for that phase

HOW to explore/decompose/delegate/verify/review
→ native execution runtime (currently Gentle)

deterministic facts
→ tests / validators / oracles / CI

publish / merge
→ target repository policy + human authority
```

No methodology or runtime tool may silently invent product semantics, acceptance criteria, domain rules or publication authority merely because it needs them to proceed.

## 2. Authority precedence

When compatible sources overlap, prefer:

1. accepted current product/domain authority: live specs, ADRs, accepted issues/work orders and canonical product docs;
2. the currently authorized change/task artifacts derived from that authority;
3. stable repository policy: this file, `CODING_STANDARDS.md`, contribution/security rules;
4. active phase-specific methodology guidance;
5. upstream tool defaults;
6. historical docs, stale config, chat/session memory and remembered prior setups.

A current human instruction may explicitly reopen or change higher-level authority. Do not infer such a change from casual wording or from a runtime/tool limitation.

If two material current authorities genuinely conflict, STOP and reconcile rather than silently choosing one.

## 3. Read before changing this repository

Read:

1. `README.md`;
2. promoted vNext `START_HERE.md`;
3. `CODING_STANDARDS.md`;
4. current decisions / ADRs relevant to the task;
5. the specific accepted issue/work order/spec being executed.

Historical stage documents are evidence, not forward-looking authority.

Do not treat the mere presence of an old config, branch, prompt, worktree or runtime file as proof that it is current.

## 4. Stable invariants

- Upstream-first is operational, not rhetorical.
- Prefer supported upstream behavior and public interfaces.
- Do not copy or rebuild upstream lifecycle logic inside Atenea without a demonstrated unsupported seam.
- Keep changes scoped to accepted authority.
- Preserve one durable authority for each fact.
- Material ambiguity or contradictory authority => STOP rather than improvise.
- Machine-decidable invariants belong in deterministic tooling.
- Review approval is not publication or merge authority.
- No automatic force-push, destructive history recovery or merge.
- Secrets/credentials never belong in repository config, prompts, logs or committed desired-state files.
- Historical evidence may remain without remaining active runtime.
- Hidden global state must not be the only place where behavior-affecting configuration is defined.

## 5. Shaping lifecycle

Shaping is **phase-scoped**.

### When shaping is active

For genuinely unshaped work, an adopted shaping workflow may be used to clarify:

- problem/outcome;
- behavior/acceptance;
- domain concepts;
- important decisions;
- non-goals;
- executable specs/tickets/work orders.

For brownfield work, preserve repository-native authority first. OpenSpec or repository-intelligence tooling is used only when it materially adds value; never by ritual.

### When shaping is complete

Once accepted durable executable authority exists:

- do not regenerate specs/tickets by default;
- do not re-run a shaping workflow merely because older instructions describe how the project was originally shaped;
- do not preserve shaping ceremony in runtime prompts when its decisions already exist in durable authority;
- execute the accepted authority through the native execution runtime.

Reopening product shaping requires a real product/authority reason, not runtime convenience.

The exact retained Matt/OpenSpec policy remains a Phase 3 evidence decision.

## 6. Generated upstream instruction ownership

Do not let multiple tools compete for `AGENTS.md`.

### Matt Pocock skills

The currently adopted Matt setup skill may maintain a small `## Agent skills` block that points to:

- issue tracker configuration;
- triage label configuration;
- domain-doc layout.

That block is metadata consumed by Matt skills, **not the project specification and not the execution runtime**.

While Matt skills remain adopted, let their setup/update mechanism own that block rather than duplicating or hand-forking it inside Atenea policy.

### OpenSpec

Current OpenSpec owns its configuration/artifacts under its generated skills/commands and `openspec/` surfaces.

Do not add a bespoke Atenea OpenSpec marker block to `AGENTS.md`.

### Gentle

Native Gentle does not own the project `AGENTS.md` content.

Keep Gentle-specific version/protocol instructions out of stable repository policy. Point to current operational/compatibility docs when a version-specific exception matters.

## 7. Native execution ownership

Atenea does not own:

- ODD/exploration classification;
- internal task decomposition;
- worker delegation;
- allowed-edit enforcement;
- verification lifecycle;
- work-unit commits;
- RDD;
- reviewer/refuter/validator execution;
- native review consent;
- correction lifecycle;
- acknowledgement/burn.

Use supported native surfaces and follow provider/runtime-issued transitions.

Do not reconstruct review state or transitions in prompt prose, shell glue or an Atenea shadow state machine.

Runtime decomposition may decide **how** accepted work is performed. It may not expand **what** the product authority authorized.

## 8. Configuration, models and environment

Use the upstream runtime's native model/profile configuration.

Atenea may version secret-free desired-state configuration for reproducibility, but does not implement routing.

Behavior-affecting global configuration must be inspectable against the versioned desired state before a run where it materially matters.

Do not silently inherit stale profiles, environment variables or home-directory mutations from a prior project/runtime epoch.

Current version/provider-specific exceptions live in:

`docs/vnext/CURRENT_COMPATIBILITY.md`

Do not copy those temporary exceptions back into this stable policy.

## 9. Deterministic evidence

Prefer deterministic evidence whenever a question can be proven mechanically.

Examples:

- repository cleanliness;
- changed-path classification;
- tests;
- typecheck/build;
- schema/YAML validation;
- secrets scan;
- runtime/version/profile conformance;
- publication credential capability.

Deterministic oracles produce evidence. They do not grant product, review, publication or merge authority.

## 10. Work-unit composition

Prefer small coherent reviewable work units.

Do not code-golf or remove useful tests/docs/comments merely to satisfy a numeric planning budget.

When a change is clearly oversized, compose coherent slices before implementation when practical.

Planning size is not review timing: the native review provider/runtime owns its review decision.

## 11. Publication

Before publication, validate the actual changed artifact types.

Normal non-force push may be allowed by target repository policy.

No automatic merge.

High-risk promotion may request an independent read-only promotion audit, but that audit is evidence at a human boundary, not a second native review lifecycle.

## 12. Repository entry and resumption

When entering or resuming a repository:

- find current Git/GitHub/product authority first;
- inventory old harness/tooling read-only;
- classify signals as current / compatibility-required / historical / stale-or-unknown;
- do not delete or reactivate old tooling by assumption;
- do not resume stale hidden session state merely because it exists;
- create a clean isolated execution surface when old sessions/worktrees are stale.

Durable Git/GitHub/product evidence outranks remembered agent/session state.

## 13. Current transition operations

Temporary migration/recovery instructions do not belong in this stable file.

During the vNext transition, use:

- `docs/vnext/PROJECT_EXECUTION_HANDOFF_NATIVE_GENTLE.md` for project execution handoff;
- `docs/vnext/CURRENT_COMPATIBILITY.md` for current version/provider exceptions.

The long-term target remains an ordinary clean upstream installation + native profile/config + this small repository policy layer.

## 14. Agent skills / repo setup

The currently adopted Matt Pocock skills remain unchanged pending Phase 3.

Do not delete, fork or partially rewrite them during the experiment.

Keep any generated `## Agent skills` block clearly separable from Atenea's stable policy so its upstream owner can update it without rewriting surrounding repository authority.

After Phase 3, retain only the generated metadata required by whichever Matt skills actually survive.
