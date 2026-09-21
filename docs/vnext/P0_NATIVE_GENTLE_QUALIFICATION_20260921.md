# P0 Native Gentle Qualification — 2026-09-21

Status: **PASS**

Scope: qualify a durable Pi + native Gentle + NaN path on the VPS before auditing or rebuilding any Atenea runtime capability.

## 1. Qualified stack

Durable isolated profile:

- Pi 0.86.1
- gentle-pi / Gentle Shell 3.3.0
- Gentle AI 3.4.0
- GGA + Engram installed by upstream installer
- NaN provider
- `nan/glm5.3-flash`
- `nan/deepseek-v4-flash`
- native profile: `native-nan`

Launcher:

`gentle-native`

The launcher selects an isolated HOME and removes inherited Atenea / Gentle historical runtime variables before Pi starts. It preserves only the user's ordinary Git/SSH/GitHub identity surfaces required for real repository work.

`gentle-ai doctor`: 8 passed, 0 failed, 0 warnings.

## 2. Golden Control

A disposable repository proved:

- provider access;
- primary Pi execution;
- native ODD enforcement;
- native multi-file delegation;
- exact `## Allowed edit surfaces` enforcement;
- worker completion;
- deterministic tests;
- work-unit commit;
- native review;
- reviewer model routing;
- approval;
- `acknowledge-approved`;
- terminal authority consumption / burn.

Important correction from early clean-room probing:

Pi `--print` waits for EOF. Earlier apparent NaN hangs were caused by the remote harness leaving stdin open. With stdin closed correctly, normal Pi + NaN calls work.

## 3. Reviewer routing requirement

Gentle Shell 3.3.0 does **not** fall back to the orchestrator model for reviewer roles. Native reviewer roles require explicit entries in the agent model routing config.

The qualified `native-nan` profile explicitly routes:

- `review-risk`
- `review-readability`
- `review-reliability`
- `review-resilience`
- `review-refuter`
- `review-validator`
- worker / verify and other configured native roles

to NaN models through Gentle's native `/gentle:models` / `/gentle:profiles` configuration.

## 4. Real PROMueve qualification

Repository:

`b32majus/Hub-Clinico-Badajoz`

Authoritative product line used:

`recovery/farmacia-pr-replay-20260727`

Base:

`92c378b858fc13730130c1e0c8f5bc6d2fd685b9`

Local isolated branch:

`work/fh-v6-sheet-resolution-native-gentle-20260921`

Task:

- FH-DEBT-002
- FH-DEBT-003

The qualification deliberately superseded only PROMueve's historical Atenea/Herdr execution paragraph. Clinical safety, QA, Git isolation, no-inference and publication boundaries remained binding.

### 4.1 Frozen acceptance oracle

Gentle read repository authority, located the real split-brain between v6 sheet detection and parsing, and froze a RED oracle before implementation.

Commit:

`6dfd365` — `test(farmacia): freeze acceptance oracle for v6 sheet resolution (FH-DEBT-002/003)`

The oracle demonstrated that normalized sheet-name detection could accept a workbook that `parseWorkbook` later rejected through exact physical-sheet lookup.

### 4.2 Implementation

Native Gentle delegated the single authorized code surface to `gentle-ai-worker`.

The runtime rejected an initially malformed writer handoff until it contained the canonical `## Allowed edit surfaces` block.

Allowed implementation surface:

`scripts/farmacia_common.js`

Commit:

`2015897` — `fix(farmacia): resolve v6 clinical sheet names once for detection and parsing (FH-DEBT-002, FH-DEBT-003)`

Result:

- one physical-sheet resolution reused by detection and parsing;
- closed normalization / alias policy;
- exactly one physical sheet per required clinical service;
- duplicate / ambiguous aliases fail closed;
- incomplete sets preserve existing legacy fall-through;
- no clinical semantics intentionally changed outside the seam.

### 4.3 Independent native verification

`gentle-ai-verify` ran an independent read-only verification context.

Result:

- 8 / 8 suites green
- 718 deterministic checks passed
- synthetic fixtures only
- no UI / DOM change, so browser validation was not required for this seam

## 5. Reviewer failure diagnosis

The real PROMueve candidate froze as:

- 3 paths
- 459 changed lines
- risk: medium
- lens: `review-reliability`
- lineage: `review-ee0e6bdcac1d43b3`

With reviewer routing on `nan/glm5.3-flash` and inherited/default effort, the in-process reviewer failed inside Pi's `completeSimple()` before Gentle received reviewer artifact text.

The exact provider-materialized reviewer prompt was extracted without mutating authority:

- 40,118 bytes
- 559 lines
- SHA-256 `93c85a7c5f5b8d4ffa2160e2f409d54186e22a349195fd60b855dee08eb5182f`

The same prompt was then replayed outside RDD through the same `@earendil-works/pi-ai completeSimple()` path.

### 5.1 Exact A/B results

| Model / effort | Result |
| --- | --- |
| GLM 5.3 Flash / provider default | FAIL after ~131 s; JSON stream parse error; no text |
| DeepSeek V4 Flash / provider default | FAIL after ~61 s; same JSON stream parse error; no text |
| GLM 5.3 Flash / medium | FAIL after ~129 s; terminated; no text |
| GLM 5.3 Flash / low | **PASS** after ~62 s; stop; 3,928 text bytes |

Successful GLM-low usage observed:

- input: 11,386
- reasoning: 868
- output: 1,838
- total: 13,224

On both default-failure probes, NaN emitted a terminal SSE chunk shaped like:

```text
data: {'id': 'chatcmpl-...', 'object': 'chat.completion.chunk', ...,
       'choices': [],
       'usage': {... 'completion_tokens_details': {'reasoning_tokens': ...}},
       'nan_truncation': {'reason': 'reasoning_only_stream'}}
```

This is not valid JSON because the frame uses single-quoted Python-repr syntax. Pi's OpenAI-completions stream parser therefore reports:

```text
Expected property name or '}' in JSON at position 1 (line 1 column 2)
```

The important causal chain is:

```text
review prompt induces long reasoning
→ reasoning-only truncation at provider
→ NaN emits nan_truncation SSE frame
→ frame is not valid JSON
→ pi-ai completeSimple stream parse fails
→ Gentle host relay reports pi-failed
```

The failure is therefore **below Gentle RDD**. Gentle's authority model behaved correctly by refusing to invent a reviewer result.

## 6. Upstream reports already covering this family

### Gentle Shell

Open:

- #1259 — `bug(review): an empty-output refusal discards the reviewer model and its token usage — the evidence that separates truncation from an empty answer`
  - https://github.com/Gentleman-Programming/gentle-shell/issues/1259
  - A 2026-09-21 comment reports the **same literal parse error**:
    `Expected property name or '}' in JSON at position 1 (line 1 column 2)`
  - https://github.com/Gentleman-Programming/gentle-shell/issues/1259#issuecomment-5760670426

- #1167 — `review host relay: pi-empty-output carries no diagnosis, and the default thinking level can end a review`
  - https://github.com/Gentleman-Programming/gentle-shell/issues/1167
  - Includes measured NaN reviewer failures where long reasoning exhausts the output budget and records that low effort can succeed where medium/default fails.

Historical / fixed relay generation:

- #1156 — native review relay empty-output diagnosis
  - https://github.com/Gentleman-Programming/gentle-shell/issues/1156
  - closed by PR #1186, which moved reviewer completion in-process and added explicit model routing.

Our current failure occurs **after** that relay redesign, on gentle-pi 3.3.0's in-process `completeSimple()` path, so #1156 is historical context rather than the exact current defect.

### Pi

Open:

- earendil-works/pi #9718 — `--print exits 0 with empty output when the model exhausts its output budget`
  - https://github.com/earendil-works/pi/issues/9718
  - provider: NaN
  - model: DeepSeek V4 Flash
  - documents reasoning-only output exhaustion and measured success at low effort for the same class of prompt.

Our raw `nan_truncation` frame adds provider-specific evidence that #9718 could not expose through the earlier text-mode relay.

## 7. Native mitigation qualified

The user-owned native reviewer routing was changed to:

```json
{
  "review-risk":        {"model":"nan/glm5.3-flash","thinking":"low"},
  "review-readability": {"model":"nan/glm5.3-flash","thinking":"low"},
  "review-reliability": {"model":"nan/glm5.3-flash","thinking":"low"},
  "review-resilience":  {"model":"nan/glm5.3-flash","thinking":"low"},
  "review-refuter":     {"model":"nan/glm5.3-flash","thinking":"low"},
  "review-validator":   {"model":"nan/glm5.3-flash","thinking":"low"}
}
```

The change is persisted in the native `native-nan` profile. No Atenea bridge or reviewer implementation is involved.

Re-running the exact frozen `review-reliability` slot with the changed routing:

- completed successfully;
- review state: **approved**;
- only informational/non-blocking findings;
- exact provider-issued `acknowledge-approved` continuation succeeded;
- terminal authority consumption record exists for lineage `review-ee0e6bdcac1d43b3`.

Terminal consumption target:

`sha256:4298dcc82d653c090678b13c780876679e0ceb8303285af29cd49442dadb1cb2`

## 8. Cleanup of diagnostic residue

Several ODD-only commits were produced by a residual queued TUI prompt after the legitimate bounded retry STOP. They did not modify product code.

They were removed from the working branch and preserved locally at:

`evidence/fh-v6-review-residual-retries-20260921`

Evidence head:

`66d15deac6007f3706b0b906f1a75eb85ff4f903`

The qualified PROMueve working branch was restored to:

`2015897dad3e5117472d9d7b4c7bfe6791643150`

with a clean working tree.

No remote state was modified.

## 9. P0 conclusion

P0 demonstrates that Atenea runtime glue is **not required** for productive PROMueve work on the current upstream stack.

Qualified native ownership:

- ODD enforcement → Gentle
- delegation → Gentle
- edit-surface enforcement → Gentle
- deterministic verification routing → Gentle
- RDD → Gentle
- reviewer authority → Gentle
- acknowledgement / burn → Gentle

The only compatibility action required was **user-owned native model/effort routing**, not an Atenea runtime bridge.

This materially strengthens the vNext hypothesis:

> Atenea should become a thin policy / standards / deterministic-capability layer over native Gentle, not a second orchestration harness.
