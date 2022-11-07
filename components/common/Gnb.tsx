/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { colors } from '@styles/theme';
import Setting from '@public/svg/setting.svg';
import { mq } from '@styles/theme';

const div = css`
  margin: 0 auto;
  position: sticky;
  ${mq({
    padding: ['0 20px', '0 50px', '0 50px'],
  })};
  top: 0;
  max-width: 1920px;
  box-sizing: border-box;
  background: #fff;
  z-index: 5000;
`;

const nav = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  height: 50px;
`;

const img = css`
  vertical-align: middle;
`;

const ul = css`
  flex: 1 1 1024px;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  height: inherit;
  text-align: center;
  max-width: 1024px;
  min-width: 230px;
`;
const li = css`
  display: inline-block;
  flex: auto;
  height: inherit;
  & > a {
    font-size: 16px;
    @media (max-width: 374px) {
      padding: 0 3px;
      font-size: 14px;
    }
  }
`;

const a = css`
  flex: 1 1 auto;
  color: ${colors.hermes};
  text-decoration: none;
  text-align: center;
  &:hover {
    color: #f3a621;
  }
  &::before {
    content: '';
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }
`;

const Gnb = () => {
  return (
    <div css={div} role="banner">
      <nav css={nav}>
        <Link href="/" passHref css={a}>
          <img
            css={img}
            src={`${process.env.NEXT_PUBLIC_ASSET_URL}/logo_96x96.png`}
            alt=""
            width="30"
            height="30"
          />
        </Link>
        <ul css={ul}>
          <li css={li}>
            <Link href="/vlog" passHref css={a}>
              VLOG
            </Link>
          </li>
          <li css={li}>
            <Link href="/playground" passHref css={a}>
              PLAYGROUND
            </Link>
          </li>
          <li css={li}>
            <Link href="/dev" passHref css={a}>
              DEV
            </Link>
          </li>
          <li css={li}>
            <Link href="/about" passHref css={a}>
              ABOUT
            </Link>
          </li>
        </ul>
        <Link href="/admin" passHref css={a}>
          <Setting
            css={css`
              width: 20px;
              height: 20px;
              display: inline-block;
              vertical-align: middle;
            `}
          />
        </Link>
      </nav>
    </div>
  );
};

export default Gnb;
