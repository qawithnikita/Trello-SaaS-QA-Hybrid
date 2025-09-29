import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../helpers/config";
import { LoginSelectors as S } from "./selectors/LoginSelectors"; 

export class LoginPage extends BasePage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator(S.emailInput);
    this.passwordInput = page.locator(S.passwordInput);
    this.loginButton = page.locator(S.loginButton);
    this.errorMsg = page.locator(S.errorMsg);
  }

  // Generic login method
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Role-based login helpers
  async loginAsAdmin() {
    await this.login(config.adminEmail, config.adminPassword);
  }

  async loginAsMember() {
    await this.login(config.memberEmail, config.memberPassword);
  }

  // Verification 
  async getErrorMessage(): Promise<string> {
    const text = await this.errorMsg.textContent();
    return text ?? ""; // null-safe
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return this.loginButton.isVisible();
  }
}
