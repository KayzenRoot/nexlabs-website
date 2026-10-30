# Visual Fidelity Delta Specification — WO-013

Status: CANONICAL WO-013 VISUAL IMPLEMENTATION SOURCE

## Reference identity

Primary reference asset:
`.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg`

- Canonical pixel size: 1600 × 900.
- Canonical SHA-256: `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.
- Git blob at WO-013 admission base: `52932511adfeb8d372717185fe9a18907625cc0c`.
- Owner status: APPROVED visual/composition master.
- Role: composition, atmosphere, depth, material, navigation and iconographic art-direction target.

The master is **not** a factual business source.

The runtime MUST NOT:
- use the master JPG as a page/background image;
- crop or extract visual regions from the master for production UI;
- reproduce unsupported numbers, partners, products, social proof, search behavior or social links shown only in the concept;
- hide a screenshot of the master behind live content to simulate fidelity.

## Goal

The current site has the correct identity and architecture but insufficient visual fidelity. WO-013 must materially close the gap in:
- 3D depth and scale;
- N/chamber composition;
- lighting/material response;
- Earth/network and holographic panels;
- floor/platform depth;
- living-organism energy continuity;
- menu/navigation sophistication;
- proprietary 3D/holographic iconography;
- Home lower-world continuity;
- secondary-page depth and motion.

The result should feel like one premium research-laboratory organism, not a generic collection of dark cards.

## Fidelity priorities

### Priority 1 — mandatory

1. **Composition / hierarchy**
   - Desktop 1600×900 hero keeps editorial copy primarily in x≈5–35%.
   - Dominant visual world begins around x≈32% and extends right.
   - Monumental Precision Blades N is visually centered around the central-right chamber and is unmistakably the hero object.
   - Header visually belongs to the same world.

2. **N / chamber / material / light**
   - N reads as dimensional chrome/silver, not a flat extruded logo.
   - Chamber reads as cylindrical volume with layered top/bottom rings, vertical energy rails/columns, axial illumination and surrounding depth.
   - Controlled cold-white highlights, cyan/electric-blue energy and restrained violet remain dominant.

3. **One-world continuity**
   - Hero, capability band, Research and Technology appear connected through rails, energy, atmosphere, framing and depth.
   - Avoid obvious template-section seams.

### Priority 2 — mandatory

4. **Earth / network / panels / human scale**
   - Hero includes a convincing network/globe language and a larger right-side Earth/network presence.
   - Restrained holographic information panels exist as atmosphere only.
   - A human-scale silhouette/object remains present to establish scale without becoming a character/celebrity.

5. **Floor / platform**
   - Concentric platform/ring perspective clearly guides the eye to the chamber.
   - FULL mode should show a convincing metallic/glass laboratory-floor illusion using existing Three.js capabilities.
   - Do not add a post-processing dependency solely for reflections.

6. **Header / navigation**
   - Desktop navigation receives refined route-active state, energy rail/indicator, premium hover/focus response and better material treatment.
   - Contact remains the differentiated CTA.
   - Do not add a fake Search control merely because the concept includes one.
   - Mobile must replace the current horizontal-scroll feeling with a deliberate accessible menu/panel experience.

7. **Capability objects**
   - Five capability motifs become proprietary holographic objects:
     - AI: neural/brain lattice;
     - Infrastructure: luminous stacked layers;
     - Interfaces: network globe/interface core;
     - Sustainable: energy torus/ring;
     - Research: crystalline research form.
   - Do not use generic icon-library glyphs, emojis or copied master pixels.

### Priority 3 — polish

8. richer HUD lines, nodes and framing;
9. light sweeps and localized reactive illumination;
10. fine particles and low-amplitude parallax;
11. footer/header micro-detail where factual links exist.

Priority 3 must never sacrifice accessibility, performance or Priority 1.

## Home 3D architecture

- Keep one lazy React Three Fiber / Three.js client island on Home.
- Prefer procedural geometry already supported by `three`.
- No new 3D/rendering dependency by default.
- Keep the canonical Precision Blades vector geometry unchanged.
- Presentation/material may become richer; brand geometry may not be redesigned.
- FULL gets the richest spatial detail.
- BALANCED retains the same composition with reduced geometry/particle/light cost.
- STATIC remains poster/CSS/SVG and preserves hierarchy/atmosphere.
- The selected N never continuously spins.
- No semantic copy or critical control exists only in canvas.

Recommended scene layers:
1. environment/floor;
2. chamber shell/rings/rails;
3. monumental N;
4. Earth/network;
5. holographic panels;
6. human scale cue;
7. energy circulation;
8. bounded particles/light accents.

## Living-organism motion

Motion should resemble circulation in a machine:
- travelling light along energy curves and structural edges;
- slow rail/ring pulses;
- subtle network/globe evolution;
- slight environment breath;
- pointer parallax limited to a few pixels/degrees;
- scroll-linked depth/reveal that never hijacks scroll;
- local button/card illumination;
- no aggressive camera travel, constant spin, noisy glitch or animation on every surface.

Reduced motion:
- disables nonessential circulation/parallax/reveal;
- preserves static composition and hierarchy;
- never hides content.

## Navigation design

### Desktop
- retain NEX LABS lockup left;
- primary navigation remains factual existing routes only;
- active route must be visually clear and expose `aria-current="page"`;
- hover/focus may use a thin cyan rail, localized glow and controlled chrome highlight;
- Contact CTA remains separately emphasized;
- far-right innovation/intelligence/real-world-impact microcopy may remain where space allows;
- no fake search.

### Mobile
Implement a deliberate compact menu:
- explicit menu trigger with accessible name and minimum practical touch target;
- `aria-expanded` and `aria-controls`;
- panel/drawer/sheet visually aligned to the laboratory language;
- all existing routes + Contact reachable;
- active route visibly identified;
- Escape closes when open;
- focus remains usable and visible;
- no horizontal-scroll-only navigation;
- reduced-motion-safe open/close behavior.

No external menu library.

## Secondary pages

Technology, Solutions, Research, Company and Contact remain semantic Server Component content by default.

They may gain:
- layered SVG planes;
- CSS perspective/transforms;
- controlled parallax through small isolated client helpers only if justified;
- luminous rails, chrome/glass edges, depth shadows and richer holographic motifs;
- section-to-section energy continuity.

They MUST NOT:
- mount Home HeroScene;
- add a second R3F/Three canvas;
- change approved copy/claims;
- introduce data collection.

## Fidelity score

Executor proposes a score; independent auditor confirms or overrides it.

| Criterion | Weight |
| --- | ---: |
| Hero composition & hierarchy | 20 |
| N / chamber / material / lighting | 20 |
| Earth / network / floor / panels / human scale | 15 |
| Header / navigation / mobile menu | 10 |
| Capability iconography & card objects | 10 |
| Lower Home one-world continuity | 10 |
| Secondary-page depth / consistency | 5 |
| Motion / living-organism behavior | 5 |
| Responsive / accessibility / STATIC fidelity | 5 |
| **Total** | **100** |

Approval gate:
- independent final score >= 85/100;
- Hero composition >= 15/20;
- N/chamber/material/lighting >= 15/20;
- no Priority-1 criterion may be judged materially regressed;
- all non-visual acceptance gates still pass.

A score is not a substitute for evidence or owner feedback.

## Deterministic visual evidence

Required candidate captures:
- Home 1600×900 hero;
- Home 1440×900 hero;
- Home FULL scene at 1600×900;
- Home BALANCED scene;
- Home STATIC / WebGL fallback;
- Home full-page desktop;
- Home 390×844;
- Home reduced-motion;
- header desktop active-state;
- mobile menu closed/open;
- five capability-object detail capture;
- lower Research/Technology continuity;
- Technology, Solutions, Research, Company and Contact at 1600×900;
- representative mobile secondary page.

Evidence must also create comparison composites:
- `master-vs-candidate-hero.png`;
- `master-vs-candidate-header.png`;
- `master-vs-candidate-capabilities.png`;
- `master-vs-candidate-lower-home.png`.

These may be created with an evidence-only Playwright page/script using existing tooling. The master must not be exposed by production routes.

## Performance floor

WO-013 may enrich visuals but may not weaken M07A performance policy.

Required:
- representative Home mobile LCP <= 2500 ms;
- CLS <= 0.10;
- interaction proxy <= 200 ms;
- initial route JS <= 220 KiB gzip excluding lazy 3D chunks;
- Home lazy 3D remains <= existing 700 KiB gzip target;
- non-Home routes do not load Home 3D chunks;
- final candidate repeats the M07A performance proof: three consecutive full production-candidate browser suites, retries=0, all tests green, Home mobile LCP <=2500 ms each.

Do not raise budgets to approve visual work.

## Anti-patterns

Do not:
- turn the page into a gaming/cyberpunk HUD wall;
- flood surfaces with bloom/glow;
- animate every line/icon;
- hide text contrast behind visual effects;
- introduce fake metrics, search, socials, partners, customers or outcomes;
- add a second WebGL runtime;
- use the master itself as runtime art;
- replace fidelity with a generic gradient/card redesign;
- compromise M07A CSP/container/readiness behavior.

## Final acceptance

WO-013 is not visually complete because code exists. It is complete only after:
- deterministic evidence exists;
- executor proposed fidelity score exists;
- independent audit confirms >=85/100;
- regression/performance/security gates pass;
- owner-directed fidelity goals are materially represented.
