import React, { useState } from 'react';
import Head from 'next/head'
import { NextPage } from 'next';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { Document, Page } from 'react-pdf';

const Pdf: NextPage = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber] = useState<number>(1);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend Pdf" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/pdf/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="React pdf" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend Pdf" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/pdf/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="React pdf" />
      </Head>
      <Playground>
        <h1>
          Pdf
        </h1>
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <p>
            {numPages} page
          </p>
          <Document
            file=""
            onLoadSuccess={handleDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Pdf;
