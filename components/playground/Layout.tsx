import React from 'react';
import Head from 'next/head'
import { css } from '@emotion/react';
import Menu from '@components/playground/Menu';
import { mq } from '@styles/theme';

interface Props {
  children?: React.ReactNode;
  test?: boolean;
  test2?: boolean;
};

const Template = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Playground</title>
        <meta name="description" content="Let's play and study." />
      </Head>
      <div css={css`
        display: flex;
        position: relative;
        margin: 0 auto;
        max-width: 1920px;
        width: 100%;
        flex-direction: row;
        align-items: stretch;
        justify-content: center;
      `}>
          <Menu />
          <div css={css`
            flex: auto;
            max-width: 1024px;
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
