# Atenea C-079 — Prepared-train handoff

Use this for an already-shaped/executable train.

```text
Authority: Atenea C-079 on current main.
Preserve valid product scope, acceptance, dependencies, worktree, commits and deterministic evidence.
Do not repeat shaping.

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
- use per-process OPENCODE_CONFIG_CONTENT from `tools/render-opencode-routing-overlay.mjs`;
- never rewrite ~/.config/opencode/opencode.json as train routing state.

If a REQUIRED reviewer Task reaches terminal completion with no capturable result:
- do not let the parent narrate/retry the same route again;
- stop the failed host;
- normalize the observation with `tools/classify-required-lens-zero-output.mjs`;
- the typed failure preserves candidate/lineage/revision/target;
- unqualified lens/model → HUMAN STOP.

For a qualified failure:
- query bound STATUS on the existing lineage;
- STATUS must reoffer `collect` for the exact same lens and identity;
- run `tools/authorize-required-lens-recovery.mjs` on failure + normalized bound STATUS;
- launch ONE fresh host with
  `render-opencode-routing-overlay.mjs <profile> --recovery-permit <permit.json>`;
- execute only the reoffered provider-owned slot;
- if not admitted, HUMAN STOP.

Qualified zero-output recoveries:
- review-resilience / V4 → Luna high;
- review-reliability / V4 → Luna high.

No repeated V4 retry, RESET, new START, new ASSESS, skipped lens, model carousel,
global config mutation or profile switch inside the active lineage.

At ticket boundaries:
- re-check HEAD/checkpoint, clean state, blockers/dependencies and authorized frontier only;
- capture runtime-native usage telemetry when available; it adds zero LLM calls and never blocks valid work.

Material product/scope/acceptance/oracle/publication change = HUMAN STOP.
Review approval never grants push/PR/merge/deploy authority.
```
