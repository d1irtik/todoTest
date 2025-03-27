import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import styles from "../../components/TaskItem/TaskItem.module.css";

describe("App", () => {
  describe("App", () => {
    it("добавляет новую задачу", () => {
      render(<App />);

      fireEvent.change(screen.getByTestId("task-input"), {
        target: { value: "New task" },
      });
      fireEvent.keyDown(screen.getByTestId("task-input"), { key: "Enter" });

      expect(screen.getByText("New task")).toBeInTheDocument();
    });

    it("переключает статус задачи", () => {
      render(<App />);

      // Добавляем задачу
      fireEvent.change(screen.getByTestId("task-input"), {
        target: { value: "Test task" },
      });
      fireEvent.keyDown(screen.getByTestId("task-input"), { key: "Enter" });

      // Получаем ID добавленной задачи
      const taskElements = screen.queryAllByTestId(/^task-/);
      const lastTaskId = taskElements[
        taskElements.length - 1
      ].dataset.testid?.replace("task-", "");

      // Кликаем на задачу
      fireEvent.click(screen.getByTestId(`task-${lastTaskId}`));
      expect(screen.getByTestId(`task-${lastTaskId}`)).toHaveClass(
        styles.completed
      );
    });

    it("удаляет завершенные задачи", () => {
      render(<App />);

      // Добавляем и завершаем задачу
      fireEvent.change(screen.getByTestId("task-input"), {
        target: { value: "Completed task" },
      });
      fireEvent.keyDown(screen.getByTestId("task-input"), { key: "Enter" });

      const taskElements = screen.queryAllByTestId(/^task-/);
      const lastTaskId = taskElements[
        taskElements.length - 1
      ].dataset.testid?.replace("task-", "");

      fireEvent.click(screen.getByTestId(`task-${lastTaskId}`));
      fireEvent.click(screen.getByText("Clear completed"));

      expect(
        screen.queryByTestId(`task-${lastTaskId}`)
      ).not.toBeInTheDocument();
    });
  });
});
