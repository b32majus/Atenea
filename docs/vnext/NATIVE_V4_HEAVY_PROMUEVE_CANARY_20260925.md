# native-v4-heavy — PROMueve Nexus field canary #1

Status: **POSITIVE FIELD CANARY / CANDIDATE EVIDENCE**
Date: 2026-09-25
Project: `b32majus/Hub-Clinico-Badajoz` / PROMueve Nexus
Work order: issue #403 — `WO-NEXUS-F3.2`
Delivery PR: #404

## 1. Purpose

This was the first real product field canary of Atenea `native-v4-heavy`.

The question was deliberately narrower than global equivalence:

> Can `native-v4-heavy` execute a material, well-specified PROMueve ticket with DeepSeek V4 Flash as the implementation worker while preserving the same deterministic and native-review quality gates, without an evident degradation signal attributable to routing?

The canary did not reduce acceptance criteria, tests, review quality, composition discipline, correction semantics or publication boundaries relative to `native-balanced`.

## 2. Intended routing

```text
orchestrator      → nan/glm5.3-flash · high
explore           → nan/deepseek-v4-flash
worker            → nan/deepseek-v4-flash
verify            → nan/glm5.3-flash · high
judge-A           → nan/glm5.3-flash · high
fix               → nan/glm5.3-flash · high
judge-B           → GPT-6 Luna · xhigh
review-*          → GPT-6 Luna
review-risk       → GPT-6 Sol · high
```

The global HOME profile remained `native-balanced`.

## 3. Attempt 0 — invalid routing evidence, not profile-quality evidence

The initial worktree declared `native-v4-heavy`, but the actual `gentle-ai-worker` child reported:

```text
provider = nan
model    = glm5.3-flash
thinking = high
```

The run was stopped before commit. Its implementation was discarded completely and none of its product bytes entered the published candidate.

Root cause: `~/.pi/gentle-ai/profiles.json` contained the profile names and mappings but lacked the Gentle Pi 3.7.0 native store envelope:

```json
{
  "kind": "gentle-pi.agent_model_profiles",
  "version": 1
}
```

Gentle Pi `normalizeProfilesFile()` rejects a store without that envelope. The repository declaration therefore could not resolve its named profile and child launch fell through to the globally materialized `native-balanced` routing.

This falsified Atenea's previous conformance oracle: `check-native-gentle-profile.mjs` could PASS a JSON mapping that Gentle itself treated as an invalid profile store.

### Process learning

Static profile-role equality is necessary but not sufficient. Candidate routing must be demonstrated through the native resolution path, and first-use/changed/incident routing must additionally prove the effective child model before writer authority.

## 4. Valid retry routing evidence

After correcting the native store envelope outside the product repository, execution restarted from a clean retry worktree.

The following real child sessions were observed:

```text
pre-writer read-only probe → nan/deepseek-v4-flash · high
WU-A writer               → nan/deepseek-v4-flash · high
WU-B writer               → nan/deepseek-v4-flash · high
```

The parent/orchestrator remained:

```text
nan/glm5.3-flash · high
```

No silent fallback was observed in the valid retry.

The pre-writer probe was read-only and reported `PI_PROVIDER`, `PI_MODEL`, `PI_REASONING_LEVEL`, current working directory and `git status --porcelain` before stopping.

## 5. Delivery composition and commits

Base:

```text
0847cbcc7891aaee7a776ac81d1f2a01bdc63ffe
```

Work units:

```text
WU-A 172fb2bf9789c18e1866a0dbc9071b07c5e81716
     Home bootstrap + shell/rendering

WU-B 17f9db676e810575bdeccc9b4d20c0c9d8ea07b5
     same-tab navigation + integration boundary
```

Final pre-merge candidate:

```text
61e6e9ca54a787940dc5dc241f0eb517ce5f264d
```

Published merge:

```text
e9096e9bda1d20ac50f9c395823152b7f005403c
```

No reslice was required because of a model-quality failure.

## 6. Deterministic and native-review result

### WU-A

- writer: DeepSeek V4 Flash high;
- Home acceptance oracle reached 11/11 PASS;
- Nexus/platform verification PASS;
- native review lineage `review-16e988d40fb1d7a6`;
- outcome: **APPROVED + BURNED**;
- one informational, non-blocking finding;
- no abnormal correction loop.

### WU-B

- writer: DeepSeek V4 Flash high;
- Home and navigation checkers 11/11 PASS;
- `verify:nexus` PASS;
- native review lineage `review-98506c59b732ce1d`;
- outcome: **APPROVED + BURNED**;
- no review findings;
- no abnormal correction loop.

A review START attempt with the wrong default base hit `lens_context_budget_exceeded` before review authority was created. It was corrected by resolving the proper branch base; it is a review-preflight/composition-base anomaly, not evidence of V4 implementation degradation.

## 7. Composed closeout and independent post-RDD audit

On exact composed candidate `61e6e9c`:

```text
Home checker        11/11 PASS
Navigation checker  11/11 PASS
npm run verify:nexus PASS
GitHub Actions Nexus deterministic gates SUCCESS
tracked candidate clean
```

The independent Cora post-RDD audit found **no F3.2 blocker**.

It preserved non-blocking PROMueve debt:

- Home-specific checks were not yet part of `verify:nexus` / CI;
- the browser validator lacked an exhaustiveness guard for future JSON Schema keywords;
- after merge, a fresh-checkout reproduction found byte-identical generated assertions sensitive to Git CRLF checkout versus LF builder output.

These findings count as post-RDD evidence. Current evidence does not support attributing them to DeepSeek V4 routing: they are CI/tooling/reproducibility coverage gaps.

## 8. Canary assessment

Observed profile-quality signals:

```text
repeated semantic/architectural failures = 0
abnormal correction loops                = 0
model-induced reslices                    = 0
silent fallback in valid retry            = 0
post-RDD F3.2 blockers                    = 0
```

Therefore:

```text
CANARY RESULT       = POSITIVE
PROFILE DISPOSITION = positive-field-canary / candidate
GLOBAL DEFAULT      = native-balanced remains unchanged
```

This does **not** establish:

- global quality equivalence with `native-balanced`;
- superior quality or cost;
- default suitability for every work class;
- automatic selection by quota.

A second field canary should broaden the work class rather than merely repeat similar UI implementation, while preserving the same gates.

## 9. Globalized routing-conformance learning

Atenea adopts the following invariant from Attempt 0:

```text
profile desired state correct
→ native profile-store envelope valid
→ repository/local pin resolves through current native semantics
→ when candidate/changed/incident gate applies: real read-only child probe matches expected route
→ writer authority
```

A pin controls subagent routing only. It does not move the parent/orchestrator. When a selected profile expects a different orchestrator from the current Pi session, that orchestrator must be selected and verified separately through Pi's native model surface before writer authority.

No Atenea router, launcher or fallback controller is introduced by this learning.
