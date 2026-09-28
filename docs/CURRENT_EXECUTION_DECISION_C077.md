# C-077 — Prepared tickets enter at implementation through plain Pi; Codex carries native Gentle review

Status: **CURRENT EXECUTION DECISION**
Accepted: 2026-09-28

C-077 supersedes C-076 and C-075 **for the ordinary prepared-ticket execution topology and routing**. C-073 remains the lean-entry principle. C-076/C-075 remain valid historical qualification evidence for the OpenCode + upstream-orchestrator topology they tested and for the provider/reviewer behavior observed there.

## Decision

When durable project authority already contains executable scope, acceptance, material constraints and the principal verification/oracle boundary, Atenea does not re-enter ODD through `gentle-orchestrator`.

Current prepared-ticket topology:

```text
authorized train frontier
→ Pi supervisor + Herdr
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository AGENTS / standards / applicable project skills
→ implementation
→ deterministic checks/oracles
→ authorized local candidate commit
→ `gentle-ai review assess --agent codex ...`
→ exact native Gentle review continuation when due
→ four RDD lenses / refutation when applicable / bounded correction / targeted validator
→ acknowledge-approved / burn when approved
→ durable checkpoint
→ next authorized ticket or STOP
```

OpenCode Build remains the qualified fallback implementation worker after a concrete Pi runtime/tooling failure. Fallback uses the same prepared-ticket contract and does not restore `gentle-orchestrator` as ticket parent.

## Prepared-ticket routing profiles

C-077 keeps two small profiles. They select the **implementation worker model**, not a second orchestration graph.

### `production-volume` — default

```text
Pi worker → nan/deepseek-v4-flash
```

Use for bounded work whose difficulty is mainly implementation volume or ordinary engineering rather than novel/high-risk reasoning.

### `complex` — triggered

```text
Pi worker → nan/glm5.3-flash · high
```

Use when current durable authority already shows one of these material conditions:

- novel or cross-cutting architecture spanning materially coupled modules;
- complex concurrency, temporal, scheduling, state-machine, solver or optimization semantics;
- material security, privacy, authorization, tenancy, clinical-meaning or trust-boundary risk;
- delicate migration/backwards compatibility or distributed invariants;
- repeated semantic or bounded-correction failure under `production-volume`.

Do **not** escalate merely because a ticket is long, touches many files, has many tests, includes ordinary UI work, or is business-important. The trigger is reasoning/semantic risk, not mechanical volume.

If unexpected complexity appears after work starts, preserve the current evidence and change profile only at the next clean candidate/work-unit boundary. Do not silently change model in the middle of an active candidate/review lineage.

Canonical routing desired state:

- `config/native-gentle/prepared-routing-policy.json`;
- `config/native-gentle/prepared-production-volume.profile.json`;
- `config/native-gentle/prepared-complex.profile.json`.

## RDD reviewer graph is preserved

`--agent=codex` is the **review transport**, not one monolithic reviewer.

Gentle still owns and invokes the distinct review roles:

```text
review-risk
review-readability
review-reliability
review-resilience
review-refuter      # conditional
review-validator    # conditional
```

Judgment Day remains separate and explicit with `jd-judge-a`, `jd-judge-b` and `jd-fix-agent` when requested for a concrete target.

### Codex model boundary

The qualified Codex transport supports per-phase model assignments, but those assignments must be models exposed by the local Codex runtime. Current Gentle Codex support is an OpenAI-model catalog; therefore the former OpenCode routing that placed V4/GLM/MiMo directly on review roles **does not carry over literally** to C-077.

The current shared Codex RDD quality profile is:

| Native role | Model | effort |
|---|---|---|
| `review-risk` | `gpt-6-sol` | high |
| `review-readability` | `gpt-6-luna` | high |
| `review-reliability` | `gpt-6-luna` | high |
| `review-resilience` | `gpt-6-luna` | high |
| `review-refuter` | `gpt-6-sol` | xhigh, conditional |
| `review-validator` | `gpt-6-luna` | high, conditional |

Explicit Judgment Day routing:

| Role | Model | effort |
|---|---|---|
| `jd-judge-a` | `gpt-6-sol` | high |
| `jd-judge-b` | `gpt-6-luna` | xhigh |
| `jd-fix-agent` | `gpt-6-sol` | high |

Both `production-volume` and `complex` use this **same shared review profile**. This is deliberate: Gentle's Codex phase-model assignments are runtime state, so keeping one qualified RDD map avoids cross-project races when multiple trains run concurrently. Complexity changes the Pi implementation worker; native Gentle still decides which lenses/refuter/validator actually run.

Desired state: `config/native-gentle/prepared-codex-rdd-quality.profile.json`.

## Why C-076 is superseded for prepared work

Field execution showed that full ODD on already-shaped tickets duplicated expensive work already present in durable project authority: re-exploration, uncertainty resolution, classification and tracking. Real prepared-ticket runs consumed hours and asked human/procedural questions despite having executable authority.

A direct implementation path was then qualified without removing downstream quality controls.

## Qualification evidence

### Implementation discipline

A direct OpenCode Build canary and a separate plain-Pi canary both proved that the implementation worker can:

- read repository `AGENTS.md`, `CODING_STANDARDS.md` and an applicable project skill before writing;
- respect a frozen acceptance test/oracle boundary;
- change only authorized paths;
- run deterministic checks successfully;
- satisfy an independent hidden oracle;
- create the bounded local candidate commit;
- avoid ODD / `gentle-orchestrator`.

The plain-Pi canary used one Herdr child with argv `pi --no-extensions`, completed in about 57 seconds of worker runtime / 73 seconds supervisor wall time, and touched only the authorized source file.

### Native Gentle review/correction

A separate committed candidate containing an intentional fail-open authorization defect proved:

```text
ASSESS high-risk
→ risk/readability/reliability/resilience lifecycle
→ deterministic severe findings
→ bounded correction authority
→ one-line correction
→ targeted validator PASS
→ acknowledge-approved
→ authority burned
```

The refuter did not run because the accepted severe findings were deterministic; refutation remains provider-controlled for inferential findings rather than a mandatory stage.

### Pi review relay boundary

Plain Pi is not a Gentle Shell host relay. Native `--agent pi` correctly fails closed without the Gentle-Pi relay contract. Manually exporting `GENTLE_PI_REVIEW_RELAY_CONTRACT` is not an accepted workaround because it would self-attest a host capability plain Pi does not provide.

The same Git candidate produced by plain Pi was then assessed successfully with `--agent codex`; Gentle returned the same candidate/risk identity and an exact Codex-bound `next_transition`. Therefore implementation runtime and review transport are intentionally separate responsibilities.

## Skills decision

Pi natively supports trusted project skills in both `.pi/skills/` and `.agents/skills/`.

- Keep valid `.pi/skills` when they are intentionally Pi-specific/project-local resources.
- Prefer `.agents/skills/<skill>/SKILL.md` when the skill is intended as cross-runtime project authority.
- Do not migrate or duplicate skills solely to normalize directory layout.
- Project-local skills/settings are subject to Pi project trust; an unattended worker may use `--approve` as a one-run trust override only for an intentionally trusted repository.
- Discovered `SKILL.md` files must carry valid frontmatter with at least non-empty `name` and `description`.

Do not duplicate lifecycle/model-routing policy into project skills. Runtime-owned/global skill roots remain owned by their runtimes; no mass filesystem unification is authorized.

## Judgment Day

Judgment Day remains an explicit standalone adversarial review tool. Use it only when the user/ticket requests dual/adversarial review for a concrete target. It is not an automatic post-RDD phase and does not grant delivery authority.

## Performance boundary

Review can identify performance defects, but a material performance requirement must be expressed through a measurable repository-owned benchmark/oracle/check. Reviewer opinion is not a substitute for a deterministic performance acceptance criterion.

## Safety / STOP

The supervisor may relay procedural choices already granted by durable authority. It must escalate material changes to product meaning, acceptance, scope, principal oracles, publication authority or destructive actions.

Review approval remains separate from push/PR/merge/deploy authority.

## Current documents

C-077 is operationalized by:

- `docs/START_HERE.md`;
- `docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md`;
- `docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md`;
- `docs/PREPARED_TRAIN_HANDOFF_C077.md`;
- `docs/vnext/CURRENT_COMPATIBILITY.md`;
- `config/native-gentle/prepared-routing-policy.json`.

`docs/CURRENT_DECISIONS.md` remains decision provenance from earlier epochs; where its C-076/C-075 current-language conflicts with this file, **C-077 wins** until that provenance file is mechanically consolidated without discarding historical decisions.
