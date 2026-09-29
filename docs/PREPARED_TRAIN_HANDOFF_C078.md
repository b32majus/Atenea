# Atenea C-078 — Prepared-train handoff

Status: **SUPERSEDED BY C-079**  
Preserved only as C-078 operational provenance. Use `docs/PREPARED_TRAIN_HANDOFF_C079.md` for current prepared trains.

Use this historical handoff for understanding an already-shaped/executable C-078 train.

```text
Authority at the time: Atenea C-078. Preserve valid project scope, acceptance, dependencies, worktree, commits and deterministic evidence. Do not repeat shaping.

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

C-078 originally allowed one narrow `review-resilience` V4 empty-output recovery to Luna high after exact bound STATUS. That command surface is superseded by C-079's typed failure + recovery-permit path.

At ticket boundaries:
- re-check HEAD/checkpoint, clean state, blockers/dependencies and authorized frontier only;
- capture runtime-native usage telemetry when available; telemetry adds zero LLM calls and never blocks valid work.

Material product/scope/acceptance/oracle/publication change = HUMAN STOP.
Review approval never grants push/PR/merge/deploy authority.
```
