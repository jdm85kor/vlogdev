import React, { useEffect } from 'react';
import Head from 'next/head';

declare global {
  interface Window {
    dataLayer: any;
  }
}

const Ga: React.FC = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...props: any){
      
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-LLLCDYD99J');
  });
  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LLLCDYD99J"></script>
      </Head>
      {children}
    </>
  );
};

export default Ga;
