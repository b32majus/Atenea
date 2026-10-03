# Domain Docs

How Matt engineering skills should consume domain documentation in this repo.

## Before domain-sensitive work

Read:

- `GLOSSARY.md` at the repo root, or `GLOSSARY-MAP.md` when present;
- ADRs under `docs/adr/` relevant to the area being changed.

`CONTEXT.md` is separate: it may describe current architecture/system state, but it is not Matt's domain glossary.

If glossary/ADR files do not exist, proceed silently. Create them lazily only when a real term or decision needs durable capture.

## Layout

Single-context repo:

```text
/
├── GLOSSARY.md
├── CONTEXT.md              # optional system/current-state context
└── docs/adr/
```

Multi-context repo uses a root `GLOSSARY-MAP.md` pointing to context-specific `GLOSSARY.md` files.

## Vocabulary

When output names a domain concept, use the term defined in the applicable glossary. Do not drift to synonyms the glossary explicitly avoids.

If a concept is absent, either reconsider whether the repo actually uses that concept or note a genuine vocabulary gap for `/domain-modeling`.

## ADR conflicts

If proposed work contradicts an existing ADR, surface the conflict explicitly instead of silently overriding it.
