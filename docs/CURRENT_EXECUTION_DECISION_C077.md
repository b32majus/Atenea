# C-077 — Prepared tickets enter at implementation through plain Pi; OpenCode V1 carries native Gentle review

Status: **CURRENT EXECUTION DECISION**
Accepted: 2026-09-28

C-077 supersedes C-076 and C-075 **for the ordinary prepared-ticket execution topology and routing**. C-073 remains the lean-entry principle. Earlier qualification documents remain valid historical evidence for the runtimes/topologies they actually tested.

## Decision

When durable project authority already contains executable scope, acceptance, material constraints and the principal verification/oracle boundary, Atenea does not re-enter ODD through `gentle-orchestrator`.

Current prepared-ticket topology:

```text
authorized train frontier
→ Pi supervisor + Herdr
→ select production-volume | complex at a clean candidate/work-unit boundary
→ ONE plain Pi ticket worker (`pi --no-extensions`)
→ repository AGENTS / standards / applicable project skills
→ implementation
→ deterministic checks/oracles
→ authorized local candidate commit
→ `gentle-ai review assess --agent opencode ...`
→ qualified OpenCode V1 native Gentle review transport
→ four RDD lenses / refutation when applicable / bounded correction / targeted validator
→ acknowledge-approved / burn when approved
→ durable checkpoint
→ next authorized ticket or STOP
```

OpenCode Build V1 remains the qualified fallback implementation worker after a concrete Pi runtime/tooling failure. Fallback uses the same prepared-ticket contract and does not restore `gentle-orchestrator` as ticket parent.

## Prepared profiles

### `production-volume` — default

Implementation:

```text
Pi worker → nan/deepseek-v4-flash
```

Reviewer routing through OpenCode V1:

```text
review-risk        → GLM 5.3 Flash high
review-readability → Luna high
review-reliability → Luna high
review-resilience  → DeepSeek V4 Flash
review-refuter     → MiMo 2.6 Flash, conditional
review-validator   → Luna high, conditional
JD judge A         → MiMo 2.6 Flash
JD judge B         → Luna xhigh
JD fix             → GLM 5.3 Flash high
```

### `complex` — triggered

Implementation:

```text
Pi worker → nan/glm5.3-flash · high
```

Reviewer routing through OpenCode V1:

```text
review-risk        → Luna xhigh
review-readability → Luna high
review-reliability → Luna xhigh
review-resilience  → DeepSeek V4 Flash
review-refuter     → Sol xhigh, conditional
review-validator   → Luna high, conditional
JD judge A         → MiMo 2.6 Flash
JD judge B         → Luna xhigh
JD fix             → GLM 5.3 Flash high
```

Use `complex` only when current durable authority already shows material reasoning/semantic risk: novel or cross-cutting architecture; difficult concurrency/temporal/scheduling/state/solver semantics; material security/privacy/auth/tenancy/clinical/trust-boundary risk; delicate migration/backwards compatibility/distributed invariants; or repeated semantic/bounded-correction failure under production-volume.

Do **not** escalate merely because a ticket is long, touches many files, has many tests, includes ordinary UI work, or is business-important. If complexity appears after work starts, preserve current evidence and change profile only at the next clean candidate/work-unit boundary.

Canonical routing desired state:

- `config/native-gentle/prepared-routing-policy.json`;
- `config/native-gentle/prepared-production-volume.profile.json`;
- `config/native-gentle/prepared-complex.profile.json`.

## RDD reviewer graph is preserved

`--agent=opencode` identifies the qualified **OpenCode V1 review transport**. It does not collapse review into one reviewer and does not imply OpenCode authored the candidate.

Gentle still owns the distinct native roles:

```text
review-risk
review-readability
review-reliability
review-resilience
review-refuter      # conditional
review-validator    # conditional
```

Judgment Day remains separate and explicit with `jd-judge-a`, `jd-judge-b` and `jd-fix-agent` when requested for a concrete target.

## Why C-076 is superseded for prepared work

Field execution showed that full ODD on already-shaped tickets duplicated work already present in durable project authority: re-exploration, uncertainty resolution, classification and tracking. Direct implementation was then qualified without removing downstream quality controls.

## Qualification evidence

### Plain Pi implementation

A plain-Pi canary proved that one Herdr-launched child with `pi --no-extensions` can read repository authority/skills, respect a frozen oracle boundary, change only authorized paths, pass deterministic and hidden checks, create the candidate commit and avoid ODD/`gentle-orchestrator`. The worker completed in about 57 seconds / about 73 seconds supervisor wall time.

### Native Gentle review/correction

A separate intentionally defective candidate proved:

```text
ASSESS high-risk
→ risk/readability/reliability/resilience lifecycle
→ deterministic severe findings
→ bounded correction authority
→ correction
→ targeted validator PASS
→ acknowledge-approved
→ authority burned
```

The refuter did not run because the accepted severe findings were deterministic; refutation remains conditional for findings that require it.

### Pi review relay boundary

Plain Pi is not a Gentle Shell host relay. Native `--agent pi` correctly fails closed without the Gentle-Pi relay contract. Manually exporting `GENTLE_PI_REVIEW_RELAY_CONTRACT` is not an accepted workaround.

Prepared-ticket implementation therefore stays in plain Pi, while native Gentle review uses the already-qualified OpenCode V1 transport.

## Skills decision

Pi natively supports trusted project skills in both `.pi/skills/` and `.agents/skills/`.

- Keep valid `.pi/skills` when intentionally Pi-specific/project-local.
- Prefer `.agents/skills/<skill>/SKILL.md` for cross-runtime project authority.
- Do not migrate or duplicate skills solely to normalize layout.
- An unattended worker may use `--approve` as a one-run trust override only for an intentionally trusted repository.
- Discovered `SKILL.md` files must carry valid frontmatter with non-empty `name` and `description`.

Do not duplicate lifecycle/model-routing policy into project skills.

## Judgment Day

Judgment Day remains an explicit standalone adversarial review tool. Use it only when the user/ticket requests it for a concrete target. It is not an automatic post-RDD phase and does not grant delivery authority.

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
