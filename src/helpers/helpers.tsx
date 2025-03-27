import { FilterType, Task } from "../types/types";

export const shouldSkipTask = (task: Task, filter: FilterType) => {
  if (!task) return true;
  if (filter === "completed" && !task.completed) return true;
  if (filter === "active" && task.completed) return true;
  return false;
};
