# C-080 review transport guard — qualification evidence

Date: 2026-10-01
Atenea base: f38af928c4679e5fe8afb58c2ac8508109aa8c16
Qualification branch: work/c080-review-transport-guard-20261001

## Scope

This qualification validates the small C-080 review-transport enforcement change.
It does not alter PROMueve, its candidate, its review lineages, or its publication state.

The change makes the qualified review-host entry serve-only and deterministic:
the per-process assurance overlay declares atenea-review-host as primary and
review-* roles as subagents, while the launcher rejects one-shot reviewer
invocations and alternate review-host configuration sources.

## Static qualification

The following checks passed on the qualification branch:

- ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS
- ATENEA_NATIVE_GENTLE_SKILL_POLICY_CHECK=PASS
- ATENEA_OPENCODE_RUNTIME_POLICY_CHECK=PASS
- ATENEA_OPENCODE_ROUTING_PROFILES_CHECK=PASS
- ATENEA_REVIEWER_LIFECYCLE_CHECK=PASS
- ATENEA_OPENCODE_REVIEW_TRANSPORT_CHECK=PASS
- ATENEA_REQUIRED_LENS_ZERO_OUTPUT_CHECK=PASS
- ATENEA_VNEXT_AUTHORITY_CHECK=PASS
- node --check for rewritten/new tools
- git diff --check

The negative guard test proves that a direct one-shot run --agent review-*
invocation is rejected before the configured OpenCode binary is launched.
The positive launcher test proves that a serve invocation reaches OpenCode only
after the effective assurance topology passes validation.

## Live transport smoke

A real OpenCode serve process was launched through
tools/launch-opencode-review-host.mjs on the VPS and exposed the native
/session endpoint successfully.

Observed launcher evidence:

ATENEA_REVIEW_TRANSPORT_GUARD=PASS
OpenCode server listening on 127.0.0.1:<ephemeral-port>
GET /session -> HTTP 200

## End-to-end C-080 review qualification

The first E2E attempt was stopped after a false-negative model-resolution result.
The isolated qualification HOME copied ~/.config/opencode but initially omitted
~/.local/share/opencode/auth.json. The resulting environment did not carry the
real OpenAI OAuth credential. That attempt therefore did not establish provider
drift and must not be treated as evidence that Luna was unavailable.

The qualification harness was corrected locally, without changing Atenea or the
VPS global configuration, by copying the existing auth store into the isolated
qualification HOME. No credential contents were printed or committed.

A fresh synthetic high-risk candidate was then run through the complete path:

assess
-> provider-issued consent
-> fresh serve host via launch-opencode-review-host.mjs
-> atenea-review-host / primary
-> review-* Tasks / subagents
-> provider result capture
-> acknowledge-approved
-> terminal consumption / burn

Runtime during the successful E2E qualification:

- OpenCode 1.18.34
- Gentle AI 3.7.0
- lifecycle host: nan/mimo-v2.6-flash
- review-risk: nan/glm5.3-flash high
- review-resilience: openai/gpt-6-luna high
- review-readability: openai/gpt-6-luna high
- review-reliability: openai/gpt-6-luna high

Physical server evidence showed:

- atenea-review-host entered as mode=primary;
- all four review-* tasks were created as mode=subagent;
- Luna resolved successfully for all three Luna review lenses;
- GLM 5.3 Flash resolved for review-risk;
- no one-shot reviewer fallback occurred;
- no zero-output transport failure occurred.

Gentle reached:

- review line: review-46a429bdc2eeba5d
- terminal verdict: APPROVED
- advisory only: R2-001 readability suggestion at src/auth.mjs:1
- acknowledge-approved executed
- authority burned / terminal consumption recorded
- candidate remained unchanged after review
- git checkpoint remained clean
- human_touches_after_launch=0

The qualification coordinator completed with exit code 0 and recorded
review_transport_train_pass.

## Runtime qualification boundary

The successful transport qualification used OpenCode 1.18.34 because that is the
runtime currently installed on the VPS.

This does NOT promote OpenCode 1.18.34 to the general C-080
current-qualified-runtime. The published runtime policy remains authoritative
for the broader runtime qualification boundary. The evidence here qualifies the
review transport seam and its topology under the currently installed runtime.

The VPS production evidence also independently shows OpenAI/Luna sessions
successfully resolving under the same serve-host topology.

## Disposition

REVIEW TRANSPORT GUARD: QUALIFIED.

C-080 topology:
serve -> atenea-review-host primary -> review-* Task/subagent -> capture/burn:
QUALIFIED by a real end-to-end synthetic train.

No Atenea runtime/model substitution was made.
No PROMueve state was modified.
No PROMueve recovery is authorized solely by this qualification.

The prior ProviderModelNotFound result is classified as a qualification-fixture
defect caused by the isolated HOME lacking the existing OpenAI auth store, not
as an Atenea/OpenCode provider defect.

## Recovery implication

Atenea now has positive evidence for the exact transport seam involved in
PROMueve #487. The PROMueve candidate and lineage remain frozen.

Before any PROMueve recollect, the recovery adjudication must still determine
the validity of the pre-incident T1/T2 reviews and whether the existing
same-lineage recollection is sufficient. This qualification does not fabricate
or replace those historical review results.
