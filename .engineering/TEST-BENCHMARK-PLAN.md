# Validation Plan

## Bootstrap checks

- Verify Node.js >=22, npm, Git, and GitHub CLI authentication/capability when available.
- Verify exact direct dependency and lockfile resolution with npm ls.
- Run npm audit at the high severity threshold and capture npm signature verification output where supported.
- Run all required GEF CLI commands in the specified order, with init preview before apply.
- Run GEF doctor and status after the canonical checkpoint exists.
- Validate JSON documents, exact Context Lock bindings, git diff --check, and final Git cleanliness.
- Do not add an application test suite or claim website behavior is tested; no product code exists.

## Product validation

Browser, accessibility, performance, security, and deployment checks are not selected until a product Work Order defines the application architecture and acceptance criteria.
