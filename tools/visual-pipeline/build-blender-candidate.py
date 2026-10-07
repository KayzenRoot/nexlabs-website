"""Build an inspectable, web-exportable WO-013 Blender study outside the repo."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
import re
import struct
import zlib

import bpy
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view


def ensure_outside_repo(path: Path, repo_root: Path) -> Path:
    resolved = path.resolve()
    try:
        resolved.relative_to(repo_root.resolve())
    except ValueError:
        return resolved
    raise SystemExit("Output directory must be outside the repository.")


def make_material(name: str, color: tuple[float, float, float, float], *, metallic: float = 0.0,
                  roughness: float = 0.35, emission: tuple[float, float, float, float] | None = None,
                  emission_strength: float = 0.0) -> bpy.types.Material:
    material = bpy.data.materials.new(name)
    material.diffuse_color = color
    material.use_nodes = True
    shader = material.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    coat = shader.inputs.get("Coat Weight")
    if coat:
        coat.default_value = 0.65 if metallic > 0.5 else 0.12
    if emission is not None:
        emission_socket = shader.inputs.get("Emission Color") or shader.inputs.get("Emission")
        if emission_socket:
            emission_socket.default_value = emission
        strength_socket = shader.inputs.get("Emission Strength")
        if strength_socket:
            strength_socket.default_value = emission_strength
    return material


def assign(obj: bpy.types.Object, material: bpy.types.Material) -> bpy.types.Object:
    obj.data.materials.append(material)
    return obj


def smooth(obj: bpy.types.Object) -> bpy.types.Object:
    if hasattr(obj.data, "polygons"):
        for polygon in obj.data.polygons:
            polygon.use_smooth = True
    return obj


def bevel(obj: bpy.types.Object, width: float = 0.045, segments: int = 3) -> bpy.types.Object:
    modifier = obj.modifiers.new("Machined edge", "BEVEL")
    modifier.width = width
    modifier.segments = segments
    normal = obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")
    normal.keep_sharp = True
    return obj


def cube(name: str, location: tuple[float, float, float], dimensions: tuple[float, float, float],
         material: bpy.types.Material, *, radius: float = 0.0,
         rotation: tuple[float, float, float] = (0.0, 0.0, 0.0)) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    assign(obj, material)
    if radius:
        bevel(obj, radius)
    return obj


def cylinder(name: str, location: tuple[float, float, float], radius: float, depth: float,
             material: bpy.types.Material, *, vertices: int = 64,
             rotation: tuple[float, float, float] = (0.0, 0.0, 0.0)) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth,
                                        location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    assign(obj, material)
    bevel(obj, min(0.035, depth * 0.12), 3)
    return smooth(obj)


def torus(name: str, location: tuple[float, float, float], major: float, minor: float,
          material: bpy.types.Material, *, rotation: tuple[float, float, float] = (0.0, 0.0, 0.0),
          segments: int = 96) -> bpy.types.Object:
    bpy.ops.mesh.primitive_torus_add(major_segments=segments, minor_segments=10,
                                     location=location, major_radius=major,
                                     minor_radius=minor, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    assign(obj, material)
    return smooth(obj)


def beam(name: str, start: Vector, end: Vector, radius: float, material: bpy.types.Material) -> bpy.types.Object:
    vector = end - start
    obj = cylinder(name, tuple((start + end) * 0.5), radius, vector.length,
                   material, vertices=12)
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = vector.to_track_quat("Z", "Y")
    return obj


def curve_path(name: str, points: list[tuple[float, float, float]], radius: float,
               material: bpy.types.Material, *, cyclic: bool = False) -> bpy.types.Object:
    data = bpy.data.curves.new(name, "CURVE")
    data.dimensions = "3D"
    data.resolution_u = 2
    data.bevel_depth = radius
    data.bevel_resolution = 3
    spline = data.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for item, point in zip(spline.points, points):
        item.co = (*point, 1.0)
    spline.use_cyclic_u = cyclic
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    assign(obj, material)
    return obj


def look_at(obj: bpy.types.Object, target: Vector) -> None:
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def write_gray_png(path: Path, width: int, height: int, rows: list[bytearray]) -> None:
    def chunk(name: bytes, payload: bytes) -> bytes:
        return (
            struct.pack(">I", len(payload))
            + name
            + payload
            + struct.pack(">I", zlib.crc32(name + payload) & 0xFFFFFFFF)
        )

    scanlines = b"".join(b"\x00" + bytes(row) for row in rows)
    header = struct.pack(">IIBBBBB", width, height, 8, 0, 0, 0, 0)
    path.write_bytes(
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", header)
        + chunk(b"IDAT", zlib.compress(scanlines, level=6))
        + chunk(b"IEND", b"")
    )


def write_projected_depth_proxy(
    scene: bpy.types.Scene,
    camera: bpy.types.Object,
    output: Path,
    *,
    width: int = 768,
    height: int = 432,
) -> dict[str, object]:
    """Rasterize projected object bounds into a deterministic coarse depth guide."""
    bpy.context.view_layer.update()
    boxes: list[tuple[float, int, int, int, int]] = []
    for obj in scene.objects:
        if obj.type not in {"MESH", "CURVE"}:
            continue
        projected = []
        for corner in obj.bound_box:
            point = world_to_camera_view(scene, camera, obj.matrix_world @ Vector(corner))
            if point.z > 0:
                projected.append(point)
        if len(projected) < 2:
            continue
        x0 = max(0, min(width - 1, math.floor(min(point.x for point in projected) * width)))
        x1 = max(0, min(width, math.ceil(max(point.x for point in projected) * width)))
        y0 = max(0, min(height - 1, math.floor((1 - max(point.y for point in projected)) * height)))
        y1 = max(0, min(height, math.ceil((1 - min(point.y for point in projected)) * height)))
        if x1 <= x0 or y1 <= y0:
            continue
        depth = sum(point.z for point in projected) / len(projected)
        boxes.append((depth, x0, y0, x1, y1))

    if not boxes:
        raise RuntimeError("The Blender camera did not project any geometry into the depth guide.")

    near = min(box[0] for box in boxes)
    far = max(box[0] for box in boxes)
    span = max(far - near, 0.001)
    rows = [bytearray(width) for _ in range(height)]
    for depth, x0, y0, x1, y1 in sorted(boxes, reverse=True):
        value = max(18, min(255, round(255 * (far - depth) / span)))
        fill = bytes([value]) * (x1 - x0)
        for y in range(y0, y1):
            rows[y][x0:x1] = fill

    write_gray_png(output, width, height, rows)
    return {
        "file": output.name,
        "sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "bytes": output.stat().st_size,
        "width": width,
        "height": height,
        "source": "camera-projected Blender object-bound depth proxy",
        "projected_objects": len(boxes),
        "limitation": "coarse object-bound guidance; not a per-pixel renderer Z pass",
    }


def linearize_animation(obj: bpy.types.Object) -> None:
    animation = obj.animation_data
    if not animation or not animation.action:
        return
    action = animation.action
    slot = animation.action_slot
    for layer in action.layers:
        for strip in layer.strips:
            channelbag = strip.channelbag(slot)
            if channelbag:
                for fcurve in channelbag.fcurves:
                    for key in fcurve.keyframe_points:
                        key.interpolation = "LINEAR"


def add_area_light(name: str, location: tuple[float, float, float], target: Vector,
                   energy: float, color: tuple[float, float, float], shape: str,
                   size: float, size_y: float = 1.0) -> bpy.types.Object:
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.color = color
    data.shape = shape
    data.size = size
    if shape == "RECTANGLE":
        data.size_y = size_y
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    look_at(obj, target)
    return obj


def canonical_n_points(source: Path) -> list[tuple[float, float]]:
    text = source.read_text(encoding="utf-8")
    match = re.search(r"silhouette:\s*'([^']+)'", text)
    if not match:
        raise SystemExit("Canonical Precision Blades silhouette was not found.")
    path_data = match.group(1)
    commands = re.findall(r"([MLZ])\s*(-?\d+(?:\.\d+)?),?\s*(-?\d+(?:\.\d+)?)?", path_data)
    points: list[tuple[float, float]] = []
    for command, x_text, y_text in commands:
        if command == "Z":
            break
        if not x_text or not y_text:
            continue
        x = float(x_text) + 311.0
        y = float(y_text) + 14.0
        points.append((x, y))
    if len(points) < 20:
        raise SystemExit("Canonical N contour did not produce enough vertices.")
    xs = [point[0] for point in points]
    ys = [point[1] for point in points]
    center_x = (min(xs) + max(xs)) * 0.5
    center_y = (min(ys) + max(ys)) * 0.5
    scale = 0.0145
    return [((x - center_x) * scale, (y - center_y) * scale) for x, y in points]


def add_canonical_n(points: list[tuple[float, float]], location: tuple[float, float, float],
                    material: bpy.types.Material) -> bpy.types.Object:
    data = bpy.data.curves.new("Precision Blades N · exact source contour", "CURVE")
    data.dimensions = "2D"
    data.fill_mode = "BOTH"
    data.extrude = 0.115
    data.bevel_depth = 0.025
    data.bevel_resolution = 5
    spline = data.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for item, (x, y) in zip(spline.points, points):
        item.co = (x, y, 0.0, 1.0)
    spline.use_cyclic_u = True
    obj = bpy.data.objects.new("Precision Blades N · canonical geometry", data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler.x = math.pi / 2
    assign(obj, material)
    return obj


def add_globe(center: tuple[float, float, float], ocean: bpy.types.Material,
              network: bpy.types.Material, node_material: bpy.types.Material) -> list[bpy.types.Object]:
    root = bpy.data.objects.new("Earth network core · animated loop", None)
    bpy.context.collection.objects.link(root)
    root.location = center
    result = [root]

    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=32, radius=0.92)
    globe = bpy.context.object
    globe.name = "Dark blue Earth core"
    smooth(globe)
    assign(globe, ocean)
    globe.parent = root
    globe.location = (0, 0, 0)
    result.append(globe)

    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, radius=0.94)
    grid = bpy.context.object
    grid.name = "Fine network globe lattice"
    smooth(grid)
    wire = grid.modifiers.new("Fine geodesic network", "WIREFRAME")
    wire.thickness = 0.008
    wire.use_replace = True
    assign(grid, network)
    grid.parent = root
    grid.location = (0, 0, 0)
    result.append(grid)

    positions: list[Vector] = []
    count = 28
    golden_angle = math.pi * (3.0 - math.sqrt(5.0))
    for index in range(count):
        z = 1.0 - (index / (count - 1)) * 2.0
        radius = math.sqrt(max(0.0, 1.0 - z * z))
        angle = golden_angle * index
        point = Vector((math.cos(angle) * radius, math.sin(angle) * radius, z)) * 0.965
        positions.append(point)
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.033, location=point)
        node = bpy.context.object
        node.name = f"Network node {index + 1:02d}"
        assign(node, node_material)
        node.parent = root
        node.location = point
        result.append(node)

    # Deterministic short geodesic links add a readable network without a texture map.
    for index, point in enumerate(positions):
        for neighbor_index in ((index + 1) % count, (index + 7) % count):
            neighbor = positions[neighbor_index]
            if (point - neighbor).length > 1.25:
                continue
            line = curve_path(
                f"Network filament {index:02d}-{neighbor_index:02d}",
                [tuple(point), tuple(neighbor)], 0.006, network,
            )
            line.parent = root
            line.location = (0, 0, 0)
            result.append(line)

    torus("Earth orbital path A", (0, 0, 0), 1.1, 0.012, network,
          rotation=(math.pi * 0.4, 0.12, 0.2), segments=72).parent = root
    torus("Earth orbital path B", (0, 0, 0), 1.18, 0.009, node_material,
          rotation=(0.48, 0.62, -0.2), segments=72).parent = root
    root.rotation_euler.z = 0.0
    root.keyframe_insert(data_path="rotation_euler", index=2, frame=1)
    root.rotation_euler.z = 2.0 * math.pi
    root.keyframe_insert(data_path="rotation_euler", index=2, frame=121)
    linearize_animation(root)
    return result


def configure_scene(reference: Path, output_dir: Path, canonical_source: Path) -> dict[str, object]:
    if bpy.app.version_string != "5.2.2 LTS" or not bpy.app.background:
        raise SystemExit(f"Expected official Blender 5.2.2 LTS background runtime, got {bpy.app.version_string}.")

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False
    scene.render.filepath = str(output_dir / "blender-reference-candidate.png")
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 18
    scene.eevee.taa_render_samples = 24
    scene.frame_start = 1
    scene.frame_end = 120
    scene.render.fps = 24
    scene.world = bpy.data.worlds.new("Nex Labs deep graphite world")
    scene.world.use_nodes = True
    world_background = scene.world.node_tree.nodes.get("Background")
    world_background.inputs["Color"].default_value = (0.003, 0.008, 0.02, 1.0)
    world_background.inputs["Strength"].default_value = 0.18
    scene.view_settings.view_transform = "AgX"

    # Keep the generated image as an inspectable art-direction reference only.
    reference_image = bpy.data.images.load(str(reference), check_existing=True)
    reference_image.name = "ComfyUI generated visual reference · not a texture"
    reference_image.use_fake_user = True
    scene["reference_role"] = "visual art direction only; not rendered, not mapped, not exported"
    scene["reference_sha256"] = hashlib.sha256(reference.read_bytes()).hexdigest()
    source_sha = hashlib.sha256(canonical_source.read_bytes()).hexdigest()
    scene["canonical_precision_blades_source_sha256"] = source_sha

    dark_floor = make_material("Graphite metallic floor", (0.012, 0.026, 0.052, 1), metallic=0.86, roughness=0.22)
    dark_shell = make_material("Smoked chrome structure", (0.025, 0.065, 0.12, 1), metallic=0.9, roughness=0.2)
    silver = make_material("Cold precision chrome", (0.62, 0.76, 0.9, 1), metallic=0.98, roughness=0.13)
    glass = make_material("Dark holographic glass", (0.012, 0.075, 0.13, 1), metallic=0.5, roughness=0.16)
    blue = make_material("Electric blue light", (0.012, 0.13, 0.68, 1), metallic=0.28, roughness=0.2,
                         emission=(0.008, 0.18, 1, 1), emission_strength=3.2)
    cyan = make_material("Cyan signal light", (0.06, 0.58, 0.82, 1), metallic=0.12, roughness=0.22,
                         emission=(0.025, 0.52, 1, 1), emission_strength=2.0)
    white = make_material("Cold-white energy", (0.58, 0.88, 1, 1), metallic=0.06, roughness=0.25,
                          emission=(0.45, 0.78, 1, 1), emission_strength=1.2)
    earth_mat = make_material("Earth dark ocean", (0.008, 0.038, 0.11, 1), metallic=0.64, roughness=0.22,
                              emission=(0.003, 0.02, 0.08, 1), emission_strength=0.2)
    figure_mat = make_material("Visitor silhouette", (0.003, 0.007, 0.015, 1), metallic=0.45, roughness=0.38)

    # Dark, stacked circular floor/platform with readable energy inlays.
    cylinder("Lower laboratory plinth", (0, 0, 0.18), 5.5, 0.36, dark_shell, vertices=128)
    cylinder("Recessed graphite floor", (0, 0, 0.39), 4.85, 0.12, dark_floor, vertices=128)
    cylinder("Inner precision dais", (0, 0, 0.49), 3.35, 0.1, dark_shell, vertices=112)
    cylinder("Raised N presentation deck", (0.25, -1.0, 0.62), 2.25, 0.16, dark_floor, vertices=112)
    for index, radius in enumerate((2.35, 2.56, 2.9, 3.26, 3.72, 4.2, 4.82, 5.22)):
        torus(f"Floor concentric light rail {index + 1}", (0, 0, 0.51 + index * 0.008), radius,
              0.022 if index % 2 else 0.038, cyan if index % 3 else blue, segments=112)
    for index in range(12):
        angle = (index / 12.0) * math.tau
        x, y = math.cos(angle), math.sin(angle)
        cube(f"Radial floor guide {index + 1:02d}", (x * 4.1, y * 4.1, 0.456),
             (0.035, 1.25, 0.014), blue if index % 3 else cyan,
             rotation=(0, 0, angle - math.pi / 2))
    for x in (-4.65, -3.9, 3.9, 4.65):
        cube(f"Longitudinal floor signal {x:+.2f}", (x, -0.3, 0.445), (0.035, 8.0, 0.012),
             cyan if abs(x) > 4 else blue)

    # Rear shell: repeated vertical ribs, layered side frames and top/bottom rings.
    for index, angle in enumerate(math.radians(value) for value in range(18, 163, 12)):
        radius = 5.15
        x, y = radius * math.cos(angle), radius * math.sin(angle)
        beam(f"Cylindrical chamber rib {index + 1:02d}", Vector((x, y, 0.55)),
             Vector((x, y, 6.5)), 0.058, dark_shell)
        if index % 2 == 0:
            beam(f"Axial blue light rail {index + 1:02d}", Vector((x * 0.992, y * 0.992, 0.75)),
                 Vector((x * 0.992, y * 0.992, 6.28)), 0.018, blue if index % 4 else cyan)
    for radius, y, z in ((4.95, 1.0, 1.05), (5.08, 1.15, 3.45), (5.18, 1.3, 5.85),
                         (4.6, 1.15, 6.25), (3.75, 1.0, 6.48), (2.9, 0.88, 6.62)):
        torus(f"Upper / lower chamber ring {radius:.2f}", (0, y, z), radius, 0.035, silver if z > 6 else dark_shell,
              rotation=(math.pi / 2, 0, 0), segments=112)
        torus(f"Chamber ring energy inlay {radius:.2f}", (0, y - 0.045, z + 0.02), radius * 0.985,
              0.012, cyan if z > 6 else blue, rotation=(math.pi / 2, 0, 0), segments=112)
    for x in (-5.0, 5.0):
        for z in (1.0, 2.0, 4.8, 5.8):
            cube(f"Side laboratory crossbeam {x:+.0f}-{z:.1f}", (x, 1.9, z), (0.14, 3.4, 0.16), dark_shell,
                 radius=0.035)

    # The N contour is parsed directly from the accepted source, then receives only depth/material.
    n_points = canonical_n_points(canonical_source)
    n_obj = add_canonical_n(n_points, (0.2, -1.65, 3.55), silver)

    # Physical holographic panels: smoked plates, machined borders and signal rows.
    for side in (-1, 1):
        x = side * 4.05
        panel = cube(f"Holographic glass panel {side:+d}", (x, -0.92, 3.35), (2.05, 0.11, 1.46), glass,
                     radius=0.06, rotation=(0, side * 0.05, -side * 0.08))
        for edge in (-1, 1):
            cube(f"Panel chrome vertical frame {side:+d}-{edge:+d}",
                 (x + edge * 1.03, -1.01, 3.35), (0.045, 0.035, 1.54), silver, radius=0.016)
            cube(f"Panel energy spine {side:+d}-{edge:+d}",
                 (x + edge * 0.99, -1.04, 3.35), (0.016, 0.018, 1.43), cyan, radius=0.006)
        for row in range(6):
            line_width = 0.8 if row % 3 else 1.25
            cube(f"Panel telemetry line {side:+d}-{row + 1:02d}",
                 (x - 0.12, -1.03, 2.88 + row * 0.16), (line_width, 0.018, 0.012),
                 blue if row % 2 else white, radius=0.004)
        cube(f"Panel glass inner layer {side:+d}", (x, -0.98, 3.35), (1.72, 0.025, 1.12),
             dark_floor, radius=0.035)
        panel["volume_layers"] = 3

    # Network Earth floats left of the monogram; only procedural geometry, no mapped artwork.
    globe_objects = add_globe((-3.45, 0.55, 3.58), earth_mat, blue, cyan)

    # Research and technology consoles create foreground/midground depth without fake labels.
    for side in (-1, 1):
        x = side * 5.55
        cube(f"Laboratory console base {side:+d}", (x, -1.55, 0.98), (1.35, 1.25, 0.56), dark_shell,
             radius=0.09, rotation=(0, 0, -side * 0.08))
        cube(f"Laboratory console glass deck {side:+d}", (x, -1.58, 1.29), (1.48, 1.32, 0.055), glass,
             radius=0.035)
        for index in range(5):
            cube(f"Console signal {side:+d}-{index + 1}", (x - 0.48 + index * 0.22, -1.68, 1.33),
                 (0.08, 0.025, 0.012), cyan if index % 2 else blue, radius=0.005)
        cube(f"Console floating display {side:+d}", (x, -0.9, 2.35), (1.26, 0.09, 0.72), glass,
             radius=0.045, rotation=(0.16, 0, -side * 0.08))
        for row in range(4):
            cube(f"Display trace {side:+d}-{row + 1}", (x, -0.96, 2.15 + row * 0.12),
                 (0.78 if row % 2 else 0.52, 0.015, 0.01), blue if row % 2 else cyan, radius=0.003)

    # A small silhouette grounds the chamber scale while remaining secondary to the N.
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=10, radius=0.12,
                                         location=(-1.95, -3.1, 1.92))
    assign(smooth(bpy.context.object), figure_mat)
    bpy.context.object.name = "Human scale cue · head"
    cylinder("Human scale cue · torso", (-1.95, -3.1, 1.25), 0.17, 0.86, figure_mat, vertices=12)
    for side in (-1, 1):
        beam(f"Human scale cue · leg {side:+d}", Vector((-1.95 + side * 0.09, -3.1, 0.92)),
             Vector((-1.95 + side * 0.13, -3.1, 0.55)), 0.07, figure_mat)
        beam(f"Human scale cue · arm {side:+d}", Vector((-1.95, -3.1, 1.52)),
             Vector((-1.95 + side * 0.3, -3.12, 1.18)), 0.05, figure_mat)

    # Signal filaments give the chamber a quiet living-organism continuity.
    for index, sign in enumerate((-1, 1, -1, 1)):
        points = [
            (sign * 4.9, 1.4, 1.15 + index * 0.22),
            (sign * 4.1, -0.05, 2.6 + index * 0.12),
            (sign * 2.7, -0.85, 4.65 - index * 0.18),
            (sign * 1.5, 0.25, 5.65 - index * 0.16),
        ]
        curve_path(f"Living energy filament {index + 1}", points, 0.012 if index % 2 else 0.019,
                   cyan if index % 2 else blue)

    # Looping carrier: a 120-frame orbit with a fixed endpoint for seamless playback.
    orbit = bpy.data.objects.new("Energy pulse orbit · 5 second loop", None)
    bpy.context.collection.objects.link(orbit)
    orbit.location = (0.2, -1.7, 3.55)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.09, location=(0, 0, 0))
    carrier = bpy.context.object
    carrier.name = "Cyan energy carrier"
    assign(smooth(carrier), white)
    carrier.parent = orbit
    carrier.location = (2.9, 0, 0)
    orbit.rotation_euler.z = 0.0
    orbit.keyframe_insert(data_path="rotation_euler", index=2, frame=1)
    orbit.rotation_euler.z = 2.0 * math.pi
    orbit.keyframe_insert(data_path="rotation_euler", index=2, frame=121)
    linearize_animation(orbit)

    # Controlled strip lights create chrome response and vertical axial separation.
    target = Vector((0, 0, 3.0))
    add_area_light("Large softbox · cold key", (0.0, -5.8, 7.2), target, 2600, (0.72, 0.88, 1.0), "RECTANGLE", 5.0, 2.0)
    add_area_light("Blue vertical softbox · left", (-5.6, -0.5, 4.8), target, 2100, (0.08, 0.32, 1.0), "RECTANGLE", 1.25, 5.5)
    add_area_light("White vertical softbox · right", (5.3, -0.8, 5.5), target, 2400, (0.72, 0.92, 1.0), "RECTANGLE", 1.15, 5.8)
    add_area_light("Cyan rear rim", (0.0, 4.5, 5.7), target, 2000, (0.06, 0.48, 1.0), "RECTANGLE", 4.0, 2.0)
    add_area_light("Top chamber wash", (0.0, 1.1, 8.0), target, 1700, (0.45, 0.7, 1.0), "DISK", 4.0)

    camera_data = bpy.data.cameras.new("Candidate hero camera")
    camera = bpy.data.objects.new("Candidate hero camera", camera_data)
    bpy.context.collection.objects.link(camera)
    camera.location = (0.0, -15.8, 5.0)
    camera_data.lens = 47
    look_at(camera, Vector((0, 0.15, 3.0)))
    scene.camera = camera

    output_dir.mkdir(parents=True, exist_ok=True)
    scene.frame_set(1)
    bpy.ops.render.render(write_still=True)
    depth_proxy = write_projected_depth_proxy(
        scene,
        camera,
        output_dir / "blender-candidate-depth-proxy.png",
    )
    bpy.ops.wm.save_as_mainfile(filepath=str(output_dir / "blender-reference-candidate.blend"))

    mesh_count = sum(1 for obj in scene.objects if obj.type == "MESH")
    curve_count = sum(1 for obj in scene.objects if obj.type == "CURVE")
    object_count = len(scene.objects)
    glb_path = output_dir / "blender-reference-candidate.glb"
    bpy.ops.export_scene.gltf(
        filepath=str(glb_path),
        export_format="GLB",
        use_selection=False,
        export_apply=True,
        export_animations=True,
        export_lights=False,
        export_cameras=False,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
    )

    return {
        "status": "PENDING_READBACK",
        "blender_version": bpy.app.version_string,
        "runtime": "Blender Foundation bpy Python module",
        "background": bpy.app.background,
        "reference_image": reference.name,
        "reference_role": scene["reference_role"],
        "reference_sha256": scene["reference_sha256"],
        "canonical_geometry_source_sha256": source_sha,
        "n_geometry_source": "src/brand/precision-blades.ts exact silhouette; only extrusion/bevel/material added",
        "web_candidate": "GLB; generated references are not used as textures or backgrounds",
        "mesh_objects": mesh_count,
        "curve_objects": curve_count,
        "scene_objects": object_count,
        "animation_frames": [1, 120],
        "render_file": "blender-reference-candidate.png",
        "render_bytes": (output_dir / "blender-reference-candidate.png").stat().st_size,
        "depth_proxy": depth_proxy,
        "glb_file": glb_path.name,
        "glb_bytes": glb_path.stat().st_size,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reference", required=True, type=Path)
    parser.add_argument("--reference-sha256", required=True)
    parser.add_argument("--canonical-source", required=True, type=Path)
    parser.add_argument("--repo-root", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()

    reference = args.reference.resolve(strict=True)
    if hashlib.sha256(reference.read_bytes()).hexdigest() != args.reference_sha256.lower():
        raise SystemExit("Generated reference SHA-256 does not match the caller-provided digest.")
    canonical_source = args.canonical_source.resolve(strict=True)
    output_dir = ensure_outside_repo(args.output_dir, args.repo_root)
    payload = configure_scene(reference, output_dir, canonical_source)

    # Read back the web candidate in a fresh scene before qualifying the pipeline sample.
    glb_path = output_dir / "blender-reference-candidate.glb"
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(glb_path))
    imported_meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    imported_animations = [obj for obj in bpy.context.scene.objects if obj.animation_data is not None]
    payload["glb_readback_meshes"] = len(imported_meshes)
    payload["glb_readback_animated_objects"] = len(imported_animations)
    payload["glb_readback_pass"] = len(imported_meshes) >= 50 and len(imported_animations) >= 1
    payload["status"] = "PASS" if payload["glb_readback_pass"] else "FAIL"
    payload["glb_sha256"] = hashlib.sha256(glb_path.read_bytes()).hexdigest()
    payload["render_sha256"] = hashlib.sha256((output_dir / "blender-reference-candidate.png").read_bytes()).hexdigest()
    payload["depth_proxy_sha256"] = hashlib.sha256((output_dir / "blender-candidate-depth-proxy.png").read_bytes()).hexdigest()
    (output_dir / "candidate-report.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))
    if payload["status"] != "PASS":
        raise SystemExit("Blender generated-reference to GLB round-trip failed.")


if __name__ == "__main__":
    main()
