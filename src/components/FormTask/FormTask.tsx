import { ChangeEvent, FormEvent, InvalidEvent } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./FormTask.module.css";

interface FormTaskProps {
  value: string;
  onCreateTask: (event: FormEvent) => void;
  onNewTaskChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onValidateEmpty: (event: InvalidEvent<HTMLInputElement>) => void;
}

export function FormTask({
  value,
  onCreateTask,
  onNewTaskChange,
  onValidateEmpty,
}: FormTaskProps) {
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={onCreateTask}>
        <input
          type="text"
          value={value}
          onChange={onNewTaskChange}
          onInvalid={onValidateEmpty}
          placeholder="Digite uma nova tarefa"
          required
        />
        <button type="submit">
          Criar
          <PlusCircle size={16} />
        </button>
      </form>
    </div>
  );
}
