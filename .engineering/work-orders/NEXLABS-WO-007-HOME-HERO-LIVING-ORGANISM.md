# NEXLABS-WO-007 — M04 Home Hero 3D / Living Organism

Status: ADMITTED — READY FOR EXECUTOR

Risk class: HIGH-VISUAL / STANDARD-SECURITY

## OBJECTIVE

Implement the first production 3D experience of the Nex Labs Technology Home so it follows the owner-approved Home Visual Master as faithfully as practical while behaving like a living technological organism.

This increment owns the hero world and the reusable living-environment foundation only. It must preserve immediate semantic content, graceful fallbacks, accessibility and performance.

## CANONICAL VISUAL MASTER

Reference artifact:
- filename: `home_visual_master.jpg`
- dimensions: `1600x900`
- SHA-256: `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`

The exact approved image exists in the project design conversation. The executor should receive/import this exact file before pixel-level fidelity work and retain it under:

`.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg`

If the executor cannot access the exact binary, implementation may proceed from `HOME-VISUAL-MASTER-SPEC.md`, but the Evidence Bundle must mark pixel-level fidelity as PROVISIONAL until the hash-matching reference is available.

The final owner-approved N laboratory master supersedes the earlier chrome-humanoid concept as the primary Home composition. The earlier human-intelligence direction remains useful only as supporting atmosphere/human-centered intent.

## SCOPE

### 1. 3D/runtime architecture
- Add stable production releases of `three`, `@react-three/fiber` and narrowly justified `@react-three/drei` helpers.
- Keep all 3D code in a dynamically imported client island.
- Do not require 3D JavaScript for semantic content, navigation or CTAs.
- Do not add GSAP unless the executor demonstrates a concrete choreography need that cannot be achieved cleanly with CSS/R3F timing; if added, justify it in evidence.
- Do not introduce unrelated UI libraries.

### 2. Hero composition
Reproduce the visual hierarchy of the approved master:
- left editorial copy block;
- selected NEX LABS header identity;
- monumental 3D Precision Blades N as the hero object;
- luminous cylindrical/portal chamber around the N;
- dark research-laboratory environment with strong perspective;
- reflective or reflective-looking floor/platform;
- Earth/global-network hologram;
- restrained holographic display/panel depth;
- one human-scale silhouette/figure as a scale cue, not a focal character;
- cyan/electric-blue energy filaments and arcs connecting the environment;
- sparse violet highlights;
- thin architectural light rails and concentric rings.

Do not reproduce unverified numbers, partners, customer counts or unsupported claims visible in the concept art.

### 3. Production N geometry
- Use the production `NEX-N-A-PRECISION-BLADES` vector geometry as the 3D N source.
- The 3D object must read as the same mark as the flat SVG.
- Prefer procedural SVG/shape extrusion when it provides better size/performance than a GLB.
- If a GLB is introduced, retain the Blender/source-generation method and optimize the export; compressed hero GLB target remains <= 3 MB.

### 4. Living-organism behavior
Create a reusable environmental motion system that feels continuously alive but calm:
- slow traveling light across structural rails and N edges;
- independent low-amplitude energy filaments;
- restrained particles/depth motes;
- slow chamber pulse/energy circulation;
- subtle globe/network motion;
- pointer parallax limited to a few degrees/pixels;
- small camera breathing/idle movement;
- scroll-linked depth transition out of the hero;
- reactive illumination on hero/CTA proximity where inexpensive;
- no perpetual object spin and no aggressive camera movement.

The motion system should expose a small shared state/config boundary so later M05 sections can join the same “organism” without duplicating animation logic.

### 5. Capability tiers
Implement deterministic FULL / BALANCED / STATIC modes.

FULL:
- capable desktop/GPU;
- full chamber, N, globe, energy filaments, restrained particles and selected post/light effects;
- bounded DPR.

BALANCED:
- reduced DPR, particles, geometry/effect density and expensive shaders;
- preserve the same composition and N/chamber hierarchy.

STATIC:
- immediate poster/fallback;
- no WebGL requirement;
- mandatory for `prefers-reduced-motion: reduce`;
- use for unavailable WebGL and clearly constrained/save-data contexts;
- semantic content and CTAs remain fully usable.

Do not use fragile user-agent sniffing as the primary classifier.

### 6. Poster-first loading
- The static hero/fallback must appear immediately.
- When live 3D is eligible, lazy-load the 3D island after the semantic shell.
- Crossfade only when the scene is ready enough to avoid a flash/empty canvas.
- If 3D fails, retain the poster permanently and report the failure only to development diagnostics, not the user.
- Avoid layout shifts during poster → live transition.

### 7. Responsive behavior
Desktop:
- preserve the approved asymmetric left-copy / dominant-right-world composition.

Tablet:
- reduce chamber/environment complexity while keeping N dominance.

Mobile:
- poster-first or BALANCED/STATIC;
- hero copy and CTAs remain above/around the visual in a readable order;
- canvas must never monopolize viewport height or input;
- no horizontal overflow.

### 8. Testing and evidence
Retain:
- desktop 1440x900 screenshot;
- desktop 1600x900 screenshot aligned to the reference aspect;
- mobile 390x844 screenshot;
- STATIC/reduced-motion screenshot;
- FULL and BALANCED scene screenshots where available;
- reference overlay/difference or side-by-side fidelity evidence at 1600x900;
- WebGL failure/fallback evidence;
- capability-tier selection evidence;
- bundle/chunk size evidence;
- frame-time/FPS sampling on at least one capable desktop and one constrained/BALANCED profile.

### 9. Docker continuity
- Build/restart Docker as needed.
- End with the development site running and healthy at the documented host URL.
- Preserve HMR.
- Do not run `docker compose down` at normal completion.

## OUT OF SCOPE

- Final M05 capability/research/infrastructure section content.
- Secondary public pages.
- CMS/CRM/analytics.
- Contact backend.
- Authentication/database.
- Public deployment.
- Fabricated metrics/customer logos/partnerships.
- Full cinematic camera fly-through.
- Audio.
- WebGPU-specific renderer.
- Unrelated repository cleanup.

## FILES / SOURCES TO READ

1. `.engineering/CHECKPOINT.md` / `.engineering/CHECKPOINT.json`
2. `.engineering/HOME-VISUAL-MASTER-SPEC.md`
3. `.engineering/VISUAL-DIRECTION.md`
4. `.engineering/UI-UX.md`
5. `.engineering/BRAND-SYSTEM.md`
6. `.engineering/ARCHITECTURE.md`
7. `.engineering/REQUIREMENTS.md`
8. `.engineering/DEFINITION-OF-DONE.md`
9. `.engineering/TEST-BENCHMARK-PLAN.md`
10. `.engineering/DECISIONS-LEDGER.md`
11. `AGENTS.md`
12. active Context Lock
13. the exact approved Home Visual Master when supplied

## ARCHITECTURE RULES

- RSC semantic shell first.
- 3D isolated behind a dynamic client boundary.
- Three.js via React Three Fiber.
- Drei only for justified helpers.
- Static fallback is a first-class render mode, not an error screen.
- Production N geometry must trace the canonical Precision Blades identity.
- Keep scene state local and deterministic; do not create a general global store without need.
- Prefer procedural scene elements over large opaque assets where fidelity permits.
- Dispose geometries/materials/textures correctly.
- Bound device pixel ratio and particle counts.
- No content exists only inside canvas.
- No canvas intercepts keyboard navigation.

## PERFORMANCE TARGETS

Retain the existing initial-shell targets:
- LCP target <= 2.5 s representative profiles;
- CLS <= 0.10;
- INP <= 200 ms;
- initial route JS <= 220 KB gzip excluding lazy 3D chunks.

M04-specific:
- 3D code must be lazy and separately measurable;
- target lazy 3D JS <= 700 KB gzip unless evidence justifies a higher number;
- any production hero GLB <= 3 MB compressed;
- poster target <= 600 KB desktop and materially smaller mobile derivative;
- FULL DPR capped, normally <= 1.75;
- BALANCED DPR normally <= 1.25;
- no unbounded particle system or requestAnimationFrame loop outside the active scene;
- pause/throttle nonessential scene activity when document is hidden.

## ACCESSIBILITY

- Target WCAG 2.2 AA.
- Canvas is decorative unless a future interaction explicitly requires semantics.
- Hero text/CTAs remain semantic HTML.
- Reduced motion selects STATIC and disables nonessential motion.
- Focus states remain visible over the live visual.
- Respect color contrast in text/controls independent of background animation.

## ACCEPTANCE CRITERIA

1. Exact approved Home reference is retained or fidelity is explicitly marked PROVISIONAL with its expected SHA-256.
2. Three/R3F runtime is dynamically isolated from the semantic shell.
3. Static poster/fallback renders before live 3D and survives 3D failure.
4. FULL/BALANCED/STATIC tiers are deterministic and tested.
5. Reduced motion always selects STATIC or an equivalent no-motion path.
6. Production N geometry is visibly and structurally the selected Precision Blades mark.
7. Hero includes the N chamber, lab depth, global/network motif, scale figure and energy/light language required by the master.
8. Hero composition remains readable and usable at 390x844, 1440x900 and 1600x900.
9. No fake metrics/partners/customers from the concept art enter production copy.
10. No semantic content or CTA depends on canvas.
11. No unexpected horizontal overflow or browser console errors.
12. WebGL unavailable/failure path is tested.
13. Scene resources are disposed and nonessential animation throttles/pauses when hidden.
14. Existing lint/typecheck/unit/build tests pass.
15. Browser/a11y smoke passes.
16. New tests cover capability tier, reduced motion, fallback and basic scene-ready transition.
17. Dependency/security checks have no unresolved HIGH/CRITICAL finding.
18. Bundle/asset size evidence is retained.
19. Visual-fidelity evidence is retained against the approved master.
20. Docker is UP/healthy at stop.
21. CodeRabbit, CI, Browser Smoke, Socket and Sonar exact-head gates pass.
22. Independent exact-head audit returns APPROVED before merge.

## TESTS

Required:
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `npm audit --audit-level=moderate`
- `git diff --check`
- dependency/security/secret checks available in GitHub
- exact-head CI/Browser/CodeRabbit/Socket/Sonar checks
- Docker config/build/up/ps/log/health
- browser WebGL-off/failure test
- reduced-motion STATIC test
- responsive screenshots
- visual comparison against 1600x900 reference
- lazy-chunk and asset-size report

## DELIVERABLES

- 3D hero runtime and scene components;
- capability-tier selector;
- static poster/fallback pipeline;
- living-organism motion foundation;
- tests;
- reference/fidelity evidence;
- performance/bundle evidence;
- `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM-EVIDENCE.md`;
- updated proposed Checkpoint Delta;
- Docker left UP/healthy;
- PR updated and ready for independent review.

## REVIEW FORMAT

Brazilian Portuguese:
- base SHA / exact head;
- reference fidelity;
- scene architecture;
- capability-tier behavior;
- package/dependency changes;
- tests/build/browser/a11y;
- performance/bundle evidence;
- Docker status/URL;
- risks/deviations;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with M04 implementation and evidence complete, Docker UP/healthy and PR OPEN/READY FOR REVIEW. Do not merge. Do not begin M05 until M04 has independent exact-head approval and merge.
