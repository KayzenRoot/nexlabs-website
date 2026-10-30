# Master Asset Manifest — WO-013

Status: DELTA RECONCILIATION — ONE OPTIMIZED BLENDER STRUCTURE ASSET ADOPTED

## Authority and use

| Asset | Role | Fingerprint / size | Runtime permission |
| --- | --- | --- | --- |
| `.engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg` | Owner-approved visual reference, 1600×900 | Git blob `52932511adfeb8d372717185fe9a18907625cc0c`; SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`; 388,766 bytes | **Reference-only.** Never copy, crop, embed, trace pixels from, or ship as runtime art/texture/environment/background. |
| `src/brand/precision-blades.ts` | Canonical N geometry source | SHA-256 `26ce894ec6da0e58c0401b45d3888daabe3d53d38d0744e8a72ada9176384a5b`; 999 bytes | Canonical silhouette is immutable; depth/material may be layered without path alteration. |
| `public/generated/home/blender/hero-lab-structure-r17.glb` | Blender-authored FULL-tier laboratory shell, ribs, side bays and structural floor, reviewed after deterministic triangle reduction | SHA-256 `1864f255c2b0fdc254bb12fdf2e805a288f10439e344e544a92cb49f862bce9e`; 2,373,500 bytes; 9 material primitives; 59,352 triangles; no animations | **Runtime allowed only in the existing Home R3F Canvas at FULL tier.** Derived from the 107,914-triangle R16 source by the pinned Blender 5.2.2 `optimize-runtime-glb.py` at ratio 0.55. Excludes the canonical N, Earth/network, human cue and moving filaments. No master texture/pixels. Uncompressed GLB is used because Draco's blob-backed decoder worker conflicts with the admitted production `worker-src 'self'` CSP; CSP is unchanged. |

## Existing production-candidate art at Phase A

These tracked assets were present before this Correction Delta. Their use is subject to the existing WO-013 performance, fallback and security contracts; the SHA-256 values below establish the baseline to compare against final changes.

| Asset | SHA-256 | Bytes | Baseline role |
| --- | --- | ---: | --- |
| `public/hero/home-hero-poster.jpg` | `0265d1dd4a5bae588594ff6008ba261aae50ba4183928f0ae4106b6c36a36295` | 124,181 | Desktop STATIC/poster-first image. |
| `public/hero/home-hero-poster-mobile.jpg` | `c83258a4a697e0538156bc6a6ddf799a540c3a229e6fc2ae39d61746bcd05474` | 39,888 | Mobile STATIC/poster-first image. |
| `public/generated/home/hero-lab-backdrop.webp` | `3c7ea636f95ad517a0b2a08e3176ebd45aa35990613698bb6a8fd1912a577266` | 18,854 | Existing authored/generative backdrop. |
| `public/generated/home/hero-lab-environment-360.webp` | `be2492c08a09297a824c49c8ff382a2b1147a329cc326976441bc5c4a0cee373` | 75,948 | Existing environment image; inspect before use in new lighting study. |
| `public/generated/home/research-earth.webp` | `fb080c97cbcc4ed88343cc68da4cb543142350b8a359f1645f0e198a2f780fb1` | 12,914 | Existing Research Earth artwork. |
| `public/generated/home/technology-stack.webp` | `020dde3118973bcbeca5e9dddb340912e1a829bff8c26d9c49b5d016fe20b4d7` | 25,546 | Existing Technology stack artwork. |
| `public/generated/capabilities/ai-neural-lattice.webp` | `481ce21ca75647a0df8e11ef9f1047230f7eff075652891304833023a0ead929` | 36,412 | Existing capability object study. |
| `public/generated/capabilities/infrastructure-stack.webp` | `67e096a95bb6985e84bce975e6169bfe80b62f259aab417ba80547823598fc3b` | 11,512 | Existing capability object study. |
| `public/generated/capabilities/interfaces-network-core.webp` | `facb141dd2a19af9f7dcec212291a57a8adc810ed4798f6a2546f9d664ab2506` | 17,460 | Existing capability object study. |
| `public/generated/capabilities/sustainable-energy-torus.webp` | `498a6b9592d47dc417687f4ead221f9aea87704cae9ef7b66c3a0fa100e7ddde` | 26,384 | Existing capability object study. |
| `public/generated/capabilities/research-faceted-crystal.webp` | `80f1f8ebba6eb4167ee54ddf8a96bd7671cfd8b91b3d126f5fb4f43d7c6fc51d` | 10,786 | Existing capability object study. |

## New local authoring outputs

- ComfyUI reference studies, workflow outputs, source project, Blender `.blend`, EXR and unselected candidates stay under `%LOCALAPPDATA%\NexLabs\VisualPipeline` and are not committed.
- Only selected, independently reviewed and optimized original assets may be copied into `public/generated/**` or `public/hero/**`. Preserve source prompts, fixed seeds, model revision/license, SHA-256 and optimization report in sanitized evidence.
- The five required critique contact sheets and review reports are evidence outputs, not runtime assets.
- Production contains no master pixels, crops, screenshots, hidden image data, generated text, invented dashboard details, logos or unsupported claims.

## End-of-delta reconciliation

| Delta asset | Source / fingerprint | Runtime decision |
| --- | --- | --- |
| `public/generated/home/blender/hero-lab-structure-r17.glb` | Authored geometry from R16, deterministically reduced with the pinned Blender optimizer; SHA-256 `1864f255c2b0fdc254bb12fdf2e805a288f10439e344e544a92cb49f862bce9e`; 2,373,500 bytes; 59,352 triangles. | Selected structural shell/floor only; loaded in the existing FULL Home Canvas. No master texture, duplicate N, Earth or human model. BALANCED remains procedural; STATIC/fallback remains poster-first. |
| Blender blockout/reference trace study | External `blender-reference-candidate.glb`; SHA-256 `e2b62afed0f87ab491261d0e3b2da3300a83c8e3ae6b17a425b02881700a7ca6`; 505,464 bytes; 155 source meshes / 172 readback meshes. | External authoring study; not shipped. A separate optimized, material-batched derivative is the runtime asset listed above. |
| ComfyUI authoring studies | External local VisualPipeline root; exact seed/hash/size recorded in `visual-pipeline-manifest.json`. | Reference-only; selected geometry/material decisions are translated into existing scene primitives. |
| Owner-supplied Qwen3-4B and Z-Image-Turbo weights | Outside the repository in ComfyUI `text_encoders` and `diffusion_models`; sizes, hashes, exact installed paths and latest resource snapshot are in `comfyui-user-models.json`. | Discoverable by ComfyUI but not loaded for inference: each exceeds the observed 2.13 GB free VRAM, and Z-Image's 12.31 GB weights exceed the host's 2.48 GB free RAM. No unsafe load was attempted. |

The locked master row and canonical N geometry fingerprint remain immutable. Final style-guide and scene-graph hashes are recorded in `final-state-manifest.json` after documentary review is complete.
