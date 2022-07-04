import { motion } from "framer-motion";
import { Logo, Vite } from "../Logo";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <motion.span
        className={styles.vite}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2.5, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        made with <Vite />
      </motion.span>
    </header>
  );
}
