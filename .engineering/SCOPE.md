# Scope

## Completed

- M01 through M06 are APPROVED/MERGED.
- Six V1 routes are complete.
- Contact is read-only/zero-collection.

## Active — M07A Release Hardening & Production Readiness

Work Order: `NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS`
Risk: ELEVATED

### NECESSARY

- production-only security headers/CSP;
- pre-launch noindex/nofollow + robots disallow;
- no sitemap/canonical origin until M07B;
- branded 404 and error recovery UI;
- standalone/minimal production container candidate;
- release-readiness validation workflow;
- broad six-route regression;
- security/dependency/secret checks;
- provider-neutral rollback rehearsal;
- development Docker remains UP/healthy.

### IMPORTANT

- keep development and production Docker paths separate;
- preserve all public copy/visual behavior;
- do not add dependencies unless STOP/re-admission proves necessity;
- retain exact image digests and rollback commands;
- keep D-0008 and Contact zero-collection permanent.

### FUTURE / M07B

- provider selection/ADR;
- production URL/domain/DNS/TLS/HSTS;
- canonical URLs/sitemap/index enablement;
- actual deployment;
- post-deploy validation and provider-specific rollback.

## OUT OF SCOPE FOR WO-012

- public deployment;
- provider credentials;
- DNS/domain/TLS/HSTS;
- analytics;
- Contact collection;
- product redesign/content expansion;
- M07B execution.

Do not advance to M07B before M07A APPROVED/MERGED/checkpoint-promoted.
