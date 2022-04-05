import { useRef, useEffect } from 'react';
import Head from 'next/head';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
// import SceneComponent from '@components/playground/babylonjs/SceneComponent';
import { NextPage } from 'next';
// import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import { App } from '@features/game/app';

const Babylonjs: NextPage = () => {
  const boxRef = useRef<any>(undefined);

  // const onSceneReady = (scene: any) => {
  //   // This creates and positions a free camera (non-mesh)
  //   var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

  //   // This targets the camera to scene origin
  //   camera.setTarget(Vector3.Zero());

  //   const canvas = scene.getEngine().getRenderingCanvas();

  //   // This attaches the camera to the canvas
  //   camera.attachControl(canvas, true);

  //   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  //   var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  //   // Default intensity is 1. Let's dim the light a small amount
  //   light.intensity = 0.7;

  //   // Our built-in 'box' shape.
  //   boxRef.current = MeshBuilder.CreateBox('box', { size: 2 }, scene);

  //   // Move the box upward 1/2 its height
  //   boxRef.current.position.y = 1;

  //   // Our built-in 'ground' shape.
  //   MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
  // };

  // /**
  //  * Will run on every frame render.  We are spinning the box on y-axis.
  //  */
  // const onRender = (scene: any) => {
  //   if (boxRef.current !== undefined) {
  //     var deltaTimeInMillis = scene.getEngine().getDeltaTime();

  //     const rpm = 10;
  //     boxRef.current.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  //   }
  // };

  useEffect(() => {
    new App();
  }, []);

  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend babylonjs" />
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
        >
          <div>
            {/* <SceneComponent
              antialias
              onSceneReady={onSceneReady}
              onRender={onRender}
              id="my-canvas"
            /> */}
          </div>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Babylonjs;
