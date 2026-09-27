# Atenea — Promotion Review v1

Status: **CURRENT / CONDITIONAL WHEN INVOKED**
Date: 2026-09-27

## 1. Purpose

Promotion Review is an optional independent **read-only** audit at a human promotion/merge boundary when material semantic, integration, safety or harness-authority risk warrants a second look.

It is not part of every ticket/train and it does not extend Gentle RDD. Gentle remains the sole owner of candidate review/correction/burn authority.

## 2. Trigger

Invoke Promotion Review only when the human/planning surface identifies a concrete promotion risk, for example:

- a composed train crosses several material seams and deterministic integration evidence is not enough to answer a semantic/safety question;
- clinical/security/privacy write behavior or fail-closed boundaries deserve independent promotion scrutiny;
- recovery/main promotion combines previously separate branches or authority surfaces;
- a harness/runtime-authority change could silently broaden agent authority.

Do **not** invoke it by ritual after ordinary tickets, pushes or low-risk changes.

## 3. Minimum evidence

Bind the audit to the exact candidate with only the evidence needed to prevent drift:

```text
REPOSITORY
BASE_SHA
HEAD_SHA
AUTHORITY_REFS
APPLICABLE_VERIFICATION_RESULTS
FULL_DIFF or exact repository access to BASE..HEAD
```

A focused high-risk subset may be supplied when useful, but it is optional and never replaces access to the complete delta. Do not build hashes/manifests/subsets merely as paperwork when exact immutable Git identities already bind the evidence sufficiently.
## 4. Reviewer

Use one fresh read-only reviewer/session with no mutation or publication authority. The reviewer may inspect the bound diff plus only the authority/standards needed to adjudicate concrete findings.

Do not prescribe a Pi-era launcher, model table or special transport here. Use the current supported runtime/reviewer surface available at the promotion boundary. A runtime mismatch is a setup problem, not permission to mutate the candidate.

## 5. Review axes

Check proportionately:

1. **Semantics / authority** — does the candidate satisfy accepted behavior without unsupported inference or scope creep?
2. **Engineering / maintainability** — are there material clarity, failure-mode or maintainability problems not already covered by deterministic evidence/native review?
3. **Adversarial / safety** — are there fail-open, stale-authority, partial-mutation, ordering or destructive-path risks material to promotion?

Skip an axis that is genuinely inapplicable; do not manufacture findings to fill a template.

## 6. Output

Report blocking findings first, then material nonblocking findings. Finish with exactly one token:

```text
PROMOTION_REVIEW=PASS
```

or

```text
PROMOTION_REVIEW=FAIL
```

PASS requires zero blocking promotion findings. The result is evidence for the human boundary, not candidate authority or merge authorization.

## 7. Invalidation and publication

The audit is bound to exact BASE/HEAD. Candidate mutation invalidates it when Promotion Review is still required.

Normal order when invoked:

```text
required deterministic/composed-state evidence
→ Gentle lifecycle already closed where applicable
→ bounded Promotion Review
→ explicit human/repository promotion decision
```

No automatic merge follows from PASS.