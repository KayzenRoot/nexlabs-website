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

- Base: `c6b4e69e214ed51f9c2ad338e73ee6f3dc89a65c`; implementation SHA: `6fc2efa67a7e96c30aa220f052d755be0fb7c23f`; latest remote PR head before these corrections: `8b35242c7a285a3ae64118dd143e31f0b389a4ec`. The final pushed head and exact-head GitHub checks are recorded in the PR description.
- Reference image verified at SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647` (1600x900); supplied binary retained in the WO-007 evidence folder.
- Responsive, side-by-side fidelity, FULL/BALANCED/STATIC, reduced-motion, and WebGL-fallback evidence retained under `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/`.
- Latest local verification after the review corrections: `npm ci` (243 added, 254 audited), `npm audit --audit-level=moderate` (0 vulnerabilities), lint, typecheck, unit tests (3 files / 15 tests), production build, `git diff --check`, and browser/a11y/performance suite (11/11) all pass. The added mobile keyboard test reaches all five section links at 320 px.
- Latest Playwright evidence: lazy 3D JS 252,982 bytes gzip (target <=700 KB); static route JS 136,828 bytes gzip; BALANCED SwiftShader desktop profile 20 FPS median; constrained 900x768 BALANCED profile 30 FPS median; mobile STATIC profile LCP 2,360 ms, CLS 0, maximum CTA interaction sample 80 ms. Native Chrome/NVIDIA RTX 5050 BALANCED profile on implementation SHA `6fc2efa` (before the earlier runtime/motion review fixes) sampled 75.2 FPS median; it is retained as historical capable-desktop evidence, not a fresh current-head qualification.
- Docker Engine 29.8.1 / Compose v5.5.1; container `nexlabs-website-web-1` is running and healthy at `http://localhost:3000` (HTTP 200). Docker remains UP; no `docker compose down` was run.
- CodeRabbit's runtime fallback, tier-scaled motion, mobile navigation, failed script-body measurement and manual Three.js resource disposal findings are corrected. Exact-head CI, Browser Smoke, Socket and Sonar passed on code commit `0be8883`; CodeRabbit's latest review requested this promotion-gate clarification. Record an `APPROVED` result from the independent exact-head audit before merge. Merge remains required before promotion and is outside this executor stop condition. Exact-head GitHub checks must be revalidated after this documentation update.
- Full metrics, changed-file summary, Docker details, and limitations: `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM-EVIDENCE.md`.

## Boundary

Executor may update this proposal with factual evidence but may not self-promote it or merge the PR.

## Current execution state

- Initial implementation SHA `6fc2efa67a7e96c30aa220f052d755be0fb7c23f` and the subsequent review corrections are recorded in the Evidence Bundle.
- Latest remote PR head before the active correction patch is `8b35242c7a285a3ae64118dd143e31f0b389a4ec`; local checks on the correction patch pass, including 11/11 Playwright scenarios. Final push and exact-head checks remain outstanding.
- PR #9 must remain OPEN and unmerged at the stop condition. This delta remains PROPOSED pending exact-head checks and independent approval.


## Security / CI correction pending exact-head proof

A newly surfaced HIGH advisory affects the dev-only `@next/eslint-plugin-next -> fast-glob -> micromatch -> braces@3.0.3` chain and has no patched `braces` release available. The remediation removes that lint plugin and its unreachable transitives rather than using downgrade/override/suppression. `CI Quality` now includes `npm audit --audit-level=moderate`.

The Browser Smoke runtime-WebGL-failure scenario was also made deterministic for headless CI by separating the detached capability probe from the deliberately failing connected runtime canvas.

This delta remains PROPOSED until the new exact head proves audit=0 HIGH/CRITICAL and all required checks are green.
