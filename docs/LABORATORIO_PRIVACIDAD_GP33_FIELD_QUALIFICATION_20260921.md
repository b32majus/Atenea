# Laboratorio_Privacidad_Clinica × Atenea GP3.3 / GAI3.4 — real field qualification

Status: **CURRENT FIELD EVIDENCE**
Date: 2026-09-20/21

## 1. Scope

Laboratorio de Privacidad V4 is the first real product train used as field qualification for:

```text
Pi            0.86.1
Herdr         0.9.0
Gentle Pi     3.3.0
Gentle AI     3.4.0 package-local
profile       atenea-one-touch
parent        nan/glm5.3-flash · high
```

Repository: `b32majus/Laboratorio_Privacidad_Clinica`

Clean execution clone:

```text
/srv/kairos-lab/qualification/laboratorio-privacidad-v4-clean-20260920
branch: work/runtime/v4-clean-20260920
```

This field run exposed several **independent** boundaries. Do not collapse them into one incident or count every STOP as a product defect.

## 2. T01 — coherent work units and one-touch transport

T01 completed as three coherent work units:

```text
2974245  feat(domain): add DOM-independent ReviewSession domain core
cb9bf91  feat(domain): add Processor-result adapter for ReviewSession
e788c74  test(ci): wire ReviewSession contract tests into npm test and CI
```

Deterministic contract QA: 25/25 PASS.

T01 review authority closed with APPROVED + acknowledgement/burn.

### One-touch bypass discovered

During T01/WU3, Pi executed the ordinary review lifecycle through shell/native CLI:

```text
bash → gentle-ai review start ... --consent=relay
→ provider consent envelope
→ ask_user_choice
→ bash gentle-ai review start ... --consent=granted
```

The host-owned third action `Review and allow this session` was absent because START did not traverse the Gentle Pi facade.

Durable invariant:

```text
when a corresponding Gentle Pi review facade operation exists
→ use the facade
→ do not invoke native gentle-ai review lifecycle through shell
→ do not recreate provider/host consent with ask_user_choice
```

This is transport/host-semantics preservation, not an Atenea-owned review lifecycle.

## 3. T02 — oversized material reviewer boundary

Original T02 product content:

```text
c5a1fac  privacy regression harness        ~1095 authored lines
60418de  package/CI wiring                 ~10 authored lines
total                                         ~1104
```

Frozen lineage:

```text
review-762bfe4cdd9e4b16
```

A `review-resilience` prompt materialized to ~75 KiB.

Observed:

```text
DeepSeek V4 Flash High  → reviewer-empty-output / stopReason=length
DeepSeek V4 Flash High  → reviewer-empty-output / stopReason=length
GPT-5.6 Luna High       → reviewer-empty-output / stopReason=length (~147 s)
```

The same slot failed across two independent providers. This evidence does not support a DeepSeek-only diagnosis.

## 4. T02 — ODD reconstruction

The oversized lineage was explicitly ABANDONED under operator authority. RESET/RECOVER were not substituted.

The accepted product content was preserved as an oracle:

```text
base tree source commit     e788c74b571beb8a689ebf48f17f429aa296e4fe
pre-rewrite final tree      7bd171f154ff02a6168a691b82d85535ba9e1f02
backup branch               backup/t02-pre-rewrite-20260920
plus durable tag/tar/patch evidence
```

T02 was reconstructed without product redesign:

```text
0d75c27  WU2.1 corpus/config/docs            ~267
952f8c8  WU2.2 metrics + tests               ~197
8ae5116  WU2.3 matching + tests              ~327
8c8f56f  WU2.4 evaluator                     ~304
3672ebe  WU2.5 package.json + CI wiring        ~10
```

The rebuilt final tree matched the pre-rewrite tree and 17/17 paths were byte-identical at that checkpoint.

QA:

```text
privacy-eval tests    21/21 PASS
privacy gate          PASS
domain tests          25/25 PASS
other relevant gates  PASS
```

T02 completed review APPROVED + acknowledgement/burn.

### Material-size confirmation

At WU2.5 the resilience materialized prompt was only ~12 KiB and completed successfully; all four lenses were admitted.

Current evidence:

```text
~75 KiB reviewer prompt → DeepSeek length, DeepSeek length, Luna length
~12 KiB reviewer prompt → successful four-lens review
```

This is strong evidence for an interaction between materialized prompt size and completion/reasoning budget. It is not proof of one universal byte threshold and must not be translated into an Atenea line-count review scheduler.

## 5. Independent committed-range ASSESS facade defect

WU2.1–WU2.4 exposed a separate defect. `gentle_review assess` on committed-range/baseRef selectors returned an unusable model-visible result equivalent to:

```text
schema incompatible
empty output
review_due unavailable
```

The parent failed closed and did not invent START.

WU2.5 later produced a valid ASSESS:

```text
review_due=true
review_due_reason=shell_process
```

Tracked separately in Atenea issue #90.

Invariant:

```text
inspect != ASSESS → wrapper continuation → target-scoped STATUS
ASSESS failure != permission to START
```

## 6. Hygiene candidate evidence

A tracked local `.gitignore` change appeared as an independent review candidate, was reviewed and burned, but deliberately remained uncommitted as local/runtime hygiene.

Therefore:

```text
review candidate authority != product commit/publication scope
```

Review consumption does not imply product publication authority.

## 7. Publication / delivery evidence

### 7.1 GitHub credential capability

A normal push that modified `.github/workflows/**` was rejected because the effective GitHub OAuth credential lacked workflow authority.

Do not:
- reconstruct commits through an API;
- remove workflow changes merely to bypass the control;
- infer publication capability from generic GitHub authentication.

When changed artifacts require stronger publication permission, verify the effective publication credential/capability before the push.

### 7.2 Workflow YAML defect escaped local gates

GitHub Actions rejected `.github/workflows/ci.yml` immediately because step names containing internal `:` were unquoted plain YAML scalars.

The defect was not detected by:
- domain tests;
- privacy-eval tests;
- privacy gate;
- links/storage/positioning checks;
- `git diff --check`;
- four-lens Gentle review.

There was no local parser/validator for the changed workflow artifact.

Durable rule:

```text
pre-publication validation is changed-file-aware
→ changed workflow YAML requires a workflow/YAML validator before publication
→ validator should be repo-native or an upstream tool such as actionlint
→ missing required validator is explicit evidence, not silent success
```

Do not create one universal giant gate list. Derive validation from the artifact types actually changed.

## 8. Oracle semantics

The T02 reconstruction proved byte-equivalence to the preserved oracle, but GitHub CI later proved that the oracle itself contained invalid YAML.

Therefore:

```text
oracle = drift/intended-content evidence
oracle != authority above proven defects
```

Authority order for an oracle-based history repair:

```text
accepted spec / acceptance
+ syntactic validity
+ buildability
+ delivery validity
> preservation of a proven defective byte
```

Byte equivalence remains the default proof that history reconstruction did not redesign the product. A proven defect that violates acceptance or delivery validity may be repaired as its own bounded, reviewed correction; the oracle never requires preserving that defect forever.

## 9. CI runtime parity

Field environment:

```text
local VPS Node 24.15.0
GitHub CI Node 20
```

A legacy Node flag was removed in Node 24 but remained valid in Node 20.

Deterministic evidence must distinguish:

```text
gate passed in declared CI runtime
vs
gate passed/failed only on a different host runtime
```

When a changed candidate is runtime-sensitive and CI declares a different major runtime, run the relevant gate in that declared runtime when practical or record the divergence explicitly before publication.

## 10. Current routing after the train

```text
Parent               nan/glm5.3-flash · high
Worker               nan/glm5.3-flash · high
Verify               openai-codex/gpt-5.6-luna · high
Readability          openai-codex/gpt-5.6-luna · high
Reliability          openai-codex/gpt-5.6-luna · high   # provisional
Risk                 nan/glm5.3-flash · high
Resilience           nan/deepseek-v4-flash · high
Refuter              nan/deepseek-v4-flash · high
Validator            openai-codex/gpt-5.6-luna · high
```

The temporary Laboratorio-only T02 profile override was removed. Shared `atenea-one-touch` remains the intended profile.

Do not remove DeepSeek globally from resilience based on T02; Luna High failed on the same oversized material slot.

## 11. Atenea consequences

Adopt:

1. pre-implementation coherent work-unit composition;
2. native ASSESS after each substantial/delegated work-unit commit;
3. facade-first ordinary review lifecycle when a Gentle Pi operation exists;
4. `inspect != ASSESS → STATUS`;
5. fail-closed on unusable ASSESS;
6. repository-owned changed-file-aware checkpoint preflight;
7. thin deterministic Atenea publish-checkpoint seam consuming exact preflight + Gentle closure evidence;
8. repo-declared publication credential capability checks before push;
9. CI-runtime parity evidence produced by the repo preflight for runtime-sensitive candidates;
10. oracle as drift evidence, not authority over a proven defect;
11. no indefinite reviewer-empty-output retries.

Do not adopt:

- a second Atenea review controller;
- a hard Atenea 400-line reviewer threshold;
- global removal of DeepSeek from resilience from this incident;
- mandatory Promotion Review after every ticket;
- direct native CLI as a bypass when the facade exists;
- START as a fallback when ASSESS fails.

## 12. Tracker

- Atenea #86 — GP3.3/GAI3.4 real field qualification tracker.
- Atenea #90 — committed-range ASSESS facade investigation.
- Atenea #91 — material reviewer prompt-size / completion-budget characterization.
- Atenea #92 — qualify upstream-supported facade-first shell-bypass guardrail.
- Atenea #93 — deterministic publish-checkpoint implementation.
- Atenea #94 — real-repository field qualification for publish-checkpoint.
- PR #89 — merged contract/document reconciliation.
