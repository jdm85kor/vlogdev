import React, { useState } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { mq } from '@styles/theme';
import { NextPage } from 'next';

let DigitModel: any;
let ImageModel: any;

const imgStyle = (url: string, padding: number = 25) => css`
  background: no-repeat center/contain url(${url});
  width: 100%;
  padding: ${padding}% 0;
`;

const Week2codes = () => (
  <div  css={css`
    ${mq({
      width: ['calc(100vw - 40px)', 'inherit'],
    })}
    background: #eee;
    overflow-x: auto;
  `}
  >
    <p css={css`
      word-break: break-all;
      ${mq({
        whiteSpace: ['pre', 'pre-wrap'],
      })}
    `}
  >{`
  function getModel() {
      model = tf.sequential();

      model.add(tf.layers.conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 8, activation: 'relu'}));
      model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
      model.add(tf.layers.conv2d({filters: 16, kernelSize: 3, activation: 'relu'}));
      model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
      model.add(tf.layers.flatten());
      model.add(tf.layers.dense({units: 128, activation: 'relu'}));
      model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

      model.compile({optimizer: tf.train.adam(), loss: 'categoricalCrossentropy', metrics: ['accuracy']});

      return model;
  }

  async function train(model, data) {
      const metrics = ['loss', 'val_loss', 'accuracy', 'val_accuracy'];
      const container = { name: 'Model Training', styles: { height: '640px' } };
      const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
    
      const BATCH_SIZE = 512;
      const TRAIN_DATA_SIZE = 5500;
      const TEST_DATA_SIZE = 1000;

      const [trainXs, trainYs] = tf.tidy(() => {
          const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
          return [
            d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
            d.labels
          ];
      });

      const [testXs, testYs] = tf.tidy(() => {
          const d = data.nextTestBatch(TEST_DATA_SIZE);
          return [
            d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
            d.labels
          ];
      });

      return model.fit(trainXs, trainYs, {
          batchSize: BATCH_SIZE,
          validationData: [testXs, testYs],
          epochs: 20,
          shuffle: true,
          callbacks: fitCallbacks
      });
  }
  `}</p>
</div>);

const CourseraTfjs: NextPage = () => {
  const [isShowWeek2Example, setIsShowWeek2Example] = useState<boolean>(false);
  const [isShowWeek4Example, setIsShowWeek4Example] = useState<boolean>(false);
  return (
    <div>
      <Head>
        <title>Browser based models with tf.js</title>
        <meta property="og:title" content="Browser based models with tf.js" />
        <meta property="og:url" content="https://v-log.dev/playground/deep_learning/coursera-tfjs/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/playground/coreapi_s.jpg" />
        <meta property="og:description" content="Coursesa - Browser based models with tf.js" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Browser based models with tf.js" />
        <meta name="twitter:url" content="https://v-log.dev/playground/deep_learning/coursera-tfjs/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/playground/coreapi_s.jpg" />
        <meta name="twitter:description" content="Coursesa - Browser based models with tf.js" />
      </Head>
      <Playground>
        <h1 css={css`
          ${mq({
            padding: ['0 50px', '0'],
          })}
        `}>
          Browser based models with tf.js
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
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/codes.png', 15)} />
          <p>
            사실은 sigmoid, relu, softmax 와 같은 activation function은 잘 알지도 못한채, units을 바꿨을 때 어떻게 모델을 영향을 미치는지 정확히 알지도 못한채 이것저것 돌려서 운좋게 모델이 만들어졌습니다.
            <br />
            epochs랑 batch만 겨우 이해하고 넘어갔는데, 이러한 raw 데이터로 모델이 만들어 진다는게 너무 신기합니다.
            <br />
            raw 데이터 많이 모아서 여러가지 모델들을 만들어 보고 싶네요.
          </p>
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/playground/coreapi_s.jpg')} />
          <p>
            몇가지 정리하고 week2로 넘어갑니다.
          </p>
          <dl>
            <dt>epoch</dt>
            <dd>
              훈련 데이터셋에 포함된 모든 데이터들이 한번씩 모델을 통과한 횟수, 즉 모든 데이터셋을 학습하는 횟수를 의미<br />
              지나치게 높이게 되면, 그 학습 데이터셋에 과적합되어 다른 데이터에 대해서는 제대로 된 예측을 못할 수 있다.
            </dd>
            <dt>batch</dt>
            <dd>
              연산 한번에 들어가는 데이터의 크기를 의미. 배치 사이즈가 너무 큰 경우 한번에 처리해야 할 데이터의 양이 많아지므로, 학습 속도가 느려지고, 메모리 부족 문제가 발생할 위험이 있다.<br />
              너무 작은 경우 적은 데이터를 대상으로 가중치를 업데이트하고, 이 업데이트가 자주 발생하므로 훈련이 불안정해 진다.
            </dd>
            <dt>iteration</dt>
            <dd>
              전체 데이터를 모델에 한번 학습시키는데 필요한 배치의 수. 1 epoch를 마치는데 필요한 파라미터 업데이트 횟수.
            </dd>
            <dt>activation function</dt>
            <dd>
              transfer function으로부터 전달 받은 값을 출력할 때, 일정 기준에 따라 출력값을 변화시키는 비선형 함수.<br />
              활성화 함수를 통해 출력 값을 0 ~ 1 사이의 실수 값으로 정규화해 확률적 개념으로 사용 가능합니다.<br />
              비선형함수는 직선으로 표현할 수 없는 데이터 사이의 관계도 표현할 수 있습니다.<br />
            </dd>
            <dt>sigmoid</dt>
            <dd>
              선형함수의 결과를 0 ~ 1 까지의 비선형 형태로 변한하기 위한 함수입니다. 해당 함수는 로지스틱 회귀와 같은 분류 문제의 확률 표현에 사용됩니다.<br />
              딥러닝 모델이 깊어지면 기울기가 사라지는 gradient vasishing 현상이 발생합니다.
            </dd>
            <dt>relu</dt>
            <dd>
              입력이 양수 일 때는 x, 음수일 때는 0을 출력합니다. 경사하강에 영향을 주지 않아 다른 활성화 함수에 비해 학습이 빠르며 gradient vanishing 문제가 발생되지 않습니다.<br />
              보통 hidden layer에 사용되는 함수이며, tanh함수 대비 6배 빠른 학습 속도를 가집니다. 음수값을 입력 받으면 항상 0이기 때문에 훈련 능력 감소하는 문제가 있습니다.<br />
              이를 해결하기 위해 leaky relu가 있습니다.
            </dd>
            <dt>softmax</dt>
            <dd>
              입력 받은 값을 0 ~ 1 사이의 출력이 되도록 정규화하여 출력 값들의 총합이 항상 1이 되는 특성을 가진 함수 입니다.<br />
              보통 딥러닝에서 출력 노드의 활성화 함수로 많이 사용됩니다.
            </dd>
          </dl>
          <div css={imgStyle('https://miro.medium.com/max/666/1*nrxtwp6rzqdFhgYh0x-eVw.png')} />

          <h2>Week2</h2>
          <Week2codes />
          {
            !isShowWeek2Example ?
            <button
              type="button"
              css={css`
                margin-top: 20px;
                ${mq({
                  display: ['none', 'none', 'inline-block'],
                })}
              `}
              onClick={() => {
                DigitModel = dynamic(() => import('@components/playground/deep-learning/DigitModel'));
                setTimeout(() => {
                  setIsShowWeek2Example(true);
                }, 1000);
              }}
            >
              숫자 인식 실험하기 (pc 환경 권장)
            </button> :
            !!DigitModel ? <DigitModel /> : <div />
          }

          <h2>Week3 & Week4</h2>
          <p>
            Week3와 Week4에서는 Jupyter Notebook 사용과 브라우저 웹캠을 이용한 간단한 기능을 구현합니다.
            <br />
            &#40;수강을 마무리 했지만, 정리는 잠시 미룹니다.&#41;
          </p>
          {
            !isShowWeek4Example ?
            <button
              type="button"
              css={css`
                margin-top: 20px;
                ${mq({
                  display: ['none', 'none', 'inline-block'],
                })}
              `}
              onClick={() => {
                ImageModel = dynamic(() => import('@components/playground/deep-learning/ImageModel'));
                setTimeout(() => {
                  setIsShowWeek4Example(true);
                }, 1000);
              }}
            >
              이미지 인식 실험하기 (pc 환경 권장)
            </button> :
            !!ImageModel ? <ImageModel /> : <div />

          }
          <p>
            <br />
            이 강좌는 총 4개 강좌의 첫번째로 뒤에 강좌가 3개가 더 있는데, 브라우저가 아닌 다른 환경에서 tensorflow를 다뤄야 해서 많은 학습을 필요로 합니다.
            <br />
            진행하다보니 머신러닝, 딥러닝에 대한 내용에 학습이 필요하여 현재는 스탠포드 대학의 Machine Learning 강좌 &#40;Andrew Ng&#41; 수강중입니다.
            <br />
            전반적으로 깊게 학습하지는 않지만, tensorflow에 대해서 부담 없이 학습을 시작하게 해주는 강의로 생각됩니다.
            <br />
            강추합니다.
          </p>
          <div css={imgStyle('https://d6c63ppcwec2x.cloudfront.net/course/coursera-tensorflow.jpg')} />
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default CourseraTfjs;
