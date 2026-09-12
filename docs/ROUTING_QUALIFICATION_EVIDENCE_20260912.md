# Atenea routing qualification evidence — 2026-09-12

Status: **CURRENT ROUTING QUALIFICATION EVIDENCE**
Authority: operator decision recorded in Atenea issue #75.

This record explains why Atenea's current role-specific model routing changed after the Gentle Pi 2.5 / Gentle AI 2.7 Golden promotion. It does **not** change Atenea architecture: model/provider/effort remain replaceable operational routing.

## 1. Adopted routing result

| Phase / role | Current route | Effort | Evidence interpretation |
|---|---|---|---|
| Atenea Pi supervisor | `opencode-go/deepseek-v4.1-flash` | `medium` | operator-adopted current residual supervisor baseline; old V4 Flash route retained as historical field evidence only |
| Fresh Gentle-Pi parent/coordinator | `opencode-go/glm-5.3-flash` | `high` | `FIELD_PROVEN`; retained after Sep-12 coordinator comparison |
| Native `gentle-ai-worker` | `opencode-go/glm-5.3-flash` | `high` | adopted after two controlled real-PROMueve worker replays |
| Native `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` | retained after direct verifier replay; complementary to V4.1 |
| `review-readability` | `openai-codex/gpt-5.6-luna` | `high` | better severity calibration / lower review inflation |
| `review-reliability` | `opencode-go/deepseek-v4.1-flash` | `high` | stronger mandate coverage / causal evidence |
| `review-resilience` | `opencode-go/deepseek-v4.1-flash` | `high` | excellent two-defect recall with stronger mechanism evidence |
| `review-risk` | `opencode-go/deepseek-v4.1-flash` | `high` | best causal grouping + blocker calibration in the role test |
| `review-refuter` / `review-validator` | no new Atenea pin | inherited/provider route | historical machine pins must be cleared; no silent stale routing |

The routing is intentionally diverse across the three critical boundaries:

```text
GLM 5.3 Flash builds/co-ordinates
→ Luna verifies
→ V4.1 reviews material reliability/resilience/risk
```

`review-readability` remains on Luna because the role-specific test showed materially better severity calibration. Sol remains escalation-only, not a routine Atenea route. Rejected literals never trigger silent fallback.

## 2. Generic reviewer microbenchmark

A six-case synthetic-but-controlled review benchmark first compared Luna High, DeepSeek V4.1 Flash High, GLM 5.3 Flash High and Qwen 3.8 Flash High on reliability, resilience, risk, refutation, readability and targeted validation.

All four showed useful capability. Luna produced the cleanest signal/noise overall; V4.1 and GLM were also strong; Qwen had excellent recall but more duplicated or speculative review surface. This benchmark was treated as directional only and did **not** decide final role pins.

## 3. Worker qualification on real PROMueve history

### Case 1 — issue #317 stale-stage expiry

Luna, V4.1 and GLM independently found the same exact lifecycle seam and functional repair: expire `review.staged` at the parse-run boundary while preserving review-scoped confirmations, applied history and cancellation semantics. All three passed the frozen oracle and focused regressions. The case demonstrated competence but did not discriminate strongly.

### Case 2 — issue #334 e-Orden presentation context

All three candidates passed the frozen oracle, but the real ticket contained a stricter safety boundary than the frozen oracle exercised: a recognized e-Orden could contain an explicit title pathology that contradicted the explicit SES program/pathology declaration.

GLM required title ↔ SES/pathology coherence and added a supplemental deterministic check for this and related unsafe combinations. Luna and V4.1 accepted the contradictory source because the parser itself still reported the unit as `RECOGNIZED`. The later accepted historical implementation contained the same coherence boundary GLM had independently reconstructed.

Decision: adopt `opencode-go/glm-5.3-flash` `high` for `gentle-ai-worker`. The evidence is strong controlled real-work A/B/C evidence; it should not be mislabeled as long-duration field history until exercised through the native worker profile in normal Atenea work.

## 4. RDD lens qualification using the installed GP2.5 contracts

The next comparison used the actual installed `review-readability`, `review-reliability`, `review-resilience` and `review-risk` role contracts rather than generic reviewer prompts.

- **Readability:** Luna grouped the material maintainability regression into one `WARNING`; V4.1 split it and elevated the nesting finding to `CRITICAL`. Luna therefore had better severity calibration and less review inflation.
- **Reliability:** both found the unkeyed in-flight cache defect. V4.1 also covered the lost cross-project concurrency/testing mandate, with some duplication but no false technical claim.
- **Resilience:** both found the missing spawn-error handling and uncleared timeout. V4.1 gave stronger mechanism/before-after evidence; both were acceptable.
- **Risk:** Luna and V4.1 correctly grouped the authorization OR defect into one root cause; V4.1 calibrated it as `BLOCKER`. GLM Flash emitted three blocker findings for three consequences of the same OR root cause, inflating the ledger.

Decision: Luna High for `review-readability`; DeepSeek V4.1 Flash High for `review-reliability`, `review-resilience` and `review-risk`.

## 5. Parent/coordinator qualification on historical PROMueve #340

GLM 5.3 Flash High and V4.1 Flash High were run as persistent, non-implementing Gentle-Pi parent/coordinators through a five-phase historical C2 replay: authority reconciliation, worker handoff audit, RDD closure, publication boundary and final supervisor handoff.

V4.1 performed the stronger local candidate audit and independently discovered two real historical C2 defects. However, after correctly marking the candidate `CORRECTION_REQUIRED`, it later allowed `PUBLICATION_READY` when the RDD became acknowledged/burned even though its own correction gate had never been discharged. That is a material longitudinal coordinator failure: RDD closure cannot erase an independent open product gate.

GLM did not discover those hidden product defects, but it preserved every authority/lifecycle gate it had established across all five phases and kept parent/coordinator, worker and outer-supervisor ownership distinct.

Decision: retain `opencode-go/glm-5.3-flash` `high` as the parent/coordinator baseline. V4.1's stronger audit signal is deliberately used downstream instead of making it the persistent coordinator.

## 6. `gentle-ai-verify` direct replay

Luna High and V4.1 Flash High then verified the exact historical #340 candidate under the installed `gentle-ai-verify` read-only contract with the same authorized command list.

Both correctly blocked because the required Enfermería regression checker crashed after the C2 shared-surface change. Their independent static inspection was complementary:

- V4.1 found the value-keyed vaccination adapter defect: `SÍ` / `NO` / `Pendiente` could be coerced for unrelated C1/C2 concepts because the mapping checked `raw` before checking the concept.
- Luna found two different real defects: exact ISO date handling trimmed whitespace despite a no-whitespace contract, and the chip/radio writer could perform zero mutation while `applyConcept()` still reported success and recorded `review.applied`.

The union of Luna + V4.1 found four real defects; neither model alone found all four. This is direct evidence for deliberate model diversity rather than a single-model review stack.

## 7. pi-lens operational isolation result

During Sep-12 performance isolation, Pi 0.85.1 was normal without Lens. Pi 0.85.1 + `pi-lens` 3.8.74 was severely slow even with Gentle Pi absent. Disabling Lens feature flags (`--no-lsp --no-tests --no-opengrep --no-read-guard --no-lens-context --no-autoformat --no-autofix`) did not remove the slowdown, which points to the Lens core/lifecycle interaction rather than one exposed feature.

Operational decision: keep the `pi-lens` package installed but disable its global extension on the current VPS. Do not repair, wrap or upgrade it inside Atenea merely to preserve Lens. A later upstream version may be separately requalified against the then-current Pi version.

This supersedes the older "pi-lens diagnostic-only" operational wording for the current Pi 0.85.1 / Lens 3.8.74 machine combination.

## 8. Machine cutover required after repository acceptance

Documentation alone does not change the next Pi/Gentle session. After the routing promotion is accepted, the VPS global model-routing authority and effective installed profiles must be reconciled.

Canonical `~/.pi/gentle-ai/models.json` intent:

```json
{
  "gentle-ai-worker": { "model": "opencode-go/glm-5.3-flash", "thinking": "high" },
  "gentle-ai-verify": { "model": "openai-codex/gpt-5.6-luna", "thinking": "high" },
  "review-readability": { "model": "openai-codex/gpt-5.6-luna", "thinking": "high" },
  "review-reliability": { "model": "opencode-go/deepseek-v4.1-flash", "thinking": "high" },
  "review-resilience": { "model": "opencode-go/deepseek-v4.1-flash", "thinking": "high" },
  "review-risk": { "model": "opencode-go/deepseek-v4.1-flash", "thinking": "high" },
  "review-refuter": {},
  "review-validator": {}
}
```

The explicit empty refuter/validator entries are intentional: Gentle Pi's supported model-routing authority treats `{}` as inherit/clear, so applying this config removes stale historical per-agent pins instead of silently retaining them.

After application, effective `~/.pi/agent/subagents.json` and installed agent frontmatter must agree with the canonical routing above. Project-local `.pi/gentle-ai/models.json` / `.pi/subagents.json` overrides, if present, outrank or alter the effective route and must be detected before pinned execution rather than silently accepted.

The parent/coordinator is the Pi process itself, so its `opencode-go/glm-5.3-flash` / `high` route remains an explicit launch literal in `docs/SPAWN_RECIPE_GENTLE_PI_WORKER_V1.md`; it is not a `gentle-ai-worker` child profile. The Atenea supervisor likewise remains a separate Pi launch with Gentle Pi disabled and must resolve explicitly to `opencode-go/deepseek-v4.1-flash` / `medium`.

## 9. Limits / non-claims

- This work does not claim GLM worker has already accumulated long-duration native-Agent field history; it promotes the route from controlled real-work qualification into the current operational default.
- It does not requalify Gentle lifecycle mechanics, consent, reviewer capture, refuter or validator behavior.
- It does not prove one model is universally "better" than another; every choice is role-specific.
- It does not adopt Qwen 3.8 Flash for a current production role; its high-recall/high-inflation signal remains useful historical benchmark evidence only.
- It does not change the human merge boundary or introduce any model fallback policy.

Repository authority: issue #75 and the current routing surfaces that reference this evidence record.
