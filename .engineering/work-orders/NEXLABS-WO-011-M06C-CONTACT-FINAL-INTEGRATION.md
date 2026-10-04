# NEXLABS-WO-011-M06C-CONTACT-FINAL-INTEGRATION — M06C Contact + Final Cross-Route Integration

Status: ADMITTED — READY FOR CODEX EXECUTOR

Risk class: STANDARD

## OBJECTIVE

Complete M06 Secondary Pages by shipping a factual-safe, read-only `/contact` route and finalizing cross-route navigation without collecting or transmitting user information.

Codex is the implementation executor for this Work Order.

## CONTEXT

M06B was independently APPROVED at exact head `ee160d50a4ca8c1edad25d06a295c505eace6993`, squash-merged in PR #14 and checkpoint-promoted in PR #15.

Admission base main SHA: `2d9262d85f2336a63e4929a5b941f834b08f0141`.

Production routes at admission: `/`, `/technology`, `/solutions`, `/research`, `/company`.

Repository search found no verified public email, phone, office address or social profile. M06C therefore admits a read-only Contact destination only. No form, submission endpoint, mailto/tel link, CRM or personal-data collection is authorized.

## SCOPE

### A. Contact route
Implement `/contact` with exact canonical copy from SECONDARY-PAGES-SPEC.md:
- cinematic Contact hero;
- Project Brief with four elements;
- Contact Availability;
- Data Boundary;
- canonical metadata.

### B. Contact visual system
Use aligned signal fields converging on a clean central gateway, with rails/nodes/brand-energy glow in CSS/SVG/HTML only. No fake inbox/map/feed and no new WebGL/Three scene.

### C. Read-only privacy/security boundary
Contact MUST contain no `form`, input, textarea, select, upload, submit control, contact API/server action, network submission behavior, mailto/tel, invented contact channel, CRM/newsletter/database/auth or analytics addition.

### D. Final global navigation
- keep four primary nav items;
- header action: `Contact Nex Labs` → `/contact`;
- footer final action: `Contact Nex Labs` → `/contact`;
- verify on all six V1 routes.

### E. Final Home transition
Preserve Home `#contact` id. Update only:
- final CTA body to the exact M06C canonical sentence;
- secondary CTA to `Contact Nex Labs` → `/contact`;
- primary `Explore capabilities` remains unchanged.

### F. Final M06 integration
Verify Home, Technology, Solutions, Research, Company and Contact. Preserve all prior content/metadata/layout except admitted final navigation changes.

### G. SEO / accessibility / responsive / performance
- exact Contact title/description;
- one H1, logical hierarchy;
- WCAG 2.2 AA target;
- keyboard/focus/skip-link;
- reduced motion;
- 1600×900, 1440×900, tablet, 390×844 and 320px with no overflow;
- Contact JS <= 220 KiB gzip;
- no Home Three/hero chunks;
- mobile LCP <= 2.5s where measurable, CLS <= .10, interaction proxy <= 200ms.

### H. Evidence
Create `.engineering/evidence/NEXLABS-WO-011-M06C-CONTACT-FINAL-INTEGRATION-EVIDENCE.md` and directory with Contact desktop/mobile, focus, reduced motion, header/footer Contact action, Home final transition, zero-collection DOM report, six-route navigation report, axe, overflow, performance, regressions and Docker evidence.

### I. Docker
End UP/healthy. All six V1 routes must return HTTP 200. Do not run `docker compose down`.

## OUT OF SCOPE

- contact form/backend/data submission;
- email provider/service or mailto/tel;
- CRM/newsletter/database/auth;
- analytics/trackers;
- localization/careers;
- public deployment;
- WebGPU/new Three/R3F/WebGL scene;
- new animation framework;
- invented business/contact facts;
- M07 hardening/launch;
- unrelated cleanup;
- force-push/rebase/history rewrite;
- weakening checks.

## FILES / SOURCES TO READ

1. CHECKPOINT.md / CHECKPOINT.json
2. SECONDARY-PAGES-SPEC.md
3. HOME-CONTENT-SPEC.md
4. SCOPE.md
5. DEFINITION-OF-DONE.md
6. ARCHITECTURE.md
7. REQUIREMENTS.md
8. UI-UX.md
9. VISUAL-DIRECTION.md
10. BRAND-SYSTEM.md
11. SECURITY.md
12. TEST-BENCHMARK-PLAN.md
13. DEPLOYMENT.md
14. DECISIONS-LEDGER.md
15. AGENTS.md
16. `.engineering/context-locks/NEXLABS-WO-011-M06C-CONTACT-FINAL-INTEGRATION.json`
17. current Home/M06 components and tests.

## REQUIREMENTS

- Implement exactly M06C.
- Exact canonical copy only.
- GEF CLI remains 1.1.2.
- Package manifests unchanged; no dependency additions.
- Server Components/static semantic content by default.
- Contact remains read-only and zero-collection.
- No invented contact channel.
- All six routes regression-green.

## ARCHITECTURE RULES

Next.js App Router, strict TypeScript, Server Components by default, CSS Modules/tokens, reuse SiteHeader/SiteFooter/BrandMark/M06 primitives, SVG/HTML/CSS artwork only, no Home HeroScene on Contact, no global state, no UI framework, no backend/provider coupling.

## CONSTRAINTS

If CHECKPOINT, Scope, DoD, Architecture, Requirements, Security, SECONDARY-PAGES-SPEC, HOME-CONTENT-SPEC, Work Order or a relevant accepted decision changes after admission, mark STALE and recompile/rebase. Do not broaden into M07. Do not self-approve/promote/merge. Docker continuity mandatory.

## ACCEPTANCE CRITERIA

1. `/contact` exists with exact canonical copy.
2. Exact title/description and exactly one H1.
3. Project Brief has four canonical elements.
4. Contact Availability and Data Boundary exact copy exist.
5. Contact visual language matches M06 and uses no WebGL.
6. No form/input/textarea/select/upload/submit control.
7. No Contact API/server action/submission behavior.
8. No mailto/tel or invented email/phone/address/social.
9. No CRM/newsletter/database/auth/analytics addition.
10. Header action is `Contact Nex Labs` → `/contact` on all six routes.
11. Footer final action is `Contact Nex Labs` → `/contact` on all six routes.
12. Home `#contact` id remains.
13. Home final CTA body matches canonical M06C copy.
14. Home secondary CTA is `Contact Nex Labs` → `/contact`.
15. Home primary final CTA unchanged.
16. Prior route content/metadata regressions green.
17. Contact skip-link/keyboard/focus correct.
18. axe has no serious/critical violation.
19. Required viewports have no overflow; 320px header action usable.
20. Reduced motion removes nonessential Contact motion.
21. Contact mounts no canvas/Home HeroScene.
22. Initial Contact JS <= 220 KiB gzip; Home 3D chunks isolated.
23. Performance targets pass or justified variance retained.
24. lint/typecheck/unit/build/browser suites pass.
25. npm audit/security has no unresolved HIGH/CRITICAL.
26. Evidence Bundle proves zero-collection and six-route navigation.
27. Docker UP/healthy; six routes HTTP 200.
28. Exact-head CI Quality, Browser Smoke, Socket, Sonar and CodeRabbit/review signals checked.
29. Independent exact-head audit yields APPROVED before merge.

## TESTS

`npm ci`, lint, typecheck, unit, build, full E2E, moderate npm audit, diff check, secret scan; Contact metadata/content; zero form/input/upload/submit; zero mailto/tel/external contact channel; six-route Contact navigation; Home final CTA; axe; keyboard/focus; responsive; reduced motion; JS/chunk isolation; absence of canvas/Home scene; Home+M06A+M06B regressions; exact-head GitHub checks; Docker/HTTP.

## DELIVERABLES

Production `/contact`, Contact artwork, final global Contact action, final Home CTA transition, metadata, tests, zero-collection evidence, accessibility/responsive/performance evidence, Evidence Bundle, proposed Checkpoint Delta, Docker UP/healthy, PR OPEN/READY FOR REVIEW.

## REVIEW FORMAT

Brazilian Portuguese: base/head + Context Lock freshness; files; Contact fidelity; zero-collection/privacy; navigation/Home finalization; architecture/dependencies; responsive/a11y; tests/security; performance/isolation; six-route regressions; Docker; risks; APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with M06C fully implemented, tested and evidenced, Docker UP/healthy and PR OPEN/READY FOR REVIEW. Do not merge. Do not promote checkpoint. Do not begin M07.
