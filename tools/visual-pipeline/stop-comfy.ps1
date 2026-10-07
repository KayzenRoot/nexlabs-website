$ErrorActionPreference = "Stop"

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) { $env:NEXLABS_VISUAL_LOCAL } else { Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline" }
$pidFile = Join-Path $visualRoot "run\comfyui.pid"

if (-not (Test-Path $pidFile)) { Write-Host "No ComfyUI PID file found."; exit 0 }
$pidValue = (Get-Content $pidFile | Select-Object -First 1)
if (-not $pidValue) { Remove-Item $pidFile -Force; exit 0 }

$proc = Get-Process -Id $pidValue -ErrorAction SilentlyContinue
if ($proc) {
  Stop-Process -Id $pidValue -Force
  Write-Host "Stopped ComfyUI PID $pidValue"
} else {
  Write-Host "ComfyUI PID $pidValue was not running."
}

Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
