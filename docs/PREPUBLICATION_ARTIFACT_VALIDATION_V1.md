# Atenea — Changed-file-aware pre-publication validation v1

Status: **CURRENT EXECUTION POLICY**
Date: 2026-09-21

## 1. Purpose

Pre-publication evidence must validate the **artifacts that actually changed**, not only run a fixed generic test bundle.

Atenea remains upstream-first. It does not implement a universal parser/build system or a changed-path-to-validator catalog.

The **target repository** owns the mapping from its changed paths to its required deterministic validators, based on:

1. its changed paths;
2. repository-declared CI/runtime authority;
3. repo-native scripts/checks;
4. qualified upstream validators when the repository lacks an equivalent.

The repository exposes that work through one deterministic checkpoint-preflight command returning `checkpoint-preflight/v1`.

Atenea invokes that repo-owned command and requires an exact candidate-bound PASS. Missing required validation is explicit evidence and may be a STOP condition. It is never silently converted into PASS.

## 2. Required pre-publication sequence

Immediately before ordinary non-force publication:

```text
fresh external-authority revalidation
→ exact candidate / base / HEAD check
→ invoke repo-owned checkpoint preflight
→ require checkpoint-preflight/v1 PASS bound to exact base/head/changed paths
→ enforce repo-declared publication requirements
→ normal non-force publication
→ remote/PR/CI reconciliation
→ STOP at human merge
```

The repo preflight itself owns changed-file classification, artifact validators and runtime-parity evidence.

This does not create a second review lifecycle. Gentle exact-candidate RDD remains review authority; artifact validation is deterministic delivery evidence.

Generic orchestration and contract: `docs/PUBLISH_CHECKPOINT_V1.md`.

## 3. Changed-file-aware validation

The mapping is **repository-owned**, not Atenea-owned.

A repository may decide, for example:

| Changed artifact | Repo-owned minimum evidence |
|---|---|
| `.github/workflows/*.yml` or `.github/workflows/*.yaml` | Parse/validate workflow YAML with a repo-native validator or qualified upstream tool such as `actionlint`. |
| package/build configuration | Run the repository's declared config/build validation or smallest command that loads the changed configuration. |
| generated schema/manifest | Validate with the owning generator/schema checker when available. |
| deployment descriptors | Run the platform/repo validator that actually parses that descriptor. |
| source/tests only | Existing repo-defined deterministic tests/build/type checks as applicable. |

These are examples for repository authors. `publish-checkpoint` contains no extension/path catalog and does not choose which validator applies.

Do not add a giant permanent gate matrix merely because Atenea has observed many artifact types.

## 4. Repository example: workflow YAML

A repository whose changed-path policy treats `.github/workflows/*.yml` or `.yaml` as requiring workflow validation should:

1. run a YAML/workflow parser before reporting checkpoint PASS;
2. prefer repo-native `actionlint` or equivalent upstream tooling;
3. report a missing required validator as preflight FAIL;
4. not rely on `git diff --check`, tests or LLM review as substitutes for parsing the workflow artifact.

This mapping remains inside that repository's checkpoint preflight. Atenea does not independently rediscover the workflow rule.

The Laboratorio field train demonstrated why the repo needs such a rule: an unquoted colon in a workflow step name passed product tests, `git diff --check` and four-lens review, then GitHub Actions rejected the workflow before execution.

## 5. Publication credential capability

Authentication success is not the same as authority for every changed artifact.

The repository checkpoint manifest may declare capabilities required by the changed artifacts. For the current `git+gh` transport, one supported generic declaration is:

```json
{
  "publication_requirements": {
    "github": {
      "oauth_scopes": ["workflow"]
    }
  }
}
```

Atenea then verifies that the **actual credential/transport used for the push** satisfies the declared requirement when it can inspect that capability.

For classic OAuth/PAT flows this may include the `workflow` scope; other credential types may express capability differently. Atenea MUST NOT infer a scope from file extensions or hard-code one authentication scheme as universal.

If publication is rejected for missing capability:

- preserve the candidate;
- repair the credential/permission boundary;
- retry ordinary publication only after capability is established;
- do not reconstruct commits via another API merely to bypass the control;
- do not remove a required workflow change to make the push pass.

## 6. CI runtime parity

Repository-declared CI runtime is delivery evidence.

If the local host differs materially from the runtime declared by CI and the changed candidate or gate is runtime-sensitive:

```text
run the relevant deterministic gate in the declared CI runtime when practical
OR
record the host/CI divergence explicitly and do not claim local parity
```

A local failure caused only by a newer/different host runtime does not prove the CI candidate is invalid. Conversely, a local PASS on a different runtime does not prove declared-CI compatibility.

Prefer repo-native mechanisms for parity:
- version manager/toolchain file;
- container/devcontainer;
- package manager engine;
- CI-compatible local runner;
- explicit runtime invocation.

Do not mutate the host globally merely to imitate CI when a narrower supported mechanism exists.

## 7. Oracle semantics at publication

An oracle used during history reconstruction is a **drift detector and intended-content reference**.

It does not outrank:

- accepted specification/acceptance criteria;
- syntactic validity;
- deterministic tests;
- buildability;
- deployment/delivery validity;
- current external authority.

If a byte preserved by the oracle is later proven defective:

1. retain evidence that reconstruction itself was faithful;
2. classify the defect separately;
3. repair it as a bounded correction under current authority;
4. re-run the applicable deterministic validation and Gentle lifecycle for the changed candidate.

Do not silently mutate the oracle during reconstruction merely because a defect is suspected; equally, do not preserve a proven defect forever merely to maintain byte equality.

## 8. STOP conditions

STOP rather than improvise when:

- a materially changed artifact has no credible parser/validator and repository authority requires validation;
- declared runtime parity is necessary to interpret a gate and cannot be established;
- publication credential capability is missing;
- the exact candidate/HEAD changed after validation;
- fixing a delivery defect would exceed current authorized scope;
- publication authority changed during revalidation.

## 9. Non-goals

This policy does **not** authorize:

- a universal Atenea build system;
- downloading/installing validators silently at execution time;
- a second LLM review lifecycle;
- Promotion Review after every ticket;
- bypassing GitHub permissions;
- rewriting product semantics merely to satisfy a validator.

The smallest authoritative validator for the changed artifact wins.
