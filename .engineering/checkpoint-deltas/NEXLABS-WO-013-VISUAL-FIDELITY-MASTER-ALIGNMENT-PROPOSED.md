# Proposed Checkpoint Delta — NEXLABS-WO-013

**State:** PROPOSED — not promoted
**Current accepted checkpoint:** `WO_013_VISUAL_FIDELITY_MASTER_ALIGNMENT_ADMITTED`
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Branch:** `work/nexlabs-wo-013-visual-fidelity-master-alignment`
**PR:** #20, OPEN for independent audit; visual floors and owner acceptance remain pending
**Initial implementation anchor:** `c860171d8aa45c04032c2605934e82e1a09079d4`; **review corrections:** `86505817683af00cdecf312d6ca73b2ed1a7fb52`, `a665a7dd74992d4109a19ef4bb88de3a7761309a`, `d16a6f53fba6b98dff9d9004e11196056493038f`; **Browser Smoke fixture:** `8ac950e`; **visual correction:** `45bbf10ceeb834be14c92e6bb11145d73fa6ea55`; **Sonar fixes:** `fdc064501e3d347ddbf3d932f859c9626edc40c5`, `6adfaf8dd935b2f5e9204d0b82195ced1235a956`; **Correction Delta 04 source/test candidate:** `0dbb768554b818d8319395441a990a6f748ead74`.

## Proposed recorded progress

- Implemented the WO-013 visual fidelity increment within the admitted write boundary.
- Preserved the approved Precision Blades N source geometry, route copy/metadata, M07A security/readiness configuration, Contact zero-collection boundary, package manifests and all quality-tier thresholds. The conditional software-renderer classification is the only `quality-tier.ts` behavior change and is backed by the failing Chromium trace plus unit/browser reproduction.
- Added deterministic master comparisons and responsive scene, navigation, five-capability-object, motion, accessibility, performance, Docker and production-candidate evidence.
- The Context Lock revalidates against the reconciled committed source tree with 30/30 critical-source blobs matching and 0 STALE; the locked master blob and SHA-256 still match. Existing local changes, including a Next.js-generated block in dirty `AGENTS.md`, remain preserved and excluded from this increment's staged files.
- On immutable application source/test candidate `0dbb768554b818d8319395441a990a6f748ead74`, after the optimizer report change, completed `npm ci` (0 vulnerabilities), lint, typecheck, 43 unit tests, production build, moderate npm audit (0 vulnerabilities), and a full local E2E run at 31/31 with retries=0. The same image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c` passed a fresh sequence of three consecutive complete production-candidate suites at 31/31, retries=0. Home mobile LCP was 1856 ms, 1832 ms and 1760 ms; CLS was 0 each; interaction proxy was 88 ms, 152 ms and 112 ms; initial JS gzip remained 151,360 bytes. The three suites on headless SwiftShader correctly used STATIC; a separate same-image hardware run retained all 119 samples in FULL and BALANCED with 75.2 FPS medians. One earlier attempt with mismatched internal E2E port was 30/31 and is explicitly excluded from this fresh sequence.
- The original Browser Smoke failure showed repeated software-GPU `ReadPixels` stalls and WebGL context loss while the 119-frame evaluation remained pending. The fix routes known software renderers to existing STATIC before canvas creation; the performance test completes in about 7.5 seconds on SwiftShader and hardware measurements still complete at 119/119.
- SonarCloud reported `pythonsecurity:S8707` (Security C) and `css:S4656` (Reliability C). The duplicate CSS issue is CLOSED and Reliability measured A at the last analysis. The optimizer output destination is fixed under user data and outside Git. Removing only the absolute source path in `90de8fe` did not clear Security C; the exact analysis on `24d3e43dca8e72ecd773247daf074b59b1488c8d` remained Security C / Reliability A. Commit `ceab16f1808a163dd6c769bd1f53ec6832778961` removes the remaining source hash/size fields from the persisted report while keeping expected-SHA validation in process and output integrity metadata. Exact-head Security/Reliability A/A must be confirmed by SonarCloud after the final evidence push. No suppression, exclusion, Quality Gate change, or package change was made.
- Development Docker remains UP/healthy at `127.0.0.1:3000`; all six product routes return HTTP 200.
- Executor visual score is PROPOSED at 77/100, matching the weighted criterion sum in the visual report. Exact-source R32 critique records composition 7/10 and environment density 7/10; those required harness floors are still unmet. The independent visual audit threshold (>=85/100 and required per-criterion floors), owner visual acceptance, and independent exact-head review remain pending.
- The previous independent audit at HEAD `487556d65d62c5581ee9fdcf6f77cf881c569f81` returned 68/100 with CORRECTION REQUIRED; there is no re-audit for the candidate SHA in this delta. The new 77/100 score is only the executor proposal and still does not meet the approval threshold.
- A prior diagnostic sequence used an incorrect manually entered SHA in the candidate tag and is excluded from qualification. The candidate was rebuilt using the full SHA read from Git, and all three current receipts bind to one image ID. A separate pre-commit 30/31 overflow diagnostic and an over-instrumented mobile run remain explicitly nonqualifying; the final full runs were 31/31 and their limits were unchanged.
- Addressed the three CodeRabbit findings on the preceding PR head: breakpoint closure and focus, accurate M06A desktop-performance/mobile-layout-only and M06B desktop/mobile performance-and-layout evidence labels, and the corrected 77/100 criterion sum.

## Proposed state after this increment

`WO_013_IMPLEMENTED_AWAITING_VISUAL_FLOOR_CORRECTION_AND_OWNER_ACCEPTANCE`

This is not an accepted checkpoint state. `.engineering/CHECKPOINT.md` and `.engineering/CHECKPOINT.json` remain unchanged until the visual floors, independent review and owner acceptance resolve the score gap. The precise final PR HEAD and hosted checks are verified in PR #20 metadata after the final evidence push; immutable source/test candidate SHA is `0dbb768554b818d8319395441a990a6f748ead74`, avoiding a circular SHA reference. The existing Vercel version/configuration was not touched.

## Gates still closed

- No merge or checkpoint promotion.
- No public deployment or provider/domain/TLS configuration.
- M07B remains blocked; do not begin it from this proposal.
- The three final full suites use headless Chromium/SwiftShader and correctly exercise the STATIC fallback. Separate same-image hardware evidence uses RTX 5050 / ANGLE D3D11 with 75.2 FPS FULL/BALANCED medians on this host. Host frame timings do not establish field performance.
- The user-downloaded Qwen 3 4B and Z-Image Turbo weights are already byte-identical in their ComfyUI model folders; ComfyUI lists both through the corresponding loaders. The current RTX 5050 has only about 1.5 GiB VRAM free, below either individual weight file, so they were not loaded. The existing qualified SDXL/Blender path was used; no inference failure was hidden.
- Any independent visual correction requires a reviewer-recorded Correction Delta and exact-head revalidation.

## Evidence

See `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT-EVIDENCE.md`, `correction-delta-04-performance-sonar-diagnosis.md`, `VISUAL-FIDELITY-REPORT.md`, the R32 contact sheet/review and the three `correction-delta-04/run-01` through `run-03` receipts. Exact-head hosted gates are read after the final evidence push. PR #20 remains open; this proposal does not assert visual readiness, approval, deployment or checkpoint promotion. The owner’s later instruction supersedes the older Vercel exception; the existing Vercel version was left untouched.
