# NEXLABS-WO-013 Evidence Bundle

**Status:** implementation and local proof complete; independent visual audit and exact final-head hosted checks remain pending.
**Repository:** `KayzenRoot/nexlabs-website`
**Branch / PR:** `work/nexlabs-wo-013-visual-fidelity-master-alignment` / [PR #20](https://github.com/KayzenRoot/nexlabs-website/pull/20)
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Branch starting HEAD:** `05a470a5b664afb2e3cc731c0a1f664dd59fa02c`
**Implementation/test commit:** `c860171d8aa45c04032c2605934e82e1a09079d4`
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
| `npm run test:e2e -- --retries=0 --workers=1` | PASS; 27/27 full E2E tests. |
| Secondary-page responsive test, 10 repeats | PASS; 10/10 after waiting for the resized viewport’s layout frames; overflow threshold unchanged. |
| Secret-pattern scan | PASS; no matching credential patterns in changed source, tests, public assets or this WO evidence. |
| Master runtime-reference negative scan | PASS; no reference in production `src/` or `public/`. |
| `git diff --check` | PASS. |
| `git diff -- package.json package-lock.json` | Empty; manifests are unchanged. |

Full production-candidate results are in `candidate-performance-variance.json` and `production-candidate-runs/run-01` through `run-03`. Each valid run used the same immutable candidate image, one worker, retries zero and all 27 tests. The three LCP results are 1068 ms, 1092 ms and 1136 ms; all are below the unchanged 2500 ms limit. See the per-run suite logs and copied performance JSON reports for the complete receipts.

One diagnostic attempt before the valid sequence had `E2E_PORT` unset, so the performance test targeted port 3100 while the candidate listened at 3002 and reported connection refused. That attempt is preserved under `production-candidate-runs/harness-misconfigured-attempt/`, excluded from the three-run count. The three consecutive valid runs then set both candidate port variables to 3002 and passed.

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

- Home mobile: LCP 1068 / 1092 / 1136 ms; CLS 0 each; interaction proxy 88 / 48 / 56 ms.
- Initial Home route JavaScript: 145,791 bytes gzip (142.4 KiB), below 220 KiB.
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

- Image: `nexlabs-website-release-candidate:c860171d8aa45c04032c2605934e82e1a09079d4`.
- Image digest: `sha256:538d80545a2179ae8e8032963bb619fdcf6dcec18e786fea016a8fabb55fc352`.
- Container ID: `b5d1ec25f8d508298c94eda05f738e76c9e748e72e3c8130e8130ee789e80fc8`; health `healthy`; runtime user `1000:1000`.
- Published only on loopback at `127.0.0.1:3002`; Node `v22.23.3`, npm `10.9.9`.
- Candidate command: `docker compose -f compose.production.yaml up -d`; it is a local validation image, not a deployment.

## Proposed visual score and gaps

Executor score is **PROPOSED 73/100**. The master comparisons show that N, chamber, energy rails, icon objects and global atmosphere are closer, while cinematic scene density, reflective environment, Earth/detail, capability imagery and the expansive lower-world compositions remain materially different. Reasons and criterion scores are recorded in `VISUAL-FIDELITY-REPORT.md`.

Independent visual audit >=85/100 (including its per-criterion floors), owner visual acceptance and independent exact-head review are **PENDING**. The proposed 73/100 is below the approval threshold, so this bundle does not assert visual approval or checkpoint readiness. Exact-head GitHub CI Quality, Browser Smoke, Release Readiness, Sonar, Socket and CodeRabbit signals must be read from PR #20 after the final push; no result from an earlier SHA is carried forward.

## Stop state

Checkpoint Delta is **PROPOSED only**. PR #20 remains OPEN/READY FOR REVIEW. No merge, deployment, checkpoint promotion or M07B work is authorized or performed. Development Docker is left UP/healthy.
