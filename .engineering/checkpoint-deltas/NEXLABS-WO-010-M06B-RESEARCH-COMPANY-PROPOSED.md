# Checkpoint Delta — NEXLABS-WO-010-M06B-RESEARCH-COMPANY

State: PROPOSED — NOT PROMOTED

## Candidate and admission

- Work Order: `NEXLABS-WO-010-M06B-RESEARCH-COMPANY`.
- Repository: `KayzenRoot/nexlabs-website`.
- Branch / PR: `work/nexlabs-wo-010-m06b-research-company` / PR #14.
- Authorized base SHA: `96330a8d50c30fab2a680b27f1c56252a4ac4fb6`.
- Immutable implementation/test reference: `806bae704bc148879ce903ac5547ca36390907ea`.
- Context Lock `.engineering/context-locks/NEXLABS-WO-010-M06B-RESEARCH-COMPANY.json` matched the admitted base with zero stale critical sources.
- Final PR HEAD and exact-head GitHub checks are captured in PR metadata after the final push; this proposed delta does not duplicate a self-referential final SHA.

## Proposed checkpoint delta

- Add `/research` and `/company` as implemented static/server-rendered M06 destinations using the accepted secondary-page foundation.
- Point global Research and Company links, Home Research CTAs, and Technology/Solutions Research CTAs to the real routes. Preserve Home anchors and the `/#contact` next-chapter CTA.
- Record the factual-safe Research method/exploration/integrity content and Company purpose/principles/working-model/integrity content; do not imply unverified company proof.
- Keep `/contact` unimplemented and returning 404 until the separately admitted M06C increment.
- Record zero axe violations, responsive/reduced-motion/browser evidence, 133,659-byte gzip route bundles, laboratory performance results, and Docker health in `.engineering/evidence/NEXLABS-WO-010-M06B-RESEARCH-COMPANY-EVIDENCE.md` and its evidence directory.
- No package manifest, dependency, design-system framework, WebGL scene, backend, or deployment scope was added.

## Evidence and validation

- Implementation/test commits: `c4f8d7138961fd8443f73506e90a6a7e0c94264b`, `92afc944a44af460c3bfb376edb40b2a7b627994`, `7167c2cda720b7de72659fef9bfa3ba8711167c8`, `0dd3e34ee3c9568ec606298f6c3773fadabba608`, `806bae704bc148879ce903ac5547ca36390907ea`.
- Local checks: `npm ci`, lint, typecheck, unit (25/25), production build, browser suite (19/19), moderate npm audit (0 vulnerabilities), diff check and secret-pattern scan passed.
- Docker remains UP/healthy at `127.0.0.1:3000`; five admitted routes are HTTP 200 and `/contact` is HTTP 404.
- axe reports no violations; automatic contrast evaluation is incomplete on gradient-backed elements and remains documented for manual review.
- Exact-head CI, security scans and independent review are checked on PR #14 after the final push. The PR remains OPEN for review.
- SonarCloud's prior 4.5% duplication failure on `4875eaf...` was corrected by restructuring only M06B E2E helpers; no gate was changed. CodeRabbit's reduced-motion and performance-report comments were corrected within scope. The low-priority Context Lock `staleIfChanged` suggestion is outside `writeAllowed` and remains a separate governance follow-up. The result for the next exact PR HEAD is pending.

## Boundary

This delta is proposed only. Do not edit `.engineering/CHECKPOINT.md` or `.engineering/CHECKPOINT.json`, merge PR #14, admit M06C, or treat the executor's checks as independent approval. Promotion requires an independent exact-head audit and the repository's authorized checkpoint workflow.
