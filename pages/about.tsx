import { css } from '@emotion/react';
import Head from 'next/head'

const dtStyle = css`
  display: inline-block;
  margin: 0 0 10px;
  width: 15%;
  min-width: 110px;
  &::after {
    content: ':';
  }
`;
const ddStyle = css`
  display: inline-block;
  width: 85%;
  margin: 0 0 10px;
`;

const About: React.FC = () => {
  return (
    <div css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>JDM</title>
        <meta name="description" content="Who is he?" />
      </Head>
      <h1 css={css`
        display: none;
      `}>This page was made by jdm.</h1>
      <div css={css`
        margin: 100px auto 0;
        padding-left: 100px;
      `}>
        <h1>V-LOG.DEV</h1>
        <h2>About</h2>
        <dl css={css`
          font-size: 20px;
          margin-bottom: 80px;
        `}>
          <dt css={dtStyle}>Front-end</dt>
          <dd css={ddStyle}>next.js + Rout53 + CloudFront + S3 (AWS)</dd>
          <dt css={dtStyle}>Back-end</dt>
          <dd css={ddStyle}>lambda + Api gateway + DynamoDB (AWS)</dd>
          <dt css={dtStyle}>Git project</dt>
          <dd css={ddStyle}>
            <a
              href="https://github.com/jdm85kor/vlogdev"
              css={css`
                text-decoration: none;
                color: blue;
            `}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >https://github.com/jdm85kor/vlogdev</a>
          </dd>
        </dl>
        <h2>
          Developer
        </h2>
        <dl css={css`
          font-size: 20px;
        `}>
          <dt css={dtStyle}>Blog</dt>
          <dd css={ddStyle}>
          <a
              href="https://github.com/jdm85kor/vlogdev"
              css={css`
                text-decoration: none;
                color: blue;
            `}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >https://dongmin-jang.medium.com/</a>
            </dd>
          <dt css={dtStyle}>Email</dt>
          <dd css={ddStyle}>jdm85kor@gmail.com</dd>
          <dt css={dtStyle}>Career</dt>
          <dd css={ddStyle}>sentbe, wemakeprice, wantedlab, musinsa</dd>
        </dl>
      </div>
    </div>
  );
};

export default About;
