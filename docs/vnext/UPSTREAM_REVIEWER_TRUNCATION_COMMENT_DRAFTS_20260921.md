# Upstream collaboration notes — reviewer reasoning-only truncation

Date: 2026-09-21

These comments were prepared for upstream maintainers after P0 diagnosis.

The connected GitHub integration cannot write to the external repositories and returned HTTP 403. No external comment was published from ChatGPT.

## Gentle Shell #1259

Target:

https://github.com/Gentleman-Programming/gentle-shell/issues/1259

Suggested comment:

---

I hit the same failure family on current gentle-pi 3.3.0 / Gentle AI 3.4.0 and was able to isolate it one layer below the review lifecycle.

Setup:
- Pi 0.86.1
- gentle-pi 3.3.0
- Gentle AI 3.4.0
- NaN OpenAI-compatible provider
- real medium-risk review, review-reliability lens
- materialized reviewer prompt: 40,118 bytes / 559 lines

The in-process reviewer failed inside `completeSimple()` before Gentle received reviewer artifact text:

```
Expected property name or '}' in JSON at position 1 (line 1 column 2)
```

I then replayed the exact provider-materialized reviewer prompt outside RDD through the same `@earendil-works/pi-ai completeSimple()` path.

Results:

```
nan/glm5.3-flash      default  -> FAIL (~131s), 0 final text
nan/deepseek-v4-flash default  -> FAIL (~61s),  same parse error
nan/glm5.3-flash      medium   -> FAIL (~129s), terminated
nan/glm5.3-flash      low      -> PASS (~62s), stop, valid final text
```

On the default failures, the raw terminal SSE chunk from NaN contained a provider-specific truncation marker and was serialized with single quotes rather than valid JSON, e.g. (IDs removed):

```
data: {'object': 'chat.completion.chunk',
       'choices': [],
       'usage': {...},
       'nan_truncation': {'reason': 'reasoning_only_stream'}}
```

That makes the causal chain look like:

```
review prompt induces long reasoning
-> provider ends in reasoning-only truncation
-> NaN emits non-JSON nan_truncation SSE frame
-> pi-ai stream JSON parsing fails
-> completeSimple throws
-> Gentle host relay never receives reviewer text
```

The same frozen review slot then completed normally after changing only the native reviewer route to `nan/glm5.3-flash` with `thinking=low`; review reached APPROVED and the provider-issued acknowledge-approved continuation burned authority successfully.

So this appears related to the reasoning/output-budget family discussed here, but in this reproduction the immediate failure is not empty reviewer JSON: it is a malformed provider SSE truncation frame reaching Pi's OpenAI-compatible stream parser.

No Gentle patch was required for the workaround; native per-role model/effort routing was sufficient.

---

## Pi #9718

Target:

https://github.com/earendil-works/pi/issues/9718

Suggested comment:

---

Additional reproduction from a current real review workload that may help narrow this issue.

Using Pi 0.86.1 against NaN's OpenAI-compatible endpoint, I replayed the exact same 40,118-byte reviewer prompt directly through `@earendil-works/pi-ai completeSimple()`.

A/B:

```
nan/glm5.3-flash      default -> FAIL (~131s), no final text
nan/deepseek-v4-flash default -> FAIL (~61s), no final text
nan/glm5.3-flash      medium  -> FAIL (~129s), terminated
nan/glm5.3-flash      low     -> PASS (~62s)
```

The default failures exposed the raw terminal SSE frame. NaN emits a provider-specific truncation event similar to:

```
data: {'object': 'chat.completion.chunk',
       'choices': [],
       'usage': {...},
       'nan_truncation': {'reason': 'reasoning_only_stream'}}
```

Note the Python-repr/single-quote serialization: it is not valid JSON. The Pi OpenAI-completions stream parser then throws:

```
Expected property name or '}' in JSON at position 1 (line 1 column 2)
```

So in this case the reasoning-only exhaustion does not surface as a normal `stopReason=length` / empty final response; it can fail earlier as a stream parse error because the provider truncation frame itself is malformed for an OpenAI-compatible JSON SSE client.

Lowering reasoning to `low` on the exact same prompt produced a normal `stop` with final text (868 reasoning tokens, 1,838 output tokens in the successful run).

This may be useful as a second failure signature for the same underlying budget/exhaustion class: provider reasoning-only truncation + malformed terminal SSE event.

---
