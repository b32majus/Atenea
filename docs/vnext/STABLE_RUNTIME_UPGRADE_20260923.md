# Atenea vNext — Stable Runtime Upgrade 2026-09-23

Status: **HISTORICAL PREDECESSOR MAINTENANCE QUALIFICATION / PASS**

Date: 2026-09-23

> Superseded later the same day by `STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md`. This file remains accurate evidence for the intermediate 3.5.1 / 3.6.0 / Engram 2.0.0 baseline.

Purpose: record the first post-P7 stable runtime maintenance update while preserving the upstream-first installation discipline established during the vNext cutover.

## 1. Resulting productive baseline

```text
Pi                0.87.0
gentle-pi         3.5.1
Gentle AI         3.6.0
Engram             2.0.0
GGA                2.10.1
provider           NaN
active profile     native-nan
normal entry       pi
review mode        on
```

No Atenea runtime controller, review relay, worker supervisor or routing engine was introduced.

## 2. Update discipline

The upgrade used only supported/official update surfaces.

### Gentle Shell

The stable npm/release version was 3.5.1.

Applied through Pi's own package manager:

```bash
pi install npm:gentle-pi@3.5.1
```

### Gentle AI

Before mutation, the installed binary itself was asked for the supported update path:

```bash
gentle-ai update
```

It reported 3.4.0 → 3.6.0 and supplied the official installer command for this installation:

```bash
curl -fsSL https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh | bash
```

The installer:

- resolved latest stable v3.6.0;
- downloaded the Linux amd64 release artifact;
- verified its published checksum;
- installed to `~/.local/bin/gentle-ai`;
- verified the resulting binary.

Managed assets were then reconciled using:

```bash
gentle-ai sync --agents pi
```

### Engram / GGA

`gentle-ai update` reported:

```text
engram 2.0.0  → up to date
gga    2.10.1 → up to date
```

Therefore neither was manually reinstalled or replaced.

This is intentional: a component already at the supported stable release is left untouched.

## 3. Configuration backup

Before the upgrade, a targeted rollback bundle was created at:

```text
~/.atenea-backups/20260923T0033-stable-upgrade
```

It preserved the behavior-affecting Pi/Gentle configuration only:

- Pi settings;
- provider/model registry;
- Gentle profiles;
- Gentle materialized model routing;
- Gentle state.

Secrets are not copied into this repository.

## 4. Compatibility cleanup discovered by the update

### 4.1 Obsolete external ask-user package

Gentle Shell 3.5.1 provides its own `ask_user_question` tool.

The pre-upgrade Pi package list still contained:

```text
npm:@juicesharp/rpiv-ask-user-question
```

This created a duplicate-tool startup failure.

Current Gentle AI 3.6.0 dry-run no longer includes that package in the managed Pi composition.

The obsolete package was removed using Pi's supported package manager:

```bash
pi remove npm:@juicesharp/rpiv-ask-user-question
```

After removal, normal Pi + Gentle startup returned to green.

### 4.2 NaN credential moved to Pi's supported auth store

The historical local provider registry still carried a literal `apiKey` field.

The credential was migrated locally, without exposing it, to:

```text
~/.pi/agent/auth.json
```

using Pi's documented API-key credential shape:

```json
{
  "nan": {
    "type": "api_key",
    "key": "<local secret>"
  }
}
```

The local `models.json` now contains provider/model configuration only and no `apiKey`.

Credential resolution was verified without printing the secret:

```text
pi auth print-api-key --provider nan → non-empty credential
```

### 4.3 Pre-existing provider-registry drift

The post-update Atenea profile oracle also detected a historical `commandcode` provider entry in the live Pi `models.json`.

The same entry was present in the pre-upgrade backup, so it was **pre-existing drift**, not introduced by Gentle Shell 3.5.1 or Gentle AI 3.6.0.

Its entry had models but no provider `api`/endpoint configuration and was not part of Atenea's versioned desired state.

Correction:

```text
config/native-gentle/nan-provider.models.json
→ reconcile live ~/.pi/agent/models.json
→ only nan remains
→ ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
```

This reinforces the purpose of the deterministic profile oracle: supported upstream updates and local configuration reconciliation are separate concerns, and both must pass before accepting the maintenance baseline.

## 5. Pi auth-check observation

On this custom NaN provider, current:

```bash
pi auth check --provider nan --json
```

returns:

```json
{"status":"invalid","provider":"nan","reason":"invalid_state"}
```

even though all stronger functional evidence succeeds:

- Pi resolves the stored credential;
- Pi pure → NaN completes a real model call;
- Pi + Gentle → NaN completes a real model call.

No upstream Pi issue matching this exact custom-provider `invalid_state` signature was found during this maintenance pass.

Operational decision:

> Do not use `pi auth check` alone as the NaN availability gate.

For this custom provider, qualify auth by non-printing credential resolution plus a bounded real model smoke.

This is a tooling/checker observation, not evidence of a broken NaN credential.

## 6. Runtime qualification after update

### Versions

```text
Pi:          0.87.0
Gentle Shell: 3.5.1
Gentle AI:    3.6.0
Engram:       2.0.0
GGA:          2.10.1
```

### Official update inventory

`gentle-ai update` after maintenance:

```text
gentle-ai 3.6.0  latest 3.6.0
engram    2.0.0  latest 2.0.0
gga       2.10.1 latest 2.10.1

All tools are up to date.
```

### Gentle health

```text
gentle-ai doctor
→ 8 passed
→ 0 failed
→ 0 warnings
→ Status: healthy
```

### NaN smokes

Without extensions:

```text
PI_PURE_OK
```

With normal Gentle extensions:

```text
PI_GENTLE_OK
RC=0
```

### Engram

Engram 2.0.0 passed a real Pi memory query:

```text
ENGRAM_MEMORY_OK
```

`engram doctor` reports one warning only for multiple still-active P4 disposable-canary sessions under `/var/tmp/atenea-p4-20260922/*`. Other integrity/ownership/SQLite/sync checks are healthy.

Those P4 session records were not deleted merely to produce a cosmetically green diagnostic.

## 7. Review compatibility after the update

The known upstream issues were rechecked on 2026-09-23 and remain open:

- Gentle AI #4791 — committed-range ASSESS may return `risk=unassessable`;
- Gentle AI #4771 — selectorless STATUS may fail after terminal burn;
- Gentle Shell #1259 — empty reviewer output loses useful diagnosis;
- Gentle Shell #1167 — reviewer/host empty-output and thinking behavior;
- Pi #9718 — `--print` can exit 0 on output-budget exhaustion.

Therefore existing compatibility rules remain in force:

- reviewer roles stay at `nan/glm5.3-flash · thinking=low`;
- typed ASSESS `unassessable` follows the native fail-closed verifier path;
- `acknowledge-approved → authority=burned` remains terminal;
- no Atenea runtime bridge is restored.

Gentle AI 3.6.0 / Gentle Shell 3.5.1 release notes report no breaking review-contract change, so the P7 native E2E review qualification remains the lifecycle baseline. This maintenance pass adds doctor, credential, Pi-pure, Pi+Gentle and Engram-real-use evidence around the stable update.

## 8. Decision

The stable runtime update is accepted.

The productive baseline moves from:

```text
Pi 0.87.0 / gentle-pi 3.3.0 / Gentle AI 3.4.0
```

to:

```text
Pi 0.87.0 / gentle-pi 3.5.1 / Gentle AI 3.6.0
```

Engram remains 2.0.0 and GGA remains 2.10.1.

The update reinforces, rather than changes, the Atenea vNext architecture:

> official upstream updater first; deterministic/functional verification afterward; Atenea records desired state and evidence but does not replace upstream package management.
