import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import styles from './TableOfContent.module.scss';

const ProgressBar = ({ progress }) => {
  const [visibility, setVisibility] = React.useState(true);
  const shouldReduceMotion = useReducedMotion();

  const progressBarWrapperVariants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (visibility) => ({
      opacity: shouldReduceMotion ? 1 : visibility ? 0.7 : 0,
    }),
  };

  React.useEffect(() => setVisibility(progress >= 0.07 && progress <= 0.95), [
    progress,
  ]);

  return (
    <motion.div
      className={styles.containerProgress}
      initial="hide"
      variants={progressBarWrapperVariants}
      animate="show"
      transition={{ type: 'spring' }}
      custom={visibility}
    >
      <motion.div
        style={{
          transformOrigin: 'top',
          scaleY: progress,
          width: '2px',
          backgroundColor: 'rgba(128,128,128,.8)',
          height: '100%',
        }}
        data-testid="progress-bar"
        data-testprogress={progress}
      />
    </motion.div>
  );
};

export default ProgressBar;