# Gentle Pi 2.7 / Gentle AI 2.9.1 — hybrid-native zero-touch qualification

Date: 2026-09-15
Status: **CURRENT ADOPTION EVIDENCE**

This document preserves the complete replacement/deletion investigation that led from the pre-2.7 unattended topology to the current smaller path. It records failures and discarded alternatives as well as the final PASS so future operators do not repeat the archaeology.

## 1. Final conclusion

The qualified normal unattended path is now:

```text
explicit human execution authorization + one bounded train prompt
→ one persistent Pi + Gentle Pi 2.7 parent, visible in Herdr
→ fresh package-owned gentle-ai-worker child per ticket (sequential by default)
→ parent reconciles exact diff + deterministic checks
→ parent Bash tool launches package-local Gentle AI 2.9.1 native review START
   with fd0/fd1/fd2 non-TTY and with NO consent override flag
→ Gentle AI creates the exact-candidate lineage without a review-consent dialog
→ Gentle Pi facade adopts that exact lineage through STATUS
→ provider-owned reviewer capture / forecast acknowledgement / bounded correction if required
→ APPROVED → exact acknowledge-approved → authority burn
→ local/remote checkpoint allowed by repository policy
→ fresh frontier read → next fresh child or STOP
→ human merge boundary
```

The Pi parent itself remains interactive and visible in Herdr. Only the `gentle-ai review start` subprocess launched through the parent's ordinary Bash tool is non-TTY. Operator observability is therefore preserved while review consent remains zero-touch.

Qualified runtime:

```text
Pi                 0.85.1
Herdr              0.9.0
Gentle Pi          2.7.0
Gentle AI          2.9.1 package-paired
Provider contract  1.2.0
```

## 2. Experiment ladder

### Q1 — persistent parent + fresh native children; standing permission reuse

Sandbox: `/srv/kairos-lab/qualification/atenea-gp27-parent-native-20260914`

The first GP2.7 experiment kept one Gentle-enabled parent alive and launched fresh package-owned children sequentially. The first exact-candidate review reached the host-owned `Review consent` TUI. A human selected `Review and allow this session` once. After that grant:

- Ticket 1 completed native RDD, approval, acknowledgement/burn and local commit `ef3aa77`;
- Ticket 2 used a distinct fresh child, completed native RDD with no second human prompt and committed `d884bb4`;
- persistent-parent multi-ticket control, fresh-child-per-ticket, reviewer collection and session permission reuse all passed.

Adjudication:

```text
STRICT_NATIVE_ZERO_TOUCH             FAIL
FAILURE_BOUNDARY                     initial host review consent
ONE_TOUCH_PER_PARENT_SESSION/TRAIN   PASS
PERSISTENT_PARENT_MULTI_TICKET       PASS
FRESH_NATIVE_CHILD_PER_TICKET        PASS
ACK_BURN                             PASS
```

Important observability finding: the host TUI click is not represented as a user message in the Pi model transcript. A parent self-report such as `HUMAN_TOUCH=0` is therefore not authoritative. External operator observation owns human-touch counts.

### Q2 — initial prompt authority does not create standing review permission

Sandbox: `/srv/kairos-lab/qualification/atenea-gp27-native-session-authority-20260914`

A fresh Pi session received an explicit initial human prompt authorizing both execution and native Gentle review for the repository/session. The parent was allowed to use any supported public GP2.7 mechanism to materialize that authority, but was forbidden to call internal `grantReviewSessionPermission`, fake package-child FD3 identity, inject keys, use Herdr RPA, pi-intercom or the Atenea relay.

Result: the ordinary Gentle Pi START path still displayed:

```text
Review consent
1. Review this change
2. Skip this time
3. Review and allow this session
```

No supported public pre-grant surface was found. This proves that initial prompt prose is not equivalent to host standing permission.

```text
NATIVE_ZERO_TOUCH                    FAIL
INITIAL_PROMPT_PREGRANT              NOT_SUPPORTED
FAILURE_BOUNDARY                     initial session consent
```

### Q3 — Herdr TUI automation is technically viable but not adopted

The same host UI was driven mechanically through Herdr using supported pane/agent primitives: read the visible dialog, send `down`, `down`, verify option 3 is selected, then send `enter` separately. The first stale consent binding had already expired and correctly failed closed; a fresh envelope was then accepted and the review completed.

```text
HERDR_TUI_AUTO_GRANT                 PASS_TECHNICALLY
FAIL_CLOSED_ON_EXPIRED_BINDING       PASS
ADOPTED_NORMAL_PATH                  NO
```

This remains a fallback diagnostic capability only. It is inferior to the final native path because it simulates the human host selection and adds external UI automation.

### Q4 — native Gentle AI START without a terminal auto-reviews instead of asking

Sandbox: `/srv/kairos-lab/qualification/atenea-no-tty-rdd-20260915`

A direct native `gentle-ai review start --cwd .` was executed with stdin/stdout/stderr all non-TTY. Gentle AI created a real medium-risk lineage and emitted its provider-owned no-terminal notice instead of asking for consent. The semantics were first observed on the then-operational Gentle AI 2.8 runtime and were later re-proven on package-paired 2.9.1.

This is an upstream native behavior, not an Atenea consent rewrite. No `--consent=granted`, `--consent=relay`, TUI input or internal API was used.

### Q5 — Gentle Pi can adopt a CLI-created lineage and finish the lifecycle

On the Q4 candidate, a visible Pi/Gentle Pi session was forbidden to call START. `gentle_review STATUS` adopted the exact existing CLI-created lineage `review-598ef845670433a6`, returned the provider collection binding, completed the reviewer run, reached APPROVED and executed the exact provider-issued acknowledge/burn transition.

Managed reviewer assets were initially stale; the provider-prescribed `gentle-ai sync --agent pi` repaired that prerequisite without changing the lineage or binding. The store finished clean with the transaction lock released.

```text
GENTLE_PI_SAME_LINEAGE_ADOPTION      PASS
PROVIDER_BINDINGS_REUSED_EXACTLY     PASS
APPROVED                             PASS
ACK_BURN                             PASS
```

### Q6 — one visible GP2.7 parent, one ticket, full hybrid path

Sandbox: `/srv/kairos-lab/qualification/atenea-pi-native-start-adopt-20260915`

This was the first full end-to-end proof using GP2.7 with package-paired GAI2.9.1 in one visible Herdr parent:

```text
visible Pi parent
→ Bash tool (fd0/fd1/fd2 non-TTY)
→ native GAI START
→ review-69530d739ff2573d, medium
→ Gentle Pi STATUS adoption of the same lineage
→ review-reliability
→ APPROVED
→ acknowledge/burn
→ final tests 7/7
```

No review-consent UI appeared and there was no external supervisor, RPA, pi-intercom or Atenea consent relay.

### Q7 — final two-ticket hybrid-native train

Sandbox: `/srv/kairos-lab/qualification/atenea-gp27-hybrid-train2-20260915`

One persistent visible parent processed two sequential tickets with two distinct native children and two distinct medium-risk RDD lineages.

Ticket 1:

```text
child task     mu1usir7-1-uugf
model          opencode-go/glm-5.3-flash · high
lineage        review-13bd0da42bc3a722
risk/lens      medium / review-reliability
commit         3368d35  feat: add normalizeLabel
tests          7/7 before and after burn
RDD            APPROVED + acknowledgement/burn
```

Ticket 2:

```text
child task     mu1uv82b-2-pxyy
model          opencode-go/glm-5.3-flash · high
lineage        review-488b6979f2f277c7
risk/lens      medium / review-reliability
commit         dc68473  feat: add formatBadge reusing normalizeLabel
tests          10/10 before and after burn
RDD            APPROVED + acknowledgement/burn
```

Final branch/head in the sandbox: `canary/hybrid-native-train2` @ `dc68473440512492033c7a9ce67f3a84da12536e`.

The native CLI required an intended-untracked declaration in both tickets. The parent applied the CLI's own deterministic remediation verbatim (`--untracked-scope=exclude` plus the exact returned expected-untracked inventory hash). This was not a consent decision and did not change review authority.

Final counters:

```text
VISIBLE_PARENT                        1
FRESH_CHILDREN                        2 distinct, sequential
NATIVE_NO_TTY_START                   2/2
GENTLE_PI_SAME_LINEAGE_ADOPTION       2/2
MEDIUM_RDD                            2/2
APPROVED                              2/2
ACK_BURN                              2/2
REVIEW_CONSENT_DIALOGS                0
HUMAN_TOUCH_AFTER_INITIAL_PROMPT      0  (operator observation authoritative)
HERDR_RPA                             0
EXTERNAL_SUPERVISOR                   0
ATENEA_RDD_RELAY                      0
PUSH_PR_MERGE                         0
```

This is the adoption-quality replacement/deletion evidence.

## 3. Adopted protocol invariants

For the current GP2.7 path:

1. one persistent Pi/Gentle Pi parent remains visible in Herdr for the bounded train;
2. every newly selected ticket gets a fresh package-owned native implementation child; `max_concurrency=1` is the normal train default unless the work explicitly proves parallel safety;
3. the parent owns ticket interpretation, integration, deterministic verification, exact-candidate RDD, checkpoint reconciliation and frontier progression;
4. the child may implement only its bounded ticket and returns evidence to the parent;
5. native RDD START is executed by the parent through its ordinary Bash tool using the package-local Gentle AI binary, with no consent override flag;
6. the START subprocess must be non-TTY; a runtime change that alters this property requires requalification;
7. the lineage returned by native START is authoritative; Gentle Pi must adopt that same lineage by STATUS before capture;
8. do not call a second START for the same candidate after the native lineage exists;
9. every provider-issued binding/forecast/continuation remains opaque and is replayed exactly as returned;
10. approval is incomplete until exact acknowledgement/burn succeeds;
11. if a genuine consent dialog appears, unattended qualification fails closed — do not auto-answer it through prose, internal APIs or TUI automation;
12. external operator observation, not parent self-report, is authoritative for human-touch claims.

## 4. Explicitly discarded or historical paths

The following are not the normal path after this qualification:

- separate plain Pi outer supervisor per train;
- fresh outer Pi/Gentle-Pi parent per ticket;
- Atenea worker-side RDD consent relay + pi-intercom as the normal consent bridge;
- human standing-session permission as unattended authority;
- Herdr key-tapper/RPA for option 3;
- initial-prompt prose treated as a standing permission grant;
- direct import/call of Gentle Pi internal `grantReviewSessionPermission`;
- fake `GENTLE_PI_AGENTS_CHILD` / FD3 identity;
- rewriting provider consent to `granted` or stripping `relay`;
- headless/print-mode Pi parent as a requirement.

Historical evidence for these paths remains valid for what it actually proved. The old supervisor/relay topology is a rollback/reference path, not current normal execution.

## 5. Operator observability

The current path deliberately preserves the visible TUI:

```text
Herdr workspace
└── persistent Pi/Gentle Pi parent (visible and inspectable)
    ├── native child status / todos / tool calls
    ├── tests and candidate reconciliation
    ├── Bash invocation of native START  ← subprocess only is non-TTY
    ├── returned lineage
    ├── Gentle Pi STATUS/capture/reviewer activity
    └── APPROVED / burn / checkpoint / next ticket
```

Herdr remains process/session substrate, not review authority. Observation never becomes consent.

## 6. Runtime promotion after qualification

After the final train PASS, the VPS operational user-level runtime was promoted with supported upstream surfaces:

```text
pi install npm:gentle-pi@2.7.0
# upstream stable binary installer resolved Gentle AI v2.9.1
gentle-ai sync --agent pi
```

Post-cutover verification on 2026-09-15:

```text
Pi                       0.85.1
Herdr                    0.9.0
operational Gentle Pi    2.7.0
package-local Gentle AI  2.9.1
package-local binary SHA 8bd0161c51ed07e77801a92d13bdcb82ff483c273d4a182904534057d4054d97
global Gentle AI         2.9.1
gentle-ai doctor         8 passed / 0 failed / 0 warnings
```

Canonical routing hashes for `~/.pi/gentle-ai/models.json` and `~/.pi/agent/subagents.json` were unchanged by the promotion. The GP package version changed from 2.6.0 to 2.7.0; global Gentle AI moved from a `main@...` build to stable 2.9.1.

Machine rollback evidence is kept outside the repository under `/srv/kairos-lab/qualification/_backups/atenea-gp27-runtime-20260915T012816` until the cutover is considered stable.

## 7. Evidence retention and sandbox cleanup

The absolute sandbox paths above are provenance, not permanent runtime dependencies. Once this evidence document and the reconciled current authority are published, the corresponding disposable qualification directories may be removed under `docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md` after confirming no active process, unique unpublished commit or still-required binary fixture depends on them.

Do not retain gigabytes of historical runtime copies merely because they once proved a property. Preserve the fact, versions, hashes, commands and outcome in durable repository evidence; retain a heavy sandbox only when reproducibility genuinely requires the bytes.
