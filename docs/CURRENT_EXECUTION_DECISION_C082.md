# C-082 — Supervisor is control plane; evidence crosses the handoff

Status: **CURRENT**
Date: **2026-10-02**

C-082 is a narrow successor to C-081. It changes only supervisor ownership and phase handoff. C-081 review dispatch, C-080 assurance/routing, the prepared-ticket front door, worker models, Gentle ownership and publication boundaries remain unchanged.

## Decision

```text
ONE ticket-authority boundary
→ ONE minimal preflight
→ select prepared implementation profile
→ launch ONE implementation worker
→ worker implements + runs required deterministic checks + commits candidate
→ supervisor accepts structured worker evidence
→ mechanical handoff only
→ Gentle ASSESS
→ exact C-081 review/correction lifecycle
→ checkpoint / next authorized ticket / STOP
```

The supervisor is **control plane**, not a second engineer. Workers own engineering/data-plane work. **Evidence crosses the boundary; engineering work does not.**

## One-preflight rule

Preflight runs exactly once when entering an authorized ticket/work unit. Starting the implementation worker, entering Gentle ASSESS, starting review collection, returning from a reviewer, or launching a provider-issued correction does **not** create a new preflight boundary.

A new preflight is allowed only when the controlling context has materially changed: a genuinely new authorized ticket/work unit, a different worktree/base that invalidates prior authority, or a HUMAN STOP followed by new human authority. Do not use phase transitions as an excuse to repeat preflight.

## Worker evidence handoff

The implementation/correction worker owns all deterministic verification required by repository policy for the candidate it creates. Its FINAL must report at minimum: `base_sha`, `candidate_sha`, required check command(s) and PASS/FAIL state, and worktree status.

The supervisor may verify only mechanical transition facts: the candidate exists, HEAD/candidate identity matches the report, expected base relationship holds, worktree state is acceptable, required evidence is present, and no new human-owned boundary appeared. A PASS attached to the same candidate is reusable evidence; the supervisor does not recreate it.

## Forbidden supervisor engineering

After worker FINAL, the supervisor MUST NOT semantically inspect source/diff, rerun worker tests/typecheck/build/E2E, launch independent challenge/QA, broaden the verification suite, change code, or diagnose beyond a typed STOP. Missing/failed evidence causes STOP or an explicitly authorized correction; it does not authorize a second QA pass.

Evidence is invalidated only by a changed candidate, changed controlling base/authority, missing or failed required evidence, or a provider-issued correction that produces a new candidate. The worker responsible for the new candidate owns its required verification.

## Review/correction phase

The supervisor runs Gentle ASSESS once for the accepted candidate and follows only provider-issued transitions. C-081 dispatches reviewer tasks deterministically. If Gentle grants correction authority, the supervisor launches the correction worker with that bounded authority; the correction worker edits/verifies/commits, then returns another mechanical handoff. This is a continuation of the same ticket, not a new preflight.

Technical reviewer failure remains HUMAN STOP. Review approval remains evidence, not publication authority.

## Qualification status

The deterministic control-plane oracle passes a clean one-preflight flow and rejects both repeated-preflight flow and the real Symphonia over-verification pattern (post-worker diff inspection + duplicate typecheck/test/build/E2E + independent challenge).

The live native-Pi supervisor canary is **PASS** on 2026-10-02. It ran `pi --no-extensions` on `nan/deepseek-v4-flash` through Pi's native RPC I/O mode only (no Gentle Shell/ODD). One ticket boundary produced one preflight phase, one worker launch, one worker-owned checker execution, one mechanical handoff and one Gentle ASSESS. After WORKER_FINAL the only supervisor tool action was ASSESS: no source/diff inspection, check rerun, independent QA/challenge or second preflight. Gentle returned `review_due=false (under_budget)` and the supervisor stopped without review collection or publication.
