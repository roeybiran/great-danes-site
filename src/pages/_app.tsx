import type { AppProps } from 'next/app';
import { Leva } from 'leva';
import 'sanitize.css';
import SiteHeader from '../site-header';
import '../styles/animations.css';
import '../styles/external-link.css';
import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/modular-scale.css';
import '../styles/scrollbar.css';
import '../styles/sr-only.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Leva collapsed hidden={process.env.NODE_ENV === 'production'} />
			<SiteHeader />
			<Component {...pageProps} />
		</>
	);
}
export default MyApp;
