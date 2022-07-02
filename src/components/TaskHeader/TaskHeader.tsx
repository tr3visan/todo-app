import styles from "./TaskHeader.module.css";

export interface TaskHeaderProps {
  qtdTaskCreated: number;
  qtdTasksChecked: number;
}

export function TaskHeader({
  qtdTaskCreated,
  qtdTasksChecked,
}: TaskHeaderProps) {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.counter}>
        <strong className={styles.taskCreated}>Tarefas criadas</strong>
        <span>{qtdTaskCreated}</span>
      </div>
      <div className={styles.counter}>
        <strong className={styles.taskDone}>Concluídas</strong>

        {qtdTaskCreated === 0 ? (
          <span>{qtdTaskCreated}</span>
        ) : (
          <span>
            {qtdTasksChecked} de {qtdTaskCreated}
          </span>
        )}
      </div>
    </header>
  );
}
