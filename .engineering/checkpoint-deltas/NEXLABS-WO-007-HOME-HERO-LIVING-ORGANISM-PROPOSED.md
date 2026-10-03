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
- Lint, typecheck, unit tests (3 files / 15 tests), production build, browser/a11y suite (9/9), audit (0 vulnerabilities), and local secret-pattern scan passed on the implementation SHA.
- Lazy 3D JS is 252,938 bytes gzip (target <=700 KB). Static route JS is 136,829 bytes gzip. Native Chrome/NVIDIA RTX 5050 BALANCED profile sampled 75.2 FPS median; synthetic SwiftShader FULL profile sampled 10 FPS median and is not a hardware qualification.
- Docker Engine 29.8.1 / Compose v5.5.1; container `nexlabs-website-web-1` is running and healthy at `http://localhost:3000` (HTTP 200). Docker remains UP; no `docker compose down` was run.
- Current local GitHub check snapshot was for prior head `df7f2aed6aed503b0a5f771d23819174725d0ba4`; it does not transfer to the new candidate. Exact-final-HEAD CI/check results, independent reviewer verdict, and approval remain required before promotion.
- Full metrics, changed-file summary, Docker details, and limitations: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM-EVIDENCE.md`.

## Boundary

Executor may update this proposal with factual evidence but may not self-promote it or merge the PR.

## Current execution state

- Implementation SHA `6fc2efa67a7e96c30aa220f052d755be0fb7c23f` is locally validated; Evidence Bundle records measurements and limitations.
- Evidence/checkpoint documentation is being committed separately. The final PR candidate SHA is recorded in the PR description after push, and required checks must be inspected at that exact SHA.
- PR #9 must remain OPEN and unmerged at the stop condition. This delta remains PROPOSED pending exact-head checks and independent approval.
