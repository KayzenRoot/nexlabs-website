"""Prepare locked-master edge and Blender depth-proxy maps for local ComfyUI studies."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil

from PIL import Image, ImageFilter, ImageOps


MASTER_RELATIVE = Path(
    ".engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/"
    "approved-home-visual-master.jpg"
)
MASTER_SHA256 = "d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647"
MASTER_INPUT_NAME = "nexlabs_approved_visual_master.jpg"
CANNY_INPUT_NAME = "nexlabs_approved_master_canny.png"
DEPTH_INPUT_NAME = "nexlabs_blender_candidate_depth_proxy.png"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def find_comfy_input(local_root: Path) -> Path:
    configured = os.environ.get("NEXLABS_COMFY_HOME")
    comfy_home = Path(configured) if configured else local_root / "ComfyUI"
    candidates = [
        comfy_home / "ComfyUI_windows_portable" / "ComfyUI",
        comfy_home / "ComfyUI",
        comfy_home,
    ]
    for candidate in candidates:
        input_dir = candidate / "input"
        if input_dir.is_dir():
            return input_dir.resolve()
    raise SystemExit("ComfyUI input directory was not found under the configured local root.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, default=Path(__file__).resolve().parents[2])
    parser.add_argument("--blender-depth", required=True, type=Path)
    args = parser.parse_args()

    repo_root = args.repo_root.resolve(strict=True)
    master = (repo_root / MASTER_RELATIVE).resolve(strict=True)
    if sha256(master) != MASTER_SHA256:
        raise SystemExit("The master image does not match its locked SHA-256.")

    depth_source = args.blender_depth.resolve(strict=True)
    try:
        depth_source.relative_to(repo_root)
    except ValueError:
        pass
    else:
        raise SystemExit("The Blender depth proxy must remain outside the repository.")

    local_root = Path(
        os.environ.get(
            "NEXLABS_VISUAL_LOCAL",
            str(Path(os.environ["LOCALAPPDATA"]) / "NexLabs" / "VisualPipeline"),
        )
    ).resolve()
    try:
        local_root.relative_to(repo_root)
    except ValueError:
        pass
    else:
        raise SystemExit("Local visual pipeline outputs must remain outside the repository.")

    input_dir = find_comfy_input(local_root)
    master_copy = input_dir / MASTER_INPUT_NAME
    canny_path = input_dir / CANNY_INPUT_NAME
    depth_copy = input_dir / DEPTH_INPUT_NAME
    shutil.copyfile(master, master_copy)

    with Image.open(master) as source:
        if source.size != (1600, 900):
            raise SystemExit(f"Locked master size changed unexpectedly: {source.size}.")
        edges = ImageOps.autocontrast(
            source.convert("L").filter(ImageFilter.FIND_EDGES),
            cutoff=2,
        ).point(lambda value: 255 if value >= 44 else 0)
        edges.convert("RGB").save(canny_path, format="PNG", optimize=True)

    shutil.copyfile(depth_source, depth_copy)
    if sha256(master_copy) != MASTER_SHA256:
        raise SystemExit("ComfyUI master input copy failed its locked SHA-256 check.")
    if sha256(depth_copy) != sha256(depth_source):
        raise SystemExit("ComfyUI depth-proxy copy changed the source SHA-256.")

    with Image.open(depth_copy) as depth_image:
        depth_size = list(depth_image.size)
    with Image.open(canny_path) as canny_image:
        canny_size = list(canny_image.size)

    evidence_dir = local_root / "evidence"
    evidence_dir.mkdir(parents=True, exist_ok=True)
    evidence = {
        "schemaVersion": 1,
        "status": "PASS",
        "outputLocation": "outside-repository",
        "master": {
            "sha256": MASTER_SHA256,
            "role": "locked art-direction reference; evidence and local generation input only",
            "runtimeUseAllowed": False,
        },
        "cannyControlMap": {
            "file": CANNY_INPUT_NAME,
            "sha256": sha256(canny_path),
            "size": canny_size,
            "derivation": "Pillow FIND_EDGES, autocontrast cutoff 2, fixed threshold 44",
        },
        "depthControlMap": {
            "file": DEPTH_INPUT_NAME,
            "sha256": sha256(depth_copy),
            "size": depth_size,
            "sourceRole": "Blender camera-projected object-bound depth proxy",
            "limitation": "coarse object-bound guidance; not a per-pixel renderer Z pass",
        },
        "customNodes": "disabled",
        "secretsIncluded": False,
    }
    manifest = evidence_dir / "control-map-manifest.json"
    manifest.write_text(json.dumps(evidence, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"status": "PASS", "canny": evidence["cannyControlMap"], "depth": evidence["depthControlMap"], "manifest": "outside-repository"}, indent=2))


if __name__ == "__main__":
    main()
