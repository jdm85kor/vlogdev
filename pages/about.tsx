import { css } from '@emotion/react';
import Head from 'next/head'
import Facebook from '@public/svg/facebook.svg';
import Instagram from '@public/svg/instagram.svg';
import Linkedin from '@public/svg/linkedin.svg';
import Twitter from '@public/svg/twitter.svg';
import Youtube from '@public/svg/youtube.svg';

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
const iconStyle = css`
  width: 50px;
  height: 50px;
  vertical-align: top;
  margin: 0 5px;
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
      <div css={css`
        margin: 100px auto 0;
        padding-left: 100px;
      `}>
        <h1>V-LOG.DEV</h1>
        <div css={css`
          display: none;
        `}>This page was made by jdm to introduce v-log.</div>
        <h2>Owner</h2>
        <dl css={css`
          font-size: 20px;
          margin-bottom: 20px;
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
          <dt css={dtStyle}>SNS</dt>
          <dd css={ddStyle}>
            <a href="https://www.facebook.com/jdm85kor" target="_blank">
              <Facebook css={iconStyle}/>
            </a>
            <a href="https://www.instagram.com/jdm_kor/" target="_blank">
              <Instagram css={iconStyle}/>
            </a>
            <a href="https://www.linkedin.com/in/dongmin-jang-b3495255/" target="_blank">
              <Linkedin css={iconStyle}/>
            </a>
            <a href="https://twitter.com/Dongmin_JANG" target="_blank">
              <Twitter css={iconStyle}/>
            </a>
            <a href="https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA" target="_blank">
              <Youtube css={iconStyle}/>
            </a>
          </dd>
        </dl>
        <h2>
          Develop
        </h2>
        <dl css={css`
          font-size: 20px;
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
      </div>
    </div>
  );
};

export default About;
