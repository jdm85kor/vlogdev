import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import Books from '@public/svg/books.svg';

const Start: React.FC = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend AI" />
        <meta property="og:url" content="https://v-log.dev/playground/books/start/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Record yourself. Record do something. Record whatever." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Books" />
        <meta name="twitter:url" content="https://v-log.dev/playground/books/start/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Record yourself. Record do something. Record whatever." />
      </Head>
      <Playground>
        <h1>
          Books
        </h1>
        <div>
          <Books css={css`
            vertical-align: top;
            margin: 0 5px;
            viewBox: 0 0 200 200;
          `} />
        </div>
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
            여러가지 책을 보고 내용을 정리하거나 예제를 진행해보는 공간입니다.
          </p>
          <p>
            필요에 따라서 스터디를 진행합니다.
          </p>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Start;