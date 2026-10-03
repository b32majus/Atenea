# OpenCode 1.18.32 + Gentle 3.7 serve zero-touch qualification

Status: **HISTORICAL / SUPERSEDED BY C-083 — PRESERVED PROVENANCE**

Current execution authority is `docs/START_HERE.md` + `docs/CURRENT_EXECUTION_DECISION_C083.md`. Do not use this document as a current runbook or routing contract.
Date: 2026-09-27

## Scope

This qualification answers one question: can Atenea keep fresh OpenCode context per bounded role while using current stable OpenCode `1.18.32`, Gentle AI `3.7.0`, direct `build`, native Gentle immutable review transport and zero human touches after an already-authorized synthetic train launches?

It does not promote a universal nontrivial writer model. C-071 remains open for writer-model routing.

## Clean rebuild baseline

The active host was rebuilt from zero rather than migrated. The two prior OpenCode installations, historical OpenCode state/cache/config roots and temporary runtime residue were removed from active paths into reversible quarantine.

Current real runtime:

```text
OpenCode real install = ~/.npm-global/lib/node_modules/opencode-ai = 1.18.32
Gentle AI             = 3.7.0
default writer         = build
Context7 / Engram      = OFF by default
OpenCode global AGENTS = minimal invariants only
```

Historical `1.18.10` qualification remains evidence, not an install pin.
## Findings before the final train

Clean one-shot `opencode run` remained intermittently unsafe for unattended launch. The process could stop at `message=init` before session creation even with a new HOME, empty Git repository, `--pure`, no provider configuration and no Gentle assets. The accumulated historical state was therefore not the sole cause.

`opencode serve` avoided that pre-session failure. Native HTTP `POST /session` creation and `POST /session/:id/message` passed with the configured runtime and real NaN/GLM calls.

The first full serve-train attempt failed closed before review START with:

```text
fresh target START runtime lacks immutable review transport
```

No review authority was created. Gentle 3.7 source shows why this can be intermittent: `internal/opencode/runtime.go` detects the OpenCode major by running `opencode --version` under a hard 3-second timeout; `review_transport_capability.go` admits OpenCode immutable review only when that detector resolves V1.

Twenty direct `1.18.32` version probes took 1.273–1.897 s under ordinary load. That is below 3 s but leaves little load/jitter margin. The old compatibility idea was therefore valid; the mistake was coupling it to the obsolete `1.18.10` pin.
## Qualified compatibility seam

A thin `~/.local/bin/opencode` shim now handles only an exact single-argument `--version` / `-v` request by reading the version from the real npm package metadata. Every other invocation `exec`s the single real OpenCode binary in `~/.npm-global/bin/opencode` unchanged.

The shim is version-neutral: updating the real npm package changes the version it reports. It does not preserve or emulate OpenCode behavior and is not a second OpenCode installation.

Observed after promotion:

```text
opencode --version = 1.18.32
version probe      = 0.06–0.09 s
opencode debug startup = 1.65 s
```

## Final two-ticket zero-touch train

Topology used for each ticket:

```text
thin deterministic supervisor
→ fresh `opencode serve` writer host
→ one direct `build` HTTP session
→ deterministic tests
→ native Gentle STATUS / exact START / authorized consent relay
→ fresh `opencode serve` review host
→ one bounded `build` host session
→ provider-issued reviewer Task through `opencode-review-transport.ts`
→ exact acknowledge-approved / authority burned
→ Git checkpoint
→ next ticket or STOP
```
Observed result:

| Ticket | Writer | Gentle review | Checkpoint |
| --- | --- | --- | --- |
| T1 | PASS; 2 files; tests green | medium; `review-reliability`; zero findings; acknowledged + burned | `83fd04f950d6b774f5fee3aee044576119278166` |
| T2 | PASS; 2 files; tests green | medium; `review-reliability`; one non-blocking SUGGESTION; acknowledged + burned | `e211eb314b55d7f48944647da7db881545b00ef8` |

Final properties:

```text
HUMAN_TOUCH_AFTER_LAUNCH = 0
terminal Gentle reviews   = 2/2
Git checkpoints           = 2/2
final tests               = PASS
final worktree            = clean
wall time                  = 595.61 s (~9m56s)
```

The T2 suggestion (`R3-silent-coercion` on the synthetic `square` helper) was explicitly non-blocking. Gentle approved and burned the exact candidate without correction or re-review.

Performance timings from this run are not a clean benchmark because stale qualification servers discovered from earlier probes were terminated during T1 review. They cannot manufacture review authority or a PASS, but they can inflate latency. Functional qualification is valid; performance optimization remains separate work.

Evidence directory: `/srv/kairos-lab/outbox/opencode-serve-zero-touch-20260927/`.

## Promotion decision

OpenCode `1.18.32` + Gentle AI `3.7.0` + fresh `serve` hosts is qualified as the current Atenea runtime transport. One-shot `opencode run` remains blocked for unattended use while the clean pre-session init hang remains reproducible.

Do not remove the version shim while Gentle 3.7 retains the 3-second runtime-major probe unless an equivalent upstream-safe fix is released and requalified.
