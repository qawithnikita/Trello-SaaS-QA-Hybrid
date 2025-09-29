import { TestUtils } from "../helpers/TestUtils";

export type TaskLabel = "Urgent" | "High" | "Medium" | "Low" | "In Progress";

export interface Task {
  title: string;
  label?: TaskLabel;
  dueDate?: string;
  description?: string;
}

export const sampleTasks: Task[] = [
  {
    title: TestUtils.randomTaskTitle("Feature"),
    label: "High",
    dueDate: TestUtils.getFutureDate(3),
    description: "Implement a new feature for the board",
  },
  {
    title: TestUtils.randomTaskTitle("Bug"),
    label: "Urgent",
    dueDate: TestUtils.getFutureDate(1),
    description: "Fix critical bug in the task flow",
  },
  {
    title: TestUtils.randomTaskTitle("Chore"),
    label: "Low",
    dueDate: TestUtils.getFutureDate(7),
    description: "Routine maintenance task",
  },
];

export const getRandomTask = (): Task => {
  const labels: TaskLabel[] = ["Urgent", "High", "Medium", "Low", "In Progress"];
  return {
    title: TestUtils.randomTaskTitle(),
    label: labels[Math.floor(Math.random() * labels.length)],
    dueDate: TestUtils.getFutureDate(Math.floor(Math.random() * 10) + 1),
    description: "Auto-generated task for testing",
  };
};

export const getRandomTasks = (count: number = 3): Task[] => {
  const tasks: Task[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push(getRandomTask());
  }
  return tasks;
};
