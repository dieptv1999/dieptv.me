import React from 'react';
import Head from 'next/head';
import Container from './Container';
import Footer from './Footer';
import Nav from './Nav';

import styles from '@styles/Home.module.css';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ title = 'Dieptv', children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="author" content="Dieptv" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Dieptv" />
        <meta
          property="og:description"
          content="I'm a Full Stack developer with experience in DevOps, Backend, Frontend and mobile development."
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:site" content="@dieptv_nd" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content="https://dieptv.vercel.app/img/preview.png"
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-RZP6RWZ32F"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
      
                  gtag('config', 'G-RZP6RWZ32F');`,
              }}
            />
          </>
        )}
      </Head>
      <Nav
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <Container justifyContent="space-between" alignContent="space-between">
        {!isOpen && (
          <main className={styles.main}>
            <div
              className="bg-discovery w-full bg-no-repeat absolute z-0 top-0"
              style={{
                backgroundImage: `linear-gradient(#fffefef2,#fffefed1),url("/img/bg.jpeg")`,
              }}
            />
            <div className="z-10">{children}</div>
          </main>
        )}
        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
