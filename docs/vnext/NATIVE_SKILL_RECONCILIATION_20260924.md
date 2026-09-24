# Native Gentle skill reconciliation — 2026-09-24

Status: **CURRENT MAINTENANCE EVIDENCE / PASS WITH TWO EXPLICIT UPSTREAM EXCEPTIONS**

## Scope

This pass reconciles skill ownership after Pi 0.87.1 / Gentle Shell 3.7.0 / Gentle AI 3.7.0 and the PROMueve cleanup. It does not introduce an Atenea skill registry, loader, router or runtime controller.

## Resulting ownership

```text
Pi
├── repository-local skills
├── gentle-pi package skills (`gentle-ai-*` names)
├── selected shared third-party/general skills from ~/.agents/skills
└── two deliberate shared+bundle exceptions: issue-creation, work-unit-commits

OpenCode
└── ~/.config/opencode/skills managed through Gentle AI where applicable

Codex
└── ~/.codex/skills managed through Gentle AI/Codex where applicable

Cross-runtime/shared
└── ~/.agents/skills
```

The runtime-specific OpenCode and Codex stores are **not legacy stores to delete**. Current Gentle AI still manages and references them. Their existence is compatible with Atenea because ownership is runtime-specific rather than duplicated inside Atenea.

## Official synchronization and residue cleanup

`gentle-ai sync` was used as the ownership oracle for OpenCode and Codex. Candidate old copies were moved to backup first, then sync was rerun. Assets restored by sync were retained as current managed assets; copies not restored were classified as residue and left only in the backup.

`graphify` was not retired: the installed tool was live and its skill was migrated through Graphify's supported installer to the shared `~/.agents/skills` surface.

Backups retained on the qualified VPS include:

```text
~/.atenea-backups/global-skill-reconcile-20260924T102043/
~/.atenea-backups/promueve-reconcile-20260924/
~/.atenea-backups/20260924T101356Z-skill-reconcile-final/
```

## Pi duplicate policy

Pi 0.87.1 supports exact force-exclusion with `-<path>`. The installed parser applies `-` after ordinary/exclude/force-include matching and removes the exact resource even if it would otherwise be included.

The shared copies of these skills are exact-excluded for Pi because the current `gentle-pi` package exposes accepted `gentle-ai-*` variants:

```text
branch-pr
chained-pr
cognitive-doc-design
comment-writer
judgment-day
rdd-defect-workflow
skill-creator
skill-improver
skill-registry
```

Two skills remain intentionally dual-visible:

```text
issue-creation
work-unit-commits
```

This is not forgotten cleanup. Current Gentle AI and Gentle Shell upstream content diverges functionally for those skills. In particular, hiding the shared copy before upstream reconciliation could remove behavior that is absent from the Pi package variant.

Desired state: `config/native-gentle/pi-skill-policy.json`.

## Deterministic resolution evidence

A fresh Pi `DefaultResourceLoader` was run in an empty directory against the real Pi 0.87.1 settings, without a model call. Result:

- no plain shared copies of the nine force-excluded skills were resolved;
- all nine corresponding `gentle-ai-*` package skills were resolved;
- both plain and `gentle-ai-*` forms of `issue-creation` and `work-unit-commits` were resolved;
- shared third-party/general skills such as Graphify remained available.

The same deterministic loader against the canonical PROMueve repository additionally resolved:

```text
promueve-farmacia-context
promueve-vanilla-ui
promueve-visual-qa
```

Therefore project-local skills remain available while the safe global Gentle duplicates are suppressed.

Evidence summary:

```text
PI_EXACT_FORCE_EXCLUDE_SEMANTICS=PASS
PI_SHARED_DUPLICATE_FILTER=PASS
PI_DUAL_VISIBILITY_EXCEPTIONS=PASS
PROMUEVE_PROJECT_SKILLS=PASS
GENTLE_AI_DOCTOR=8/8_PASS
```

## Remaining upstream seams

- Gentle Shell #807: shared plain skills and package-prefixed skills can coexist in Pi discovery.
- Gentle Shell #369 / PR #1320: registry/resolution ownership is still evolving upstream.
- Gentle Shell #962: recursive skill-registry watcher crash remains mitigated with the supported `GENTLE_PI_NO_SKILL_REGISTRY=1` switch.

The local policy should be revisited only after an upstream **released** version changes these seams. Do not pre-emptively merge the two divergent skills or build an Atenea semantic resolver.
