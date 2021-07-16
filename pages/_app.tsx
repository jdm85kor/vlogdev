import React from 'react';
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Ga from '../components/common/Ga';
import Gnb from '../components/common/Gnb';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <Ga />
      <Gnb />
      <Component {...pageProps} />
      <div id="modal-root" />
    </>
  );
};

export default MyApp;
