import Head from 'next/head'
import { css } from '@emotion/react';
import Menu from '@components/playground/Menu';

interface Props {
  children?: React.ReactNode;
};

const Template: React.FC<Props> = ({ children }) => {
  return (
    <div css={css`
      position: relative;
      margin: 0 auto;
      max-width: 1920px;
      height: calc(100vh - 50px);
    `}>
      <Head>
        <title>Lab</title>
        <meta name="description" content="Let's play and study." />
      </Head>
      <Menu />
      <div css={css`
        display: inline-block;
        vertical-align: top;
      `}>
        {children}
      </div>
    </div>
  );
};

export default Template;
