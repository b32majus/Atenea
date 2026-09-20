# Atenea — Current decisions after Stage 8

Date: 2026-09-20

This file is the short current decision index. Historical `docs/DECISIONS.md`, stage files and `docs/ATENEA_HANDOFF_20260830.md` remain evidence of how Atenea evolved, but their forward-looking status is superseded where it conflicts with this index, `README.md`, `docs/QUALIFICATION.md` or `docs/ATENEA_HARNESS_CONTRACT_V1.md`.

## C-001 — Atenea is a contract over upstream tools, not an orchestration product

**Accepted.**

Do not build a custom lifecycle/controller/state-machine architecture absent field evidence that a required property has no upstream owner.

## C-002 — Historical thin outer Pi supervisor

**SUPERSEDED for the normal unattended path by C-040; preserved as qualified rollback/history.**

Pi owns frontier discovery, dependency/blocker/authority decisions, worker supervision, genuine human-decision relay, already-authorized operational permission grant, closure/reconciliation checks and frontier rediscovery. Pi does not implement product code and MUST NOT operate the Gentle lifecycle on behalf of the worker.

A future upstream replacement may be adopted only after bounded evidence proves it preserves these properties while deleting architecture or glue.

## C-003 — Herdr is process/session substrate only

**Accepted and qualified.**

Herdr provides the process/session surface used by the qualified architecture. Do not reintroduce Herdr-specific policy gates or make Herdr an independent authority controller.

## C-004 — Historical OpenCode + Gentle implementation worker

**SUPERSEDED for the normal unattended path by C-025; preserved as historical/alternate qualified evidence.**

Gentle owns the exact candidate, native RDD, reviewer lineage/authority, bounded correction, provider-issued continuation/re-entry, final acknowledgement/burn, recovery and mutation invalidation. The OpenCode/Gentle worker executes those provider-issued transitions. Atenea and the outer Pi supervisor must not duplicate or take over those mechanisms.

Gentle AI `2.5.0` stable was the production operational target for this historical OpenCode-era decision. Stage 5–8 evidence remains historical evidence from `2.5.0-rc.2`; stable real-project evidence is recorded in `docs/JUDIT76_GENTLE25_FIELD_EVIDENCE.md`. C-036 later owned the Gentle Pi 2.5 / Gentle AI 2.7 worker epoch; C-040/C-041 now supersede it for normal operation.

The bounded negotiated-v2 unattended characterization is recorded separately in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`. Its provider-side environment selector is canary-only and is not yet a supported production Gentle API.

## C-005 — Gentle Pi 2.2.0 failed historically; Gentle Pi 2.4.0 replacement evaluation = PASS_DELETE (historical cutover, superseded by C-036)

**Historical `2.2.0`: rejected / not qualified.** The failure remains valid evidence and MUST NOT be erased.

`2.3.0` established that a materially changed upstream release was eligible for one bounded replacement/deletion reevaluation. That replacement epoch was `2.4.0` with Pi `0.85.1`, Herdr `0.8.2`, Gentle AI `2.6.0` and pi-intercom `0.13.0`. It is preserved as historical evidence; C-036 later owned the 2.5/2.7 epoch; C-040/C-041 now supersede it for normal operation.

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

## C-025 — Historical Pi supervisor → separate Pi/Gentle-Pi worker unattended workflow

**SUPERSEDED for normal operation by C-040 on 2026-09-15; remains qualified rollback/provenance evidence.**

```text
explicit human execution authorization
→ Cora/DC or human mechanical launch
→ normal Pi supervisor (Gentle Pi OFF; pi-intercom ON; non-implementing)
→ Herdr separate visible worker pane
→ fresh Pi worker + Gentle Pi 2.5 / Gentle AI 2.7 native RDD
→ direct implementation OR optional package-owned Gentle Agents
→ deterministic checks / acknowledgement-burn / normal non-force publication
→ supervisor fresh frontier rediscovery / fresh worker for next compatible ticket or STOP
→ human merge boundary
```

In that historical topology, pinned worker creation followed `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`; the planning/launch surface verified exact model literals and runtime parameters before supervisor launch, and supervision was event-driven through pi-intercom. The spawn recipe is now rollback/reproduction evidence only; the no-polling/fail-closed principles remain current.

OpenCode remains installed/usable for attended or alternate workflows and as frozen historical qualification evidence, but is no longer required by the normal unattended path.

## C-026 — Pinned train launch fails closed on oracle/spawn prerequisites; supervisor owns no Gentle lifecycle

**Accepted from T6 train attempt-1 precondition failure, 2026-09-05.**

A clean T6 attempt exposed four launch-contract defects before product mutation: project runtime instructions can lag the Atenea cutover; a required principal acceptance oracle may be missing; raw `herdr pane split` JSON must not be passed as a pane id; and the plain supervisor must not execute `gentle-ai review mode enable` or any other Gentle lifecycle command.

For pinned clinical/semantic work, launch authority freezes the principal oracle independently before the implementation worker exists and supplies its path/SHA256. The supervisor verifies that hash, consumes literal spawn/model parameters, extracts exactly one `pane_id` from Herdr JSON, launches the separate worker, then ends its turn. Missing/mismatched oracle or rejected spawn parameter => FAIL CLOSED / STOP with zero product mutation. No OpenCode/alternate-runtime oracle fallback is allowed.

Repository `AGENTS.md` + coding standards are mandatory pre-write inputs for each fresh worker and must be propagated to bounded writers. Event-driven supervision from C-020 remains mandatory.

## C-027 — Historical bounded RDD consent relay worker → supervisor

**SUPERSEDED for normal operation by C-041; preserved as qualified rollback evidence.**

A T6 worker reached a valid native Gentle RDD consent envelope but its synthesized worker brief had lost the explicit relay clause; the worker called `ask_user_choice` and required one manual consent. Later pi-intercom messaging worked normally. The supported interpretation is therefore a brief/relay-contract defect, not evidence of a Gentle provider failure.

For already-authorized bounded RDD consent, the worker prompt must explicitly prohibit direct human prompting and keep provider answer-consent plus acknowledgement/burn inside the worker. The original T6-v2 field remedy used a pi-intercom ASK; C-028 supersedes that transport detail with the mechanical Atenea outbox relay so the model is no longer responsible for reproducing the provider envelope. The supervisor performs no Gentle lifecycle command. Missing relay route fails closed. Genuine human-owned decisions remain human.

## C-028 — Historical RDD relay identity / mechanical payload transport

**SUPERSEDED for normal operation by C-041; preserved as qualified rollback evidence.**

Herdr agent labels are not Pi/intercom identities. A repair run proved that `herdr agent start t6d12-supervisor-r2` without Pi `--name t6d12-supervisor-r2` leaves pi-intercom advertising a runtime fallback alias (`subagent-chat-*`), so an otherwise healthy idle supervisor cannot be addressed by the Herdr label. A subsequent manual model reconstruction of the long consent envelope corrupted one target hash; the supervisor correctly declined the inconsistent request.

Pinned runs therefore use one explicit logical name per supervisor/worker across Herdr and Pi `--name`, plus one shared opaque `PI_INTERCOM_SCOPE_ID`. Bounded RDD consent payloads are transported by the versioned Atenea worker relay extension through pi-intercom's public outbox API. The extension consumes the actual `gentle_review` tool result, validates choice/target consistency, hashes the exact provider text and sends that exact text without model reserialization. Direct `ask_user_choice` is blocked while such consent is pending. Any identity/scope/transport mismatch fails closed.

C-027 remains the ownership rule (worker→supervisor bounded decision; worker owns provider/Gentle lifecycle), but its earlier literal `pi-intercom ASK` transport wording is superseded by this mechanical outbox relay.

## C-029 — T5-proven reviewer continuation is a versioned worker contract

**Accepted from recovered T5 final-qualification evidence and reconciled under issue #56, 2026-09-06.**

T5 did not bypass Reliability or make reviewer lenses optional. Native status returned four opaque `collectBindings`; the worker used `gentle_review_capture_group`, received a four-run `pi_host_relay` forecast, obtained bounded supervisor ACK, then re-submitted the exact same ordered binding group with `reviewerRunAcknowledged=true`. The acknowledged capture completed, all four required lenses reached APPROVED, and native acknowledgement/burn completed.

The cutover #45/#47 preserved the macro topology but did not version this micro-protocol. Later workers therefore had to rediscover reviewer continuation and could reconstruct bindings or misclassify an in-flight capture as failure. This is classified primarily as lost operational contract, not a new Gentle Reliability defect.

`docs/GENTLE_REVIEWER_CONTINUATION_V1.md` is now the durable reviewer continuation contract. Pinned Pi/Gentle-Pi workers receive it through Pi `--append-system-prompt` from the same Atenea checkpoint root as the mechanical consent relay. `tools/check-atenea-reviewer-lifecycle.mjs` freezes the T5 group/forecast/ACK/in-flight/approval/burn behavior plus single-lens and negative cases. Atenea still does not own or replace Gentle's reviewer lifecycle.

## C-030 — Historical C-025 topology was field-qualified for real multi-ticket Golden E2E trains

**Historical field evidence; superseded as the normal topology by C-040, without invalidating the old Golden proof.**

The adopted workflow has now completed a real project train across multiple successive frontier tickets after one explicit execution authorization:

```text
explicit authorization
→ persistent non-implementing Pi supervisor
→ fresh Pi/Gentle-Pi worker for T8
→ deterministic/browser QA → native RDD → acknowledgement/burn → normal push
→ supervisor exact reconciliation + fresh authority read
→ fresh worker for T9 → QA/RDD/burn/push
→ supervisor reconciliation + fresh authority read
→ fresh verification-only worker for T10
→ final integration/retention gate PASS
→ STOP
```

Field result: T8 `08703a6…` accepted; T9 `fbaaef0…` accepted; T10 final gate `14/14 PASS` on the durable T9 HEAD; zero human intervention after train launch; supervisor executed zero Gentle lifecycle commands; no PR/merge/force push.

This closes the Golden E2E multi-ticket qualification gap without changing the ownership model or adding runtime architecture. C-025–C-029 remain normative for topology, fail-closed launch, bounded consent relay, explicit identity/scope and reviewer continuation.

The field run does not relax C-025's event-driven rule. It originally exposed one startup `sleep 6`; WO #59 subsequently resolved that debt with a real Herdr `0.8.2` readiness canary: successful `herdr agent start` is the readiness barrier and the first prompt followed 17 ms later with zero sleep. The separate T8 reviewer admission refusal recovered through a provider-owned bounded reoffer/retry remains non-blocking reliability debt, not justification for a second reviewer controller.

Evidence: `docs/PROMUEVE_UNIFIED_INTAKE_GOLDEN_E2E_FIELD_EVIDENCE_20260906.md`.

## C-031 — Promotion Review is a conditional independent human-boundary audit, not a second RDD

**Accepted 2026-09-06 under issue #60.**

For high-risk composition/promotion decisions, the human/Cora planning surface may require `docs/PROMOTION_REVIEW_V1.md`: one fresh read-only Pi reviewer, an exact base/head evidence pack, the complete diff plus an explicit high-risk subset, and three separate axes (Spec/clinical semantics, Standards/Clean Code, Adversarial/Safety & failure ordering). Any blocking finding means FAIL. The reviewer model route is explicit at launch and cannot silently fall back.

This does not weaken C-011. Gentle native RDD remains the sole exact-candidate review authority and Matt `code-review` remains an upstream task-triggered engineering method. Promotion Review is conditional at the human promotion boundary, creates no lineage/acknowledgement authority, performs no mutation and never auto-authorizes merge.

## C-032 — Newcomer front door makes scopes, Matt setup and operational routing explicit without new runtime architecture

**Accepted for WO #63, 2026-09-06; its pre-2.5 delegated-writer/routing statements are historical and superseded for current routing by C-036/C-037/C-038.**

`docs/NEWCOMER_QUICKSTART_V1.md` is the fast non-normative map for a fresh operator/agent. `docs/INSTALLATION_AND_OPERATION_V1.md` remains the installation/verification authority and now distinguishes machine-global runtime, the versioned Atenea checkpoint and target-repo authority/configuration.

For a target repo that selects the Matt ecosystem under current Pi, use the complete upstream project-local install surface and run `setup-matt-pocock-skills` once before first use; do not treat Atenea's historical `.agents/skills/` location as the current target-Pi recipe. Greenfield shaping exposes `to-spec` and `to-tickets`; engineering methods remain task-triggered by their upstream definitions.

Historical Sep-6 routing evidence recorded DeepSeek V4 Flash medium as field-proven for the **Atenea Pi supervisor** and V4 Flash high for the Golden collapsed coordinator+implementation worker. Those facts remain provenance only. C-038 preserves the Sep-12 routing qualification; C-040 removes the outer supervisor from the normal topology while `docs/ROUTING_EVIDENCE_LEDGER_V1.md` owns the current surviving role routes. Promotion Review remains explicit per invocation.

At the 2026-09-06 Golden checkpoint, the path did **not** require `pi-subagents`, a delegated `gentle-ai-worker`, Luna-specific writer routing, a context-budget controller, supervisor-invariants duplication, an Atenea-supervisor skill or a generic worker-template engine. C-036 later qualifies Gentle Pi 2.5's **package-owned** native Agents and C-037 adopts Luna-high worker/verify profiles. Third-party `pi-subagents`, mandatory delegation, context-budget controllers, supervisor duplication and generic worker-template engines remain excluded.

## C-033 — Repository entry and model routing are reconciled by current authority/evidence class, never by historical residue

**Accepted for WO #67, 2026-09-06; its routing snapshot is historical and superseded for current routing by C-037/C-038.**

Before normal shaping, a target repo with prior product/tooling signals uses `docs/REPOSITORY_ENTRY_RECONCILIATION_V1.md`: classify current context, identify current authority, inventory legacy signals read-only, classify them `CURRENT` / `COMPATIBILITY_REQUIRED` / `HISTORICAL` / `STALE_OR_UNKNOWN`, and STOP on material contradiction. Legacy detection grants no cleanup/migration authority. Greenfield means no prior product/authority that must be preserved, not an empty directory.

Runtime/model evidence uses `docs/ROUTING_EVIDENCE_LEDGER_V1.md`. The Atenea Pi supervisor and the Gentle-Pi Pi parent/Gentleman coordinator are different roles. At the 2026-09-06 checkpoint, V4 Flash medium was the supervisor route and GLM 5.3 Flash high was only an A/B-validated coordinator candidate. C-037 later promoted GLM; C-038 superseded the earlier supervisor route with DeepSeek V4.1 Flash medium for that topology; C-040 later removed the outer supervisor role from normal operation and the routing ledger now owns the current matrix. The Golden V4-high Pi/Gentle worker remains historical collapsed coordinator+implementation evidence.

Native Gentle lens/refuter/targeted-validator model routing remains currently unqualified. Historical V4 reviewer and Qwen 3.8 refuter pins from the earlier subagent architecture are `HISTORICAL_DISCONNECTED`, not current routing decisions. Issue #66 is `ABORTED_NON_AUTHORITY` because it tested the wrong whole-worker role after a supervisor/coordinator conflation; it must not be used for routing conclusions.

## C-036 — Historical GP2.5 / GAI2.7 worker epoch

**SUPERSEDED for current operation by C-044/C-045; preserved as qualified historical/rollback evidence.**

At acceptance, this worker epoch was Gentle Pi `2.5.0` with package-paired Gentle AI `2.7.0`. That historical promotion preserved the outer C-025/C-030 topology rather than replacing it:

```text
explicit human execution authorization
→ plain non-implementing Pi supervisor
→ Herdr
→ fresh Pi + Gentle Pi 2.5 worker per ticket
→ deterministic verification
→ native Gentle AI 2.7 RDD
→ acknowledgement/burn
→ normal non-force publication
→ supervisor reconciliation
→ next fresh worker or STOP
→ human merge boundary
```

Gentle Pi 2.5 native Gentle Agents are the supported **inner** delegation seam. The fresh ticket worker remains the unit of responsibility and owns ticket interpretation, integration, deterministic verification, RDD, acknowledgement/burn and FINAL. A small ticket may be implemented directly; delegation is used only when it materially helps. Third-party `pi-subagents` is not part of the adopted path.

At that GP2.5 epoch, standing review permission was qualified only as an attended interactive convenience and did not replace that epoch's unattended zero-touch path. C-044 later supersedes this operational conclusion with GP3.3 one-touch session permission.

In that historical unattended epoch, `extensions/atenea-rdd-consent-relay.mjs` was required: exact provider `consent/v3` is transported mechanically to the plain supervisor; the supervisor may return only bounded `GRANTED`/`DECLINED`; the worker executes the provider transition and remains sole Gentle lifecycle owner. Full GP2.5/GAI2.7 START → reviewer forecast/ACK → approved → acknowledgement/burn was qualified with zero human touch.

Evidence: `docs/GENTLE_PI_25_GOLDEN_PROMOTION_EVIDENCE_20260908.md`.

## C-037 — Historical Sep-8 routing: V4 supervisor, GLM coordinator, Luna-high native Agents; superseded by C-038

**Accepted 2026-09-08 under #73. Historical routing only; C-038 supersedes every current model default below.**

```text
Atenea Pi supervisor
  opencode-go/deepseek-v4-flash · medium
  FIELD_PROVEN

Fresh Gentle-Pi parent/coordinator
  opencode-go/glm-5.3-flash · high
  FIELD_PROVEN / current baseline

Native gentle-ai-worker
  openai-codex/gpt-5.6-luna · high
  QUALIFIED / adopted profile

Native gentle-ai-verify
  openai-codex/gpt-5.6-luna · high
  QUALIFIED / adopted profile
```

GLM 5.3 Flash high is promoted from A/B candidate to the normal coordinator baseline after successful real PROMueve use on 2026-09-07. DeepSeek V4 Flash high remains proven parent/coordinator fallback evidence, but fallback is explicit only; a rejected route never triggers silent substitution.

At that epoch, native RDD role selection remained provider-owned. Gentle Pi 2.5's host relay launched isolated Pi reviewer processes without copying the parent CLI `--model`/`--provider`; Atenea did not yet pin reviewer/refuter/targeted-validator models per lens. Historical V4 reviewer / Qwen refuter entries are `HISTORICAL_DISCONNECTED`, not current authority.

Luna writer/verify stays `high`; do not downgrade to medium merely to save negligible cost. The 2026-09-08 opaque-binding qualification also established a general guardrail: do not use `minimal` for an RDD-owning actor that must reproduce opaque provider state exactly.

See `docs/ROUTING_EVIDENCE_LEDGER_V1.md`.

## C-038 — Historical Sep-12 role-family qualification: GLM builds, Luna verifies, V4.1 performs material RDD

**Historical role-family evidence accepted 2026-09-12 under #75; current provider/literal routing is superseded by C-045.**

C-037's old V4 supervisor, Luna-writer and unpinned-lens defaults were superseded by controlled real-work qualification. The surviving GLM/Luna/V4.1 **role-family** rationale remains evidence; C-045 owns the current NaN/OpenAI-Codex provider literals and GP3.3 refuter/validator pins.

```text
Atenea Pi supervisor
  opencode-go/deepseek-v4.1-flash · medium
  ADOPTED_QUALIFIED / historical prior-topology baseline

Fresh Gentle-Pi parent/coordinator
  opencode-go/glm-5.3-flash · high
  FIELD_PROVEN / retained

Native gentle-ai-worker
  opencode-go/glm-5.3-flash · high
  ADOPTED_QUALIFIED

Native gentle-ai-verify
  openai-codex/gpt-5.6-luna · high
  QUALIFIED / retained

review-readability
  openai-codex/gpt-5.6-luna · high
  A/B_VALIDATED / adopted

review-reliability
review-resilience
review-risk
  opencode-go/deepseek-v4.1-flash · high
  A/B_VALIDATED / adopted
```

`review-refuter` and `review-validator` receive **no new Atenea pin** in this promotion. During the machine cutover their stale historical model profiles must be cleared so they inherit/provider-route rather than silently using old Qwen/V4-Pro entries. Sol remains escalation-only; no routine Sol pin and no silent fallback.

The routing is intentionally diverse: GLM builds/co-ordinates → Luna verifies → V4.1 challenges material reliability/resilience/risk, with Luna retained for readability because it showed lower severity inflation. Detailed worker, RDD, coordinator and verifier evidence is in `docs/ROUTING_QUALIFICATION_EVIDENCE_20260912.md`.

## C-039 — Historical Pi 0.85.1 / pi-lens 3.8.74 slowdown exception

**Accepted operationally 2026-09-12 under #75 evidence.**

Isolation showed severe slowdown with Pi 0.85.1 + pi-lens 3.8.74 even when Gentle Pi was absent. Disabling exposed Lens features (`--no-lsp`, `--no-tests`, `--no-opengrep`, `--no-read-guard`, `--no-lens-context`, `--no-autoformat`, `--no-autofix`) did not materially change the slowdown. Plain Pi without Lens returned to normal performance.

For that historical version pair the Lens extension was globally disabled. The current GP3.3 machine profile does not depend on pi-lens. Do not repair it with Atenea glue and do not re-enable it merely as "diagnostic-only" on this exact version pair. A later upstream Lens/Pi combination may be separately requalified.

## C-040 — Historical Gentle Pi 2.7 / Gentle AI 2.9.1 persistent-parent zero-touch topology

**Historical evidence from the 2026-09-15 bounded replacement/deletion qualification; superseded for normal operation by C-044.**

The then-adopted GP2.7 unattended topology was:

```text
explicit human execution authorization + one bounded train prompt
→ one persistent Pi + Gentle Pi 2.7 parent visible in Herdr
→ fresh package-owned gentle-ai-worker child per newly selected ticket
→ parent exact diff reconciliation + deterministic verification
→ hybrid-native exact-candidate RDD
→ acknowledgement/burn
→ authorized checkpoint
→ fresh frontier read → next fresh child or STOP
→ human merge boundary
```

The parent retains train/frontier context and owns integration/RDD/checkpoint progression. The implementation child is fresh per newly selected ticket in the normal multi-ticket recipe. `max_concurrency=1` is the qualified default unless parallel safety is separately established.

This supersedes the **normal-current** topology portions of C-002/C-025/C-027/C-028/C-030/C-036 while preserving them as historical/rollback evidence. It removes the separate plain supervisor, the fresh outer Gentle parent per ticket, pi-intercom consent bridge and Atenea RDD relay from the normal path.

Evidence: `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`.

## C-041 — Historical GP2.7 no-TTY START + same-lineage adoption zero-touch bridge

**Historical evidence from Q4–Q7 qualification on 2026-09-15; superseded for normal operation by C-044.**

After candidate reconciliation/tests, the visible parent runs package-local Gentle AI 2.9.1 native START through its ordinary Bash tool. Only that subprocess is non-TTY. No consent override is supplied. Gentle AI creates the candidate lineage without a host consent dialog; Gentle Pi then adopts **that exact lineage** through STATUS before reviewer capture.

Required invariants:

```text
NATIVE_NO_TTY_START=REQUIRED
CONSENT_OVERRIDE_FLAG=NONE
SAME_LINEAGE_STATUS_ADOPTION=REQUIRED
SECOND_START_FOR_SAME_CANDIDATE=FORBIDDEN
PROVIDER_BINDINGS=OPAQUE_EXACT
ACKNOWLEDGEMENT_BURN=REQUIRED
VISIBLE_REVIEW_CONSENT_DIALOG=FAIL_CLOSED
```

Initial human prompt prose was directly proven **not** to create standing review permission. Human option-3 standing permission is attended-only. Herdr key automation was technically proven but is not adopted. Internal permission APIs, fake FD3/package-child identity and provider-consent rewriting are prohibited as normal execution techniques.

## C-042 — Parent visibility in Herdr is a current execution invariant

**Current principle, originally proven by the GP2.7 qualifications and retained under GP3.3.**

One-touch execution must not sacrifice operator observability. The persistent Pi/Gentle-Pi parent remains visible and interactive in Herdr throughout the train. The operator can watch child tasks, tests, review lifecycle, approval/burn and checkpoint progression; the first review-session grant is an explicit visible human action.

Herdr remains process/session/observability substrate, not review or product authority. Human-touch claims are externally adjudicated because host TUI actions are not reliably represented in the model transcript.

## C-043 — Worktrees and qualification sandboxes are temporary local state

**Accepted operational policy 2026-09-15.**

After a PR/checkpoint is durably reconciled and the exact worktree contains no unique/dirty/active state, the local worktree should normally be removed rather than retained indefinitely. After a qualification reaches a terminal result and its material evidence is published to authoritative Git/GitHub, the heavy sandbox should likewise become cleanup-eligible unless it contains a specifically retained reproduction/rollback artifact.

Cleanup is never inferred from age alone and never authorizes force/reset. Dirty, active, open-PR, unique-commit or ambiguous paths are HOLD. Exact deletion remains an explicit human-authorized operation after a fresh inventory.

Authority: `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md`.

## C-044 — Gentle Pi 3.3 / Gentle AI 3.4 one-touch session permission is the current execution path

**Accepted 2026-09-20; supersedes C-040/C-041 for normal operation.**

Current stack is Pi `0.86.1`, Herdr `0.9.0`, Gentle Pi `3.3.0` and package-paired Gentle AI `3.4.0`.

The first eligible consent-required review in a live Pi session/repository is resolved by one explicit human host action:

```text
Review and allow this session
```

That action runs the exact provider grant for the current frozen candidate and creates an in-memory host permission for later **fresh validated provider grants** in the same live Pi session and canonical Git repository, including sibling worktrees. Package-owned children may request that parent permission only through the package's bounded target-digest channel.

This is `ONE_TOUCH`, not `ZERO_TOUCH`. Reload preserves the permission; new/resume/fork/quit/process restart/revoke ends it. It grants no verdict, acknowledgement, maintenance, delivery, merge or cross-repository authority.

Q11b demonstrated `SINGLE_ACCEPTANCE_UNATTENDED=PASS`: after the first session grant, a later fresh candidate in the same live session/repository began/executed review without a second consent touch. The exact Q11 baseline used Pi `0.86.0`; Pi `0.86.1` is the current installed runtime.

No external supervisor, Atenea consent relay, internal permission API or Herdr RPA is part of the normal path. The current GP3.3 host bridge is the narrow C-047 compatibility shim, not a supervisor or replacement review lifecycle.

Current recipe: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

## C-045 — Current routing restores GLM/Luna/V4 diversity; NaN owns GLM/V4 provider routes

**Accepted 2026-09-20.**

The temporary all-V4 routing used during runtime/performance qualification is not operational policy.

```text
Pi default                    nan/deepseek-v4-flash · medium
persistent parent             nan/glm5.3-flash · high
gentle-ai-worker              nan/glm5.3-flash · high
gentle-ai-verify              openai-codex/gpt-5.6-luna · high
review-readability            openai-codex/gpt-5.6-luna · high
review-reliability            nan/deepseek-v4-flash · high
review-resilience             nan/deepseek-v4-flash · high
review-risk                   nan/deepseek-v4-flash · high
review-refuter                nan/deepseek-v4-flash · high
review-validator              openai-codex/gpt-5.6-luna · high
```

NaN serves the DeepSeek V4.1 Flash family under model id `deepseek-v4-flash`. Luna remains on OpenAI-Codex.

GP3.3's v9 role contract requires explicit user-owned routing for host-mediated refuter/validator slots when requested. Their current mappings are a GP3.3 compatibility/adoption decision, not a retroactive claim that GP2.7 had those pins.

The machine profile is `atenea-one-touch`. It deliberately has no `orchestrator` entry, so Pi's normal default remains V4 medium; the train parent is launched explicitly on GLM high.

## C-046 — Gentle Shell/ODD owns internal micro-orchestration; Atenea owns the external frontier

**Accepted from Q10 evidence 2026-09-20.**

Atenea does not require a fresh package-owned child per external GitHub ticket. One persistent parent may traverse multiple externally authorized work units in the same bounded train. Gentle Shell/ODD owns internal classification, task state, worker delegation, allowed-edit enforcement, verification, work-unit commits, risk classification and review routing.

Atenea retains the external repository/tracker authority hierarchy, `EXECUTION_READY`, frozen oracles where required, domain/safety invariants, authority re-read between external units/frontiers, fail-closed STOP behavior and publication/merge policy.

Q10 proved C→D in one parent with separate commits and authority re-read after each unit while unauthorized E remained untouched.

## C-047 — GP3.3 uses a narrow qualified host bridge until upstream owns exact-binding transport/signaling

**Accepted temporary compatibility boundary 2026-09-20.**

The current Gentle Pi 3.3.0 install carries the version/hash-guarded patch `patches/gentle-pi-3.3.0-atenea-host-bridge.patch`.

It adds only `gentle_review_capture_current_group` for exact host-retained reviewer-group forwarding and `host_consent_resolved` to prevent a model from re-asking after native host consent is already complete. It is not a second RDD controller and must not force refuter/validator through group capture; those roles follow the exact provider-issued operations.

Deletion trigger: upstream ships equivalent supported exact-binding transport and consent-resolved signaling.

## C-048 — Startup performance must be measured; Skill Registry is not a proven root cause

**Accepted operational finding 2026-09-20.**

Registry ON/OFF timings crossed over, warm global-vs-clean Agent Home medians were effectively equal, and the first cold clean start exposed a large pre-provider/session-start delay consistent with initial Fast File Finder scanning plus host variability. Do not disable Skill Registry, remove Pretty or clean Agent Home by ritual on the current evidence.

Evidence: `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`.

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

The materially changed Gentle Pi line qualified for one bounded replacement/deletion re-evaluation because `2.2.0` failed historically. The `2.4.0` replacement epoch established the PASS_DELETE path: PROMueve T4 established execution-path PASS and T5 plus fresh frontier rediscovery closed continuity/frontier. Operator-authorized cutover #45 adopted that replacement. C-036 later promotes the independently qualified `2.5.0` / `2.7.0` pair without creating a Stage 9 or changing the outer topology.

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

## C-020 — Historical outer-supervisor event discipline; no long fixed polling

**Accepted from repeated field evidence; supervisor-specific transport superseded by C-040, while the no-polling principle remains.**

Repeated `sleep 180` / `sleep 300` polling degraded #76, and a T5 supervisor later recreated the same failure mode with `sleep 50` loops while the worker was already blocked on pi-intercom. Herdr `agent_status` also reported `idle` while Pi remained actively working, so it is not a lifecycle clock.

In the historical outer-supervisor Gentle Pi path, the proven pattern was launch/prompt worker → supervisor ends its turn → pi-intercom inbound wakes it only for bounded decisions or FINAL. That transport is no longer the normal topology. The durable rule retained by C-040 is narrower: use package/native lifecycle events and bounded waits; fixed `sleep`, `for`/`while` polling, periodic pane reads and long `herdr agent wait` are not normal coordination mechanisms.

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

## C-034 — Human + Cora/planning surface owns project-entry classification before execution

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

## C-035 — Repository Intelligence is optional derived pre-shaping evidence, not an Atenea runtime layer

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

1. human + Cora read current Atenea and target-project authority;
2. shape/reconcile until a bounded item/train is explicitly `EXECUTION_READY`;
3. verify GP3.3/GAI3.4 runtime, `atenea-one-touch` routing and exact repo/worktree state;
4. start one visible persistent parent explicitly on `nan/glm5.3-flash` `high`;
5. submit one bounded train prompt;
6. on the first valid review consent only, human selects `Review and allow this session`;
7. let Gentle Shell/ODD own internal decomposition/delegation/verification; at provider review boundaries follow the exact native role transition through APPROVED + acknowledgement/burn;
8. later reviews in the same live Pi session/canonical repository use fresh validated grants without another review-consent touch;
9. re-read external authority between authorized units/frontiers and continue only while the next work remains inside the explicit authorization; otherwise STOP;
10. final merge remains human unless separately authorized;
11. new Atenea glue requires a demonstrated upstream ownership gap.
