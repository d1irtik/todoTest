import styles from "./TaskItem.module.css";

interface Props {
  id: number;
  completed: boolean;
  text: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = ({
  id,
  completed,
  text,
  onToggle,
  onDelete,
}: Props) => {
  return (
    <div
      data-testid={`task-${id}`}
      className={styles.container}
      onClick={() => onToggle(id)}
    >
      <div className={`${styles.status} ${completed ? styles.completed : ""}`}>
        {completed ? "✓" : ""}
      </div>
      <span
        data-testid={`task-text-${id}`}
        className={`${styles.text} ${completed ? styles.completed : ""}`}
      >
        {text}
      </span>
      <button
        data-testid={`delete-task-${id}`}
        className={styles.deleteButton}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        ×
      </button>
    </div>
  );
};
