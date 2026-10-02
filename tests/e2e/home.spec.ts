import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

const screenshotDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-006-BRAND-INTEGRATION",
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
    page.getByRole("link", { name: "Nex Labs Technology — home" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Nex Labs Technology — back to home" })).toBeVisible();
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
    "href",
    "/brand/nex-n-precision-blades-mono-dark.svg",
  );
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
      fullPage: true,
      animations: "disabled",
    });

    if (viewport.width === 1440) {
      await page.locator("header").screenshot({
        path: resolve(screenshotDirectory, "header-desktop-1440x900.png"),
        animations: "disabled",
      });
      await page.locator("footer").screenshot({
        path: resolve(screenshotDirectory, "footer-desktop-1440x900.png"),
        animations: "disabled",
      });
    }
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
  await page.setViewportSize({ width: 1440, height: 900 });
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
  await expect(page.locator("header svg path").first()).toHaveCSS("animation-name", "none");
  mkdirSync(screenshotDirectory, { recursive: true });
  await page.screenshot({
    path: resolve(screenshotDirectory, "home-reduced-motion-desktop-1440x900.png"),
    fullPage: false,
    animations: "disabled",
  });
});

test("16px and 24px monochrome marks load and retain the favicon silhouette", async ({ page }) => {
  mkdirSync(screenshotDirectory, { recursive: true });
  await page.goto("/");
  const origin = new URL(page.url()).origin;
  await page.setContent(`
    <main style="display:grid;grid-template-columns:repeat(2,max-content);gap:24px;padding:24px;background:#090d13;color:#f3f6fb;font:12px Arial,sans-serif">
      <section style="display:flex;align-items:center;gap:8px;padding:12px;background:#fff;color:#111820"><span>Mono light · 16 px</span><img width="16" height="16" src="${origin}/brand/nex-n-precision-blades-mono-light.svg" alt="" /></section>
      <section style="display:flex;align-items:center;gap:8px;padding:12px;background:#fff;color:#111820"><span>Mono light · 24 px</span><img width="24" height="24" src="${origin}/brand/nex-n-precision-blades-mono-light.svg" alt="" /></section>
      <section style="display:flex;align-items:center;gap:8px;padding:12px;background:#090d13;color:#f3f6fb"><span>Mono dark · 16 px</span><img width="16" height="16" src="${origin}/brand/nex-n-precision-blades-mono-dark.svg" alt="" /></section>
      <section style="display:flex;align-items:center;gap:8px;padding:12px;background:#090d13;color:#f3f6fb"><span>Mono dark · 24 px</span><img width="24" height="24" src="${origin}/brand/nex-n-precision-blades-mono-dark.svg" alt="" /></section>
    </main>
  `);
  const marks = page.locator("main img");
  await expect(marks).toHaveCount(4);
  for (const mark of await marks.all()) {
    const imageState = await mark.evaluate((image: HTMLImageElement) => ({
      loaded: image.complete && image.naturalWidth > 0,
      width: image.getBoundingClientRect().width,
      height: image.getBoundingClientRect().height,
    }));
    expect(imageState.loaded).toBe(true);
    expect(imageState.width).toBe(Number(await mark.getAttribute("width")));
    expect(imageState.height).toBe(Number(await mark.getAttribute("height")));
    await expect(mark).toBeVisible();
  }
  await page.screenshot({
    path: resolve(screenshotDirectory, "monochrome-marks-16px-24px.png"),
    animations: "disabled",
  });
});

test("horizontal lockups and the chrome-blue treatment load as the selected identity", async ({
  page,
}) => {
  mkdirSync(screenshotDirectory, { recursive: true });
  await page.goto("/");
  const origin = new URL(page.url()).origin;
  await page.setContent(`
    <main style="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:24px;background:#090d13;color:#f3f6fb;font:12px Arial,sans-serif">
      <section style="display:grid;gap:8px;align-content:start;padding:18px;background:#fff;color:#111820"><span>Horizontal lockup · light</span><img width="360" height="88" src="${origin}/brand/nex-labs-horizontal-light.svg" alt="Nex Labs" /></section>
      <section style="display:grid;gap:8px;align-content:start;padding:18px;background:#090d13;color:#f3f6fb"><span>Horizontal lockup · dark</span><img width="360" height="88" src="${origin}/brand/nex-labs-horizontal-dark.svg" alt="Nex Labs" /></section>
      <section style="display:grid;gap:8px;align-content:start;padding:18px;background:#fff;color:#111820"><span>Extended lockup · light</span><img width="368" height="94" src="${origin}/brand/nex-labs-technology-extended-light.svg" alt="Nex Labs Technology" /></section>
      <section style="display:grid;gap:8px;align-content:start;padding:18px;background:#090d13;color:#f3f6fb"><span>Extended lockup · dark</span><img width="368" height="94" src="${origin}/brand/nex-labs-technology-extended-dark.svg" alt="Nex Labs Technology" /></section>
      <section style="display:grid;grid-column:1/-1;justify-items:center;gap:8px;padding:18px;background:radial-gradient(ellipse,#27313f,#090d13 70%);color:#f3f6fb"><span>Chrome and electric-blue presentation</span><img width="180" height="180" src="${origin}/brand/nex-n-precision-blades-chrome-blue.svg" alt="Nex Labs chrome-blue N" /></section>
    </main>
  `);
  const marks = page.locator("main img");
  await expect(marks).toHaveCount(5);
  for (const mark of await marks.all()) {
    await expect(mark).toBeVisible();
    expect(
      await mark.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    ).toBe(true);
  }
  await page.screenshot({
    path: resolve(screenshotDirectory, "lockups-and-chrome-blue.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("Home has no automated accessibility violations", async ({ page }) => {
  await page.goto("/");
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
});
