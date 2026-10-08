# Correction Delta 04 — Browser Smoke / Sonar evidence

**Work Order:** `NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT`
**Audited starting HEAD:** `c9c2a332ea070646d52881756abe64d9ad6fb673`
**Immutable code/test candidate:** `0dbb768554b818d8319395441a990a6f748ead74`
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Master:** Git blob `52932511adfeb8d372717185fe9a18907625cc0c`; SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.

## Context and cause

The remote Browser Smoke failure was isolated to `tests/e2e/home.spec.ts:561`, where the performance profile awaits 119 animation-frame intervals. The intact trace from run `37757344979`, job `113245051152`, showed `Frame.evaluateExpression` still pending while the 119-frame sampling ran; Chromium logged repeated GPU `ReadPixels` stalls followed by `THREE.WebGLRenderer: Context Lost`. Cleanup then observed a context already lost. The separate `End of central directory record signature not found` message was an incomplete trace artifact from the timed-out attempt, not evidence of a ZIP or application defect.

The reproduced headless renderer was `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`. The capability probe previously treated the virtual CPU/RAM profile as capable and proceeded to create a live scene on software WebGL. This was the causal stall. It was not a hanging teardown on a healthy GPU.

The scoped fix classifies known software renderer strings (SwiftShader, llvmpipe, softpipe and software/basic renderers) before live canvas creation and sends those environments to the existing `STATIC` poster path. `quality-tier.ts` changed only for this evidence-backed renderer classification. Hardware thresholds, FULL/BALANCED selection, reduced-motion/save-data/low-resource behavior, all 119 frame intervals, timeouts, visual tests and performance budgets remain unchanged. Unit coverage checks the classification; browser coverage confirms the software fallback preserves the environmental artwork and the poster remains visible.

## Phase instrumentation and reproduction

`tests/e2e/home.spec.ts` now records phase timings and renderer/DOM/WebGL telemetry for navigation, poster and vitals collection, renderer detection, scene readiness, live frame profiles, screenshot/render completion, scene cleanup, CDP cleanup, page/context closure and final context cleanup. The JSONL trace records long tasks, visibility changes, WebGL context creation/loss and sampling progress. Mobile uses only the existing minimal telemetry needed for the interaction proxy so the diagnostic hooks do not inflate its measured interaction latency.

On headless SwiftShader, the diagnostic Home performance test completed in 7.5–7.8 seconds, selected `STATIC`, observed `canvasCount=0`, and closed pages/contexts without a live renderer to dispose. On the same production image with headed Chromium and an NVIDIA RTX 5050 / ANGLE D3D11, the performance test completed FULL and BALANCED independently with 119/119 samples each; median was 75.2 FPS for both. Context teardown happened after the intentional scene unmount/context-loss check. The selected per-phase traces, reports, full-suite logs and representative screenshots are under `correction-delta-04/`; the larger local captures remain preserved in the original run folders.

## SonarCloud findings and corrections

The actual new-code issues retrieved from SonarCloud before correction were:

| Issue | Prior finding | Correction |
| --- | --- | --- |
| `pythonsecurity:S8707` (`AaEaunfYCXFy810awQdb`) | MAJOR path-traversal vulnerability in `tools/visual-pipeline/optimize-runtime-glb.py:116`; Security rating C / HIGH impact | Commit `fdc064501e3d347ddbf3d932f859c9626edc40c5` constrains the optimizer output destination to the admitted fixed path and validates the path before writing. |
| `css:S4656` (`AaEauncOCXFy810awQda`) | Duplicate `border-radius` declaration in `src/components/home-sections.module.css:530`; MAJOR bug / Reliability rating C | Commit `6adfaf8dd935b2f5e9204d0b82195ced1235a956` removes the duplicate declaration without changing the effective rule. |

No exclusions, suppressions, quality-gate changes or dependency changes were made. The exact-head SonarCloud check must be read from live PR #20 metadata after the evidence push; an older rating is not carried forward.

## Verification receipts

The three consecutive full production-candidate Chromium suites used one immutable candidate image and one container:

- Source: `0dbb768554b818d8319395441a990a6f748ead74`.
- Image: `nexlabs-website-release-candidate:wo013-cd04-0dbb768`; image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`.
- Container: `c94582ac97bb8864fc9d5968a0eb5ce29467036d57af6ab9de43bced77cdb4d2`; healthy at `127.0.0.1:3102`; runtime Node `v22.23.3`, npm `10.9.9`, UID/GID `1000:1000`.
- Harness: `.engineering/evidence/NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS/performance-candidate-playwright.config.ts`; one worker; retries `0`; 31 tests in the full suite.

| Consecutive run | Full suite | Home mobile LCP | Interaction proxy | CLS | Initial JS gzip |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 31/31 PASS | 1832 ms | 104 ms | 0 | 151,360 bytes |
| 2 | 31/31 PASS | 1956 ms | 168 ms | 0 | 151,360 bytes |
| 3 | 31/31 PASS | 1848 ms | 120 ms | 0 | 151,360 bytes |

All are within the unchanged LCP 2500 ms, interaction 200 ms, CLS 0.1 and initial-route JS 225,280-byte limits. The separate same-image hardware run measured lazy Home 3D at 272,599 gzip bytes (716,800-byte budget) and preserved 119 samples for each live FULL/BALANCED tier. Software-rendered suites correctly have no live frame sampling because they select the existing STATIC path.

Local source checks recorded for this candidate: `npm ci`, lint, typecheck, unit tests (5 files / 34 tests), build, `npm audit --audit-level=moderate` (0 vulnerabilities), and full E2E (three consecutive 31/31 runs, retries=0), all PASS. The six routes `/`, `/technology`, `/solutions`, `/research`, `/company` and `/contact` returned HTTP 200 from the candidate at port 3102 and development service at port 3000. Development Docker remains healthy. The current hosted gates are not represented by these local receipts; CI Quality, Browser Smoke, Release Readiness, SonarCloud, Socket and CodeRabbit must be checked on the final pushed PR HEAD.
