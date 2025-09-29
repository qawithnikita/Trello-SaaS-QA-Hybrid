import { Page, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";

type SelectorOrLocator = string | Locator;

export class TestUtils {
  // RANDOM DATA GENERATORS 
  static randomBoardName(prefix = "Board"): string {
    return `${prefix}-${Date.now()}`;
  }

  static randomTaskTitle(prefix = "Task"): string {
    const adjectives = ["Quick", "Urgent", "Critical", "Pending", "Review"];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    return `${prefix}-${adj}-${Date.now()}`;
  }

  static randomLabel(): string {
    const labels = ["Urgent", "High", "Low", "In Progress", "Blocked"];
    return labels[Math.floor(Math.random() * labels.length)];
  }

  // DATE UTILITIES
  static getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  static getFutureDate(daysAhead: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split("T")[0];
  }

  // RETRY LOGIC
  static async retryAction(
    action: () => Promise<void>,
    retries = 3,
    delayMs = 1000,
    exponentialBackoff = true
  ) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await action();
        return;
      } catch (err) {
        if (attempt === retries - 1) throw err;
        const delay = exponentialBackoff ? delayMs * Math.pow(2, attempt) : delayMs;
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  // SCREENSHOT + LOGGING
  static async takeScreenshot(page: Page, name: string, folder: "screenshots" | "reports" = "screenshots") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const baseDir = folder === "screenshots" ? "./Automation/screenshots" : "./Automation/reports/html";
    const screenshotDir = path.resolve(baseDir);
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
    const filepath = path.join(screenshotDir, `${name}-${timestamp}.png`);
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`Screenshot saved: ${filepath}`);
  }

  static log(message: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  // ENHANCEMENTS
  static async clickWithRetry(
    element: Locator,
    retries = 3,
    delayMs = 1000,
    exponentialBackoff = true
  ) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await element.click();
        return;
      } catch (err) {
        if (attempt === retries - 1) throw err;
        const delay = exponentialBackoff ? delayMs * Math.pow(2, attempt) : delayMs;
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  // Accept string OR Locator
  static async fillAndLog(page: Page, selector: SelectorOrLocator, value: string) {
    if (typeof selector === "string") {
      await page.fill(selector, value);
      this.log(`Filled "${selector}" with "${value}"`);
    } else {
      await selector.fill(value);
      this.log(`Filled locator with "${value}"`);
    }
  }

  // Accept string OR Locator
  static async assertContains(page: Page, selector: SelectorOrLocator, text: string) {
    let content: string | null;
    if (typeof selector === "string") {
      content = await page.textContent(selector);
    } else {
      content = await selector.textContent();
    }
    if (!content || !content.includes(text)) {
      throw new Error(`Assertion failed: selector does not contain "${text}"`);
    }
    this.log(`Assertion passed: selector contains "${text}"`);
  }
}
