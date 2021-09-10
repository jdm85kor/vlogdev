import React from 'react';
import Head from 'next/head'
import { css } from '@emotion/react';
import Menu from '@components/playground/Menu';

interface Props {
  children?: React.ReactNode;
};

const Template: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Lab</title>
        <meta name="description" content="Let's play and study." />
      </Head>
      <div css={css`
        display: flex;
        position: relative;
        margin: 0 auto;
        max-width: 1920px;
        width: 100%;
        height: calc(100vh - 50px); // GNB 50px
        flex-direction: row;
        align-items: stretch;
      `}>
          <Menu />
          <div css={css`
            flex: 1 1 auto;
          `}>
            <div css={css`
              margin: 0 auto;
              text-align: center;
            `}>
              {children}
            </div>
          </div>

        </div>
    </>
  );
};

export default Template;
