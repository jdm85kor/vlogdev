import { useEffect } from 'react';
import Head from 'next/head'

const About: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.open("https://dongmin-jang.medium.com", '_blank');
    }, 2000);
  }, []);
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="" />
      </Head>
      작업 중입니다.
      medium으로 이동 됩니다.
    </div>
  );
};

export default About;
