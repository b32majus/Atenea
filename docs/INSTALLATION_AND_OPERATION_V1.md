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
→ docs/START_HERE.md
→ docs/ATENEA_HARNESS_CONTRACT_V1.md
→ docs/CURRENT_DECISIONS.md
```

Do not start from historical Stage files.

## 2. Current qualified reference stack

The field-proven reference environment as of 2026-09-03/04 is:

```text
Pi          0.84.4
Herdr       0.8.2
OpenCode    1.18.27
Gentle AI   2.5.0 production stable
Engram      1.20.0 stable reference
```

The real operator-triggered Atenea E2E was proven with Pi → Herdr → headless OpenCode → Gentle and normal non-force publication.

These versions are **reference evidence**, not a claim that Atenea must forever pin them. A newer upstream runtime must be treated according to current compatibility/qualification evidence, not silently assumed equivalent.

## 3. Install upstream runtimes, not Atenea replacements

Install Pi, Herdr, OpenCode and Gentle AI using their current official upstream instructions.

Atenea MUST NOT introduce a custom bootstrapper merely to wrap upstream installation.

The Gentle/OpenCode configuration must expose the managed Gentle integration used by the accepted worker path. Historical qualification installed Gentle globally for OpenCode using the upstream `full-gentleman` preset after the workspace-scope surface proved undiscoverable in that runtime generation. The historical command/evidence is preserved in `docs/STAGE2_INSTALL.md`; verify current Gentle help/upstream documentation before repeating an old command verbatim on a new machine.

The current conceptual requirement is:

```text
OpenCode
  gentle-orchestrator available
  managed Gentle review/RDD integration available
  Engram/current managed dependencies healthy where required

Gentle AI
  production stable binary installed
  doctor healthy
  RDD effective for the selected execution environment
```

Do not install CodeGraph, Graphify, OpenSpec, Impeccable or any other optional shaping/repository-intelligence tool simply because Atenea can use it. Those are selected during pre-`EXECUTION_READY` shaping only when the target project warrants them.

## 4. Verify the environment

Before trusting a fresh machine/environment, verify the actual effective runtime rather than trusting installation narration.

At minimum:

```bash
pi --version
herdr --version
opencode --version
gentle-ai --version
gentle-ai doctor
```

Then verify OpenCode can see the managed Gentle worker surface using the currently supported OpenCode diagnostic commands. Historical qualification used surfaces such as:

```text
opencode agent list
opencode mcp list
opencode debug agent gentle-orchestrator --pure
opencode debug skill --pure
```

Exact diagnostic syntax can evolve upstream; the invariant is the result:

```text
GENTLE_ORCHESTRATOR_EFFECTIVE=YES
GENTLE_RUNTIME_HEALTHY=YES
REQUIRED_MANAGED_GENTLE_SURFACES=DISCOVERABLE
```

Do not “fix” a failed verification by copying old generated files, moving managed assets between undocumented directories or adding an Atenea wrapper. Diagnose upstream first.

## 5. RDD and the current zero-touch boundary

Gentle native RDD is part of the accepted final-candidate lifecycle.

Production Gentle `2.5.0` remains the production stable operational target, but released negotiated `review-integration/v2` still lacks the supported provider-owned unattended selector required for the proven zero-human-touch OpenCode route.

Current truth:

```text
STABLE_GENTLE_ZERO_TOUCH_CAPABILITY=PROVEN
RELEASED_V2_PROVIDER_UNATTENDED_SELECTOR=NOT_AVAILABLE
NEGOTIATED_V2_UNATTENDED_PROVIDER_CANARY=PASS
REAL_OPERATOR_TRIGGERED_ATENEA_E2E=PASS
PRODUCTION_GENTLE_MODIFIED=NO
UPSTREAM_REPLACEMENT_STILL_REQUIRED=YES
```

The bounded downstream provider canary is documented in `docs/GENTLE25_NEGOTIATED_V2_ZERO_TOUCH_CANARY.md`. Its environment selector is experimental evidence, not an upstream API and not a permanent production fork.

Do not restore zero-touch by stripping `relay`, injecting `granted`, reconstructing START or adding a consent database/controller.

## 6. Matt / OpenSpec / Repository Intelligence are not installation prerequisites

Atenea's shaping choices are selected by the human + Cora/planning surface before autonomous execution:

```text
GREENFIELD
→ Matt Pocock upstream shaping

SMALL_BROWNFIELD
→ repo-native understanding
→ OpenSpec delta-first when useful

LARGE_CODE_BROWNFIELD
→ optional Repository Intelligence if justified
→ OpenSpec/repo-native shaping

MIXED_CORPUS_BROWNFIELD
→ optional mixed-corpus Repository Intelligence if justified
→ OpenSpec/repo-native shaping
```

Repository Intelligence candidates such as CodeGraph or Graphify are not yet mandatory Atenea dependencies. Do not auto-install them globally as part of Atenea setup.

See `docs/START_HERE.md`.

## 7. Normal human start path

Once a work item is explicitly `EXECUTION_READY`, the human uses the normal operator interface:

```text
1. Open/use Herdr in the target repository context.
2. Start Pi interactively.
3. Give one bounded Atenea execution prompt.
4. Pi performs the bounded preflight and supervises the worker.
5. Pi launches/reuses headless OpenCode through Herdr.
6. OpenCode + Gentle owns implementation, verification and Gentle lifecycle.
7. Pi reconciles publication/frontier and returns the factual final report.
8. Final merge remains a human boundary unless separately authorized.
```

Use `docs/OPERATOR_RUNBOOK_V1.md` for the exact operator guidance and prompt templates.

## 8. What a healthy Atenea run should preserve

```text
PI_ROLE=NON_IMPLEMENTING_SUPERVISOR
HERDR_ROLE=PROCESS_SESSION_SUBSTRATE
OPENCODE_TRANSPORT=HEADLESS_RUN
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
→ Pi supervises Herdr → headless OpenCode + Gentle

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
