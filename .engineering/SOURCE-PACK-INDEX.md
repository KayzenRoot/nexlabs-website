# Source Pack Index

Project binding: KayzenRoot/nexlabs-website, bootstrap branch gef/bootstrap-v1.1.2, base main SHA 51c9a3c5170dbeffcb8f856c38b62cce624d294b.

This index maps the required GEF semantic source classes to canonical project documents. The listed sources are the initial human-curated baseline derived from the direct bootstrap Work Order and verified repository facts.

| Semantic class | Canonical source | Authority domain | State |
| --- | --- | --- | --- |
| PROJECT_IDENTITY | PROJECT-OVERVIEW.md | PROJECT_STATE | RESOLVED_ACTIVE |
| CONSTITUTION_GOVERNANCE | CONSTITUTION-LOCK.md, AGENTS.md | EXECUTION | RESOLVED_ACTIVE |
| CURRENT_CHECKPOINT | CHECKPOINT.json, CHECKPOINT.md | PROJECT_STATE | RESOLVED_ACTIVE |
| DECISIONS | DECISIONS-LEDGER.md, decisions/ | DECISION | RESOLVED_ACTIVE |
| SCOPE | SCOPE.md | SCOPE | RESOLVED_ACTIVE |
| REQUIREMENTS | REQUIREMENTS.md | REQUIREMENT | RESOLVED_ACTIVE |
| ARCHITECTURE | ARCHITECTURE.md | ARCHITECTURE | RESOLVED_ACTIVE |
| COMPLETION_DEFINITION | DEFINITION-OF-DONE.md | COMPLETION | RESOLVED_ACTIVE |
| ACTIVE_PLANNING_STATE | BACKLOG.md | PLANNING | RESOLVED_ACTIVE |
| EXECUTION_GOVERNANCE | work-orders/, context-locks/, AGENTS.md | EXECUTION | RESOLVED_ACTIVE |
| SECURITY_POLICY | SECURITY.md | SECURITY | RESOLVED_ACTIVE |
| VALIDATION_POLICY | TEST-BENCHMARK-PLAN.md | VALIDATION | RESOLVED_ACTIVE |
| BACKLOG_FUTURE_WORK | BACKLOG.md | FUTURE_WORK | RESOLVED_ACTIVE |
| INNOVATION_LEDGER | INNOVATION-LEDGER.md | INNOVATION | RESOLVED_ACTIVE |

Conditional source: DEPLOYMENT.md records that no provider or release target has been selected. Its presence documents the user's requested deployment governance class; it does not activate a deployment or authorize one.

## Integrity boundary

The GEF CLI v1.1.2 init command records .gef/init-state.json and a run receipt. It does not generate or validate this Source Pack index or compute a Source Pack integrity epoch. Therefore this index is a bootstrap candidate, not an engine-issued conformance receipt. Structural mapping is recorded; independent review and exact-head validation remain pending. No canonical source is inferred from absence.
