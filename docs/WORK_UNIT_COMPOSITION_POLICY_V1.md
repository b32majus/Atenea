# Atenea — Work-unit composition policy v1

Status: **CURRENT CONDITIONAL POLICY — C-084**

This is an escalation path, not mandatory ceremony.

```text
ordinary bounded ticket
→ execute it

material composition trigger
→ split into a small number of coherent semantic units before writing
```

Matt `/to-tickets` and `/implement-spec` own their task-graph/frontier mechanics. Atenea does not duplicate them.

## Open this policy when

- accepted work contains several independently useful outcomes;
- one candidate crosses several material seams and would be hard to reason about as a whole;
- prior execution/review evidence shows the unit is too coarse;
- the human/project explicitly requests staged delivery.

If none applies, do not create a composition worksheet or line-count ceremony.

## Composition rule

Prefer semantic slices with independent acceptance/evidence. Never split mechanically by files, layers, tests-vs-code or arbitrary line chunks.

Do not code-golf useful tests/docs/comments to make a unit look smaller.

If product/architecture uncertainty prevents an honest boundary, repair the execution authority before writing instead of disguising uncertainty as decomposition.

## During execution

If work grows, keep correctness/coherence first and finish the smallest safe coherent state. Recompose at the next clean boundary only when evidence shows the current unit is genuinely too coarse.

Planning size is not review depth. Review/assurance comes from the selected Atenea profile and actual risk, not authored-line arithmetic.
