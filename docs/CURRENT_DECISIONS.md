# Atenea — Current decisions after Stage 8

Date: 2026-09-05

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

## C-004 — Historical OpenCode + Gentle implementation worker

**SUPERSEDED for the normal unattended path by C-025; preserved as historical/alternate qualified evidence.**

Gentle owns the exact candidate, native RDD, reviewer lineage/authority, bounded correction, provider-issued continuation/re-entry, final acknowledgement/burn, recovery and mutation invalidation. The OpenCode/Gentle worker executes those provider-issued transitions. Atenea and the outer Pi supervisor must not duplicate or take over those mechanisms.

Gentle AI `2.5.0` stable is the current production operational target. Stage 5–8 evidence remains historical evidence from `2.5.0-rc.2`; stable real-project evidence is recorded in `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`.

The bounded negotiated-v2 unattended characterization is recorded separately in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`. Its provider-side environment selector is canary-only and is not yet a supported production Gentle API.

## C-005 — Gentle Pi 2.2.0 failed historically; Gentle Pi 2.4.0 replacement evaluation = PASS_DELETE and is now adopted by C-025

**Historical `2.2.0`: rejected / not qualified.** The failure remains valid evidence and MUST NOT be erased.

`2.3.0` established that a materially changed upstream release was eligible for one bounded replacement/deletion reevaluation. The current field epoch is `2.4.0` with Pi `0.85.1`, Herdr `0.8.2`, Gentle AI `2.6.0` and pi-intercom `0.13.0`.

PROMueve T3 supplied diagnostic evidence: worker → supervisor exact-candidate RDD delegation worked, while supervisor-self RDD hooks and missing worker env propagation prevented zero-touch. PROMueve T4 then corrected exactly those seams and completed a real repair with zero external touch. T5 subsequently exercised a composed integration ticket: its first unattended candidate was correctly rejected by an independent product gate, atomic Repairs A/B closed the findings, and a fresh qualification of final SHA `5ae810a…` passed all predecessor/T5 batteries plus native RDD/ack-burn with zero external touch and no product mutation during qualification.

```text
GENTLE_PI_2_4_EXECUTION_PATH_CANDIDATE=PASS
GENTLE_PI_2_4_ZERO_TOUCH_REAL_REPAIR=PASS
GENTLE_PI_2_4_COMPOSED_T5_QUALIFICATION=PASS
GENTLE_PI_2_4_FRONTIER_REDISCOVERY_STOP=PASS
GENTLE_PI_2_4_ADOPTED=YES
FULL_REPLACEMENT_QUALIFICATION=PASS_DELETE
ADOPTION_DECISION=APPROVED_CUTOVER_45
```

This is meaningful replacement/deletion evidence because OpenCode and the downstream negotiated-v2 OpenCode consent canary were not used by the Gentle Pi worker path. After T5 final qualification, the same non-implementing supervisor freshly re-read parent #292 and issue #298, confirmed #298 was OPEN + approved + ready-for-agent with its T5 dependency satisfied by `5ae810a…`, reported `NEXT_FRONTIER=#298`, launched nothing, and STOPped. The bounded #35 experiment therefore resolves `PASS_DELETE`. Operator authorization on 2026-09-05 approved the cutover; C-025 records the adopted workflow.

Evidence: `docs/GENTLE_PI_24_REPLACEMENT_FIELD_EVIDENCE_20260905.md`.

## C-025 — Pi supervisor → separate Pi/Gentle-Pi worker is the adopted unattended workflow

**Accepted, qualified and adopted 2026-09-05 under issue #45.**

```text
explicit human execution authorization
→ Cora/DC or human mechanical launch
→ normal Pi supervisor (Gentle Pi OFF; pi-intercom ON; non-implementing)
→ Herdr separate visible worker pane
→ fresh Pi worker + Gentle Pi 2.4 / Gentle AI native RDD
→ deterministic checks / acknowledgement-burn / normal non-force publication
→ supervisor fresh frontier rediscovery / fresh worker for next compatible ticket or STOP
→ human merge boundary
```

Pinned worker creation MUST follow `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`. The planning/launch surface verifies exact model literals and runtime parameters before supervisor launch; the supervisor consumes them unchanged and fails closed instead of rediscovering/substituting. Supervision is event-driven through pi-intercom; fixed sleeps/polling and `agent_status` lifecycle inference are prohibited.

OpenCode remains installed/usable for attended or alternate workflows and as frozen historical qualification evidence, but is no longer required by the normal unattended path.

## C-026 — Pinned train launch fails closed on oracle/spawn prerequisites; supervisor owns no Gentle lifecycle

**Accepted from T6 train attempt-1 precondition failure, 2026-09-05.**

A clean T6 attempt exposed four launch-contract defects before product mutation: project runtime instructions can lag the Atenea cutover; a required principal acceptance oracle may be missing; raw `herdr pane split` JSON must not be passed as a pane id; and the plain supervisor must not execute `gentle-ai review mode enable` or any other Gentle lifecycle command.

For pinned clinical/semantic work, launch authority freezes the principal oracle independently before the implementation worker exists and supplies its path/SHA256. The supervisor verifies that hash, consumes literal spawn/model parameters, extracts exactly one `pane_id` from Herdr JSON, launches the separate worker, then ends its turn. Missing/mismatched oracle or rejected spawn parameter => FAIL CLOSED / STOP with zero product mutation. No OpenCode/alternate-runtime oracle fallback is allowed.

Repository `AGENTS.md` + coding standards are mandatory pre-write inputs for each fresh worker and must be propagated to bounded writers. Event-driven supervision from C-020 remains mandatory.

## C-027 — Bounded RDD consent is relayed worker → supervisor through pi-intercom

**Accepted from T6 train v2 field evidence, 2026-09-05.**

A T6 worker reached a valid native Gentle RDD consent envelope but its synthesized worker brief had lost the explicit relay clause; the worker called `ask_user_choice` and required one manual consent. Later pi-intercom messaging worked normally. The supported interpretation is therefore a brief/relay-contract defect, not evidence of a Gentle provider failure.

For already-authorized bounded RDD consent, the worker prompt must explicitly prohibit direct human prompting, relay the exact envelope via pi-intercom ASK to the named supervisor, and keep provider answer-consent plus acknowledgement/burn inside the worker. The supervisor performs no Gentle lifecycle command. Missing relay route fails closed. Genuine human-owned decisions remain human.

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

The materially changed Gentle Pi line qualified for one bounded replacement/deletion re-evaluation because `2.2.0` failed historically. The current field epoch is `2.4.0`: PROMueve T4 established execution-path PASS and T5 plus fresh frontier rediscovery closed the remaining continuity/frontier gate. Result: `PASS_DELETE`; operator-authorized cutover #45 adopts the replacement path. This is not Stage 9.

## C-014 — Harness Contract v1 is the normative horizontal boundary

**Accepted.**

`docs/ATENEA_HARNESS_CONTRACT_V1.md` is the compact normative contract for readiness, ownership, supervision, candidate/review authority, engineering-quality placement, material UI activation, publication/reconciliation and STOP behavior.

It adds no custom runtime.

## C-015 — PRODUCT.md is compatibility, not duplicate product truth

**Accepted.**

For established verticals whose canonical product authority lives elsewhere, any `PRODUCT.md` required by design tooling is generated/derived, names canonical sources, is marked `DO NOT EDIT AS AUTHORITY`, and must be idempotent/diffable. `DESIGN.md` remains separate visual-system authority.

No universal Atenea PRODUCT generator is required.

## C-016 — Real-project rollout is the field-proven primary test harness

**Accepted and field-proven by issue #38.**

Use `docs/REAL_PROJECT_ROLLOUT_V1.md`.

Judit #76 / PR #79 supplied the first stable Gentle `2.5.0` field evidence. The zero-touch investigation then supplied bounded provider/binary/OpenCode/Pi canary evidence. Issue #38 completed the small real `EXECUTION_READY` issue launched by the human through the actual Pi operator interface. Do not repeat plumbing canaries; real operator-triggered end-to-end runs are now the normal path.

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

Atenea MUST NOT restore the property by stripping `relay`, supplying `granted`, or reconstructing START. Issue #36 remains open until an upstream-supported equivalent exists. The downstream canary proved the missing behavioral parity, and issue #38 then completed the real operator-triggered Atenea end-to-end run under that bounded canary; upstream `Gentleman-Programming/gentle-ai#4109` remains the production-resolution owner and is still open.

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

## C-020 — Pi supervision is event-driven where the worker exposes an inbound control plane; never long fixed polling

**Accepted from repeated field evidence.**

Repeated `sleep 180` / `sleep 300` polling degraded #76, and a T5 supervisor later recreated the same failure mode with `sleep 50` loops while the worker was already blocked on pi-intercom. Herdr `agent_status` also reported `idle` while Pi remained actively working, so it is not a lifecycle clock.

For the Gentle Pi candidate path, the proven supervision pattern is: launch/prompt worker → supervisor ends its turn → pi-intercom inbound wakes the supervisor only for bounded decisions or FINAL → supervisor replies/verifies → ends its turn again. Fixed `sleep`, `for`/`while` polling, periodic pane reads and long `herdr agent wait` are prohibited for this path.

For runtimes without an inbound event surface, use the narrowest one-shot Herdr/native wait/state primitive necessary; never build a scheduler, daemon or polling controller to compensate.

## C-021 — Historical autonomous OpenCode transport used headless `opencode run`

**SUPERSEDED for the normal unattended path by C-025; preserved as historical/alternate transport evidence.**

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

## C-022 — Historical human → Herdr → interactive Pi operator interface

**SUPERSEDED in launch mechanics by C-025; issue #38 remains historical proof that one explicit execution authorization can bound a zero-touch run.**

The real operator experience is:

```text
human opens/uses Herdr
→ human starts Pi interactively in the target Atenea/repository context
→ human gives one bounded execution prompt
→ Pi supervises the rest through Herdr + headless OpenCode + Gentle
→ Pi returns one factual final report
```

The initial Pi launch/prompt is the expected human execution authorization. After `EXECUTION_READY`, Pi should not ask for already-authorized operational actions such as normal non-force push.

Issue #38 exercised this interface end to end on a real `EXECUTION_READY` documentation work item and recorded:

```text
REAL_OPERATOR_TRIGGERED_ATENEA_E2E=PASS
INITIAL_HUMAN_EXECUTION_AUTHORIZATION=1
HUMAN_TOUCH_AFTER_EXECUTION_READY=0
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
NORMAL_NON_FORCE_PUBLICATION=PASS
PR_OR_CHECKPOINT=PASS
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

The real operator interface is therefore **field-proven**, not merely the next-run contract.

If a genuine human-owned boundary appears — material product ambiguity, destructive action, external authority decision, or final merge — Pi must relay it and pause. A human response is permitted, but it must be recorded as a real post-`EXECUTION_READY` intervention; Atenea must not silently count that run as zero-touch.

Under the characterized unattended provider canary, Gentle review consent should not surface. Final merge remains outside the autonomous run unless separately and explicitly authorized.

## C-023 — Observation harnesses must not become execution dependencies

**Accepted from canary harness defects.**

The final zero-touch canary exposed three observation-only defects:

- process-substitution `tee` children outlived the completed Pi process and kept the outer wrapper alive;
- help/discovery probes were initially miscounted as real topology executions;
- a textual grep misclassified `No human input was required` as a human-input request.

These do not belong in the runtime architecture. Structured evidence should be written directly to files and audited structurally. Do not add a wrapper/controller merely to observe the already-qualified path.

## C-024 — Visible Herdr worker pane + bounded pinned prompt remain accepted ergonomics

**PARTIALLY SUPERSEDED by C-025:** the visible-pane and bounded-prompt principles remain; OpenCode-specific worker mechanics are historical/alternate.

The #38 run proved the real operator interface but exposed two operator ergonomics improvements, both executed by issue #39 and accepted for current use without introducing any launcher/controller:

1. **Visible headless worker pane.** Pi launches headless `opencode run` through a dedicated Herdr pane/tab that is visible to the human, and Pi reports the worker pane/tab id/label immediately. Issue #39 proved the dedicated visible pane exists and its pane/tab id is reported (`ISSUE39_VISIBLE_WORKER_PANE=PASS`, `ISSUE39_WORKER_PANE_ID_REPORTED=PASS`). This is visibility, not interactivity: OpenCode remains headless/non-interactive and human observation does not become worker interaction or review authority. Do not regress to OpenCode TUI automation. Issue #39 does **not** prove a useful live worker activity stream: operator screenshots show the pane carrying the shell runner invocation and completion markers while OpenCode JSONL activity is redirected to the evidence file. Rendering useful live OpenCode/Gentle activity into the visible pane is `USEFUL_LIVE_WORKER_STREAM=NOT_YET_PROVEN` — accepted future ergonomics, non-blocking.
2. **Bounded authoritative pinned prompt.** For intentionally pinned work, the operator prompt states repository, exact issue/work item, declared branch/PR checkpoint, Pi supervisor role, Herdr → visible headless OpenCode/Gentle transport, normal non-force publication authorization and the STOP-before-merge boundary. Pi then performs only the bounded preflight needed to validate those anchors before launching the worker, deferring broad frontier rediscovery until after the accepted checkpoint. Issue #39 proved that bounded pinned preflight (`ISSUE39_PINNED_BOUNDED_PREFLIGHT=PASS`).

These are operator/supervision ergonomics only. They create no new authority, lifecycle ownership, daemon, scheduler or observation harness dependency. No new controller/poller is authorized to render the not-yet-proven live worker activity stream.

## C-025 — Human + Cora/planning surface owns project-entry classification before execution

**Accepted.**

The decision about how a new or resumed project should be understood and shaped belongs **before `EXECUTION_READY`**, in the human-present Cora/planning conversation. It is not a Pi responsibility and must not be rediscovered as an execution-time methodology decision.

The current front-door working classification is:

```text
REPO_CONTEXT=
  GREENFIELD
  SMALL_BROWNFIELD
  LARGE_CODE_BROWNFIELD
  MIXED_CORPUS_BROWNFIELD

CURRENT_STAGE=
  DISCOVERY
  SHAPING_IN_PROGRESS
  SPEC_READY
  EXECUTION_READY
  EXECUTION_IN_PROGRESS
  DELIVERY_CHECKPOINT
  MAINTENANCE
```

These are planning aids, not an Atenea state machine.

Routing intent:

```text
GREENFIELD
→ complete Matt Pocock upstream shaping

SMALL_BROWNFIELD
→ direct repo understanding
→ OpenSpec delta-first when it materially adds value

LARGE_CODE_BROWNFIELD
→ consider existing/needed Repository Intelligence
→ repo-native/OpenSpec shaping

MIXED_CORPUS_BROWNFIELD
→ consider mixed-corpus Repository Intelligence
→ repo-native/OpenSpec shaping
```

When continuing a project, first reuse valid existing authority/specs/indexes/checkpoints. Do not restart discovery or regenerate artifacts by ritual.

Operational front door: `docs/START_HERE.md`.

## C-026 — Repository Intelligence is optional derived pre-shaping evidence, not an Atenea runtime layer

**Accepted as policy; provider qualification pending.**

For sufficiently large/complex brownfields, Cora may recommend an upstream repository-intelligence tool to reduce repeated file-by-file archaeology and improve understanding before shaping the delta.

Repository Intelligence MUST remain:

```text
OPTIONAL=YES
PRE_EXECUTION=YES
DERIVED_EVIDENCE=YES
AUTHORITATIVE=NO
AUTO_INSTALL_BY_ATENEA=NO
PI_METHODOLOGY_DECISION=NO
```

Before creating an index/graph, determine whether one already exists, whether it is healthy/current enough for the task, whether code-only intelligence is sufficient, and whether the tool stays isolated/removable.

Current candidates under evaluation include CodeGraph for code-heavy repositories and Graphify for mixed code/document corpora. Neither is adopted as a mandatory Atenea dependency.

Atenea MUST NOT copy pieces of their skills, parsers, graph logic, watchers, prompts or control loops into Atenea. If a provider is later qualified, prefer the complete upstream tool through its supported public CLI/MCP surface.

A graph/index never outranks source code, accepted product/spec authority, deterministic repository checks, Gentle exact-candidate RDD or Git/GitHub delivery authority.

## Current sequence

1. human + Cora read current Atenea authority and the target project's current authority/state;
2. classify only enough to choose the minimum shaping path; reuse valid existing specs/indexes/checkpoints rather than regenerate them;
3. use Matt/OpenSpec/Impeccable and optional Repository Intelligence only when their task trigger/value warrants it;
4. explicitly promote a bounded real work item to `EXECUTION_READY`;
5. explicit human authorization starts the run; the human or Cora/DC may perform the mechanical plain-Pi supervisor launch and submit one bounded Atenea execution/train prompt;
6. for pinned work, launch authority pre-resolves literal runtime/model parameters and any required frozen-oracle path/SHA; Pi verifies those anchors, extracts the actual Herdr pane id deterministically, launches a separate Pi/Gentle-Pi worker and reports pane/name;
7. the Pi/Gentle-Pi worker reads project instructions before product write and owns implementation, bounded-writer delegation, deterministic verification and every Gentle lifecycle transition; the supervisor executes zero `gentle-ai` commands;
8. supervision is event-driven through pi-intercom: no fixed polling, long waits or `agent_status` lifecycle inference;
9. Pi grants only already-authorized bounded operational decisions/permissions without unnecessary human escalation; missing/mismatched oracle/spawn prerequisites fail closed with no alternate-runtime fallback;
10. genuine human-owned decisions are relayed and pause the run; final merge remains human;
11. after exact RDD acknowledgement/burn, one fresh pre-publication authority revalidation, normal publication and reconciliation, Pi rediscovers frontier, creates a fresh worker for the next compatible ticket, or stops when exhausted;
12. build new Atenea glue only after a real horizontal gap survives the upstream-first change test.
