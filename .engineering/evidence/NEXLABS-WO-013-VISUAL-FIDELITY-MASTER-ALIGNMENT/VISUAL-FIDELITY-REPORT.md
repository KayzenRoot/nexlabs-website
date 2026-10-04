# WO-013 Visual Fidelity Report

**Status:** Executor proposal — review required
**Proposed score:** **73/100**
**Work Order:** `NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT`
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Implementation/test anchor:** `c860171d8aa45c04032c2605934e82e1a09079d4`
**Deterministic Browser Smoke fixture:** `8ac950e`
**Master:** Git blob `52932511adfeb8d372717185fe9a18907625cc0c`; SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.

The score is an executor proposal based on the retained deterministic comparisons. It is not an independent audit or owner acceptance. The independent approval gate remains **PENDING** and requires at least 85/100, with Hero Composition and N/Chamber/Material each at least 15/20.

## Proposed score

| Criterion | Score | Evidence and rationale |
| --- | ---: | --- |
| Hero composition & hierarchy | 16/20 | Text-led left column, centered monumental N, layered chamber, floor plane and right-side information panels move the composition toward the master. Candidate still has substantially less scene density and photographic depth. See `master-vs-candidate-hero.png`. |
| N / chamber / material / lighting | 15/20 | Uses the unchanged approved Precision Blades N geometry with a brighter chrome face, blue edge light, cylinder rails and concentric platform. Reflections and cylindrical enclosure remain simpler and darker than the master. |
| Earth / network / floor / panels / human scale | 12/15 | Adds an Earth/network globe, holographic panels, floor grid, energy paths, particles and a scale silhouette. Their form and placement are original authored geometry, with less detail and scale than the master. |
| Header / navigation / mobile menu | 8/10 | Route-aware active state, illuminated hover/focus, compact mobile panel, Escape close and focus restore. The selected routes do not include the master’s unverified Products/Search/social destinations. See `master-vs-candidate-header.png` and the mobile menu captures. |
| Capability iconography & card objects | 7/10 | Five custom geometric capability objects replace generic icons. They remain more schematic than the detailed luminous objects in the master. See `master-vs-candidate-capabilities.png`. |
| Lower Home one-world continuity | 7/10 | Research and Technology sections now share blue rails, atmospheric SVG layers and depth cues. The master’s expansive lab/world imagery and large technology stack are not reproduced. See `master-vs-candidate-lower-home.png`. |
| Secondary-page depth / consistency | 4/5 | CSS/SVG atmosphere and material treatments are shared across all five internal routes; no second WebGL runtime was added. |
| Motion / living-organism behavior | 4/5 | Controlled pointer parallax, scroll-linked reveals and subtle signal movement are reduced-motion aware; STATIC and failure fallback remain available. |
| Responsive / accessibility / STATIC fidelity | 4/5 | 320–1600px layouts, accessible mobile menu, keyboard focus, reduced motion and poster-first STATIC behavior pass the retained checks. |
| **Total** | **73/100** | **Proposed; independent auditor owns the final score.** |

## What moved closer to the master

- The Home now places the approved N inside a dimensional cylindrical chamber with concentric rings, an illuminated floor/platform, network globe, side panels, human-scale cue, energy filaments and particles.
- Hand-authored responsive posters preserve the same scene concept before WebGL loads and for STATIC/reduced-motion paths.
- The header exposes actual route state; the mobile navigation has keyboard-operable open/close behavior and visible active state.
- Five capability cards have distinct authored holographic objects. Research and Technology add lower-Home world continuity, and secondary pages share restrained atmospheric depth.

## Remaining differences and reasons

- The approved master is a dense, photoreal cinematic composition. The candidate uses original SVG/CSS/Three geometry and therefore has less texture, environmental reflection, fine-grain detail and visual density. This is intentional: the master image and all crops remain evidence-only and are not runtime assets.
- The candidate retains canonical site copy and admitted destinations. It does not add the master’s Products route, search behavior, video behavior, social links, fabricated metrics or unverified claims.
- The Earth, human silhouette, capability objects and lower-page environments remain simplified compared with the master. Increasing their authored detail is the principal visual correction area indicated by this proposal.
- Local WebGL frame measurements used Chromium SwiftShader software rendering. They prove quality-tier behavior and test fallbacks but do not qualify a physical GPU’s frame rate.

## Evidence references

- Master comparisons: `master-vs-candidate-hero.png`, `master-vs-candidate-header.png`, `master-vs-candidate-capabilities.png`, `master-vs-candidate-lower-home.png`.
- Scene modes: `home-full-3d-1600x900.png`, `home-balanced-3d-900x768.png`, `home-static-reduced-motion-1440x900.png`, `home-webgl-context-loss-fallback-1600x900.png`.
- Responsive/menu: `candidate-home-390x844.png`, `mobile-menu-closed-320x844.png`, `mobile-menu-open-320x844.png`, `mobile-menu-active-company-390x844.png`, `research-mobile-390x844.png`.
- Performance: `candidate-performance-variance.json` and the three retained production candidate run folders.

**Decision:** visual score remains PROPOSED. Do not treat WO-013 as visually approved, do not promote the checkpoint and do not begin M07B until the independent audit and owner acceptance gates are resolved.
