# G1 Shaping Benchmark — Interim Run Ledger

Date: 2026-09-21

Runtime constant for valid runs:
- baseline code SHA before arm-specific authority: `fb7b11aae84d0422d49bd4eaa1bef795ed84ac68`
- Pi 0.86.1
- gentle-pi 3.3.0
- Gentle AI 3.4.0
- NaN / GLM-5.3-Flash
- benchmark profile: primary medium; worker/verify/reviewer roles low
- same frozen hidden evaluator: 24 checks

## A2 — Native ODD from common brief

Outcome:
- hidden evaluator: **24/24 PASS**
- own tests: **15/15 PASS**
- native RDD: high risk, 4 lenses, APPROVED, acknowledgement/burn complete
- no human rescue; standard first-review session consent only

Change:
- 4 work/closure commits after common benchmark profile base
- 5 changed files
- +382 / -1
- ODD tracking: 1,952 bytes

Subagents:
- context probe worker: 45,159 tokens
- implementation worker: 113,954 tokens
- total recorded subagent tokens: **159,113**

Primary-session process:
- 47 assistant messages
- 55 tool calls
- 19 native review tool calls
- one grouped reviewer relay transport failure; upstream recovered safely via fresh STATUS + exact one-slot captures
- 6 tool results marked error overall, including procedural retries

Interpretation:
- native ODD alone produced externally correct behavior;
- substantial procedural planning/delegation occurs without pre-shaping;
- upstream multi-review recovery worked without an Atenea bridge.

## B2 — Minimal semantic contract → Native ODD

Arm-specific authority:
- `EXECUTION_CONTRACT.md`: 3,037 bytes
- outcome / observable behavior / acceptance / failure contract / constraints / non-goals / examples / testing policy
- no implementation decomposition, file plan or worker plan

Outcome:
- hidden evaluator: **24/24 PASS**
- own tests: **12/12 PASS**
- native RDD: high risk, 4 lenses, APPROVED, acknowledgement/burn complete
- no human rescue; standard first-review session consent only

Change:
- 3 work/closure commits after contract base
- 5 changed files
- +356 / -0
- ODD tracking: 1,949 bytes

Subagents:
- implementation worker: 305,990 tokens
- independent verifier: 74,809 tokens
- total recorded subagent tokens: **380,799**

Primary-session process:
- 33 assistant messages
- 43 tool calls
- 13 native review tool calls
- one capture-group rejection caused by altered/transcribed opaque binding; upstream failed closed and recovered after fresh STATUS
- 1 tool result marked error

Interpretation:
- semantic contract reduced primary-session exploration/procedural activity;
- it did **not** reduce total recorded subagent tokens in this single stochastic run;
- worker variability and native verification policy dominate token cost;
- opaque provider bindings should remain runtime-owned; they are not suitable Atenea state.

## A2 vs B2 — current evidence

Both satisfy the same hidden acceptance contract completely.

Do **not** conclude cost superiority from one run per arm.

Current evidence supports only:
1. pre-shaping is not required for correctness on G1;
2. a minimal semantic contract makes the primary orchestration more direct;
3. total cost remains stochastic enough that repetitions are necessary;
4. native Gentle already supplies substantial planning/delegation/review discipline;
5. Atenea should not recreate provider-owned review tokens or transitions.

Next:
- C: current Matt shaping → fresh native Gentle execution
- D: Gentle-native OpenSpec/SDD → fresh native Gentle execution
- then repeat selected arms before final methodology decision.
