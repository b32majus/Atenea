# Atenea Installation and Operation

Status: **CURRENT**

Atenea vNext deliberately keeps installation thin.

## Canonical installation recipe

Use:

`docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260922.md`

That recipe is the authoritative reproducible sequence for:

- Pi 0.87.0;
- Gentle AI 3.4.0;
- stable Gentle/Pi components;
- NaN provider/model registry;
- local credential boundary;
- `native-nan` profile;
- doctor/auth/oracle/smoke validation.

Do not recover current installation steps from historical Stage files or old Gentle train recipes.

## Daily entry

From the target repository/worktree:

```bash
pi
```

Herdr may wrap the process for persistent sessions.

Herdr is operator infrastructure only; no Atenea-specific Herdr review/policy plugin is required.

## Daily preflight

Check only what materially matters:

```bash
git status --short
grep -Fx '.atl/' .gitignore
pi auth check --provider nan
```

For Atenea/runtime maintenance:

```bash
gentle-ai doctor
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
```

## Credentials

Credentials are machine/user-owned state.

Never place API keys in:

- repository files;
- committed desired-state config;
- prompts;
- logs;
- chat.

The versioned NaN provider desired state contains no API key.

## Current routing

Qualified profile: `native-nan`.

The six review roles currently use `nan/glm5.3-flash · thinking=low` as a temporary compatibility mitigation.

See `docs/vnext/CURRENT_COMPATIBILITY.md` for retirement conditions.

## Updating

Do not upgrade Pi/Gentle/provider routing merely because a newer release exists.

For a runtime upgrade:

1. inspect upstream release/issue state;
2. reproduce the current Golden Control;
3. upgrade in an isolated surface;
4. run doctor + profile/authority oracles;
5. run a bounded native lifecycle canary when review semantics changed;
6. update the versioned desired-state/evidence only after qualification.

## Rollback

Pre-cutover backups are evidence/rollback material, not current configuration sources.

Prefer reinstalling the last qualified supported stack from the canonical recipe rather than reviving a dirty HOME.

## Troubleshooting

Start with:

```bash
gentle-ai doctor
pi auth check --provider nan
node tools/check-native-gentle-profile.mjs
```

Then consult `docs/vnext/CURRENT_COMPATIBILITY.md`.

Do not reintroduce historical Atenea runtime bridges as the first response to an upstream defect.
