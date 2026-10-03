# Checkpoint Delta — NEXLABS-WO-008-HOME-CONTENT-SECTIONS

State: PROPOSED — DO NOT PROMOTE BEFORE APPROVAL

## Proposed post-approval state

- M05 Home Content Sections becomes APPROVED.
- Home contains completed capability, principles, vision, research, technology and final CTA sections.
- Unsupported metric/social-proof placeholders are absent.
- Living-organism visual continuity extends below the M04 hero.
- M06 Secondary Pages becomes the next legal increment.

## Evidence required

- Exact base: `6b0f3fa29f00796a85dbd44ac21010f3337cf5c5`; exact final candidate SHA and exact-head GitHub checks are recorded in PR #10 after the evidence-closeout commit.
- The six required Home areas are present in canonical order. Unit tests assert the canonical safe copy, five capability names, four principles, research/technology copy, no fabricated proof, and valid section anchors.
- Responsive evidence: 1600×900, 1440×900, 390×844 and full-page captures are retained under `.engineering/evidence/NEXLABS-WO-008-HOME-CONTENT-SECTIONS/`.
- Navigation and continuity evidence: anchor/browser tests and `home-hero-capabilities-continuity-1600x900.png`, `home-research-technology-continuity-1600x900.png`.
- Accessibility/motion evidence: keyboard focus, mobile navigation, axe, and reduced-motion captures retained; reduced-motion styles suppress nonessential animation and transitions.
- Local checks: lint, typecheck, unit (3 files / 17 tests), production build, Playwright E2E (12/12), `npm audit --audit-level=moderate` (0 findings), and `git diff --check` passed on the implementation candidate.
- Performance: mobile 4G/4× CPU LCP 2,384 ms, CLS 0, 136,828 gzip bytes initial JavaScript, and 88 ms laboratory CTA interaction proxy; desktop BALANCED lazy 3D chunk 252,982 gzip bytes. Full measurements and limitations are in the Evidence Bundle JSON/report.
- Docker Engine `29.8.1`, Compose `v5.5.1`; `nexlabs-website-web-1` is UP/healthy, publishes `127.0.0.1:3000 -> 3000`, and Home returns HTTP 200. Compose was not taken down.
- Fresh `npm ci` and `npm audit --audit-level=moderate` reported zero vulnerabilities; `braces@3.0.3` and the previously vulnerable chain are absent from the installed dependency tree. GitHub Dependabot alert API access returned HTTP 403, recorded as a capability gap; no override/suppression was used.
- CodeRabbit admission review at `591e879d33919f83ad6fc3f87b52f8cce35159b2` had no actionable comments. That review is not evidence for the implementation SHA. Exact-head CodeRabbit and GitHub checks must be revalidated after the final push. Independent exact-head APPROVED verdict remains outstanding.

## Boundary

Executor may update this proposal with factual evidence but may not self-promote it or merge the PR. Keep PR #10 OPEN; do not start M06 until independent exact-head approval and merge are separately authorized and complete.
