import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import RequestModal from '@components/RequestModal';
import { css } from '@emotion/react';
import { mq, colors } from '@styles/theme';
import { apiCall } from '@utils/apis';
import Footer from "@components/common/Footer";

const news = [{
  url: 'https://spilist.notion.site/e5b0e192ed494fc699016b95169732ed',
  title: '캐시노트 프론트엔드 디버깅 사례',
}, {
  url: 'https://dev.to/o1lab/how-my-open-source-project-got-angel-investment-from-its-user-12dp',
  title: '내 오픈소스 프로젝트가 유저로 부터 엔젤 투자를 받는 방법',
}, {
  url: 'https://news.hada.io/weekly/202122',
  title: '재미로 만든 작은 인터넷 프로젝트 팔기',
}];

const sectionStyle = css`
  margin: 0 auto 20px;
  ${mq({
    padding: ['0 20px 10px', '0 50px 20px', '0 50px 20px'],
  })}
  width: 100%;
  max-width: 1024px;
  box-sizing: border-box;
  & > h2 {
    font-size: 30px;
  }
`;
const backgroundImg = (file: string) => css`
  margin: 0;
  padding 0;
  position: relative;
  width: 100%;
  height: 400px;
  background: no-repeat 100%/cover url(https://d6c63ppcwec2x.cloudfront.net/${file});
`;
const requestButtonStyle = css`
  margin: 0 auto;
  padding: 10px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    border-color: ${colors.hermes}
  }
`;

const imgStyle = (src: string) => css`
  margin: 0 auto;
  ${mq({
    width: ['50px', '100px', '130px'],
    height: ['50px', '120px', '150px'],
  })}
  background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/${src});
`;
const imgTitleStyle = css`
  ${mq({
    width: ['80%', '120px', '120px'],
    display: ['none', 'block', 'block'],
  })}
  margin: 0 auto;
  padding: 0;
  text-align: center;
  font-size: 18px;
  color: #777;
`;
const thumbnailStyle = (thumbnails: Record<'default' | 'high' | 'high', {
  width: number;
  height: number;
  url: string;
}>) => css`
  display: inline-block;
  width: 100px;
  height: 100px;
  ${mq({
    background: [
      `no-repeat 100%/contain url(${thumbnails.default.url})`,
      `no-repeat 100%/contain url(${thumbnails.default.url})`,
      `no-repeat 100%/contain url(${thumbnails.high.url})`
    ]
  })}
`;
const titleStyle = css`
  display: inline-block;
  margin-top: 5px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Home: React.FC = () => {
  const [isShowRequest, setIsShowRequest] = useState(false);
  const [latestVideos, setLatestVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<string>('');

  const fetchLatestVideo = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const { data } = await apiCall({
        method: 'get',
        url: '/vlogdev/video',
        query: { type: 'latest' },
      });
      setLatestVideos(data.items);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClickButton = useCallback((t: string) => {
    setIsShowRequest(true);
    setType(t);
  }, []);

  useEffect(() => {
    fetchLatestVideo();
  } ,[fetchLatestVideo]);
  
  const getDayTime: 'morning' | 'afternoon' | 'evening' | 'night' = useMemo(() => {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 12 ? 'morning':
      hours >= 12 && hours < 18 ? 'afternoon':
      hours >= 18 && hours < 22 ? 'evening':
      'night';
  }, []);

  const getLandscapeUrlByTime: string = useMemo(() => {
    switch(getDayTime) {
      case 'morning':
        return 'pungmu_morning_s.jpg';
      case 'afternoon':
        return 'pungmu_afternoon_s.jpg';
      case 'evening':
        return 'pungmu_evening_s.jpg';
      case 'night':
        return 'pungmu_night_s.jpg';
      default:
        return 'pungmu_morning_s.jpg';
    }
  }, [getDayTime]);
  return (
    <>
      <main css={css`
        margin: 0 auto;
        max-width: 1920px;
      `}>
        <Head>
          <title>VLOG | Video Log</title>
        </Head>
        <h1 css={css`
          display: none;
        `}>
          Record yourself. Record do something. Record whatever.
        </h1>
        <section css={sectionStyle}>
          <div css={backgroundImg(getLandscapeUrlByTime)}>
            <p css={css`
              display: inline-block;
              position: absolute;
              left: 50%;
              top: 20%;
              transform: translateX(-50%);
              ${mq({
                fontSize: ['30px', '40px', '40px'],
              })}
              color: ${getDayTime === 'afternoon' ? colors.hermes: '#fff'};
              font-style: italic;
              font-weight: 600;
            `}>{`Good ${getDayTime}`}</p>
          </div>
          <h2>
            New Videos
          </h2>
          <ul css={css`
            margin: 0;
            padding: 0;
            list-style: none;
            width: 100%;
            height: 140px;
            overflow-x: auto;
            white-space: nowrap;
          `}>
            {
              latestVideos.map((v: any) => (
                <li
                  key={v.videoId}
                  css={css`
                    display: inline-flex;
                    flex-direction: column;
                    width: 114px;
                    text-align: center;
                    padding: 2px;
                    border-radius: 10px;
                    box-sizing: border-box;
                  `}
                >
                  <Link
                    href={`https://www.youtube.com/watch?v=${v.videoId}`}
                    passHref
                  >
                    <a
                      css={css`
                        display: inline-flex;
                        flex-direction: column;
                        padding: 0;
                        background: inherit;
                        border: none;
                        cursor: pointer;
                        text-decoration: none;
                        color: #555;
                      `}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      <div css={thumbnailStyle(v.thumbnails)} />
                      <span css={titleStyle} dangerouslySetInnerHTML={{__html: v.videoTitle}}>
                      </span>
                    </a>
                  </Link>
                </li>)
              )
            }
          </ul>
        </section>
        <section css={sectionStyle}>
          <h2>
            New blog posts
          </h2>
          <p>
            {
              news.map((n, idx) => (
                <Link
                  key={idx}
                  href={n.url}
                  passHref
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    css={css`
                      margin: 10px 0;
                      text-decoration: underline;
                      color: #555;
                      display: block;
                    `}
                  >{n.title}</a>
                </Link>
              ))
            }
          </p>
        </section>
        <section css={sectionStyle}>
          <h2 css={css`display: none;`}>
            To manager
          </h2>
          <div css={css`
            display: flex;
            height: max-content;
            justify-content: space-around;
          `}>
            <button css={requestButtonStyle} type="button" onClick={() => handleClickButton('Job offer')}>
              <div css={imgStyle('letter.png')} />
              <span css={imgTitleStyle}>Job offer</span>
            </button>
            <button css={requestButtonStyle} type="button" onClick={() => handleClickButton('Outsourcing')}>
              <div css={imgStyle('develop.png')} />
              <span css={imgTitleStyle}>Outsourcing development</span>
            </button>
            <button css={requestButtonStyle} type="button" onClick={() => handleClickButton('Partnership')}>
              <div css={imgStyle('partnership.png')} />
              <span css={imgTitleStyle}>Contents partnership</span>
            </button>
            <button css={requestButtonStyle} type="button" onClick={() => handleClickButton('Play golf')}>
              <div css={imgStyle('golf.png')} />
              <span css={imgTitleStyle}>Play golf</span>
            </button>
          </div>
        </section>
        <RequestModal
          isShow={isShowRequest}
          setShow={(status: boolean) => setIsShowRequest(status)}
          type={type}
        />
      </main>
      <Footer />
    </>
  )
}

export default Home;
