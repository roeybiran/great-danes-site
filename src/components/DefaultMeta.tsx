import Head from 'next/head';
import {
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	WITH_SITE_TITLE_SUFFIX,
} from '../constants';

// https://css-tricks.com/essential-meta-tags-social-media/

export default function DefaultMeta({ pageTitle }: { pageTitle: string }) {
	const title = WITH_SITE_TITLE_SUFFIX(pageTitle);
	const description = SITE_DESCRIPTION;
	const url = SITE_URL;
	const siteName = SITE_NAME;
	const imagePath = `${SITE_URL}/og-image.jpg`;
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />

			{/* Essential META Tags */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{imagePath && <meta property="og:image" content={imagePath} />}
			{url && <meta property="og:url" content={url} />}
			<meta name="twitter:card" content="summary_large_image" />

			{/* Non-Essential, But Recommended */}
			{siteName && <meta property="og:site_name" content={siteName} />}
			<meta name="twitter:image:alt" content="" />
		</Head>
	);
}
