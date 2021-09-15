import Doc, { Html, Head, Main, NextScript, DocumentContext  } from 'next/document'
import Ga from '@components/common/Ga';

class Document extends Doc {
  static async getInitialProps(ctx: DocumentContext ) {
    const initialProps = await Doc.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Ga />
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    )
  }
}

export default Document
