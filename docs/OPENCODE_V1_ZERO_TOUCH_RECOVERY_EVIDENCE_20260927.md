# OpenCode V1 + Gentle 3.7 — zero-touch recovery evidence

Date: 2026-09-27
Status: **PROMOTION EVIDENCE — runtime topology and clean global baseline**

## Goal

Recover Atenea's product property:

```text
accepted bounded train
→ one human launch authorization
→ autonomous implementation / verification / Gentle review / correction / burn
→ durable checkpoint
→ fresh context for the next ticket
→ human returns at the pre-merge boundary
```

The goal is not to replace Gentle. Gentle remains the implementation/review lifecycle owner. Atenea supervises only the train boundary that Gentle does not own.

## Regression diagnosis

The Sep-6 Golden used a persistent non-implementing outer supervisor plus one fresh worker per ticket and proved `ZERO_HUMAN_TOUCH_AFTER_TRAIN_LAUNCH=PASS`.

On Sep-15, Gentle Pi 2.7 / Gentle AI 2.9.1 made the outer supervisor and Atenea consent relay deletable for that runtime epoch: a persistent parent plus fresh native children completed zero-touch review without consent dialogs.

By Gentle Pi 3.3 / Gentle AI 3.4 the qualified claim had weakened to one-touch within one live session/repository. The external supervisor remained deleted, forcing long-lived parent sessions, standing permission, compaction/rollover machinery and increasing human middleware.
## OpenCode / Gentle qualification

Qualified pair:

```text
OpenCode 1.18.10
Gentle AI 3.7.0
NaN provider
fresh OpenCode process per bounded phase/ticket
```

Gentle 3.7's OpenCode V1 immutable review transport was exercised end-to-end:

```text
STATUS → START → consent/v3 → granted candidate-scoped review
→ collect → review-reliability Task → capture-result
→ APPROVED → acknowledge-approved → terminal-consumption
```

The consent envelope remains provider-owned. The thin supervisor may transport only the exact already-authorized candidate-scoped grant; it does not invent review state, verdicts or correction transitions.

A Gentle 3.7 runtime-detection fragility was reproduced: its OpenCode probe has a 3-second version timeout. On this VPS `opencode --version` could intermittently cross that bound. A wrapper that answers only the exact version query immediately and delegates every other invocation to the real pinned binary made the probe deterministic (5/5 PASS).

OpenCode V2 2.0.18 was separately tested. Gentle 3.7 synchronized V2 assets, but V2 failed to load the Gentle plugins (`@opencode/plugin` resolution failure), including `opencode-review-transport.ts`; the capability probe timed out fail-closed. V2 is therefore not the current productive Atenea runtime.
## Zero-touch train evidence

Two independent synthetic two-ticket trains completed with zero human touches after launch.

Clean rebuild result:

```text
TICKETS                         2/2 PASS
FRESH_OPENCODE_PER_TICKET       PASS
GENTLE_REVIEW_TERMINAL          2/2
GIT_CHECKPOINT                  2/2
HUMAN_TOUCH_AFTER_LAUNCH        0
FINAL_WORKTREE                  CLEAN
WALL_CLOCK                      495.88 s (~8m16s)
```

The earlier equivalent Golden completed in ~10m14s. The clean rebuild reproduced the topology from a new OpenCode state/config surface rather than relying on accidental laboratory history.

Measured OpenCode traffic for the first two-ticket Golden, including writers, lifecycle hosts and reviewers, was approximately 629.8k provider tokens (`211.7k input + 397.3k cache-read + 4.0k output + 16.8k reasoning`). The pathological Pi WU-A comparison had ~9.72M provider-token traffic for one work unit.

Agent redundancy also fell sharply: synthetic writers used 4/5 assistant steps and 5/7 tools; lifecycle hosts used 4/5 steps and 3/4 tools; each reviewer used one step. This contrasts with the observed Pi WU-A 81-turn / 92-tool lifecycle and repeated test/lint/status loops.

These figures qualify the topology, not a universal cost claim. Real-work routing remains separately measurable.
## Clean global rebuild

The pre-swap OpenCode state was heavily accumulated: `~/.local/share/opencode` was ~2.79 GB and `opencode.db` alone ~2.46 GB. The active config also exposed duplicate shared/runtime skill roots.

The global baseline was rebuilt reversibly from the qualified clean environment:

- OpenCode 1.18.10 pinned outside `~/.opencode` under `~/.local/lib/opencode-1.18.10`;
- exact qualified `AGENTS.md` and `opencode.json` hashes;
- 20 Gentle-managed OpenCode skills in `~/.config/opencode/skills`;
- legacy `~/.agents/skills` removed from the active global surface and preserved as rollback evidence;
- Context7 and Engram installed but disabled by default for ordinary execution;
- fresh OpenCode state/DB; credentials preserved without copying session/history state.

Global smoke after cleanup: session created in ~6.7 s, primary model stream began in ~11.9 s and the turn reached `exiting loop` in ~21.7 s. `init count=20` confirmed the deduplicated skill surface.

## Routing finding / open work

The runtime topology is promoted independently from final model routing. A historical real T8 replay exposed two anti-patterns that must not become current defaults:

1. `gentle-orchestrator` must not be used as the outer ticket writer when Atenea already supplies a train supervisor; it reintroduces nested exploration/ODD/delegation.
2. direct `build + GLM 5.3 Flash` on the large T8 replay entered multi-minute design rumination before first mutation and was terminated with zero product mutation. This is a routing/profile failure, not a zero-touch topology failure.

Therefore the current runtime baseline is promoted, while nontrivial writer model/profile routing remains subject to focused field qualification. Lifecycle transport hosts should stay thin; deterministic supervision should use no LLM where possible.

## Promotion classification

```text
OPENCODE_V1_1_18_10_GLOBAL_BASELINE       PASS
GENTLE_AI_3_7_REVIEW_TRANSPORT            PASS
ZERO_TOUCH_TWO_TICKET_TRAIN               PASS x2
FRESH_CONTEXT_PER_TICKET                  PASS
GLOBAL_CLEAN_REBUILD_SMOKE                PASS
OPENCODE_V2_2_0_18                        BLOCKED_REVIEW_PARITY
REAL_T8_WRITER_PROFILE                    NOT_YET_PROMOTED
MERGE_BOUNDARY                            HUMAN
```
