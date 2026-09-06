# Atenea — Repository Entry Reconciliation v1

Status: **CURRENT / PRE-EXECUTION_READY**
Date: 2026-09-06

This is a read-only planning gate for entering or resuming a target repository. It prevents a fresh operator/agent from treating legacy tooling as current authority or from “cleaning” a brownfield repo by assumption.

## 1. First classify the current situation

Classify the **current repository situation**, not merely repository age:

- `GREENFIELD`
- `SMALL_BROWNFIELD`
- `LARGE_CODE_BROWNFIELD`
- `MIXED_CORPUS_BROWNFIELD`

`GREENFIELD` means there is no prior product/authority that must be preserved. It does **not** mean the directory must be empty.

## 2. Identify current authority before tooling

Read the target repo's current authority first: repository instructions/`AGENTS.md`, coding standards, live specs/ADRs/issues, current product code, published/default branches and current delivery documentation.

Do not infer current policy from filenames, old branches or tool configuration merely because they exist.

## 3. Read-only inventory of prior harness/tooling signals

Before installing or changing orchestration/tooling, inventory relevant existing signals without mutation. Typical examples include:

- Atenea/KairOS/Post-SAS artefacts;
- OpenCode/Pi/Gentle configuration;
- `.agents/`, `.pi/`, skills locks or generated agent config;
- historical launchers/runners/controllers/queues;
- old worktree/branch hints;
- repository-intelligence indices;
- docs explicitly marked historical/deprecated/superseded.

## 4. Classify every material signal

Use one of:

- `CURRENT` — part of the target's present supported authority/workflow;
- `COMPATIBILITY_REQUIRED` — old-looking but still needed by current behavior/integration;
- `HISTORICAL` — retained as provenance/evidence, not current operation;
- `STALE_OR_UNKNOWN` — ownership/status cannot yet be justified.

Do not collapse `HISTORICAL` or `STALE_OR_UNKNOWN` into “delete”.

## 5. Reconcile contradictions before shaping

If current authority conflicts with legacy/tooling signals, STOP pre-`EXECUTION_READY` and reconcile explicitly. Prefer current repo/GitHub authority over remembered setups.

A reconciliation may conclude “leave in place”, “document as historical”, “migrate later” or “remove under a separate authorized WO”. Detection alone grants none of those mutations.

## 6. Hard safety boundary

Repository entry is **read-only**. It grants NO authority to delete, move, restore, reset, overwrite, uninstall, rewrite history, remove worktrees/branches or auto-migrate configuration.

Any cleanup/migration with technical mutation requires its own bounded authority/WO and reversal plan.

## 7. Output before normal shaping

A useful entry note is small:

```text
REPO_CONTEXT=<classification>
CURRENT_AUTHORITY=<paths/branch/tracker>
LEGACY_SIGNALS=<material inventory>
CURRENT=<...>
COMPATIBILITY_REQUIRED=<...>
HISTORICAL=<...>
STALE_OR_UNKNOWN=<...>
CONTRADICTION=<none | exact conflict>
ENTRY_RECONCILED=YES|NO
```

Only continue normal `START_HERE` shaping when `ENTRY_RECONCILED=YES` or when no material legacy/tooling ambiguity exists.
