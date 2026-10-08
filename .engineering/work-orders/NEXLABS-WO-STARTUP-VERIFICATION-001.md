# NEXLABS-WO-STARTUP-VERIFICATION-001

Status: IMPLEMENTATION CANDIDATE / no production admission until checks and owner review.
Risk: STANDARD. The route publishes factual founder attribution and contact identity.
Source base: exact production SHA cd292fe793f31e73686b3808787cd0990741c9a6.
Context Lock: production SHA, active PR #20 remains isolated; startup checkpoint (pre-incorporation), accepted startup DEC-001 to DEC-008, existing site D-0008, D-0028 (temporary public/noindex), existing portfolio PR #22.
Objective: provide independently inspectable public founder/project facts to support honest startup eligibility reapplication.
Scope: /company/verification (server-rendered page), one link from /projects; no new dependencies.
Out of scope: legal registration, country change, payment, Console account changes, sending Anthropic applications, SEO/indexing gates, Contact data collection, Home/3D redesign, merge of PR #20.
Files and sources: site Checkpoint, Decisions Ledger, Scope, DoD, Next.js Architecture; startup CHECKPOINT.md, DECISIONS.md, STARTUP-MASTER.md; HIVE README and release record.
Requirements: refer to startup as pre-incorporation; identify founder Clayton Nunes, Brazil, email founder@nexlabs.company; use only public GitHub as project evidence; no invented user, funding, customer, company registration, model integration or AI spend.
Architecture rules: Next App Router server component, CSS Module, no new JS/runtime dependency, no new WebGL.
Constraints: preserve prelaunch banner, robots disallow, noindex/nofollow, original six routes, portfolio pages, security headers, contact zero-collection, PR #20 independence.
Acceptance criteria: /company/verification 200, link on /projects, mobile responsive, automated accessibility, correct evidence links, security headers, existing sites unaffected.
Tests: npm ci, lint, typecheck, unit, build, browser tests on preview, security/CI; validate existing routes and status.
Deliverables: branch + GitHub PR, Vercel preview, exact HEAD evidence, independent review.
Review format: APPROVED / CORRECTION REQUIRED / BLOCKED, with exact tested SHA and verification report.
Stop condition: do not merge into main or production deploy without exact-head evidence; preserve WO-013 state. This branch starts strictly from already-deployed production source.
