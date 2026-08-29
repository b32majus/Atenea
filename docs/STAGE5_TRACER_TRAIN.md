# Atenea — Stage 5 Matt-to-Gentle Tracer Train

This document is the factual closure record for the Stage 5 direct/delegated
qualification. It captures what the experiment proved, what it did not prove,
what was deliberately kept, and what should not be rebuilt in KairOS.

It does **not** qualify native Gentle RDD. Stage 6 owns that question.

## Final verdict

```text
STAGE5_DIRECT_DELEGATED_COMPOSITION=PASS
RUNTIME=OpenCode 1.18.25
GENTLE=2.5.0-rc.1
RDD=OFF
MATT=full project-local ecosystem
CUSTOM_MATT_GENTLE_ADAPTER=NONE
CUSTOM_WORK_UNIT_SCHEMA=NONE
MINIMAL_DISPATCH_PROMPT=Implement GitHub issue #N.
TRACER_TICKETS=#2 #3 #4 #5
TRACER_TICKETS_CLOSED=4/4
```

The Stage 5 result is stronger than a single-ticket smoke test: one Matt-authored
four-ticket tracer train crossed the same durable handoff boundary repeatedly,
with fresh Gentle sessions and exact remote checkpoints.

The result is **not** a claim that the whole autonomous system is finished.
Multi-ticket scheduling, native RDD, crash/restart lifecycle, final integration
and merge/release remain separate qualification work.

## Canonical checkpoint ledger

| Slice | Issue | Branch | Accepted implementation HEAD | TREE | Tests | Repair cycles | Execution/review shape |
|---|---:|---|---|---|---:|---:|---|
| T1 | #2 | `stage5-gentle-t1-20260829` | `5d070ac095503f1a4348a77a5d023801943074b5` | `0cda7154567723e44089929cc1417eec43109ccf` | 4/4 | 1 | Gentle implementation; external qualification audit exposed scope drift; one bounded repair |
| T2 | #3 | `stage5-gentle-t2-20260829` | `fcbbd224183d8af37ab561b8ecce911f33ad93cc` | `b31e22cdf837670750e15c23646f768f652e6037` | 15/15 | 0 | pre-handoff contract gate PASS; Gentle implementation; independent qualification audit PASS |
| T3 | #4 | `stage5-gentle-t3-20260829` | `ad5c19db57cdc7efe78bb0010635172c1f50bdf2` | `fa547db8c6e2bb2577b0fb11408d21b65aaee01b` | 32/32 | 0 | Gentle implementation + verification + commit/push; no Codex reviewer/repair loop; exact-SHA qualification audit + deterministic closure |
| T4 | #5 | `stage5-gentle-t4-20260829` | `c06a88620a15d9e8ff5570892d84a551ac1a8e95` | `2ee5d8d37dbdb6c83effbd20c11106006e5b1a76` | 49/49 | 0 | Gentle implementation + verification + commit/push; no Codex reviewer/repair loop; exact-SHA qualification audit + deterministic closure |

The T1 implementation checkpoint was followed by the documentation authority
commit `6af527858b3194379138ec462be5817e78647b3f`; T2 deliberately started from
that durable authority state. Later documentation commits must never replace
the implementation HEAD/TREE recorded above.

## What Stage 5 actually proved

### 1. Matt and Gentle compose through durable state, not a custom adapter

The viable boundary is:

- an unblocked `ready-for-agent` GitHub issue;
- parent/spec reference where applicable;
- durable repository authority (`CONTEXT.md`, ADRs, coding standards, etc.);
- dependency state;
- a fresh Gentle execution session.

No Agent Brief translation, KairOS work-unit JSON, OpenSpec conversion, copied
planning summary or hand-written executor prompt was required.

The normal execution prompt remained:

```text
Implement GitHub issue #N.
```

### 2. Fresh-session reconstruction works

Gentle reconstructed the work from tracker/repository authority rather than
requiring Matt's authoring conversation. It read the relevant issue, parent,
CONTEXT, ADR and coding-standard authority and selected direct/delegated
execution rather than recreating the already-finished planning through SDD.

Engram remained available, so Stage 5 proves **fresh conversational/session
context**, not strict persistent-memory isolation. The stronger evidence is
that after T1's ticket authority changed, a new session followed the new durable
contract and removed stale scope correctly.

### 3. The real handoff defect was temporal contract ambiguity, not ecosystem incompatibility

T1 initially exposed T3 environment behavior early. The implementation was
functional and tested, but issue #2's wording allowed a reasonable executor to
interpret future candidates as current observable behavior.

The repair was not a new harness. The repair was to make temporal ownership
explicit:

- T1: default-only observable behavior;
- T2: convention config acquisition;
- T3: environment acquisition, validation and precedence;
- T4: argv, explicit config and help.

That produced the key progression:

```text
T1 repairs=1
T2 repairs=0
T3 repairs=0
T4 repairs=0
```

This is the strongest Stage 5 evidence for the Handoff Contract Gate: once the
contract boundary was clean, later slices stayed inside scope without a repair
cycle.

### 4. Temporal slice exclusivity belongs before dispatch

The useful semantic guardrail is not another planning system. It is a bounded
clean-context check that every observable behavior has one first-introducing
slice and that adjacent tickets do not accidentally require each other's future
behavior.

The gate should remain thin. It should repair a material ambiguity before
execution, not add boilerplate to already-clear tickets.

### 5. Gentle can execute and checkpoint clean slices without a Codex reviewer loop

T3 and T4 were intentionally allowed to progress through Gentle's own
implementation, deterministic verification, remote reconciliation, commit and
push. No Codex semantic reviewer/repair session was inserted into those work
units.

Exact-SHA code audits were still performed as **laboratory qualification
observation** before closure. They are not evidence that a second external LLM
reviewer should become production architecture. Stage 6 will test whether
Gentle-native RDD can own the review/repair lifecycle when review is active.

### 6. Deterministic evidence should dominate narrative status

The train repeatedly relied on cheap deterministic facts:

- `git fetch`;
- exact local/remote SHA;
- exact tree;
- `git diff --check`;
- behavioral test suites;
- tracked-clean state;
- issue state and dependency state.

T4 exposed a useful reporting rough edge: Gentle's checkpoint summary reported
`TRACKED_DIRTY=2` even though commit/push had completed. The separate closure
check showed the tracked tree was actually clean. Future supervision should
trust deterministic repository state over a narrative field when they disagree.

### 7. Closure is a remote checkpoint, not a merge

A dependency issue can close once its accepted implementation has:

- current acceptance PASS;
- bounded scope;
- deterministic behavioral evidence;
- exact implementation HEAD/TREE;
- no unexpected same-branch remote drift;
- an exact remote checkpoint.

`origin/main` drift is recorded separately and may be deferred to train
integration. T3/T4 confirmed that integration-target drift does not require a
per-ticket rebase or merge.

### 8. Same-branch drift is fail-closed

Unexpected working-branch remote drift is a STOP/NEEDS_DECISION condition.
Stage 5 never used force-push as reconciliation.

### 9. Full Matt remains installed; skill overlap is handled by ownership, not mutilation

The first T1 attempt showed that Gentle's registry can select Matt's project
`implement` skill and that Matt's `disable-model-invocation: true` frontmatter
is not a Gentle registry isolation boundary.

This was classified as expected Gentle skill-registry behavior, not an OpenCode
bug. No Matt skill was removed, renamed, filtered or patched. `implement`,
`tdd`, `code-review` and the rest of the full ecosystem remain installed.

### 10. The Matt testing canary survived the boundary

The durable project rule `Tautological tests considered harmful.` was consumed
on the execution side without being repeated in the minimal dispatch prompt.
Behavioral CLI/resolver tests remained the evidence seam; source-text assertions
were not used as proof of the feature.

## What we keep

The post-Stage-5 baseline keeps:

- full upstream Matt Pocock skills;
- full upstream Gentle AI;
- OpenCode as the first qualified runtime;
- Matt project-local skills;
- Gentle global OpenCode installation while upstream workspace issue #3128
  remains unresolved;
- fresh-session dispatch;
- `ready-for-agent` GitHub issues as the work contract;
- durable CONTEXT/ADR/coding-standard authority;
- a small semantic Handoff Contract Gate;
- deterministic verification before acceptance;
- fresh remote reconciliation;
- exact HEAD/TREE checkpoints;
- deterministic Closure Gate;
- merge/release as a separate delivery concern;
- Gentle-native RDD as the Stage 6 review candidate;
- KairOS only as a future thin scheduler/supervisor/delivery layer if later
  stages continue to pass.

## What we do not keep as target runtime architecture

The following were useful as qualification scaffolding or were explicitly
rejected, but should not become the normal execution path:

- a permanent Codex reviewer after every Gentle work unit;
- a second custom builder/reviewer/repair harness around Gentle;
- an Agent Brief translation for Matt-generated `to-tickets` work;
- a custom Matt-to-Gentle work-unit schema;
- removal/renaming/filtering of overlapping Matt skills;
- re-running Gentle SDD for an already-ready Matt ticket;
- a project-local handoff `.agents/skills` wrapper that Gentle may itself
  discover and inject;
- per-ticket merge/rebase to `main` merely to close a dependency;
- force-push to resolve unexpected same-branch drift;
- silent Gentle upgrades inside a qualification epoch;
- rebuilding RDD inside KairOS.

## Deferred, not rejected

These remain legitimate later experiments, but did not belong in the vanilla
Stage 5 baseline:

- Gentle AI rc.2 + native RDD — Stage 6;
- automated ticket selection / fresh-session dispatch / multi-ticket
  progression — thin dispatcher qualification after the execution baseline;
- final train integration and merge/release policy;
- Pi runtime;
- OpenSpec for brownfield/evolutionary authoring;
- CodeGraph as a measured optimization;
- Convoy only if Gentle later fails a required execution property.

## Operational incident: GitHub auth override contamination

During T2, `gh`/git operations failed with HTTP 401 even after a valid human
GitHub login. The cause was environmental, not Matt/Gentle behavior:

- stale `GH_TOKEN` and `GITHUB_TOKEN` variables were inherited from the
  `herdr server` parent process;
- the same names were present in tmux's global environment;
- `gh` correctly prioritised those environment variables over the valid
  stored credential;
- removing the overrides in the execution shell restored normal official
  `gh`/git credential behavior.

This incident must not be counted as a Stage 5 workflow failure. Permanent
cleanup of the token source is separate environment housekeeping. Do not add a
custom GitHub-auth shim to Atenea because of it.

## Target architecture after Stage 5

The smallest architecture supported by the evidence is now:

```text
MATT — interactive authoring
  grill-with-docs
  → CONTEXT / ADR
  → to-spec
  → clean spec audit
  → to-tickets
  → clean handoff audit / temporal ownership
  → ready-for-agent ticket
           │
           │ durable trust boundary
           ▼
GENTLE — fresh unattended execution
  minimal prompt: Implement GitHub issue #N.
  → direct/delegated implementation
  → deterministic verification
  → fetch / remote reconciliation
  → exact candidate checkpoint
  → [Stage 6: native RDD when enabled]
           │
           ▼
THIN SUPERVISION
  deterministic closure
  → next dependency frontier
  → later train integration/delivery
```

The thin supervision box is intentionally boring. It should not contain a
second planning system, implementation agent, reviewer algorithm or repair
loop that upstream already owns.

## What Stage 5 does NOT prove

Do not overstate this result. Stage 5 does not yet qualify:

- Gentle-native RDD approval/repair/acknowledgement semantics;
- crash/restart recovery of an active review lifecycle;
- autonomous selection and progression across multiple ready tickets without a
  human starting each fresh session;
- final reconciliation/merge of the completed tracer train onto current
  `origin/main`;
- release/PR policy;
- Pi;
- brownfield authoring;
- CodeGraph cost/performance benefit;
- a definitive policy for Matt `code-review` when Gentle RDD is active;
- strict memory isolation with Engram disabled.

## Stage 6 entry condition

Freeze Stage 5 evidence on Gentle `v2.5.0-rc.1` / RDD OFF. Do not retroactively
mix rc.2 behavior into these results.

Stage 6 begins with an explicit runtime epoch:

1. upgrade to Gentle `v2.5.0-rc.2` deliberately;
2. record exact binary/version and configuration diff;
3. run `doctor`;
4. verify managed OpenCode assets;
5. verify skill registry/discovery and Matt skill resolution;
6. enable RDD only after the upgraded baseline is known healthy;
7. exercise the native rc.2 review/acknowledgement/refusal/recovery targets
   already listed in `docs/QUALIFICATION.md`.

## Bottom line

Stage 5 supports the central Atenea hypothesis: **Matt can author a durable
engineering contract and Gentle can execute it from a fresh session through
supported upstream surfaces without a custom Matt-to-Gentle adapter.**

The remaining work is no longer "can we build a harness that makes them talk?".
The next questions are narrower: can Gentle's native RDD close the review/repair
loop, and can a deliberately thin supervisor start the next ready unit without
recreating the engineering system around it?
