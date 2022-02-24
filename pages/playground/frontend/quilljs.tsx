import { useRef } from 'react';
import Head from 'next/head'
// import Quill from 'quill';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { NextPage } from 'next';

const Quilljs: NextPage = () => {
  const quillEl = useRef(null);
  // useEffect(()=> {
  //   if (quillEl?.current) {
  //     const quill = new Quill(quillEl.current, { theme: 'snow'});
  //   }
  // }, [])
  
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend react-quill" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/react-quill/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="react-quill" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend web-rtc" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/react-quill/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="react-quill" />

        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
      </Head>
      <Playground>
        <h1>
          quilljs
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
          <div id='editor' ref={quillEl} css={css`
            height: 500px;
          `}
          />
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Quilljs;