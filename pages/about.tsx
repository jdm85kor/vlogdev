import { css } from '@emotion/react';
import Head from 'next/head'
import Facebook from '@public/svg/facebook.svg';
import Instagram from '@public/svg/instagram.svg';
import Linkedin from '@public/svg/linkedin.svg';
import Twitter from '@public/svg/twitter.svg';
import Youtube from '@public/svg/youtube.svg';
import { mq, colors } from '@styles/theme';

const dtStyle = css`
  display: inline-block;
  margin: 0 0 10px;
  ${mq({
    width: ['100%', '15%', '15%'],
  })}
  min-width: 110px;
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
`;
const iconStyle = css`
  width: 50px;
  height: 50px;
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
        <meta name="description" content="Who is he?" />
      </Head>
      <div css={css`
        margin: 50px auto 0;
        ${mq({
          padding: ['0 30px 30px', '0 50px', '0 50px'],
        })}
        max-width: 1024px;
        word-break: break-word;
        box-sizing: border-box;
      `}>
        <h1>V-LOG.DEV</h1>
        <div css={css`
          display: none;
        `}>This page was made by jdm to introduce v-log.</div>
        <h2>Owner</h2>
        <section>
          <div css={css`
            width: 250px;
            height: 365px;
            background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/jdm.jpg);
          `} />
          <dl css={css`
            display: inline-block;
            font-size: 20px;
            margin: 10px 0 20px;
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
            <dd css={ddStyle}>SENTBE, WeMakePrice, Wantedlab, Musinsa</dd>
            <dt css={dtStyle}>SNS</dt>
            <dd css={ddStyle}>
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
        
        <h2>
          Develop environment
        </h2>
        <section>
          <dl css={css`
            font-size: 20px;
          `}>
            <dt css={dtStyle}>Front-end</dt>
            <dd css={ddStyle}>next.js + Rout53 + CloudFront + S3 + Amplify(AWS)</dd>
            <dt css={dtStyle}>Back-end</dt>
            <dd css={ddStyle}>lambda + Api gateway + DynamoDB + Cognito + EventBridge(AWS)</dd>
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
        </section>
        <h2>
          History
        </h2>
        <section>
          <p>
            21.08 site 오픈
          </p>
          <p>
            21.09 admin 계정 인증 기능 추가, youtube 개발 컨텐츠 추가
          </p>
          <a
            href="https://github.com/jdm85kor/vlogdev/projects/1"
            target="_blank"
            rel="noreferrer"
            css={css`
              text-decoration: none;
              color: ${colors.hermes};
            `}
          >
              추가 예정 기능들</a> 
        </section>
      </div>
    </main>
  );
};

export default About;
