# C-086 regression audit and restoration record — 2026-10-06

Status: **RESTORATION EVIDENCE / DESIGN RATIONALE**

## Executive finding

Atenea's slowdown was not traced to Go as a cost profile, Matt skills, or OpenCode V2 itself. The strongest supported explanation is **hot-path policy accretion plus downstream duplication** after the known-good C-084 control.

The control used for this audit is:

`Atenea@50122a13f1d1e191e659a21ad6445267e4e354e6`

That control was already running native OpenCode V2 2.0.22 + Matt, Cora-shaped bounded work, one canonical review, fresh correctors, two-attempt correction, operator-controlled launch and real project work successfully.

The pre-restoration candidate is:

`Atenea@9c6be73527c1b4ff8a661d29582bb6317b8e45f7`

## What changed after the known-good control

Post-control changes included:

- attended/expansive product shaping and composed-product fidelity;
- Go cost-policy qualification;
- representation-narrowing guard;
- affected-surface / invariant-propagation guard;
- adversarial property witnesses;
- Human Product Design Authority;
- C-085 writer split/context economy.

These changes did not have equal cost.

### Hot-path growth observed

From `50122a1` to `9c6be73`:

| Surface | Known-good | Pre-restoration | Delta |
| --- | ---: | ---: | ---: |
| `AGENTS.md` | 11,462 chars | 14,263 chars | +2,801 |
| `START_HERE.md` | 7,047 | 8,879 | +1,832 |
| execution preflight | 6,248 | 9,159 | +2,911 |
| standard coordinators | ~3.1k each | ~4.2k each | ~+1.1k |
| standard implementers | ~1.5k each | ~2.5k each | ~+1.0k |
| Spec reviewers | ~1.1k each | ~2.65k each | ~+1.55k |
| correctors | ~0.6–0.8k each | ~1.55–1.76k each | ~+0.98k |
| `check-vnext-authority.mjs` | 11,718 chars | 25,174 chars | +13,456 |

Large specialized documents are not a defect by themselves. The regression occurred because their rules were copied into always-on prompts and downstream project authority.

## Highest-confidence regressors

### 1. Affected-surface / invariant propagation in the writer/corrector path

The field lesson was valid: a shared seam can affect a zero-diff consumer, and a defect class may exist on a sibling path.

The regression was propagation of that lesson into coordinators, implementers, correctors and reviewers as a standing search obligation. That changes focused implementation into repeated caller/sibling archaeology.

Restoration: shaping/preflight names known material consumers when required; review may challenge that scope; a writer that incidentally discovers a new material consumer STOPs. Writers/correctors do not perform open-ended sibling searches by default.

### 2. Adversarial witnesses promoted from finding-specific evidence to preventive ceremony

The field lesson was valid: a nominal fixture cannot prove a difficult universal/boundary property.

The regression was making the lens ubiquitous in Spec reviewers/correctors and then anticipating it inside handoffs. This encouraged collision/boundary/negative fixtures before a concrete review gap existed.

Restoration: reviewers raise a concrete evidence finding when a material claim is not falsifiable by existing evidence. The corrector then adds only the witness required by that finding.

### 3. Downstream authority duplication

A known-good Laboratorio worktree carried approximately:

- local `AGENTS.md`: 7.2k chars;
- volume implementer prompt: 1.49k;
- execution handoff: 6.8k.

A current Laboratorio recovery worktree carried approximately:

- local `AGENTS.md`: 10.8k;
- volume implementer prompt: 2.51k;
- #78 handoff: 14.5k;
- actual child dispatch observed: 25.6k.

The same global protections were being explained in multiple layers. C-086 requires durable references rather than restatement.

### 4. Evidence layers collapsed into the writer

Known-good trains could reserve transversal/full evidence for a later work unit or integration boundary. Current material tickets sometimes require, inside one writer unit, focused tests + adversarial witnesses + multiple surface regressions + E2E + privacy checks + typecheck + lint + format + build + full repository suite + audit/diff checks.

Each check can be individually rational while the aggregate is operationally wasteful.

Restoration: focused writer evidence; integration/review/correction/publication each own their appropriate evidence.

## Changes not identified as root regressors

- Matt skill content did not change between the known-good Sunday field state and the slowdown window.
- OpenCode 2.0.22 was already used by known-good runs.
- Go creation itself did not modify Standard/Free bindings; it was a catalyst for field learning, not the direct architectural cause.
- single canonical review ownership was already present in the known-good control and had removed measurable duplicate review work.
- bounded fresh-corrector ownership remains a net protection against fix/review carousels.
- prepublication artifact validation changed little relative to the control and belongs at the final boundary.

## C-085 interpretation

C-085 is retained as a mitigation/runtime-economy amendment, not treated as the root fix. Early field evidence under C-085 showed lower context amplification/tool churn than the worst pre-C-085 Complex sessions, but current work units still remained too slow because the protocol itself was heavy.

C-086 therefore holds C-085 runtime/model variables constant and changes only protocol placement/duplication.

## Restoration classification

| Later learning | C-086 action |
| --- | --- |
| attended material product shaping | KEEP upstream |
| Human Product Design Authority | KEEP upstream; not default execution input |
| composed-product fidelity | KEEP conditional / Cora boundary |
| representation narrowing | KEEP conditional shaping/Spec/Cora |
| affected-surface propagation | MOVE OUT of writer/corrector default path |
| adversarial witnesses | MOVE to concrete review/finding closure |
| Go / Free profiles | KEEP as cost policies |
| single canonical review | KEEP |
| fresh bounded correction | KEEP |
| C-085 writer/context economy | KEEP while protocol effect is isolated |
| broad/full suites per writer | REMOVE as default; move to justified integration/publication boundary |
| prose-pinning in authority checker | SIMPLIFY to structural/binding/current-decision checks |

## Validation plan — deliberately deferred

Do not validate this restoration by launching a large benchmark train immediately.

At a later clean boundary, use only:

- one small real Standard Volume ticket;
- one small real Standard Complex ticket.

The tickets should be naturally bounded and small. The point is to see whether the native thin path again completes coherently without hour-scale ritual, not to manufacture a stress test.

Record at least: elapsed time, model turns, tool calls, max context, compactions, child dispatch size, broad-suite repetitions, review findings and correction count. Do not alter models/runtime mid-cohort.

## Non-goals

C-086 does not:

- fork Matt;
- add a controller/monitor/context daemon;
- add token or tool-call quotas;
- introduce manual compaction thresholds;
- add another review axis;
- weaken accepted product/safety semantics;
- delete the specialized product/fidelity documents;
- claim the Complex writer model question is permanently settled.

The restoration goal is architectural: **retain the lessons, remove their unconditional duplication from the execution hot path**.

## Implementation validation

Restoration worktree:

- branch: `work/atenea-c086-thin-restoration-20261006`;
- base: `9c6be73527c1b4ff8a661d29582bb6317b8e45f7`;
- runtime held fixed: OpenCode `2.0.22`;
- no real project WU was launched as part of this restoration.

Deterministic validation after the restoration edits:

```text
node tools/check-vnext-authority.mjs         PASS
opencode --version                           v2.0.22
opencode debug config                        PASS (default_agent=atenea-volume; subagent_depth=2)
opencode debug agents                        PASS (34 agents; required Atenea profiles present)
node tools/check-free-models.mjs             PASS
node tools/check-go-models.mjs               PASS
git diff --check                             PASS
legacy always-on affected-surface text       ABSENT from agent hot path
legacy adversarial-witness prompt text        ABSENT from agent hot path
stale C-085 current-authority markers         ABSENT from current front-door surfaces
```

Model-presence checks resolved the expected current bindings:

```text
Free: opencode/mimo-v2.6-flash-free
      opencode/space-bunny-free
      nan/qwen3.6

Go:   opencode-go/mimo-v2.6-flash
      opencode-go/muse-spark-1.3-contributor
      opencode-go/deepseek-v4.1-flash
      nan/qwen3.6
      openai/gpt-6-luna
```

Key hot-path size comparison (characters):

| Surface | known-good `50122a1` | pre-C086 `9c6be73` | C-086 candidate |
| --- | ---: | ---: | ---: |
| `AGENTS.md` | 11,462 | 14,263 | 8,070 |
| `docs/START_HERE.md` | 7,047 | 8,879 | 5,260 |
| execution preflight | 6,248 | 9,159 | 5,667 |
| authority checker | 11,698 | 25,142 | 10,258 |

The goal is not smallest-file golf. These reductions are evidence that duplicated always-on policy was actually removed while the specialized authority documents remain available.

### Field validation intentionally NOT RUN

Per human decision, C-086 field behavior will be evaluated later with only two small real tickets: one Standard Volume and one Standard Complex. This restoration does not claim latency/token recovery from documentation checks alone.

## PR #134 audit correction

The first audit of the published PR found six current-facing documents that had not been reconciled in the initial restoration commit. This was a real documentation defect, not a runtime failure:

- `NEWCOMER_QUICKSTART_V1.md` still described V4 as the normal writer for both Standard Volume and Complex and still said correction was "at most once";
- `EXECUTION_EFFICIENCY_LEDGER_V1.md` still treated GLM first-writing in Standard Complex as a routing deviation and optimized around V4 absorbing most writing;
- `QUALIFICATION.md` still declared itself CURRENT C-084 and its current architecture block did not express C-086/C-085 routing/evidence layering;
- `WORK_UNIT_COMPOSITION_POLICY_V1.md`, Free profile and Go profile still carried old current-status labels.

PR audit correction therefore:

1. currentized those authority surfaces to C-086;
2. reconciled the quickstart with Volume→V4 / Complex→GLM, two fresh corrections and phase-scoped evidence;
3. updated the efficiency ledger to observe C-086 (including child-dispatch size, context/turn/tool churn and repeated broad-suite runs) without adding LLM calls;
4. clarified that material post-reshaping decomposition uses normal upstream Matt `/to-tickets`, not an `atenea-*` execution profile, with no hard token-size ceremony;
5. annotated historical qualification findings so their semantic lessons remain provenance while C-086 owns current role placement;
6. extended the structural authority checker so these current-facing surfaces cannot silently remain on an older current-decision marker again.

This correction is intentionally separate from the original restoration commit so the PR history records what the PR audit actually found and closed.
