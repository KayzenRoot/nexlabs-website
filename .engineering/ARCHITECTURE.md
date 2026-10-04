# Architecture

## Current repository architecture

The repository has a merged GEF governance baseline, Next.js App Router runtime, strict TypeScript, CSS Modules/design tokens, automated CI/browser/a11y checks, Docker development environment, professional main ruleset and the production Precision Blades brand identity.

## Home architecture through M05

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

## M05 lower-Home architecture

M05 completes the Home below the M04 hero with server-rendered semantic sections, CSS Modules and decorative SVG/HTML. It adds no second WebGL scene, no animation framework, no global state store and no new dependency. All meaningful copy remains outside canvas and all pre-M06 navigation stays on implemented Home anchors.

## Data/backend/deployment boundary

V1 remains content-led through M06C. M06A, M06B and M06C are public read-only routes. M06C adds no form, input pipeline, contact backend, email provider, database, CMS, auth, analytics or deployment-provider coupling. Any future contact channel/submission path requires a separately admitted privacy/security boundary.


## M06 secondary-page architecture

M06 extends the App Router with real public secondary routes in small increments.

M06A rules:
- `/technology` and `/solutions` are Server Component routes by default.
- Shared secondary-page primitives may encapsulate layout/visual repetition but remain small and semantic.
- Page-specific atmosphere uses CSS/SVG/HTML and existing tokens.
- The Home Three/R3F scene remains isolated to Home; secondary routes must not mount or eagerly load it.
- Header/footer become route-aware with real absolute site paths so direct route loads never contain dead local anchors.
- Until later M06 increments exist, Research, Company and next-chapter navigation returns to the corresponding implemented Home sections.
- No global client state, UI framework, animation engine, database, CMS, auth or provider coupling is introduced by M06A.


## M06B Research + Company architecture

- `/research` and `/company` are Server Component routes by default.
- Reuse/generalize the M06A secondary-page composition primitives rather than introducing a parallel system.
- Research/Company decorative atmosphere remains CSS/SVG/HTML; no page-specific canvas or second Three/R3F runtime.
- Research visual language uses branching signal/evidence topology, not simulated publication dashboards.
- Company visual language uses measured alignment/principle geometry, not fabricated team/office/timeline media.
- Global navigation transitions Research and Company to real absolute routes only after both routes exist.
- Existing Technology/Solutions research CTAs and exact admitted Home Research links may transition to `/research`.
- The global next-chapter destination remains `/#contact` until M06C.
- No global client state, UI framework, animation engine, database, CMS, auth, analytics or provider coupling is introduced by M06B.


## M06C Contact architecture
- `/contact` is a Server Component route by default.
- Reuse M06 secondary-page primitives.
- CSS/SVG/HTML atmosphere only; no second Three/R3F runtime.
- No form/data-entry/submission endpoint/mailto/tel/CRM/email provider/database/analytics.
- Header/footer action becomes `Contact Nex Labs` → `/contact`; primary nav remains four items.
- Home keeps `#contact` for old deep links while final CTA transitions to `/contact`.
- M06C closes Secondary Pages; deployment/hardening remains M07.


## M07A release-hardening architecture

- Development Docker remains `Dockerfile` + `compose.yaml` and is not repurposed as production runtime.
- Production readiness uses a separate standalone/minimal container path.
- Production response headers are configured centrally and tested in production mode.
- Pre-launch indexing is intentionally disabled until a verified production origin is admitted.
- Public failure paths are branded and safe; no internal error detail is exposed.
- Release-readiness CI validates artifacts locally and never deploys.
- Production provider/origin/DNS/TLS remain M07B concerns.
- The Home Three/R3F client island architecture remains unchanged.


## WO-013 visual-fidelity architecture

- The approved Home architecture remains one lazy React Three Fiber / Three.js client island.
- WO-013 enriches that existing scene through procedural geometry/material/light composition rather than adding a second runtime.
- FULL/BALANCED/STATIC remain mandatory and compositionally aligned.
- Semantic content and critical interactions remain outside canvas.
- Header/mobile navigation may use a small isolated client interaction component for current-route/menu state; no global state library.
- Secondary pages remain server-rendered semantic content and may use CSS perspective, SVG/HTML layers and narrowly scoped client motion only when justified.
- Precision Blades canonical vector geometry is immutable; only presentation/material may change.
- The approved master remains evidence-only and cannot be served as production artwork.
- M07A security headers, indexing posture, standalone candidate and Release Readiness remain architecture constraints.
