# Atenea — Execution Efficiency Ledger v1

Status: **CURRENT OBSERVATIONAL EVIDENCE CONTRACT — C-084**
Date: 2026-10-03

## Purpose

Measure whether the C-084 model split gives enough quality while letting DeepSeek V4 absorb most writing volume. Collection must add **zero LLM calls** and must never become a pre-writer gate.

Telemetry is observational, not product/review/publication authority. Missing telemetry does not invalidate otherwise valid engineering evidence.

## Per-ticket record

Capture when the runtime exposes it:

```text
ticket / base / candidate HEAD / profile = volume | complex
runtime versions

COORDINATOR
  model
  input / output / reasoning / cache / cost fields as reported
  wall time

EXPLORATION (if used)
  model / usage / wall time

IMPLEMENTATION
  model per writer
  usage / wall time

REVIEW
  Standards model + usage + findings count
  Spec model + usage + findings count

CORRECTION (only if needed)
  model / usage / findings addressed / focused-regression result

CONDITIONAL ASSURANCE
  Semgrep invoked? result
  OCR invoked? model / usage / result

TERMINAL
  done | human_stop
  Cora integrated audit invoked? result when applicable
  human touches after launch
```

Do not infer missing token/cache numbers and do not manufacture one normalized cross-provider total from accounting fields with different semantics.

## Structural checks

Treat these as routing defects, not optimization opportunities:

- coordinator mutates repository artifacts (product code, tests, docs or config) by any mechanism instead of delegating to the bound worker;
- normal `complex` implementation silently switches from V4 to GLM without explicit first-writer escalation;
- volume correction uses a different model from V4 without a new boundary decision;
- complex correction does not use GLM high;
- Standards/Spec review is performed by the writer instead of the independent bound reviewer;
- an implementer invokes `/implement`, `/implement-spec`, `/code-review`, a reviewer or a corrector instead of returning the fixed implementation candidate to the coordinator;
- the same candidate/fixed-point pair is reviewed more than once without a technically failed, incomplete or incorrectly anchored prior review;
- a third autonomous correction or a new broad review/fix cycle starts after the two-attempt correction budget;
- per-ticket routing rewrites shared global OpenCode config;
- quota pressure silently changes an active unit's model route.

## Field record — Laboratorio de Privacidad #52 (UX-PILOT-01)

First real native-C-084 `volume` field run, OpenCode V2 `2.0.22`, PR #54. Provider-reported usage from the OpenCode session subtree:

```text
MiMo coordinator
  input 152,422 | output 29,053 | reasoning 39,764 | cache-read 7,042,432

DeepSeek V4 workers (implementation + correction + bounded follow-up maintenance)
  input 157,607 | output 24,244 | reasoning 36,176 | cache-read 5,514,624

GPT-6 Luna high reviewers (Standards + Spec)
  input 47,212 | output 1,317 | reasoning 1,590 | cache-read 79,872

reported subtree total
  input 357,241 | output 54,614 | reasoning 77,530 | cache-read 12,636,928
```

Do **not** interpret cache-read as fresh/billable input or sum it into a normalized cross-provider cost. For this run, cache-read represented 97.25% of reported input-context traffic (`cache_read / (cache_read + input)`), while fresh input+output+reasoning fields summed to 489,385. The runtime reports `cost=0` under the current subscription/provider accounting, so no monetary inference is recorded.

Quality/flow evidence:

- routing executed as intended: MiMo coordinator → V4 implementer → independent Luna Standards + Spec → fresh V4 correction;
- deterministic closeout caught residual AA contrast after the one autonomous correction and produced HUMAN STOP rather than a carousel;
- human-authorized focal continuation fixed only the three measured contrast pairs and produced rendered-state evidence;
- later CI exposed stale Playwright locators; each newly discovered class produced another bounded human decision rather than opportunistic scope growth; final Playwright `9/9`, full `npm test` `54 files / 908 tests`, CI validate/CodeQL/E2E green, PR #54 merged;
- no GLM/Sol/conditional OCR/Semgrep was spent on this `volume` UI change.

Efficiency observations, not routing changes:

- coordinator fresh fields were 221,239 tokens (45.2% of the run's input+output+reasoning total), almost the same order as all V4 worker fresh fields (218,027); this is higher than desired for a coordinator;
- known contributors were launch-state archaeology from the stale worktree, repeated deterministic re-verification across human continuations, and routine Engram memory-save/judgment bookkeeping;
- prelaunch reconciliation is now a deterministic preflight rule, memory bookkeeping is removed from the normal critical path, and coordinator mutation is explicitly forbidden by any mechanism;
- keep MiMo/routing unchanged until several real tickets show whether coordinator share remains high after these first-run effects disappear.

One structural defect was observed: during an exact human-authorized E2E test-maintenance repair, the MiMo coordinator used shell mutation directly instead of delegating to a worker. The final change was correct and bounded, but this violated the intended coordinator/worker boundary. C-084 now makes the boundary artifact-wide (including tests/docs/config) and mechanism-independent (including shell), rather than relying only on `edit: deny`.

## Field record — Laboratorio de Privacidad POLICY-01 (#56)

Standard `volume`, OpenCode V2 `2.0.22`, final branch candidate `1260403` / PR #58. Provider-reported session subtree:

```text
MiMo coordinator                      fresh 156,400 | cache-read 2,797,312
DeepSeek V4 implementer               fresh 217,675 | cache-read 6,606,592
first Luna Standards + Spec pair      fresh 138,844 | cache-read   371,712
second Luna Standards + Spec pair     fresh 125,934 | cache-read   220,672
fresh DeepSeek V4 corrector           fresh 165,108 | cache-read 3,949,824

reported subtree total                fresh 803,961 | cache-read 13,946,112
```

The implementer committed `7dd0978` before review and did not mutate afterward, so the post-#125 writer/corrector boundary held. The routing inefficiency was duplicated review ownership: the implementer ran Matt review and then the coordinator repeated both axes on the same fixed candidate. The first pair reported no actionable issue; the coordinator-owned second Spec review found factual-copy and deterministic responsive/contrast-evidence defects, then a fresh V4 corrector closed them in `1260403`. Therefore the safe optimization is not to keep the first review and remove the second; it is to make the coordinator the **single canonical review owner** with the complete Cora-shaped brief. The redundant first pair represented 138,844 fresh fields (~17.3% of this run's fresh total).

Independent Cora rerun after closeout: focused policy tests `21/21`, policy/gate Playwright `12/12`, typecheck PASS, clean worktree.

## Field record — PROMueve Sure WU2 Company Base

Free `volume`, OpenCode V2 `2.0.22`, final branch candidate `525b84b` / PR #13. Provider-reported session subtree:

```text
MiMo 2.6 Flash Free coordinator        fresh  84,403 | cache-read    818,432
Space Bunny Free implementer           fresh 325,207 | cache-read 18,917,508
Qwen 3.6 Standards review              fresh 174,089 | cache-read    285,056
MiMo 2.6 Flash Free Spec review        fresh 164,662 | cache-read  4,692,992
fresh Space Bunny Free corrector       fresh  64,031 | cache-read  1,081,745

reported subtree total                 fresh 812,392 | cache-read 25,795,733
```

WU2 demonstrated the desired ownership shape without duplicate review: coordinator → implementer candidate → one coordinator-dispatched Standards + Spec pair → fresh corrector → deterministic closeout. No paid fallback and no HUMAN STOP. Final independent Cora rerun: project tests `143/143`, typecheck PASS, build PASS, `git diff --check` PASS, clean worktree.

The Free route remains slower and uses provider-reported token fields differently from the standard route, so these values are observational rather than a normalized cost comparison. Model routing remains unchanged.

## Useful field metrics

After enough real tickets exist, compare by profile and work class:

```text
v4_writer_share        = V4 writer usage / all writer usage
correction_rate        = tickets needing correction / tickets completed
complex_correction_rate
findings_per_ticket by review axis
human_stop_rate
wall_time by profile
specialist_glm_share   = GLM correction + OCR usage / all model usage
```

The goal is not equal provider consumption. The goal is to avoid spending scarce specialist capacity where a cheaper writer plus independent assurance performs well.

## Extraction helper

OpenCode exports can be parsed locally when useful:

```bash
node tools/extract-execution-usage.mjs opencode <opencode-export.json>
```

Legacy Pi/Gentle parser modes in the helper are historical compatibility, not C-084 runtime requirements.
