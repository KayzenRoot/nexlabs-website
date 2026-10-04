import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { expect, test, type Page, type Response } from "@playwright/test";

const evidenceDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-011-M06C-CONTACT-FINAL-INTEGRATION/m06a-regressions",
);

const routeCases = [
  {
    path: "/technology",
    title: "Technology | Nex Labs Technology",
    description:
      "Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems.",
    heading: "Systems designed to adapt.",
    primaryNavigation: { name: "Explore solutions", href: "/solutions" },
    researchNavigation: { name: "Explore research", href: "/research" },
    sections: [
      "A modular foundation.",
      "Architecture follows evidence.",
      "From research to operating systems.",
    ],
    screenshot: "technology-desktop-1600x900.png",
    mobileScreenshot: "technology-mobile-390x844.png",
  },
  {
    path: "/solutions",
    title: "Solutions | Nex Labs Technology",
    description:
      "Explore the capability areas and engineering approach Nex Labs uses to frame intelligent systems around real constraints.",
    heading: "Intelligence applied with intent.",
    primaryNavigation: { name: "Explore technology", href: "/technology" },
    researchNavigation: { name: "Explore research", href: "/research" },
    sections: [
      "Different problems need different shapes.",
      "From question to working system.",
      "Focus areas, not promises.",
    ],
    screenshot: "solutions-desktop-1600x900.png",
    mobileScreenshot: "solutions-mobile-390x844.png",
  },
] as const;

const primaryNavigationLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Technology", href: "/technology" },
  { name: "Research", href: "/research" },
  { name: "Company", href: "/company" },
] as const;

function observeScriptResponses(page: Page) {
  const scriptBodies: Promise<number>[] = [];
  const scriptUrls: string[] = [];
  const onResponse = (response: Response) => {
    if (
      response.request().resourceType() !== "script" ||
      !response.url().includes("/_next/static/chunks/")
    ) {
      return;
    }
    scriptUrls.push(response.url());
    scriptBodies.push(response.body().then((body) => gzipSync(body).byteLength));
  };
  page.on("response", onResponse);

  return {
    async finish() {
      page.off("response", onResponse);
      return {
        scriptUrls,
        scriptGzipBytes: (await Promise.all(scriptBodies)).reduce(
          (total, bytes) => total + bytes,
          0,
        ),
      };
    },
  };
}

async function installPerformanceObservers(page: Page) {
  await page.addInitScript(() => {
    const values = { lcpMs: 0, cls: 0, interactionMs: [] as number[] };
    Reflect.set(window, "__m06aPerformance", values);

    try {
      new PerformanceObserver((entries) => {
        const lastEntry = entries.getEntries().at(-1);
        if (lastEntry) values.lcpMs = lastEntry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Keep unsupported observations explicit as zero in the retained report.
    }

    try {
      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!shift.hadRecentInput) values.cls += shift.value ?? 0;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      // Keep unsupported observations explicit as zero in the retained report.
    }

    try {
      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          const event = entry as PerformanceEntry & { interactionId?: number };
          if ((event.interactionId ?? 0) > 0) values.interactionMs.push(entry.duration);
        }
      }).observe({
        type: "event",
        buffered: true,
        durationThreshold: 16,
      } as PerformanceObserverInit);
    } catch {
      // Keep unsupported Event Timing explicit in the retained report.
    }
  });
}

test("M06A routes retain canonical metadata, semantic content and isolated bundles", async ({
  page,
}) => {
  const browserErrors: string[] = [];
  const reports = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  await installPerformanceObservers(page);
  mkdirSync(evidenceDirectory, { recursive: true });

  for (const route of routeCases) {
    await page.setViewportSize({ width: 1600, height: 900 });
    const scripts = observeScriptResponses(page);
    const response = await page.goto(route.path, { waitUntil: "networkidle" });

    expect(response?.status(), `${route.path} response`).toBe(200);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    for (const heading of route.sections) {
      await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
    }
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.getByRole("link", { name: route.primaryNavigation.name })).toHaveAttribute(
      "href",
      route.primaryNavigation.href,
    );
    await expect(page.getByRole("link", { name: route.researchNavigation.name })).toHaveAttribute(
      "href",
      route.researchNavigation.href,
    );

    const observedScripts = await scripts.finish();
    expect(observedScripts.scriptGzipBytes, `${route.path} initial route JS gzip`).toBeLessThanOrEqual(
      220 * 1024,
    );
    expect(observedScripts.scriptUrls.some((url) => /hero-scene|three/i.test(url))).toBe(false);

    const metrics = await page.evaluate(() => {
      const observed = Reflect.get(window, "__m06aPerformance") as {
        cls: number;
        interactionMs: number[];
        lcpMs: number;
      };
      return {
        ...observed,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    if (metrics.lcpMs > 0) expect(metrics.lcpMs).toBeLessThanOrEqual(2500);
    expect(metrics.cls).toBeLessThanOrEqual(0.1);

    await page.screenshot({
      path: resolve(evidenceDirectory, route.screenshot),
      fullPage: false,
      animations: "disabled",
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    const mobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(mobileOverflow, `${route.path} mobile horizontal overflow`).toBe(false);
    await page.screenshot({
      path: resolve(evidenceDirectory, route.mobileScreenshot),
      fullPage: false,
      animations: "disabled",
    });

    reports.push({
      path: route.path,
      title: route.title,
      desktop: metrics,
      scriptGzipBytes: observedScripts.scriptGzipBytes,
      scripts: observedScripts.scriptUrls,
    });
  }

  expect(browserErrors).toEqual([]);
  writeFileSync(
    resolve(evidenceDirectory, "route-performance-report.json"),
    `${JSON.stringify({
      source: "Playwright Chromium; local production build; desktop 1600x900 and mobile 390x844",
      routeJsBudgetGzipBytes: 220 * 1024,
      routes: reports,
    }, null, 2)}\n`,
    "utf8",
  );
});

test("global navigation and route CTAs resolve only to admitted destinations", async ({ page }) => {
  for (const route of routeCases) {
    await page.goto(route.path);
    const header = page.getByRole("banner");
    const headerNavigation = header.getByRole("navigation", { name: "Main navigation" });
    const footerNavigation = page
      .getByRole("contentinfo")
      .getByRole("navigation", { name: "Footer navigation" });

    await expect(header.getByRole("link", { name: "Nex Labs Technology — home" })).toHaveAttribute(
      "href",
      "/",
    );
    for (const navigation of [headerNavigation, footerNavigation]) {
      for (const link of primaryNavigationLinks) {
        await expect(navigation.getByRole("link", { name: link.name })).toHaveAttribute(
          "href",
          link.href,
        );
      }
    }
    for (const ctaContainer of [header, footerNavigation]) {
      await expect(ctaContainer.getByRole("link", { name: "Contact Nex Labs" })).toHaveAttribute(
        "href",
        "/contact",
      );
    }

    const paths = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
    );
    expect(paths).toContain("/contact");
    await page.getByRole("link", { name: route.primaryNavigation.name }).click();
    await expect(page).toHaveURL(new RegExp(`${route.primaryNavigation.href}$`));
  }
});

test("secondary pages preserve skip-link, keyboard focus, responsive layout and reduced motion", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });

  for (const route of routeCases) {
    await page.goto(route.path);
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect
      .poll(() => skipLink.evaluate((element) => element.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(0);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Nex Labs Technology — home" })).toBeFocused();
    const focusShadow = await page.evaluate(() => getComputedStyle(document.activeElement!).boxShadow);
    expect(focusShadow).not.toBe("none");
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
      { width: 1440, height: 900 },
      { width: 900, height: 768 },
      { width: 390, height: 844 },
      { width: 320, height: 740 },
    ]) {
      await page.setViewportSize(viewport);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow, `${route.path} overflow at ${viewport.width}px`).toBe(false);
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
      true,
    );
    const motionDuration = await page
      .locator("[data-secondary-artwork-motion]")
      .evaluate((element) => getComputedStyle(element).animationDuration);
    expect(Number.parseFloat(motionDuration)).toBeLessThanOrEqual(0.0001);
  }
});

test("M06A routes meet WCAG 2.2 AA and Contact is integrated", async ({
  page,
}) => {
  for (const route of routeCases) {
    await page.goto(route.path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }

  const contactResponse = await page.goto("/contact");
  expect(contactResponse?.status(), "/contact is integrated by M06C").toBe(200);
});
