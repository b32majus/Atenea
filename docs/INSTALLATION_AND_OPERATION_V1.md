# Atenea Installation and Operation

Status: **CURRENT**

Date: 2026-09-23

Atenea vNext deliberately keeps installation thin and upstream-owned.

## Canonical recipe

Use:

`docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md`

Current maintenance-qualified baseline:

```text
Pi                0.87.1
gentle-pi         3.7.0
Gentle AI         3.7.0
Engram             2.1.0
GGA                2.10.1
providers          NaN + OpenAI Codex
active profile     native-balanced
rollback profile   native-nan
```

Do not recover current installation steps from historical Stage files or old Gentle train recipes.

## Daily entry

From the target repository/worktree:

```bash
pi
```

Herdr may wrap the process for persistent sessions. Herdr is operator infrastructure only; no Atenea-specific Herdr review/policy plugin is required.

## Daily preflight

Check:

```bash
git status --short
grep -Fx '.atl/' .gitignore
gentle-ai doctor
```

When NaN credential health matters, do not rely on the current custom-provider `pi auth check` result alone. Use the credential-resolution + bounded real-smoke procedure in the canonical recipe.

For Atenea/runtime maintenance:

```bash
gentle-ai update
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
```

## Credentials

Credentials are machine/user-owned state.

Never place API keys in repository files, committed desired-state config, prompts, logs or chat.

The versioned NaN provider desired state contains no key. The live NaN credential belongs in Pi's supported local credential store (`~/.pi/agent/auth.json`) or another supported local credential source.

## Current routing

Active profile: `native-balanced` (operator-directed on 2026-09-24, no pre-activation canary).

Qualified rollback profile: `native-nan`.

The active routing intentionally spreads work across GLM 5.3 Flash, DeepSeek V4.1 Flash, GPT-6 Luna and GPT-6 Sol. See `config/native-gentle/native-balanced.profile.json` for the exact per-role mapping.

See `docs/vnext/CURRENT_COMPATIBILITY.md` for retirement conditions.

## Updating

**Use the updater owned by the component. Do not replace managed pieces manually.**

For a stable runtime update:

1. inspect upstream release/issue state;
2. run `gentle-ai update` before mutation;
3. back up behavior-affecting config locally;
4. update Gentle Shell through Pi's package manager;
5. update Gentle AI through the exact supported updater reported for the installation;
6. run `gentle-ai sync --agents pi`;
7. leave Gentle-managed Engram/GGA untouched when the managed update inventory says they are current;
8. run doctor, conformance oracles and real Pi smokes;
9. update Atenea's baseline only after qualification.

Current exact commands/evidence are in the canonical recipe and `docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`.

## Rollback

Pre-update backups are local rollback/evidence material, not current configuration sources.

Prefer reinstalling the last qualified supported stack from the canonical recipe rather than reviving a dirty historical HOME.

## Troubleshooting

Start with:

```bash
gentle-ai update
gentle-ai doctor
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
```

Then consult `docs/vnext/CURRENT_COMPATIBILITY.md`.

If NaN auth appears invalid in `pi auth check`, verify credential resolution without printing it and run the bounded real model smokes before concluding the credential is broken.

Do not reintroduce historical Atenea runtime bridges as the first response to an upstream defect.
