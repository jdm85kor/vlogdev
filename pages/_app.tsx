import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app'
import Ga from '../components/common/Ga';

function MyApp({ Component, pageProps }: AppProps) {
  return <Ga><Component {...pageProps} /></Ga>
}
export default MyApp
