import { NextPage } from 'next';
import Head from 'next/head'
import Footer from "@components/common/Footer";
import HomeC from '@containers/Home';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VLOG | Video Log</title>
      </Head>
      <HomeC />
      <Footer />
    </div>
  )
}

export default Home;
