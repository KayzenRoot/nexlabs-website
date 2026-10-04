# Deployment

## Current state

Production deployment remains **NOT_ADMITTED**.

M07A Release Hardening & Production Readiness is APPROVED/MERGED and established the production-candidate/security/readiness baseline.

The owner has made WO-013 Visual Fidelity / Master Alignment a required gate before launch.

## Current launch gate

M07B remains BLOCKED until:
1. WO-013 is independently APPROVED;
2. WO-013 is merged;
3. WO-013 checkpoint is promoted;
4. provider/origin/domain inputs are explicitly approved.

WO-013 does not deploy publicly.

## M07B future scope

Only after the visual gate:
- provider selection + ADR;
- environment contract;
- verified production origin;
- domain/DNS/TLS/HSTS;
- canonical URL/sitemap/index enablement;
- deployment;
- post-deploy smoke/security/a11y/performance;
- provider-specific rollback/roll-forward evidence.

The M07A container-level rollback rehearsal remains the provider-neutral baseline until M07B.
