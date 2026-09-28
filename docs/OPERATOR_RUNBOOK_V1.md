# Atenea — Operator Runbook v1

Status: **POINTER TO CURRENT OPERATION**

Current prepared-ticket operation is:

- `docs/START_HERE.md`;
- `docs/CURRENT_EXECUTION_DECISION_C078.md`;
- `docs/CURRENT_EXECUTION_DECISION_C077.md` for preserved base topology;
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- `docs/PREPARED_TRAIN_HANDOFF_C078.md`.

Current shape:

```text
Pi supervisor + Herdr
→ ONE Pi implementation worker
→ production-volume|complex
→ deterministic checks + candidate commit
→ Gentle ASSESS chooses 0 / 1 / 4 lens depth
→ isolated OpenCode V1 transport only when collection is due
→ terminal burn/checkpoint
```

`docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md` remains OpenCode V1 review/fallback provenance. It is not the normal prepared implementation entry after C-077/C-078.
