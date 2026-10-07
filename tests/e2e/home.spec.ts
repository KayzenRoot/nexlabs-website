import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { expect, test, type Page, type Response } from "@playwright/test";
import { captureScreenshot, writeEvidenceBuffer } from "./evidence";

const screenshotDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/home-regressions",
);
const testBaseURL = `http://127.0.0.1:${process.env.E2E_PORT ?? "3100"}`;

/** Collects gzip byte sizes for Next.js script chunks observed by a test page. */
function collectScriptGzipSizes(page: Page) {
  const pending = new Map<string, Promise<number>>();
  const onResponse = (response: Response) => {
    const request = response.request();
    if (request.resourceType() !== "script" || !response.url().includes("/_next/static/chunks/")) {
      return;
    }
    pending.set(
      response.url(),
      response.body().then((body) => gzipSync(body).byteLength),
    );
  };
  page.on("response", onResponse);

  return {
    async finish() {
      page.off("response", onResponse);
      const sizes = await Promise.all(
        Array.from(pending, async ([url, size]) => [url, await size] as const),
      );
      return Object.fromEntries(sizes);
    },
  };
}

/** Installs lightweight lab observers for LCP, CLS and interaction timing evidence. */
async function installVitalsObserver(page: Page) {
  await page.addInitScript(() => {
    const vitals = {
      lcpMs: 0,
      cls: 0,
      inpSamples: [] as number[],
      inpEvents: [] as Array<{
        name: string;
        startTime: number;
        duration: number;
        processingStart: number;
        processingEnd: number;
      }>,
    };
    Reflect.set(window, "__nexlabsVitals", vitals);

    try {
      new PerformanceObserver((entries) => {
        const lastEntry = entries.getEntries().at(-1);
        if (lastEntry) vitals.lcpMs = lastEntry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // A browser without this observer keeps the zero value explicit in evidence.
    }

    try {
      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          const layoutShift = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShift.hadRecentInput) vitals.cls += layoutShift.value ?? 0;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      // A browser without this observer keeps the zero value explicit in evidence.
    }

    try {
      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          const interaction = entry as PerformanceEntry & {
            interactionId?: number;
            processingStart?: number;
            processingEnd?: number;
          };
          if ((interaction.interactionId ?? 0) > 0) {
            vitals.inpSamples.push(entry.duration);
            vitals.inpEvents.push({
              name: entry.name,
              startTime: entry.startTime,
              duration: entry.duration,
              processingStart: interaction.processingStart ?? 0,
              processingEnd: interaction.processingEnd ?? 0,
            });
          }
        }
      }).observe({
        type: "event",
        buffered: true,
        durationThreshold: 16,
      } as PerformanceObserverInit);
    } catch {
      // Unsupported Event Timing keeps the lab interaction proxy explicit.
    }
  });
}

/** Samples requestAnimationFrame intervals and returns median/p95 frame evidence. */
async function sampleFrameTimes(page: Page) {
  return page.evaluate(async () => {
    const intervals: number[] = [];
    await new Promise<void>((resolveSamples) => {
      let previous: number | undefined;
      const sample = (time: number) => {
        if (previous !== undefined) intervals.push(time - previous);
        previous = time;
        if (intervals.length < 119) requestAnimationFrame(sample);
        else resolveSamples();
      };
      requestAnimationFrame(sample);
    });
    const sorted = [...intervals].sort((left, right) => left - right);
    const medianFrameMs = sorted[Math.floor(sorted.length * 0.5)] ?? 0;
    const p95FrameMs = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
    return {
      sampleCount: intervals.length,
      medianFrameMs: Number(medianFrameMs.toFixed(2)),
      p95FrameMs: Number(p95FrameMs.toFixed(2)),
      medianFps: medianFrameMs > 0 ? Number((1000 / medianFrameMs).toFixed(1)) : 0,
    };
  });
}

async function pauseSceneForCleanup(page: Page) {
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

test.afterEach(async ({ browser, page }) => {
  const fixtureContext = page.context();
  for (const context of browser.contexts()) {
    for (const contextPage of context.pages()) {
      if (!contextPage.isClosed()) await pauseSceneForCleanup(contextPage);
    }
    if (context !== fixtureContext) await context.close();
  }
});

test("Home renders the approved poster and retains responsive screenshots", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
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
      name: /human potential multiplied/i,
    }),
  ).toBeVisible();

  const unresolvedAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => (link as HTMLAnchorElement).hash.slice(1))
      .filter((id) => !document.getElementById(id)),
  );
  expect(unresolvedAnchors).toEqual([]);
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();
  await expect(page.getByTestId("hero-scene-stage")).toHaveAttribute(
    "data-identity-source",
    "NEX-N-A-PRECISION-BLADES",
  );

  mkdirSync(screenshotDirectory, { recursive: true });
  for (const viewport of [
    { width: 390, height: 844, name: "mobile-390x844", fullPage: false },
    { width: 1440, height: 900, name: "desktop-1440x900", fullPage: false },
    { width: 1600, height: 900, name: "desktop-1600x900", fullPage: false },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow, `${viewport.name} horizontal overflow`).toBe(false);
    await captureScreenshot(page, {
      path: resolve(screenshotDirectory, `home-${viewport.name}.png`),
      fullPage: viewport.fullPage,
      animations: "disabled",
    });

  }

  await page.setViewportSize({ width: 1600, height: 900 });
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-full-page-1600x900.png"),
    fullPage: true,
    animations: "disabled",
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  const headerImage = await page.getByRole("banner").screenshot({ animations: "disabled" });
  writeEvidenceBuffer(resolve(screenshotDirectory, "header-desktop-1440x900.png"), headerImage);
  const footerImage = await page.locator("footer").screenshot({ animations: "disabled" });
  writeEvidenceBuffer(resolve(screenshotDirectory, "footer-desktop-1440x900.png"), footerImage);

  expect(browserErrors).toEqual([]);
});

test("M05 sections preserve canonical copy, live anchors, and visual continuity", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/");

  const expectedHeadings = [
    "Intelligence in action.",
    "Principles in practice.",
    "Technology with a reason to exist.",
    "Ideas that become reality.",
    "Built to transform.",
    "Building the next chapter of intelligent systems.",
  ];
  for (const heading of expectedHeadings) {
    await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
  }

  for (const capability of [
    "Artificial Intelligence",
    "Intelligent Infrastructure",
    "Advanced Interfaces",
    "Sustainable Technologies",
    "Research Platforms",
  ]) {
    await expect(page.getByRole("heading", { level: 3, name: capability })).toBeVisible();
  }

  await expect(page.getByText("Built for real-world systems")).toBeVisible();
  await expect(page.getByText("Ideas become valuable when they survive the constraints of actual users, hardware and operations.")).toBeVisible();
  await expect(page.getByText("Interoperable Architecture")).toBeVisible();

  const unresolvedAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => (link as HTMLAnchorElement).hash.slice(1))
      .filter((id) => !document.getElementById(id)),
  );
  expect(unresolvedAnchors).toEqual([]);
  await expect(page.getByText("More information is coming soon.")).toHaveCount(0);

  await page.locator("#capabilities").evaluate((section) => {
    const scrollTop = window.scrollY + section.getBoundingClientRect().top - 260;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, Math.max(0, scrollTop));
    document.documentElement.style.scrollBehavior = "";
  });
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-hero-capabilities-continuity-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });

  await page.locator("#research").scrollIntoViewIfNeeded();
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-research-technology-continuity-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });

  const technologyLink = page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Technology" });
  await technologyLink.click();
  await expect(page).toHaveURL(/\/technology$/);
  await expect(page.getByRole("heading", { level: 1, name: "Systems designed to adapt." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "A modular foundation." })).toBeVisible();
});

test("skip link and keyboard focus are visible and usable", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  const focusRing = await skipLink.evaluate((link) => getComputedStyle(link).boxShadow);
  expect(focusRing).not.toBe("none");
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-keyboard-focus-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });

  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await expect(page.getByRole("link", { name: /explore our capabilities/i })).toBeVisible();
});

test("mobile menu exposes every route and closes on Escape with focus restored", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");

  const trigger = page.locator("button[data-site-menu-trigger]");
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  const links = navigation.getByRole("link");
  const expectedDestinations = [
    "/solutions",
    "/technology",
    "/research",
    "/company",
  ];

  await expect(navigation).toBeHidden();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(navigation).toBeVisible();
  await expect(links).toHaveCount(expectedDestinations.length + 1);
  for (const [index, destination] of expectedDestinations.entries()) {
    await expect(links.nth(index)).toHaveAttribute("href", destination);
  }
  await expect(links.nth(4)).toHaveAttribute("href", "/contact");
  await captureScreenshot(page, { path: resolve(screenshotDirectory, "mobile-menu-open-320x844.png"), animations: "disabled" });

  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(trigger).toBeFocused();
  await captureScreenshot(page, { path: resolve(screenshotDirectory, "mobile-menu-closed-320x844.png"), animations: "disabled" });

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("mobile menu closes and transfers focus when the viewport enters desktop navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/company");

  const trigger = page.locator("button[data-site-menu-trigger]");
  const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(mobileNavigation).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 844 });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(mobileNavigation).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Company" }),
  ).toBeFocused();
});

test("lazy scene reaches ready on capable WebGL and retains the poster otherwise", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/");

  const stage = page.getByTestId("hero-scene-stage");
  await expect(stage).toHaveAttribute("data-quality-tier", /^(FULL|BALANCED|STATIC)$/);
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();

  const tier = await stage.getAttribute("data-quality-tier");
  if (tier === "STATIC") {
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(stage).toHaveAttribute("data-scene-state", "poster");
  } else {
    await expect(stage).toHaveAttribute("data-scene-state", /^(ready|fallback)$/i, {
      timeout: 30_000,
    });
    const state = await stage.getAttribute("data-scene-state");
    if (state === "ready") {
      await expect(page.locator("canvas")).toBeVisible();
    } else {
      await expect(page.locator("canvas")).toHaveCount(0);
    }
  }

  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-scene-transition-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });
});

test("WebGL failure selects the static hero without blocking semantic content", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value: function getContext(type: string, ...args: unknown[]) {
        if (type === "webgl2") return null;
        return Reflect.apply(original, this, [type, ...args]) as RenderingContext | null;
      },
    });
  });
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/");

  const stage = page.getByTestId("hero-scene-stage");
  await expect(stage).toHaveAttribute("data-quality-tier", "STATIC");
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /human potential multiplied/i })).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Next steps" }).getByRole("link", {
      name: "Explore the next chapter",
    }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-webgl-fallback-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });
});

test("runtime WebGL failure keeps the poster fallback after resize", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", {
      configurable: true,
      value: 8,
    });
    Object.defineProperty(navigator, "deviceMemory", {
      configurable: true,
      value: 8,
    });
    if (typeof window.WebGL2RenderingContext === "undefined") {
      Object.defineProperty(window, "WebGL2RenderingContext", {
        configurable: true,
        value: function WebGL2RenderingContext() {},
      });
    }

    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value: function getContext(type: string, ...args: unknown[]) {
        if (type === "webgl2" && this.isConnected) return null;

        const context = Reflect.apply(original, this, [type, ...args]) as RenderingContext | null;
        if (type === "webgl2" && context === null) {
          return {
            getExtension(name: string) {
              return name === "WEBGL_lose_context" ? { loseContext() {} } : null;
            },
          } as unknown as RenderingContext;
        }
        return context;
      },
    });
  });
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/");

  const stage = page.getByTestId("hero-scene-stage");
  await expect(stage).toHaveAttribute("data-quality-tier", /^(FULL|BALANCED)$/);
  await expect(stage).toHaveAttribute("data-scene-state", "fallback", {
    timeout: 30_000,
  });
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);

  await page.setViewportSize({ width: 1500, height: 900 });
  await expect(stage).toHaveAttribute("data-quality-tier", /^(FULL|BALANCED)$/);
  await expect(stage).toHaveAttribute("data-scene-state", "fallback");
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  mkdirSync(screenshotDirectory, { recursive: true });
  await captureScreenshot(page, {
    path: resolve(
      screenshotDirectory,
      "home-webgl-runtime-fallback-after-resize-1600x900.png",
    ),
    fullPage: false,
    animations: "disabled",
  });
});

test("measures poster-first, lazy chunk size, Web Vitals proxies, and frame profiles", async ({
  browser,
  page,
}) => {
  // Keep all 119-frame profiles intact on software-rendered WebGL hosts.
  test.setTimeout(150_000);
  mkdirSync(screenshotDirectory, { recursive: true });

  const staticPage = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    reducedMotion: "reduce",
  });
  await installVitalsObserver(staticPage);
  const staticChunkCollector = collectScriptGzipSizes(staticPage);
  const staticStart = Date.now();
  await staticPage.goto(`${testBaseURL}/`, { waitUntil: "load" });
  await expect(staticPage.getByTestId("hero-scene-stage")).toHaveAttribute(
    "data-quality-tier",
    "STATIC",
  );
  await expect(staticPage.getByTestId("hero-static-poster")).toBeVisible();
  const staticChunks = await staticChunkCollector.finish();
  const staticVitals = await staticPage.evaluate(() => {
    const values = Reflect.get(window, "__nexlabsVitals") as {
      cls: number;
      lcpMs: number;
    };
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    return {
      ...values,
      domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? 0,
      loadEventMs: navigation?.loadEventEnd ?? 0,
    };
  });
  const staticLoadMs = Date.now() - staticStart;
  await staticPage.close();

  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 1,
  });
  await installVitalsObserver(mobilePage);
  const mobileChunkCollector = collectScriptGzipSizes(mobilePage);
  const mobileCdp = await mobilePage.context().newCDPSession(mobilePage);
  await mobileCdp.send("Network.enable");
  await mobileCdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: "cellular4g",
  });
  await mobileCdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const mobileStart = Date.now();
  await mobilePage.goto(`${testBaseURL}/`, { waitUntil: "load" });
  await expect(mobilePage.getByTestId("hero-scene-stage")).toHaveAttribute(
    "data-quality-tier",
    "STATIC",
  );
  await expect(mobilePage.getByTestId("hero-static-poster")).toBeVisible();
  const mobileLoadMs = Date.now() - mobileStart;
  await captureScreenshot(mobilePage, {
    path: resolve(screenshotDirectory, "home-performance-mobile-390x844.png"),
    fullPage: false,
    animations: "disabled",
  });
  await mobilePage
    .getByRole("link", { name: /explore our capabilities/i })
    .click();
  await mobilePage.evaluate(
    () =>
      new Promise<void>((resolveFrame) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolveFrame()));
      }),
  );
  const mobileChunks = await mobileChunkCollector.finish();
  const mobileVitals = await mobilePage.evaluate(() => {
    const values = Reflect.get(window, "__nexlabsVitals") as {
      cls: number;
      inpSamples: number[];
      inpEvents: Array<{
        name: string;
        startTime: number;
        duration: number;
        processingStart: number;
        processingEnd: number;
      }>;
      lcpMs: number;
    };
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    return {
      lcpMs: values.lcpMs,
      cls: values.cls,
      inpMs: values.inpSamples.length ? Math.max(...values.inpSamples) : 0,
      inpSampleCount: values.inpSamples.length,
      inpEvents: values.inpEvents,
      domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? 0,
      loadEventMs: navigation?.loadEventEnd ?? 0,
    };
  });
  // Do not let CDP emulation leak from the mobile sample into later route tests.
  await mobileCdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await mobileCdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
    connectionType: "none",
  });
  await mobileCdp.detach();
  await mobilePage.close();

  await page.setViewportSize({ width: 1600, height: 900 });
  await installVitalsObserver(page);
  const liveChunkCollector = collectScriptGzipSizes(page);
  const desktopStart = Date.now();
  await page.goto("/");
  const stage = page.getByTestId("hero-scene-stage");
  await expect(stage).toHaveAttribute("data-quality-tier", /^(FULL|BALANCED|STATIC)$/);
  await expect(page.getByTestId("hero-static-poster")).toBeVisible();

  const desktopTier = await stage.getAttribute("data-quality-tier");
  let desktopState = await stage.getAttribute("data-scene-state");
  if (desktopTier !== "STATIC") {
    await expect(stage).toHaveAttribute("data-scene-state", /^(ready|fallback)$/i, {
      timeout: 30_000,
    });
    desktopState = await stage.getAttribute("data-scene-state");
  }

  const desktopFrames =
    desktopState === "ready" && desktopTier === "FULL"
      ? await sampleFrameTimes(page)
      : null;
  const desktopCapabilities = await page.evaluate(() => {
    const memoryNavigator = navigator as Navigator & { deviceMemory?: number };
    const canvas = document.querySelector("canvas");
    const context = canvas?.getContext("webgl2");
    const debugInfo = context?.getExtension("WEBGL_debug_renderer_info");
    return {
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemoryGb: memoryNavigator.deviceMemory ?? null,
      devicePixelRatio: window.devicePixelRatio,
      webgl2Ready: Boolean(context),
      renderer: debugInfo
        ? context?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? null
        : null,
    };
  });
  const desktopChunks = await liveChunkCollector.finish();
  const liveVitals = await page.evaluate(() => {
    const values = Reflect.get(window, "__nexlabsVitals") as {
      cls: number;
      lcpMs: number;
    };
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    return {
      ...values,
      domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? 0,
      loadEventMs: navigation?.loadEventEnd ?? 0,
    };
  });
  const desktopLoadMs = Date.now() - desktopStart;
  await pauseSceneForCleanup(page);
  await page.close();

  const fullProfilePage = await browser.newPage({
    viewport: { width: 1600, height: 900 },
  });
  await fullProfilePage.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", {
      configurable: true,
      value: 16,
    });
    Object.defineProperty(navigator, "deviceMemory", {
      configurable: true,
      value: 8,
    });
  });
  await fullProfilePage.goto(`${testBaseURL}/`);
  const fullStage = fullProfilePage.getByTestId("hero-scene-stage");
  await expect(fullStage).toHaveAttribute("data-quality-tier", "FULL");
  await expect(fullStage).toHaveAttribute("data-scene-state", "ready", {
    timeout: 30_000,
  });
  const fullFrames = desktopFrames ?? await sampleFrameTimes(fullProfilePage);
  await captureScreenshot(fullProfilePage, {
    path: resolve(screenshotDirectory, "home-full-scene-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });
  await pauseSceneForCleanup(fullProfilePage);
  await fullProfilePage.close();

  const staticChunkUrls = new Set(Object.keys(staticChunks));
  const staticScriptGzipBytes = Object.values(staticChunks).reduce(
    (total, bytes) => total + bytes,
    0,
  );
  const mobileScriptGzipBytes = Object.values(mobileChunks).reduce(
    (total, bytes) => total + bytes,
    0,
  );
  const lazyChunks = Object.entries(desktopChunks)
    .filter(([url]) => !staticChunkUrls.has(url))
    .map(([url, gzipBytes]) => ({ url, gzipBytes }));
  const lazyChunkGzipBytes = lazyChunks.reduce((total, chunk) => total + chunk.gzipBytes, 0);
  const desktopPosterBytes = statSync(
    resolve(process.cwd(), "public/hero/home-hero-poster.jpg"),
  ).size;
  const mobilePosterBytes = statSync(
    resolve(process.cwd(), "public/hero/home-hero-poster-mobile.jpg"),
  ).size;
  let balancedTier: string | null = null;
  let balancedState: string | null = null;
  let balancedFrames: Awaited<ReturnType<typeof sampleFrameTimes>> | null = null;
  if (desktopState === "ready") {
    const balancedPage = await browser.newPage({
      viewport: { width: 900, height: 768 },
      deviceScaleFactor: 1,
    });
    await balancedPage.goto(`${testBaseURL}/`);
    const balancedStage = balancedPage.getByTestId("hero-scene-stage");
    await expect(balancedStage).toHaveAttribute("data-quality-tier", "BALANCED");
    await expect(balancedStage).toHaveAttribute("data-scene-state", "ready", {
      timeout: 30_000,
    });
    balancedTier = await balancedStage.getAttribute("data-quality-tier");
    balancedState = await balancedStage.getAttribute("data-scene-state");
    balancedFrames = await sampleFrameTimes(balancedPage);
    await captureScreenshot(balancedPage, {
      path: resolve(screenshotDirectory, "home-balanced-scene-900x768.png"),
      fullPage: false,
      animations: "disabled",
    });
    await pauseSceneForCleanup(balancedPage);
    await balancedPage.close();
  }

  const report = {
    source: "Playwright Chromium; desktop and 390x844 mobile emulation with 4G/4x CPU throttling",
    frameSampling: {
      samplesPerDistinctWebglTier: 119,
      duplicateDesktopFullSampleReused: desktopFrames !== null,
      desktopBalancedProfile: "Captured by the explicit 900x768 BALANCED profile below.",
    },
    posterAssets: {
      desktopBytes: desktopPosterBytes,
      mobileBytes: mobilePosterBytes,
    },
    static: {
      tier: "STATIC",
      loadMs: staticLoadMs,
      ...staticVitals,
      scriptGzipBytes: staticScriptGzipBytes,
      scripts: staticChunks,
    },
    desktop: {
      viewport: "1600x900",
      tier: desktopTier,
      state: desktopState,
      hostCapabilities: desktopCapabilities,
      loadMs: desktopLoadMs,
      ...liveVitals,
      scriptGzipBytes: Object.values(desktopChunks).reduce((total, bytes) => total + bytes, 0),
      chunks: desktopChunks,
      lazyChunkGzipBytes,
      lazyChunks,
      frameTimes: desktopFrames,
    },
    fullCapabilityProfile: {
      viewport: "1600x900",
      tier: "FULL",
      state: "ready",
      capabilityOverrides: {
        hardwareConcurrency: 16,
        deviceMemoryGb: 8,
        note: "Exercises the FULL scene path on this WebGL-capable host; this is not a separate high-end-hardware qualification.",
      },
      frameTimes: fullFrames,
    },
    balanced: {
      viewport: "900x768",
      tier: balancedTier,
      state: balancedState,
      frameTimes: balancedFrames,
    },
    mobile4g: {
      viewport: "390x844",
      tier: "STATIC",
      network: { type: "cellular4g", latencyMs: 150, downloadBytesPerSecond: 209715, uploadBytesPerSecond: 96000 },
      cpuThrottlingRate: 4,
      loadMs: mobileLoadMs,
      ...mobileVitals,
      scriptGzipBytes: mobileScriptGzipBytes,
      scripts: mobileChunks,
      interactionLatency: {
        type: "single laboratory CTA activation; proxy only, not field INP",
        eventSampleCount: mobileVitals.inpSampleCount,
        maximumEventDurationMs: mobileVitals.inpMs,
        budgetMs: 200,
      },
    },
    budgets: {
      desktopPosterBytes: 600 * 1024,
      mobilePosterRatio: 0.75,
      initialRouteJsGzipBytes: 220 * 1024,
      lazyHome3dGzipBytes: 700 * 1024,
      lcpMs: 2500,
      cls: 0.1,
      interactionProxyMs: 200,
    },
  };
  writeEvidenceBuffer(
    resolve(screenshotDirectory, "home-performance-report.json"),
    Buffer.from(`${JSON.stringify(report, null, 2)}\n`),
  );

  expect(desktopPosterBytes).toBeLessThan(600 * 1024);
  expect(mobilePosterBytes).toBeLessThan(desktopPosterBytes * 0.75);
  expect(staticScriptGzipBytes).toBeLessThanOrEqual(220 * 1024);
  expect(mobileScriptGzipBytes).toBeLessThanOrEqual(220 * 1024);
  if (desktopState === "ready") {
    expect(lazyChunkGzipBytes).toBeLessThanOrEqual(700 * 1024);
  }
  expect(liveVitals.lcpMs, "desktop production candidate LCP must be observed").toBeGreaterThan(0);
  expect(liveVitals.lcpMs).toBeLessThanOrEqual(2500);
  expect(liveVitals.cls).toBeLessThanOrEqual(0.1);
  expect(mobileVitals.lcpMs, "mobile production candidate LCP must be observed").toBeGreaterThan(0);
  expect(mobileVitals.lcpMs).toBeLessThanOrEqual(2500);
  expect(mobileVitals.cls).toBeLessThanOrEqual(0.1);
  expect(mobileVitals.inpSampleCount).toBeGreaterThan(0);
  expect(
    mobileVitals.inpMs,
    `Mobile interaction samples exceeded their budget: ${JSON.stringify(mobileVitals.inpEvents)}`,
  ).toBeLessThanOrEqual(200);

  expect(desktopTier).toMatch(/^(FULL|BALANCED|STATIC)$/);
});

test("reduced motion keeps the static Home composition usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /human potential multiplied/i,
    }),
  ).toBeVisible();
  const nextChapterLink = page
    .getByRole("group", { name: "Next steps" })
    .getByRole("link", { name: "Explore the next chapter" });
  await expect(nextChapterLink).toBeVisible();
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
    true,
  );
  await expect(page.getByTestId("hero-scene-stage")).toHaveAttribute(
    "data-quality-tier",
    "STATIC",
  );
  await expect(page.locator("canvas")).toHaveCount(0);

  const duration = await nextChapterLink.evaluate(
    (link) => getComputedStyle(link).transitionDuration,
  );
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.0001);
  await expect(page.locator("header svg [data-master-geometry]")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator("header svg > path")).toHaveCSS("animation-name", "none");
  mkdirSync(screenshotDirectory, { recursive: true });
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-reduced-motion-desktop-1440x900.png"),
    fullPage: false,
    animations: "disabled",
  });
  await page.locator("#capabilities").scrollIntoViewIfNeeded();
  await captureScreenshot(page, {
    path: resolve(screenshotDirectory, "home-reduced-motion-capabilities-1440x900.png"),
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
  await captureScreenshot(page, {
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
  const chromeAsset = await page.evaluate(async (url) => {
    const response = await fetch(url);
    return { status: response.status, svg: await response.text() };
  }, `${origin}/brand/nex-n-precision-blades-chrome-blue.svg`);
  expect(chromeAsset.status).toBe(200);
  expect(chromeAsset.svg).toContain("data:image/webp;base64,");
  await captureScreenshot(page, {
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
