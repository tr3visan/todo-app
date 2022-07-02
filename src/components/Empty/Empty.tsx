import { ClipboardText } from "phosphor-react";

import styles from "./Empty.module.css";

export function Empty() {
  return (
    <div className={styles.listEmpty}>
      <ClipboardText size={56} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
