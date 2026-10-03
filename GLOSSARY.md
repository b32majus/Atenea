# Atenea Glossary

This file contains domain vocabulary used by Atenea and the Matt engineering skills. It is not execution policy.

- **Atenea** — the thin policy, routing and conformance layer around upstream engineering tools and skills.
- **Authority** — durable accepted information that defines product meaning, constraints, acceptance or publication rights.
- **Volume profile** — ordinary Atenea execution profile: V4 implementation with normal independent assurance.
- **Complex profile** — risk-triggered profile: V4 implementation with stronger independent review and GLM correction.
- **Deterministic evidence** — an executable or mechanically inspectable result that can disagree with an implementation, such as a test, typecheck, parser, schema validator, linter or oracle.
- **Feature/train** — a composed delivery containing multiple related tickets/work units whose integration seams may need verification beyond each unit individually.
- **Integrated audit** — Cora's read-only assessment of the composed feature/train/PR after deterministic closeout and before a human merge/promotion decision when material.
- **Correction pass** — the single bounded fresh-worker attempt allowed to resolve review findings before escalation.
- **Herdr** — operator infrastructure for persistent sessions/process observation; not product, execution or correctness authority.
- **Delivery worktree** — the worktree carrying the integration/PR candidate, retained through merge and cleaned during post-merge closeout.
