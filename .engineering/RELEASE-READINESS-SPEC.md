# Release Readiness Specification — M07A

Status: CANONICAL M07A HARDENING SOURCE

## Purpose

M07A hardens the completed six-route V1 for production readiness **without deploying it publicly**. Deployment provider, production origin, DNS, TLS termination, credentials and analytics remain outside this increment.

## Risk

M07A is **ELEVATED** because it changes production runtime/security behavior and establishes rollback/readiness obligations.

## Security headers — production runtime only

Production responses for HTML routes and the custom 404 must include at minimum:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy` disabling at least camera, microphone, geolocation and payment
- a Content Security Policy containing at least:
  - `default-src 'self'`
  - `base-uri 'self'`
  - `object-src 'none'`
  - `frame-ancestors 'none'`
  - `form-action 'none'`
  - `connect-src 'self'`

The CSP may include the smallest compatibility exceptions objectively required by Next.js/React, but those exceptions must be documented in evidence. Do not weaken CSP merely to silence tests.

Do **not** add HSTS in M07A because no verified HTTPS production origin exists yet. HSTS is a M07B/TLS decision.

Development Docker must remain usable; production-only headers must not break the current development workflow.

## Pre-launch indexing posture

Until a verified production origin exists:

- the global metadata must be `noindex, nofollow`;
- `/robots.txt` must disallow crawling of `/`;
- do not fabricate a sitemap origin;
- `/sitemap.xml` must remain absent/404;
- do not invent canonical URLs or Open Graph origins.

M07B owns the deliberate switch from pre-launch noindex to launch indexing.

## Failure paths

M07A must provide:
- a branded, accessible custom 404/not-found experience;
- a controlled application error boundary with a clear recovery action;
- no raw stack traces or sensitive error details in the public UI.

A dedicated loading UI is not required for the current static/read-only routes unless implementation evidence shows a real need.

## Production container readiness

The existing `Dockerfile` + `compose.yaml` remain the development stack.

M07A must add a separate production candidate path, preferably:
- Next.js `output: "standalone"`;
- multi-stage `Dockerfile.production`;
- Node 22 runtime;
- non-root runtime user;
- `NODE_ENV=production`;
- telemetry disabled;
- final image containing only the runtime files required by the standalone server plus public/static assets;
- no source tree, tests, `.engineering`, Git metadata or secrets in the runtime image;
- production healthcheck;
- no-new-privileges and dropped Linux capabilities in the production compose/runtime harness;
- read-only root filesystem where compatible, otherwise an evidence-backed minimal writable path;
- local release-candidate binding on loopback only (recommended `127.0.0.1:3001`) so it cannot accidentally become a public deployment.

The approved development Docker service on `127.0.0.1:3000` must remain UP/healthy at executor stop.

## Release-readiness CI

Add an exact-head `Release Readiness` GitHub workflow that:
1. checks out the repository with read-only contents permission;
2. builds the production candidate image;
3. starts it locally without provider credentials;
4. verifies health and six HTTP 200 routes;
5. verifies a missing route returns 404;
6. verifies the required production security headers;
7. verifies pre-launch robots/noindex posture;
8. verifies no `/sitemap.xml` is published;
9. verifies the container runs non-root;
10. tears down only the temporary CI release candidate.

It must not deploy, publish images, mutate GitHub settings, use secrets or contact external production services.

## Regression / quality matrix

M07A must retain:
- lint;
- typecheck;
- unit/component tests;
- production build;
- full Playwright E2E;
- npm audit;
- secret-pattern scan;
- six-route HTTP navigation;
- axe accessibility;
- 1600×900, 1440×900, tablet, 390×844 and 320px overflow checks;
- reduced-motion behavior;
- Contact zero-collection boundary;
- Home 3D lazy isolation and STATIC/fallback behavior;
- existing route JS/performance budgets.

No product copy or visual redesign is admitted.

## Recovery / rollback proof obligation

Before approval, retain a provider-neutral container-level rollback rehearsal:

1. identify the admission-base release artifact by Git SHA/image digest;
2. identify the candidate artifact by Git SHA/image digest;
3. run/verify the candidate;
4. restore the admission-base artifact or equivalent prior approved runtime;
5. verify the six routes again;
6. record commands, digests and limitations.

This is a local readiness rehearsal, not a claim about future provider rollback time or availability.

## M07B boundary

M07B is not admitted by M07A. M07B may later own:
- provider selection + ADR;
- environment contract;
- production URL/origin;
- domain/DNS/TLS;
- HSTS;
- canonical URLs / sitemap / indexing enablement;
- actual deployment;
- post-deploy smoke/security/performance validation;
- production rollback/roll-forward evidence.

No production launch occurs in M07A.
