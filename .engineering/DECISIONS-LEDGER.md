# Decisions Ledger

| ID | Decision | Status | Source |
| --- | --- | --- | --- |
| D-0001 | Bootstrap this repository as GREENFIELD using GEF Bootstrap 1.1.2. | ACCEPTED / MERGED | NEXLABS-WO-001 |
| D-0002 | Keep product implementation and product-stack selection out of the bootstrap increment. | SATISFIED | NEXLABS-WO-001 |
| D-0003 | The early chrome-humanoid homepage concept was the initial Home direction; the cube concept was reserved for infrastructure/technology storytelling. | SUPERSEDED by D-0014 | Owner direction, 2026-10-02 |
| D-0004 | Brand uses a new proprietary-looking N monogram, vector-first with restrained animated enhancement. | ACCEPTED | Owner direction, 2026-10-02 |
| D-0005 | Browser architecture uses Next.js App Router + strict TypeScript + CSS Modules/design tokens. | ACCEPTED for V1 | ADR-0003 |
| D-0006 | 3D uses Blender source assets, glTF/GLB delivery, React Three Fiber/Three.js and capability-aware FULL/BALANCED/STATIC tiers. | ACCEPTED for V1 | ADR-0004 |
| D-0007 | Heavy 3D must never block content; poster/fallback renders immediately and live 3D crossfades when ready. | ACCEPTED | ADR-0004 |
| D-0008 | No fabricated client logos, metrics, testimonials or partnerships are allowed in public UI. | ACCEPTED | Product requirements |
| D-0009 | M01 is planning-only; implementation begins only after M01 approval and merge. | SATISFIED | NEXLABS-WO-002 |
| D-0010 | Promote the bootstrap governance constitution into a product-development baseline while preserving evidence rules. | ACCEPTED | NEXLABS-WO-002 |
| D-0011 | M02 Runtime & Repository Foundation is accepted after exact-head review and merge; Docker continuity is a repository operating rule for runnable frontend increments. | ACCEPTED / MERGED | NEXLABS-WO-003 |
| D-0012 | M03 separates brand-system planning from final logo implementation so concept selection is explicit and auditable. | ACCEPTED | NEXLABS-WO-004 |
| D-0013 | Owner selected Finalist A / Precision Blades as the single production identity target, canonical ID `NEX-N-A-PRECISION-BLADES`. | ACCEPTED / MERGED | NEXLABS-WO-005 / owner selection |
| D-0014 | The final Home target is a cinematic living technology-lab world centered on the selected chrome N, with connected energy/light/network behavior across sections; it supersedes D-0003 as the composition master. | ACCEPTED | Owner direction, 2026-10-02; HOME-VISUAL-MASTER-SPEC.md |
| D-0015 | English is the default and canonical V1 website language; Portuguese and Spanish are planned localization targets for a future increment and are outside WO-008. | ACCEPTED | Owner direction; HOME-CONTENT-SPEC.md; BACKLOG.md |
| D-0016 | M05 Home Content Sections is accepted after independent exact-head audit and squash merge; M06 may enter planning only after checkpoint promotion, and M06 implementation requires a separately admitted Work Order and Context Lock. | ACCEPTED / MERGED | NEXLABS-WO-008 / PR #10 |
| D-0017 | M06 Secondary Pages is split into independently auditable increments: M06A Technology + Solutions, M06B Research + Company, and M06C Contact + final integration. M06A uses server-rendered semantic routes and CSS/SVG atmosphere without a second WebGL scene. | ACCEPTED | NEXLABS-WO-009 / M06 planning |
| D-0018 | M06A Technology + Solutions is accepted after independent exact-head audit and squash merge; M06B may enter planning only after checkpoint promotion and requires a separately admitted Work Order and Context Lock. | ACCEPTED / MERGED | NEXLABS-WO-009 / PR #12 |
| D-0019 | M06B Research + Company reuses the M06A secondary-page foundation, describes Research through method/evidence and Company through purpose/principles, upgrades Research/Company navigation only to real routes, corrects stale Home transition copy, and keeps Contact blocked for M06C. | ACCEPTED | NEXLABS-WO-010-M06B-RESEARCH-COMPANY / M06B planning |
| D-0020 | M06B Research + Company is accepted after independent exact-head audit and squash merge; M06C may enter planning only after checkpoint promotion and requires a separately admitted Work Order and Context Lock. | ACCEPTED / MERGED | NEXLABS-WO-010 / PR #14 |
| D-0021 | M06C Contact is admitted as a read-only zero-collection route because no verified public contact channel exists in the repository; the global action moves to /contact while Home #contact remains for legacy deep links. Any future contact channel/submission path requires separate privacy/security admission. | ACCEPTED | NEXLABS-WO-011-M06C-CONTACT-FINAL-INTEGRATION / M06C planning |
| D-0022 | M06C Contact + final integration is accepted after independent exact-head audit and squash merge; M06 Secondary Pages is complete. M07 must begin with release hardening before any separately admitted deployment/launch action. | ACCEPTED / MERGED | NEXLABS-WO-011 / PR #16 |
| D-0023 | M07 is split into M07A Release Hardening & Production Readiness and M07B Deployment Admission + Launch Validation. M07A is ELEVATED, must not deploy publicly, keeps pre-launch noindex, establishes production headers/container/readiness CI and requires a container-level rollback rehearsal before M07B can be admitted. | ACCEPTED | NEXLABS-WO-012-M07A-RELEASE-HARDENING-READINESS / M07 planning |
| D-0024 | M07A Release Hardening & Production Readiness is accepted after independent exact-head audit and squash merge; PERFORMANCE-001 is closed by three consecutive 26/26 candidate suites with Home mobile LCP <= 2500 ms. Public deployment remains blocked. | ACCEPTED / MERGED | NEXLABS-WO-012 / PR #18 |
| D-0025 | Final visual acceptance is not granted to the current implementation. Before M07B launch work, WO-013 must materially restore fidelity to the approved Home Visual Master, including stronger 3D depth, motion, navigation and proprietary iconography, while preserving factual copy, one-Home-WebGL architecture, M07A security/runtime behavior, accessibility and performance budgets. | ACCEPTED | Owner direction, 2026-10-04 |

Source Pack index remains human-curated until an engine-supported conformance mechanism exists.
