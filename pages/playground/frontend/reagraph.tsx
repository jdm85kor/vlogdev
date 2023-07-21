import React from 'react';
import Head from 'next/head'
import { NextPage } from 'next';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { GraphCanvas } from 'reagraph';

const Graph = () => <GraphCanvas
  nodes={[
    {
      id: '1',
      label: '1',
      data: {
        priority: 9,
      },
    },
    {
      id: '2',
      label: '2',
      data: {
        priority: 8,
      },
    },
    {
      id: '3',
      label: '3',
      data: {
        priority: 1,
      },
    },
    {
      id: '4',
      label: '4',
      data: {
        priority: 2,
      },
    },
    {
      id: '5',
      label: '5',
      data: {
        priority: 4,
      },
    },
  ]}
  edges={[
    {
      source: '1',
      target: '2',
      id: '1-2',
      label: '1-2'
    },
    {
      source: '2',
      target: '1',
      id: '2-1',
      label: '2-1'
    },
    {
      source: '4',
      target: '1',
      id: '4-1',
      label: '4-1'
    },
    {
      source: '5',
      target: '1',
      id: '5-1',
      label: '5-1'
    },
    {
      source: '1',
      target: '5',
      id: '1-5',
      label: '1-5'
    },
    {
      source: '3',
      target: '1',
      id: '3-1',
      label: '3-1'
    },
  ]}
/>



const Reagraph: NextPage = () => {

  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend Reagraph" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/reagraph/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="React Reagraph" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend Reagraph" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/reagraph/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="React Reagraph" />
      </Head>
      <Playground>
        <h1>
          Reagraph
        </h1>
        <section
          css={css`
            position: relative;
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <div css={css`
            width: 100px;
            height: 100px;
            min-height: 500px;
          `}>
            <Graph />
          </div>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Reagraph;
