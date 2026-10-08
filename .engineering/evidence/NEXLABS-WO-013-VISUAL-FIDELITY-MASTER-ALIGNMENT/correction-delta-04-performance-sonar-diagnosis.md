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

The new-code issues retrieved from SonarCloud were:

| Issue | Prior finding | Correction |
| --- | --- | --- |
| `pythonsecurity:S8707` (`AaEaunfYCXFy810awQdb`) | Sonar reported a path traversal at the JSON `write_text` sink from CLI `--source`. The actual output path was fixed and validated, but source-derived data still reached report content after the first correction. | `fdc064501e3d347ddbf3d932f859c9626edc40c5` confines the output destination. `90de8fe957269488aaeebd9783ef175f9183ad1d` removes the absolute source path. Sonar remained C at `24d3e43`; `ceab16f1808a163dd6c769bd1f53ec6832778961` removes remaining source hash/size fields from the persisted report while retaining in-process expected-SHA validation and output integrity metadata. Exact-head Security rating remains pending. |
| `css:S4656` (`AaEauncOCXFy810awQda`) | Duplicate `border-radius` declaration in `src/components/home-sections.module.css:530`; MAJOR bug / Reliability rating C. Sonar later marked it CLOSED and measured Reliability A. | Commit `6adfaf8dd935b2f5e9204d0b82195ced1235a956` removes the duplicate declaration without changing the effective rule. |

No exclusions, suppressions, quality-gate changes or dependency changes were made. The analysis on `24d3e43dca8e72ecd773247daf074b59b1488c8d` reported Security C and Reliability A. The exact-head SonarCloud check must be read from live PR #20 metadata after pushing the follow-up and evidence; an older rating is not carried forward.

## Security path correction and final reruns — code head `146fef8`

SonarCloud's last completed analysis identified `pythonsecurity:S8707` (`AaEaunfYCXFy810awQdb`, MAJOR) from `argparse.parse_args()` to the optimizer's `Path.write_text()` call. The prior report-metadata-only correction did not remove the finding. The new fix validates the CLI `--source` as a regular `.glb` beneath the resolved local `VisualPipeline/generated` root and outside the repository; the generated root itself is rejected if it resolves into Git. Output remains fixed beneath user data. The GLB and report are staged in the system temp directory; the output hierarchy is checked for symlink/junction components, destination hard links are rejected, and both outputs are revalidated before `os.replace` publication. No report path or destination is selected by the source argument.

The focused Windows Python path suite passes 8/8, including a directory-junction substitution after initial validation and hard-link planting immediately before replacement. Python syntax compilation, npm lint, typecheck, 43 unit tests, Next build, moderate audit (0 vulnerabilities), and full local E2E (31/31, retries=0) pass. `quality-tier.ts` and all thresholds, timeouts and budgets were untouched by this security correction.

Three new consecutive full production-candidate runs at 31/31 and retries=0 used the same image `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c` / container `c94582ac97bb8864fc9d5968a0eb5ce29467036d57af6ab9de43bced77cdb4d2`, with both base URL variables set to port 3102. Home mobile LCP was 1900 / 1748 / 1748 ms; interaction proxy 88 / 128 / 152 ms; CLS 0; JS gzip 151,360 bytes. Per-run logs, reports, phase diagnostics, and SHA-256 values are indexed in `candidate-performance-variance.json` and retained in `.engineering/evidence/wo013-cd04-final/verified-run-01` through `verified-run-03`.

At this capture, the last completed Sonar analysis still showed Security C / Reliability A on the prior head; exact-head reanalysis was pending. Do not treat the historical rating as a pass. GEF status cannot observe this linked worktree (`GIT_DIRECTORY_NOT_A_DIRECTORY`, `WORKING_TREE_NOT_OBSERVED`); direct Git-blob validation of the 30 Context Lock critical sources reported 0 STALE. All hosted gates must be verified from the final PR HEAD after the evidence push.

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

All are within the unchanged LCP 2500 ms, interaction 200 ms, CLS 0.1 and initial-route JS 225,280-byte limits. A later rerun after the security-tool change retained the same candidate image/container and produced 31/31 in each consecutive run; its report paths and SHA-256 receipts are recorded in `security-fix/performance-final/run-01` through `run-03`. Those runs measured Home mobile LCP at 1856 / 1832 / 1760 ms, interaction proxy at 88 / 152 / 112 ms, CLS 0 in each, and initial-route JS at 151,360 gzip bytes. The separate same-image hardware run measured lazy Home 3D at 272,599 gzip bytes (716,800-byte budget) and preserved 119 samples for each live FULL/BALANCED tier. Software-rendered suites correctly have no live frame sampling because they select the existing STATIC path.

Local checks after the optimizer report change: `npm ci` (0 vulnerabilities), lint, typecheck, unit tests (5 files / 43 tests), production build, `npm audit --audit-level=moderate` (0 vulnerabilities), and full E2E (31/31, retries=0), all PASS. The production-candidate evidence contains three consecutive 31/31 runs, retries=0. The six routes `/`, `/technology`, `/solutions`, `/research`, `/company` and `/contact` returned HTTP 200 from the candidate at port 3102 and development service at port 3000. Development Docker remains healthy. The hosted results for this code head are recorded in the follow-up below; checks must be repeated on the final pushed Evidence Bundle head.

## Sonar follow-up — code head `1898db0`

The exact issue flow on `146fef8` still reached the fixed-path `Path.write_text()` call because the persisted JSON report copied `args.ratio` into `decimateRatio`. The report destination was not CLI-controlled; the surviving tainted value was the argument in the report content. Commit `1898db09f7334245285a722c1a793ee88bc63eec` removes that field only. The bounded ratio still controls Blender decimation; the accepted range, filesystem constraints, output metrics, application runtime, package manifests, test coverage, timeouts and performance budgets are unchanged.

On code head `1898db0`, SonarCloud reports Security **A (1.0)** and Reliability **A (1.0)**, the Quality Gate is PASS, and the `pythonsecurity:S8707` issue `AaEb6EvLXfIun6ARmluk` is FIXED/CLOSED; a filtered query returns zero open/confirmed S8707 findings. No exclusions, suppressions or gate changes were used. The complete hosted status on that head is CI Quality PASS, Browser Smoke PASS, Release Readiness PASS, SonarCloud PASS, Socket Project Report PASS and Socket PR Alerts PASS. CodeRabbit's check context is PASS with review paused; it is not represented as an independent approval.

The Python optimizer path suite was rerun after the final source edit: 8/8 PASS, with syntax compilation PASS. Its log and SHA-256 are `.engineering/evidence/wo013-cd04-final/python-optimizer-tests.txt` and `fa378a69e60655885eab3b5c3840d19d57b7c1160766c8672486e11cd9a65`. The three consecutive full production-candidate runs remain bound to the same immutable website runtime image/source (`0dbb768`, image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`), unaffected by this authoring-tool/report metadata change: 31/31 each, retries=0, LCP 1900/1748/1748 ms, within unchanged budgets. A final Evidence Bundle commit will trigger exact-head hosted checks again; those results and its final SHA must be taken from PR metadata after that push.
