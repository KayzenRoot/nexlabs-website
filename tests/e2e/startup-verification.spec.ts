import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("verification page discloses real founder and pre-incorporation facts", async ({ page }) => {
  const response = await page.goto("/company/verification");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText("Verify the people");
  await expect(page.getByText("Clayton Nunes")).toBeVisible();
  await expect(page.getByText("Brazil", { exact: true })).toBeVisible();
  await expect(page.getByText("founder@nexlabs.company")).toBeVisible();
  await expect(page.getByText("Founder-led, bootstrapped, pre-incorporation")).toBeVisible();
  await expect(page.getByRole("link", { name: /Inspect source and releases/i })).toHaveAttribute("href", "https://github.com/KayzenRoot/hive");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("[data-prelaunch-banner]")).toContainText("PRE-LAUNCH");
});

test("public portfolio links to the founder record and supports mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects");
  await page.getByRole("link", { name: /Founder and project verification/i }).click();
  await expect(page).toHaveURL(/\/company\/verification$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const issues = (await new AxeBuilder({ page }).analyze()).violations.filter(v => v.impact === "serious" || v.impact === "critical");
  expect(issues).toEqual([]);
});
