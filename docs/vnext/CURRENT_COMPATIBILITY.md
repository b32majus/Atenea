# Atenea vNext — Current Compatibility Notes

Status: **CURRENT RUNTIME / PROVIDER EVIDENCE**
Date: 2026-09-28

This document owns version/provider-specific exceptions that do not belong in stable `AGENTS.md` policy. Historical qualification remains in the dated evidence documents; this file describes what an operator should assume **now**.

## 1. Current prepared-ticket baseline

```text
Pi                 0.87.1
Herdr              0.9.1
Gentle AI          3.7.0
OpenCode           1.18.32 — qualified fallback worker
prepared supervisor Pi + Herdr
prepared worker     plain Pi child: `pi --no-extensions`
review transport    Codex via native Gentle review integration
Gentle Shell / ODD  not the prepared-ticket implementation entry
```

Qualified prepared-ticket topology:

```text
accepted executable authority
→ Pi supervisor + Herdr
→ one plain Pi worker
→ repository AGENTS / standards / applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ `gentle-ai review assess --agent codex ...`
→ exact provider-issued native lifecycle when due
→ terminal / durable checkpoint
```

OpenCode Build remains a qualified fallback implementation host after a concrete Pi runtime/tooling failure. Fallback does not reopen shaping and does not restore `gentle-orchestrator` as the prepared-ticket parent.

Canonical operation: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.

## 2. Qualification evidence — 2026-09-28

### Plain Pi implementation path

A Herdr-launched Pi child with argv `pi --no-extensions` completed the implementation canary in about 57 seconds of worker runtime / about 73 seconds supervisor wall time.

Observed properties:

- exactly one ticket worker;
- read `AGENTS.md`, `CODING_STANDARDS.md`, the applicable project skill and acceptance test before writing;
- changed only the authorized source path;
- 4/4 tests passed;
- `git diff --check` passed;
- independent hidden authorization oracle passed;
- produced one local candidate commit;
- no Gentle Shell, ODD or `gentle-orchestrator` execution path.

This qualifies plain Pi as the normal prepared-ticket implementation worker. It does not claim Pi is a native Gentle review host.

### Native review/correction path

Separate current qualification proved the native Gentle downstream lifecycle on an intentionally defective committed candidate:

```text
ASSESS high-risk
→ native reviewer lenses
→ deterministic severe findings
→ bounded correction authority
→ correction
→ targeted validator PASS
→ acknowledge-approved
→ authority burned
```

No refuter ran in that canary because the accepted findings were deterministic; the native refuter path remains conditional on the provider's inferential-finding rules rather than a mandatory ritual.

### Codex review transport seam

The same Git candidate produced by plain Pi was successfully assessed with:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent codex \
  --base-ref <candidate-base> \
  --committed-only \
  --json
```

It returned the expected high-risk candidate identity and an exact `review.status` continuation carrying `--agent=codex`. Therefore implementation runtime and review transport are intentionally decoupled: Pi authors the candidate; Codex transports native Gentle review work.

## 3. Plain Pi is not Gentle Shell review relay

`gentle-ai review assess --agent pi` fails closed under plain `pi --no-extensions` unless the Gentle Pi host-relay contract is present. That refusal is correct.

Never work around it by manually exporting:

```text
GENTLE_PI_REVIEW_RELAY_CONTRACT=gentle-pi.review-relay/v1
```

That contract belongs to the Gentle Shell/Pi host relay. A plain Pi child cannot self-attest that it provides the relay.

Prepared-ticket Atenea therefore uses Codex as review transport.

## 4. Pi resource discovery and project skills

`pi --no-extensions` disables extensions, not repository context or skills. In qualification, plain Pi still discovered `AGENTS.md`, global skills and the project-local `.agents/skills` tree.

Pi rejected a project skill lacking a description with:

```text
Skill conflicts
.../SKILL.md
  description is required
```

Compatibility rule for active project-local skills intended for the prepared-ticket worker:

```text
.agents/skills/<skill>/SKILL.md
```

with valid YAML frontmatter containing at least:

```yaml
name: <skill-name>
description: <non-empty trigger/purpose>
```

Do not bulk-copy runtime-specific skills between `.pi`, `.agents`, OpenCode or Codex roots merely to make directory layouts look uniform. Canonicalize a project-local skill under `.agents/skills` when it is actual cross-runtime project authority; leave runtime-owned/global assets with their owner.

## 5. Review entry and committed candidates

`review assess` derives risk from the Git candidate. `--agent` declares the runtime identity that will carry the provider-issued continuation; it does not identify who authored the code.

For a committed prepared-ticket candidate use the actual last-reviewed/ticket base plus `--committed-only`. If intended untracked files belong to the candidate, use the provider-supported untracked inventory/scope arguments instead of hiding them.

If `review_due=true`, execute `next_transition.command` exactly as returned. After START, preserve exact lineage/revision/target and use only provider-issued continuations.

With a committed-only transaction, an authorized bounded correction may need a new local commit before Gentle can see the corrected candidate. Follow the provider's typed continuation/stop contract; do not synthesize a replacement lineage.

Successful `acknowledge-approved → authority=burned` is terminal. Do not call selectorless STATUS merely to prove burn again.

## 6. Judgment Day

Judgment Day is a standalone explicit dual/adversarial review tool. It activates only when the user/ticket requests it for a concrete target. It replaces ordinary 4R as the adversarial method for that target; do not run both by ritual. It does not grant commit/push/PR/merge/release authority.

## 7. OpenCode fallback compatibility

OpenCode 1.18.32 remains qualified as a direct Build implementation host and has separately qualified native Gentle review/correction evidence.

Known OpenCode seams retained for fallback/provenance:

- clean one-shot `opencode run` can stall during initialization;
- fresh `opencode serve` was qualified for the prior bounded-host path;
- current prepared-ticket fallback should use direct Build semantics, not `gentle-orchestrator`/ODD;
- the historical reliability-lens empty-output incident on DeepSeek V4 was resolved by using Luna for that reviewer in the old OpenCode-orchestrator profile; this remains historical routing evidence rather than a rule for the Codex review transport.

Evidence:

- `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md`
- `docs/OPENCODE_GENTLE_ORCHESTRATOR_QUALIFICATION_20260928.md`
- `docs/OPENCODE_MODEL_ROUTING_QUALIFICATION_20260927.md`

Do not reinstall/pin an old OpenCode merely because an historical evidence file mentions it.

## 8. Engram / Context7

Engram and Context7 remain auxiliary capabilities, not product/spec/review authority. Ordinary prepared-ticket execution does not require them by default.

Disposable canaries must not write production Engram state. Preserve the isolated Engram pattern documented in the stable installation/evidence files when a canary genuinely exercises memory.

## 9. Historical Gentle-Pi/profile evidence

The old `native-balanced`, `native-v4-heavy`, `native-economy`, Pi reviewer-routing, committed-range facade defects, skill-registry watcher incident and related profile-store findings remain valid historical evidence for the runtimes/topologies actually tested.

They do **not** define the normal prepared-ticket worker now that the worker is plain Pi `--no-extensions` and review transport is Codex.

Relevant provenance remains in:

- `docs/GENTLE_PI_27_HYBRID_NATIVE_ZERO_TOUCH_EVIDENCE_20260915.md`
- `docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md`
- `docs/vnext/NATIVE_V4_HEAVY_PROMUEVE_CANARY_20260925.md`
- `docs/vnext/NATIVE_SKILL_RECONCILIATION_20260924.md`
- `docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md`
- `docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md`

Do not rewrite historical evidence to current terminology.

## 10. Stable-update discipline

For managed runtime maintenance:

```text
official owner updater
→ sync/reconcile managed assets
→ doctor
→ deterministic conformance
→ real bounded smoke only when the runtime seam changed
→ update Atenea desired-state/evidence
```

Do not manually overwrite managed package/binary contents when its owner provides a supported updater.

## 11. Current authority set

The current productive baseline is defined by:

- `AGENTS.md`;
- `docs/START_HERE.md`;
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- this document.

Dated qualification documents are evidence, not competing runtime authority.
