/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import { css } from '@emotion/react';
// import * as tfvis from '@tensorflow/tfjs-vis';
// import * as tf from '@tensorflow/tfjs';
import { MnistData } from './data.js';
import Script from 'next/script'

declare global {
  interface Window {
    tfvis: any;
    tf: any;
  }
}



const  DigitModel = () => {
  let model: any = useRef(null);
  let canvas: any = useRef(null);
  let ctx: any = useRef(null);
  let pos: any = useRef({x:0, y:0});
  let rawImage: any = useRef(null);
  const result: any = useRef(null);

  const train = async (model: any, data: any) => {
    const metrics = ['loss', 'val_loss', 'accuracy', 'val_accuracy'];
    const container = { name: 'Model Training', styles: { height: '640px' } };
    const fitCallbacks = window.tfvis.show.fitCallbacks(container, metrics);
    
    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;

    const [trainXs, trainYs] = window.tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [
        d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    const [testXs, testYs] = window.tf.tidy(() => {
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

  const getModel = () => {
    model.current = window.tf.sequential();

    model.current.add(window.tf.layers.conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 8, activation: 'relu'}));
    model.current.add(window.tf.layers.maxPooling2d({poolSize: [2, 2]}));
    model.current.add(window.tf.layers.conv2d({filters: 16, kernelSize: 3, activation: 'relu'}));
    model.current.add(window.tf.layers.maxPooling2d({poolSize: [2, 2]}));
    model.current.add(window.tf.layers.flatten());
    model.current.add(window.tf.layers.dense({units: 128, activation: 'relu'}));
    model.current.add(window.tf.layers.dense({units: 10, activation: 'softmax'}));

    model.current.compile({optimizer: window.tf.train.adam(), loss: 'categoricalCrossentropy', metrics: ['accuracy']});

    return model.current;
  }

  const init = () => {
    ctx.current = canvas.current.getContext("2d");
    ctx.current.fillStyle = "black";
    ctx.current.fillRect(0,0,280,280);
    canvas.current.addEventListener("mousemove", draw);
    canvas.current.addEventListener("mousedown", setPosition);
    canvas.current.addEventListener("mouseenter", setPosition);
  }

  const run = async () => {
    if (typeof window !== 'undefined') {
      const data = new MnistData();
      await data.load();
      const model = getModel();
      // window.tfvis.show.modelSummary({name: 'Model Architecture'}, model);
      window.tfvis.show.modelSummary({ drawArea: result.current}, model);
      await train(model, data);
      init();
      alert("Training is done, try classifying your handwriting!");
    }
  };

  const setPosition = (e: any) => {
    const { left, top } = canvas.current.getBoundingClientRect();
    pos.current.x = e.clientX - left;
    pos.current.y = e.clientY - top;
  }
      
  const draw = (e: any) => {
    if(e.buttons!=1) return;
    ctx.current.beginPath();
    ctx.current.lineWidth = 24;
    ctx.current.lineCap = 'round';
    ctx.current.strokeStyle = 'white';
    ctx.current.moveTo(pos.current.x, pos.current.y);
    setPosition(e);
    ctx.current.lineTo(pos.current.x, pos.current.y);
    ctx.current.stroke();
    rawImage.current.src = canvas.current.toDataURL('image/png');
  }
      
  const erase = () => {
    ctx.current.fillStyle = "black";
    ctx.current.fillRect(0,0,280,280);
  }
      
  const save = () => {
    let raw = window.tf.browser.fromPixels(rawImage.current,1);
    let resized = window.tf.image.resizeBilinear(raw, [28,28]);
    let tensor = resized.expandDims(0);
    let prediction = model.current.predict(tensor);
    let pIndex = window.tf.argMax(prediction, 1).dataSync();

    alert(pIndex);
  }

  return (
    <div css={css`
      position: relative;
      margin: 10px auto;
    `}>
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></Script>
      {/* <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></Script> */}
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.9.0/dist/tf.min.js"></Script>
      <canvas
        width={280}
        height={280}
        ref={canvas}
        css={css`
          border: 8px solid;
        `}
      />
      <img
        ref={rawImage}
        css={css`
          position: absolute;
          top: 10%;
          left: 52%;
          width: 280px;
          height: 280px;
          display: none;
        `}
        alt=""
      />
      <div>
        <input
          type="button"
          value="start"
          id="start"
          onClick={run}
          />
        <input
          type="button"
          value="classify"
          id="sb"
          onClick={save}
          />
        <input
          type="button"
          value="clear"
          id="cb"
          onClick={erase}
        />
      </div>
      <div ref={result} />
    </div>
  );
};

export default DigitModel;