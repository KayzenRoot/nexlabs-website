# NEXLABS-WO-010-M06B-RESEARCH-COMPANY — M06B Research + Company

Status: APPROVED — MERGED

Risk class: STANDARD

## COMPLETION RECORD

- Independent audit: APPROVED.
- Exact approved head: `ee160d50a4ca8c1edad25d06a295c505eace6993`.
- PR: #14.
- Squash product merge on main: `f53318d5b9f857d924d41245515206ce59af53e8`.
- Exact-head CI Quality, Browser Smoke, Sonar, Socket and CodeRabbit signals passed.
- Two actionable CodeRabbit threads were resolved before merge.
- Visual/contrast spot review completed for Research/Company desktop and mobile evidence.
- Context Lock critical sources were verified directly with 0 STALE.
- M06B checkpoint promotion occurs only after that merge.

## OBJECTIVE

Continue M06 Secondary Pages with two factual-safe public destinations, `/research` and `/company`, reusing the approved M06A secondary-page foundation and upgrading Research/Company navigation only when the corresponding real routes exist.

Codex is the implementation executor for this Work Order.

## CONTEXT

M06A Technology + Solutions was independently APPROVED at exact head `0328527eabd6efd6cf763e4f7baf731a93731229`, squash-merged in PR #12 and promoted into the canonical checkpoint by PR #13.

Admission base main SHA: `96330a8d50c30fab2a680b27f1c56252a4ac4fb6`.

Production routes at admission:
- `/`;
- `/technology`;
- `/solutions`.

M06B owns Research + Company only. Contact remains M06C.

The current Home contains two pieces of transitional Research copy/navigation that become stale once M06B lands. Correcting those exact Home destinations/copy is NECESSARY to keep public content truthful and route topology coherent.

## CANONICAL CONTENT SOURCE

Implement the M06B sections of `.engineering/SECONDARY-PAGES-SPEC.md`.

For Home transition copy/destinations, implement the updated `.engineering/HOME-CONTENT-SPEC.md`.

## SCOPE

### A. Research route

Implement `/research` with exact canonical copy.

Required areas:
1. compact cinematic Research hero;
2. Research Method with four stages;
3. five factual-safe exploration areas;
4. Research Integrity section;
5. CTA to Company;
6. metadata from the canonical spec.

Visual direction:
- branching signal lattice / hypothesis field;
- evidence nodes and restrained energy travel;
- CSS/SVG/HTML only;
- no fake publications, patents, paper titles, citations or breakthrough claims.

### B. Company route

Implement `/company` with exact canonical copy.

Required areas:
1. compact cinematic Company hero;
2. Purpose narrative;
3. four approved operating principles;
4. four Working Model behaviors;
5. Company Integrity section;
6. CTA back to Research;
7. metadata from the canonical spec.

Visual direction:
- precision alignment field / measured geometry;
- restrained brand-N echo;
- rails and four principle nodes;
- no fake team portraits, offices, timeline, headcount, awards or partner wall;
- CSS/SVG/HTML only.

### C. Reuse and secondary-page architecture

Reuse and generalize the M06A shared secondary-page foundation where it materially reduces duplication.

Allowed:
- evolve comments/naming from M06A-specific to M06-program shared language;
- add Research/Company decorative SVG components to the existing shared secondary-page component when appropriate;
- add small reusable primitives only with real cross-route value.

Forbidden:
- second design system;
- new WebGL/Three scene;
- new UI framework;
- global state store;
- new animation engine;
- new dependency by default.

### D. Navigation transition

After both routes exist:

Global header/footer:
- Brand/home → `/`;
- Solutions → `/solutions`;
- Technology → `/technology`;
- Research → `/research`;
- Company → `/company`;
- Explore the next chapter → `/#contact` until M06C.

Existing secondary routes:
- Technology secondary research action: `Explore research` → `/research`;
- Solutions secondary research action: `Explore research` → `/research`.

Home:
- Research CTA `Explore research` → `/research`;
- Final CTA `View research` → `/research`;
- Final CTA body becomes exactly:
  `Technology, Solutions, Research and Company extend the Nex Labs story beyond the Home. Contact remains the next dedicated destination.`

Do not remove Home section anchors or change unrelated Home CTAs.

### E. SEO / metadata

Each new route must expose:
- exact unique title from SECONDARY-PAGES-SPEC.md;
- exact factual-safe description;
- exactly one semantic H1;
- logical heading hierarchy.

Do not invent production canonical URLs, Organization facts or structured data beyond verified existing facts.

### F. Accessibility

Target WCAG 2.2 AA:
- keyboard reachable links;
- visible focus;
- skip-link/main behavior preserved;
- decorative SVG hidden from assistive technology;
- sufficient contrast;
- reduced motion disables nonessential secondary-page motion;
- meaningful copy remains semantic HTML.

### G. Responsive behavior

Validate:
- 1600×900;
- 1440×900;
- representative tablet;
- 390×844;
- 320px where relevant.

No unexpected horizontal overflow.

### H. Performance

- Initial route JS <= 220 KB gzip per Research/Company route.
- Research/Company must not mount/load Home Three/R3F scene as page content.
- No page-specific canvas/WebGL.
- Representative mobile LCP target <= 2.5 s where measurable.
- CLS <= 0.10.
- Interaction proxy <= 200 ms where measurable.
- Reuse existing CSS/SVG vocabulary before adding assets.

### I. Regression safety

Preserve:
- Home M04 FULL/BALANCED/STATIC behavior and fallbacks;
- M05 Home content except exact transition changes admitted here;
- M06A Technology/Solutions content and visual system except exact Research CTA transition;
- package manifests and dependency graph;
- production identity.

### J. Evidence Bundle

Create:
- `.engineering/evidence/NEXLABS-WO-010-M06B-RESEARCH-COMPANY-EVIDENCE.md`;
- `.engineering/evidence/NEXLABS-WO-010-M06B-RESEARCH-COMPANY/`.

Retain at minimum:
- Research desktop 1600×900;
- Research mobile 390×844;
- Company desktop 1600×900;
- Company mobile 390×844;
- keyboard/focus evidence for both routes;
- reduced-motion evidence;
- route-aware header/footer evidence;
- Home Research/final-CTA transition evidence;
- Technology/Solutions Research CTA regression evidence;
- axe results for both routes;
- overflow evidence;
- route JS/performance report;
- Home + M06A regression results;
- Docker health/HTTP results.

### K. Docker continuity

End with Docker UP/healthy.

Required HTTP checks:
- `/` → 200;
- `/technology` → 200;
- `/solutions` → 200;
- `/research` → 200;
- `/company` → 200;
- `/contact` → 404 until M06C.

Do not run `docker compose down`.

## OUT OF SCOPE

- `/contact` route;
- contact form/backend or data submission;
- CMS/CRM;
- authentication/database;
- analytics/trackers;
- localization;
- careers;
- public deployment;
- WebGPU or new Three/R3F/WebGL scene;
- new animation framework;
- customer/partner/project/publication/patent proof without verified source;
- team/founding/headcount/office/geographic claims without verified source;
- fake team imagery/timeline;
- unrelated cleanup/refactor;
- force-push/rebase/history rewrite;
- weakening rulesets/checks.

## FILES / SOURCES TO READ

1. `.engineering/CHECKPOINT.md` / `.engineering/CHECKPOINT.json`
2. `.engineering/SECONDARY-PAGES-SPEC.md`
3. `.engineering/HOME-CONTENT-SPEC.md`
4. `.engineering/SCOPE.md`
5. `.engineering/DEFINITION-OF-DONE.md`
6. `.engineering/ARCHITECTURE.md`
7. `.engineering/REQUIREMENTS.md`
8. `.engineering/UI-UX.md`
9. `.engineering/VISUAL-DIRECTION.md`
10. `.engineering/BRAND-SYSTEM.md`
11. `.engineering/SECURITY.md`
12. `.engineering/TEST-BENCHMARK-PLAN.md`
13. `.engineering/DECISIONS-LEDGER.md`
14. `AGENTS.md`
15. active Context Lock `.engineering/context-locks/NEXLABS-WO-010-M06B-RESEARCH-COMPANY.json`
16. current Home, Technology, Solutions, shared secondary components and tests before editing.

## REQUIREMENTS

- Implement exactly M06B.
- Use exact public copy from canonical specs.
- Keep GEF CLI pinned at 1.1.2.
- Keep package manifests unchanged.
- If a dependency becomes objectively necessary, STOP and request re-admission.
- Use Server Components/static semantic content by default.
- Keep public claims factual-safe.
- Do not create a Contact route or form.
- Keep all five implemented routes coherent and regressions green.

## ARCHITECTURE RULES

- Next.js App Router.
- Strict TypeScript.
- Server Components by default.
- CSS Modules + existing design tokens.
- Reuse SiteHeader, SiteFooter, BrandMark and M06 secondary-page primitives.
- Shared artwork/primitives remain lightweight SVG/HTML/CSS.
- Research/Company do not import/mount Home HeroScene.
- No second WebGL scene.
- No global state.
- No UI framework.
- No provider/deployment coupling.
- No semantic content hidden only in decoration.

## CONSTRAINTS

- Base / Context Lock must remain fresh.
- If CHECKPOINT, Scope, DoD, Architecture, Requirements, SECONDARY-PAGES-SPEC, HOME-CONTENT-SPEC or a relevant accepted decision changes after admission, mark context STALE and recompile/rebase before continuing.
- Do not broaden into M06C.
- Do not self-approve, promote checkpoint or merge.
- Docker continuity is mandatory.

## ACCEPTANCE CRITERIA

1. `/research` exists with all canonical M06B Research content.
2. `/company` exists with all canonical M06B Company content.
3. Both routes expose exact unique metadata and exactly one semantic H1.
4. Research implements four Research Method stages.
5. Research implements five Exploration Areas.
6. Research Integrity contains no fabricated research proof.
7. Company implements Purpose, four Operating Principles and four Working Model behaviors.
8. Company Integrity contains no fabricated company proof.
9. Both routes visually inherit the approved secondary-page system without generic-template drift.
10. Research uses signal/evidence vocabulary without WebGL.
11. Company uses alignment/principle vocabulary without fake people/office/timeline assets.
12. Global Research links resolve to `/research`.
13. Global Company links resolve to `/company`.
14. Global next-chapter CTA remains `/#contact`.
15. Technology/Solutions Research CTA resolves to `/research` with canonical label.
16. Home Research CTA and final View research CTA resolve to `/research`.
17. Home final CTA body matches updated canonical copy.
18. Home anchors remain valid and no unrelated Home navigation is changed.
19. No `/contact` route is introduced; direct `/contact` remains 404.
20. Direct Research/Company loads preserve skip link, keyboard navigation and visible focus.
21. Automated accessibility finds no serious/critical violations on both new routes.
22. 390×844 and 320px checks have no unexpected horizontal overflow.
23. Reduced motion removes nonessential secondary motion.
24. Research/Company mount no canvas/Home HeroScene.
25. Initial Research/Company JS remains <= 220 KB gzip and Home 3D chunks remain isolated.
26. Performance targets pass or justified variance is retained.
27. Existing Home, Technology and Solutions regressions remain green.
28. lint, typecheck, unit, production build and browser suites pass.
29. npm audit/security checks have no unresolved HIGH/CRITICAL finding.
30. Evidence Bundle is complete and tied to immutable implementation/test references plus exact-head PR audit metadata.
31. Docker remains UP/healthy; five implemented routes return 200 and `/contact` returns 404.
32. Exact-head CI Quality, Browser Smoke, Socket, Sonar and CodeRabbit/review signals are checked.
33. Independent exact-head audit yields APPROVED before merge.

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
- direct HTTP/browser checks for all five implemented routes and `/contact` 404
- exact metadata/content-integrity tests for Research/Company
- cross-route global navigation tests
- Home Research/final CTA transition tests
- Technology/Solutions Research CTA transition tests
- axe on Research + Company
- keyboard/focus checks
- responsive checks at required viewports
- reduced-motion checks
- Research/Company JS/chunk isolation inspection
- explicit absence of page-specific canvas/Home scene
- Home + M06A regression suite
- exact-head GitHub checks
- Docker health + HTTP status evidence

## DELIVERABLES

- production `/research`;
- production `/company`;
- lightweight Research/Company artwork/primitives;
- route-aware global navigation;
- exact transition updates on Home/Technology/Solutions;
- metadata;
- tests;
- responsive/reduced-motion styling;
- screenshots + performance/bundle evidence;
- Evidence Bundle markdown;
- proposed Checkpoint Delta for WO-010;
- Docker UP/healthy;
- PR updated and ready for independent audit.

## REVIEW FORMAT

Brazilian Portuguese:
- base/head and Context Lock freshness;
- files by purpose;
- Research content/fidelity;
- Company content/fidelity;
- public-claim integrity;
- global/Home/M06A navigation transition;
- architecture/dependency review;
- responsive/accessibility;
- tests/security;
- performance/chunk isolation;
- regressions;
- Docker;
- risks/gaps;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Historical executor STOP CONDITION was satisfied before independent review. M06B is now APPROVED and merged. Do not begin M06C implementation until WO-011 and its exact Context Lock are separately admitted.
