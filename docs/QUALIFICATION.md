# Atenea Qualification

Status: **CURRENT C-084 QUALIFICATION — NATIVE V2 MIGRATION, READY FOR FIRST REAL PILOT**
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
- required NaN/OpenAI models appear in the V2 model catalog;
- active global V2 config contains zero `gentle-orchestrator` references, no legacy Gentle execution plugins, and no global default model/agent; Herdr v13 observability integration is allowed;
- project `default_agent=atenea-volume` resolves under V2;
- all 11 Atenea agent files parse under native V2 permission/model syntax;
- Matt skills remain upstream-managed; C-084 does not fork them.

## Bounded native V2 smoke evidence

The required nesting shape is:

```text
primary coordinator
→ implementation subagent
→ review/correction subagent
```

A native V2 TTY/TUI smoke passed on OpenCode 2.0.22: the interactive surface opened successfully, NaN/Qwen 3.8 Flash executed, and returned the expected token. A single synthetic depth smoke confirmed that V2 parsed the parent/child/grandchild agent graph and permissions, but it did not complete the full nested token round-trip before the bounded stop. Treat that nesting smoke as technically inconclusive, not as a failure. Do not open another laboratory campaign; verify the same seam in the first real bounded pilot and stop on a typed/runtime refusal.

## What is not yet claimed

Native C-084 has not yet completed its first real product train. The next real train is field evidence, not another qualification project.

Observe routing, correction rate, findings, human touches and consumption through `EXECUTION_EFFICIENCY_LEDGER_V1.md`; change policy only at a clean future work boundary if evidence warrants it.

## Current deterministic checks

```bash
opencode --version
opencode auth list
opencode models
opencode debug config
node tools/check-vnext-authority.mjs
git diff --check
```

Do not make repeated model-call canaries a ritual.

## Historical qualification

Pi/Gentle/OpenCode V1 qualification and C-083's mistaken V1-as-V2 runtime evidence remain provenance. They do not define the C-084 execution path.
