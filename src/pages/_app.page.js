import 'layouts/App/reset.css';
import 'layouts/App/global.css';

import seo from '../../next-seo.config';
import { Navbar } from 'components/Navbar';
import { ThemeProvider } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { AnimatePresence, LazyMotion, domAnimation, m, useCycle } from 'framer-motion';
import { useFoucFix, useLocalStorage } from 'hooks';
import styles from 'layouts/App/App.module.css';
import { initialState, reducer } from 'layouts/App/reducer';
import { useRouter } from 'next/router';
import { Fragment, createContext, useEffect, useReducer, useRef } from 'react';
import { msToNum } from 'utils/style';
import { ScrollRestore } from '../layouts/App/ScrollRestore';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';
// const Music = dynamic(() => import('../components/Music').then(mod => mod.Music), {ssr: false});

export const AppContext = createContext({});

const repoPrompt = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/dieptv1999/dietv.me
`;


const App = ({ Component, pageProps }) => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerMusicRef = useRef();
  const { route, events, asPath } = useRouter();
  // const canonicalRoute = route === '/' ? '' : `${asPath}`;
  useFoucFix();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;

    const onRouteChangeComplete = () => {
      // Fathom.trackPageview({ url: window.location.pathname });
    };

    events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    console.info(`${repoPrompt}\n\n`);
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme || 'dark' });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q2MGPQX0JE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q2MGPQX0JE');
        `}
        </Script>
        <LazyMotion features={domAnimation}>
          <Fragment>
            <DefaultSeo {...seo} />
            <VisuallyHidden
              showOnFocus
              as="a"
              className={styles.skip}
              href="#MainContent"
            >
              Skip to main content
            </VisuallyHidden>
            <Navbar />
            <main className={styles.app} tabIndex={-1} id="MainContent">
              <AnimatePresence exitBeforeEnter>
                <m.div
                  key={route}
                  className={styles.page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'tween',
                    ease: 'linear',
                    duration: msToNum(tokens.base.durationS) / 1000,
                    delay: 0.1,
                  }}
                >
                  <ScrollRestore />
                  <Component {...pageProps} />
                  {/*<Music />*/}
                </m.div>
              </AnimatePresence>
            </main>
          </Fragment>
        </LazyMotion>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
