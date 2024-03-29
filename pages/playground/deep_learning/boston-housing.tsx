import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import {
  linearRegressionModel,
  multiLayerPerceptronRegressionModel1Hidden,
  multiLayerPerceptronRegressionModel2Hidden,
  multiLayerPerceptronRegressionModel1HiddenNoSigmoid,
  run,
  arraysToTensors,
  updateStatus,
  updateBaselineStatus,
  computeBaseline,
} from '@components/playground/deep-learning/boston-housing/index';
import {
  BostonHousingDataset,
  // featureDescriptions,
} from '@components/playground/deep-learning/boston-housing/data.js';

const descriptionHead = css`
  font-variant: small-caps;
  line-height: 1.2;
  color: #818181;
`;

const modelCols = css`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1 1 0;
  }
`;

const BostonHousing: NextPage = () => {
  const [bostonData, setBostonData] = useState<any>(null);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const handleClickSimpleMlr = useCallback(
    async (e) => {
      if (bostonData) {
        const model = linearRegressionModel(bostonData);
        await run(model, 'linear', true);
      }
    },
    [bostonData],
  );

  const handleClickNnMlr1hidden = useCallback(
    async (e) => {
      if (bostonData) {
        const model = multiLayerPerceptronRegressionModel1Hidden(bostonData);
        await run(model, 'oneHidden', false);
      }
    },
    [bostonData],
  );

  const handleClickNnMlr2hidden = useCallback(
    async (e) => {
      if (bostonData) {
        const model = multiLayerPerceptronRegressionModel2Hidden(bostonData);
        await run(model, 'twoHidden', false);
      }
    },
    [bostonData],
  );

  const handleClickNnMlr1hiddenNoSigmoid = useCallback(
    async (e) => {
      if (bostonData) {
        const model = multiLayerPerceptronRegressionModel1HiddenNoSigmoid(bostonData);
        await run(model, 'nosigHidden', false);
      }
    },
    [bostonData],
  );

  const init = useCallback(async () => {
    const newBostonData = new BostonHousingDataset();
    await newBostonData.loadData();
    updateStatus('데이터가 로드되었고 텐서로 변환합니다');
    arraysToTensors(newBostonData);
    updateStatus('데이터가 텐서로 변환되었습니다..\n훈련 버튼을 눌러 시작하세요.');
    updateBaselineStatus('기준 손실을 추정합니다.');
    computeBaseline();
    setIsDisabledButton(false);
    setBostonData(newBostonData);
  }, []);

  useEffect(() => {
    window.setTimeout(() => {
      if (window?.tf) {
        init();
      } else {
        console.warn('자료가 다운로드 되지 않았습니다. 다시 시도해주세요.');
      }
    }, 2000);
  }, [init]);
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend Boston housing" />
        <meta
          property="og:url"
          content="https://v-log.dev/playground/deep_learning/boston-housing/"
        />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Tensorflowjs boston housing" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tensorflowjs boston housing" />
        <meta
          name="twitter:url"
          content="https://v-log.dev/playground/deep_learning/boston-housing/"
        />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Tensorflowjs boston housing" />
      </Head>
      <Playground>
        <h1>TensorFlow.js 예제: 다중 회귀</h1>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></Script>
        {/* <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js"
          integrity="sha512-EbdJQSugx0nVWrtyK3JdQQ/03mS3Q1UiAhRtErbwl1YL/+e2hZdlIcSURxxh7WXHTzn83sjlh2rysACoJGfb6g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></Script> */}
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <p>여러 가지 모델의 주택 가격 예측을 비교해 보세요.</p>

          <p css={descriptionHead}>설명</p>
          <p>
            이 예제는
            <a href="https://www.cs.toronto.edu/~delve/data/boston/bostonDetail.html">
              보스턴 주택 데이터셋
            </a>
            을 사용해 하나 이상의 특성이 있을 때 어떻게 회귀를 수행하는지 보여줍니다. 이 데이터셋은
            메사추세츠주 보스턴 지역에 있는 주택에 대해 미국 인구 조사국에서 수집한 데이터에서
            유래된 유명한 데이터셋입니다.
          </p>
          <p>
            주택 가격을 예측하는 3개의 다른 모델의 성능을 비교할 수 있습니다. 선형 모델을 훈련할 때
            (절댓값 순서대로) 가장 큰 가중치 5개와 이 가중치에 해당하는 특성을 함께 출력합니다.
          </p>

          <section>
            <p css={descriptionHead}>상태</p>
            <p id="status">데이터를 로딩합니다...</p>
            <p id="baselineStatus">기준 손실을 계산하기 전입니다...</p>
          </section>

          <section>
            <p css={descriptionHead}>훈련 과정</p>
            <div css={modelCols}>
              <div id="linear">
                <div className="chart"></div>
                <div className="status"></div>
                <div id="modelInspectionOutput">
                  <p id="inspectionHeadline"></p>
                  <table id="myTable"></table>
                </div>
              </div>
              <div id="oneHidden">
                <div className="chart"></div>
                <div className="status"></div>
              </div>
              <div id="twoHidden">
                <div className="chart"></div>
                <div className="status"></div>
              </div>
            </div>

            <div id="buttons">
              <div css={modelCols}>
                <button
                  disabled={isDisabledButton}
                  type="button"
                  id="simple-mlr"
                  onClick={handleClickSimpleMlr}
                >
                  선형 회귀 모델 훈련
                </button>
                <button
                  disabled={isDisabledButton}
                  type="button"
                  id="nn-mlr-1hidden"
                  onClick={handleClickNnMlr1hidden}
                >
                  신경망 회귀 모델 훈련 (은닉층 1개)
                </button>
                <button
                  disabled={isDisabledButton}
                  type="button"
                  id="nn-mlr-2hidden"
                  onClick={handleClickNnMlr2hidden}
                >
                  신경망 회귀 모델 훈련 (은닉층 2개)
                </button>
              </div>
            </div>

            <div css={modelCols}>
              <div id="nosigHidden">
                <div className="chart"></div>
                <div className="status"></div>
              </div>
              <div></div>
              <div></div>
            </div>

            <div id="buttons">
              <div css={modelCols}>
                <button
                  disabled={isDisabledButton}
                  type="button"
                  id="nn-mlr-1hidden-no-sigmoid"
                  onClick={handleClickNnMlr1hiddenNoSigmoid}
                >
                  신경망 회귀 모델 훈련
                  <br />
                  (은닉층 1개 + 시그모이드 없음)
                </button>
                <div></div>
                <div></div>
              </div>
            </div>
          </section>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default BostonHousing;

{
  /* @import './material-components-web'; */
}

{
  /* body {
  margin: 0;
  --mdc-theme-primary: #F16528;
  --mdc-theme-secondary: #FDBC35;
}

.tfjs-example-container {
  @extend .mdc-typography;
  padding: 60px;
  display: flex;
  flex-direction: column;

  &.centered-container {
    margin: 0 auto;
    max-width: 960px;
  }
}

// A block element where each child is a row
.with-rows {
  display: flex;
  flex-direction: column;
}

// A block element where each child is a column
.with-cols {
  display: flex;
  flex-direction: row;

  &>* {
    flex: 1 1 0;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .with-cols {
    flex-direction: column;

    &>* {
    flex: auto;
  }
  }

  .tfjs-example-container {
    padding: 20px;
  }
}


//
// Typography / Element styles
//

h1 {
  margin-top: 0;
  @extend .mdc-typography--headline3;
  font-weight: 300;
}

.subtitle {
  @extend .mdc-typography--headline6;
  margin-top: -24px;
  font-weight: 400;
}

p {
  max-width: 960px;
  line-height: 1.6em;
}

p.section-head {
  font-variant: small-caps;
  text-transform: uppercase;
  letter-spacing: 0.17em;
  line-height: 1.2em;
  font-weight:500;
  margin-top: 2em;
  margin-bottom: 1em;
  border-left: 1px solid #EF6C00;
  padding-left: 24px;
  margin-left: -24px;
  color: #818181;
}

a {
  color: #3c3c3c;
  border-bottom: 1px dotted #818181;
  display: inline-block;
  text-decoration: none;
  line-height: 1.2em;
}

button {
 @extend .mdc-button--raised;
 padding: 8px 12px 8px 12px;
 font-size:100%;
}

.btn-primary {
  @extend .mdc-button--raised;
  padding: 8px 12px 8px 12px;
}

.btn-secondary {
 @extend .mdc-button--outlined;
 padding: 8px 12px 8px 12px;
}

.desc-type {
  font-family: Roboto Mono, monospace;
  display: inline-block;
  padding: 0px 6px 0px 6px;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  background-color: #E8EAF6
}

.desc-example {
  @extend .desc-type;
  background-color: #E8EAF6
}

.in-type {
  @extend .desc-type;
}

.in-example {
  @extend .desc-example;
}

.out-type {
  @extend .desc-type;
}

.out-example {
  @extend .desc-example;
}

input {
  font-size: 100%;
}

code {
  padding: 2px;
  border: 1px solid #dedede;
  border-radius: 4px;
  font-size: 110%;
} */
}
