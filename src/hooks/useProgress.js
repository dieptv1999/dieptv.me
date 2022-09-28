import { useScroll } from 'framer-motion';
import React from 'react';

export const useProgress = () => {
  const [readingProgress, setReadingProgress] = React.useState(0);
  const { scrollYProgress } = useScroll();

  React.useEffect(
    () =>
      /**
       * Use Framer Motion's useViewportScroll to get the current scroll
       * position in the viewport and save it in the state
       */
      scrollYProgress.onChange((latest) => {
        setReadingProgress(parseFloat(latest.toFixed(2)));
      }),
    [scrollYProgress]
  );

  return readingProgress;
};
