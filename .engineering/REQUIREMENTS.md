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


### M06C Contact + final integration requirements
- Implement only read-only `/contact` plus exact final navigation/Home transitions admitted by WO-011.
- Exact Contact copy/metadata comes from SECONDARY-PAGES-SPEC.md.
- Exact Home final CTA comes from HOME-CONTENT-SPEC.md.
- Contact must not collect or transmit personal information.
- No form/input/upload/submit/API/server action/mailto/tel/invented channel.
- No CRM/newsletter/database/auth/analytics.
- Header/footer action becomes `Contact Nex Labs` → `/contact` on all six routes.
- Home `#contact` remains for backward-compatible deep links.
- Contact reuses M06 architecture and must not mount Home HeroScene.
- All six routes remain regression-protected.
- D-0008 remains permanently binding.


### M07A release-hardening requirements

- Implement RELEASE-READINESS-SPEC.md exactly within WO-012.
- Production responses must expose the approved minimum security headers/CSP.
- Development Docker must remain usable and separate from production runtime.
- Global pre-launch posture is noindex/nofollow with robots disallow.
- No sitemap/canonical production URL before M07B.
- Provide branded 404 and safe error recovery.
- Add a minimal non-root standalone production container candidate.
- Add exact-head Release Readiness validation with no deploy/secrets.
- Preserve six-route content, Contact zero-collection and Home 3D architecture.
- Retain container rollback rehearsal evidence.
- Do not deploy publicly in M07A.


### WO-013 Visual Fidelity / Master Alignment requirements

- Treat the approved 1600×900 master and HOME-VISUAL-MASTER-SPEC.md as binding visual composition targets.
- Materially improve Home 3D depth, N/chamber prominence, lighting, floor/platform, Earth/network, panels and human scale.
- Materially improve living-organism energy continuity, premium navigation/menu interactions and proprietary capability iconography.
- Preserve factual copy and do not reproduce unsupported concept metrics/search/social proof.
- Never use the master JPG/crops as production UI.
- Keep one Home R3F runtime only; secondary pages remain free of Home 3D runtime.
- Keep Precision Blades core vector geometry unchanged.
- Desktop navigation must expose route-active state; mobile navigation must be deliberate, accessible and not horizontal-scroll-only.
- Preserve FULL/BALANCED/STATIC, poster-first, reduced-motion and WebGL fallback.
- Preserve M07A hardening, Contact zero-collection and all route semantics.
- No dependency addition by default.
- Maintain existing performance budgets; final candidate requires three consecutive retries=0 full-suite passes at Home mobile LCP <=2.5 s.
- Visual completion requires independent fidelity score >=85/100 using VISUAL-FIDELITY-DELTA-SPEC.md.


### WO-013 local visual asset pipeline requirements

- Bootstrap a reproducible local ComfyUI + Blender authoring pipeline before the next visual-fidelity correction pass.
- Target Windows + RTX 5050 8 GB; detect actual hardware before selecting model/runtime profile.
- ComfyUI must bind localhost only and expose its local API for deterministic workflow execution.
- Blender automation must use background Python API by default.
- Official Blender MCP may not be enabled by default; any use requires explicit isolation because upstream warns it executes LLM-generated code without guards.
- Keep model weights/raw renders outside Git and record model source, revision, SHA-256 and license.
- Install at least one commercially usable image model that passes an 8 GB smoke generation.
- SDXL is the required baseline; FLUX.2 Klein 4B FP8 is optional after automated memory smoke test; FLUX.1 dev is excluded by default because of non-commercial weight license.
- No unreviewed third-party ComfyUI custom node.
- Pipeline outputs are candidate assets only until selected, optimized and reviewed.
- Tooling must not weaken M07A/WO-013 performance, CSP, security or public factual boundaries.


### WO-013 temporary Vercel pre-launch requirements

- Owner explicitly authorizes a public temporary Vercel deployment before final visual acceptance solely to support Anthropic/company registration.
- This temporary deployment does not satisfy M07B and does not relax the final WO-013 >=85/100 visual gate.
- Every route must show: `PRE-LAUNCH — This website is still in production and is not yet final.`
- Banner must be visible/responsive/non-dismissible and must not obstruct navigation/content.
- Vercel target is the already linked `nexlabs-website` project under the owner team.
- Keep noindex/nofollow, robots disallow, no sitemap and no analytics.
- No custom domain or DNS change is required for the temporary deployment.
- Live Vercel smoke must verify all six routes, branded 404, banner, indexing posture, navigation and Contact zero-collection.
- PR #20 remains open after deployment; deployment success does not authorize merge/checkpoint promotion.
