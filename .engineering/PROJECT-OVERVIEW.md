# Nex Labs Technology Website — Project Overview

## Identity

- Project: Nex Labs Technology official website
- Repository: KayzenRoot/nexlabs-website
- Default branch: `main`
- Lifecycle: GREENFIELD PRODUCT DEVELOPMENT

## Approved product

M01 through M06 are APPROVED/MERGED. V1 currently has six public logical routes: Home, Technology, Solutions, Research, Company and Contact. Contact remains read-only/zero-collection.

Production identity: `NEX-N-A-PRECISION-BLADES`.

## Current increment

M07A Release Hardening & Production Readiness is ADMITTED under `NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS`.

Admission base main SHA: `d7ec01e94d30a41a64aa683a345e4e5675541ca2`.
Risk: ELEVATED.
Executor: Codex.

M07A owns:
- production response/security hardening;
- noindex/robots pre-launch posture;
- branded failure paths;
- standalone production container candidate;
- Release Readiness workflow;
- broad regression/performance/a11y evidence;
- provider-neutral rollback rehearsal.

M07A does not deploy publicly.

## M07B boundary

Provider selection, production origin, DNS/domain/TLS/HSTS, sitemap/canonical launch metadata, actual deployment and post-deploy validation remain blocked for M07B.

## Architecture

Next.js App Router + strict TypeScript + CSS Modules/tokens. Home retains one isolated lazy Three/R3F client island. Development Docker remains separate from the M07A production candidate runtime.

## Permanent boundaries

- D-0008 fabricated-proof prohibition.
- Contact zero-collection unless separately governed.
- No analytics/CMS/CRM/auth/database.
- No invented provider/domain/origin/credential.
