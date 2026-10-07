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


## WO-013 visual-fidelity validation

Because WO-013 is ELEVATED, require baseline + M07A regression checks plus:
- verify locked master Git blob and canonical SHA-256 identity;
- negative scan proving master JPG/crops are not referenced by production runtime;
- deterministic Home screenshots at 1600×900, 1440×900, BALANCED, STATIC, mobile and reduced-motion;
- deterministic secondary-page screenshots;
- four master-vs-candidate comparison composites;
- executor proposed fidelity rubric with evidence links;
- independent auditor scoring against VISUAL-FIDELITY-DELTA-SPEC.md;
- desktop active-navigation and hover/focus checks;
- mobile menu semantics, keyboard, Escape and focus checks;
- five proprietary capability-object checks;
- Home one-world continuity visual review;
- WebGL context-loss/failure and STATIC fallback;
- route JS/lazy 3D chunk isolation;
- 3 consecutive production-candidate full browser suites, retries=0, each entirely green with Home mobile LCP <=2500 ms;
- M07A CSP/security/noindex/robots/404/Release Readiness regression;
- six-route Contact/content/metadata regressions.

A visual score cannot override a failed performance, accessibility, security or factual-integrity gate.


## WO-013 local visual pipeline bootstrap validation

Before resuming the visual correction pass, retain:
- hardware probe: GPU model, VRAM, RAM, driver;
- ComfyUI exact version/commit and localhost port check;
- CUDA/PyTorch GPU recognition;
- SDXL generation smoke test under the selected 8 GB profile;
- optional FLUX.2 Klein 4B FP8 smoke result, with fallback recorded if OOM/unstable;
- model manifest with source, license, revision and SHA-256;
- Blender exact version and background Python smoke test;
- Blender render/export smoke result;
- open-port proof that ComfyUI is not listening publicly;
- Git scan proving model weights, raw renders and secrets are not tracked;
- one end-to-end pipeline sample from generated reference to Blender/web-export candidate.

Pipeline bootstrap PASS is necessary to continue the WO-013 correction but does not change the visual score.


## Temporary Vercel pre-launch validation

Before deploy:
- exact-head local production build;
- six-route local smoke;
- banner visible on all six routes;
- noindex/nofollow + robots disallow + sitemap absence;
- CI Quality / Browser Smoke / Release Readiness green;
- no unresolved blocking review/security finding.

After deploy:
- record exact deployed Git SHA / deployment ID / HTTPS URL;
- six public routes HTTP 200;
- branded 404;
- PRE-LAUNCH banner visible desktop/mobile;
- navigation works;
- no unexpected mobile overflow;
- noindex/nofollow remains present;
- robots disallows crawling;
- sitemap absent;
- Contact remains zero-collection;
- no obvious console/runtime error;
- retain live screenshots and sanitized reports.

Deployment can be used for external registration even while the independent visual score remains below 85/100, because it is explicitly labeled PRE-LAUNCH. Final visual approval remains a separate gate.


## WO-013 Design Director Harness validation

Before the next independent visual review:
- style guide exists and decomposes the approved master by composition/material/light/density;
- scene graph exists;
- deterministic visual state list exists;
- asset manifest distinguishes master/evidence, generated references, Blender sources and runtime assets;
- at least three critique rounds are retained;
- each critique round includes a contact sheet and review log;
- each round scores composition, depth, material/lighting, environment density, object distinctiveness, brand accuracy, readability, motion purpose and mobile composition;
- each round lists the three biggest gaps and the next round proves those gaps were addressed;
- seeded/deterministic evidence states do not depend on Math.random;
- master remains absent from production runtime references;
- any motion-system change passes reduced-motion and performance regressions;
- final independent 85/100 WO-013 gate remains unchanged.

The contact-sheet loop is a process gate, not a substitute for exact-head CI/performance/security/accessibility validation.
