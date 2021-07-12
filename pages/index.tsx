import { useEffect } from 'react';
import Head from 'next/head'

const Home: React.FC = () => {
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
      <div>
        채용, 외주, 라운딩, 컨텐츠 문의는 아래 메일로 문의 바랍니다.
        jdm85kor@gmail.com
      </div>
    </div>
  )
}

export default Home;
