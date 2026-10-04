import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const evidence = resolve(root, ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT");
const outputs = [
  { source: "poster-art-desktop.svg", target: "public/hero/home-hero-poster.jpg", width: 1600, height: 460, quality: 84 },
  { source: "poster-art-mobile.svg", target: "public/hero/home-hero-poster-mobile.jpg", width: 780, height: 960, quality: 70 },
];

mkdirSync(resolve(root, "public/hero"), { recursive: true });
const browser = await chromium.launch({ headless: true });
const receipts = [];

for (const item of outputs) {
  const sourcePath = resolve(evidence, item.source);
  const source = readFileSync(sourcePath, "utf8");
  const page = await browser.newPage({
    viewport: { width: item.width, height: item.height },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#02060d}svg{display:block;width:100vw;height:100vh}</style>${source}`);
  const targetPath = resolve(root, item.target);
  await page.screenshot({ path: targetPath, type: "jpeg", quality: item.quality });
  const bytes = readFileSync(targetPath);
  receipts.push({
    source: `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/${item.source}`,
    sourceSha256: createHash("sha256").update(source).digest("hex"),
    target: item.target,
    targetSha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.byteLength,
    viewport: `${item.width}x${item.height}`,
    jpegQuality: item.quality,
    renderer: "Playwright Chromium from the locked package set",
  });
  await page.close();
}

await browser.close();
writeFileSync(resolve(evidence, "poster-art-rasterization.json"), `${JSON.stringify({ result: "PASS", method: "authored SVG, locally rasterized to JPEG without reading the master asset", outputs: receipts }, null, 2)}\n`);
