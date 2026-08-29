# Atenea

Atenea is an isolated workflow laboratory for testing whether the **full Matt Pocock engineering-skills ecosystem** can coexist cleanly with the **full Gentle AI ecosystem** inside **OpenCode**, without rebuilding either system inside KairOS.

## Objective

Validate the smallest viable architecture for autonomous software work:

```text
Interactive design / authoring
        ↓
Matt Pocock ecosystem
        ↓
ready-for-agent + authoritative Agent Brief
        ↓
Gentle AI direct/delegated execution
        ↓
verification + optional RDD
        ↓
Ready / Needs your decision
```

If this works upstream-first, KairOS should later become only a thin scheduler/supervisor around already-supported interfaces rather than a custom engineering harness.

## Working principles

1. **Upstream first.** Install and test Matt and Gentle as complete ecosystems before adapting anything.
2. **No cherry-picking internals.** Do not extract RDD, TDD, review, triage, or lifecycle fragments into custom Atenea/KairOS implementations.
3. **No hidden integration layer.** Prefer native skills, project conventions, GitHub issues, Agent Briefs, OpenCode and Gentle lifecycle state.
4. **Fresh-session handoff.** A `ready-for-agent` work unit must be executable from durable repository/tracker context; success must not depend on the original design conversation remaining in context.
5. **Fail before patching.** If vanilla Matt + Gentle do not interoperate, diagnose first. Do not immediately write glue code.
6. **Keep the experiment isolated from KairOS.** Atenea lives at `/srv/kairos-lab/Atenea` and in this repository; no KairOS harness changes belong here.

## Current hypothesis

- **Greenfield authoring:** Matt Pocock is the preferred front end: `grill-with-docs → to-spec → to-tickets → triage → Agent Brief → ready-for-agent`.
- **Brownfield authoring:** OpenSpec is a likely alternative entry path and will be evaluated later; it is not part of the first experiment.
- **Supervised implementation:** Matt `/implement` remains available when a human is present.
- **Unattended implementation:** Gentle AI owns implementation from an already-ready contract using direct/delegated routing; it should not recreate Matt planning through SDD.
- **Post-candidate review:** Gentle native verification/RDD owns the unattended review lifecycle.
- **Delivery:** repository policy remains separate from review. KairOS integration is explicitly out of scope until the upstream workflow works unaided.

## First qualification sequence

1. Inventory the existing global OpenCode/Gentle/Matt configuration on the VPS **read-only**.
2. Clean only conflicting/partial installations that would make the result uninterpretable.
3. Install/configure full Gentle AI for OpenCode.
4. Install the full Matt Pocock skills ecosystem for the Atenea project and run its official project setup.
5. Refresh and inspect Gentle's skill registry. Confirm that it discovers the original Matt `SKILL.md` files.
6. Run a small greenfield workflow entirely through Matt until a GitHub issue reaches `ready-for-agent` with an authoritative Agent Brief.
7. Close the authoring session.
8. From a fresh OpenCode/Gentle session, issue only the minimal instruction: `Implement issue #X.`
9. Observe whether Gentle consumes the existing contract, avoids unnecessary SDD recreation, implements, verifies and completes native review correctly.
10. Record token/call cost, human interventions, lifecycle behavior and any conflicts.

## Explicitly rejected for the first experiment

- Rebuilding a bespoke builder/reviewer protocol in KairOS.
- Copying only selected pieces of Gentle RDD.
- Removing Matt skills merely because they overlap with Gentle; ownership is selected by workflow, not by mutilating the installation.
- Adding Convoy, Spec Kit or OpenSpec before the Matt + Gentle baseline is understood.
- Creating custom work-unit schemas or translating Matt tickets/Agent Briefs into a KairOS-specific format.
- Redesigning KairOS while this laboratory is still qualifying the upstream workflow.

See `docs/DECISIONS.md` and `docs/QUALIFICATION.md` as the experiment evolves.
