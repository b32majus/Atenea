# Prepared train handoff — C-081

Status: **CURRENT**
Decision: `docs/CURRENT_EXECUTION_DECISION_C081.md`

Use this handoff only for already-shaped, executable work. Do not reopen ODD.

```text
accepted prepared ticket/train
→ clean Pi supervisor + Herdr on nan/deepseek-v4-flash
→ select prepared implementation profile
→ ONE plain Pi implementation worker (`pi --no-extensions`)
→ deterministic verification
→ candidate commit
→ Gentle ASSESS
→ no OpenCode when review_due=false
→ exact Gentle lifecycle when due
→ deterministic OpenCode V1 direct-subtask dispatch for provider_task collection
→ checkpoint / next authorized ticket / STOP
```

Implementation routing is unchanged from C-080:
- `production-volume` → DeepSeek V4 Flash;
- `complex` → GLM 5.3 Flash high on a material complexity trigger;
- supervisor remains DeepSeek V4 Flash;
- Pi implementation failure may use the already-qualified OpenCode Build V1 fallback under the same shaped contract.

Review collection:
- Gentle alone chooses 0 / 1 / 4 lenses and owns lineage/revision/target/correction/refuter/validator/acknowledge;
- render the single assurance profile per process with `tools/render-opencode-routing-overlay.mjs`;
- start the serve process only through `tools/launch-opencode-review-host.mjs`;
- there is no `atenea-review-host` or relay LLM;
- for every returned `provider_task`, pipe the exact JSON once to `tools/dispatch-opencode-review-task.mjs --server <loopback-url> --cwd <repo>`;
- dispatcher success means query Gentle STATUS; dispatcher/plugin/task error or timeout means HUMAN STOP;
- no retries, alternate model, lifecycle diagnosis, new START or new ASSESS after a technical failure.

Reviewer routes remain: readability/reliability/resilience/validator → Luna high; risk → GLM 5.3 Flash high; refuter → Mimo only when provider-issued.

After exact `acknowledge-approved` returns `authority: burned`, review is terminal. Push / PR / merge / deploy remain separate human or repository-policy decisions.
