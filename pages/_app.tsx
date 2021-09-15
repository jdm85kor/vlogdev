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
        <meta name="apple-mobile-web-app-title" content="VLOG" />
        <meta name="description" content="Record yourself. Record do something. Record whatever." />
        <meta property="og:title" content="VLOG" />
        <meta property="og:url" content="https://vlog.dev/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta property="og:description" content="Record yourself. Record do something. Record whatever." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="VLOG" />
        <meta name="twitter:url" content="https://v-log.dev/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Record yourself. Record do something. Record whatever." />
        <link rel="shortcut icon" href="https://d6c63ppcwec2x.cloudfront.net/logo_16x16.png" type="image/x-icon">
        // <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo_16x16.png" sizes="16x16"></link>
        <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo_32x32.png" sizes="32x32"></link>
        <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo_48x48.png" sizes="48x48"></link>
        <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo_96x96.png" sizes="96x96"></link>
        <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo144.png" sizes="144x144"></link>
        <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo144.png" sizes="144x144"></link>
      </Head>
      <Gnb />
      {
        isPlaygroundPages ?
        <PlaygroundLayout>
          <Component role="main" {...pageProps} />
        </PlaygroundLayout> :
        <Component role="main" {...pageProps} />
      }
    </>
  );
};

export default MyApp;
