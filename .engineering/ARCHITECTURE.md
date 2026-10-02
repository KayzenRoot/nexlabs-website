# Architecture

## Current repository architecture

The repository has a merged GEF Bootstrap 1.1.2 governance baseline. No website runtime is implemented yet.

## Target product architecture — accepted planning direction

The first implementation increment will use a browser-first React architecture with:

- Next.js App Router.
- TypeScript in strict mode.
- React Server Components by default; client components only where interaction requires them.
- CSS Modules plus a project design-token layer for high-fidelity control. No generic component theme or visual kit is allowed to dictate the brand.
- Three.js through React Three Fiber for isolated 3D scenes.
- Drei only for narrowly justified helpers.
- GSAP/ScrollTrigger for complex timeline choreography; ordinary UI hover/focus transitions remain CSS-first.
- Blender as the source tool for production 3D assets, exported as glTF/GLB.
- Mesh/texture optimization using glTF optimization tooling, Meshopt where appropriate and KTX2/Basis-compressed textures where supported.
- Dynamic import/code splitting for all heavy 3D code.
- Immediate poster-image fallback plus capability-aware quality tiers.

## Rendering model

1. Server-render semantic page shell and critical visual structure.
2. Render a faithful hero poster/fallback immediately.
3. Detect reduced-motion/device capability without blocking the shell.
4. Lazy-load the 3D client island.
5. Crossfade to the live scene only after required assets are ready.
6. Degrade gracefully to balanced/static modes when budgets are exceeded.

## Quality tiers

- FULL: capable desktop/GPU, full hero model, controlled lighting/post effects and particles.
- BALANCED: reduced geometry, texture resolution, post-processing and particle density.
- STATIC: poster or minimal CSS/SVG animation; required for reduced motion and very constrained devices.

The site must never require FULL mode for content, navigation or conversion.

## Logo architecture

The primary brand mark is vector-first SVG for reliability, accessibility and small-size clarity. Animated presentation may use CSS/SVG transforms and light/refraction effects. A WebGL logo variant is optional and must not be required for header rendering.

## Data and backend boundary

V1 is content-led and does not require a custom database. Contact handling and any future CMS are separate integration decisions. No backend service is selected by this planning increment.

## Deployment boundary

Provider selection remains deferred. Architecture must remain deployable on a mainstream Node/edge-capable platform without provider-specific product coupling.
