import Head from 'next/head'
import { css } from '@emotion/react';
import PlaygroundC from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

const Sample: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Playground | Lab</title>
        <meta property="og:title" content="Visualize" />
        <meta property="og:url" content="https://v-log.dev/playground/visualize/sample/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Play" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Visualize" />
        <meta name="twitter:url" content="https://v-log.dev/playground/visualize/sample/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.png" />
        <meta name="twitter:description" content="Play" />
      </Head>
      <PlaygroundC>
        <h1>
          Sample
        </h1>
        <section
          css={css`
            padding: 0 20px;
            text-align: left;
          `}
        >
          <p>
            graph chart
          </p>
        </section>
      </PlaygroundC>
      <Utteranc />
    </div>
  );
};

export default Sample;
