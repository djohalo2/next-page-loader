import Head from 'next/head';

import '../styles/globals.css';

import type { AppProps } from 'next/app';
import PageLoader from 'next-page-loader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Example - Next Page Loader</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageLoader className="h-[3px] bg-orange-500 shadow-lg shadow-orange-500/50 w-full" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
