# Atenea — Installation and Operation v1

Status: **CURRENT OPERATOR ENVIRONMENT GUIDE**

This file explains how to provision and verify the current Atenea environment without creating a bespoke Atenea installer.

Atenea is a contract over upstream tools. Installation therefore means:

1. clone/read the Atenea authority repository;
2. install the required upstream runtimes through their supported upstream installation surfaces;
3. verify that the effective runtime matches the qualified Atenea ownership model;
4. start work through the documented human → Herdr → Pi interface.

If a fast-changing upstream installation command differs from historical Atenea evidence, prefer the current upstream-supported command and then re-run the Atenea verification gates below. Historical Stage files are evidence, not evergreen package-manager documentation.

## 1. Clone Atenea

```bash
git clone https://github.com/b32majus/Atenea.git
cd Atenea
```

Then read:

```text
README.md
→ docs/NEWCOMER_QUICKSTART_V1.md
→ docs/START_HERE.md
→ docs/ATENEA_HARNESS_CONTRACT_V1.md
→ docs/CURRENT_DECISIONS.md
```

Do not start from historical Stage files.

### 1.1 Three configuration scopes

Keep these ownership surfaces separate:

| Scope | Current responsibility |
|---|---|
| **Machine/global** | Pi, Herdr, Gentle Pi, Gentle AI, pi-intercom and supported runtime/provider configuration. |
| **Atenea clone/checkpoint** | versioned harness contract, runbook, spawn recipe, RDD relay, reviewer continuation, Promotion Review and deterministic checkers. |
| **Target repo/worktree** | product/repository authority, `AGENTS.md`, coding standards, specs/issues, tests/oracles, delivery branch/worktree and any repo-local shaping skills/config selected before `EXECUTION_READY`. |

Atenea never promotes machine-global defaults into product authority. A pinned run uses one exact Atenea checkpoint and must not mix relay/reviewer/runtime assets across Atenea SHAs.

## Adopted unattended runtime — 2026-09-05 cutover

The normal unattended path now requires Pi + Herdr + pi-intercom + Gentle Pi 2.4 / Gentle AI. OpenCode is not a required component of that path; keep it only for attended/alternate use or historical reproduction.

Current field epoch used to qualify the cutover:

```text
Pi          0.85.1
Herdr       0.8.2
Gentle Pi   2.4.0
Gentle AI   2.6.0
pi-intercom 0.13.0
```

Provision the worker so Gentle Pi can discover normally, and use `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md` for pinned worker creation. Routing/model literals are verified operational parameters, not architectural pins.

## 2. Current qualified reference stack

The **adopted unattended reference epoch** is:

```text
Pi          0.85.1
Herdr       0.8.2
Gentle Pi   2.4.0
Gentle AI   2.6.0
pi-intercom 0.13.0
```

PROMueve T4 plus the final T5 qualification/frontier reconciliation qualified this path and the human adoption decision was integrated in PR #47. Treat these versions as field evidence, not permanent architectural pins; newer upstream versions require compatibility evidence before silently replacing them.

The earlier 2026-09-03/04 stack remains **historical qualification evidence only**:

```text
Pi          0.84.4
Herdr       0.8.2
OpenCode    1.18.27
Gentle AI   2.5.0
Engram      1.20.0
```

That epoch proved Pi → Herdr → headless OpenCode → Gentle, but OpenCode is no longer a required dependency of the adopted unattended path. Preserve the evidence; do not recover it as current policy. See `docs/GENTLE_PI_24_REPLACEMENT_FIELD_EVIDENCE_20260905.md` for the replacement qualification.

### 2.1 Current operational routing profile

Routing is replaceable operational configuration, not Atenea architecture. For pinned work the planning/launch surface resolves literal routes before the supervisor starts; the supervisor never discovers/substitutes another model after rejection.

Current routing must be read by **role**, not by process name alone. The durable evidence/status table is `docs/ROUTING_EVIDENCE_LEDGER_V1.md`. Summary:

| Role | Current evidence | Operational implication |
|---|---|---|
| Atenea Pi supervisor | V4 Flash `medium` — field-proven | residual train control only; not the Gentle coordinator |
| Gentle parent / Gentleman coordinator | V4 Flash `high` — field-proven collapsed Golden; GLM 5.3 Flash `high` — A/B-validated candidate | do not call GLM evidence “supervisor” evidence |
| Separate builder/writer | unqualified / not required | no mandatory delegated writer in current Golden path |
| Native Gentle lens/refuter/validator | current model routing unqualified | old subagent pins do not govern the native 2.4 relay |
| Promotion Review | explicit literal per run | no fixed model and no silent fallback |

Human/Cora shaping has no Atenea model pin because it sits outside the autonomous runtime. Do not use the machine-global Pi default as an implicit pinned-run route.

`pi-subagents`, delegated `gentle-ai-worker`, Luna-specific writer routing and a context-budget guard are not required by the adopted path and are not installed/enabled by Atenea policy. The Golden E2E train passed without them. Qualify them separately only if a real efficiency/context gap later warrants a routing change.

## 3. Install upstream runtimes, not Atenea replacements

Install Pi, Herdr, Gentle Pi / Gentle AI and pi-intercom using their current supported upstream installation surfaces. OpenCode may remain installed for attended/alternate use or historical reproduction, but it is not a prerequisite of the adopted unattended path.

Atenea MUST NOT introduce a custom bootstrapper merely to wrap upstream installation.

The current conceptual requirement is:

```text
plain Pi supervisor
  Gentle Pi OFF
  pi-intercom explicitly available
  explicit Pi --name + run-scoped PI_INTERCOM_SCOPE_ID

Pi + Gentle Pi worker
  Gentle Pi discoverable/healthy
  Gentle native review/RDD effective
  explicit Pi --name in the same intercom scope
  versioned Atenea RDD relay extension loaded for pinned unattended work

Gentle AI
  compatible binary installed
  doctor/runtime healthy
```

Historical OpenCode/Gentle installation commands are preserved in `docs/STAGE2_INSTALL.md`; they are not the current installation recipe.

Do not install CodeGraph, Graphify, OpenSpec, Impeccable or any other optional shaping/repository-intelligence tool simply because Atenea can use it. Those are selected during pre-`EXECUTION_READY` shaping only when the target project warrants them.

## 4. Verify the environment

Before trusting a fresh machine/environment, verify the actual effective runtime rather than trusting installation narration.

At minimum:

```bash
pi --version
herdr --version
gentle-ai --version
gentle-ai doctor
```

Then verify the effective Pi worker can load Gentle Pi and pi-intercom, and that the pinned Atenea recipe can supply explicit supervisor/worker names, one shared intercom scope, the versioned RDD relay extension and the reviewer continuation contract through Pi `--append-system-prompt`. Exact upstream diagnostic syntax can evolve; the invariant is the result:

```text
PI_SUPERVISOR_PLAIN=YES
PI_INTERCOM_EFFECTIVE=YES
PI_GENTLE_WORKER_EFFECTIVE=YES
GENTLE_RUNTIME_HEALTHY=YES
NAMED_SCOPED_INTERCOM_IDENTITY=YES
ATENEA_RDD_RELAY_EXTENSION_LOADABLE=YES
PI_APPEND_SYSTEM_PROMPT_FILE=YES
ATENEA_REVIEWER_CONTINUATION_CHECK=PASS
```

If OpenCode is intentionally used as an alternate/attended path, verify that installation separately; its diagnostics are not a gate for the normal unattended route.

Do not “fix” a failed verification by copying old generated files, moving managed assets between undocumented directories or adding an Atenea wrapper. Diagnose upstream first.

## 5. RDD and the current zero-touch boundary

Gentle native RDD is part of the accepted final-candidate lifecycle. The adopted worker is Pi + Gentle Pi; the outer supervisor executes zero Gentle lifecycle commands.

Current truth:

```text
GENTLE_PI_2_4_UNATTENDED_PATH=ADOPTED
NATIVE_GENTLE_EXACT_CANDIDATE_RDD=REQUIRED
SUPERVISOR_GENTLE_COMMANDS=0
BOUNDED_CONSENT_DECISION=SUPERVISOR_ONLY_WHEN_ALREADY_AUTHORIZED
PROVIDER_ANSWER_CONSENT_AND_ACK_BURN=WORKER_OWNED
T5_REVIEWER_CONTINUATION_CONTRACT=REQUIRED_FOR_PINNED_RUNS
REVIEWER_BINDINGS=OPAQUE_PROVIDER_STATE
ACKNOWLEDGED_REVIEWER_CAPTURE_IN_FLIGHT=NOT_A_STOP_CONDITION
NORMAL_NON_FORCE_PUBLICATION=ALLOWED_BY_REPOSITORY_POLICY
FINAL_MERGE=HUMAN_BOUNDARY
```

For pinned unattended work, supervisor and worker have explicit Pi names inside one run-scoped pi-intercom scope. `extensions/atenea-rdd-consent-relay.mjs` transports the exact provider-produced consent payload mechanically through pi-intercom's public outbox; the model must not reconstruct or reserialize that envelope. The same Atenea checkpoint root supplies `docs/GENTLE_REVIEWER_CONTINUATION_V1.md`, loaded by Pi from the first token. Any name/scope/payload identity mismatch fails closed.

The older OpenCode negotiated-v2 canary remains historical evidence in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`; it is not a current operational gate.

Do not manufacture zero-touch by stripping `relay`, injecting `granted`, reconstructing provider START/envelopes, or adding a consent database/controller.

## 6. Matt / OpenSpec / Repository Intelligence are shaping choices, not unattended runtime prerequisites

Atenea's shaping choices are selected by the human + Cora/planning surface before autonomous execution. Matt is the normal greenfield upstream authoring ecosystem; it does **not** need to be loaded into the adopted unattended Pi/Gentle-Pi worker.

When a target repo will use Matt with Pi, install the complete upstream set **project-locally** instead of copying selected skill files. Verified current surface (`skills` 1.5.23, 2026-09-06):

```bash
cd <target-repo>
npx --yes skills add mattpocock/skills --skill '*' --agent pi --yes --full-depth
```

Current expected result is 37 skills under `.pi/skills/` plus `skills-lock.json`. This was reverified in an isolated temporary repo during WO #63. If the upstream CLI changes, use its current supported Pi surface and re-verify the result instead of preserving obsolete installation glue. Historical Atenea `.agents/skills/` paths are provenance from the earlier OpenCode-oriented setup, not the target-Pi installation recipe.

Run upstream `setup-matt-pocock-skills` once in a target repo before first use of the other Matt engineering skills when that repo is adopting the ecosystem. It configures the repo's issue-tracker, triage-label and domain-doc conventions. Existing configured brownfields do not rerun it by ritual.

```text
GREENFIELD
→ full Matt repo-local setup for Pi when selected
→ setup-matt-pocock-skills once
→ product/domain shaping / grill-with-docs when useful
→ to-spec
→ independent spec/readiness challenge when warranted
→ to-tickets
→ ticket readiness

SMALL_BROWNFIELD
→ repo-native understanding
→ Matt task-triggered methods and/or OpenSpec delta-first only when useful

LARGE_CODE_BROWNFIELD
→ optional Repository Intelligence if justified
→ repo-native/OpenSpec/Matt delta shaping as needed

MIXED_CORPUS_BROWNFIELD
→ optional mixed-corpus Repository Intelligence if justified
→ repo-native/OpenSpec/Matt delta shaping as needed
```

Task-triggered Matt methods (`domain-modeling`, `codebase-design`, `tdd`, `diagnosing-bugs`, `code-review`) follow their own upstream triggers; Atenea does not copy their internals or force them into every run.

Repository Intelligence candidates such as CodeGraph or Graphify are not mandatory Atenea dependencies. Do not auto-install them globally as part of Atenea setup.

See `docs/NEWCOMER_QUICKSTART_V1.md` and `docs/START_HERE.md`.

## 7. Normal human start path

Once a work item is explicitly `EXECUTION_READY`, the human uses the normal operator interface:

```text
1. Open/use Herdr in the target repository context.
2. Human or Cora/DC mechanically starts the plain Pi supervisor with its pre-resolved model, explicit Pi name, run-scoped intercom scope and pi-intercom enabled; Gentle Pi remains OFF in the supervisor.
3. Give one bounded Atenea execution/train prompt.
4. Pi performs the bounded preflight and consumes the pinned spawn parameters unchanged.
5. Pi launches one separate visible, explicitly named/scoped Pi + Gentle Pi worker through Herdr using `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`.
6. The worker owns implementation, verification, native Gentle RDD, provider transitions, acknowledgement/burn and authorized normal non-force publication; the versioned Atenea relay handles exact bounded-consent transport.
7. Pi reconciles publication/frontier and returns the factual final report or launches a fresh compatible worker when the authorized train permits it.
8. Final merge remains a human boundary unless separately authorized.
```

Use `docs/OPERATOR_RUNBOOK_V1.md` for the exact operator guidance and prompt templates.

## 8. What a healthy Atenea run should preserve

```text
PI_ROLE=NON_IMPLEMENTING_SUPERVISOR
HERDR_ROLE=PROCESS_SESSION_SUBSTRATE
SUPERVISOR_PI_NAME=EXPLICIT
WORKER_PI_NAME=EXPLICIT
PI_INTERCOM_SCOPE=RUN_SCOPED_AND_SHARED
WORKER_RUNTIME=PI_PLUS_GENTLE_PI
ATENEA_RDD_RELAY=VERSIONED_AND_MECHANICAL
PI_DIRECT_GENTLE_LIFECYCLE_CALLS=0
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
NORMAL_NON_FORCE_PUBLICATION=PASS
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

Already-authorized ordinary non-force publication should not require a human click when the runtime exposes a safe compliant form. Material ambiguity, destructive recovery, changed authority or final merge remain genuine human/STOP boundaries.

## 9. Do not revive historical Atenea/KairOS machinery

A fresh environment must not recover execution machinery from old KairOS/Post-SAS launchers, queues, ticket drivers, role controllers or historical worktrees.

Current authority lives in the current Atenea repository. If the current contract is insufficient, STOP and update the current authority rather than importing historical glue.

## 10. Fast validation for a new Cora/operator

A fresh Cora should be able to answer these questions after reading the front door:

```text
What is Atenea?
→ a contract/policy layer over upstream tools, not a custom orchestrator

Who chooses greenfield/brownfield shaping?
→ human + Cora/planning surface before EXECUTION_READY

Who executes after EXECUTION_READY?
→ plain Pi supervisor → Herdr → separate named/scoped Pi + Gentle Pi worker

Who owns final review authority?
→ Gentle native exact-candidate RDD lifecycle

Who owns merge?
→ repository/human policy; no Atenea auto-merge

Where do I start?
→ README.md → docs/START_HERE.md

How do I run an executable item?
→ docs/OPERATOR_RUNBOOK_V1.md
```

If those answers require historical archaeology, the documentation front door has regressed and should be repaired.
