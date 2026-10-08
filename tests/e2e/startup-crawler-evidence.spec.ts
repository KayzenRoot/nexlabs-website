import { expect, test } from "@playwright/test";

test("engineering proof is server-rendered and survives scripts being blocked", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", route => route.abort());
  const response = await page.goto("/engineering");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: /HIVE\. Source before promises/i })).toBeVisible();
  await expect(page.getByText("v1.0.2", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Inspect stable release/i })).toHaveAttribute("href", "https://github.com/KayzenRoot/hive/releases/tag/v1.0.2");
  await expect(page.getByText(/a future direction, not a claim/i)).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.nexlabs.company/engineering");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
test("public product references are connected and text retrieval hint is accessible", async ({ page, request }) => {
  await page.goto("/projects");
  await expect(page.getByRole("link", { name: /HIVE engineering evidence/i })).toHaveAttribute("href", "/engineering");
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Engineering evidence" })).toHaveAttribute("href", "/engineering");
  const r = await request.get("/llms.txt");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("text/plain");
  expect(await r.text()).toContain("https://www.nexlabs.company/engineering");
});
