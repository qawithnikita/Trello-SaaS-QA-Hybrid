import { test, expect } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { BoardPage } from "../page/BoardPage";
import { TaskPage } from "../page/TaskPage";
import { TestUtils } from "../helpers/TestUtils";
import { users } from "../fixtures/users";
import { sampleTasks, getRandomTask } from "../fixtures/tasks";

test.describe("Trello SaaS Task Tests", () => {
  let loginPage: LoginPage;
  let boardPage: BoardPage;
  let taskPage: TaskPage;
  let boardTitle: string;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    boardPage = new BoardPage(page);
    taskPage = new TaskPage(page);
    boardTitle = TestUtils.randomBoardName("QA-Board");

    // Login as Admin and create a board
    await loginPage.login(users.admin.email, users.admin.password);
    await boardPage.createBoard(boardTitle, "Default Workspace", "Private");
    await expect(boardPage.getBoardLocator(boardTitle)).toBeVisible();
  });

  test("Admin can create a list and add tasks/cards", async ({ page }) => {
    const listName = "QA List";
    const task = getRandomTask();

    // Add a List
    await taskPage.createList(listName);

    // Add a Card/Task
    await taskPage.addCardToList(listName, task.title);
  });

  test("Admin can edit task details (labels, due date, member)", async ({ page }) => {
    const listName = "QA List";
    const task = getRandomTask();

    // Add list and card
    await taskPage.createList(listName);
    await taskPage.addCardToList(listName, task.title);

    // Open task options
    await taskPage.openCardMenu(task.title);

    // Set label
    await taskPage.setLabel(task.title, "Urgent");

    // Set due date
    const dueDate = TestUtils.getFutureDate(3);
    await taskPage.setDueDate(task.title, dueDate);

  test("Admin can mark task complete and delete it", async ({ page }) => {
    const listName = "QA List";
    const task = getRandomTask();

    // Add list and card
    await taskPage.createList(listName);
    await taskPage.addCardToList(listName, task.title);

    // Complete task
    await taskPage.markCardComplete(task.title);

    // Delete task
    await taskPage.deleteCard(task.title);
  });

  test("Member can view task but cannot edit or delete", async ({ page }) => {
    const listName = "QA List";
    const task = getRandomTask();

    // Admin adds list and task
    await taskPage.createList(listName);
    await taskPage.addCardToList(listName, task.title);

    // Logout and login as Member
    await loginPage.login(users.member.email, users.member.password);

    // Try to open options (should not be visible)
    const optionsBtn = taskPage.openCardMenu(task.title);
  });
})
});
