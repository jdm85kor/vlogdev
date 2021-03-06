import Head from 'next/head';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import Loading from '@components/common/Loading';

const Start: NextPage = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend Quant" />
        <meta property="og:url" content="https://v-log.dev/playground/quant/start/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta
          property="og:description"
          content="Record yourself. Record do something. Record whatever."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Front Quant" />
        <meta name="twitter:url" content="https://v-log.dev/playground/quant/start/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta
          name="twitter:description"
          content="Record yourself. Record do something. Record whatever."
        />
      </Head>
      <Playground>
        <h1>Quant</h1>
        <div
          css={css`
            background: no-repeat center/contain
              url(${process.env.NEXT_PUBLIC_ASSET_URL}/broker.jpeg);
            width: 100%;
            padding: 25% 0;
          `}
        />
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
            로직을 만들어서 매매를 하는 것보다 저의 직감이 더 잘 맞다고 생각 해왔습니다.
            <br />
            그런데 이제는 직감으로 매매가 힘들거 같아서 시작하려 합니다.
          </p>
          <p>데이터 모으는 중..</p>
          <div
            css={css`
              position: relative;
              width: 100%;
              height: 200px;
            `}
          >
            <Loading />
          </div>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Start;
