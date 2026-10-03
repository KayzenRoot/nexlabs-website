# Evidence Bundle — NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM

**Executor state:** application and review corrections were pushed as `0be8883`; its exact-head CI, Browser Smoke, Socket and Sonar checks passed. CodeRabbit requested an explicit independent-audit-before-merge sentence in the proposed Checkpoint Delta; the clarification is in this documentation update. PR #9 remains open and unmerged.

## Candidate identity and authority

- Repository: `KayzenRoot/nexlabs-website` (`origin` = `https://github.com/KayzenRoot/nexlabs-website.git`).
- Work Order: `NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM`; Context Lock: `.engineering/context-locks/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM.json`.
- Branch / PR: `work/nexlabs-wo-007-home-hero-living-organism` / [PR #9](https://github.com/KayzenRoot/nexlabs-website/pull/9), targeting `main`.
- Required base and merge-base: `c6b4e69e214ed51f9c2ad338e73ee6f3dc89a65c`.
- Branch tip before this implementation: `df7f2aed6aed503b0a5f771d23819174725d0ba4`.
- Implementation and full application-check candidate: `6fc2efa67a7e96c30aa220f052d755be0fb7c23f` (parent `df7f2aed6aed503b0a5f771d23819174725d0ba4`).
- Two valid CodeRabbit review findings on the next candidate were corrected: runtime WebGL failure now remains in poster fallback across resize, and particle-field oscillation uses fixed elapsed-time amplitude scaled by tier. Post-correction local checks and E2E evidence are included below.
- The latest application correction commit is `0be8883f6e0b106f9cfd43d6b37fe33ecb4aef43`, following `8b35242c7a285a3ae64118dd143e31f0b389a4ec`. Its exact-head CI, Browser Smoke, Socket and Sonar checks passed; CodeRabbit requested a documentation clarification, now recorded in the proposed Checkpoint Delta. The PR description records the current final pushed HEAD and exact-head checks. The native hardware sample below is retained from implementation SHA `6fc2efa`; current performance was rerun with the Playwright lab profiles.
- Approved visual master: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg`; SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`; 1600×900. It matches the supplied Downloads image and the required Context Lock hash.

## Runtime and dependencies

- Node.js `v24.19.0` (satisfies `>=22`); npm `11.17.0`; Git `2.55.0`; GitHub CLI `2.101.0`, authenticated as `KayzenRoot`.
- `@gef-bootstrap/cli@1.1.2` remains exactly pinned; `npx gef --version` reports `1.1.2`.
- Added exact dependency pins: `@react-three/fiber@9.8.1`, `three@0.186.1`, `@types/three@0.186.0`. No `@react-three/drei`, GSAP, GLB asset, or WebGPU dependency was added.
- A HIGH advisory against `braces@3.0.3` affected the dev-only chain `@next/eslint-plugin-next -> fast-glob -> micromatch -> braces`. The remediation removed `@next/eslint-plugin-next` and its unreachable transitive chain rather than downgrading, overriding or suppressing the finding. A fresh `npm ci` installed 243 packages, audited 254, and reported zero vulnerabilities; `npm audit --audit-level=moderate` also passed. TypeScript ESLint, typecheck, Next production build, unit tests, browser/a11y checks and Sonar remain enforced. `CI Quality` now runs the audit on every exact head. Next-specific ESLint rules are temporarily absent while the upstream chain has no patched release.

## Implementation and changed files

The implementation commit changed 37 files (2,450 insertions, 342 deletions):

- Governance/specification: `.engineering/ARCHITECTURE.md`, `.engineering/BACKLOG.md`, `.engineering/CHECKPOINT.json`, `.engineering/CHECKPOINT.md`, `.engineering/DEFINITION-OF-DONE.md`, `.engineering/HOME-VISUAL-MASTER-SPEC.md`, `.engineering/PROJECT-OVERVIEW.md`, `.engineering/REQUIREMENTS.md`, `.engineering/SOURCE-HIERARCHY.md`, `.engineering/UI-UX.md`, `.engineering/checkpoint-deltas/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM-PROPOSED.md`, `.engineering/context-locks/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM.json`, `.engineering/work-orders/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM.md`.
- Dependencies and test configuration: `package.json`, `package-lock.json`, `playwright.config.ts`, `vitest.config.mts`.
- Home and brand integration: `src/app/layout.tsx`, `src/app/page.module.css`, `src/app/page.test.tsx`, `src/app/page.tsx`, `src/components/site-header.module.css`, `src/components/site-header.tsx`, `src/components/static-hero.module.css`, `src/components/static-hero.tsx`.
- 3D/runtime: `src/components/hero-scene-client.tsx`, `src/components/hero-scene-error-boundary.tsx`, `src/components/hero-scene.tsx`, `src/experience/living-organism.ts`, `src/experience/quality-tier.test.ts`, `src/experience/quality-tier.ts`.
- Browser coverage: `tests/e2e/home.spec.ts`.
- Runtime posters: `public/hero/home-hero-poster.jpg` (227,644 bytes), `public/hero/home-hero-poster-mobile.jpg` (137,561 bytes).
- Retained binary and performance evidence: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/` (approved source, desktop/mobile/header/footer/scene/fallback/reduced-motion/lockup screenshots, post-resize runtime WebGL fallback screenshot, reference comparison, and `home-performance-report.json`). The existing canonical Checkpoint remains unpromoted.

## Validation results

| Check | Result |
| --- | --- |
| `npx gef --version` | PASS — `1.1.2` |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 3 files, 15 tests |
| `npm run build` | PASS — Next.js production build and static Home route |
| `E2E_PORT=3101 npm run test:e2e` | PASS — 11/11 Playwright scenarios, including keyboard access to all five mobile navigation destinations at 320 px, runtime WebGL failure after resize, axe, STATIC/reduced motion, tiers, responsiveness and lab performance assertions |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilities |
| `git diff --check` | PASS on implementation changes |
| Secret-pattern scan of changed source/package/evidence paths | No credential-pattern matches |
| Home via Docker host URL | PASS — HTTP 200 at `http://localhost:3000/` |

GEF baseline probes were also run. `npx gef doctor` returned terminal `SUCCEEDED`; Node, platform, Git, and repository-observable findings were `HEALTHY`. The dependency provenance finding was `unverified` / `REVIEW`, and the GEF GitHub capability probe reported `writePermission: false` / `REVIEW`, despite `gh` being authenticated as `KayzenRoot`. The `npx gef status` run after the documentation closeout reported repository `CLEAN`, operator metadata `stale: true`, and drift `UNEXPECTED` against the recorded init baseline; while the post-review patch is pending commit, the worktree is naturally `DIRTY`. No GEF baseline or gate was rewritten. Exact final Git and PR status are recorded in the PR description.

The E2E server used port 3101 because another local service already occupies port 3100; the existing service was left untouched. The E2E interaction metric is a single laboratory CTA Event Timing proxy, not field INP. Latest review fixes also keep mobile section navigation horizontally scrollable and keyboard reachable, propagate failed chunk-body reads instead of reporting a false zero-byte measurement, and dispose the memoized ExtrudeGeometry, MeshPhysicalMaterial, TubeGeometry and particle BufferGeometry on unmount.

### Visual and performance evidence

- `home-reference-side-by-side.png` records the 1600×900 comparison with the hash-matching reference. `home-desktop-1600x900.png`, `home-desktop-1440x900.png`, `home-mobile-390x844.png`, `home-full-scene-1600x900.png`, `home-balanced-scene-900x768.png`, `home-reduced-motion-desktop-1440x900.png`, and `home-webgl-fallback-1600x900.png` retain viewport, tier, motion, and fallback evidence.
- Static poster path after the latest UI/runtime corrections: LCP 224 ms, CLS 0, initial route JavaScript 136,828 bytes gzip. Poster files are 227,644 bytes desktop and 137,561 bytes mobile.
- Playwright desktop 1600×900: BALANCED ready; LCP 392 ms, CLS 0; lazy 3D chunk 252,982 bytes gzip (below 700 KB target). Headless renderer was SwiftShader, sampling 119 frames at 20 FPS median / 50.1 ms median frame / 66.8 ms p95.
- FULL capability override exercised the FULL code path under SwiftShader: 119 samples, 8.6 FPS median / 116.6 ms median frame / 216.6 ms p95. This is a software-renderer test, not high-end hardware qualification.
- BALANCED constrained 900×768 profile: 119 samples, 30 FPS median / 33.3 ms median frame / 33.4 ms p95.
- Mobile emulation 390×844, cellular 4G (150 ms latency), 4× CPU throttle: STATIC; LCP 2,360 ms, CLS 0; one CTA interaction with 3 Event Timing samples, maximum 80 ms. These are laboratory samples, not field percentile measurements.
- Native Chrome on the active Docker page, no CPU throttle or capability override, NVIDIA GeForce RTX 5050 / Direct3D11: BALANCED ready at 1920×855; 119 frame samples, 75.2 FPS median, 13.3 ms median and 13.5 ms p95, captured 2026-10-03 00:24:07 UTC on implementation SHA `6fc2efa`. This is a pre-correction capable-desktop reference sample, not a fresh post-correction measurement. The current post-correction result is the headless SwiftShader profile above.

## Docker continuity

- Docker Engine client/server `29.8.1`; Compose `v5.5.1`.
- Container `nexlabs-website-web-1`, ID `adc0080157eb49d58a49ef8fb083b1631d7270b981e57765cd689854a43ffe8d`, image ID `sha256:48f8c496a35bd1cdbd53c47bcf74973597a1df8d58fa7d425943d2572736fcc2`.
- State `running`; health `healthy`, failing streak `0`; published `127.0.0.1:3000 -> 3000/tcp`; Home returned HTTP 200.
- Docker Compose config/build/up and `ps`/logs were validated during this increment. Final read-only health and HTTP checks also passed. The service remains UP; `docker compose down` was not run.
- Owner commands: `docker compose up -d`, `docker compose logs -f`, `docker compose ps`, `docker compose down`.

## Risks, limitations, and remaining review gates

- Docker logs include a third-party warning: R3F 9.8.1's internal `THREE.Clock` use triggers Three.js deprecation text. It did not produce a browser console error or fail build/tests; do not patch vendored dependencies. Recheck with a future R3F/Three upgrade.
- FULL frame timing in headless software rendering is slow; the active NVIDIA hardware measurement is BALANCED, matching detected host capabilities. FULL hardware performance remains unmeasured on a machine that selects FULL naturally.
- Mobile LCP and interaction figures are laboratory samples only; field LCP/INP percentiles are not available in this local run.
- Remaining M05 content below the hero is intentionally not implemented in WO-007. No final research/infrastructure sections or card content were added.
- CodeRabbit's review on `0be8883` confirmed the code corrections and requested that the proposed Delta explicitly require recording an `APPROVED` result from the independent exact-head audit before merge. That wording is now present; exact-head checks must be revalidated after this documentation update. The PR must remain OPEN and unmerged.
- The proposed Checkpoint Delta remains `PROPOSED`; independent exact-head review/approval and merge are outside this execution stop condition.
- CodeRabbit identified and the executor fixed the code findings. Its final status must be checked on the final pushed HEAD; independent human review and approval remain outstanding before merge.

## Checkpoint Delta

See `.engineering/checkpoint-deltas/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM-PROPOSED.md`. It records the exact base, implementation SHA, validation, Docker state, evidence, remaining limitations, and proposed M05 sequencing. Do not promote it without the required independent review and approval.

## STOP CONDITION

Stop with the M04 implementation documented, final PR #9 OPEN and READY FOR REVIEW, Docker UP/healthy, and no merge. M05 must not begin before independent exact-head approval and merge.


## Independent review correction — documentation gate

CodeRabbit pre-merge checks reported 18.18% docstring coverage on touched functions. The independent review added concise JSDoc to the hero controller, error-boundary lifecycle, 3D scene components/helpers, capability probes, motion helper and E2E evidence helpers. This is documentation-only for those functions; functional behavior is unchanged. Exact-head CodeRabbit must prove the required >=80% threshold before merge.
