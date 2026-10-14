# WO-013 — Correction Delta 05: Master-First Image + Blender MCP

**Date:** 2026-10-13
**Status:** OWNER DIRECTION RECORDED — GOVERNANCE RE-ADMISSION REQUIRED BEFORE IMPLEMENTATION
**Risk:** ELEVATED
**Repository:** `KayzenRoot/nexlabs-website`
**PR:** #20
**Admission base main:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Observed PR head before this directive:** `6250413259c168210fca572480f6c62cd6dadb05`
**Locked visual master:** Git blob `52932511adfeb8d372717185fe9a18907625cc0c`; SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.

## Owner decision and precedence

The owner explicitly changes the *future image/animation authoring method* for WO-013:

1. Start each new/reworked illustrative website asset with a **static master image generated using the image-generation capability available in the Codex workflow**, using the owner-approved Home master as composition/style reference and the canonical Precision Blades N vector as identity constraint.
2. Preserve the accepted generated static image as an immutable per-component asset master. Version its image hash, generation method/model if identifiable, references, prompt, dimensions, selection/approval, crop-safe zones, and usage rights.
3. Create motion, layer separation, sprite/frame sequences, camera/parallax and 3D elaboration **from that chosen component master**, using the **Blender MCP** when safely available. Blender must *not* invent a new character/object design that drifts from the accepted static image.
4. Deliver optimized animation formats/assets for the existing Next.js site with an immediately available static fallback. Use Blender background Python tooling only for appropriate deterministic/safe helper work or if explicitly re-admitted; do not quietly switch image generation back to ComfyUI.
5. Original `approved-home-visual-master.jpg` stays evidence/reference only. NEVER ship/crop/use its original pixels as runtime artwork. New generated standalone artwork is permissible after provenance, commercial-use and visual review.
6. The existing `src/brand/precision-blades.ts` vector silhouette stays canonical and unchanged. Text, semantic UI and functional controls remain proper HTML/CSS/SVG rather than image-only widgets.
7. Existing ComfyUI outputs/code are not to be deleted in this increment. This new directive supersedes ComfyUI as the default *for newly authored/reworked artwork* only, subject to formal source-document updates.

**Important capability gate:** Do not assume a specific image model/API is available inside Codex. Inspect actual connected image generation. Record model/tool identifier and prove a smoke generation. If unavailable, mark image-generation step BLOCKED and report the missing capability. Do not claim an image was created. Do not perform unapproved paid API transactions or model downloads.

**Blender MCP security gate:** Owner authorizes using Blender MCP for this corrective workflow, *conditioned* on inspection and isolation. Before activation verify exact upstream implementation/version, sandboxed local workspace, localhost-only interface, trusted scripts, restricted filesystem access, and no access to credentials, wallets, SSH keys, unrelated repos or browser profiles. Never expose MCP over LAN/internet. If controls cannot be proven, BLOCK MCP motion generation; do not bypass security.

## Required governance first (no visual implementation until complete)

- Re-read `.engineering/SOURCE-HIERARCHY.md`, `CHECKPOINT.*`, `SCOPE.md`, `DEFINITION-OF-DONE.md`, `ARCHITECTURE.md`, `REQUIREMENTS.md`, `DECISIONS-LEDGER.md`, `HOME-VISUAL-MASTER-SPEC.md`, `BRAND-SYSTEM.md`, active WO and Context Lock, and `AGENTS.md`.
- Add an explicit, sequential **accepted owner-direction entry** to the Decisions Ledger; do not rewrite or erase D-0027/D-0029. Mark their conflicting authoring defaults as superseded *for this correction* while preserving their historical audit trail.
- Amend existing **WO-013** and `VISUAL-ASSET-PIPELINE.md`/`DESIGN-DIRECTOR-HARNESS.md`/Architecture/Scope/DoD only to reflect this authorized change. Resolve the older default ComfyUI + MCP-disabled conflict explicitly.
- The above critical-source edits **invalidate the current Context Lock**. Mark STALE, recapture Git base/head + exact critical blob fingerprints, recompute writeAllowed, and re-admit the same WO/PR. Do not silently continue under the old lock.
- Preserve all previously accepted decisions, copy, legal/marketing fact constraints, six routes, M07A security and site performance budgets.
- No M07B, global redesign outside WO-013, PR merge or production deployment.

## Asset work sequence after re-admission

1. **Inventory** the already-approved Home master, logo and existing posters/GLB/WebP/SVG/capability objects. Tag KEEP, REWORK, REGENERATE, REFERENCE-ONLY; do not delete by default.
2. **Prioritize** the remaining scored visual gaps: central N chamber; physical reflections/floor/instrumentation; Earth/network/panels; five capability icons; Research + Technology continuous world; mobile poster and navigation polish. Keep canonical N geometry and factual content.
3. **Generate per-component static studies** through an actually available Codex image-generation capability, with strict consistent composition, color/material, perspective and typography-free negative space. Choose a single approved/versioned component master before animation.
4. **Separate layers** as appropriate (foreground, N/chamber, floor, network Earth, HUDs, glow, atmosphere), keeping pixel/composition identity to that component master. Do not fabricate authenticity by cropping the original Home master.
5. **Use secured Blender MCP** to create meaningful subtle animations, sprite sheets/frame sequences, controlled 2.5D depth, optimized meshes where justified, deterministic animation loops and exports. Do not add a second WebGL scene; preserve the existing lazy single Home R3F scene.
6. **Integrate** optimized formats into `public/generated/**`/`public/hero/**` through existing Next.js/CSS/Three architecture. Always provide static-first, WebGL unavailable, reduced-motion, slow-device and image-loading-error fallback. Respect source image dimensions/aspect ratios and responsive art direction.
7. **Prove equivalence** between selected component master and animated frame at the same camera state, with side-by-side comparisons and explicit tolerances for identity, framing, material and lighting. Animation can move content, not redesign it.
8. **Run three critique rounds** and deterministic captures at desktop 1600×900/1440×900, tablet, 390×844/320px, FULL/BALANCED/STATIC, reduced motion, failure/context loss, and the five capability objects.

## Hard acceptance and evidence

- Re-lock source documents and WO before code/assets.
- Reference hash unchanged; logo vector hash unchanged.
- Each new asset has manifest entry: ID, source master SHA-256, model/tool, prompt/ref IDs, source dimensions, derived frames/GLB hashes, license/provenance, compression, fallback mapping.
- Static render resembles the selected per-component master; Blender animation preserves composition; no source master screenshot reused as runtime pixels.
- Independent **visual score >=85/100**, Hero Composition >=15/20, N/Chamber/Material >=15/20, no criterion regression; owner visual acceptance still required.
- Retain all prior FULL/BALANCED/STATIC, one Home WebGL island, semantic content, accessibility and reduced motion; Contact zero-collection and canonical copy unchanged.
- Preserve <=220 KiB gzip initial route JS, <=700 KiB lazy Home 3D, mobile LCP <=2500 ms, CLS <=0.10 and interaction proxy <=200 ms.
- Full local lint/typecheck/unit/build/E2E, `npm audit`, secret/security review, Blender MCP isolation proof, three consecutive production-candidate E2E suites with retries=0; exact-head CI/Browser/Release/Sonar/Socket/CodeRabbit gates.
- Evidence Bundle includes base/head SHA, diff/files, risk, tests and outputs, before/after comparison contact sheets, full provenance manifest, performance variance and **proposed** Checkpoint Delta.

## Production drift guard

PRs #22–25 are separate production-snapshot work with portfolio, founder verification, SEO/contact and HIVE evidence. The final WO-013/main release must not erase those live features. Reconciliation requires a separately admitted integration plan and fresh lock, not automatic merge into #20.

## Current verdict / STOP

**CORRECTION REQUIRED** for PR #20. The last executor-proposed score remains **77/100**, below 85; the score has *not* been independently reproduced from raw screenshots by this note. Published 2026-10-08 evidence says technical checks passed on then-current head; any new commit needs new exact-head checks. This document is an owner directive and scoped correction plan, **not a completed implementation, audit approval or checkpoint promotion**.

STOP at the first unproven image-generation/MCP capability, missing sandbox controls, stale context, unapproved scope expansion, HIGH/CRITICAL defect or failed visual/performance gate. Keep PR #20 open.
