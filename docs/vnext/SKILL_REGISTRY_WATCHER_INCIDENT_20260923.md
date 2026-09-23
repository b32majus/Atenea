# Atenea vNext — Gentle skill-registry watcher incident

Status: **CURRENT COMPATIBILITY EVIDENCE / MITIGATED**

Date: 2026-09-23

## Incident

An interactive Pi session exited via `uncaughtException` while Gentle Shell was watching user skill roots:

```text
Error: ENOENT: no such file or directory, scandir '<home>/.codex/skills/.system/imagegen'
    at readdirSync (...)
    at #watchFolder (node:internal/fs/recursive_watch:...)
    at FSWatcher.<anonymous> (...)
```

Pi crash history contains the same failure on both Pi 0.87.0 and 0.87.1, including transient loss of `imagegen` and `skill-creator/assets`. Therefore this is not a Pi 0.87.1 regression.

## Root cause

Gentle Shell 3.7.0 `extensions/skill-registry.ts` includes `~/.codex/skills` among user skill roots and starts:

```ts
watch(dir, { recursive: true }, refresh)
```

The constructor is protected by `try/catch`, but the returned `FSWatcher` has no asynchronous `error` listener. When another process removes/recreates a watched subtree, Node can emit an `ENOENT` watcher error after startup; without an error listener it becomes an uncaught exception and terminates Pi.

At the incident time the Codex system-skill tree was repopulated as a unit: `imagegen`, `openai-docs`, `plugin-creator`, `review-agent`, `skill-creator` and `skill-installer` all received new timestamps together. A Codex app-server was active. This is the observed trigger, not an Atenea runtime mutation.

Upstream tracker: Gentleman-Programming/gentle-shell#962. It remains open on 2026-09-23 and describes the same recursive-watcher failure class.

## Qualified mitigation

Use Gentle's supported compatibility switch:

```bash
export GENTLE_PI_NO_SKILL_REGISTRY=1
```

Equivalent per-launch CLI flag:

```bash
pi --no-skill-registry
```

Gentle's own 3.7 documentation states that this keeps skills available normally and skips only startup refresh/watch of `.atl/skill-registry.md`. It does **not** mean `--no-skills`.

The productive VPS exports the environment variable from `~/.bashrc` so normal `pi` remains the entry point. Existing Pi processes that predate the export must be restarted to inherit it.

## Qualification after mitigation

```text
GENTLE_PI_NO_SKILL_REGISTRY=1
Pi 0.87.1
Gentle Shell 3.7.0
--no-skill-registry recognized
gentle-ai doctor: 8 passed / 0 failed / 0 warnings
```

No Gentle package source, Codex installation, skill contents, RDD lifecycle, reviewer routing or Engram state was patched.

## Retirement condition

Remove the environment override only after all of the following are true:

1. a released Gentle Shell version fixes #962 (or otherwise handles recursive watcher errors safely);
2. that release is installed through the owner-supported updater path;
3. a bounded canary replaces a watched skill subtree while Pi remains alive;
4. normal skill discovery and registry refresh are requalified.
