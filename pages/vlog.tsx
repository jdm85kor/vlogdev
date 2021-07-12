import { useEffect } from 'react';
import Head from 'next/head'

const about: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href="https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA";
    }, 2000);
  }, []);
  return (
    <div>
      <Head>
        <title>Video</title>
        <meta name="description" content="Show me your record" />
      </Head>
      react, aws 기반으로 동작하는 프로젝트입니다.
    </div>
  );
};

export default about;
