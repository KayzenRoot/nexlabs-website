import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/projects",
  "/projects/hive",
  "/projects/nexlabs-company-os",
  "/projects/nerva",
  "/projects/ugas-v2",
  "/projects/coinblink",
] as const;

test("all six evidence-backed project pages remain available and pre-launch indexed off", async ({ page }) => {
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-prelaunch-banner]")).toContainText("PRE-LAUNCH");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});

test("portfolio navigation and public repository links are honest and reachable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("link", { name: /View project record/i })).toHaveCount(5);
  await page.getByRole("link", { name: /View project record/i }).first().click();
  await expect(page).toHaveURL(/\/projects\/hive$/);
  const github = page.getByRole("link", { name: /Inspect public GitHub repository/i });
  await expect(github).toHaveAttribute("href", "https://github.com/KayzenRoot/hive");
  await expect(github).toHaveAttribute("rel", /noopener/);
});

test("project pages fit mobile and have no serious accessibility violation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/projects", "/projects/hive"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    const violations = (await new AxeBuilder({ page }).analyze()).violations
      .filter(({ impact }) => impact === "serious" || impact === "critical");
    expect(violations, path).toEqual([]);
  }
});
