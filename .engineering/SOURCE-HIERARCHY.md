# Source Hierarchy

Authority is resolved by semantic domain and exact project binding; no universal newest-file rule is used.

| Domain | Canonical source |
| --- | --- |
| Repository state | Exact Git refs, commit objects, and GitHub repository/PR state |
| Project identity | PROJECT-OVERVIEW.md and verified repository identity |
| Governance | CONSTITUTION-LOCK.md and AGENTS.md |
| Current project state | CHECKPOINT.json and CHECKPOINT.md |
| Scope | SCOPE.md and the active Work Order |
| Requirements | REQUIREMENTS.md and the active Work Order |
| Architecture | ARCHITECTURE.md and accepted architecture decisions |
| Home visual composition | HOME-VISUAL-MASTER-SPEC.md, VISUAL-DIRECTION.md and the exact approved reference asset |
| Home content and approved copy | HOME-CONTENT-SPEC.md |
| M06 secondary routes and approved copy | SECONDARY-PAGES-SPEC.md |
| UI/UX and brand identity | UI-UX.md, BRAND-SYSTEM.md and accepted owner visual decisions |
| Decisions | DECISIONS-LEDGER.md and accepted ADRs |
| Completion | DEFINITION-OF-DONE.md and Work Order acceptance criteria |
| Execution | Active Work Order plus its exact Context Lock |
| Security | SECURITY.md and repository settings/evidence |
| Validation | TEST-BENCHMARK-PLAN.md and exact-head check results |
| Deployment | DEPLOYMENT.md, RELEASE-READINESS-SPEC.md and an admitted M07 Work Order |
| Planning and future work | BACKLOG.md |
| Innovation | INNOVATION-LEDGER.md |

The active implementation authority is `NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS` plus its exact Context Lock. `RELEASE-READINESS-SPEC.md` is canonical for M07A production hardening, pre-launch indexing, production-container and rollback obligations. DEPLOYMENT.md is canonical for the M07A/M07B deployment boundary. Existing M01–M06 product/content sources remain regression-protected. M07B is not executable until M07A is APPROVED, merged and checkpoint-promoted.
