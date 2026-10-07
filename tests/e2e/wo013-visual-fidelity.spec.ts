import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test, type Browser, type Page } from "@playwright/test";
import sharp from "sharp";
import { writeEvidenceBuffer } from "./evidence";

const evidenceDirectory = process.env.NEXLABS_EVIDENCE_ROOT
  ? resolve(process.env.NEXLABS_EVIDENCE_ROOT, "NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT")
  : resolve(process.cwd(), ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT");
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
  const screenshot = await page.screenshot({ fullPage, animations: "disabled", caret: "hide" });
  writeEvidenceBuffer(resolve(evidenceDirectory, name), screenshot);
}

async function settleResponsiveLayout(page: Page) {
  await page.evaluate(() => new Promise<void>((resolveFrame) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolveFrame()));
  }));
}

async function waitForLivePosterFade(page: Page) {
  const poster = page.getByTestId("hero-reference-poster");
  try {
    await expect.poll(
      () => poster.evaluate((element) => getComputedStyle(element).opacity),
      { timeout: 10_000 },
    ).toBe("0");
  } catch (error) {
    const diagnostics = await page.evaluate(() => {
      const hero = document.querySelector("#home");
      const stage = document.querySelector<HTMLElement>('[data-testid="hero-scene-stage"]');
      const referencePoster = document.querySelector<HTMLElement>(
        '[data-testid="hero-reference-poster"]',
      );
      return {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        heroSceneLive: hero?.getAttribute("data-scene-live"),
        heroHasReadyScene: Boolean(hero?.querySelector('[data-scene-state="ready"]')),
        tier: stage?.getAttribute("data-quality-tier"),
        sceneState: stage?.getAttribute("data-scene-state"),
        posterOpacity: referencePoster ? getComputedStyle(referencePoster).opacity : null,
        posterTransition: referencePoster ? getComputedStyle(referencePoster).transition : null,
        canvasCount: document.querySelectorAll("canvas").length,
      };
    });
    console.error("[wo013:poster-fade-diagnostic]", JSON.stringify(diagnostics));
    throw error;
  }
}

async function pauseSceneForCleanup(page: Page) {
  if (page.isClosed()) return;
  await page.evaluate(async () => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));

    const canvas = document.querySelector("canvas");
    const context = canvas?.getContext("webgl2");
    const loseContext = context?.getExtension("WEBGL_lose_context");
    if (!canvas || !context || context.isContextLost() || !loseContext) return;

    await new Promise<void>((resolveContextLoss) => {
      const finish = () => {
        window.clearTimeout(timeout);
        canvas.removeEventListener("webglcontextlost", finish);
        resolveContextLoss();
      };
      const timeout = window.setTimeout(finish, 1_000);
      canvas.addEventListener("webglcontextlost", finish, { once: true });
      loseContext.loseContext();
    });
  });
}

async function waitForResearchArtwork(page: Page) {
  await page.waitForFunction(
    () => {
      const source = document
        .querySelector<SVGImageElement>('[data-world-reveal="research"] svg image')
        ?.getAttribute("href");
      if (!source) return false;
      const url = new URL(source, document.baseURI).href;
      return performance
        .getEntriesByName(url)
        .some(
          (entry) =>
            entry.entryType === "resource" &&
            (entry as PerformanceResourceTiming).responseEnd > 0,
        );
    },
    null,
    { timeout: 15_000 },
  );
  await page.evaluate(async () => {
    const source = document
      .querySelector<SVGImageElement>('[data-world-reveal="research"] svg image')
      ?.getAttribute("href");
    if (!source) throw new Error("The lower Home research artwork is missing its source.");
    const decodedImage = new window.Image();
    decodedImage.src = new URL(source, document.baseURI).href;
    await decodedImage.decode();
  });
  await page.evaluate(
    () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
  );
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
  const screenshot = await page.screenshot({ animations: "disabled", fullPage: true });
  writeEvidenceBuffer(resolve(evidenceDirectory, name), screenshot);
  await page.close();
}

test.afterEach(async ({ browser, page }) => {
  const fixtureContext = page.context();
  for (const context of browser.contexts()) {
    for (const contextPage of context.pages()) {
      await pauseSceneForCleanup(contextPage);
    }
    if (context !== fixtureContext) await context.close();
  }
});

test("WO-013 deterministic visual, responsive, motion and comparison evidence", async ({ browser, page }) => {
  test.setTimeout(180_000);
  mkdirSync(evidenceDirectory, { recursive: true });
  const actualHash = createHash("sha256").update(masterBytes).digest("hex");
  expect(actualHash).toBe(expectedMasterSha256);

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const homeResponse = await page.goto("/", { waitUntil: "networkidle" });
  expect(homeResponse?.status()).toBe(200);
  const labBackdropDimensions = await page.evaluate(async () => {
    const image = new Image();
    image.src = "/generated/home/hero-lab-backdrop.webp";
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  });
  expect(labBackdropDimensions).toEqual({ width: 768, height: 432 });
  const environmentDimensions = await page.evaluate(async () => {
    const image = new Image();
    image.src = "/generated/home/hero-lab-environment-360.webp";
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  });
  expect(environmentDimensions).toEqual({ width: 1024, height: 512 });
  await expect(page.getByRole("heading", { level: 1, name: /human potential multiplied/i })).toBeVisible();
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();
  await expect(page.locator("#capabilities article")).toHaveCount(5);
  const homeCapture = await page.screenshot({ animations: "disabled", caret: "hide" });
  writeEvidenceBuffer(resolve(evidenceDirectory, "candidate-home-1600x900.png"), homeCapture);

  const activePage = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  await activePage.goto("/technology", { waitUntil: "networkidle" });
  const technologyLink = activePage.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Technology" });
  await expect(technologyLink).toHaveAttribute("aria-current", "page");
  const headerBox = await activePage.locator("header").first().boundingBox();
  expect(headerBox).not.toBeNull();
  const headerCapture = await activePage.screenshot({ clip: { x: 0, y: 0, width: 1600, height: Math.ceil(headerBox?.height ?? 68) }, animations: "disabled" });
  writeEvidenceBuffer(resolve(evidenceDirectory, "candidate-header-active-technology.png"), headerCapture);
  await compositeComparison(browser, "master-vs-candidate-header.png", headerCapture, { x: 0, y: 0, width: 1600, height: 64 });
  await capture(activePage, "technology-1600x900.png");
  await activePage.close();

  const capability = page.locator("#capabilities");
  await capability.scrollIntoViewIfNeeded();
  const capabilityCapture = await capability.screenshot({ animations: "disabled" });
  writeEvidenceBuffer(resolve(evidenceDirectory, "capabilities-five-objects.png"), capabilityCapture);
  await compositeComparison(browser, "master-vs-candidate-capabilities.png", capabilityCapture, { x: 0, y: 438, width: 1600, height: 188 });

  const lowerWorld = page.locator('[data-world-reveal="narrative"]');
  await lowerWorld.scrollIntoViewIfNeeded();
  await waitForResearchArtwork(page);
  const lowerCapture = await lowerWorld.screenshot({ animations: "disabled" });
  writeEvidenceBuffer(resolve(evidenceDirectory, "home-lower-research-technology.png"), lowerCapture);
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
  await waitForLivePosterFade(full);
  await capture(full, "home-full-3d-1600x900.png");
  const fullHeroCapture = await full.screenshot({ clip: { x: 0, y: 0, width: 1600, height: 440 }, animations: "disabled", caret: "hide" });
  await compositeComparison(browser, "master-vs-candidate-hero.png", fullHeroCapture, { x: 0, y: 0, width: 1600, height: 440 });
  await full.close();

  const balanced = await browser.newPage({ viewport: { width: 900, height: 768 }, deviceScaleFactor: 1 });
  await balanced.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { configurable: true, value: 8 });
    Object.defineProperty(navigator, "deviceMemory", { configurable: true, value: 8 });
  });
  await balanced.goto("/", { waitUntil: "networkidle" });
  const balancedStage = balanced.getByTestId("hero-scene-stage");
  await expect(balancedStage).toHaveAttribute("data-quality-tier", "BALANCED");
  await expect(balancedStage).toHaveAttribute("data-scene-state", "ready", { timeout: 30_000 });
  await waitForLivePosterFade(balanced);
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

test("FULL Home shows an environmental lab backdrop behind a dark illuminated platform", async ({ page }) => {
  test.setTimeout(60_000);
  mkdirSync(evidenceDirectory, { recursive: true });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { configurable: true, value: 16 });
    Object.defineProperty(navigator, "deviceMemory", { configurable: true, value: 8 });
  });
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const labBackdrop = page.getByTestId("hero-lab-backdrop");
  const labBackdropBackground = await labBackdrop.evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(labBackdropBackground).toContain("/generated/home/hero-lab-backdrop.webp");
  const poster = page.getByTestId("hero-reference-poster");
  const posterBackground = await poster.evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(posterBackground).toContain("/hero/home-hero-poster.jpg");
  const posterBox = await poster.boundingBox();
  const heroBox = await page.locator("#home").boundingBox();
  expect(posterBox).not.toBeNull();
  expect(heroBox).not.toBeNull();
  expect(posterBox?.width).toBeLessThanOrEqual(700);
  expect(posterBox?.height).toBeLessThanOrEqual(400);
  expect(posterBox?.y).toBeGreaterThanOrEqual((heroBox?.y ?? 0) - 1);
  expect((posterBox?.y ?? 0) + (posterBox?.height ?? 0)).toBeLessThanOrEqual(
    (heroBox?.y ?? 0) + (heroBox?.height ?? 0) + 1,
  );
  const posterResponse = await page.request.get(new URL("/hero/home-hero-poster.jpg", page.url()).href);
  expect(posterResponse.status()).toBe(200);
  const posterBytes = await posterResponse.body();
  const posterMetadata = await sharp(posterBytes).metadata();
  const posterAsset = {
    source: "/hero/home-hero-poster.jpg",
    format: posterMetadata.format,
    width: posterMetadata.width,
    height: posterMetadata.height,
    bytes: posterBytes.byteLength,
    maximumBytes: 130_000,
    provenance: "Blender 5.2.2 render of the canonical Precision Blades N and original lab geometry; no master pixels used.",
  };
  saveJson("poster-asset-report.json", posterAsset);
  expect(posterAsset).toMatchObject({ format: "jpeg", width: 1280, height: 720 });
  expect(posterAsset.bytes).toBeLessThanOrEqual(posterAsset.maximumBytes);
  const stage = page.getByTestId("hero-scene-stage");
  await expect(stage).toHaveAttribute("data-quality-tier", "FULL");
  await expect(stage).toHaveAttribute("data-scene-state", "ready", { timeout: 30_000 });

  const { data, info } = await sharp(await page.locator("canvas").screenshot())
    .raw()
    .toBuffer({ resolveWithObject: true });
  const meanLuminance = (region: { x: number; y: number; width: number; height: number }) => {
    const xStart = Math.floor(info.width * region.x);
    const xEnd = Math.floor(info.width * (region.x + region.width));
    const yStart = Math.floor(info.height * region.y);
    const yEnd = Math.floor(info.height * (region.y + region.height));
    let luminance = 0;
    let red = 0;
    let green = 0;
    let blue = 0;
    let samples = 0;
    for (let y = yStart; y < yEnd; y += 1) {
      for (let x = xStart; x < xEnd; x += 1) {
        const offset = (y * info.width + x) * info.channels;
        const pixelRed = data[offset];
        const pixelGreen = data[offset + 1];
        const pixelBlue = data[offset + 2];
        red += pixelRed;
        green += pixelGreen;
        blue += pixelBlue;
        luminance += 0.2126 * pixelRed + 0.7152 * pixelGreen + 0.0722 * pixelBlue;
        samples += 1;
      }
    }
    return {
      bounds: region,
      meanRgb: [red, green, blue].map((channel) => Number((channel / samples).toFixed(2))),
      meanLuminance: Number((luminance / samples).toFixed(2)),
      samples,
    };
  };
  const floorRegion = meanLuminance({ x: 0.9, y: 0.84, width: 0.06, height: 0.05 });
  const backdropRegion = meanLuminance({ x: 0.94, y: 0.28, width: 0.04, height: 0.12 });
  const result = {
    source: "FULL WebGL canvas screenshot",
    viewport: "1600x900",
    floor: { ...floorRegion, maximumMeanLuminance: 55 },
    backdrop: { ...backdropRegion, minimumMeanLuminance: 18 },
    interpretation: "The dark base preserves the lighted platform while the surrounding lab remains visibly textured.",
  };
  saveJson("floor-lighting-report.json", result);
  expect(floorRegion.meanLuminance, JSON.stringify(result)).toBeLessThan(55);
  expect(backdropRegion.meanLuminance, JSON.stringify(result)).toBeGreaterThan(18);
});
