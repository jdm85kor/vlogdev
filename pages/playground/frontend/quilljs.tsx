import { NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import { mq } from '@styles/theme';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { getDeviceSize } from '@utils/device';

const Quilljs: NextPage = () => {
  const { quill, quillRef } = useQuill();
  console.log(getDeviceSize());
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend react-quill" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/quilljs/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="react-quill" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend web-rtc" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/quilljs" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="react-quill" />

        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
      </Head>
      <Playground>
        <h1>quilljs</h1>
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <div
            css={css`
              position: relative;
              margin: 0 auto;
              ${mq({
                width: ['calc(100% - 10px)', 'calc(100% - 30px)'],
              })}
              height: 200px;
            `}
          >
            <div ref={quillRef} />
          </div>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Quilljs;
