import Head from 'next/head'
import Footer from "@components/common/Footer";
import VlogC from '@containers/Vlog';

const Vlog: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Video</title>
        <meta name="description" content="Show me your records" />
      </Head>
      <VlogC />
      <Footer />
    </div>
  );
};

export default Vlog;
