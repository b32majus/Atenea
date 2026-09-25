# Atenea vNext — Native Stack Installation and Stable-Update Recipe

Status: **CURRENT CANONICAL RECIPE**

Qualified: 2026-09-23

Target: Linux x86_64 / Ubuntu-class host.

Current productive versions:

```text
Pi                0.87.1
gentle-pi         3.7.0
Gentle AI         3.7.0
Engram             2.1.0
GGA                2.10.1
providers          NaN + OpenAI Codex
global active profile  native-balanced
selectable profiles     native-balanced | native-v4-heavy | native-economy (experimental)
rollback profile        native-nan
```

This recipe supersedes `NATIVE_STACK_INSTALLATION_RECIPE_20260922.md`.

## 1. Core rule: update through the owner

Do not replace managed binaries/packages manually when an adopted upstream tool exposes a supported installer/updater.

Use this precedence:

1. ask the installed owner for update state/instructions;
2. use the exact supported package/updater surface;
3. synchronize managed assets;
4. validate the real runtime;
5. only then update Atenea's versioned desired state/evidence.

Examples:

- Gentle Shell package → Pi package manager;
- Gentle AI → `gentle-ai update` + the updater it reports for this installation;
- Gentle-managed companion tools → `gentle-ai update/install/sync`;
- Pi itself → its supported package/update mechanism;
- do not overwrite Engram/GGA independently when Gentle already reports the managed version current.

## 2. Before an existing-host update

Record current state:

```bash
pi --version
gentle-ai version
engram version
gga --version
gentle-ai update
gentle-ai doctor
gentle-ai review mode status
```

Back up behavior-affecting local config, not entire historical HOME state:

```text
~/.pi/agent/settings.json
~/.pi/agent/models.json
~/.pi/agent/auth.json          # local secret; backup locally only
~/.pi/gentle-ai/profiles.json
~/.pi/gentle-ai/models.json
~/.gentle-ai/state.json
```

Never commit or paste the auth backup.

## 3. Pi 0.87.1

For a fresh installation:

```bash
npm install -g @earendil-works/pi-coding-agent@0.87.1
pi --version
```

Expected:

```text
0.87.1
```

Do not upgrade Pi as a side effect of a Gentle maintenance change unless Pi itself is intentionally being qualified.

Pi 0.87.1 is the qualified patch baseline. It does not retire Pi #9718; keep the current reviewer compatibility policy until a representative higher-effort reviewer canary passes.

On globally installed Pi, `pi-web-access` 0.31.0 may currently fall back to eager web-tool availability because of upstream issue #428. Do not apply local loader/symlink patches; track the upstream fix (#429).

Gentle Shell #962 is a separate recursive skill-registry watcher crash. Until a released Gentle version fixes it, keep the supported compatibility switch in the interactive shell environment:

```bash
export GENTLE_PI_NO_SKILL_REGISTRY=1
```

This keeps skills available normally and disables only startup refresh/watch of `.atl/skill-registry.md`. A shell/process that was already running before the export must be restarted before relying on the mitigation.

## 4. Gentle Shell 3.7.0

Install/update the Shell package through Pi:

```bash
pi install npm:gentle-pi@3.7.0
```

Verify:

```bash
node -p 'require(process.env.HOME + "/.pi/agent/npm/node_modules/gentle-pi/package.json").version'
```

Expected:

```text
3.7.0
```

### Obsolete ask-user package

Gentle Shell 3.7.0 provides its own `ask_user_question` tool.

If an older installation still contains:

```text
npm:@juicesharp/rpiv-ask-user-question
```

remove it using Pi:

```bash
pi remove npm:@juicesharp/rpiv-ask-user-question
```

Do not delete package directories by hand.

### Independent-repository subagents

Gentle Shell 3.7 supports bounded subagents targeting another Git repository through native `repository_root`. The runtime requires explicit target consent and revalidates repository identity. Use it only when the accepted task actually authorizes work in the second repository; do not add an Atenea cross-repo supervisor.

## 5. Gentle AI 3.7.0

### Existing host

First ask the installed binary:

```bash
gentle-ai update
```

On the 2026-09-23 qualification, the installed Gentle AI update check reported the following official updater for this installation:

```bash
curl -fsSL https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh | bash
```

That installer selected v3.7.0, downloaded the official release artifact, verified its checksum, installed the binary and verified the version.

After update:

```bash
gentle-ai version
gentle-ai sync --agents pi
```

Expected:

```text
gentle-ai 3.7.0
```

If a future `gentle-ai update` prints a different supported updater for the installation, follow the current command it reports rather than copying this historical command blindly.

### Fresh/reproducible install

For an exact-version rebuild, prefer the official v3.7.0 release artifact plus published checksum, then verify `gentle-ai version`.

Do not install an arbitrary moving `latest` without verifying the resulting version against the versioned Atenea baseline.

## 6. Install/reconcile Gentle-managed components

For a fresh supported Pi integration:

```bash
gentle-ai install --agents pi --scope global --channel stable
gentle-ai install --agents pi --components gga --scope global --channel stable
gentle-ai sync --agents pi
```

Then:

```bash
gentle-ai doctor
gentle-ai update
```

### Reconcile native skill ownership

Do not delete OpenCode/Codex skill stores merely because Pi also discovers `~/.agents/skills`; Gentle AI still owns runtime-specific assets there. Use the secret-free desired state in `config/native-gentle/pi-skill-policy.json`.

For Pi, apply native exact force-excludes (`-<absolute shared-skill path>`) for the nine `force_exclude_shared_duplicates` entries. **Do not exclude** `issue-creation` or `work-unit-commits` while they remain listed under `intentional_dual_visibility`. Preserve the #962 environment mitigation.

Validate repository policy with:

```bash
node tools/check-native-gentle-skills.mjs
```

On the qualified VPS, validate the live Pi settings/bundle/stores as well:

```bash
ATENEA_CHECK_LIVE_SKILLS=1 node tools/check-native-gentle-skills.mjs
```

Evidence: `docs/vnext/NATIVE_SKILL_RECONCILIATION_20260924.md`.

At the 2026-09-23 baseline, update inventory should report:

```text
gentle-ai 3.7.0  up to date
engram    2.1.0  up to date
gga       2.10.1 up to date
```

Do not independently replace Engram/GGA merely because a binary download exists if Gentle already owns and reports the current supported component.

For an existing managed installation where `gentle-ai update` reports a newer Engram/GGA, back up state first and use the Gentle-managed upgrade path (`gentle-ai upgrade`) rather than replacing the companion binary manually.

## 7. NaN provider desired state

Versioned provider/model shape:

```text
config/native-gentle/nan-provider.models.json
```

It contains no credential.

Install/copy the desired provider registry into the Pi agent directory as needed.

The live provider entry should not contain a literal `apiKey`.

## 8. NaN credential

Use Pi's supported local credential store:

```text
~/.pi/agent/auth.json
```

or Pi's interactive `/login` flow for the provider.

Documented API-key shape:

```json
{
  "nan": {
    "type": "api_key",
    "key": "<local secret>"
  }
}
```

Permissions:

```bash
chmod 600 "$HOME/.pi/agent/auth.json"
```

Never commit, paste, log or place the key in Atenea desired-state configuration.

### Current custom-provider auth-check caveat

At this baseline, `pi auth check --provider nan --json` returns `invalid_state` despite successful credential resolution and real model calls.

Therefore do not use that command alone as the NaN health gate.

Resolve the credential without printing it:

```bash
pi auth print-api-key --provider nan >/dev/null 2>&1 && echo NAN_CREDENTIAL_OK
```

Then prove availability with a real bounded model smoke.

## 9. Native Gentle profile catalog

Versioned desired state:

```text
config/native-gentle/native-balanced.profile.json
config/native-gentle/native-v4-heavy.profile.json
config/native-gentle/native-economy.profile.json
config/native-gentle/native-nan.profile.json
```

Global HOME active profile remains:

```text
native-balanced
```

Normal ticket/train selection is governed by `docs/EXECUTION_PROFILE_SELECTION_POLICY_V1.md`. Materialize/import the desired profiles through Gentle's supported `/gentle:profiles` surface; use native local/repository pins for per-project **subagent** choices rather than changing unrelated repositories globally. A pin does not move the Pi parent/orchestrator.

The native store must be a Gentle Pi profile-store envelope, not merely an object containing `active` and `profiles`:

```json
{
  "kind": "gentle-pi.agent_model_profiles",
  "version": 1,
  "active": "native-balanced",
  "profiles": {}
}
```

`native-v4-heavy` is a positive-field-canary candidate after PROMueve Nexus F3.2/#403. `native-economy` is experimental/eligibility-gated after one positive Symphonia canary. `native-nan` remains qualified rollback only.

The normal selectable profiles keep Luna/Sol review diversity. The previous all-GLM reviewer `thinking=low` mapping is retained only in `native-nan` as compatibility rollback while the upstream reviewer/output issues in `CURRENT_COMPATIBILITY.md` remain open.

## 10. Deterministic conformance

From an up-to-date Atenea checkout:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
gentle-ai doctor
gentle-ai update
```

When a project/local pin is material, additionally prove what native pin precedence resolves:

```bash
ATENEA_PROFILE_PIN_CWD=/absolute/path/to/worktree \
ATENEA_EXPECT_PROFILE=native-v4-heavy \
node tools/check-native-gentle-profile.mjs
```

Expected output includes `ATENEA_PROFILE_PIN_RESOLUTION=PASS`. For candidate first-use, material routing/profile changes, profile-semantics runtime upgrades or a prior routing incident, this static PASS is still followed by one read-only child probe through Gentle's native subagent path. The probe must match expected provider/model/reasoning before writer authority.

Expected:

```text
ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
ATENEA_VNEXT_AUTHORITY_CHECK=PASS
doctor: 8 passed / 0 failed / 0 warnings
All tools are up to date
```

## 11. Functional smokes

### Pi + NaN without extensions

```bash
pi   --print   --no-session   --no-extensions   --provider nan   --model glm5.3-flash:low   'Reply with exactly PI_PURE_OK and nothing else.'   </dev/null
```

Expected:

```text
PI_PURE_OK
```

### Pi + Gentle + NaN

```bash
pi   --print   --no-session   --provider nan   --model glm5.3-flash:low   'Reply with exactly PI_GENTLE_OK and nothing else.'   </dev/null
```

Expected:

```text
PI_GENTLE_OK
```

Keep explicit `</dev/null` in print-mode remote validation.

## 12. Engram validation

Current stable/managed Engram:

```text
2.1.0
```

First:

```bash
gentle-ai doctor
engram doctor
```

Then, when memory behavior matters, validate a real Pi `mem_search`. After an Engram core upgrade also run `engram test --quick`; the 2.1.0 qualification passed database, concurrent-write and search scenarios.

### Disposable canaries must isolate memory

Do not point temporary `/var/tmp` canaries at the production Engram HTTP server. `ENGRAM_DATA_DIR` alone is not enough if a healthy production `engram serve` is already listening on the default port.

Use a separate temporary store and server, for example:

```bash
ENGRAM_DATA_DIR="$TMP_ENGRAM/data" ENGRAM_PORT=17437 engram serve 17437
# In another process:
ENGRAM_URL=http://127.0.0.1:17437 pi ...
```

Use a free non-production port, preserve normal repository/project identity, stop the temporary server when the canary finishes, and confirm the production `engram projects list` is unchanged. This pattern passed `ENGRAM_ISOLATION_OK` on 2026-09-23.

Clean proven disposable projects with Engram's own `delete project` / `projects prune` commands after taking a consistent backup; do not edit SQLite rows manually.

## 13. Review compatibility after maintenance

Before changing reviewer effort or removing fail-closed rules, recheck:

- Gentle AI #4791;
- Gentle AI #4771;
- Gentle Shell #1259;
- Gentle Shell #1167;
- Pi #9718.

As of 2026-09-23 all remain open.

Therefore:

- preserve the qualified all-GLM reviewer `thinking=low` mapping in `native-nan` rollback; do not infer that the upstream issue is fixed merely because the selected multi-provider profile uses Luna/Sol;
- keep native typed ASSESS fail-closed continuation;
- treat terminal burn as terminal;
- do not recreate Atenea runtime glue.

## 14. Final acceptance

An existing-host stable update is accepted only when all of the following are true:

```text
versions match desired baseline
gentle-ai update says current
gentle-ai doctor is healthy
native-balanced remains globally active
native-v4-heavy and native-economy are present in the native profile catalog with desired-state mappings
native-nan remains available as rollback only
review mode remains intended
provider credential resolves without exposure
PI_PURE_OK
PI_GENTLE_OK
Engram doctor/self-test and real-use canary pass when Engram was changed
Atenea conformance oracles pass
```

If one fails, stop at that layer and diagnose it before updating Atenea's canonical baseline.
