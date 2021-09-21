import Footer from '@/components/layout/SiteFooter';
import NavBar from '@/components/layout/SiteHeader';
import { Leva } from 'leva';
import type { AppProps } from 'next/app';
import 'normalize.css';
import styled from 'styled-components';
import '../styles/animations.css';
import '../styles/external-link.css';
import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/modular-scale.css';
import '../styles/prefers-reduced-motion.css';
import '../styles/scrollbar.css';
import '../styles/sr-only.css';

const Content = styled.div`
  min-height: 100vh;

  margin-block-start: var(--s3);
  margin-block-end: var(--s3);
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Leva hidden={process.env.NODE_ENV === 'production'} collapsed />
      <NavBar />
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />
    </>
  );
}
export default MyApp;
