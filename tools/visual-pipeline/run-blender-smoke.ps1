$ErrorActionPreference = "Stop"

$visualRoot = if ($env:NEXLABS_VISUAL_LOCAL) {
  $env:NEXLABS_VISUAL_LOCAL
} else {
  Join-Path $env:LOCALAPPDATA "NexLabs\VisualPipeline"
}
$blenderExe = if ($env:NEXLABS_BLENDER_EXE) {
  $env:NEXLABS_BLENDER_EXE
} else {
  Join-Path $visualRoot "Blender\blender-5.2.2-windows-x64\blender.exe"
}
$blenderPython = if ($env:NEXLABS_BLENDER_PYTHON) {
  $env:NEXLABS_BLENDER_PYTHON
} else {
  Join-Path $visualRoot "Blender\bpy-5.2.2-venv\Scripts\python.exe"
}
$usePythonModule = Test-Path -LiteralPath $blenderPython -PathType Leaf
if (-not $usePythonModule -and -not (Test-Path -LiteralPath $blenderExe -PathType Leaf)) {
  throw "Install the pinned Blender 5.2 LTS runtime (binary or official bpy Python module) under the local visual pipeline root."
}
if ($usePythonModule) {
  $runtimeJson = & $blenderPython -c 'import bpy, json; print(json.dumps({"version": bpy.app.version_string, "background": bpy.app.background}))'
  if ($LASTEXITCODE -ne 0) { throw "Blender bpy Python module failed to initialize (exit $LASTEXITCODE)." }
  $runtimeInfo = ($runtimeJson | Select-Object -Last 1) | ConvertFrom-Json
  if ($runtimeInfo.version -ne "5.2.2 LTS" -or -not $runtimeInfo.background) {
    throw "Expected Blender 5.2.2 LTS in background Python; received $($runtimeInfo.version), background=$($runtimeInfo.background)."
  }
}

$runDir = Join-Path $visualRoot "run"
$outputDir = Join-Path $visualRoot "blender-smoke"
New-Item -ItemType Directory -Force -Path $runDir,$outputDir | Out-Null

$scriptPath = Join-Path $runDir "blender-smoke.py"
$previewPath = Join-Path $outputDir "blender-smoke.png"
$glbPath = Join-Path $outputDir "blender-smoke.glb"
$reportPath = Join-Path $outputDir "blender-smoke.json"

$python = @'
import json
import pathlib
import bpy
import mathutils

preview = pathlib.Path(__PREVIEW__)
glb = pathlib.Path(__GLB__)
report = pathlib.Path(__REPORT__)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
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
direction = mathutils.Vector((0, 0, 0)) - cam.location
cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

bpy.ops.render.render(write_still=True)
for item in bpy.context.selected_objects:
    item.select_set(False)
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
bpy.ops.export_scene.gltf(filepath=str(glb), export_format="GLB", use_selection=True)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=str(glb))
mesh_count = sum(1 for item in scene.objects if item.type == "MESH")
payload = {
    "status": "PASS" if preview.exists() and glb.exists() and mesh_count == 1 else "FAIL",
    "blender_version": bpy.app.version_string,
    "runtime": "official bpy Python module" if bpy.app.background else "Blender background executable",
    "render_engine": scene.render.engine,
    "render_bytes": preview.stat().st_size if preview.exists() else 0,
    "glb_bytes": glb.stat().st_size if glb.exists() else 0,
    "glb_readback_meshes": mesh_count,
    "background": bpy.app.background,
}
report.write_text(json.dumps(payload, indent=2), encoding="utf-8")
print(json.dumps(payload))
if payload["status"] != "PASS":
    raise RuntimeError("Blender render/export/readback smoke did not pass")
'@

$previewLiteral = $previewPath.Replace("\", "\\").Replace("'", "\'")
$glbLiteral = $glbPath.Replace("\", "\\").Replace("'", "\'")
$reportLiteral = $reportPath.Replace("\", "\\").Replace("'", "\'")
$python = $python.Replace("__PREVIEW__", "'" + $previewLiteral + "'")
$python = $python.Replace("__GLB__", "'" + $glbLiteral + "'")
$python = $python.Replace("__REPORT__", "'" + $reportLiteral + "'")
$python | Set-Content -LiteralPath $scriptPath -Encoding UTF8

try {
  if ($usePythonModule) {
    & $blenderPython $scriptPath
  } else {
    & $blenderExe --background --factory-startup --python $scriptPath --python-exit-code 11
  }
  if ($LASTEXITCODE -ne 0) { throw "Blender background smoke failed with exit code $LASTEXITCODE" }
  foreach ($path in @($previewPath,$glbPath,$reportPath)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Blender output missing: $([IO.Path]::GetFileName($path))" }
  }
} finally {
  Remove-Item -LiteralPath $scriptPath -Force -ErrorAction SilentlyContinue
}

Write-Host "PASS: Blender background render, GLB export and readback"
Write-Host "preview: $previewPath"
Write-Host "GLB: $glbPath"
Write-Host "report: $reportPath"
