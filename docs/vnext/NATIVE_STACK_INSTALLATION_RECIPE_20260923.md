# Atenea vNext — Native Stack Installation and Stable-Update Recipe

Status: **CURRENT CANONICAL RECIPE**

Qualified: 2026-09-23

Target: Linux x86_64 / Ubuntu-class host.

Current productive versions:

```text
Pi                0.87.0
gentle-pi         3.5.1
Gentle AI         3.6.0
Engram             2.0.0
GGA                2.10.1
provider           NaN
active profile     native-nan
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

## 3. Pi 0.87.0

For a fresh installation:

```bash
npm install -g @earendil-works/pi-coding-agent@0.87.0
pi --version
```

Expected:

```text
0.87.0
```

Do not upgrade Pi as a side effect of a Gentle maintenance change unless Pi itself is intentionally being qualified.

## 4. Gentle Shell 3.5.1

Install/update the Shell package through Pi:

```bash
pi install npm:gentle-pi@3.5.1
```

Verify:

```bash
node -p 'require(process.env.HOME + "/.pi/agent/npm/node_modules/gentle-pi/package.json").version'
```

Expected:

```text
3.5.1
```

### Obsolete ask-user package

Gentle Shell 3.5.1 provides its own `ask_user_question` tool.

If an older installation still contains:

```text
npm:@juicesharp/rpiv-ask-user-question
```

remove it using Pi:

```bash
pi remove npm:@juicesharp/rpiv-ask-user-question
```

Do not delete package directories by hand.

## 5. Gentle AI 3.6.0

### Existing host

First ask the installed binary:

```bash
gentle-ai update
```

On the qualified VPS, 3.4.0 reported the following official updater:

```bash
curl -fsSL https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh | bash
```

That installer selected v3.6.0, downloaded the official release artifact, verified its checksum, installed the binary and verified the version.

After update:

```bash
gentle-ai version
gentle-ai sync --agents pi
```

Expected:

```text
gentle-ai 3.6.0
```

If a future `gentle-ai update` prints a different supported updater for the installation, follow the current command it reports rather than copying this historical command blindly.

### Fresh/reproducible install

For an exact-version rebuild, prefer the official v3.6.0 release artifact plus published checksum, then verify `gentle-ai version`.

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

At the 2026-09-23 baseline, update inventory should report:

```text
gentle-ai 3.6.0  up to date
engram    2.0.0  up to date
gga       2.10.1 up to date
```

Do not independently replace Engram/GGA merely because a binary download exists if Gentle already owns and reports the current supported component.

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

## 9. Native Gentle profile

Desired state:

```text
config/native-gentle/native-nan.profile.json
```

Active profile:

```text
native-nan
```

The six review roles remain:

```text
review-risk
review-readability
review-reliability
review-resilience
review-refuter
review-validator
    → nan/glm5.3-flash
    → thinking=low
```

This remains a temporary compatibility profile while the upstream reviewer/output issues documented in `CURRENT_COMPATIBILITY.md` remain open.

## 10. Deterministic conformance

From an up-to-date Atenea checkout:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
gentle-ai doctor
gentle-ai update
```

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
2.0.0
```

First:

```bash
gentle-ai doctor
engram doctor
```

Then, when memory behavior matters, validate a real Pi `mem_search`.

A doctor warning about ambiguous old runtime sessions is not equivalent to storage corruption. Inspect its evidence and do not delete historical/test sessions merely to make diagnostics cosmetically green.

## 13. Review compatibility after maintenance

Before changing reviewer effort or removing fail-closed rules, recheck:

- Gentle AI #4791;
- Gentle AI #4771;
- Gentle Shell #1259;
- Gentle Shell #1167;
- Pi #9718.

As of 2026-09-23 all remain open.

Therefore:

- keep reviewer `thinking=low`;
- keep native typed ASSESS fail-closed continuation;
- treat terminal burn as terminal;
- do not recreate Atenea runtime glue.

## 14. Final acceptance

An existing-host stable update is accepted only when all of the following are true:

```text
versions match desired baseline
gentle-ai update says current
gentle-ai doctor is healthy
native-nan remains active
review mode remains intended
provider credential resolves without exposure
PI_PURE_OK
PI_GENTLE_OK
Engram real-use canary passes when memory was touched
Atenea conformance oracles pass
```

If one fails, stop at that layer and diagnose it before updating Atenea's canonical baseline.
