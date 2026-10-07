$ErrorActionPreference = "Stop"

$probe = Join-Path $PSScriptRoot "hardware-probe.ps1"
$client = Join-Path $PSScriptRoot "comfy-client.ps1"
$blender = Join-Path $PSScriptRoot "run-blender-smoke.ps1"

Write-Host "== Nex Labs Visual Pipeline Health =="

& $probe | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Hardware probe failed" }

& $client health
if ($LASTEXITCODE -ne 0) { throw "ComfyUI health failed" }

& $blender
if ($LASTEXITCODE -ne 0) { throw "Blender background smoke failed" }

Write-Host "PASS: local visual pipeline core health"
