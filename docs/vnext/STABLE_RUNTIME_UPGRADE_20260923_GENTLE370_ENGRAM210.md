# Atenea vNext — Gentle 3.7 / Engram 2.1 maintenance

Status: **CURRENT MAINTENANCE QUALIFICATION / PASS**

Date: 2026-09-23

Purpose: qualify the new stable Gentle AI, Gentle Shell and Engram releases without changing Atenea's zero-controller architecture.

## 1. Accepted productive baseline

```text
Pi                0.87.0
gentle-pi         3.7.0
Gentle AI         3.7.0
Engram            2.1.0
GGA               2.10.1
provider           NaN
profile            native-nan
normal entry       pi
review mode        on
```

No Atenea execution, review, worker or routing controller was introduced.## 2. Official update surfaces used

Gentle Shell was updated through Pi's package manager:

```bash
pi install npm:gentle-pi@3.7.0
```

Gentle AI was updated using the official installer reported by the installed `gentle-ai update` command, then reconciled with:

```bash
gentle-ai sync --agents pi
```

Engram was updated through Gentle AI's managed upgrader, not by replacing the binary manually. Gentle created its own upgrade backup before replacing Engram.

Relevant local rollback evidence includes:

```text
~/.atenea-backups/20260923T223753-gentle370-engram210/engram/engram.db
~/.gentle-ai/backups/upgrade-20260923T203913Z/
```

The pre-upgrade SQLite backup passed `PRAGMA quick_check`.## 3. Gentle AI 3.7 impact

Official 3.7 release changes relevant to Atenea:

- configurable native agent/reviewer models across supported runtimes;
- exact review-authority replay fix under lock contention;
- provider contract remains `1.2.0`.

Atenea impact:

- this further validates the decision to keep model/reviewer routing upstream rather than rebuild an Atenea routing engine;
- future heterogeneous reviewer assignment can be expressed natively;
- the current `native-nan` six-reviewer mapping is intentionally left unchanged because the known reasoning/output issues remain open and the exact high-effort reviewer fixture was not available for requalification;
- the exact-authority replay fix does not by itself prove that the separate post-burn selectorless STATUS defect is fixed, so Atenea keeps its terminal-burn rule.## 4. Gentle Shell 3.7 impact

Gentle Shell 3.7 adds bounded subagent work in an independently selected Git repository through `repository_root`.

The release requires explicit consent for the independent target, revalidates repository identity before spawn/continue, and keeps the existing same-clone `workspace_root` path separate.

Atenea impact:

- future legitimate multi-repository tasks can use native Gentle cross-repository delegation rather than an Atenea supervisor/relay;
- `repository_root` does not expand product authority: the accepted task still defines whether another repository is in scope;
- explicit target consent remains required;
- no current Atenea/PROMueve workflow needs to opt into cross-repository delegation merely because the capability exists.

The release declares no breaking changes to ODD, SDD, review or package interfaces.## 5. ASSESS compatibility requalification

A disposable committed-range canary was rerun on Pi 0.87.0 + Gentle Shell 3.7.0 + Gentle AI 3.7.0.

Native Gentle AI returned the expected assessment:

```text
risk=medium
reason=executable_change
changed_paths=2
changed_lines=4
review_due=false / under_budget
```

The same candidate through the Pi/Gentle Shell `gentle_review assess` facade still returned:

```text
risk=unassessable
reason=schema-incompatible
changedPaths=0
candidate=null
→ typed fail-closed plan with independent verifier
```

Decision: Gentle AI #4791 remains operationally relevant on 3.7.0. Atenea keeps the native fail-closed fallback and does not restore an ASSESS bridge.## 6. Engram 2.1 qualification and cleanup

Engram 2.1.0 is a core-only release; the Pi `gentle-engram` package remains at 0.1.14.

Post-upgrade qualification:

```text
engram doctor → 9 ok / 0 warnings / 0 blocked / 0 errors
engram test --quick → PASS
PI memory canary → ENGRAM_AFTER_CLEANUP_OK
```

The self-test covered database save/search/context, concurrent local writes and store-search performance.

The production memory store was also cleaned of proven disposable artifacts.

Hard/pruned projects removed:

```text
baseline
atenea-assess-370-20260923
dist
gentle-final-canary-20260921
tmp
```

`baseline` was proven to contain only the P4 `resolveSheetName` qualification canary.After cleanup the production store contains only:

```text
hermes-agent  — real observations
symphonia     — real observation/session history
atenea        — closed Atenea repo session history, no observations
```

No similar project-name groups are reported by `engram projects consolidate --all --dry-run`.

## 7. Engram canary isolation rule

A first isolation attempt proved that `ENGRAM_DATA_DIR` alone is insufficient for Pi/Gentle canaries when a production `engram serve` already owns the default HTTP port.

`gentle-engram` uses the HTTP provider path for native `mem_*` tools and will reuse the healthy production server unless `ENGRAM_URL` points elsewhere.

The qualified isolation pattern is therefore:

```text
temporary ENGRAM_DATA_DIR
→ separate `engram serve` on a non-production port
→ Pi launched with ENGRAM_URL pointing at that server
→ normal repo/project identity inside the isolated store
```

This pattern passed `ENGRAM_ISOLATION_OK`: the temporary store received its own observation/session data while the production store remained unchanged.## 8. Final runtime gate

After update and cleanup:

```text
gentle-ai update → all managed tools current
gentle-ai doctor → 8 passed / 0 failed / 0 warnings
review mode → on
active profile → native-nan
PI_PURE_370_OK
PI_GENTLE_370_OK
ENGRAM_210_OK
Engram doctor → 9/9 OK
Engram self-test → PASS
```

Known reviewer/output trackers remain open, so the qualified `review-* → nan/glm5.3-flash · thinking=low` mitigation remains unchanged.

The release's native reviewer-selection capability is recorded as a future simplification/enrichment opportunity, not used as justification to change a working reviewer profile without a representative requalification.

## 9. Decision

The 3.7.0 / 2.1.0 maintenance baseline is accepted.

This upgrade strengthens the vNext direction: more lifecycle/routing/delegation capability now lives upstream, while Atenea remains policy, secret-free desired state, deterministic conformance and qualification evidence.