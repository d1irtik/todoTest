import React, { useState } from "react";
import styles from "./TaskInput.module.css";

interface Props {
  addTask: (text: string) => void;
}

export const TaskInput = ({ addTask }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className={styles.container}>
      <input
        data-testid="task-input"
        className={styles.taskInput}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What need to be done"
        onKeyDown={handleKeyDown}
      />
      <button
        data-testid="add-task-button"
        className={styles.addButton}
        onClick={handleSubmit}
      >
        +
      </button>
    </div>
  );
};
