import { expect, test } from "@playwright/test";

const routes = ["/","/technology","/solutions","/research","/company",
  "/company/verification","/contact","/projects", "/projects/hive",
  "/projects/nexlabs-company-os","/projects/nerva","/projects/ugas-v2",
  "/projects/coinblink"];

test("SEO candidate uses self-canonical tags and preview-safe noindex", async ({ page }) => {
  for (const path of routes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    const canonical = "https://www.nexlabs.company" + path;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("[data-prelaunch-banner]")).toContainText("PRE-LAUNCH");
  }
});

test("sitemap has 13 unique canonical URLs and preview robots stays restricted", async ({ request }) => {
  const [r, s] = await Promise.all([request.get("/robots.txt"),request.get("/sitemap.xml")]);
  expect(r.status()).toBe(200);
  expect(await r.text()).toMatch(/Disallow:\s*\//);
  expect(s.status()).toBe(200);
  const xml = await s.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  expect(urls).toHaveLength(13);
  expect(new Set(urls).size).toBe(13);
  expect(urls).toContain("https://www.nexlabs.company/company/verification");
  expect(urls).toContain("https://www.nexlabs.company/projects/hive");
});
