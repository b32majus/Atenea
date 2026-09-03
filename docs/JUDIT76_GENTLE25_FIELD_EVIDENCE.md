# Judit #76 — Gentle AI 2.5.0 stable field evidence

Date: 2026-09-03
Status: REAL-PROJECT FIELD EVIDENCE — NOT A NEW QUALIFICATION STAGE

## Purpose

Record the natural stable-contract evidence produced while executing `b32majus/judit_life_new` Issue #76 / PR #79 through the qualified Atenea path.

This file does not rewrite frozen Stage 7/8 evidence. It records what changed when the real-project path moved from Gentle AI `2.5.0-rc.2` qualification evidence to `2.5.0` stable.

## Final accepted candidate

```text
TARGET_REPO=b32majus/judit_life_new
WORK_ITEM=#76
PR=#79
BASE=b56d749421b08431250e9199772af3b3b46d4e3d
FINAL_HEAD=3967e2cfec37e6c8861be2435cf8b53cf67c438e
PR_STATE=OPEN
PR_MERGEABLE=YES
AUTO_MERGE=NO
CORA_EXACT_CUMULATIVE_PR_AUDIT=PASS
```

Final deterministic evidence reported and independently re-audited:

```text
focused Training proposal tests = 26/26
full npm test                    = 400/400, 99 suites
build                            = PASS
tsc --noEmit                     = PASS
git diff --check                 = PASS
migration fresh-init             = v12 PASS
```

The two Cora repairs after the initial implementation were evidence/test-only. No product code changed in either repair.

## Runtime evidence

Observed stable field runtime:

```text
Gentle AI  = 2.5.0 stable
Pi         = 0.84.4
Herdr      = 0.8.2
OpenCode   = 1.18.26
```

Successful recovery/repair runs used DeepSeek V4 Flash operational routing for the supervisor/worker path; the four principal RDD lenses were already routed to CommandCode DeepSeek V4 Flash, with GLM 5.3 Flash as refuter. Model/provider routing remains operational evidence, not Atenea architecture.

## Stable exact-candidate RDD evidence

Stable Gentle completed native exact-candidate review and acknowledgement/burn successfully.

Observed successful lineages included:

```text
review-89c3149b5e84aaf4   initial implementation candidate
review-d38194ab8019f33e   first Cora acceptance-evidence repair
review-79b5f46c34da40af   final Cora acceptance-evidence repair
```

Each successful terminal review was approved, acknowledged exactly once and reported `gentle-ai.review-acknowledged/v1` with burned authority.

Therefore:

```text
GENTLE_2_5_STABLE_EXACT_CANDIDATE_RDD=PASS
PROVIDER_CONTINUATION_REENTRY=PASS_ON_SUCCESSFUL_PATH
ACKNOWLEDGEMENT_BURN=PASS
ATENEA_FINALIZE_LAYER_REQUIRED=NO
```

## Zero-human-touch finding — corrected diagnosis

The real #76 **OpenCode negotiated-v2 path** required repeated human consent when the exact candidate changed:

```text
initial candidate       → human review consent
first evidence repair   → new candidate → human review consent
final evidence repair   → new candidate → human review consent
```

The first interpretation was too broad. Stable Gentle `2.5.0` has **not** removed zero-touch review semantics globally.

Current stable upstream preserves two distinct consent paths:

### Organic/plain START

Gentle's own review-mode path still has one-time clone/work consent semantics. Accepting the organic consent question records the provider-owned latch and later candidates can be reviewed silently. Stable code/tests explicitly preserve that behavior.

Stable also authorizes an undeclared negotiated START silently when the caller is non-interactive.

### OpenCode negotiated `review-integration/v2`

The provider's v2 next-transition builder currently appends:

```text
--consent relay
```

to START whenever `contract == gentle-ai.review-integration/v2`.

That declaration intentionally selects candidate-scoped negotiated semantics:

- `relay` returns the typed human question;
- `granted` applies only to the exact frozen candidate;
- later medium/high candidates ask again;
- the negotiated grant does not consume/persist Gentle's legacy/organic clone-wide latch.

Therefore the accurate status is:

```text
HISTORICAL_RC2_ZERO_HUMAN_TOUCH=PASS
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=EXISTS
CURRENT_OPENCODE_NEGOTIATED_V2_ZERO_TOUCH=NOT_SATISFIED
CAUSE=V2_NEXT_TRANSITION_FORCES_CONSENT_RELAY
CLASSIFICATION=UPSTREAM_INTEGRATION_CAPABILITY_GAP
```

Atenea MUST NOT close this gap by removing `--consent relay`, injecting `--consent granted`, or reconstructing START. Provider-issued transitions remain exact/opaque.

Issue #36 owns the upstream-first investigation for **negotiated-v2 consent-policy parity** or another supported provider-owned route that preserves the qualified properties.

`review-integration/v1` is not a durable escape hatch: stable upstream marks v1 frozen/legacy/read-execute compatibility only and plans its retirement; new-lineage behavior consumes v2 exclusively.

## Supervisor ownership finding

An over-specified recovery prompt told Pi to execute provider-issued Gentle continuations. Pi interpreted this as authority to run `gentle-ai review ...` lifecycle commands itself.

That violated the qualified Stage 8 topology.

Correct boundary:

```text
Pi
  frontier / authority / worker supervision
  lossless relay of genuine human-decision envelopes
  grant of already-authorized operational permissions

OpenCode + Gentle worker
  implementation
  deterministic verification
  all Gentle lifecycle operations and provider-issued transitions
  bounded correction
  acknowledgement/burn
  normal publication under repository policy
```

Pi MUST NOT run Gentle review lifecycle commands on behalf of the worker.

## Operator-prompt finding

Prompt shape materially affected supervisor behavior.

The frozen Stage 7/8 operator surface was intentionally small. In #76, large prompts that restated lifecycle internals caused responsibility reinterpretation, redundant investigation and context growth.

Current guidance:

```text
NORMAL RUN
  state the work item / goal
  request worker creation/supervision through Herdr
  state the delivery boundary

RESUME / REPAIR
  state the exact current checkpoint
  say what already-completed work must not be repeated
  add only the narrow incident-specific boundary
```

Durable lifecycle mechanics belong in repository/Atenea authority, not in the operator prompt.

## Worker continuity finding

During Cora repair rounds Pi created a fresh OpenCode worker instead of reusing the already-healthy worker bound to the same issue/PR/worktree.

Preferred default:

```text
same issue + same PR + same worktree/branch + same authority + healthy worker
  → reuse the existing OpenCode worker
```

Use a fresh worker only when the existing worker is unavailable/unhealthy, context is materially contaminated, the worktree/runtime changes, or isolation is explicitly requested.

A changed source candidate still requires a **fresh Gentle review lineage**. Reusing OpenCode context never means reusing prior exact-candidate review authority.

## Supervision efficiency finding

The failed first recovery path used repeated fixed `sleep 180` / `sleep 300` polling and accumulated large context and failed Herdr reads/waits.

Atenea does not need a polling controller. Pi SHOULD prefer the narrowest Herdr/native wait/read primitive appropriate to the current state and MUST NOT use multi-minute fixed sleeps as its normal supervision strategy.

## Permission finding

Normal non-force push was already authorized by Atenea repository policy, yet the successful stable runs still surfaced a human `Allow once` shell permission before push.

This is not a human product decision. Pi SHOULD grant already-authorized operational permissions itself when the runtime exposes them safely.

Human relay remains mandatory for genuine human-decision envelopes emitted by the current selected provider path and final merge. If Issue #36 identifies a supported provider-owned zero-touch negotiated path, no Atenea auto-consent layer is required.

## Legacy authority escape

The first stable #76 attempt was also affected by a globally autoloaded historical KairOS Pi extension. That extension was removed from active Pi configuration without deleting historical evidence. The normative authority-resolution fix is already recorded separately by Atenea PR #33.

This field file does not reopen that architecture.

## Result

```text
STABLE_GENTLE_FIELD_EVIDENCE=PASS
CORE_PI_HERDR_OPENCODE_GENTLE_ARCHITECTURE=RETAIN
SUPERVISOR_LIFECYCLE_BOUNDARY=CLARIFY
WORKER_REUSE_POLICY=DEFINE
FIXED_POLLING_DEFAULT=REJECT
NORMAL_PUSH_HUMAN_PERMISSION=REMOVE_WHEN_ALREADY_AUTHORIZED
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=EXISTS
OPENCODE_NEGOTIATED_V2_ZERO_TOUCH=OPEN_UPSTREAM_INTEGRATION_GAP
```

Real use remains the test harness. Do not create a synthetic Stage 9 to restate these findings.
