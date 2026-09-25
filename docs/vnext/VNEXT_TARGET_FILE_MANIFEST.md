# Atenea vNext — Target File Manifest

Status: **PROMOTED vNext TARGET / CURRENT TREE CONTRACT**

Updated: 2026-09-25

This file translates the P1 capability matrix into a concrete target-tree decision.

## A. Preserve as active authority

| Surface | Target action |
| --- | --- |
| `CODING_STANDARDS.md` | KEEP, minimal edits only for stale wording |
| `AGENTS.md` | REWRITE to stable policy delta + phase-scoped shaping + short native execution pointer |
| `README.md` | REWRITE as thin vNext front door |
| `skills-lock.json` | KEEP while optional Matt skills remain adopted; not part of normal runtime |
| `.agents/skills/*` | KEEP as optional shaping/discovery capability; not a mandatory execution prelude |
| `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md` | KEEP/SIMPLIFY |
| `docs/WORK_UNIT_COMPOSITION_POLICY_V1.md` | KEEP/SIMPLIFY |
| `docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md` | KEEP; move machine facts to oracles/CI |
| `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` | KEEP/SIMPLIFY |
| `docs/PROMOTION_REVIEW_V1.md` | KEEP as conditional experiment |
| `docs/adr/*` | KEEP relevant durable decisions; superseded ADRs remain provenance |
| `docs/vnext/*` | working reconstruction evidence until promotion |

## B. Create for vNext

| Surface | Purpose |
| --- | --- |
| `config/native-gentle/native-balanced.profile.json` | global baseline secret-free multi-provider routing/effort specification |
| `config/native-gentle/native-v4-heavy.profile.json` | complementary DeepSeek-heavy candidate routing specification |
| `config/native-gentle/native-economy.profile.json` | experimental eligibility-gated economy routing specification |
| `config/native-gentle/native-nan.profile.json` | qualified NaN-only rollback routing specification |
| `config/native-gentle/nan-provider.models.json` | secret-free NaN provider/model registry desired state |
| `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md` | explicit per-ticket/train profile-selection and economy-eligibility authority |
| `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md` | exact supported install/auth/profile/conformance recipe |
| `tools/check-vnext-authority.mjs` | deterministic current-authority consistency |
| `tools/check-native-gentle-profile.mjs` | validate actual native profile against versioned spec |
| publication-specific validators | only when changed artifact types justify them |

These are deterministic evidence tools, never lifecycle controllers.

## C. Rewrite / supersede

| Current surface | Target |
| --- | --- |
| `docs/START_HERE.md` | short classify → shape-if-needed → native execute path |
| `docs/ATENEA_HARNESS_CONTRACT_V1.md` | thin vNext policy/config contract |
| `docs/INSTALLATION_AND_OPERATION_V1.md` | upstream install + native profile + conformance |
| `docs/OPERATOR_RUNBOOK_V1.md` | concise native runbook / possibly skill |
| `docs/NEWCOMER_QUICKSTART_V1.md` | vNext newcomer map |
| `docs/CURRENT_DECISIONS.md` | retain decisions but add vNext cutover decisions; current read path points to vNext |
| `CONTEXT.md` | replace Stage-4 fixture context with actual vNext project context |
| `tools/check-current-authority.mjs` | replace historical assertions with vNext authority assertions |
| `tools/check-nan-runtime-config.mjs` | replace hard-coded old role matrix/OpenCode authority with native profile conformance |

## D. Historical compatibility artifacts

No Atenea runtime compatibility bridge survives P4 as active production machinery.

| Surface | P5/P7 action |
| --- | --- |
| `patches/gentle-pi-3.3.0-atenea-assess-bridge.patch` | archive from the active vNext surface; preserve provenance in Git history/evidence |
| assess portion of `tools/apply-gentle-330-atenea-host-bridge.sh` | supersede from the active path; native fail-closed ASSESS handles #4791 safely |
| associated #90 regression evidence | keep as historical/test evidence |

Current compatibility seams are documented policy only; they are not an Atenea patching framework.

## E. Archived from the active vNext tree

P5 moved the following superseded runtime surfaces under `historical/runtime/` (or otherwise out of the active runtime path) after P4/P6 qualification:

- `extensions/atenea-rdd-consent-relay.mjs`;
- `tools/check-atenea-rdd-consent-relay.mjs`;
- `tools/check-pi-intercom-unattended-config.mjs`;
- historical pi-intercom spawn/runtime checks;
- host-consent/current-group patch after optional equivalence canary;
- `tools/effective-mode/*`;
- old runtime fixtures whose only purpose was Stage qualification;
- historical active profile pin `.pi/gentle-ai/profile.json → atenea-one-touch`;
- obsolete runtime recipes from the current front door;
- Atenea-specific Herdr RDD-consent plugin from VPS operational state;
- old model-profile variants from active global state.

Deletion from active tree does not mean deleting historical evidence from Git history.

## F. Phase 3 shaping decisions

P3 is closed.

- Matt skills remain optional discovery/shaping capability, not a mandatory execution prelude.
- Matt greenfield shaping is optional when work is genuinely unshaped.
- OpenSpec is optional native SDD when durable specifications/change history add value.
- Repository Intelligence and UI/UX shaping support are not Minimal Core runtime requirements; retain/use them only when a concrete project need justifies them.

## G. P4 qualification result

P4 positively qualified:

- stable policy;
- the secret-free native Gentle profile specification;
- deterministic authority/profile conformance oracles.

No Atenea runtime controller, review controller, worker supervisor or routing engine was reintroduced.

P5 may now simplify and archive superseded historical active surfaces. Provenance remains in Git history and retained evidence.
