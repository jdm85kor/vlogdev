import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head'
import { apiCall } from '@utils/apis';
import { AxiosRequestConfig } from 'axios';
import { mq, colors } from '@styles/theme';
import Link from 'next/link';

const About: React.FC = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const fetchChannels = async () => {
    const { data } = await apiCall({
      method: 'get',
      url: '/vlogdev/channel',
    });
    setChannels(data.items);
  };

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
    setVideos(data.items.reverse().slice(0, 102));
  };
  useEffect(() => {
    fetchChannels();
    fetchVideos('UCmW86kc2yoMLRSO0uZ72jGA');
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
        <h1>VLOG</h1>
        <h2>Channels</h2>
        <section>
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
                    width: 100px;
                    text-align: center;
                  `}
                >
                  <Link href={`https://www.youtube.com/channel/${c.channelId}`} passHref>
                    <a
                      target="_blank"
                      css={css`
                        color: #000;
                        text-decoration: none;
                      `}
                    >
                      <div css={css`
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        background: no-repeat 100%/contain url(${c.thumbnails.medium.url});
                      `} />
                      <span>{ c.channelTitle }</span>
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </section>
        <h2>Video</h2>
        <section>
          <ul css={css`
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            flex-wrap: wrap;
          `}>
            {
              videos.map(v => (
                <li
                  key={v.videoId}
                  css={css`
                    display: inline-flex;
                    margin: 5px;
                    flex: 1 0 auto;
                    flex-direction: column;
                    ${mq({
                      width:  ['120px', '140px', '180px']
                    })};
                    text-align: center;
                    font-size: 12px;
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
                        ${mq({
                          height: ['120px', '140px', '180px']
                        })};
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
      </div>
    </main>
  );
};

export default About;
