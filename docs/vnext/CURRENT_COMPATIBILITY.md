# Atenea vNext — Current Compatibility Notes

Status: **CURRENT TRANSITIONAL EVIDENCE**

Date: 2026-09-27

This document contains version/provider-specific exceptions that are intentionally **not** part of stable `AGENTS.md` policy.

## Current qualified OpenCode baseline

```text
OpenCode          1.18.32
Gentle AI         3.7.0
NaN               baseline provider
Context7          installed; disabled by default
Engram            installed; disabled by default in ordinary OpenCode
Pi / Gentle Pi    rollback/provenance only
serve lifecycle   QUALIFIED — two-ticket zero-touch PASS
```

Current OpenCode-specific seams:

- **One-shot startup defect:** clean `opencode run` can stall after `message=init` and before session creation. Unattended one-shot use remains blocked.
- **Qualified transport:** use a fresh `opencode serve` host per bounded writer/review role, one HTTP session per host, then tear it down. The final two-ticket train passed 2/2 terminal Gentle burns, 2/2 Git checkpoints and `HUMAN_TOUCH_AFTER_LAUNCH=0`.
- **Version-probe seam:** Gentle 3.7 uses a hard 3-second `opencode --version` probe. The qualified version-neutral shim answers only exact `--version` / `-v` from real npm package metadata and delegates every other invocation unchanged to the single real OpenCode binary.
- **Freshness boundary:** qualification does not authorize a persistent global OpenCode daemon or long-lived model context.
- **Skill registry:** the managed OpenCode skill-registry plugin remains installed. A/B measurement found small startup overhead/jitter, but removing it did not explain the historical 20–30 second one-shot `init` hang. Do not patch/remove it by default merely for startup optimization.
- `~/.config/opencode/skills` is the active global runtime skill root; legacy shared `~/.agents/skills` is not part of the ordinary global surface.
- Context7 and Engram remain available but disabled by default.
- The generated Gentle persona + mandatory Engram protocol is not part of the minimal global OpenCode `AGENTS.md`.
- **Role/context routing:** ordinary tickets use `atenea-writer`; Gentle review continuation uses `atenea-review-host`. Tool surfaces remain C-074. Model routing is C-075: `production-volume` is the default; `complex` activates only on concrete material complexity. There is no universal per-ticket profile ceremony and no normal-path Sol fallback.
- Historical OpenCode `1.18.10` + Gentle 3.7 zero-touch evidence remains valid for what it tested; it does not authorize reinstalling or pinning 1.18.10.
- Historical OpenCode V2 `2.0.18` plugin-transport failure remains provenance only.

Current qualification evidence: `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md`, `docs/OPENCODE_LEAN_CONTEXT_QUALIFICATION_20260927.md`, and `docs/OPENCODE_MODEL_ROUTING_QUALIFICATION_20260927.md`. Historical V1 lifecycle evidence: `docs/OPENCODE_V1_ZERO_TOUCH_RECOVERY_EVIDENCE_20260927.md`.

The Pi/Gentle-Pi compatibility sections below apply **only when deliberately using that rollback/provenance surface**; they do not define current OpenCode preflight or routing.

## 1. Historical Pi reviewer routing after native multi-model support

The original exact-prompt qualification reproduced failures at default/medium reasoning on the NaN review path and a pass with GLM low. The upstream trackers remain open:

- Gentle Shell #1259;
- Gentle Shell #1167;
- Pi #9718.

In the Pi/Gentle-Pi epoch, on 2026-09-24 the operator explicitly moved the then-active profile away from the qualified all-GLM/low mitigation without a pre-activation canary. The historical routing was:

```text
review-readability  → openai-codex/gpt-6-luna · high
review-reliability  → openai-codex/gpt-6-luna · xhigh
review-resilience   → openai-codex/gpt-6-luna · xhigh
review-risk         → openai-codex/gpt-6-sol  · high
review-refuter      → openai-codex/gpt-6-luna · max
review-validator    → openai-codex/gpt-6-luna · max
```

Historical Pi operational rule: do not treat the multi-provider reviewer routes in `native-balanced`, `native-v4-heavy` or `native-economy` as evidence that #1259/#1167/#9718 are fixed. If real execution exposes reviewer-output or reasoning-budget failure, preserve the active lineage/evidence and make any move to `native-nan` only as an explicit decision at a valid lifecycle boundary. The rollback profile preserves the previously qualified `nan/glm5.3-flash · low` reviewer mapping.

### Profile store / pin resolution incident — 2026-09-25

PROMueve Nexus #403 Attempt 0 exposed a local configuration drift: `~/.pi/gentle-ai/profiles.json` had profile mappings but lacked Gentle Pi 3.7.0's required `kind: gentle-pi.agent_model_profiles` / `version: 1` envelope. Gentle rejected the store, the repo declaration could not resolve `native-v4-heavy`, and the worker silently inherited globally materialized `native-balanced` routing. The attempt stopped before commit and is not V4-heavy quality evidence.

Current Atenea conformance now checks the native store envelope and can resolve local/repository pin precedence for a target worktree. Candidate first-use, material routing/profile changes, profile-semantics runtime upgrades and routing incidents additionally require a real read-only child probe before writer authority.

Gentle Pi pins route subagents only. They do **not** move the parent/orchestrator model. A profile whose desired orchestrator differs from the current Pi session must select/verify that orchestrator separately through Pi's native model surface.

Evidence: `docs/vnext/NATIVE_V4_HEAVY_PROMUEVE_CANARY_20260925.md`.

## 2. Committed-range ASSESS

Tracker:

- Gentle AI #4791 — still open on 2026-09-23.

The defect was reproduced again on Gentle Shell 3.7.0 / Gentle AI 3.7.0: native Gentle AI returned `medium / executable_change` for a committed executable candidate, while the Pi/Gentle facade returned typed `risk=unassessable`, `schema-incompatible`, zero changed paths and `candidate=null`.

Pre-ASSESS hygiene:

```text
repo-local .atl/ ignore already present
→ intentional candidate only
→ no unrelated runtime artifacts
→ native gentle_review assess
```

Production rule:

```text
ASSESS returns native risk tier
→ follow native plan

ASSESS returns risk=unassessable + typed fail-closed plan
→ follow that plan
→ writer verification when requested
→ independent verifier when requested
→ never claim a lower tier

no typed safe continuation / ambiguous state
→ STOP
```

Never synthesize START or restore the historical Atenea ASSESS bridge.

## 3. Post-burn selectorless STATUS

Tracker:

- Gentle AI #4771 — still open on 2026-09-23.

Terminal rule:

```text
review.acknowledge-approved
→ status=closed
→ authority=burned
→ burn_evidence
```

That response is terminal evidence. Do not call selectorless STATUS merely to re-prove burn, and do not repeat review on the unchanged candidate because that redundant STATUS fails.

## 4. Custom NaN auth-check observation

After the 2026-09-23 stable update, NaN credentials were moved from the provider registry to Pi's supported local credential store.

Current:

```bash
pi auth check --provider nan --json
```

returns `invalid_state` for this custom provider even though:

- `pi auth print-api-key --provider nan` resolves the stored credential;
- Pi without extensions completes a real NaN model call;
- Pi with normal Gentle extensions completes a real NaN model call.

No matching upstream Pi issue was found during this pass.

Operational rule:

> Do not use `pi auth check` alone as the NaN health gate.

Use non-printing credential resolution plus the real bounded model smokes in `NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`.

## 5. Engram

Engram remains auxiliary and is currently 2.1.0. The 2.1 release is core-only; Pi `gentle-engram` remains 0.1.14.

Post-maintenance evidence:

- `gentle-ai doctor`: Engram MCP reachable;
- `engram doctor`: 9/9 OK, 0 warnings after cleanup;
- `engram test --quick`: PASS, including concurrent local writes;
- real Pi `mem_search` memory canary: `ENGRAM_AFTER_CLEANUP_OK`;
- production store reduced to `hermes-agent`, `symphonia` and canonical `atenea` session history;
- no similar-name project groups remain.

Disposable projects removed from the production store: `baseline`, `atenea-assess-370-20260923`, `dist`, `gentle-final-canary-20260921` and `tmp`.

### Canary isolation

Do not let disposable canaries write to the production Engram store.

`ENGRAM_DATA_DIR` alone is **not sufficient** when a production `engram serve` already owns the default HTTP endpoint, because `gentle-engram` native `mem_*` tools use the HTTP server path.

Qualified pattern:

```text
temporary ENGRAM_DATA_DIR
→ separate engram serve on a non-production port
→ ENGRAM_URL points Pi at that temporary server
→ normal repo/project identity inside the isolated store
```

This pattern passed `ENGRAM_ISOLATION_OK`: the temporary store received its own observation/session data and the production store remained unchanged.

Never treat Engram as product/spec/review authority.

## 6. pi-web-access lazy-activation fallback

On globally installed Pi 0.87.1, `pi-web-access` 0.31.0 may warn that dynamic tool activation requires Pi 0.86.1 or newer and fall back to eager web-tool availability. Upstream issue `nicobailon/pi-web-access#428` identifies this as a package-resolution false negative; PR #429 contains the upstream fix. The same defect was confirmed against Pi 0.87.0, so it is not a 0.87.1 regression.

Operational rule: accept the functional eager fallback and track upstream. Do not add Atenea symlinks, loader patches or forked extension code to force lazy activation.

## 7. Gentle skill-registry recursive watcher

Tracker:

- Gentle Shell #962 — still open on 2026-09-23.

Observed on both Pi 0.87.0 and 0.87.1 with Gentle Shell 3.7.0: the Gentle skill-registry extension recursively watches user skill roots, including `~/.codex/skills`. When Codex replaces its `.system` skill subtree, Node can emit asynchronous `ENOENT` / `scandir` from the recursive `FSWatcher`. The extension does not attach an `error` listener, so Pi can exit via `uncaughtException`.

Current mitigation:

```bash
export GENTLE_PI_NO_SKILL_REGISTRY=1
```

This is a supported Gentle switch. Skills remain available normally; only startup refresh/watch of `.atl/skill-registry.md` is disabled. Do not patch installed Gentle source or disable Codex skills. Existing Pi processes must be restarted to inherit the environment override.

Retire only after a released Gentle version fixes #962 and a watched-subtree replacement canary passes. Evidence: `docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md`.

## 8. Stable-update discipline

The 2026-09-23 maintenance pass established the current rule:

```text
official owner updater
→ sync/reconcile managed assets
→ doctor
→ deterministic conformance
→ real bounded smokes
→ update Atenea desired-state/evidence
```

Do not update a managed component by manually overwriting its binary/package when its owner exposes a supported updater.

## 9. Historical qualification evidence

P0–P7 documents that mention Gentle Shell 3.3.0 / Gentle AI 3.4.0 remain correct historical evidence for the versions actually tested then.

Do not rewrite them to newer versions.

The current baseline is defined by:

- `README.md`;
- `docs/START_HERE.md`;
- `docs/QUALIFICATION.md`;
- this document;
- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`;
- `docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md`;
- `docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md`.

## 10. Native skill ownership and Pi duplicate discovery

Trackers:

- Gentle Shell #807 — shared plain skills and package-prefixed Gentle skills can coexist in Pi discovery;
- Gentle Shell #369 / PR #1320 — upstream registry/resolution ownership is still evolving;
- Gentle Shell #962 — recursive registry watcher crash, separately mitigated as above.

Current owner surfaces are intentionally runtime-specific:

```text
~/.agents/skills            → shared/cross-runtime skills
~/.config/opencode/skills   → OpenCode assets managed/referenced by Gentle AI
~/.codex/skills             → Codex assets managed/referenced by Gentle AI/Codex
gentle-pi package skills    → Pi-specific Gentle variants (`gentle-ai-*`)
repository .agents/skills   → project-local authority
```

Do not collapse these directories by filesystem cleanup alone. `gentle-ai sync` was used on 2026-09-24 as the ownership oracle for OpenCode/Codex managed assets. Graphify remained live and was migrated with its own supported installer to the shared skill root.

Pi uses its native exact `-<path>` force-exclusion to suppress the nine safe shared Gentle duplicates listed in `config/native-gentle/pi-skill-policy.json`. A fresh deterministic Pi resource-loader resolution confirmed that their plain forms disappear while the `gentle-ai-*` package variants remain available.

Two exceptions remain intentionally dual-visible: `issue-creation` and `work-unit-commits`. Their current Gentle AI and Gentle Shell upstream content is functionally divergent, so suppressing the shared form could remove behavior. This is tracked compatibility debt, not forgotten cleanup.

Evidence and rollback locations: `docs/vnext/NATIVE_SKILL_RECONCILIATION_20260924.md`.
