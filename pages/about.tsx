import { css } from '@emotion/react';
import Head from 'next/head'
import Facebook from '@public/svg/facebook.svg';
import Instagram from '@public/svg/instagram.svg';
import Linkedin from '@public/svg/linkedin.svg';
import Twitter from '@public/svg/twitter.svg';
import Youtube from '@public/svg/youtube.svg';
import { mq, colors } from '@styles/theme';

const sectionStyle = css`
  display: block;
  position: relative;
  width: 100%;
`;
const h2Style = css`
  color: ${colors.hermes};
  font-style: italic;

`;
const dtStyle = css`
  display: inline-block;
  margin: 0 0 10px;
  ${mq({
    width: ['100%', '14%', '14%'],
  })}
  font-weight: 600;
  &::after {
    content: ':';
  }
`;
const ddStyle = css`
  display: inline-block;
  ${mq({
    width: ['100%', '85%', '85%'],
  })}
  margin: 0 0 10px;
  color: #555;
`;
const pStyle = css`
  color: #555;
  font-size: 17px;
`;
const iconStyle = css`
  ${mq({
    width: ['30px', '50px'],
    height: ['30px', '50px'],
  })}
  vertical-align: top;
  margin: 0 5px;
`;


const About: React.FC = () => {
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>JDM</title>
        <meta name="description" content="This page was made by jdm" />
      </Head>
      <div css={css`
        margin: 50px auto;
        ${mq({
          padding: ['0 30px 30px', '0 50px', '0 50px'],
        })}
        max-width: 1024px;
        word-break: break-word;
        box-sizing: border-box;
      `}>
        <h1>V-log.dev</h1>
        <div css={css`
          display: none;
        `}>This page was made by jdm.</div>
        <section css={sectionStyle}>
          <div css={css`
            background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg);
            padding: 23% 0;
            width: 100%;
          `}/>
          <h2 css={h2Style}>
            Environment
          </h2>
          <dl>
            <dt css={dtStyle}>Front</dt>
            <dd css={ddStyle}>next.js, Rout53,  CloudFront, S3, Amplify</dd>
            <dt css={dtStyle}>Back</dt>
            <dd css={ddStyle}>Lambda, Api gateway, DynamoDB, Cognito, EventBridge</dd>
            <dt css={dtStyle}>Git</dt>
            <dd css={ddStyle}>
              <a
                href="https://github.com/jdm85kor/vlogdev"
                css={css`
                  text-decoration: none;
                  color: slateblue;
              `}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >https://github.com/jdm85kor/vlogdev</a>
            </dd>
          </dl>
          <div css={css`
            font-size: 12px;
            color: #999;
          `}>
            Icons made by&nbsp;
            <a
              css={css`
                text-decoration: none;
                color: slateblue;
              `}
              href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">
              Pixelmeetup&nbsp;
            </a> 
            from&nbsp;
            <a
              css={css`
                text-decoration: none;
                color: slateblue;
              `}
              href="https://www.flaticon.com/"
              title="Flaticon"
            >
            www.flaticon.com 
            </a>
          </div>
        </section>
        <section css={sectionStyle}>
          <h2 css={h2Style}>
            History
          </h2>
          <p css={pStyle}>
            21.8 site 오픈
          </p>
          <p css={pStyle}>
            21.9 admin 계정 인증 기능 추가, youtube 개발 컨텐츠 추가
          </p>
        </section>
        <section css={sectionStyle}>
          <h2 css={h2Style}>
            Plan
          </h2>
          <p css={pStyle}>
            blog, youtube 컨텐츠 정리<br />
          </p>
          <p css={pStyle}>
            다양한 library 실험 및 새로운 학습 자료들 정리<br />
          </p>
          <a
            href="https://github.com/jdm85kor/vlogdev/projects/1"
            target="_blank"
            rel="noreferrer"
            css={css`
              text-decoration: none;
              color: #777;
            `}
          >
            추가 예정 기능들
          </a> 
        </section>

        <section css={sectionStyle}>
          <h2 css={h2Style}>
            Owner
          </h2>
          <div css={css`
            margin: 0 auto;
            width: 250px;
            height: 300px;
            background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/profile_s.jpg);
          `} />
          <dl css={css`
            display: inline-block;
            margin: 10px 0 20px;
          `}>
            <dt css={dtStyle}>Blog</dt>
            <dd css={ddStyle}>
            <a
                href="https://github.com/jdm85kor/vlogdev"
                css={css`
                  text-decoration: none;
                  color: slateblue;
                `}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >https://dongmin-jang.medium.com/</a>
              </dd>
            <dt css={dtStyle}>Email</dt>
            <dd css={ddStyle}>jdm85kor@gmail.com</dd>
            <dt css={dtStyle}>Career</dt>
            <dd css={ddStyle}>SENTBE, WeMakePrice, Wantedlab, Musinsa</dd>
            <dt css={dtStyle}>SNS</dt>
            <dd css={css`
              ${ddStyle}
              & > a {
                ${mq({
                  marginRight: ['5px', '20px', '50px']
                })}
              }
            `}>
              <a href="https://www.facebook.com/jdm85kor" target="_blank" rel="noreferrer">
                <Facebook css={iconStyle}/>
              </a>
              <a href="https://www.instagram.com/jdm_kor/" target="_blank" rel="noreferrer">
                <Instagram css={iconStyle}/>
              </a>
              <a href="https://www.linkedin.com/in/dongmin-jang-b3495255/" target="_blank" rel="noreferrer">
                <Linkedin css={iconStyle}/>
              </a>
              <a href="https://twitter.com/Dongmin_JANG" target="_blank" rel="noreferrer">
                <Twitter css={iconStyle}/>
              </a>
              <a href="https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA" target="_blank" rel="noreferrer">
                <Youtube css={iconStyle}/>
              </a>
            </dd>
          </dl>
        </section>
      </div>
    </main>
  );
};

export default About;
