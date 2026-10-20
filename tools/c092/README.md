# C-092 / M1 — deterministic core (no LLM)

**Authority:** `docs/c092/C092_ARCHITECTURE_AND_PLAN_20261019.md` and
`docs/c092/C092_M1_BUILD_WORK_ORDER_20261019.md`. M1 is the pure deterministic
core only: manifest validation, typed state transitions and a durable store
with a per-unit OS lock. **M1 dispatches no models, runs no product witnesses,
runs no product tests and has no `run`/`dispatch` command.**

## Surface

- `manifest.mjs` — `validateManifest(raw)` for the closed contract
  `atenea.c092.unit/v1` (fail-closed, `BLOCKED_PREP` on any violation) and
  `preflightRepo(root, manifest)` (read-only git BASE==HEAD + clean-worktree +
  allowPath symlink/traversal checks). It never executes manifest-supplied
  commands; the manifest schema has none.
- `state.mjs` — pure transition engine over
  `READY → DISPATCH_PENDING → IMPLEMENTING → CANDIDATE → VERIFYING →
  REVIEWING → (READY_FOR_HUMAN | CORRECTION_PENDING → CORRECTING →
  FOCAL_REVIEW → …)`, with `HUMAN_STOP`/`FAILED` reachable from any
  non-terminal. Terminals are immutable. The writer is reserved exactly once,
  durably, before any dispatch; a retry returns the existing reservation and
  never mints a second one. No `forceAdvance`/`reset`/`retryWriter`/
  `override`/`skipReview` events exist.
- `store.mjs` — durable per-unit state in an explicit operation directory:
  exclusive `initStore` per `unitId` (atomic `mkdir`), manifest sealed by
  SHA-256 and re-verified on every load, monotonic `version` with
  compare-and-swap on every mutation, per-unit `mkdir` lock (existing lock =
  `LOCK_CONTENTION`; never stolen or auto-deleted; release is owner-only),
  event history with minimal evidence persisted via temp file + rename +
  file fsync (directory fsync best-effort).
- `cli.mjs` — deterministic CLI only:
  `init --manifest <file> --store <dir>`,
  `status --unit <id> --store <dir>`,
  `advance --event <eventJSON> --unit <id> --store <dir> --expected-version N`.
  Exit code 0 on success, 1 on any rejection. JSON output.

## Evidence

`node --test tools/c092/*.test.mjs` — 45/45 PASS, stable across repeated runs
(writer-once, double-attempt and concurrent-process races, ambiguous dispatch,
terminal immutability, correction max-2, version conflicts, malformed
manifests, path traversal/symlinks, Visual-axis contradiction, lock
contention, rejection history, no-second-writer invariants).

## Explicit non-guarantees (carried to M2+, not hidden)

1. **Exactly-once dispatch is NOT proven and is not claimed.** The store gives
   at-most-once *reservation* (reserve-before-dispatch, single fence token).
   Crash windows between reservation and a future host dispatch, and power
   loss between rename and directory-fsync, are unproven; the runtime here
   never dispatches anything, so there is nothing to lose a response from yet.
2. **Lock recovery is intentionally absent.** A crashed lock holder leaves the
   unit in `LOCK_CONTENTION` until a human removes the lock directory. There
   is no stale-lock detection, no timeout and no automatic steal: ambiguity is
   routed to human reconciliation, per the work order.
3. **A crash inside `initStore` between unit-directory creation and manifest
   sealing** leaves a `UNIT_INIT_INCOMPLETE` unit that no retry can fix; it
   requires human removal. No automatic cleanup exists.
4. **Remote/network filesystems are untested.** The mkdir-lock and
   rename-atomicity semantics are only exercised on a local POSIX filesystem
   (Linux, Node 26). No claim is made for NFS/FUSE or Windows.
5. **`consumerSymbols: []` is accepted but G03 is never claimed verified**;
   the validator returns an explicit warning every time.
6. **No host identity verification exists in M1.** `HOST_CONFIRM` accepts a
   `sessionRef` string as evidence shape; the actual OpenCode host
   identity/correlation contract is M2 scope. Nothing in M1 validates that a
   session exists.
7. **Symlink defense is component-level at preflight time.** It checks
   existing path components of `allowPaths` under the repo root; it is not an
   OS sandbox and provides no runtime protection against a writer creating
   later symlinks.

M2 owns the OpenCode adapter, host-verified session identity and dispatch
reconciliation. None of those APIs are invented or stubbed here.
