import Head from 'next/head'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

const imgStyle = (url: string) => css`
  background: no-repeat center/contain url(${url});
  width: 100%;
  padding: 25% 0;
`;

const Start: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Browser based models with tf.js</title>
        <meta property="og:title" content="Browser based models with tf.js" />
        <meta property="og:url" content="https://vlog.dev/playground/deep_learning/browser_based_models_with_tfjs/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/playground/course.jpg" />
        <meta property="og:description" content="Coursesa - Browser based models with tf.js" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Browser based models with tf.js" />
        <meta name="twitter:url" content="https://v-log.dev//playground/ai/ready/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Coursesa - Browser based models with tf.js" />
      </Head>
      <Playground>
        <h1>
          Tensorflow.js
        </h1>
        <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/course_s.jpg')} />
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
            
          `}
        >
          <p>
            작게나마 학습을 시작하려고 coursera에서 browser 기반의 tensorflow js를 돌려보는 수업을 시작했습니다.
            <br />
            intermediate 레벨이라서 할만 하겠지 싶었는데, tensorflow는 이미 어느정도 알고 있다는 가정하게 tensorflow.js 사용법만 가르쳐 주는거 같습니다.
            지난주에 수강 신청해놓고서는 천천히 해야지 했는데, 오늘까지 week1 과제 제출일이여서 겨우겨우 마감을 지켰습니다.
          </p>
          <h2>Week1</h2>
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/plan.png')} />
          <p>
            수업을 다보지 못해서 급하게 돌려보고 과제를 빨리 내려고 문제를 열었는데...
            <br />
            모델을 짜서 일정 기준을 넘여야 하는 과제 였습니다.
          </p>
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/result_s.jpg')} />
          <p>
            어찌어찌 꾸역꾸역 해서 기준치를 충족하는 모델을 만들어서 제출을 완료했습니다.
          </p>
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/codes.png')} />
          <p>
            사실은 sigmoid, relu, softmax 와 같은 activation function은 잘 알지도 못한채, units을 바꿨을 때 어떻게 모델을 영향을 미치는지 정확히 알지도 못한채 이것저것 돌려서 운좋게 모델이 만들어졌습니다.
            <br />
            epochs랑 batch만 겨우 이해하고 넘어갔는데, 이러한 raw 데이터로 모델이 만들어 진다는게 너무 신기합니다.
            <br />
            raw 데이터 많이 모아서 여러가지 모델들을 만들어 보고 싶네요.
          </p>
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/coreapi_s.jpg')} />

          <h2>Week2</h2>
          <h2>Week3</h2>
          <h2>Week4</h2>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Start;
