import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { getUser } from "../fixtures/users";
import { TestUtils } from "../helpers/TestUtils";
import { config } from "../helpers/config";

test.describe("Authentication & RBAC Tests", () => {
  let loginPage: LoginPage;
  let page: Page;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
  });

  // Admin Login Test
  test("Admin should login successfully", async () => {
    const admin = getUser("admin");

    await TestUtils.retryAction(async () => {
      await loginPage.login(admin.email, admin.password);
    });

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator("text=Admin Panel")).toBeVisible();
  });

  // Member Login Test
  test("Member should login successfully", async () => {
    const member = getUser("member");

    await TestUtils.retryAction(async () => {
      await loginPage.login(member.email, member.password);
    });

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator("text=My Boards")).toBeVisible();
  });

  // Invalid Login Test
  test("Should display error on invalid login", async () => {
    await TestUtils.retryAction(async () => {
      await loginPage.login("invalid@test.com", "WrongPass123");
    });

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Invalid email or password"); 

    // Take screenshot on failure
    await TestUtils.takeScreenshot(page, "invalid-login");
  });

  // Login button visibility
  test("Login button should be visible on page load", async () => {
    const isVisible = await loginPage.isLoginButtonVisible();
    expect(isVisible).toBe(true);
  });
});
