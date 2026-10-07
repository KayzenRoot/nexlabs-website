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

## Model manifest

Copy `model-manifest.example.json` to the local evidence area, resolve exact revisions/files/checksums/licenses, and commit only a sanitized evidence manifest without tokens or private local paths.
