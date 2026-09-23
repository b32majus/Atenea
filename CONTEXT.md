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

Maintenance-qualified 2026-09-23:

```text
Pi 0.87.1
Gentle Shell 3.7.0
Gentle AI 3.7.0
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

P0–P7 qualification and promotion are complete.

The current repository authority is the promoted vNext policy/config/conformance layer. Stable runtime maintenance on 2026-09-23 advanced Gentle Shell and Gentle AI to 3.7.0 and Engram to 2.1.0 without changing the zero-controller architecture.

Runtime/provider compatibility debt is tracked in `docs/vnext/CURRENT_COMPATIBILITY.md`.
