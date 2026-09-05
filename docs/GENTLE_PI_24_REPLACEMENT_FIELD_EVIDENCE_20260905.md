# Gentle Pi 2.4 replacement field evidence — PROMueve T3/T4/T5 + atomic repairs/T5

Date: 2026-09-05
Status: BOUNDED REPLACEMENT EVALUATION — PASS_DELETE; ADOPTION/CUTOVER PENDING HUMAN REVIEW
Tracking: Atenea #35

## Purpose

Record the real PROMueve field evidence produced while reevaluating Gentle Pi as a replacement/deletion candidate for the currently qualified `Pi → Herdr → headless OpenCode + Gentle` execution path.

This document does not rewrite historical Gentle Pi 2.2.0 FAIL evidence, Stage 5–8 evidence, Judit #76, or the negotiated-v2 OpenCode canary. It records a materially newer runtime epoch and the exact properties observed.

## Runtime epoch

```text
Pi            0.85.1
Herdr         0.8.2
Gentle Pi     2.4.0
Gentle AI     2.6.0
pi-intercom   0.13.0
OpenCode      1.18.29 installed, NOT used by the Gentle-Pi worker path in this field epoch
```

## Candidate topology

```text
explicit human execution authorization
        ↓
human terminal launch OR Cora/DC mechanical launch
        ↓
Herdr
├─ Pi supervisor
│    normal Pi process
│    Gentle Pi disabled
│    pi-intercom loaded explicitly
│    non-implementing
│    monitors worker / authority / checkpoint
│
└─ Pi worker
     Gentle Pi 2.4 normal extension discovery
     GENTLE_PI_AUTONOMOUS_MODE=1 injected in worker pane
     --no-skill-registry
     implementation + deterministic verification
     native Gentle exact-candidate RDD
     acknowledgement/burn
     normal non-force publication
```

The worker, not the supervisor, owns every Gentle lifecycle command/provider transition. Herdr remains process/session substrate only.

## T3 — diagnostic field run

Target: `b32majus/Hub-Clinico-Badajoz` issue #295.

Accepted product checkpoint:

```text
HEAD  b560dd5d88a13b41a643a6e053f647f40f83ced9
TREE  3805897ff52d01ce5740b334c69e5dc4bcb37610
```

T3 established that worker → supervisor RDD delegation can work: the worker requested exact-candidate review consent, the supervisor consumed the preauthorized bounded decision, the worker executed the provider-owned answer in its own session, and RDD completed APPROVED → acknowledged → burned.

T3 did NOT qualify zero-touch end to end. Two topology/configuration defects remained:

1. the supervisor also loaded Gentle Pi while sharing the candidate worktree, so its own `agent_end` hook observed worker mutations and generated repeated supervisor-self RDD prompts;
2. `GENTLE_PI_AUTONOMOUS_MODE=1` existed in the supervisor environment but was not inherited automatically by the separately created Herdr worker pane, so normal push still surfaced an approval prompt.

T3 therefore remains diagnostic evidence for the replacement experiment, not the zero-touch acceptance run.

## T4 — corrected replacement execution run

Target: `b32majus/Hub-Clinico-Badajoz` issue #296 residual repair.

```text
START_HEAD  896b0a4a8afb84bce78afe30280bd9dced1db585
FINAL_HEAD  d5e71247aaa4c57bb4b066313e679ab21ceb6d1e
FINAL_TREE  7d1e2b418493f9d3128f24e549fb2eb8ba880d05
BRANCH      work/hermes/fh-t4-delivery-repair-20260905
```

Corrected topology changes versus T3:

```text
SUPERVISOR_GENTLE_PI=OFF
SUPERVISOR_PI_INTERCOM=ON
WORKER_GENTLE_PI=2.4.0
WORKER_GENTLE_PI_AUTONOMOUS_MODE=1   # injected into worker pane itself
WORKER_NO_SKILL_REGISTRY=YES
```

Observed execution evidence:

```text
SUPERVISOR_SELF_RDD_REQUESTS=0
WORKER_RDD_CONSENT_REQUESTS=1
RDD_CONSENT_RESOLVED_BY=PI_SUPERVISOR_WITH_PREAUTHORIZED_BOUNDED_SCOPE
WORKER_EXECUTES_PROVIDER_ANSWER_CONSENT=PASS
GENTLE_RDD=APPROVED
ACKNOWLEDGEMENT_BURN=PASS
NORMAL_NON_FORCE_PUSH=PASS
REMOTE_HEAD_MATCH=PASS
EXTERNAL_TOUCH_AFTER_CORA_LAUNCH=0
E2E_UNATTENDED=PASS
```

The supervisor remained non-implementing. Cora/DC performed the mechanical launch only after explicit human authorization; no human terminal action or Cora/DC approval was required after launch.

The worker self-corrected one non-product Herdr CLI invocation mistake (`--timeout` without `--wait`) before the work prompt was delivered; no external intervention was required.

Transient provider 429 responses occurred during the run, but the worker recovered without changing scope, bypassing review, fabricating PASS, or requiring external input.

## T4 product evidence

Worker-reported differential TDD:

```text
baseline battery      133/133 PASS
focused RED            19 assertion-level failures on the 3 residual defects
post-fix battery       169/169 PASS
node --check           PASS
commit diff --check    PASS
```

Independent post-checkpoint Cora audit of the immutable `d5e7124` archive:

```text
official battery       169/169 PASS
syntax                  PASS
independent adversarial 14/14 PASS
local HEAD == remote    PASS
changed paths           exactly 2 authorized files
```

The independent probes covered fail-closed indented labels, PreSalud `requested_schedule` target NONE / NO_PROPOSAL, absence of `fhDermaPauta*` hydration, exact `medicamento_raw` source preservation, seventh-field rejection, no clinical decomposition of medication description, and `can_apply=false`.

After the accepted commit/push, pi-lens reformatted the two files in the working tree and produced an unreviewed format-only local candidate. That post-checkpoint noise was NOT committed or pushed and does not alter the accepted remote HEAD above.

## Replacement/deletion finding so far

The T4 execution path did not use OpenCode. It also did not need the downstream negotiated-v2 OpenCode consent-policy canary.

Potential deletions if the replacement is finally adopted:

```text
OpenCode as unattended implementation runtime
OpenCode review-integration/v2 transport seam
Atenea downstream negotiated-v2 consent-policy canary as an operational requirement
```

The candidate does NOT delete Pi supervision, Herdr, Gentle exact-candidate RDD, Git/GitHub authority, or the human merge boundary.

## Qualification state after T4 — historical intermediate snapshot

```text
GENTLE_PI_2_2_0_HISTORICAL_FAIL=RETAINED
GENTLE_PI_2_4_EXECUTION_PATH_CANDIDATE=PASS
GENTLE_PI_2_4_ZERO_TOUCH_REAL_REPAIR=PASS
GENTLE_PI_2_4_NORMAL_PUBLICATION=PASS
GENTLE_PI_2_4_RDD_SUPERVISOR_DELEGATION=PASS
GENTLE_PI_2_4_CONTINUITY_COMPOSED_T5=PASS
GENTLE_PI_2_4_FRONTIER_REDISCOVERY_STOP=PASS
GENTLE_PI_2_4_FULL_REPLACEMENT_QUALIFICATION=PASS_DELETE
GENTLE_PI_2_4_ADOPTED=NO
```

At the T4-only point, #35 still required continuation plus frontier rediscovery/STOP. T5 final qualification and the later supervisor-owned frontier rediscovery supersede that intermediate state with final `PASS_DELETE`.

The normal Atenea front door remains unchanged until the separate human adoption/cutover decision is made.

## T5 — harness PASS and product FAIL are independent outcomes

PROMueve T5 issue #297 was the first composed `T2 → T3/T4 → reconciliation` execution on the replacement path.

Initial candidate:

```text
START_HEAD   58d6518fea25650fc2e980064b3a3c3dcfb43c81
FINAL_HEAD   13d759ec1b45a9b32a9519429c9bf473a272d2b6
WORKER_TESTS T2 PASS · T3 71/71 · T4 169/169 · T5 57/57
RDD          APPROVED → acknowledged/burned
PUSH         normal non-force; remote HEAD matched
EXTERNAL_TOUCH_AFTER_CORA_LAUNCH=0
E2E_UNATTENDED=PASS
PRODUCT_ACCEPTANCE=FAIL
```

The independent post-run product gate rejected `13d759e` despite green worker tests and approved RDD. It found a real T2→T4 PreSalud multi-record seam plus D6 output-contract violations in T5. The checkpoint therefore was published only as a rejected candidate and did not unlock T6.

This establishes a durable Atenea rule:

```text
UNATTENDED_PASS != PRODUCT_ACCEPTANCE_PASS
```

Unattended execution measures the harness lifecycle. Product acceptance remains a separate authority/verification decision.

## Atomic repair evidence after T5 rejection

Two operator-approved atomic repairs closed the findings without broadening T5:

```text
#303 Repair A — T2 PreSalud multi-record structural seam
checkpoint  c25425ef6b78494fcfec1656f8094c826104749f
T2 battery  422/422 PASS
cross-seam  T2 → T4 = MULTI_RECORD_UNSUPPORTED_V0 / zero proposals / can_apply=false
RDD          APPROVED → acknowledged/burned
publication  normal non-force; local == remote

#304 Repair B — T5 D6 reconciliation-axis contract
checkpoint  5ae810aee2ec1cf832aff74aed888ec04c3c6bee
T5 battery  157/157 PASS
predecessors T2 422/422 · T3 71/71 + oracle 22/22 · T4 169/169
independent adversarial gate 16/16 PASS
RDD          APPROVED → acknowledged/burned
publication  normal non-force; local == remote
```

Repair B keeps `comparison_status` closed to the four D6 values, keeps origin as an independent axis, preserves structural `principio_activo_raw = NOT_COMPARABLE / NO_PROPOSAL / target NONE`, and fails closed for contiguous and separated PreSalud V0 multi-record input without exposing cross-record clinical choices.

## T5 final qualification — composed product + native RDD / continuity PASS

A fresh qualification branch then pointed at the repaired final SHA without creating a ceremonial extra code commit:

```text
WORK_ITEM     Hub-Clinico-Badajoz #297
BASE_REF      58d6518fea25650fc2e980064b3a3c3dcfb43c81
FINAL_HEAD    5ae810aee2ec1cf832aff74aed888ec04c3c6bee
BRANCH        work/hermes/fh-t5-final-qualification-20260905
WORKER_MODEL  deepseek/deepseek-v4-flash
TREE          clean
```

Qualification evidence:

```text
T2 battery       422/422 PASS
T3 battery        71/71 PASS
T3 oracle         22/22 PASS
T4 battery       169/169 PASS
T5 battery       157/157 PASS
syntax x9         PASS
diff check        PASS
range             exact 4 paths
T3/T4 blobs       IDENTICAL to accepted predecessors
native RDD        APPROVED (4/4 lenses)
ack/burn          PASS
local == remote   PASS
product mutation  NONE during qualification
external touch    0
```

The native review used the exact committed range from the T3/T4 composition base through the repaired T5 candidate. The worker relayed the provider-owned consent envelope through pi-intercom; the normal Pi supervisor granted only the exact preauthorized candidate; the worker executed `answer-consent` in its own Gentle session. No PR, merge, issue close, `recovery` or `main` mutation occurred.

This closes the replacement experiment's **continuity on a composed real work item**. It does **not** by itself prove autonomous frontier rediscovery/exhaustion because the qualification prompt was pinned to #297 and explicitly required STOP before T6. Hub-Clinico-Badajoz #298 is now objectively executable because its only blocker is an accepted T5 checkpoint, but that fact was verified outside the pinned T5 worker lifecycle.

```text
GENTLE_PI_2_4_COMPOSED_T5_QUALIFICATION=PASS
GENTLE_PI_2_4_CONTINUITY=PASS
GENTLE_PI_2_4_FRONTIER_REDISCOVERY_EXHAUSTION=PENDING_AT_THIS_STEP
GENTLE_PI_2_4_ADOPTED=NO
```

## Supervisor efficiency finding — event driven, not polling

The first T5 run completed unattended but took about 23 minutes. A material part of the delay came from supervisor-side fixed polling (`sleep 50` loops) while the worker was already waiting on pi-intercom. Herdr `agent_status` also reported `idle` while the Pi TUI visibly remained in `Working`, so that status is not a reliable lifecycle clock.

Repairs #303 and #304 changed the supervision contract to:

```text
launch worker
→ END supervisor turn
→ worker performs work
→ pi-intercom inbound wakes supervisor only for a bounded decision
→ supervisor verifies scope and replies
→ END supervisor turn
→ worker continues
→ FINAL intercom wakes supervisor
→ read-only local/remote verification
→ STOP
```

Prohibited for the candidate path: fixed sleeps, `for`/`while` polling, periodic `herdr agent get/read`, long `herdr agent wait`, or inferring work lifecycle from `agent_status`.

This event-driven pattern worked on both atomic repairs. The supervisor remained non-implementing and reacted only to worker messages/asks.

## Worker route health finding — Muse Spark 1.3 / Console Go degraded during this epoch

Repeated `rate_limit_exceeded` 429 responses occurred on workers using `opencode-go/muse-spark-1.3-contributor` during T5 and both repairs. The failures continued when the supervisor was moved to `commandcode/deepseek-v4-flash`, so current evidence does **not** support “supervisor and worker sharing a provider” as the cause.

The causal layer is unresolved: it may be model capacity/popularity, Console Go quota/capacity, or another route-level constraint. Therefore record only:

```text
opencode-go/muse-spark-1.3-contributor = DEGRADED_IN_THIS_FIELD_EPOCH
cause = UNRESOLVED
```

Do not make provider separation an architectural requirement. Choose supervisor and worker routes independently from current health/cost/capability evidence, and avoid a repeatedly degraded worker route for unattended qualification until it is rechecked.

## Pi-lens finding

Pi-lens remains useful for diagnostics/LSP/static feedback, but its default deferred formatting/autofix mutated files after accepted checkpoints. The supported worker flags:

```text
--no-autoformat
--no-autofix
```

removed that post-checkpoint mutation path in later runs while preserving diagnostic capabilities. Candidate Atenea workers should keep pi-lens diagnostic-only unless a work item explicitly authorizes formatter/autofix mutations.

## Skill-registry/runtime-noise finding

`--no-skill-registry` is upstream-supported, and later runs additionally injected `GENTLE_PI_NO_SKILL_REGISTRY=1`. Occasional `.atl/` / `.gitignore` runtime noise was nevertheless observed across the broader experiment. Its exact originating process has not been proven. Do not assign false causality; exclude runtime-only state from product candidates and preserve evidence when it appears.

## Integration composition gate

T3 and T4 were valid sibling checkpoints. Merging them to `recovery` was neither required nor sufficient to prevent the T5 defect. T5 correctly required an isolated composition base containing both accepted siblings.

The field failure shows a useful pre-builder integration check for tickets that compose multiple predecessors:

```text
verify exact predecessor checkpoints/blobs
→ compose them in an isolated worktree/branch
→ run predecessor contract batteries / cross-seam probes read-only
→ only then let the integration worker build
```

This is a composition gate, not a requirement to merge each predecessor into a protected/integration branch.

## Pinned supervisor spawn recipe finding — two separate fail-closed defects

Two supervisor startup defects were observed. They share one ergonomics root — reconstructing a pinned launch from prose — but are distinct failures:

```text
DEFECT_S1_SUPERVISOR_BOOTSTRAP_REDISCOVERY
  observed: supervisor reopened model/Herdr discovery (`pi --list-models` / help) although the work was pinned and the launch recipe was already known
  product mutation: NONE
  consequence: wasted time / possible stall before worker creation
  classification: operator-ergonomics / spawn-contract defect, not product or Gentle lifecycle failure

DEFECT_S2_SPAWN_MODEL_IDENTIFIER_FAILURE
  observed: final-qualification first spawn attempt reconstructed a model identifier that failed at runtime
  product mutation: NONE
  RDD reached: NO
  consequence: worker never became execution-ready; attempt failed closed
  evidence: `outbox/reports/promueve-t5-final-qualification-20260905/spawn-fail-supervisor.txt`
  recovery: fresh launch using the exact verified recipe; final qualification then completed unattended
```

A prose instruction saying “do not rediscover the harness” is therefore insufficient. Pinned work should consume a small **versioned exact worker-spawn recipe** containing the already-qualified Herdr pane/start syntax, required environment injection, extension flags and the exact model route selected for that run. The supervisor validates the recipe against current runtime availability; it does not regenerate command syntax or model identifiers from memory.

This requirement does **not** authorize a daemon, scheduler, launcher service, DAG/controller or KairOS-style state machine. It is deterministic repo-local operator configuration, not a new runtime layer.

## T5 accepted checkpoint — exact final evidence

After Repair A #303 and Repair B #304, T5 was qualified again without creating an artificial commit. The accepted code remained the repaired SHA:

```text
BASE_REF    58d6518fea25650fc2e980064b3a3c3dcfb43c81
FINAL_HEAD  5ae810aee2ec1cf832aff74aed888ec04c3c6bee
QUAL_BRANCH work/hermes/fh-t5-final-qualification-20260905
RANGE       exactly 4 paths (T2 Repair A + T5 pipeline/checker)
TREE        clean
LOCAL_REMOTE_HEAD_MATCH=PASS
```

Fresh deterministic qualification:

```text
T2                  422/422 PASS
T3                   71/71 PASS
T3 acceptance oracle 22/22 PASS
T4                  169/169 PASS
T5                  157/157 PASS
node --check          PASS
range diff --check    PASS
T3/T4 blob identity   PASS
Cora independent adversarial gate on same final SHA 16/16 PASS
```

Native Gentle RDD on committed range `58d6518..5ae810a`:

```text
risk tier              high (4 files / 834 lines)
lineage                 review-e8412b793c0d303a
lenses                  risk / resilience / readability / reliability
review result           APPROVED 4/4
scope/consent           bounded envelope relayed worker → supervisor → granted
forecast acknowledgement supervisor ACK
final acknowledgement  completed
burn                    gentle-ai.review-acknowledged/v1
product mutations       none during qualification
```

The qualification branch was created by a normal non-force branch push pointing to the same accepted SHA; no commit/amend/rewrite/force was used.

## Frontier rediscovery / exhaustion STOP

After the accepted T5 qualification, the same non-implementing supervisor performed a fresh read-only GitHub authority check of parent #292 and next candidate #298.

```text
PARENT_292=OPEN + status:approved
T6_298=OPEN + status:approved + ready-for-agent
T5_DEPENDENCY=SATISFIED_BY_ACCEPTED_REMOTE_CHECKPOINT_5ae810a
NEXT_FRONTIER=#298
T6_LAUNCHED=NO
FINAL_ACTION=STOP
```

The preserved supervisor transcript `promueve-t5-final-qualification-20260905/t5q-supervisor-final.txt` confirms the same non-implementing supervisor freshly read #292/#298 after T5 acceptance, reported `NEXT_FRONTIER=#298`, launched no T6 worker and STOPped. This closes the remaining #35 frontier-rediscovery/STOP requirement without introducing a synthetic qualification stage.

## Final #35 decision evidence

All required preservation properties now have real field evidence across T3/T4/T5 and the atomic repairs: current authority use, fail-closed behavior, isolated worktrees, bounded edit surfaces, native exact-candidate RDD, provider-owned continuation/acknowledgement, Herdr-compatible bounded consent relay, deterministic verification, normal non-force publication, exact remote reconciliation, fresh frontier rediscovery/STOP, no automatic merge and no destructive recovery.

Meaningful deletion is demonstrated because the successful worker path no longer requires:

```text
OpenCode as unattended implementation runtime
OpenCode review-integration/v2 transport seam
Atenea's downstream negotiated-v2 OpenCode consent-policy canary as an operational requirement
```

The smaller proposed architecture is:

```text
explicit human authorization
→ Cora/DC or human mechanical launch
→ normal Pi supervisor (non-implementing, Gentle Pi OFF, pi-intercom ON)
→ Herdr separate Pi worker
→ Gentle Pi 2.4 + Gentle AI native RDD
→ ordinary Git/GitHub delivery
→ fresh frontier rediscovery / STOP
→ human merge boundary
```

Qualification result:

```text
RESULT=PASS_DELETE
GENTLE_PI_2_4_FULL_REPLACEMENT_QUALIFICATION=PASS_DELETE
GENTLE_PI_2_4_ADOPTED=NO
ADOPTION_DECISION=PENDING_HUMAN_REVIEW
```

The successful qualification also exposed operator-ergonomics debt that does not invalidate PASS_DELETE: supervisor LLMs may rediscover Herdr syntax or rewrite a model identifier even when told not to. The first final-qualification spawn attempt failed closed with zero product mutation; the second self-corrected and completed unattended. This strengthens the requirement for a small versioned/pinned worker-spawn recipe inside the harness rather than repeated prose reconstruction. That recipe must not become a new daemon, scheduler or KairOS-style controller.
