import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import type { Page, PageScreenshotOptions } from "@playwright/test";

type EvidenceScreenshotOptions = PageScreenshotOptions & { path: string };

/** Redirects screenshots to a unique run directory when the candidate suite sets an evidence root. */
export function resolveEvidencePath(path: string) {
  const outputRoot = process.env.NEXLABS_EVIDENCE_ROOT;
  if (!outputRoot) return path;

  const absolutePath = resolve(path);
  const evidenceMarker = `${sep}.engineering${sep}evidence${sep}`;
  const markerIndex = absolutePath.toLowerCase().indexOf(evidenceMarker.toLowerCase());
  if (markerIndex < 0) return absolutePath;

  const evidenceRelativePath = absolutePath.slice(markerIndex + evidenceMarker.length);
  return resolve(outputRoot, evidenceRelativePath);
}

export function writeEvidenceBuffer(path: string, contents: Buffer) {
  const outputPath = resolveEvidencePath(path);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, contents);
}

/** Writes a completed Playwright screenshot buffer to the evidence path without retries. */
export async function captureScreenshot(
  target: Page,
  { path, ...options }: EvidenceScreenshotOptions,
) {
  const screenshot = await target.screenshot(options);
  writeEvidenceBuffer(path, screenshot);
}
