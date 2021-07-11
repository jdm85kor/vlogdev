import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app'
import Ga from '../components/common/Ga';
import Gnb from '../components/common/Gnb';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Ga />
      <Gnb />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
