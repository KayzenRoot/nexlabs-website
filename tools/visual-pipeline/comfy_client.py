#!/usr/bin/env python3
"""Minimal localhost-only ComfyUI API client using Python stdlib."""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import time
import urllib.error
import urllib.parse
import urllib.request

BASE = os.environ.get("NEXLABS_COMFY_URL", "http://127.0.0.1:8188").rstrip("/")

def request(path: str, data: dict | None = None, timeout: int = 15):
    url = BASE + path
    body = None
    headers = {}
    if data is not None:
        body = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read()
        ctype = resp.headers.get("Content-Type", "")
        if "json" in ctype:
            return json.loads(raw.decode("utf-8"))
        return raw

def health() -> int:
    parsed = urllib.parse.urlparse(BASE)
    if parsed.hostname not in {"127.0.0.1", "localhost", "::1"}:
        raise SystemExit(f"Refusing non-local ComfyUI endpoint: {BASE}")
    try:
        request("/")
        print(json.dumps({"status": "PASS", "url": BASE, "localhost_only": True}))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "FAIL", "url": BASE, "error": str(exc)}))
        return 1

def queue(workflow_path: str, timeout: int) -> int:
    workflow = json.loads(pathlib.Path(workflow_path).read_text(encoding="utf-8"))
    result = request("/prompt", {"prompt": workflow})
    prompt_id = result.get("prompt_id")
    if not prompt_id:
        print(json.dumps({"status": "FAIL", "response": result}, indent=2))
        return 2
    deadline = time.time() + timeout
    while time.time() < deadline:
        hist = request(f"/history/{prompt_id}")
        if prompt_id in hist:
            print(json.dumps({"status": "PASS", "prompt_id": prompt_id, "history": hist[prompt_id]}, indent=2))
            return 0
        time.sleep(1.0)
    print(json.dumps({"status": "TIMEOUT", "prompt_id": prompt_id}))
    return 3

def main() -> int:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("health")
    q = sub.add_parser("queue")
    q.add_argument("workflow")
    q.add_argument("--timeout", type=int, default=900)
    a = p.parse_args()
    if a.cmd == "health":
        return health()
    return queue(a.workflow, a.timeout)

if __name__ == "__main__":
    raise SystemExit(main())
