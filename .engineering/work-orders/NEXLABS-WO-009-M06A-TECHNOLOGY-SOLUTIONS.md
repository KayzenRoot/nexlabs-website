# NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS — M06A Technology + Solutions

Status: ADMITTED — READY FOR CODEX EXECUTOR

Risk class: STANDARD

## OBJECTIVE

Begin M06 Secondary Pages with the smallest coherent production increment: establish a reusable secondary-page visual/content foundation and ship the first two real routes, `/technology` and `/solutions`, without weakening the approved Home, adding another heavy runtime or linking to routes that do not exist.

Codex is the implementation executor for this Work Order.

## CONTEXT

M05 Home Content Sections was independently APPROVED at exact head `22b3012551cce8f8a585605cf0f7a246ecd2a2a0`, squash-merged in PR #10, and its canonical checkpoint was promoted in PR #11.

Admission base main SHA: `3147c1dfa55e2e19fdb8510ac474ef7574961526`.

The Home is complete through M05 and already provides the approved Precision Blades identity, global chrome, Next.js App Router, strict TypeScript, CSS Modules/design tokens, M04 Home 3D quality tiers/fallbacks, M05 semantic content, test foundations and Docker continuity.

M06 is split into independently auditable increments. This Work Order owns **M06A only**.

## CANONICAL CONTENT SOURCE

Implement `.engineering/SECONDARY-PAGES-SPEC.md`.

Only Technology and Solutions are executable in M06A. Research, Company and Contact remain reserved.

## SCOPE

### A. Secondary-page foundation
Create a small reusable secondary-page composition system using Server Components by default, CSS Modules, existing design tokens and semantic HTML. Shared primitives are allowed only where they remove material duplication. No UI framework, global state store, new animation engine, new dependency or new WebGL scene.

### B. Technology route
Implement `/technology` from the exact canonical copy. Required: cinematic compact hero, modular-platform narrative, five architecture layers, four architecture principles, closing narrative and only valid CTAs. Use stacked cube/layer, rails/nodes and chrome/cyan/glass vocabulary with CSS/SVG/HTML.

### C. Solutions route
Implement `/solutions` from the exact canonical copy. Required: cinematic compact hero, five capability areas, four solution-framing stages, factual-integrity note and only valid CTAs. Evolve the approved Home capability language without customer/case-study fiction.

### D. Route-aware global navigation
Required destinations:
- brand/home → `/`;
- Solutions → `/solutions`;
- Technology → `/technology`;
- Research → `/#research`;
- Company → `/#vision`;
- Explore the next chapter → `/#contact`.

Do not create `/research`, `/company` or `/contact` placeholders.

### E. SEO / metadata
Each new route uses the exact unique title/description from the spec, one semantic H1 and logical heading hierarchy. Do not invent a production canonical domain.

### F. Accessibility
Target WCAG 2.2 AA. Preserve skip-link/main behavior, keyboard reachability, visible focus, contrast, decorative SVG semantics and reduced-motion behavior.

### G. Responsive
Validate 1600×900, 1440×900, representative tablet, 390×844 and relevant 320px keyboard/mobile behavior. No unexpected horizontal overflow.

### H. Performance
- initial route JS <= 220 KB gzip;
- no Home Three/R3F scene on secondary routes;
- no page-specific canvas/WebGL;
- representative mobile LCP target <= 2.5 s where measurable;
- CLS <= 0.10;
- interaction proxy <= 200 ms where measurable;
- prefer CSS/SVG over heavy raster assets.

### I. Regression safety
Home hero tiers/fallbacks, Home M05 content and brand assets remain intact except navigation changes explicitly required here.

### J. Evidence Bundle
Create `.engineering/evidence/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS-EVIDENCE.md` and `.engineering/evidence/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/`. Retain Technology/Solutions desktop 1600×900 and mobile 390×844, route-aware nav, keyboard/focus, reduced-motion, axe, overflow, route performance/bundle report, Home regression and Docker evidence.

### K. Docker continuity
End with Docker UP/healthy. `/`, `/technology` and `/solutions` must return HTTP 200. Do not run `docker compose down`.

## OUT OF SCOPE

- `/research`, `/company`, `/contact`;
- contact backend/form submission;
- CMS/CRM, auth/database, analytics/trackers;
- localization/careers;
- public deployment;
- new Three/R3F/WebGL scene or WebGPU;
- new animation framework;
- fabricated proof/case studies;
- unrelated cleanup;
- force-push/rebase/history rewrite;
- weakening governance/checks.

## FILES / SOURCES TO READ

1. CHECKPOINT.md / CHECKPOINT.json
2. SECONDARY-PAGES-SPEC.md
3. SCOPE.md
4. DEFINITION-OF-DONE.md
5. ARCHITECTURE.md
6. REQUIREMENTS.md
7. UI-UX.md
8. VISUAL-DIRECTION.md
9. HOME-VISUAL-MASTER-SPEC.md
10. HOME-CONTENT-SPEC.md
11. BRAND-SYSTEM.md
12. SECURITY.md
13. TEST-BENCHMARK-PLAN.md
14. DECISIONS-LEDGER.md
15. AGENTS.md
16. active Context Lock `.engineering/context-locks/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS.json`
17. current route/components/tests before editing.

## REQUIREMENTS

- Implement exactly M06A.
- Exact public copy comes from SECONDARY-PAGES-SPEC.md.
- Keep GEF CLI pinned at 1.1.2.
- Package manifests remain unchanged; if a new dependency becomes objectively necessary, STOP and request re-admission.
- Server-render/static content by default.
- No broken or future-route links.
- Home regression behavior remains intact.

## ARCHITECTURE RULES

- Next.js App Router + strict TypeScript.
- Server Components by default.
- CSS Modules + existing tokens.
- Reuse SiteHeader, SiteFooter and BrandMark.
- Shared secondary primitives only when justified by real duplication.
- Never import/mount Home HeroScene in secondary pages.
- No second WebGL scene, global state, UI framework or provider coupling.

## CONSTRAINTS

If CHECKPOINT, SCOPE, DoD, ARCHITECTURE, REQUIREMENTS, SECONDARY-PAGES-SPEC or a relevant accepted decision changes after admission, mark the Context Lock STALE and recompile/rebase. Do not broaden into M06B/M06C. Do not self-approve, promote checkpoint or merge.

## ACCEPTANCE CRITERIA

1. `/technology` implements all approved Technology content.
2. `/solutions` implements all approved Solutions content.
3. Both routes have unique metadata and exactly one H1.
4. Both inherit the approved visual system without generic-template drift.
5. Technology uses stacked-layer/cube vocabulary without WebGL.
6. Solutions uses approved capability language without fabricated proof.
7. Brand/home resolves to `/` from all routes.
8. Solutions and Technology global links resolve to real routes.
9. Research/Company/next-chapter links remain valid Home destinations.
10. No link points to unimplemented M06B/M06C routes.
11. Direct loads preserve skip link, keyboard nav and visible focus.
12. Axe/accessibility has no serious/critical violation on both routes.
13. Mobile has no unexpected horizontal overflow.
14. Reduced motion removes nonessential secondary motion.
15. Secondary routes mount no canvas/Home HeroScene.
16. Secondary-route JS <= 220 KB gzip and Home 3D code remains isolated.
17. Performance stays inside requirements or variance is documented.
18. Existing Home tests/fallback/tier behavior remain green.
19. lint/typecheck/unit/build/browser pass.
20. Security/dependency checks have no unresolved HIGH/CRITICAL.
21. Evidence Bundle is complete and exact-head bound.
22. Docker stays UP/healthy and all three implemented routes return HTTP 200.
23. Exact-head CI Quality, Browser Smoke, Socket, Sonar and CodeRabbit/review signals are checked.
24. Independent exact-head audit yields APPROVED before merge.

## TESTS

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `npm audit --audit-level=moderate`
- `git diff --check`
- secret-pattern scan
- HTTP/browser checks for `/`, `/technology`, `/solutions`
- metadata/content-integrity tests
- cross-route navigation tests
- axe on both new routes
- keyboard/focus/responsive/reduced-motion checks
- route JS/chunk isolation inspection
- explicit absence of page-specific canvas/Home scene
- Home regression suite
- exact-head GitHub checks
- Docker health

## DELIVERABLES

- production `/technology`;
- production `/solutions`;
- small shared secondary-page primitives where justified;
- route-aware global navigation;
- route metadata;
- tests and responsive/reduced-motion styles;
- Evidence Bundle/screenshots/performance report;
- proposed Checkpoint Delta;
- Docker UP/healthy;
- PR ready for independent audit.

## REVIEW FORMAT

Brazilian Portuguese: base/head + Context Lock freshness; files by purpose; Technology; Solutions; navigation; architecture/dependencies; responsive/accessibility; tests/security; performance/chunk isolation; Home regression; Docker; risks; APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with M06A fully implemented, tested and evidenced, Docker UP/healthy and PR OPEN/READY FOR REVIEW. Do not merge, promote checkpoint or begin M06B.
