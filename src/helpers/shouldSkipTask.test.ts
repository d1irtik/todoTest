import { shouldSkipTask } from "./helpers";
import { Task } from "../types/types";

describe("shouldSkipTask", () => {
  const activeTask: Task = { id: 1, text: "Task", completed: false };
  const completedTask: Task = { id: 2, text: "Task", completed: true };

  it('пропускает завершенные задачи при фильтре "active"', () => {
    expect(shouldSkipTask(completedTask, "active")).toBe(true);
  });

  it('не пропускает активные задачи при фильтре "all"', () => {
    expect(shouldSkipTask(activeTask, "all")).toBe(false);
  });
});
