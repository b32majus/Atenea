# P4 Positive Rebuild Qualification — 2026-09-22

Status: **PASS / P4 CLOSED**

Purpose: qualify the smallest surviving Atenea layer by adding durable value above the already-qualified native Gentle control, without rebuilding any execution controller.

## 1. Scope decision

P4 was deliberately bounded to the three Minimal Core capability blocks:

1. stable repository/engineering policy;
2. secret-free reproducible native Gentle profile specification;
3. deterministic conformance oracles.

P4 did **not** re-test each historical Atenea file or mechanism independently. Historical runtime controllers were already classified for removal/replacement by P1/P2, and repeating equivalent canaries would add cost without new evidence.

## 2. Golden Control

Disposable repository:

`/var/tmp/atenea-p4-20260922/control`

Task:

- add `resolveSheetName(requestedName, sheetNames)`;
- normalized trim + lowercase comparison only;
- preserve canonical source spelling/whitespace;
- fail explicitly on invalid input, no match and ambiguity;
- tests + README;
- native Gentle workflow through RDD and burn;
- no push/PR/merge.

Control result:

- native provider/primary path: PASS;
- native writer delegation: PASS;
- deterministic tests: 9/9 PASS;
- external hidden oracle: `P4_HIDDEN_ORACLE_OK`;
- native RDD: medium / `review-reliability`;
- review: APPROVED;
- acknowledgement: PASS;
- authority: burned;
- work-unit commit: `19234fc`;
- product delta: 95 insertions / 1 deletion across 3 files.

No Atenea runtime controller participated.
## 3. Stable-policy treatment

Treatment repository:

`/var/tmp/atenea-p4-20260922/coding-standards`

Only capability added before execution:

`CODING_STANDARDS.md`

Gentle loaded the file automatically as a system addendum. Therefore this was a real behavioral policy treatment, not a passive file-presence test.

Treatment result:

- native provider/primary path: PASS;
- native delegation/workflow: PASS;
- deterministic tests: 8/8 PASS;
- external hidden oracle: `P4_HIDDEN_ORACLE_OK`;
- native RDD: medium / `review-reliability`;
- review lineage: `review-d00c18eaeca81e35`;
- review: APPROVED;
- acknowledgement: PASS;
- authority: burned;
- one informational/non-blocking reviewer suggestion;
- work-unit commit: `6bc14df`;
- product delta: 122 insertions / 1 deletion across 3 files.

The treatment implementation was somewhat more verbose than the control. One canary does **not** prove that the standards improve every small task. It does prove that the standards are consumed by the native runtime and do not replace or interfere with ODD, delegation, verification or RDD authority.

Decision:

**KEEP `CODING_STANDARDS.md` as stable horizontal policy.**

P5 may compact wording if the context cost can be reduced without weakening the semantic guardrails.
## 4. Reproducible native profile

Versioned desired state:

`config/native-gentle/native-nan.profile.json`

New deterministic oracle:

`tools/check-native-gentle-profile.mjs`

The oracle verifies:

- active profile name is `native-nan`;
- every versioned reviewer role matches its expected model;
- every versioned reviewer role matches its expected thinking level;
- runtime model routing matches the profile;
- required provider is registered;
- every registered provider has a valid `api` field and at least one model.

Current result:

`ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS`

The profile itself already has full native E2E evidence from P6, including real reviewer execution and authority burn.

Decision:

**KEEP the profile as secret-free desired-state specification.**

Gentle remains the runtime routing owner.

## 5. Deterministic authority oracle

New oracle:

`tools/check-vnext-authority.mjs`

It verifies current vNext candidate facts including:

- thin-layer identity;
- zero Atenea execution/review authority;
- ordinary `pi` production entry;
- qualified Pi/Gentle versions;
- typed ASSESS fail-closed compatibility policy;
- terminal burn rule;
- upstream #4791 / #4771 tracking;
- P6 cutover evidence;
- repo-local `.atl/` ignore.

Current result:

`ATENEA_VNEXT_AUTHORITY_CHECK=PASS`

Decision:

**KEEP deterministic conformance tooling.**

These scripts return evidence only. They do not decide review, publication or merge authority.
## 6. P4 defects found and corrected

### 6.1 Invalid residual Command Code provider

The Golden Control initially failed before task execution because active `~/.pi/agent/models.json` still contained a historical `commandcode` provider without an `api` field.

Pi validates the provider registry globally, so an invalid unused provider can break startup even when `nan` is explicitly selected.

Correction:

- preserved a backup of the pre-correction models file;
- removed only the invalid historical `commandcode` provider;
- retained `nan`;
- NaN auth remained ready;
- `gentle-ai doctor` remained 8/8 healthy;
- the P4 control then executed normally.

The new profile oracle now fails if any registered provider lacks `api`, preventing recurrence.

### 6.2 Global `.atl/` ignore was insufficient

A user Git excludes entry for `.atl/` did **not** prevent Gentle from creating a repository-local `.gitignore` containing `.atl/` in a fresh repository.

This can create an unrelated untracked file inside a candidate.

Correction:

- P4 fixtures were rebuilt with `.atl/` already present in repo-local `.gitignore`;
- Atenea already has the repo-local ignore;
- vNext handoff/compatibility/P6 evidence was corrected;
- the authority oracle now requires repo-local `.atl/`.

Qualified rule:

`target repo .gitignore contains .atl/ before candidate work`

## 7. P4 decision

P4 passes.

Surviving Minimal Core capability blocks:

- stable policy: **KEEP**;
- native profile desired state: **KEEP**;
- deterministic conformance/oracles: **KEEP**.

Runtime additions introduced by Atenea:

`0`

Review controllers introduced by Atenea:

`0`

Worker supervisors introduced by Atenea:

`0`

Routing engines introduced by Atenea:

`0`

Next phase:

**P5 — Operational simplification.**

P5 should reduce duplicated prose and move machine-decidable checks to deterministic mechanisms. It must not reopen native lifecycle ownership already settled by P0–P4/P6.
