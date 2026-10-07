# Nex Labs Local Visual Pipeline

This directory contains **repository-safe orchestration code only**.

It does not contain:
- ComfyUI itself;
- Blender binaries;
- model weights;
- raw renders;
- credentials.

Canonical policy: `.engineering/VISUAL-ASSET-PIPELINE.md`.

## Environment variables

- `NEXLABS_COMFY_URL` default: `http://127.0.0.1:8188`
- `NEXLABS_COMFY_HOME` local ComfyUI install root
- `NEXLABS_BLENDER_EXE` absolute path to Blender executable
- `NEXLABS_VISUAL_LOCAL` local working root outside Git

## Smoke commands

PowerShell:

```powershell
pwsh tools/visual-pipeline/healthcheck.ps1
python tools/visual-pipeline/comfy_client.py health
pwsh tools/visual-pipeline/run-blender-smoke.ps1
```

The Codex bootstrap prompt generated for WO-013 should install the local toolchain, then use these scripts to prove readiness before continuing visual implementation.
