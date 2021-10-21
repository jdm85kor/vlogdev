import React, { useEffect } from 'react';
import Script from 'next/script'

declare global {
  interface Window {
    dataLayer: any;
  }
}

type Props = {
  children?: React.ReactNode;
};

const Ga = ({ children }: Props) => {
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
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LLLCDYD99J"></Script>
      {children}
    </>
  );
};

export default Ga;
