import { render, screen, fireEvent } from "@testing-library/react";
import { TaskFilter } from "./TaskFilter";

describe("TaskFilter", () => {
  const mockSetFilter = vi.fn();
  const mockDeleteCompleted = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("отображает количество активных задач", () => {
    render(
      <TaskFilter
        setFilter={mockSetFilter}
        filter="all"
        activeTaskCount={3}
        onDeleteComplited={mockDeleteCompleted}
      />
    );
    expect(screen.getByTestId("active-tasks-count")).toHaveTextContent(
      "3 items left"
    );
  });

  it("вызывает setFilter при переключении фильтра", () => {
    render(
      <TaskFilter
        setFilter={mockSetFilter}
        filter="all"
        activeTaskCount={0}
        onDeleteComplited={mockDeleteCompleted}
      />
    );
    fireEvent.click(screen.getByTestId("filter-active"));
    expect(mockSetFilter).toHaveBeenCalledWith("active");
  });

  it("вызывает onDeleteComplited при клике", () => {
    render(
      <TaskFilter
        setFilter={mockSetFilter}
        filter="all"
        activeTaskCount={0}
        onDeleteComplited={mockDeleteCompleted}
      />
    );
    fireEvent.click(screen.getByTestId("clear-completed-button"));
    expect(mockDeleteCompleted).toHaveBeenCalled();
  });
});
