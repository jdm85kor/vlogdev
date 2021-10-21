import Head from 'next/head'
import Footer from "@components/common/Footer";
import DevC from '@containers/Dev';
import { NextPage } from 'next';

const Dev: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dev blog</title>
        <meta name="description" content="This service has created by DMJ to introduce blogs." />
      </Head>
      <DevC />
      <Footer />
    </div>
  );
};

export default Dev;
