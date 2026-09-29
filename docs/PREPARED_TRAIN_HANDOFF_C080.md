# Atenea C-080 — Prepared-train handoff

Use this for an already-shaped/executable train.

```text
Authority: Atenea C-080 on current main.
Preserve valid product scope, acceptance, dependencies, worktree, commits and deterministic evidence.
Do not repeat shaping.

Implementation:
- supervisor: clean `pi --no-extensions` + Herdr;
- exactly ONE Pi implementation child per ticket;
- production-volume default → nan/deepseek-v4-flash;
- complex only on material trigger → nan/glm5.3-flash high;
- implementation profile selects the worker ONLY; it never routes review;
- no ODD, no gentle-orchestrator, no Gentle Shell ticket worker.

After candidate commit:
- run native Gentle ASSESS against the real base;
- review_due=false → checkpoint; DO NOT launch OpenCode;
- review_due=true → execute exact next_transition only;
- Gentle owns lens selection: 0 / 1 / 4 according to native risk/timing;
- OpenCode V1 is collection transport only.

Every OpenCode review host:
- use per-process OPENCODE_CONFIG_CONTENT from `tools/render-opencode-routing-overlay.mjs`
  (no profile argument: ONE assurance profile serves every train);
- never rewrite ~/.config/opencode/opencode.json as train routing state.

If a REQUIRED reviewer Task reaches terminal completion with no capturable result
(empty output with output_tokens=0, or typed opencode_task_output_empty):
- stop the failed host; do not narrate or retry the same route;
- normalize the observation with `tools/classify-required-lens-zero-output.mjs`;
- the typed technical failure preserves candidate/lineage/revision/target;
- next_action is always HUMAN STOP: no recovery route, no permit, no alternate
  model, no second attempt, no RESET/new START/new ASSESS, no skipped lens,
  no profile switch inside the active lineage.

Review routing (single assurance profile, independent of implementation):
- readability / reliability / resilience / validator → GPT-6 Luna high;
- risk → GLM 5.3 Flash high;
- refuter → conditional, provider-issued only;
- DeepSeek V4 holds no reviewer role; no review role uses Luna xhigh.

At ticket boundaries:
- re-check HEAD/checkpoint, clean state, blockers/dependencies and authorized frontier only;
- capture runtime-native usage telemetry when available; it adds zero LLM calls and never blocks valid work.

Material product/scope/acceptance/oracle/publication change = HUMAN STOP.
Review approval never grants push/PR/merge/deploy authority.
```
