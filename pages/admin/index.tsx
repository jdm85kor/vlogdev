import Head from 'next/head'
import { css } from '@emotion/react';
import Admin from '@containers/Admin';

const admin: React.FC = () => {
  return (
    <div>
      <Head>
        <title>VLOG admin</title>
      </Head>
      <Admin />
    </div>
  );
};

export default admin;
