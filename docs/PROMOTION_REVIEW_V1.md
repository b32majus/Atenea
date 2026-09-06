# Atenea — Promotion Review v1

Status: **CURRENT / NORMATIVE WHEN INVOKED**
Date: 2026-09-06

## 1. Purpose

Promotion Review is a small independent **read-only** audit at a human promotion/merge boundary when semantic, integration, clinical-safety or harness-authority risk warrants it.

It does not replace or extend Gentle native RDD. Gentle remains the sole owner of exact-candidate review authority, reviewer lineage, correction state and acknowledgement/burn. Promotion Review creates no candidate authority and no second review controller.

Matt `code-review` remains an upstream task-triggered engineering method. Atenea does not copy its implementation or smell baseline into this contract. Where useful, its Spec/Standards output may be supporting evidence; Promotion Review itself remains an independent promotion-boundary audit.

## 2. When to invoke

Use it selectively before a human-authorized promotion/merge when the current planning authority identifies material risk, for example:

- a multi-ticket train or composed candidate crossing several accepted seams;
- clinical/semantic write behavior or fail-closed safety boundaries;
- a recovery/main promotion that composes previously separate branches/artifacts;
- a harness/runtime-authority change whose failure could silently broaden agent authority.

Do **not** invoke it by ritual after every ticket, push or ordinary low-risk change. It is not part of the worker's Gentle lifecycle and the autonomous supervisor does not invent the requirement during execution.

## 3. Evidence pack — pin before reviewer launch

The human/Cora planning surface resolves the exact review inputs before launch:

```text
REPOSITORY=
BASE_SHA=
HEAD_SHA=
SPEC_OR_AUTHORITY_SOURCES=
STANDARDS_SOURCES=
FULL_DIFF_PATH=
FULL_DIFF_SHA256=
HIGH_RISK_DIFF_PATH=
HIGH_RISK_DIFF_SHA256=
MANIFEST_PATH=
REVIEWER_NAME=
REVIEWER_MODEL=
REVIEWER_THINKING=
```

`FULL_DIFF_PATH` contains the complete review delta. `HIGH_RISK_DIFF_PATH` is an explicit focus subset chosen because those files/hunks carry higher semantic, safety, authority or failure-ordering risk.

The subset MUST NOT replace the full diff. A review that sees only the selected high-risk subset is incomplete.

The manifest records exact base/head, changed paths, deterministic/QA gates already run, authority sources, diff hashes and the selected reviewer route. Missing/mismatched evidence is STOP before review, not a reason to rediscover a different candidate.

## 4. Fresh read-only reviewer

Use a fresh Pi session isolated from the implementation worker. The selected route is explicit and observable; no silent model fallback/substitution is allowed.

Normal bounded launch shape:

```bash
herdr agent start "$REVIEWER_NAME" --kind pi --pane "$REVIEWER_PANE" --timeout 30000 -- \
  --model "$REVIEWER_MODEL" \
  --thinking "$REVIEWER_THINKING" \
  --name "$REVIEWER_NAME" \
  --tools read,grep,find,ls \
  --no-extensions \
  --no-skills \
  --no-prompt-templates
```

`--no-extensions` means extension-provided autoformat/autofix surfaces are not loaded. Do not also pass their extension-owned `--no-autoformat` / `--no-autofix` flags: on Pi `0.85.1` those flags are unavailable when extension discovery is disabled. The read-only tool allowlist provides the mutation boundary.

A rejected model/flag or identity mismatch is STOP. Planning may start a fresh reviewer with a corrected literal only under the same human promotion authority; the reviewer itself does not discover or substitute models.

The reviewer has no mutation surface, executes zero Gentle lifecycle commands and does not modify Git/GitHub/product state.

## 5. Three independent axes

Review all three axes and keep findings attributed to their axis:

1. **Spec / clinical semantics** — required behavior, explicit authority, unsupported inference, missing requirements, scope creep, treatment/validation distinctions where applicable.
2. **Standards / Clean Code** — repository coding standards, clarity, duplication, failure readability and maintainability. Reuse upstream review evidence when available; do not fork upstream review methodology into Atenea.
3. **Adversarial / Safety & failure ordering** — fail-open paths, partial mutation, stale authorization, unsafe fallback, ordering-dependent corruption, identity/authority mismatch, hidden destructive behavior and unsupported interaction paths.

A finding may be blocking on one axis while the other axes pass. Do not average or rerank axes into a softer overall result.

## 6. Bounded prompt and output

The reviewer reads the manifest, complete diff and high-risk subset, then only the authority/standards sources needed to adjudicate concrete findings. No broad host/repo archaeology.

Output rules:

- blocking findings first;
- then material nonblocking findings only;
- state PASS/FAIL per axis;
- finish with exactly one token:

```text
PROMOTION_REVIEW=PASS
```

or

```text
PROMOTION_REVIEW=FAIL
```

`PASS` requires **zero blocking findings**. Nonblocking observations remain visible but do not acquire candidate authority.

## 7. Candidate binding and invalidation

Promotion Review is bound to the exact `BASE_SHA`, `HEAD_SHA`, full-diff hash and high-risk-subset hash in the evidence pack.

Any candidate/head mutation after the review invalidates that Promotion Review result and requires a fresh review if the promotion boundary still requires one. This is a promotion-governance rule, not a Gentle lineage implementation.

## 8. Relationship to other gates

Promotion Review never substitutes for:

- repository tests/checkers/build/type/lint evidence;
- supported browser/manual QA where required;
- independent product acceptance/oracles;
- Gentle exact-candidate RDD and acknowledgement/burn;
- fresh pre-publication authority revalidation;
- explicit human merge/promotion authorization.

The intended order for a high-risk promotion is therefore:

```text
accepted candidate + required product/QA gates
→ Gentle authority already closed where applicable
→ fresh bounded Promotion Review if planning required it
→ exact-head verification
→ explicit human promotion/merge authorization
```

No automatic merge follows from `PROMOTION_REVIEW=PASS`.
