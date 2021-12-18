import React from 'react';
import { AppProps } from 'next/app';
import { motion } from 'framer-motion';

import { Layout } from '@components';

import '@styles/globals.css';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';

import 'prismjs/prism.js';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-bash';
import { DefaultSeo } from 'next-seo';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://dieptv.vercel.app/',
          site_name: 'Dieptv Profile',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </motion.div>
  </Layout>
);

export default App;
