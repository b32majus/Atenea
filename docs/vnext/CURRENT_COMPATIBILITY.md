# Atenea vNext — Current Compatibility Notes

Status: **CURRENT TRANSITIONAL EVIDENCE**

Date: 2026-09-22

This document contains version/provider-specific exceptions that are intentionally **not** part of stable `AGENTS.md` policy.

## 1. NaN reviewer reasoning-only truncation

Qualified stack:

- Pi 0.87.0
- gentle-pi 3.3.0
- Gentle AI 3.4.0
- NaN OpenAI-compatible provider

Observed on a real PROMueve reviewer prompt:

- GLM default: failed
- DeepSeek default: failed
- GLM medium: failed
- GLM low: passed

Failure signature:

- provider reaches reasoning-only truncation;
- NaN emits a `nan_truncation: reasoning_only_stream` SSE frame;
- frame is serialized with single quotes rather than valid JSON;
- Pi's OpenAI-compatible stream parser fails before Gentle receives reviewer text.

Current mitigation:

```text
review-* → nan/glm5.3-flash · thinking=low
```

This lives in native Gentle profile configuration, not an Atenea runtime bridge.

Retirement condition:

- provider/Pi behavior is fixed;
- the frozen/representative reviewer canary passes at the intended higher effort;
- native profile is requalified.

Evidence:

- `docs/vnext/P0_NATIVE_GENTLE_QUALIFICATION_20260921.md`
- Gentle Shell #1259 / #1167
- Pi #9718

## 2. Committed-range ASSESS compatibility defect

Canonical current upstream tracker:

- Gentle AI #4791

Historical related tracking:

- Atenea #90
- Gentle Shell #1175

Some committed-range `gentle_review assess` calls can return `risk: unassessable` because the current Pi/Gentle controller cannot parse or obtain the native assessment envelope.

Pre-ASSESS hygiene:

```text
clean worktree / intentional candidate only
→ .atl/ already ignored before work begins
→ no unrelated untracked runtime artifacts
→ call native gentle_review assess
```

P4 qualification proved that a user-level Git exclude alone does **not** stop Gentle from creating a repository-local `.gitignore` for `.atl/`. The qualified rule is therefore repo-local: `.atl/` must already be present in the target repository `.gitignore` before candidate work starts.

Production rule:

```text
ASSESS succeeds with a native risk tier
→ follow the native plan / review_due semantics

ASSESS returns risk=unassessable plus a typed fail-closed plan
→ follow that native plan
→ writer self-verification when requested
→ independent verifier when requested
→ do not claim a lower risk tier

ASSESS returns no typed safe continuation or ambiguous state
→ STOP
→ preserve evidence
```

Never synthesize START from an ASSESS failure, reconstruct review timing in Atenea, or restore the historical ASSESS bridge as production runtime.

Retirement condition:

- stock supported Gentle/Pi handles the affected committed-range assessments;
- bounded regression canary returns a native tier consistently;
- no special hygiene beyond normal repository cleanliness is required.

## 3. Post-burn selectorless STATUS defect

Tracked upstream:

- Gentle AI #4771

The final native canary reproduced `validate negotiated review status: unrelated target status is inconsistent` after a successful terminal acknowledgement.

Terminal rule:

```text
review.acknowledge-approved
→ status=closed
→ authority=burned
→ burn_evidence=gentle-ai.review-acknowledged/v1
```

That response is terminal review evidence.

Do **not** call selectorless STATUS merely to prove that the burn happened. The burn response plus persisted terminal-consumption evidence is sufficient.

A post-burn selectorless STATUS failure does not reopen the review, invalidate the burn, or justify a second review of the unchanged candidate. Do not add an Atenea repair/controller around this seam.

## 4. VPS cutover state

The final clean reinstall is now the normal productive path:

```text
ordinary pi
→ gentle-pi 3.3.0
→ Gentle AI 3.4.0
→ NaN
→ native ODD / workers / verify / RDD
```

Qualified facts:

- HOME is not an accidental Git repository;
- no global `AGENTS.md` is required;
- historical Atenea/pi-intercom environment variables are removed;
- the historical Atenea RDD-consent plugin is absent;
- Herdr remains allowed as a session persistence/operator host, not review authority;
- `gentle-ai doctor` passes 8/8;
- Pi → NaN and Pi + Gentle → NaN smokes pass;
- the final native RDD canary reached reviewer APPROVED, `acknowledge-approved`, and `authority: burned`.

The historical `gentle-native` isolated launcher was a migration/qualification tool. It is no longer the normal production entry point.

Rollback evidence remains preserved; do not delete it merely because the new path is qualified.

## 5. Engram

Engram is auxiliary only.

Final cutover diagnosis found one stale pre-cutover `engram serve` process that:

- predated the clean reinstall;
- was executing a deleted binary inode;
- still listened on the local Engram HTTP port;
- retained an obsolete PROMueve worktree as its cwd.

After terminating that stale process, the current Engram MCP remained healthy. A real Pi `mem_search` call spawned the current HTTP server from the current binary and returned successfully.

Rule:

- never treat Engram as product/spec/review authority;
- an Engram outage must not silently destroy durable repository progress;
- product correctness must not depend on memory availability;
- a server whose executable is deleted or whose cwd belongs to obsolete runtime state is stale;
- validate memory with both `gentle-ai doctor` and an actual `mem_search` canary after reinstall.

No Atenea Engram controller is planned.

## 6. Benchmark-only profile

P3 may use a temporary profile such as `benchmark-nan-low` to keep provider reasoning behavior constant across experiment arms.

Benchmark profiles:

- are not production defaults;
- must not silently replace `native-nan`;
- exist only to make A/B/C/D comparisons fair;
- are restored/removed after experiment completion.
