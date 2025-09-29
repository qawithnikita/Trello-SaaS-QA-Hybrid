import { Page, Locator } from "@playwright/test";
import { TestUtils } from "../helpers/TestUtils";

type SelectorOrLocator = string | Locator;

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(selector: SelectorOrLocator) {
    const element: Locator = typeof selector === "string" ? this.page.locator(selector) : selector;
    await TestUtils.clickWithRetry(element);
  }

  async fill(selector: SelectorOrLocator, value: string) {
    await TestUtils.fillAndLog(this.page, selector, value);
  }

  async getText(selector: SelectorOrLocator): Promise<string> {
    let content: string | null;
    if (typeof selector === "string") {
      content = await this.page.textContent(selector);
    } else {
      content = await selector.textContent();
    }
    if (content === null) {
      throw new Error(`Element ${typeof selector === "string" ? selector : "locator"} not found or has no text`);
    }
    return content;
  }

  async assertTextContains(selector: SelectorOrLocator, expected: string) {
    await TestUtils.assertContains(this.page, selector, expected);
  }

  async takeScreenshot(name: string) {
    await TestUtils.takeScreenshot(this.page, name);
  }

  async waitForSelector(selector: SelectorOrLocator, timeout = 5000) {
    if (typeof selector === "string") {
      await this.page.waitForSelector(selector, { timeout });
    } else {
      // Locator.waitFor supports options like state/timeout
      await selector.waitFor({ state: "visible", timeout });
    }
  }
}
