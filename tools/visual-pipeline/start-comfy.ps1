param(
  [switch]$LowVram,
  [double]$ReserveVramGb = 1.0,
  [int]$StartupTimeoutSeconds = 120
)

$ErrorActionPreference = "Stop"

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) {
  $env:NEXLABS_VISUAL_LOCAL
} else {
  Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline"
}
$requestedHome = if ($env:NEXLABS_COMFY_HOME) {
  $env:NEXLABS_COMFY_HOME
} else {
  Join-Path $visualRoot "ComfyUI"
}
$comfyHome = [IO.Path]::GetFullPath($requestedHome)
$portableRoot = @($comfyHome, (Join-Path $comfyHome "ComfyUI_windows_portable")) |
  Where-Object {
    (Test-Path -LiteralPath (Join-Path $_ "python_embeded\python.exe") -PathType Leaf) -and
    (Test-Path -LiteralPath (Join-Path $_ "ComfyUI\main.py") -PathType Leaf)
  } | Select-Object -First 1

if ($portableRoot) {
  $python = Join-Path $portableRoot "python_embeded\python.exe"
  $mainArgument = "ComfyUI\main.py"
  $workingDirectory = $portableRoot
  $arguments = @("-s", $mainArgument, "--windows-standalone-build")
} elseif (
  (Test-Path -LiteralPath (Join-Path $comfyHome ".venv\Scripts\python.exe") -PathType Leaf) -and
  (Test-Path -LiteralPath (Join-Path $comfyHome "main.py") -PathType Leaf)
) {
  $python = Join-Path $comfyHome ".venv\Scripts\python.exe"
  $mainArgument = Join-Path $comfyHome "main.py"
  $workingDirectory = $comfyHome
  $arguments = @($mainArgument)
} else {
  throw "ComfyUI v0.36.0+ portable/manual runtime not found under the configured local root."
}

$runDir = Join-Path $visualRoot "run"
$logDir = Join-Path $visualRoot "logs"
$recordFile = Join-Path $runDir "comfyui-process.json"
$legacyPidFile = Join-Path $runDir "comfyui.pid"
$stdout = Join-Path $logDir "comfyui.stdout.log"
$stderr = Join-Path $logDir "comfyui.stderr.log"
$baseUri = [Uri]"http://127.0.0.1:8188"
$null = New-Item -ItemType Directory -Force -Path $runDir,$logDir

function Get-ComfyProcess([int]$ProcessId) {
  Get-CimInstance Win32_Process -Filter "ProcessId = $ProcessId" -ErrorAction SilentlyContinue
}

function Test-ComfyIdentity($ProcessRecord, [string]$ExpectedExecutable) {
  if (-not $ProcessRecord) { return $false }
  $sameExecutable = $ProcessRecord.ExecutablePath -and
    ([IO.Path]::GetFullPath($ProcessRecord.ExecutablePath) -ieq [IO.Path]::GetFullPath($ExpectedExecutable))
  $line = [string]$ProcessRecord.CommandLine
  return ($sameExecutable -and $line.Contains("127.0.0.1") -and $line.Contains("8188") -and $line.Contains("main.py"))
}

function Test-ComfyHealth {
  try {
    $response = Invoke-WebRequest -Method Get -Uri ([Uri]::new($baseUri, "/system_stats")) -TimeoutSec 5 -UseBasicParsing
    return ($response.StatusCode -eq 200)
  } catch { return $false }
}

if (Test-Path -LiteralPath $recordFile) {
  $record = Get-Content -LiteralPath $recordFile -Raw | ConvertFrom-Json
  $existing = Get-ComfyProcess ([int]$record.pid)
  if ($existing) {
    if (-not (Test-ComfyIdentity $existing $python)) {
      throw "Recorded PID $($record.pid) no longer identifies the expected ComfyUI runtime; refusing to attach or stop it."
    }
    if (Test-ComfyHealth) {
      Write-Host "ComfyUI v0.36.0+ is already healthy at http://127.0.0.1:8188 (PID $($record.pid))."
      return
    }
    Write-Host "ComfyUI PID $($record.pid) is starting; waiting for its local API."
    $existingDeadline = [DateTime]::UtcNow.AddSeconds($StartupTimeoutSeconds)
    while ([DateTime]::UtcNow -lt $existingDeadline) {
      if (Test-ComfyHealth) {
        Write-Host "ComfyUI v0.36.0+ is healthy at http://127.0.0.1:8188 (PID $($record.pid))."
        return
      }
      if (-not (Get-ComfyProcess ([int]$record.pid))) { break }
      Start-Sleep -Seconds 2
    }
    if (Get-ComfyProcess ([int]$record.pid)) {
      throw "Recorded ComfyUI PID $($record.pid) remained live without a healthy API; inspect the local logs before retrying."
    }
    Remove-Item -LiteralPath $recordFile -Force
  } else {
    Remove-Item -LiteralPath $recordFile -Force
  }
}

if (-not (Test-Path -LiteralPath $recordFile) -and (Test-Path -LiteralPath $legacyPidFile)) {
  $legacyText = (Get-Content -LiteralPath $legacyPidFile -Raw).Trim()
  $legacyPid = 0
  if (-not [int]::TryParse($legacyText, [ref]$legacyPid)) {
    throw "Legacy ComfyUI PID record is not a plain integer; refusing to act on it."
  }
  $legacyProcess = Get-ComfyProcess $legacyPid
  if ($legacyProcess) {
    if (-not (Test-ComfyIdentity $legacyProcess $python)) {
      throw "Legacy PID $legacyPid does not match the expected ComfyUI runtime; refusing to act on it."
    }
    if (Test-ComfyHealth) {
      @{ pid=$legacyPid; executable=$python; workingDirectory=$workingDirectory; startedAtUtc=$null; port=8188; bind="127.0.0.1" } |
        ConvertTo-Json | Set-Content -LiteralPath $recordFile -Encoding UTF8
      Write-Host "ComfyUI is already healthy at http://127.0.0.1:8188 (PID $legacyPid)."
      return
    }
    throw "Legacy ComfyUI PID $legacyPid is live but its local API is not healthy; inspect the local logs before starting another instance."
  }
  Remove-Item -LiteralPath $legacyPidFile -Force
}

$portProbe = [Net.Sockets.TcpClient]::new()
try {
  $portProbe.Connect("127.0.0.1", 8188)
  throw "Port 8188 is already occupied by an unrecorded process; refusing to start ComfyUI."
} catch [System.Net.Sockets.SocketException] {
  # A refused connection confirms that the loopback port is free.
} finally {
  $portProbe.Dispose()
}

$arguments += @("--listen", "127.0.0.1", "--port", "8188", "--preview-method", "none", "--reserve-vram", $ReserveVramGb.ToString([Globalization.CultureInfo]::InvariantCulture), "--disable-all-custom-nodes")
if ($LowVram) { $arguments += "--lowvram" }
$quotedArguments = $arguments | ForEach-Object {
  if ([string]$_ -match '[\s"]') { '"' + ([string]$_).Replace('"','\"') + '"' } else { [string]$_ }
}

$process = Start-Process -FilePath $python -ArgumentList ($quotedArguments -join " ") `
  -WorkingDirectory $workingDirectory -WindowStyle Hidden `
  -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru
$record = [ordered]@{
  pid = $process.Id
  executable = $python
  workingDirectory = $workingDirectory
  startedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
  version = "v0.36.0"
  bind = "127.0.0.1"
  port = 8188
  lowVram = [bool]$LowVram
}
$record | ConvertTo-Json | Set-Content -LiteralPath $recordFile -Encoding UTF8
if (Test-Path -LiteralPath $legacyPidFile) { Remove-Item -LiteralPath $legacyPidFile -Force }
$env:NEXLABS_COMFY_URL = "http://127.0.0.1:8188"

$deadline = [DateTime]::UtcNow.AddSeconds($StartupTimeoutSeconds)
while ([DateTime]::UtcNow -lt $deadline) {
  if (Test-ComfyHealth) {
    Write-Host "Started ComfyUI v0.36.0 at http://127.0.0.1:8188 (PID $($process.Id))."
    Write-Host "stdout: $stdout"
    Write-Host "stderr: $stderr"
    return
  }
  $live = Get-ComfyProcess $process.Id
  if (-not $live) { throw "ComfyUI exited before its local API became healthy; inspect $stderr and $stdout." }
  Start-Sleep -Seconds 2
}

throw "ComfyUI did not become healthy within $StartupTimeoutSeconds seconds; inspect local logs at $logDir."
