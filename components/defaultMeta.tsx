import Meta from './meta';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WITH_SITE_TITLE_SUFFIX,
} from 'lib/constants';

export default function DefaultMeta({ pageTitle }: { pageTitle: string }) {
  return (
    <Meta
      title={WITH_SITE_TITLE_SUFFIX(pageTitle)}
      description={SITE_DESCRIPTION}
      url={SITE_URL}
      siteName={SITE_NAME}
      imagePath={`${SITE_URL}/og-image.jpg`}
    />
  );
}
