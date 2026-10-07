import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

const evidenceDirectory = resolve(
  process.cwd(),
  ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/m07a-regressions",
);
const sixRoutes = ["/", "/technology", "/solutions", "/research", "/company", "/contact"] as const;
const requiredCspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "connect-src 'self'",
] as const;

test("production HTML routes and the 404 carry the minimum security header policy", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const reports = [];

  for (const path of [...sixRoutes, "/__m07a_missing_route__"]) {
    const response = await page.request.get(path);
    const headers = response.headers();
    const expectedStatus = path === "/__m07a_missing_route__" ? 404 : 200;
    expect(response.status(), `${path} HTTP status`).toBe(expectedStatus);
    expect(headers["content-type"]).toContain("text/html");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["strict-transport-security"]).toBeUndefined();
    for (const feature of ["camera", "microphone", "geolocation", "payment"]) {
      expect(headers["permissions-policy"]).toMatch(new RegExp(`${feature}=\\(\\)`));
    }

    const csp = headers["content-security-policy"] ?? "";
    for (const directive of requiredCspDirectives) {
      expect(csp, `${path} includes ${directive}`).toContain(directive);
    }
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    expect(csp).toContain("img-src 'self'");
    expect(csp).toContain("worker-src 'self'");
    expect(csp).not.toContain("data: blob:");
    expect(csp).not.toContain("'self' blob:");
    expect(csp).not.toContain("unsafe-eval");
    reports.push({
      path,
      status: response.status(),
      contentType: headers["content-type"],
      contentSecurityPolicy: csp,
      xContentTypeOptions: headers["x-content-type-options"],
      referrerPolicy: headers["referrer-policy"],
      xFrameOptions: headers["x-frame-options"],
      permissionsPolicy: headers["permissions-policy"],
      hstsPresent: Boolean(headers["strict-transport-security"]),
      result: "PASS",
    });
  }

  await page.goto("/");
  const scriptPath = await page.locator('script[src^="/_next/static/chunks/"]').first().getAttribute("src");
  expect(scriptPath).not.toBeNull();
  const scriptResponse = await page.request.get(scriptPath as string);
  expect(scriptResponse.status()).toBe(200);
  expect(scriptResponse.headers()["content-security-policy"]).toBeUndefined();

  writeFileSync(
    resolve(evidenceDirectory, "production-headers-report.json"),
    `${JSON.stringify({ source: "Playwright HTTP response headers against production Next.js runtime", routes: reports, staticScriptCspPresent: Boolean(scriptResponse.headers()["content-security-policy"]) }, null, 2)}\n`,
    "utf8",
  );
});

test("production Home preloads the responsive static poster", async ({ page }) => {
  const response = await page.request.get("/");
  expect(response.status()).toBe(200);

  const preloadHeaders = response.headers()["link"] ?? "";
  expect(preloadHeaders).toContain(
    "</hero/home-hero-poster.jpg>; rel=preload; as=image; media=\"(min-width: 641px)\"",
  );
  expect(preloadHeaders).toContain(
    "</hero/home-hero-poster-mobile.jpg>; rel=preload; as=image; media=\"(max-width: 640px)\"",
  );
});

test("all routes stay noindex and robots blocks crawling without publishing a sitemap", async ({
  page,
}) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const routeReports = [];

  for (const path of sixRoutes) {
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status(), `${path} route`).toBe(200);
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robotsMeta).toMatch(/noindex/i);
    expect(robotsMeta).toMatch(/nofollow/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    routeReports.push({ path, status: response?.status(), robotsMeta, canonicalAbsent: true });
  }

  const robotsResponse = await page.request.get("/robots.txt");
  const robotsBody = await robotsResponse.text();
  expect(robotsResponse.status()).toBe(200);
  expect(robotsBody).toMatch(/User-Agent:\s*\*/i);
  expect(robotsBody).toMatch(/Disallow:\s*\//i);
  expect(robotsBody).not.toMatch(/^Sitemap:/im);

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(404);
  writeFileSync(
    resolve(evidenceDirectory, "prelaunch-indexing-report.json"),
    `${JSON.stringify({ routes: routeReports, robots: { status: robotsResponse.status(), body: robotsBody }, sitemap: { status: sitemapResponse.status(), absent: sitemapResponse.status() === 404 }, result: "PASS" }, null, 2)}\n`,
    "utf8",
  );
});



test("prelaunch banner is visible on every public route", async ({ page }) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const reports = [];

  for (const path of sixRoutes) {
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status(), `${path} route`).toBe(200);
    const banner = page.locator("[data-prelaunch-banner]");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("PRE-LAUNCH");
    await expect(banner).toContainText("This website is still in production and is not yet final.");
    reports.push({ path, status: response?.status(), visible: true, text: await banner.innerText() });
  }

  writeFileSync(
    resolve(evidenceDirectory, "prelaunch-banner-report.json"),
    `${JSON.stringify({ routes: reports, result: "PASS" }, null, 2)}\n`,
    "utf8",
  );
});

test("branded 404 has no Axe violations and exposes a safe route back Home", async ({ page }) => {
  mkdirSync(evidenceDirectory, { recursive: true });
  const response = await page.goto("/__m07a_missing_route__", { waitUntil: "networkidle" });

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "This page is outside our signal." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");
  await expect(page.getByText(/stack trace|internal error|exception/i)).toHaveCount(0);

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.screenshot({
    path: resolve(evidenceDirectory, "branded-404-desktop-1600x900.png"),
    fullPage: true,
    animations: "disabled",
  });
  writeFileSync(
    resolve(evidenceDirectory, "branded-404-accessibility-report.json"),
    `${JSON.stringify({ status: response?.status(), heading: "This page is outside our signal.", recoveryLink: "/", axeTool: "@axe-core/playwright", violations: accessibility.violations.map(({ id, impact, help }) => ({ id, impact, help })), incomplete: accessibility.incomplete.map(({ id, impact, help }) => ({ id, impact, help })), result: accessibility.violations.length === 0 ? "PASS" : "FAIL" }, null, 2)}\n`,
    "utf8",
  );
});
