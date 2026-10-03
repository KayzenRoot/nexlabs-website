# Evidence Bundle — NEXLABS-WO-008-HOME-CONTENT-SECTIONS

**State:** M05 implementation and local validation completed. PR #10 remains OPEN and unmerged. Docker remains UP/healthy. The proposed Checkpoint Delta is not promoted. Exact final candidate SHA and GitHub check results are recorded in the PR description after this evidence-closeout commit; CI/review evidence is only valid for the exact head it names.

## Candidate identity

- Repository: `KayzenRoot/nexlabs-website`; remote `origin` is the repository GitHub remote.
- Work Order: `NEXLABS-WO-008-HOME-CONTENT-SECTIONS`.
- Context Lock: `.engineering/context-locks/NEXLABS-WO-008-HOME-CONTENT-SECTIONS.json`.
- Branch / PR: `work/nexlabs-wo-008-home-content-sections` / [PR #10](https://github.com/KayzenRoot/nexlabs-website/pull/10), targeting `main`.
- Required base and merge-base: `6b0f3fa29f00796a85dbd44ac21010f3337cf5c5`.
- Admission head before implementation: `591e879d33919f83ad6fc3f87b52f8cce35159b2`.
- Runtime: Node.js `v24.19.0`, npm `11.17.0`, Git `2.55.0.windows.3`, `@gef-bootstrap/cli` / `npx gef` `1.1.2`; GitHub CLI is authenticated as `KayzenRoot`.
- The exact final candidate SHA is posted in the PR description after evidence closeout, alongside exact-head CI, Browser Smoke, Socket, SonarCloud, and CodeRabbit results. Do not transfer admission-head checks to a later SHA.

## Implementation scope and files

M05 implements the six canonical Home areas after the M04 hero: Core Capabilities, Principles, Vision/Mission, Research, Technology, and final CTA. Content is English as the current canonical site language; no PT/ES localization work was added. The five capability cards and five technology pillars use safe canonical copy, and four nonnumeric principles replace concept-art metrics. Home navigation points only to implemented section anchors. SVG/CSS motifs continue the approved dark chrome/cyan visual language without another WebGL scene or animation library.

- Added `src/components/home-sections.tsx` and `src/components/home-sections.module.css`.
- Updated `src/app/page.tsx`, `src/app/page.module.css`, and `src/app/page.test.tsx` to compose and verify the semantic Home sections.
- Updated `src/components/static-hero.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, and `src/components/site-footer.module.css` for valid implemented anchors and integrated footer navigation.
- Updated `tests/e2e/home.spec.ts` for Home section copy/anchors, visual continuity, accessibility, reduced-motion, responsive behavior, and retained M04 regression coverage.
- Added visual/performance evidence in `.engineering/evidence/NEXLABS-WO-008-HOME-CONTENT-SECTIONS/`.
- Updated `.engineering/checkpoint-deltas/NEXLABS-WO-008-HOME-CONTENT-SECTIONS-PROPOSED.md`; it remains proposed.
- `package.json` and `package-lock.json` were not changed; no dependency was added.
- The evidence directory contains the 19 retained PNG captures and `home-performance-report.json`; its file inventory is the tracked directory contents under `.engineering/evidence/NEXLABS-WO-008-HOME-CONTENT-SECTIONS/`.

## Local validation

| Check | Result |
| --- | --- |
| `npm ci` | PASS — 243 packages installed; 254 audited; 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 3 files, 17 tests |
| `npm run build` | PASS — production build; `/` prerendered statically |
| `E2E_PORT=3101 npm run test:e2e` | PASS — 12/12 Playwright scenarios, including M04 tiers/fallbacks, M05 anchors/content, axe, responsive layout, reduced motion and performance assertions |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilities |
| `git diff --check` | PASS on the candidate changes |
| Host Home request | PASS — HTTP 200 at `http://127.0.0.1:3000/`; returned M05 content |

`E2E_PORT=3101` was used because another local application already occupied 3100; that service was left untouched. Playwright emitted only a non-failing `NO_COLOR`/`FORCE_COLOR` environment warning.

## Content, responsive, accessibility, and visual evidence

Unit tests inspect the canonical copy, six section labels, five capabilities, five technology pillars, four principles, real anchors, and absence of unsupported proof. Browser tests retain keyboard/mobile navigation and anchor behavior, no horizontal overflow at the required mobile viewport, axe results, M04 fallback/tier regressions and reduced-motion behavior. Decorative SVGs are hidden from assistive technology. The reduced-motion stylesheet disables nonessential motion.

Screenshots in `.engineering/evidence/NEXLABS-WO-008-HOME-CONTENT-SECTIONS/` include:

- `home-desktop-1600x900.png`, `home-desktop-1440x900.png`, `home-mobile-390x844.png`, and `home-full-page-1600x900.png`;
- `home-hero-capabilities-continuity-1600x900.png` and `home-research-technology-continuity-1600x900.png`;
- `home-keyboard-focus-1600x900.png`, `home-reduced-motion-desktop-1440x900.png`, and `home-reduced-motion-capabilities-1440x900.png`;
- retained M04 full/balanced scene, transition, fallback, logo and header/footer captures.

The Home is built around server-rendered semantic sections with CSS Modules and SVG. No fake metrics, customer/partner claims, certifications, outcomes, secondary routes, 3D scene, CMS, analytics, backend, or new library were added.

## Performance evidence

Full machine-readable measurements are in `home-performance-report.json`.

- Mobile profile, rerun after the valid label correction: 390×844, cellular 4G (150 ms latency), 4× CPU throttle; LCP 2,392 ms, CLS 0, initial JavaScript 136,828 bytes gzip, CTA laboratory interaction proxy 56 ms (3 Event Timing samples). The interaction figure is not field INP.
- Desktop profile, same rerun: 1600×900, BALANCED ready; LCP 312 ms, CLS 0; lazy M04 3D chunk 252,982 bytes gzip; 119 frame samples, median 16.7 ms, p95 33.4 ms, median 59.9 FPS.
- Poster assets: desktop 227,644 bytes; mobile 137,561 bytes.
- The FULL profile was exercised using headless SwiftShader capability overrides; it is a code-path validation, not qualification on high-end hardware. Its sampled median was 20 FPS.

## Dependency and GitHub capability notes

`npm ci` followed by `npm ls braces fast-glob micromatch @next/eslint-plugin-next --all` showed no installed instances of the previously reported `braces@3.0.3` dependency chain; `npm audit --audit-level=moderate` found zero vulnerabilities. The earlier WO-007 remediation removed the unused source dependency; this WO did not change package manifests or suppress/override advisories. The GitHub Dependabot alerts endpoint returned HTTP 403, so alert-list verification is a documented capability gap; it is not represented as a zero-alert result.

CodeRabbit admission review at `591e879d33919f83ad6fc3f87b52f8cce35159b2` completed without actionable comments. That predates this implementation. Its exact-head review of `b5f6a2c4da0a647eb9aecc1a324bd947af4fe7e5` found one valid minor copy-label issue: the header, hero and footer used “Contact” for an editorial CTA. The labels now consistently say “Explore the next chapter,” preserving `#contact`; the unit and browser tests were updated and rerun. Exact-head review/checks for the correction commit are recorded in the PR body; independent APPROVED review remains an external gate and is not self-asserted here.

## Docker continuity

- Docker Engine: client/server `29.8.1`; Compose: `v5.5.1`.
- Container: `nexlabs-website-web-1`, ID `29b1b296a9919dcbb9685422a00449a231643963cf6e76f1f738c28645d74db5`, image `nexlabs-website-web` (`sha256:c3a439a5cb3739ab00b04eb1337347bd3fe006b7c60352682ebd20c4fe21f72f`), state `running`, health `healthy`, failing streak `0`.
- Published port: `127.0.0.1:3000 -> 3000/tcp`; Home returned HTTP 200.
- Commands used for this validation: `docker compose build`, `docker compose up -d`, `docker compose ps`, `docker compose logs --tail=100`, `docker inspect` health, and host HTTP request.
- `docker compose down` was not run. Continue inspecting with `docker compose logs -f` and `docker compose ps`.

## Risks, gates, and Checkpoint

- Current local evidence shows no HIGH/CRITICAL npm audit findings. Dependabot alert details are unavailable to this CLI identity because of HTTP 403.
- E2E used port 3101 due to an unrelated process on 3100. Mobile performance and interaction values are laboratory samples, not field percentiles. FULL rendering was measured with SwiftShader rather than naturally selected high-end hardware.
- Local checks passed on the implementation candidate. Exact final SHA and corresponding exact-head GitHub checks are in PR #10; review evidence for an earlier SHA is not transferable.
- Proposed Checkpoint Delta: `.engineering/checkpoint-deltas/NEXLABS-WO-008-HOME-CONTENT-SECTIONS-PROPOSED.md`. It remains **PROPOSED — DO NOT PROMOTE BEFORE APPROVAL**. PR #10 must remain open and unmerged. M06 must not begin until M05 receives independent exact-head approval and is merged under separate authorization.
