# Atenea — Human Product Design Authority v1

Status: **CURRENT C-084 ATTENDED PRODUCT-DESIGN BOUNDARY**
Date: 2026-10-05

## Purpose

A technically exact specification can still produce the wrong human product. Exhaustive domain/spec grilling is strong at ambiguity reduction, invariants, edge cases and falsifiability, but it does not by itself prove that the resulting experience is natural for the person doing the work.

Atenea therefore separates **human product design authority** from technical/spec formalization. Upstream Matt skills remain unchanged and keep their rigor; they are a second filter over an already-shaped interaction hypothesis, not the primary author of the user experience.

The failure mode this boundary prevents is:

```text
human need
→ exhaustive domain/spec clarification
→ internal structure becomes highly legible to implementers
→ screens/forms mirror that structure
→ technically faithful product
→ human workflow feels like the model/data topology
```

The desired direction is:

```text
PRODUCT INTENT
→ HUMAN WORK FRAME                       (Cora + human, attended)
→ conditional evidence gathering         (/research, /to-questionnaire, observation)
→ HUMAN PRODUCT DESIGN / GRILLING
→ INTERACTION HYPOTHESIS                 (durable accepted authority)
→ MATT / SPEC GRILLING                   (rigor, edge cases, contracts)
→ conditional PROTOTYPE LOOP             (unresolved material spatial/interaction questions)
→ COMPOSED HUMAN-PRODUCT GRILL
→ HUMAN PRODUCT RECHECK
→ FREEZE / EXECUTION AUTHORITY
→ IMPLEMENTATION
→ COMPOSED HUMAN-TASK WALKTHROUGH        (when material)
```

## Ownership

Human product design is **attended Cora + human authority**.

- Cora may research, challenge assumptions, compare representations, prototype alternatives and make recommendations.
- The human accepts/rejects the material interaction direction.
- OpenCode/Matt may gather bounded evidence and test a frozen interaction hypothesis against technical/domain constraints.
- Unattended agents do **not** choose whether a human workflow should be a calendar, timeline, list, dashboard, wizard, map, progressive-disclosure pattern or another product representation.
- If technical/spec grilling reveals that the accepted interaction hypothesis cannot satisfy a material requirement, return the conflict to Cora + human. Do not let specification pressure silently redesign the product.

This authority does not fork or weaken upstream Matt skills.

## Core invariants

### 1. Task before structure

Start from the job a person is trying to complete, not from aggregates, schemas, endpoints, modules or configuration objects. Internal entities do not receive pages/forms by right.

### 2. Human mental model beats domain topology

Five aggregates do not imply five destinations. One human action may legitimately cross several aggregates without exposing that decomposition. Product information architecture follows user outcomes and mental models.

### 3. Representation must fit the phenomenon

Choose representations according to how the work is naturally understood. Examples include temporal views for time/planning, person-centred views for people, capacity/gap views for workload or coverage, direct comparison for comparative decisions, and spatial views when location is materially relevant.

A table/list/form is not the universal default merely because it is easy to implement or test.

### 4. User-friendly is functional correctness

Usability is not deferred polish. If a competent user must understand internal ontology, decode avoidable jargon, or traverse unnecessary structure to perform an ordinary task, the product is not functionally complete yet.

### 5. Aesthetic usability counts

Visual hierarchy, density, legibility, grouping, state visibility and action prominence reduce cognitive load and help users learn and trust the system. This does not require decorative or “premium” styling; it requires a deliberately designed information hierarchy rather than accidental layout.

### 6. Default path is ruthlessly simple

The frequent path should be obvious and cheap. Rare exceptions may exist behind progressive disclosure, but ordinary users should not pay the cognitive cost of every edge case on every visit.

Progressive disclosure must not create an alternate editable aggregate-authoring path that conflicts with accepted product authority.

### 7. Real scenarios before abstract completeness

Shape around concrete scenes before enumerating abstract states. Prefer questions such as “It is Monday and one nurse is absent; what must happen next?” over starting with “What states can this Rule have?”. Domain completeness follows after the human journey is understood.

### 8. Friction budget is explicit

For each frequent/material journey, reason proportionately about:

- steps/actions;
- decisions the user must make;
- new concepts they must learn;
- screens/destinations they must traverse;
- text/instructions they must read;
- information that must be visible simultaneously;
- waiting/latency and what happens while waiting;
- completion/error feedback and how the user knows the task is done.

No universal numeric threshold is imposed. The point is to make unnecessary friction visible before it hardens into specification.

### 9. No freeze without a humanity check

Before a material user-facing interaction becomes execution authority, Cora + human must be able to answer positively, or explicitly accept the trade-off, to both questions:

> Could a person competent in their real-world job, but unfamiliar with our internal product/domain model, understand how to complete the ordinary task without product-specific training?

> If internal entity/aggregate names disappeared, would it still be evident how to do the work?

A clear “no” is product-design debt that must be reconciled before freeze unless the human explicitly accepts it for a bounded reason.

### 10. “Would I want to use this?” is a legitimate attended veto signal

Subjective aversion is not a substitute for evidence, but it is valid product evidence. A technically correct product that Cora + human would not want to use is **not automatically ready to freeze/publish**.

Translate the reaction into concrete causes where possible: navigation burden, conceptual load, wrong representation, poor hierarchy, missing simultaneous context, excessive decisions, weak feedback, density or other friction. Do not dismiss it merely because deterministic tests are green.

## Human product grilling — minimum questions

For material product/UI shaping, capture only what is relevant, but force consideration of the human context before technical grilling:

- Who performs this work?
- Where/when does it happen, and how frequently?
- How much time/attention is normally available?
- Which device/screen/environment is realistic?
- What does the person already know?
- What should they **not** have to learn?
- What is the most frequent action or outcome?
- What do they expect to see first?
- What representation do they already use to think about the work?
- What information must be visible simultaneously?
- What should be possible without navigation?
- Which errors or interruptions are common?
- What happens when information is missing?
- What latency is tolerable and what feedback is expected while waiting?
- What feedback proves completion or failure?
- Which exceptions are frequent enough to deserve visible affordances, and which should stay hidden until needed?
- What would make the surface feel complicated before the person even starts?

This is not a mandatory questionnaire to copy verbatim into every project. It is a shaping lens.

### Human-work evidence provenance

Material claims about how people work should distinguish their provenance when that distinction matters:

- **OBSERVED** — directly observed in real work, workflow evidence, recordings, screenshots, artefacts or equivalent first-hand evidence;
- **REPORTED** — stated by the user, domain professional or another identified stakeholder;
- **ASSUMED** — a design hypothesis that still needs validation.

Do not silently promote an `ASSUMED` workflow into the same authority class as observed/reported work. The labels are lightweight and need only be applied to material claims where provenance affects the design decision.

### Evidence gathering before technical grilling — conditional

Use upstream discovery tools when the human-work frame is materially uncertain:

- `/research` may gather competitors, established interaction patterns, human-factors evidence or external constraints;
- `/to-questionnaire` or equivalent attended discovery may elicit tacit workflow knowledge from supervisors/users/domain professionals;
- existing product telemetry, screenshots, workflow artefacts or real-user observation may be better evidence when available.

These are **inputs to attended product shaping**, not substitutes for product authority and not mandatory ceremony for every feature.

## Interaction hypothesis

Before Matt/spec grilling on **material user-facing work**, Cora + human establish a durable interaction hypothesis. It may live in an accepted product doc, issue, design authority, handoff precursor or equivalent; Atenea does not require a new file when suitable authority already exists.

The smallest useful interaction hypothesis states, as applicable:

- primary actor/job/context;
- ordinary/default journey and desired outcome;
- important secondary/exception journeys;
- information that should be visible together;
- primary vs secondary actions and progressive-disclosure boundary;
- chosen representation(s) and why they fit the phenomenon;
- user-facing concepts that must remain hidden or translated;
- material friction-budget decisions/trade-offs;
- expected completion/error feedback;
- any visual hierarchy/density constraints needed for usability.

Mockups/prototypes may support this authority but are not mandatory. The hypothesis can be concise prose when the interaction is simple.

### Conditional prototype gate for spatial/interaction questions

A materially unresolved question whose answer depends on **seeing or using the composition** should not be closed by prose alone merely because the team can describe a plausible solution. Typical triggers include:

- density / first viewport / simultaneous information;
- calendar, timeline, grid or spatial planning;
- inspector/detail-panel placement;
- hierarchy and comparison;
- drag/drop or direct manipulation;
- materially different navigation/composition alternatives.

Use the smallest practical prototype/high-fidelity representation, perform a task walkthrough or user test appropriate to the uncertainty, then return the result to the attended shaping loop. The prototype does not create authority by itself; Cora + human accept/reject the interaction decision. Do not require prototyping for trivial UI changes or already-settled interaction authority.

## Matt/spec grilling is the second filter

After the interaction hypothesis exists, Matt/spec grilling may strengthen it with ambiguity resolution, states, contracts, invariants and edge cases.

It may not silently invert the authority relationship:

```text
accepted human interaction
→ technical formalization
```

must not become:

```text
technical/domain structure
→ generated human interaction
```

A grill answer is not automatically permission to add a visible concept, route, equal-weight action or configuration burden. A DOMAIN or TECHNICAL decision does not automatically become PRODUCT INTERACTION authority. Material changes to the interaction hypothesis return to the attended Cora + human loop.

### Composed human-product grill before `/to-spec` / spec freeze

Before `/to-spec` when the material interaction is still being shaped — or before spec freeze when a repo-native flow does not use `/to-spec` — walk a small representative set of real journeys end to end — normally the primary journey plus enough important variants to expose composition risk. For a broad product redesign this may be roughly 5–10 journeys; for a bounded feature it may be only 1–3.

Walk each journey as:

```text
open → orient → interpret → act → receive feedback → know it completed → continue
```

Inspect proportionately:

- first viewport / what is visible without navigation;
- context switches, navigation and scroll;
- fields/decisions/concepts introduced;
- information that must remain visible simultaneously;
- pending/loading/error states;
- vocabulary the person must understand;
- feedback and completion confidence;
- whether the default path still feels like the default path.

This is not a request to maximize screen density or minimize clicks mechanically. It is a check that the composed interaction still matches the real human job rather than the internal domain tree.

## Human product recheck before freeze

For material user-facing work, after spec/ticket synthesis and **before `EXECUTION_READY` / `READY_TO_LAUNCH`**, compare the proposed executable authority with the accepted interaction hypothesis.

Check:

- Does the default journey remain the default journey?
- Has domain topology leaked into navigation/screens/forms?
- Has technical completeness created extra equal-weight choices or concepts?
- Is progressive disclosure still protecting ordinary work?
- Does the representation still fit the phenomenon?
- Has the friction budget materially worsened?
- Is the information hierarchy still deliberate?
- Do the humanity-check questions still pass?

A material mismatch is **HUMAN STOP / product reconciliation** before execution. Do not ask an unattended implementation agent to redesign it.

## Through implementation and publication

Once frozen, `PRODUCT_FIDELITY_GATES_V1.md` preserves the accepted interaction/product authority through ticketization, representation changes, shared-seam propagation, hardening and composed-product closeout.

For material composed/rendered work, the existing Cora + human composed-product checkpoint includes a **composed human-task walkthrough** against the actual rendered/composed HEAD when practical. Re-run the important human journey(s): orientation, simultaneous information, action, feedback, completion, density and context switching. Technical correctness, exact domain representation and green tests do not override a material human-product mismatch.

## Scope

Apply this authority when a change materially creates, redesigns or re-composes a human-facing workflow/surface, or when a technically bounded change materially alters how a person finishes important work (for example an Export/Publish/Approval surface).

Do not impose a design ceremony on backend-only changes, invisible refactors, trivial copy fixes, deterministic bug repairs with no interaction change, or already-frozen bounded work whose accepted interaction authority remains sufficient.
