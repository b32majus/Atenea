# C-080 review transport guard — qualification evidence

Date: 2026-10-01
Atenea base: f38af928c4679e5fe8afb58c2ac8508109aa8c16
Qualification branch: work/c080-review-transport-guard-20261001

## Scope

This qualification validates the small C-080 transport-enforcement change only.
It does not alter PROMueve, its candidate, its review lineages, or its publication state.

The change makes the qualified review-host entry serve-only and deterministic:
the per-process assurance overlay declares the lifecycle host as primary and
review-* roles as subagents, while the launcher rejects one-shot reviewer
invocations and alternate review-host configuration sources.

## Static qualification

The following checks passed on the qualification branch:

- ATENEA_OPENCODE_RUNTIME_POLICY_CHECK=PASS
- ATENEA_OPENCODE_ROUTING_PROFILES_CHECK=PASS
- ATENEA_REVIEWER_LIFECYCLE_CHECK=PASS
- ATENEA_OPENCODE_REVIEW_TRANSPORT_CHECK=PASS
- node --check for the new guard and launcher
- git diff --check

The negative guard test proved that a direct run --agent review-reliability
invocation is rejected before the configured OpenCode binary is launched.
The positive launcher test proved that a serve invocation reaches the configured
OpenCode binary only after the effective assurance topology passes validation.
## Live transport smoke

A real OpenCode serve process was launched through
tools/launch-opencode-review-host.mjs on the VPS and exposed the native
/session endpoint successfully.

Observed launcher evidence:

ATENEA_REVIEW_TRANSPORT_GUARD=PASS
OpenCode server listening on http://127.0.0.1:<ephemeral-port>
GET /session → HTTP 200 with an empty session list

The live process reported OpenCode 1.18.33.

## End-to-end review-host qualification attempt

A synthetic review-only qualification was started with two candidate boundaries.
T1 was assessed as high_risk and entered the real Gentle review lifecycle.
The fresh review host was launched only through the new launcher.

The server evidence proves the intended topology physically:

- parent session: agent=atenea-review-host, mode=primary
- parent model: nan/mimo-v2.6-flash
- Task: review-risk, mode=subagent
- Task: review-resilience, mode=subagent
The run then exposed a separate current-runtime compatibility blocker before
terminal capture/burn:

ProviderModelNotFoundError:
Model not found: openai/gpt-6-luna

The current VPS OpenCode configuration contains only the NaN provider, while
the C-080 assurance profile still routes Luna reviewer roles through
openai/gpt-6-luna. This is runtime/configuration drift, not a failure of the
new transport guard. The qualification was stopped rather than substituting
another reviewer model.

## Qualification disposition

Transport enforcement: QUALIFIED for the tested seam.

Full end-to-end C-080 review requalification: PENDING runtime reconciliation
of the currently installed OpenCode 1.18.33 environment with the published
assurance profile. The published runtime policy still names OpenCode 1.18.32
as the qualified runtime; 1.18.33 is therefore treated as a newer observed
runtime, not silently promoted by this change.

No PROMueve state was modified during this qualification.
## Recovery implication

The Atenea guard patch does not authorize any PROMueve recovery by itself.

Once the current runtime/model drift is separately reconciled and the positive
serve → atenea-review-host → reviewer Task → capture → acknowledge/burn path
passes end to end, PROMueve can resume through its existing same-lineage
authority. No new product change or fabricated review authority is required.
