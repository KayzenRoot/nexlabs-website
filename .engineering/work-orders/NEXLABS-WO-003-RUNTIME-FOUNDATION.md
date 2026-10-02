# NEXLABS-WO-003 — M02 Runtime & Repository Foundation

Status: ADMITTED — READY FOR EXECUTOR

Risk class: STANDARD

## OBJECTIVE

Implement the first production-code increment of the Nex Labs Technology Website: a stable Next.js/TypeScript runtime foundation, professional repository/CI guardrails, design-token and layout primitives, and a static Home shell with an immediate non-WebGL hero fallback. The result must be functional, tested, documented, deployable, and objectively reviewable without entering the later 3D, final brand-art, secondary-page, backend, analytics, or deployment increments.

## CONTEXT

M01 Product Foundation & Visual System was approved at exact PR head `222cbb98ca85b71bf3c6c688e8212ecb85a3ea33` and merged by squash as main SHA `9aa51209bfda05246ffc3d558e459b2a4243ff62`.

Canonical product direction already accepts:
- Next.js App Router;
- strict TypeScript;
- React Server Components by default;
- CSS Modules plus project design tokens;
- isolated Three.js/React Three Fiber client islands in a later increment;
- poster/static-first rendering and FULL/BALANCED/STATIC capability tiers;
- WCAG 2.2 AA target, reduced-motion support, performance budgets, factual-content integrity, and no trackers by default.

This Work Order turns only the runtime/repository foundation into code. It must not consume M03-M07 scope.

## SCOPE

### Runtime foundation
- Create a Next.js App Router application under `src/`.
- Use stable non-canary Next.js/React/TypeScript versions and lock exact resolved versions in `package-lock.json`.
- Keep `"private": true` and preserve `@gef-bootstrap/cli@1.1.2`.
- Enable strict TypeScript and production-safe Next.js defaults.
- Establish scripts for dev, lint, typecheck, unit test, browser smoke/a11y test, and production build.
- Pin CI to Node 22.

### Styling and layout foundation
- Create explicit design tokens for palette, spacing, radii, typography scales, shadows/glass/chrome surfaces, z-index, motion durations, and responsive breakpoints.
- Use CSS Modules for component styling and a small global reset/base layer.
- Do not add Tailwind or a third-party UI theme/framework.
- Create reusable shell primitives required by the first Home route only.

### Static Home shell
- Implement semantic global layout, skip link, header, main and footer foundation.
- Implement a static Home hero shell with factual/draft-safe copy, two CTA affordances, and a chrome/dark visual stage that does not require canvas/WebGL.
- Implement immediate STATIC fallback as pure HTML/CSS/SVG-safe presentation.
- Represent planned Home section anchors structurally without implementing M05 content.
- Do not create secondary public route content from M06.
- Do not fabricate clients, partnerships, benchmarks, testimonials or production claims.

### Testing and evidence foundation
- Configure Vitest + Testing Library for unit/component tests.
- Configure Playwright Chromium smoke testing.
- Include automated accessibility coverage for the rendered Home shell.
- Validate keyboard access, skip link, focus visibility and reduced-motion behavior.
- Retain screenshot evidence for at least 390x844 and 1440x900 viewports.
- Produce a complete Evidence Bundle for this Work Order.

### CI / repository governance
- Add a GitHub Actions workflow with stable check names:
  - `CI Quality`: install, lint, typecheck, unit/component tests, production build.
  - `Browser Smoke`: install Chromium, launch the built app, smoke/a11y checks and screenshot artifact capture.
- Use minimal workflow permissions.
- Add Dependabot npm configuration with a conservative weekly cadence.
- Using `gh` after the workflow has produced the required checks, configure/verify a professional `main` ruleset where repository permissions allow:
  - changes to main require a pull request;
  - require `CI Quality` and `Browser Smoke`;
  - require conversation resolution;
  - block force-push and branch deletion;
  - require linear history;
  - do not require an impossible self-approval for this solo-owner repository.
- Configure repository merge settings for squash-first workflow and automatic branch deletion where supported.
- Record the resulting repository/ruleset evidence. If GitHub permissions genuinely prevent a required setting, stop with BLOCKED evidence rather than weakening the gate.

## OUT OF SCOPE

- Three.js, React Three Fiber, Drei, GSAP or production 3D runtime installation.
- Blender files, GLB/glTF production hero assets, texture pipeline, particles or post-processing.
- Final N logo artwork, favicon suite or M03 brand completion.
- M05 final Home capability/vision/research/infrastructure content.
- M06 secondary page implementation.
- Contact form submission/backend, database, authentication or privileged admin surfaces.
- Analytics, pixels, cookies, CRM, CMS or marketing integrations.
- Public deployment, DNS, production release or provider lock-in.
- Broad cleanup unrelated to this Work Order.

## FILES / SOURCES TO READ

Read in this order before editing:
1. `.engineering/CHECKPOINT.json` and `.engineering/CHECKPOINT.md`
2. `.engineering/DECISIONS-LEDGER.md` and accepted ADRs
3. `.engineering/SCOPE.md`
4. `.engineering/DEFINITION-OF-DONE.md`
5. `.engineering/ARCHITECTURE.md`
6. `.engineering/REQUIREMENTS.md`
7. `.engineering/UI-UX.md`
8. `.engineering/VISUAL-DIRECTION.md`
9. `.engineering/SECURITY.md`
10. `.engineering/TEST-BENCHMARK-PLAN.md`
11. `.engineering/BACKLOG.md`
12. `AGENTS.md`
13. `.engineering/context-locks/NEXLABS-WO-003-RUNTIME-FOUNDATION.json`

## REQUIREMENTS

### Application structure
- Prefer Server Components. Add `"use client"` only when an actual client interaction requires it.
- No canvas or WebGL dependency in M02.
- No generic template aesthetic. The static shell must already reflect the accepted dark chrome/glass/cyan-violet visual grammar.
- Hero fallback must render immediately and remain a valid permanent fallback for constrained/reduced-motion contexts.
- No broken navigation. Until M06, Home navigation should use valid Home anchors rather than links to unimplemented routes.

### Package and tooling discipline
- Use stable non-canary package releases.
- Do not remove or loosen the GEF dependency/pinning.
- Keep lockfile deterministic.
- Avoid dependencies when platform/native CSS/React is sufficient.
- No runtime dependency may be added unless directly required by M02.

### Accessibility
- Semantic landmarks and heading hierarchy.
- Skip link.
- Visible keyboard focus.
- CTA links/buttons keyboard-operable.
- `prefers-reduced-motion` produces a calm/static experience.
- Decorative visuals are hidden from assistive technology where appropriate.
- Automated a11y smoke must report no serious/critical violations on the Home route.

### Security/privacy
- No secret values or credentials in code/workflows.
- Workflows use least privilege.
- No trackers/cookies/third-party embeds.
- External resources must not be required for basic rendering or CI reproducibility.

### Performance
- No 3D code in initial route.
- Production build must succeed without runtime console errors.
- Initial shell must remain lightweight and capable of meeting the M01 budgets; record generated route/bundle evidence available from the build.
- Avoid unnecessary client components.

## ARCHITECTURE RULES

- Next.js App Router.
- TypeScript strict.
- React Server Components by default.
- CSS Modules + design tokens; no Tailwind.
- Static/pure-CSS hero fallback first.
- Heavy 3D remains isolated and deferred.
- Stable boundaries under `src/app`, `src/components`, `src/styles`, and `src/lib` only as justified.
- Testing and CI are part of architecture, not post-processing.
- No provider-specific deployment coupling.

## CONSTRAINTS

- Base SHA is immutable for this Work Order. If main or a critical source changes, mark the Context Lock STALE, rebase safely, refresh fingerprints, and do not continue from stale assumptions.
- Inspect repository state before editing.
- Implement only this Work Order.
- Do not force-push or rewrite history.
- Do not weaken review/security settings to make checks pass.
- Fix failures introduced by this increment before requesting review.
- Keep the PR draft while implementation/evidence is incomplete.
- Final executor summary must be in Brazilian Portuguese.

## ACCEPTANCE CRITERIA

1. `npm ci` succeeds from a clean checkout.
2. Next.js App Router application starts locally and the Home route returns successfully.
3. TypeScript strict mode is enabled and `npm run typecheck` passes.
4. `npm run lint` passes.
5. Unit/component tests pass.
6. Production `npm run build` passes.
7. Playwright Chromium smoke test passes against the built application.
8. Automated Home accessibility test has no serious/critical violation.
9. Keyboard/skip-link/focus behavior is covered by test or retained manual evidence.
10. Reduced-motion behavior is implemented and tested/verified.
11. The Home shell renders at 390x844 and 1440x900 with no unexpected horizontal overflow and screenshots are retained as evidence/artifacts.
12. Static hero fallback requires no WebGL/canvas and remains usable with JavaScript-delayed/heavy-visual features absent.
13. No Three.js/R3F/Drei/GSAP/production 3D dependency or asset is added.
14. No fake customer/partner/metric/testimonial content appears.
15. `@gef-bootstrap/cli@1.1.2` remains pinned and package remains private.
16. GitHub Actions exposes successful `CI Quality` and `Browser Smoke` checks.
17. Main ruleset/merge settings are configured and verified as defined in scope, or the increment is BLOCKED with objective permission evidence.
18. Dependency/security checks show no unresolved HIGH/CRITICAL issue introduced by this increment.
19. Evidence Bundle records base/head SHAs, files, package decisions, tests, lint/typecheck/build, screenshots, CI/check URLs or identifiers, ruleset state, known risks and proposed Checkpoint Delta.
20. Exact-head audit yields APPROVED before merge.

## TESTS

Required executor commands, adapting only when package tooling makes an equivalent command necessary:
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `git diff --check`
- secret/dependency/security checks available in repository/GitHub
- verify the exact-head GitHub check suite
- inspect ruleset/repository settings with `gh api`

Visual/manual evidence:
- desktop 1440x900 screenshot
- mobile 390x844 screenshot
- keyboard navigation/skip-link/focus spot check
- reduced-motion spot check
- browser console free of unexpected errors on Home

## DELIVERABLES

- Functional Next.js/TypeScript runtime foundation.
- Design tokens and layout primitives.
- Static Home shell and immediate fallback.
- Unit/component and browser/a11y tests.
- CI workflow and Dependabot configuration.
- Verified professional main ruleset/repository merge settings.
- Updated developer README/instructions where needed.
- `.engineering/evidence/NEXLABS-WO-003-RUNTIME-FOUNDATION-EVIDENCE.md`
- `.engineering/checkpoint-deltas/NEXLABS-WO-003-RUNTIME-FOUNDATION-PROPOSED.md` updated with executor evidence, but not self-promoted.
- Updated canonical sources only where implementation facts make them stale.
- Commit(s), push and this PR updated by the executor.

## REVIEW FORMAT

Final executor report in Brazilian Portuguese:
- base SHA and exact head SHA;
- changed files grouped by purpose;
- architecture/package decisions;
- commands/tests with result;
- CI and GitHub ruleset evidence;
- accessibility/visual evidence;
- security/dependency findings;
- deviations and risks;
- proposed Checkpoint Delta;
- verdict request: APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop after implementation, corrections, evidence, push and PR update when all executor-controlled acceptance criteria are satisfied. Do not merge. If a required permission, invariant or HIGH/CRITICAL issue cannot be resolved safely, stop BLOCKED with evidence. Merge and checkpoint promotion belong to the independent audit gate.
