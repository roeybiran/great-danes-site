import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import 'sanitize.css';

import SiteHeader from '../site-header';
import '../styles/animations.css';
import '../styles/external-link.css';
import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/modular-scale.css';
import '../styles/scrollbar.css';
import '../styles/sr-only.css';

/* @ts-ignore */
const Leva = dynamic(() => import('leva').then((m) => m.Leva), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* @ts-ignore */}
			{process.env.NODE_ENV === 'development' ? <Leva collapsed /> : null}

			<SiteHeader />
			<Component {...pageProps} />
		</>
	);
}
export default MyApp;
