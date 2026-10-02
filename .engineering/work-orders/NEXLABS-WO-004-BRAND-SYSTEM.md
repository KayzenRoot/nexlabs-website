# NEXLABS-WO-004 — M03 Brand System & N Monogram Planning

Status: ADMITTED — PLANNING ONLY

## OBJECTIVE

Freeze the brand-system specification for Nex Labs Technology, especially the proprietary N monogram, so the subsequent implementation increment can generate concepts, obtain owner selection, produce the SVG master and integrate it without reopening basic identity decisions.

## CONTEXT

M02 is approved and merged at main SHA `dee3d01d24c8f7ad9a6c4ab9db2eca31d2f0afbb`. The live development foundation exists and Docker continuity is a repository rule.

The owner has already established that the current placeholder N is not strong enough. The desired mark must be more elegant, more technological and capable of a restrained animated treatment while remaining a clean static identity.

## SCOPE

- Define the N monogram geometry brief.
- Define flat vs enhanced material hierarchy.
- Define required logo lockups.
- Define clear-space, minimum-size and favicon behavior requirements.
- Define typography strategy and production/licensing constraints.
- Define color/material roles.
- Define intro/idle/hover/reduced-motion behavior.
- Define concept-generation count/categories.
- Define shortlist and rejection criteria.
- Define the subsequent implementation evidence and stop condition.
- Update canonical brand/planning sources.

## OUT OF SCOPE

- Generating or selecting the final logo image in this planning PR.
- Creating final SVG/favicon binaries.
- Installing motion/3D libraries.
- Changing the Home layout substantially.
- Implementing the M04 hero 3D.
- Secondary pages, backend, analytics or deployment.

## FILES / SOURCES TO READ

1. `.engineering/CHECKPOINT.md` / `CHECKPOINT.json`
2. `.engineering/DECISIONS-LEDGER.md`
3. `.engineering/UI-UX.md`
4. `.engineering/VISUAL-DIRECTION.md`
5. `.engineering/BRAND-SYSTEM.md`
6. `.engineering/ARCHITECTURE.md`
7. `.engineering/REQUIREMENTS.md`
8. `.engineering/DEFINITION-OF-DONE.md`
9. `.engineering/BACKLOG.md`
10. `AGENTS.md`
11. active Context Lock

## REQUIREMENTS

- The flat vector silhouette is the identity source of truth.
- Enhanced chrome/glass treatment is optional presentation.
- The mark must remain readable and distinctive at favicon scale.
- It must fit the selected chrome-intelligence Home without becoming a gaming/esports mark.
- The animated header treatment must remain lightweight and respect reduced motion.
- Concept selection must happen explicitly before final vector implementation.

## ARCHITECTURE RULES

- Header logo remains SVG/CSS-first.
- No WebGL requirement for logo rendering.
- Motion must be implementable without adding heavy runtime dependencies.
- Final logo integration must preserve accessibility and not shift layout during load.
- Docker continuity remains mandatory for the later runnable implementation increment.

## CONSTRAINTS

- Planning-only diff.
- No final logo binary or SVG selection.
- No external trademark/originality claim without a separate check.
- No fabricated brand history/claims.
- No M04 scope.
- No force-push/history rewrite.

## ACCEPTANCE CRITERIA

1. BRAND-SYSTEM.md defines objective logo requirements.
2. Concept categories and minimum concept count are explicit.
3. Rejection criteria are explicit.
4. Required lockups and size/monochrome behaviors are explicit.
5. Motion states and reduced-motion behavior are explicit.
6. Typography and material roles are explicit.
7. Implementation evidence is explicit.
8. Canonical checkpoint records M02 complete and M03 planning active.
9. No final logo asset enters the diff.
10. Exact-head independent review returns APPROVED before merge.

## TESTS

- JSON validation of checkpoint/context lock.
- Source consistency review.
- Verify no runtime/package change.
- Verify no image/SVG/logo binary added.
- `git diff --check`.
- Available CodeRabbit/Socket review.

## DELIVERABLES

- `.engineering/BRAND-SYSTEM.md`
- updated checkpoint/backlog/DoD/decision sources
- Context Lock
- proposed Checkpoint Delta
- open planning PR

## REVIEW FORMAT

Brazilian Portuguese:
- exact base/head;
- findings by severity;
- brand-system completeness;
- scope integrity;
- APPROVED / CORRECTION REQUIRED / BLOCKED.

## STOP CONDITION

Stop with the planning PR open and unmerged after exact-head review. Do not create/select the final logo or begin M04 in this Work Order.
