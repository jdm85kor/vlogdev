import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

// p.section-head {
//   font-variant: small-caps;
//   text-transform: uppercase;
//   letter-spacing: 0.17em;
//   line-height: 1.2em;
//   font-weight: 500;
//   margin-top: 2em;
//   margin-bottom: 1em;
//   border-left: 1px solid #EF6C00;
//   padding-left: 24px;
//   margin-left: -24px;
//   color: #818181; }

// .with-cols {
//   display: flex;
//   flex-direction: row;
// }
// .with-cols > * {
//   flex: 1 1 0;
// }

const UrlPhishing: NextPage = () => {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend Url phishing" />
        <meta
          property="og:url"
          content="https://v-log.dev/playground/deep_learning/url-phishing/"
        />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Tensorflowjs Url phishing" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tensorflowjs Url phishing" />
        <meta
          name="twitter:url"
          content="https://v-log.dev/playground/deep_learning/url-phishing/"
        />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Tensorflowjs Url phishing" />
      </Head>
      <Playground>
        <h1>TensorFlow.js 예제: Url phishing</h1>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.1.0"></Script>
        <section>
          <p className="section-head">설명</p>

          <p>
            이 예제는{' '}
            <a
              href="http://eprints.hud.ac.uk/id/eprint/24330/6/MohammadPhishing14July2015.pdf"
              target="_blank"
              rel="noreferrer"
            >
              피싱 웹사이트 데이터셋
            </a>
            을 사용해 URL을{' '}
            <a
              href="https://ko.wikipedia.org/wiki/%ED%94%BC%EC%8B%B1"
              target="_blank"
              rel="noreferrer"
            >
              피싱
            </a>{' '}
            또는 정상으로 분류하는 방법을 보여줍니다. 데이터셋에 있는 샘플을 두 그룹(즉, 피싱 또는
            정상)으로 분류하기 때문에 이진 분류 문제입니다.
          </p>
          <p>
            각 사이트마다{' '}
            <a
              href="https://github.com/rickiepark/deep-learning-with-javascript/tree/main/website-phishing"
              target="_blank"
              rel="noreferrer"
            >
              30개의 특성
            </a>
            이 있습니다.
          </p>
        </section>

        <section>
          <p className="section-head">상태</p>
          <p id="status">데이터를 로딩합니다...</p>
        </section>

        <section>
          <p className="section-head">훈련 과정</p>

          <div className="with-cols">
            <div id="plotLoss"></div>
            <div id="plotAccuracy"></div>
          </div>

          <div>
            <div>ROC 곡선</div>
            <div id="rocCurve"></div>
          </div>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default UrlPhishing;
