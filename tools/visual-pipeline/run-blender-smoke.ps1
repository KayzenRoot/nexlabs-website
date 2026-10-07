$ErrorActionPreference = "Stop"

if (-not $env:NEXLABS_BLENDER_EXE) { throw "Set NEXLABS_BLENDER_EXE to blender.exe" }
if (-not (Test-Path -LiteralPath $env:NEXLABS_BLENDER_EXE -PathType Leaf)) { throw "Blender executable not found: $env:NEXLABS_BLENDER_EXE" }

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) { $env:NEXLABS_VISUAL_LOCAL } else { Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline" }
$runDir = Join-Path $visualRoot "run"
$outputDir = Join-Path $visualRoot "blender-smoke"
New-Item -ItemType Directory -Force -Path $runDir,$outputDir | Out-Null

$scriptPath = Join-Path $runDir "blender-smoke.py"
$previewPath = Join-Path $outputDir "blender-smoke.png"
$reportPath = Join-Path $outputDir "blender-smoke.json"

$python = @'
import json
import pathlib
import bpy

preview = pathlib.Path(__PREVIEW__)
report = pathlib.Path(__REPORT__)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 512
scene.render.resolution_y = 512
scene.render.resolution_percentage = 100
scene.render.filepath = str(preview)

bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, location=(0, 0, 0))
obj = bpy.context.object
obj.name = "NexLabsSmokeSphere"

mat = bpy.data.materials.new("ChromeBlue")
mat.diffuse_color = (0.03, 0.22, 0.45, 1.0)
mat.metallic = 0.9
mat.roughness = 0.18
obj.data.materials.append(mat)

bpy.ops.object.light_add(type="AREA", location=(3, -3, 4))
key = bpy.context.object
key.data.energy = 1000
key.data.shape = "DISK"
key.data.size = 5

bpy.ops.object.camera_add(location=(0, -5.5, 0.6))
cam = bpy.context.object
scene.camera = cam

import mathutils
direction = mathutils.Vector((0, 0, 0)) - cam.location
cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

bpy.ops.render.render(write_still=True)
payload = {
    "status": "PASS" if preview.exists() else "FAIL",
    "blender_version": bpy.app.version_string,
    "render_engine": scene.render.engine,
    "preview": str(preview),
    "background": bpy.app.background,
}
report.write_text(json.dumps(payload, indent=2), encoding="utf-8")
print(json.dumps(payload))
if not preview.exists():
    raise RuntimeError("Smoke render was not written")
'@

$previewLiteral = $previewPath.Replace("\", "\\").Replace("'", "\'")
$reportLiteral = $reportPath.Replace("\", "\\").Replace("'", "\'")
$python = $python.Replace("__PREVIEW__", "'" + $previewLiteral + "'").Replace("__REPORT__", "'" + $reportLiteral + "'")
$python | Set-Content -LiteralPath $scriptPath -Encoding UTF8

try {
  & $env:NEXLABS_BLENDER_EXE --background --factory-startup --python $scriptPath --python-exit-code 11
  if ($LASTEXITCODE -ne 0) { throw "Blender background smoke failed with exit code $LASTEXITCODE" }
  if (-not (Test-Path -LiteralPath $previewPath -PathType Leaf)) { throw "Blender preview not produced" }
  if (-not (Test-Path -LiteralPath $reportPath -PathType Leaf)) { throw "Blender report not produced" }
} finally {
  Remove-Item -LiteralPath $scriptPath -Force -ErrorAction SilentlyContinue
}

Write-Host "PASS: Blender background smoke"
Write-Host "preview: $previewPath"
Write-Host "report: $reportPath"
