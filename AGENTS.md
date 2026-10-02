# Atenea — Repository Policy

Status: **CURRENT AUTHORITY**

Atenea is a thin upstream-first policy, configuration and conformance layer over native engineering tools. This file defines stable repository policy; it is not a product specification, task tracker or duplicate Gentle manual.

## 1. Current ownership

```text
WHAT / WHY / acceptance / domain authority
→ human + durable repository authority

stable engineering quality
→ target repository AGENTS.md + CODING_STANDARDS.md

shaping, only while genuinely active
→ adopted shaping workflow

prepared implementation
→ Pi supervisor + Herdr
→ ONE plain Pi child (`pi --no-extensions`)
→ production-volume by default; complex only on material trigger

candidate risk / review timing / lens selection
→ native Gentle

review execution when due
→ qualified OpenCode V1 transport with per-process routing config
→ single assurance profile, independent of implementation profile
→ conditional refuter / bounded correction / validator / burn

machine-decidable facts
→ tests / validators / oracles / CI

publish / merge
→ target repository policy + explicit human authority
```

OpenCode V1 is not the ordinary prepared-ticket writer. It remains review transport and qualified implementation fallback.

## 2. Authority precedence

1. current accepted product/domain authority;
2. current authorized task/change artifacts;
3. target repository policy;
4. current Atenea execution authority;
5. upstream tool defaults;
6. historical docs, stale config and remembered session state.

Material conflict between current authorities => **STOP and reconcile**.

## 3. Read before changing Atenea

Read:

1. `README.md`;
2. `docs/START_HERE.md`;
3. `docs/CURRENT_EXECUTION_DECISION_C082.md`;
4. `docs/CURRENT_EXECUTION_DECISION_C081.md` and C-080 for preserved review/assurance provenance;
5. `CODING_STANDARDS.md`;
6. relevant earlier decision provenance only when needed;
7. the accepted issue/work-order/spec being executed.

Current operation: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
Current handoff: `docs/PREPARED_TRAIN_HANDOFF_C082.md`.
Prepared routing: `config/native-gentle/prepared-routing-policy.json`.
Assurance routing: `config/native-gentle/opencode-assurance.profile.json`.
Runtime exceptions: `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 4. Prepared-ticket entry

If executable authority already exists, do **not** rerun ODD, `gentle-orchestrator`, broad archaeology or shaping by ritual.

The Pi worker reads target-repository authority and applicable skills, implements the smallest coherent authorized change, preserves the principal acceptance oracle, runs deterministic checks and creates the authorized local candidate commit.

## 5. Prepared profiles

Default: `production-volume → Pi + nan/deepseek-v4-flash`.

Triggered: `complex → Pi + nan/glm5.3-flash · high`.

Use `complex` only for material reasoning/semantic risk. Do not escalate from file count, ticket length, ordinary UI, many tests or business importance alone. Do not switch the implementation profile inside an active candidate/review lineage.

## 6. Native review

After candidate commit, run Gentle ASSESS against the actual base and obey its result. Atenea does not select lenses.

- `review_due=false` → no review host; checkpoint.
- medium review when due → the one focus lens Gentle selected.
- high → Gentle's canonical 4R set.
- refuter/validator run only when Gentle requires them.

When provider-issued collection requires OpenCode, start a fresh bounded V1 review host with **per-process** routing configuration rendered from the single assurance profile (`tools/render-opencode-routing-overlay.mjs`, no profile argument). Never mutate `~/.config/opencode/opencode.json` as train routing state.

A completed required reviewer Task with zero capturable result is a **technical reviewer failure**: normalize it with the deterministic zero-output classifier into a typed failure whose next action is HUMAN STOP. There is no recovery route, no permit, no same-route retry, no alternate model, no model carousel, no RESET, no new START/ASSESS, no skipped lens, no profile switch and no global config mutation. Candidate/lineage/revision/target stay preserved.

Judgment Day is explicit-only. Plain Pi is not a Gentle-Pi review host; never manually assert `GENTLE_PI_REVIEW_RELAY_CONTRACT`.

## 7. Skills and trust

Pi supports trusted project skills from `.pi/skills/` and `.agents/skills/`.

- keep intentional runtime-specific resources where they belong;
- prefer `.agents/skills/<name>/SKILL.md` for cross-runtime project authority;
- do not duplicate skills solely to normalize layout;
- discovered skills require non-empty `name` and `description` frontmatter;
- use `--approve` only as a one-run trust override for an intentionally trusted repository that needs protected project resources.

Project skills own domain/engineering/UI/QA guidance. Atenea owns execution routing.

## 8. Supervisor boundary

The supervisor is control plane only: authorized frontier, **one minimal preflight per ticket/work-unit authority boundary**, profile selection at that boundary, launch/observation of the responsible worker, mechanical evidence handoff, already-authorized procedural relay, Gentle lifecycle transport, durable checkpoints and next-or-STOP. Phase changes inside the same ticket — worker launch, ASSESS, review collection, reviewer return or provider-issued correction — do **not** reopen preflight.

Workers own engineering and required deterministic verification. Their candidate-bound PASS evidence crosses the handoff. After worker FINAL the supervisor must not inspect code/diff semantically, rerun tests/typecheck/build/E2E, add independent QA/challenge, broaden checks, or edit code. It may establish only mechanical candidate/base/worktree/evidence facts needed for the next transition.

Material product/scope/acceptance/oracle/publication changes are HUMAN STOP. Missing or failed required evidence is not permission for supervisor re-verification.

## 9. Implementation fallback

If plain Pi has a concrete runtime/tooling failure, preserve the worktree, checkpoint, scope and acceptance and use qualified OpenCode Build V1 under the same prepared-ticket contract. Do not re-enter ODD, re-shape accepted work or silently change publication authority.

## 10. Efficiency evidence

Usage telemetry is observational and non-blocking. It must not add model calls, choose reviewer depth, change product acceptance or trigger profile changes inside a lineage. See `docs/EXECUTION_EFFICIENCY_LEDGER_V1.md`.

## 11. Publication

Review approval is not push/PR/merge/deploy authority. No automatic merge, force-push or destructive history recovery.
