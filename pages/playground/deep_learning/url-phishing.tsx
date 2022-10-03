import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { WebsitePhishingDataset } from '@components/playground/deep-learning/url-phishing/data.js';
import * as utils from '@components/playground/deep-learning/url-phishing/utils.js';
import * as ui from '@components/playground/deep-learning/url-phishing/ui.js';

const sectionHeadCss = css`
  font-variant: small-caps;
  text-transform: uppercase;
  letter-spacing: 0.17em;
  line-height: 1.2em;
  font-weight: 500;
  margin-top: 2em;
  margin-bottom: 1em;
  border-left: 1px solid #ef6c00;
  padding-left: 24px;
  margin-left: -24px;
  color: #818181;
`;

const UrlPhishing: NextPage = () => {
  const [status, setStatus] = useState<string>('데이터를 로딩합니다...');

  function falsePositives(yTrue, yPred) {
    return window.tf.tidy(() => {
      const one = window.tf.scalar(1);
      const zero = window.tf.scalar(0);
      return window.tf.logicalAnd(yTrue.equal(zero), yPred.equal(one)).sum().cast('float32');
    });
  }

  function trueNegatives(yTrue, yPred) {
    return window.tf.tidy(() => {
      const zero = window.tf.scalar(0);
      return window.tf.logicalAnd(yTrue.equal(zero), yPred.equal(zero)).sum().cast('float32');
    });
  }

  const falsePositiveRate = useCallback((yTrue, yPred) => {
    return window.tf.tidy(() => {
      const fp = falsePositives(yTrue, yPred);
      const tn = trueNegatives(yTrue, yPred);
      return fp.div(fp.add(tn));
    });
  }, []);

  /**
   * ROC 곡선을 그립니다.
   *
   * @param {tf.Tensor} targets 정답 타깃 레이블로 0과 1로만 구성된 1D 텐서 객체
   * @param {tf.Tensor} probs 모델이 출력한 확률로 `targets`와 동일한 크기의 1D 텐서
   *   이 값은 0보다 크거나 같고 1보다 작거나 같아야 합니다.
   * @param {number} epoch `probs` 값의 에포크 횟수
   * @returns {number} AUC
   */
  const drawROC = useCallback(
    (targets, probs, epoch) => {
      return window.tf.tidy(() => {
        const thresholds = [
          0.0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75,
          0.8, 0.85, 0.9, 0.92, 0.94, 0.96, 0.98, 1.0,
        ];
        const tprs = []; // 진짜 양성 비율
        const fprs = []; // 거짓 양성 비율
        let area = 0;
        for (let i = 0; i < thresholds.length; ++i) {
          const threshold = thresholds[i];

          const threshPredictions = utils.binarize(probs, threshold).as1D();
          const fpr = falsePositiveRate(targets, threshPredictions).dataSync()[0];
          const tpr = window.tf.metrics.recall(targets, threshPredictions).dataSync()[0];
          fprs.push(fpr);
          tprs.push(tpr);

          // AUC 계산을 위해 면적을 누적합니다.
          if (i > 0) {
            area += ((tprs[i] + tprs[i - 1]) * (fprs[i - 1] - fprs[i])) / 2;
          }
        }
        ui.plotROC(fprs, tprs, epoch);
        return area;
      });
    },
    [falsePositiveRate],
  );

  const init = useCallback(() => {
    // 모델 훈련을 위한 하이퍼파라미터
    const epochs = 400;
    const batchSize = 350;

    const data = new WebsitePhishingDataset();
    data.loadData().then(async () => {
      setStatus('훈련 데이터와 테스트 데이터를 준비합니다...');
      const trainData = data.getTrainData();
      const testData = data.getTestData();

      setStatus('모델을 만듭니다...');
      const model = window.tf.sequential();
      model.add(
        window.tf.layers.dense({
          inputShape: [data.numFeatures],
          units: 100,
          activation: 'sigmoid',
        }),
      );
      model.add(window.tf.layers.dense({ units: 100, activation: 'sigmoid' }));
      model.add(window.tf.layers.dense({ units: 1, activation: 'sigmoid' }));
      model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

      const trainLogs: Array<any> = [];
      let auc;

      setStatus('훈련을 시작합니다...');
      await model.fit(trainData.data, trainData.target, {
        batchSize: batchSize,
        epochs: epochs,
        validationSplit: 0.2,
        callbacks: {
          onEpochBegin: async (epoch: number) => {
            // 몇 번의 에포크마다 ROC 곡선을 그립니다.
            if ((epoch + 1) % 100 === 0 || epoch === 0 || epoch === 2 || epoch === 4) {
              const probs = model.predict(testData.data);
              auc = drawROC(testData.target, probs, epoch);
            }
          },
          onEpochEnd: async (epoch: number, logs: string) => {
            setStatus(`총 에포크: ${epochs}, 완료 에포크: ${epoch + 1}`);
            trainLogs.push(logs);
            ui.plotLosses(trainLogs);
            ui.plotAccuracies(trainLogs);
          },
        },
      });

      setStatus('테스트 데이터에서 실행합니다...');
      window.tf.tidy(() => {
        const result = model.evaluate(testData.data, testData.target, { batchSize: batchSize });

        const lastTrainLog = trainLogs[trainLogs.length - 1];
        const testLoss = result[0].dataSync()[0];
        const testAcc = result[1].dataSync()[0];

        const probs = model.predict(testData.data);
        const predictions = utils.binarize(probs).as1D();

        const precision = window.tf.metrics.precision(testData.target, predictions).dataSync()[0];
        const recall = window.tf.metrics.recall(testData.target, predictions).dataSync()[0];
        const fpr = falsePositiveRate(testData.target, predictions).dataSync()[0];
        setStatus(
          `최종 테스트 세트 손실: ${lastTrainLog.loss.toFixed(
            4,
          )} 정확도: ${lastTrainLog.acc.toFixed(4)}\n` +
            `최종 검증 세트 손실: ${lastTrainLog.val_loss.toFixed(
              4,
            )} 정확도: ${lastTrainLog.val_acc.toFixed(4)}\n` +
            `테스트 세트 손실: ${testLoss.toFixed(4)} 정확도: ${testAcc.toFixed(4)}\n` +
            `정밀도: ${precision.toFixed(4)}\n` +
            `재현율: ${recall.toFixed(4)}\n` +
            `거짓 양성 비율 (FPR): ${fpr.toFixed(4)}\n` +
            `AUC: ${auc.toFixed(4)}`,
        );
      });
    });
  }, [drawROC, falsePositiveRate]);

  const checkPossibleInit = useCallback(() => {
    if (window?.tf) {
      return init();
    } else {
      return window.setTimeout(() => {
        checkPossibleInit();
      }, 2000);
    }
  }, [init]);

  useEffect(() => {
    checkPossibleInit();
  }, [checkPossibleInit]);

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
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <p css={sectionHeadCss}>설명</p>

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
          <p css={sectionHeadCss}>상태</p>
          <p id="status">{status}</p>
          <p css={sectionHeadCss}>훈련 과정</p>

          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <div
              css={css`
                flex: 1 1 0;
              `}
              id="plotLoss"
            ></div>
            <div
              css={css`
                flex: 1 1 0;
              `}
              id="plotAccuracy"
            ></div>
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
