# Atenea — Changed-file-aware pre-publication validation v1

Status: **CURRENT EXECUTION POLICY**
Date: 2026-09-21

## 1. Purpose

Pre-publication evidence must validate the **artifacts that actually changed**, not only run a fixed generic test bundle.

Atenea remains upstream-first. It does not implement a universal parser/build system. The parent derives required validation from:

1. changed paths;
2. repository-declared CI/runtime authority;
3. repo-native scripts/checks;
4. qualified upstream validators when the repository lacks an equivalent.

Missing required validation is explicit evidence and may be a STOP condition. It is never silently converted into PASS.

## 2. Required pre-publication sequence

Immediately before ordinary non-force publication:

```text
fresh exact candidate / HEAD check
→ enumerate changed paths
→ classify changed artifact types
→ map each material artifact type to an applicable validator
→ run repo-native / qualified upstream validators
→ reconcile declared CI/runtime parity
→ verify publication credential capability when the artifact requires it
→ re-read publication authority
→ publish only if all required evidence is satisfied
```

This does not create a second review lifecycle. Gentle exact-candidate RDD remains review authority; artifact validation is deterministic delivery evidence.

## 3. Changed-file-aware validation

Examples, not an exhaustive global gate list:

| Changed artifact | Minimum evidence |
|---|---|
| `.github/workflows/*.yml` or `.github/workflows/*.yaml` | Parse/validate workflow YAML with a repo-native validator or qualified upstream tool such as `actionlint`; syntax-only generic checks are insufficient if a stronger repo-native validator exists. |
| package/build configuration | Run the repository's declared config/build validation or smallest command that loads the changed configuration. |
| generated schema/manifest | Validate with the owning generator/schema checker when available. |
| deployment descriptors | Run the platform/repo validator that actually parses that descriptor. |
| source/tests only | Existing repo-defined deterministic tests/build/type checks as applicable. |

Do not add a giant permanent gate matrix merely because Atenea knows many artifact types. Add/require a validator only when the current diff makes that artifact relevant.

## 4. Workflow YAML rule

If the changed path set includes `.github/workflows/*.yml` or `.yaml`:

1. a YAML/workflow parser must run before push;
2. prefer repo-native `actionlint` or equivalent upstream tooling;
3. if no suitable validator is installed/configured, report that gap explicitly rather than declaring the candidate publication-ready;
4. do not rely on `git diff --check`, tests or LLM review as substitutes for parsing the workflow artifact.

The Laboratorio field train demonstrated why: an unquoted colon in a workflow step name passed product tests, `git diff --check` and four-lens review, then GitHub Actions rejected the workflow before execution.

## 5. Publication credential capability

Authentication success is not the same as authority for every changed artifact.

When publication includes workflow changes, verify that the **actual credential/transport used for the push** has the permission GitHub requires for workflow modification.

For classic OAuth/PAT flows this may include the `workflow` scope; other credential types may express the capability differently. Atenea MUST NOT hard-code one authentication scheme as universal.

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
