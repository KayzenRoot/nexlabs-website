import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

const screenshotDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-003-RUNTIME-FOUNDATION/screenshots",
);

test("Home renders without horizontal overflow and retains desktop/mobile screenshots", async ({
  page,
}) => {
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  await page.goto("/");
  await expect(page).toHaveTitle(/Nex Labs Technology/i);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /technology for what comes next/i,
    }),
  ).toBeVisible();

  const unresolvedAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => (link as HTMLAnchorElement).hash.slice(1))
      .filter((id) => !document.getElementById(id)),
  );
  expect(unresolvedAnchors).toEqual([]);
  await expect(page.locator("canvas")).toHaveCount(0);

  mkdirSync(screenshotDirectory, { recursive: true });
  for (const viewport of [
    { width: 390, height: 844, name: "mobile-390x844" },
    { width: 1440, height: 900, name: "desktop-1440x900" },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow, `${viewport.name} horizontal overflow`).toBe(false);
    await page.screenshot({
      path: resolve(screenshotDirectory, `home-${viewport.name}.png`),
      fullPage: false,
      animations: "disabled",
    });
  }

  expect(browserErrors).toEqual([]);
});

test("skip link and keyboard focus are visible and usable", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  const focusRing = await skipLink.evaluate((link) => getComputedStyle(link).boxShadow);
  expect(focusRing).not.toBe("none");

  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await expect(page.getByRole("link", { name: /explore the project/i })).toBeVisible();
});

test("reduced motion keeps the static Home composition usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /technology for what comes next/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /contact nex labs/i })).toBeVisible();
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
    true,
  );

  const duration = await page
    .getByRole("link", { name: /contact nex labs/i })
    .evaluate((link) => getComputedStyle(link).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.0001);
});

test("Home has no automated accessibility violations", async ({ page }) => {
  await page.goto("/");
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
});
