import React from 'react';
import Head from 'next/head';
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Amplify from 'aws-amplify';
import Gnb from '@components/common/Gnb';
import PlaygroundLayout from '@components/playground/Layout';
import awsconfig from '../aws-exports.js';

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPlaygroundPages = router.route.includes('/playground');
  
  return (
    <>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <link rel="shortcut icon" href="https://d6c63ppcwec2x.cloudfront.net/logo144.png"></link>
          <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo144.png" sizes="144x144"></link>
        </Head>
      <Gnb />
      {
        isPlaygroundPages ?
        <PlaygroundLayout>
          <Component {...pageProps} />
        </PlaygroundLayout> :
        <Component {...pageProps} />
      }
    </>
  );
};

export default MyApp;
