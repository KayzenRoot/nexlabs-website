# Nex Labs Technology Website — Repository Instructions

## Authority and execution

1. Read .engineering/SOURCE-HIERARCHY.md and .engineering/CHECKPOINT.md before any work.
2. Read the active Work Order and its Context Lock before implementation.
3. Treat exact Git state, tracked canonical documents, accepted decisions and validated evidence as authoritative.
4. Keep missing, unknown, stale or conflicting evidence explicit; do not infer success.
5. Implement only the active Work Order. New scope requires a new or explicitly amended Work Order plus refreshed Context Lock.
6. Do not merge a pull request unless the current increment has passed objective review and the user has authorized continuation through that gate.
7. Never force-push, rewrite history, weaken a security/review gate or expose credentials to make an increment pass.
8. Executor review/result summaries are written in Brazilian Portuguese.

## Product-development boundary

The GEF Bootstrap v1.1.2 baseline is merged. Product work is now governed module by module.

Before product implementation:
- the preceding planning/decision increment must be APPROVED;
- the active implementation Work Order must exist;
- the Context Lock must bind the current base and critical sources;
- architecture and acceptance criteria must be explicit.

## Visual fidelity

For visual increments, .engineering/UI-UX.md and .engineering/VISUAL-DIRECTION.md are canonical. The selected chrome-humanoid Home direction is not a loose inspiration: material deviation requires explicit review evidence and approval.

## Evidence

Completed is not proof. Each implementation increment must retain evidence appropriate to its risk, including exact base/head, changed files, checks, tests, build/typecheck/lint, security findings, visual/performance evidence when affected, risks and proposed Checkpoint Delta.

## Development Docker continuity

For any frontend/application increment that has a runnable local UI, the executor must leave the approved development Docker service running and healthy at the stop condition unless the owner explicitly asks otherwise. The Evidence Bundle must record the local URL/port, container health and the commands needed to inspect logs/status. Do not run `docker compose down` as part of normal completion. This rule exists so the owner can continuously inspect the current visual state while development advances.
