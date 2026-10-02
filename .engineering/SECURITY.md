# Security Policy

## Bootstrap baseline

- Keep the npm project private until licensing and publication intent are explicitly decided.
- Pin the GEF CLI exactly and retain the package lockfile.
- Do not commit credentials, tokens, local transaction journals, or user-specific secrets.
- Keep .gef-private excluded from version control; retain the GEF-managed .gef state and receipt as review evidence.
- Run the available npm dependency audit and report signature/provenance tooling gaps without converting them into a PASS.
- Do not change branch protections or security gates within this bootstrap increment.

## Product security

Threat model, data flows, collection, retention, and runtime security requirements remain NOT_STARTED until product scope is admitted.
