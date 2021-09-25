import React, { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head'
import { apiCall } from '@utils/apis';
import { AxiosRequestConfig } from 'axios';
import { mq, colors } from '@styles/theme';
import Link from 'next/link';
import Loading from '@components/common/Loading';

const About: React.FC = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [videos, setVideos] = useState<Record<string, any[]>>({});
  const [isLoadingChannel, setIsLoadingChannel] = useState<boolean>(false);
  const [chooseChannel, setChooseChannel] = useState<string>('');

  const fetchChannels = useCallback(async () => {
    if (isLoadingChannel) return;
    setIsLoadingChannel(true);
    try {
      const { data } = await apiCall({
        method: 'get',
        url: '/vlogdev/channel',
      });
      setChannels(data.items);
    } catch(e) {
      console.error(e);
    } finally {
      setIsLoadingChannel(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVideos = async (id: string) => {
    const size = 50;
    const offset = null;
    const options: {
      method: AxiosRequestConfig['method'];
      url: string;
      query: {
        size: number;
        offset?: string;
        id: string;
      };
    } = {
      method: 'get',
      url: '/vlogdev/video',
      query: { size, id },
    };
    offset && (options.query['offset'] = offset);
    const { data } = await apiCall(options);
    const r = data.items.reverse().slice(0, 102);
    setVideos(prev => ({
      ...prev,
      [id]: r,
    }));
  };

  const onClickChannel = (channelId: string)=> {
    if (!channelId) return;
    if (!videos[channelId]) fetchVideos(channelId);
    setChooseChannel(channelId);
  };
  
  useEffect(() => {
    fetchChannels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>Video</title>
        <meta name="description" content="Show me your records" />
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
        <div css={css`
          text-align: right;
          color: ${colors.hermes};
        `}>
          <span>매일 1회 업데이트 됩니다</span>
        </div>
        {
          isLoadingChannel ?
          <Loading /> :
          <>
            <h2>Channels</h2>
            <section css={css`
              margin-bottom: 50px;
            `}>
              <ul css={css`
                margin: 0;
                padding: 0;
                list-style: none;
              `}>
                {
                  channels.map(c => (
                    <li
                      key={c.channelId}
                      css={css`
                        display: inline-flex;
                        flex-direction: column;
                        width: 114px;
                        text-align: center;
                        padding: 2px;
                        border-radius: 10px;
                        border: 5px solid ${chooseChannel === c.channelId ? colors.hermes : '#fff'};
                        box-sizing: border-box;
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => onClickChannel(c.channelId)}
                        css={css`
                          padding: 0;
                          background: inherit;
                          border: none;
                          cursor: pointer;
                        `}
                      >
                        <div css={css`
                          display: inline-block;
                          width: 100px;
                          height: 100px;
                          background: no-repeat 100%/contain url(${c.thumbnails.medium.url});
                        `} />
                        <span>{ c.channelTitle }</span>
                      </button>
                    </li>
                  ))
                }
              </ul>
            </section>
          </>
        }

        {/* Video */}
        {
          chooseChannel ?
          <>
            <h2>Videos</h2>
            <section>
              <ul css={css`
                display: flex;
                margin: 0;
                padding: 0;
                list-style: none;
                flex-wrap: wrap;
              `}>
                {
                  videos[chooseChannel]?.map(v => (
                    <li
                      key={v.videoId}
                      css={css`
                        padding: 5px;
                        ${mq({
                          width:  ['calc(100% / 3)', 'calc(100% / 4)', 'calc(100% / 5)']
                        })};
                        ${mq({
                          flex:  ['0 0 calc(100% / 3)', '0 0 calc(100% / 4)', '0 0 calc(100% / 5)']
                        })};
                        flex-direction: column;
                        text-align: center;
                        font-size: 12px;
                        box-sizing: border-box;
                      `}
                    >
                      <Link href={`https://www.youtube.com/watch?v=${v.videoId}`} passHref>
                        <a
                          target="_blank"
                          css={css`
                            color: #000;
                            text-decoration: none;
                            width: 100%;
                          `}
                        >
                          <div css={css`
                            display: inline-block;
                            width: 100%;
                            padding: 50% 0;
                            background: no-repeat center/cover url(${v.thumbnails.default.url});
                          `} />
                          <span
                            css={css`
                              display: inline-block;
                              width: 100%;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              white-space: nowrap;
                            `}
                          >
                            {v.videoTitle}
                          </span>

                        </a>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </section>
          </> :
          <></>
        }
      </div>
    </main>
  );
};

export default About;
