# Atenea — Operator Runbook v1

Status: **POINTER TO CURRENT OPERATION — C-086**

Read:

1. `docs/START_HERE.md`;
2. `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
3. `docs/ATENEA_EXECUTION_ROUTING_V0.md`;
4. the accepted issue/spec/ticket;
5. repository `AGENTS.md`, `CODING_STANDARDS.md`, `CONTEXT.md` and relevant glossary/ADRs.

Current shape:

```text
Cora prepares repo/worktree + durable handoff + preflight
→ READY_TO_LAUNCH
→ Cora returns exact bash + agent selection + exact prompt
→ human opens visible native OpenCode V2 TUI (`opencode .`) in existing Herdr
→ human verifies path/agent, pastes prompt and presses Enter
→ Matt /implement or /implement-spec
→ bound role agents
→ deterministic evidence
→ Standards + Spec review (originating implementer write phase closes)
→ up to two fresh finding-scoped correction attempts if needed
→ material composed-state closeout
→ Cora integrated audit when warranted
→ human publication / merge
→ post-merge worktree closeout
```

Do not launch Herdr per ticket. For real work, Coras do not independently start OpenCode or submit the train prompt unless the human explicitly delegates that specific launch. Do not use V1 `--pure`. Historical Pi/Gentle/OpenCode V1 runbooks remain provenance only.
