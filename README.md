# Atenea

Atenea is an isolated workflow laboratory for testing whether the **full Matt Pocock engineering-skills ecosystem** can compose cleanly with the **full Gentle AI ecosystem** inside **OpenCode**, without rebuilding either system inside KairOS.

## Current status

**Stage 5 direct/delegated composition: PASS.**

A four-ticket tracer train authored through Matt and executed through fresh Gentle sessions completed with exact remote checkpoints and closed dependency tickets:

| Slice | Issue | Accepted HEAD | Tests | Repairs |
|---|---:|---|---:|---:|
| T1 | #2 | `5d070ac095503f1a4348a77a5d023801943074b5` | 4/4 | 1 |
| T2 | #3 | `fcbbd224183d8af37ab561b8ecce911f33ad93cc` | 15/15 | 0 |
| T3 | #4 | `ad5c19db57cdc7efe78bb0010635172c1f50bdf2` | 32/32 | 0 |
| T4 | #5 | `c06a88620a15d9e8ff5570892d84a551ac1a8e95` | 49/49 | 0 |

Runtime for this evidence: **OpenCode 1.18.25 + Gentle AI v2.5.0-rc.1 + RDD OFF**.

The detailed closure record is `docs/STAGE5_TRACER_TRAIN.md`.

## Qualified architecture

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
  Implement GitHub issue #N.
  → direct/delegated implementation
  → deterministic verification
  → remote reconciliation
  → exact remote checkpoint
  → [Stage 6: native RDD when enabled]
           │
           ▼
THIN SUPERVISION
  deterministic closure
  → next dependency frontier
  → later integration/delivery
```

The key result is that the Matt→Gentle seam did **not** require an Agent Brief translation, custom work-unit schema, copied planning context, selected-skill fork, or a custom integration adapter.

## Working principles

1. **Upstream first.** Keep Matt and Gentle complete and qualify their supported surfaces before adapting anything.
2. **No cherry-picking internals.** Do not extract RDD, TDD, review, triage or lifecycle fragments into custom Atenea/KairOS implementations.
3. **Durable handoff.** A Matt-generated `ready-for-agent` issue plus repository authority and dependency state is the contract. Generated `to-tickets` issues do not require triage or an Agent Brief.
4. **Fresh execution session.** Gentle must succeed from durable tracker/repository state, not from the Matt authoring chat.
5. **Semantic ambiguity is repaired before dispatch.** The Handoff Contract Gate checks coverage, dependencies, deterministic acceptance and temporal slice exclusivity; it is not a second authoring framework.
6. **Deterministic evidence first.** Tests, git state, exact SHA/TREE, remote refs and issue state are preferred over narrative claims.
7. **Closure is not merge.** A work unit may close at an accepted remote checkpoint; integration with current `main` is a later train-delivery concern.
8. **No permanent external reviewer loop.** Codex/external audits used during qualification are scaffolding, not the target runtime. Native Gentle RDD is the Stage 6 review candidate.
9. **KairOS stays thin.** If later stages pass, KairOS should schedule, supervise and deliver; it should not recreate planning, implementation, review or repair internals.

## What Stage 5 proved

- full Matt project skills and full Gentle can coexist in the OpenCode baseline;
- Gentle can consume a Matt-authored durable contract from a fresh session with the minimal prompt `Implement GitHub issue #N.`;
- project knowledge such as the anti-tautological-test rule survives the boundary;
- the T1 scope defect was a ticket temporal-boundary problem, not a structural Matt/Gentle incompatibility;
- after the handoff contract was clarified, T2/T3/T4 completed with zero repair cycles;
- Gentle successfully handled implementation, deterministic verification and remote checkpoint creation on T3/T4 without a Codex reviewer/repair loop;
- same-branch remote drift is fail-closed, while `origin/main` drift is recorded separately and may be deferred to train integration;
- a custom Matt→Gentle adapter is unnecessary for the qualified direct/delegated path.

## Important limitations

Stage 5 does **not** yet qualify:

- native Gentle RDD review/repair/acknowledgement/recovery;
- autonomous multi-ticket selection and progression without a human starting each fresh session;
- final train integration/merge/release;
- Pi;
- OpenSpec brownfield authoring;
- CodeGraph optimization;
- strict memory isolation with Engram disabled.

## Next stage

Stage 6 is a deliberate runtime epoch: upgrade from Gentle `v2.5.0-rc.1` to `v2.5.0-rc.2`, verify installation/registry health, then enable and qualify **native RDD**. Do not mix rc.2 results retroactively into Stage 5 evidence.

## Canonical documentation

- `docs/STAGE5_TRACER_TRAIN.md` — full Stage 5 result, findings, kept/rejected choices and remaining gaps.
- `docs/STAGE5_DECISIONS.md` — Stage 5 continuation of the durable decision log (D-031 onward).
- `docs/HANDOFF_CONTRACT.md` — normative Matt→Gentle boundary.
- `docs/DECISIONS.md` — foundational durable architectural decisions through D-030.
- `docs/REJECTED.md` — rejected/deferred approaches and why.
- `docs/QUALIFICATION.md` — qualification protocol and Stage 6 targets.
- `docs/STAGE5_T1.md` — detailed T1 incident/repair evidence.
