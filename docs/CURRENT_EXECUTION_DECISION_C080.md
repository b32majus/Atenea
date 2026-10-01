# C-080 — Lean Assurance Runtime: collapse review routing and remove automatic recovery

Status: **CURRENT EXECUTION DECISION**
Accepted: 2026-09-29
Operational supervisor-routing addendum accepted: 2026-09-30
Review transport enforcement addendum accepted: 2026-10-01

C-080 is a SUBTRACTION decision. It preserves C-077's Pi-first prepared-ticket topology and every durable C-078/C-079 field lesson, then deletes the machinery those lessons no longer justify: the dual reviewer tables and the C-079 automatic recovery path. It does not add a review controller, does not restore ODD or `gentle-orchestrator`, and does not change product acceptance or publication authority.

Evidence basis: the completed read-only qualification `atenea-lean-assurance-20260929` (FINAL_REPORT) plus preserved field evidence C-078/C-079. That qualification found no surviving evidence for V4 in any reviewer role, no material value in Luna xhigh, and no justification for two reviewer tables. Provenance note: the qualification executed Luna through Pi under the Pi-visible identifier `openai-codex/gpt-6-luna`; the OpenCode review transport routes the same role via `openai/gpt-6-luna` as pinned in the assurance profile. Operational docs use the transport identifier only.

## 1. ONE assurance profile

Reviewer routing is owned by a single profile, `config/native-gentle/opencode-assurance.profile.json`, independent of the prepared implementation profile:

| Role | Model | Variant |
|---|---|---|
| review-readability | openai/gpt-6-luna | high |
| review-reliability | openai/gpt-6-luna | high |
| review-resilience | openai/gpt-6-luna | high |
| review-risk | nan/glm5.3-flash | high |
| review-validator | openai/gpt-6-luna | high |
| review-refuter | nan/mimo-v2.6-flash | conditional, provider-issued |
| lifecycle-host | nan/mimo-v2.6-flash | — |

- DeepSeek V4 holds **zero** reviewer roles. It remains the production-volume implementation writer.
- No review-* role uses Luna xhigh. (Explicit-only Judgment Day judges are outside the Gentle review-lens surface and unchanged.)
- The review host never asks the operator for `production-volume | complex`; that choice is impossible by construction and the T3 PROMueve profile-selection breach cannot recur.
- `production-volume` / `complex` remain durable per-ticket implementation-worker routing only (`prepared-routing-policy.json`).

## 2. Technical reviewer failure → HUMAN STOP

```text
reviewer success
→ continue exact Gentle lifecycle

technical reviewer failure
→ typed deterministic failure
→ HUMAN STOP
```

An observable terminal required-review failure (empty capturable output with `output_tokens=0`, or provider-typed `opencode_task_output_empty`) is normalized by `tools/classify-required-lens-zero-output.mjs` into `atenea.review-zero-output/v1` with `next_action = human_stop`. The normalizer is route-independent and does not choose models, authorize recovery, encode routes, count attempts or issue permits.

There is **no** automatic alternate-model recovery, no same-route retry after the first observable terminal failure, no model carousel, no RESET, no new START, no new ASSESS for an unchanged candidate, no skipped lens and no automatic profile switch. Candidate, lineage, revision and target stay preserved for the human.

## 3. C-079/C-078 recovery machinery is removed

Removed as live architecture (historical decision docs and field evidence remain intact provenance):

- qualified V4→Luna recovery routes from routing policy;
- `tools/authorize-required-lens-recovery.mjs`;
- the `atenea.review-zero-output-recovery-permit/v1` schema and permit semantics;
- `prior_recovery_attempts` recovery-ledger requirements;
- `--recovery-permit` behavior and recovery-specific mutation logic in `tools/render-opencode-routing-overlay.mjs`;
- the C-078 resilience and C-079 reliability recovery compatibility paths;
- recovery-specific conformance cases;
- runbook/handoff instructions for classify → bound STATUS → permit → alternate-model host.

## 4. Gentle ownership unchanged

Gentle alone owns ASSESS, `review_due`, adaptive depth, native 0 / 1 / 4 lens selection, exact lens slots, bounded correction, refuter/validator when provider-issued, acknowledge/burn and lifecycle state. Atenea adds no second review controller. OpenCode remains review transport (per-process config) and qualified fallback implementation runtime only.

## 5. Composition and evidence boundaries unchanged

Composition remains signal-driven (`docs/WORK_UNIT_COMPOSITION_POLICY_V1.md`): only material signals justify it; no universal numeric gate is reintroduced. Evidence/artifact names use durable identity (ticket + lineage + artifact-kind), bounded expected-location lookup only, and HUMAN STOP when a durable ID is absent. Telemetry stays non-blocking and outside the assurance path.

## 6. Publication boundary unchanged

Review approval is not push/PR/merge/deploy authority. Material product/scope/acceptance/oracle/publication changes remain HUMAN STOP.

## Review transport enforcement addendum — serve-only launcher

The C-080 review topology is unchanged, but its operational seam is now fail-closed at the qualified launch surface. The review-host launcher is the only current review-host entry. It requires the per-process rendered assurance config, enforces atenea-review-host = primary and every review-* role as subagent, and rejects one-shot opencode run, direct reviewer --agent selection, alternate config sources and implementation-profile selection.

This does not promote any review-* role to primary and does not add an Atenea review controller. OpenCode Tasks remain the reviewer transport inside the primary lifecycle host. The guard exists because OpenCode's one-shot CLI can accept a subagent as --agent and fall back to its primary agent instead of preserving the requested reviewer role; C-080 therefore treats direct reviewer one-shot invocation as an invalid transport, not a recoverable review attempt.

The corresponding deterministic checker is tools/check-opencode-review-transport.mjs. Qualification must cover both the negative guard (run --agent review-* rejected before provider launch) and the positive fresh-serve → atenea-review-host → reviewer Task → capture → acknowledge/burn path.

## 7. Supervisor routing addendum — DeepSeek V4 Flash default

The prepared supervisor remains a thin clean Pi + Herdr control-plane role, but its default model is now explicit:

```text
supervisor → pi --no-extensions --model nan/deepseek-v4-flash
```

This does **not** change implementation or assurance routing:

```text
implementation
  production-volume → nan/deepseek-v4-flash
  complex           → nan/glm5.3-flash high

assurance
  unchanged from sections 1–4
```

The supervisor model never inherits the implementation profile. A `complex` child still means V4 supervisor → GLM implementation worker → native Gentle lifecycle. There is no automatic supervisor escalation to GLM, no supervisor model carousel and no profile switch inside an active candidate/review lineage. A concrete supervisor/runtime refusal or a material procedural error preserves the current checkpoint and becomes HUMAN STOP for explicit adjudication.

Field basis is operational rather than synthetic. Operator-confirmed V4 Flash supervisors successfully coordinated completed C-080 work in multiple repositories and task classes, including Laboratorio de Privacidad (prepared train T22→T24→T25 and later HARDEN-01), PsO-Valme (Train-B/Train-C technical completion), and Symphonia Planning Foundation. Those runs exercised ordinary production-volume work, complex GLM implementation children, native Gentle review, correction cycles and a real HUMAN STOP without a supervisor-attributable frontier, candidate/lineage, publication-boundary or review-routing failure being observed. PROMueve remained useful comparison evidence under a GLM supervisor but is not counted as V4-supervisor qualification.

This is a routing-efficiency decision, not a claim that V4 is universally stronger than GLM. GLM remains reserved for implementation work that meets the existing material `complex` triggers and for the existing review-risk role.