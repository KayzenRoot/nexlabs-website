# Requirements

## Baseline

- Repository: KayzenRoot/nexlabs-website.
- GEF Bootstrap CLI remains pinned to @gef-bootstrap/cli@1.1.2.
- Product implementation follows governed Work Orders and exact-head review.
- Production identity is `NEX-N-A-PRECISION-BLADES`.

## Product requirements — Website V1

### Brand and Home visual fidelity

- The owner-approved `home_visual_master.jpg` (1600x900, SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`) is the primary Home visual target.
- This final N-centered laboratory composition supersedes the earlier chrome-humanoid concept as the Home layout/composition master.
- Preserve hierarchy, proportions, depth, dark palette, chrome/glass material language, restrained cyan/blue/violet illumination and premium spacing rather than merely borrowing the general style.
- The monumental Precision Blades N inside a luminous research-lab chamber is the hero focal point.
- The experience should feel like one living technological organism through subtle energy/light circulation, parallax and depth.
- A human figure remains a scale/human-centered cue, not a celebrity/character.
- The floating cube concept remains a secondary vocabulary for Technology/Infrastructure sections.
- UI icons should use a coherent 3D/glass/chrome family where visual cost is justified.
- No fake customer logos, partnerships, statistics or testimonials may be published.

### Information architecture

V1 planned public pages:
- Home
- Technology
- Solutions
- Research
- Company
- Contact

Careers is FUTURE until real openings/content exist.

Home planned sections:
1. Global header/navigation.
2. Cinematic hero with brand statement, two CTAs and hero 3D.
3. Capability cards.
4. Trust/credibility area using factual proof only.
5. Vision/mission narrative.
6. Technology/infrastructure preview using the cube visual language.
7. Research/innovation preview.
8. Contact/final CTA.
9. Footer.

### Interaction and motion

- Motion must be smooth, deliberate and low-frequency.
- No continuous N spin.
- Desktop-capable devices receive FULL 3D when quality checks pass.
- Balanced devices receive reduced geometry/effects.
- Low-power/mobile/reduced-motion contexts receive STATIC or reduced fallback preserving composition.
- 3D readiness must never block first meaningful paint.
- Keyboard focus, semantic navigation and prefers-reduced-motion are mandatory.
- Nonessential animation should pause/throttle when the document is hidden.

### Performance targets

- LCP target <= 2.5 s representative mobile/4G and desktop profiles.
- CLS <= 0.10.
- INP <= 200 ms.
- Initial route JS <= 220 KB gzip excluding lazy 3D/runtime chunks.
- 3D runtime must be code-split and loaded only where required.
- M04 lazy 3D JS target <= 700 KB gzip unless measured evidence justifies otherwise.
- Hero production GLB target <= 3 MB compressed if a GLB is used.
- Critical UI must remain usable before 3D initialization.

### Accessibility, security and privacy

- Target WCAG 2.2 AA.
- All interactive controls keyboard reachable with visible focus.
- Reduced motion must be respected.
- Canvas may not contain the only copy of meaningful content.
- No trackers/cookies by default.
- Contact form security remains a later increment.

### SEO and content integrity

- Semantic HTML and existing metadata remain valid.
- Structured Organization data only with factual information.
- Public copy must not claim customers, partnerships, capabilities, benchmarks or outcomes without approved factual sources.
- Concept-art numbers are not production facts.


### M06A secondary-page requirements

- M06 is executed as independently auditable sub-increments.
- M06A implements only `/technology` and `/solutions`.
- Exact route copy and metadata come from `.engineering/SECONDARY-PAGES-SPEC.md`.
- Direct route loads must have valid global navigation and skip-link/main behavior.
- Technology and Solutions must visually inherit the approved Home world without requiring another 3D scene.
- Secondary routes must not mount the Home HeroScene as page content.
- Research, Company and Contact routes remain unimplemented until their own Work Orders.
- No placeholder secondary routes are allowed.
- Route JS/performance remains within the existing V1 budgets.


### M06B secondary-page requirements

- M06B implements only `/research` and `/company` plus the exact route-transition updates admitted by WO-010.
- Exact Research/Company public copy and metadata come from `.engineering/SECONDARY-PAGES-SPEC.md`.
- Exact Home transition copy/destinations come from `.engineering/HOME-CONTENT-SPEC.md`.
- Research must describe method, exploration directions and evidence discipline without fabricated publications, patents, breakthroughs, customer deployments or research metrics.
- Company must describe purpose, principles and working model without fabricated team size, history, founding facts, offices, partners, awards, customers or milestones.
- Global Research and Company navigation moves to real routes only after those routes exist.
- Technology/Solutions and admitted Home Research CTAs move to `/research`.
- Contact remains `/#contact`; `/contact` must remain unimplemented until M06C.
- Research/Company must reuse the M06 secondary-page architecture and must not mount the Home HeroScene.
- Route JS/performance remains within existing V1 budgets.
- Home, Technology and Solutions regressions remain required.
