export const TaskSelectors = {
  // Add List
  addListButton: "button[data-test-id='add-list']",
  listNameInput: "input[data-test-id='list-name-input']",
  confirmAddListButton: "button[data-test-id='confirm-add-list']",

  // Add Card
  addCardButton: (listName: string) => `//div[text()='${listName}']/../..//button[text()='Add a card']`,
  cardTitleInput: "textarea[data-test-id='card-title-input']",
  confirmAddCardButton: "button[data-test-id='confirm-add-card']",

  // Card Actions
  cardItem: (title: string) => `text=${title}`,
  cardMenuButton: (title: string) => `//div[text()='${title}']/../..//button[@aria-label='Card actions']`,
  setDueDateOption: "button[data-test-id='set-due-date']",
  dueDateInput: "input[data-test-id='due-date-input']",
  setLabelOption: "button[data-test-id='set-label']",
  setMemberOption: "button[data-test-id='set-member']",
  completeTaskRadio: (title: string) => `//div[text()='${title}']/../..//input[@type='radio' and @data-test-id='mark-complete']`,

  // Drag & Drop
  listContainer: (listName: string) => `//div[text()='${listName}']/../..//div[@data-test-id='list-container']`,

  // Delete Card
  deleteCardOption: "button[data-test-id='delete-card']",
  confirmDeleteCardButton: "button[data-test-id='confirm-delete-card']",
};
