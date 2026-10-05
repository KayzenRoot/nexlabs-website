import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { expect, test, type Page, type Response } from "@playwright/test";
import { captureScreenshot } from "./evidence";

const evidenceDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/m06c-regressions",
);
const sixRoutes = ["/", "/technology", "/solutions", "/research", "/company", "/contact"] as const;
const primaryNavigation = [
  { label: "Solutions", href: "/solutions" },
  { label: "Technology", href: "/technology" },
  { label: "Research", href: "/research" },
  { label: "Company", href: "/company" },
] as const;

async function watchInitialScripts(page: Page) {
  const scripts: Response[] = [];
  const listener = (response: Response) => {
    if (
      response.request().resourceType() === "script" &&
      new URL(response.url()).pathname.startsWith("/_next/static/chunks/")
    ) {
      scripts.push(response);
    }
  };
  page.on("response", listener);
  return {
    async finish() {
      page.off("response", listener);
      const files = await Promise.all(
        scripts.map(async (response) => ({
          url: response.url(),
          gzipBytes: gzipSync(await response.body()).byteLength,
        })),
      );
      return {
        urls: files.map((file) => file.url),
        gzipBytes: files.reduce((sum, file) => sum + file.gzipBytes, 0),
      };
    },
  };
}

async function captureVitals(page: Page) {
  await page.addInitScript(() => {
    const values = { lcpMs: 0, cls: 0 };
    Reflect.set(window, "__m06cVitals", values);
    for (const type of ["largest-contentful-paint", "layout-shift"] as const) {
      try {
        const observer = new PerformanceObserver((entries) => {
          if (type === "largest-contentful-paint") {
            values.lcpMs = entries.getEntries().at(-1)?.startTime ?? values.lcpMs;
          } else {
            values.cls += entries.getEntries().reduce((sum, entry) => {
              const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
              return sum + (shift.hadRecentInput ? 0 : (shift.value ?? 0));
            }, 0);
          }
        });
        observer.observe({ type, buffered: true } as PerformanceObserverInit);
      } catch {
        // Unsupported performance entry types remain explicitly zero in the retained report.
      }
    }
  });
}

async function viewportMetrics(page: Page) {
  return page.evaluate(() => ({
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    lcpMs: (Reflect.get(window, "__m06cVitals") as { lcpMs: number }).lcpMs,
    cls: (Reflect.get(window, "__m06cVitals") as { cls: number }).cls,
  }));
}

test("Contact renders exact canonical copy, metadata and a zero-collection surface", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const nonGetRequests: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET" && request.method() !== "HEAD") {
      nonGetRequests.push(`${request.method()} ${new URL(request.url()).pathname}`);
    }
  });
  const response = await page.goto("/contact", { waitUntil: "networkidle" });

  expect(response?.status(), "Contact route status").toBe(200);
  await expect(page).toHaveTitle("Contact | Nex Labs Technology");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Prepare the context for a future conversation with Nex Labs Technology and understand the information boundary of the current V1 contact experience.",
  );
  await expect(page.getByRole("heading", { level: 1, name: "Start with the right context." })).toBeVisible();
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 2, name: "Bring the signal, not the noise." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Channels stay verified." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Your information stays with you." })).toBeVisible();

  const brief = [
    ["Problem & decision", "What needs to change, and what decision depends on it?"],
    ["Operating context", "Users, workflows, systems, hardware or environments that shape the problem."],
    ["Constraints & risks", "Security, privacy, reliability, timing, integration and resource boundaries."],
    ["Evidence & success signals", "What is already known, what remains uncertain and what would count as useful progress."],
  ];
  for (const [heading, description] of brief) {
    await expect(page.getByRole("heading", { level: 3, name: heading })).toBeVisible();
    await expect(page.getByText(description, { exact: true })).toBeVisible();
  }
  for (const text of [
    "Useful conversations begin with a clear problem, the constraints around it and the decision that needs to move. This V1 page helps structure that context without collecting or transmitting information.",
    "A concise brief makes it easier to understand whether research, engineering or product work may be relevant. Keep confidential, regulated or credential material out of any future message unless a verified secure channel is explicitly provided.",
    "Nex Labs publishes contact channels only after they are verified and governed. No direct contact channel is published in this V1 build, and this page contains no contact form, upload field, submission endpoint or analytics tracker.",
    "A future governed increment may add a verified channel without changing the information architecture of this page.",
    "This page does not request or transmit personal information. Do not send sensitive information through unofficial channels that claim to represent Nex Labs.",
  ]) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "Prepare the brief" })).toHaveAttribute("href", "#brief");
  await expect(page.getByRole("link", { name: "Explore solutions" })).toHaveAttribute("href", "/solutions");
  await expect(page.getByRole("link", { name: "Explore company principles" })).toHaveAttribute("href", "/company");

  await expect(page.locator("form, input, textarea, select, button:not([data-site-menu-trigger]), [type='file'], [type='submit']")).toHaveCount(0);
  await expect(page.locator("a[href^='mailto:'], a[href^='tel:']")).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("[data-secondary-page='contact'] canvas, [data-secondary-page='contact'] [data-hero-scene-stage]")).toHaveCount(0);
  expect(nonGetRequests, "Contact must not submit or transmit form-like data").toEqual([]);

  const collectionReport = {
    route: "/contact",
    result: "PASS",
    forms: await page.locator("form").count(),
    inputs: await page.locator("input").count(),
    textareas: await page.locator("textarea").count(),
    selects: await page.locator("select").count(),
    fileUploads: await page.locator("input[type='file']").count(),
    submitControls: await page.locator("button, input[type='submit'], [type='submit']").count(),
    mailtoLinks: await page.locator("a[href^='mailto:']").count(),
    telLinks: await page.locator("a[href^='tel:']").count(),
    nonGetRequests,
    externalLinks: await page.locator("main a[href^='http']").count(),
    canvas: await page.locator("canvas").count(),
    note: "DOM and browser network observation on the production build; no contact data collection or transmission surface was found.",
  };
  writeFileSync(resolve(evidenceDirectory, "zero-collection-report.json"), `${JSON.stringify(collectionReport, null, 2)}\n`);
});

test("Contact meets accessibility, reduced-motion, responsive and isolated-route budgets", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  await captureVitals(page);
  const scripts = await watchInitialScripts(page);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/contact", { waitUntil: "networkidle" });
  const desktopScripts = await scripts.finish();
  expect(desktopScripts.gzipBytes).toBeLessThanOrEqual(220 * 1024);
  expect(desktopScripts.urls.some((url) => /hero-scene|three|webgl/i.test(url))).toBe(false);
  await captureScreenshot(page, {
    path: resolve(evidenceDirectory, "contact-desktop-1600x900.png"),
    fullPage: true,
    animations: "disabled",
  });

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  writeFileSync(
    resolve(evidenceDirectory, "contact-axe-report.json"),
    `${JSON.stringify({
      standard: "WCAG 2.2 AA; axe-core wcag2a, wcag2aa, wcag21a, wcag21aa and wcag22aa",
      passes: accessibility.passes.length,
      incomplete: accessibility.incomplete.map(({ id, impact, help, nodes }) => ({
        id,
        impact,
        help,
        nodeCount: nodes.length,
        nodes: nodes.map((node) => ({
          target: node.target,
          reviewReasons: [...node.any, ...node.all, ...node.none].map((check) => check.message),
        })),
      })),
      violations: accessibility.violations.map(({ id, impact, help }) => ({ id, impact, help })),
    }, null, 2)}\n`,
  );

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await captureScreenshot(page, { path: resolve(evidenceDirectory, "contact-keyboard-focus.png"), animations: "disabled" });
  await page.evaluate(() => {
    const skip = document.querySelector<HTMLAnchorElement>('a[href="#main"]');
    if (!skip) throw new Error("Contact skip link is missing.");
    skip.addEventListener("click", () => {
      const startedAt = performance.now();
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          Reflect.set(window, "__m06cInteractionProxyMs", performance.now() - startedAt),
        ),
      );
    }, { once: true });
  });
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.waitForFunction(() => typeof Reflect.get(window, "__m06cInteractionProxyMs") === "number");
  const interactionProxyMs = await page.evaluate(
    () => Reflect.get(window, "__m06cInteractionProxyMs") as number,
  );
  expect(interactionProxyMs).toBeLessThanOrEqual(200);

  const responsiveReports = [];
  for (const viewport of [
    { width: 1600, height: 900 },
    { width: 1440, height: 900 },
    { width: 900, height: 768 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/contact", { waitUntil: "networkidle" });
    const metrics = await viewportMetrics(page);
    const horizontalOverflow = metrics.scrollWidth > metrics.clientWidth;
    expect(horizontalOverflow, `Contact overflow at ${viewport.width}px`).toBe(false);
    if (metrics.lcpMs > 0) expect(metrics.lcpMs, `Contact LCP at ${viewport.width}px`).toBeLessThanOrEqual(2500);
    expect(metrics.cls, `Contact CLS at ${viewport.width}px`).toBeLessThanOrEqual(0.1);
    const contactAction = page.getByRole("banner").getByRole("link", { name: "Contact Nex Labs" });
    await expect(contactAction).toBeVisible();
    const actionBounds = await contactAction.boundingBox();
    expect(actionBounds).not.toBeNull();
    expect(actionBounds!.x).toBeGreaterThanOrEqual(0);
    expect(actionBounds!.x + actionBounds!.width).toBeLessThanOrEqual(viewport.width);
    responsiveReports.push({ ...metrics, horizontalOverflow, headerContactActionVisible: true });
    if (viewport.width === 390) {
      await captureScreenshot(page, {
        path: resolve(evidenceDirectory, "contact-mobile-390x844.png"),
        fullPage: true,
        animations: "disabled",
      });
    }
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/contact", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Start with the right context." })).toBeVisible();
  const reducedMotion = await page.evaluate(() => ({
    enabled: matchMedia("(prefers-reduced-motion: reduce)").matches,
    artworkAnimation: getComputedStyle(document.querySelector("[data-secondary-artwork-motion]")!).animationName,
    signalAnimation: getComputedStyle(document.querySelector("[data-contact-signal]")!).animationName,
  }));
  expect(reducedMotion.enabled).toBe(true);
  expect(reducedMotion.artworkAnimation).toBe("none");
  expect(reducedMotion.signalAnimation).toBe("none");
  await captureScreenshot(page, { path: resolve(evidenceDirectory, "contact-reduced-motion-1440x900.png"), animations: "disabled" });
  writeFileSync(
    resolve(evidenceDirectory, "contact-responsive-performance-report.json"),
    `${JSON.stringify({
      source: "Playwright Chromium against local production build",
      budgets: { routeInitialJsGzipBytes: 220 * 1024, lcpMs: 2500, cls: 0.1, interactionProxyMs: 200 },
      scripts: desktopScripts,
      viewports: responsiveReports,
      reducedMotion,
      interactionProxy: { method: "keyboard Tab then Enter on skip-link target; two animation frames", measuredMs: Number(interactionProxyMs.toFixed(1)), result: "main received focus", targetMs: 200, limitation: "lab proxy rather than real-user INP" },
    }, null, 2)}\n`,
  );
});

test("Contact navigation is final across six V1 routes and Home retains its section anchor", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const routeReport = [];
  for (const path of sixRoutes) {
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status(), `${path} route`).toBe(200);
    const banner = page.getByRole("banner");
    const mainNav = banner.getByRole("navigation", { name: "Main navigation" });
    const footerNav = page.getByRole("contentinfo").getByRole("navigation", { name: "Footer navigation" });
    await expect(mainNav.getByRole("link")).toHaveCount(4);
    for (const navLink of primaryNavigation) {
      await expect(mainNav.getByRole("link", { name: navLink.label })).toHaveAttribute("href", navLink.href);
    }
    await expect(banner.getByRole("link", { name: "Contact Nex Labs" })).toHaveAttribute("href", "/contact");
    await expect(footerNav.getByRole("link", { name: "Contact Nex Labs" })).toHaveAttribute("href", "/contact");
    if (path === "/contact") {
      await captureScreenshot(page, { path: resolve(evidenceDirectory, "contact-header-action-1600x900.png"), animations: "disabled" });
      await footerNav.scrollIntoViewIfNeeded();
      await captureScreenshot(page, { path: resolve(evidenceDirectory, "contact-footer-action-1600x900.png"), animations: "disabled" });
      await page.getByRole("link", { name: "Contact Nex Labs" }).first().click();
      await expect(page).toHaveURL(/\/contact$/);
    }
    routeReport.push({ path, status: response?.status(), headerContact: "/contact", footerContact: "/contact", primaryNavigationCount: 4 });
  }

  const home = await page.goto("/", { waitUntil: "networkidle" });
  expect(home?.status()).toBe(200);
  const finalCta = page.locator("#contact");
  await expect(finalCta).toBeAttached();
  await finalCta.scrollIntoViewIfNeeded();
  await expect(finalCta.getByText("Explore the systems, research and principles shaping Nex Labs, then use Contact to frame the context for a future conversation.", { exact: true })).toBeVisible();
  await expect(finalCta.getByRole("link", { name: "Explore capabilities" })).toHaveAttribute("href", "#capabilities");
  await expect(finalCta.getByRole("link", { name: "Contact Nex Labs" })).toHaveAttribute("href", "/contact");
  await captureScreenshot(page, { path: resolve(evidenceDirectory, "home-final-contact-transition-1600x900.png"), animations: "disabled" });

  writeFileSync(
    resolve(evidenceDirectory, "six-route-navigation-report.json"),
    `${JSON.stringify({ source: "Playwright Chromium navigation assertions", routes: routeReport, homeFinalCta: { sectionIdPreserved: "#contact", primary: { label: "Explore capabilities", href: "#capabilities" }, secondary: { label: "Contact Nex Labs", href: "/contact" } } }, null, 2)}\n`,
  );
});
