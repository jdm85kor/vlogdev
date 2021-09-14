import React from 'react';
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
