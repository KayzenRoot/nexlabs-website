# NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT — Visual Fidelity Restoration / Master Alignment

Status: CORRECTION REQUIRED — DESIGN DIRECTOR HARNESS ADMITTED

Risk class: ELEVATED

## OBJECTIVE

Bring the Nex Labs website materially closer to the owner-approved Home Visual Master, with stronger real-time 3D depth, lighting, chamber composition, living-organism effects, premium navigation and proprietary holographic iconography, while preserving approved content, accessibility, fallback tiers, M07A hardening and performance budgets.

Codex is the implementation executor.

## CONTEXT

M07A Release Hardening & Production Readiness is APPROVED/MERGED and checkpoint-promoted.

Admission base main SHA: `e14cfbe4660b076db85e7e529befffe17a098cd1`.

Owner visual acceptance is PENDING because the current implementation is not sufficiently faithful to the approved master.

Primary master:
- path: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg`;
- Git blob: `52932511adfeb8d372717185fe9a18907625cc0c`;
- canonical SHA-256: `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`;
- 1600×900.

Canonical implementation requirements are in `.engineering/VISUAL-FIDELITY-DELTA-SPEC.md`.

## SCOPE

### A. Home Hero master alignment
Upgrade the existing single Home R3F scene:
- monumental dimensional chrome Precision Blades N;
- richer cylindrical chamber;
- layered concentric rings and vertical/axial energy structures;
- stronger cold-white/cyan lighting and controlled material reflections;
- convincing platform/floor depth;
- larger Earth/network language;
- layered holographic panels;
- improved procedural human-scale cue;
- denser but bounded energy filaments/particles;
- one-world atmosphere.

Do not change canonical N vector geometry.

### B. FULL / BALANCED / STATIC
- FULL: richest approved scene;
- BALANCED: same hierarchy/composition at reduced cost;
- STATIC: high-quality poster/CSS/SVG hierarchy;
- preserve poster-first crossfade, scene failure handling and context-loss fallback.

### C. Living organism
Improve environmental circulation across Hero, capabilities and lower Home:
- travelling light;
- energy continuity;
- controlled parallax;
- low-frequency idle motion;
- scroll-linked depth/reveal;
- local button/card illumination.

No aggressive camera travel or continuous N spin.

### D. Header / navigation / menu
Desktop:
- premium integrated glass/chrome/cyan treatment;
- clear route-active state with `aria-current`;
- refined hover/focus energy rail;
- Contact CTA remains differentiated;
- no fake Search.

Mobile:
- replace horizontal-scroll-only navigation with an accessible deliberate menu/panel;
- trigger + `aria-expanded` + `aria-controls`;
- current route state;
- Escape close;
- visible focus;
- route + Contact access;
- reduced-motion-safe behavior.

No navigation dependency.

### E. Capability iconography
Replace/refine flatter motifs with custom proprietary holographic objects for:
1. AI neural lattice;
2. Infrastructure stacked layers;
3. Advanced Interfaces network globe;
4. Sustainable Technologies energy torus;
5. Research Platforms crystalline research form.

Use authored SVG/CSS/HTML/Three geometry. No generic icon library, emoji or master-image crop.

### F. Lower Home continuity
Raise Research and Technology visuals toward the master:
- Research: laboratory/global-network depth and human-scale atmosphere;
- Technology: luminous layered/cube/platform vocabulary;
- energy/rail continuity so these sections inhabit the same world.

Preserve canonical copy.

### G. Secondary-page refinement
Technology, Solutions, Research, Company and Contact may receive richer:
- CSS perspective;
- multilayer SVG;
- chrome/glass edges;
- energy rails;
- restrained depth/motion.

No second WebGL/Three scene and no copy changes.

### H. Footer refinement
May refine material, separators, hover/focus and visual continuity without adding unverified social links or changing navigation facts.

### I. Deterministic visual evidence
Produce every capture/comparison required by VISUAL-FIDELITY-DELTA-SPEC.md.

Create:
- `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT-EVIDENCE.md`;
- `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/VISUAL-FIDELITY-REPORT.md`;
- `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/**`;
- proposed Checkpoint Delta.

Executor proposes the visual score; auditor owns final score.

### J. M07A regression protection
Preserve:
- CSP/security headers;
- noindex/robots pre-launch posture;
- branded failure paths;
- production standalone container;
- Release Readiness;
- Contact zero-collection;
- rollback/readiness architecture;
- package manifests.

### K. Docker continuity
At stop:
- development Docker UP/healthy;
- all six routes HTTP 200;
- production candidate can be used for final performance/evidence and then stopped without touching development Compose.

## OUT OF SCOPE

- M07B final launch / custom-domain launch; temporary Vercel pre-launch is now a separately governed owner-authorized exception;
- provider, production URL, domain/DNS/TLS/HSTS;
- index enablement/sitemap/canonical origin;
- analytics/trackers;
- Contact submission/data collection;
- copy/content/claims changes;
- brand geometry redesign;
- search implementation;
- unverified social links;
- new npm dependency unless STOP/re-admission proves it NECESSARY;
- second WebGL/R3F runtime on secondary pages;
- GSAP/animation framework addition;
- WebGPU migration;
- unrelated cleanup;
- force-push/rebase/history rewrite;
- weakening M07A security or test gates.

## FILES / SOURCES TO READ

1. CHECKPOINT.md / CHECKPOINT.json
2. VISUAL-FIDELITY-DELTA-SPEC.md
3. HOME-VISUAL-MASTER-SPEC.md
4. exact approved master JPG
5. VISUAL-DIRECTION.md
6. UI-UX.md
7. BRAND-SYSTEM.md
8. HOME-CONTENT-SPEC.md
9. SECONDARY-PAGES-SPEC.md
10. SCOPE.md
11. DEFINITION-OF-DONE.md
12. ARCHITECTURE.md
13. REQUIREMENTS.md
14. SECURITY.md
15. RELEASE-READINESS-SPEC.md
16. TEST-BENCHMARK-PLAN.md
17. DEPLOYMENT.md
18. DECISIONS-LEDGER.md
19. AGENTS.md
20. active Context Lock `.engineering/context-locks/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT.json`
21. current Home/Header/Footer/SecondaryPage/quality-tier code and tests.
22. DESIGN-DIRECTOR-HARNESS.md

## REQUIREMENTS

- Implement exactly WO-013.
- Master fidelity is a product acceptance requirement.
- Copy and public facts remain unchanged.
- GEF CLI remains 1.1.2.
- Package manifests remain unchanged.
- No dependency addition.
- One Home R3F/Three client island only.
- Secondary routes remain free of Home 3D runtime.
- Precision Blades core vector geometry remains unchanged.
- Keep M07A hardening operational.
- Maintain performance budgets without relaxation.

## ARCHITECTURE RULES

- Next.js App Router + strict TypeScript.
- Server Components for semantic content by default.
- Existing CSS Modules/design tokens.
- Home R3F is lazy and non-critical.
- Prefer procedural geometry and existing Three.js.
- New visual helpers must be narrowly scoped.
- Client code only where interaction/motion requires it.
- Decorative elements aria-hidden.
- Clean up listeners/RAF/resources.
- Respect document visibility and reduced motion.
- No global state store.
- No master image in production UI.

## CONSTRAINTS

If CHECKPOINT, Scope, DoD, Architecture, Requirements, Security, Visual Fidelity Spec, Home Visual Master Spec, Visual Direction, UI/UX, Brand System, Home/Secondary content specs, Work Order, master asset, package manifests or relevant accepted decision changes after admission, mark STALE and recompile/rebase.

Because risk is ELEVATED:
- broad regressions required;
- performance proof required;
- FULL/BALANCED/STATIC proof required;
- M07A security/readiness regressions required;
- independent visual scoring required;
- no merge with unresolved HIGH/CRITICAL or performance failure.

## ACCEPTANCE CRITERIA

1. Master asset fingerprint matches locked reference.
2. Master is not referenced by production runtime code/assets.
3. Home desktop composition is recognizably closer to master, not merely same palette.
4. Hero copy remains strong left editorial block.
5. Monumental N is dominant center-right object.
6. N has dimensional chrome/material response.
7. Chamber reads as layered cylindrical volume.
8. Top/bottom rings, vertical energy and axial-light vocabulary are visible.
9. Platform/floor depth clearly leads toward chamber.
10. Earth/network language is materially richer and readable.
11. Holographic panels add depth without fake factual dashboards.
12. Human-scale cue remains present and more convincingly integrated.
13. FULL mode has richest environment without semantic dependence.
14. BALANCED preserves same composition at lower cost.
15. STATIC preserves hierarchy/atmosphere.
16. Poster-first and WebGL/context-loss fallback still pass.
17. Reduced motion disables nonessential motion.
18. N never continuously spins.
19. Energy filaments/rails create one-world circulation.
20. Hero → capability → Research/Technology transition feels visually continuous.
21. Desktop header is materially more faithful/premium.
22. Desktop current route exposes `aria-current=page` and visible active state.
23. Desktop hover/focus remains keyboard accessible.
24. No fake search is added.
25. Mobile no longer relies on horizontal-scroll-only nav.
26. Mobile menu trigger/panel semantics, Escape and focus behavior pass.
27. Contact remains real route/action.
28. Five capability objects are custom/proprietary and visually distinct.
29. No generic icon library/emoji is introduced.
30. Lower Research visual is materially closer to lab/global-network master vocabulary.
31. Lower Technology visual is materially closer to luminous layered/cube vocabulary.
32. Secondary routes gain depth without new WebGL/R3F.
33. Secondary route copy/metadata remain unchanged.
34. Contact zero-collection remains proven.
35. Footer gains continuity without fabricated social links.
36. Exact required visual screenshots are retained.
37. Four master-vs-candidate comparison composites are retained.
38. Executor proposed score is documented with evidence links.
39. Independent auditor score >=85/100.
40. Auditor Hero Composition score >=15/20.
41. Auditor N/Chamber/Material score >=15/20.
42. No Priority-1 fidelity criterion is materially regressed.
43. 1600×900, 1440×900, tablet, 390×844 and 320px have no unexpected overflow.
44. Automated a11y has no serious/critical violation; keyboard/focus pass.
45. Initial route JS remains <=220 KiB gzip excluding lazy 3D.
46. Lazy Home 3D remains <=700 KiB gzip.
47. Non-Home routes load no Home 3D chunks.
48. Home mobile LCP <=2500 ms, CLS <=0.10, interaction proxy <=200 ms.
49. Three consecutive full production-candidate browser suites pass with retries=0 and Home mobile LCP <=2500 ms each.
50. lint/typecheck/unit/build/E2E/npm audit/secret scan pass.
51. M07A security headers/CSP/noindex/robots/404/release-readiness regressions pass.
52. Development Docker remains UP/healthy and six routes return 200.
53. Exact-head CI Quality, Browser Smoke, Release Readiness, Sonar, Socket and CodeRabbit/reviewer signals are checked.
54. Evidence Bundle + proposed Checkpoint Delta are complete.
55. Independent exact-head audit yields APPROVED before merge.

## TESTS

- `npm ci`
- lint
- typecheck
- unit/component tests
- production build
- full E2E
- npm audit moderate
- git diff --check
- secret-pattern scan
- master runtime-reference negative scan
- master fingerprint check
- desktop/mobile deterministic visual captures
- FULL/BALANCED/STATIC screenshots and behavior
- WebGL failure/context-loss fallback
- reduced-motion
- desktop active-nav + hover/focus
- mobile menu keyboard/Escape/focus
- five capability-object checks
- six-route copy/metadata regressions
- Contact zero-collection
- axe/keyboard/overflow matrix
- route JS + lazy 3D chunk analysis
- 3 consecutive retries=0 production-candidate suites with LCP budget
- M07A security/header/indexing/404/Release Readiness regression
- Docker health/HTTP evidence

## DELIVERABLES

- high-fidelity Home 3D master alignment;
- improved living-organism motion;
- premium desktop/mobile navigation;
- proprietary capability iconography;
- lower Home master alignment;
- secondary-page depth refinement;
- deterministic visual comparisons;
- Visual Fidelity Report + proposed score;
- performance/accessibility/security regressions;
- Evidence Bundle;
- proposed Checkpoint Delta;
- Docker UP/healthy;
- PR OPEN/READY FOR REVIEW.

## REVIEW FORMAT

Brazilian Portuguese:
- exact base/head + Context Lock freshness;
- master fingerprint;
- composition/hierarchy;
- N/chamber/material/lighting;
- Earth/network/floor/panels/human scale;
- header/menu;
- iconography;
- lower Home continuity;
- secondary pages;
- motion/reduced motion;
- FULL/BALANCED/STATIC;
- a11y/responsive/performance;
- M07A security/readiness regressions;
- fidelity score by criterion;
- risks/gaps;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with WO-013 fully implemented, tested and evidenced, executor proposed fidelity score documented, development Docker UP/healthy and PR OPEN/READY FOR REVIEW. Do not merge. Do not promote checkpoint. Do not deploy. Do not begin M07B.


## CORRECTION DELTA 02 — LOCAL VISUAL ASSET PIPELINE + MASTER-FIDELITY RECOVERY

Trigger:
- independent auditor score at HEAD `487556d65d62c5581ee9fdcf6f77cf881c569f81`: **68/100**;
- approval gate: >=85/100;
- owner determined that procedural-only web implementation is not converging sufficiently toward the approved master and explicitly directed ComfyUI + Blender local authoring.

This Correction Delta remains inside WO-013 and PR #20. It does not create a new product increment.

### Phase 1 — Bootstrap local authoring pipeline

Read and implement `.engineering/VISUAL-ASSET-PIPELINE.md`.

On the owner workstation:
1. detect RTX/GPU/VRAM/RAM/disk/driver;
2. install/pin ComfyUI local runtime;
3. configure localhost-only API on 127.0.0.1:8188;
4. install and smoke-test the required SDXL commercial-use baseline;
5. optionally test FLUX.2 Klein 4B FP8 using dynamic/offload profile; fallback cleanly if 8 GB is insufficient;
6. install Blender 5.2 LTS current patch;
7. validate Blender background Python rendering/export;
8. use repository scripts under `tools/visual-pipeline/`;
9. record sanitized evidence and local model manifest/checksums/licenses;
10. do not commit weights, raw renders, tokens or secrets.

Official Blender MCP is not required and must remain disabled by default because upstream warns about unguarded LLM-generated code execution. Blender background Python API satisfies the automation requirement.

### Phase 2 — Generate controlled design assets

Use the approved master as an art-direction/reference input only.

Create candidate references for:
- hero laboratory/chamber depth;
- chrome N lighting/material studies;
- Earth/network/panels/floor composition;
- five capability micro-sculptures;
- Research lower-world;
- Technology stack/cube;
- static/poster fallbacks.

Generated references are design inputs, not automatically production assets.

### Phase 3 — Blender production studies

Use Blender background scripts to build/render/export:
- chamber/floor/panel blockouts;
- Earth/network sphere;
- capability micro-sculpture candidates;
- material/lighting studies;
- animation loop studies;
- web-ready GLB only where justified.

Use generated image references to guide geometry/materials; do not texture-map the whole master screenshot onto meshes.

### Phase 4 — Integrate and re-score

Integrate only selected/optimized assets or derived geometry into the existing Home architecture.

All original WO-013 acceptance criteria remain binding.

Refresh:
- deterministic master comparisons;
- visual fidelity report;
- evidence bundle;
- 3 consecutive production-candidate suites;
- exact-head gates.

Executor may propose a new score. Independent auditor remains final authority.

### Additional STOP CONDITION

Do not resume final visual implementation until Phase 1 is proven PASS. Do not merge until independent visual audit reaches the original WO-013 gate.


## CORRECTION DELTA 03 — TEMPORARY VERCEL PRE-LAUNCH FOR EXTERNAL REGISTRATION

Trigger:
- owner requires a functional public website immediately for Anthropic/company registration;
- current candidate is technically healthy but final visual acceptance remains pending.

This delta changes deployment priority without approving the visual result.

### Objective

Create the fastest safe public Vercel deployment of the functional PR #20 candidate, clearly labeled as unfinished, while retaining all pre-launch indexing/security boundaries.

### Required product change

Add a persistent global notice above normal navigation:

`PRE-LAUNCH — This website is still in production and is not yet final.`

It must appear on all six public routes and remain responsive/accessibility-safe.

### Vercel target

Use the existing linked project:
- team: `claytons-projects-5922d27c`;
- project: `nexlabs-website`;
- project ID: `prj_HtZ5M9lpS0JZhkaHLbTCrWX38YHV`.

Follow `.engineering/VERCEL-PRELAUNCH-SPEC.md`.

### Authorization

This correction authorizes Codex to perform exactly one production-target Vercel pre-launch deployment/redeploy cycle as needed to achieve a healthy public candidate.

It does NOT authorize:
- final M07B declaration;
- custom domain/DNS;
- search indexing;
- analytics;
- Contact collection;
- merge;
- checkpoint promotion.

### Acceptance

- all exact-head predeploy gates pass;
- public Vercel HTTPS URL is READY;
- all six routes return 200 live;
- banner appears live on all six routes;
- 404 remains branded;
- noindex/nofollow and robots disallow remain;
- sitemap remains absent;
- live navigation/Contact zero-collection pass;
- evidence records deployment ID/SHA/URL without credentials;
- PR #20 remains OPEN.

### STOP CONDITION

Stop after the temporary Vercel deployment is live and validated. Then request review. Do not merge, promote checkpoint or begin M07B final launch.


## CORRECTION DELTA 04 — REFERENCE-FIRST DESIGN DIRECTOR HARNESS

Trigger:
- owner supplied the motion-design studio workflow at https://x.com/0xMovez/status/2104216919033192746 and explicitly directed its applicable techniques to be used for Nex Labs;
- current exact-head candidate `25d85e692b7a57d7c416dce9bd954184a2e88f57` remains materially different from the approved master;
- executor-proposed score is 77/100, below the 85/100 gate.

The article is treated as an external technique reference, not as canonical product truth. Applicable techniques are adapted to a website; video/audio-specific steps are excluded.

### Phase A — Reference extraction, no product code

Read `.engineering/DESIGN-DIRECTOR-HARNESS.md`.

Create:
- `.engineering/design-director/master-style-guide.md`;
- `.engineering/design-director/master-scene-graph.md`;
- `.engineering/design-director/master-state-list.md`;
- `.engineering/design-director/master-asset-manifest.md`;
- `.engineering/design-director/review-log.md`.

The approved master must be decomposed before implementation continues.

### Phase B — Ordered specialist passes

Execute sequentially:
1. Reference Extractor;
2. Scene Architect;
3. Material & Lighting Director;
4. Capability Object Designer;
5. Lower-World Director;
6. Motion Director;
7. Harsh Critic.

Do not let a single monolithic pass redesign everything.

### Phase C — Generate then trace

Use ComfyUI to create controlled reference studies.
Use Blender to trace selected references into geometry/material/light studies.
Translate selected ownable outputs into existing web architecture.

Master pixels/crops remain forbidden in runtime.

### Phase D — Deterministic visual state harness

Retain deterministic captures for all required states in DESIGN-DIRECTOR-HARNESS.md.

Visual evidence must be reproducible and must not depend on Math.random-driven output.

### Phase E — Three critique loops minimum

For each round:
- render contact sheet;
- compare directly to master;
- score the nine harness dimensions;
- name the three biggest gaps;
- fix those gaps;
- rerender.

Do not request independent review before all required harness dimensions reach at least 8/10.

### Visual focus for this correction

The current candidate remains too:
- empty around the Hero;
- schematic in chamber architecture;
- flat in material/reflection;
- weak in left/right laboratory density;
- simplified in Earth/network/panel integration;
- card-like in capabilities;
- sparse in lower Research/Technology.

The next candidate must prioritize architectural density and real spatial layering over more glow.

### Motion adaptation

Use spring/mass behavior for purposeful UI/3D motion where it improves quality.
Do not add GSAP/Framer/Remotion/HyperFrames.
No audio is added to the website.

### STOP CONDITION

Stop with:
- all design-director artifacts retained;
- at least three critique rounds retained;
- final executor score PROPOSED only;
- full WO-013 regressions passing;
- exact-head Evidence Bundle refreshed;
- PR #20 OPEN/READY FOR INDEPENDENT REVIEW.

Do not merge, promote checkpoint or declare M07B complete.
