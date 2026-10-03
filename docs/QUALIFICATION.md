# Atenea Qualification

Status: **CURRENT C-084 QUALIFICATION — NATIVE V2 FIELD-VALIDATED; FREE V0 READY FOR FIRST REAL PILOT**
Date: 2026-10-03

## Correction of C-083 evidence

C-083 targeted OpenCode V2 conceptually, but the sampled `opencode` executable was V1 `1.18.34`. Therefore its `--pure` and agent-resolution checks are V1 compatibility evidence, not native V2 runtime qualification.

C-084 records the correction instead of silently relabelling that evidence.

## Current architecture under qualification

```text
Atenea policy + project-local native V2 role/model bindings
→ OpenCode V2 2.0.x
→ upstream Matt engineering skills
→ fresh role-bound subagents/worktrees
→ deterministic evidence
→ independent Standards + Spec review
→ one bounded correction
→ material feature/train closeout + Cora audit
→ human publication / merge
```

Herdr is the already-running persistent operator/session surface. Atenea owns no separate LLM execution controller, review state machine or routing engine.

## Native V2 migration evidence passed

- canonical `opencode` resolves to package-managed `@opencode/cli 2.0.22`;
- active global V1 `opencode-ai` is absent;
- duplicate isolated V2 runtimes were retired;
- NaN environment auth and OpenAI OAuth resolve under V2;
- required standard-route NaN/OpenAI models appear in the V2 model catalog;
- active global V2 config contains zero `gentle-orchestrator` references, no legacy Gentle execution plugins, and no global default model/agent; Herdr v13 observability integration is allowed;
- project `default_agent=atenea-volume` resolves under V2;
- all 11 standard Atenea agent files parse under native V2 permission/model syntax; the additional Free V0 agent set loads through the same native configuration surface;
- Matt skills remain upstream-managed; C-084 does not fork them.

## Bounded native V2 smoke evidence

The required nesting shape is:

```text
primary coordinator
→ implementation subagent
→ review/correction subagent
```

A native V2 TTY/TUI smoke passed on OpenCode 2.0.22: the interactive surface opened successfully, NaN/Qwen 3.8 Flash executed, and returned the expected token. A single synthetic depth smoke confirmed that V2 parsed the parent/child/grandchild agent graph and permissions, but it did not complete the full nested token round-trip before the bounded stop. Treat that nesting smoke as technically inconclusive, not as a failure. Do not open another laboratory campaign; verify the same seam in the first real bounded pilot and stop on a typed/runtime refusal.

## First real field evidence — Laboratorio de Privacidad

The first real C-084 product train (Laboratorio de Privacidad, issue/train #52) exercised the intended execution chain on product work:

```text
MiMo coordinator
→ DeepSeek V4 implementer
→ independent Luna Standards + Luna Spec review
→ one fresh DeepSeek V4 correction
→ deterministic final verification
→ HUMAN STOP on a remaining material accessibility blocker
```

Implementation and affected technical gates passed (including the project test suite), and the correction budget stopped exactly after one autonomous correction rather than entering a fix/review carousel. The run therefore supplies real field evidence for coordinator→implementer→review/correction routing and the bounded-stop policy; the earlier synthetic nesting smoke no longer carries that proof burden.

Two operational learnings are promoted from this run:

- launch-state drift belongs in deterministic preflight: refresh/reconcile the intended remote/base and ensure the prepared handoff is present at the exact executing HEAD before OpenCode starts;
- mechanically decidable review claims should use effective-state oracles where useful. In this run, accessibility contrast had to be calculated against the actual rendered background; token names/visual inference were insufficient. A recurring checker belongs in the UI project's own validation surface, not as a mandatory Atenea-core gate.

The remaining contrast finding after the single autonomous correction correctly produced HUMAN STOP. A later human-authorized focal continuation is a new bounded unit, not a hidden second autonomous correction pass.

## Atenea Free v0 pre-field evidence

The optional `free_only` cost-policy extension is configured but **not yet field-qualified for quality**. Pre-publication evidence is deliberately bounded:

- `node tools/check-free-models.mjs` confirms the three current bound IDs are visible to this runtime: MiMo 2.6 Flash Free, Space Bunny Free and NaN Qwen 3.6;
- a full-screen native `opencode .` launch with temporary `default_agent=atenea-free` displayed `Atenea-Free · MiMo-V2.6-Flash Free · OpenCode Zen`, proving the Golden Path primary binding;
- MiMo Free, Space Bunny Free and Qwen 3.6 completed small bounded invocation/tool-use smokes on this VPS;
- no paid model appears in any Free agent binding or Free coordinator subagent permission;
- candidate models are not automatic fallbacks. LongCat, Gemma and Nemotron remain unbound after weaker local latency/tool-use observations.

`opencode mini --agent` is not used as primary-binding evidence: in 2.0.22 it may keep the interactive default model instead of the agent's declared model. The full-screen `opencode .` Golden Path resolves the project `default_agent` binding correctly.

The first real Free project ticket must supply the quality/process evidence: coordinator delegation, writer behavior, both review axes, bounded correction, deterministic closure, Cora audit when required, and observed latency/token behavior. Do not open a synthetic qualification campaign before that field run.

## What is not yet claimed

One real standard C-084 train does not permanently prove every routing/model choice or every project seam, and it does not prove Free V0 quality. Continue collecting field evidence through `EXECUTION_EFFICIENCY_LEDGER_V1.md`; change policy only at a clean future work boundary if repeated evidence warrants it.

## Current deterministic checks

```bash
opencode --version
opencode auth list
opencode models
opencode debug config
node tools/check-vnext-authority.mjs
node tools/check-free-models.mjs  # when free_only is selected
git diff --check
```

Do not make repeated model-call canaries a ritual.

## Historical qualification

Pi/Gentle/OpenCode V1 qualification and C-083's mistaken V1-as-V2 runtime evidence remain provenance. They do not define the C-084 execution path.
