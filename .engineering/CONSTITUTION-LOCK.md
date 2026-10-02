# Governance Constitution Lock

Status: ACTIVE — product-development baseline

This document preserves the governance principles established during the GEF Bootstrap and applies them to subsequent product increments.

1. A Work Order defines one bounded increment. Its Context Lock binds the admitted repository state, sources, allowed paths and stop condition.
2. Repository state and tracked canonical documents outrank summaries and inferred context.
3. Missing, unknown, stale or conflicting evidence stays explicit and cannot be reported as PASS.
4. Product implementation requires an admitted product Work Order and current Context Lock. Planning approval never silently authorizes unrelated implementation.
5. Required checks and review evidence must apply to the exact proposed PR head.
6. A Checkpoint Delta may be proposed by an executor but becomes canonical only after objective audit.
7. Do not advance to the next increment while the current one has unresolved HIGH/CRITICAL findings, requires correction, or lacks required validation.
8. No history rewrite, force-push, destructive repository action, gate weakening or credential disclosure is permitted without explicit authorization.
9. Visual/product claims must remain evidence-based; fabricated customers, partnerships, testimonials, metrics or capabilities are prohibited.
10. Merge is a gated lifecycle action: review must be complete and continuation through the gate must be authorized.

## Historical note

NEXLABS-WO-001 required its bootstrap PR to remain open until independent review. That stop condition was satisfied and PR #2 was later authorized and merged. The original Work Order and evidence remain historical sources; this constitution does not rewrite them.

Amendments require a recorded decision and must preserve authority, exact-state, evidence and safety rules.
