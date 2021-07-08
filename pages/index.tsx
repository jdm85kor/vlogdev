import { useEffect } from 'react';
import Head from 'next/head'

export default function Home() {
  useEffect(() => {
    console.log('start');
    setTimeout(() => {
      window.location.href="https://dongmin-jang.medium.com";
    }, 2000);
  }, []);
  return (
    <div>
      <Head>
        <title>v-log.dev</title>
        <meta name="description" content="Loading..." />
      </Head>
      <div>페이지 이동합니다</div>
    </div>
  )
}
