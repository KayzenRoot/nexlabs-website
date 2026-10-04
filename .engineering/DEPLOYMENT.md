# Deployment

## Current state

Production deployment is **NOT_ADMITTED** in M07A. No hosting provider, production URL, domain/DNS target, TLS termination or production credential has been selected.

## M07 program split

### M07A — Release Hardening & Production Readiness

Admitted work may:
- create/test a production candidate artifact locally;
- establish production security headers;
- establish noindex/robots pre-launch posture;
- establish a minimal production container;
- add release-readiness CI;
- rehearse provider-neutral container rollback.

M07A must not publish or deploy the website.

### M07B — Deployment Admission + Production Launch Validation

M07B remains blocked until M07A approval/promotion and must separately:
- select hosting/runtime provider with an accepted decision/ADR;
- define preview/staging/production environment contract;
- define verified production origin;
- define secrets/environment-variable ownership;
- decide domain/DNS/TLS/HSTS;
- add canonical URLs/sitemap/index enablement;
- execute deployment;
- retain post-deploy smoke/security/a11y/performance evidence;
- retain provider-specific rollback/roll-forward evidence.

## Rollback model before provider selection

M07A rollback proof is container-level only:
- identify prior approved artifact SHA/digest;
- identify candidate SHA/digest;
- verify candidate;
- restore prior approved artifact;
- re-run six-route health checks.

This rehearsal does not claim a future provider RTO/RPO or zero-downtime behavior.
