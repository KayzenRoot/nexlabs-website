# Test / Benchmark Plan

## Planning baseline

M01 contains no product runtime. Its validation is source consistency, decision completeness, exact-head review and absence of unauthorized implementation.

## Required implementation checks from M02 onward

Baseline STANDARD checks:
- install/lockfile integrity;
- lint;
- TypeScript typecheck;
- production build;
- unit tests for logic introduced;
- integration/component tests for important interactions;
- dependency/security checks;
- git diff/check and secret scan.

Frontend quality:
- automated accessibility checks plus keyboard/manual spot checks;
- responsive rendering at representative mobile, tablet and desktop widths;
- no unexpected horizontal overflow;
- reduced-motion behavior;
- no console errors in supported browsers.

Visual fidelity:
- capture deterministic screenshots at agreed reference viewports;
- compare structure, typography, spacing, color, cards and hero composition against the Visual Master;
- material visual drift requires explicit approval, not silent approximation.

Performance:
- Lighthouse/Web Vitals style measurements on representative throttled mobile and desktop profiles;
- track LCP, CLS and INP proxies where available;
- track initial JS and 3D chunk sizes;
- record hero model/texture transfer size;
- verify STATIC mode works with 3D disabled;
- verify the page remains usable before live 3D is ready.

3D-specific:
- asset load success/failure paths;
- context-loss/fallback behavior where practical;
- reduced quality tier selection;
- no content dependency on canvas;
- memory/frame-rate sampling on at least one mid-tier profile before release.

No numeric performance claim is considered met without retained evidence.


## M07A release-readiness validation

Because M07A is ELEVATED, require STANDARD checks plus:
- production header/CSP assertions;
- robots/noindex/sitemap-absence assertions;
- branded 404 and safe error-boundary tests;
- production standalone image build and inspect;
- non-root / reduced-capability / read-only-filesystem validation;
- production candidate health and six-route smoke;
- broad Home + M06 regressions;
- Contact zero-collection regression;
- Home 3D STATIC/failure/reduced-motion regression;
- exact-head Release Readiness workflow;
- admission-base and candidate image digest capture;
- container rollback rehearsal and restored-route verification.

Do not convert a missing provider/TLS/origin into simulated production evidence. Those remain M07B.
