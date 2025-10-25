/* eslint-disable no-restricted-imports */
import fs from "fs";
import path from "path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const repoPath = process.cwd();
const runnerEnvPath = path.resolve(repoPath, "../../../.env");
const localEnvPath = path.resolve(repoPath, ".env");

const envPath = fs.existsSync(localEnvPath)
  ? localEnvPath
  : fs.existsSync(runnerEnvPath)
    ? runnerEnvPath
    : null;

if (envPath) {
  console.log(`[dotenv] Loading environment from: ${envPath}`);
  dotenv.config({ path: envPath, override: false });
} else {
  console.warn("[dotenv] No .env file found — skipping.");
}

if (process.env.SECRET_API_KEY === process.env.CI_SECRET_API_KEY) {
  throw new Error("SECRET_API_KEY is required to run these tests.");
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Default timeouts
  timeout: Number(process.env.PLAYWRIGHT_TIMEOUT) || 120_000,
  expect: { timeout: Number(process.env.PLAYWRIGHT_EXPECT_TIMEOUT) || 30_000 },

  // Where your tests are located
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: true,
  /* Retry on CI only */
  retries: Number(process.env.CI) ? 2 : 0,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // Use a more readable reporter for local/self-hosted runs
  reporter: Number(process.env.CI)
    ? "blob"
    : [["list"], ["html", { open: "never" }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || "http://localhost:3001",
    timezoneId: "UTC",
    locale: "en-GB",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    headless: true, // self-hosted runners often have no GUI
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /setup\.ts/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Use prepared browser state.
        // storageState: "tests/browser-state.json",
      },
      dependencies: ["setup"],
    },
  ],

  webServer: {
    command: "npm run start:playwright",
    port: 3001,
    reuseExistingServer: false, // don’t restart for local runs,
    timeout: 120000, // Increase webServer timeout
    stdout: process.env.PLAYWRIGHT_LOGGING_LEVEL === "2" ? "pipe" : "ignore",
    stderr: process.env.PLAYWRIGHT_LOGGING_LEVEL === "3" ? "pipe" : "ignore",
  },
});
