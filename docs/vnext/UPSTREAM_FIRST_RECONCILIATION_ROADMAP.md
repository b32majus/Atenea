# Atenea vNext — Upstream-first Reconciliation Roadmap

Status: **HISTORICAL COMPLETED PROGRAM — P0–P7 CLOSED**

Historical working branch: `vnext/upstream-first-reconciliation` (merged/superseded by `main`)

Closed: 2026-09-22

> Current runtime versions are maintained separately. Do not infer today's baseline from version references inside this completed qualification program. Read `docs/START_HERE.md`, `docs/vnext/CURRENT_COMPATIBILITY.md`, and `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923.md`.

## 0. Why this exists

Atenea was built while Pi / Gentle lacked several properties that were operationally important to us. Upstream has evolved quickly. The current objective is no longer to preserve Atenea's historical runtime architecture by default, but to determine the **smallest useful Atenea layer over native Gentle**.

The target architecture is:

```text
HUMAN / PRODUCT SHAPING
        ↓
thin Atenea layer
  policies / standards
  differential capabilities
  deterministic evidence
        ↓
native Gentle Shell / Gentle AI
  ODD
  delegation / workers
  TDD policy
  native RDD / reviewers
  acknowledgement / burn
        ↓
Pi
        ↓
provider
```

Atenea must not become a harness around another harness.

## 1. Positive control already established

A clean-room upstream stack has been exercised independently from Atenea on the VPS:

- Pi 0.86.1
- Gentle Shell / gentle-pi 3.3.0
- Gentle AI 3.4.0
- NaN provider
- `nan/glm5.3-flash`
- `nan/deepseek-v4-flash`

Observed positive path:

```text
Pi + NaN
→ native Gentle loads
→ primary agent mutates first surface
→ multi-file work delegates to gentle-ai-worker
→ worker uses NaN successfully
→ deterministic tests pass
→ work-unit commit
→ native review authority
→ approved
→ acknowledge-approved
→ authority burned / closed
```

This clean-room behavior is the **Golden Control** for vNext work.

Important diagnostic correction: earlier Pi `-p` timeouts in the remote test harness were caused by stdin remaining open. Pi print mode was waiting for EOF and had not yet opened a network connection. Closing stdin with `/dev/null` makes the same Pi+NaN path work normally. Do not use those earlier timeouts as evidence against NaN, Pi, or Gentle.

## 2. Architectural principle

Every existing Atenea capability must re-earn its place.

Classification vocabulary:

- **KEEP** — Atenea still provides unique, demonstrated value.
- **REPLACE_WITH_UPSTREAM** — current Pi/Gentle owns the capability adequately.
- **MOVE_TO_POLICY** — retain intent as declarative standards / guardrails.
- **MOVE_TO_SKILL** — operational convention belongs in a concise reusable skill/command.
- **MOVE_TO_CI_OR_ORACLE** — deterministic evidence belongs in scripts, CI or small oracles.
- **DELETE** — duplicate, obsolete, harmful or unjustified runtime surface.
- **EXPERIMENT** — value plausible but must be demonstrated against Golden Control.

Default rule: if upstream owns the lifecycle correctly, Atenea does **not** proxy, reproduce or reinterpret it.

## 3. Work order

### Phase 0 — Restore a usable native Gentle path on the VPS

**Priority: immediate.**

Goal: allow productive PROMueve work again without waiting for the whole architectural reconciliation.

Tasks:

- [x] Preserve the current installed Atenea-era environment for evidence; do not destructively clean it yet.
- [x] Turn the validated clean-room recipe into a durable, reproducible native Gentle installation/profile on the VPS.
- [x] Keep the recovery path free of Atenea runtime bridges, custom reviewers and historical RDD adapters.
- [x] Configure NaN exactly through its supported Pi provider contract.
- [x] Verify `gentle-ai doctor`.
- [x] Re-run the Golden Control canary with correct stdin handling.
- [x] Run one bounded real PROMueve task before declaring the path operational.
- [x] Record exact global vs repo-local state used by the operational path.
- [x] Keep rollback to the preserved pre-vNext environment until the real-project canary passes.

Exit criterion:

> A normal PROMueve repo can use Pi + native Gentle + NaN reliably, with native delegation, tests and RDD, without depending on Atenea runtime glue.

**Qualified 2026-09-21.** Evidence and reviewer-routing diagnosis: [`P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`](./P0_NATIVE_GENTLE_QUALIFICATION_20260921.md).

Operational note: real PROMueve review exposed a NaN `reasoning_only_stream` truncation frame that is not valid JSON under the OpenAI-compatible stream. The same exact reviewer prompt failed on GLM default, DeepSeek default and GLM medium, but passed on GLM low. The native `native-nan` profile therefore pins review roles to `thinking: low` until the upstream/provider behavior changes.

### Phase 1 — Functional audit of Atenea as it exists today

Audit by **capability and original intent**, not merely by file.

For each capability record:

1. original problem;
2. current Atenea implementation;
3. upstream owner/capability today;
4. current dependencies and hidden state;
5. token / latency / operational cost where material;
6. failure surface introduced;
7. decision using the classification vocabulary above;
8. evidence required before deletion or retention.

Mandatory audit surfaces:

- [ ] `AGENTS.md`
- [ ] `CODING_STANDARDS.md`
- [ ] current policies / contracts
- [ ] `.pi/`
- [ ] `.agents/`
- [ ] extensions
- [ ] patches
- [ ] launchers / run recipes
- [ ] Herdr usage
- [ ] bridges / relays / consent machinery
- [ ] reviewer continuation machinery
- [ ] custom reviewer assumptions
- [ ] RDD adapters / compatibility layers
- [ ] worker spawn/delegation logic
- [ ] model routing and profiles
- [ ] global vs repo-local configuration
- [ ] Engram integration
- [ ] mode detection / environment variables
- [ ] oracles and deterministic checks
- [ ] pre-publication / promotion gates
- [ ] work-unit composition policy
- [ ] PR / publication workflow
- [ ] historical patches/workarounds that upstream now supersedes

Special scrutiny: anything that intercepts, reconstructs or proxies Gentle lifecycle authority.

Deliverable:

`docs/vnext/ATENEA_CAPABILITY_RECONCILIATION.md`

**Completed 2026-09-21.** P1 found that the durable value is concentrated in policy/standards/oracles, while historical relay/intercom/runtime glue is removable or upstream-owned. The committed-range ASSESS bridge remains a temporary compatibility exception pending upstream resolution.

### Phase 2 — Define the Atenea Minimal Core

Do not implement until Phase 1 is substantially complete.

Candidate shape:

```text
Atenea Minimal Core
├── policies / coding standards
├── repo hygiene / engineering guardrails
├── small operational skills
├── deterministic oracles
├── conformance tests
└── reproducible configuration
```

Explicit non-goal unless new evidence proves otherwise:

- custom lifecycle controller;
- second RDD implementation;
- custom reviewer authority;
- worker supervisor that duplicates Gentle;
- model-authored relay of provider envelopes;
- hidden state machine outside upstream authority.

Questions to resolve:

- [x] Which coding/engineering standards materially improve outputs?
- [x] Which policies belong in `AGENTS.md` vs separate docs?
- [x] Which operations deserve a skill rather than repeated long prompts?
- [x] Which guarantees should be CI instead of agent prose?
- [x] Which evidence can be produced deterministically cheaper than by an LLM?
- [x] What, if anything, must remain global rather than repo-visible?

### Phase 3 — Re-evaluate the pre-Gentle shaping layer

This is intentionally independent from the runtime simplification.

Core distinction to test:

> Preserve **product/intention shaping** only if useful; do not assume Atenea should continue doing **execution decomposition** before Gentle.

Compare at least these variants:

#### A — Native ODD
Human request with sufficient context → Gentle ODD.

#### B — Minimal execution contract
Input contains only:

- outcome;
- user-visible behaviour;
- acceptance criteria;
- constraints;
- non-goals;
- important examples/scenarios;
- TDD policy when applicable.

Gentle owns decomposition and execution.

#### C — Current full Matt/Atenea shaping
Current upstream Matt Pocock shaping → specs/tickets/work-unit preparation → Gentle.

#### D — Native SDD/OpenSpec
Use Gentle's supported OpenSpec/SDD path directly where appropriate, without an Atenea translation layer.

Evaluate separately for:

- [ ] greenfield;
- [ ] small brownfield;
- [ ] large/complex brownfield;
- [ ] materially user-facing work.

Measure:

- correctness;
- acceptance-test performance;
- architectural fit;
- human interventions;
- retries;
- RDD findings/corrections;
- token use by role;
- elapsed time;
- unnecessary artifacts;
- stale/redundant artifacts;
- code churn;
- prompt size;
- whether prior shaping improved decisions or merely constrained Gentle unnecessarily.

Possible outcomes:

- retain Matt only for optional product/domain discovery;
- replace Atenea workcards with a small semantic execution contract;
- use OpenSpec only through Gentle-native SDD;
- keep current shaping only if evidence clearly beats simpler paths;
- remove the pre-Gentle framework if native ODD consistently performs as well or better.

**P3 completed 2026-09-21.** Decision: minimal semantic contract → native Gentle is the default execution-ready seam; native ODD direct is allowed for already-unambiguous work; Matt becomes optional discovery/shaping; OpenSpec remains optional native SDD when durable specs/change history are themselves valuable. Evidence: `docs/vnext/P3_SHAPING_DECISION.md`. Further benchmark repetition was stopped deliberately for cost control.

### Phase 4 — Rebuild positively from Golden Control

Do **not** slim the historical runtime in place.

Start from a fresh native Gentle control and introduce only surviving Atenea capabilities one at a time.

For every addition:

```text
Golden Control PASS
→ add one Atenea capability
→ repeat E2E
→ compare behavior/cost
→ KEEP or reject
```

The canary should continue to verify at minimum:

- provider works;
- primary agent works;
- native delegation fires when appropriate;
- worker succeeds;
- deterministic tests run;
- work-unit commit occurs;
- native review authority is used;
- required reviewer/refuter/validator lifecycle remains provider-owned;
- acknowledgement/burn closes correctly;
- no hidden Atenea lifecycle state appears.

**P4 completed 2026-09-22.** Golden Control and stable-policy treatment both passed their hidden oracle and native review lifecycle through APPROVED → acknowledge-approved → authority burned. `CODING_STANDARDS.md` was proven to be consumed as native system policy without taking lifecycle authority. The versioned `native-nan` profile matches the live runtime, and two deterministic vNext conformance oracles now pass. P4 also removed an invalid residual `commandcode` provider and corrected the `.atl/` hygiene rule to require repo-local ignore. Evidence: `docs/vnext/P4_POSITIVE_REBUILD_QUALIFICATION_20260922.md`.

P4 decision:

- stable policy → KEEP;
- secret-free native profile spec → KEEP;
- deterministic conformance/oracles → KEEP;
- Atenea runtime/review/worker/routing controllers → 0.

### Phase 5 — Operational simplification

Move stable conventions to the cheapest reliable mechanism.

Examples to adjudicate:

- PR preparation → skill/command;
- tests/lint/typecheck/build → deterministic checks / CI;
- repo cleanliness → deterministic oracle;
- changed-path classification → git-based oracle;
- schema validation → deterministic oracle;
- secrets scanning → deterministic scanner;
- public API change detection → AST/static analysis where justified;
- PR readiness → deterministic checklist;
- GitHub-side invariant enforcement → GitHub Actions where appropriate.

Principle:

> An LLM should not repeatedly reason about something we can prove cheaply and reproducibly.

But deterministic oracles produce **evidence**, not Gentle review authority.

**P5 completed 2026-09-22.** Superseded runtime relays, bridge patches, effective-mode fixtures and historical runtime/profile checks were moved under `historical/runtime/` (~3,150 lines) rather than left on the active path. Native doctor, profile/authority oracles and Pi+Gentle+NaN smoke all remained green. Evidence: `docs/vnext/P5_OPERATIONAL_SIMPLIFICATION_20260922.md`.

### Phase 6 — Final VPS cleanup and reproducible reinstall

Only after the minimal stack is known and qualified.

- [x] Inventory current global state.
- [x] Inventory repo-local state.
- [x] Preserve secrets without copying obsolete configuration.
- [x] Preserve only required historical evidence.
- [x] Remove obsolete Pi/Gentle/Atenea extensions and hidden profiles.
- [x] Remove stale global `AGENTS.md` / config only after confirming intended replacements.
- [x] Reinstall Pi / Gentle / NaN from supported upstream paths.
- [x] Add the qualified Atenea Minimal Core.
- [x] Run doctor + Golden Control.
- [x] Run real PROMueve qualification.
- [x] Document the exact installation recipe.
- [x] Verify another fresh clone can reproduce it.

Exit criterion:

> A clean machine or clean HOME can recreate the productive stack from documented upstream installs plus the small versioned Atenea layer.

**VPS cutover completed and E2E-qualified 2026-09-22.** Ordinary `pi` is now the normal productive path. The final canary validated native worker enforcement, deterministic verification, native RDD consent, real `review-reliability`, APPROVED, `acknowledge-approved`, and `authority: burned`. Engram stale-process cleanup and the current-memory canary also passed.

Evidence: `docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md`.

**P6 completed 2026-09-22.** The exact supported installation recipe is versioned, NaN provider/model desired state is secret-free, the Minimal Core is present, and a fresh clone independently passed both conformance oracles, Pi/Gentle version checks, doctor 8/8, NaN auth and a real `P6_FRESH_CLONE_OK` native smoke. No old HOME, Atenea runtime plugin, bridge or session state was copied.

### Phase 7 — Promote vNext and archive runtime history

After qualification:

- [x] Rewrite `START_HERE.md` around native Gentle + thin Atenea.
- [x] Replace/supersede the current harness contract where appropriate.
- [x] Rewrite installation/runbook docs.
- [x] Mark historical bridges, recipes and evidence explicitly historical.
- [x] Preserve decision provenance without leaving obsolete runtime code active.
- [x] Supersede historical workarounds in current authority; keep still-valid upstream defect trackers open until upstream fixes land.
- [x] Promote vNext from working program to current repository authority.

**P7 completed 2026-09-22.** Promotion commit `fb73f25` was reproduced from a fresh clone: current front door present, both conformance oracles PASS, Pi 0.87.0 PASS, Gentle AI 3.4.0 PASS, doctor 8/8 healthy, NaN auth ready, historical boundaries present, and native smoke `P7_FINAL_CLONE_OK`. P0–P7 reconciliation is complete. Remote push/PR/merge remain a separate publication decision.

## 4. Golden rules during reconciliation

1. **Upstream-first is operational, not rhetorical.**
2. Do not add a bridge until a real unsupported seam is demonstrated.
3. Do not preserve code because it was expensive to build.
4. Preserve evidence and decisions even when runtime code dies.
5. Global hidden configuration is suspect; prefer repo-visible declarative state.
6. No Atenea component may invent or proxy Gentle review authority without explicit new evidence.
7. Every retained runtime capability must show measurable value over native Gentle.
8. Every experiment starts from a known clean control.
9. Avoid long procedural prompts when a skill, command, schema or deterministic check can encode the invariant.
10. Human merge authority remains human.

## 5. Immediate next actions

Ordered strictly:

- [x] **P0.1** Convert the current successful clean-room setup into a durable native VPS profile for PROMueve.
- [x] **P0.2** Qualify that profile with one real bounded PROMueve task.
- [x] **P1.1** Inventory all active Atenea runtime/config surfaces, including global/local interactions.
- [x] **P1.2** Build the capability reconciliation matrix.
- [x] **P1.3** Identify obvious upstream replacements/deletions without deleting yet.
- [x] **P2.1** Draft the Minimal Core candidate.
- [x] **P3.1** Design and close the shaping A/B/C/D experiment.
- [ ] **P4.1** Start a fresh control and reintroduce only surviving capabilities.
- [ ] **P5.1** Move stable procedural conventions to skills/oracles/CI.
- [x] **P6.1** Perform final VPS cleanup/reinstall and native E2E cutover qualification.
- [ ] **P7.1** Promote vNext documentation and archive superseded runtime surfaces.

## 6. Decision on repository strategy

**Keep the existing `b32majus/Atenea` repository.**

Reasons:

- the historical evidence is valuable for adjudicating why capabilities existed;
- current docs already distinguish current authority from historical evidence;
- a new repository would split provenance and make comparisons harder;
- vNext can be developed cleanly on an isolated branch and promoted only after qualification.

A separate repository should be reconsidered only if the end product ceases to be meaningfully Atenea (for example, if it becomes a generic independent product rather than this project's policy/capability layer).

Until then, the project is not “Atenea reborn elsewhere”; it is **Atenea becoming smaller, more upstream-native and more durable**.


### P2 hardening addendum — 2026-09-21

The stable policy surfaces were refined after comparing the adopted Matt skills, current OpenSpec behavior and installed Gentle 3.3 behavior:

- `CODING_STANDARDS.md` is now methodology-agnostic and adds three durable horizontal rules: validate/canonicalize once at boundaries; make behavior-affecting configuration/environment reproducible; treat basic UI accessibility/operability as correctness when UI exists.
- `AGENTS_VNEXT_CANDIDATE.md` now defines authority precedence and tool ownership explicitly. It is policy, not product spec/tool-state/runtime manual.
- Matt's generated `## Agent skills` block is treated as upstream-owned metadata while relevant Matt skills survive.
- current OpenSpec no longer needs an Atenea/OpenSpec marker block in project `AGENTS.md`;
- installed Gentle 3.3 does not own/write project `AGENTS.md`;
- version/provider-specific details moved to `docs/vnext/CURRENT_COMPATIBILITY.md` rather than polluting stable policy.
