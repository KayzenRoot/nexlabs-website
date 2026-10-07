param(
  [string]$OutFile = ""
)

$ErrorActionPreference = "Stop"

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) {
  $env:NEXLABS_VISUAL_LOCAL
} else {
  Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline"
}

$gpu = Get-CimInstance Win32_VideoController |
  Where-Object { $_.Name -match "NVIDIA" } |
  Select-Object -First 1
$system = Get-CimInstance Win32_ComputerSystem
$os = Get-CimInstance Win32_OperatingSystem
$driveName = (Split-Path -Path $visualRoot -Qualifier).TrimEnd(":")
$drive = Get-PSDrive -Name $driveName -ErrorAction Stop

$nvidiaSmi = $null
try {
  $nvidiaSmi = (& nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader,nounits 2>$null | Out-String).Trim()
  if ($LASTEXITCODE -ne 0) { $nvidiaSmi = $null }
} catch {}

$comfyRoots = @()
if ($env:NEXLABS_COMFY_HOME) { $comfyRoots += $env:NEXLABS_COMFY_HOME }
$comfyRoots += (Join-Path $visualRoot "ComfyUI")
$pythonCandidates = [System.Collections.Generic.List[string]]::new()
foreach ($root in ($comfyRoots | Select-Object -Unique)) {
  foreach ($candidate in @(
    (Join-Path $root "python_embeded\python.exe"),
    (Join-Path $root "ComfyUI_windows_portable\python_embeded\python.exe"),
    (Join-Path $root ".venv\Scripts\python.exe"),
    (Join-Path $root "ComfyUI_windows_portable\.venv\Scripts\python.exe")
  )) {
    if ((Test-Path -LiteralPath $candidate -PathType Leaf) -and -not $pythonCandidates.Contains($candidate)) {
      $pythonCandidates.Add($candidate)
    }
  }
}
$systemPython = Get-Command python -ErrorAction SilentlyContinue
if ($systemPython) { $pythonCandidates.Add($systemPython.Source) }

$pythonInfo = $null
$torchInfo = $null
foreach ($pythonPath in ($pythonCandidates | Select-Object -Unique)) {
  try {
    $versionOutput = (& $pythonPath --version 2>&1 | Out-String).Trim()
    $pythonVersionJson = ConvertTo-Json -InputObject $versionOutput -Compress
    $torchScript = @(
      'import json'
      ('d = {"python":' + $pythonVersionJson + ',"pytorch":None,"cuda_available":False,"cuda_runtime":None,"gpu":None}')
      'try:'
      '    import torch'
      '    d.update(pytorch=torch.__version__, cuda_available=torch.cuda.is_available(), cuda_runtime=torch.version.cuda, gpu=torch.cuda.get_device_name(0) if torch.cuda.is_available() else None)'
      'except Exception as exc:'
      '    d["pytorch_error"] = type(exc).__name__'
      'print(json.dumps(d))'
    ) -join "`n"
    $jsonLine = & $pythonPath -c $torchScript 2>$null | Where-Object { $_ -match '^\s*\{' } | Select-Object -Last 1
    if ($LASTEXITCODE -eq 0 -and $jsonLine) {
      $torchInfo = $jsonLine | ConvertFrom-Json
      $pythonInfo = $versionOutput
      if ($torchInfo.pytorch) { break }
    }
  } catch {}
}

$result = [ordered]@{
  timestamp = (Get-Date).ToUniversalTime().ToString("o")
  windows = $os.Caption
  windows_build = $os.BuildNumber
  gpu_name = if ($gpu) { $gpu.Name } else { $null }
  gpu_adapter_ram_bytes = if ($gpu) { [int64]$gpu.AdapterRAM } else { $null }
  nvidia_smi = $nvidiaSmi
  system_ram_gb = [math]::Round($system.TotalPhysicalMemory / 1GB, 2)
  local_storage_free_gb = [math]::Round($drive.Free / 1GB, 2)
  python = $pythonInfo
  pytorch = if ($torchInfo) { $torchInfo.pytorch } else { $null }
  pytorch_cuda_runtime = if ($torchInfo) { $torchInfo.cuda_runtime } else { $null }
  pytorch_cuda_available = if ($torchInfo) { [bool]$torchInfo.cuda_available } else { $false }
  pytorch_gpu = if ($torchInfo) { $torchInfo.gpu } else { $null }
  pytorch_error = if ($torchInfo) { $torchInfo.pytorch_error } else { "No usable Python runtime detected" }
  git = (& git --version 2>$null | Out-String).Trim()
}

$json = $result | ConvertTo-Json -Depth 5
Write-Output $json
if ($OutFile) {
  New-Item -ItemType Directory -Force -Path (Split-Path $OutFile) | Out-Null
  $json | Set-Content -Encoding UTF8 $OutFile
}
