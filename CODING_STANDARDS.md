# Atenea Coding Standards

This file contains only Atenea's repo-local horizontal engineering-quality policy.

It supplements, rather than restates, the upstream Matt Pocock `tdd`, `codebase-design`, `domain-modeling`, `diagnosing-bugs` and `code-review` methods. Repo-specific deterministic tooling may add stricter machine-decidable checks where justified.

## 1. Prefer changeability over cleverness

Use the smallest coherent design that satisfies the current contract and can be changed or deleted safely.

Do not add speculative abstractions, indirection, generic frameworks, services or extension points without a demonstrated change pressure.

A design that is locally more explicit is preferable to one that is globally "flexible" but harder to understand.

## 2. Technical debt must be intentional

Technical debt may be accepted when the trade-off is worth it, but it must be:

- visible;
- bounded in scope;
- owned by a person/team/issue or explicit remediation condition;
- distinguishable from accidental neglect.

Do not silently accumulate compatibility layers, TODO architecture or duplicated implementations as permanent design.

## 3. Contract changes remove obsolete design

When a contract changes, remove code, tests, adapters and branches of design that no longer serve a real supported behavior.

Backward compatibility, migrations or temporary dual paths are justified only when a real consumer, persisted contract or rollout requires them. Give temporary compatibility a retirement condition.

Do not keep the old design forever merely because deleting it feels risky.

## 4. Testing is risk- and oracle-driven

Tautological tests are considered harmful.

Use TDD when the behavior can be expressed through a meaningful seam and the expected result can come from an independent oracle/source of truth.

Do not force TDD for wiring-only, generated, declarative or purely visual changes when the only possible test would restate the implementation. Use the best deterministic verification appropriate to the change instead.

Add negative/adversarial tests in proportion to risk, especially around:

- authorization and permissions;
- parsing and validation;
- security/trust boundaries;
- migrations and compatibility;
- failure/retry/recovery behavior;
- state transitions and destructive operations.

Tests should prove externally meaningful behavior and survive safe internal refactoring.

## 5. Dependencies must earn their cost

Add a dependency only when it provides concrete value that is not reasonably available from the existing stack or a small local implementation.

Consider maintenance, transitive risk, runtime weight, upgrade burden and lock-in. Remove dependencies that no longer justify their cost.

Do not build internal substitutes for mature upstream capabilities merely to avoid a dependency that the architecture has already adopted.

## 6. Runtime behavior must be operable when risk requires it

For production-relevant paths, make failure behavior explicit and proportional to risk.

Where applicable:

- return/propagate actionable errors instead of silently masking failure;
- make retries/idempotency semantics explicit for operations that may repeat;
- preserve enough logs/telemetry/context to diagnose failures without leaking secrets;
- define ownership and recovery boundaries for persistent side effects.

Do not add observability ceremony to low-risk/local code with no operational need.

## 7. Security and data boundaries are explicit

Apply least privilege and minimize credential/data exposure.

For sensitive or persistent data, make ownership, trust boundaries and mutation authority explicit.

Never log secrets or credentials. Avoid broad environment/credential propagation when a narrower boundary is available.

Security controls should match the actual threat/risk model; do not invent a bespoke security platform without a concrete requirement.

## 8. Performance and scale require evidence

Optimize when requirements, measurements or credible load characteristics justify it.

Do not pre-emptively introduce caches, queues, sharding, microservices, distributed coordination or generic scalability abstractions.

For Atenea, "scalable" means the software can be understood, modified, tested, operated and extended without each change multiplying fragility.

## 9. Durable decisions belong in durable authority

Use clear domain vocabulary already established by the repository.

Record durable, non-obvious architectural/domain decisions in the repository's normal authority surface (for example `CONTEXT.md`, ADRs, specs or canonical product docs) rather than leaving them only in chat, commit messages or agent memory.

Do not duplicate the same authoritative fact manually across multiple documents.

## 10. Review interpretation

Upstream `code-review` may consume this file as the repo Standards axis. Repo standards here override generic preferences where they conflict.

These rules are engineering guardrails, not a mandate for a second review lifecycle. Gentle native RDD remains the final exact-candidate review authority on the unattended Atenea path.