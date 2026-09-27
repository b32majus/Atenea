# Atenea — Work-unit composition policy v1

Status: **CURRENT CONDITIONAL EXECUTION POLICY**
Date: 2026-09-27

## 1. Purpose

This policy is an escalation path, not a mandatory ceremony for every substantial ticket.

Gentle owns internal decomposition, work-unit commits and native review timing. Atenea intervenes only when there is concrete evidence that the accepted delivery candidate is likely too coarse to implement/review safely as one unit.

```text
ordinary bounded ticket
→ no separate composition ceremony

material composition trigger
→ choose coherent delivery units before writing
→ native Gentle lifecycle remains authoritative
```

Planning size and native `review_due` are different facts. Atenea never synthesizes review timing from line counts.

## 2. Trigger conditions

Open this policy when at least one condition is true:

- an existing upstream/task forecast materially exceeds the active review budget;
- the accepted work contains multiple independently useful deliverables that can be verified/checkpointed separately;
- the change crosses several material seams and one candidate would be difficult to reason about as a whole;
- prior execution/review evidence shows the candidate is too coarse or repeatedly exhausts bounded review context;
- the human/project explicitly requests a sliced/chained delivery strategy.

If none applies, do not require a line estimate or composition worksheet. Execute the bounded ticket and let native Gentle decompose internally as needed.
## 3. Default budget signal

When no stronger project/session budget exists, Gentle's 400 authored changed lines remains the default **planning signal** inherited from upstream. It is not a hard technical ceiling, model-capacity limit or automatic STOP.

Do not maintain separate Atenea 600/800 line bands. They added process without changing native authority.

Use the signal proportionately:

- if a coherent unit is comfortably bounded, implement it;
- if an upstream forecast is clearly above budget, look for one honest semantic split before writing;
- if the smallest coherent unit still exceeds the active budget, preserve coherence and follow the active upstream/human size-exception mechanism when one is required;
- never code-golf tests/docs/comments or separate behavior from its proof merely to hit a number.

An explicit project/session `review_budget_lines` supersedes the default signal.

## 4. Composition outcome

When this policy is triggered, resolve one of three outcomes before the affected writer turn:

1. **One coherent unit** — the work is still best reviewed/checkpointed together; proceed and record any required exception.
2. **Semantic chain** — define the small number of independently meaningful units and implement only the current unit.
3. **Unresolved coarse work** — product/architecture uncertainty, not size alone, prevents an honest boundary; STOP and repair the execution authority.

Do not split mechanically by files, layers, test-vs-code or arbitrary line chunks.

## 5. During execution

If actual work grows beyond the forecast:

- keep correctness and coherence first;
- do not repeatedly reslice solely because a counter moved;
- finish the smallest safe coherent state;
- run the applicable deterministic evidence;
- let native Gentle assess/review the actual candidate;
- if review evidence shows the candidate is genuinely too coarse, preserve that evidence and recompose at the next safe boundary rather than retry-looping reviewers/models.
## 6. Recovery is exceptional

For a local unpublished candidate already proven too coarse, preserve the accepted product tree/base as evidence before rewriting history. Recompose only unpublished local history into coherent units; do not redesign product content merely to obtain smaller commits. Each reconstructed unit gets its normal deterministic checks and native Gentle lifecycle. Published/shared history requires separate destructive-history authorization.

The preserved tree is a drift oracle, not authority to preserve a proven defect.

## 7. Native ownership

This policy never authorizes Atenea to:

- select reviewer lenses;
- calculate `review_due`;
- synthesize START;
- change model routes to escape a coarse candidate;
- disable RDD;
- manufacture a size exception not accepted by the active upstream/project authority.

Current authority order:

```text
explicit project/session budget or delivery decision
> current upstream Gentle semantics
> accepted project/task exception
> Atenea default 400-line planning signal
```

For the ordinary no-trigger path, none of this needs to be surfaced to the human or copied into the ticket prompt.