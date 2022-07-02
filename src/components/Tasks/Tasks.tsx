import { motion } from "framer-motion";
import { Trash } from "phosphor-react";
import { Empty } from "../Empty";
import { TaskHeader } from "../TaskHeader";
import { TaskProps } from "../../App";

import styles from "./Tasks.module.css";

interface TasksProps {
  tasks: TaskProps[];
  hasTasks: boolean;
  qtdTaskCreated: number;
  qtdTasksChecked: number;
  onMarkToChecked: (item: TaskProps) => void;
  onConfirmDelete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Tasks({
  tasks,
  hasTasks,
  qtdTaskCreated,
  qtdTasksChecked,
  onConfirmDelete,
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
                  <header>
                    <label htmlFor={`checkbox${item.id}`}>
                      <input
                        type="checkbox"
                        id={`checkbox${item.id}`}
                        checked={item.isChecked}
                        onChange={() => onMarkToChecked(item)}
                      />
                      <motion.span
                        className={styles.checkmark}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1.2 }}
                        transition={{ duration: 0.1 }}
                      ></motion.span>
                    </label>
                    <p className={!!checked ? styles.line : styles.listText}>
                      {item.content}
                    </p>
                  </header>
                  <footer>
                    <div
                      id={`boxConfirm-${item.id}`}
                      className={styles.modalButtons}
                    >
                      <button onClick={() => onConfirmDelete(item.id)}>
                        Sim
                      </button>
                      <button onClick={() => onDeleteTask(item.id)}>Não</button>
                    </div>
                    <motion.button
                      onClick={() => onDeleteTask(item.id)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Trash size={20} />
                    </motion.button>
                  </footer>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
