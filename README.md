# Atenea

Atenea is an isolated workflow laboratory for testing whether the **full Matt Pocock engineering-skills ecosystem** can coexist cleanly with the **full Gentle AI ecosystem** inside **OpenCode**, without rebuilding either system inside KairOS.

## Objective

Validate the smallest viable architecture for autonomous software work:

```text
Matt interactive authoring
        ↓
CONTEXT / ADR → spec → audited tickets
        ↓
ready-for-agent + Handoff Contract Gate
        ↓
fresh Gentle session: direct/delegated execution
        ↓
deterministic verification + Closure Gate
        ↓
accepted remote checkpoint
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

- **Greenfield authoring:** Matt Pocock owns interactive discovery, specification and ticket authoring: `grill-with-docs → CONTEXT / ADR → to-spec → clean SPEC audit → to-tickets → clean TICKET/HANDOFF audit → ready-for-agent`. Matt triage remains valid for raw incoming issues that Matt did not create; generated `to-tickets` issues do not require triage or an Agent Brief.
- **Brownfield authoring:** OpenSpec is a likely alternative entry path and will be evaluated later; it is not part of the first experiment.
- **Ownership boundary:** Matt owns interactive greenfield discovery/spec/ticket authoring. Gentle owns unattended execution from an already-ready durable contract, using direct/delegated routing and deterministic verification. KairOS remains future thin scheduling/supervision/delivery only.
- **Unattended implementation:** The normal prompt is intentionally minimal: `Implement GitHub issue #N.` Gentle must start from a fresh session and must not recreate Matt planning through SDD.
- **Post-candidate review:** Native Gentle RDD remains a later qualification stage; the current Closure Gate accepts a dependency work unit at an exact remote checkpoint.
- **Delivery:** repository merge/release policy remains separate from work-unit acceptance. KairOS integration is explicitly out of scope until the upstream workflow works unaided.

## First qualification sequence

1. Inventory the existing global OpenCode/Gentle/Matt configuration on the VPS **read-only**.
2. Clean only conflicting/partial installations that would make the result uninterpretable.
3. Install/configure full Gentle AI for OpenCode.
4. Install the full Matt Pocock skills ecosystem for the Atenea project and run its official project setup.
5. Refresh and inspect Gentle's skill registry. Confirm that it discovers the original Matt `SKILL.md` files.
6. Run a small greenfield workflow entirely through Matt until audited GitHub issues reach `ready-for-agent`.
7. Run the Handoff Contract Gate in clean context, including temporal slice exclusivity.
8. Close the authoring session.
9. From a fresh OpenCode/Gentle session, issue only: `Implement GitHub issue #N.`
10. Observe whether Gentle consumes the existing contract, avoids unnecessary SDD recreation, implements and verifies within scope.
11. Apply the Closure Gate; record native RDD separately when that stage is qualified.

## Explicitly rejected for the first experiment

- Rebuilding a bespoke builder/reviewer protocol in KairOS.
- Copying only selected pieces of Gentle RDD.
- Removing Matt skills merely because they overlap with Gentle; ownership is selected by workflow, not by mutilating the installation.
- Adding Convoy, Spec Kit or OpenSpec before the Matt + Gentle baseline is understood.
- Creating custom work-unit schemas or translating Matt tickets/Agent Briefs into a KairOS-specific format.
- Redesigning KairOS while this laboratory is still qualifying the upstream workflow.

See `docs/HANDOFF_CONTRACT.md`, `docs/DECISIONS.md` and `docs/QUALIFICATION.md` as the experiment evolves.
