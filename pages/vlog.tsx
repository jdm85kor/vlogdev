import { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.open("https://www.youtube.com/channel/UCmW86kc2yoMLRSO0uZ72jGA", '_blank');
    }, 2000);
  }, []);
  return (
    <div>
      작업 중입니다.
      youtube로 이동 됩니다.
      <title>Video</title>
      <meta name="description" content="Show me your records" />
    </div>
  );
};

export default About;
