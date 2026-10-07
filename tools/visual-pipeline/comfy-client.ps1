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

if ($env:NEXLABS_COMFY_URL) {
  $allowed = @("http://127.0.0.1:8188", "http://localhost:8188")
  if ($allowed -notcontains $env:NEXLABS_COMFY_URL.TrimEnd("/")) {
    throw "NEXLABS_COMFY_URL must be localhost-only on port 8188."
  }
}

function Invoke-LocalComfyGet([string]$Path) {
  if (-not $Path.StartsWith("/")) { throw "ComfyUI path must start with /" }
  Invoke-RestMethod -Method Get -Uri ([Uri]::new($BaseUri, $Path)) -TimeoutSec 15
}

if ($Command -eq "health") {
  try {
    Invoke-WebRequest -Method Get -Uri $BaseUri -TimeoutSec 15 -UseBasicParsing | Out-Null
    [ordered]@{ status="PASS"; url=$BaseUri.AbsoluteUri.TrimEnd("/"); localhost_only=$true } | ConvertTo-Json
    exit 0
  } catch {
    [ordered]@{ status="FAIL"; url=$BaseUri.AbsoluteUri.TrimEnd("/"); localhost_only=$true; error=$_.Exception.Message } | ConvertTo-Json
    exit 1
  }
}

if (-not $Workflow) { throw "Workflow path is required for queue." }
$resolved = (Resolve-Path -LiteralPath $Workflow -ErrorAction Stop).Path
if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) { throw "Workflow is not a file: $resolved" }

$workflowObject = Get-Content -LiteralPath $resolved -Raw -Encoding UTF8 | ConvertFrom-Json
$body = @{ prompt = $workflowObject } | ConvertTo-Json -Depth 100 -Compress
$queued = Invoke-RestMethod -Method Post -Uri ([Uri]::new($BaseUri, "/prompt")) -ContentType "application/json" -Body $body -TimeoutSec 30
$promptId = [string]$queued.prompt_id
if ([string]::IsNullOrWhiteSpace($promptId)) { throw "ComfyUI did not return prompt_id." }

$encoded = [Uri]::EscapeDataString($promptId)
$deadline = [DateTime]::UtcNow.AddSeconds($TimeoutSeconds)
while ([DateTime]::UtcNow -lt $deadline) {
  $history = Invoke-LocalComfyGet "/history/$encoded"
  if ($history.PSObject.Properties.Name -contains $promptId) {
    [ordered]@{ status="PASS"; prompt_id=$promptId; history=$history.$promptId } | ConvertTo-Json -Depth 30
    exit 0
  }
  Start-Sleep -Seconds 1
}

[ordered]@{ status="TIMEOUT"; prompt_id=$promptId } | ConvertTo-Json
exit 3
