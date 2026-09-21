# P7 vNext Promotion — 2026-09-22

Status: **PROMOTION CANDIDATE / FINAL CLONE GATE PENDING**

## 1. Promotion scope

P7 promotes the already-qualified vNext architecture from working program to current repository authority.

It does not introduce a new runtime design.

Promoted current surfaces:

- `README.md`;
- `AGENTS.md`;
- `CONTEXT.md`;
- `docs/START_HERE.md`;
- `docs/ATENEA_HARNESS_CONTRACT_V1.md`;
- `docs/INSTALLATION_AND_OPERATION_V1.md`;
- `docs/OPERATOR_RUNBOOK_V1.md`;
- `docs/NEWCOMER_QUICKSTART_V1.md`;
- `docs/QUALIFICATION.md`;
- `docs/CURRENT_DECISIONS.md`.

## 2. Current architecture

```text
human + durable product authority
→ Atenea stable policy / desired state
→ native Pi + Gentle execution
→ deterministic evidence
→ human / target-repository publication boundary
```

Atenea active runtime/review/worker/routing controller count remains zero.

## 3. Front-door simplification

The eight main operational/front-door documents excluding the historical decision ledger were reduced from approximately:

```text
2,008 lines
→
994 lines
```

This is roughly a 50% reduction in active instruction surface.

The reduction came from removing duplicated historical runtime mechanics, routing tables, train recipes and provider lifecycle prose now owned upstream.

## 4. Historical boundary

High-risk old run recipes/field evidence now carry an explicit:

```text
HISTORICAL / NON-OPERATIVE
```

banner.

Pre-vNext runtime implementation/check artifacts live under:

`historical/runtime/`

The previous monolithic qualification document is preserved at:

`historical/qualification/QUALIFICATION_PRE_VNEXT.md`

Current `docs/QUALIFICATION.md` describes the vNext qualification state.

## 5. Decision provenance

`docs/CURRENT_DECISIONS.md` now begins with C-055 through C-059 as the current vNext cutover authority.

Older decisions remain in place as provenance and are superseded where they conflict with C-055+.

The current execution sequence at the end of the file was rewritten around ordinary `pi` + native Gentle.

## 6. Deterministic promotion gate

Before final promotion commit:

```text
ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
ATENEA_VNEXT_AUTHORITY_CHECK=PASS
front-door stale-token scan = clean
git diff --check = PASS
```

The final gate is a fresh clone of the P7 commit followed by the same oracles, doctor/auth checks and a native Pi/Gentle smoke.

## 7. Superseded workarounds

Superseded Atenea runtime workarounds are archived/non-operative.

Open upstream compatibility defects remain intentionally tracked where they still exist; P7 does not falsely close them merely because Atenea no longer carries a bridge.

In particular, current compatibility tracking remains in:

`docs/vnext/CURRENT_COMPATIBILITY.md`

## 8. Publication boundary

P7 promotion in this branch is a local Git authority change.

It does not itself authorize:

- remote push;
- pull request creation;
- merge;
- force-push;
- closing unrelated external upstream issues.

Those remain separate publication/human decisions.
