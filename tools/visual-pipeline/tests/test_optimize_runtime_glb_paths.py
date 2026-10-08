from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
import tempfile
import types
import unittest
from pathlib import Path
from unittest.mock import patch


SCRIPT = Path(__file__).resolve().parents[1] / "optimize-runtime-glb.py"
_bpy_stub = types.ModuleType("bpy")
_bpy_stub.types = types.SimpleNamespace(Object=object)

_spec = importlib.util.spec_from_file_location("optimize_runtime_glb", SCRIPT)
if _spec is None or _spec.loader is None:
    raise RuntimeError("Could not load the GLB optimizer for its path tests.")
_optimizer = importlib.util.module_from_spec(_spec)
with patch.dict(sys.modules, {"bpy": _bpy_stub}):
    _spec.loader.exec_module(_optimizer)


class SafeSourcePathTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.root = Path(self.temp_dir.name)
        self.repo_root = self.root / "repository"
        self.repo_root.mkdir()
        self.visual_root = self.root / "visual-pipeline"
        self.generated_root = self.visual_root / "generated"
        self.generated_root.mkdir(parents=True)
        self.env = patch.dict(os.environ, {"NEXLABS_VISUAL_LOCAL": str(self.visual_root)})
        self.env.start()
        self.addCleanup(self.env.stop)

    def test_accepts_regular_glb_inside_generated_root(self) -> None:
        source = self.generated_root / "candidate" / "hero.glb"
        source.parent.mkdir()
        source.write_bytes(b"glTF")

        self.assertEqual(_optimizer.safe_source_path(source, self.repo_root), source.resolve())

    def test_rejects_glb_outside_generated_root(self) -> None:
        outside_source = self.visual_root / "outside.glb"
        outside_source.write_bytes(b"glTF")
        source = self.generated_root / ".." / "outside.glb"

        with self.assertRaisesRegex(SystemExit, "generated directory"):
            _optimizer.safe_source_path(source, self.repo_root)

    def test_rejects_non_glb_file_inside_generated_root(self) -> None:
        source = self.generated_root / "candidate.png"
        source.write_bytes(b"not a GLB")

        with self.assertRaisesRegex(SystemExit, "regular .glb"):
            _optimizer.safe_source_path(source, self.repo_root)

    def test_rejects_path_resolving_outside_generated_root(self) -> None:
        outside = self.root / "outside.glb"
        outside.write_bytes(b"glTF")
        source_alias = self.generated_root / "linked.glb"
        source_alias.write_bytes(b"glTF")
        resolved_outside = outside.resolve()
        real_resolve = Path.resolve

        def resolve_path(path: Path, strict: bool = False) -> Path:
            if path == source_alias:
                return resolved_outside
            return real_resolve(path, strict=strict)

        with patch.object(Path, "resolve", autospec=True, side_effect=resolve_path):
            with self.assertRaisesRegex(SystemExit, "generated directory"):
                _optimizer.safe_source_path(source_alias, self.repo_root)

    def test_rejects_generated_root_inside_repository(self) -> None:
        repo_visual_root = self.repo_root / "VisualPipeline"
        repo_generated = repo_visual_root / "generated"
        repo_generated.mkdir(parents=True)
        source = repo_generated / "candidate.glb"
        source.write_bytes(b"glTF")
        with patch.dict(os.environ, {"NEXLABS_VISUAL_LOCAL": str(repo_visual_root)}):
            with self.assertRaisesRegex(SystemExit, "outside the Git repository"):
                _optimizer.safe_source_path(source, self.repo_root)

    def test_rejects_preexisting_hard_link_outputs(self) -> None:
        local_data = self.root / "local-app-data"
        local_data.mkdir()
        output_root = local_data / "NexLabs" / "VisualPipeline" / "optimized"
        output_root.mkdir(parents=True)
        sentinel = self.root / "protected.txt"
        sentinel.write_text("preserve", encoding="utf-8")
        report = output_root / "hero-lab-structure-r17-optimized.json"
        try:
            os.link(sentinel, report)
        except OSError as error:
            self.skipTest(f"Hard-link creation is unavailable: {error}")

        with patch.dict(os.environ, {"LOCALAPPDATA": str(local_data)}):
            with self.assertRaisesRegex(SystemExit, "hard-linked"):
                _optimizer.safe_output_path(self.repo_root)
        self.assertEqual(sentinel.read_text(encoding="utf-8"), "preserve")

    def test_publish_replaces_raced_hard_links_without_following_targets(self) -> None:
        local_data = self.root / "local-app-data"
        local_data.mkdir()
        output_root = local_data / "NexLabs" / "VisualPipeline" / "optimized"
        sentinel_output = self.root / "protected-output.txt"
        sentinel_report = self.root / "protected-report.txt"
        sentinel_output.write_text("keep output", encoding="utf-8")
        sentinel_report.write_text("keep report", encoding="utf-8")
        staged_output = self.root / "staged-output.glb"
        staged_report = self.root / "staged-report.json"
        staged_output.write_bytes(b"new glb")
        staged_report.write_text("new report", encoding="utf-8")
        real_replace = os.replace
        output = output_root / "hero-lab-structure-r17-optimized.glb"
        report = output.with_suffix(".json")

        def plant_link_before_replace(source: Path, destination: Path) -> None:
            try:
                os.link(sentinel_output if destination == output else sentinel_report, destination)
            except OSError as error:
                self.skipTest(f"Hard-link creation is unavailable: {error}")
            real_replace(source, destination)

        with patch.dict(os.environ, {"LOCALAPPDATA": str(local_data)}):
            with patch.object(os, "replace", side_effect=plant_link_before_replace):
                output = _optimizer.publish_outputs(staged_output, staged_report, self.repo_root)

        self.assertEqual(output.read_bytes(), b"new glb")
        self.assertEqual(output.with_suffix(".json").read_text(encoding="utf-8"), "new report")
        self.assertEqual(sentinel_output.read_text(encoding="utf-8"), "keep output")
        self.assertEqual(sentinel_report.read_text(encoding="utf-8"), "keep report")

    @unittest.skipUnless(os.name == "nt", "Windows junctions are required.")
    def test_rechecks_output_path_before_publish_after_junction_swap(self) -> None:
        local_data = self.root / "local-app-data"
        local_data.mkdir()
        nex_labs = local_data / "NexLabs"
        output_root = nex_labs / "VisualPipeline" / "optimized"
        output_root.mkdir(parents=True)
        outside = self.root / "outside-target"
        outside.mkdir()
        staged_output = self.root / "staged-output.glb"
        staged_report = self.root / "staged-report.json"
        staged_output.write_bytes(b"candidate")
        staged_report.write_text("candidate report", encoding="utf-8")

        with patch.dict(os.environ, {"LOCALAPPDATA": str(local_data)}):
            _optimizer.safe_output_path(self.repo_root)

        original_nex_labs = local_data / "NexLabs-original"
        os.rename(nex_labs, original_nex_labs)
        result = subprocess.run(
            ["cmd.exe", "/d", "/c", "mklink", "/J", str(nex_labs), str(outside)],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            os.rename(original_nex_labs, nex_labs)
            self.skipTest(f"Could not create a temporary junction: {result.stderr or result.stdout}")

        try:
            with patch.dict(os.environ, {"LOCALAPPDATA": str(local_data)}):
                with self.assertRaisesRegex(SystemExit, "reparse point"):
                    _optimizer.publish_outputs(staged_output, staged_report, self.repo_root)
            self.assertFalse((outside / "VisualPipeline").exists())
            self.assertTrue(staged_output.exists())
        finally:
            os.rmdir(nex_labs)
            os.rename(original_nex_labs, nex_labs)


if __name__ == "__main__":
    unittest.main()
