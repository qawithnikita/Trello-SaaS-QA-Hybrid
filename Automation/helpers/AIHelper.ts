/**
 * This helper simulates AI-powered suggestions for Trello-like tasks.
 * Suggestions mimic actual Trello task behaviors.
 */

export type TaskSuggestionType =
  | "markComplete"
  | "assignMember"
  | "setDueDate"
  | "addLabel"
  | "moveTask";

export interface TaskSuggestion {
  type: TaskSuggestionType;
  description: string;
}

// Pool of possible AI suggestions
const suggestionPool = (taskTitle: string): TaskSuggestion[] => [
  { type: "markComplete", description: `Mark "${taskTitle}" as complete` },
  { type: "assignMember", description: `Assign a team member to "${taskTitle}"` },
  { type: "setDueDate", description: `Set a due date for "${taskTitle}"` },
  { type: "addLabel", description: `Add label "Urgent" to "${taskTitle}"` },
  { type: "moveTask", description: `Move "${taskTitle}" to "In Progress"` },
];

// Get a single random suggestion
export const getRandomSuggestion = (taskTitle: string): TaskSuggestion => {
  const suggestions = suggestionPool(taskTitle);
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

// Get multiple suggestions (default: 2)
export const getMultipleSuggestions = (
  taskTitle: string,
  count: number = 2
): TaskSuggestion[] => {
  const suggestions = suggestionPool(taskTitle);

  // Shuffle array and pick first `count` suggestions
  const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
