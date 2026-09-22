# Atenea Harness Contract vNext

Status: **CURRENT NORMATIVE BOUNDARY**

Atenea is not a second execution harness around Gentle.

The contract is the ownership boundary between durable repository authority, native Pi/Gentle execution, deterministic evidence and human publication authority.

## 1. Product authority

Humans and durable repository artifacts own:

- WHAT is being changed;
- WHY it matters;
- acceptance criteria;
- domain/safety constraints;
- non-goals;
- publication/merge authorization.

A runtime may decompose accepted work. It may not expand product authority.

## 2. Stable Atenea policy

Atenea owns only durable policy/configuration/evidence that adds value above upstream:

- `AGENTS.md`;
- `CODING_STANDARDS.md`;
- phase-scoped shaping guidance;
- secret-free provider/profile desired state;
- deterministic conformance tooling;
- publication/Git guardrails;
- architectural and qualification provenance.

Target Atenea-owned runtime controllers: **0**.

## 3. Native execution authority

Pi + Gentle own the execution lifecycle:

```text
explore/classify
→ decompose
→ delegate bounded work
→ enforce edit surfaces
→ verify
→ create work-unit commits when native flow requires
→ ASSESS / native review routing
→ reviewer/refuter/validator
→ correction lifecycle
→ acknowledge-approved
→ authority burned
```

Atenea must not proxy or shadow that lifecycle.

## 4. Review authority

Only native provider/Gentle state may create or consume review authority.

Atenea must not:

- invent reviewer verdicts;
- reconstruct lineage or target identity;
- synthesize START;
- reproduce provider review timing from line counts;
- replace native consent;
- replay reviewer output;
- create a second burn/receipt state machine.

Successful native `acknowledge-approved` returning `authority=burned` is terminal evidence.

Current version/provider exceptions are documented in `docs/vnext/CURRENT_COMPATIBILITY.md`.

## 5. Deterministic evidence

Machine-decidable facts should be proven mechanically.

For Atenea:

```bash
node tools/check-native-gentle-profile.mjs
node tools/check-vnext-authority.mjs
```

Product repositories should use their own relevant tests, typechecks, builds, schema validators, security checks and CI.

Oracles produce evidence; they do not grant review or publication authority.

## 6. Configuration

Versioned desired state is secret-free:

- `config/native-gentle/nan-provider.models.json`;
- `config/native-gentle/native-nan.profile.json`.

Upstream Pi/Gentle owns application and runtime routing.

Credentials remain in supported local credential storage/environment and are never committed.

Hidden global state must be inspectable against versioned desired state whenever it materially affects behavior.

## 7. Shaping

Shaping is active only while product/execution authority is genuinely incomplete.

Default execution-ready seam:

```text
minimal semantic execution contract
→ native Gentle
```

Matt skills are optional discovery/shaping.

OpenSpec is optional native SDD when durable specs/change history add value.

No shaping method is mandatory by ritual.

## 8. Repository entry

Before changing a brownfield repository:

- find live Git/GitHub/product authority;
- read repository policy;
- inspect old tooling read-only;
- distinguish current from historical;
- STOP on material unresolved conflict.

Old files do not gain authority by existing.

## 9. Work-unit composition

Prefer coherent, reviewable work units.

Do not code-golf useful tests/docs merely to hit a numeric budget.

Planning size is not native review timing.

If a change is obviously oversized, slice it before implementation when practical. Native Gentle remains the owner of actual review_due/risk decisions.

## 10. Publication

Native review approval is necessary evidence where review applies, but it is not merge authority.

Publication follows:

- target repository policy;
- changed-artifact validation;
- explicit human/publication authorization.

No automatic merge, force-push or destructive history repair.

## 11. Historical artifacts

Pre-vNext runtime controllers, relays, patches and fixtures are preserved under `historical/runtime/` and Git history.

They are non-operative.

A future regression must first be reproduced against the supported native stack. Historical machinery may not be restored to production without a new explicit architectural decision and qualification.
