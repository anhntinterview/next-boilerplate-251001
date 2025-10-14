import { expect, test } from "@playwright/test";

test("renders home with gretting", async ({ page }) => {
<<<<<<< HEAD
<<<<<<< HEAD
  await page.goto("http://localhost:3001");
=======
  await page.goto("http://localhost:3000");
>>>>>>> 8a18953 (feat: create sample data)
=======
  await page.goto("http://localhost:3001");
>>>>>>> f1ac84b (fix(ci): test only run 3001)
  await expect(page.locator("p")).toContainText("Hello, Developer");
});
