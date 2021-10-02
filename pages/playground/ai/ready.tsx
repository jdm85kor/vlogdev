import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';

const Ready: React.FC = () => {
  
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
          Frontend AI
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
          Understand the evolution of machine learning deep learning and now artificial intelligence AI. In this course youll follow a series of practical examples of training machine learning models to come up with accurate predictions. Youll use TensorFlow to create the models and Keras a high-level Python API for building and training deep learning models on top of TensorFlow. Examples in this course include: identifying animal breeds in photos analyzing blocks of text to determine which renowned author wrote it and stylizing images trained by famous painters!
        </section>
      </Playground>
    </div>
  );
};

export default Ready;
