import Head from 'next/head'
import Footer from "@components/common/Footer";
import VlogC from '@containers/Vlog';
import { NextPage } from 'next';

const Vlog: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Video log</title>
        <meta name="description" content="Show me your records" />
      </Head>
      <VlogC />
      <Footer />
    </div>
  );
};

export default Vlog;
