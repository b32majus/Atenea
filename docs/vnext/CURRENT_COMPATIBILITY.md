# Atenea vNext — Current Compatibility Notes

Status: **CURRENT RUNTIME / PROVIDER EVIDENCE**
Date: 2026-09-28

## Current baseline

```text
Pi                 0.87.1
Herdr              0.9.1
Gentle AI          3.7.0
OpenCode           1.18.32 (qualified V1 review/fallback runtime)
prepared supervisor Pi + Herdr
prepared worker     one plain Pi child (`pi --no-extensions`)
default profile     production-volume → nan/deepseek-v4-flash
complex profile     complex → nan/glm5.3-flash high
review transport    qualified OpenCode V1 native Gentle transport
```

Prepared tickets do not enter Gentle Shell/ODD/`gentle-orchestrator`.

## OpenCode V1 review boundary

The 2026-09-27 OpenCode V1 zero-touch and routing qualifications remain the current review/fallback evidence. OpenCode 1.18.32 is the current stable 1.x runtime. One-shot `opencode run` remains blocked for unattended use while its clean-state init hang remains reproducible; fresh bounded `opencode serve` hosts/sessions are the qualified transport surface.

For C-077, OpenCode is used after the Pi-authored candidate commit for native Gentle review collection when due, and as fallback implementation only after a concrete Pi runtime/tooling failure.

Review entry:

```bash
gentle-ai review assess --cwd "$PWD" --agent opencode --base-ref <base> --committed-only --json
```

## Reviewer routing

Production-volume uses the already-qualified mapping in `config/native-gentle/opencode-production-volume.profile.json`:

- risk GLM high;
- readability Luna high;
- reliability V4 Flash;
- resilience V4 Flash;
- refuter MiMo conditional;
- validator Luna high conditional.

Complex uses `config/native-gentle/opencode-complex.profile.json`:

- risk Luna xhigh;
- readability Luna high;
- reliability Luna xhigh;
- resilience V4 Flash;
- refuter Sol xhigh conditional;
- validator Luna high conditional.

Explicit Judgment Day: Judge A MiMo, Judge B Luna xhigh, fix GLM high.

## Plain Pi boundary

`pi --no-extensions` disables extensions but keeps repository context and skill discovery. Pi supports trusted project skills from `.pi/skills/` and `.agents/skills/`.

Plain Pi is not the Gentle-Pi host relay. `gentle-ai review assess --agent pi` may fail closed without the host relay contract; never self-attest `GENTLE_PI_REVIEW_RELAY_CONTRACT` manually.

Use `--approve` only as a one-run project-trust override for intentionally trusted repositories that require protected project resources.

## Committed candidates

`review assess` derives risk from the Git candidate. Preserve exact base/lineage/target. With committed-only review, an authorized correction may require a new local commit before validator can see the corrected candidate. `acknowledge-approved → authority=burned` is terminal.

## Historical evidence

Keep, but do not treat as current prepared-entry authority:

- `docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md` — review/fallback transport evidence;
- `docs/OPENCODE_MODEL_ROUTING_QUALIFICATION_20260927.md` — reviewer model evidence;
- older OpenCode-first writer runbooks;
- Gentle-Pi/ODD profile evidence.

Current operation is defined by C-077 and `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`.
