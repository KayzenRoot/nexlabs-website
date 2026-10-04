# Definition of Done

## Completed

- GEF Bootstrap: APPROVED and merged.
- M01 Product Foundation & Visual System: APPROVED and merged.
- M02 Runtime & Repository Foundation: APPROVED and merged.
- M03 Brand System program: APPROVED and merged.
- M04 Home Hero 3D / Living Organism: APPROVED and merged in PR #9.
- M05 Home Content Sections: APPROVED at exact head `22b3012551cce8f8a585605cf0f7a246ecd2a2a0` and merged in PR #10.
- M06A Technology + Solutions: APPROVED at exact head `0328527eabd6efd6cf763e4f7baf731a93731229` and merged in PR #12.
- M06B Research + Company: APPROVED at exact head `ee160d50a4ca8c1edad25d06a295c505eace6993` and merged in PR #14.

## Completed gate — M05 Home Content Sections

M05 is complete. The following gate was satisfied:

1. Placeholder Project/Contact content and hidden planned anchors are removed.
2. Capability, Principles, Vision, Research, Technology and Final CTA sections are implemented from HOME-CONTENT-SPEC.md.
3. The five capability cards use factual-safe copy and coherent visual motifs.
4. The unsupported metric strip is replaced with non-numeric principles.
5. Research and Technology sections visually continue the approved master.
6. The cube/stacked-layer vocabulary appears in Technology without a new heavy 3D runtime.
7. The lower Home visually connects to the M04 living-organism world.
8. Header/in-page anchors land on visible semantic sections.
9. No fake customers, partners, statistics, awards, testimonials or outcomes are introduced.
10. Mobile/tablet/desktop are validated with no unexpected horizontal overflow.
11. Keyboard/focus/reduced-motion behavior remains correct.
12. Accessibility/browser smoke passes.
13. Existing M04 hero/fallback/tier tests continue to pass.
14. No unjustified heavy dependency is added.
15. Lint, typecheck, unit and production build pass.
16. Security/dependency review has no unresolved HIGH/CRITICAL finding.
17. Performance evidence remains inside targets or records justified variance.
18. Docker remains UP/healthy.
19. Exact-head CodeRabbit, CI, Browser Smoke, Socket and Sonar gates pass.
20. Independent review reports APPROVED.
21. Checkpoint promotion occurs only after approval and merge.

## M06 program

M06 Secondary Pages is complete only after all separately admitted sub-increments are independently APPROVED and merged:
- M06A — Technology + Solutions;
- M06B — Research + Company;
- M06C — Contact + final cross-route integration.

## Completed gate — M06A Technology + Solutions

M06A is complete. The following gate was satisfied:

1. `/technology` and `/solutions` are real production routes.
2. Exact M06A copy comes from SECONDARY-PAGES-SPEC.md.
3. Both routes use server-rendered semantic content by default.
4. Technology uses stacked-layer/cube vocabulary without a new WebGL scene.
5. Solutions uses the approved five capability areas without fabricated proof.
6. Global navigation works from Home and direct secondary-route loads.
7. No M06B/M06C placeholder route or broken link is introduced.
8. Unique metadata and correct heading hierarchy exist on both routes.
9. Keyboard/focus/skip-link behavior remains correct.
10. Reduced-motion behavior remains correct.
11. Automated accessibility has no serious/critical violation.
12. Mobile/tablet/desktop have no unexpected horizontal overflow.
13. Secondary pages do not mount Home HeroScene/canvas.
14. Initial route JS remains <= 220 KB gzip and Home 3D code stays isolated.
15. Performance evidence stays inside targets or records justified variance.
16. Existing Home hero/M05 tests remain green.
17. Lint, typecheck, unit, build and browser checks pass.
18. Security/dependency review has no unresolved HIGH/CRITICAL finding.
19. Evidence Bundle is complete and tied to exact candidate head.
20. Docker remains UP/healthy and all implemented routes return HTTP 200.
21. Exact-head CI/Browser/Socket/Sonar/CodeRabbit signals are checked.
22. Independent exact-head audit reports APPROVED.
23. Checkpoint promotion occurs only after approval and authorized merge.

## Completed gate — M06B Research + Company

M06B is complete. The following gate was satisfied:

1. `/research` and `/company` are real production routes.
2. Exact M06B copy/metadata comes from SECONDARY-PAGES-SPEC.md.
3. Exact admitted Home transition copy/destinations come from HOME-CONTENT-SPEC.md.
4. Both routes use server-rendered semantic content by default.
5. Research implements the four-stage Research Method and five Exploration Areas.
6. Research Integrity avoids fabricated publications, patents, breakthroughs, deployments or customer proof.
7. Company implements Purpose, four approved principles, four Working Model behaviors and Company Integrity.
8. Company avoids fabricated team, founding, office, headcount, partner, award or timeline proof.
9. Research/Company visually reuse the approved M06 secondary-page system without another WebGL scene.
10. Global Research/Company navigation resolves to the real routes.
11. Technology/Solutions Research CTAs resolve to `/research`.
12. Home Research CTAs resolve to `/research` and the stale final-CTA transition sentence is replaced with canonical M06B copy.
13. No `/contact` route exists; Contact remains M06C.
14. Unique metadata and correct heading hierarchy exist on both new routes.
15. Keyboard/focus/skip-link behavior remains correct.
16. Reduced-motion behavior remains correct.
17. Automated accessibility has no serious/critical violation.
18. Required mobile/tablet/desktop widths have no unexpected horizontal overflow.
19. Research/Company do not mount Home HeroScene/canvas.
20. Initial route JS remains <= 220 KB gzip and Home 3D code stays isolated.
21. Performance evidence stays inside targets or records justified variance.
22. Existing Home, Technology and Solutions regressions remain green.
23. Lint, typecheck, unit, build and browser checks pass.
24. Security/dependency review has no unresolved HIGH/CRITICAL finding.
25. Evidence Bundle is complete with immutable implementation/test references plus exact-head audit metadata.
26. Docker remains UP/healthy; five implemented routes return 200 and `/contact` returns 404.
27. Exact-head CI/Browser/Socket/Sonar/CodeRabbit signals are checked.
28. Independent exact-head audit reports APPROVED.
29. Checkpoint promotion occurs only after approval and authorized merge.

## M06C — Contact + final cross-route integration

M06C is complete only when:
1. `/contact` is a real route with canonical content/metadata.
2. Contact is read-only and zero-collection.
3. No form/input/upload/submit/API/mailto/tel/invented channel exists.
4. Project Brief, Contact Availability and Data Boundary are complete.
5. Contact reuses M06 architecture without WebGL.
6. Header/footer Contact action resolves to `/contact` on all six routes.
7. Home `#contact` remains and final CTA matches canonical M06C copy.
8. Prior Home/M06A/M06B regressions remain green.
9. Accessibility/responsive/reduced-motion checks pass.
10. Contact JS <= 220 KiB gzip and Home 3D remains isolated.
11. Performance targets pass or variance is justified.
12. lint/typecheck/unit/build/browser/security checks pass.
13. Evidence proves zero-collection and six-route navigation.
14. Docker stays UP/healthy; all six routes return 200.
15. Exact-head CI/Browser/Socket/Sonar/CodeRabbit gates are checked.
16. Independent exact-head audit reports APPROVED.
17. Promotion occurs only after approval and authorized merge.

After M06C approval/merge/promotion, the M06 Secondary Pages program is complete.

## Global implementation rule

Each runnable frontend increment remains functional, tested, documented, deployable and objectively validated within its admitted scope. Docker remains running/healthy unless the owner explicitly instructs otherwise.
