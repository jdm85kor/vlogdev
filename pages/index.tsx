import React, { useState, useCallback, useEffect } from 'react';
import RequestModal from '@components/RequestModal';
import { css } from '@emotion/react';
import Head from 'next/head'
import Loading from "@components/common/Loading";
import { mq } from '@styles/theme';
import { apiCall } from '@utils/apis';
import Link from 'next/link'

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
  margin: 0 auto;
  padding 0;
  width: 100%;
  height: 400px;
  background: no-repeat 100%/cover url(https://d6c63ppcwec2x.cloudfront.net/${file});
`;
const buttonStyle = css`
  margin: 5px;
  padding: 20px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const imgStyle = (src: string) => css`
  margin: 0 auto;
  ${mq({
    width: ['200px', '230px', '362px']
  })}
  height: 350px;
  background: no-repeat 100%/contain url(https://d6c63ppcwec2x.cloudfront.net/${src});
`;
const imgTitleStyle = css`
  display: block;
  margin: 10px 0 0;
  padding: 0;
  text-align: center;
  font-size: 24px;
  color: #000;
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
  const [latestVideo, setLatestVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string>('');

  const fetchLatestVideo = useCallback(async () => {
    const { data } = await apiCall({
      method: 'get',
      url: '/vlogdev/video',
      query: { type: 'latest' },
    });
    setLatestVideo(data.items);
  }, []);

  const handleClickButton = useCallback((t: string) => {
    setIsShowRequest(true);
    setType(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetchLatestVideo();
    return () => clearTimeout(timer);
  } ,[fetchLatestVideo]);
  
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>VLOG | Video Log</title>
      </Head>
      {
        isLoading ?
        <Loading /> :
        <>
          <h1 css={css`
            display: none;
          `}>
            Record yourself. Record do something. Record whatever.
          </h1>
          <section css={sectionStyle}>
            <div css={backgroundImg('pungmu_morning_s.jpg')} />
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
                latestVideo.map((v: any) => (
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
                        <span css={titleStyle}>
                          { v.videoTitle }
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
              New Blog posts
            </h2>
            <div css={backgroundImg('pungmu_afternoon_s.jpg')} />
          </section>
          <section css={sectionStyle}>
            <h2>
              Weekly News
            </h2>
            <div css={backgroundImg('pungmu_evening_s.jpg')} />
          </section>
          <section css={sectionStyle}>
            <h2>
              To manager
            </h2>
            <div css={css`
              display: flex;
              ${mq({
                height: ['auto', '500px', '500px'],
                'flexDirection': ['column', 'row', 'row'],
              })}
              justify-content: space-around;
            `}>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Job offer')}>
                <div css={imgStyle('letter.png')} />
                <span css={imgTitleStyle}>Job offer</span>
              </button>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Outsourcing development')}>
                <div css={imgStyle('develop.png')} />
                <span css={imgTitleStyle}>Outsourcing development</span>
              </button>
            </div>
            <div css={css`
              display: flex;
              ${mq({
                height: ['auto', '500px', '500px'],
                'flexDirection': ['column', 'row', 'row'],
              })}
              justify-content: space-around;
            `}>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Contents partnership')}>
                <div css={imgStyle('partnership.png')} />
                <span css={imgTitleStyle}>Contents partnership</span>
              </button>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Play golf')}>
                <div css={imgStyle('golf.png')} />
                <span css={imgTitleStyle}>Play golf</span>
              </button>
            </div>
          </section>
        </>
      }
      <RequestModal
        isShow={isShowRequest}
        setShow={(status: boolean) => setIsShowRequest(status)}
        type={type}
      />
    </main>
  )
}

export default Home;
