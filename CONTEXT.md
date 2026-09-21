# Atenea Context

Status: **CURRENT DOMAIN CONTEXT**

## Purpose

Atenea exists to make autonomous engineering work safer, more reproducible and easier to operate **without competing with the upstream runtime it adopts**.

## Current architecture

Atenea vNext is a thin layer over native Pi + Gentle.

It retains:

- stable repository/engineering policy;
- optional phase-scoped shaping;
- secret-free desired-state provider/profile config;
- deterministic conformance checks;
- publication/Git guardrails;
- historical architectural evidence.

It does not retain active custom:

- execution controllers;
- worker supervisors;
- review controllers;
- routing engines;
- consent relays.

## Current productive stack

Qualified 2026-09-22:

```text
Pi 0.87.0
Gentle Shell 3.3.0
Gentle AI 3.4.0
NaN
native-nan
```

Normal entry: `pi`.

Herdr is optional persistent operator infrastructure.

## Current design principle

Use the cheapest reliable owner for each fact:

- product meaning → human/repository authority;
- execution lifecycle → upstream Gentle;
- machine-decidable facts → deterministic tooling;
- publication → human/target repo policy.

## Current transition state

P0–P6 qualification is complete.

P7 promotes the vNext policy/config/conformance layer as current repository authority and archives superseded runtime machinery as historical provenance.

Runtime/provider compatibility debt is tracked in `docs/vnext/CURRENT_COMPATIBILITY.md`.
