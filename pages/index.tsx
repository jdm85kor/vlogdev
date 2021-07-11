import { useEffect } from 'react';
import Head from 'next/head'

export default function Home() {
  useEffect(() => {
    // setTimeout(() => {
    //   window.location.href="https://dongmin-jang.medium.com";
    // }, 2000);
  }, []);
  return (
    <div>
      <Head>
        <title>VLOG</title>
        <meta name="description" content="Record yourself just for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      
    </div>
  )
}
