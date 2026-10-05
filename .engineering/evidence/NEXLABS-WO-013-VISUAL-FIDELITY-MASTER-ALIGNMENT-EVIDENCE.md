# NEXLABS-WO-013 Evidence Bundle

**Status:** implementation and local proof complete; independent visual audit and exact final-head hosted checks remain pending.
**Repository:** `KayzenRoot/nexlabs-website`
**Branch / PR:** `work/nexlabs-wo-013-visual-fidelity-master-alignment` / [PR #20](https://github.com/KayzenRoot/nexlabs-website/pull/20)
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Branch starting HEAD:** `05a470a5b664afb2e3cc731c0a1f664dd59fa02c`
**Implementation commit:** `c860171d8aa45c04032c2605934e82e1a09079d4`
**Deterministic Browser Smoke fixture commit:** `8ac950e`
**Navigation/report correction commits:** `86505817683af00cdecf312d6ca73b2ed1a7fb52`, `a665a7dd74992d4109a19ef4bb88de3a7761309a`, `d16a6f53fba6b98dff9d9004e11196056493038f`
**Final PR HEAD:** recorded from PR #20 metadata after the final Evidence Bundle push. The immutable implementation/test SHA is retained above; this avoids a self-referential SHA in the evidence commit. Exact-head hosted check results are checked after that push and documented in the PR update.

## Authority and master identity

- The active WO-013 Work Order, Context Lock and required canonical sources were reviewed before implementation. Context Lock validation reported **0 STALE** at admission.
- Locked master: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg`.
- Git blob: `52932511adfeb8d372717185fe9a18907625cc0c`.
- SHA-256: `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.
- The master and its crops are used only by the deterministic test/evidence compositor. A negative source/runtime search found no master path, hash or image reference in `src/` or `public/`.
- The Precision Blades N source geometry and quality-tier selection remain unchanged. No package manifest or lockfile changed; no dependency was added.

## Change summary

The implementation commit changes the responsive Home poster and Three/R3F chamber scene; Home and secondary-page atmosphere; five capability objects; route-aware desktop navigation and keyboard-accessible mobile menu; footer/header finish; and visual regression coverage. The responsive overflow test now waits for two animation frames after a viewport change before reading layout; its unchanged assertion remains `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.

Files in implementation commit `c860171`:

- `public/hero/home-hero-poster.jpg`, `public/hero/home-hero-poster-mobile.jpg`.
- `src/app/globals.css`.
- `src/components/hero-scene.tsx`, `home-sections.tsx`, `home-sections.module.css`, `static-hero.tsx`, `static-hero.module.css`.
- `src/components/site-header.tsx`, `site-header.module.css`, `site-navigation.tsx`, `site-navigation.module.css`, `site-footer.module.css`.
- `src/components/secondary-page.tsx`, `secondary-page.module.css`, `src/components/visual/scroll-reveal.tsx`.
- `tests/e2e/home.spec.ts`, `m06a.spec.ts`, `m06b.spec.ts`, `m06c.spec.ts`, `m07a.spec.ts`, `wo013-visual-fidelity.spec.ts`.

Commit `8ac950e` makes the BALANCED visual proof deterministic by setting 8 CPU/8 GB capabilities only in that Playwright context. It does not alter product tier selection. Commits `8650581` and `a665a7d` close the mobile menu on desktop breakpoint changes and preserve focus at the active desktop route. Commit `d16a6f5` labels M06A as desktop performance plus mobile layout-only checks, and M06B as performance and layout checks at both desktop and mobile sizes.

No page copy, metadata, route definitions, Contact data boundary, M07A security configuration, Dockerfile, production Compose configuration, workflow, package manifest or lockfile was changed.

## Checks and results

| Check | Result |
| --- | --- |
| `npm ci` | PASS; install completed without changing `package-lock.json`. |
| `npm run lint` | PASS. |
| `npm run typecheck` | PASS. |
| `npm test` | PASS; 5 files / 32 tests. |
| `npm audit --audit-level=moderate` | PASS; 0 reported vulnerabilities. |
| `npm run build` | PASS; static output includes `/`, `/technology`, `/solutions`, `/research`, `/company`, `/contact`, and `/robots.txt`. |
| Production-candidate Playwright full suite | PASS; 28/28 tests in each of three consecutive runs, retries=0. |
| Mobile menu breakpoint regression | PASS; 10/10 targeted local repetitions; also passed in all three final candidate suites. |
| Secondary-page responsive test, 10 repeats | PASS; 10/10 after waiting for the resized viewport’s layout frames; overflow threshold unchanged. |
| Secret-pattern scan | PASS; no matching credential patterns in changed source, tests, public assets or this WO evidence. |
| Master runtime-reference negative scan | PASS; no reference in production `src/` or `public/`. |
| `git diff --check` | PASS. |
| `git diff -- package.json package-lock.json` | Empty; manifests are unchanged. |

Final production-candidate results are in `candidate-performance-variance.json` and `production-candidate-runs/verified-after-final-review-corrections/run-01` through `run-03`. Each final run used the same immutable candidate image, one worker, retries zero and all 28 tests. Home mobile LCP was 1124 ms, 1104 ms and 1128 ms; each is below the unchanged 2500 ms limit. CLS was 0 in each run; interaction proxies were 88 / 48 / 64 ms. See the per-run suite logs and performance JSON reports for complete receipts. Earlier passing triplets remain archived under `production-candidate-runs/run-01` through `run-03`, `production-candidate-runs/verified-after-browser-smoke-fix/run-01` through `run-03`, and `production-candidate-runs/verified-after-review-corrections/run-01` through `run-03`; each is superseded by the final proof on the corrected metadata harness.

One diagnostic attempt before the first valid sequence had `E2E_PORT` unset, so the performance test targeted port 3100 while the candidate listened at 3002 and reported connection refused; it remains archived under `production-candidate-runs/harness-misconfigured-attempt/`. A subsequent nonqualifying sequence on candidate source `8650581` had a focus-transfer assertion race and one transient Chromium `net::ERR_NO_BUFFER_SPACE` while navigating to `/technology`; its logs remain under `production-candidate-runs/after-coderabbit-corrections/` and it is excluded. The focus behavior was corrected in `a665a7d`, passed 10 targeted local repetitions and all three final full suites; the buffer error did not recur. A hosted Browser Smoke on prior HEAD `98977dc` had also exposed that CI’s four-core runner correctly selected STATIC while the visual test assumed BALANCED. Commit `8ac950e` fixed the test fixture only; the selector and budgets were not altered. The final consecutive sequence uses the same candidate image, port 3002, retries zero and corrected fixtures.

## Visual and interaction evidence

- Master comparisons: `master-vs-candidate-hero.png`, `master-vs-candidate-header.png`, `master-vs-candidate-capabilities.png`, `master-vs-candidate-lower-home.png`.
- Scene tiers and fallback: `home-full-3d-1600x900.png`, `home-balanced-3d-900x768.png`, `home-static-reduced-motion-1440x900.png`, `home-webgl-context-loss-fallback-1600x900.png`.
- Responsive Home and menu: `candidate-home-1600x900.png`, `candidate-home-1440x900.png`, `candidate-home-390x844.png`, `mobile-menu-closed-320x844.png`, `mobile-menu-open-320x844.png`, `mobile-menu-active-company-390x844.png`.
- Capability objects: `capabilities-five-objects.png`.
- Lower Home and pages: `home-lower-research-technology.png`, `technology-1600x900.png`, `solutions-1600x900.png`, `research-1600x900.png`, `company-1600x900.png`, `contact-1600x900.png`, `research-mobile-390x844.png`.
- Structured behavior record: `visual-responsiveness-motion-and-routes.json`.
- Visual comparison and residual-difference assessment with executor score: `VISUAL-FIDELITY-REPORT.md`.

All six admitted routes returned HTTP 200 from both development (`127.0.0.1:3000`) and the production candidate (`127.0.0.1:3002`). The E2E checks retain route, accessibility, keyboard, menu, reduced-motion, Contact zero-collection, WebGL fallback, responsive overflow, route-chunk and M07A security/indexing/404 regressions.

## Performance and hardware limits

- Home mobile: LCP 1124 / 1104 / 1128 ms; CLS 0 each; interaction proxy 88 / 48 / 64 ms.
- Initial Home route JavaScript: 145,977 bytes gzip (142.6 KiB), below 220 KiB.
- Lazy Home 3D chunk: 253,946 bytes gzip (248.0 KiB), below 700 KiB.
- The performance report identifies Chromium **ANGLE / SwiftShader software rendering**. Frame samples are retained, but this host does not establish physical-GPU frame-rate qualification.

## Docker evidence

Docker Engine 29.8.1, Compose 5.5.1.

Development Docker remains **UP/healthy** at `http://127.0.0.1:3000`:

- Container: `nexlabs-website-web-1`; container ID `b60825fca29e21f8e5f7110a05b0e4f489222083e737ab7fa427b595f23a47d0`.
- Published host binding: `127.0.0.1:3000 -> container 3000/tcp`.
- Inspect: `docker compose ps`; logs: `docker compose logs -f`.
- The service was started/updated with `docker compose up -d --build`; `docker compose down` was not run.

The isolated, local production candidate used for proof is also healthy:

- Image: `nexlabs-website-release-candidate:a665a7dd74992d4109a19ef4bb88de3a7761309a`.
- Image digest: `sha256:41672afc50ad5543fb28614c3bd2390458deb025fde66aeff0e9a2ba819943e8`.
- Container ID: `8bc2fd99827cbbc5c9808c7ad7551504110db4c108ba7bfc1bbbcb48c6b7cea5`; health `healthy`; runtime user `1000:1000`.
- Published only on loopback at `127.0.0.1:3002`; Node `v22.23.3`, npm `10.9.9`.
- Candidate command: `docker compose -f compose.production.yaml up -d`; it is a local validation image, not a deployment.

## Proposed visual score and gaps

Executor score is **PROPOSED 77/100**, the sum of the criterion scores in `VISUAL-FIDELITY-REPORT.md`. The master comparisons show that N, chamber, energy rails, icon objects and global atmosphere are closer, while cinematic scene density, reflective environment, Earth/detail, capability imagery and the expansive lower-world compositions remain materially different.

Independent visual audit >=85/100 (including its per-criterion floors), owner visual acceptance and independent exact-head review are **PENDING**. The proposed 77/100 is below the approval threshold, so this bundle does not assert visual approval or checkpoint readiness. Exact-head GitHub CI Quality, Browser Smoke, Release Readiness, Sonar, Socket and CodeRabbit signals must be read from PR #20 after the final correction/evidence push; no result from an earlier SHA is carried forward. The three CodeRabbit findings on the preceding PR head were corrected: breakpoint closure/focus, accurate M06A desktop-performance/mobile-layout-only and M06B desktop/mobile performance-and-layout labels, and the visual-score total.

## Stop state

Checkpoint Delta is **PROPOSED only**. PR #20 remains OPEN/READY FOR REVIEW. No merge, deployment, checkpoint promotion or M07B work is authorized or performed. Development Docker is left UP/healthy.
