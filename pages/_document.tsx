/* eslint-disable @next/next/no-page-custom-font */
import Doc, { Html, Head, Main, NextScript, DocumentContext  } from 'next/document'
import Ga from '@components/common/Ga';
import { css } from '@emotion/react';

class Document extends Doc {
  static async getInitialProps(ctx: DocumentContext ) {
    const initialProps = await Doc.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head >
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body css={css`
          font-family: 'Noto Sans', sans-serif;
        `}>
          <Ga />
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    )
  }
}

export default Document;
