# Atenea Qualification

Status: **CURRENT C-084 QUALIFICATION — NATIVE V2 FIELD-VALIDATED; FREE V0 FIELD-VALIDATED FOR VOLUME WORK**
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
→ up to two fresh finding-scoped corrections
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

Under the then-current one-attempt policy, the remaining contrast finding after the single autonomous correction correctly produced HUMAN STOP. That historical run remains valid evidence of bounded-stop behavior; the later field refinement below increases the ordinary correction budget to two fresh finding-scoped attempts.

## Subsequent field process learning — correction-role separation

A later Laboratorio de Privacidad run reported a C-084 routing deviation after independent review: the original `atenea-implementer-volume` applied a review-driven correction itself instead of delegating that mutation to a fresh `atenea-corrector-volume` session. The reported deterministic evidence after the fix was strong, so Atenea does not require replaying an already-correct candidate merely to repair lineage ceremony. The process learning is narrower: **review start closes the originating implementer's write phase**. Review findings belong to fresh corrector sessions even when implementer and corrector share the same underlying model.

The same field discussion also restores a two-attempt correction budget: one fresh finding-scoped corrector, focused evidence, and—only when the same authorized finding(s) remain—one second fresh corrector. A third autonomous correction, a new material finding or scope expansion is HUMAN STOP. This preserves bounded autonomy without returning trivial residual fixes to the human after a single attempt.

The preferred real-work entry is also explicit operator control: Cora prepares repo/worktree/handoff/preflight through `READY_TO_LAUNCH`, then returns exact bash/agent/prompt. The human launches the visible OpenCode TUI and presses Enter. This is an observability/control boundary, not a correctness dependency.

## Atenea Free v0 field evidence

The Free profile has now completed two real `volume` project units in PROMueve Sure without paid fallback. The second unit (WU2 Company Base) was substantial enough to exercise implementation, independent review, a fresh correction and deterministic closeout:

```text
MiMo 2.6 Flash Free coordinator
→ Space Bunny Free implementer
→ Qwen 3.6 Standards + fresh MiMo Free Spec review
→ fresh Space Bunny Free corrector
→ deterministic coordinator verification
→ human publication
```

WU2 finished in one autonomous train with no HUMAN STOP. The final candidate passed the project suite (`143/143` tests), typecheck, build and `git diff --check`; independent Cora reruns reproduced those gates. No paid/standard model fallback occurred. WU1 had already supplied an earlier successful Free field run, so Free V0 now has repeated evidence for bounded `volume` work. This is evidence of practical viability, not a claim of quality/latency equivalence with the paid standard route and not proof of `free_only + complex`.

The Free model catalog remains replaceable. `node tools/check-free-models.mjs` is still a preflight availability check, not a quality benchmark or permission to switch models mid-unit.

`opencode mini --agent` remains unsuitable as primary-binding evidence in OpenCode V2 `2.0.22` because it may retain the interactive default model instead of the primary agent's declared model. The visible full-screen `opencode .` Golden Path and real session routing are the relevant evidence.

## Subsequent field learning — single canonical review ownership

Laboratorio de Privacidad POLICY-01 exercised the post-#125 correction boundary correctly but exposed duplicated review ownership. The V4 implementer committed candidate `7dd0978`, then launched Matt Standards + Spec reviews itself. The implementer did **not** write again. After control returned, the MiMo coordinator launched a second Standards + Spec pair over the same candidate; that second Spec review found two actionable issues and a fresh `atenea-corrector-volume` produced `1260403`. Final focused/unit/browser evidence was green and no HUMAN STOP was needed.

The learning is not “delete the second review”. The first Spec review missed defects that the coordinator-owned Spec review found because the latter carried a stronger, complete Cora-shaped acceptance/evidence brief. The defect is **double lifecycle ownership**: both coordinator and implementer could invoke `/implement`/`code-review`. C-084 therefore assigns a single owner:

- the primary coordinator owns Matt `/implement` or `/implement-spec`, the one canonical `/code-review`, review aggregation and correction dispatch;
- implementation workers own implementation/TDD, implementation evidence and the candidate commit only;
- implementers cannot invoke `/implement`, `/implement-spec`, `/code-review`, reviewer roles or corrector roles;
- review a candidate/fixed-point pair exactly once unless the prior review failed technically, was incomplete or was anchored to the wrong fixed point/authority envelope.

POLICY-01's duplicated first review consumed 138,844 fresh input/output/reasoning fields plus 371,712 cache-read fields. Removing that duplicate while preserving the stronger coordinator-owned brief would have reduced reported fresh fields from 803,961 to about 665,117 for that run. PROMueve Sure WU2 independently demonstrated the desired shape already: implementer returned the candidate, coordinator launched one review pair, then dispatched a fresh corrector.

## Subsequent field learning — product shaping requires attended Cora + human

A PROMueve Nexus field incident exposed a different boundary from execution/review routing: a substantial ticket allowed product shaping to continue inside an unattended OpenCode session. The agent was effectively able to surface product questions and resolve those questions itself. The resulting implementation moved away from the intended product direction and a material part of the ticket now requires discard/rework. This is treated as a **process-boundary failure**, not evidence that the implementation models are generally incapable.

C-084 therefore makes the shaping/execution boundary explicit: material product shaping is an attended Cora + human decision loop. Cora may analyze alternatives, challenge assumptions and prepare questions; OpenCode may gather bounded evidence for that conversation, but unattended agents do not make the final material product choice. `READY_TO_LAUNCH` requires `Open material product questions: NONE`. If execution discovers a new material decision about behavior, scope, architecture, privacy/security posture, data semantics or acceptance, it returns HUMAN STOP with the question/options instead of selecting an answer.

This does not turn every implementation detail into a human decision. Workers still own ordinary local engineering mechanics that do not alter accepted semantics. The boundary is material product authority, not code-level discretion.

### Repeated shaping-expansion evidence — Laboratorio + Symphonia

Subsequent field comparison showed the Nexus incident was not isolated. Laboratorio de Privacidad had already required a manual correction after shaping/synthesis created product complexity beyond the intended direction. Symphonia then exposed the mechanism directly in the installed Matt skills: `grilling` deliberately visits every branch of a design tree until nothing remains assumed; `to-spec` explicitly avoids a new product interview and synthesizes what is already known into an extremely extensive user-story set (while still checking proposed test seams with the user); `to-tickets` operationalizes the resulting spec into approved vertical slices. The chain is useful but has a predictable **complexity-expansion bias** when the product already has a simplicity philosophy: a question can become a requirement merely because it was askable and answered.

C-084 therefore keeps Matt upstream unchanged and adds external shaping rails in `ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md`: record non-negotiable product boundaries before an expansive grill; prune branches that conflict with those constraints; audit grill output before `to-spec`; audit spec fidelity before `to-tickets`; and audit the composed ticket set before `EXECUTION_READY`. These are conditional read-only product-fidelity checks, not universal bureaucracy.

## What is not yet claimed

Repeated standard and Free `volume` field runs now support the C-084 direction, but they do not permanently prove every routing/model choice, `complex` behavior or future Free catalog. The new single-review permission hardening should be observed in subsequent real tickets rather than through another synthetic qualification campaign. Continue collecting field evidence through `EXECUTION_EFFICIENCY_LEDGER_V1.md`; change policy only at a clean future work boundary if repeated evidence warrants it.

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
