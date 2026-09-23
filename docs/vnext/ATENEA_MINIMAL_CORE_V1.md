# Atenea vNext — Minimal Core

Status: **P2 TARGET ARCHITECTURE / NOT YET PROMOTED TO MAIN**

Date: 2026-09-21

## 1. Definition

Atenea vNext is **not an execution harness**.

It is the smallest versioned layer that adds durable value above native Pi / Gentle:

```text
Atenea Minimal Core
├── stable repository / engineering policy
├── phase-scoped shaping policy
├── deterministic conformance evidence
├── publication / Git guardrails
├── reproducible native Gentle profile specification
└── historical decision provenance
```

Native Gentle owns:

- ODD exploration/classification;
- internal decomposition;
- worker delegation;
- allowed-edit enforcement;
- verification lifecycle;
- work-unit commits;
- RDD;
- risk;
- reviewer/refuter/validator execution;
- review consent;
- correction lifecycle;
- acknowledgement/burn.

Atenea does not proxy those capabilities.

## 2. Runtime budget

Target Atenea-owned runtime controllers:

```text
0
```

Target Atenea-owned review controllers:

```text
0
```

Target Atenea-owned worker supervisors:

```text
0
```

Target Atenea-owned routing engines:

```text
0
```

Atenea may ship deterministic tools/scripts, but they must return evidence rather than own agent lifecycle authority.

## 3. Core policy surfaces

### 3.1 `AGENTS.md`

Purpose:

- stable repo/domain/authority rules;
- safety/privacy boundaries;
- Git/publication boundary;
- short execution pointer;
- phase-scoped shaping instructions only while shaping is actually active;
- generated/upstream skills metadata where required.

Must not contain:

- detailed Gentle state machine instructions;
- historical Herdr/pi-intercom topology;
- custom reviewer continuation protocol;
- stale model routing tables;
- version-specific workaround prose that belongs in compatibility evidence;
- greenfield shaping ceremony after accepted executable authority already exists.

### 3.2 `CODING_STANDARDS.md`

Decision:

**retain almost unchanged.**

It is already the correct abstraction: horizontal engineering quality without an execution controller.

### 3.3 Repository-entry reconciliation

Retain as a small read-only policy:

- find live authority;
- distinguish current/compatibility/historical/stale signals;
- do not mutate during entry;
- do not treat old runtime files as current authority merely because they exist.

### 3.4 Work-unit composition

Retain only the planning intent:

- coherent reviewable units;
- no code-golf;
- compose before implementation where clearly oversized;
- do not confuse planning size with native `review_due`.

Gentle owns exact tasking, commit and review timing.

### 3.5 Publication policy

Retain:

- changed-artifact-aware validation;
- normal non-force Git behavior;
- no automatic merge;
- human publication/merge authority;
- optional independent promotion audit for genuinely high-risk boundaries.

Move machine-decidable validation to deterministic tooling/CI.

## 4. Shaping is phase-scoped

The 37 Matt skills remain untouched until Phase 3.

Minimal Core does **not** assume Matt/OpenSpec must execute before every engineering task.

Lifecycle:

```text
UNSHAPED / GREENFIELD
→ shaping may be active
→ accepted durable spec/tickets/work orders produced
→ EXECUTION_READY
→ shaping instructions become inactive unless product authority is explicitly reopened
→ native Gentle executes accepted work
```

A project does not re-run shaping by ritual after it already has executable authority.

OpenSpec remains an experiment for brownfield / Gentle-native SDD in Phase 3.

## 5. Reproducible native Gentle configuration

Atenea may version a **declarative profile specification** because reproducibility is durable value.

It must not implement routing itself.

The versioned spec describes:

- expected provider/model IDs;
- role → model mapping where intentionally pinned;
- role → thinking level where intentionally pinned;
- why a non-default override exists;
- qualification date/evidence;
- compatibility retirement conditions.

Application remains upstream-native:

```text
spec
→ /gentle:models / /gentle:profiles or supported native config
→ Gentle owns runtime routing
```

No secrets are versioned.

Current qualified reviewer compatibility override:

```text
review-* → nan/glm5.3-flash · thinking=low
```

Reason:

NaN can emit a malformed non-JSON `reasoning_only_stream` SSE truncation frame for long reviewer reasoning. The same real reviewer prompt passed at low and failed at default/medium.

This is a compatibility profile decision, not a permanent architectural preference.

## 6. Deterministic conformance layer

Candidate retained oracles:

### Native stack conformance

Verify facts such as:

- supported Pi/Gentle versions;
- expected provider/model registration;
- expected native profile present/applied;
- no forbidden historical Atenea runtime extension active;
- no historical relay/plugin required for the qualified path.

### Authority conformance

Verify:

- current docs do not contradict the promoted vNext contract;
- stale historical recipes are not linked as current;
- active config does not silently pin superseded profile names.

### Publication conformance

Verify changed artifacts using deterministic tools:

- YAML/workflow syntax;
- schema validation;
- typecheck/build;
- secrets scan;
- repository cleanliness;
- changed-path specific checks;
- declared-runtime parity when material.

### Upstream lifecycle conformance

Small regression probes may verify stable externally observable Gentle guarantees, e.g.:

- native worker boundary enforcement;
- reviewer routing exists;
- approved review requires acknowledgement/burn.

Do not encode Gentle internals as a second state machine unless testing a specific upstream regression.

## 7. Explicit non-core surfaces

The following are **not Minimal Core**:

- Atenea RDD consent relay;
- pi-intercom review transport;
- external Atenea supervisor;
- worker spawn controller;
- custom reviewer lifecycle controller;
- Herdr policy plugin;
- routing engine;
- Engram authority;
- runtime effective-mode fixture;
- historical train recipes;
- old profile variants;
- GP3.3 host bridge once equivalence is confirmed;
- historical committed-range ASSESS patch/bridge; current production uses native fail-closed behavior while upstream #4791 remains open.

Historical evidence may remain available without being part of the active read path.

## 8. Temporary compatibility allowance

Two current upstream seams are accepted without adding Atenea runtime controllers.

### Committed-range ASSESS

Current tracker: Gentle AI #4791.

Policy:

- ensure `.atl/` is ignored before candidate work starts;
- keep unrelated untracked runtime artifacts out of the candidate;
- when native ASSESS returns a real tier, follow it;
- when it returns `risk=unassessable` plus a typed fail-closed plan, follow that plan and accept its independent verifier;
- STOP only when no typed safe continuation exists or state is ambiguous;
- never synthesize START or review timing in Atenea;
- no Atenea ASSESS bridge is active in the qualified production path.

### Post-burn selectorless STATUS

Current tracker: Gentle AI #4771.

Policy:

- native `acknowledge-approved` returning `status=closed` and `authority=burned` is terminal;
- persisted terminal-consumption evidence is sufficient;
- do not call selectorless STATUS merely to re-prove burn;
- do not repeat review on the unchanged candidate because that redundant STATUS fails.

These exceptions are compatibility notes, not Minimal Core features.

## 9. Herdr

Herdr is optional operator infrastructure.

Allowed value:

- persistent process surface;
- observability;
- session management;
- operator convenience.

Not allowed authority:

- RDD policy;
- reviewer consent relay;
- work decomposition;
- correctness;
- product authority.

A project must remain correct without an Atenea-specific Herdr plugin.

## 10. Minimal file-level target

The eventual promoted tree should converge toward a structure like:

```text
AGENTS.md
CODING_STANDARDS.md
README.md

.agents/skills/                 # unresolved Phase 3 set; upstream-managed
skills-lock.json                # while those skills remain adopted

config/
  native-gentle/
    native-balanced.profile.json # active secret-free multi-provider routing spec
    native-nan.profile.json      # qualified NaN-only rollback spec
    nan-provider.models.json    # secret-free provider/model registry desired state

docs/
  START_HERE.md
  vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md
  CURRENT_DECISIONS.md
  REPOSITORY_ENTRY_RECONCILIATION_V1.md
  WORK_UNIT_COMPOSITION_POLICY_V1.md
  PREPUBLICATION_ARTIFACT_VALIDATION_V1.md
  WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md
  PROMOTION_REVIEW_V1.md        # conditional/experimental
  adr/
  historical/ or Git history    # provenance, not current front door

tools/
  check-vnext-authority.mjs
  check-native-gentle-profile.mjs
  publication validators/oracles as justified
```

This is a target shape, not a claim that every listed current document survives unchanged.

## 11. Installation target

Long-term installation should become:

```text
install supported Pi
→ install supported Gentle via upstream mechanism
→ configure provider/auth
→ sync/install upstream Gentle components
→ apply native Gentle profile spec
→ run deterministic conformance checks
→ clone target repo
→ read repo authority
→ execute
```

Not:

```text
install Pi
→ patch Gentle internals
→ install Atenea relay
→ install Herdr policy plugin
→ export orchestration variables
→ reconstruct reviewer transport
```

## 12. Global vs repo-local target

### Global / user-owned

Keep minimal:

- Pi;
- Gentle;
- provider credentials;
- native provider/model registry;
- native Gentle profiles;
- optional operator tools.

### Atenea repo-local

Keep:

- policy;
- standards;
- secret-free profile specification;
- deterministic conformance tooling;
- project methodology/shaping skills while adopted.

### Target project repo-local

Keep only project-specific:

- domain/product authority;
- project safety rules;
- project coding/architecture delta;
- accepted specs/tickets;
- project CI/tests;
- minimal pointer to current execution path when needed.

Avoid hidden global Atenea semantics that change repository behavior invisibly.

## 13. Definition of done for Minimal Core

P2 architecture is acceptable when all are true:

- no retained Atenea component is required to make native Gentle RDD work;
- every runtime-like retained component has unique demonstrated value;
- current configuration can be recreated without copying a dirty HOME;
- no secret is required in the repository;
- a fresh Cora can identify stable project policy vs phase-scoped shaping vs upstream execution;
- PROMueve can continue product work through the native path;
- legacy runtime removal can happen later without changing product engineering semantics.

## 14. P2 decision

**Minimal Core candidate accepted for reconstruction experiments.**

Do not promote to `main` until Phase 4 reintroduction tests prove the selected policy/config/oracles preserve the Golden Control.
