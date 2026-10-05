import { writeFileSync } from "node:fs";
import type { Page, PageScreenshotOptions } from "@playwright/test";

type EvidenceScreenshotOptions = PageScreenshotOptions & { path: string };

/** Writes a completed Playwright screenshot buffer to the evidence path without retries. */
export async function captureScreenshot(
  target: Page,
  { path, ...options }: EvidenceScreenshotOptions,
) {
  const screenshot = await target.screenshot(options);
  writeFileSync(path, screenshot);
}
