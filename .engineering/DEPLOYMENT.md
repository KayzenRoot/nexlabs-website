# Deployment

## Current state

Final production launch remains **NOT_ADMITTED**. A narrowly scoped temporary Vercel pre-launch deployment is now explicitly admitted for external company/service registration.

M07A Release Hardening & Production Readiness is APPROVED/MERGED and established the production-candidate/security/readiness baseline.

The owner has made WO-013 Visual Fidelity / Master Alignment a required gate before launch.

## Current launch gate

M07B remains BLOCKED until:
1. WO-013 is independently APPROVED;
2. WO-013 is merged;
3. WO-013 checkpoint is promoted;
4. provider/origin/domain inputs are explicitly approved.

WO-013 may perform the temporary public deployment defined by `.engineering/VERCEL-PRELAUNCH-SPEC.md`. This exception does not constitute final visual acceptance or M07B launch completion.

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


## Temporary Vercel pre-launch exception

Owner authorization on 2026-10-07 permits an immediate public Vercel deployment of the current functional WO-013 candidate to support Anthropic/company registration.

Binding conditions:
- use Vercel project `nexlabs-website` (`prj_HtZ5M9lpS0JZhkaHLbTCrWX38YHV`) in team `claytons-projects-5922d27c`;
- deploy from the exact reviewed PR #20 branch/working tree without merging;
- persistent PRE-LAUNCH banner on every route;
- keep noindex/nofollow + robots disallow + no sitemap;
- no custom domain/DNS required;
- no analytics or Contact collection;
- live smoke/evidence required;
- final M07B launch gate remains blocked by WO-013 visual approval.

See `.engineering/VERCEL-PRELAUNCH-SPEC.md`.
