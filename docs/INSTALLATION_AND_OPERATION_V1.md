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
| **Machine/global** | Pi, Herdr, Gentle Pi, Gentle AI and supported runtime/provider configuration. `pi-intercom` may remain for explicitly selected historical/rollback flows but is not a normal GP3.3 one-touch dependency. |
| **Atenea clone/checkpoint** | current harness contract, GP3.3 one-touch runbook/train recipe, qualification evidence, Promotion Review, hygiene policy and deterministic checkers. Historical spawn-recipe/RDD-relay/reviewer-continuation assets remain only for rollback/regression/provenance. |
| **Target repo/worktree** | product/repository authority, `AGENTS.md`, coding standards, specs/issues, tests/oracles, delivery branch/worktree and any repo-local shaping skills/config selected before `EXECUTION_READY`. |

Atenea never promotes machine-global defaults into product authority. A pinned run uses one exact Atenea checkpoint; historical relay/reviewer/GP2.7 zero-touch assets must not be mixed into the current GP3.3 one-touch path unless an explicit rollback/reproduction boundary selects them.

## Adopted one-touch runtime — 2026-09-20 GP3.3 promotion

The normal path is Pi + Herdr + Gentle Pi `3.3.0` with package-paired Gentle AI `3.4.0`. It is **one-touch**: the first eligible review requires `Review and allow this session`; later fresh validated grants in that live session/canonical repository require no second consent interaction.

## 2. Current qualified reference stack

```text
Pi current  0.86.1
Pi Q11      0.86.0 exact qualification baseline
Herdr       0.9.0
Gentle Pi   3.3.0
Gentle AI   3.4.0 package-paired
Persona     gentleman
```

### 2.1 Current operational routing profile

```text
Pi default                    nan/deepseek-v4-flash · medium
parent                        nan/glm5.3-flash · high
gentle-ai-worker              nan/glm5.3-flash · high
gentle-ai-verify              openai-codex/gpt-5.6-luna · high
review-readability            openai-codex/gpt-5.6-luna · high
review-reliability            openai-codex/gpt-5.6-luna · high
review-resilience             nan/deepseek-v4-flash · high
review-risk                   nan/glm5.3-flash · high
review-refuter                nan/deepseek-v4-flash · high
review-validator              openai-codex/gpt-5.6-luna · high
```

Global routing authority is `~/.pi/gentle-ai/models.json`, `~/.pi/gentle-ai/profiles.json` and `~/.pi/agent/subagents.json`. Active profile: `atenea-one-touch`. It deliberately omits `orchestrator`; the train parent is launched explicitly on GLM high.

The repo declares `.pi/gentle-ai/profile.json`. Each machine must have the named profile installed.

NaN client capability authority is `docs/NAN_PROVIDER_CAPABILITIES_V1.md`. Current Pi/OpenCode per-answer ceilings are `32768` for both `nan/deepseek-v4-flash` and `nan/glm5.3-flash`. Pi must declare DeepSeek `supportsReasoningEffort=false`; GLM must declare effective `low`/`medium`/`high`/`max`.

## 3. Install upstream runtimes, not Atenea replacements

```bash
pi install npm:gentle-pi@3.3.0
./tools/apply-gentle-330-atenea-host-bridge.sh
```

Gentle Pi 3.3 packages Gentle AI 3.4.0 under `.gentle-ai/v3.4.0/`. The second command applies the current qualified, version/hash-guarded GP3.3 host compatibility shim plus the GAI3.4 assess-timing bridge; both remain narrow compatibility shims and the command refuses unknown bytes instead of patching them.

## 4. Verify the environment

```bash
pi --version
node -p 'require("/home/hermes/.pi/agent/npm/node_modules/gentle-pi/package.json").version'
/home/hermes/.pi/agent/npm/node_modules/gentle-pi/.gentle-ai/v3.4.0/gentle-ai --version
pi auth check --model nan/deepseek-v4-flash --json --no-refresh
pi auth check --model nan/glm5.3-flash --json --no-refresh
pi auth check --model openai-codex/gpt-5.6-luna --json --no-refresh
node tools/check-nan-runtime-config.mjs
./tools/apply-gentle-330-atenea-host-bridge.sh --check
```

Expected: current Pi `0.86.1`, `3.3.0`, `gentle-ai 3.4.0`, V4/GLM/Luna auth ready, `ATENEA_NAN_RUNTIME_CONFIG_CHECK=PASS`, and `PASS: qualified Atenea GP3.3 host + assess bridges present`. The strong single-acceptance Q11 baseline used Pi `0.86.0`; keep that distinction until a normal 0.86.1 train supplies parity evidence.

## 5. RDD and current one-touch boundary

```text
CURRENT_MODE=ONE_TOUCH
FIRST_REVIEW_SESSION_GRANT=HUMAN
LATER_SAME_SESSION_TOUCHES=ZERO_EXPECTED
EXPLICIT_REVIEW_ROLE_ROUTING=REQUIRED
ACKNOWLEDGEMENT_BURN=REQUIRED
```

Never manufacture the session grant through prompt prose, `granted` injection, internal APIs, fake child identity or RPA. Reload preserves permission; new/resume/fork/quit/process restart/revoke ends it.

Current mechanics: `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

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

Once work is `EXECUTION_READY`:

```text
1. Open/use Herdr in the intended repository/worktree.
2. Start one visible Pi + Gentle Pi 3.3 parent explicitly on nan/glm5.3-flash high.
3. Give one bounded authorized work item/train prompt.
4. Parent validates current external authority/runtime/profile and selects only authorized work.
5. Gentle Shell/ODD owns internal classification, decomposition, bounded delegation, verification and work-unit commits.
6. On the first eligible review only, human selects “Review and allow this session”.
7. Parent follows the exact provider-issued reviewer/refuter/validator operations through APPROVED + acknowledgement/burn.
8. At the external work-unit/frontier boundary, re-read repository/tracker authority; continue only with already-authorized work or STOP.
9. Final merge remains human unless separately authorized.
```

Later reviews in the same healthy live Pi session/canonical repository do not require a second consent touch. A restart/new/resume/fork/quit/revoke creates a new one-touch boundary.

Use `docs/OPERATOR_RUNBOOK_V1.md` and `docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md`.

## 8. What a healthy Atenea run should preserve

```text
PERSISTENT_PARENT_VISIBLE_IN_HERDR=YES
PARENT_RUNTIME=PI_0_86_1_PLUS_GENTLE_PI_3_3_0
PACKAGE_LOCAL_GENTLE_AI=3_4_0
PARENT_ROUTE=NAN_GLM5_3_FLASH_HIGH
DEFAULT_PI_ROUTE=NAN_DEEPSEEK_V4_FLASH_MEDIUM
GENTLE_WORKER_ROUTE=NAN_GLM5_3_FLASH_HIGH
GENTLE_VERIFY_READABILITY_RELIABILITY_VALIDATOR=OPENAI_CODEX_GPT_5_6_LUNA_HIGH
GENTLE_RISK=NAN_GLM5_3_FLASH_HIGH
GENTLE_RESILIENCE_REFUTER=NAN_DEEPSEEK_V4_FLASH_HIGH
NAN_DEEPSEEK_OUTPUT_CEILING=32768
NAN_GLM_OUTPUT_CEILING=32768
DEEPSEEK_REASONING_EFFORT_EFFECTIVE=NO
ODD_INTERNAL_MICRO_ORCHESTRATION=UPSTREAM_OWNED
FRESH_CHILD_PER_EXTERNAL_TICKET=NOT_REQUIRED_BY_ATENEA
MAX_CONCURRENCY_DEFAULT=1
QUALIFIED_GP33_HOST_BRIDGE=YES
FIRST_REVIEW_SESSION_GRANT=HUMAN_ONE_TOUCH
ADDITIONAL_SAME_SESSION_REVIEW_CONSENT_TOUCHES=0_EXPECTED
REVIEW_ROLE_ROUTING=EXPLICIT
ACKNOWLEDGEMENT_BURN=REQUIRED
HERDR_RPA=0
EXTERNAL_SUPERVISOR=0
ATENEA_RDD_RELAY=0
FINAL_MERGE=HUMAN_BOUNDARY
```

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
→ one visible persistent Pi + Gentle Pi 3.3 parent in Herdr → ODD-owned internal tasking/delegation inside externally authorized work

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
