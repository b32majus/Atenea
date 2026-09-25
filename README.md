# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work.

It is no longer a custom execution harness.

Native Pi + Gentle own exploration, decomposition, workers, verification, work-unit commits, RDD, reviewers, consent and acknowledgement/burn. Atenea keeps only the durable layer that remains valuable above upstream:

- repository and engineering policy;
- phase-scoped shaping guidance;
- secret-free provider/profile desired state;
- deterministic conformance evidence;
- publication/Git guardrails;
- architectural and qualification provenance.

## Current productive stack

Maintenance-qualified 2026-09-23:

```text
Pi 0.87.1
→ gentle-pi / Gentle Shell 3.7.0
→ Gentle AI 3.7.0
→ Engram 2.1.0 / GGA 2.10.1
→ NaN + OpenAI Codex
→ global active profile: native-balanced
→ selectable per-ticket/train: native-balanced | native-v4-heavy | native-economy (experimental)
→ native ODD / workers / verify / RDD
```

Normal entry point:

```bash
pi
```

Herdr may host persistent operator sessions. It is not review or product authority.

## Start here

For a fresh agent or human:

1. `AGENTS.md` — stable repository policy.
2. `docs/START_HERE.md` — decide shape vs execute and enter safely.
3. `CODING_STANDARDS.md` — horizontal engineering quality.
4. Current product/task/ADR authority for the work being executed.
5. `docs/vnext/CURRENT_COMPATIBILITY.md` only when runtime/provider exceptions matter.

Provisioning or rebuilding the stack:

- `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`.

Current vNext architecture/evidence:

- `docs/vnext/ATENEA_MINIMAL_CORE_V1.md`;
- `docs/vnext/P4_POSITIVE_REBUILD_QUALIFICATION_20260922.md`;
- `docs/vnext/P5_OPERATIONAL_SIMPLIFICATION_20260922.md`;
- `docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md`;
- `docs/vnext/P7_PROMOTION_20260922.md`;
- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.
- `docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md`.
- `docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md`.
- `docs/vnext/NATIVE_V4_HEAVY_PROMUEVE_CANARY_20260925.md` — first positive `native-v4-heavy` field canary + routing-conformance learning.

## Execution rule

If durable executable authority already exists, do not rerun shaping by ritual.

Use:

```text
accepted task/spec
→ native Pi/Gentle
→ deterministic verification
→ native RDD when provider/runtime requires it
→ APPROVED
→ acknowledge-approved
→ authority=burned
→ publication boundary remains human/repository-owned
```

Atenea does not recreate that lifecycle.

## Shaping rule

If work is genuinely unshaped, use the smallest adopted shaping path that produces durable executable authority.

Current P3 decision:

- minimal semantic execution contract → native Gentle by default;
- native ODD direct for already-unambiguous work;
- Matt skills optional for discovery/shaping;
- OpenSpec optional native SDD when durable specs/change history add value.

## Desired-state configuration

Versioned, secret-free:

- `config/native-gentle/nan-provider.models.json`;
- `config/native-gentle/native-balanced.profile.json` — global baseline routing;
- `config/native-gentle/native-v4-heavy.profile.json` — positive-field-canary DeepSeek-heavy candidate;
- `config/native-gentle/native-economy.profile.json` — experimental eligibility-gated route;
- `config/native-gentle/native-nan.profile.json` — qualified NaN-only rollback;
- `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md` — explicit per-ticket/train route selection authority.

Validate the live machine against them:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
gentle-ai doctor
gentle-ai update
# For custom NaN auth, prove credential resolution without printing it,
# then run the bounded real smokes from the canonical installation recipe.
```

Credentials never belong in Git.

## Current compatibility exceptions

See `docs/vnext/CURRENT_COMPATIBILITY.md`.

Short version:

- global HOME routing remains `native-balanced`, while each planned ticket/train explicitly selects `native-balanced`, `native-v4-heavy` or eligibility-gated `native-economy` before writer authority;
- `native-v4-heavy` is now a **positive-field-canary candidate** after PROMueve Nexus F3.2/#403; `native-economy` remains experimental after one positive-but-not-equivalent Symphonia canary; `native-nan` is rollback only;
- typed `risk=unassessable` ASSESS follows Gentle's fail-closed plan;
- `acknowledge-approved → authority=burned` is terminal; selectorless STATUS is not required afterward;
- candidate/changed/incident routing requires a real read-only child probe before writer authority; repository/local pins route subagents only and do not move the orchestrator;
- `.atl/` must already be ignored in the repository.

## Historical material

Pre-vNext runtime machinery is preserved under `historical/runtime/` and in Git history for provenance/regression archaeology.

Old Stage documents, old run recipes and old field evidence do not become current merely because they remain in the repository.

Use current front-door documents first.

## Publication boundary

Native review approval is not publication authority.

No automatic merge, force-push or destructive history recovery. Follow the target repository policy and explicit human publication authority.
