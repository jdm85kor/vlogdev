import Head from 'next/head';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { NextPage } from 'next';
import { Scene, Engine } from 'babylonjs';

const Babylonjs: NextPage = () => {
  var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

    return scene;
  };
  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend web-rtc" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/babylonjs/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta
          property="og:description"
          content="Record yourself. Record do something. Record whatever."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend babylonjs" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/babylonjs/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta
          name="twitter:description"
          content="Record yourself. Record do something. Record whatever."
        />
      </Head>
      <Playground>
        <h1>babylonjs</h1>
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        ></section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Babylonjs;
