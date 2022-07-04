import { useState } from "react";
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
  onDeleteTask: (id: string) => void;
  onAskOpenModal: (index: number) => void;
  onActiveModal: (index: number) => string;
  onManagerAtiveTask: () => void;
}

export function Tasks({
  tasks,
  hasTasks,
  qtdTaskCreated,
  qtdTasksChecked,
  onMarkToChecked,
  onDeleteTask,
  onAskOpenModal,
  onActiveModal,
  onManagerAtiveTask,
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
            {tasks.map((item, index) => {
              const { id, isChecked, content } = item;

              return (
                <li key={id} className={styles.listItem}>
                  <header>
                    <label htmlFor={`checkbox${id}`}>
                      <input
                        type="checkbox"
                        id={`checkbox${id}`}
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
                    <p className={!!isChecked ? styles.line : styles.listText}>
                      {content}
                    </p>
                  </header>

                  <footer>
                    <div
                      className={`${styles.askModal} ${onActiveModal(index)}`}
                    >
                      <button onClick={() => onDeleteTask(id)}>Sim</button>
                      <button onClick={() => onManagerAtiveTask()}>Não</button>
                    </div>
                    <motion.button
                      onClick={() => onAskOpenModal(index)}
                      whileHover={{ scale: 1.2 }}
                      className={styles.trash}
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
