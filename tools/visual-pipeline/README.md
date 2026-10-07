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

- `NEXLABS_COMFY_URL` default: `http://127.0.0.1:8188`
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

python tools/visual-pipeline/comfy_client.py health

pwsh -NoProfile -File tools/visual-pipeline/stop-comfy.ps1
```

The start script always binds `127.0.0.1:8188`; it does not expose ComfyUI to the LAN.

## Blender background smoke

```powershell
$env:NEXLABS_BLENDER_EXE = "C:\Path\To\blender.exe"
pwsh -NoProfile -File tools/visual-pipeline/run-blender-smoke.ps1
```

## Full core health

With ComfyUI running and Blender configured:

```powershell
pwsh -NoProfile -File tools/visual-pipeline/healthcheck.ps1
```

## API execution

```powershell
python tools/visual-pipeline/comfy_client.py queue path\to\workflow-api.json --timeout 900
```

## Model manifest

Copy `model-manifest.example.json` to the local pipeline evidence area, resolve exact revisions/files/checksums/licenses, and commit only a sanitized evidence manifest without tokens or private local paths.

The Codex bootstrap prompt should install the local toolchain, validate these scripts, and prove pipeline readiness before continuing the WO-013 visual correction.
