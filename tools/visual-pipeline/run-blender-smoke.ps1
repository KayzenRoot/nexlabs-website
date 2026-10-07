$ErrorActionPreference = "Stop"
$blenderSmoke = Join-Path $PSScriptRoot "blender\smoke.py"

if (-not $env:NEXLABS_BLENDER_EXE) { throw "Set NEXLABS_BLENDER_EXE to blender.exe" }
if (-not (Test-Path $env:NEXLABS_BLENDER_EXE)) { throw "Blender executable not found: $env:NEXLABS_BLENDER_EXE" }

& $env:NEXLABS_BLENDER_EXE --background --factory-startup --python $blenderSmoke --python-exit-code 11
exit $LASTEXITCODE
