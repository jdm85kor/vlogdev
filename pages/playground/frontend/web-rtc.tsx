import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { NextPage } from 'next';

const WebRTC: NextPage = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend web-rtc" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/web-rtc/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Record yourself. Record do something. Record whatever." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend web-rtc" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/web-rtc/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Record yourself. Record do something. Record whatever." />
      </Head>
      <Playground>
        <h1>
          web rtc
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
            https://nomadcoders.co/noom<br />
          </p>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default WebRTC;