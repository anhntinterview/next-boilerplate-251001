/* eslint-disable no-restricted-imports */
import path from "path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 120_000,
  expect: { timeout: 120_000 },
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: true,
  /* Retry on CI only */
  retries: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "blob",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3001",
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
