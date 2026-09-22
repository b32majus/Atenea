# Atenea vNext — Native Stack Installation Recipe

Status: **P6 REPRODUCIBLE INSTALL RECIPE**

Qualified: 2026-09-22

Target: Linux x86_64 / Ubuntu-class host.

This recipe recreates the qualified productive stack without copying an old HOME, Atenea runtime extensions, Herdr policy plugins, pi-intercom state, or historical Gentle patches.

> Do not paste a block beginning with `set -e` into an interactive shell. The commands below are intentionally safe to run step by step. If you wrap them in strict-mode Bash, do so in a separate script/subshell.

## 1. Required base tools

The host needs:

- Git
- Node/npm
- curl
- tar
- sha256sum
- jq

Atenea does not install or manage these system packages.

## 2. Install Pi 0.87.0

```bash
npm uninstall -g @earendil-works/pi-coding-agent || true
npm install -g @earendil-works/pi-coding-agent@0.87.0
pi --version
```

Expected:

```text
0.87.0
```

## 3. Install Gentle AI 3.4.0 from the official release

```bash
TMP="$(mktemp -d)"
cd "$TMP"

curl -fL   -o gentle-ai.tar.gz   https://github.com/Gentleman-Programming/gentle-ai/releases/download/v3.4.0/gentle-ai_3.4.0_linux_amd64.tar.gz

curl -fL   -o checksums.txt   https://github.com/Gentleman-Programming/gentle-ai/releases/download/v3.4.0/checksums.txt

grep 'gentle-ai_3.4.0_linux_amd64.tar.gz' checksums.txt   | sed 's/gentle-ai_3.4.0_linux_amd64.tar.gz/gentle-ai.tar.gz/'   | sha256sum -c -

tar -xzf gentle-ai.tar.gz
GAI_BIN="$(find "$TMP" -type f -name gentle-ai -perm -u+x | head -1)"

mkdir -p "$HOME/.local/bin"
install -m 0755 "$GAI_BIN" "$HOME/.local/bin/gentle-ai"

cd "$HOME"
rm -rf "$TMP"

gentle-ai version
```

Expected:

```text
gentle-ai 3.4.0
```
## 4. Install the upstream Gentle/Pi components

```bash
gentle-ai install --agents pi --scope global --channel stable
gentle-ai install --agents pi --components gga --scope global --channel stable
gentle-ai sync --agents pi
gentle-ai doctor
```

Qualified expected health:

```text
8 passed, 0 failed, 0 warnings
Status: healthy
```

The stable channel installed gentle-pi / Gentle Shell 3.3.0 during qualification.

Do not install:

- Atenea RDD relay;
- pi-intercom consent transport;
- Atenea Herdr policy plugin;
- historical host/ASSESS patches;
- effective-mode runtime fixture.

Herdr itself may be installed/used separately for persistent operator sessions. It is not part of review authority.

## 5. Clone Atenea and prepare repo-local Gentle state

```bash
git clone <ATENEA_REPOSITORY_URL> Atenea
cd Atenea
```

The repository must already contain:

```text
.gitignore → .atl/
```

This is deliberate. P4 proved that a user-level Git excludes file alone does not prevent Gentle from creating a repository-local `.gitignore`.

Verify:

```bash
grep -Fx '.atl/' .gitignore
```

## 6. Install the secret-free NaN provider registry

Atenea versions the provider/model **shape**, never the credential:

```text
config/native-gentle/nan-provider.models.json
```

Install it into Pi:

```bash
mkdir -p "$HOME/.pi/agent"
cp config/native-gentle/nan-provider.models.json "$HOME/.pi/agent/models.json"
chmod 600 "$HOME/.pi/agent/models.json"
```

The versioned file intentionally contains no API key.

### Authenticate NaN locally

Use Pi's supported local credential surface:

```text
pi
/login
```

Select the `nan` provider and store the API key locally when prompted.

The key belongs in local Pi credential state, never in Git, chat, logs, or Atenea config.

Verify without printing the credential:

```bash
pi auth check --provider nan
```

Expected:

```text
ready
```

A local operator may instead use another Pi-supported credential source, but the resulting provider must pass the same auth/conformance checks.
## 7. Set the Pi defaults

Preserve the packages installed by Gentle and set only the default provider/model:

```bash
TMP_SETTINGS="$(mktemp)"

jq '
  .defaultProvider = "nan"
  | .defaultModel = "glm5.3-flash"
' "$HOME/.pi/agent/settings.json" > "$TMP_SETTINGS"

mv "$TMP_SETTINGS" "$HOME/.pi/agent/settings.json"
```

## 8. Create/apply the native Gentle profile

Desired state:

```text
config/native-gentle/native-nan.profile.json
```

Runtime ownership remains upstream Gentle.

Open Pi:

```bash
pi
```

Use:

```text
/gentle:models
/gentle:profiles
```

Create/apply a profile named:

```text
native-nan
```

The six review roles must match the versioned compatibility specification:

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

Other roles may inherit the qualified default `nan/glm5.3-flash` unless a later versioned decision intentionally pins them.

The `thinking=low` reviewer setting is temporary compatibility for the open reasoning-only-stream issue. It is not a permanent design preference.

Applying the profile through upstream `/gentle:profiles` materializes the native routing state. Atenea does not implement a routing applier.

## 9. Run deterministic conformance

From the Atenea repository:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
gentle-ai doctor
pi auth check --provider nan
```

Expected:

```text
ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
ATENEA_VNEXT_AUTHORITY_CHECK=PASS
...
Status: healthy
ready
```
## 10. Run two bounded smokes

### Pi + NaN

```bash
pi   --print   --no-session   --no-extensions   --provider nan   --model glm5.3-flash:low   'Reply with exactly PI_NAN_OK and nothing else.'   </dev/null
```

Expected:

```text
PI_NAN_OK
```

### Pi + Gentle + NaN

```bash
pi   --print   --no-session   --provider nan   --model glm5.3-flash:low   'Reply with exactly PI_GENTLE_NAN_OK and nothing else.'   </dev/null
```

Expected:

```text
PI_GENTLE_NAN_OK
```

The explicit `</dev/null` matters for `--print`: without it, a remote terminal can keep stdin open and make a healthy run appear hung.

## 11. Compatibility rules after install

Current temporary seams are versioned in:

`docs/vnext/CURRENT_COMPATIBILITY.md`

The operational summary is:

- reviewer `thinking=low` remains temporary until the NaN/Pi reasoning-only truncation is requalified;
- committed-range ASSESS returning a typed `risk=unassessable` plan follows the native fail-closed verifier path rather than an Atenea bridge;
- successful `acknowledge-approved → authority=burned` is terminal; do not require selectorless STATUS afterward;
- Engram is auxiliary; validate it with `gentle-ai doctor` plus a real memory canary when troubleshooting it.

## 12. Reproduction boundary

A valid reproduction does **not** copy:

- an old `~/.pi`;
- an old `~/.gentle-ai`;
- old sessions;
- an old Atenea profile directory;
- historical runtime patches/plugins;
- secrets from another machine.

It reconstructs supported upstream tools, supplies credentials separately, applies the versioned desired-state policy/config, and proves conformance with deterministic checks.

Evidence for this recipe:

- `docs/vnext/P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`
- `docs/vnext/P4_POSITIVE_REBUILD_QUALIFICATION_20260922.md`
- `docs/vnext/P5_OPERATIONAL_SIMPLIFICATION_20260922.md`
- `docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md`
