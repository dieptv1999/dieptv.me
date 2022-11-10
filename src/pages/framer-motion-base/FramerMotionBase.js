import styles from './FramerMotionBase.module.scss';
import { NextSeo } from 'next-seo';
import { useTheme } from '../../components/ThemeProvider';

export const FramerMotionBase = () => {
  const {themeId} = useTheme();

  return (
    <div className={styles.container} style={{
      background: themeId === 'dark' ? 'radial-gradient(64.9% 34.2308% at 0% 0%, rgba(138, 0, 0, 0.45) 0%, rgb(0, 0, 0) 100%)'
        : 'radial-gradient(64.9% 34.2308% at 0% 0%, rgba(138, 255, 255, 0.45) 0%, rgb(255, 255, 255) 100%)'
    }}>
      <NextSeo
        title={'Framer Motion'}
        description={'Compilation of some framer-motion based animations for the frontend'}
      />

      <div className={styles.containerItem}></div>
    </div>
  );
};