import Head from 'next/head'
import { css } from '@emotion/react';
import PlaygroundC from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

const Today: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Playground | Lab</title>
        <meta property="og:title" content="Playground" />
        <meta property="og:url" content="https://vlog.dev/playground/idle_talk/today/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Play" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Playground" />
        <meta name="twitter:url" content="https://v-log.dev//playground/idle_talk/today/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.png" />
        <meta name="twitter:description" content="Play" />
      </Head>
      <PlaygroundC>
        <h1>
          잡담
        </h1>
        <section
          css={css`
            padding: 0 20px;
            text-align: left;
          `}
        >
          <p>
            그냥 이런저런 얘기 쓰려고 만들었습니다.
          </p>
        </section>
      </PlaygroundC>
      <Utteranc />
    </div>
  );
};

export default Today;
