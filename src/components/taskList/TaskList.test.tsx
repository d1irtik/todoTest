import { render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";
import { shouldSkipTask } from "../../helpers/helpers";
import { FilterType } from "../../types/types";
import { Mock } from "vitest";

vi.mock("../../helpers/helpers", () => ({
  shouldSkipTask: vi.fn(),
}));

describe("TaskList", () => {
  const mockTasks = {
    1: { id: 1, text: "Task 1", completed: false },
    2: { id: 2, text: "Task 2", completed: true },
  };

  const mockTaskIds = new Set([1, 2]);
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает все задачи при фильтре "all"', () => {
    (shouldSkipTask as Mock).mockImplementation(() => false);

    render(
      <TaskList
        tasks={mockTasks}
        taskIds={mockTaskIds}
        filter="all"
        toggleTask={mockToggle}
        deleteTask={mockDelete}
      />
    );

    expect(screen.getByTestId("task-1")).toBeInTheDocument();
    expect(screen.getByTestId("task-2")).toBeInTheDocument();
  });

  it("фильтрует задачи по статусу", () => {
    (shouldSkipTask as Mock).mockImplementation(
      (task, filter: FilterType) => filter === "active" && task.completed
    );

    render(
      <TaskList
        tasks={mockTasks}
        taskIds={mockTaskIds}
        filter="active"
        toggleTask={mockToggle}
        deleteTask={mockDelete}
      />
    );

    expect(screen.getByTestId("task-1")).toBeInTheDocument();
    expect(screen.queryByTestId("task-2")).not.toBeInTheDocument();
  });
});
