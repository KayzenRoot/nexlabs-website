# ADR-0004 — 3D and Motion Strategy

Status: ACCEPTED FOR V1 PLANNING

## Context

The selected Home concept depends on a cinematic chrome intelligence figure, but the site must remain fast and usable on constrained devices.

## Decision

- Author hero assets in Blender.
- Deliver optimized glTF/GLB.
- Render with Three.js through React Three Fiber in an isolated dynamically loaded client island.
- Use CSS for ordinary UI motion.
- Use GSAP/ScrollTrigger only for complex timeline and scroll choreography.
- Implement FULL, BALANCED and STATIC quality tiers.
- Render an immediate poster/static composition before live 3D is ready.
- Respect prefers-reduced-motion and never make canvas content essential.

## Asset optimization

- Reduce geometry/material count before export.
- Use efficient texture sizing and KTX2/Basis where appropriate.
- Use Meshopt or equivalent glTF optimization when it improves transfer/runtime cost.
- Keep production hero asset within the documented transfer budget unless benchmark evidence approves an exception.

## Interaction

Allowed:
- subtle idle deformation/movement;
- small pointer/camera parallax;
- controlled light/reflection passes;
- sparse particles/orbits;
- scroll-driven reveals.

Not allowed:
- endless product-spin behavior;
- aggressive camera travel;
- blocking intro/loading sequences;
- required motion for navigation/content.

## Failure behavior

If WebGL/asset load/performance capability is insufficient, remain in STATIC or BALANCED mode without breaking layout, CTAs or text.
