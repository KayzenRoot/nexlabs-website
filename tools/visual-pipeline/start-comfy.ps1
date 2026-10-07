param(
  [switch]$LowVram,
  [double]$ReserveVramGb = 1.0
)

$ErrorActionPreference = "Stop"

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) { $env:NEXLABS_VISUAL_LOCAL } else { Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline" }
$comfyHome = if ($env:NEXLABS_COMFY_HOME) { $env:NEXLABS_COMFY_HOME } else { Join-Path $visualRoot "ComfyUI" }

$python = Join-Path $comfyHome ".venv\Scripts\python.exe"
$main = Join-Path $comfyHome "main.py"
$runDir = Join-Path $visualRoot "run"
$logDir = Join-Path $visualRoot "logs"
$pidFile = Join-Path $runDir "comfyui.pid"
$stdout = Join-Path $logDir "comfyui.stdout.log"
$stderr = Join-Path $logDir "comfyui.stderr.log"

if (-not (Test-Path $python)) { throw "ComfyUI venv Python not found: $python" }
if (-not (Test-Path $main)) { throw "ComfyUI main.py not found: $main" }

New-Item -ItemType Directory -Force -Path $runDir,$logDir | Out-Null

if (Test-Path $pidFile) {
  $existing = (Get-Content $pidFile -ErrorAction SilentlyContinue | Select-Object -First 1)
  if ($existing -and (Get-Process -Id $existing -ErrorAction SilentlyContinue)) {
    Write-Host "ComfyUI already running with PID $existing"
    exit 0
  }
  Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
}

$args = @($main, "--listen", "127.0.0.1", "--port", "8188", "--preview-method", "none", "--reserve-vram", ([string]$ReserveVramGb))
if ($LowVram) { $args += "--lowvram" }

$proc = Start-Process -FilePath $python -ArgumentList $args -WorkingDirectory $comfyHome -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru
$proc.Id | Set-Content -Encoding ASCII $pidFile
$env:NEXLABS_COMFY_URL = "http://127.0.0.1:8188"

Write-Host "Started ComfyUI PID $($proc.Id) on http://127.0.0.1:8188"
Write-Host "stdout: $stdout"
Write-Host "stderr: $stderr"
