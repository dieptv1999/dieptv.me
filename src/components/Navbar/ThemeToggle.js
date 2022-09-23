import { Button } from 'components/Button';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useId } from 'react';
import styles from './ThemeToggle.module.css';

const disableThemeRoutes = [
  /^(\/shadows)/,
]

export const ThemeToggle = ({ isMobile, ...rest }) => {
  const { dispatch } = useAppContext();
  const id = useId();
  const { asPath } = useRouter();
  const {themeId} = useTheme();
  const maskId = `${id}theme-toggle-mask`;

  const handleClick = () => {
    dispatch({ type: 'toggleTheme' });
  };

  const checkDisableTheme = !!disableThemeRoutes.find(e => e.test(asPath))

  useEffect(() => {
    if (checkDisableTheme && themeId !== 'light') {
      dispatch({ type: 'toggleTheme' });
    }
  }, [asPath]);

  if (!checkDisableTheme) {
    return (
      <Button
        iconOnly
        className={styles.toggle}
        data-mobile={isMobile}
        aria-label="Toggle theme"
        onClick={handleClick}
        {...rest}
      >
        <svg aria-hidden className={styles.svg} width="38" height="38" viewBox="0 0 38 38">
          <defs>
            <mask id={maskId}>
              <circle className={styles.circle} data-mask={true} cx="19" cy="19" r="13" />
              <circle className={styles.mask} cx="25" cy="14" r="9" />
            </mask>
          </defs>
          <path
            className={styles.path}
            d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
          />
          <circle
            className={styles.circle}
            mask={`url(#${maskId})`}
            cx="19"
            cy="19"
            r="12"
          />
        </svg>
      </Button>
    );
  } else return <div />;
};
