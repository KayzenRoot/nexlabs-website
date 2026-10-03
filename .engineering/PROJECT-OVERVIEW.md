# Nex Labs Technology Website — Project Overview

## Identity

- Project: Nex Labs Technology official website
- Repository: KayzenRoot/nexlabs-website
- Default branch: `main`
- Lifecycle: GREENFIELD PRODUCT DEVELOPMENT

## Approved foundation

GEF Bootstrap v1.1.2 and product modules M01 through M05 are approved and merged.

- Production identity: `NEX-N-A-PRECISION-BLADES`.
- M04 Home Hero 3D / Living Organism was approved at exact review head `4898c778d5003e8b780031abbf4d3f34e1633e8e` and merged in PR #9.
- M05 Home Content Sections was independently approved at exact review head `22b3012551cce8f8a585605cf0f7a246ecd2a2a0` and squash-merged in PR #10 as product merge `9f6aab7004fe10ccd5120cefd666df2a1efe9060`.
- The approved Home Visual Master remains the primary composition reference.
- The Home experience is complete through M05.

## Current state

No product implementation Work Order is active after M05. M06 Secondary Pages is the next planning increment. Implementation of M06 must not begin until its Work Order and exact Context Lock are separately compiled and admitted against the current main state.

## Website languages

- English is the default and canonical language for V1 website copy.
- Portuguese and Spanish are intended localization targets for a future, separately scoped localization increment.
- Translated pages or language switching remain outside the current V1 module sequence unless explicitly admitted later.

## Product architecture

The runtime is Next.js App Router with strict TypeScript, CSS Modules and design tokens. M04 provides the poster-first Home hero, isolated lazy Three.js / React Three Fiber scene, FULL / BALANCED / STATIC quality tiers, WebGL and reduced-motion fallbacks, and the reusable living-organism motion foundation. M05 completes the Home below the hero using semantic server-rendered content and lightweight CSS/SVG/HTML without adding another 3D runtime.

## Operating boundaries

- No fabricated customers, partners, metrics, awards, testimonials or outcomes.
- No secondary public routes, contact backend, CMS/CRM, authentication, database, analytics or public deployment without a separate admitted Work Order.
- Development Docker remains running and healthy for runnable frontend work unless the owner instructs otherwise; normal completion does not run `docker compose down`.
