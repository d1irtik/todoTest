import { fireEvent, render, screen } from "@testing-library/react";
import { TaskInput } from "./TaskInput";

describe("TaskInput", () => {
  const mockAddTask = vi.fn();

  beforeEach(() => {
    mockAddTask.mockClear();
  });

  it("добавляет задачу при нажатии Enter", () => {
    const mockAdd = vi.fn();
    render(<TaskInput addTask={mockAdd} />);

    const input = screen.getByTestId("task-input");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockAdd).toHaveBeenCalledWith("New task");
    expect(input).toHaveValue("");
  });

  it("добавляет задачу при клике на кнопку", () => {
    const mockAdd = vi.fn();
    render(<TaskInput addTask={mockAdd} />);

    const input = screen.getByTestId("task-input");
    const button = screen.getByTestId("add-task-button");

    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);

    expect(mockAdd).toHaveBeenCalledWith("New task");
    expect(input).toHaveValue("");
  });

  it("не добавляет пустую задачу", () => {
    const mockAdd = vi.fn();
    render(<TaskInput addTask={mockAdd} />);

    const input = screen.getByTestId("task-input");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockAdd).not.toHaveBeenCalled();
  });
});
