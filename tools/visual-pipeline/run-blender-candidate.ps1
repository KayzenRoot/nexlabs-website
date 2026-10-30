[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$Reference,
  [string]$OutputName = "blender-candidate-wo013"
)

$ErrorActionPreference = "Stop"

if ($OutputName -notmatch '^[a-z0-9][a-z0-9._-]{2,63}$') {
  throw "OutputName must be a short lowercase folder name without path separators."
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) {
  [System.IO.Path]::GetFullPath($env:NEXLABS_VISUAL_LOCAL)
} else {
  Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline"
}
$python = if ($env:NEXLABS_BLENDER_PYTHON) {
  $env:NEXLABS_BLENDER_PYTHON
} else {
  Join-Path $visualRoot "Blender\bpy-5.2.2-venv\Scripts\python.exe"
}
$resolvedReference = Resolve-Path -LiteralPath $Reference
if (-not (Test-Path -LiteralPath $resolvedReference.Path -PathType Leaf)) {
  throw "Reference must be a file."
}
$referencePath = $resolvedReference.Path
$canonicalSource = Join-Path $repoRoot "src\brand\precision-blades.ts"
$outputDirectory = Join-Path $visualRoot "generated\$OutputName"
$fullOutputDirectory = [System.IO.Path]::GetFullPath($outputDirectory)

if (-not (Test-Path -LiteralPath $python -PathType Leaf)) {
  throw "The pinned Blender 5.2.2 bpy Python runtime is unavailable. Set NEXLABS_BLENDER_PYTHON to its executable."
}

$repoPrefix = $repoRoot.TrimEnd('\') + '\'
if ($fullOutputDirectory.StartsWith($repoPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Blender outputs must stay outside the Git repository."
}
if ($referencePath.StartsWith($repoPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Blender design references must remain outside the Git repository."
}

$referenceSha256 = (Get-FileHash -LiteralPath $referencePath -Algorithm SHA256).Hash.ToLowerInvariant()
New-Item -ItemType Directory -Force -Path $fullOutputDirectory | Out-Null

& $python (Join-Path $PSScriptRoot "build-blender-candidate.py") `
  --reference $referencePath `
  --reference-sha256 $referenceSha256 `
  --canonical-source $canonicalSource `
  --repo-root $repoRoot `
  --output-dir $fullOutputDirectory

if ($LASTEXITCODE -ne 0) {
  throw "Blender candidate build failed with exit code $LASTEXITCODE."
}

$reportPath = Join-Path $fullOutputDirectory "candidate-report.json"
$report = Get-Content -LiteralPath $reportPath -Raw | ConvertFrom-Json
if ($report.status -ne "PASS" -or -not $report.glb_readback_pass) {
  throw "Blender candidate report did not pass export/readback validation."
}

Write-Host "PASS: Blender 5.2.2 reference candidate and GLB readback"
Write-Host "Output is outside the repository: $fullOutputDirectory"
