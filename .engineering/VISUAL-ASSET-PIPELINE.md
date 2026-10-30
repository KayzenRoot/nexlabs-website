# Local Visual Asset Pipeline — Codex Image Masters + Blender MCP (ComfyUI historical)

Status: CANONICAL WO-013 CORRECTION ENABLER

## CD-05 binding override: Codex image master -> secured Blender Lab MCP
D-0031 is the newer accepted owner instruction for newly generated WO-013 images, superseding only the ComfyUI-first and Blender CLI-first defaults below. Confirm a real image-generation capability in the active Codex session before any prompt/model invocation, record tool/model if exposed, dimensions, prompt, reference, seed if available, content hash, rights and selection. Each selected static **component master** becomes the immutable reference for its Blender motion/frames/GLB/raster derivatives. Never ship/crop the original approved Home visual master as a website asset.

Official Blender Lab MCP: https://www.blender.org/lab/mcp-server/. Its server executes LLM-generated Blender code with no built-in safety guards. Owner authorizes MCP **only when** its exact add-on/server origin is vetted, running in a disposable/restricted local profile or VM with sanitized working assets, localhost-only and no credentials/SSH keys/wallets/browser profiles/unrelated project data accessible. Do not expose port remotely, auto-install third-party scripts or use an unapproved paid API. If MCP is missing, STOP animation stage as BLOCKED; do not silently substitute Blender CLI. ComfyUI material below remains as historical documentation, not the CD-05 default.

Vercel push policy: Git PR commits can generate Preview deployments while leaving the last production deployment unchanged. Never promote Preview to production or overwrite the live portfolio, verification, SEO, contact and HIVE evidence from PRs #22–25.

## Purpose

This pipeline exists to close the remaining WO-013 visual fidelity gap against the approved Home Visual Master by producing controlled reference images, icon concepts, materials, textures, 3D scene assets, animation studies and web-ready exports locally on the owner workstation.

It is a **development/tooling pipeline**, not website runtime infrastructure.

Nothing in this document authorizes:
- public AI services;
- model-serving endpoints on the LAN or internet;
- a second WebGL runtime;
- unreviewed generated assets in production;
- changes to canonical public copy;
- deployment or M07B.

## Hardware target

Primary workstation target:
- Windows 11 x64;
- NVIDIA RTX 5050 with 8 GB VRAM;
- 24 GB system RAM;
- local SSD/NVMe preferred.

The installer MUST detect actual GPU, VRAM, RAM, free disk and NVIDIA driver before selecting runtime flags.

## Toolchain

### ComfyUI

Use ComfyUI as the local image-generation and image-editing engine.

Pinned baseline for this correction:
- ComfyUI stable release: `v0.36.0` or a newer stable release only if the installer records the exact tag/commit and validates the same API behavior.
- Bind: `127.0.0.1:8188` only.
- Remote/LAN listen is forbidden.
- API orchestration uses core HTTP/WebSocket server routes, especially `/prompt`, `/history`, `/view` and `/ws`.
- Dynamic VRAM/offload is preferred on NVIDIA.
- Default RTX 5050 8 GB profile: reserve VRAM headroom, disable unnecessary previews and allow CPU/RAM offload.
- If a model OOMs, fall back to the next lower-memory profile instead of changing Windows TDR or unsafe system settings.

Recommended startup profile:
`--listen 127.0.0.1 --port 8188 --preview-method none --reserve-vram 1.0`

If smoke testing shows OOM:
- retry with `--lowvram`;
- keep async/dynamic offload enabled;
- reduce generation resolution/batch size;
- do not use CPU-only except as diagnostic fallback.

### Blender

Use Blender 5.2.2 LTS or the latest 5.2 LTS patch release.

Primary automation path:
- Blender background/headless CLI;
- Blender embedded Python API (`bpy`);
- scripts launched with `blender --background --python <script>`.

This is the default because it is deterministic, auditable and does not expose a code-execution server.

### Blender MCP (D-0027 historical defaults, superseded for new CD-05 images)

Previously the official Blender Lab MCP server was OPTIONAL and DISABLED BY DEFAULT. D-0031 now authorizes it as a required *but isolation-gated* authoring method for newly animated WO-013 assets.

Reason:
- Blender's own MCP page warns that the server executes LLM-generated code without guards and recommends isolation from sensitive data.

D-0031 already authorizes Blender Lab MCP for new CD-05 assets, conditional on the security proof below:
- use only the official Blender Lab MCP implementation;
- run against a dedicated sanitized working directory or disposable VM/profile;
- deny access to secrets, browser profiles, SSH keys, wallets and unrelated repositories;
- never expose the MCP server publicly.

For new or reworked CD-05 motion/frame authoring, Blender Lab MCP is required after its isolation gate passes. If it is unavailable or unsafe, block that asset stage; Blender background Python does not silently substitute for it.

## Model policy for 8 GB VRAM

### Tier A — previous ComfyUI baseline (not CD-05 default)

**SDXL 1.0 family**

Purpose:
- concept frames;
- icon/material explorations;
- image-to-image master-style studies;
- transparent/isolated asset concepts;
- texture/reference generation.

Use FP16-compatible local weights and tiled/offloaded workflows where needed.

SDXL is the dependable baseline for 8 GB-class GPUs.

### Tier B — optional / adaptive

**FLUX.2 [klein] 4B FP8 / distilled**

Purpose:
- higher prompt adherence;
- multi-reference or image-editing studies;
- hero/lab composition iteration.

License requirement:
- only use the official Apache-2.0 4B release/quantization.

Hardware rule:
- this model is not guaranteed to fit fully in 8 GB VRAM.
- enable it only after an automated smoke test succeeds with ComfyUI dynamic/offload settings.
- if it spills excessively, becomes unstable or OOMs, mark `NOT_SELECTED_FOR_DEFAULT` and continue with SDXL.

### Tier C — optional commercial fallback

**FLUX.1 [schnell]**

- Apache 2.0;
- commercially usable;
- may be tested only if an approved low-memory workflow fits the workstation.
- it is not required for WO-013 completion.

### Excluded by default

- FLUX.1 [dev] because its open weights are under a non-commercial license;
- 9B+ image models that do not fit the 8 GB target efficiently;
- random community checkpoints/LoRAs without provenance/license review;
- pirated or unknown-source weights;
- models whose license conflicts with commercial website asset use.

## Model storage

Model files MUST remain outside Git.

Recommended root:
`%LOCALAPPDATA%\NexLabs\VisualPipeline\models`

ComfyUI model folders may point there through supported extra model paths/symlinks/junctions.

For every installed weight record:
- source repository;
- exact filename;
- revision/commit when available;
- file SHA-256;
- license;
- local path;
- selected role;
- smoke-test result.

Record this in a local machine manifest and a sanitized evidence manifest with no tokens.

## ComfyUI workflow set

The local pipeline must create/export API-format workflows for at least:

1. `master_style_img2img_sdxl.json`
   - approved master used as reference input;
   - low/medium denoise iterations;
   - target: composition/material/lighting studies.

2. `hero_lab_concept.json`
   - dark premium laboratory;
   - monumental chrome N chamber;
   - network Earth;
   - panels/floor/scale cues.

3. `capability_icon_concepts.json`
   - isolated transparent or flat-background concepts for the five capability objects.

4. `material_texture_concepts.json`
   - chrome/glass/cyan-energy material references.

5. Optional `flux2_klein_reference_edit.json` if the 8 GB smoke test passes.

All workflows must be reproducible by seed and exported in API format for local automation.

## Blender asset pipeline

Blender scripts in the repository may create:
- hero chamber blockout;
- floor/platform assemblies;
- panel/HUD geometry;
- Earth/network sphere;
- capability micro-sculptures;
- animation loops;
- material previews;
- WebGL export candidates.

Use:
- Eevee first for interactive iteration;
- Cycles only for offline beauty/reference renders when needed;
- NVIDIA GPU if Blender reports supported compute backend;
- deterministic camera/lights for master comparison.

Web export targets:
- `.glb` / glTF 2.0 where a real mesh asset is justified;
- compressed textures;
- WebP/AVIF/PNG posters or icon atlases when raster is preferable;
- no source `.blend` file is loaded by website runtime.

Target web constraints:
- hero GLB remains <= 3 MB compressed unless auditor approves evidence-backed exception;
- generated raster assets must be optimized before commit;
- raw renders, EXRs, source textures and model weights remain local/evidence-only.

## Orchestration

Repository tooling lives under:
`tools/visual-pipeline/`

Required local flow:

1. detect hardware;
2. validate ComfyUI health on localhost;
3. queue workflow through ComfyUI API;
4. collect result and metadata;
5. optionally run Blender background script against selected generated references;
6. export preview/render/GLB;
7. optimize/copy only approved web assets into repository paths;
8. run website tests/evidence;
9. retain source manifest, prompts, seeds, checksums and render settings.

The pipeline must never auto-publish generated assets without a selection/review step.

## Security boundary

- localhost-only services;
- no secrets committed;
- Hugging Face/API tokens stored only in user environment/credential store;
- no arbitrary third-party ComfyUI custom nodes by default;
- any custom node requires explicit provenance, commit pin, license and code review;
- ComfyUI Manager may be enabled for inspection but automatic third-party installs are not allowed without review;
- generated assets are untrusted input until sanitized/optimized;
- Blender autoexec remains disabled unless a reviewed local script explicitly requires controlled execution;
- official Blender MCP remains unavailable until the D-0031 isolation gate is proven; enable it only inside the sanitized, localhost-only workspace.

## Evidence obligations

Codex must retain sanitized evidence for:
- detected GPU/VRAM/RAM;
- NVIDIA driver and CUDA/PyTorch recognition;
- exact ComfyUI version/commit;
- ComfyUI localhost-only bind;
- API health;
- installed model manifest with checksums/licenses;
- SDXL smoke generation;
- optional FLUX.2 Klein result or explicit fallback reason;
- exact Blender version;
- Blender background Python smoke render;
- GPU device selection where supported;
- generated icon/reference sample;
- generated Blender chamber/reference sample;
- successful export/readback of one web asset;
- no public listening ports;
- no model weights committed;
- no credentials committed.

## Stop condition for pipeline bootstrap

The local visual pipeline is READY only when:
- ComfyUI API responds on localhost;
- at least one approved commercial-use image model generates successfully;
- Blender background API completes a scripted render/export;
- repository orchestration scripts pass smoke tests;
- a sanitized Evidence Bundle is committed to PR #20;
- raw local weights/renders/secrets remain outside Git.

Pipeline readiness does not itself approve WO-013 visual fidelity.
