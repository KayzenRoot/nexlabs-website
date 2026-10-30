"""Generate deterministic ComfyUI API workflows for the WO-013 visual study."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil


MASTER_RELATIVE = Path(
    ".engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/"
    "approved-home-visual-master.jpg"
)
MASTER_SHA256 = "d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647"
CHECKPOINT = "sd_xl_base_1.0.safetensors"
MASTER_INPUT_NAME = "nexlabs_approved_visual_master.jpg"
MASTER_CANNY_INPUT_NAME = "nexlabs_approved_master_canny.png"
BLENDER_DEPTH_INPUT_NAME = "nexlabs_blender_candidate_depth_proxy.png"
CANNY_CONTROLNET = "controlnet-canny-sdxl-1.0.fp16.safetensors"
DEPTH_CONTROLNET = "controlnet-depth-sdxl-1.0-small.fp16.safetensors"


def _save_graph(directory: Path, name: str, graph: dict[str, dict]) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    (directory / name).write_text(
        json.dumps(graph, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def _text_to_image(
    positive: str,
    *,
    seed: int,
    width: int,
    height: int,
    steps: int,
    prefix: str,
    negative: str = (
        "low resolution, flat icon, thin line drawing, cheap plastic, "
        "flat white floor, empty composition, text, typography, watermark, "
        "fake dashboards, extra logos, duplicated objects, oversaturated glow"
    ),
) -> dict[str, dict]:
    return {
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": CHECKPOINT},
        },
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": positive, "clip": ["1", 1]},
        },
        "3": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": negative, "clip": ["1", 1]},
        },
        "4": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": width, "height": height, "batch_size": 1},
        },
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": steps,
                "cfg": 5.5,
                "sampler_name": "euler",
                "scheduler": "normal",
                "denoise": 1.0,
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
            },
        },
        "6": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["5", 0], "vae": ["1", 2]},
        },
        "7": {
            "class_type": "SaveImage",
            "inputs": {"filename_prefix": prefix, "images": ["6", 0]},
        },
    }


def _capability_graph() -> dict[str, dict]:
    subjects = [
        (
            "AI neural lattice",
            "a sculptural brain-like neural lattice, many fine metallic neural filaments and precise cyan nodes, dimensional hologram",
            231003,
        ),
        (
            "intelligent infrastructure",
            "a floating stack of layered precision-machined glass and chrome plates, luminous cyan data layers, volumetric hologram",
            231017,
        ),
        (
            "advanced interfaces",
            "a luminous network globe with precise geodesic cyan nodes and fine orbital routes, layered volumetric hologram",
            231029,
        ),
        (
            "sustainable technologies",
            "a polished energy torus with two concentric chrome rings and a bright cyan energy filament, dimensional hologram",
            231043,
        ),
        (
            "research platforms",
            "a faceted crystalline research object with sharp geometric planes, internal blue-white refraction and chrome edges",
            231059,
        ),
    ]
    graph: dict[str, dict] = {
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": CHECKPOINT},
        },
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": "thin outline icon, flat glyph, text, letters, logo, watermark, background scene, multiple objects, cheap plastic",
                "clip": ["1", 1],
            },
        },
        "3": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": 640, "height": 640, "batch_size": 1},
        },
    }
    for index, (label, description, seed) in enumerate(subjects):
        base = 100 + index * 4
        graph[str(base)] = {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": (
                    f"{description}, isolated centered object, black void background, "
                    "premium cinematic technology art direction, cold blue-white highlights, "
                    "controlled cyan energy, elegant, refined, high contrast, no typography"
                ),
                "clip": ["1", 1],
            },
        }
        graph[str(base + 1)] = {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": 14,
                "cfg": 5.5,
                "sampler_name": "euler",
                "scheduler": "normal",
                "denoise": 1.0,
                "model": ["1", 0],
                "positive": [str(base), 0],
                "negative": ["2", 0],
                "latent_image": ["3", 0],
            },
        }
        graph[str(base + 2)] = {
            "class_type": "VAEDecode",
            "inputs": {"samples": [str(base + 1), 0], "vae": ["1", 2]},
        }
        graph[str(base + 3)] = {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": f"nexlabs_wo013_capability_{index + 1}",
                "images": [str(base + 2), 0],
            },
        }
    return graph


def _master_style_graph() -> dict[str, dict]:
    graph = _text_to_image(
        (
            "Refine the supplied composition reference into a cinematic premium technology laboratory. "
            "Preserve the major left editorial block, the central monumental chrome N sculpture, "
            "the concentric cylindrical chamber, dark metallic circular platform, blue-white energy "
            "rails, and the network globe. Make the architecture volumetric and physically layered. "
            "No readable text, no invented labels, no watermark, do not invent additional logos."
        ),
        seed=231101,
        width=768,
        height=432,
        steps=12,
        prefix="nexlabs_wo013_master_style",
    )
    graph["8"] = {
        "class_type": "LoadImage",
        "inputs": {"image": MASTER_INPUT_NAME},
    }
    graph["9"] = {
        "class_type": "ImageScale",
        "inputs": {
            "upscale_method": "lanczos",
            "width": 768,
            "height": 432,
            "crop": "disabled",
            "image": ["8", 0],
        },
    }
    graph["10"] = {
        "class_type": "VAEEncode",
        "inputs": {"pixels": ["9", 0], "vae": ["1", 2]},
    }
    graph["11"] = {
        "class_type": "LoadImage",
        "inputs": {"image": MASTER_CANNY_INPUT_NAME},
    }
    graph["12"] = {
        "class_type": "ImageScale",
        "inputs": {
            "upscale_method": "lanczos",
            "width": 768,
            "height": 432,
            "crop": "disabled",
            "image": ["11", 0],
        },
    }
    graph["13"] = {
        "class_type": "ControlNetLoader",
        "inputs": {"control_net_name": CANNY_CONTROLNET},
    }
    graph["14"] = {
        "class_type": "ControlNetApplyAdvanced",
        "inputs": {
            "positive": ["2", 0],
            "negative": ["3", 0],
            "control_net": ["13", 0],
            "image": ["12", 0],
            "strength": 0.42,
            "start_percent": 0.0,
            "end_percent": 0.72,
            "vae": ["1", 2],
        },
    }
    graph["5"]["inputs"]["denoise"] = 0.3
    graph["5"]["inputs"]["latent_image"] = ["10", 0]
    graph["5"]["inputs"]["positive"] = ["14", 0]
    graph["5"]["inputs"]["negative"] = ["14", 1]
    return graph


def _master_style_reference_only_graph() -> dict[str, dict]:
    """Low-denoise full-frame master study; output remains local/reference-only."""
    graph = _text_to_image(
        (
            "Art-direction study of the supplied full-frame approved website reference. "
            "Keep the broad composition zones: left editorial area, central monumental "
            "chrome N in a cylindrical chamber, dark circular platform, network Earth, "
            "smoked-glass panels, lower capability band and two connected laboratory "
            "worlds. Refine physical depth and cold blue-white lighting. Do not preserve "
            "or invent readable text, labels, claims, logos, metrics or interface copy. "
            "This is a private design reference only, never a production image."
        ),
        seed=231401,
        width=768,
        height=432,
        steps=16,
        prefix="nexlabs_wo013_master_reference_only",
        negative=(
            "readable text, typography, watermark, invented logo, extra letters, fake dashboard, "
            "bright white floor, empty black void, flat icon, cheap plastic, oversaturated glow"
        ),
    )
    graph["8"] = {
        "class_type": "LoadImage",
        "inputs": {"image": MASTER_INPUT_NAME},
    }
    graph["9"] = {
        "class_type": "ImageScale",
        "inputs": {
            "upscale_method": "lanczos",
            "width": 768,
            "height": 432,
            "crop": "disabled",
            "image": ["8", 0],
        },
    }
    graph["10"] = {
        "class_type": "VAEEncode",
        "inputs": {"pixels": ["9", 0], "vae": ["1", 2]},
    }
    graph["5"]["inputs"]["denoise"] = 0.28
    graph["5"]["inputs"]["latent_image"] = ["10", 0]
    return graph


def _depth_guided_text_to_image(
    positive: str,
    *,
    seed: int,
    width: int,
    height: int,
    steps: int,
    prefix: str,
) -> dict[str, dict]:
    graph = _text_to_image(
        positive,
        seed=seed,
        width=width,
        height=height,
        steps=steps,
        prefix=prefix,
    )
    graph["8"] = {
        "class_type": "LoadImage",
        "inputs": {"image": BLENDER_DEPTH_INPUT_NAME},
    }
    graph["9"] = {
        "class_type": "ImageScale",
        "inputs": {
            "upscale_method": "lanczos",
            "width": width,
            "height": height,
            "crop": "disabled",
            "image": ["8", 0],
        },
    }
    graph["10"] = {
        "class_type": "ControlNetLoader",
        "inputs": {"control_net_name": DEPTH_CONTROLNET},
    }
    graph["11"] = {
        "class_type": "ControlNetApplyAdvanced",
        "inputs": {
            "positive": ["2", 0],
            "negative": ["3", 0],
            "control_net": ["10", 0],
            "image": ["9", 0],
            "strength": 0.58,
            "start_percent": 0.0,
            "end_percent": 0.78,
            "vae": ["1", 2],
        },
    }
    graph["5"]["inputs"]["positive"] = ["11", 0]
    graph["5"]["inputs"]["negative"] = ["11", 1]
    return graph


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--copy-master",
        action="store_true",
        help="Copy the locked visual master into ComfyUI's local input directory for the img2img study.",
    )
    parser.add_argument(
        "--copy-depth",
        type=Path,
        help="Copy an outside-repository Blender depth proxy into ComfyUI's local input folder.",
    )
    args = parser.parse_args()

    repository_root = Path(__file__).resolve().parents[2]
    workflow_dir = Path(__file__).resolve().parent / "workflows"
    _save_graph(
        workflow_dir,
        "hero_lab_concept.json",
        _depth_guided_text_to_image(
            (
                "Wide cinematic technology laboratory, dark graphite metallic cylindrical chamber, "
                "a monumental three-dimensional chrome N sculpture in the center, cold white and "
                "electric-blue axial light, multiple concentric upper and lower rings, deep circular "
                "metal floor with luminous concentric rails, a luminous network Earth, floating "
                "glass holographic panels, one subtle human scale cue, deep atmospheric occlusion, "
                "premium realistic materials, no readable text, no invented product labels"
            ),
            seed=231137,
            width=768,
            height=432,
            steps=16,
            prefix="nexlabs_wo013_hero_lab",
        ),
    )
    _save_graph(
        workflow_dir,
        "hero_lab_backdrop.json",
        _text_to_image(
            (
                "A seamless 360-degree equirectangular lat-long environment map, exact 2:1 panorama, "
                "viewpoint centered inside a photoreal high-end AI research laboratory. Wraparound dark "
                "graphite and midnight-blue architecture, curved segmented wall bays, layered vertical "
                "chrome support ribs, deep side alcoves and distant instrument consoles with tiny abstract "
                "cyan indicators. A tall open cylindrical chamber with luminous upper and lower ring lights "
                "surrounds an entirely empty central volume for a separately rendered sculpture. The floor "
                "is dark polished graphite, mostly black, with fine cyan and ice-white concentric inlays and "
                "narrow controlled reflections; no broad pale surface. Cold axial light shafts, smoked-glass "
                "panels, restrained energy filaments and sparse fine particles create layered depth and "
                "realistic material response. Premium cinematic lighting, dense but legible environment, "
                "balanced exposure, continuous architecture across the left and right panorama edges. "
                "No person, no central sculpture, no N, no logo, no text, no signs, no letters, no words, "
                "no readable interface, no fisheye, no split-screen."
            ),
            seed=231307,
            width=1024,
            height=512,
            steps=20,
            prefix="nexlabs_wo013_hero_environment_360",
            negative=(
                "bright white floor, pale gray floor, beige floor, daylight, overexposed, washed out, "
                "blank studio, minimal empty room, flat wall, no depth, fisheye, wide empty foreground, "
                "large central sculpture, logo, N letter, people, readable text, signage, fake dashboard, "
                "watermark, duplicated ceiling rings, clutter, neon oversaturation, cheap plastic, "
                "non panoramic perspective, seams, black border, circular fisheye projection"
            ),
        ),
    )
    _save_graph(workflow_dir, "capability_icon_concepts.json", _capability_graph())
    _save_graph(
        workflow_dir,
        "material_texture_concepts.json",
        _text_to_image(
            (
                "Close-up material study of cold polished chrome bevels, dark smoked glass, "
                "cyan light filaments reflected in curved metallic surfaces, deep graphite "
                "laboratory environment, physically based highlights, elegant controlled glow, "
                "no text, no logo, no flat white background"
            ),
            seed=231173,
            width=640,
            height=640,
            steps=14,
            prefix="nexlabs_wo013_material",
        ),
    )
    reference_studies = [
        (
            "chrome_n_material.json",
            (
                "A monumental three-dimensional precision-blades N sculpture made of cold polished chrome, "
                "deep beveled thickness, blue edge light and white chamber reflections, centered inside "
                "a dark cylindrical laboratory, premium physical material study, no text, no watermark"
            ),
            231211,
            "nexlabs_wo013_chrome_n",
        ),
        (
            "earth_panels_floor.json",
            (
                "A large luminous Earth network globe suspended in a deep graphite technology laboratory, "
                "layered smoked-glass holographic panels with restrained cyan light, dark concentric metal "
                "floor platform and illuminated circular rails, rich depth occlusion, no labels or text"
            ),
            231227,
            "nexlabs_wo013_earth_panels_floor",
        ),
        (
            "research_lower_world.json",
            (
                "Wide cinematic lower section of a premium technology laboratory, a dominant luminous "
                "network Earth, layered research panels and structural rails, a single subtle human-scale "
                "silhouette in the distance, deep blue-black atmosphere, no text, no invented branding"
            ),
            231239,
            "nexlabs_wo013_research_world",
        ),
        (
            "technology_stack.json",
            (
                "A monumental floating stack of layered precision-engineered glass and dark chrome "
                "technology plates above a circular laboratory plinth, luminous cyan rails connecting "
                "the layers, cinematic depth, elegant volumetric light, no text or labels"
            ),
            231251,
            "nexlabs_wo013_technology_stack",
        ),
        (
            "static_poster_fallback.json",
            (
                "Static cinematic poster composition for a technology laboratory hero, dark cylindrical "
                "chamber, monumental beveled chrome N sculpture, concentric blue-white light rings, "
                "metallic circular floor, restrained energy filaments, no text, no watermark, no fake UI"
            ),
            231263,
            "nexlabs_wo013_static_poster",
        ),
    ]
    for name, positive, seed, prefix in reference_studies:
        _save_graph(
            workflow_dir,
            name,
            _text_to_image(
                positive,
                seed=seed,
                width=768,
                height=512,
                steps=12,
                prefix=prefix,
            ),
        )
    _save_graph(workflow_dir, "master_style_img2img_sdxl.json", _master_style_graph())
    _save_graph(
        workflow_dir,
        "master_style_reference_only.json",
        _master_style_reference_only_graph(),
    )

    if args.copy_master:
        master = repository_root / MASTER_RELATIVE
        digest = hashlib.sha256(master.read_bytes()).hexdigest()
        if digest != MASTER_SHA256:
            raise SystemExit("The repository master image does not match the locked SHA-256.")
        local_root = Path(
            os.environ.get(
                "NEXLABS_VISUAL_LOCAL",
                str(Path(os.environ["LOCALAPPDATA"]) / "NexLabs" / "VisualPipeline"),
            )
        )
        comfy_home = Path(
            os.environ.get("NEXLABS_COMFY_HOME", str(local_root / "ComfyUI"))
        )
        candidates = [
            comfy_home / "ComfyUI_windows_portable" / "ComfyUI",
            comfy_home / "ComfyUI",
            comfy_home,
        ]
        comfy_root = next((path for path in candidates if (path / "input").is_dir()), None)
        if comfy_root is None:
            raise SystemExit("ComfyUI input directory was not found under the local ComfyUI root.")
        target = comfy_root / "input" / MASTER_INPUT_NAME
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(master, target)
        if hashlib.sha256(target.read_bytes()).hexdigest() != MASTER_SHA256:
            raise SystemExit("Local ComfyUI master copy did not preserve the locked fingerprint.")

    if args.copy_depth:
        depth_source = args.copy_depth.resolve(strict=True)
        try:
            depth_source.relative_to(repository_root.resolve())
        except ValueError:
            pass
        else:
            raise SystemExit("The Blender depth proxy must remain outside the repository.")
        local_root = Path(
            os.environ.get(
                "NEXLABS_VISUAL_LOCAL",
                str(Path(os.environ["LOCALAPPDATA"]) / "NexLabs" / "VisualPipeline"),
            )
        )
        comfy_home = Path(os.environ.get("NEXLABS_COMFY_HOME", str(local_root / "ComfyUI")))
        candidates = [
            comfy_home / "ComfyUI_windows_portable" / "ComfyUI",
            comfy_home / "ComfyUI",
            comfy_home,
        ]
        comfy_root = next((path for path in candidates if (path / "input").is_dir()), None)
        if comfy_root is None:
            raise SystemExit("ComfyUI input directory was not found under the local ComfyUI root.")
        target = comfy_root / "input" / BLENDER_DEPTH_INPUT_NAME
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(depth_source, target)
        if hashlib.sha256(target.read_bytes()).hexdigest() != hashlib.sha256(depth_source.read_bytes()).hexdigest():
            raise SystemExit("Local ComfyUI depth proxy copy did not preserve the source fingerprint.")

    print(
        json.dumps(
            {
                "status": "PASS",
                "workflows": sorted(path.name for path in workflow_dir.glob("*.json")),
                "masterCopiedToComfyInput": args.copy_master,
                "masterInputName": MASTER_INPUT_NAME if args.copy_master else None,
                "depthInputName": BLENDER_DEPTH_INPUT_NAME if args.copy_depth else None,
                "allSeedsFixed": True,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
