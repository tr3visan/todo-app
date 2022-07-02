import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, InvalidEvent } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./FormTask.module.css";

interface FormTaskProps {
  value: string;
  borderAlert: boolean;
  onCreateTask: (event: FormEvent) => void;
  onNewTaskChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onValidateEmpty: (event: InvalidEvent<HTMLInputElement>) => void;
}

export function FormTask({
  value,
  borderAlert,
  onCreateTask,
  onNewTaskChange,
  onValidateEmpty,
}: FormTaskProps) {
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={onCreateTask}>
        <motion.input
          type="text"
          value={value}
          onChange={onNewTaskChange}
          onInvalid={onValidateEmpty}
          placeholder="Digite uma nova tarefa"
          whileFocus={{ scale: 1.01 }}
          className={borderAlert ? styles.borderAlert : styles.borderNormal}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.3, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <PlusCircle size={56} />
        </motion.button>
      </form>
    </div>
  );
}
