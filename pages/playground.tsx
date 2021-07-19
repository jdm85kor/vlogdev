import Head from 'next/head'
import { css } from '@emotion/react';

const Playground: React.FC = () => {
  return (
    <div css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>Lab</title>
        <meta name="description" content="Let's play and study." />
      </Head>
      <div css={css`
        text-align: center;
      `}>
      You can&apos;t access this page
      </div>

    </div>
  );
};

export default Playground;
