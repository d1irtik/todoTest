import { render, screen, fireEvent } from "@testing-library/react";
import { TaskItem } from "./TaskItem";
import styles from "./TaskItem.module.css";

describe("TaskItem", () => {
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();
  const taskProps = {
    id: 1,
    text: "Test task",
    completed: false,
    onToggle: mockToggle,
    onDelete: mockDelete,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("отображает текст задачи", () => {
    render(<TaskItem {...taskProps} />);
    expect(screen.getByTestId("task-text-1")).toHaveTextContent("Test task");
  });

  it("отображает статус задачи", () => {
    const { rerender } = render(<TaskItem {...taskProps} />);

    expect(screen.getByTestId("task-text-1")).not.toHaveClass(styles.completed);

    rerender(<TaskItem {...taskProps} completed={true} />);
    expect(screen.getByTestId("task-text-1")).toHaveClass(styles.completed);
  });

  it("вызывает onToggle при клике на задачу", () => {
    render(<TaskItem {...taskProps} />);
    fireEvent.click(screen.getByTestId("task-1"));
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it("вызывает onDelete при клике на кнопку удаления", () => {
    render(<TaskItem {...taskProps} />);
    fireEvent.click(screen.getByTestId("delete-task-1"));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("не вызывает onToggle при клике на кнопку удаления", () => {
    render(<TaskItem {...taskProps} />);
    fireEvent.click(screen.getByTestId("delete-task-1"));
    expect(mockToggle).not.toHaveBeenCalled();
  });
});
