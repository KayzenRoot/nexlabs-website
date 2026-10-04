import { resolve } from "node:path";
import { defineConfig, devices } from "@playwright/test";

const candidatePort = Number(process.env.NEXLABS_RELEASE_PORT ?? "3002");
if (!Number.isInteger(candidatePort) || candidatePort < 1024 || candidatePort > 65535) {
  throw new Error("NEXLABS_RELEASE_PORT must be a valid TCP port between 1024 and 65535.");
}

/** Runs the unchanged full E2E suite against an already-running production image. */
export default defineConfig({
  testDir: resolve(process.cwd(), "tests/e2e"),
  fullyParallel: true,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  reporter: "list",
  outputDir: resolve(process.cwd(), "test-results-performance001"),
  use: {
    baseURL: `http://127.0.0.1:${candidatePort}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
