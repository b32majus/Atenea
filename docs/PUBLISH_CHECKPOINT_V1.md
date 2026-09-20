# Atenea publish-checkpoint v1

Status: CURRENT CANDIDATE
Issue: #93
Date: 2026-09-21

## 1. Purpose

publish-checkpoint is the thin deterministic publication seam between an accepted exact candidate and the human merge boundary.

It automates mechanical checkpoint/publication work that does not need model judgment:

~~~text
fresh authority adjudication already completed
+ required Gentle closure already satisfied
+ repository-owned deterministic checkpoint preflight
→ exact local/base/head checks
→ repo preflight manifest verification
→ publication credential capability check when declared by the repo
→ normal non-force push
→ exact remote-head verification
→ create/update and verify PR
→ reconcile PR changed paths
→ bounded CI wait/read
→ STOP at human merge
~~~

It is not a daemon, scheduler, state machine, review controller, test framework or merge bot.

Implementation:

~~~text
tools/publish-checkpoint.mjs
~~~

Schemas:

~~~text
schemas/publish-checkpoint-request-v1.schema.json
schemas/checkpoint-preflight-v1.schema.json
~~~

## 2. Ownership

### Repository owns

The target repository owns all product- and artifact-specific deterministic validation:

- tests;
- build;
- typecheck;
- lint;
- workflow/YAML validation;
- schema/config/deployment parsers;
- runtime parity checks when relevant;
- any changed-file-aware mapping from changed paths to validators.

The repository exposes one deterministic checkpoint preflight command.

Atenea does not maintain a universal file-extension/check catalog.

### Gentle owns

Gentle owns:

- ASSESS;
- review_due;
- candidate identity;
- START/STATUS/capture/refuter/validator;
- verdict;
- acknowledgement/burn.

publish-checkpoint never calls review START and never decides review timing.

### Human/Cora/parent owns

Human/Cora/parent owns:

- scope;
- issues;
- base and branch authority;
- external authority interpretation;
- fresh authority revalidation;
- whether a detected authority change is material;
- whether Promotion Review is required;
- Promotion Review high-risk subset;
- final merge.

The CLI consumes those decisions. It does not invent them.

### Atenea publish-checkpoint owns

The deterministic CLI owns:

- exact request validation;
- local branch/HEAD/base identity;
- explicit local-dirt policy;
- remote base SHA equality;
- invoking the declared repo checkpoint preflight;
- validating manifest base/head/changed paths;
- consuming Gentle-closure evidence;
- consuming Promotion Review evidence only when the request says it is required;
- enforcing repo-declared publication credential requirements that the current transport can inspect;
- normal non-force push;
- remote-head equality;
- PR create/update and base/head/SHA/path reconciliation;
- bounded CI wait/read;
- machine-readable evidence;
- STOP before merge.

## 3. Why this is a command, not a project skill

Atenea intentionally keeps this seam outside the project skill registry.

Historical field evidence showed that project-local agent skills may be discovered/injected by Gentle. Publication is a deterministic harness boundary, not an engineering method the implementation model should opportunistically invoke.

Therefore the current implementation is a repo-owned command plus a parent recipe:

~~~text
node /path/to/Atenea/tools/publish-checkpoint.mjs ...
~~~

Do not install it as another target-repository .agents/skills workflow.

## 4. Request contract

Schema:

~~~text
atenea.publish-checkpoint-request/v1
~~~

Canonical JSON Schema:

~~~text
schemas/publish-checkpoint-request-v1.schema.json
~~~

Required shape:

~~~json
{
  "schema": "atenea.publish-checkpoint-request/v1",
  "repository": "owner/repo",
  "worktree": "/absolute/path/to/worktree",
  "remote": "origin",

  "base": {
    "branch": "main",
    "sha": "<exact accepted base sha>"
  },

  "head": {
    "branch": "work/example",
    "sha": "<exact candidate head sha>"
  },

  "issues": ["#123"],

  "authorityRevalidation": {
    "status": "UNCHANGED",
    "checkedAt": "2026-09-21T00:00:00+02:00",
    "sources": ["owner/repo#123", "repo product authority"],
    "headSha": "<same candidate head sha>"
  },

  "gentleClosure": {
    "status": "SATISFIED",
    "candidateHeadSha": "<same candidate head sha>",
    "acknowledgementBurn": "COMPLETE",
    "references": ["review-..."]
  },

  "promotionReview": {
    "required": false
  },

  "repoPreflight": {
    "command": "./scripts/checkpoint-preflight --json",
    "schema": "checkpoint-preflight/v1",
    "timeoutSeconds": 900
  },

  "pr": {
    "title": "Bounded PR title",
    "bodyFile": "/tmp/pr-body.md"
  },

  "publication": {
    "transport": "git+gh",
    "host": "github.com"
  },

  "ci": {
    "wait": true,
    "requireChecks": true,
    "timeoutSeconds": 1800,
    "pollSeconds": 10
  },

  "expectedChangedPaths": [
    "optional/path/expected/from/authority"
  ],

  "allowedLocalDirtyPaths": [],

  "delivery": "PR",
  "merge": "HUMAN"
}
~~~

### Authority revalidation is deliberately not automated by hashing

The parent must perform the fresh bounded read immediately before publication and populate authorityRevalidation.

A hash can detect that a source changed. It cannot decide whether the meaning of that change is material.

The CLI therefore requires:

~~~text
authorityRevalidation.status = UNCHANGED
authorityRevalidation.headSha = exact candidate HEAD
authorityRevalidation.sources = non-empty
~~~

If the fresh read found a change, STOP outside this CLI for human/Cora/Pi adjudication.

Fingerprinting may later improve change detection, but it must never turn a hash comparison into semantic authority.

### Gentle closure is consumed, not recreated

The CLI requires:

~~~text
gentleClosure.status = SATISFIED
gentleClosure.candidateHeadSha = exact candidate HEAD
~~~

acknowledgementBurn is:

~~~text
COMPLETE
~~~

when the provider-required review closed with acknowledgement/burn, or:

~~~text
NOT_REQUIRED
~~~

only when current Gentle/provider authority genuinely required no acknowledgement for this candidate.

The publication tool never calls ASSESS or START.

### Promotion Review remains separate

If human/Cora planning decided Promotion Review is required, request:

~~~json
{
  "promotionReview": {
    "required": true,
    "status": "PASS",
    "candidateHeadSha": "<exact head>",
    "references": ["promotion evidence reference"]
  }
}
~~~

publish-checkpoint does not decide whether Promotion Review is required, does not select a high-risk subset, and does not launch it.

## 5. Repository preflight contract

Every participating repository declares one deterministic command.

Examples:

~~~text
npm run check:checkpoint -- --json
./scripts/ci/checkpoint-preflight.sh --json
python scripts/checkpoint_preflight.py --json
~~~

Atenea does not assume npm, Node, Python or a specific build system.

The command runs in the target worktree with these environment variables:

~~~text
ATENEA_CHECKPOINT_REPOSITORY
ATENEA_CHECKPOINT_BASE_BRANCH
ATENEA_CHECKPOINT_BASE_SHA
ATENEA_CHECKPOINT_HEAD_BRANCH
ATENEA_CHECKPOINT_HEAD_SHA
ATENEA_CHECKPOINT_CHANGED_PATHS_JSON
~~~

Contract:

- exit 0 is necessary but not sufficient;
- stdout must contain exactly one JSON document;
- human-readable progress/logging should go to stderr;
- schema must be checkpoint-preflight/v1;
- result must be PASS;
- base_sha must equal the publication request base SHA;
- head_sha must equal the current candidate HEAD;
- changed_paths must equal Atenea's Git-computed changed-path set.

A PASS from another HEAD is rejected.

Canonical schema:

~~~text
schemas/checkpoint-preflight-v1.schema.json
~~~

Minimal example:

~~~json
{
  "schema": "checkpoint-preflight/v1",
  "base_sha": "<base>",
  "head_sha": "<head>",
  "changed_paths": ["src/a.ts", ".github/workflows/ci.yml"],
  "checks": {
    "tests": "PASS",
    "workflow": "PASS"
  },
  "runtime": {
    "local": "node 20",
    "declared_ci": "node 20",
    "parity": "MATCH"
  },
  "publication_requirements": {
    "github": {
      "oauth_scopes": ["workflow"]
    }
  },
  "result": "PASS"
}
~~~

The checks and runtime objects are repository-owned evidence. Atenea records them and requires overall PASS; it does not reinterpret product-specific validators.

## 6. Publication credential requirements

The repo preflight may declare publication requirements.

Current supported generic GitHub requirement:

~~~json
{
  "publication_requirements": {
    "github": {
      "oauth_scopes": ["workflow"]
    }
  }
}
~~~

Atenea does not infer this from path extensions. The target repository decides that its changed artifacts require the capability.

For git+gh publication, the CLI reads the active GitHub credential's inspectable OAuth scopes using gh api response headers.

If a declared scope is missing:

~~~text
PUBLICATION_SCOPE_MISSING
→ STOP before push
→ return exact missing scopes and remediation
~~~

If required scopes cannot be inspected:

~~~text
PUBLICATION_SCOPE_UNINSPECTABLE
→ STOP
~~~

The CLI never:

- removes protected files;
- reconstructs commits via GitHub API;
- swaps auth methods;
- refreshes credentials itself.

## 7. Local candidate and dirty-state policy

The CLI verifies:

~~~text
current branch == requested head branch
current HEAD == requested head SHA
requested base SHA is an ancestor of HEAD
remote base branch SHA == requested base SHA
computed changed paths == expectedChangedPaths when supplied
~~~

Local dirt fails closed by default.

A target may explicitly list intentional local-only dirt:

~~~json
{
  "allowedLocalDirtyPaths": [".gitignore"]
}
~~~

This is an authority input, not a discovered exception.

The CLI repeats local candidate/dirty-state validation after the repo preflight so a validator cannot silently leave new debris or mutate HEAD before publication.

## 8. Check-only mode

Default invocation performs every deterministic pre-publication gate that does not publish:

~~~bash
node tools/publish-checkpoint.mjs \
  --request /tmp/publish-request.json \
  --evidence-out /tmp/publish-evidence.json
~~~

Success:

~~~text
result=CHECKPOINT_PREFLIGHT_PASS
nextBoundary=EXPLICIT_PUBLISH_INVOCATION
~~~

No push, PR or CI action occurs.

This is useful for qualification and for explicit separation between evidence collection and the final publication action.

## 9. Publish mode

After current authority explicitly allows publication:

~~~bash
node tools/publish-checkpoint.mjs \
  --request /tmp/publish-request.json \
  --publish \
  --evidence-out /tmp/publish-evidence.json
~~~

Algorithm:

~~~text
validate explicit request
→ verify local branch/base/head/dirt
→ fetch + verify exact remote base SHA
→ run repository-owned checkpoint preflight
→ require exact manifest base/head/paths + PASS
→ enforce repo-declared credential requirements
→ verify candidate/dirt again after preflight
→ normal git push <remote> <head-sha>:refs/heads/<head-branch>
→ git ls-remote and require exact remote HEAD
→ create PR if absent, otherwise update title/body/base
→ require exact PR base branch + base SHA
→ require exact PR head branch + head SHA
→ require PR changed paths == local candidate paths
→ bounded read/wait of repository CI
→ GREEN
→ STOP: HUMAN_MERGE
~~~

There is no merge implementation.

## 10. Push failure policy

A failed normal push is a STOP.

The implementation does not contain:

- --force;
- force-with-lease;
- commit reconstruction through GitHub API;
- ref movement through GitHub API;
- automatic squash/rebase;
- alternate publication transport fallback.

Required response:

~~~text
preserve exact local/remote evidence
→ diagnose
→ smallest supported remediation
→ retry ordinary publication only after current authority allows it
~~~

## 11. CI semantics

CI polling is bounded by the explicit request:

~~~json
{
  "ci": {
    "wait": true,
    "requireChecks": true,
    "timeoutSeconds": 1800,
    "pollSeconds": 10
  }
}
~~~

Outcomes:

~~~text
all pass/skipping                  → GREEN
any fail/cancel                    → STOP / CI_RED
pending + wait=false               → STOP / CI_PENDING
pending past explicit timeout      → STOP / CI_TIMEOUT
no checks + requireChecks=true     → STOP / CI_RED
no checks + requireChecks=false    → GREEN / NO_CHECKS_REQUIRED
~~~

A red or pending PR is not merge authority.

## 12. Evidence artifact

Optional --evidence-out writes:

~~~text
atenea.publish-checkpoint-evidence/v1
~~~

It includes:

- repository/issues;
- expected base/head/branches;
- authority revalidation evidence;
- Gentle closure references;
- Promotion Review evidence if applicable;
- local candidate and dirty paths;
- repo preflight manifest + stdout SHA256;
- credential requirements/result;
- remote head after push;
- PR number/URL/base/head/SHA/changed paths;
- CI checks and terminal classification;
- result and next boundary;
- mergePerformed=false.

Prefer /tmp, an outbox, or another operator-owned location outside the product repository.

Do not commit runtime evidence to the target repo unless its own authority requires that.

## 13. Failure semantics

Every failure is STOP with machine-readable error code and evidence.

Important classes include:

~~~text
AUTHORITY_DRIFT
AUTHORITY_CANDIDATE_MISMATCH
GENTLE_NOT_CLOSED
GENTLE_CANDIDATE_MISMATCH
PROMOTION_REVIEW_REQUIRED
HEAD_BRANCH_MISMATCH
HEAD_SHA_MISMATCH
BASE_NOT_ANCESTOR
UNEXPECTED_DIRTY_STATE
REMOTE_BASE_DRIFT
PREFLIGHT_FAILED
PREFLIGHT_BASE_MISMATCH
PREFLIGHT_HEAD_MISMATCH
PREFLIGHT_PATHS_MISMATCH
PUBLICATION_SCOPE_UNINSPECTABLE
PUBLICATION_SCOPE_MISSING
COMMAND_FAILED
REMOTE_HEAD_MISMATCH
PR_BASE_MISMATCH
PR_BASE_SHA_MISMATCH
PR_HEAD_BRANCH_MISMATCH
PR_HEAD_SHA_MISMATCH
PR_CHANGED_PATHS_MISMATCH
CI_RED
CI_PENDING
CI_TIMEOUT
~~~

No failure grants permission for an alternate publication path.

## 14. Field qualification plan

Unit/integration tests are necessary but not sufficient.

After this candidate is merged, qualify publish-checkpoint on the next bounded real repository change that already has:

- explicit EXECUTION_READY authority;
- a repo-owned checkpoint preflight command implementing checkpoint-preflight/v1;
- a real Gentle candidate whose required review is terminal and burned;
- an ordinary feature branch and human-merge PR delivery boundary.

Qualification must demonstrate at least:

~~~text
PREPUBLICATION_AUTHORITY=UNCHANGED
GENTLE_CLOSURE=SATISFIED
CHECKPOINT_PREFLIGHT=PASS
PREFLIGHT_BASE_MATCH=PASS
PREFLIGHT_HEAD_MATCH=PASS
PREFLIGHT_CHANGED_PATHS_MATCH=PASS
PUBLICATION_CREDENTIAL=PASS
PUSH=NON_FORCE
REMOTE_HEAD_MATCH=PASS
PR_BASE_MATCH=PASS
PR_BASE_SHA_MATCH=PASS
PR_HEAD_MATCH=PASS
PR_HEAD_SHA_MATCH=PASS
PR_CHANGED_PATHS_MATCH=PASS
CI=GREEN
MERGE=HUMAN_BOUNDARY
~~~

And one controlled negative case should prove a deterministic pre-push failure, preferably a repo-owned artifact validation failure or declared credential-capability failure.

Do not use Laboratorio PR #32 for this qualification task. Its current audit/merge/reconciliation remains owned by the Laboratorio workstream.

## 15. Deletion / upstream-first test

publish-checkpoint is justified only by a cross-repository seam not owned end-to-end by a single current upstream component:

- repos own their QA;
- Gentle owns review;
- Git owns push identity;
- GitHub owns PR/CI;
- human/Cora owns authority and merge.

Atenea's code only binds these already-owned results to one exact candidate and fails closed across the gaps.

If a future upstream tool provides this exact authority-safe checkpoint contract end-to-end, delete this CLI rather than growing a competing framework.
