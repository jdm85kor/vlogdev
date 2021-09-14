import Document as Doc, { Html, Head, Main, NextScript, DocumentContext  } from 'next/document'
import Ga from '@components/common/Ga';

class Document extends Doc {
  static async getInitialProps(ctx: DocumentContext ) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <link rel="shortcut icon" href="https://d6c63ppcwec2x.cloudfront.net/logo144.png"></link>
          <link rel="icon" href="https://d6c63ppcwec2x.cloudfront.net/logo144.png" sizes="144x144"></link>
        </Head>
        <body>
          <Ga />
          <Main />
          <NextScript />
          <div id="modal-root" />
          <meta name="description" content="Record yourself. Record do something. Record whatever." />
        </body>
      </Html>
    )
  }
}

export default Document
