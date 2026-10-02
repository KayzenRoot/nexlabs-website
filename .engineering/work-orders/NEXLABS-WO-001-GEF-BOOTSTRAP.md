# NEXLABS-WO-001 — GEF Bootstrap v1.1.2

Status: ADMITTED; completion is gated by the PR-open stop condition

## Authority

This Work Order persists the direct user instruction to prepare KayzenRoot/nexlabs-website as a GREENFIELD repository using GEF Bootstrap v1.1.2. It is limited to bootstrap and governance.

## Scope

- Confirm the repository, main base, clean initial state, and exact base SHA.
- Synchronize main using safe fetch/pull and create gef/bootstrap-v1.1.2.
- Verify Node.js >=22, npm, Git, and gh authentication/capability when available.
- Initialize npm if needed and install only @gef-bootstrap/cli@1.1.2 as an exact direct dependency.
- Run version, help, init preview, init apply, doctor, and status; preview must precede apply.
- Establish the Source Pack index and canonical governance documents for project identity, governance, checkpoint, decisions, scope, requirements, architecture, completion, planning, execution, security, validation, future work, innovation, and deployment.
- Record command outputs, dependency and repository checks, GitHub configuration, capability gaps, and a proposed checkpoint delta.
- Commit, push, and open a PR against main.

## Acceptance criteria

1. Direct dependency and package-lock resolve exactly @gef-bootstrap/cli@1.1.2; no package named gef is installed.
2. GEF reports version 1.1.2 and init apply completes after a read-only preview.
3. Doctor and status execute after the canonical checkpoint is created; their exact findings remain recorded.
4. All product progress remains 0%; no website page, component, frontend framework, Three.js, Blender asset, logo, or deployment is added.
5. Evidence records base/head SHA, runtime versions, all GEF outputs, checks, file changes, GitHub capability gaps, risks, and the proposed checkpoint delta.
6. The branch is pushed and the PR is open against main.

## Stop condition

Stop with the PR OPEN and UNMERGED. Do not merge. The increment cannot report success if a known HIGH or CRITICAL finding remains unresolved.
