import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { expect, test, type Page, type Response } from "@playwright/test";

const evidenceDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-010-M06B-RESEARCH-COMPANY",
);

const routeCases = [
  {
    path: "/research",
    title: "Research | Nex Labs Technology",
    description:
      "Explore how Nex Labs turns technical questions into experiments, evidence and systems that can inform future products and platforms.",
    heading: "Questions become systems.",
    sections: ["Learn before scaling.", "Where we explore.", "Evidence over spectacle."],
    copy: [
      "Frame the question",
      "Build a testable model",
      "Measure meaningful signals",
      "Decide what deserves to continue",
      "Reasoning & Automation",
      "Human-System Interaction",
      "Intelligent Infrastructure",
      "Applied Data Systems",
      "Real-World Integration",
    ],
    desktopScreenshot: "research-desktop-1600x900.png",
    mobileScreenshot: "research-mobile-390x844.png",
  },
  {
    path: "/company",
    title: "Company | Nex Labs Technology",
    description:
      "Learn the purpose, operating principles and engineering mindset that shape Nex Labs Technology.",
    heading: "Technology with a reason to exist.",
    sections: [
      "Build what earns its complexity.",
      "How direction becomes discipline.",
      "A loop, not a handoff.",
      "Proof should stay factual.",
    ],
    copy: [
      "Human-centered",
      "Research-led",
      "Secure by design",
      "Built for real-world systems",
      "Clarify before adding complexity",
      "Make assumptions testable",
      "Keep architecture adaptable",
      "Leave evidence behind",
    ],
    desktopScreenshot: "company-desktop-1600x900.png",
    mobileScreenshot: "company-mobile-390x844.png",
  },
] as const;

const globalNavigation = [
  { name: "Solutions", href: "/solutions" },
  { name: "Technology", href: "/technology" },
  { name: "Research", href: "/research" },
  { name: "Company", href: "/company" },
] as const;

async function monitorRoute(page: Page) {
  const chunkResponses: Response[] = [];
  const rememberChunk = (response: Response) => {
    const requestIsScript = response.request().resourceType() === "script";
    const chunkPath = new URL(response.url()).pathname;
    if (requestIsScript && chunkPath.startsWith("/_next/static/chunks/")) {
      chunkResponses.push(response);
    }
  };
  page.on("response", rememberChunk);

  await page.addInitScript(() => {
    const values = { lcpMs: 0, cls: 0, interactionMs: [] as number[] };
    Reflect.set(window, "__m06bPerformance", values);

    const observe = (type: string, callback: PerformanceObserverCallback) => {
      try {
        const observer = new PerformanceObserver(callback);
        observer.observe({ type, buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
      } catch {
        // Unsupported performance entries stay zero/empty in the retained report.
      }
    };

    observe("largest-contentful-paint", (entries) => {
      values.lcpMs = entries.getEntries().at(-1)?.startTime ?? 0;
    });
    observe("layout-shift", (entries) => {
      values.cls = entries.getEntries().reduce((total, entry) => {
        const shift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        return total + (shift.hadRecentInput ? 0 : (shift.value ?? 0));
      }, values.cls);
    });
    observe("event", (entries) => {
      const interactions = entries
        .getEntries()
        .filter((entry) => ((entry as PerformanceEntry & { interactionId?: number }).interactionId ?? 0) > 0)
        .map((entry) => entry.duration);
      values.interactionMs.push(...interactions);
    });
  });

  return {
    async finish() {
      page.off("response", rememberChunk);
      const bundles = await Promise.all(
        chunkResponses.map(async (response) => ({
          url: response.url(),
          gzipBytes: gzipSync(await response.body()).byteLength,
        })),
      );
      return {
        scriptUrls: bundles.map(({ url }) => url),
        scriptGzipBytes: bundles.reduce((sum, bundle) => sum + bundle.gzipBytes, 0),
      };
    },
  };
}

async function snapshotRoute(page: Page) {
  return page.evaluate(() => {
    const vitals = Reflect.get(window, "__m06bPerformance") as {
      cls: number;
      interactionMs: number[];
      lcpMs: number;
    };
    const root = document.documentElement;
    return {
      lcpMs: vitals.lcpMs,
      cls: vitals.cls,
      interactionMs: vitals.interactionMs,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
    };
  });
}

async function measureSkipLinkKeyboardProxy(page: Page) {
  await page.evaluate(() => {
    const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main"]');
    if (!skipLink) throw new Error("The admitted skip link was not found.");

    skipLink.addEventListener(
      "click",
      () => {
        const startedAt = performance.now();
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            Reflect.set(window, "__m06bInteractionProxyMs", performance.now() - startedAt),
          ),
        );
      },
      { once: true },
    );
  });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.waitForFunction(
    () => typeof Reflect.get(window, "__m06bInteractionProxyMs") === "number",
  );
  return page.evaluate(() => Reflect.get(window, "__m06bInteractionProxyMs") as number);
}

test("Research and Company render canonical content, metadata and isolated route bundles", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const browserErrors: string[] = [];
  const reports = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  for (const route of routeCases) {
    await page.setViewportSize({ width: 1600, height: 900 });
    const scripts = await monitorRoute(page);
    const response = await page.goto(route.path, { waitUntil: "networkidle" });

    expect(response?.status(), `${route.path} response`).toBe(200);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    for (const section of route.sections) {
      await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
    }
    for (const copy of route.copy) {
      await expect(page.getByRole("heading", { level: 3, name: copy })).toBeVisible();
    }
    await expect(page.locator("canvas")).toHaveCount(0);

    const observedScripts = await scripts.finish();
    expect(observedScripts.scriptGzipBytes, `${route.path} initial JS gzip`).toBeLessThanOrEqual(
      220 * 1024,
    );
    expect(observedScripts.scriptUrls.some((url) => /hero-scene|three/i.test(url))).toBe(false);

    const metrics = await snapshotRoute(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    if (metrics.lcpMs > 0) expect(metrics.lcpMs).toBeLessThanOrEqual(2500);
    expect(metrics.cls).toBeLessThanOrEqual(0.1);

    await page.screenshot({
      path: resolve(evidenceDirectory, route.desktopScreenshot),
      fullPage: false,
      animations: "disabled",
    });
    const interactionProxyMs = await measureSkipLinkKeyboardProxy(page);
    expect(interactionProxyMs, `${route.path} keyboard interaction proxy`).toBeLessThanOrEqual(
      200,
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    const mobileMetrics = await snapshotRoute(page);
    expect(mobileMetrics.scrollWidth).toBeLessThanOrEqual(mobileMetrics.clientWidth);
    if (mobileMetrics.lcpMs > 0) {
      expect(mobileMetrics.lcpMs, `${route.path} mobile LCP`).toBeLessThanOrEqual(2500);
    }
    expect(mobileMetrics.cls, `${route.path} mobile CLS`).toBeLessThanOrEqual(0.1);
    await page.screenshot({
      path: resolve(evidenceDirectory, route.mobileScreenshot),
      fullPage: false,
      animations: "disabled",
    });

    reports.push({
      path: route.path,
      title: route.title,
      desktop: metrics,
      mobile: mobileMetrics,
      interactionProxy: {
        interaction: "Skip-link keyboard activation to the second animation frame",
        measuredMs: interactionProxyMs,
        targetMs: 200,
        note: "Lab proxy; not real-user INP.",
      },
      scriptGzipBytes: observedScripts.scriptGzipBytes,
      scripts: observedScripts.scriptUrls,
    });
  }

  expect(browserErrors).toEqual([]);
  writeFileSync(
    resolve(evidenceDirectory, "route-performance-report.json"),
    `${JSON.stringify(
      {
        source: "Playwright Chromium; local production build; desktop 1600x900 and mobile 390x844",
        routeJsBudgetGzipBytes: 220 * 1024,
        routes: reports,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
});

test("Research and Company pass WCAG 2.2 AA, keyboard, reduced-motion and responsive checks", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const accessibilityReports = [];
  const responsiveReports = [];

  for (const route of routeCases) {
    await page.goto(route.path);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibility.violations, `${route.path} axe violations`).toEqual([]);
    accessibilityReports.push({
      path: route.path,
      standard: "WCAG 2.2 AA; axe-core tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa",
      passes: accessibility.passes.length,
      incomplete: accessibility.incomplete.map(({ id, impact, help, nodes }) => ({
        id,
        impact,
        help,
        nodeCount: nodes.length,
        manualReviewReasons: [
          ...new Set(
            nodes.flatMap((node) =>
              [...node.any, ...node.all, ...node.none].map((check) => check.message),
            ),
          ),
        ],
      })),
      violations: accessibility.violations.map(({ id, impact, help }) => ({ id, impact, help })),
    });

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect
      .poll(() => skipLink.evaluate((element) => element.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(0);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Nex Labs Technology — home" })).toBeFocused();
    await page.screenshot({
      path: resolve(evidenceDirectory, `${route.path.slice(1)}-keyboard-focus.png`),
      fullPage: false,
      animations: "disabled",
    });
    await page.keyboard.press("Shift+Tab");
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();

    for (const viewport of [
      { width: 1600, height: 900 },
      { width: 1440, height: 900 },
      { width: 900, height: 768 },
      { width: 390, height: 844 },
      { width: 320, height: 740 },
    ]) {
      await page.setViewportSize(viewport);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      const report = {
        path: route.path,
        viewport: `${viewport.width}x${viewport.height}`,
        ...dimensions,
        horizontalOverflow: dimensions.scrollWidth > dimensions.clientWidth,
      };
      responsiveReports.push(report);
      expect(report.horizontalOverflow, `${route.path} overflow at ${viewport.width}px`).toBe(false);
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    const motionState = await page.evaluate(() => ({
      preferenceApplied: matchMedia("(prefers-reduced-motion: reduce)").matches,
      animationDurations: [...document.querySelectorAll("[data-secondary-artwork-motion]")].map(
        (element) => getComputedStyle(element).animationDuration,
      ),
    }));
    expect(motionState.preferenceApplied).toBe(true);
    expect(
      motionState.animationDurations.every((duration) => Number.parseFloat(duration) <= 0.0001),
    ).toBe(true);
    await page.screenshot({
      path: resolve(evidenceDirectory, `${route.path.slice(1)}-reduced-motion.png`),
      fullPage: false,
      animations: "disabled",
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }

  writeFileSync(
    resolve(evidenceDirectory, "axe-results.json"),
    `${JSON.stringify({ tool: "@axe-core/playwright", routes: accessibilityReports }, null, 2)}\n`,
    "utf8",
  );
  writeFileSync(
    resolve(evidenceDirectory, "responsive-overflow-report.json"),
    `${JSON.stringify({ source: "Playwright Chromium", viewports: responsiveReports }, null, 2)}\n`,
    "utf8",
  );
});

test("M06B navigation and all admitted Research transitions resolve; Contact stays reserved", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const expectedPaths = ["/", "/technology", "/solutions", "/research", "/company"];
  const navigationReports = [];

  for (const path of ["/", "/technology", "/solutions", "/research", "/company"]) {
    await page.goto(path);
    const header = page.getByRole("banner");
    const footer = page.getByRole("contentinfo");
    for (const navigation of [
      header.getByRole("navigation", { name: "Main navigation" }),
      footer.getByRole("navigation", { name: "Footer navigation" }),
    ]) {
      for (const link of globalNavigation) {
        await expect(navigation.getByRole("link", { name: link.name })).toHaveAttribute(
          "href",
          link.href,
        );
      }
    }
    await expect(header.getByRole("link", { name: "Explore the next chapter" })).toHaveAttribute(
      "href",
      "/#contact",
    );
    await expect(footer.getByRole("link", { name: "Explore the next chapter" })).toHaveAttribute(
      "href",
      "/#contact",
    );
    navigationReports.push({
      page: path,
      headerLinks: globalNavigation,
      footerLinks: globalNavigation,
      nextChapterHref: "/#contact",
    });

    if (path === "/research" || path === "/company") {
      await page.setViewportSize({ width: 1600, height: 900 });
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await page.screenshot({
        path: resolve(evidenceDirectory, `${path.slice(1)}-footer-navigation-1600x900.png`),
        fullPage: false,
        animations: "disabled",
      });
    }

    const linkedPaths = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
    );
    expect(linkedPaths).not.toContain("/contact");
    for (const target of expectedPaths) {
      expect(linkedPaths, `${path} includes the intended ${target} route when linked`).toContain(
        target,
      );
    }
  }

  const homeResponse = await page.goto("/");
  expect(homeResponse?.status()).toBe(200);
  await page.locator("#research").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Explore research", exact: true })).toHaveAttribute(
    "href",
    "/research",
  );
  await page.screenshot({
    path: resolve(evidenceDirectory, "home-research-cta-transition-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.getByText(
      "Technology, Solutions, Research and Company extend the Nex Labs story beyond the Home. Contact remains the next dedicated destination.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View research" })).toHaveAttribute(
    "href",
    "/research",
  );
  await page.screenshot({
    path: resolve(evidenceDirectory, "home-final-research-cta-transition-1600x900.png"),
    fullPage: false,
    animations: "disabled",
  });

  for (const path of ["/technology", "/solutions"]) {
    await page.goto(path);
    await expect(page.getByRole("link", { name: "Explore research" })).toHaveAttribute(
      "href",
      "/research",
    );
    await page.screenshot({
      path: resolve(evidenceDirectory, `${path.slice(1)}-research-cta-transition-1600x900.png`),
      fullPage: false,
      animations: "disabled",
    });
  }

  const contactResponse = await page.goto("/contact");
  expect(contactResponse?.status(), "/contact stays reserved for M06C").toBe(404);
  writeFileSync(
    resolve(evidenceDirectory, "navigation-report.json"),
    `${JSON.stringify(
      {
        source: "Playwright Chromium navigation assertions",
        verifiedPages: navigationReports,
        homeResearchActions: [
          { label: "Explore research", href: "/research" },
          { label: "View research", href: "/research" },
        ],
        technologyAndSolutionsResearchActions: [
          { label: "Explore research", href: "/research" },
        ],
        contactRouteStatus: 404,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
});
