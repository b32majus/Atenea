# Atenea vNext — Target File Manifest

Status: **P2 TARGET MANIFEST / NO DELETIONS APPLIED**

Date: 2026-09-21

This file translates the P1 capability matrix into a concrete target-tree decision.

## A. Preserve as active authority

| Surface | Target action |
| --- | --- |
| `CODING_STANDARDS.md` | KEEP, minimal edits only for stale wording |
| `AGENTS.md` | REWRITE to stable policy delta + phase-scoped shaping + short native execution pointer |
| `README.md` | REWRITE as thin vNext front door |
| `skills-lock.json` | KEEP pending Phase 3 |
| `.agents/skills/*` | KEEP UNCHANGED pending Phase 3 |
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
| `config/native-gentle/native-nan.profile.json` | secret-free native routing/effort specification |
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

## D. Temporary compatibility only

| Surface | Retirement condition |
| --- | --- |
| `patches/gentle-pi-3.3.0-atenea-assess-bridge.patch` | remove when upstream committed-range ASSESS regression passes |
| assess portion of `tools/apply-gentle-330-atenea-host-bridge.sh` | same |
| associated #90 regression evidence | keep as historical/test evidence after fix |

Do not generalize this exception into a patching framework.

## E. Remove from active vNext tree

After Phase 4/6 qualification:

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

## F. Do not adjudicate until Phase 3

- all 37 Matt skills;
- Matt greenfield shaping flow;
- OpenSpec role;
- Repository Intelligence provider policy;
- UI/UX shaping stack.

## G. No active-runtime implementation belongs in P2

P2 creates the target contract and secret-free profile spec only.

Actual destructive pruning waits for the positive rebuild / cutover phases.
