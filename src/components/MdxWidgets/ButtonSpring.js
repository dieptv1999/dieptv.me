import styles from './MdxWidgets.module.css';
import { motion } from 'framer-motion';

export const ButtonSpring = () => {
  return (
    <div className={styles.buttonSpringContainer}>
      <motion.button
        className={styles.buttonSpring}
        whileTap={{
          scale: 1.3,
          borderRadius: '6px',
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 4, mass: 1 }}
      >
        Submit
      </motion.button>
    </div>
  );
};