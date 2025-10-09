import { expect, test } from "@playwright/test";

test("renders home with gretting", async ({ page }) => {
<<<<<<< HEAD
  await page.goto("http://localhost:3001");
=======
  await page.goto("http://localhost:3000");
>>>>>>> 8a18953 (feat: create sample data)
  await expect(page.locator("p")).toContainText("Hello, Developer");
});
