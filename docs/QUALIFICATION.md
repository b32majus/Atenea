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

### Repeated product-fidelity drift evidence — Laboratorio + Symphonia

A related Laboratorio de Privacidad correction had already suggested that locally correct/hardened work can still require product-level reconciliation. Symphonia then supplied the clearer causal reconstruction and refined the model beyond a simple “the grill expanded too much” explanation. `grilling` did broaden the domain by deliberately visiting every branch of a design tree; however, the accepted Symphonia spec still explicitly preserved the intended product protections (including its plan-as-interface, service-explanation and Complexity Firewall principles). The later drift therefore cannot be attributed to the grill or spec alone. The stronger field reconstruction is: **domain expansion → tickets sliced by internal aggregates → implementation translated aggregates into browser/UI slices → local hardening rewarded fidelity/losslessness/exact shape → the app accumulated those slices → no decisive composed-product fidelity check stopped the result**. Locally faithful work produced a globally wrong product surface.

C-084 therefore keeps Matt upstream unchanged and adds two complementary protections. `ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md` constrains expansive questioning/synthesis. `PRODUCT_FIDELITY_GATES_V1.md` carries the product boundaries through ticketization and implementation: internal aggregate/module structure does not imply UI structure; lossless/exact internal representation is not a product goal by itself; and material multi-ticket UI requires a read-only composed-product checkpoint against the actual rendered surface. These checks are conditional, not universal bureaucracy.


## Subsequent field learning — human product design must precede technical grilling

Accumulated Symphonia and Laboratorio recovery work exposed a boundary earlier than decomposition drift. Even when accepted specs retain valid product principles and later gates prevent aggregate-to-screen drift, an exhaustive technical/domain shaping flow can still make the implementation model more legible than the human job. The system can recover every capability correctly while the resulting application asks users to reason in the vocabulary, topology or equal-weight action set that was convenient to specify.

The resulting correction is **not** to fork or weaken Matt. `HUMAN_PRODUCT_DESIGN_AUTHORITY_V1.md` makes Matt/spec grilling the second filter for material human-facing work. Cora + human first shape concrete real-world journeys, the default path, representation fit, information hierarchy, progressive disclosure, friction budget and a durable interaction hypothesis. After technical/spec synthesis, they perform an attended human-product recheck before freeze. A clear interaction conflict is reconciled before `EXECUTION_READY`; OpenCode is not asked to redesign it autonomously.

Laboratorio's pending Export recovery supplied a concrete trigger for this distinction: “five technically correct export capabilities” does not by itself authorize five equal-weight buttons. The human question is first what the person is normally trying to finish, which action is primary, which downloads are secondary, and which confidential/audit behavior belongs behind a separate boundary. The specific Laboratorio answer remains project authority, not Atenea-core policy; the cross-project lesson is that important user-facing completion surfaces need human interaction authority before recovery/implementation tickets freeze.

This layer is conditional. Backend-only work, invisible refactors and bounded repairs that do not materially change interaction continue without new design ceremony. Once an interaction hypothesis is frozen, `PRODUCT_FIDELITY_GATES_V1.md` carries it through decomposition, implementation and composed-product closeout.

## Subsequent field learning — representation narrowing is semantic authority

A Symphonia Atenea Go `complex` field ticket exposed a narrower semantic-authority failure than the earlier composed-product drift cases. The accepted domain retained an exact `effectiveFrom` instant, while implementation translated that value into a date-only control and reconstructed it as Hospital-local `00:00`. That reduced temporal precision without explicit product authority. The implementer made the choice, the coordinator did not stop it, and the canonical Spec review did not identify the material loss of expressivity; the later integrated Cora audit did, before publication.

The resulting guardrail is general rather than Symphonia-specific: **representation translation must not silently narrow accepted semantics**. When accepted meaning is mapped into UI/input controls, adapters, schemas, persistence/export forms or other representations, compare what can be represented before and after. Unauthorized loss of precision/granularity, cardinality, ranges, states/vocabulary, combinations, ordering or optional/unknown distinctions is a material product/data-semantics decision and therefore HUMAN STOP. This check does not require exposing internal-only richness that accepted product/domain authority never required users or downstream behavior to express.

The field result also confirms why complex integrated audit remains valuable during qualification: the system prevented publication of the narrowing even though implementation + canonical review had not stopped it.

## Subsequent field learning — affected surfaces and sibling invariants are behavioral

Two later Atenea Go `complex` audits exposed the same failure family across different products. In Laboratorio de Privacidad REC-04, canonical review correctly found a stale-state/TOCTOU gap in Confidential XLSX and correction added the post-`await` current-authority guard, but the sibling Safe XLSX path retained the same stale-download class; Cora falsified it independently before publication. In PROMueve Nexus #528, source tracing discovered that a shared prebiologic request generator also served the supported Dashboard → Solicitud FH journey, but that zero-diff consumer was recorded as unchanged/untested because it lay outside the ticket's explicit browser QA surfaces. Cora held publication because changing the shared generator changed the functional blast radius even though the dashboard files were untouched.

The resulting guardrail is **affected-surface / invariant propagation**: shared-seam impact is traced through supported consumers, and an invariant/defect discovered in one branch is checked across material sibling branches before closure. `NO TOCA` is a behavioral promise, not a filename rule. This does not authorize opportunistic widening: a materially affected supported consumer or sibling defect outside the current authority/evidence envelope produces HUMAN STOP/new bounded work. These field cases reinforce that integrated audit remains mandatory for material Complex qualification while this cross-surface weakness is being observed.

## Subsequent field learning — universal claims need adversarial witnesses

A later Symphonia Go `complex` qualification exposed a different evidence weakness. A requirement that multiple aggregates must remain **distinguishable** was exercised with multiple examples whose obvious human summaries were already different, so the fixture could pass without proving the collision case that made distinguishability difficult. A subsequent finding-scoped correction repeated the same shape: the closure language required **all available human semantics**, while the focused test demonstrated only a comfortable subset of operational semantics. The implementation/correction could therefore be locally reasonable while the evidence was too weak for the universal claim being made.

This is treated as a lightweight cross-profile evidence lens rather than a new lifecycle gate. For Standard, Free and Go Spec review/correction, material universal, negative, preservation or boundary claims (`all`, `every`, `never`, `preserve`, `lossless`, `distinguishable`, `only after`, `irreducible`, etc.) require at least one adversarial/boundary/collision fixture capable of falsifying the exact property. Nominal positive examples still count as useful coverage, but they do not prove a universal property. Evidence claims are calibrated to that falsification power; `all A1..An verified` is not justified by fixtures that cannot fail on the property being claimed. This rule does not authorize wider product semantics or opportunistic edge-case work outside the accepted envelope.

The same calibration applies to suite-level baseline reporting: record the actual failing test identities observed in the run. If baseline reds vary between runs, report unstable baseline debt rather than one deterministic failure.

### Subsequent Go field evidence — Nexus #537 exercises the new lenses cleanly

PROMueve Nexus #537 supplied a stronger positive field signal for the same Go routing. The runtime change was a minimal Statistics export wiring correction: the supported handler moved from a nonexistent `HubTools.exportCohortToCSV` symbol to the published `HubTools.export.exportCohortToCSV`, while deliberately preserving `currentCohort` as the formal-filter authority rather than the presentation-only search subset. The integrated audit found no additional supported consumer because the shared exporter, Read Port, data manager and filter semantics were unchanged and the affected-surface trace matched the actual diff.

The evidence materially exercised the new falsification rules rather than merely citing them: a `total > filtered` fixture compared patient identities, an equal-cardinality/different-identity control could detect set substitution, an empty formal cohort could detect fallback to the total cohort, and a local-search adversarial case left one visible row while the formal cohort remained six. The canonical Luna review also found a real evidence-claim defect: the first browser checker reset part of accumulated errors while claiming zero errors across the full journey. Fresh correction #1 removed that reset and the URL restriction; no correction #2 was required. Deterministic oracle `8/8`, browser QA `6/6`, `verify:nexus` and `git diff --check` were green on the audited candidate.

This is **qualification evidence, not a new lifecycle rule**. It supports the current affected-surface and adversarial-property-witness hardenings and is a better Go field signal than Nexus #528, while Cora integrated audit remains the material Complex publication boundary.

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
node tools/check-go-models.mjs    # from the canonical Atenea checkout when go is selected
git diff --check
```

Do not make repeated model-call canaries a ritual.

## Historical qualification

Pi/Gentle/OpenCode V1 qualification and C-083's mistaken V1-as-V2 runtime evidence remain provenance. They do not define the C-084 execution path.

## C-086 regression audit — thin execution restoration

A 2026-10-06 regression audit fixed `Atenea@50122a13f1d1e191e659a21ad6445267e4e354e6` as the known-good modern control: native OpenCode V2 2.0.22 + Matt, Cora-shaped bounded work, single canonical review, fresh correctors, two-attempt correction and real project execution were already functioning there.

Comparison with pre-restoration `9c6be73527c1b4ff8a661d29582bb6317b8e45f7` showed material hot-path accretion: central `AGENTS.md`, preflight, coordinators, implementers, Spec reviewers, correctors and the authority checker all grew; affected-surface tracing and adversarial-witness rules were copied across many roles; downstream projects then duplicated the same material again in local `AGENTS.md`, handoffs and child dispatches. Laboratorio supplied a concrete example: a known-good handoff of ~6.8k characters became a current #78 handoff of ~14.5k, while the actual writer child dispatch reached ~25.6k.

The audit does **not** invalidate the defects that motivated representation narrowing, shared-seam propagation or adversarial evidence. C-086 changes ownership/placement: upstream shaping and review/Cora activate those safeguards when material; writers implement the accepted envelope; correctors close supplied findings; broad/full suites default to integration/publication rather than every slice.

Matt skills were unchanged across the known-good/slowdown comparison. OpenCode 2.0.22 was already used by the known-good sessions. Go creation did not modify Standard/Free bindings and is treated as a catalyst for field learning, not the direct root cause. C-085 runtime/model/context settings remain fixed so the effect of protocol decompression can later be observed independently.

Detailed evidence and restoration mapping: `docs/C086_REGRESSION_AUDIT_AND_RESTORATION_20261006.md`.

### Deferred C-086 field validation

Do not run a synthetic macro-benchmark as part of the restoration commit. At a later clean project boundary, validate with exactly two **small real tickets**:

1. Standard Volume;
2. Standard Complex.

Observe elapsed time, child dispatch size, authority reads, model turns, tool calls, maximum context, compactions, broad-suite repetitions, review findings and correction count. Keep OpenCode/model/context settings fixed through the pair. A deliberately small ticket returning to routine hour-scale execution is itself a regression signal. Do not add more tickets merely to complete a benchmark matrix.

C-086 restoration deterministic conformance is green: `check-vnext-authority` PASS; OpenCode 2.0.22 config/34-agent parse PASS; Free and Go model-presence checks PASS; hot-path legacy affected-surface/adversarial prompt text absent; `git diff --check` PASS. This validates configuration/document coherence only. Real field efficiency validation remains intentionally deferred to the two small Volume/Complex tickets described above.
