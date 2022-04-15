import Head from 'next/head';
import { css } from '@emotion/react';
import PlaygroundC from '@containers/Playground';
import { NextPage } from 'next';

const Playground: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Playground | Lab</title>
        <meta name="description" content="Play" />
      </Head>
      <PlaygroundC>
        <h1>Playground</h1>
        <div
          css={css`
            background: no-repeat 100% / contain
              url(${process.env.NEXT_PUBLIC_ASSET_URL}/desk_s.jpg);
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
            Deep learning, Quant, Book, Front-end, Visualize 등의 주제로 여러 실험을 해보고
            있습니다.
          </p>
          <p>자유로운 주제로 다양한 컨텐츠가 추가 될 것입니다.</p>
        </section>
      </PlaygroundC>
    </div>
  );
};

export default Playground;
