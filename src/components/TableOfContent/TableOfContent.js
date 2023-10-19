import styles from './TableOfContent.module.scss';
import { Anchor, Box } from '@maximeheckel/design-system';
import { motion, useReducedMotion } from 'framer-motion';
import { useProgress, useScrollSpy } from '../../hooks';
import ProgressBar from './ProgressBar';

const OFFSET = 150;

export const TableOfContent = ({ids = []}) => {
  const shouldReduceMotion = useReducedMotion();
  const readingProgress = useProgress();

  const shouldShowTableOfContent =
    readingProgress > 0.07 && readingProgress < 0.95;

  const variants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (shouldShowTableOfContent) => ({
      opacity: shouldReduceMotion || shouldShowTableOfContent ? 1 : 0,
    }),
  };

  const handleLinkClick = (event, id) => {
    event.preventDefault();

    const element = document.getElementById(id);
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const [currentActiveIndex] = useScrollSpy(
    ids.map(
      (item) => document.querySelector(`[id="${item.id}"]`)
),
  { offset: OFFSET }
);

  return (
    <div className={styles.container}>
      {ids.length > 0 ? (
        <ul>
          {ids.map((item, index) => {
            return (
              <Box
                as={motion.li}
                initial="hide"
                css={
                  currentActiveIndex === index
                    ? {
                      a: {
                        color: '#0e52f1A0',
                      },
                    }
                    : {}
                }
                variants={variants}
                animate="show"
                transition={{ type: 'spring' }}
                key={item.id}
                custom={shouldShowTableOfContent}
              >
                <Anchor
                  discreet
                  href={`#${item.id}`}
                  onClick={(event) =>
                    handleLinkClick(event, `${item.id}`)
                  }
                >
                  {item.title}
                </Anchor>
              </Box>
            );
          })}
        </ul>
      ) : null}
      <ProgressBar progress={readingProgress} />
    </div>
  );
};