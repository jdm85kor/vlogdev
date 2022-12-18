import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

import { IMAGE_H, IMAGE_W, MnistData } from '@components/playground/deep-learning/mnist/data.js';

const sectionHeadStyle = css`
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
const labelStyle = css`
  display: inline-block;
  width: 250px;
  padding: 6px 0 6px 0;
`;
const imageDiv = css`
  > .prediction-canvas {
    width: 100px;
  }

  > .pred {
    font-size: 20px;
    line-height: 25px;
    width: 100px;
  }

  > .pred-correct {
    background-color: #00cf00;
  }

  > .pred-incorrect {
    background-color: red;
  }

  > .pred-container {
    display: inline-block;
    width: 100px;
    margin: 10px;
  }
`;

const Mnist: NextPage = () => {
  const [trainButtonDisabled, seTrainButtonDisabled] = useState<boolean>(false);
  const [modleTypeDisabled, seModelTypeDisabled] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const dataRef = useRef<MnistData | null>(null);
  const [modelType, setModelType] = useState<'ConvNet' | 'DenseNet'>('ConvNet');
  const [trainEpochs, setTrainEpochs] = useState<number>(3);
  const [lossLabelText, setLossLabelText] = useState<string>('');
  const [accuracyLabelText, setAccuracyLabelText] = useState<string>('');
  const imageRef = useRef<HTMLDivElement>(null);
  const lossValuesRef = useRef<{ x: number; y: number }[][]>([[], []]);
  const accuracyValuesRef = useRef<{ x: number; y: number }[][]>([[], []]);

  const createConvModel = () => {
    // 시퀀셜 신경망 모델을 만듭니다.
    const model = window?.tf.sequential();

    // 합성곱 신경망의 첫 번째 층은 28x28 픽셀의 흑백 이미지를 받습니다.
    // 이 층은 커널 크기가 3 픽셀인 16개 필터를 사용하고 렐루 활성화 함수를 사용합니다.
    model.add(
      window?.tf.layers.conv2d({
        inputShape: [IMAGE_H, IMAGE_W, 1],
        kernelSize: 3,
        filters: 16,
        activation: 'relu',
      }),
    );

    // 첫 번째 층 다음에 최대 풀링 층을 둡니다.
    // 이 층은 주어진 영역에서 최댓값을 고르며 일종의 다운샘플링처럼 동작합니다.
    // https://www.quora.com/What-is-max-pooling-in-convolutional-neural-networks
    model.add(window?.tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

    // 세 번째 층은 또 다른 합성곱 층입니다. 이번에는 32개 필터를 사용합니다.
    model.add(window?.tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }));

    // 다시 최대 풀링 층을 추가합니다.
    model.add(window?.tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

    // 또 다른 합성곱 층을 추가합니다.
    model.add(window?.tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }));

    // 이제 마지막 층에 입력으로 전달하기 위해 3D 텐서를 1D 벡터로 펼칩니다.
    // 마지막 분류 층에 고차원 데이터를 전달하기 위해 자주 사용하는 방법입니다.
    model.add(window?.tf.layers.flatten({}));

    model.add(window?.tf.layers.dense({ units: 64, activation: 'relu' }));

    // 마지막 층은 10개의 출력 유닛을 가진 밀집 층입니다.
    // 출력 층의 활성화 함수로 소프트맥스 함수를 사용하여 10개의 클래스에 대한 확률을 출력합니다.
    model.add(window?.tf.layers.dense({ units: 10, activation: 'softmax' }));

    return model;
  };

  function createDenseModel() {
    const model = window?.tf.sequential();
    model.add(window?.tf.layers.flatten({ inputShape: [IMAGE_H, IMAGE_W, 1] }));
    model.add(window?.tf.layers.dense({ units: 42, activation: 'relu' }));
    model.add(window?.tf.layers.dense({ units: 10, activation: 'softmax' }));
    return model;
  }

  const createModel = () => {
    let model;

    if (modelType === 'ConvNet') {
      model = createConvModel();
    } else if (modelType === 'DenseNet') {
      model = createDenseModel();
    } else {
      throw new Error(`잘못된 모델 종류입니다: ${modelType}`);
    }
    return model;
  };

  const plotLoss = (batch: number, loss: number, set: string) => {
    const series = set === 'train' ? 0 : 1;
    lossValuesRef.current[series].push({ x: batch, y: loss });
    const lossContainer = document.getElementById('loss-canvas');
    window?.tfvis.render.linechart(
      lossContainer,
      { values: lossValuesRef.current, series: ['train', 'validation'] },
      {
        xLabel: '배치',
        yLabel: '손실',
        width: 400,
        height: 300,
      },
    );
    setLossLabelText(`마지막 손실: ${loss.toFixed(3)}`);
  };

  const plotAccuracy = (batch: number, accuracy: number, set: string) => {
    const series = set === 'train' ? 0 : 1;
    accuracyValuesRef.current[series].push({ x: batch, y: accuracy });
    const accuracyContainer = document.getElementById('accuracy-canvas');
    window?.tfvis.render.linechart(
      accuracyContainer,
      { values: accuracyValuesRef.current, series: ['train', 'validation'] },
      {
        xLabel: '배치',
        yLabel: '정확도',
        width: 400,
        height: 300,
      },
    );
    setAccuracyLabelText(`마지막 정확도: ${(accuracy * 100).toFixed(1)}%`);
  };

  const train = async (model: any, onIteration: any) => {
    setStatusText('모델을 훈련합니다...');

    const optimizer = 'rmsprop';
    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    const batchSize = 64;

    // 훈련하는 동안 과대적합을 모니터링하기 위해 검증 데이터로 훈련 데이터에서 마지막 15%를 덜어 놓습니다.
    const validationSplit = 0.15;

    // 배치 횟수를 카운트합니다.
    let trainBatchCount = 0;

    const trainData = dataRef.current!.getTrainData();
    const testData = dataRef.current!.getTestData(-1);

    const totalNumBatches =
      Math.ceil((trainData.xs.shape[0] * (1 - validationSplit)) / batchSize) * trainEpochs;

    // 콜백 함수를 통해 손실과 정확도 그래프를 그립니다.
    let valAcc = 0;
    await model.fit(trainData.xs, trainData.labels, {
      batchSize: batchSize,
      validationSplit: validationSplit,
      epochs: trainEpochs,
      callbacks: {
        onBatchEnd: async (batch: number, logs: { [key: string]: number }) => {
          trainBatchCount++;
          setStatusText(
            `훈련... (` +
              `${((trainBatchCount / totalNumBatches) * 100).toFixed(1)}%` +
              ` 완료). 훈련을 멈추려면 페이지를 새로고침하거나 종료하세요.`,
          );
          plotLoss(trainBatchCount, logs.loss, 'train');
          plotAccuracy(trainBatchCount, logs.acc, 'train');
          if (onIteration && batch % 10 === 0) {
            onIteration('onBatchEnd', batch, logs);
          }
          await window?.tf.nextFrame();
        },
        onEpochEnd: async (epoch: any, logs: { [key: string]: number }) => {
          valAcc = logs.val_acc;
          plotLoss(trainBatchCount, logs.val_loss, 'validation');
          plotAccuracy(trainBatchCount, logs.val_acc, 'validation');
          if (onIteration) {
            onIteration('onEpochEnd', epoch, logs);
          }
          await window?.tf.nextFrame();
        },
      },
    });

    const testResult = model.evaluate(testData.xs, testData.labels);
    const testAccPercent = testResult[1].dataSync()[0] * 100;
    const finalValAccPercent = valAcc * 100;
    setStatusText(
      `최종 검증 정확도: ${finalValAccPercent.toFixed(1)}%; ` +
        `최종 테스트 정확도: ${testAccPercent.toFixed(1)}%`,
    );
  };

  const draw = (image: any, canvas: any) => {
    const [width, height] = [28, 28];
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = new ImageData(width, height);
    const data = image.dataSync();
    for (let i = 0; i < height * width; ++i) {
      const j = i * 4;
      imageData.data[j + 0] = data[i] * 255;
      imageData.data[j + 1] = data[i] * 255;
      imageData.data[j + 2] = data[i] * 255;
      imageData.data[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  };

  function showTestResults(batch: any, predictions: any, labels: any) {
    const testExamples = batch.xs.shape[0];
    for (let i = 0; i < testExamples; i++) {
      const image = batch.xs.slice([i, 0], [1, batch.xs.shape[1]]);

      const div = document.createElement('div');
      div.className = 'pred-container';

      const canvas = document.createElement('canvas');
      canvas.className = 'prediction-canvas';
      draw(image.flatten(), canvas);

      const pred = document.createElement('div');

      const prediction = predictions[i];
      const label = labels[i];
      const correct = prediction === label;

      pred.className = `pred ${correct ? 'pred-correct' : 'pred-incorrect'}`;
      pred.innerText = `예측: ${prediction}`;

      div.appendChild(pred);
      div.appendChild(canvas);

      imageRef.current!.appendChild(div);
    }
  }

  const showPredictions = async (model: any) => {
    const testExamples = 100;
    const examples = dataRef?.current?.getTestData(testExamples);

    // dispose()를 호출하지 않고 실행 후에 GPU 메모리에서 텐서를 해제하기 위해 tf.tidy()를 사용합니다.
    // tf.tidy는 동기적으로 실행됩니다.
    window?.tf.tidy(() => {
      const output = model.predict(examples!.xs);

      // tf.argMax()는 특정 축을 따라 텐서에서 가장 큰 값의 인덱스를 반환합니다.
      // 이 예제와 같은 다중 분류 작업은 종종 클래스를 원-핫 벡터로 표현합니다.
      // 원-핫 벡터는 클래스마다 하나의 원소로 이루어진 1D 벡터입니다.
      // 이 벡터의 원소는 하나만 1이고 모두 0입니다(예를 들면, [0, 0, 0, 1, 0]).
      // model.predict()는 확률 분포를 출력합니다. 따라서 argMax를 사용해 가장 높은 확률을 가진 원소의 인덱스를 찾습니다.
      // 이 값이 예측이 됩니다. (예를 들어, argmax([0.07, 0.1, 0.03, 0.75, 0.05]) == 3)
      // dataSync()는 일반 CPU 자바스크립트 코드에서 사용하기 위해 GPU에서 tf.tensor 값을 동기적으로 다운로드합니다.
      // (이 함수의 비동기 버전은 data()입니다)
      const axis = 1;
      const labels = Array.from(examples!.labels.argMax(axis).dataSync());
      const predictions = Array.from(output.argMax(axis).dataSync());

      showTestResults(examples, predictions, labels);
    });
  };

  const handleChangeModelType = (value: 'ConvNet' | 'DenseNet') => {
    if (!value) return;
    setModelType(value);
  };

  const handleClickTranin = async () => {
    seTrainButtonDisabled(true);
    seModelTypeDisabled(true);

    setStatusText('MNIST 데이터를 로딩합니다...');

    dataRef.current = new MnistData();
    await dataRef.current.load();

    setStatusText('모델을 만듭니다...');

    const model = createModel();
    model.summary();

    setStatusText('모델 훈련을 시작합니다...');
    await train(model, () => showPredictions(model));
  };

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
      </Head>
      <Playground>
        <h1>TensorFlow.js 예제: MNIST 숫자 분류하기</h1>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></Script>
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
          <p css={sectionHeadStyle}>설명</p>
          <p>
            이 예제는 합성곱 신경망(ConvNet 또는 CNN)이나 완전 연결 신경망(DenseNet)을 사용해 손글씨
            숫자를 인식하는 모델을 훈련합니다.
          </p>
          <p>훈련 데이터로 MNIST 데이터셋을 사용합니다.</p>

          <p css={sectionHeadStyle}>훈련 파라미터</p>
          <div>
            <label css={labelStyle}>모델 종류:</label>
            <select disabled={modleTypeDisabled} defaultValue={modelType}>
              <option value="ConvNet" onChange={() => handleChangeModelType('ConvNet')}>
                합성곱 신경망
              </option>
              <option value="DenseNet" onChange={() => handleChangeModelType('DenseNet')}>
                완전 연결 신경망
              </option>
            </select>
          </div>

          <div>
            <label css={labelStyle}>훈련 에포크 횟수:</label>
            <input value={trainEpochs} onChange={(e) => setTrainEpochs(Number(e.target.value))} />
          </div>

          <button
            type="button"
            css={css`
              margin-top: 10px;
            `}
            onClick={handleClickTranin}
            disabled={trainButtonDisabled}
          >
            데이터 로딩과 모델 훈련
          </button>

          <p css={sectionHeadStyle}>훈련 과정</p>
          <p>{statusText}</p>

          <div id="stats">
            <div
              css={css`
                display: inline-block;
              `}
            >
              <label>{lossLabelText}</label>
              <div id="loss-canvas"></div>
            </div>
            <div
              css={css`
                display: inline-block;
              `}
            >
              <label>{accuracyLabelText}</label>
              <div id="accuracy-canvas"></div>
            </div>
          </div>

          <p css={sectionHeadStyle}>추론</p>
          <div css={imageDiv} ref={imageRef} />
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Mnist;
