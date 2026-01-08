import { AppProps } from 'next/app';
import '../styles/globals.css';
// Swiper styles (use explicit file paths for compatibility with certain bundlers)
import 'swiper/swiper-bundle.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
