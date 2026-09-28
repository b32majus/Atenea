# Atenea C-078 — Prepared-train handoff

Use this for an already-shaped/executable train.

```text
Authority: Atenea C-078 on current main. Preserve valid project scope, acceptance, dependencies, worktree, commits and deterministic evidence. Do not repeat shaping.

Implementation:
- supervisor: clean `pi --no-extensions` + Herdr;
- exactly ONE Pi implementation child per ticket;
- production-volume default → nan/deepseek-v4-flash;
- complex only on material trigger → nan/glm5.3-flash high;
- no ODD, no gentle-orchestrator, no Gentle Shell ticket worker.

After candidate commit:
- run native Gentle ASSESS against the real base;
- review_due=false → checkpoint; DO NOT launch OpenCode;
- review_due=true → execute exact next_transition only;
- Gentle owns lens selection: 0 / 1 / 4 according to native risk/timing;
- OpenCode V1 is collection transport only.

Every OpenCode review host:
- use per-process `OPENCODE_CONFIG_CONTENT` rendered from `tools/render-opencode-routing-overlay.mjs`;
- never rewrite ~/.config/opencode/opencode.json as train routing state.

If required review-resilience on V4 returns typed opencode_task_output_empty:
- preserve candidate/lineage/revision/target;
- bound STATUS must reoffer the exact same slot;
- make ONE fresh-host recovery using `--resilience-recovery-luna`;
- recovery changes only resilience to GPT-6 Luna high;
- if not admitted, HUMAN STOP;
- no repeated V4 retry, RESET, new START, skipped lens or model carousel.

At ticket boundaries:
- re-check HEAD/checkpoint, clean state, blockers/dependencies and authorized frontier only;
- capture runtime-native usage telemetry when available; telemetry adds zero LLM calls and never blocks valid work.

Material product/scope/acceptance/oracle/publication change = HUMAN STOP.
Review approval never grants push/PR/merge/deploy authority.
```
