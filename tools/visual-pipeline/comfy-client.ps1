param(
  [Parameter(Mandatory=$true, Position=0)]
  [ValidateSet("health","queue")]
  [string]$Command,
  [Parameter(Position=1)]
  [string]$Workflow,
  [int]$TimeoutSeconds = 900
)

$ErrorActionPreference = "Stop"
$BaseUri = [Uri]"http://127.0.0.1:8188"
$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) {
  [IO.Path]::GetFullPath($env:NEXLABS_VISUAL_LOCAL)
} else {
  [IO.Path]::GetFullPath((Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline"))
}
$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\.."))
$repoPrefix = $repoRoot.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if ($visualRoot.StartsWith($repoPrefix, [StringComparison]::OrdinalIgnoreCase) -or
    $visualRoot.Equals($repoRoot, [StringComparison]::OrdinalIgnoreCase)) {
  throw "NEXLABS_VISUAL_LOCAL must resolve outside the repository."
}

if ($env:NEXLABS_COMFY_URL) {
  $allowed = @("http://127.0.0.1:8188", "http://localhost:8188")
  if ($allowed -notcontains $env:NEXLABS_COMFY_URL.TrimEnd("/")) {
    throw "NEXLABS_COMFY_URL must be localhost-only on port 8188."
  }
}

function Invoke-LocalComfyGet([string]$Path) {
  if (-not $Path.StartsWith("/")) { throw "ComfyUI path must start with /." }
  Invoke-RestMethod -Method Get -Uri ([Uri]::new($BaseUri, $Path)) -TimeoutSec 15
}

if ($Command -eq "health") {
  try {
    $stats = Invoke-LocalComfyGet "/system_stats"
    $device = $stats.devices | Select-Object -First 1
    [ordered]@{
      status = "PASS"
      url = $BaseUri.AbsoluteUri.TrimEnd("/")
      localhost_only = $true
      devices_reported = @($stats.devices).Count
      gpu_name = if ($device) { $device.name } else { $null }
      torch_version = $stats.system.pytorch_version
      python_version = $stats.system.python_version
      comfyui_version = $stats.system.comfyui_version
    } | ConvertTo-Json -Depth 5
    return
  } catch {
    throw "ComfyUI health failed at http://127.0.0.1:8188/system_stats: $($_.Exception.Message)"
  }
}

if (-not $Workflow) { throw "Workflow path is required for queue." }
$resolved = (Resolve-Path -LiteralPath $Workflow -ErrorAction Stop).Path
if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) { throw "Workflow is not a file." }
$workflowObject = Get-Content -LiteralPath $resolved -Raw -Encoding UTF8 | ConvertFrom-Json
$body = @{ prompt = $workflowObject } | ConvertTo-Json -Depth 100 -Compress
$queued = Invoke-RestMethod -Method Post -Uri ([Uri]::new($BaseUri, "/prompt")) -ContentType "application/json" -Body $body -TimeoutSec 30
$promptId = [string]$queued.prompt_id
if ([string]::IsNullOrWhiteSpace($promptId) -or $promptId -notmatch '^[A-Fa-f0-9-]{8,}$') {
  throw "ComfyUI did not return a valid prompt identifier."
}

$encoded = [Uri]::EscapeDataString($promptId)
$deadline = [DateTime]::UtcNow.AddSeconds($TimeoutSeconds)
$completed = $null
while ([DateTime]::UtcNow -lt $deadline) {
  $history = Invoke-LocalComfyGet "/history/$encoded"
  if ($history.PSObject.Properties.Name -contains $promptId) {
    $completed = $history.$promptId
    break
  }
  Start-Sleep -Seconds 2
}
if (-not $completed) { throw "ComfyUI workflow $promptId timed out after $TimeoutSeconds seconds." }
if ($completed.status -and $completed.status.status_str -eq "error") {
  throw "ComfyUI workflow $promptId failed; inspect local ComfyUI logs."
}

$outputRoot = Join-Path (Join-Path $visualRoot "generated") $promptId
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
$saved = [System.Collections.Generic.List[object]]::new()
foreach ($node in $completed.outputs.PSObject.Properties) {
  foreach ($image in @($node.Value.images)) {
    if (-not $image.filename -or [IO.Path]::GetFileName([string]$image.filename) -ne [string]$image.filename) {
      throw "ComfyUI returned an unsafe output filename; refusing to write it."
    }
    $type = [string]$image.type
    if ($type -ne "output") { throw "Expected ComfyUI output images, received type '$type'." }
    $subfolder = [string]$image.subfolder
    if ($subfolder -match '(^|[\\/])\.\.([\\/]|$)' -or [IO.Path]::IsPathRooted($subfolder)) {
      throw "ComfyUI returned an unsafe output subfolder."
    }
    $query = "filename=$([Uri]::EscapeDataString([string]$image.filename))&subfolder=$([Uri]::EscapeDataString($subfolder))&type=output"
    $viewUri = [Uri]::new($BaseUri, "/view?$query")
    $targetName = "node-$($node.Name)-$([IO.Path]::GetFileName([string]$image.filename))"
    $targetPath = Join-Path $outputRoot $targetName
    Invoke-WebRequest -Method Get -Uri $viewUri -OutFile $targetPath -TimeoutSec 120 -UseBasicParsing
    $saved.Add([ordered]@{ node=$node.Name; file=$targetName; bytes=(Get-Item -LiteralPath $targetPath).Length })
  }
}
if ($saved.Count -eq 0) { throw "ComfyUI completed the workflow but returned no saved images." }

$result = [ordered]@{
  status = "PASS"
  prompt_id = $promptId
  workflow = [IO.Path]::GetFileName($resolved)
  outputs = @($saved)
  output_location = "outside-repository"
}
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $outputRoot "result.json") -Encoding UTF8
$result | ConvertTo-Json -Depth 8
