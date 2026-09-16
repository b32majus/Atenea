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
| **Machine/global** | Pi, Herdr, Gentle Pi, Gentle AI and supported runtime/provider configuration. `pi-intercom` may remain for explicitly selected alternate/rollback flows but is not a normal GP2.7 dependency. |
| **Atenea clone/checkpoint** | current harness contract, GP2.7 runbook/train recipe, qualification evidence, Promotion Review, hygiene policy and deterministic checkers. Historical spawn-recipe/RDD-relay/reviewer-continuation assets remain only for rollback/regression/provenance. |
| **Target repo/worktree** | product/repository authority, `AGENTS.md`, coding standards, specs/issues, tests/oracles, delivery branch/worktree and any repo-local shaping skills/config selected before `EXECUTION_READY`. |

Atenea never promotes machine-global defaults into product authority. A pinned run uses one exact Atenea checkpoint; historical relay/reviewer assets must not be mixed into the current GP2.7 path unless an explicit rollback/reproduction boundary selects them.

## Adopted unattended runtime — 2026-09-15 GP2.7 promotion

The normal unattended path requires Pi + Herdr + Gentle Pi `2.7.0` with package-paired Gentle AI `2.9.1`. `pi-intercom` and the Atenea RDD relay may remain installed for historical/rollback use but are not dependencies of the normal hybrid-native path.

Current adopted machine epoch:

```text
Pi          0.85.1
Herdr       0.9.0
Gentle Pi   2.7.0
Gentle AI   2.9.1 package-paired
```

The 2026-09-15 two-ticket qualification replaced the old plain-supervisor/fresh-outer-worker topology with one persistent visible Gentle-Pi parent and fresh package-owned implementation children per newly selected ticket. The parent owns integration, deterministic verification, hybrid-native RDD, acknowledgement/burn, checkpoint reconciliation and frontier progression.

## 2. Current qualified reference stack

The adopted unattended reference epoch is:

```text
Pi          0.85.1
Herdr       0.9.0
Gentle Pi   2.7.0
Gentle AI   2.9.1
```

Qualification evidence: `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`. Historical GP2.4/2.5 and OpenCode evidence remains valid for old epochs but does not define current normal execution.

### 2.1 Current operational routing profile

Routing is replaceable operational configuration, not Atenea architecture. Read routes by current role:

| Role | Current route/evidence | Operational implication |
|---|---|---|
| Persistent Gentle-Pi parent / train coordinator | `opencode-go/glm-5.3-flash` `high` — `FIELD_PROVEN` | current visible train owner |
| Native `gentle-ai-worker` | `opencode-go/glm-5.3-flash` `high` — `ADOPTED_QUALIFIED` | fresh implementation child per newly selected ticket in normal trains |
| Native `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` `high` — qualified | optional independent verifier |
| `review-readability` | `openai-codex/gpt-5.6-luna` `high` — A/B validated | readability calibration |
| `review-reliability` | `opencode-go/deepseek-v4.1-flash` `high` — A/B validated | material behavior/contract review |
| `review-resilience` | `opencode-go/deepseek-v4.1-flash` `high` — A/B validated | failure/recovery review |
| `review-risk` | `opencode-go/deepseek-v4.1-flash` `high` — A/B validated | security/authorization/data-risk review |
| Native refuter / targeted validator | inherit/provider route | no current Atenea pin |
| Promotion Review | explicit literal per run | no fixed default; Sol escalation-only |

The historical outer Atenea supervisor route `opencode-go/deepseek-v4.1-flash` `medium` is retained only as rollback/provenance evidence because the separate supervisor is no longer part of the normal topology.

Gentle Pi 2.7 uses `~/.pi/gentle-ai/models.json` as supported global routing authority for discoverable Gentle roles. Canonical routing entries and effective `~/.pi/agent/subagents.json` must agree. Project-local overrides outrank global configuration and must be detected before pinned work rather than silently accepted.

Canonical current machine intent:

```json
{
  "gentle-ai-worker": { "model": "opencode-go/glm-5.3-flash", "thinking": "high" },
  "gentle-ai-verify": { "model": "openai-codex/gpt-5.6-luna", "thinking": "high" },
  "review-readability": { "model": "openai-codex/gpt-5.6-luna", "thinking": "high" },
  "review-reliability": { "model": "opencode-go/deepseek-v4.1-flash", "thinking": "high" },
  "review-resilience": { "model": "opencode-go/deepseek-v4.1-flash", "thinking": "high" },
  "review-risk": { "model": "opencode-go/deepseek-v4.1-flash", "thinking": "high" },
  "review-refuter": {},
  "review-validator": {}
}
```

## 3. Install upstream runtimes, not Atenea replacements

Install through upstream-supported surfaces. Atenea does not add a bootstrapper.

Current GP2.7 upgrade surface:

```bash
pi install npm:gentle-pi@2.7.0
# restart/new Pi sessions use the new package
gentle-ai sync --agent pi
```

Gentle Pi 2.7 packages Gentle AI 2.9.1 locally. The global `gentle-ai` command should also be a current stable 2.9.1 installation when used for machine-level diagnostics or direct supported operations. Verify upstream release/checksum rather than copying a binary out of a historical sandbox.

Current conceptual requirement:

```text
Persistent visible Pi + Gentle Pi 2.7 parent
  package-local Gentle AI 2.9.1 executable present + integrity-valid
  package-owned native Agent profiles available
  current model routing effective
  native RDD mode enabled
  Herdr integration available for visible process/session operation

Fresh native implementation child per new ticket
  package-owned gentle-ai-worker
  bounded handoff + return path to parent

Hybrid-native review
  parent Bash subprocess fd0/fd1/fd2 non-TTY
  native package-local review START with no consent override
  same-lineage Gentle Pi STATUS adoption
  provider reviewer/correction transitions
  acknowledgement/burn
```

OpenCode and pi-intercom may remain installed for attended/alternate/historical reproduction but are not prerequisites of the normal GP2.7 unattended path.

Historical benchmark/qualification directories with older GP/GAI versions are frozen evidence. **Do not mass-upgrade them.** “Update the VPS runtime” means the active machine-global/user operational installation and any actual current repo-local override, not rewriting evidence sandboxes.

A 2026-09-15 scan found no non-evidence project-local `.pi/settings.json` pinning `gentle-pi`; therefore the machine-global promotion covers current normal repositories unless a later target introduces an explicit override.

## 4. Verify the environment

Before trusting a fresh/promoted environment, verify actual effective runtime:

```bash
pi --version
herdr --version
gentle-ai --version
gentle-ai doctor
pi list
```

Also verify the installed `gentle-pi` package version and its package-local `v2.9.1/gentle-ai` executable/integrity manifest. Current expected result:

```text
PI_VERSION=0.85.1
HERDR_VERSION=0.9.0
GENTLE_PI_VERSION=2.7.0
GENTLE_AI_GLOBAL_VERSION=2.9.1
GENTLE_AI_PACKAGE_LOCAL_VERSION=2.9.1
GENTLE_AI_PACKAGE_LOCAL_INTEGRITY=PASS
GENTLE_RUNTIME_HEALTHY=YES
NATIVE_GENTLE_AGENT_PROFILES=AVAILABLE
CURRENT_ROUTING_EFFECTIVE=YES
RDD_MODE_EFFECTIVE=ON
```

Operational promotion on the current VPS on 2026-09-15 produced `gentle-ai doctor: 8 passed / 0 failed / 0 warnings`; package-local binary SHA256 was `8bd0161c51ed07e77801a92d13bdcb82ff483c273d4a182904534057d4054d97`. Global routing hashes were unchanged by the promotion.

Do not “fix” a failed verification by copying old generated files, moving managed assets between undocumented directories or adding an Atenea wrapper. Diagnose upstream first.

## 5. RDD and current zero-touch boundary

Current truth:

```text
GENTLE_PI_2_7_HYBRID_NATIVE_PATH=ADOPTED
GENTLE_AI_2_9_1_PACKAGE_PAIRED=REQUIRED
PERSISTENT_VISIBLE_PARENT=REQUIRED_NORMAL_TRAIN
FRESH_NATIVE_CHILD_PER_NEW_TICKET=REQUIRED_NORMAL_MULTI_TICKET_RECIPE
NATIVE_GENTLE_EXACT_CANDIDATE_RDD=REQUIRED
NATIVE_NO_TTY_START=REQUIRED
GENTLE_PI_SAME_LINEAGE_ADOPTION=REQUIRED
PROVIDER_BINDINGS=OPAQUE
ACKNOWLEDGEMENT_BURN=REQUIRED
VISIBLE_REVIEW_CONSENT_DIALOG=FAIL_CLOSED
STANDING_SESSION_PERMISSION=ATTENDED_INTERACTIVE_ONLY
EXTERNAL_SUPERVISOR=HISTORICAL_ROLLBACK_NOT_NORMAL
ATENEA_RDD_RELAY=HISTORICAL_ROLLBACK_NOT_NORMAL
NORMAL_NON_FORCE_PUBLICATION=ALLOWED_BY_REPOSITORY_POLICY
FINAL_MERGE=HUMAN_BOUNDARY
```

Do not manufacture zero-touch by stripping/rewriting consent, injecting `granted`, calling internal permission APIs, faking package-child FD identity or key-driving the host dialog. The adopted bridge is upstream composition: native no-TTY START → exact returned lineage → Gentle Pi STATUS adoption → provider review → APPROVED → burn.

Current mechanics: `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md`.

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

Once a work item or bounded train is explicitly `EXECUTION_READY`, the human uses the current GP2.7 operator interface:

```text
1. Open/use Herdr in the intended repository/worktree context.
2. Human or Cora/DC mechanically starts one visible Pi + Gentle Pi 2.7 parent on GLM 5.3 Flash high unless current routing authority says otherwise.
3. Give one bounded Atenea execution/train prompt.
4. The persistent parent performs bounded authority/runtime/oracle preflight and selects the eligible frontier.
5. For each newly selected ticket it launches a fresh package-owned `gentle-ai-worker` child, sequentially by default.
6. The child implements and returns bounded evidence; the parent reconciles the exact diff and runs deterministic verification.
7. For every mutating candidate the parent runs package-local Gentle AI 2.9.1 native START through a non-TTY Bash subprocess with no consent override, then adopts that exact lineage through Gentle Pi STATUS and completes provider review/correction, APPROVED and acknowledgement/burn.
8. After the authorized checkpoint the same parent freshly rediscovers the compatible frontier, launches a new child, or STOPs when exhausted.
9. Final merge remains a human boundary unless separately authorized.
```

Use `docs/OPERATOR_RUNBOOK_V1.md` and `docs/RUN_RECIPE_GENTLE_PI_27_HYBRID_NATIVE_TRAIN_V1.md` for the exact current operator guidance. The former `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md` is historical rollback/reproduction evidence only.

## 8. What a healthy Atenea run should preserve

```text
PERSISTENT_PARENT_VISIBLE_IN_HERDR=YES
PARENT_RUNTIME=PI_0_85_1_PLUS_GENTLE_PI_2_7_0
PACKAGE_LOCAL_GENTLE_AI=2_9_1_INTEGRITY_VALID
PARENT_ROUTE=OPENCODE_GO_GLM_5_3_FLASH_HIGH
FRESH_IMPLEMENTATION_CHILD_PER_NEW_TICKET=YES
MAX_CONCURRENCY_DEFAULT=1
NATIVE_GENTLE_AGENTS=PACKAGE_OWNED
NATIVE_NO_TTY_START=REQUIRED
CONSENT_OVERRIDE_FLAG=NONE
SAME_LINEAGE_STATUS_ADOPTION=REQUIRED
SECOND_START_SAME_CANDIDATE=FORBIDDEN
PROVIDER_BINDINGS=OPAQUE_EXACT
REVIEW_CONSENT_DIALOGS=0
EXTERNAL_SUPERVISOR=0
ATENEA_RDD_RELAY=0
GENTLE_EXACT_CANDIDATE_RDD=PASS
ACKNOWLEDGEMENT_BURN=PASS
NORMAL_NON_FORCE_PUBLICATION=REPOSITORY_POLICY
AUTO_MERGE=NO
FRONTIER_STOP=PASS
```

Already-authorized ordinary non-force publication should not require a human click when the runtime exposes a safe compliant form. Material ambiguity, destructive recovery, changed authority, an unexpected review-consent dialog or final merge remain genuine human/STOP boundaries.

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
→ one visible persistent Pi + Gentle Pi 2.7 parent in Herdr → fresh package-owned implementation child per new ticket

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
