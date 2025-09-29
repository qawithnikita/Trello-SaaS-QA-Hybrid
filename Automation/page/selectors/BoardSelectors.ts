export const BoardSelectors = {
  // Create Board
  firstCreateBoardButton: "button[data-test-id='create-board-button']", 
  secondCreateBoardButton: "button[data-test-id='create-board-modal-button']", 
  boardTitleInput: "input[data-test-id='board-title-input']",
  workspaceDropdown: "div[data-test-id='workspace-dropdown']",
  visibilityDropdown: "div[data-test-id='visibility-dropdown']",
  createBoardConfirmButton: "button[data-test-id='create-board-confirm']",

  // Board List
  boardList: "div.board-list",
  boardItem: (title: string) => `text=${title}`,

  // Close Board
  boardMenuButton: (title: string) => `div[aria-label='${title}'] button[aria-label='Board actions']`, // 3 dots
  closeBoardOption: "button[data-test-id='close-board']",
  confirmCloseBoardButton: "button[data-test-id='confirm-close-board']",

  // Share Board
  shareBoardButton: (title: string) => `div[aria-label='${title}'] button[data-test-id='share-board']`,
};
