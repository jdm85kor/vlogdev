/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import Script from 'next/script';
import WebCam from '@components/playground/deep-learning/webcam';
import RPSDataset from '@components/playground/deep-learning/rps-dataset';

declare global {
  interface Window {
    tf: any;
  }
}

const DigitModel = () => {
  let wc: any = useRef(null);

  let mobilenet: any = useRef(null);
  let model: any = useRef(null);

  const webcam: any = useRef(null);
  const dataset: any = useRef(null);

  const [rockSamples, setRockSamples] = useState(0);
  const [paperSamples, setPaperSamples] = useState(0);
  const [scissorsSamples, setScissorsSamples] = useState(0);
  const [spockSamples, setSpockSamples] = useState(0);
  const [lizardSamples, setLizardSamples] = useState(0);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionText, setPredictionText] = useState('');

  const loadMobilenet = async () => {
    mobilenet.current = await window.tf.loadLayersModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json',
    );
    const layer = mobilenet.current.getLayer('conv_pw_13_relu');
    return window.tf.model({ inputs: mobilenet.current.inputs, outputs: layer.output });
  };
  const train = async () => {
    dataset.current.ys = null;
    dataset.current.encodeLabels(5);

    // In the space below create a neural network that can classify hand gestures
    // corresponding to rock, paper, scissors, lizard, and spock. The first layer
    // of your network should be a flatten layer that takes as input the output
    // from the pre-trained MobileNet model. Since we have 5 classes, your output
    // layer should have 5 units and a softmax activation function. You are free
    // to use as many hidden layers and neurons as you like.
    // HINT: Take a look at the Rock-Paper-Scissors example. We also suggest
    // using ReLu activation functions where applicable.
    model.current = window.tf.sequential({
      layers: [
        window.tf.layers.flatten({ inputShape: mobilenet.current.outputs[0].shape.slice(1) }),
        window.tf.layers.dense({ units: 100, activation: 'relu' }),
        window.tf.layers.dense({ units: 5, activation: 'softmax' }),
      ],
    });

    // Set the optimizer to be tf.train.adam() with a learning rate of 0.0001.
    const optimizer = window.tf.train.adam(0.0001);

    // Compile the model using the categoricalCrossentropy loss, and
    // the optimizer you defined above.
    model.current.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });

    let loss = 0;
    model.current.fit(dataset.current.xs, dataset.current.ys, {
      epochs: 10,
      callbacks: {
        onBatchEnd: async (batch: any, logs: any) => {
          loss = logs.loss.toFixed(5);
          console.log('LOSS: ' + loss);
        },
      },
    });
  };

  const handleButton = (elem: any) => {
    switch (elem.target.id) {
      case '0':
        setRockSamples((prev) => prev + 1);
        break;
      case '1':
        setPaperSamples((prev) => prev + 1);
        break;
      case '2':
        setScissorsSamples((prev) => prev + 1);
        break;
      case '3':
        setSpockSamples((prev) => prev + 1);
        break;
      case '4':
        setLizardSamples((prev) => prev + 1);
        break;
      default:
        return;
    }
    const label = parseInt(elem.target.id);
    const img = webcam.current.capture();
    dataset.current.addExample(mobilenet.current.predict(img), label);
  };

  const predict = async () => {
    while (isPredicting) {
      const predictedClass = window.tf.tidy(() => {
        const img = webcam.current.capture();
        const activation = mobilenet.current.predict(img);
        const predictions = model.current.predict(activation);
        return predictions.as1D().argMax();
      });
      const classId = (await predictedClass.data())[0];
      switch (classId) {
        case 0:
          setPredictionText('I see Rock');
          break;
        case 1:
          setPredictionText('I see Paper');
          break;
        case 2:
          setPredictionText('I see Scissors');
          break;
        case 3:
          setPredictionText('I see Spock');
          break;
        case 4:
          setPredictionText('I see Lizard');
          break;
      }
      predictedClass.dispose();
      await window.tf.nextFrame();
    }
  };

  const doTraining = () => {
    train();
    alert('Training Done!');
  };

  const startPredicting = () => {
    setIsPredicting(true);
    predict();
  };

  const stopPredicting = () => {
    setIsPredicting(false);
    predict();
  };

  const saveModel = () => {
    model.current.save('downloads://my_model');
  };

  const init = async () => {
    await webcam.current.setup();
    mobilenet.current = await loadMobilenet();
    window.tf.tidy(() => mobilenet.current.predict(webcam.current.capture()));
  };

  useEffect(() => {
    webcam.current = new WebCam(wc.current);
    dataset.current = new RPSDataset();
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      css={css`
        position: relative;
        margin: 10px auto;
      `}
    >
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></Script>

      <div>
        <div>
          <video autoPlay playsInline muted ref={wc} width="224" height="224"></video>
        </div>
        <button type="button" id="0" onClick={(e) => handleButton(e)}>
          Rock
        </button>
        <button type="button" id="1" onClick={(e) => handleButton(e)}>
          Paper
        </button>
        <button type="button" id="2" onClick={(e) => handleButton(e)}>
          Scissors
        </button>
        <button type="button" id="3" onClick={(e) => handleButton(e)}>
          Spock
        </button>
        <button type="button" id="4" onClick={(e) => handleButton(e)}>
          Lizard
        </button>
        <div id="rocksamples">Rock Samples: {rockSamples}</div>
        <div id="papersamples">Paper Samples: {paperSamples}</div>
        <div id="scissorssamples">Scissors Samples: {scissorsSamples}</div>
        <div id="spocksamples">Spock Samples: {spockSamples}</div>
        <div id="lizardsamples">Lizard Samples: {lizardSamples}</div>
        <button type="button" id="train" onClick={() => doTraining()}>
          Train Network
        </button>
        <div id="dummy">
          Once training is complete, click &#34;Start Predicting &#34; to see predictions, and
          &#34;Stop Predicting&#34; to end. Once you are happy with your model, click &#34;Download
          Model&#34; to save the model to your local disk.
        </div>
        <button type="button" id="startPredicting" onClick={() => startPredicting()}>
          Start Predicting
        </button>
        <button type="button" id="stopPredicting" onClick={() => stopPredicting()}>
          Stop Predicting
        </button>
        <button type="button" id="saveModel" onClick={() => saveModel()}>
          Download Model
        </button>
        <div
          id="prediction"
          css={css`
            color: blue;
          `}
        >
          {predictionText}
        </div>
      </div>
    </div>
  );
};

export default DigitModel;
