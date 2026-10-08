# NexLabs Pre-launch Founder Portfolio — Owner-scoped addendum

**Status:** IMPLEMENTED ON ISOLATED BRANCH; preview tests/audit pending; no checkpoint promotion.
**Risk:** STANDARD (static public claims; no personal data collection).
**Objective:** Add evidence-backed public project pages to the currently deployed temporary pre-launch snapshot. Preserve the entire visual-fidelity correction in PR #20 and the public production deployment until validation.
**Context Lock:** exact production source commit 98775682aeab6e97ff02f505cb9d5e6ce37fc0b2 / tree fead3e83521209c6eb64c0c525a59f32b0ed6943. Independent branch: work/nexlabs-prelaunch-portfolio-production-snapshot.
**Owner direction:** add only necessary project pages to the existing deployed version; do not replace its Home with ongoing GitHub work.

## Source authority
- Git tree/deployed SHA supersedes chat descriptions.
- Decisions D-0008, D-0025, D-0026 and D-0028 remain protected.
- Temporary Vercel pre-launch keeps banner, noindex/nofollow, robots disallow, six routes, Contact zero-collection, security and the visual Master untouched.
- NexLabs startup checkpoint is pre-incorporation, no outside funding, zero application budget; site must not imply incorporation, traction or customers.

## Scope and work order: NEXLABS-WO-PRELAUNCH-PORTFOLIO
- OBJECTIVE: public, bounded GitHub evidence for the founder's existing projects.
- SCOPE: one /projects index, five /projects/[slug] records, matching styling, minimal footer discovery link, no new dependency.
- OUT OF SCOPE: Home/hero/navigation redesign, visual WO-013 correction, DNS/SEO changes, analytics, forms, Contact data collection, incorporation claims, merging PR #20.
- FILES/SOURCES: published repo tree and canonical sources; read linked public project READMEs.
- ARCHITECTURE: Next.js App Router server routes and CSS Modules, no new WebGL/client JS.
- REQUIREMENTS: accessible server-rendered routes; links to verified GitHub repos; honest release/planning status; no fabricated customer, funding, product release or legal claims.
- ACCEPTANCE: existing routes unchanged; six additional pages build with public README-grounded content; visible footer link; footer and banner remain; noindex; responsive layout; no sensitive data.
- TESTS: npm ci, lint, typecheck, unit, build, browser route/keyboard/mobile/security smoke, Vercel preview and exact-head hosted checks.
- DELIVERABLES: isolated Git commit/branch; preview link; Evidence Bundle and candidate HEAD; final deployment only after validation, never auto-merge into unrelated branch.
- REVIEW FORMAT: APPPROVED / CORRECTION REQUIRED / BLOCKED plus tested SHA and failures.
- STOP: do not promote preview to production until validated; do not merge unrelated branches; do not alter active WO-013.

## Repository evidence reviewed 2026-10-08
- HIVE: public README documents latest stable release v1.0.2, current patch candidate v1.0.3.
- NexLabs Company OS: local read-only Founder Command Center and offline cell; not production-connected.
- NERVA: governed policy/safety implementation, live financial effects blocked.
- UGAS V2: source-pack planning, implementation not yet authorized.
- CoinBlink: design/planning, portal not implemented or deployed.

## Pending validation
- Git branch HEAD and changed-file checks.
- Hosted CI, production-like build, lint/typecheck/unit/e2e on preview.
- Live preview 7 base+portfolio paths, 5 detail paths, 404, banner and robots/index posture.
- Independent review of exact candidate SHA.
- Production promotion, checkpoint updates and any final launch are NOT claimed.
