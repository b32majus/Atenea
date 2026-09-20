# Atenea — Gentle Pi 2.7 Hybrid-Native Train Recipe v1

Date: 2026-09-15
Status: **HISTORICAL GP2.7 ZERO-TOUCH RECIPE — superseded by `RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`**

Purpose: make the qualified GP2.7/GAI2.9.1 unattended train reproducible without re-teaching the lifecycle in every operator prompt. This recipe is operational detail under the normative harness contract.

## 1. Qualified topology

```text
explicit human execution authorization
→ one persistent Pi + Gentle Pi 2.7 parent visible in Herdr
→ fresh package-owned implementation child for ticket A
→ parent reconciles child diff + deterministic verification
→ parent Bash tool: package-local Gentle AI 2.9.1 native review START, no TTY
→ Gentle Pi STATUS adopts the returned lineage
→ provider reviewer/correction transitions → APPROVED → acknowledge/burn
→ checkpoint A
→ fresh package-owned implementation child for ticket B
→ same review lifecycle with a new lineage
→ checkpoint B
→ fresh frontier read → next ticket or STOP
→ human merge boundary
```

The parent is interactive and visible. Only the native START subprocess is intentionally non-TTY.

## 2. Runtime preflight

Verify actual effective runtime, not package narration:

```text
Pi                    0.85.1
Herdr                 0.9.0
Gentle Pi             2.7.0
Gentle AI package     2.9.1
Provider contract     1.2.0
RDD effective         on
```

The package-local GAI binary must exist, be executable, report 2.9.1 and match the package integrity manifest. Managed assets must be current (`gentle-ai sync --agent pi` when the provider reports them stale). The normal current model routing is documented in `docs/ROUTING_EVIDENCE_LEDGER_V1.md`.

A target-repo project-local routing/package override is higher priority than machine-global configuration. Detect it before pinned work and either explicitly accept it or STOP; never silently drift.

## 3. Repository/train preflight

Before mutation, the parent verifies:

- intended repository/worktree, branch and exact base HEAD;
- current durable issue/spec/WO authority and dependency frontier;
- clean/expected tracked and untracked state;
- tests/oracles required by the work item;
- delivery policy (local commit, push/PR, STOP-before-merge, etc.);
- no unresolved human-owned product/clinical decision.

An unexpected dirty/topology contradiction is STOP, not permission to reset or clean.

## 4. Parent role

The persistent parent is the train orchestrator and ticket integrator. It owns:

- train/frontier context;
- selection of the next compatible executable ticket;
- creation of one fresh native child per newly selected ticket;
- exact diff reconciliation against ticket scope;
- deterministic tests/QA/oracles;
- native RDD lifecycle for the exact candidate;
- checkpoint commit/publication when authorized;
- fresh frontier rediscovery after each accepted checkpoint;
- final factual report and STOP before the human merge boundary.

The parent must not implement ticket code when a fresh native implementation child is the selected writer path for the train. Small direct implementation remains a possible Gentle capability in other bounded runs, but a multi-ticket train using this recipe qualifies freshness explicitly through one child per ticket.

Normal train concurrency is `max_concurrency=1`. Parallel children require a separate compatibility/safety decision; do not infer parallel safety from independent issue titles.

## 5. Native child role

For each newly selected ticket:

1. launch a fresh package-owned `gentle-ai-worker`;
2. give it only the bounded ticket plus applicable repository constraints/verification expectations;
3. require it to return the implemented diff and evidence to the parent;
4. do not reuse that child for the next frontier ticket;
5. parent independently reconciles the returned working tree before review.

Current route: `opencode-go/glm-5.3-flash` `high`. Routing is replaceable operational configuration, not architecture.

## 6. Hybrid-native RDD START

After deterministic verification and exact candidate reconciliation, the parent uses its ordinary Bash tool to execute the **package-local Gentle AI binary** for native START. The Bash tool subprocess must have fd0/fd1/fd2 non-TTY; this was field-proven in the accepted GP2.7 path.

Use the provider's current supported `review start --cwd .` surface. Do **not** pass a consent override merely to make the run unattended:

```text
NO --consent=granted
NO --consent=relay as Atenea's normal bridge
NO --consent=declined
NO host TUI key injection
NO internal grantReviewSessionPermission call
```

If the CLI rejects the candidate for an intended-untracked declaration or another deterministic prerequisite, consume only the exact provider-prescribed continuation/remediation and re-run START against the same candidate. Do not reinterpret a consent transition as a prerequisite fix.

The START result must create/return a concrete review lineage. A visible `Review consent` dialog is a fail-closed condition for unattended operation; do not answer it automatically.

## 7. Same-lineage Gentle Pi adoption

Once native START has created the lineage:

- do not call START again for the same candidate;
- invoke the Gentle Pi review facade STATUS using the exact returned lineage;
- verify applicability is the current exact candidate/target;
- use only provider-returned collect bindings and continuations;
- retain opaque binding/token values exactly.

The accepted path requires `GENTLE_PI_SAME_LINEAGE_ADOPTION=PASS`. Any unrelated/stale target or route mismatch is STOP/recovery according to provider guidance, never a synthesized binding.

## 8. Reviewer forecast, correction and closure

When STATUS requires reviewer collection:

- use the provider-required single/group capture form;
- a `reviewer-model-run-forecast` is a bounded cost/action forecast, not review failure;
- if execution authority already covers the reviewer run, repeat the exact binding(s) with the provider-prescribed acknowledgement field;
- wait for the capture call to return; do not duplicate an in-flight same-slot capture;
- follow any provider-owned bounded correction/re-entry exactly;
- approval is not complete until exact `acknowledge-approved` succeeds and authority is burned.

After burn, do not use stale review authority for later candidate mutations. A new ticket/candidate gets a new lineage.

## 9. Checkpoint and next frontier

After an accepted ticket:

1. run final deterministic verification;
2. confirm review authority is consumed/clean as appropriate;
3. create only the authorized commit/checkpoint/publication;
4. reconcile the exact durable checkpoint;
5. freshly re-read compatible frontier authority;
6. launch a **new** native child for the next ticket or STOP.

Final merge remains human unless separately authorized.

## 10. Operator prompt surface

The human gives one bounded train prompt after explicit authorization. Keep it short because the mechanics above are durable authority.

Recommended shape:

```text
Execute the current EXECUTION_READY ticket/train end to end under the current Atenea contract and GP2.7 hybrid-native train recipe.
Remain the persistent visible Gentle-Pi parent in Herdr. Use one fresh package-owned implementation child per newly selected ticket, sequentially unless authority explicitly proves parallel safety.
For every mutating candidate, complete deterministic verification, the hybrid-native exact-candidate RDD lifecycle, APPROVED + acknowledgement/burn, and the authorized checkpoint before rediscovering the frontier.
Do not use the historical external supervisor/consent relay path unless this current path fails and the run explicitly enters the documented rollback boundary. Do not merge. Return a factual final report and STOP when the compatible frontier is exhausted.
```

Pinned work may additionally state exact issue(s), branch/worktree, frozen oracle hash and delivery boundary. Do not paste provider bindings, lineage reconstruction, internal permission APIs or historical experiment prose into the operator prompt.

## 11. Herdr observability

The parent should be started in a dedicated visible Herdr workspace/pane and its name/pane reported immediately. The operator may watch:

- todos/frontier progression;
- fresh child creation/completion;
- tests and candidate reconciliation;
- native START invocation/result;
- lineage/status/capture/reviewer activity;
- approval/burn and checkpoints.

Watching is not review authority. During an unattended train the operator must not answer a consent dialog; its appearance is evidence that the qualified zero-touch condition was not preserved.

## 12. Final report minimum

```text
RUNTIME_VERSIONS=
PARENT_SESSION=
PARENT_VISIBLE_IN_HERDR=YES
TICKETS_ATTEMPTED=
FRESH_CHILD_TASK_IDS=
NATIVE_NO_TTY_START_COUNT=
LINEAGES=
RISK_LENSES=
SAME_LINEAGE_ADOPTION=
REVIEW_OUTCOMES=
ACK_BURN=
DETERMINISTIC_TESTS_QA=
CHECKPOINTS=
REVIEW_CONSENT_DIALOGS=
HUMAN_TOUCH_AFTER_INITIAL_PROMPT=
HERDR_RPA=0
EXTERNAL_SUPERVISOR=0
ATENEA_RDD_RELAY=0
PUBLICATION=
MERGE=NO unless separately authorized
FINAL_STOP_REASON=
```

Human-touch claims are externally adjudicated. The parent's transcript cannot prove that a host TUI was never clicked.

## 13. Historical rollback path

The former plain Pi supervisor + fresh outer GP worker + Atenea mechanical consent relay remains documented historical/rollback evidence. It is not the normal GP2.7 path. Do not silently switch to it mid-run; a rollback is an explicit bounded operational decision after a concrete failure.

Evidence for the replacement: `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`.
