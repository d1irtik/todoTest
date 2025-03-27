import { FilterType, Task } from "../../types/types";
import { TaskItem } from "../taskItem/TaskItem";
import { shouldSkipTask } from "../../helpers/helpers";
import styles from "./TaskList.module.css";

interface Props {
  tasks: Record<number, Task>;
  taskIds: Set<number>;
  toggleTask: (id: number) => void;
  filter: FilterType;
  deleteTask: (id: number) => void;
}

export const TaskList = ({
  tasks,
  taskIds,
  toggleTask,
  filter,
  deleteTask,
}: Props) => {
  const filteredTaskIds = Array.from(taskIds).filter(
    (taskId) => !shouldSkipTask(tasks[taskId], filter)
  );

  return (
    <div className={styles.container}>
      {filteredTaskIds.map((taskId) => (
        <TaskItem
          key={taskId}
          completed={tasks[taskId].completed}
          id={tasks[taskId].id}
          text={tasks[taskId].text}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
};
