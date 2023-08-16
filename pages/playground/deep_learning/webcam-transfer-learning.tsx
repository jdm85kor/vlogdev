import React, { useState, useEffect,useRef, useCallback } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { ControllerDataset } from '@components/playground/webcam-transfer-learning/controller_dataset.js';
import Button from '@public/svg/red-game-button.svg';
// import '@components/playground/webcam-transfer-learning/styles.css';

const NUM_CLASSES = 4;

const WebcamTransferLearning: NextPage = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const controllerDataset = useRef<any>(null);
  const truncatedMobileNet = useRef<any>(null);
  const model = useRef<any>(null);
  const webcam = useRef<any>(null);

  const loadTruncatedMobileNet = async () => {
    const mobilenet = await window.tf.loadLayersModel(
        'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    // 중간 층의 활성화를 출력하는 모델을 반환합니다.
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    return window.tf.model({inputs: mobilenet.inputs, outputs: layer.output});
  }

  // ui.setExampleHandler(async label => {
  //   let img = await getImage();

  //   controllerDataset.addExample(truncatedMobileNet.predict(img), label);

  //   // 프리뷰 썸네일을 그립니다.
  //   ui.drawThumb(img, label);
  //   img.dispose();
  // })

  const train = async () => {
    if ((controllerDataset as any).xs == null) {
      throw new Error('훈련하기 전에 샘플을 추가하세요!');
    }

    // 두 개 층을 가진 완전 연결 신경망을 만듭니다.
    // MobileNet 모델에 층을 추가하지 않고 별도의 모델을 만듦으로써
    // MobileNet 모델의 가중치를 동결하고 새로운 모델의 가중치만 훈련합니다.
    model.current = window.tf.sequential({
      layers: [
        // 밀집 층에 사용할 수 있도록 입력을 벡터로 펼칩니다.
        // 기술적으로는 층이지만 텐서의 크기 변경만 수행합니다(훈련 파라미터가 없습니다).
        window.tf.layers.flatten(
            {inputShape: truncatedMobileNet.current.outputs[0].shape.slice(1)}),
        // 층 1.
        window.tf.layers.dense({
          // units: ui.getDenseUnits(),
          activation: 'relu',
          kernelInitializer: 'varianceScaling',
          useBias: true
        }),
        // 층 2. 마지막 층의 유닛 개수는 예측하려는 클래스 개수와 같아야 합니다.
        window.tf.layers.dense({
          units: NUM_CLASSES,
          kernelInitializer: 'varianceScaling',
          useBias: false,
          activation: 'softmax'
        })
      ]
    });

    // 모델 훈련을 위한 옵티마이저를 만듭니다.
    const optimizer = window.tf.train.adam(0); // ui.getLearningRate()
    // 예측 확률 분포(입력이 각 클래스에 속할 확률)와 레이블(정답 클래스는 100% 확률) 사이의
    // 에러를 측정하기 위해 다중 분류에서 사용하는 손실 함수인
    // categoricalCrossentropy를 사용합니다.
    model.current.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});

    // 전체 데이터셋의 일정 비율을 배치 크기로 설정합니다. 수집된 샘플의 개수는
    // 사용자가 얼마나 많은 샘플을 모으는지에 따라 다르기 때문입니다.
    // 이렇게 하면 배치 크기를 유연하게 설정할 수 있습니다.
    const batchSize =
        Math.floor(controllerDataset.current.xs.shape[0] * 0); // ui.getBatchSizeFraction()
    if (!(batchSize > 0)) {
      throw new Error(
          `배치 크기 비율이 0 또는 NaN입니다. 0이 아닌 비율을 선택하세요.`);
    }

    // 모델 훈련! Model.fit()이 xs & ys을 섞으므로 직접 섞을 필요가 없습니다.
    model.current.fit(controllerDataset.current.xs, controllerDataset.current.ys, {
      batchSize,
      epochs: 0, // ui.getEpochs()
      callbacks: {
        onBatchEnd: async (_batch: any, logs: { loss: number; }) => {
          // ui.trainStatus('손실: ' + logs.loss.toFixed(5));
        }
      }
    });
  }

  const predict = async () => {
    // ui.isPredicting();
    while (isPredicting) {
      // 웹캠에서 프레임을 캡쳐합니다.
      const img = await getImage();

      // MobileNet의 중간층 활성화를 예측으로 출력합니다.
      // 즉, 입력 이미지의 "임베딩"을 출력합니다.
      const embeddings = truncatedMobileNet.current.predict(img);

      // MobileNet에서 출력한 임베딩을 입력으로 사용해 새로 훈련된 모델에서 예측을 만듭니다.
      const predictions = model.current.predict(embeddings);

      // 최대 확률을 가진 인덱스를 찾습니다.
      // 이 숫자가 모델이 생각하는 입력에 대해 가장 가능성 있는 클래스입니다.
      const predictedClass = predictions.as1D().argMax();
      const classId = (await predictedClass.data())[0];
      img.dispose();

      // ui.predictClass(classId);
      await window.tf.nextFrame();
    }
    ui.donePredicting();
  }

  /**
   * 웹캠에서 프레임을 캡쳐하고 -1과 1 사이로 정규화합니다.
   * [1, w, h, c] 크기의 배치 이미지(샘플이 1개인 배치)를 반환합니다.
   */
  async function getImage() {
    const img = await webcam.current.capture();
    const processedImg =
        window.tf.tidy(() => img.expandDims(0).toFloat().div(127).sub(1));
    img.dispose();
    return processedImg;
  }

  const handleClickTrain = async () => {
    // ui.trainStatus('훈련중...');
    await window.tf.nextFrame();
    await window.tf.nextFrame();
    setIsPredicting(false);
    train();
  };

  const handleClickPredict = () => {
    // ui.startPacman();
    setIsPredicting(true) ;
    predict();
  };

  const init = useCallback(async () => {
    try {
      webcam.current = await window.tf.data.webcam(document.getElementById('webcam'));
    } catch (e) {
      console.log(e);
      // document.getElementById('no-webcam').style.display = 'block';
    }
    truncatedMobileNet.current = await loadTruncatedMobileNet();

    // ui.init();

    // 모델을 시운전 합니다. GPU에 가중치를 업로드하고 WebGL 프로그램을 컴파일합니다.
    // 이렇게 하면 처음 웹캠에서 데이터를 수집할 때 속도가 빨라집니다.
    const screenShot = await webcam.current.capture();
    truncatedMobileNet.current.predict(screenShot.expandDims(0));
    screenShot.dispose();
  }, []);

  useEffect(() => {
    controllerDataset.current = new ControllerDataset(NUM_CLASSES);
    // init();
  } ,[init]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: `
        <!--
          Copyright 2018 Google LLC. All Rights Reserved.

          Licensed under the Apache License, Version 2.0 (the "License");
          you may not use this file except in compliance with the License.
          You may obtain a copy of the License at

          http://www.apache.org/licenses/LICENSE-2.0

          Unless required by applicable law or agreed to in writing, software
          distributed under the License is distributed on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          See the License for the specific language governing permissions and
          limitations under the License.
          ==============================================================================
        -->
      `}} />
      <Head>
        <meta property="og:title" content="Frontend Webcam Transfer Learning" />
        <meta
          property="og:url"
          content="https://v-log.dev/playground/deep_learning/webcam-transfer-learning/"
        />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="Tensorflowjs webcam transfer learning" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tensorflowjs webcam transfer learning" />
        <meta
          name="twitter:url"
          content="https://v-log.dev/playground/deep_learning/webcam-transfer-learning/"
        />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="Tensorflowjs webcam transfer learning" />
      </Head>
      <Playground>
        <h1>웹캠으로 팩맨 제어하기</h1>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-data"></Script>
        <Script src="/scripts/pacman-google.js"></Script>
        <header>
          <b>신경망</b>을 사용해 <b>웹캠</b>을 콘트롤러로 바꿉니다.
        </header>
        <div id="no-webcam">
          웹캠을 찾을 수 없습니다. <br/>
          이 데모를 시연하려면 웹캠이 있는 컴퓨터를 사용하세요.
        </div>
        <div id="pacman-container">
          <div id="logo">
            <div id="logo-l">
              <div id="logo-b">
              </div>
            </div>
          </div>
        </div>

        <div id="status">MobileNet을 로드합니다...</div>

        <div className="controller-panels" id="controller" style={{display:"none"}}>

          <div className="panel training-panel">

            {/* <!-- Big buttons. --> */}
            <div className="panel-row big-buttons">
              <button id="train">
                <Button css={css`
                  width: 66px;
                  height: 66px;
                `} />
                <span id="train-status">모델 훈련</span>
              </button>
              <button id="predict">
                <Button css={css`
                  width: 66px;
                  height: 66px;
                `} />
                <span>플레이</span>
              </button>
            </div>
            {/* <!-- /.panel-row --> */}

            <div className="panel-row params-webcam-row">

              {/* <!-- Hyper params. --> */}
              <div className="hyper-params">

                {/* <!-- Learning rate --> */}
                <div className="dropdown">
                  <label>학습률</label>
                  <div className="select">
                    <select defaultValue={0.0001} id="learningRate">
                      <option value="0.00001">0.00001</option>
                      <option value="0.0001">0.0001</option>
                      <option value="0.01">0.001</option>
                      <option value="0.03">0.003</option>
                    </select>
                  </div>
                </div>

                {/* <!-- Batch size --> */}
                <div className="dropdown">
                  <label>배치 크기 비율</label>
                  <div className="select">
                    <select defaultValue={0.4} id="batchSizeFraction">
                      <option value="0.05">0.05</option>
                      <option value="0.1">0.1</option>
                      <option value="0.4">0.4</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </div>

                {/* <!-- Epochs --> */}
                <div className="dropdown">
                  <label>에포크</label>
                  <div className="select">
                    <select defaultValue={20} id="epochs">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="40">40</option>
                    </select>
                  </div>
                </div>

                {/* <!-- Hidden units --> */}
                <div className="dropdown">
                  <label>은닉 유닛</label>
                  <div className="select">
                    <select defaultValue={100} id="dense-units">
                      <option value="10">10</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                </div>

              </div>
              {/* <!-- /.hyper-params --> */}

              <div className="webcam-box-outer">
                <div className="webcam-box-inner">
                  <video autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                </div>
              </div>

            </div>
            {/* <!-- /.panel-row --> */}

          </div>
          {/* <!-- /.panel --> */}

          <div className="panel joystick-panel">

            <div className="panel-row panel-row-top">

              <div className="panel-cell panel-cell-left panel-cell-fill">
                <p className="help-text">
                클릭하여 <br/>
                현재 카메라 뷰를 <br/>
                콘트롤을 위한 <br/>
                샘플로 추가하세요
                </p>
              </div>
              {/* <!-- ./panel-cell --> */}

              <div className="panel-cell panel-cell-center">
                <div className="thumb-box">
                  <div className="thumb-box-outer">
                    <div className="thumb-box-inner">
                      <canvas className="thumb" width="224" height="224" id="up-thumb" />
                    </div>
                    <button className="record-button" id="up"><span>샘플 추가</span></button>
                  </div>
                  <p>
                    <span id="up-total">0</span>개 샘플
                  </p>
                </div>
              </div>
              {/* <!-- ./panel-cell --> */}

              <div className="panel-cell panel-cell-right panel-cell-fill">
              </div>
              {/* <!-- ./panel-cell --> */}

            </div>
            {/* <!-- /.panel-row --> */}
            <div className="panel-row panel-row-middle">
              <div className="panel-cell panel-cell-left">
                <div className="thumb-box">
                  <div className="thumb-box-outer">
                    <div className="thumb-box-inner">
                      <canvas className="thumb" width="224" height="224" id="left-thumb"></canvas>
                    </div>
                    <button className="record-button" id="left"><span>샘플 추가</span>
                    </button>
                  </div>
                  <p>
                    <span id="left-total">0</span>개 샘플
                  </p>
                </div>
              </div>
              {/* <!-- ./panel-cell --> */}

              <div className="panel-cell panel-cell-center panel-cell-fill">
                <img height="108" width="129" src="./images/joystick.png" />
              </div>
              {/* <!-- ./panel-cell --> */}

              <div className="panel-cell panel-cell-right">
                <div className="thumb-box">
                  <div className="thumb-box-outer">
                    <div className="thumb-box-inner">
                      <canvas className="thumb" width="224" height="224" id="right-thumb"></canvas>
                    </div>
                    <button className="record-button" id="right"><span>샘플 추가</span></button>
                  </div>
                  <p>
                    <span id="right-total">0</span>개 샘플
                  </p>
                </div>
              </div>
              {/* <!-- ./panel-cell --> */}

            </div>
            {/* <!-- /.panel-row --> */}

            <div className="panel-row panel-row-bottom">

              <div className="panel-cell panel-cell-left panel-cell-fill">
              </div>
              {/* <!-- ./panel-cell --> */}

              <div className="panel-cell panel-cell-center">
                <div className="thumb-box">
                  <div className="thumb-box-outer">
                    <div className="thumb-box-inner">
                      <canvas className="thumb" width="224" height="224" id="down-thumb"></canvas>
                    </div>
                    <button className="record-button" id="down">
                      <span>샘플 추가</span>
                    </button>
                  </div>
                  <p>
                    <span id="down-total">0</span>개 샘플
                  </p>
                </div>
              </div>
              {/* <!-- ./panel-cell --> */}

              <div className="panel-cell panel-cell-right panel-cell-fill">
              </div>
              {/* <!-- ./panel-cell --> */}

            </div>
            {/* <!-- /.panel-row --> */}


          </div>
          {/* <!-- /.panel --> */}

        </div>
        {/* <!-- /#controller --> */}

        <p id="copyright">PAC-MAN&trade; &copy; BANDAI NAMCO Entertainment Inc.</p>
      </Playground>
      <Utteranc />
    </div>);
};

export default WebcamTransferLearning;



/**
const CONTROLS = ['up', 'down', 'left', 'right'];
const CONTROL_CODES = [38, 40, 37, 39];

export function init() {
  document.getElementById('controller').style.display = '';
  statusElement.style.display = 'none';
}

const trainStatusElement = document.getElementById('train-status');

// UI에서 하이퍼파라미터를 가져옵니다.
const learningRateElement = document.getElementById('learningRate');
export const getLearningRate = () => +learningRateElement.value;

const batchSizeFractionElement = document.getElementById('batchSizeFraction');
export const getBatchSizeFraction = () => +batchSizeFractionElement.value;

const epochsElement = document.getElementById('epochs');
export const getEpochs = () => +epochsElement.value;

const denseUnitsElement = document.getElementById('dense-units');
export const getDenseUnits = () => +denseUnitsElement.value;
const statusElement = document.getElementById('status');

export function startPacman() {
  google.pacman.startGameplay();
}

export function predictClass(classId) {
  google.pacman.keyPressed(CONTROL_CODES[classId]);
  document.body.setAttribute('data-active', CONTROLS[classId]);
}

export function isPredicting() {
  statusElement.style.visibility = 'visible';
}
export function donePredicting() {
  statusElement.style.visibility = 'hidden';
}
export function trainStatus(status) {
  trainStatusElement.innerText = status;
}

export let addExampleHandler;
export function setExampleHandler(handler) {
  addExampleHandler = handler;
}
let mouseDown = false;
const totals = [0, 0, 0, 0];

const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

const thumbDisplayed = {};

async function handler(label) {
  mouseDown = true;
  const className = CONTROLS[label];
  const button = document.getElementById(className);
  const total = document.getElementById(className + '-total');
  while (mouseDown) {
    addExampleHandler(label);
    document.body.setAttribute('data-active', CONTROLS[label]);
    total.innerText = ++totals[label];
    await tf.nextFrame();
  }
  document.body.removeAttribute('data-active');
}

upButton.addEventListener('mousedown', () => handler(0));
upButton.addEventListener('mouseup', () => mouseDown = false);

downButton.addEventListener('mousedown', () => handler(1));
downButton.addEventListener('mouseup', () => mouseDown = false);

leftButton.addEventListener('mousedown', () => handler(2));
leftButton.addEventListener('mouseup', () => mouseDown = false);

rightButton.addEventListener('mousedown', () => handler(3));
rightButton.addEventListener('mouseup', () => mouseDown = false);

export function drawThumb(img, label) {
  if (thumbDisplayed[label] == null) {
    const thumbCanvas = document.getElementById(CONTROLS[label] + '-thumb');
    draw(img, thumbCanvas);
  }
}

export function draw(image, canvas) {
  const [width, height] = [224, 224];
  const ctx = canvas.getContext('2d');
  const imageData = new ImageData(width, height);
  const data = image.dataSync();
  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    imageData.data[j + 0] = (data[i * 3 + 0] + 1) * 127;
    imageData.data[j + 1] = (data[i * 3 + 1] + 1) * 127;
    imageData.data[j + 2] = (data[i * 3 + 2] + 1) * 127;
    imageData.data[j + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}
 */