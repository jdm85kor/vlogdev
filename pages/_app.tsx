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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="description" content="Record yourself. Record do something. Record whatever." />
        <link rel="shortcut icon" href="/logo144.png"></link>
        <link rel="icon" href="/logo144.png" sizes="144x144"></link>
      </Head>
      <Ga />
      <Gnb />
      <Component {...pageProps} />
      <div id="modal-root" />
    </>
  );
};

export default MyApp;
