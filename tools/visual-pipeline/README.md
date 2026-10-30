# Nex Labs Local Visual Pipeline

Repository-safe orchestration for the WO-013 local authoring pipeline.

Canonical policy: `.engineering/VISUAL-ASSET-PIPELINE.md`.

## What stays outside Git

- ComfyUI installation;
- Blender binaries;
- model weights/checkpoints/LoRAs;
- raw renders / EXR / working .blend files;
- credentials and Hugging Face tokens.

## Environment variables

- `NEXLABS_COMFY_URL` accepted aliases: `http://127.0.0.1:8188` or `http://localhost:8188`
- `NEXLABS_COMFY_HOME` local ComfyUI install root
- `NEXLABS_BLENDER_EXE` absolute path to `blender.exe`
- `NEXLABS_VISUAL_LOCAL` local working root outside Git

## Hardware probe

```powershell
pwsh -NoProfile -File tools/visual-pipeline/hardware-probe.ps1
```

## ComfyUI background lifecycle

```powershell
pwsh -NoProfile -File tools/visual-pipeline/start-comfy.ps1
# If the 8 GB GPU profile OOMs:
pwsh -NoProfile -File tools/visual-pipeline/start-comfy.ps1 -LowVram

pwsh -NoProfile -File tools/visual-pipeline/comfy-client.ps1 health

pwsh -NoProfile -File tools/visual-pipeline/stop-comfy.ps1
```

The start script always binds `127.0.0.1:8188`; the API client itself is pinned to the numeric loopback address.

## Blender background smoke

```powershell
$env:NEXLABS_BLENDER_EXE = "C:\Path\To\blender.exe"
pwsh -NoProfile -File tools/visual-pipeline/run-blender-smoke.ps1
```

The Blender smoke launcher creates its fixed Python script temporarily in the local pipeline run directory, executes it with Blender background mode, and removes the script afterwards. No generated Python execution server is exposed.

## Full core health

```powershell
pwsh -NoProfile -File tools/visual-pipeline/healthcheck.ps1
```

## API workflow execution

```powershell
pwsh -NoProfile -File tools/visual-pipeline/comfy-client.ps1 queue path\to\workflow-api.json -TimeoutSeconds 900
```

## Home environment map

Regenerate the deterministic text-to-image workflows, start the local ComfyUI
service, and queue `hero_lab_backdrop.json` for a 1024×512 (2:1) equirectangular
environment. Review the output before conversion to the compact WebP runtime
asset. This workflow is text-only and must not load the locked Home master.

```powershell
python tools/visual-pipeline/generate-workflows.py
pwsh -NoProfile -File tools/visual-pipeline/start-comfy.ps1
pwsh -NoProfile -File tools/visual-pipeline/comfy-client.ps1 queue tools/visual-pipeline/workflows/hero_lab_backdrop.json -TimeoutSeconds 1800
pwsh -NoProfile -File tools/visual-pipeline/stop-comfy.ps1
```

## Controlled master and geometry-guided studies

The workflow generator writes deterministic ComfyUI API-format definitions to
`tools/visual-pipeline/workflows/`. It can copy the locked master and a
Blender-generated depth proxy into ComfyUI's local input directory. Both inputs
remain local; the master is art direction only and is never a production asset.

```powershell
$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) { $env:NEXLABS_VISUAL_LOCAL } else { Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline" }
$candidate = Join-Path $visualRoot "generated\blender-candidate-wo013"

python tools/visual-pipeline/prepare-control-maps.py `
  --blender-depth (Join-Path $candidate "blender-candidate-depth-proxy.png")

python tools/visual-pipeline/generate-workflows.py `
  --copy-master `
  --copy-depth (Join-Path $candidate "blender-candidate-depth-proxy.png")

pwsh -NoProfile -File tools/visual-pipeline/comfy-client.ps1 health
pwsh -NoProfile -File tools/visual-pipeline/comfy-client.ps1 queue tools/visual-pipeline/workflows/hero_lab_concept.json -TimeoutSeconds 900
```

The generated depth map is an object-bound camera projection for composition
guidance, not a per-pixel Z render. Review all generated output before choosing
any derivative for a production runtime.

## Blender chamber candidate

The candidate script uses the official Blender 5.2.2 `bpy` runtime and validates
the exported GLB by importing it in a fresh background scene. Pass a generated
ComfyUI reference image; output remains outside Git.

```powershell
pwsh -NoProfile -File tools/visual-pipeline/run-blender-candidate.ps1 `
  -Reference (Join-Path $visualRoot "generated\<prompt-id>\<approved-reference>.png") `
  -OutputName blender-candidate-wo013
```

The runtime GLB optimizer does not accept an output path from command-line input.
It writes its fixed GLB and report beneath
`%LOCALAPPDATA%\NexLabs\VisualPipeline\optimized` (or
`$XDG_DATA_HOME/NexLabs/VisualPipeline/optimized` when `LOCALAPPDATA` is unset)
and rejects output paths that resolve inside the repository. Its `--source` must
resolve to a regular `.glb` beneath `VisualPipeline/generated/`; it rejects
traversal, symlinks that resolve outside that subtree, and generated roots inside
the Git repository. Set `NEXLABS_VISUAL_LOCAL` when the input VisualPipeline root
is outside the platform default; the fixed output still uses the platform user-data
directory described above. GLB and JSON are staged in the system temporary
directory so a changed output path cannot redirect Blender's long-running export.
The output hierarchy is checked component-by-component for links/junctions and
revalidated immediately before publication; `os.replace` publishes each file
atomically. Existing hard-linked destinations are rejected.

## Model manifest

Copy `model-manifest.example.json` to the local evidence area, resolve exact revisions/files/checksums/licenses, and commit only a sanitized evidence manifest without tokens or private local paths.
