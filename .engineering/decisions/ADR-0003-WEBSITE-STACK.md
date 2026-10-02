# ADR-0003 — Website V1 Frontend Stack

Status: ACCEPTED FOR V1 PLANNING

## Context

The site requires high-fidelity editorial UI, server-rendered content, selective rich interaction and a heavy but isolated 3D hero. The runtime must stay fast when 3D is unavailable.

## Decision

Use:
- Next.js App Router;
- strict TypeScript;
- React Server Components by default;
- CSS Modules plus project design tokens;
- client islands only for interaction/3D;
- no generic UI kit controlling the visual identity.

## Consequences

Benefits:
- strong content/SEO rendering;
- granular control over hydration;
- precise custom styling;
- clear separation between semantic content and rich 3D.

Costs:
- custom components require more implementation discipline;
- client/server boundaries must be audited carefully.

## Rejected for V1

- SPA-only architecture: unnecessary content/SEO/runtime cost.
- Full generic component theme: risks visual-template drift.
- Heavy animation framework on every component: violates performance/control goals.
