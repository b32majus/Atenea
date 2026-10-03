# Atenea vNext — Current Compatibility Notes

Status: **CURRENT C-083 RUNTIME / PROVIDER NOTES**
Date: 2026-10-03

## Current baseline

```text
OpenCode runtime    1.18.34 observed on the qualified VPS
execution model     OpenCode V2 project agents/subagents
Herdr               retained operator/session surface
current decision    C-083
project config      opencode.json + .opencode/agents/
Matt skills         project-local, upstream-managed
```

Exact binary patch versions are compatibility evidence, not permanent architecture pins. Revalidate only when a real upgrade changes a seam we depend on.

## Provider/model IDs used by C-083

```text
nan/deepseek-v4-flash
nan/glm5.3-flash
nan/mimo-v2.6-flash
nan/qwen3.8-flash
openai/gpt-6-luna
openai/gpt-6.1-sol
```

The NaN `deepseek-v4-flash` provider ID is intentionally stable even when its backend is the newer V4.1 Flash implementation.

## Configuration boundary

C-083 routing is project-local and versioned. Do not rewrite `~/.config/opencode/opencode.json` as per-ticket/train routing state. Global provider credentials/registries may remain global; project role semantics must be inspectable from the repo.

The qualified OpenCode project agents resolve with `subagent_depth=2`, allowing the V4 implementation worker to invoke Matt's independent review/correction subagents without introducing an Atenea lifecycle controller.

## Historical runtime state

Gentle/Pi assets may still exist on the VPS for provenance or unrelated compatibility. Their presence does not make them part of the C-083 path. Historical C-077–C-082 runbooks and config are not active execution authority.

Herdr remains supported for persistence, observation and process management. No hidden Herdr plugin may become product/correctness authority.
