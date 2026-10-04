# NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS — M07A Release Hardening & Production Readiness

Status: ADMITTED — READY FOR CODEX EXECUTOR

Risk class: ELEVATED

## OBJECTIVE

Harden the completed six-route Nex Labs V1 for production readiness without performing a public deployment, selecting a provider, inventing a production origin or adding product scope.

Codex is the implementation executor.

## CONTEXT

M06 Secondary Pages is COMPLETE. M06C was APPROVED at exact head `4d92cc9f75c66c92e0991be312da6d1b0afcee88`, product-merged as `72bf80e5c9b9dbf6518c42085e4f24d925899ea3`, and checkpoint-promoted by PR #17.

Admission base main SHA: `d7ec01e94d30a41a64aa683a345e4e5675541ca2`.

Current facts:
- six read-only V1 routes exist;
- Contact is zero-collection;
- development Docker is healthy on loopback;
- current Dockerfile is development-only;
- no production provider, URL, DNS/TLS target or credentials exist;
- no CSP/security-header strategy is implemented yet;
- no release-readiness workflow exists;
- no sitemap/canonical production origin may be fabricated.

## SCOPE

### A. Production response hardening
Implement the production-only header policy from RELEASE-READINESS-SPEC.md in `next.config.ts`. Preserve development Docker behavior.

### B. Pre-launch SEO/indexing safety
- global `noindex, nofollow`;
- add `robots.ts` / `robots.txt` disallowing `/`;
- keep `/sitemap.xml` absent until M07B;
- no fake canonical/metadataBase production origin.

### C. Failure experience
Implement branded accessible:
- `not-found.tsx`;
- application `error.tsx` recovery boundary.
Do not expose technical error details.

### D. Production container candidate
Add a separate production runtime path:
- standalone Next output;
- `Dockerfile.production`;
- `compose.production.yaml` or equivalent local release harness;
- non-root, minimal multi-stage runtime;
- loopback-only local port distinct from development;
- healthcheck;
- no-new-privileges + capability drop;
- read-only runtime where compatible or the smallest evidenced writable mount.

Do not replace or break the existing development Dockerfile/compose path.

### E. Release Readiness workflow
Add `.github/workflows/release-readiness.yml` that validates the production container, routes, headers, robots/noindex, 404, sitemap absence and non-root runtime. It must not deploy or use production secrets.

### F. Final regression/readiness suite
Extend tests only where necessary to prove:
- headers;
- noindex/robots;
- 404/error UI behavior;
- six routes;
- Contact zero-collection;
- responsive/a11y/reduced-motion;
- Home 3D lazy/fallback behavior;
- performance/chunk isolation.

### G. Recovery evidence
Perform and retain the container-level rollback rehearsal defined by RELEASE-READINESS-SPEC.md.

### H. Documentation/evidence
Create:
- Evidence Bundle for WO-012;
- proposed Checkpoint Delta;
- retained release-readiness reports/screenshots/log summaries needed by the acceptance criteria.
If implementation reveals a real architecture/security constraint, STOP if it would require changing a critical canonical source.

### I. Docker continuity
At executor stop:
- approved development Docker remains UP/healthy on `127.0.0.1:3000`;
- temporary production-candidate containers may be stopped/removed after evidence;
- do not run `docker compose down` on the development stack.

## OUT OF SCOPE

- public deployment;
- provider selection;
- production URL, domain or DNS;
- TLS termination or HSTS;
- canonical production URLs / sitemap publication / index enablement;
- analytics/trackers;
- Contact collection/submission;
- CMS/CRM/auth/database;
- localization/careers;
- product copy/visual redesign;
- dependencies unless objectively necessary and separately re-admitted;
- GitHub ruleset weakening;
- M07B implementation;
- force-push/rebase/history rewrite.

## FILES / SOURCES TO READ

1. CHECKPOINT.md / CHECKPOINT.json
2. RELEASE-READINESS-SPEC.md
3. SCOPE.md
4. DEFINITION-OF-DONE.md
5. ARCHITECTURE.md
6. REQUIREMENTS.md
7. SECURITY.md
8. DEPLOYMENT.md
9. TEST-BENCHMARK-PLAN.md
10. SOURCE-HIERARCHY.md
11. DECISIONS-LEDGER.md
12. UI-UX.md / VISUAL-DIRECTION.md
13. AGENTS.md
14. active Context Lock `.engineering/context-locks/NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS.json`
15. `next.config.ts`, `Dockerfile`, `compose.yaml`, `.dockerignore`
16. current workflows, app layout/failure paths and all existing tests.

## REQUIREMENTS

- Implement exactly M07A.
- Keep GEF CLI at 1.1.2.
- Package manifests remain unchanged.
- No new npm dependency by default.
- Existing six-route content remains unchanged.
- Contact zero-collection remains intact.
- Production hardening must be measurable in local production mode, not inferred from dev.
- No external production service or secret may be required.

## ARCHITECTURE RULES

- Next.js App Router / strict TypeScript.
- Existing Home 3D architecture remains isolated and lazy.
- Security headers are production behavior and must not break development.
- Development and production Docker paths remain separate.
- Production image is multi-stage, non-root and minimal.
- No backend/provider coupling.
- No invented origin/domain.
- Release workflow is validation-only, never deployment.

## CONSTRAINTS

If CHECKPOINT, Scope, DoD, Architecture, Requirements, Security, Deployment, Release Readiness Spec, Work Order or accepted decision changes after admission, mark STALE and recompile/rebase.

Because risk is ELEVATED:
- require broad regression;
- require security/header evidence;
- require production-container evidence;
- require rollback rehearsal;
- no merge with unresolved HIGH/CRITICAL or broken recovery proof.

Do not begin M07B.

## ACCEPTANCE CRITERIA

1. Production responses expose all mandatory M07A security headers.
2. CSP contains the required minimum directives and any compatibility exceptions are documented.
3. HSTS is deliberately absent in M07A and documented as M07B/TLS-owned.
4. Development Docker remains functional and is not broken by production header policy.
5. Global metadata is pre-launch `noindex, nofollow`.
6. `/robots.txt` disallows `/`.
7. `/sitemap.xml` remains 404/absent.
8. No fabricated canonical/production origin exists.
9. Custom branded `not-found` returns HTTP 404 and is accessible.
10. Application error boundary exists, exposes no stack trace and offers a clear recovery action.
11. No loading UI is added unless a measurable need is demonstrated.
12. Next production build uses standalone output or an equivalently minimal proven runtime.
13. `Dockerfile.production` is multi-stage and final runtime is non-root.
14. Production runtime excludes source/tests/.engineering/Git/secrets from the final image.
15. Production local harness binds loopback only and does not conflict with development port 3000.
16. Production runtime uses no-new-privileges and drops capabilities.
17. Production filesystem is read-only or any writable path is minimal and evidence-justified.
18. Production healthcheck passes.
19. Six V1 routes return HTTP 200 in the production candidate.
20. An unknown route returns HTTP 404 in the production candidate.
21. Release Readiness workflow exists and passes on exact HEAD.
22. Release Readiness workflow uses no production secret and performs no deployment.
23. Existing CI Quality / Browser Smoke remain green.
24. Sonar/Socket/CodeRabbit exact-head signals are checked.
25. Contact zero-collection remains proven.
26. Home 3D remains lazy; STATIC/fallback behavior remains regression-green.
27. Non-Home initial route JS stays within existing 220 KiB gzip budget.
28. Accessibility has no serious/critical automated violation and keyboard/focus remains correct.
29. Required desktop/tablet/mobile widths have no unexpected horizontal overflow.
30. Reduced-motion regressions remain green.
31. lint, typecheck, unit, build, E2E and npm audit pass.
32. Secret scan has no unresolved finding.
33. Candidate image Git SHA + image digest are retained.
34. Admission-base/prior-approved artifact SHA + image digest are retained for rollback rehearsal.
35. Container-level rollback rehearsal restores the prior approved runtime and re-verifies six-route health.
36. Development Docker remains UP/healthy at stop.
37. Evidence Bundle is complete and tied to immutable implementation/test references plus exact-head audit metadata.
38. Independent exact-head audit yields APPROVED before merge.

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
- production-header assertions for six routes + 404
- robots/noindex/sitemap assertions
- branded 404 test
- error-boundary component test
- production image build/inspect
- non-root/read-only/security-opt/cap-drop verification
- production container health + six-route HTTP test
- Contact zero-collection regression
- Home STATIC/WebGL failure/reduced-motion regression
- accessibility/responsive/performance matrix
- Release Readiness workflow exact-head result
- container rollback rehearsal
- development Docker health evidence

## DELIVERABLES

- production security/header policy;
- pre-launch noindex/robots posture;
- branded 404 and error boundary;
- standalone production container path;
- Release Readiness workflow;
- regression/recovery tests;
- release-readiness evidence;
- rollback rehearsal evidence;
- Evidence Bundle;
- proposed Checkpoint Delta;
- development Docker UP/healthy;
- PR OPEN/READY FOR REVIEW.

## REVIEW FORMAT

Brazilian Portuguese:
- exact base/head + Context Lock freshness;
- security/header review;
- robots/indexing review;
- failure-path review;
- production-container hardening;
- Release Readiness workflow;
- regressions/a11y/performance;
- dependency/secret/security findings;
- rollback rehearsal;
- Docker continuity;
- risks/gaps;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with M07A fully implemented, tested and evidenced, development Docker UP/healthy, production candidate validated, rollback rehearsal retained and PR OPEN/READY FOR REVIEW. Do not merge. Do not deploy. Do not begin M07B.
