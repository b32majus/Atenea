# Atenea Qualification

Status: **CURRENT PREPARED-TICKET QUALIFICATION**
Date: 2026-09-28

## Current qualified architecture

```text
Atenea policy / repository authority
                    ↓
Pi supervisor + Herdr
                    ↓
ONE plain Pi ticket worker (`pi --no-extensions`)
                    ↓
implementation + deterministic checks/oracles
                    ↓
local candidate commit
                    ↓
Gentle AI 3.7 native ASSESS through Codex transport
                    ↓
RDD / correction / validator / acknowledge-burn when due
```

OpenCode 1.18.32 Build is the qualified fallback implementation worker.

Current execution decision: `docs/CURRENT_EXECUTION_DECISION_C077.md`.
Current operator path: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
Current runtime seams: `docs/vnext/CURRENT_COMPATIBILITY.md`.

## What is qualified

### Prepared-ticket implementation discipline — PASS

Direct implementation without `gentle-orchestrator` has been exercised in two runtimes:

- OpenCode Build;
- plain Pi `--no-extensions` launched as one Herdr ticket worker.

The canaries proved that the worker can read repository policy/standards/applicable skills before writing, remain inside allowed paths, pass deterministic tests and hidden oracle evidence, and create the intended local candidate commit without ODD.

The plain-Pi worker completed its bounded authorization canary in about 57 seconds worker runtime / 73 seconds supervisor wall time and changed only the authorized source path.

### Native Gentle clean review path — PASS

Current evidence includes a high-risk native review reaching approved acknowledgement/burn on one durable lineage.

### Native Gentle correction path — PASS

An intentionally fail-open committed authorization candidate exercised:

```text
ASSESS high-risk
→ multiple severe deterministic findings
→ bounded correction authority
→ one-line fail-closed correction
→ deterministic checks
→ targeted validator PASS
→ acknowledge-approved
→ authority burned
```

No refuter ran because the admitted findings were deterministic. The native refuter remains conditional on inferential findings; it is not a mandatory stage that must be synthetically forced on every qualification.

### Pi supervisor + Herdr single-worker topology — PASS

The supervisor launched exactly one child, observed it, did not implement itself, and preserved the one-ticket-worker ownership model.

### Plain Pi as Gentle review host — NOT QUALIFIED / NOT USED

This is deliberate. Plain Pi correctly fails closed for `--agent pi` without the Gentle-Pi host relay contract. Manually exporting `GENTLE_PI_REVIEW_RELAY_CONTRACT` is not accepted because plain Pi does not provide that relay.

The same Git candidate produced by Pi successfully entered assessment with `--agent codex`, returning the expected candidate/risk identity and exact Codex-bound continuation. Therefore:

```text
Pi = implementation runtime
Codex = native Gentle review transport
```

is the qualified boundary.

### Judgment Day

Judgment Day is upstream standalone capability, not part of the mandatory RDD path. It is invoked only when explicitly requested for a concrete target and does not grant delivery authority.

## Engineering-quality boundary

Qualification proves the execution architecture can preserve repository policy, deterministic checks/oracles and native review/correction/validation.

It does not turn reviewer opinion into a performance benchmark. A production-relevant performance requirement must be encoded in a measurable repository-owned check/benchmark/oracle when material.

## Skills compatibility

Plain Pi with `--no-extensions` still discovers repository context and skills. Project-local skills intended for cross-runtime project use should live at `.agents/skills/<name>/SKILL.md` with valid YAML frontmatter containing non-empty `name` and `description` fields.

Observed Pi behavior fails the skill closed when `description` is missing. This is now part of project compatibility review.

Do not bulk-duplicate runtime-owned global skills merely to normalize filesystem layout.

## Fallback qualification

OpenCode Build remains qualified for direct prepared-ticket implementation. Native Gentle review/correction/burn has also been exercised from the OpenCode-era qualification. If plain Pi has a concrete tooling/runtime defect, preserve the candidate/worktree and use OpenCode Build under the same prepared-ticket contract; do not reopen ODD.

## Historical qualification

Earlier Pi/Gentle Shell ODD, OpenCode serve/orchestrator, profile-routing and context-optimization qualifications remain valid historical evidence for the exact topologies they tested.

They do not define current prepared-ticket entry. In particular:

- C-076 proves upstream-orchestrator behavior but is superseded for prepared tickets by C-077;
- C-075 profile routing remains OpenCode-orchestrator provenance rather than the current normal ticket route;
- old Gentle-Pi profile and review-relay findings remain useful compatibility provenance but the normal worker is plain Pi.

Do not rewrite dated evidence to current terminology.

## Current deterministic authority check

`tools/check-vnext-authority.mjs` validates that current front-door documents point to the prepared-ticket Pi runtime and no longer advertise C-076/OpenCode-orchestrator as the current ordinary entry.

Runtime maintenance/doctor checks remain owned by the exact component being changed. Do not rerun broad qualification for ordinary product tickets when no runtime seam changed.

## Publication boundary

Qualification does not authorize push, PR, merge, deploy or destructive cleanup in target projects. Those remain target-repository/human decisions.
