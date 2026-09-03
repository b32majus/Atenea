# Atenea — Current decisions after Stage 8

Date: 2026-09-03

This file is the short current decision index. Historical `docs/DECISIONS.md`, stage files and `docs/ATENEA_HANDOFF_20260830.md` remain evidence of how Atenea evolved, but their forward-looking status is superseded where it conflicts with this index, `README.md`, `docs/QUALIFICATION.md` or `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

## C-001 — Atenea is a contract over upstream tools, not an orchestration product

**Accepted.**

Do not build a custom lifecycle/controller/state-machine architecture absent field evidence that a required property has no upstream owner.

## C-002 — Pi is the currently qualified thin autonomous supervisor

**Accepted and qualified.**

Pi owns frontier discovery, dependency/blocker/authority decisions, worker supervision, genuine human-decision relay, already-authorized operational permission grant, closure/reconciliation checks and frontier rediscovery. Pi does not implement product code and MUST NOT operate the Gentle lifecycle on behalf of the worker.

A future upstream replacement may be adopted only after bounded evidence proves it preserves these properties while deleting architecture or glue.

## C-003 — Herdr is process/session substrate only

**Accepted and qualified.**

Herdr provides the process/session surface used by the qualified architecture. Do not reintroduce Herdr-specific policy gates or make Herdr an independent authority controller.

## C-004 — OpenCode + Gentle is the accepted implementation worker

**Accepted and qualified.**

Gentle owns the exact candidate, native RDD, reviewer lineage/authority, bounded correction, provider-issued continuation/re-entry, final acknowledgement/burn, recovery and mutation invalidation. The OpenCode/Gentle worker executes those provider-issued transitions. Atenea and the outer Pi supervisor must not duplicate or take over those mechanisms.

Gentle AI `2.5.0` stable is the current production operational target. Stage 5–8 evidence remains historical evidence from `2.5.0-rc.2`; stable real-project evidence is recorded in `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

The bounded negotiated-v2 unattended characterization is recorded separately in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`. Its provider-side environment selector is canary-only and is not yet a supported production Gentle API.

## C-005 — Gentle Pi 2.2.0 failed; 2.3.0 is eligible for one bounded re-evaluation

**Historical `2.2.0`: rejected / not qualified.**

The `2.2.0` failure remains valid evidence.

**Current `2.3.0`: `REEVALUATION_ELIGIBLE`, not qualified or adopted.**

`2.3.0` is materially changed upstream: stable Gentle `2.5.0`, provider-issued continuations executed verbatim, final acknowledgement lifecycle, native Herdr bridge/guarded-command permissions and parent-owned edit surfaces.

Run at most one bounded replacement/deletion evaluation. Success means preserving Atenea's qualified properties while removing components/glue. Do not layer Gentle Pi on top of the current path merely because it is available.

Its clone-local `review-consent-asked` latch is not currently evidence of negotiated-v2 consent parity: current integration code records it after human grant but does not use it as authority for later provider-issued v2 candidate consent.

Until PASS, the accepted architecture remains Pi → Herdr → OpenCode + Gentle.

## C-006 — Normal git push is allowed; no publication-permission subsystem

**Accepted.**

Normal non-force publication follows repository policy. If an interactive runtime permission merely asks whether to perform an already-authorized ordinary non-force push, Pi should grant it without escalating to the human.

This does not authorize Pi to answer genuine human decisions, destructive operations, scope changes, provider-owned consent envelopes emitted by a selected provider path or final merge.

Dangerous/destructive recovery remains outside the autonomous default: no force-push, hidden reset/rebase history rewrite or automatic merge.

## C-007 — Greenfield authoring uses Matt upstream

**Accepted and qualified.**

Use the complete Matt Pocock ecosystem and durable repository/tracker authority. Do not create a custom Agent Brief/work-unit translation layer.

## C-008 — Brownfield preserves repo-native shaping; OpenSpec is optional

**Accepted.**

Do not force existing systems through OpenSpec or migrate accepted shaping authority by ritual.

OpenSpec may be selected delta-first for a new brownfield/evolutionary change when a versioned proposal/spec/tasks flow materially improves clarity, auditability or handoff. It remains a shaping front end, not a replacement for Pi supervision, Gentle execution/review or Git/GitHub authority.

Natural field evidence is pending because Atenea has not yet needed OpenSpec on a real selected delta.

## C-009 — Material UI/UX uses upstream Impeccable conditionally

**Accepted and consolidated.**

Material UI/UX applicability is decided during human-present shaping before `EXECUTION_READY`.

Do not make Impeccable mandatory for backend/non-UI work. `DESIGN.md` may own durable visual-system rules where warranted. If tooling needs `PRODUCT.md` while product truth lives elsewhere, use the smallest deterministic derived projection rather than duplicate authority.

## C-010 — Engineering quality = stable repo guardrails + task-triggered upstream methods

**Accepted and consolidated.**

```text
ALWAYS-ON POLICY
  CODING_STANDARDS.md

TASK-TRIGGERED UPSTREAM METHODS
  tdd
  codebase-design
  domain-modeling
  diagnosing-bugs
  code-review when semantic/spec-compliance risk warrants it

MACHINE ORACLES
  justified deterministic tooling

FINAL CANDIDATE LIFECYCLE
  Gentle native RDD
```

The Matt skills are not a mandatory execution sequence. Do not build a custom Clean Code framework, quality agent or new quality lifecycle.

## C-011 — No second mandatory LLM review lifecycle

**Accepted.**

Gentle native RDD owns final exact-candidate review authority. Matt `code-review` is an optional upstream method; when semantic/spec-compliance risk warrants it, use it before Gentle RDD. A post-Gentle mutation requires the candidate/review transition that current Gentle authority requires.

## C-012 — Repository delivery policy remains repository-specific

**Accepted.**

RDD evidence/approval is separate from delivery. A work unit may end at an accepted remote checkpoint or PR according to repository policy. Human merge boundaries remain valid. Atenea does not auto-merge.

## C-013 — No further large synthetic qualification ladder

**Accepted.**

Stage 5–8 already qualify the core architecture. New surfaces should be validated through bounded real-project evidence.

Gentle Pi `2.3.0` qualifies for one bounded re-evaluation because it is a materially changed replacement candidate for a previously failed runtime. This is not Stage 9.

## C-014 — Harness Contract v1 is the normative horizontal boundary

**Accepted.**

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the compact normative contract for readiness, ownership, supervision, candidate/review authority, engineering-quality placement, material UI activation, publication/reconciliation and STOP behavior.

It adds no custom runtime.

## C-015 — PRODUCT.md is compatibility, not duplicate product truth

**Accepted.**

For established verticals whose canonical product authority lives elsewhere, any `PRODUCT.md` required by design tooling is generated/derived, names canonical sources, is marked `DO NOT EDIT AS AUTHORITY`, and must be idempotent/diffable. `DESIGN.md` remains separate visual-system authority.

No universal Atenea PRODUCT generator is required.

## C-016 — Real-project rollout remains the primary test harness

**Accepted.**

Use `docs/REAL_PROJECT_ROLLOUT_V1.md`.

Judit #76 / PR #79 supplied the first stable Gentle `2.5.0` field evidence. The zero-touch investigation then supplied bounded provider/binary/OpenCode/Pi canary evidence. The next validation is a small real `EXECUTION_READY` issue launched by the human through the actual Pi operator interface; do not repeat plumbing canaries.

## C-017 — Stable Gentle zero-touch capability is proven; negotiated-v2 unattended parity is canary-proven but not upstream-adopted

**Accepted from real-project evidence + upstream source audit + bounded downstream characterization.**

Judit #76 proved stable exact-candidate RDD, provider continuation/re-entry on the successful path, approval and exact acknowledgement/burn.

The real OpenCode path asked the human again for every changed medium/high candidate. Upstream source explains why: `review-integration/v2` currently appends `--consent relay` to the provider-issued START transition, selecting candidate-scoped negotiated consent.

Stable Gentle itself contains unattended-capable semantics: organic/plain one-time consent can persist for later candidates, and an undeclared non-interactive negotiated START is authorized silently.

A canary-only provider-side policy patch based exactly on v2.5.0 then proved the missing behavioral parity without consumer rewriting:

```text
HISTORICAL_ZERO_HUMAN_TOUCH_RC2=PASS
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=PROVEN
CURRENT_RELEASED_V2_UNATTENDED_SELECTOR=NO
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY=PASS
OPENCODE_HEADLESS_UNATTENDED_ROUTE=PASS
PI_HERDR_OPENCODE_GENTLE_TOPOLOGY=PASS
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
LOCAL_CONSUMER_BYPASS=NO
PRODUCTION_GENTLE_MODIFIED=NO
UPSTREAM_TRACKING=Gentleman-Programming/gentle-ai#4109
ATENEA_TRACKING=#36
```

The canary selector is `GENTLE_AI_REVIEW_V2_CONSENT_POLICY=unattended`, but that spelling is downstream experimental evidence only. It MUST NOT be documented as an upstream API or become a permanent Atenea fork.

Atenea MUST NOT restore the property by stripping `relay`, supplying `granted`, or reconstructing START. Issue #36 remains open until an upstream-supported equivalent exists and/or the real end-to-end acceptance set is completed.

`review-integration/v1` is frozen/legacy and is not a durable production answer.

Full canary evidence: `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`.

## C-018 — Same-work continuation reuses a healthy OpenCode worker by default

**Accepted.**

For the same work item + PR/branch + worktree + effective authority, reuse the existing healthy OpenCode worker for bounded continuation/repair by default.

Create a new worker only for a concrete reason: unavailable/unhealthy worker, materially contaminated context, changed worktree/runtime, or explicit isolation.

This is implementation-context reuse only. A changed source candidate still requires a fresh Gentle review lineage when the provider requires one.

## C-019 — Supervisor prompts state intent/checkpoint/bounds; durable mechanics stay out of the prompt

**Accepted from field evidence.**

The successful Stage 7/8 interface was thin. Judit #76 showed that over-specifying lifecycle internals in Pi's operator prompt can cause responsibility reinterpretation, redundant investigation and unnecessary context growth.

Default prompt contents:

```text
normal run: work item + worker supervision request + delivery boundary
resume/repair: exact checkpoint + do-not-redo boundary + one/two incident-specific constraints
```

Do not teach Pi Gentle command syntax or recovery state machines in ordinary operator prompts. Those mechanics belong to current repo/Atenea/upstream authority.

## C-020 — Pi supervision uses bounded state/wait primitives, not long fixed polling

**Accepted from field evidence.**

Repeated `sleep 180` / `sleep 300` polling materially degraded the failed #76 recovery path.

Pi should use the narrowest existing Herdr/native state and bounded wait primitives appropriate to the current worker state. This does not justify a new scheduler, daemon or event bus.

## C-021 — Autonomous OpenCode transport is headless `opencode run`; TUI automation is not the runtime contract

**Accepted from real transport evidence.**

The interactive OpenCode TUI remains valid for human-attended work. It is not the accepted autonomous transport between Pi/Herdr and the implementation worker.

For unattended execution, Pi should supervise a headless OpenCode worker through Herdr using the supported non-interactive `opencode run` surface with structured output/evidence. Do not robotically inject prompts into the OpenCode TUI as the normal Atenea path.

This preserves the ownership split:

```text
Pi
→ Herdr process substrate
→ opencode run
→ managed Gentle lifecycle inside OpenCode
```

The final canary proved exactly one real Herdr workspace/run/wait, exactly one `opencode run`, zero direct Pi Gentle lifecycle calls and zero Pi delivery calls.

## C-022 — The real operator interface is human → Herdr → interactive Pi; autonomy begins after the one execution prompt

**Accepted as the next real-run contract.**

The intended human experience is:

```text
human opens/uses Herdr
→ human starts Pi interactively in the target Atenea/repository context
→ human gives one bounded execution prompt
→ Pi supervises the rest through Herdr + headless OpenCode + Gentle
→ Pi returns one factual final report
```

The initial Pi launch/prompt is the expected human execution authorization. After `EXECUTION_READY`, Pi should not ask for already-authorized operational actions such as normal non-force push.

If a genuine human-owned boundary appears — material product ambiguity, destructive action, external authority decision, or final merge — Pi must relay it and pause. A human response is permitted, but it must be recorded as a real post-`EXECUTION_READY` intervention; Atenea must not silently count that run as zero-touch.

Under the characterized unattended provider canary, Gentle review consent should not surface. Final merge remains outside the autonomous run unless separately and explicitly authorized.

## C-023 — Observation harnesses must not become execution dependencies

**Accepted from canary harness defects.**

The final zero-touch canary exposed three observation-only defects:

- process-substitution `tee` children outlived the completed Pi process and kept the outer wrapper alive;
- help/discovery probes were initially miscounted as real topology executions;
- a textual grep misclassified `No human input was required` as a human-input request.

These do not belong in the runtime architecture. Structured evidence should be written directly to files and audited structurally. Do not add a wrapper/controller merely to observe the already-qualified path.

## Current sequence

1. preserve current repo/product authority and shape only unresolved work;
2. use Matt/OpenSpec/Impeccable only when their task trigger or value warrants it;
3. explicitly promote a bounded real work item to `EXECUTION_READY`;
4. human opens/uses Herdr, starts Pi interactively and gives one bounded Atenea execution prompt;
5. Pi resolves current authority/frontier and creates or reuses a headless OpenCode worker through Herdr;
6. OpenCode owns implementation, deterministic verification and every Gentle lifecycle transition; Pi MUST NOT operate Gentle directly;
7. for the current bounded zero-touch experiment only, the isolated canary Gentle provider policy may be used exactly as documented in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`; production Gentle remains untouched and the upstream issue remains open;
8. Pi grants already-authorized operational permissions such as normal non-force push without unnecessary human escalation;
9. genuine human-owned decisions are relayed and pause the run; final merge remains human;
10. after exact RDD acknowledgement/burn, one fresh pre-publication authority revalidation, normal publication and reconciliation, Pi rediscovers frontier and stops when exhausted;
11. build new Atenea glue only after a real horizontal gap survives the upstream-first change test.