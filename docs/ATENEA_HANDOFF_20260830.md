# ATENEA — Canonical handoff after Stage 8 qualification

Date: 2026-08-30

Status: **QUALIFIED BASELINE AVAILABLE; GENTLE PI REJECTED FOR CURRENT USE**

This document is the durable post-Stage-8 handoff. It exists because the final qualification conversation contained material state that had not yet been reconciled into GitHub documentation.

## 1. Objective

Atenea is the upstream-first engineering harness intended to take already-shaped work and execute it safely with minimal custom glue.

Target behavior:

```text
repo-native product/shaping authority
→ ready-for-agent GitHub work
→ Pi autonomous supervisor
→ Herdr process/session substrate
→ OpenCode + Gentle AI implementation worker
→ deterministic verification
→ native RDD exact-candidate review
→ bounded repair where required
→ commit exact reviewed tree
→ normal push
→ exact local/upstream/remote reconciliation
→ issue closure / PR publication policy
→ Pi re-discovers the next executable frontier
→ STOP when exhausted
```

Atenea must prefer upstream capabilities over custom lifecycle/controller/state machinery.

## 2. Current qualified architecture

### Authoring / shaping

Use upstream Matt Pocock skills intact and pinned where appropriate:

- setup-matt-pocock-skills
- grill-with-docs
- grilling
- domain-modeling
- to-spec
- to-tickets
- tdd
- diagnosing-bugs
- codebase-design
- code-review

Optional/reference skills remain optional: research, prototype, wayfinder.

For brownfield/evolutionary work, OpenSpec is the intended entry path. It is architecturally accepted as a candidate but has not yet been field-qualified inside Atenea.

Repo-local overlays should remain small and authority-oriented rather than forks of upstream skills.

### Supervision

Pi is the trusted thin supervisor.

Responsibilities:

- discover executable GitHub frontier;
- respect dependency/runtime/authority constraints;
- create/manage implementation worker via Herdr;
- remain non-implementing;
- relay native permission/consent prompts when required;
- verify closure/reconciliation;
- rediscover frontier after each accepted checkpoint;
- stop when no eligible work remains.

### Process / session substrate

Herdr is the qualified process/session substrate.

Atenea does not require a bespoke queue, scheduler, DAG, lifecycle controller or state machine.

### Execution

Accepted worker runtime:

```text
OpenCode + Gentle AI
```

Current environment after cleanup:

- OpenCode: `1.18.25`
- Gentle AI global: `2.5.0-rc.2`
- Pi: project/global model routing intact
- Gentle Pi: **UNINSTALLED / NOT QUALIFIED**

Gentle owns candidate integrity, RDD, reviewer lineage, exact candidate binding, bounded repair and review authority.

## 3. Qualification history

### Stages 0–4

PASS.

### Stage 5 — Matt → Gentle/OpenCode composition

PASS.

Upstream Matt authoring and Gentle/OpenCode execution compose without needing KairOS-style custom Agent Brief/schema/runtime glue.

### Stage 6 — Gentle AI native RDD + Pi/Herdr supervision

PASS.

Native review lifecycle, exact-candidate binding and independent reviewer flow qualified.

### Stage 7 — Pi self-launch

PASS.

Pi created and managed its own OpenCode/Gentle worker via Herdr, stayed non-implementing, completed the train and preserved exact checkpoints.

Canonical accepted checkpoint:

```text
79489688a6c6bd83ba8fd807cb87bdc0a59b94bf
```

### Stage 8 — autonomous frontier discovery

PASS, including zero-human-touch execution.

The operator did not provide issue numbers. Pi scanned GitHub, classified the current frontier, rejected non-executable work, selected #18, respected #19 as blocked, executed #18 via OpenCode/Gentle, re-scanned GitHub, discovered #19 had become executable, completed #19, then stopped when the compatible frontier was exhausted.

#### Issue #18

```text
HEAD  1313b060ce8d22c3eac8bab5258c770af2dd08c0
TREE  8a79548c43d0acdaf426dcd7c8acfc801c9fe1f8
RDD   review-0d11fc95166af074
STATE CLOSED
TESTS 131/131
```

#### Issue #19

```text
HEAD  ad1bc950db3c03755ed1632bbf159b6c2f695a73
TREE  18687fcb7d9bfaac157c5ca33a0715ea5c996a6b
RDD   review-3248f7d4dbb7f3d4
STATE CLOSED
TESTS 131/131
```

Final Stage 8 state:

```text
local HEAD == upstream == origin/stage8-frontier-discovery-20260830
HEAD = ad1bc950db3c03755ed1632bbf159b6c2f695a73
worktree clean
```

Adjudication:

```text
PI_DISCOVERS_READY_FRONTIER          PASS
AUTONOMOUS_FRONTIER_DISCOVERY       PASS
UNATTENDED_EXECUTION                 PASS
ZERO_HUMAN_TOUCH                     PASS
REMOTE_RECONCILIATION                PASS
FRONTIER_EXHAUSTION_STOP             PASS
```

## 4. Gentle Pi experiment — final decision

Gentle Pi `2.2.0` was evaluated as a Pi → Pi/Gentle-Pi replacement for OpenCode/Gentle.

Result:

```text
GENTLE_PI_2_2_0_FOR_ATENEA_UNATTENDED_EXECUTION = NOT_QUALIFIED / FAIL
```

Observed failure classes across clean runs included:

- child Pi model routing not inherited unless explicit;
- native RDD integration gaps around intended untracked selection;
- package-private Gentle AI `2.4.0` vs globally managed Gentle AI `2.5.0-rc.2` asset/state compatibility problems;
- review could run but durable receipt / pre-commit transition failed in the final isolated clean test;
- worker began debugging/reconstructing its own harness instead of completing the ticket.

A fully isolated HOME with Gentle Pi `2.2.0` + package-private Gentle AI `2.4.0` was bootstrapped successfully:

```text
installed_agents = ["pi"]
installed_binary_version = 2.4.0
doctor = 8 PASS / 0 warnings
```

Even there the full unattended ticket lifecycle did not complete reliably.

Decision:

- uninstall Gentle Pi;
- do not build adapters/glue around it;
- do not run another qualification until an upstream release materially addresses the lifecycle gaps;
- keep Pi → Herdr → OpenCode/Gentle as the qualified baseline.

## 5. GitHub authentication incident — root cause and fix

Symptoms:

- `gh` and git intermittently returned 401 / invalid token inside Herdr/tmux workers;
- `~/.config/gh/hosts.yml` contained a valid credential;
- stale `GH_TOKEN` / `GITHUB_TOKEN` environment variables overrode it.

Root cause was the tmux global environment.

They were removed with:

```bash
tmux set-environment -gu GH_TOKEN
tmux set-environment -gu GITHUB_TOKEN
```

Verified afterward:

```text
tmux global: CLEAN
normal shell: CLEAN
new pane: CLEAN
gh auth status: logged in as b32majus
```

The old workaround `env -u GH_TOKEN -u GITHUB_TOKEN ...` should no longer be required for new panes.

## 6. Requirements recovered from KairOS #271 / #267 / #268

The failed custom KairOS execute-Issue seam must **not** be resurrected as a launcher. Its useful product requirements should be cross-walked against the qualified upstream stack.

### Good #271 properties to preserve

- fail closed on ambiguous/missing/contradictory authority;
- deterministic or isolated topology where required;
- model/provider/effort are operational routing facts, not hard-coded architecture;
- deterministic checks before semantic review;
- exact candidate freeze and exact-candidate review;
- post-review mutation invalidates review evidence;
- pre-publication authority revalidation where repository policy requires it;
- normal non-force publication only;
- preserve exact remote state and STOP if publication partially succeeds;
- no automatic merge;
- exact local/upstream/remote reconciliation;
- no force push, reset/rebase/history rewrite as automatic recovery.

Gentle already owns the hardest exact-candidate/RDD/lineage/receipt properties. Atenea must not duplicate them.

### Engineering quality from #268

The surviving need is a concise repo-local quality policy, not a new Clean Code framework or quality lifecycle.

Preferred placement:

```text
AGENTS.md
  tiny high-frequency invariants / pointers only

CODING_STANDARDS.md
  concise repo-specific engineering standards

upstream tdd
  behavioral red/green discipline and independent oracle

upstream codebase-design
  deep modules, small interfaces, real seams, locality, deletion test

upstream code-review
  Standards axis + Spec axis

deterministic tools
  lint/typecheck/security/dependency checks where justified
```

Interpretation:

> Scalable means software can be understood, modified, tested, operated and extended without each change multiplying fragility. It does not mean prematurely distributed or abstract.

> Technical debt may exist, but should be intentional, visible, bounded and owned.

### UX / frontend / design from #267

Accepted surviving policy direction:

- use upstream Impeccable for material UX/UI/surface shaping;
- keep it conditional, not mandatory for non-UI work;
- do not invent a custom Atenea UX framework;
- use `DESIGN.md` as durable visual-system authority where durable visual rules exist;
- `DESIGN.md` is not product authority;
- if Impeccable requires `PRODUCT.md` but product truth already lives elsewhere, use a deterministic derived compatibility projection marked `DO NOT EDIT AS AUTHORITY`;
- canonical product source wins on conflict.

## 7. Current ownership split

```text
Matt Pocock upstream skills
  shaping/design/coding methods where adopted

OpenSpec
  intended brownfield/evolutionary authoring entry path
  not yet field-qualified in Atenea

Pi
  supervision + GitHub frontier discovery + orchestration decisions

Herdr
  process/session substrate

OpenCode
  implementation runtime

Gentle AI
  RDD, exact candidate integrity, reviewer lineage/authority, bounded repair

Git/GitHub
  branches/worktrees/issues/PRs/remote checkpoints

Impeccable
  conditional material UX/UI shaping and audit capabilities

Atenea repo-local policy
  only the missing horizontal contract
```

## 8. Immediate next work

Do not start another large qualification ladder.

The immediate sequence is:

1. repair/reconcile repository documentation with this qualified state;
2. cross-walk #267 and #268 against the complete current upstream ecosystems;
3. write compact `Atenea Harness Contract v1`;
4. complete concise `CODING_STANDARDS.md` with only the surviving #268 delta;
5. finalize conditional Impeccable / `DESIGN.md` / derived `PRODUCT.md` policy;
6. design a real-project rollout plan;
7. qualify OpenSpec on a real brownfield change when a suitable project is selected.

The OpenSpec test should not be Atenea's own documentation repair, because that would make the qualification self-referential and hard to interpret.

## 9. Do not regress into prior KairOS architecture

Rejected unless new field evidence proves necessity:

- custom execute-Issue launcher;
- custom Agent Brief/schema;
- custom RDD implementation/adapters;
- custom lifecycle controller/state machine;
- custom scheduler/DAG;
- custom receipts/journals/snapshot chain;
- custom reviewer wrapper duplicating Gentle;
- custom Clean Code framework;
- custom UX framework duplicating Impeccable;
- custom PRODUCT.md truth tree;
- Herdr as a policy/gating controller;
- automatic merge;
- force-push/rebase/reset recovery.

Atenea is a contract over upstream tools, not a new orchestration product.
