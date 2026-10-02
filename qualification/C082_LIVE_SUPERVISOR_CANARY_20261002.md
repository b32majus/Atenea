# C-082 live native-Pi supervisor canary — 2026-10-02

Result: **PASS**

Runtime under test: plain Pi 1.0.0, `pi --no-extensions`, model `nan/deepseek-v4-flash`. Pi native `--mode rpc` was used only to capture an auditable JSONL session instead of the TUI; Gentle Shell/ODD was not loaded.

Observed clean run:

- one ticket-authority/preflight phase;
- one `./worker-fixture.sh` launch;
- worker executed `./check.sh` exactly once and returned candidate-bound PASS evidence;
- worker candidate `f67591abedb6b8c7ff4313c675fd9a909bf7706b` from base/tag `b6a48c5fd5d3d2ed310e611a98767a018b1cc1ec`;
- after WORKER_FINAL, supervisor performed no semantic source/diff inspection and no test/check/build/E2E/challenge rerun;
- exactly one `gentle-ai review assess --agent opencode --base-ref ticket-base --committed-only --json`;
- Gentle result: risk `medium`, 1 path / 1 line, `review_due=false`, reason `under_budget`;
- supervisor stopped immediately: no review collection and no publication.

Transcript audit counted 5 supervisor tool calls total. The first three were within the single entry preflight phase (`ls/read ticket`, then mechanical base/worktree/runtime verification); the fourth launched the worker; the fifth was ASSESS. Post-worker forbidden engineering actions: **0**. Worker checker invocation count: **1**.

An earlier fixture attempt was excluded from PASS evidence because an untracked `.ticket-base` control file made Gentle return `unassessable`. Even in that attempt the supervisor correctly stopped after the single ASSESS instead of diagnosing/retrying; the clean rerun replaced the control file with a Git tag and completed successfully.
