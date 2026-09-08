# Gentle Pi 2.5 / Gentle AI 2.7 — Golden promotion evidence

Status: **CURRENT ADOPTION EVIDENCE**
Date: 2026-09-08
Authority: Atenea #72 qualification + operator-authorized promotion #73

## Decision

Atenea adopts Gentle Pi `2.5.0` with package-paired Gentle AI `2.7.0` for the normal unattended Pi/Gentle-Pi worker path.

This is a **runtime promotion, not a new outer orchestration architecture**. The field-proven outer Golden remains:

```text
explicit human execution authorization
→ plain non-implementing Pi supervisor
→ Herdr
→ fresh Pi + Gentle-Pi ticket worker
→ deterministic verification
→ native exact-candidate RDD
→ acknowledgement/burn
→ normal non-force publication
→ supervisor reconciliation
→ next fresh worker or STOP
→ human merge boundary
```

Gentle Agents 2.5 are an optional **inner delegation seam** inside the fresh ticket worker. They do not replace the fresh outer worker-per-ticket boundary.

## Qualified 2.5 / 2.7 properties

```text
GENTLE_PI_2_5_NATIVE_AGENTS                         PASS
PACKAGE_OWNED_GENTLE_AI_WORKER_CHILD                PASS
REAL_BOUNDED_WRITER_REPLAY                          PASS
GENTLE_PI_2_5_INTERACTIVE_STANDING_PERMISSION       PASS
STANDING_PERMISSION_UNATTENDED_AUTHORITY             NO
ATENEA_MECHANICAL_CONSENT_RELAY_ON_2_5              PASS
ZERO_HUMAN_TOUCH_RELAY_CONSENT                      PASS
FULL_NATIVE_RDD_START_TO_APPROVED                    PASS
REVIEWER_MODEL_RUN_FORECAST_ACK                     PASS
OPAQUE_BINDING_EXACT_REUSE                          PASS
ACKNOWLEDGE_APPROVED                                PASS
AUTHORITY_BURN                                      PASS
SUPERVISOR_GENTLE_LIFECYCLE_COMMANDS                0
```

## Native Gentle Agents result

Gentle Pi 2.5 ships the package-owned `gentle-agents` runtime. A package-owned `gentle-ai-worker` child was launched through the supported `subagent_*` surface with its own isolated Pi RPC session and then performed real bounded PROMueve replay work. The child produced the expected implementation and passed the frozen C1 oracle plus focused parser/browser checks.

The experiment also showed why delegation remains conditional: the replay task was intentionally too large for an infrastructure qualification and consumed unnecessary context. Atenea therefore exposes native Gentle Agents as a supported capability but does not turn every trivial ticket into a multi-agent workflow.

Current accepted rule:

```text
fresh ticket worker = unit of responsibility
native Gentle Agent = optional internal worker/verifier
third-party pi-subagents = not required
```

## RDD consent result

Gentle Pi 2.5 adds a host-owned interactive option:

`Run this review and allow reviews for this Pi session`

The grant is in-memory and scoped to the live Pi session plus canonical Git common-directory identity. It is useful for **attended interactive** work, but creating it requires a direct human selection. It therefore does not replace Atenea's unattended consent path.

For unattended tickets and trains, the qualified path remains:

```text
provider consent/v3
→ versioned Atenea mechanical relay
→ plain supervisor bounded GRANTED / DECLINED
→ worker executes the provider answer-consent transition
→ worker retains all RDD lifecycle ownership
```

The supervisor never executes a Gentle lifecycle command and never reconstructs an opaque provider envelope.

## Full lifecycle smoke

The final microscopic qualification used one tiny candidate and one `review-reliability` lens. It reached native START, zero-touch relay consent, reviewer forecast, bounded ACK, exact opaque binding reuse, native `approved`, `acknowledge-approved`, and `authority=burned`.

Mechanical log reconciliation confirmed exactly one reviewer model run, zero `ask_user_choice` calls on the unattended path, exact binding reuse, terminal approval and burn.

## Installation defect found during qualification

One isolated candidate install initially contained the 2.7 integrity manifest but not the required package-local `gentle-ai` executable. `gentle_review inspect` correctly failed closed with `package-local-binary-missing` before any review lineage was created.

Running Gentle Pi's own supported postinstall restored the binary. The qualifying preflight was strengthened accordingly: checking only package version/manifest is insufficient. A trusted installation must also prove that the package-local binary exists, is executable, reports the paired version and matches `integrity.json`.

This was a qualification-environment installation defect, not a Gentle lifecycle defect.

## Opaque-state routing guardrail

A Luna `minimal` qualification worker reproduced a long provider `collectBinding` incorrectly by three trailing characters and the provider rejected the malformed JSON before any reviewer ran. Repeating the same microscopic lifecycle with Luna `high` reproduced the binding byte-for-byte and completed approval/burn.

Atenea therefore does not use `minimal` for an RDD-owning ticket parent or any actor that must preserve opaque provider state exactly.

## Adopted operational routing after promotion

```text
Atenea Pi supervisor
  opencode-go/deepseek-v4-flash · medium

Fresh Gentle-Pi parent / coordinator
  opencode-go/glm-5.3-flash · high

Native gentle-ai-worker
  openai-codex/gpt-5.6-luna · high

Native gentle-ai-verify
  openai-codex/gpt-5.6-luna · high

Native RDD lens / refuter / targeted validator
  no new Atenea per-lens pin in this promotion
  provider selects lifecycle role; Gentle-Pi host relay launches isolated Pi
  without inheriting the parent CLI model literal
```

GLM 5.3 Flash high is promoted from candidate to the normal coordinator baseline based on the earlier A/B evidence plus successful real PROMueve use on 2026-09-07. DeepSeek V4 Flash high remains proven fallback evidence for the parent/coordinator role, subject to explicit routing rather than silent fallback.

Writer/verify Luna remain `high`; Atenea does not trade quality for a negligible cost reduction by downgrading them to medium.

## Machine/global promotion verification

The production VPS was promoted through supported upstream installation surfaces after the bounded qualification.

```text
Pi                         0.85.1
Herdr                      0.9.0
Gentle Pi                  2.5.0
Gentle AI global           2.7.0
pi-intercom                0.13.0
package-local Gentle AI    2.7.0
package-local binary SHA   8748b9f18c05a831692abc0ae560fdc50a4e4c8f492705edcce7f65e067a7b12
integrity manifest match   PASS
gentle-ai doctor           8 PASS / 0 FAIL / 0 WARN
```

The Pi user package pin was changed from `npm:gentle-pi@2.4.0` to `npm:gentle-pi@2.5.0`. Existing target repositories inspected during promotion inherit that machine/global package; Atenea did not create duplicate repo-local Gentle Pi installations.

The global native Gentle Agent profiles were set to:

```text
gentle-ai-worker = openai-codex/gpt-5.6-luna / high
gentle-ai-verify = openai-codex/gpt-5.6-luna / high
```

Historical `review-*`, refuter and validator profile residue was not promoted into current native RDD routing authority.

## Promotion boundary

This adoption does not delete the Atenea RDD relay, does not create an Atenea reviewer wrapper, does not replace Herdr, does not make standing permission an unattended primitive, and does not make internal delegation mandatory.

The next real unattended run should use the current front door and spawn recipe. Any future simplification must again pass the upstream-first deletion test rather than being inferred from release notes.

Post-promotion native package smoke also invoked the **global installed package-local** `gentle-ai 2.7.0` binary directly against a fresh Git repository; `review status` returned authoritative `clean` status successfully (`GLOBAL_PACKAGE_NATIVE_STATUS=PASS`).
The promotion also reconciled Gentle Pi 2.5's canonical global model authority (`~/.pi/gentle-ai/models.json`) with `~/.pi/agent/subagents.json` for exactly the two adopted native-Agent profiles. This prevents session-start model-config application from restoring the previous worker/verify routes. Historical `review-*` / refuter / validator entries were deliberately left unchanged because #73 does not adopt or rewrite native RDD per-lens routing.
