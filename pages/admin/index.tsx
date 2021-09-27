import Head from 'next/head'
import { css } from '@emotion/react';
import Admin from '@containers/Admin';

const admin: React.FC = () => {
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>VLOG admin</title>
      </Head>
      <Admin />
    </main>
  );
};

export default admin;
