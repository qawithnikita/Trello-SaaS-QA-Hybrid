// Automation/pages/BoardPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BoardSelectors as S } from "./selectors/BoardSelectors";

export class BoardPage extends BasePage {
  private firstCreateBoardButton: Locator;
  private secondCreateBoardButton: Locator;
  private boardTitleInput: Locator;
  private workspaceDropdown: Locator;
  private visibilityDropdown: Locator;
  private createBoardConfirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstCreateBoardButton = page.locator(S.firstCreateBoardButton);
    this.secondCreateBoardButton = page.locator(S.secondCreateBoardButton);
    this.boardTitleInput = page.locator(S.boardTitleInput);
    this.workspaceDropdown = page.locator(S.workspaceDropdown);
    this.visibilityDropdown = page.locator(S.visibilityDropdown);
    this.createBoardConfirmButton = page.locator(S.createBoardConfirmButton);
  }
  
  async clickCreateBoardButtons() {
    await this.click(this.firstCreateBoardButton);
    await this.click(this.secondCreateBoardButton);
  }

  async createBoard(title: string, workspace?: string, visibility?: string) {
    await this.clickCreateBoardButtons();
    await this.fill(this.boardTitleInput, title);

    if (workspace) {
      await this.click(this.workspaceDropdown);
      await this.page.locator(`text=${workspace}`).click();
    }

    if (visibility) {
      await this.click(this.visibilityDropdown);
      await this.page.locator(`text=${visibility}`).click();
    }

    await this.click(this.createBoardConfirmButton);
  }

  getBoardLocator(title: string): Locator {
    return this.page.locator(S.boardItem(title));
  }

  async isBoardVisible(title: string): Promise<boolean> {
    const board = this.getBoardLocator(title);
    return board.isVisible();
  }

  getBoardMenuLocator(title: string): Locator {
    return this.page.locator(S.boardMenuButton(title));
  }

  async closeBoard(title: string) {
    const menuButton = this.getBoardMenuLocator(title);
    await this.click(menuButton);
    const closeOption = this.page.locator(S.closeBoardOption);
    await this.click(closeOption);
    const confirmButton = this.page.locator(S.confirmCloseBoardButton);
    await this.click(confirmButton);
  }

  async shareBoard(title: string) {
    const shareButton = this.page.locator(S.shareBoardButton(title));
    await this.click(shareButton);
  }
}
