/* eslint-disable no-restricted-imports */
import path from "path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

if (!process.env.SECRET_API_KEY) {
  throw new Error("SECRET_API_KEY is required to run these tests.");
}

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  override: false,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: Number(process.env.PLAYWRIGHT_TIMEOUT) || 120_000,
  expect: { timeout: Number(process.env.PLAYWRIGHT_EXPECT_TIMEOUT) || 120_000 },
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: true,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "blob",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || "http://localhost:3001",
    timezoneId: "UTC",
    locale: "en-GB",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /setup\.ts/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Use prepared browser state.
        storageState: "tests/browser-state.json",
      },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    command: "npm start -- --port 3001",
    port: 3001,
    reuseExistingServer: false,
    timeout: 120000, // Increase webServer timeout
    stdout: process.env.PLAYWRIGHT_LOGGING_LEVEL === "2" ? "pipe" : "ignore",
    stderr: process.env.PLAYWRIGHT_LOGGING_LEVEL === "3" ? "pipe" : "ignore",
  },
});
