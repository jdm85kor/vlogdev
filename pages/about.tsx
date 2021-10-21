import Head from 'next/head'
import Footer from "@components/common/Footer";
import AboutC from '@containers/About';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>JDM</title>
        <meta name="description" content="This service has created by DMJ to introduce V-logs." />
      </Head>
      <AboutC />
      <Footer />
    </div>
  );
};

export default About;
