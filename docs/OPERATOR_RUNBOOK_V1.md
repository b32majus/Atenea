# Atenea Operator Runbook

Status: **CURRENT POINTER**

Current productive prepared-ticket authority:

- `docs/START_HERE.md`
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`
- `docs/vnext/CURRENT_COMPATIBILITY.md`

## Current normal path

```text
accepted prepared ticket/train
→ Pi supervisor + Herdr
→ ONE plain Pi child (`pi --no-extensions`)
→ repository authority + applicable project skills
→ implementation + deterministic checks/oracles
→ local candidate commit
→ native Gentle ASSESS with `--agent codex`
→ exact provider-issued review continuation when due
→ terminal / durable checkpoint
```

OpenCode Build is the qualified fallback ticket worker after a concrete Pi runtime/tooling failure. Do not route prepared tickets through `gentle-orchestrator` merely because OpenCode is used as fallback.

Plain Pi is not a Gentle Shell review host. Never manually set `GENTLE_PI_REVIEW_RELAY_CONTRACT`; native review uses Codex transport.

## Historical operator paths

The following remain evidence/recovery references for the runtimes they actually qualified; they are not the current prepared-ticket entry:

- `docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md`
- `docs/OPERATOR_RUNBOOK_OPENCODE_ZERO_TOUCH_V1.md`
- older Gentle-Pi/native-profile run recipes

Do not rewrite historical evidence to pretend it tested the current topology.

## Publication and worktree hygiene

Review approval does not authorize push/PR/merge/deploy. Follow the target repository's explicit publication policy and human authority.

Do not delete or recycle an execution worktree until required local state/evidence is durable elsewhere and no active process depends on it. Do not use forced worktree removal as routine cleanup.
