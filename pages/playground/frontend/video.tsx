import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { NextPage } from 'next';

const Video: NextPage = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend Video" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/video/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Record yourself. Record do something. Record whatever." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend Video" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/video/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Record yourself. Record do something. Record whatever." />
      </Head>
      <Playground>
        <h1>
          Video
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
            web에서 video 제어하기<br />
            https://www.youtube.com/watch?v=-OTc0Ki7Sv0<br />
            https://github.com/kudlav/videoeditor<br />
            https://paul.kinlan.me/building-a-video-editor-on-the-web-with-the-web/<br />
          </p>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Video;