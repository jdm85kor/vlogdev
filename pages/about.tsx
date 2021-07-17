import Head from 'next/head'

const About: React.FC = () => {
  return (
    <div>
      <Head>
        <title>JDM</title>
        <meta name="description" content="Who is he?" />
      </Head>
      react, nextjs, aws 기반으로 동작하는 프로젝트입니다.
    </div>
  );
};

export default About;
