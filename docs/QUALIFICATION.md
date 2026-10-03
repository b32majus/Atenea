# Atenea Qualification

Status: **CURRENT C-083 QUALIFICATION — READY FOR REAL PILOT**
Date: 2026-10-03

## Current architecture under qualification

```text
Atenea policy + project-local role/model bindings
→ OpenCode V2
→ upstream Matt engineering skills
→ fresh role-bound subagents/worktrees
→ deterministic evidence
→ independent Standards + Spec review
→ one bounded correction
→ material feature/train closeout + Cora audit
→ human publication / merge
```

Herdr remains operator/session infrastructure. Atenea owns no separate LLM execution controller, review state machine or routing engine.

## Evidence already passed

- plain OpenCode V2 completed bounded implementation unattended;
- OpenCode V2 completed a two-work-unit unattended train;
- Matt `implement-spec` completed an end-to-end task graph with fresh implementers/worktrees, mergers, full tests, final two-axis review and worktree cleanup;
- Matt `code-review` caught all planted defects in the synthetic reviewer benchmark;
- Semgrep was qualified as conditional deterministic/static evidence;
- Alibaba Open Code Review showed useful high-risk recall but insufficient latency for routine per-ticket use;
- the official Matt updater refreshed current project skills without destructive deletion;
- all 11 C-083 project-local OpenCode agents resolve through the actual installed OpenCode runtime;
- sampled resolved routes confirm MiMo coordinator, Qwen explorer, V4 implementer, Luna High Standards, Sol 6.1 High Complex Spec and GLM High Complex correction;
- `ATENEA_VNEXT_AUTHORITY_CHECK=PASS` and `git diff --check` pass for the C-083 promotion candidate.

## What is not yet claimed

The exact integrated C-083 routing has **not yet completed its first real product train**. Therefore C-083 is pilot-ready current authority, not a claim that every routing choice is permanently field-proven.

The next real train should be treated as field evidence, not as another laboratory qualification project. Observe routing, correction rate, quality findings, human touches and consumption through `EXECUTION_EFFICIENCY_LEDGER_V1.md`; change policy only at a clean future work boundary if evidence warrants it.

## Current deterministic qualification

```bash
node tools/check-vnext-authority.mjs
git diff --check
opencode --pure agent list
```

Use `opencode --pure debug agent <name>` when a concrete role binding needs to be verified. Do not make repeated model-call canaries a ritual.

## Historical qualification

Pi/Gentle/RDD/OpenCode V1 qualification, maintenance and field evidence remain valuable provenance in Git/docs. They do not define the C-083 execution path.
