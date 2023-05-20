import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';

const WebcamTransferLearning: NextPage = () => {
  return (
    <div>
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
        <>
          <h1>웹캠으로 팩맨 제어하기</h1>
          {/* <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>
          <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></Script> */}
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
                  <img width="66" height="66" src="./images/button.svg" />
                  <span id="train-status">모델 훈련</span>
                </button>
                <button id="predict">
                  <img width="66" height="66" src="./images/button.svg" />
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
                      <select id="learningRate">
                        <option value="0.00001">0.00001</option>
                        <option selected value="0.0001">0.0001</option>
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
                      <select id="dense-units">
                        <option value="10">10</option>
                        <option selected value="100">100</option>
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
        </>
      </Playground>
      <Utteranc />
    </div>);
};

export default WebcamTransferLearning;