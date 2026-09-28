# Atenea vNext — Current Compatibility Notes

Status: **CURRENT RUNTIME / PROVIDER EVIDENCE**
Date: 2026-09-28

This document owns version/provider-specific exceptions that do not belong in stable `AGENTS.md` policy. Historical qualification remains in dated evidence documents; this file describes what an operator should assume **now**.

## 1. Current prepared-ticket baseline

```text
Pi                  0.87.1
Herdr               0.9.1
Gentle AI           3.7.0
prepared supervisor Pi + Herdr
prepared worker     plain Pi child: `pi --no-extensions`
default worker      production-volume → nan/deepseek-v4-flash
complex worker      complex → nan/glm5.3-flash · high
review transport    qualified OpenCode V1 native Gentle transport
Gentle Shell / ODD  not the prepared-ticket implementation entry
OpenCode Build V1   qualified fallback implementation worker
```

Qualified prepared-ticket topology:

```text
accepted executable authority
→ Pi supervisor + Herdr
→ select production-volume|complex at a clean candidate/work-unit boundary
→ one plain Pi worker
→ repository AGENTS / standards / applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ `gentle-ai review assess --agent opencode ...`
→ exact provider-issued native lifecycle through OpenCode V1 when due
→ terminal / durable checkpoint
```

Canonical operation: `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
Canonical routing: `config/native-gentle/prepared-routing-policy.json`.

## 2. Plain Pi implementation qualification

A Herdr-launched Pi child with argv `pi --no-extensions` completed the implementation canary in about 57 seconds of worker runtime / about 73 seconds supervisor wall time.

Observed properties:

- exactly one ticket worker;
- read `AGENTS.md`, `CODING_STANDARDS.md`, applicable project skill and acceptance test before writing;
- changed only the authorized source path;
- deterministic tests and `git diff --check` passed;
- independent hidden authorization oracle passed;
- produced one local candidate commit;
- no Gentle Shell, ODD or `gentle-orchestrator` execution path.

This qualifies plain Pi as the normal prepared-ticket implementation worker. It does not claim Pi is a native Gentle review host.

## 3. Native review/correction qualification

Separate qualification proved the downstream Gentle lifecycle on an intentionally defective committed candidate:

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

No refuter ran because the accepted findings were deterministic; native refutation remains conditional when the provider requires it.

The current production review transport is the already-qualified OpenCode V1 path. Plain Pi authors the candidate; OpenCode V1 carries native Gentle review. These are separate responsibilities.

## 4. Prepared profiles

```text
production-volume (default) → Pi + nan/deepseek-v4-flash
complex                     → Pi + nan/glm5.3-flash · high
```

`complex` is triggered by material reasoning/semantic risk: novel/cross-cutting architecture, difficult concurrency/temporal/scheduling/state/solver semantics, material security/privacy/auth/tenancy/clinical/trust boundaries, delicate migration/back-compat/distributed invariants, or repeated semantic/correction failure under production-volume.

File count, ticket length, ordinary UI work, many tests, or business importance alone are not triggers. Do not switch profile in the middle of an active candidate/review lineage.

Reviewer routing is profile-specific and is defined in:

- `config/native-gentle/prepared-production-volume.profile.json`;
- `config/native-gentle/prepared-complex.profile.json`.

OpenCode V1 keeps the distinct native reviewer roles: risk, readability, reliability, resilience, conditional refuter and conditional validator. Judgment Day remains explicit-only.

## 5. Plain Pi is not Gentle Shell review relay

`gentle-ai review assess --agent pi` fails closed under plain `pi --no-extensions` without the Gentle Pi host-relay contract. That refusal is correct.

Never work around it by manually exporting `GENTLE_PI_REVIEW_RELAY_CONTRACT`. A plain Pi child cannot self-attest that it provides the Gentle Shell/Pi relay.

Prepared-ticket Atenea therefore invokes native review through the qualified OpenCode V1 transport.

## 6. Pi resource discovery, trust and project skills

`pi --no-extensions` disables extensions; it does not disable repository context or skill discovery. Pi supports trusted project skills from both:

```text
.pi/skills/
.agents/skills/
```

If no saved trust decision applies and an unattended worker must consume intentionally trusted repository resources, pass Pi's one-run `--approve` override together with `--no-extensions`. It is not a sandbox or permission to trust arbitrary checkouts.

Compatibility rules:

- keep valid `.pi/skills` where intentionally Pi-specific/project-local;
- prefer `.agents/skills/<skill>/SKILL.md` when intended as cross-runtime project authority;
- do not bulk-copy/migrate skills merely to normalize layout;
- discovered `SKILL.md` files require non-empty `name` and `description` frontmatter;
- leave runtime-owned/global assets with their owner.

## 7. Review entry and committed candidates

For a committed prepared-ticket candidate use the actual last-reviewed/ticket base plus `--committed-only`:

```bash
gentle-ai review assess \
  --cwd "$PWD" \
  --agent opencode \
  --base-ref <candidate-base> \
  --committed-only \
  --json
```

If `review_due=true`, execute `next_transition.command` exactly as returned. After START, preserve exact lineage/revision/target and use only provider-issued continuations.

With a committed-only transaction, an authorized bounded correction may need a new local commit before Gentle can see the corrected candidate. Successful `acknowledge-approved → authority=burned` is terminal.

## 8. Judgment Day

Judgment Day is standalone explicit dual/adversarial review. It activates only when the user/ticket requests it for a concrete target. Do not run it in addition to ordinary 4R by ritual. It does not grant publication authority.

## 9. OpenCode compatibility boundary

Current prepared-ticket review intentionally uses the qualified OpenCode V1 transport because that is the compatibility path retained for native Gentle review. Do not silently substitute an OpenCode V2 transport into this baseline. V2 compatibility work remains separate from current production execution.

OpenCode Build V1 also remains the implementation fallback after a concrete Pi runtime/tooling failure; fallback does not restore `gentle-orchestrator`/ODD.

## 10. Current authority set

The current productive baseline is defined by:

- `AGENTS.md`;
- `docs/START_HERE.md`;
- `docs/CURRENT_EXECUTION_DECISION_C077.md`;
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- `docs/PREPARED_TRAIN_HANDOFF_C077.md`;
- `config/native-gentle/prepared-routing-policy.json`;
- this document.

Dated qualification documents are evidence, not competing runtime authority.
