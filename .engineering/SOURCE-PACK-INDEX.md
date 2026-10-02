# Source Pack Index

Project binding: KayzenRoot/nexlabs-website.

Current baseline:
- GEF Bootstrap v1.1.2 merged to main at 424dca87a7fbb39c62347707f003fe4111f617ea.
- Active planning branch: planning/nexlabs-wo-002-product-foundation.
- Active Work Order: NEXLABS-WO-002-PRODUCT-FOUNDATION.

This index maps required GEF semantic source classes to canonical project documents.

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

Additional canonical product-planning sources:
- UI-UX.md — interaction/layout/brand experience rules.
- VISUAL-DIRECTION.md — Home Visual Master and visual anti-patterns.
- TECHNOLOGY-LEDGER.md — admitted product technologies and exclusions.
- DEPLOYMENT.md — deployment boundary; provider remains unselected.

## Integrity boundary

GEF CLI v1.1.2 does not generate or validate this Source Pack index or compute a Source Pack integrity epoch. The index therefore remains human-curated and requires exact-head independent review. It must not be described as engine-issued conformance evidence.
