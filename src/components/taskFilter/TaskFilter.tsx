import { FilterType } from "../../types/types";
import { FILTERS } from "../../constants/constants";
import styles from "./TaskFilter.module.css";

interface Props {
  setFilter: (filter: FilterType) => void;
  filter: FilterType;
  activeTaskCount: number;
  onDeleteComplited: () => void;
}

export const TaskFilter = ({
  setFilter,
  activeTaskCount,
  filter,
  onDeleteComplited,
}: Props) => {
  return (
    <div className={styles.container}>
      <div data-testid="active-tasks-count" className={styles.taskCount}>
        {activeTaskCount} {activeTaskCount === 1 ? "item" : "items"} left
      </div>
      <div className={styles.filterOptions}>
        {FILTERS.map(({ value, label }) => (
          <button
            data-testid={`filter-${value}`}
            key={value}
            className={`${styles.filterButton} ${
              filter === value ? styles.selected : ""
            }`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        data-testid="clear-completed-button"
        className={styles.clearButton}
        onClick={onDeleteComplited}
      >
        Clear completed
      </button>
    </div>
  );
};
