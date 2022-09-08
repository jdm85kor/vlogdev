import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { NextPage } from 'next';

const Remotion: NextPage = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend remotion" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/remotion/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="video library" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend remotion" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/remotion/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="remotion library" />
      </Head>
      <Playground>
        <h1>
          remotion
        </h1>
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <p>
          </p>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Remotion;

