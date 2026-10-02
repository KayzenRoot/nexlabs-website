# NEXLABS-WO-006 — M03 Vector Master & Brand Integration

Status: ADMITTED — READY FOR EXECUTOR

Risk class: STANDARD

## OBJECTIVE

Turn the owner-selected NEX LABS identity into production-grade vector assets and integrate it into the existing website shell without entering the M04 production-3D hero scope.

The implementation target is the canonical selected concept:

`NEX-N-A-PRECISION-BLADES`

The result must make the current Docker site visibly use the approved Nex Labs identity while preserving accessibility, performance, testability and the existing repository governance.

## CONTEXT

M03 concept exploration is approved and merged at main SHA `a226542594d480ab254cb7256a18f748b642dde4`.

Canonical visual decisions:
- selected logo: Finalist A / Precision Blades;
- strong capital-N silhouette built from metallic blade/plane geometry;
- dominant diagonal bridge;
- restrained electric-blue/cyan edge energy;
- flat monochrome SVG is the identity source of truth;
- chrome/silver version is an enhanced presentation;
- final Home target is the owner-approved dark cinematic technology laboratory recorded in `.engineering/VISUAL-DIRECTION.md`;
- the website must ultimately feel like a living organism, but production 3D/environmental choreography remains M04.

The selected reference boards exist in the design conversation. The executor must not invent a different identity because the raw reference binary is not in Git. Use the canonical engineering descriptions, current screenshots/evidence supplied with the task, and the selected concept ID.

## SCOPE

### Vector identity
- Create an original SVG master of `NEX-N-A-PRECISION-BLADES`.
- Preserve the selected silhouette:
  - two principal vertical/angled blade masses;
  - clear diagonal bridge;
  - precise technical cuts;
  - strong N readability;
  - no unnecessary internal micro-detail.
- Create:
  1. symbol-only flat master;
  2. monochrome light;
  3. monochrome dark;
  4. horizontal NEX LABS lockup;
  5. extended NEX LABS / TECHNOLOGY lockup;
  6. enhanced chrome/electric-blue presentation using SVG/CSS-safe effects.
- Follow BRAND-SYSTEM clear-space, minimum-size and small-mark rules.

### Website integration
- Replace the current placeholder wordmark/header treatment with the selected production identity.
- Integrate the selected mark into:
  - global header;
  - global footer;
  - metadata/icon surfaces supported cleanly by the current Next.js app.
- Keep dimensions stable to avoid CLS.
- Preserve semantic navigation and accessibility labels.

### Lightweight brand motion
- CSS/SVG-first only.
- Implement restrained:
  - intro assemble/reveal;
  - single light sweep;
  - subtle hover depth/light response;
  - calm idle reflection drift if it remains inexpensive.
- `prefers-reduced-motion: reduce` must render a static identity.
- No WebGL, Three.js, R3F, GSAP or heavy animation dependency.

### Brand tokens / visual shell
- Align existing design tokens with the approved identity:
  - near-black/graphite field;
  - cold white text;
  - ice cyan/electric blue;
  - restrained violet;
  - silver/chrome presentation role.
- Refine header/footer presentation enough to make the selected identity coherent with the current static Home shell.
- Do not rebuild the full Home world yet.

### Testing / evidence
- Unit/component coverage for brand component behavior where useful.
- Browser evidence at 390x844 and 1440x900.
- Verify:
  - 16px/24px small-mark readability;
  - light/dark monochrome variants;
  - no horizontal overflow;
  - reduced motion;
  - keyboard/focus integrity;
  - no console errors.
- Evidence Bundle must include visual screenshots and exact-head test results.

### Docker continuity
- Build/restart the approved development Docker environment only as needed.
- End with the website running and healthy at the documented local URL.
- Preserve HMR.
- Do not execute `docker compose down` as the normal stop condition.

## OUT OF SCOPE

- Production hero WebGL/3D.
- Three.js/R3F/Drei/GSAP.
- Blender/GLB/glTF.
- Full living-organism environmental motion.
- Major Home content redesign.
- M04/M05 secondary visual sections beyond small brand-shell adjustments.
- Secondary public routes.
- Backend, CMS, CRM, analytics, database or authentication.
- Public deployment.
- Trademark/legal clearance certification.

## FILES / SOURCES TO READ

1. `.engineering/CHECKPOINT.md` / `.engineering/CHECKPOINT.json`
2. `.engineering/evidence/NEXLABS-WO-005-BRAND-CONCEPTS-EVIDENCE.md`
3. `.engineering/BRAND-SYSTEM.md`
4. `.engineering/VISUAL-DIRECTION.md`
5. `.engineering/UI-UX.md`
6. `.engineering/DECISIONS-LEDGER.md`
7. `.engineering/ARCHITECTURE.md`
8. `.engineering/REQUIREMENTS.md`
9. `.engineering/DEFINITION-OF-DONE.md`
10. `AGENTS.md`
11. active Context Lock

## REQUIREMENTS

### Identity fidelity
- Do not substitute a generic N.
- The flat silhouette must remain recognizable without gradient, glow or chrome.
- The enhanced version must be visibly the same geometry as the flat master.
- Do not drift into esports/gaming/crypto-token styling.
- Do not overuse glow.
- Wordmark spacing must feel premium and technical, not condensed into illegibility.

### Asset architecture
- Prefer SVG assets/components and CSS variables.
- Avoid raster-only identity dependence.
- Do not add a heavy package merely to render the logo.
- If raster favicon/app-icon derivatives are generated, they must be derived from the canonical SVG geometry and retained as generated assets with documented source.

### Accessibility
- Logo links have useful accessible names.
- Decorative visual layers are ignored by assistive technology.
- Motion is not required to recognize or use the brand.
- Reduced-motion eliminates nonessential logo animation.

### Performance
- Brand assets must be lightweight.
- No client JavaScript is required merely to display the static logo.
- Avoid hydration for static SVG when possible.
- No measurable regression that violates existing M01/M02 budgets.

## ACCEPTANCE CRITERIA

1. Production SVG master implements `NEX-N-A-PRECISION-BLADES`.
2. Symbol-only and required lockups exist.
3. Light/dark monochrome variants exist.
4. Enhanced chrome/electric-blue presentation uses the same master geometry.
5. 16px and 24px small-mark checks are retained.
6. Header and footer use the selected identity.
7. Metadata/favicon surfaces use the selected symbol appropriately.
8. No layout shift is introduced by logo loading.
9. Motion is CSS/SVG-first and reduced-motion safe.
10. No Three.js/R3F/Drei/GSAP dependency enters the diff.
11. Existing lint/typecheck/unit/build/browser tests pass.
12. Browser/a11y checks pass.
13. Docker remains running and healthy for owner inspection.
14. Screenshots show desktop and mobile brand integration.
15. No fake metrics, customer logos, partnerships or unsupported claims are introduced.
16. Evidence Bundle is complete.
17. Exact-head CodeRabbit, CI, Browser Smoke, Socket and Sonar gates pass.
18. Independent review yields APPROVED before merge.

## TESTS

Required:
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `git diff --check`
- available security/secret/dependency scans
- Docker: `docker compose config`, build if affected, `up -d`, `ps`, health/log check
- exact-head GitHub checks

Visual evidence:
- 1440x900 Home/header/footer
- 390x844 Home/header/footer
- symbol at 16px and 24px
- monochrome light/dark
- reduced-motion screenshot or retained verification

## DELIVERABLES

- production brand SVG/component assets;
- header/footer integration;
- favicon/metadata integration;
- updated design tokens where necessary;
- tests;
- `.engineering/evidence/NEXLABS-WO-006-BRAND-INTEGRATION-EVIDENCE.md`;
- updated proposed checkpoint delta;
- updated canonical sources only where implementation facts change them;
- Docker left UP/healthy;
- PR updated with final evidence.

## REVIEW FORMAT

Brazilian Portuguese:
- base and exact head SHA;
- files grouped by purpose;
- visual-fidelity notes;
- asset architecture;
- test/build/browser results;
- Docker state and URL;
- accessibility/reduced-motion;
- security/dependency findings;
- deviations;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with implementation complete, evidence retained, Docker UP/healthy and PR OPEN/READY FOR REVIEW. Do not merge. Do not begin M04 until this increment is independently approved and merged.
