import Head from 'next/head'
import { css } from '@emotion/react';
import PlaygroundC from '@containers/Playground';
import { NextPage } from 'next';

const Playground: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Playground | Lab</title>
        <meta property="og:title" content="Playground" />
        <meta property="og:url" content="https://vlog.dev/playground/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Play" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Playground" />
        <meta name="twitter:url" content="https://v-log.dev//playground/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.png" />
        <meta name="twitter:description" content="Play" />
      </Head>
      <PlaygroundC>
        <h1>
          Playground
        </h1>
        <div
          css={css`
            background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg);
            width: 100%;
            padding: 25% 0;
          `}
        />
        <section
          css={css`
            padding: 0 20px;
            text-align: left;
          `}
        >
          <p>
            Deep learning, Quant, Book, Front-end, Visualize 등의 주제로 여러 실험을 해보고 있습니다.
          </p>
          <p>
            자유로운 주제로 다양한 컨텐츠가 추가 될 것입니다.
          </p>
        </section>
      </PlaygroundC>
    </div>
  );
};

export default Playground;
