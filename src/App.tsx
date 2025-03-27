import { useMemo, useState } from "react";
import styles from "./App.module.css";
import { TaskInput } from "./components/taskInput/TaskInput";
import { FilterType, Task } from "./types/types";
import { TaskList } from "./components/taskList/TaskList";
import { Header } from "./components/header/Header";
import { TaskFilter } from "./components/taskFilter/TaskFilter";

function App() {
  const [tasks, setTasks] = useState<Record<number, Task>>({});
  const [taskIds, setTasksIds] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => ({ ...prev, [newTask.id]: newTask }));
    setTasksIds((prev) => {
      const newTasksIds = new Set(prev);
      newTasksIds.add(newTask.id);
      return newTasksIds;
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      delete newTasks[id];
      return newTasks;
    });
    setTasksIds((prev) => {
      const newTasksIds = new Set(prev);
      newTasksIds.delete(id);
      return newTasksIds;
    });
  };

  const deleteCompleted = () => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach((id) => {
        if (newTasks[Number(id)].completed) {
          delete newTasks[Number(id)];
        }
      });
      return newTasks;
    });
    setTasksIds((prev) => {
      const newTasksIds = new Set(prev);
      newTasksIds.forEach((id) => {
        if (tasks[id].completed) {
          newTasksIds.delete(id);
        }
      });
      return newTasksIds;
    });
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => {
      return {
        ...prev,
        [id]: { ...prev[id], completed: !prev[id].completed },
      };
    });
  };

  const activeTaskCount = useMemo(
    () =>
      Object.values(tasks).reduce(
        (count, task) => count + (task.completed ? 0 : 1),
        0
      ),
    [tasks]
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.listContainer}>
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          taskIds={taskIds}
          filter={filter}
          deleteTask={deleteTask}
        />

        <TaskFilter
          setFilter={setFilter}
          filter={filter}
          activeTaskCount={activeTaskCount}
          onDeleteComplited={deleteCompleted}
        />
      </div>
    </div>
  );
}

export default App;
