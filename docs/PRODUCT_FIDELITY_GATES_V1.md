# Atenea — Product fidelity gates v1

Status: **CURRENT C-084 PRODUCT-FIDELITY BOUNDARY**
Date: 2026-10-05

## Purpose

A product can drift even when shaping documents still contain the right principles and every implementation ticket passes locally. Atenea therefore protects product intent across **decomposition and composition**, not only during the initial shaping conversation.

The recurring failure mode is:

```text
rich internal domain
→ tickets split along internal/aggregate seams
→ each seam becomes a user-facing/browser slice
→ local hardening rewards completeness/losslessness/exact shape
→ slices accumulate
→ composed UI exposes more complexity than the product intended
```

No single step is necessarily incorrect in isolation. The defect is loss of **composed product fidelity** across boundaries.

## Invariants

1. **Internal model richness does not imply user-facing richness.** Domain entities, aggregates, identifiers, versions, solver concepts, schemas and configuration shapes stay internal unless accepted product authority requires the user to reason about them.
2. **Aggregate/module boundaries are not default screen/form/browser-slice boundaries.** Engineering decomposition may follow internal seams; product decomposition follows user outcomes and mental models.
3. **Lossless/exact model representation is not product fidelity by itself.** Accessibility, validation, type safety, exact shape and complete CRUD can make the wrong surface technically excellent.
4. **A locally correct ticket does not prove the composed product.** Several faithful slices can accumulate into a product that violates its original simplicity, workflow or conceptual-load constraints.
5. **Product non-negotiables survive every transformation.** They remain authority through spec synthesis, ticketization, implementation, hardening and promotion.
6. **Representation translation must not silently narrow accepted semantics.** A UI control, form, mapper, adapter, schema, persistence/export shape or other human-facing translation may simplify presentation, but it may not erase distinctions that accepted product/domain authority still requires users or downstream behavior to represent.

## Gate 1 — ticketization fidelity

Before material tickets become execution authority, check the proposed decomposition against the original brief, non-negotiables and reconciled spec.

- Each product-facing ticket should deliver a user outcome, not merely expose an internal aggregate/module.
- An internal seam may justify an engineering task but does not authorize a new visible page, form, mode, workflow or configuration concept.
- New user-facing concepts/decisions require explicit product authority and a reason the simpler existing model cannot satisfy the accepted need.
- For material UI tickets, state the **user-facing concept delta** (often `NONE`) and the product boundary the slice must preserve.
- Read the full ticket set as one future product before execution. If literal implementation would create an unintended product, reconcile the tickets first.

## Gate 2 — representation narrowing check

When a change translates already-accepted semantics into a new representation, compare the **meaning representable before and after** the change. Ask:

> Can every state, value or distinction that accepted authority requires still be represented after this change?

Check proportionately for unauthorized loss of:

- precision or granularity, including temporal precision/timezone semantics;
- cardinality or multiplicity;
- valid ranges or boundary values;
- states, enum members or open-vocabulary values;
- combinations of independently meaningful choices;
- ordering when order is semantic;
- distinctions such as `unset` / `unknown` / `not applicable` / explicit value;
- any other representable distinction preserved by accepted product/domain authority.

Typical narrowing examples include `instant → date-only`, `multiple values → single select`, `open vocabulary → closed taxonomy`, `arbitrary interval → fixed bucket`, `exact quantity → boolean`, or an optional distinction becoming a silent default.

This guardrail does **not** require exposing internal-only richness. A richer internal model, by itself, is not product authority. The check triggers when the accepted user/product/domain semantics themselves allow a distinction that the proposed representation would collapse.

If a material narrowing is not already authorized explicitly, it is a **HUMAN STOP / product-semantic decision**, not an implementation detail for an agent to choose.

## Gate 3 — material UI composed-product checkpoint

Use a Cora + human read-only product-fidelity checkpoint when material UI is accumulating across tickets/slices, especially when:

- two or more tickets modify the same user journey or configuration surface;
- ticket boundaries resemble internal aggregates/domain objects;
- a slice adds user-visible entities, states, workflows, modes or decision burden;
- the product has explicit simplicity/complexity-firewall principles;
- local hardening is making a surface more complete without proving that the surface itself should exist.

Inspect the **actual composed product** when practical (running UI, screenshots or equivalent high-fidelity evidence), not only code/diff/ticket text. Compare it with original product authority and ask:

- Does the interface still express the intended user mental model and primary task?
- Has internal domain structure leaked into what the user must understand?
- Has the number of concepts, choices, forms or workflows materially increased?
- Are we preserving a product principle only in prose while the rendered product contradicts it?
- If all currently accepted slices remain, is this still the product Cora + human intended?

A material mismatch is **HUMAN STOP / product reconciliation**, not a request for OpenCode to redesign autonomously.

## Gate 4 — hardening cannot legitimize product drift

Technical hardening is subordinate to accepted product surface. Do not spend review/correction effort making an unauthorized or over-complex UI perfectly lossless, exact, accessible or exhaustive. First prove the surface belongs in the product; then harden it.

Reviewers/correctors may report evidence that suggests product drift, but they do not choose the desired product. Material reconciliation returns to Cora + human.

## Scope

These gates are **conditional**, not ceremony for every ticket. The composition gates apply when product/UI composition risk is material. The representation-narrowing check also applies to non-UI translations (for example adapters, schemas, persistence or export) when accepted semantics could be collapsed. Backend-only or already-bounded work with no such semantic translation continues through the normal C-084 path without a product-composition ritual.
