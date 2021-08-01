import { useEffect } from 'react';
import Head from 'next/head'

const About: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.open("https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA", '_blank');
    }, 2000);
  }, []);
  return (
    <div>
      <Head>
        <title>Video</title>
        <meta name="description" content="Show me your records" />
      </Head>
      작업 중입니다.
      youtube로 이동 됩니다.
    </div>
  );
};

export default About;
