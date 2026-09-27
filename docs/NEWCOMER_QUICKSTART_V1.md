# Atenea Newcomer Quickstart

Status: **SUPERSEDED QUICKSTART — ROLLBACK/PROVENANCE**

Current entry: `docs/START_HERE.md`. The Pi-era quickstart below is retained as provenance.

Atenea vNext is simple by design.

## Mental model

```text
product authority
→ repository policy
→ native Pi/Gentle execution
→ deterministic evidence
→ human publication boundary
```

Atenea is the policy/config/evidence layer. It is not the runtime controller.

## Read these first

1. `README.md`
2. `AGENTS.md`
3. `docs/START_HERE.md`
4. `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md` when executing a planned ticket/train
5. `CODING_STANDARDS.md`

Only then read task-specific specs/ADRs/issues.

## To execute accepted work

Resolve composition, explicitly select the ticket/train route (`native-balanced`, `native-v4-heavy` or eligible experimental `native-economy`), then launch:

```bash
pi
```

Use Gentle's native profile/pin surface and confirm the intended route before the first writer edit. Candidate/changed/incident routing also requires the policy's read-only child probe. Pins route subagents, not the session orchestrator. Native Gentle owns workers, verify, RDD and burn.

## To shape genuinely open work

Use the smallest useful shaping path.

Matt skills: optional discovery/shaping.

OpenSpec: optional native SDD.

Do not rerun shaping when executable authority already exists.

## To verify the Atenea environment

```bash
opencode --version
# expected productive runtime: 1.18.10
gentle-ai doctor
node tools/check-opencode-runtime-policy.mjs
node tools/check-vnext-authority.mjs
```

## Current productive runtime

- OpenCode 1.18.10 — pinned compatibility baseline for Gentle AI 3.7 immutable review;
- Gentle AI 3.7.0;
- NaN provider for current writer/lifecycle qualification;
- one Gentle-managed OpenCode skill root; shared `~/.agents/skills` is not part of the productive runtime;
- Context7 and Engram MCP integrations installed but disabled by default;
- thin deterministic Atenea train supervisor;
- fresh OpenCode context per ticket / bounded lifecycle continuation;
- Pi 0.87.1 + Gentle Shell 3.7.0 remain installed rollback/historical capability, not the normal productive entry.

Writer-model routing for nontrivial real work remains under focused qualification (C-071); the former Pi profile catalog is provenance/rollback evidence, not current OpenCode routing authority.

## Reinstall/reproduce

Read `docs/vnext/OPENCODE_ZERO_TOUCH_RUNTIME_RECIPE_20260927.md`.

## Temporary exceptions

Read `docs/vnext/CURRENT_COMPATIBILITY.md`.

## Reinstall/reproduce

Read `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`.

## Historical material

`historical/runtime/`, Stage docs and old run recipes are provenance only.

They do not define the current execution path.
