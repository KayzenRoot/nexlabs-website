# NEXLABS-WO-STARTUP-SEO-001
Status: OWNER-ADMITTED / IMPLEMENTED CANDIDATE / CI + INDEPENDENT VALIDATION REQUIRED
Risk: ELEVATED; exposure to search engines, public founder identity and live website.
BASE EXACT LIVE COMMIT: ffb786669daec5cd04681b27e837cf1c7ddb447d
CONTEXT LOCK: active PR #20 visual fidelity and live production branch remain separate.
OBJECTIVE: improve independent eligibility verification for Claude Startups without altering true legal status.
NECESSARY: Vercel prod-only index/follow; sitemap/robots; canonical URLs for 13 known public routes; metadata social preview; WebSite/Person JSON-LD; visible founder email through mailto only.
OUT OF SCOPE: US incorporation, CNPJ, paid subscriptions, invented Claude usage, customer traction, analytics, Google verification-token guessing, changing visual Home, removing the prelaunch banner, new dependencies, automatic Anthropic application.
FILES: read canonical CHECKPOINT.md, DECISIONS-LEDGER.md, SCOPE.md, VERCEL-PRELAUNCH-SPEC.md, Startup Master/Checkpoint and approved public HIVE release.
REQUIREMENTS: canonical domain www.nexlabs.company; every HTML route has self-canonical, same public evidence as GitHub; nonproduction retains noindex and Disallow; live production exposes robot Allow and sitemap, no crawler index blocking.
ARCHITECTURE: Next.js metadata APIs and sitemap/robots routes, static public source JSON; no backend or client-side trackers.
CONSTRAINTS: no app intake; no new deps; preserve CSP, 404, responsiveness, 3D and existing visual routes. No publishing private personal IDs.
ACCEPTANCE: lint, types, unit, security audit, full Playwright, responsive/browser/accessibility, Sonar, Socket, Vercel and live 13-route HTTP/head meta/robots/sitemap, with exact SHA evidence and rollback.
TESTS: npm ci, npm audit --audit-level=moderate, npm run lint, npm run typecheck, npm run test, npm run build, npm run test:e2e, live smoke of prod and preview.
DELIVERABLES: isolated Git branch and PR against exact deployed baseline, deployment receipt, canonical evidence, founder public proof.
REVIEW FORMAT: APPROVED / CORRECTION REQUIRED / BLOCKED, no waiver of failed tests.
STOP CONDITION: no reapplication submitted; live public SEO released only when verified. Upcoming WO-013 merge must incorporate changes under an explicit context refresh.