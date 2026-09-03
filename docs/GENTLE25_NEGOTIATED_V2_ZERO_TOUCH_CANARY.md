# Gentle 2.5 negotiated-v2 zero-touch canary evidence

Date: 2026-09-03
Status: BOUNDED CHARACTERIZATION PASS — NOT PRODUCTION ADOPTION
Tracking: Atenea #36 / upstream Gentleman-Programming/gentle-ai#4109

## Purpose

This document records the bounded downstream characterization used to answer one narrow question exposed by the Judit #76 stable field run:

> Can the current OpenCode negotiated `gentle-ai.review-integration/v2` path preserve Gentle-owned exact-candidate RDD while completing a medium-risk review with zero human touch after initial execution authorization, without Pi or OpenCode rewriting provider-issued review transitions?

The answer is **yes under a canary-only provider-side consent-policy patch based exactly on Gentle AI v2.5.0**.

This is evidence for the missing upstream capability proposed in `Gentleman-Programming/gentle-ai#4109`. It is **not** authorization to fork Gentle permanently, patch the production binary, strip provider tokens in OpenCode, synthesize consent in Pi, or close the upstream issue.

## Corrected diagnosis

Stable Gentle AI `2.5.0` retains provider-owned unattended-capable consent behavior. The gap is specific to the current negotiated v2 next-transition builder:

```text
review-integration/v2 STATUS
→ provider START contains --consent relay
→ candidate-scoped human relay semantics
→ changed medium/high candidate asks again
```

Stable source also shows that an undeclared non-interactive negotiated START is authorized silently. Therefore the behavioral hypothesis was:

```text
provider-owned unattended policy
→ provider omits explicit relay declaration in its own v2 START
→ consumer executes the provider-issued START unchanged
→ Gentle uses its existing silent negotiated authorization
→ exact candidate / lineage / RDD / acknowledgement semantics remain unchanged
```

The canary tests that hypothesis at the provider seam only.

## Canary implementation identity

Experimental repository:

```text
/srv/kairos-lab/experiments/gentle-zero-touch-v2
```

Exact upstream base:

```text
Gentle tag: v2.5.0
base SHA: f5dd1a6cf1823371374c7b2bef5b71e4790a146a
```

Canary implementation commit:

```text
e326ea77f6d2c77509fe5147841b0f622e38a75e
```

Canary policy selector:

```text
GENTLE_AI_REVIEW_V2_CONSENT_POLICY=unattended
```

Behavior:

```text
policy absent/default/unknown
→ preserve current v2 --consent relay

policy exactly unattended
→ provider reviewStartArguments() omits the relay declaration

RDD disabled
→ remains blocked; unattended policy is not an RDD bypass
```

The same provider helper is used to generate and validate the transition, so there is no separate consumer-side validator exception.

Canary binary:

```text
/srv/kairos-lab/experiments/gentle-zero-touch-v2/bin/canary/gentle-ai
version: gentle-ai 2.5.1-0.20260903154256-e326ea77f6d2
sha256: bd947d78da858d7f26b185b304a2947e9f1dc335968ee71dc2dcec39dc5f2b7b
```

Production Gentle remained untouched throughout characterization:

```text
/home/hermes/.local/bin/gentle-ai
version: gentle-ai 2.5.0
sha256: 5acedd14b7927a7665636bf728c14a614597ce85dd91313bc50cbc96881c6cab
```

## Deterministic provider tests

The implementation was developed red → green at the exact v2 START seam and hardened with explicit fail-closed cases.

Qualified properties:

```text
DEFAULT_V2_START_HAS_CONSENT_RELAY=PASS
UNATTENDED_V2_START_OMITS_CONSENT_DECLARATION=PASS
NON_EXACT_POLICY_VALUES_FAIL_CLOSED_TO_RELAY=PASS
RDD_DISABLED_STILL_BLOCKS=PASS
STATUS_GENERATION_AND_VALIDATION_USE_SAME_POLICY=PASS
```

The host `go test ./...` baseline was already non-green on exact stock v2.5.0 because of known host-dependent/non-hermetic tests. Therefore full-suite evidence is interpreted differentially, not as an invented absolute PASS.

Cross-lane comparison:

```text
CANARY_FAILURE_COUNT=4
STOCK_FAILURE_COUNT=4
FAILURE_SET_IDENTICAL=YES
CANARY_INTRODUCED_NEW_CROSSLANE_FAILURE=NO
DIFFERENTIAL_CROSSLANE=PASS
```

## Real binary characterization

Low-risk disposable candidates proved that the compiled canary binary can execute provider-issued v2 START transitions with no consent declaration, no human envelope, fresh lineages, exact acknowledgement and burned authority.

Evidence:

```text
/srv/kairos-lab/outbox/reports/gentle-zero-touch-v2-canary/binary-characterization-20260903-174258
```

Representative result:

```text
PROVIDER_ISSUED_START_1_UNMODIFIED=PASS
PROVIDER_ISSUED_START_2_UNMODIFIED=PASS
HUMAN_CONSENT_CANDIDATE_1=0
HUMAN_CONSENT_CANDIDATE_2=0
ACK_1_EXECUTED=PASS
ACK_2_EXECUTED=PASS
FRESH_LINEAGE_AFTER_BURN=PASS
PRODUCTIVE_GENTLE_UNTOUCHED=PASS
REAL_BINARY_ZERO_TOUCH_CHARACTERIZATION=PASS
```

A medium-risk candidate then proved the non-zero-lens path:

```text
risk_level=medium
selected lens=review-reliability
provider transition executed unmodified
human consent envelope=none
bound authority re-entry=PASS
productive Gentle unchanged
```

Evidence:

```text
/srv/kairos-lab/outbox/reports/gentle-zero-touch-v2-canary/medium-unattended-20260903-174947
```

## OpenCode transport finding

The first Herdr/OpenCode attempts exposed two harness mistakes unrelated to Gentle consent:

1. environment injected at Herdr workspace creation was later altered by interactive shell startup, so the OpenCode process initially resolved productive Gentle instead of the canary;
2. `pane wait-output` can match text already present in terminal output, so literal markers embedded in submitted commands can produce false positives.

The corrected preflight inspected the **actual OpenCode process environment** through `/proc/<pid>/environ` before any work prompt.

Qualified runtime:

```text
Herdr 0.8.2
OpenCode 1.18.27
Pi 0.84.4
canary Gentle sha256 bd947d78...
GENTLE_AI_REVIEW_V2_CONSENT_POLICY=unattended
```

The interactive OpenCode TUI path also demonstrated why the unattended architecture should not depend on terminal prompt injection: `herdr agent prompt` can stall without delivering a turn when detection remains idle. This is a Herdr↔TUI transport concern, not a Gentle lifecycle failure.

The supported autonomous surface selected for Atenea is therefore **headless `opencode run --format json`**, launched and supervised through Herdr. Interactive OpenCode remains appropriate for human-attended work, not for the autonomous worker transport.

## Real OpenCode headless zero-touch review — PASS

Evidence:

```text
/srv/kairos-lab/outbox/reports/gentle-zero-touch-v2-canary/opencode-headless-20260903-191853
```

Observed lifecycle:

```text
OpenCode 1.18.27
→ Gentle STATUS ×2
→ provider START ×1
→ medium RDD / review-reliability
→ capture
→ exact acknowledgement ×1
→ burned authority
→ fresh_target_ready
```

Result:

```text
OPENCODE_RUN_RC=0
GENTLE_START_EXECUTIONS=1
GENTLE_ACK_EXECUTIONS=1
ZERO_TOUCH_TRIPWIRE=PASS
AUTHORITY_PRESENT=NO
NEXT_REASON=fresh_target_ready
CANDIDATE_UNCHANGED=PASS
REAL_OPENCODE_GENTLE_ZERO_TOUCH=PASS
HUMAN_TOUCH=0
```

No `--auto` permission override was used.

## Full Pi → Herdr → OpenCode → Gentle canary — PASS

Final evidence directory:

```text
/srv/kairos-lab/outbox/reports/gentle-zero-touch-v2-canary/atenea-pi-full-20260903-192900
```

The operator launched one bounded Pi supervisor canary. Pi remained non-implementing and created exactly one Herdr workspace/process path. Herdr launched exactly one headless OpenCode worker; OpenCode owned the Gentle lifecycle.

Corrected structural audit:

```text
PI_ROLE=NON_IMPLEMENTING_SUPERVISOR
PI_TO_HERDR=PASS
HERDR_REAL_WORKSPACES_CREATED=1
HERDR_REAL_PANE_RUNS=1
HERDR_NATIVE_WAITS=1
OPENCODE_WORKERS_STARTED=1
RUNNER_OPENCODE_RUN_COUNT=1
PI_DIRECT_GENTLE_LIFECYCLE_CALLS=0
PI_DELIVERY_CALLS=0

GENTLE_STATUS_EXECUTIONS=2
GENTLE_START_EXECUTIONS=1
GENTLE_START_CONSENT_ARGUMENT=ABSENT
GENTLE_RDD=PASS
GENTLE_ACK_EXECUTIONS=1
GENTLE_ACK_EXACTLY_ONCE=PASS
GENTLE_AUTHORITY_BURNED=PASS

OPENCODE_QUESTION_TOOL_CALLS=0
CONSENT_V3_ENVELOPES=0
CONSENT_REQUIRED_REASONS=0
INTENDED_UNTRACKED_SELECTION_REQUIRED=0
PROVIDER_HUMAN_INPUT_REQUIRED=0
HUMAN_INTERVENTION_PROVIDED=0
HUMAN_TOUCH_AFTER_EXECUTION_READY=0

CANDIDATE_MUTATION=0
DELIVERY_ACTIONS=0
SUPERVISOR_STOPPED=PASS
ATENEA_ZERO_TOUCH_CANARY=PASS
ATENEA_ZERO_TOUCH_CANARY_FINAL=PASS
```

The candidate diff was byte-identical before and after the review-only canary:

```text
sha256(pre.diff)  = 4af5a29b26dbfb5014d5c6db3d4c0dc73266d8ecc538b620474c085b93d56b08
sha256(post.diff) = 4af5a29b26dbfb5014d5c6db3d4c0dc73266d8ecc538b620474c085b93d56b08
```

## Harness defects found during the final canary

These are observation-harness defects, not product/runtime failures.

### Process-substitution `tee` lifetime

The outer shell used:

```text
> >(tee pi.jsonl)
2> >(tee pi.stderr >&2)
```

Pi and the worker completed, but the process-substitution `tee` children kept the wrapper alive until its timeout. Autonomous Atenea runs SHOULD write structured stdout/stderr directly to evidence files and render/read a summary afterwards instead of depending on this wrapper pattern.

### Auditor false negative: help probes

The first offline topology parser counted CLI discovery calls ending in `--help` as real workspace/run/wait executions. Corrected structural evidence excludes help probes.

### Auditor false negative: negated prose

The first zero-touch grep matched the successful sentence `No human input was required` as if it proved a human request. Human-touch evidence must be structural: typed consent schema/reason, question tool use, START consent arguments, permission failures and error events—not ambiguous natural-language substrings.

## What is now proven

```text
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=PROVEN
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY=PASS
OPENCODE_HEADLESS_UNATTENDED_ROUTE=PASS
PI_HERDR_OPENCODE_GENTLE_TOPOLOGY=PASS
PROVIDER_ISSUED_TRANSITIONS_UNMODIFIED=PASS
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
LOCAL_CONSUMER_BYPASS=NO
PRODUCTION_GENTLE_MODIFIED=NO
```

## What remains not yet proven or adopted upstream

This document's review-only canary sections remain historical evidence for what the canary itself proved.

The canary was intentionally review-only: it did **not** exercise implementation, normal push, PR/checkpoint publication or frontier rediscovery/exhaustion on a real work item. Those properties were then exercised by the real operator-triggered Atenea end-to-end run, issue #38, which recorded:

```text
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
RDD_CANDIDATE_COUNT>=1                                  real run
NEW_CANDIDATE_AFTER_BOUNDED_CORRECTION=ZERO_TOUCH       binary/unit evidence; natural real repair not yet observed
PROVIDER_ISSUED_TRANSITIONS_UNMODIFIED=PASS
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
NORMAL_NON_FORCE_PUBLICATION=PASS                       issue #38
PR_OR_CHECKPOINT=PASS                                   issue #38
AUTO_MERGE=NO                                           issue #38
FRONTIER_STOP=PASS                                      issue #38
```

What remains genuinely open is **upstream adoption**, not the Atenea execution path:

- the released stable negotiated-v2 provider unattended selector remains `NOT_AVAILABLE`;
- the downstream real E2E PASS under the bounded canary does not change that;
- `GENTLE_AI_REVIEW_V2_CONSENT_POLICY=unattended` remains a **downstream-canary-only** spelling. It is not claimed as an upstream API and MUST be deleted when Gentle ships an equivalent supported provider-owned capability;
- upstream implementation remains governed by `Gentleman-Programming/gentle-ai#4109` and its maintainer process; do not open an upstream implementation PR before the required upstream approval state;
- Atenea #36 tracks the upstream-first restoration of negotiated-v2 zero-touch and stays open with #4109.

## Qualified next experiment: operator-ergonomics refinement (issue #39)

The real operator-triggered end-to-end run (issue #38) is complete and PASS. The next test is the bounded operator-ergonomics refinement that run exposed, still beginning from the operator's actual interface:

```text
human opens/uses Herdr
→ human starts Pi interactively
→ human gives one bounded authoritative Atenea execution prompt (pinned: repository, issue, branch/PR checkpoint, role, transport, publication, STOP boundary)
→ Pi reports the visible Herdr worker pane/tab id/label
→ Pi resolves current repository/GitHub authority with a bounded preflight
→ Pi creates/reuses headless OpenCode worker in a dedicated visible Herdr pane
→ OpenCode implements and owns all Gentle lifecycle operations
→ Gentle exact-candidate RDD
→ bounded correction if naturally required
→ exact acknowledgement/burn
→ one fresh pre-publication authority revalidation
→ normal non-force push
→ PR/checkpoint according to repository policy
→ Pi reconciles remote state
→ Pi rediscovers frontier
→ STOP before human merge / when compatible frontier is exhausted
→ Pi returns one final factual report
```

Human interaction policy for real runs:

```text
initial manual Pi launch + execution prompt
  = expected operator authorization

ordinary normal non-force push permission
  = already authorized operational permission; Pi should handle it

Gentle review consent
  = should not surface under the characterized unattended provider canary

material product ambiguity / destructive action / genuine external human authority
  = Pi relays and pauses; human may answer explicitly

final merge
  = human boundary; Atenea stops before merge unless a separate explicit merge instruction is given
```

A human answer during the run does not get silently reclassified as zero-touch. If any post-`EXECUTION_READY` human turn occurs, record its exact owning authority and classify the zero-touch acceptance property accordingly.
