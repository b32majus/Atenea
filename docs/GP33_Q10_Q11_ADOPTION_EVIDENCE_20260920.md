# Gentle Pi 3.3 / Gentle AI 3.4 — Q10/Q11 adoption evidence

Date: 2026-09-20
Status: **CURRENT QUALIFICATION / ADOPTION EVIDENCE**

This file records why Atenea's current GP3.3 architecture is smaller than GP2.7. It is evidence, not a second runtime contract. Current normative authority remains `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

## 1. Qualified/current runtime distinction

The strong Q10/Q11 qualification ran on:

```text
Pi                              0.86.0
Gentle Pi / Gentle Shell        3.3.0
Gentle AI                       3.4.0 package-paired
Q10/Q11 qualification route    nan/deepseek-v4-flash · medium for all roles
qualification route scope       TEMPORARY / ISOLATION ONLY
max_concurrency                 1
```

Pi was explicitly upgraded afterwards to `0.86.1`. `0.86.1` is the current installed runtime. Its published local changelog contained compile-cache/clipboard changes and no known Gentle/RDD authority change, but the exact Q11 single-acceptance train baseline remains Pi `0.86.0` until an ordinary real train supplies parity evidence.

## 2. Q2–Q8 — ODD capability ladder that justified deletion

Before Q10, the isolated GP3.3/GAI3.4 qualification established the upstream properties Atenea had previously implemented or prescribed itself:

```text
Q2 small work               PASS — one-file change stayed lightweight; no durable odd/tasks ceremony
Q3 substantial work         PASS — durable ODD state, gentle-ai-worker delegation, independent verify, tests and work-unit commits
Q4 multi-file enforcement   PASS — parent was blocked before a second non-trivial direct file write and redirected to bounded delegation
Q5 proportional risk        PASS — passive=no review; medium accumulates/slices; high=immediate native review; typed next_transition returned
Q7 frozen oracle            PASS — externally frozen test authority remained byte-identical while implementation reached green
Q8 external A→B frontier    PASS — A executed then STOPped before visible-but-unauthorized B; B ran only after a new explicit human authorization
```

Q3 also proved that allowed-edit surfaces are runtime-enforced rather than prompt-only: malformed delegation attempts were rejected until the canonical edit-surface contract was supplied. Q5 showed that Atenea no longer needs to prescribe a full expensive RDD after every microchange; Gentle owns candidate risk classification and review timing. Q7 preserves the distinct Atenea/project responsibility: an external clinical/product oracle can remain frozen while ODD executes against it.

Q8 separated **internal execution state** from **external product authority**: ODD may discover or describe adjacent work, but that does not authorize it. This is the basis for keeping GitHub/repository authority and `EXECUTION_READY` outside ODD while deleting Atenea micro-orchestration.

## 3. Q10 — ODD owns internal micro-orchestration

One persistent parent executed an already-authorized C→D train in the same live session. C and D remained separate commits and the parent re-read `AUTHORITY.md` after each external work unit. Visible but unauthorized E remained untouched and had no executable ODD state.

Q10 therefore proved:

```text
FRESH_CHILD_PER_EXTERNAL_TICKET_IS_ATENEA_INVARIANT=NO
PERSISTENT_PARENT_ACROSS_AUTHORIZED_TRAIN=PASS
ODD_INTERNAL_DECOMPOSITION_AND_DELEGATION=PASS
EXTERNAL_AUTHORITY_REREAD_BETWEEN_UNITS=PASS
UNAUTHORIZED_NEXT_FRONTIER_STOP=PASS
```

Atenea no owns small/substantial classification, internal task decomposition, worker selection, allowed-edit enforcement, independent verifier launch, work-unit commit mechanics, risk classification or review-slice mechanics. Those are Gentle Shell/ODD responsibilities. Atenea still owns the external authority/frontier, frozen oracles where required, domain/safety rules, fail-closed boundaries and publication/merge policy.

## 4. Q11b — single-acceptance unattended

For Q11 only, the parent, workers, verifier and review roles were deliberately forced to `nan/deepseek-v4-flash` to isolate the single-acceptance property. That all-V4 test route was never intended to become production policy. The first eligible native review was granted with the host action:

```text
Review and allow this session
```

A later fresh candidate in the same live Pi session/canonical Git repository reached and executed review without a second human consent interaction.

```text
FIRST_REVIEW_SESSION_GRANT=PASS
LATER_FRESH_CANDIDATE_NO_SECOND_CONSENT=PASS
SINGLE_ACCEPTANCE_UNATTENDED=PASS
```

The later Q11 qualification stop occurred because the test harness incorrectly forced remaining `refuter`/`validator` work through one group-capture shape. GP3.3 exposes distinct provider-issued role operations. This was harness debt, not a failure of the session-permission property.

### Operational routing after qualification

After Q11, production routing returns to the qualified role-diverse profile documented in docs/ROUTING_EVIDENCE_LEDGER_V1.md. The Q11 all-V4 route is evidence about consent/runtime behavior only and must never be promoted into Golden routing.

## 5. Qualified temporary host adaptation

The current Gentle Pi `3.3.0` installation carries a deliberately small, fail-closed host patch. The exact patch is versioned at:

```text
patches/gentle-pi-3.3.0-atenea-host-bridge.patch
tools/apply-gentle-330-atenea-host-bridge.sh
```

It adds only:

1. `gentle_review_capture_current_group` — after a fresh STATUS has registered the current reviewer group, the host forwards the exact retained `collectBindings` instead of asking the model to copy opaque blobs;
2. `host_consent_resolved` — when native host consent is already complete, the tool result explicitly tells the model not to ask the human again.

This patch is **not** a second RDD controller and is **not** a universal replacement for every provider collect transition. Refuter/validator and any other role-specific operations must follow their exact provider-issued route. The patch must fail closed on version/hash drift and should be deleted when upstream provides equivalent supported transport/host signaling.

## 6. ODD work-unit SHA bookkeeping guardrail

Q8B and Q10 reproduced an upstream bookkeeping defect: ODD recorded a work-unit commit SHA and then amended that same commit, invalidating the recorded identity.

Until upstream owns the fix:

```text
DO_NOT_AMEND_AFTER_RECORDING_WORK_UNIT_SHA=YES
RECORD_FINAL_SHA_IN_SUBSEQUENT_EVIDENCE_COMMIT=YES
```

This is a narrow compatibility guardrail, not Atenea-owned commit orchestration.

## 7. Performance characterization — do not misdiagnose Skill Registry

The post-cutover A/B weakened the original Skill Registry hypothesis.

Warm end-to-end runs crossed over:

```text
Registry ON   23.80 s, 7.95 s
Registry OFF   7.00 s, 20.30 s
```

So Skill Registry has measurable local CPU/RSS cost but does **not** explain the large 7→20+ second wall-clock swings by itself.

A later GLOBAL-vs-CLEAN Agent Home test produced near-identical warm medians:

```text
GLOBAL median pre-provider ≈ 4.569 s
CLEAN  median pre-provider ≈ 4.479 s
```

The first truly cold clean start reached ~18.6 s pre-provider, with ~16.6 s concentrated before `session_start`; Fast File Finder startup can wait up to ~15 s on its initial scan. Additional outliers also showed host/Node/filesystem variability before the profiler itself loaded.

Operational conclusion:

```text
SKILL_REGISTRY_ROOT_CAUSE=NO_EVIDENCE
DIRTY_AGENT_HOME_ROOT_CAUSE=NO_EVIDENCE
COLD_FFF_SCAN_CAN_CONTRIBUTE_MATERIAL_DELAY=YES
HOST_VARIABILITY_CAN_CONTRIBUTE=YES
PERFORMANCE_OPTIMIZATION_REQUIRES_MEASUREMENT=YES
```

Do not globally disable Skill Registry, remove Pretty, or clean Agent Home merely to chase latency without a new controlled measurement.

## 8. Adoption consequence

The current architecture is intentionally small:

```text
Human + Cora / shaping
  → durable external authority
  → explicit EXECUTION_READY
  → one persistent visible Pi + Gentle Shell parent
  → Gentle Shell / ODD owns internal engineering micro-orchestration
  → first eligible review gets one human session grant
  → later same-session/repository candidates need no second consent touch
  → Atenea re-reads external authority at work-unit/frontier boundaries
  → STOP on unauthorized/contradictory frontier
  → publication/merge remains repository/human policy
```

Historical GP2.7 non-TTY START→STATUS adoption, external supervisor, pi-intercom relay and Herdr RPA remain provenance/rollback evidence only.
