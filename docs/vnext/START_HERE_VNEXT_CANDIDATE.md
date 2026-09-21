# Atenea vNext — START_HERE candidate

Status: **P2 CANDIDATE — NOT CURRENT MAIN AUTHORITY**

## 1. First question: is the work shaped?

### No — product/shaping work is still open

Determine whether the current situation is:

- greenfield;
- small brownfield;
- large brownfield;
- mixed-corpus brownfield.

Read existing repository authority first.

Use the adopted shaping workflow only to the extent the situation genuinely requires it.

Output durable executable authority:

- accepted spec / proposal;
- tickets/work orders;
- acceptance criteria;
- constraints/non-goals;
- required project decisions.

Then stop shaping and enter execution.

### Yes — executable authority already exists

Do **not** rerun shaping by ritual.

Reconcile current repository/GitHub state and start execution from the accepted task.

## 2. Reconcile repository entry

Before installing/changing tools:

- identify live branch/PR/checkpoint;
- read `AGENTS.md`, standards, ADR/spec/ticket authority;
- inventory historical Atenea/Pi/Gentle/Herdr signals read-only;
- classify them;
- STOP on unresolved authority contradiction.

Do not clean a brownfield repo merely because old tooling exists.

## 3. Execute

Use native Pi/Gentle.

After the qualified clean VPS cutover, use:

```bash
pi
```

Native Gentle owns:

- ODD;
- decomposition;
- workers;
- verification;
- work-unit commits;
- RDD;
- reviewers;
- acknowledgement/burn.

Atenea adds policy/evidence, not a second controller.

## 4. Verify

Use meaningful deterministic tests/oracles/validators that can independently disagree with implementation.

Validate changed artifact types before publication.

## 5. Review

Follow native Gentle/provider transitions exactly.

Do not invent review verdicts, START decisions or timing.

Known compatibility seams:

- committed-range ASSESS (#4791): keep `.atl/` ignored before work; if native ASSESS returns a typed `risk=unassessable` fail-closed plan, follow its independent-verifier path rather than synthesizing START;
- post-burn STATUS (#4771): successful `acknowledge-approved → authority=burned` is terminal; do not call selectorless STATUS merely to prove the burn again.

## 6. Publish

Approval is not merge authority.

Use target repo policy + explicit human/publication authority.

No force-push/destructive recovery by default. No automatic merge.

## 7. If resuming an old project

Do not resume stale Pi hidden state by default.

Use durable Git/GitHub/product evidence to determine the last legitimate checkpoint, create a clean worktree/session and continue through native Gentle.

See:

`docs/vnext/PROJECT_EXECUTION_HANDOFF_NATIVE_GENTLE.md`
