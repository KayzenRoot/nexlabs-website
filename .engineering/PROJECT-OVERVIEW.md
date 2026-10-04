# Nex Labs Technology Website — Project Overview

## Identity

- Project: Nex Labs Technology official website
- Repository: KayzenRoot/nexlabs-website
- Default branch: `main`
- Lifecycle: GREENFIELD PRODUCT DEVELOPMENT

## Approved foundation

GEF Bootstrap v1.1.2, M01 through M05, M06A and M06B are approved and merged.

- Production identity: `NEX-N-A-PRECISION-BLADES`.
- Home is complete through M05.
- M06A Technology + Solutions is approved and merged.
- M06B Research + Company was independently approved at exact review head `ee160d50a4ca8c1edad25d06a295c505eace6993` and squash-merged in PR #14 as product merge `f53318d5b9f857d924d41245515206ce59af53e8`.
- Production public routes now include Home, Technology, Solutions, Research and Company.

## Current state

No product implementation Work Order is active after M06B. M06C Contact + final cross-route integration is the next planning increment. Implementation of M06C must not begin until its Work Order and exact Context Lock are separately compiled and admitted against the current main state.

## Website languages

- English is the canonical V1 website language.
- Portuguese and Spanish remain future localization targets.
- No language switcher or translated route is currently admitted.

## Product architecture

The runtime is Next.js App Router with strict TypeScript, CSS Modules and design tokens. Home keeps its isolated lazy Three/R3F scene. Technology, Solutions, Research and Company use semantic server-rendered routes plus lightweight CSS/SVG/HTML atmosphere, with no second 3D runtime.

## Operating boundaries

- No fabricated customers, partners, metrics, awards, testimonials, publications, patents, team/history/office claims or outcomes.
- Contact route/data-submission work requires a separately admitted Work Order.
- No CMS/CRM, authentication, database, analytics or public deployment without explicit admission.
- Docker remains running and healthy for runnable frontend work unless the owner instructs otherwise.
