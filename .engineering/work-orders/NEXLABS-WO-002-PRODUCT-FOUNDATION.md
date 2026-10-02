# NEXLABS-WO-002 — Product Foundation & Visual System

Status: ADMITTED — PLANNING ONLY

## OBJECTIVE

Create the complete product foundation for Nex Labs Technology Website V1 so implementation can begin from a small, deterministic Codex prompt instead of discovering architecture or design during coding.

## CONTEXT

GEF Bootstrap v1.1.2 is approved and merged at main SHA 424dca87a7fbb39c62347707f003fe4111f617ea. The owner selected the chrome-humanoid homepage concept as the primary Home visual and wants high fidelity, controlled 3D motion, strong performance and a redesigned N monogram.

## SCOPE

- Product purpose and V1 information architecture.
- Visual Master and secondary visual language.
- Logo/brand behavior requirements.
- Frontend architecture.
- 3D asset/runtime architecture.
- Performance budgets.
- Accessibility, SEO, privacy/security and content-integrity requirements.
- M02 implementation decomposition.
- Canonical source/checkpoint updates.

## OUT OF SCOPE

- Product runtime code.
- Framework/package installation.
- Blender production asset creation.
- Final logo artwork.
- Public deployment.
- CMS/CRM/analytics vendor selection.
- Fake client/customer/social-proof content.

## FILES / SOURCES TO READ

1. .engineering/CHECKPOINT.md and CHECKPOINT.json
2. .engineering/DECISIONS-LEDGER.md and decisions/
3. .engineering/SCOPE.md
4. .engineering/DEFINITION-OF-DONE.md
5. .engineering/ARCHITECTURE.md
6. .engineering/REQUIREMENTS.md
7. .engineering/UI-UX.md
8. .engineering/VISUAL-DIRECTION.md
9. .engineering/TEST-BENCHMARK-PLAN.md
10. .engineering/BACKLOG.md
11. AGENTS.md

## REQUIREMENTS

- Preserve the selected chrome-humanoid Home direction.
- Reserve the cube visual language for infrastructure/technology sections.
- Use a vector-first proprietary-looking N monogram with restrained motion.
- Keep heavy 3D isolated and capability-aware.
- Require immediate poster/static fallback.
- Do not fabricate customer logos, partnerships or metrics.
- Product architecture must be specific enough that M02 can execute without reopening basic stack decisions.

## ARCHITECTURE RULES

- Next.js App Router.
- Strict TypeScript.
- React Server Components by default.
- CSS Modules + design tokens.
- Three.js + React Three Fiber in isolated client islands.
- GSAP/ScrollTrigger only for complex motion.
- Blender → optimized glTF/GLB pipeline.
- FULL/BALANCED/STATIC quality tiers.
- Accessibility and reduced-motion are architecture requirements, not polish.

## CONSTRAINTS

- No product code in WO-002.
- No broad cleanup unrelated to this increment.
- No new runtime dependency.
- No deployment.
- No fake business claims.
- No checkpoint promotion before independent review.

## ACCEPTANCE CRITERIA

1. Canonical product scope and page set are explicit.
2. Visual Master and secondary cube language are recorded.
3. Logo direction is recorded.
4. Frontend and 3D architecture are accepted through ADRs.
5. Performance/accessibility/security/SEO requirements are auditable.
6. M02 is decomposed clearly in Backlog/DoD.
7. No product code or runtime dependency enters the diff.
8. Exact-head review finds no HIGH/CRITICAL issue.
9. Proposed checkpoint delta is reviewed before promotion.

## TESTS

- Markdown/source consistency review.
- JSON parse and Context Lock validation.
- Verify no new product/runtime package beyond the existing GEF dependency.
- Verify no application source directories/runtime implementation are introduced.
- git diff --check.
- Secret scan where available.
- CodeRabbit/available repository review checks.

## DELIVERABLES

- Updated canonical Source Pack.
- UI-UX and Visual Direction sources.
- ADR-0003 Website Stack.
- ADR-0004 3D/Motion Strategy.
- Context Lock.
- Proposed Checkpoint Delta.
- Open PR for independent review.

## REVIEW FORMAT

Review in Brazilian Portuguese with:
- exact base/head SHA;
- findings by severity;
- requirements/architecture/DoD compliance;
- capability gaps;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with the planning PR open and unmerged after review evidence is available. Do not begin M02 product implementation until WO-002 is objectively APPROVED, its checkpoint delta is promoted and the planning PR is merged.
