# Atenea — Stage 5 T1 Evidence

This document records the factual Stage 5 T1 Matt-to-Gentle qualification. It
does not qualify native Gentle RDD/runtime behavior, which remains Stage 6.

## Authority and baseline

- Repository: `/srv/kairos-lab/Atenea`
- Branch: `stage5-gentle-t1-20260829`
- Stage 4 baseline: `c6526887a3464527339f66cb8d8a0247a418f3fa`
- Qualified implementation HEAD:
  `5d070ac095503f1a4348a77a5d023801943074b5`
- Qualified implementation TREE:
  `0cda7154567723e44089929cc1417eec43109ccf`

## First attempt and diagnostic

The first fresh Gentle attempt was interrupted before mutation after the Gentle
skill registry selected Matt's project-local `implement` skill. The diagnostic
confirmed:

```text
IMPLEMENT_SKILL_IDENTITY=MATT_POCOCK
IMPLEMENT_DISABLE_MODEL_INVOCATION=true
ORCHESTRATOR_BEHAVIOR=EXPECTED_GENTLE_SKILL_INJECTION
DISABLE_MODEL_INVOCATION_RESPECTED=NO
CONFIG_MUTATED=NO
```

The registry indexes skill name, description, scope and path; it does not use
`disable-model-invocation: true` as an isolation boundary. Matt
`implement`, `tdd` and `code-review` remain installed and unchanged. No
workaround was implemented during vanilla qualification.

## Fresh execution

A fresh Gentle execution read GitHub issue #2, parent issue #1, `CONTEXT.md`,
`docs/adr/0001-effective-mode-cli.md` and `CODING_STANDARDS.md`. It
confirmed RDD OFF, selected direct/delegated routing, used one fresh
`general` writer, and did not recreate SDD.

## Initial result and root cause

The initial implementation had functional quality PASS, 15/15 tests PASS and
respected the `Tautological tests considered harmful.` canary. An independent
audit nevertheless found T3 environment behavior prematurely observable.

The root cause was a material temporal-scope ambiguity in issue #2: resolver,
environment and configuration language could reasonably be interpreted as
requiring later candidate behavior while T3 owned environment semantics.

## Contract repair and bounded repair

Issue #2 received one focused contract repair:

- T1 exposes only built-in-default behavior;
- configuration acquisition belongs to T2;
- environment acquisition, precedence and validation belong to T3;
- argv/help belongs to T4;
- the resolver interface remains future-compatible.

A new fresh Gentle session then received only:

```text
GitHub issue #2 has been updated.
Re-read the current issue #2 and make one bounded repair pass on the existing
working tree so the implementation satisfies the current issue exactly.
Verify the result and leave it uncommitted.
```

Gentle independently identified and removed the scope drift.

## Final evidence

The focused independent recheck reported:

```text
T1_SCOPE_RECHECK=PASS
T1_ACCEPTANCE=PASS
TESTS=4/4 PASS
DEFAULT_ONLY_CLI=PASS
ENV_BEHAVIOR_DEFERRED=PASS
CONFIG_BEHAVIOR_DEFERRED=PASS
ARGV_BEHAVIOR_DEFERRED=PASS
RESOLVER_SEAM=PASS
TAUTOLOGICAL_TESTS=NO
ZERO_RUNTIME_DEPS=PASS
NODE24_TARGET=PASS
DIFF_CONTAINMENT=PASS
OUT_OF_SCOPE_CHANGES=NO
REPAIR_CYCLES=1
```

The qualified remote implementation checkpoint is:

```text
BRANCH=stage5-gentle-t1-20260829
HEAD=5d070ac095503f1a4348a77a5d023801943074b5
TREE=0cda7154567723e44089929cc1417eec43109ccf
TESTS=4/4 PASS
REMOTE_SYNC=YES
```

The implementation commit is unchanged in history. The checkpoint qualifies
the T1 handoff and implementation boundary, including the lesson that changed
durable authority must be followed by a genuinely fresh session.

A later documentation-authority commit on the same branch is
`6af527858b3194379138ec462be5817e78647b3f`; it does not replace the accepted
implementation HEAD/TREE above.

## Isolation note

Engram remained available and was used during execution. This was therefore
fresh conversational/session context, not strict persistent-memory isolation.
Importantly, after issue #2 changed, the fresh Gentle session followed the new
durable authority and repaired the previous implementation correctly.

## Later release observation and qualification epoch

This is a later release observation, not a retroactive change to the T1
qualification above.

Gentle AI v2.5.0-rc.2 was released on 2026-08-29 after Stage 5 T1
qualification. Its tag target commit is
`c668c11e5feb8c8b8555f22f1a6103f6ac5cf79d`.

Stage 5 remained v2.5.0-rc.1 with RDD OFF through T4. The deliberate next epoch is:

- Stage 5: v2.5.0-rc.1 / RDD OFF — complete;
- Stage 6: upgrade qualification to v2.5.0-rc.2 / RDD ON.

rc.2 contains a materially changed review lifecycle, including one active
review record and explicit `review.acknowledge-approved` semantics. Before
Stage 6 RDD qualification, record the exact installed binary/version, run
`doctor`, verify managed OpenCode assets and skill registry/discovery, verify
Matt project skills still resolve, record the upgrade's config diff, and only
then enable RDD.

Stage 6 OpenCode targets are negotiated review to approval; exact-token
`review.acknowledge-approved`; STATUS restart replay of the same pending
transition before acknowledgement; refusal without side effects for wrong,
stale or replayed acknowledgements; zero-lens approval; correction with an
untracked artifact; opaque `repository_context` digest and
wrong-repository refusal; and bounded/fail-closed refusal. Pi-specific relay
testing remains outside the OpenCode baseline.

## Later train closure

After this T1-specific document was first written, issue #2 passed its exact
Closure Gate and was closed. T2, T3 and T4 subsequently completed and closed as
well. The canonical full Stage 5 record is now `docs/STAGE5_TRACER_TRAIN.md`.

## Remaining unqualified work

- native Gentle RDD/runtime behavior remains Stage 6;
- automated fresh-session ticket progression remains deferred;
- final train integration/merge/release remains separate from dependency-ticket closure.
