# Atenea

Atenea is an **upstream-first policy, configuration and conformance layer** for autonomous engineering work.

It is no longer a custom execution harness.

Atenea is not a second engineering/review harness around Gentle. Gentle owns candidate review/correction/burn. Atenea now also owns one thin deterministic outer train supervisor for fresh-process launch, exact bounded consent transport, checkpoint reconciliation and next-or-STOP. It keeps the durable layer that remains valuable above upstream:

- repository and engineering policy;
- phase-scoped shaping guidance;
- secret-free provider/profile desired state;
- deterministic conformance evidence;
- publication/Git guardrails;
- architectural and qualification provenance.

## Current runtime state

Qualified from the clean rebuild and two-ticket zero-touch train on 2026-09-27:

```text
thin deterministic Atenea supervisor
→ fresh OpenCode host per bounded ticket/phase
→ one bounded OpenCode session with direct `build`
→ Gentle AI 3.7.0 lifecycle
→ deterministic project verification
→ Gentle review / correction / acknowledge-burn
→ durable checkpoint
→ fresh host/context for next ticket or STOP
```

The current qualified runtime uses OpenCode `1.18.32` and Gentle AI `3.7.0`. The old `1.18.10` zero-touch train remains valid historical evidence, but it is no longer a version pin. One-shot `opencode run` remains blocked for unattended use because a clean `1.18.32` HOME reproduces an intermittent pre-session `init` hang. Fresh `opencode serve` hosts for bounded writer/review roles passed a two-ticket zero-touch train with 2/2 terminal Gentle burns, 2/2 Git checkpoints and `HUMAN_TOUCH_AFTER_LAUNCH=0`.

Context7 and Engram remain installed capabilities but are disabled by default in ordinary OpenCode execution. The global OpenCode `AGENTS.md` is intentionally small; Gentle persona/Engram protocol is not restored as unconditional global context.

## Start here

For a fresh agent or human:

1. `AGENTS.md` — stable repository policy.
2. `docs/START_HERE.md` — current front door.
3. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md` — minimal ordinary preflight and prompt contract.
4. `CODING_STANDARDS.md` — horizontal engineering quality.
5. Current product/task/ADR authority for the work being executed.
6. `docs/vnext/CURRENT_COMPATIBILITY.md` only when runtime/provider exceptions matter.

Provisioning or rebuilding the stack:

- `docs/vnext/OPENCODE_SERVE_RUNTIME_RECIPE_20260927.md`.

Current vNext architecture/evidence:

- `docs/vnext/ATENEA_MINIMAL_CORE_V1.md`;
- `docs/vnext/P4_POSITIVE_REBUILD_QUALIFICATION_20260922.md`;
- `docs/vnext/P5_OPERATIONAL_SIMPLIFICATION_20260922.md`;
- `docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md`;
- `docs/vnext/P7_PROMOTION_20260922.md`;
- `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.
- `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md` — current zero-touch runtime qualification.
- `docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md` — retained Pi rollback provenance.
- `docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md`.
- `docs/vnext/NATIVE_V4_HEAVY_PROMUEVE_CANARY_20260925.md` — first positive `native-v4-heavy` field canary + routing-conformance learning.

## Execution rule

If durable executable authority already exists, do not rerun shaping by ritual. Use the minimal preflight in `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`, then:

```text
accepted bounded ticket/train authority
→ thin deterministic supervisor
→ fresh direct OpenCode writer
→ deterministic verification
→ native Gentle review/correction lifecycle
→ APPROVED + acknowledge-approved + authority burned
→ durable checkpoint
→ fresh context for next compatible ticket or STOP
→ publication boundary remains human/repository-owned
```

Do not place `gentle-orchestrator` beneath the Atenea supervisor as another ticket parent. Do not restore a long-lived model parent merely to carry train continuity.

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
- `config/native-gentle/opencode-runtime-policy.json` — current runtime/skills/MCP/compatibility policy.

Pi-era profile and skill-policy files remain rollback/provenance surfaces. Ordinary OpenCode tickets use the runtime default model route; alternate routing is an explicit override/experiment, not a mandatory per-ticket selection step.

After runtime changes/rebuilds/incidents, validate current authority with:

```bash
node tools/check-opencode-runtime-policy.mjs
node tools/check-vnext-authority.mjs
gentle-ai doctor
```

Credentials never belong in Git.

## Current compatibility exceptions

See `docs/vnext/CURRENT_COMPATIBILITY.md`.

Short version:

- OpenCode `1.18.32` + Gentle AI `3.7.0` + fresh `serve` writer/review hosts is the current qualified runtime; historical `1.18.10` and V2 `2.0.18` results remain evidence only;
- one-shot `opencode run` is blocked for unattended promotion while the clean-state pre-session `init` hang remains reproducible;
- Gentle-managed runtime skills live in `~/.config/opencode/skills`; legacy shared `~/.agents/skills` is not active globally;
- Context7 and Engram are disabled by default and enabled only when the task needs them;
- ordinary direct-build tickets use the runtime default model route; alternate routes require an explicit override/experiment and bounded evidence;
- `.atl/` must already be ignored in candidate repositories.

## Historical material

Pre-vNext runtime machinery is preserved under `historical/runtime/` and in Git history for provenance/regression archaeology.

Old Stage documents, old run recipes and old field evidence do not become current merely because they remain in the repository.

Use current front-door documents first.

## Publication boundary

Native review approval is not publication authority.

No automatic merge, force-push or destructive history recovery. Follow the target repository policy and explicit human publication authority.
