param(
  [string]$OutFile = ""
)

$ErrorActionPreference = "Stop"
$gpu = Get-CimInstance Win32_VideoController | Where-Object { $_.Name -match "NVIDIA" } | Select-Object -First 1
$ramBytes = (Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory
$nvidia = $null
try {
  $nvidia = & nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader,nounits 2>$null
} catch {}

$result = [ordered]@{
  timestamp = (Get-Date).ToString("o")
  windows = [System.Environment]::OSVersion.VersionString
  gpu_name = if ($gpu) { $gpu.Name } else { $null }
  gpu_adapter_ram_bytes = if ($gpu) { [int64]$gpu.AdapterRAM } else { $null }
  system_ram_gb = [math]::Round($ramBytes / 1GB, 2)
  nvidia_smi = $nvidia
}

$json = $result | ConvertTo-Json -Depth 4
Write-Output $json
if ($OutFile) {
  New-Item -ItemType Directory -Force -Path (Split-Path $OutFile) | Out-Null
  $json | Set-Content -Encoding UTF8 $OutFile
}
