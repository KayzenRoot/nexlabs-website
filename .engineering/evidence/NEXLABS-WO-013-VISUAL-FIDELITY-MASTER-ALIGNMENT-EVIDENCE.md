# NEXLABS-WO-013 Evidence Bundle

**Status:** Browser Smoke root-cause correction and the targeted Sonar source-path correction are implemented. Local lint, typecheck, unit, build, audit and complete E2E checks pass; the same production candidate passed three consecutive full 31/31 suites with retries=0 and unchanged budgets. SonarCloud must re-analyze the final pushed head to confirm Security A and Reliability A. The visual score remains PROPOSED 77/100, below the independent approval threshold; visual audit and owner acceptance are pending. Exact final PR HEAD and hosted signals are read from live PR #20 metadata after the final evidence push.
**Repository:** `KayzenRoot/nexlabs-website`
**Branch / PR:** `work/nexlabs-wo-013-visual-fidelity-master-alignment` / [PR #20](https://github.com/KayzenRoot/nexlabs-website/pull/20)
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Branch starting HEAD:** `e5ce80c4e0d6bc1d3ac441fd2e626f851e33377c`
**Initial implementation commit:** `c860171d8aa45c04032c2605934e82e1a09079d4`
**Deterministic Browser Smoke fixture commit:** `8ac950e`
**Navigation/report correction commits:** `86505817683af00cdecf312d6ca73b2ed1a7fb52`, `a665a7dd74992d4109a19ef4bb88de3a7761309a`, `d16a6f53fba6b98dff9d9004e11196056493038f`
**Visual correction and authoring workflow commits:** `45bbf10ceeb834be14c92e6bb11145d73fa6ea55`, `afd110393f1227b90e50d0d0f8354d418ef330e3`
**Prior performance harness source/test commit (superseded):** `3838e2cc81050b5fd6d620e511daae5bb768f469`
**Prior visual candidate, superseded:** `a837beeae11921dbe35c7757adedbd42055bc21d`; image digest `sha256:3e2d24733da2fd1518303547ac2b32296dc00fd0f335e85afb7d385e49e558b3`.
**Correction Delta 04 Sonar corrections:** `fdc064501e3d347ddbf3d932f859c9626edc40c5`, `6adfaf8dd935b2f5e9204d0b82195ced1235a956`, `90de8fe957269488aaeebd9783ef175f9183ad1d`, `ceab16f1808a163dd6c769bd1f53ec6832778961`.
**Correction Delta 04 source/test commit:** `0dbb768554b818d8319395441a990a6f748ead74`.
**Current candidate image:** `nexlabs-website-release-candidate:wo013-cd04-0dbb768`; image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`.
**Final PR HEAD:** recorded from PR #20 metadata after the final Evidence Bundle push. The immutable implementation/test SHA is retained above; this avoids a self-referential SHA in the evidence commit. Exact-head hosted check results are checked after that push and documented in the PR update.

## Authority and master identity

- The active WO-013 Work Order, Context Lock and required canonical sources were reviewed before implementation. Revalidation against the reconciled committed HEAD reports **30/30 critical-source blobs match, 0 STALE**. The locked `AGENTS.md` blob at HEAD remains `a7253838a4e63acb341767fac57dfa75c3ba33e1`; its worktree has an uncommitted Next.js-generated instruction block, preserved locally and excluded from the PR changes. This local-only change was not silently discarded or staged.
- Locked master: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg`.
- Git blob: `52932511adfeb8d372717185fe9a18907625cc0c`.
- SHA-256: `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.
- The master and its crops are used only by the deterministic test/evidence compositor. A negative source/runtime search found no master path, hash or image reference in `src/` or `public/`.
- The Precision Blades N source geometry and tier thresholds remain unchanged. Correction Delta 04 adds only evidence-backed classification of known software WebGL renderers into the existing STATIC path. No package manifest or lockfile changed; no dependency was added.

## Correction Delta 04 — Browser Smoke and Sonar

The complete diagnosis, phase-by-phase instrumentation summary, actual SonarCloud issue keys, remediation commits, image identity and run receipts are in [correction-delta-04-performance-sonar-diagnosis.md](correction-delta-04-performance-sonar-diagnosis.md). The root cause was a headless Chromium SwiftShader renderer entering live WebGL because its virtual CPU/RAM profile appeared capable; repeated GPU `ReadPixels` stalls led to context loss while the 119-frame `page.evaluate` remained pending. The trace ZIP warning was a secondary incomplete artifact, not an application/root-cause finding. The fix checks the actual renderer before canvas creation and preserves the existing STATIC fallback for software renderers.

The prior Sonar analysis reported `pythonsecurity:S8707` (Security C) and `css:S4656` (Reliability C). The CSS issue is closed and Reliability measured A at the last analysis. The Security trace reached `write_text` because the optimizer report serialized metadata derived from the user-supplied `--source` path. Commit `90de8fe957269488aaeebd9783ef175f9183ad1d` removed the absolute path, but Sonar re-analysis on HEAD `24d3e43dca8e72ecd773247daf074b59b1488c8d` remained Security C while Reliability was A. Follow-up inspection showed `sourceSha256` and `sourceBytes` were still included in that report. Commit `ceab16f1808a163dd6c769bd1f53ec6832778961` removes all source-derived metadata from persisted JSON while retaining the in-process expected-SHA validation and output hash/size provenance. The report has no in-repository consumers. No exclusion, suppression, rule change or Quality Gate change was made. Security/Reliability ratings are **PENDING exact-head reanalysis** after the new evidence push.

The post-fix full local E2E suite passed 31/31 with retries=0. Three consecutive full suites against the same candidate image/container also passed 31/31 with retries=0; Home mobile LCP was 1856 / 1832 / 1760 ms, interaction proxy 88 / 152 / 112 ms, CLS 0 in each, and initial JS gzip 151,360 bytes. The initial candidate attempt that omitted `E2E_PORT=3102` had 30/31 and an internal visit to default port 3100 was refused; it is explicitly excluded from the consecutive qualification sequence. The new run logs and per-run reports are retained in `correction-delta-04/security-fix/performance-final/`.

## Change summary

The implementation changes the responsive Home poster and Three/R3F chamber scene; Home and secondary-page atmosphere; five capability objects; route-aware desktop navigation and keyboard-accessible mobile menu; footer/header finish; and visual regression coverage. The responsive overflow test now waits for two animation frames after a viewport change before reading layout; its unchanged assertion remains `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.

Files in implementation commit `c860171`:

- `public/hero/home-hero-poster.jpg`, `public/hero/home-hero-poster-mobile.jpg`.
- `src/app/globals.css`.
- `src/components/hero-scene.tsx`, `home-sections.tsx`, `home-sections.module.css`, `static-hero.tsx`, `static-hero.module.css`.
- `src/components/site-header.tsx`, `site-header.module.css`, `site-navigation.tsx`, `site-navigation.module.css`, `site-footer.module.css`.
- `src/components/secondary-page.tsx`, `secondary-page.module.css`, `src/components/visual/scroll-reveal.tsx`.
- `tests/e2e/home.spec.ts`, `m06a.spec.ts`, `m06b.spec.ts`, `m06c.spec.ts`, `m07a.spec.ts`, `wo013-visual-fidelity.spec.ts`.

Commit `8ac950e` makes the BALANCED visual proof deterministic by setting 8 CPU/8 GB capabilities only in that Playwright context. It does not alter product tier selection. Commits `8650581` and `a665a7d` close the mobile menu on desktop breakpoint changes and preserve focus at the active desktop route. Commit `d16a6f5` labels M06A as desktop performance plus mobile layout-only checks, and M06B as performance and layout checks at both desktop and mobile sizes. Commit `45bbf10` integrates the generated lab backdrop behind the poster and keeps the N fully framed; `afd1103` adds local visual authoring workflows without changing package manifests. Commit `3838e2c` makes the responsive poster test use reduced motion and reuses a frame sample only when it represents the same WebGL tier; it keeps 119 samples for each distinct FULL/BALANCED tier and does not change performance budgets or assertions.

The Correction Delta 04 source commits are `c3ce5ceac3617acaf67f8fcd4f3a3516a71c509a` and `a837beeae11921dbe35c7757adedbd42055bc21d`. They refine the existing Home chamber/material/environment, generated Blender study and workflow support, and deterministic visual evidence capture. They do not alter the canonical N geometry, package manifests, security/readiness configuration, public copy or the one-Home-WebGL architecture.

Additional changed paths in those correction commits:

- Visual correction `45bbf10`: `public/generated/capabilities/*.webp`, `public/generated/home/*.webp`, the updated `public/hero/home-hero-poster.jpg`, `src/components/hero-scene.tsx`, Home/static hero components and styles, `src/app/page.test.tsx`, and the WO-013 visual E2E coverage.
- Local authoring pipeline `afd1103`: `tools/visual-pipeline/**`, including Blender/ComfyUI launch, health, hardware probe, authored workflow JSON, map preparation and candidate-building scripts. This is local authoring tooling; it adds no runtime dependency.
- Performance harness `3838e2cc`: `tests/e2e/home.spec.ts` only.
- Current exact source/test receipts and screenshots are stored under `production-candidate-runs/final-candidate-a837bee/` and the linked visual evidence directory. Historical/misconfigured attempts remain excluded from current qualification in `candidate-performance-variance.json`.

No page copy, metadata, route definitions, Contact data boundary, M07A security configuration, Dockerfile, production Compose configuration, workflow, package manifest or lockfile was changed.

## Checks and results

| Check | Result |
| --- | --- |
| `npm ci` | PASS; install completed without changing `package-lock.json`. |
| `npm run lint` | PASS. |
| `npm run typecheck` | PASS. |
| `npm test` | PASS; 5 files / 34 tests. |
| `npm audit --audit-level=moderate` | PASS; 0 reported vulnerabilities. |
| `npm run build` | PASS; static output includes `/`, `/technology`, `/solutions`, `/research`, `/company`, `/contact`, and `/robots.txt`. |
| Production-candidate Playwright full suite | PASS; 31/31 tests in each of three consecutive runs on the same exact source/image/container, retries=0. |
| Mobile menu breakpoint regression | PASS; 10/10 targeted local repetitions; also passed in all three final candidate suites. |
| Secondary-page responsive test, 10 repeats | PASS; 10/10 after waiting for the resized viewport’s layout frames; overflow threshold unchanged. |
| Secret-pattern scan | PASS; no matching credential patterns in changed source, tests, public assets or this WO evidence. |
| Master runtime-reference negative scan | PASS; no reference in production `src/` or `public/`. |
| `git diff --check` | PASS. |
| `git diff -- package.json package-lock.json` | Empty; manifests are unchanged. |

The prior `a837bee` production-candidate results in `production-candidate-runs/final-candidate-a837bee/` are historical and superseded for this delta. Current immutable `0dbb768` results are in `candidate-performance-variance.json` and `correction-delta-04/run-01` through `run-03`. The three sequential suites used the same image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`, one worker, `retries=0` and all 31 tests. Home mobile LCP was **1832 ms, 1956 ms and 1848 ms**, below the unchanged 2500 ms limit; CLS was 0 in each run and interaction proxies were 104 / 168 / 120 ms. Initial Home JavaScript was 151,360 gzip bytes, below the unchanged 225,280-byte budget. The headless suites correctly selected STATIC on SwiftShader; the same-image headed RTX 5050/ANGLE D3D11 run separately proved FULL/BALANCED at 119/119 frames each and lazy 3D at 272,599 gzip bytes. Each run contains its receipt, full-suite log, per-phase diagnostic JSONL and `home-performance-report.json`.

The first post-harness diagnostic had `E2E_PORT` unset and is retained under `production-candidate-runs/wo013-correction-20261007/`; it failed before completion and is nonqualifying. Two additional three-run attempts under `perf-3838e2c/` and `perf-3838e2c-captured/` passed their tests but used a manually mistyped image tag/source label; they are excluded from exact-head qualification and retained for audit context. The final sequence rebuilds with the SHA read directly from Git and is the only qualifying sequence. Earlier nonqualifying evidence remains available: `production-candidate-runs/harness-misconfigured-attempt/` (port mismatch), `production-candidate-runs/after-coderabbit-corrections/` (focus-transfer race and transient Chromium `net::ERR_NO_BUFFER_SPACE`), and the older 28-test receipts. The focus behavior was corrected in `a665a7d`; the hosted four-core Browser Smoke fixture was corrected in `8ac950e`. No selector or performance budget changed.

## Visual and interaction evidence

- Master comparisons: `master-vs-candidate-hero.png`, `master-vs-candidate-header.png`, `master-vs-candidate-capabilities.png`, `master-vs-candidate-lower-home.png`.
- Scene tiers and fallback: `home-full-3d-1600x900.png`, `home-balanced-3d-900x768.png`, `home-static-reduced-motion-1440x900.png`, `home-webgl-context-loss-fallback-1600x900.png`.
- Responsive Home and menu: `candidate-home-1600x900.png`, `candidate-home-1440x900.png`, `candidate-home-390x844.png`, `mobile-menu-closed-320x844.png`, `mobile-menu-open-320x844.png`, `mobile-menu-active-company-390x844.png`.
- Capability objects: `capabilities-five-objects.png`.
- Retained Design Director evidence: `.engineering/design-director/master-style-guide.md`, `master-scene-graph.md`, `master-state-list.md`, `master-asset-manifest.md`, `review-log.md`; R01–R03 contact sheets/reviews; and exact-source R32 sheet/review at `design-director/round-32-contact-sheet.png` and `round-32-review.md`. Exploratory R04–R31 contact sheets are not part of the minimal tracked evidence set.
- The owner-downloaded ComfyUI model paths, sizes, SHA-256 values and loader discovery are recorded in `design-director/comfyui-user-models.json`; both weights remain outside Git. The Qwen text encoder and Z-Image diffusion model were not loaded because current free VRAM/RAM is insufficient; no failed inference is reported as a pass. The fixed-seed SDXL generation and Blender background-export path remain the qualified authoring workflow.
- Lower Home and pages: `home-lower-research-technology.png`, `technology-1600x900.png`, `solutions-1600x900.png`, `research-1600x900.png`, `company-1600x900.png`, `contact-1600x900.png`, `research-mobile-390x844.png`.
- Structured behavior record: `visual-responsiveness-motion-and-routes.json`.
- Visual comparison and residual-difference assessment with executor score: `VISUAL-FIDELITY-REPORT.md`.

All six admitted routes returned HTTP 200 from both development (`127.0.0.1:3000`) and the current production candidate (`127.0.0.1:3102`). The E2E checks retain route, accessibility, keyboard, menu, reduced-motion, Contact zero-collection, WebGL fallback, responsive overflow, route-chunk and M07A security/indexing/404 regressions.

## Prior candidate performance (historical; superseded by Correction Delta 04)

- Prior `a837bee` Home mobile LCP: 1836 / 1796 / 1776 ms; CLS 0; interaction proxy 112 / 96 / 112 ms.
- Prior initial Home route JavaScript: 151,225 bytes gzip; lazy Home 3D: 272,599 bytes gzip.
- These previous suites used hardware-accelerated Chromium **ANGLE / D3D11** on RTX 5050. Current Correction Delta 04 results and unchanged budgets are recorded above and in the linked correction report.

## Docker evidence

Docker Engine 29.8.2, Compose 5.5.1.

Development Docker remains **UP/healthy** at `http://127.0.0.1:3000`:

- Container: `nexlabs-website-web-1`; container ID `d76127e8ff37beee562fb25debe9d443300a280f6e3288a3d5a78b2e98607a30`.
- Published host binding: `127.0.0.1:3000 -> container 3000/tcp`.
- Inspect: `docker compose ps`; logs: `docker compose logs -f`.
- The service was started/updated with `docker compose up -d --build`; `docker compose down` was not run.

The prior `a837bee` isolated production candidate at port 3004 is historical evidence. The current Correction Delta 04 candidate used for proof is:

- Image: `nexlabs-website-release-candidate:wo013-cd04-0dbb768`; image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`.
- Container ID: `c94582ac97bb8864fc9d5968a0eb5ce29467036d57af6ab9de43bced77cdb4d2`; health **healthy**; runtime user `1000:1000`.
- Published only on loopback at `127.0.0.1:3102`; Node `v22.23.3`, npm `10.9.9`.
- Runtime: Node `v22.23.3`, npm `10.9.9`.
- Candidate command: `docker compose -f compose.production.yaml up -d`; it is a local validation image, not a deployment. No direct Vercel deployment, configuration or promotion action was taken. The existing GitHub PR integration may produce its normal preview check after push; it was not operated here.

## Proposed visual score and gaps

Executor score is **PROPOSED 77/100**, the sum of the weighted criterion scores in `VISUAL-FIDELITY-REPORT.md`. The current exact-candidate R32 diagnostic scores composition 7/10 and environment density 7/10 (the other seven dimensions are 8 or higher). The master comparisons show that N, chamber, energy rails, icon objects and global atmosphere are closer, while cinematic scene density, reflective environment, Earth/detail, capability imagery and the expansive lower-world compositions remain materially different.

Independent visual audit >=85/100 (including its per-criterion floors), owner visual acceptance and independent exact-head review are **PENDING**. The previous independent audit at 68/100 was on an earlier head; this bundle does not treat it as an audit of `a837bee`. The proposed 77/100 remains below the approval threshold and R32 misses two harness floors, so this bundle does not assert visual approval or checkpoint readiness. Exact-head GitHub CI Quality, Browser Smoke, Release Readiness, Sonar, Socket and CodeRabbit signals must be read from PR #20 after the final evidence push; no result from an earlier SHA is carried forward. The three CodeRabbit findings on the preceding PR head were corrected: breakpoint closure/focus, accurate M06A desktop-performance/mobile-layout-only and M06B desktop/mobile performance-and-layout labels, and the visual-score total.

## Stop state

Checkpoint Delta is **PROPOSED only**. PR #20 remains OPEN for independent audit; visual-floor and owner-acceptance gates remain pending. Exact-head hosted gates are checked after the final evidence push and recorded in PR metadata, not inferred from a predecessor SHA. No merge, additional deployment, checkpoint promotion or M07B work was performed. The existing Vercel version/configuration was not touched. Development Docker is left UP/healthy.
