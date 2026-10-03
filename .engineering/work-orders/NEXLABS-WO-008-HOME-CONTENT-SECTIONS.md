# NEXLABS-WO-008 — M05 Home Content Sections

Status: APPROVED — MERGED

Risk class: STANDARD

## COMPLETION RECORD

- Independent audit: APPROVED.
- Exact approved head: `22b3012551cce8f8a585605cf0f7a246ecd2a2a0`.
- PR: #10.
- Squash product merge on main: `9f6aab7004fe10ccd5120cefd666df2a1efe9060`.
- M05 checkpoint promotion is performed only after that merge.

## OBJECTIVE

Complete the semantic Home page below the M04 hero so the approved 1600x900 visual master becomes one coherent production-quality experience instead of a cinematic hero followed by placeholders.

M05 extends the M04 living-organism language through server-rendered sections, lightweight CSS/SVG visuals and restrained motion. It must not add fabricated proof, broken secondary routes or another heavy 3D runtime.

## CONTEXT

M04 Home Hero 3D / Living Organism was independently APPROVED at exact head `4898c778d5003e8b780031abbf4d3f34e1633e8e` and squash-merged as main SHA `6b0f3fa29f00796a85dbd44ac21010f3337cf5c5`.

M04 already provides:
- poster-first hero;
- FULL / BALANCED / STATIC tiers;
- 3D Precision Blades N;
- chamber/lab/global-network atmosphere;
- living-organism motion foundation;
- WebGL/reduced-motion fallbacks;
- Docker continuity.

M05 owns the semantic Home sections shown beneath the hero in the approved reference.

## CANONICAL CONTENT SOURCE

Implement `.engineering/HOME-CONTENT-SPEC.md`.

Do not add numerical proof, customer/partner claims, logos, awards, testimonials or outcome claims without a separately approved factual source.

## SCOPE

### A. Replace placeholders

Remove the current placeholder Project/Contact cards and hidden planned anchors.

Implement visible sections, in this order:

1. Core Capabilities / Intelligence in Action
2. Principles / HOW WE BUILD
3. Vision / Mission
4. Research / Ideas That Become Reality
5. Technology / Built to Transform
6. Final Home CTA
7. Existing footer, visually integrated

### B. Core capability cards

Create five semantic cards:

- Artificial Intelligence
- Intelligent Infrastructure
- Advanced Interfaces
- Sustainable Technologies
- Research Platforms

Requirements:
- use the exact safe copy from HOME-CONTENT-SPEC.md;
- coherent holographic/chrome/cyan motifs;
- no customer, scale, certification or outcome implication;
- visual density should echo the approved five-card band without looking like a generic SaaS template.

### C. Principles instead of fake metrics

Replace the concept-art metric strip with four non-numeric principles:

- Human-centered
- Research-led
- Secure by design
- Built for real-world systems

Render them as a restrained connected trust/ethos rail.

### D. Vision / Mission

Implement the canonical copy from HOME-CONTENT-SPEC.md.

The block should read as editorial narrative, not a generic centered marketing card.

### E. Research

Implement the “Research & Breakthroughs / Ideas That Become Reality” equivalent:

- strong editorial heading;
- canonical body copy;
- globe/horizon/lab visual vocabulary;
- restrained CTA;
- no fake publication, project, patent or partner count.

### F. Technology

Implement “Built to Transform” with these pillars:

- AI Models & Analytics
- Data Infrastructure
- Secure & Scalable Systems
- Real-World Integration
- Interoperable Architecture

Use the approved luminous stacked-layer / monumental cube vocabulary.

Prefer CSS/SVG/HTML. Do not add another WebGL scene merely for this block.

### G. Living-organism continuity

Extend M04 visually through:

- section-to-section energy rails;
- low-amplitude background light travel;
- restrained holographic glow;
- hover/focus edge illumination;
- subtle depth/reveal behavior;
- shared color/motion variables.

Prefer CSS and existing runtime signals.

Do not:
- add GSAP just for reveals;
- create a second animation engine;
- add heavy per-section requestAnimationFrame loops;
- continuously spin icons;
- break reduced-motion behavior.

### H. Navigation

Update Home anchors so every visible navigation target exists.

Until M06, do not link to unimplemented secondary routes.

### I. Responsive

Desktop:
- cinematic width and asymmetry;
- five-card band where space permits.

Tablet:
- adaptive layout with readable type.

Mobile:
- stacked logical order;
- no tiny HUD;
- no horizontal overflow;
- decorative visuals must not dominate.

### J. Accessibility

- target WCAG 2.2 AA;
- correct heading hierarchy;
- keyboard reachable interactions;
- visible focus;
- decorative visuals hidden from assistive tech;
- reduced motion removes nonessential motion;
- sticky-header-safe anchor offsets;
- no meaningful text only inside image/canvas.

### K. Performance

M05 should be mostly server-rendered/static.

Targets:
- preserve initial route JS <= 220 KB gzip excluding lazy M04 3D chunks;
- no heavy new animation/UI library;
- no additional 3D runtime;
- avoid large raster assets;
- representative mobile LCP target <= 2.5 s;
- CLS <= 0.10.

### L. Testing / Evidence

Retain:
- 1600x900 desktop screenshot;
- 1440x900 desktop screenshot;
- 390x844 mobile screenshot;
- reduced-motion screenshot;
- hero → capabilities continuity screenshot;
- research → technology continuity screenshot;
- keyboard/focus evidence;
- no-horizontal-overflow result;
- axe/a11y result;
- anchor navigation tests;
- copy-integrity inspection;
- bundle/performance evidence;
- Docker health/URL.

### M. Docker continuity

End with Docker running and healthy.
Home must return HTTP 200.
Do not run `docker compose down`.

## OUT OF SCOPE

- M06 secondary-page implementation;
- contact backend/form submission;
- CMS/CRM;
- auth/database;
- analytics/trackers;
- public deployment;
- new fabricated proof;
- new unrelated production 3D scene;
- audio;
- WebGPU;
- unrelated cleanup.

## FILES / SOURCES TO READ

1. CHECKPOINT.md / CHECKPOINT.json
2. HOME-CONTENT-SPEC.md
3. HOME-VISUAL-MASTER-SPEC.md
4. VISUAL-DIRECTION.md
5. UI-UX.md
6. BRAND-SYSTEM.md
7. ARCHITECTURE.md
8. REQUIREMENTS.md
9. DEFINITION-OF-DONE.md
10. TEST-BENCHMARK-PLAN.md
11. DECISIONS-LEDGER.md
12. AGENTS.md
13. active Context Lock

## ARCHITECTURE RULES

- Server Components by default.
- CSS Modules + existing design tokens.
- Client components only when interaction genuinely needs them.
- Reuse M04 motion/visual primitives.
- No new global state store.
- No new UI framework.
- No new 3D runtime.
- Meaningful content remains semantic HTML.
- No broken routes to M06 pages.

## ACCEPTANCE CRITERIA

1. Placeholder Project/Contact cards and hidden anchors are removed.
2. All six M05 content areas are implemented.
3. Five capability cards use canonical copy.
4. Unsupported metrics are replaced by four principles.
5. Research and Technology visually follow the master.
6. Cube/stacked-layer vocabulary appears without a new 3D runtime.
7. Hero and lower sections read as one connected organism.
8. Reduced-motion remains correct.
9. No fake proof enters public copy.
10. Visible Home anchors work.
11. Mobile 390x844 has no horizontal overflow.
12. Browser/a11y has no serious/critical violation.
13. Existing M04 hero/fallback/tier tests still pass.
14. No unjustified heavy dependency is added.
15. lint/typecheck/unit/build/browser pass.
16. npm audit/security checks show no unresolved HIGH/CRITICAL.
17. performance evidence stays inside targets or documents variance.
18. Docker remains UP/healthy.
19. Evidence Bundle is complete.
20. Exact-head CodeRabbit/CI/Browser Smoke/Socket/Sonar pass.
21. Independent exact-head review yields APPROVED.

## TESTS

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `npm audit --audit-level=moderate`
- `git diff --check`
- responsive/anchor/a11y/copy-integrity checks
- exact-head GitHub checks
- Docker health + HTTP 200

## DELIVERABLES

- completed semantic Home sections;
- capability/principle/research/technology visual components;
- updated anchor navigation;
- responsive/reduced-motion styles;
- tests;
- screenshots/performance evidence;
- `.engineering/evidence/NEXLABS-WO-008-HOME-CONTENT-SECTIONS-EVIDENCE.md`;
- updated proposed Checkpoint Delta;
- Docker UP/healthy;
- PR ready for independent review.

## REVIEW FORMAT

Brazilian Portuguese:
- base/head;
- files by purpose;
- content integrity;
- visual fidelity;
- responsive/accessibility;
- tests/security;
- performance;
- Docker;
- risks;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Historical executor stop condition was satisfied before independent review. M05 is now independently APPROVED and merged. M06 implementation remains blocked until a separately admitted M06 Work Order and Context Lock exist.
