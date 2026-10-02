# Source Hierarchy

Authority is resolved by semantic domain and exact project binding; no universal newest-file rule is used.

| Domain | Canonical source |
| --- | --- |
| Repository state | Exact Git refs, commit objects, and GitHub repository/PR state |
| Project identity | PROJECT-OVERVIEW.md and verified repository identity |
| Governance | CONSTITUTION-LOCK.md and AGENTS.md |
| Current project state | CHECKPOINT.json and CHECKPOINT.md, kept coherent |
| Scope | SCOPE.md and the active Work Order |
| Requirements | REQUIREMENTS.md and the active Work Order |
| Architecture | ARCHITECTURE.md and accepted architecture decisions |
| UI/UX and visual identity | UI-UX.md, VISUAL-DIRECTION.md and accepted owner visual decisions |
| Decisions | DECISIONS-LEDGER.md and accepted ADRs |
| Completion | DEFINITION-OF-DONE.md and Work Order acceptance criteria |
| Execution | Active Work Order plus its exact Context Lock |
| Security | SECURITY.md and applicable repository settings/evidence |
| Validation | TEST-BENCHMARK-PLAN.md and exact-head check results |
| Planning and future work | BACKLOG.md |
| Innovation | INNOVATION-LEDGER.md |

For the active increment, NEXLABS-WO-003-RUNTIME-FOUNDATION and its Context Lock are the execution authority. Direct owner decisions already recorded in canonical sources govern visual direction. README.md is descriptive context and does not supersede the canonical sources above.
