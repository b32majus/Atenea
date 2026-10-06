# C-085 — Standard writer split and context-economy guard

Status: **RETAINED RUNTIME/ROUTING AMENDMENT — CURRENT EXECUTION AUTHORITY IS C-086**
Date: 2026-10-05

## Scope

C-085 is a narrow field-evidence amendment to C-084. It keeps C-084's native OpenCode V2 runtime, visible human launch, Matt lifecycle ownership, review/correction budget, Free/Go cost-policy extensions, product-shaping boundary and publication rules unchanged.

It changes only:

1. the standard-cost first-writer split; and
2. the runtime context-economy guard for the long-running NaN writer models.

## Runtime baseline

Canonical OpenCode remains the C-084 known-good pin:

```text
@opencode/cli 2.0.22
```

A local update to 2.0.23 was observed on 2026-10-05 during unusually expensive agentic sessions and was rolled back. C-085 does **not** claim that 2.0.23 caused the regression: work-unit complexity differed and no controlled version-only A/B has yet established causality. Returning to 2.0.22 restores the already accepted runtime baseline while that question remains open.

## Standard writer routing

Normal standard-cost implementation now uses distinct writer families again:

```text
volume  → nan/deepseek-v4-flash
complex → nan/glm5.3-flash#high
```

The rest of the standard matrix is unchanged:

- coordinator: MiMo 2.6 Flash;
- explorer: Qwen 3.8 Flash;
- merger: MiMo 2.6 Flash;
- Standards review: GPT-6 Luna high;
- volume Spec review: GPT-6 Luna high;
- complex Spec review: GPT-6.1 Sol high;
- volume correction: DeepSeek V4 Flash;
- complex correction: GLM 5.3 Flash high;
- Cora integrated audit when material.

This is not a quota router. Profile choice still follows accepted risk at a clean work-unit boundary, never live quota percentages. Do not switch the writer model inside an active implementation merely to rebalance usage.

## Context-economy guard

Field observation showed that long agentic workers can accumulate 100+ model turns and repeatedly resend 200–250k cached-token contexts before OpenCode's default near-window compaction fires. The expensive behavior is therefore dominated by repeated large-context turns, not by coordinator prompt size alone.

For the two long-running NaN standard writers, the active user/runtime configuration declares an **effective OpenCode context budget of 220,000 tokens** while leaving the provider's physical capability unchanged. Under OpenCode 2.0.22's default 10% headroom, automatic compaction becomes due at approximately 198k tokens. Compaction retains approximately 15k tokens of recent conversation verbatim beside the structured checkpoint.

```text
V4 effective context budget   220,000
GLM effective context budget  220,000
compaction auto               true
recent verbatim keep          15,000
expected trigger              ~198,000
```

This is an economic/runtime guard, not semantic truncation authority. Repository state, accepted handoffs, Git history and deterministic evidence remain authoritative. If compaction would expose missing durable authority, the correct fix is to make that state durable, not to disable evidence or guess from memory.

## Tool economy without evidence loss

Standard implementers should batch related discovery/reads when practical, make coherent mutations before rerunning focused checks, and reserve broad/full suites for meaningful candidate boundaries unless authority requires earlier execution. This is advisory execution economy only.

Required evidence may not be skipped, weakened or hidden to save tokens. A failing check remains a failing check. No hard tool-call quota is introduced.

## Field evidence that motivated the change

On 2026-10-05 two Standard Complex trains showed multiple writer sessions reaching roughly 80–160 assistant turns and about 209–252k prompt context, producing tens of millions of provider-reported cache-read tokens. A contemporaneous Free PF-03 shadow on OpenCode 2.0.23 also produced a long 136-turn writer session with ~19.5M cache-read, indicating that the amplification pattern was not unique to one NaN model.

By contrast, multiple real Standard work units on the prior 2.0.22 baseline had completed with materially fewer tool/model turns and much lower cache-read. That comparison is strong operational reason to restore the known-good pin, but it is not treated as a controlled causal proof against 2.0.23.

The 220k budget was validated against the actual OpenCode 2.0.22 configuration parser before adoption. Ordinary workers observed below ~198k would not have compacted; the pathological 209–252k sessions would have crossed the guard.

## What C-085 deliberately does not change

- Matt `/implement`, `/implement-spec` and `/code-review` remain upstream and unforked.
- No new train runner, scheduler or RDD-style supervisor is introduced.
- No hard maximum number of tool calls is introduced.
- No deterministic test/evidence requirement is relaxed.
- Free and Go bindings are unchanged.
- Correction budgets and HUMAN STOP semantics are unchanged.
- Herdr remains operator infrastructure, not correctness authority.

Further train/session redesign requires field evidence after this smaller intervention.
