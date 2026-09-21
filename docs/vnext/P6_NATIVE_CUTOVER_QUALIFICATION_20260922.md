# P6 Native VPS Cutover Qualification — 2026-09-22

Status: **QUALIFIED FOR NORMAL PROJECT EXECUTION**

Purpose: record the final clean VPS cutover and the compatibility corrections discovered during the terminal canary.

## 1. Qualified runtime

```text
Pi 0.87.0
→ gentle-pi 3.3.0
→ Gentle AI 3.4.0
→ NaN provider
→ native ODD / workers / verify / RDD
```

`native-nan` remains the active native Gentle profile.

Reviewer lenses currently use `nan/glm5.3-flash` with `thinking=low`. This is a temporary compatibility mitigation for the known NaN/Pi reasoning-only stream truncation, not a permanent architectural preference.

## 2. Clean-cutover evidence

The final production HOME passed:

- HOME is not a Git repository;
- no global `AGENTS.md`;
- no legacy Atenea/pi-intercom environment variables;
- no Atenea Herdr RDD-consent plugin;- Pi 0.87.0;
- Gentle AI 3.4.0;
- NaN auth ready;
- Pi → NaN smoke PASS;
- Pi + Gentle → NaN smoke PASS;
- `gentle-ai doctor`: 8 passed, 0 failed, 0 warnings.

Herdr remains intentionally available as a session-persistence/operator surface. Its presence is not legacy runtime contamination unless an Atenea policy/review plugin is attached to it.

## 3. Final native E2E canary

A disposable multi-file repository was used. No product repository was mutated.

Observed lifecycle:

```text
primary mutation
→ second inline write rejected before mutation
→ native worker delegation required
→ worker completed remaining surfaces
→ deterministic tests PASS
→ independent verify PASS
→ native RDD consent
→ medium-risk authority created
→ review-reliability native model run
→ APPROVED
→ acknowledge-approved
→ status=closed
→ authority=burned
```Terminal review evidence:

```text
outcome = native-approved-acknowledgement-completed
authority = burned
burn_evidence = gentle-ai.review-acknowledged/v1
```

The persisted review store also recorded terminal consumption for the same lineage/target.

No push, PR or merge occurred.

## 4. ASSESS correction

The canary reproduced the committed-range ASSESS compatibility seam. Current upstream evidence is tracked by Gentle AI #4791.

Operational decision:

- ensure `.atl/` is ignored before work begins;
- avoid unrelated untracked runtime artifacts at ASSESS time;
- if ASSESS returns a typed `risk=unassessable` fail-closed plan, continue through that native plan rather than stopping;
- accept the independent verifier required by the plan;
- never infer a lower risk tier;
- never synthesize START or reconstruct review timing in Atenea.

A user-level Git exclude for `.atl/` was added during cutover, but P4 later proved that this alone does not prevent Gentle from creating a repository-local `.gitignore`. The final operational rule is stricter: target repositories must already ignore `.atl/` repo-locally before candidate work. No Atenea ASSESS runtime bridge is part of the qualified path.

## 5. Post-burn STATUS correction

The canary reproduced the upstream signature tracked by Gentle AI #4771:

```text
validate negotiated review status:
unrelated target status is inconsistent
```

It occurs after the authority has already been successfully acknowledged and burned.

Operational decision:

- `acknowledge-approved` returning `status=closed`, `authority=burned` and burn evidence is terminal;
- do not issue selectorless STATUS solely as a second proof of burn;
- preserve the burn response / terminal-consumption evidence;
- do not reopen or repeat review for the unchanged candidate because post-burn STATUS is inconsistent.

No Atenea post-burn controller or repair shim is introduced.

## 6. Engram correction

The pre-cutover HTTP Engram server was proven stale: it predated reinstall, its executable resolved as deleted, and it retained an obsolete worktree cwd. After terminating it, the current Engram MCP remained healthy, Pi spawned a current `engram serve` when memory was requested, and a real `mem_search` canary passed.

## 7. Qualification decision

Ordinary `pi` is the normal productive entry point. Remaining compatibility debt is upstream-facing and fail-safe; none justifies restoring Atenea runtime controllers.

## 8. Reproducibility closure

P6 reproducibility was completed after the original cutover.

Versioned additions:

- `config/native-gentle/nan-provider.models.json` — secret-free NaN provider/model desired state;
- `docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260922.md` — exact Pi/Gentle install, checksum, upstream component install, credential boundary, profile application and conformance recipe;
- strengthened `tools/check-native-gentle-profile.mjs` — compares the live provider/profile against versioned desired state while ignoring only credential-bearing fields.

The versioned provider desired state contains no API key.

Fresh-clone reproduction:

```text
clone / checkout P6 candidate
→ repo-local .atl/ ignore PASS
→ ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
→ ATENEA_VNEXT_AUTHORITY_CHECK=PASS
→ Pi 0.87.0 PASS
→ Gentle AI 3.4.0 PASS
→ doctor 8/8 healthy
→ NaN auth ready
→ P6_FRESH_CLONE_OK
→ git status clean
```

The fresh clone did not copy an old repository worktree, Atenea runtime plugin, historical bridge, session state, or old HOME.

P6 exit criterion is satisfied.
