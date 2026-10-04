# Definition of Done

## Completed

- GEF Bootstrap: APPROVED and merged.
- M01 Product Foundation & Visual System: APPROVED and merged.
- M02 Runtime & Repository Foundation: APPROVED and merged.
- M03 Brand System program: APPROVED and merged.
- M04 Home Hero 3D / Living Organism: APPROVED and merged in PR #9.
- M05 Home Content Sections: APPROVED and merged in PR #10.
- M06A Technology + Solutions: APPROVED at exact head `0328527eabd6efd6cf763e4f7baf731a93731229` and merged in PR #12.

## M06 program

M06 Secondary Pages is complete only after all separately admitted sub-increments are independently APPROVED and merged:
- M06A — Technology + Solutions: COMPLETE.
- M06B — Research + Company: NOT YET ADMITTED.
- M06C — Contact + final cross-route integration: NOT YET ADMITTED.

## Completed gate — M06A Technology + Solutions

The M06A gate was satisfied, including:
- real `/technology` and `/solutions` production routes;
- canonical copy/metadata and one semantic H1 per route;
- server-rendered semantic content;
- no second WebGL scene or Home HeroScene on secondary routes;
- valid route-aware global navigation;
- no fabricated M06B/M06C route;
- responsive, reduced-motion and accessibility validation;
- route JS within the 220 KiB gzip budget;
- Home regression coverage;
- lint, typecheck, unit, build, E2E and dependency/security checks;
- complete Evidence Bundle and proposed Checkpoint Delta;
- Docker UP/healthy with HTTP 200 for `/`, `/technology`, `/solutions`;
- exact-head CI Quality, Browser Smoke, Socket, Sonar and CodeRabbit signals;
- independent exact-head APPROVED verdict;
- authorized squash merge.

## Next Definition of Done

M06B Research + Company has not yet been admitted. Its exact completion criteria must be defined by WO-010 before implementation begins.

## Global implementation rule

Each runnable frontend increment remains functional, tested, documented, deployable and objectively validated within its admitted scope. Docker remains running/healthy unless the owner explicitly instructs otherwise.
