$ErrorActionPreference = "Stop"

Write-Host "== Nex Labs Visual Pipeline Health =="

python tools/visual-pipeline/hardware-probe.ps1 2>$null | Out-Null

$comfyUrl = if ($env:NEXLABS_COMFY_URL) { $env:NEXLABS_COMFY_URL } else { "http://127.0.0.1:8188" }
if ($comfyUrl -notmatch '^http://(127\.0\.0\.1|localhost)(:\d+)?$') {
  throw "ComfyUI must be localhost-only. Current: $comfyUrl"
}

python tools/visual-pipeline/comfy_client.py health
if ($LASTEXITCODE -ne 0) { throw "ComfyUI health failed" }

if (-not $env:NEXLABS_BLENDER_EXE) {
  throw "NEXLABS_BLENDER_EXE is not set"
}

& $env:NEXLABS_BLENDER_EXE --background --factory-startup --python tools/visual-pipeline/blender/smoke.py --python-exit-code 11
if ($LASTEXITCODE -ne 0) { throw "Blender background smoke failed" }

Write-Host "PASS: local visual pipeline core health"
