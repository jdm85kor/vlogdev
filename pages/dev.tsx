import { css } from '@emotion/react';
import Head from 'next/head'
import { mq } from '@styles/theme';

const About: React.FC = () => {
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>Dev blog</title>
        <meta name="description" content="" />
      </Head>
      <h1 css={css`
        display: none;
      `}>
        VLOG
      </h1>
      <div css={css`
        margin: 50px auto 0;
        ${mq({
          padding: ['0 30px 30px', '0 50px', '0 50px'],
        })}
        max-width: 1024px;
        box-sizing: border-box;
      `}>
        작업 중입니다.<br />
        <a href="https://dongmin-jang.medium.com" target="_blank" rel="noreferrer">medium으로 이동</a>
      </div>
    </main>
  );
};

export default About;
