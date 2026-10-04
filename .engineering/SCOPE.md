# Scope

## Completed product scope

- GEF Bootstrap and M01 through M05: APPROVED/MERGED.
- M06 Secondary Pages: COMPLETE after M06A, M06B and M06C.
- Production routes: `/`, `/technology`, `/solutions`, `/research`, `/company`, `/contact`.
- Contact is intentionally read-only/zero-collection in V1.

## Current state

No product implementation Work Order is active.

M07 Production Hardening & Launch is the next legal program, but implementation is not admitted yet.

### NECESSARY planning direction

M07 should be split rather than executed as one large launch increment.

#### M07A — Release hardening & production readiness
Candidate NECESSARY scope:
- repository/config/runtime hardening for production;
- security headers and browser policy review;
- robots/sitemap/metadata consistency;
- 404/error/loading behavior where applicable;
- final route/accessibility/performance regression matrix;
- dependency/runtime/container hardening;
- production Docker/readiness validation;
- launch checklist, rollback/roll-forward and recovery evidence;
- no provider deployment unless separately admitted.

#### M07B — Deployment admission + launch validation
Candidate scope only after M07A APPROVED:
- explicit deployment provider/target selection;
- environment/config contract;
- deployment execution;
- DNS/domain/TLS only if factual inputs are available and separately approved;
- post-deploy smoke, security, accessibility/performance and rollback evidence.

### IMPORTANT

- Do not invent domain, DNS, production URL, provider credentials or analytics.
- Do not add a Contact submission path as part of launch hardening.
- Keep D-0008 permanent.
- Prefer evidence-driven hardening before deployment.

## OUT OF SCOPE UNTIL ADMITTED

- any production deployment;
- DNS/domain changes;
- provider credentials;
- analytics/tracking;
- Contact data collection;
- localization;
- CMS/CRM/auth/database;
- unrelated product expansion.

Do not execute M07 before its Work Order and exact Context Lock are admitted.
