"""Deterministically reduce a Blender GLB's polygon cost before runtime review."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path

import bpy


def triangle_count(obj: bpy.types.Object) -> int:
    mesh = obj.data
    mesh.calc_loop_triangles()
    return len(mesh.loop_triangles)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def repository_root() -> Path:
    return Path(__file__).resolve().parents[2]


def safe_output_path(repo_root: Path) -> Path:
    data_root_value = os.environ.get("LOCALAPPDATA") or os.environ.get("XDG_DATA_HOME")
    data_root = Path(data_root_value).expanduser() if data_root_value else Path.home() / ".local" / "share"
    resolved_data_root = data_root.resolve()
    output_root = (resolved_data_root / "NexLabs" / "VisualPipeline" / "optimized").resolve()
    try:
        output_root.relative_to(resolved_data_root)
    except ValueError:
        raise SystemExit("The optimized output directory must stay under the user data directory.") from None
    try:
        output_root.relative_to(repo_root.resolve())
    except ValueError:
        pass
    else:
        raise SystemExit("Optimized Blender outputs must stay outside the Git repository.")

    output_root.mkdir(parents=True, exist_ok=True)
    output = output_root / "hero-lab-structure-r17-optimized.glb"
    report = output.with_suffix(".json")
    if output.is_symlink() or report.is_symlink():
        raise SystemExit("Refusing to write through a symbolic link in the optimized output directory.")
    if (output.exists() and not output.is_file()) or (report.exists() and not report.is_file()):
        raise SystemExit("Optimized output paths must be regular files when they already exist.")
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--expected-sha256", required=True)
    parser.add_argument("--ratio", type=float, default=0.55)
    args = parser.parse_args()

    source = args.source.resolve(strict=True)
    output = safe_output_path(repository_root())
    if not 0.25 <= args.ratio <= 0.9:
        raise SystemExit("Decimation ratio must stay between 0.25 and 0.9 for reviewable geometry.")
    if bpy.app.version_string != "5.2.2 LTS" or not bpy.app.background:
        raise SystemExit("The pinned Blender 5.2.2 LTS background runtime is required.")
    source_sha = sha256(source)
    if source_sha != args.expected_sha256.lower():
        raise SystemExit(
            f"Source GLB SHA-256 mismatch: expected {args.expected_sha256.lower()}, got {source_sha}."
        )

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(source))
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    if len(meshes) != 1:
        raise SystemExit(f"Expected one merged structural mesh, found {len(meshes)}.")

    obj = meshes[0]
    before_triangles = triangle_count(obj)
    material_count = len(obj.data.materials)
    if before_triangles < 10_000 or material_count < 2:
        raise SystemExit("Source GLB does not match the reviewed structural runtime model.")

    modifier = obj.modifiers.new("Reviewed runtime triangle reduction", "DECIMATE")
    modifier.decimate_type = "COLLAPSE"
    modifier.ratio = args.ratio
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    after_triangles = triangle_count(obj)
    if not 0 < after_triangles < before_triangles or len(obj.data.materials) != material_count:
        raise SystemExit("Decimation failed to retain non-empty geometry and material slots.")

    bpy.ops.export_scene.gltf(
        filepath=str(output),
        export_format="GLB",
        use_selection=False,
        export_apply=True,
        export_animations=False,
        export_lights=False,
        export_cameras=False,
        export_draco_mesh_compression_enable=False,
    )

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(output))
    readback_meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    if len(readback_meshes) != 1:
        raise SystemExit("Optimized GLB readback did not retain one merged mesh.")
    readback_triangles = triangle_count(readback_meshes[0])
    readback_materials = len(readback_meshes[0].data.materials)
    if readback_triangles != after_triangles or readback_materials != material_count:
        raise SystemExit("Optimized GLB readback did not preserve the decimated geometry/material counts.")

    report = {
        "status": "PASS",
        "blenderVersion": bpy.app.version_string,
        "source": str(source),
        "sourceSha256": source_sha,
        "sourceBytes": source.stat().st_size,
        "output": str(output),
        "outputSha256": sha256(output),
        "outputBytes": output.stat().st_size,
        "decimateRatio": args.ratio,
        "trianglesBefore": before_triangles,
        "trianglesAfter": after_triangles,
        "materials": material_count,
        "readback": {"meshes": len(readback_meshes), "triangles": readback_triangles, "materials": readback_materials},
        "draco": False,
    }
    output.with_suffix(".json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
