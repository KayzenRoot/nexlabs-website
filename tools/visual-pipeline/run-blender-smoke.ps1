$ErrorActionPreference = "Stop"
if (-not $env:NEXLABS_BLENDER_EXE) {
  throw "Set NEXLABS_BLENDER_EXE to blender.exe"
}
& $env:NEXLABS_BLENDER_EXE --background --factory-startup --python tools/visual-pipeline/blender/smoke.py --python-exit-code 11
exit $LASTEXITCODE
