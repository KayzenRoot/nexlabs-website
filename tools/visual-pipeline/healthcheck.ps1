$ErrorActionPreference = "Stop"

$probe = Join-Path $PSScriptRoot "hardware-probe.ps1"
$client = Join-Path $PSScriptRoot "comfy_client.py"
$blenderSmoke = Join-Path $PSScriptRoot "blender\smoke.py"

Write-Host "== Nex Labs Visual Pipeline Health =="

& $probe | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Hardware probe failed" }

$comfyUrl = if ($env:NEXLABS_COMFY_URL) { $env:NEXLABS_COMFY_URL } else { "http://127.0.0.1:8188" }
if ($comfyUrl -notmatch '^http://(127\.0\.0\.1|localhost)(:\d+)?$') {
  throw "ComfyUI must be localhost-only. Current: $comfyUrl"
}

python $client health
if ($LASTEXITCODE -ne 0) { throw "ComfyUI health failed" }

if (-not $env:NEXLABS_BLENDER_EXE) { throw "NEXLABS_BLENDER_EXE is not set" }
if (-not (Test-Path $env:NEXLABS_BLENDER_EXE)) { throw "Blender executable not found: $env:NEXLABS_BLENDER_EXE" }

& $env:NEXLABS_BLENDER_EXE --background --factory-startup --python $blenderSmoke --python-exit-code 11
if ($LASTEXITCODE -ne 0) { throw "Blender background smoke failed" }

Write-Host "PASS: local visual pipeline core health"
