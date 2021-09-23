import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head'
import { apiCall } from '@utils/apis';
import { AxiosRequestConfig } from 'axios';

const About: React.FC = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const fetchYoutubeData = async () => {
    const size = 50;
    const offset = null;
    const options: {
      method: AxiosRequestConfig['method'];
      url: string;
      query: {
        size: number;
        offset?: string;
      };
    } = {
      method: 'get',
      url: '/vlogdev/video',
      query: { size },
    };
    offset && (options.query['offset'] = offset);
    const { data } = await apiCall(options);
    console.log(data);
    setChannels(data.channel);
    setVideos(data.video);
  };
  useEffect(() => {
    fetchYoutubeData();
    setTimeout(() => {
      window.open("https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA", '_blank');
    }, 2000);
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
      <div>
        작업 중입니다.
        youtube로 이동 됩니다.
      </div>
    </main>
  );
};

export default About;
