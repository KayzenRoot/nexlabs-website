# Evidence Bundle — NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS

- **Repository:** `KayzenRoot/nexlabs-website`
- **PR:** [#18](https://github.com/KayzenRoot/nexlabs-website/pull/18)
- **Branch:** `work/nexlabs-wo-012-m07a-release-hardening-readiness`
- **Risk:** ELEVATED
**State:** Implementation and candidate validation are tied to immutable code/test commit `06ec97dfdc4cb38fb2294e9b437ceca94e346c6f`. Final exact-PR-head checks and review signals are read from PR #18 after the evidence push; prior-SHA results are not carried forward. Two repeated throttled-browser candidate E2E samples exceeded the local LCP threshold; the isolated exact-candidate retry passed, and the variance is recorded below.

## Source and Git identity

- Admission/base SHA: `d7ec01e94d30a41a64aa683a345e4e5675541ca2` (PR base `main` at preflight; merge-base matched).
- PR head at executor start: `b645b14f2fd4160d5d9e0adc9fdfbe6c6e06da72`.
- Implementation/test commit: `06ec97dfdc4cb38fb2294e9b437ceca94e346c6f`.
- Context Lock: `.engineering/context-locks/NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS.json`, Git blob `05aa3af486760caf8db0a148f28c67b91306fc40`.
- Critical-source validation before edits: **0 STALE**; all Context Lock critical sources matched. No critical Source Pack or package-manifest file was modified.
- This evidence document is committed separately from application code. Exact final PR HEAD and its CI/check-run metadata are intentionally obtained from PR #18 after the last push; the Release Readiness artifact is named and records the exact PR head SHA to avoid self-referential SHA claims.

## Files added/modified

- Production policy/runtime: `.dockerignore`, `next.config.ts`, `Dockerfile.production`, `compose.production.yaml`.
- Pre-launch and failure paths: `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/not-found.tsx`, `src/app/not-found.module.css`, `src/app/error.tsx`, `src/app/error.module.css`.
- Validation: `src/app/release-readiness.test.tsx`, `tests/e2e/m07a.spec.ts`, `.github/workflows/release-readiness.yml`.
- Evidence and proposed delta: `.engineering/evidence/NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS/**`, `.engineering/checkpoint-deltas/NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS-PROPOSED.md`.
- `package.json` and `package-lock.json` are unchanged. No dependency, route copy, page design, navigation, Contact collection, analytics, provider, URL, DNS, TLS, HSTS, sitemap, or deployment was added.

## Acceptance evidence

| Area | Result | Evidence |
|---|---|---|
| Production security headers | PASS: CSP and all required headers on six HTML routes plus HTTP 404; HSTS absent | `production-headers-report.json` |
| CSP compatibility | PASS: required minimum directives; no `unsafe-eval`; `img-src` and `worker-src` are `'self'` only | `csp-compatibility-evidence.json` |
| Pre-launch crawling | PASS: all six routes emit `noindex, nofollow`; robots disallows `/`; sitemap returns 404; no canonical or fabricated origin | `prelaunch-indexing-report.json`, unit and E2E reports |
| 404/error recovery | PASS: branded 404 and safe retry/Home error boundary; no technical details shown. Axe found 0 violations; its serious `color-contrast` rule remains `incomplete` because it cannot resolve the gradients. Separate rendered-style review measured minimum text contrast of 7.59:1 against the 4.5:1 normal-text threshold. | `branded-404-accessibility-report.json`, `branded-404-contrast-review.json`, unit/E2E tests, screenshot |
| Standalone runtime | PASS: multi-stage Node 22 image; Node 22.23.3, UID 1000, read-only root, minimal `/tmp` and Next cache tmpfs, `no-new-privileges`, all capabilities dropped, healthcheck healthy | `production-candidate-runtime.json` |
| Runtime contents | PASS: runtime has no source, tests, `.engineering`, `.git`, `.env`, or package lock | `production-candidate-runtime.json` |
| Routes and candidate E2E | PASS for all six HTTP 200 and unknown-route 404 checks. A full exact-candidate Playwright run passed 26/26. Two later repeats each had 25/26 because the throttled mobile LCP sample measured 2,864 ms and 3,056 ms, respectively; the isolated repeat of that performance test passed at 2,380 ms. | `production-candidate-runtime.json`, `candidate-performance-variance.json`, `home-performance-production-candidate.json` |
| Home 3D and performance | PASS on the latest isolated exact-candidate sample: poster-first, lazy Home 3D, STATIC/WebGL/reduced-motion/fallback, chunk isolation and responsive regressions. Mobile 390×844: LCP 2,380 ms (≤2,500; 120 ms margin), CLS 0, interaction proxy 56 ms (≤200), initial JS gzip 144,912 B; lazy 3D chunk 252,982 B. Two full-suite repeats exceeded LCP at 2,864/3,056 ms; this variance is retained, not suppressed. | `home-performance-production-candidate.json`, `candidate-performance-variance.json`, screenshots |
| Contact boundary and route regression | PASS: six-route suite retains Contact zero-collection; desktop/tablet/mobile, keyboard, reduced motion and Axe checks pass. Each non-Home route uses 141,747 B gzip initial JS (≤225,280 B); no unexpected horizontal overflow at 1600×900 and no Home lazy chunk on non-Home routes. | `non-home-route-performance-production-candidate.json`, `m06b-accessibility-report.json`, `m06b-responsive-overflow-report.json`, `contact-zero-collection-report.json`, `contact-accessibility-report.json`, `contact-responsive-performance-report.json` |
| Development Docker continuity | PASS: `nexlabs-website-web-1` running/healthy on `127.0.0.1:3000`; Home HTTP 200; production CSP does not leak into development. Docker Engine was restarted after becoming unavailable during validation; both Nex Labs containers were retained and reverified healthy without `compose down` or data-volume operations. | `development-docker-continuity.json` |
| Rollback rehearsal | PASS: exact admission-base source image healthy and all six routes 200; candidate image restored healthy and all six routes 200 | `rollback-rehearsal.json` |
| Package/dependency audit | PASS: `npm ci`; `npm audit --audit-level=moderate` found 0 vulnerabilities; no manifest edits | local check results; manifest diff empty |
| Local code checks | PASS: `npm ci` (243 packages, 0 vulnerabilities); lint; typecheck; unit (5 files/32 tests); build; `npm run test:e2e` (26/26); exact-candidate full Playwright (26/26 on the passing run; repeat variance recorded); isolated exact-candidate performance retry (1/1); `npm audit --audit-level=moderate` (0); secret-pattern scan (0); `git diff --check` | implementation/test commit `06ec97dfdc4cb38fb2294e9b437ceca94e346c6f`; current documentation commit is separate |
| Hardened dependency install | PASS: production image dependency stage ran `npm ci --ignore-scripts` (246 packages; npm audit reported 0 vulnerabilities); standalone Next build and runtime passed | `Dockerfile.production`, exact candidate build log |
| Hosted checks on implementation HEAD | PASS: CI Quality, Browser Smoke, Release Readiness, SonarCloud Code Analysis, Socket PR Alerts, Socket Project Report, and CodeRabbit (review complete; no actionable comments) on `06ec97dfdc4cb38fb2294e9b437ceca94e346c6f`. Checks on the final documentation HEAD must be re-read after the last push. | PR #18 checks for implementation HEAD; exact final-head record follows |
| Secret pattern scan | PASS: 0 matches in the reviewed implementation patch; no secrets copied into the final image | implementation commit pre-commit scan and image-content check |
| Release Readiness workflow | Added with `contents: read`, exact PR-head checkout, image digest/health/headers/robots/noindex/routes/non-root/read-only checks, no secret or deployment | `.github/workflows/release-readiness.yml`; exact-final-head result is in PR #18 after push |

## Artifact identity

- Candidate: `nexlabs-website-release-candidate:06ec97d`.
- Candidate Docker image ID/digest: `sha256:4a4b92db4dfd03a02bfda28ce17aed1bb8eab1f1663097aee1675416dfc6713f`.
- Candidate source revision label: `06ec97dfdc4cb38fb2294e9b437ceca94e346c6f`.
- Admission-base rollback image: `nexlabs-website-admission-base:d7ec01e94d30`.
- Admission-base Docker image ID/digest: `sha256:1da31bfce26408bd6f26e5089258680458857a6be2e4ee21a522178a7a9a40f9`.
- Both are local-only artifacts; no registry push occurred. The candidate used Node base `node:22-bookworm-slim`, resolved locally to `sha256:43ac6c60b8f89723f746e8a92ce91abd5017e627ce1ddfe4238355d3a30b772c`.
- The default candidate port `3001` was occupied by the unrelated `goodz-menu-web-1`; local candidate validation therefore bound only `127.0.0.1:3002`. Development remains on `127.0.0.1:3000`.

## CSP rationale

The final policy retains `script-src 'unsafe-inline'` because the production App Router HTML contains two inline RSC/hydration scripts. It retains `style-src 'unsafe-inline'` because the rendered React Three Fiber canvas uses inline layout style attributes. Chromium observed zero CSP violation events or CSP console messages on the production Home/WebGL path. Source inspection and tests showed no need for `data:` or `blob:` images/workers, so those sources were removed. `unsafe-eval` is not allowed. HSTS remains absent until an admitted HTTPS/TLS origin exists in M07B.

## Rollback rehearsal

The exact admission-base source SHA was built into a temporary Node 22 `next start` image because no production image existed at admission. The rehearsal stopped only the M07A candidate, ran that base image with non-root/read-only/restricted container settings on loopback port 3002, waited for its healthy check, and verified `/`, `/technology`, `/solutions`, `/research`, `/company`, `/contact` all returned 200. It then removed only the temporary rollback container, restarted the SHA-labeled candidate, and verified the candidate healthy with all six routes still 200. Development Compose was not stopped or taken down. Full commands, digests, results and limits are in `rollback-rehearsal.json`.

## Risks and capability gaps

- **Container CVE scan: CAPABILITY_GAP.** Docker Scout CLI v1.24.0 is present but requires Docker ID authentication; the local scan exited before producing any findings. Trivy and Grype are not installed. Therefore HIGH/CRITICAL image-layer counts are **UNKNOWN**, not zero. `npm audit --audit-level=moderate` passed with 0 package findings. This is recorded in `container-image-scan-status.json`; do not interpret the package audit as an OS image scan.
- Mobile Home LCP has varied in local throttled-browser samples on this unchanged candidate (2,380 ms on the latest isolated retry and 2,864/3,056 ms on two full-suite repeats). This is recorded in `candidate-performance-variance.json`; the browser uses SwiftShader for WebGL, so GPU/frame performance is not a real-hardware qualification. Keep the exact-head Browser Smoke result and its artifacts as hosted evidence.
- The development/candidate runtime test is local Docker Desktop only. It does not qualify a future provider, external routing, production secrets, DNS/TLS/HSTS, availability or RTO.
- Node 22 tag resolution is captured for this image; a future rebuild may resolve a newer 22.x base and must produce a new digest and checks.
- No independent approval exists yet. M07A requires independent exact-head approval before any later merge; this Work Order stops before merge.

## Post-push exact-head record

Before considering this increment review-ready, inspect PR #18 for the exact final head and fresh **CI Quality**, **Browser Smoke**, **Release Readiness**, **Sonar**, **Socket**, and **CodeRabbit/reviewer** signals. Only results attached to that final head count. The Release Readiness GitHub artifact contains the image ID, revision, route/security checks, health and container logs for the exact PR head. PR remains open and unmerged; checkpoint is not promoted; M07B is not started.
