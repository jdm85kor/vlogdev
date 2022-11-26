import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

const Mnist: NextPage = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend MNIST" />
        <meta property="og:url" content="https://v-log.dev/playground/deep_learning/mnist/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Tensorflowjs mnist" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tensorflowjs mnist" />
        <meta name="twitter:url" content="https://v-log.dev/playground/deep_learning/mnist" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Tensorflowjs mnist" />
        {/* <style>
    #train {
      margin-top: 10px;
    }

    label {
      display: inline-block;
      width: 250px;
      padding: 6px 0 6px 0;
    }

    .canvases {
      display: inline-block;
    }

    .prediction-canvas {
      width: 100px;
    }

    .pred {
      font-size: 20px;
      line-height: 25px;
      width: 100px;
    }

    .pred-correct {
      background-color: #00cf00;
    }

    .pred-incorrect {
      background-color: red;
    }

    .pred-container {
      display: inline-block;
      width: 100px;
      margin: 10px;
    }
  </style> */}
      </Head>
      <Playground>
        <h1>TensorFlow.js 예제: MNIST 숫자 분류하기</h1>
        {/* <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></Script> */}
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <p>MNIST 숫자 분류하기</p>
        </section>
        <section>
          <p className="section-head">설명</p>
          <p>
            이 예제는 합성곱 신경망(ConvNet 또는 CNN)이나 완전 연결 신경망(DenseNet)을 사용해 손글씨
            숫자를 인식하는 모델을 훈련합니다.
          </p>
          <p>훈련 데이터로 MNIST 데이터셋을 사용합니다.</p>
        </section>

        <section>
          <p className="section-head">훈련 파라미터</p>
          <div>
            <label>모델 종류:</label>
            <select id="model-type">
              <option value="ConvNet">합성곱 신경망</option>
              <option value="DenseNet">완전 연결 신경망</option>
            </select>
          </div>

          <div>
            <label>훈련 에포크 횟수:</label>
            <input id="train-epochs" value="3" />
          </div>

          <button id="train">데이터 로딩과 모델 훈련</button>
        </section>

        <section>
          <p className="section-head">훈련 과정</p>
          <p id="status"></p>
          <p id="message"></p>

          <div id="stats">
            <div className="canvases">
              <label id="loss-label"></label>
              <div id="loss-canvas"></div>
            </div>
            <div className="canvases">
              <label id="accuracy-label"></label>
              <div id="accuracy-canvas"></div>
            </div>
          </div>
        </section>

        <section>
          <p className="section-head">추론</p>
          <div id="images"></div>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Mnist;
