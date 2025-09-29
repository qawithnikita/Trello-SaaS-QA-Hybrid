import { test, expect } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { BoardPage } from "../page/BoardPage";
import { TaskPage } from "../page/TaskPage";
import { TestUtils } from "../helpers/TestUtils";
import { getRandomSuggestion, getMultipleSuggestions, TaskSuggestion } from "../helpers/AIHelper";
import { users } from "../fixtures/users";

test.describe("AI Task Suggestions Simulation", () => {
  let loginPage: LoginPage;
  let boardPage: BoardPage;
  let taskPage: TaskPage;
  let boardTitle: string;
  let listName: string;
  let taskTitle: string;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    boardPage = new BoardPage(page);
    taskPage = new TaskPage(page);

    boardTitle = TestUtils.randomBoardName("QA-Board");
    listName = "AI Test List";
    taskTitle = TestUtils.randomTaskTitle("AI-Task");

    // Login as Admin and create a board + list + task
    await loginPage.login(users.admin.email, users.admin.password);
    await boardPage.createBoard(boardTitle, "Default Workspace", "Private");
    await taskPage.createList(listName);
    await taskPage.addCardToList(listName, taskTitle);

    await expect(boardPage.getBoardLocator(boardTitle)).toBeVisible();
  });

  test("AI generates a random suggestion for a task", async ({ page }) => {
    const suggestion: TaskSuggestion = getRandomSuggestion(taskTitle);
    TestUtils.log(`AI Suggestion: ${suggestion.description}`);

    switch (suggestion.type) {
      case "markComplete":
        await taskPage.markCardComplete(taskTitle);
        break;

      case "setDueDate":
        const dueDate = TestUtils.getFutureDate(3);
        await taskPage.setDueDate(taskTitle, dueDate);
        break;

      case "addLabel":
        await taskPage.setLabel(taskTitle, "Urgent");
        break;

      case "moveTask":
        await taskPage.moveCard(taskTitle, "In Progress");
        break;
    }
  });

  test("AI generates multiple suggestions for a task", async ({ page }) => {
    const suggestions: TaskSuggestion[] = getMultipleSuggestions(taskTitle, 3);
    TestUtils.log(`Multiple AI Suggestions: ${suggestions.map(s => s.description).join(", ")}`);

    for (const suggestion of suggestions) {
      switch (suggestion.type) {
        case "markComplete":
          await taskPage.markCardComplete(taskTitle);
          break;

        case "setDueDate":
          const dueDate = TestUtils.getFutureDate(5);
          await taskPage.setDueDate(taskTitle, dueDate);
          break;

        case "addLabel":
          await taskPage.setLabel(taskTitle, "High");
          break;

        case "moveTask":
          await taskPage.moveCard(taskTitle, "In Progress");
          break;
      }
    }
  });
});
