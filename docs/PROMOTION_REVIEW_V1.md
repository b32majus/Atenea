# Atenea — Integrated promotion audit v1

Status: **CURRENT / CONDITIONAL WHEN INVOKED — C-084**

## Purpose

A material feature/train/PR may receive one independent read-only integrated audit after deterministic closeout and before a human promotion/merge decision. In the current workflow this is normally Cora's audit.

This is not part of every ticket and is not a second implementation lifecycle.

## Trigger

Use it when a composed change crosses material semantic, integration, clinical, security, privacy, state or harness-authority seams; when several tickets interact in ways per-ticket review could miss; or when the human explicitly requests a promotion audit.

Do not invoke it by ritual after ordinary low-risk tickets.

## Evidence

Bind the audit to exact repository/base/head plus the accepted authority and relevant deterministic closeout results. Exact Git identity normally provides enough binding; do not manufacture paperwork hashes/manifests without a concrete need.

## Axes

Check proportionately:

1. semantics/authority — accepted behavior, omissions, unsupported scope;
2. engineering/maintainability — material design/failure-mode debt not already mechanically caught;
3. adversarial/safety — fail-open, stale state, ordering, partial mutation, privacy/auth boundaries;
4. composition — interactions introduced only by the integrated feature/train.

Report blocking findings first, then material nonblocking findings. Candidate mutation invalidates an audit bound to the old HEAD when the audit is still required.

If the audit finds a blocker, Cora does not hand OpenCode an open-ended “fix the PR” request. Convert each authorized repair into one bounded correction envelope: exact finding, required target state, allowed surface, explicit non-goals and deterministic closure evidence. Do not authorize opportunistic cleanup or adjacent findings unless the human explicitly opens a new unit.

After the autonomous correction budget is exhausted, a human may authorize a new focal continuation. That is a new bounded unit, not a hidden second autonomous correction pass.

The audit is evidence for the human boundary. It never grants merge authority.
