import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { fontStyles, tokenStyles } from 'components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />

        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/png' />
        {/*<link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />*/}
        <link rel='apple-touch-icon' href='/apple-icon-76x76' />
        <link type='text/plain' rel='author' href='/humans.txt' />

        <link rel='preload' href={GothamMedium} as='font' crossOrigin='true' />
        <link rel='preload' href={GothamBook} as='font' crossOrigin='true' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
        <meta name="google-site-verification" content="U05Nt14zVVJhlPjmcY1GQ-vd4W3h9mF5Y42kSmL0OdI" />
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=GTM-54R4KKL2'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-54R4KKL2');
        `}
        </Script>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-54R4KKL2');
      `}
        </Script>
      </Head>
      <body data-theme='dark' tabIndex={-1}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              const initialTheme = JSON.parse(localStorage.getItem('theme'));
              document.body.dataset.theme = initialTheme || 'dark';
            `,
        }}
      />
      <Main />
      <NextScript />
      <div id='portal-root' />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-54R4KKL2' height='0' width='0' style='display:none;visibility:hidden'></iframe>`,
        }}
      />
      </body>
    </Html>
  );
}
