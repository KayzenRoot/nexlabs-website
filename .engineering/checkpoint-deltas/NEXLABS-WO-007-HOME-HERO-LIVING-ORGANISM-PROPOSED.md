# Checkpoint Delta — NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM

State: PROPOSED — DO NOT PROMOTE BEFORE APPROVAL

## Proposed post-approval state

- M04 Home Hero 3D / Living Organism becomes APPROVED.
- The Home uses a poster-first, capability-aware 3D hero derived from the exact approved 1600x900 visual master.
- The selected Precision Blades N is the hero identity geometry.
- FULL/BALANCED/STATIC tiers are production behavior.
- Living-organism environmental motion foundation becomes reusable for M05.
- M05 Home Content Sections becomes the next legal increment.

## Evidence required

- Base: `c6b4e69e214ed51f9c2ad338e73ee6f3dc89a65c`; implementation/test SHA: `6fc2efa67a7e96c30aa220f052d755be0fb7c23f`.
- Reference image verified at SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647` (1600x900); supplied binary retained in the WO-007 evidence folder.
- Responsive, side-by-side fidelity, FULL/BALANCED/STATIC, reduced-motion, and WebGL-fallback evidence retained under `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/`.
- Lint, typecheck, unit tests (3 files / 15 tests), production build, browser/a11y suite (10/10 after review corrections), audit (0 vulnerabilities), and local secret-pattern scan passed on the implementation/correction patch.
- Lazy 3D JS is 252,938 bytes gzip (target <=700 KB). Static route JS is 136,829 bytes gzip. Native Chrome/NVIDIA RTX 5050 BALANCED profile on implementation SHA `6fc2efa` (before the two review fixes) sampled 75.2 FPS median; synthetic SwiftShader FULL profile sampled 10 FPS median and is not hardware qualification.
- Docker Engine 29.8.1 / Compose v5.5.1; container `nexlabs-website-web-1` is running and healthy at `http://localhost:3000` (HTTP 200). Docker remains UP; no `docker compose down` was run.
- CodeRabbit's two actionable findings were validated and corrected: preserve runtime failure after resize and use tier-scaled elapsed-time particle oscillation. Exact-final-HEAD CI/check results are required after push; independent reviewer verdict and approval remain required before promotion.
- Full metrics, changed-file summary, Docker details, and limitations: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM-EVIDENCE.md`.

## Boundary

Executor may update this proposal with factual evidence but may not self-promote it or merge the PR.

## Current execution state

- Initial implementation SHA `6fc2efa67a7e96c30aa220f052d755be0fb7c23f` was locally validated; two verified review corrections and the 10/10 post-correction E2E are recorded in the Evidence Bundle.
- The final post-correction PR SHA is recorded in the PR description after push; required checks must be inspected at that exact SHA.
- PR #9 must remain OPEN and unmerged at the stop condition. This delta remains PROPOSED pending exact-head checks and independent approval.


## Security / CI correction pending exact-head proof

A newly surfaced HIGH advisory affects the dev-only `@next/eslint-plugin-next -> fast-glob -> micromatch -> braces@3.0.3` chain and has no patched `braces` release available. The remediation removes that lint plugin and its unreachable transitives rather than using downgrade/override/suppression. `CI Quality` now includes `npm audit --audit-level=moderate`.

The Browser Smoke runtime-WebGL-failure scenario was also made deterministic for headless CI by separating the detached capability probe from the deliberately failing connected runtime canvas.

This delta remains PROPOSED until the new exact head proves audit=0 HIGH/CRITICAL and all required checks are green.
