import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test, type Browser, type Page } from "@playwright/test";

const evidenceDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT",
);
const masterPath = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg",
);
const masterBytes = readFileSync(masterPath);
const expectedMasterSha256 = "d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647";

function saveJson(name: string, value: unknown) {
  writeFileSync(resolve(evidenceDirectory, name), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function capture(page: Page, name: string, fullPage = false) {
  await page.screenshot({ path: resolve(evidenceDirectory, name), fullPage, animations: "disabled", caret: "hide" });
}

async function settleResponsiveLayout(page: Page) {
  await page.evaluate(() => new Promise<void>((resolveFrame) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolveFrame()));
  }));
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    document.documentElement.getBoundingClientRect();
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

async function compositeComparison(
  browser: Browser,
  name: string,
  candidateBytes: Buffer,
  masterCrop: { x: number; y: number; width: number; height: number },
) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  const masterBase64 = masterBytes.toString("base64");
  const candidateBase64 = candidateBytes.toString("base64");
  const { x, y, width, height } = masterCrop;
  const rowHeight = height;
  const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}" preserveAspectRatio="none"><image href="data:image/jpeg;base64,${masterBase64}" x="0" y="0" width="1600" height="900"/></svg>`;
  await page.setViewportSize({ width: 1600, height: Math.max(220, rowHeight * 2 + 110) });
  await page.setContent(`<!doctype html><html><head><style>*{box-sizing:border-box}html,body{margin:0;background:#030812;color:#dff7ff;font:600 14px Arial,sans-serif}main{width:1600px;padding:12px;display:grid;grid-template-columns:1fr;gap:10px}figure{margin:0;overflow:hidden;border:1px solid #287eb5;background:#061326}figcaption{height:28px;padding:7px 10px;letter-spacing:.12em;text-transform:uppercase;background:#081a30}img,svg{display:block;width:100%;height:${rowHeight}px;object-fit:cover;object-position:top}</style></head><body><main><figure><figcaption>Approved master · evidence only</figcaption>${masterSvg}</figure><figure><figcaption>Current candidate · ${name}</figcaption><img src="data:image/png;base64,${candidateBase64}" alt=""/></figure></main></body></html>`);
  await page.screenshot({ path: resolve(evidenceDirectory, name), animations: "disabled", fullPage: true });
  await page.close();
}

test("WO-013 deterministic visual, responsive, motion and comparison evidence", async ({ browser, page }) => {
  test.setTimeout(180_000);
  mkdirSync(evidenceDirectory, { recursive: true });
  const actualHash = createHash("sha256").update(masterBytes).digest("hex");
  expect(actualHash).toBe(expectedMasterSha256);

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const homeResponse = await page.goto("/", { waitUntil: "networkidle" });
  expect(homeResponse?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: /human potential multiplied/i })).toBeVisible();
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();
  await expect(page.locator("#capabilities article")).toHaveCount(5);
  await page.screenshot({ path: resolve(evidenceDirectory, "candidate-home-1600x900.png"), animations: "disabled", caret: "hide" });

  const activePage = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  await activePage.goto("/technology", { waitUntil: "networkidle" });
  const technologyLink = activePage.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Technology" });
  await expect(technologyLink).toHaveAttribute("aria-current", "page");
  const headerBox = await activePage.locator("header").first().boundingBox();
  expect(headerBox).not.toBeNull();
  const headerCapture = await activePage.screenshot({ clip: { x: 0, y: 0, width: 1600, height: Math.ceil(headerBox?.height ?? 68) }, animations: "disabled" });
  await writeFileSync(resolve(evidenceDirectory, "candidate-header-active-technology.png"), headerCapture);
  await compositeComparison(browser, "master-vs-candidate-header.png", headerCapture, { x: 0, y: 0, width: 1600, height: 64 });
  await capture(activePage, "technology-1600x900.png");
  await activePage.close();

  const capability = page.locator("#capabilities");
  await capability.scrollIntoViewIfNeeded();
  const capabilityCapture = await capability.screenshot({ animations: "disabled" });
  await writeFileSync(resolve(evidenceDirectory, "capabilities-five-objects.png"), capabilityCapture);
  await compositeComparison(browser, "master-vs-candidate-capabilities.png", capabilityCapture, { x: 0, y: 438, width: 1600, height: 188 });

  const lowerWorld = page.locator('[data-world-reveal="narrative"]');
  await lowerWorld.scrollIntoViewIfNeeded();
  const lowerCapture = await lowerWorld.screenshot({ animations: "disabled" });
  await writeFileSync(resolve(evidenceDirectory, "home-lower-research-technology.png"), lowerCapture);
  await compositeComparison(browser, "master-vs-candidate-lower-home.png", lowerCapture, { x: 0, y: 624, width: 1600, height: 214 });
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.setViewportSize({ width: 1440, height: 900 });
  await capture(page, "candidate-home-1440x900.png");
  await page.setViewportSize({ width: 1600, height: 900 });
  await capture(page, "candidate-home-full-page-1600.png", true);
  await page.setViewportSize({ width: 390, height: 844 });
  await settleResponsiveLayout(page);
  const responsiveMenuTrigger = page.locator("button[data-site-menu-trigger]");
  await expect(responsiveMenuTrigger).toBeVisible();
  await expect.poll(() => page.locator("h1 span").first().evaluate((element) => getComputedStyle(element).transform))
    .toBe("matrix(1, 0, 0, 1, 0, 0)");
  const mobileLayout = await page.evaluate(() => {
    const offenders = Array.from(document.body.querySelectorAll<HTMLElement>("*"))
    .map((element) => ({ tag: element.tagName, id: element.id, className: String(element.className), left: Math.round(element.getBoundingClientRect().left), right: Math.round(element.getBoundingClientRect().right), width: Math.round(element.getBoundingClientRect().width) }))
    .filter((element) => element.right > document.documentElement.clientWidth + 1 || element.left < -1)
    .slice(0, 12);
    const dimensions = {
      tag: "VIEWPORT", id: "", className: "", left: window.scrollX,
      right: document.documentElement.clientWidth, width: window.innerWidth,
    };
    const header = {
      tag: "HEADER-INNER", id: "", className: "", left: document.querySelector("header > div")?.getBoundingClientRect().left ?? -1,
      right: document.querySelector("header > div")?.getBoundingClientRect().right ?? -1,
      width: document.querySelector("header > div")?.getBoundingClientRect().width ?? -1,
    };
    const root = document.documentElement;
    return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, details: [...offenders, dimensions, header] };
  });
  const mobileOverflow = mobileLayout.scrollWidth > mobileLayout.clientWidth;
  const mobileOverflowDetails = mobileLayout.details;
  if (mobileOverflow) await capture(page, "candidate-home-mobile-overflow-debug.png");
  expect(mobileOverflow, JSON.stringify(mobileOverflowDetails)).toBe(false);
  await capture(page, "candidate-home-390x844.png");

  await page.setViewportSize({ width: 320, height: 844 });
  await settleResponsiveLayout(page);
  const narrowOverflow = await hasHorizontalOverflow(page);
  expect(narrowOverflow, "320px Home should not overflow horizontally").toBe(false);
  const trigger = responsiveMenuTrigger;
  await expect(trigger).toBeVisible();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeHidden();
  await capture(page, "mobile-menu-closed-320x844.png");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(nav.getByRole("link")).toHaveCount(5);
  for (const link of await nav.getByRole("link").all()) {
    await expect(link).toBeVisible();
    await expect(link).toBeInViewport();
  }
  await page.getByRole("link", { name: "Company", exact: true }).last().focus();
  await expect(page.getByRole("link", { name: "Company", exact: true }).last()).toBeFocused();
  await capture(page, "mobile-menu-open-320x844.png");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(nav).toBeHidden();
  await page.close();

  const activeMobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 });
  await activeMobile.goto("/company", { waitUntil: "networkidle" });
  await activeMobile.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(activeMobile.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Company" })).toHaveAttribute("aria-current", "page");
  await capture(activeMobile, "mobile-menu-active-company-390x844.png");
  await activeMobile.close();

  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await reduced.goto("/", { waitUntil: "networkidle" });
  await expect(reduced.getByTestId("hero-scene-stage")).toHaveAttribute("data-quality-tier", "STATIC");
  await expect(reduced.locator("canvas")).toHaveCount(0);
  await capture(reduced, "home-static-reduced-motion-1440x900.png");
  const reducedMotionData = await reduced.evaluate(() => ({
    preference: matchMedia("(prefers-reduced-motion: reduce)").matches,
    sceneTier: document.querySelector("[data-quality-tier]")?.getAttribute("data-quality-tier"),
    canvasCount: document.querySelectorAll("canvas").length,
    posterVisible: Boolean(document.querySelector('[data-testid="hero-static-poster"]')),
    revealTransition: getComputedStyle(document.querySelector("[data-world-reveal]") as Element).transitionDuration,
  }));
  await reduced.close();

  const full = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  await full.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { configurable: true, value: 16 });
    Object.defineProperty(navigator, "deviceMemory", { configurable: true, value: 8 });
  });
  await full.goto("/", { waitUntil: "networkidle" });
  const fullStage = full.getByTestId("hero-scene-stage");
  await expect(fullStage).toHaveAttribute("data-quality-tier", "FULL");
  await expect(fullStage).toHaveAttribute("data-scene-state", "ready", { timeout: 30_000 });
  await capture(full, "home-full-3d-1600x900.png");
  const fullHeroCapture = await full.screenshot({ clip: { x: 0, y: 0, width: 1600, height: 440 }, animations: "disabled", caret: "hide" });
  await compositeComparison(browser, "master-vs-candidate-hero.png", fullHeroCapture, { x: 0, y: 0, width: 1600, height: 440 });
  await full.close();

  const balanced = await browser.newPage({ viewport: { width: 900, height: 768 }, deviceScaleFactor: 1 });
  await balanced.goto("/", { waitUntil: "networkidle" });
  const balancedStage = balanced.getByTestId("hero-scene-stage");
  await expect(balancedStage).toHaveAttribute("data-quality-tier", "BALANCED");
  await expect(balancedStage).toHaveAttribute("data-scene-state", "ready", { timeout: 30_000 });
  await capture(balanced, "home-balanced-3d-900x768.png");
  await balanced.close();

  const contextLoss = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  await contextLoss.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { configurable: true, value: 16 });
    Object.defineProperty(navigator, "deviceMemory", { configurable: true, value: 8 });
  });
  await contextLoss.goto("/", { waitUntil: "networkidle" });
  const lossStage = contextLoss.getByTestId("hero-scene-stage");
  await expect(lossStage).toHaveAttribute("data-scene-state", "ready", { timeout: 30_000 });
  await contextLoss.locator("canvas").evaluate((canvas) => canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true })));
  await expect(lossStage).toHaveAttribute("data-scene-state", "fallback", { timeout: 10_000 });
  await expect(contextLoss.locator("canvas")).toHaveCount(0);
  await capture(contextLoss, "home-webgl-context-loss-fallback-1600x900.png");
  await contextLoss.close();

  const routeStatuses: Array<{ path: string; status: number | undefined; screenshot: string }> = [];
  const routes = ["/technology", "/solutions", "/research", "/company", "/contact"] as const;
  const internal = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
  for (const route of routes) {
    const response = await internal.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), `${route} must remain available`).toBe(200);
    await expect(internal.getByRole("heading", { level: 1 })).toBeVisible();
    const name = `${route.slice(1)}-1600x900.png`;
    await capture(internal, name);
    routeStatuses.push({ path: route, status: response?.status(), screenshot: name });
  }
  await internal.setViewportSize({ width: 390, height: 844 });
  await internal.goto("/research", { waitUntil: "networkidle" });
  const mobileInternalOverflow = await hasHorizontalOverflow(internal);
  expect(mobileInternalOverflow).toBe(false);
  await capture(internal, "research-mobile-390x844.png");
  await internal.close();

  saveJson("visual-responsiveness-motion-and-routes.json", {
    master: { path: ".engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg", sha256: actualHash, gitBlobAtAdmission: "52932511adfeb8d372717185fe9a18907625cc0c", productionReference: false },
    responsive: { viewports: ["1600x900", "1440x900", "900x768", "390x844", "320x844"], mobile390HorizontalOverflow: false, mobile320HorizontalOverflow: false, internalMobileHorizontalOverflow: mobileInternalOverflow },
    motion: { reducedMotion: reducedMotionData, full: "FULL", balanced: "BALANCED", static: "STATIC", contextLoss: "fallback rendered; canvas removed" },
    mobileNavigation: { closed: "menu hidden and inert", open: "all four routes plus Contact visible", escape: "closes and restores trigger focus", activeRoute: "Company exposes aria-current=page" },
    routes: [{ path: "/", status: 200, screenshot: "candidate-home-1600x900.png" }, ...routeStatuses],
    axeCoverage: "Existing Home and M06 route WCAG 2.2 AA axe suites remain enabled in the full E2E runs.",
  });
});
