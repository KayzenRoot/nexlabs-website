# Requirements

## Baseline

- Repository: KayzenRoot/nexlabs-website.
- GEF Bootstrap CLI remains pinned to @gef-bootstrap/cli@1.1.2.
- Product implementation follows governed Work Orders and exact-head review.

## Product requirements — Website V1

### Brand and visual fidelity

- The selected chrome-humanoid homepage concept is the Visual Master for V1.
- The implementation must preserve the reference hierarchy, proportions, depth, dark palette, glass/plasmorphism, restrained blue/cyan/violet illumination and premium spacing rather than merely borrowing the general style.
- The experience must communicate advanced AI/engineering capability without reading as a gaming UI or generic template.
- The primary hero object must feel alive through subtle 3D motion, lighting, parallax and scroll choreography.
- The second approved cube concept is reserved as a visual language reference for infrastructure/technology sections rather than the Home hero.
- The brand mark must be a proprietary-looking N monogram with a clean static vector form and a restrained animated presentation.
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

- Motion must be smooth, deliberate and low-frequency; no continuous distracting spin.
- Desktop-capable devices receive full 3D when quality checks pass.
- Balanced devices receive reduced geometry/effects.
- Low-power/mobile/reduced-motion contexts receive a static or lightly animated fallback preserving composition.
- 3D readiness must never block first meaningful paint; a poster/fallback renders immediately and crossfades to the live scene when ready.
- Keyboard focus, semantic navigation and prefers-reduced-motion are mandatory.

### Performance targets

Initial engineering targets, to be validated and adjusted with benchmark evidence:
- LCP target <= 2.5 s on representative mobile/4G and desktop test profiles.
- CLS target <= 0.10.
- INP target <= 200 ms.
- Initial route JS target <= 220 KB gzip excluding lazy 3D/runtime chunks.
- 3D runtime must be code-split and loaded only where required.
- Hero production GLB target <= 3 MB compressed for the full desktop tier; balanced/fallback tiers must be materially smaller or avoid the model.
- Critical UI must remain usable before 3D initialization completes.

### Accessibility, security and privacy

- Target WCAG 2.2 AA for public interactive UI.
- All interactive controls must be keyboard reachable and have visible focus states.
- Motion reduction must be respected.
- Contact form, when implemented, requires server-side validation, rate limiting and anti-spam controls.
- Do not add trackers/cookies by default. Any analytics must be separately approved with privacy impact documented.

### SEO and content integrity

- Semantic HTML, metadata, canonical URLs, Open Graph, sitemap and robots support are required before production release.
- Structured Organization data may be used only with factual company information.
- Public copy must not claim customers, partnerships, capabilities, benchmarks or outcomes without an approved factual source.
