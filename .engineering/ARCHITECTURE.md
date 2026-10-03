# Architecture

## Current repository architecture

The repository has a merged GEF governance baseline, Next.js App Router runtime, strict TypeScript, CSS Modules/design tokens, automated CI/browser/a11y checks, Docker development environment, professional main ruleset and the production Precision Blades brand identity.

## M04 product architecture

M04 adds the first production 3D client island:

- Three.js through React Three Fiber.
- Drei only for narrowly justified helpers.
- Dynamically imported client-only hero scene.
- Server-rendered semantic hero and poster/static composition first.
- Capability-aware FULL / BALANCED / STATIC rendering.
- Selected Precision Blades SVG geometry reused as the source for the hero N, preferably through procedural shape extrusion when practical.
- Reusable living-environment motion/config boundary for later Home sections.
- No semantic content or critical control inside canvas.
- No provider-specific deployment coupling.

GSAP/ScrollTrigger remains optional for genuinely complex scroll choreography and should not be installed merely for basic motion.

## Rendering model

1. Server-render semantic page shell and critical visual structure.
2. Render a faithful hero poster/fallback immediately.
3. Resolve reduced-motion/WebGL/device capability without blocking content.
4. Lazy-load the 3D island when eligible.
5. Prepare scene off the critical content path.
6. Crossfade only after scene readiness.
7. Degrade permanently to STATIC if live scene initialization fails.
8. Pause/throttle nonessential scene activity while hidden.

## Quality tiers

- FULL: capable desktop/GPU, full chamber/N/network scene, bounded post/light effects and particles.
- BALANCED: reduced DPR, particle/effect density and scene complexity with the same composition.
- STATIC: poster/CSS/SVG only; mandatory for reduced motion, missing WebGL and clearly constrained contexts.

The site never requires FULL mode for content, navigation or conversion.

## Asset architecture

- Brand remains vector-first.
- Prefer procedural geometry for rings, rails, panels, globe/network and N extrusion where it reduces asset cost.
- Blender/glTF remains available for complex production assets when procedural construction is insufficient.
- Mesh/texture optimization uses glTF tooling, Meshopt and KTX2/Basis where applicable.
- Heavy assets and runtime are separately measurable and lazy.

## Data/backend/deployment boundary

V1 remains content-led. No database, CMS, auth or deployment provider is introduced by M04.
