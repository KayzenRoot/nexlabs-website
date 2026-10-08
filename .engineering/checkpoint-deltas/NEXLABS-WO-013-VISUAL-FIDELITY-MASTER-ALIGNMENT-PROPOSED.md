# Proposed Checkpoint Delta — NEXLABS-WO-013

**State:** PROPOSED — not promoted
**Current accepted checkpoint:** `WO_013_VISUAL_FIDELITY_MASTER_ALIGNMENT_ADMITTED`
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Branch:** `work/nexlabs-wo-013-visual-fidelity-master-alignment`
**PR:** #20, OPEN; visual floors remain pending and no independent review is requested yet
**Initial implementation anchor:** `c860171d8aa45c04032c2605934e82e1a09079d4`; **review corrections:** `86505817683af00cdecf312d6ca73b2ed1a7fb52`, `a665a7dd74992d4109a19ef4bb88de3a7761309a`, `d16a6f53fba6b98dff9d9004e11196056493038f`; **Browser Smoke fixture:** `8ac950e`; **visual correction:** `45bbf10ceeb834be14c92e6bb11145d73fa6ea55`; **Correction Delta 04 scene/source/test candidate:** `a837beeae11921dbe35c7757adedbd42055bc21d`.

## Proposed recorded progress

- Implemented the WO-013 visual fidelity increment within the admitted write boundary.
- Preserved the approved Precision Blades N source geometry, route copy/metadata, M07A security/readiness configuration, Contact zero-collection boundary, and package manifests.
- Added deterministic master comparisons and responsive scene, navigation, five-capability-object, motion, accessibility, performance, Docker and production-candidate evidence.
- On immutable source/test candidate `a837beeae11921dbe35c7757adedbd42055bc21d`, completed `npm ci`, lint, typecheck, 34 unit tests, production build, moderate npm audit and full E2E regressions. Image `nexlabs-website-release-candidate:a837beeae11921dbe35c7757adedbd42055bc21d` (digest `sha256:3e2d24733da2fd1518303547ac2b32296dc00fd0f335e85afb7d385e49e558b3`) passed three consecutive complete production-candidate suites at 30/30, retries=0. Home mobile LCP was 1836 ms, 1796 ms and 1776 ms; CLS was 0 each; interaction proxy was 112 ms, 96 ms and 112 ms. Every run retained 119 frame samples per distinct FULL/BALANCED tier.
- Development Docker remains UP/healthy at `127.0.0.1:3000`; all six product routes return HTTP 200.
- Executor visual score is PROPOSED at 77/100, matching the weighted criterion sum in the visual report. Exact-source R32 critique records composition 7/10 and environment density 7/10; those required harness floors are still unmet. The independent visual audit threshold (>=85/100 and required per-criterion floors), owner visual acceptance, and independent exact-head review remain pending.
- The previous independent audit at HEAD `487556d65d62c5581ee9fdcf6f77cf881c569f81` returned 68/100 with CORRECTION REQUIRED; there is no re-audit for the candidate SHA in this delta. The new 77/100 score is only the executor proposal and still does not meet the approval threshold.
- A prior diagnostic sequence used an incorrect manually entered SHA in the candidate tag and is excluded from qualification. The candidate was rebuilt using the full SHA read from Git, and all three final receipts bind to that corrected image digest. A previous hosted Browser Smoke exposed a test-fixture assumption about runner hardware; the test-only correction was revalidated by the final three consecutive complete suites. No production quality selector or performance budget changed.
- Addressed the three CodeRabbit findings on the preceding PR head: breakpoint closure and focus, accurate M06A desktop-performance/mobile-layout-only and M06B desktop/mobile performance-and-layout evidence labels, and the corrected 77/100 criterion sum.

## Proposed state after this increment

`WO_013_IMPLEMENTED_AWAITING_VISUAL_FLOOR_CORRECTION_AND_OWNER_ACCEPTANCE`

This is not an accepted checkpoint state. `.engineering/CHECKPOINT.md` and `.engineering/CHECKPOINT.json` remain unchanged until the visual floors, independent review and owner acceptance resolve the score gap. The precise final PR HEAD and hosted checks are verified in PR #20 metadata after the final evidence push; immutable source/test candidate SHA is `a837beeae11921dbe35c7757adedbd42055bc21d`, avoiding a circular SHA reference. The existing Vercel version/configuration was not touched.

## Gates still closed

- No merge or checkpoint promotion.
- No public deployment or provider/domain/TLS configuration.
- M07B remains blocked; do not begin it from this proposal.
- The current three full-suite captures use RTX 5050 / ANGLE D3D11 hardware acceleration (75.2 FPS FULL/BALANCED medians on this host). A separate headless SwiftShader attempt is nonqualifying diagnostic evidence. Host frame timings do not establish field performance.
- The user-downloaded Qwen 3 4B and Z-Image Turbo weights are already byte-identical in their ComfyUI model folders; ComfyUI lists both through the corresponding loaders. The current RTX 5050 has only about 1.5 GiB VRAM free, below either individual weight file, so they were not loaded. The existing qualified SDXL/Blender path was used; no inference failure was hidden.
- Any independent visual correction requires a reviewer-recorded Correction Delta and exact-head revalidation.

## Evidence

See `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT-EVIDENCE.md`, `VISUAL-FIDELITY-REPORT.md`, the R32 contact sheet/review and the three `final-candidate-a837bee` run receipts. The exact final PR HEAD and hosted checks are read after the final evidence push. PR #20 remains open; this proposal does not assert visual readiness, approval, deployment or checkpoint promotion. The owner’s later instruction supersedes the older Vercel exception; the existing Vercel version was left untouched.
