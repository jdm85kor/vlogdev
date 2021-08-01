import { useState } from 'react';
import Head from 'next/head'
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import Hamberger from '@public/hamberger.svg';

const Playground: React.FC = () => {
  const [isFoldMenu, setIsFoldMenu] = useState(true);
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
      <div
        css={css`
          position: relative;
          display: inline-block;
          background: ${colors.hermes};
          width: ${isFoldMenu ? '50px' : '400px'};
          height: 100%;
          &::after {
            display: block;
            content: '';
            clear: both;
          }
        `}
      >
        <div css={css`
          height: 50px;
        `}>
          <button
            type="button"
            css={css`
              margin: 0;
              padding: 0;
              background: none;
              border: none;
              cursor: pointer;
              float: right;
            `}
            onClick={() => setIsFoldMenu(prev => !prev)}
          >
            <Hamberger
              css={css`
                width: 50px;
                heigth: 50px;
                & > path {
                  fill: #fff;
                }
              `
              }
            />
          </button>
        </div>
        {
          !isFoldMenu &&
          <ul css={css`
            list-style: none;
            margin: 0;
            padding: 0 0 0 20px;
          `}>
            <li css={css`
              position: relative;
              color: #fff;
              font-size: 18px;
              &::before {
                content: '';
                display: inline-block;
                position: absolute;
                top: 50%;
                left: -8px;
                background: #fff;
                width: 2px;
                height: 2px;
                border-radius: 100%;
              }
            `}
            >
              react-fetch
            </li>
          </ul>
        }
      </div>
      <div css={css`
        display: inline-block;
        vertical-align: top;
        margin: 20px;
      `}>
      You can&apos;t access this page
      </div>

    </div>
  );
};

export default Playground;
