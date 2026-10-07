import json
import os
import pathlib
import bpy

out_root = pathlib.Path(os.environ.get("NEXLABS_VISUAL_LOCAL", pathlib.Path.home() / "NexLabsVisualPipeline"))
out_root.mkdir(parents=True, exist_ok=True)
preview = out_root / "blender-smoke.png"
report = out_root / "blender-smoke.json"

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

def point_at(obj, target=(0, 0, 0)):
    import mathutils
    direction = mathutils.Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

point_at(cam)
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
