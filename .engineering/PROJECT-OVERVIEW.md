# Nex Labs Technology Website — Project Overview

## Identity

- Project: Nex Labs Technology official website
- Repository: KayzenRoot/nexlabs-website
- Default branch: `main`
- Lifecycle: GREENFIELD PRODUCT DEVELOPMENT

## Approved foundation

GEF Bootstrap v1.1.2, M01, M02, M03 and M04 are approved and merged.

- Production identity: `NEX-N-A-PRECISION-BLADES`.
- M04 Home Hero 3D / Living Organism was approved at exact review head `4898c778d5003e8b780031abbf4d3f34e1633e8e` and squash-merged by PR #9.
- Current main SHA for the M05 admission: `6b0f3fa29f00796a85dbd44ac21010f3337cf5c5`.
- The approved Home Visual Master remains the primary composition reference.

## Current increment

M05 Home Content Sections is admitted under `NEXLABS-WO-008-HOME-CONTENT-SECTIONS` and its exact Context Lock. The Work Order and `.engineering/HOME-CONTENT-SPEC.md` govern the section order, approved English copy, visuals, navigation, accessibility, performance and evidence.

The M05 admission package is on `work/nexlabs-wo-008-home-content-sections`. This admission diff finalizes the governing sources; product implementation remains bounded by WO-008 and its acceptance criteria. M06 secondary-page work remains blocked until M05 is independently approved and merged.

## Website languages

- English is the default and canonical language for V1 website copy.
- Portuguese and Spanish are intended localization targets for a future, separately scoped localization increment.
- WO-008 ships the canonical English copy only; translated pages or language switching are outside its scope.

## Product architecture

The runtime is Next.js App Router with strict TypeScript, CSS Modules and design tokens. M04 provides the poster-first Home hero, isolated lazy Three.js / React Three Fiber scene, FULL / BALANCED / STATIC quality tiers, WebGL and reduced-motion fallbacks, and the reusable living-organism motion foundation. M05 extends the Home below the hero using semantic content and lightweight CSS/SVG/HTML; it does not add another 3D runtime.

## Operating boundaries

- No fabricated customers, partners, metrics, awards, testimonials or outcomes.
- No secondary public routes, contact backend, CMS/CRM, authentication, database, analytics or public deployment without a separate admitted Work Order.
- Development Docker remains running and healthy for runnable frontend work unless the owner instructs otherwise; normal completion does not run `docker compose down`.
