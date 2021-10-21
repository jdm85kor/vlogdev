/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import Facebook from '@public/svg/facebook.svg';
import Instagram from '@public/svg/instagram.svg';
import Linkedin from '@public/svg/linkedin.svg';
import Twitter from '@public/svg/twitter.svg';
import Youtube from '@public/svg/youtube.svg';
import { mq, colors } from '@styles/theme';
import Unfold from '@public/svg/unfold.svg';
import Fold from '@public/svg/fold.svg';
import { getDeviceSize } from '@utils/device';

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
const snsStyle = css`
  ${mq({
    width: ['30px', '50px'],
    height: ['30px', '50px'],
  })}
  vertical-align: top;
  margin: 0 5px;
`;

const foldStyle = css`
  display: inline-block;
  position: absolute;
  right: 20px;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin: 0 5px;
`;

const About = () => {
  const [collabseStatus, setCollabseStatus] = useState<{ [key: string]: boolean}>({
    indivisual: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motions = useRef<HTMLImageElement[]>([]);

  const initCanvasResource = () => {
    const imgs: HTMLImageElement[] = [];
    let loadedImgsCnt = 0;
    const total = 321;
    
    for (let i = 0 ; i < total ; i++) {
      const imgEl = new Image();
      imgEl.src = `https://d6c63ppcwec2x.cloudfront.net/video/golf/driver/driver${i.toString().padStart(3, '0')}.jpg`;
      imgs.push(imgEl);

      imgEl.addEventListener('load', function () {
        loadedImgsCnt++;
        if (loadedImgsCnt === total) {
          if (!canvasRef.current) return;

          const canvas: HTMLCanvasElement = canvasRef.current;
          const ctx = canvas.getContext('2d');
          let progress: number = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
          if (progress < 0) progress = 0;
          if (progress > 1) progress = 1;
          (ctx as CanvasRenderingContext2D).drawImage(imgs[Math.round(320 * progress)], 0, 0);

          const opacity = progress < 0.3 ?
            progress / 3 * 10 :
            progress > 0.7 ?
            Math.abs(1 - progress) / 3 * 10 : 1;
          canvas.style.opacity = opacity.toString();

          window.addEventListener('scroll', handleScroll);
        }
      });
    }

    motions.current = imgs;
  };

  const animateCanvas = (progress: number) => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;

    const ctx = canvas.getContext('2d');
    const currentFrame = Math.round(320 * progress);

    if (motions.current[currentFrame])
      (ctx as CanvasRenderingContext2D).drawImage(motions.current[currentFrame], 0, 0);

    const opacity = progress < 0.3 ?
      progress / 3 * 10 :
      progress > 0.7 ?
      Math.abs(1 - progress) / 3 * 10 : 1; 
    canvas.style.opacity = opacity.toString();
  };
  const handleScroll = () => {
    let progress: number = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    requestAnimationFrame(() => animateCanvas(progress));
  };

  useEffect(() => {
    if (getDeviceSize() === 'desktop') {
      initCanvasResource();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main css={css`
      position: relative;
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <div css={css`
        position: relative;
        margin: 0 auto;
      `}>
        <div css={css`
          background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg);
          padding: 22% 0;
          width: 100%;
        `}/>
      </div>
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
            Plan & Goal
          </h2>
          <p css={pStyle}>
            blog, youtube 컨텐츠 정리
          </p>
          <p css={pStyle}>
            다양한 실험 및 새로운 학습 자료들 정리
          </p>
          <p css={pStyle}>
            지속성 있게 기능 및 컨텐츠 업데이트
          </p>
          <p css={pStyle}>
            운영 비용 최소화
          </p>
          <p css={pStyle}>
            Frontend Deep Learning 시험 적용
          </p>
          <a
            href="https://github.com/jdm85kor/vlogdev/projects/1"
            target="_blank"
            rel="noreferrer"
            css={css`
              text-decoration: underline;
              color: #777;
            `}
          >
            추가 예정 기능들
          </a> 
        </section>

        <section css={sectionStyle}>
          <h2 css={h2Style}>
            Manager
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
            >
              https://dongmin-jang.medium.com/
            </a>
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
                <Facebook css={snsStyle}/>
              </a>
              <a href="https://www.instagram.com/jdm_kor/" target="_blank" rel="noreferrer">
                <Instagram css={snsStyle}/>
              </a>
              <a href="https://www.linkedin.com/in/dongmin-jang-b3495255/" target="_blank" rel="noreferrer">
                <Linkedin css={snsStyle}/>
              </a>
              <a href="https://twitter.com/Dongmin_JANG" target="_blank" rel="noreferrer">
                <Twitter css={snsStyle}/>
              </a>
              <a href="https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA" target="_blank" rel="noreferrer">
                <Youtube css={snsStyle}/>
              </a>
            </dd>
          </dl>
          <div
            css={css`
              height: 50px;
            `}
          >
            <button
              css={css`
                margin: 0;
                padding: 0 20px;
                border: none;
                background: #fff;
                width: 100%;
                height: 100%;
                text-align: left;
                text-decoration: underline;
                color: ${colors.hermes};
                cursor: pointer;
              `}
              onClick={() => {
                return setCollabseStatus(prev => ({
                  ...prev,
                  indivisual: !prev.indivisual,
                }));
              }}
            >
              Indivisual
              {
                collabseStatus.indivisual ?
                <Unfold css={foldStyle} />:
                <Fold css={foldStyle} />
              }
            </button>
          </div>
          {
            collabseStatus.indivisual &&
            <div>
              <div css={css`text-align: center;`}>
                <img
                  alt="weight"
                  src="https://d6c63ppcwec2x.cloudfront.net/images/weight65.jpg"
                  css={css`
                    margin: 0 auto;
                    width: 150px;
                    height: 90px;
                  `} 
                />
                <figcaption css={css`font-size: 10px;`}>
                  수능 준비 때, 80kg에 육박하다가<br />
                  졸업 전에 이 몸무게로 뺀 후 현재까지 유지
                </figcaption>
              </div>
              <div
                css={css`
                  ${mq({
                    padding: ['0 20px', '0 40px'],
                  })}
                  text-align: left;
                  color: #888;
                `}
              >
                <p>
                  취미: 골프, 여행
                </p>
                <p>
                  골프를 치는 이유: 내 몸을 얼마만큼 내가 원하는데로 쓸 수 있는지 시험해보고 싶은데, 가장 빠르고 편리하게 혼자 해볼 수 있는 종목.
                </p>
                <p>
                  수강 중인 수업: <br />
                  &nbsp;&nbsp; - <a
                    href="https://www.coursera.org/learn/browser-based-models-tensorflow"
                    css={css`
                      text-decoration: none;
                      color: slateblue;
                    `}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Browser-based Models with TensorFlow.js
                  </a><br />
                  &nbsp;&nbsp; - <a
                    href="https://www.tensorflow.org/resources/learn-ml/basics-of-tensorflow-for-js-development"
                    css={css`
                      text-decoration: none;
                      color: slateblue;
                    `}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    TensorFlow for JavaScript development
                  </a>
                </p>
              </div>
            </div>
          }
          <p css={css`
            margin: 60px auto 0;
            color: ${colors.hermes};
            text-align: center;
            font-style: italic;
            font-size: 12px;
          `}>
            &#183;<br />
            &#183;<br />
            &#183;<br />
            <br />
            누군가 나에게 이렇게 말했다<br />
            가만히 있으면 누군가 해결해 줄거라고<br />
            <br />
            그런데<br />
            나는 아직 한번도 그런 사람을 만나보지 못했다.<br />
            <br />
            &#183;<br />
            &#183;<br />
            &#183;<br />
          </p>
        </section>
        <div css={css`
          position: fixed;
          bottom: 20%;
          right: 50px;
          ${mq({
            display: ['none', 'none', 'inline-block'],
          })}
        `}>
          <canvas
            width="2160"
            height="3840"
            ref={canvasRef}
            css={css`
              width: 100px;
              z-index: 9200;
              border-radius: 50%;
            `}
          />
        </div>
      </div>
    </main>
  );
};

export default About;
