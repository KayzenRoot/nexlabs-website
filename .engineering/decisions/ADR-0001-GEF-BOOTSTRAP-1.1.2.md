# ADR-0001 — Use GEF Bootstrap 1.1.2 for Repository Bootstrap

Status: ACCEPTED for NEXLABS-WO-001 only

## Context

The direct user Work Order requires GEF Bootstrap v1.1.2 as the governance bootstrap for the greenfield website repository.

## Decision

Install @gef-bootstrap/cli@1.1.2 as an exact development dependency, retain the npm lockfile, and use the admitted GEF CLI commands for initialization and diagnostics.

## Consequences

- The GEF CLI is pinned exactly to 1.1.2 for reproducible bootstrap use.
- This decision does not select or authorize a website framework or runtime.
- The CLI init command records GEF-managed state; the canonical project sources remain separately reviewable.
