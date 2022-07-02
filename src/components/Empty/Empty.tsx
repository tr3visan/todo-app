import { motion } from "framer-motion";
import { ClipboardText } from "phosphor-react";

import styles from "./Empty.module.css";

export function Empty() {
  const container = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      transition: { time: 1, delay: 2 },
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className={styles.listEmpty}>
      <motion.div variants={container} initial="hidden" animate="visible">
        <ClipboardText size={56} />
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </motion.div>
    </div>
  );
}
