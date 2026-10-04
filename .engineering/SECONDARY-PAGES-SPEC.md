# Secondary Pages Specification — M06

Status: CANONICAL M06 ROUTE / CONTENT SOURCE

## Program strategy

M06 is split into small independently auditable increments:

1. **M06A / WO-009** — shared secondary-page foundation + Technology + Solutions.
2. **M06B** — Research + Company.
3. **M06C** — Contact + final cross-route navigation/integration.

M06 is complete only after all admitted M06 sub-increments are independently approved and merged.

## Shared content principles

- English remains the canonical V1 website language.
- Copy must be concise, premium, technical and factual-safe.
- Public positioning may describe focus, intent, architecture and engineering approach.
- Do not invent customers, partners, projects, patents, awards, certifications, team size, founding history, statistics, geographic reach or guaranteed outcomes.
- Do not present design principles as externally validated performance claims.
- Secondary pages remain part of the same Nex Labs living technological world, but semantic content must never depend on animation, canvas or WebGL.

## Shared visual / interaction system

- Reuse the approved near-black / graphite / chrome / cold-white / cyan / electric-blue palette.
- Reuse existing design tokens and global header/footer.
- Secondary-page heroes should feel cinematic but lighter than the Home hero.
- Prefer CSS/SVG/HTML motifs, thin energy rails, restrained glow and depth.
- Do not add another WebGL scene for M06A.
- Do not add a new animation engine.
- Reduced motion must remove nonessential transitions/energy travel.
- Mobile adapts composition instead of shrinking desktop.
- No tiny HUD text that becomes unreadable on mobile.

## Navigation transition — M06A

Once Technology and Solutions routes exist:

- Brand/home link → `/`.
- Solutions → `/solutions`.
- Technology → `/technology`.
- Research → `/#research` until M06B.
- Company → `/#vision` until M06B.
- “Explore the next chapter” → `/#contact` until M06C.

The same destinations apply to header/footer where those links exist. Do not create links to unimplemented M06B/M06C routes.

---

# Technology — `/technology`

## Metadata

Title: `Technology | Nex Labs Technology`

Description: `Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems.`

## Hero

Eyebrow: `TECHNOLOGY`

Heading: `Systems designed to adapt.`

Lead:

`Nex Labs explores modular technology foundations that connect intelligence, data, interfaces and real-world integration without forcing every problem into the same architecture.`

Primary CTA: `Explore solutions` → `/solutions`

Secondary CTA: `Research on the Home` → `/#research`

## Platform foundation

Eyebrow: `PLATFORM FOUNDATION`

Heading: `A modular foundation.`

Body:

`Useful intelligent systems need more than a model. They need clear data boundaries, observable behavior, secure interfaces and integration paths that can evolve as the problem becomes better understood.`

### Architecture layers

1. **AI Models & Analytics** — `Reasoning, analysis and model capabilities selected to fit the problem rather than define it.`
2. **Data Infrastructure** — `Data flows and storage boundaries designed for observability, quality and responsible use.`
3. **Secure & Scalable Systems** — `System boundaries shaped around security, resilience and controlled growth.`
4. **Real-World Integration** — `Interfaces and integration layers that connect software decisions to real operating environments.`
5. **Interoperable Architecture** — `Components designed to communicate through clear contracts so systems can evolve without unnecessary coupling.`

## Architecture principles

Eyebrow: `DESIGN PRINCIPLES`

Heading: `Architecture follows evidence.`

Intro:

`The system should become more specific as evidence improves, not more complicated by default.`

Use these four principles:

- **Observable by default** — `Important behavior should be measurable enough to understand and improve.`
- **Secure boundaries** — `Security and failure containment belong in the system design, not at the end.`
- **Interoperable parts** — `Clear contracts make it easier to replace, extend and connect components.`
- **Human-operable systems** — `People need to understand what a system is doing, especially when conditions change.`

## Closing narrative

Heading: `From research to operating systems.`

Body:

`The technology layer exists to turn useful learning into systems that can be operated, inspected and adapted. The architecture stays modular so experiments can become dependable components without freezing the whole platform around one idea.`

CTA: `See how we frame solutions` → `/solutions`

## Visual motif

- monumental stacked cube/layer field derived from the approved secondary vocabulary;
- connected layer rails and nodes;
- no canvas/WebGL;
- one restrained brand-N echo, not a second hero monument;
- no fictional system diagrams labeled as deployed customer infrastructure.

---

# Solutions — `/solutions`

## Metadata

Title: `Solutions | Nex Labs Technology`

Description: `Explore the capability areas and engineering approach Nex Labs uses to frame intelligent systems around real constraints.`

## Hero

Eyebrow: `SOLUTIONS`

Heading: `Intelligence applied with intent.`

Lead:

`Nex Labs frames solutions around the problem, the operating environment and the people who need to use the system.`

Primary CTA: `Explore technology` → `/technology`

Secondary CTA: `Research on the Home` → `/#research`

## Capability areas

Eyebrow: `CAPABILITY AREAS`

Heading: `Different problems need different shapes.`

Use the same five factual-safe capability areas already approved on Home:

1. **Artificial Intelligence** — `AI-native systems designed around useful reasoning, automation and human-centered workflows.`
2. **Intelligent Infrastructure** — `Software and data foundations designed to support reliable, observable and adaptable intelligent systems.`
3. **Advanced Interfaces** — `Interfaces that make complex systems easier to understand, operate and collaborate with.`
4. **Sustainable Technologies** — `Technology concepts shaped by efficiency, responsible resource use and long-term operational thinking.`
5. **Research Platforms** — `Experimental environments for turning technical questions into testable systems and measurable learning.`

## Solution framing

Eyebrow: `HOW WE FRAME THE WORK`

Heading: `From question to working system.`

Use these four stages:

1. **Understand the constraints** — `Start with the real operating environment, users, risks and limits.`
2. **Model the system** — `Turn the problem into explicit data, workflow, interface and integration boundaries.`
3. **Prototype and measure** — `Test important assumptions before increasing complexity.`
4. **Integrate and observe** — `Connect the useful parts and retain enough visibility to learn from operation.`

## Integrity note

Heading: `Focus areas, not promises.`

Body:

`These pages describe areas Nex Labs focuses on exploring and engineering. They do not imply guaranteed outcomes, a client record or a one-size-fits-all architecture.`

CTA: `Explore the technology foundation` → `/technology`

## Visual motif

- evolve the five Home capability glyphs into a larger editorial field;
- use rails, nodes, glass/chrome surfaces and restrained energy response;
- no customer case studies or fabricated industry deployments;
- no WebGL scene.

---

# Reserved M06B / M06C destinations

The following routes remain planned but **not admitted by WO-009**:

- `/research`
- `/company`
- `/contact`

Their exact public copy, navigation switch and evidence obligations must be admitted by their own Work Orders. Do not implement placeholder routes for them in M06A.

## Contact boundary

Until M06C:
- do not add a contact form;
- do not invent an email address, phone number, office address or social account;
- keep the existing editorial `/#contact` destination;
- any later data submission path requires server-side validation, abuse/rate controls and explicit security scope.

## Forbidden public-proof language

Do not introduce:
- customer/client logos or names;
- partner claims;
- project/patent counts;
- team/founding/geographic claims without factual source;
- awards/certifications without factual source;
- “market leader”, “industry-leading” or similar unsupported superiority claims;
- guaranteed performance or business outcomes.
