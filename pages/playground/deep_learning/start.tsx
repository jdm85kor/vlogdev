import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

const Start: React.FC = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend AI" />
        <meta property="og:url" content="https://vlog.dev/playground/ai/ready/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Record yourself. Record do something. Record whatever." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Front AI" />
        <meta name="twitter:url" content="https://v-log.dev//playground/ai/ready/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Record yourself. Record do something. Record whatever." />
      </Head>
      <Playground>
        <h1>
          AI
        </h1>
        <div
          css={css`
            background: no-repeat center/contain url(https://d6c63ppcwec2x.cloudfront.net/books/deeplearningjavascript.jpeg);
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
            Deep learning has transformed the fields of computer vision, image processing, and natural language applications. Thanks to TensorFlow.js, now JavaScript developers can build deep learning apps without relying on Python or R. Deep Learning with JavaScript shows developers how they can bring DL technology to the web. Written by the main authors of the TensorFlow library, this new book provides fascinating use cases and in-depth instruction for deep learning apps in JavaScript in your browser or on Node.
          </p>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Start;
