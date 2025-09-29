import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TaskSelectors as S } from "./selectors/TaskSelectors";
import { TestUtils } from "../helpers/TestUtils";
import { users } from "../fixtures/users";

export class TaskPage extends BasePage {
  private addListButton: Locator;
  private listNameInput: Locator;
  private addListConfirmButton: Locator;
  private cardTitleInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addListButton = page.locator(S.addListButton);
    this.listNameInput = page.locator(S.listNameInput);
    this.addListConfirmButton = page.locator(S.confirmAddListButton);
    this.cardTitleInput = page.locator(S.cardTitleInput);
  }

  // Create a new list
  async createList(listName: string) {
    await this.click(this.addListButton);
    await this.fill(S.listNameInput, listName);
    await this.click(this.addListConfirmButton);
  }

  // Add a card to a list
  async addCardToList(listName: string, cardTitle: string) {
    const addCardBtn = this.page.locator(S.addCardButton(listName));
    const confirmBtn = this.page.locator(S.confirmAddCardButton);

    await this.click(addCardBtn);
    await this.fill(S.cardTitleInput, cardTitle);
    await this.click(confirmBtn);
  }

  // Mark card as complete
  async markCardComplete(cardTitle: string) {
    const checkbox = this.page.locator(S.completeTaskRadio(cardTitle));
    await this.click(checkbox);
  }

  // Drag and drop card
  async moveCard(cardTitle: string, targetListName: string) {
    const card = this.page.locator(S.cardItem(cardTitle));
    const targetList = this.page.locator(S.listContainer(targetListName));
    await card.dragTo(targetList);
  }

  // Open card menu
  async openCardMenu(cardTitle: string) {
    const menuBtn = this.page.locator(S.cardMenuButton(cardTitle));
    await this.click(menuBtn);
  }

  // Set due date
  async setDueDate(cardTitle: string, dueDate: string) {
    await this.openCardMenu(cardTitle);
    const dateInput = this.page.locator(S.dueDateInput);
    await dateInput.fill(dueDate);
    const saveBtn = this.page.locator(S.setDueDateOption); 
    await this.click(saveBtn);
  }

  // Set label
  async setLabel(cardTitle: string, label: string) {
    await this.openCardMenu(cardTitle);
    const labelBtn = this.page.locator(S.setLabelOption);
    await this.click(labelBtn);
  }

  // Assign member
  async assignMember(cardTitle: string, memberRole: "admin" | "member") {
    await this.openCardMenu(cardTitle);
    const memberBtn = this.page.locator(S.setMemberOption);
    await this.click(memberBtn);
    const memberEmail = users[memberRole].email;
    await this.page.locator(`text=${memberEmail}`).click();
  }

  // Delete card
  async deleteCard(cardTitle: string) {
    await this.openCardMenu(cardTitle);
    const deleteBtn = this.page.locator(S.deleteCardOption);
    await this.click(deleteBtn);
    const confirmBtn = this.page.locator(S.confirmDeleteCardButton);
    await this.click(confirmBtn);
  }
}
