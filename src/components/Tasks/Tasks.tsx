import { Trash } from "phosphor-react";
import { Empty } from "../Empty";
import { TaskHeader } from "../TaskHeader";
import { TaskProps } from "../../App";

import styles from "./Tasks.module.css";

interface TasksProps {
  hasTasks: boolean;
  qtdTaskCreated: number;
  qtdTasksChecked: number;
  tasks: TaskProps[];
  onMarkToChecked: (item: TaskProps) => void;
  onDeleteTask: (id: string) => void;
}

export function Tasks({
  hasTasks,
  qtdTaskCreated,
  qtdTasksChecked,
  tasks,
  onMarkToChecked,
  onDeleteTask,
}: TasksProps) {
  return (
    <article className={styles.listWrapper}>
      <TaskHeader
        qtdTaskCreated={qtdTaskCreated}
        qtdTasksChecked={qtdTasksChecked}
      />

      <div className={styles.listContent}>
        {!!hasTasks ? (
          <Empty />
        ) : (
          <ul className={styles.listItems}>
            {tasks.map((item) => {
              const checked = item.isChecked;

              return (
                <li key={item.id} className={styles.listItem}>
                  <div>
                    <label htmlFor={item.id}>
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={item.isChecked}
                        onChange={() => onMarkToChecked(item)}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                    <p className={!!checked ? styles.line : styles.listText}>
                      {item.content}
                    </p>
                  </div>
                  <button onClick={() => onDeleteTask(item.id)}>
                    <Trash size={20} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
