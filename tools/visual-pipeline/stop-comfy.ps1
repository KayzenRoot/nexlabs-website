$ErrorActionPreference = "Stop"

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) {
  $env:NEXLABS_VISUAL_LOCAL
} else {
  Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline"
}
$runDir = Join-Path $visualRoot "run"
$recordFile = Join-Path $runDir "comfyui-process.json"
$legacyPidFile = Join-Path $runDir "comfyui.pid"

if (-not (Test-Path -LiteralPath $recordFile)) {
  if (Test-Path -LiteralPath $legacyPidFile) {
    throw "A legacy PID file exists without an executable identity record. Inspect it manually; no process was stopped."
  }
  Write-Host "No ComfyUI process record found."
  return
}

$record = Get-Content -LiteralPath $recordFile -Raw | ConvertFrom-Json
$processId = [int]$record.pid
$process = Get-CimInstance Win32_Process -Filter "ProcessId = $processId" -ErrorAction SilentlyContinue
if (-not $process) {
  Remove-Item -LiteralPath $recordFile -Force
  Write-Host "Recorded ComfyUI PID $processId is no longer running; removed its stale process record."
  return
}

$sameExecutable = $process.ExecutablePath -and
  ([IO.Path]::GetFullPath($process.ExecutablePath) -ieq [IO.Path]::GetFullPath([string]$record.executable))
$commandLine = [string]$process.CommandLine
$expectedCommand = $commandLine.Contains("127.0.0.1") -and
  $commandLine.Contains("8188") -and $commandLine.Contains("main.py")
if (-not ($sameExecutable -and $expectedCommand)) {
  throw "PID $processId no longer matches the recorded ComfyUI executable/loopback command; refusing to stop it."
}

Stop-Process -Id $processId
$deadline = [DateTime]::UtcNow.AddSeconds(20)
do {
  Start-Sleep -Milliseconds 250
  $remaining = Get-Process -Id $processId -ErrorAction SilentlyContinue
} while ($remaining -and [DateTime]::UtcNow -lt $deadline)

if ($remaining) {
  throw "ComfyUI PID $processId did not exit after the stop request; process record retained for inspection."
}

Remove-Item -LiteralPath $recordFile -Force
Write-Host "Stopped recorded ComfyUI PID $processId on 127.0.0.1:8188."
